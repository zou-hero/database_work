// import { createStore } from 'vuex'
//
// export default createStore({
//   //全局状态与初始值
//   state: {
//   },
//   //计算state，获取对应的值
//   getters: {
//   },
//   //更新状态的方法，更新state的唯一方法，commit,mutations
//   mutations: {
//   },
//   //可以异步操作，可以返回promise，更改数据还是传递到mutations去更改
//   actions: {
//   },
//   //数据比较多，分模块
//   modules: {
//   }
// })
import {createStore} from "vuex"
import uInfo from "./userState.js"

export default createStore({
  modules:{
    uInfo
  }
})