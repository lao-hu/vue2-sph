/* 
  对 axios 进行二次封装
*/
import axios from 'axios'



// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
 
// 引入 uuid生成游客的临时身份
import {get_uuid} from '@/utils/uuid_token';


import store from '@/store';

/* 
axios.create(config) 对axios请求进行二次封装
  1. 利用axios对象的create方法，去创建一个
*/
var requests = axios.create({
     // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
     baseURL:"/api",
     // `timeout` 指定请求超时的毫秒数。
    // 如果请求时间超过 `timeout` 的值，则请求会被中断
    timeout: 6000, // 默认值是 `0` (永不超时)
})


// 请求拦截器：在发请求之前，请求拦截器可以做一些事情  
requests.interceptors.request.use((config)=>{ 
    // 在发送请求之前做些什么
    //  游客身份
   if(get_uuid()){
     // 设置请求头 添加一个字段(userTempId)， 这个字段是和后台商量好的
     config.headers.userTempId = get_uuid()
   }
   
   // 用户身份 在请求标头发送token 获取用户信息
   if(store.state.user.userToken){
    config.headers.token = store.state.user.userToken
   }

    // 开始进度条
    nprogress.start()
  
    return config
 })


// 添加响应拦截器
requests.interceptors.response.use((config)=>{
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
  
    // 结束进度条
    nprogress.done()
    return config
},(error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    
    return Promise.reject(error)
})



// 对外进行暴露
export default requests
