<script>
import {reactive, computed, toRefs} from "vue";
import axios from "axios";
import {ElMessageBox} from "element-plus";
export default {
  setup(){
    const data = reactive({
      keyword:'',
      bookData:[],
      filteredBookData:[],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      fromDate:{
        book_id:'',
        book_name:'',
        author:'',
        publisher:'',
        book_type:'',
        book_number:'',
        remaining_number:''
      },
      fromDate2:{
        book_id:'',
        book_name:'',
        author:'',
        publisher:'',
        book_type:'',
        book_number:'',
        remaining_number:''
      },
    })

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

    const cancelBooks =(row) =>{
      const recordId = row.book_id;
      ElMessageBox.confirm('确认删除这本书吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        // 弹出确认框，询问用户是否确定删除
        axios.delete(`http://127.0.0.1:5000/api/cancelBooks/${recordId}`)
            .then(() => {
              // 删除操作成功的逻辑
              data.filteredBookData = data.filteredBookData.filter(item => item.book_id !== recordId);
              // 或者，如果 tableDate 也需要更新
              data.bookData = data.bookData.filter(item => item.book_id !== recordId);
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

    const addBooks=()=>{
      data.dialogFormVisible=true;
    }
    const cancelAdd=()=>{
      data.dialogFormVisible=false;
    }
    const cancelAdd2=()=>{
      data.dialogFormVisible2=false;
    }

    const confirmAdd=()=>{
      axios.post('http://127.0.0.1:5000/api/confirmAdd', data.fromDate)
          .then((response) => {
            console.log('添加成功:', response.data);
            // 关闭对话框
            data.dialogFormVisible = false;
            booksSearch();
          })
          .catch((error) => {
            console.error('添加失败:', error);
          });
      // data.fromDate={
      //       book_id:'',
      //       book_name:'',
      //       author:'',
      //       publisher:'',
      //       book_type:'',
      //       book_number:'',
      //       remaining_number:''
      // };
    }

    const editBooks=(row)=>{
      data.fromDate2={...row};
      data.dialogFormVisible2=true;
    };

    const confirmAdd2=()=>{
      axios.post(`http://127.0.0.1:5000/api/updateBooks/${data.fromDate2.book_id}`, data.fromDate2)
          .then((response) => {
            console.log('编辑成功', response.data);
            data.dialogFormVisible2=false;
            booksSearch();
          })
          .catch((error) => {
            console.log('error:',error);
          });
    };

    booksSearch();
    return{
      ...toRefs(data),
      booksSearch,
      searchData,
      cancelBooks,
      addBooks,
      cancelAdd,
      confirmAdd,
      editBooks,
      cancelAdd2,
      confirmAdd2
    }


  }
}
</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑书籍</el-breadcrumb-item>
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
    <el-button type="primary" @click="addBooks" style="margin-left: 20px">添加书籍</el-button>
    <el-table :data="searchData" style="width: 100%">
      <el-table-column prop="book_id" label="图书编号" width="150" />
      <el-table-column prop="book_name" label="书名" width="150" />
      <el-table-column prop="author" label="作者" width="150" />
      <el-table-column prop="publisher" label="出版社" width="150" />
      <el-table-column prop="book_type" label="类型" width="150" />
      <el-table-column prop="book_number" label="总数量/本" width="150" />
      <el-table-column prop="remaining_number" label="剩余数量/本" width="150" />
      <el-table-column prop="" label="操作">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button type="primary" @click="editBooks(scope.row)">修改</el-button>
            <el-button type="danger" @click="cancelBooks(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="填写添加的书籍信息" width="500">
      <el-from :model="fromDate">
        <el-form-item label="图书编号" prop="book_id">
          <el-input v-model="fromDate.book_id" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="书名" prop="book_name">
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
        <el-form-item label="总数量" prop="book_number">
          <el-input v-model="fromDate.book_number" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="剩余数量" prop="remaining_number">
          <el-input v-model="fromDate.remaining_number" style="width: 240px" placeholder="" />
        </el-form-item>
      </el-from>
      <template #footer>
        <div class="flex">
          <el-button type="danger"  @click="cancelAdd">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisible2" title="修改书籍信息" width="500">
      <el-from :model="fromDate2">
        <el-form-item label="图书编号" prop="book_id">
          <el-input v-model="fromDate2.book_id" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="书名" prop="book_name">
          <el-input v-model="fromDate2.book_name" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="fromDate2.author" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="fromDate2.publisher" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="类型" prop="book_type">
          <el-input v-model="fromDate2.book_type" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="总数量" prop="book_number">
          <el-input v-model="fromDate2.book_number" style="width: 240px" placeholder="" />
        </el-form-item>
        <el-form-item label="剩余数量" prop="remaining_number">
          <el-input v-model="fromDate2.remaining_number" style="width: 240px" placeholder="" />
        </el-form-item>
      </el-from>
      <template #footer>
        <div class="flex">
          <el-button type="danger"  @click="cancelAdd2">取消</el-button>
          <el-button type="primary" @click="confirmAdd2">确认</el-button>
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