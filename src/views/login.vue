<script>
import { reactive, toRefs } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup(){
    const store = useStore();
    const router = useRouter();
    const data = reactive({
        loginData:{
          username: '',
          password: ''
        }
    })
    const handleLogin=()=>{
      // store.commit('setUserInfo',data.loginData);
      // localStorage.setItem('loginData',JSON.stringify(data.loginData));
      // //跳转
      // router.push({
      //   path:'/layout',
      // })
      axios.post('http://127.0.0.1:5000/login', data.loginData)
          .then(response => {
            // 假设后端返回 { success: true } 表示登录成功
            if (response.data.success) {
              store.commit('setUserInfo',data.loginData);
              localStorage.setItem('loginData',JSON.stringify(data.loginData));
              // 假设你的首页路由名称为 'index'
              router.push({ path: '/layout' });
            } else {
              alert('用户名或密码错误！');
            }
          })
          .catch(error => {
            console.error('Login error:', error);
            alert('服务器错误！');
          });
    };
    return{
      ...toRefs(data),
      handleLogin
    }
  }
}
</script>

<template>
<div class="login_wrap">
  <div class="form_wrap">
    <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="loginData"
        label-width="auto"
        class="demo-dynamic"
    >
      <el-form-item
          prop="username"
          label="用户名:"
          :rules="[
        {
          required: true,
          message: '此项为必填项',
          trigger: 'blur',
        },
      ]"
      >
        <el-input v-model="loginData.username" type="text"/>
      </el-form-item>

      <el-form-item
          prop="password"
          label="密码: "
          :rules="[
        {
          required: true,
          message: '此项为必填项',
          trigger: 'blur',
        },
      ]"
      >
        <el-input v-model="loginData.password" type="password" />
      </el-form-item>
      </el-form>
    <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>

  </div>
</div>
</template>

<style scoped>
.login_wrap{
  width: 100vw;
  height: 100vw;
  background-color: cornflowerblue;
  position: relative;
}
.form_wrap{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px 50px;
  border-radius: 5px;
}
.login_btn{
  width: 300px;
}

</style>