<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
  setup(){
    const store = useStore()
    const router = useRouter()
    const loginOut=()=>{
      localStorage.removeItem('loginData');
      store.commit('setUserInfo',{});
      router.push({
        path:'/login',
      })
    }
    return{
      loginOut
    }
  }
}
</script>

<template>

    <div class="common-layout">
      <el-container>

        <el-header>
          <img class="logo" src="../assets/logo.png">
          <h1 class="title">图书管理系统</h1>
          <div class="title_right">
<!--            <div class="mb-4">-->
<!--              <el-button type="primary" round>登录</el-button>-->
<!--            </div>-->
            <div class="mb-4">
              <el-button @click="loginOut" type="danger" round>退出</el-button>
            </div>
          </div>
        </el-header>

        <el-container>

          <el-aside width="200px">
            <el-menu
            background-color="none"
            text-color="#fff"
            :router="true"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>书籍借阅管理</span>
                </template>
                <el-menu-item index="/borrowlist">借阅记录查询</el-menu-item>
                <el-menu-item index="/borrowBooks">借阅</el-menu-item>
                <el-menu-item index="/returnBooks">归还</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>书籍信息管理</span>
                </template>
                <el-menu-item index="/editBooks">编辑书籍</el-menu-item>
                <el-menu-item index="/classifyBooks">书籍分类管理</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>读者信息管理</span>
                </template>
                <el-menu-item index="/student">读者信息管理</el-menu-item>
                <el-menu-item index="/account">账户管理</el-menu-item>
              </el-sub-menu>
<!--              <el-menu-item index="/borrowlist">-->
<!--                <el-icon><SwitchButton /></el-icon>-->
<!--                <span>统计</span>-->
<!--              </el-menu-item>-->
            </el-menu>

          </el-aside>

          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>

</template>

<style scoped>
.el-header{
  background-color: rgb(39, 45, 53);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo{
  width: 50px;
  height: 50px;

}
.title{
  text-align: center;
  color: #fff;

}
.title_right{
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-button{
  height: 20px;
  width: 40px;
  font-size: 10px;
  margin-right: 10px;
}
.el-aside{
  background-color: rgb(48, 55, 65);
  height: 100vh;
}
.el-main{
  background-color: #efefef;
}
</style>