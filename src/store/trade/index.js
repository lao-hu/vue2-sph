// Vuex 用户模块 模块

// API 统一管理 ,引入api请求
import {
    MockUserAddress,
    MockUserOrder,
    reqOrderInfo
} from '@/api/index'

const trade = {
          // 开启命名空间
          namespaced:true,
  
          // 准备 actions---用于响应组件中的动作
          /* 
              commit参数采用解构赋值    
           */
          actions : {
             // 获取用户订单送货地址信息
             async userAddressInfo({commit}){
               // mock的数据，
               let result = await MockUserAddress()
              //  let result = await reqAddressInfo()
              
                 // 判断状态是否等于200, 200表示成功
               if(result.data.code == 200){
                 commit("USERADDRESSINFO",result.data.data)
               }
             },

             
             // 获取交易订单信息
             async userOrderInfo({commit}){
                 let result = await MockUserOrder()
                //let result = await reqOrderInfo()
                 
                  if(result.data.code == 200){
                    commit("USERORDERINFO",result.data.data)
                  }
             }

          },
          // 准备 mutations---用于操作数据(state)
          mutations : {
            USERADDRESSINFO(state,data){
                state.address = data
            },

            USERORDERINFO(state,data){
                state.orderInfo = data
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
             address:[],
             orderInfo:{}
          }
}
    
export default trade