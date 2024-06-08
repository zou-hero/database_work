import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
const routes = [
  {
    path:'/',
    component:() => import('../views/index.vue')
  },
  //登录页面
  {
    path:'/login',
    component:() => import('../views/login.vue')
  },
  {
    path:'/layout',
    component:() => import('../views/layout.vue'),
    redirect:'/index',
    children:[
      {
        path:'/index',
        component:() => import('../views/index.vue')
      },
      {
        path:'/borrowlist',
        component:() => import('../views/borrowlist.vue')
      },
      {
        path:'/returnBooks',
        component:() => import('../views/returnBooks.vue')
      },
      {
        path:'/borrowBooks',
        component:() => import('../views/borrowBooks.vue')
      },
      {
        path:'/editBooks',
        component:()=>import('../views/editBooks.vue')
      },
      {
        path:'/classifyBooks',
        component:() => import('../views/classifyBooks.vue')
      },
      {
        path:'/A',
        component:() => import('../views/A.vue')
      },
      {
        path:'/B',
        component:() => import('../views/B.vue')
      },
      {
        path:'/C',
        component:() => import('../views/C.vue')
      },
      {
        path:'/account',
        component:() => import('../views/account.vue')
      },
      {
        path:'/student',
        component:() => import('../views/student.vue')
      }


    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
//路由守卫
router.beforeEach((to, from,next)=>{
  //从from到to,这有执行next()才会跳转
  //判断用户是否登录
  console.log('store',store.state.uInfo)
  const uInfo=store.state.uInfo.userInfo
  if(!uInfo.username){
    //未登录,跳转到login
    if(to.path==='/login'){
      next()
      return
    }
    next('/login')

  }else{
    next()
  }
})

export default router
