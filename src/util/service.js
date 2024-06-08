// import axios from "axios";
// import { ElLoading } from 'element-plus'
// import { ElMessage } from 'element-plus'
// let loadingObj = null
// const Service = axios.create({
//     timeout: 8000,
//     baseURL: "http://xxx",
//     headers:{
//         "content-type":"application/json;charset=UTF-8"
//     }
// })
// //请求拦截，对请求做统一处理
// Service.interceptors.request.use(config=>{
//     loadingObj=ElLoading.service({
//         lock: true,
//         text: 'Loading',
//         background: 'rgba(0, 0, 0, 0.7)',
//     })
//     return config;
//     //切记要return，只有这样才会执行下面的响应拦截
// })
// //响应拦截，对返回值做统一处理
// Service.interceptors.response.use(response => {
//     loadingObj.close()
//     return response.data;
// },
//     error=>{
//         ElMessage({
//             message: '服务器错误',
//             type: 'error',
//             duration:2000
//         })
//     })