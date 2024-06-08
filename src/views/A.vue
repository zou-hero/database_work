<script>
import {reactive, computed, toRefs} from "vue";
import axios from "axios";
export default {
  setup(){
    const data = reactive({
      keyword:'',
      bookData:[],
    })

    const booksSearch=async ()=>{
      try{
        const response = await axios.get('http://127.0.0.1:5000/api/bookViewA',{});
        data.bookData=response.data;
        data.filteredBookData=data.bookData;
      }catch(error){
        console.log('error:',error);
      }
    };

    const searchData = computed(()=>{
      return data.bookData.filter(item=>{
        return item.book_name.toLowerCase().includes(data.keyword.toLowerCase());
      });
    });

    booksSearch();

    return{
      ...toRefs(data),
      booksSearch,
      searchData

    }

  }
}
</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>A区</el-breadcrumb-item>
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
        <el-button @click="booksSearch"><el-icon><Search /></el-icon></el-button>
      </template>
    </el-input>
    <el-table :data="searchData" style="width: 100%">
      <el-table-column prop="book_id" label="图书编号" width="150" />
      <el-table-column prop="book_name" label="书名" width="150" />
      <el-table-column prop="author" label="作者" width="150" />
      <el-table-column prop="publisher" label="出版社" width="150" />
      <el-table-column prop="book_type" label="类型" width="150" />
      <el-table-column prop="book_number" label="总数量/本" width="150" />
      <el-table-column prop="remaining_number" label="剩余数量/本" width="150" />
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