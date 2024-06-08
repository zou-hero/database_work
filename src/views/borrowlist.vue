<script>
import {reactive,toRefs,computed} from 'vue'
import { ElMessageBox } from 'element-plus';
import axios from "axios";
export default{
  setup(){
    const data=reactive({
      keyword:'',
      tableDate:[],
      filteredTableDate:[],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      fromDate:{
        borrow_id:'',
        borrow_datatime:'',
        return_datatime:'',
        deadline:'',
        book_id:'',
        borrower:'',
        sno:'',
        state:''
      },
      fromDate2:{
        borrow_id:'',
        borrow_datatime:'',
        return_datatime:'',
        deadline:'',
        book_id:'',
        borrower:'',
        sno:'',
        state:''
      }
    });

    const searchList=async ()=>{
      try{
        const response = await axios.get('http://127.0.0.1:5000/api/borrowList');
        data.tableDate=response.data;
        data.filteredTableDate=data.tableDate;
      }catch(error){
        console.log('error:',error);
      }
    };
// 使用计算属性根据keyword动态过滤数据
    const filteredData = computed(() => {
      return data.tableDate.filter(item => {
        // 假设我们根据借阅人名称来过滤，根据实际情况调整过滤逻辑
        return item.borrower.toLowerCase().includes(data.keyword.toLowerCase());
      });
    });

    // 删除行数据的方法
    const handleDelete = (row) => {
      // 假设每条记录都有一个唯一的标识符，例如 ID
      const recordId = row.borrow_id; // 确保 row 对象中有 id 属性或其他标识符
      console.log(recordId);
      ElMessageBox.confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
      // 弹出确认框，询问用户是否确定删除
      axios.delete(`http://127.0.0.1:5000/api/borrowList/${recordId}`)
          .then(() => {
            // 删除操作成功的逻辑
            data.filteredTableDate = data.filteredTableDate.filter(item => item.borrow_id !== recordId);
            // 或者，如果 tableDate 也需要更新
            data.tableDate = data.tableDate.filter(item => item.borrow_id !== recordId);
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
    };
    //添加记录
    const borrow=()=>{
      data.dialogFormVisible=true
    }
    const addBorrowRecord = () => {
      axios.post('http://127.0.0.1:5000/api/addBorrowRecord', data.fromDate)
          .then((response) => {
            console.log('添加成功:', response.data);
            // 关闭对话框
            data.dialogFormVisible = false;
            // 刷新列表或者重新获取数据，更新显示
            searchList();
          })
          .catch((error) => {
            console.error('添加失败:', error);
          });
      data.fromDate = {
        borrow_id:'',
        borrow_datatime:'',
        return_datatime:'',
        deadline:'',
        book_id:'',
        borrower:'',
        sno:'',
        state:''
      };
    };
    // 取消按钮点击事件
    const cancelAddBorrowRecord = () => {
      // 关闭对话框
      data.dialogFormVisible = false;
      data.fromDate = {
        borrow_id:'',
            borrow_datatime:'',
            return_datatime:'',
            deadline:'',
            book_id:'',
            borrower:'',
            sno:'',
            state:''
      };
    };

    //编辑操作
    const handleEdit=(row)=>{
      data.fromDate2={...row};
      data.dialogFormVisible2=true;
    };
    const addBorrowRecord2=()=>{
      axios.post(`http://127.0.0.1:5000/api/updateBorrowRecord/${data.fromDate2.borrow_id}`, data.fromDate2)
      .then((response) => {
        console.log('编辑成功', response.data);
        data.dialogFormVisible2=false;
        searchList();
      })
      .catch((error) => {
        console.log('error:',error);
      });
    };

    const cancelAddBorrowRecord2=()=>{
      data.dialogFormVisible2=false;
    }
    searchList();
    return {
      searchList,
      ...toRefs(data),
      filteredData,
      handleDelete,
      borrow,
      addBorrowRecord,
      cancelAddBorrowRecord,
      handleEdit,
      cancelAddBorrowRecord2,
      addBorrowRecord2
    };
  }
}
</script>

<template>
  <div>
    <!--    面包屑-->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>借阅记录查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    内容区-->
    <div class="page_content">

      <div class="input-box">
        <el-input
            v-model="keyword"
            style="max-width: 600px"
            placeholder="搜索关键字"
            class="input-with-select"
        >
          <template #append>
            <el-button @click="searchList"><el-icon><Search /></el-icon></el-button>
          </template>
        </el-input>

        <el-button type="primary" @click="borrow" class="addBorrow">添加借阅记录</el-button>
        <el-dialog v-model="dialogFormVisible" title="添加借阅记录" width="500">
          <el-from :model="fromDate">
            <el-form-item label="借阅编号" prop="borrow_id">
              <el-input v-model="fromDate.borrow_id" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="借阅日期" prop="borrow_datatime">
              <el-input v-model="fromDate.borrow_datatime" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="归还日期" prop="return_datatime">
              <el-input v-model="fromDate.return_datatime" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="借阅截止日期" prop="deadline">
              <el-input v-model="fromDate.deadline" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="图书编号" prop="book_id">
              <el-input v-model="fromDate.book_id" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="借阅人" prop="borrower">
              <el-input v-model="fromDate.borrower" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="学号" prop="sno">
              <el-input v-model="fromDate.sno" style="width: 240px" placeholder="" />
            </el-form-item>
            <el-form-item label="归还状态" prop="state">
              <el-input v-model="fromDate.state" style="width: 240px" placeholder="" />
            </el-form-item>
          </el-from>
          <template #footer>
            <div class="flex">
              <el-button type="danger"  @click="cancelAddBorrowRecord">取消</el-button>
              <el-button type="primary" @click="addBorrowRecord">确认</el-button>
            </div>
          </template>
        </el-dialog>

      </div>

      <el-table :data="filteredData" style="width: 100%">
        <el-table-column prop="borrow_id" label="借阅编号" width="100" />
        <el-table-column prop="borrow_datatime" label="借阅日期" width="180" />
        <el-table-column prop="return_datatime" label="归还日期" width="180" />
        <el-table-column prop="deadline" label="借阅截止日期" width="180" />
        <el-table-column prop="book_id" label="图书编号" width="100" />
        <el-table-column prop="borrower" label="借阅人" width="150" />
        <el-table-column prop="sno" label="学号" width="120" />
        <el-table-column prop="state" label="归还状态" width="120"/>
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </div>


          </template>
        </el-table-column>
      </el-table>
      <!--              编辑数据弹窗-->
      <el-dialog v-model="dialogFormVisible2" title="编辑借阅记录" width="500">
        <el-from :model="fromDate2">
          <el-form-item label="借阅编号" prop="borrow_id">
            <el-input v-model="fromDate2.borrow_id" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="借阅日期" prop="borrow_datatime">
            <el-input v-model="fromDate2.borrow_datatime" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="归还日期" prop="return_datatime">
            <el-input v-model="fromDate2.return_datatime" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="借阅截止日期" prop="deadline">
            <el-input v-model="fromDate2.deadline" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="图书编号" prop="book_id">
            <el-input v-model="fromDate2.book_id" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="借阅人" prop="borrower">
            <el-input v-model="fromDate2.borrower" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="学号" prop="sno">
            <el-input v-model="fromDate2.sno" style="width: 240px" placeholder="" />
          </el-form-item>
          <el-form-item label="归还状态" prop="state">
            <el-input v-model="fromDate2.state" style="width: 240px" placeholder="" />
          </el-form-item>
        </el-from>
        <template #footer>
          <div class="flex">
            <el-button type="danger"  @click="cancelAddBorrowRecord2">取消</el-button>
            <el-button type="primary" @click="addBorrowRecord2">确认</el-button>
          </div>
        </template>
      </el-dialog>
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
.addBorrow{
  margin-left: 20px;
}
</style>