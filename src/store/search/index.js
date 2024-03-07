// Vuex search 模块

// API 统一管理 ,引入api请求
import {
  reqSearchInfo
} from '@/api/index'

const search = {
      // 开启命名空间
      namespaced:true,
      // 准备 actions---用于响应组件中的动作
      /* 
          commit参数采用解构赋值    
       */
      actions : {
         // 获取搜索商品数据,
         async searchList({commit},value={}){
             
            let result = await reqSearchInfo(value)

              // 判断状态是否等于200
            if(result.data.code == 200){
              commit("SEARCHLIST",result.data.data)
            }
         }
      },

      // 准备 mutations---用于操作数据(state)
      mutations : {
        SEARCHLIST(state,value){
          state.searchList = value
        }
      },

      /* 
        准备 getters -- 用于将state进行加工,并且需要组件间复用时可以使用
        相当于跨组件的 computed 计算属性，

        主要作用就是：为了简化数据而生的
      */
      getters:{
        
        // 是商品列表，  
        goodsList(state){
           return state.searchList.goodsList || {}
        },

        // 品牌
        trademarkList(state){
          return state.searchList.trademarkList || {}
        },

        // 商品属性：网络制式，摄像头像素，等
        attrsList(state){
          return state.searchList.attrsList || {}
        }
      },

      // 准备 state---用于存储数据
      //  注意： 这里的属性值不能瞎写, 得看服务器返回的数据格式是什么
      state:{
       

          // 搜索商品数据
          searchList:{}
      }
}

export default search