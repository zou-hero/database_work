<script>
import {reactive, computed, toRefs} from "vue";
import axios from "axios";
import { ElMessageBox } from 'element-plus';
export default{
  setup(){
    const data=reactive({
      keyword:'',
      bookData:[],
      filteredBookData:[],
      dialogFormVisible:false,
      fromDate:{
        sno:'',
        borrower:'',
        book_id:'',
        book_name:'',
        author:'',
        publisher:'',
        book_type:''
      },

    });

  const booksSearch=async ()=>{
    try{
      const response = await axios.get('http://127.0.0.1:5000/api/bookShow',{});
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

  const borrowBooks=(book)=>{
    data.dialogFormVisible=true;
    // 将所选图书的信息赋值给 fromDate 对象的属性
    data.fromDate.book_id = book.book_id;
    data.fromDate.book_name = book.book_name; // 这里需要确认 borrow_name 属性对应的字段
    data.fromDate.author = book.author;
    data.fromDate.publisher = book.publisher;
    data.fromDate.book_type = book.book_type;

  };

  const cancelBorrow=()=>{
    data.dialogFormVisible=false;
  }

  const confirmBorrow=(row)=>{
    axios.get('http://127.0.0.1:5000/api/checkStudent', {
      params: {
        sno: data.fromDate.sno,
        borrower: data.fromDate.borrower
      }
    })
        .then((response)=> {
          if (response.data.exists) {
            axios.post('http://127.0.0.1:5000/api/confirmBorrow', data.fromDate)
                .then((response) => {
                  console.log('添加成功:', response.data);
                  // 关闭对话框
                  data.dialogFormVisible = false;
                  booksSearch();
                })
                .catch((error) => {
                  console.error('添加失败:', error);
                });

            const recordId = row.book_id;
            axios.delete(`http://127.0.0.1:5000/api/deleteBorrow/${recordId}`)
                .then(() => {
                  // 删除操作成功的逻辑
                  data.filteredTableDate = data.filteredTableDate.filter(item => item.book_id !== recordId);
                  // 或者，如果 tableDate 也需要更新
                  data.bookData = data.bookData.filter(item => item.book_id !== recordId);
                  data.dialogFormVisible = false;
                  booksSearch();
                })
                .catch(error => {
                  // 删除操作失败的逻辑
                  console.error('删除失败:', error);
                });
            data.fromDate = {
              sno: '',
              borrower: '',
              book_id: '',
              book_name: '',
              author: '',
              publisher: '',
              book_type: ''
            };
          } else {
            // 提示用户没有该用户
            alert('学号和名字不匹配或不存在该学号或姓名！')
          }
        }).catch(error => {
      // 请求失败的错误处理逻辑
      console.error('请求失败:', error);
          });

    }

    booksSearch();

  return{
    ...toRefs(data),
    booksSearch,
    searchData,
    borrowBooks,
    cancelBorrow,
    confirmBorrow
  }
  }
}
</script>

<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>借阅</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

<div class="page_content">
<!--  内容-->
  <div>
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
    <el-table-column prop="book_number" label="总数量/本" width="180" />
    <el-table-column prop="remaining_number" label="剩余数量/本" width="180" />
    <el-table-column prop="" label="借阅">
    <template #default="scope">
      <div style="display: flex; align-items: center">
        <el-button type="primary" @click="borrowBooks(scope.row)">借书</el-button>
      </div>
    </template>
    </el-table-column>
  </el-table>
  </div>
  <el-dialog v-model="dialogFormVisible" title="完善借阅信息" width="500">
    <el-from :model="fromDate">
      <el-form-item label="学号" prop="sno">
        <el-input v-model="fromDate.sno" style="width: 240px" placeholder="" />
      </el-form-item>
      <el-form-item label="姓名" prop="borrower">
        <el-input v-model="fromDate.borrower" style="width: 240px" placeholder="" />
      </el-form-item>
      <el-form-item label="图书编号" prop="book_id">
        <el-input v-model="fromDate.book_id" style="width: 240px" placeholder="" />
      </el-form-item>
      <el-form-item label="图书名" prop="book_name">
        <el-input v-model="fromDate.book_name" style="width: 240px" placeholder="" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="fromDate.author" style="width: 240px" placeholder="" />
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="fromDate.publisher" style="width: 240px" placeholder="" />
      </el-form-item>
      <el-form-item label="类型" prop="book_type">
        <el-input v-model="fromDate.book_type" style="width: 240px" placeholder="" />
      </el-form-item>
    </el-from>
    <template #footer>
      <div class="flex">
        <el-button type="danger"  @click="cancelBorrow">取消</el-button>
        <el-button type="primary" @click="confirmBorrow(fromDate)">确认</el-button>
      </div>
    </template>
  </el-dialog>
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