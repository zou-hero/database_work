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
        const response = await axios.get('http://127.0.0.1:5000/api/userShow',{});
        data.userData=response.data;
        data.filteredUserData=data.userData;
      }catch(error){
        console.log('error:',error);
      }
    };

    const searchData = computed(()=>{
      return data.userData.filter(item=>{
        return item.username.toLowerCase().includes(data.keyword.toLowerCase());
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
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
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
      <el-table-column prop="username" label="用户名" width="150" />
      <el-table-column prop="password" label="密码" width="150" />
      <el-table-column prop="admin" label="是否为管理员" width="150" />
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