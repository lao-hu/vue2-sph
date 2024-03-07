// Vuex 用户模块 模块

// API 统一管理 ,引入api请求
import {
  reqSendCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api/index'
  // 引入 uuid生成游客的临时身份

const user = {
        // 开启命名空间
        namespaced:true,

        // 准备 actions---用于响应组件中的动作
        /* 
            commit参数采用解构赋值    
         */
        actions : {
            // 获取验证码 
           async sendCode({commit},phone){
                let result = await reqSendCode(phone)
            
                 // 判断状态是否等于200, 200表示成功
                 if(result.data.code == 200){
                    commit("SENDCODE",result.data.data)
                    return result.data.message
                 }else{
                    return Promise.reject(new Error("faile"))
                 }
           },

           //用户注册
          async userRegister({commit},data={}){
             let result = await reqUserRegister(data)

              // 判断状态是否等于200, 200表示成功
              if(result.data.code == 200){
                return result.data.message
             }else{
                return Promise.reject(new Error("faile"))
             }
           },

           // 用户登陆信息token
          async userLogin({commit},data={}){
            
             let result = await reqUserLogin(data)
           
               // 判断状态是否等于200, 200表示成功
               if(result.data.code == 200){
                  // 提交mutations, 操作数据
                 commit("USERLOGIN",result.data.data.token)
                  // 持久化存储
                  localStorage.setItem("token",result.data.data.token)

                return "ok"
             }else{
                return Promise.reject(new Error("faile"))
             }
          },

          // 携带token ，获取用户信息
          async userInfo({commit}){
            let result = await reqUserInfo()
          
               // 判断状态是否等于200, 200表示成功
             if(result.data.code == 200){
                commit("USERINFO",result.data.data)
                return result.data.message
             }else{
               return Promise.reject(new Error("faile"))
             }
          },

          
          // 退出登录
          async userLogout({commit}){
            // 向服务器发起请求，通知服务器清除token
            let result = await reqLogout()
            
              // 判断状态是否等于200, 200表示成功
              if(result.data.code == 200){
               commit("ClEAR")
               return result.data.message
            }else{
               return Promise.reject(new Error("faile"))
            }
          }
        },
        // 准备 mutations---用于操作数据(state)
        mutations : {
            SENDCODE(state,data){
               state.sendCode = data
            },
            USERLOGIN(state,data){
               state.userToken = data
            },
            USERINFO(state,data){
               state.userinfo = data
           },

           
           // 请求数据
           ClEAR(state){
            // 清空用户相关数据
            state.userinfo = {},
            state.userToken = ""
            // 删除本地相关数据
            localStorage.removeItem("token")
           }
        },
  
        /* 
          准备 getters -- 用于将state进行加工,并且需要组件间复用时可以使用
          相当于跨组件的 computed 计算属性，
  
          主要作用就是：为了简化数据而生的
        */
        getters:{
            
        },
  
        // 准备 state---用于存储数据
        //  注意： 这里的属性值不能瞎写, 得看服务器返回的数据格式是什么
        state:{
            // 验证码
           sendCode:"",
           // 用户携带 token, 如果token不存在就是
           userToken:localStorage.getItem("token"),
           // 用户信息
           userinfo:{}
        }
  }
  
  export default user