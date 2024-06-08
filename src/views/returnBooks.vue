<script>
import {computed, reactive, toRefs} from "vue";
import axios from "axios";
import {ElMessageBox} from "element-plus";
export default {
  setup(){
    const data = reactive({
      keyword:'',
      bookData:[],
      filteredBookData:[],
    })

    const booksSearch=async ()=>{
      try{
        const response = await axios.get('http://127.0.0.1:5000/api/rutuenBookShow',{});
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

    const returnBooks =(row) =>{
      const recordId = row.sno;
      ElMessageBox.confirm('确认还书吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        // 弹出确认框，询问用户是否确定删除
        axios.delete(`http://127.0.0.1:5000/api/returnBooks/${recordId}`)
            .then(() => {
              // 删除操作成功的逻辑
              data.filteredBookData = data.filteredBookData.filter(item => item.sno !== recordId);
              // 或者，如果 tableDate 也需要更新
              data.bookData = data.bookData.filter(item => item.sno !== recordId);
              booksSearch();
            })
            .catch(error => {
              // 删除操作失败的逻辑
              console.error('删除失败:', error);
            });
      }).catch(() => {
        // 用户点击“取消”或关闭对话框，这个 catch 块会执行
        // 可以在这里添加代码来处理取消操作，例如：
        console.log('删除操作已取消');
        // 通常这里不需要做任何操作，因为用户只是取消了删除
      });
    }

    booksSearch();

    return{
      ...toRefs(data),
      booksSearch,
      searchData,
      returnBooks
    }


  }
}
</script>

<template>
<div>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
    <el-breadcrumb-item>还书</el-breadcrumb-item>
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
        <el-table-column prop="book_id" label="图书编号" width="120" />
        <el-table-column prop="borrower" label="借阅者" width="120" />
        <el-table-column prop="sno" label="学号" width="120" />
        <el-table-column prop="book_name" label="图书名" width="120" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="publisher" label="出版社" width="120" />
        <el-table-column prop="book_type" label="类型" width="100" />
        <el-table-column prop="borrow_datatime" label="借阅日期" width="180" />
        <el-table-column prop="deadline" label="截止日期" width="180" />
        <el-table-column prop="" label="还书">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-button type="primary" @click="returnBooks(scope.row)">还书</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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