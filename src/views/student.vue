<script>
import {reactive, computed, toRefs} from "vue";
import axios from "axios";
export default{
  setup(){
    const data = reactive({
      keyword:'',
      userData:[],
      filteredUserData:[],
    })
    const userSearch=async ()=>{
      try{
        const response = await axios.get('http://127.0.0.1:5000/api/studentShow',{});
        data.userData=response.data;
        data.filteredUserData=data.userData;
      }catch(error){
        console.log('error:',error);
      }
    };

    const searchData = computed(()=>{
      return data.userData.filter(item=>{
        return item.name.toLowerCase().includes(data.keyword.toLowerCase());
      });
    });

    userSearch()

    return{
      ...toRefs(data),
      userSearch,
      searchData,
    }

  }
}
</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>读者信息管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="page_content">
    <el-input
        v-model="keyword"
        style="max-width: 600px"
        placeholder="搜索关键字"
        class="input-with-select"
    >
      <template #append>
        <el-button @click="userSearch"><el-icon><Search /></el-icon></el-button>
      </template>
    </el-input>
    <el-table :data="searchData" style="width: 100%">
      <el-table-column prop="sno" label="学号" width="150" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="phone" label="电话" width="150" />
      <el-table-column prop="college" label="学院" width="150" />
      <el-table-column prop="address" label="宿舍" width="150" />
      <el-table-column prop="read_number" label="借阅数" width="150" />
    </el-table>
  </div>
</template>

<style scoped>
.page_content{
  display: block;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
}
</style>