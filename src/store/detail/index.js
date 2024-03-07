// Vuex detail 模块, 商品详情模块


// API 统一管理 ,引入api请求
import {
    reqGoodsDetail,
    reqAddOrUpdateShopCart
  } from '@/api/index'
  
const detail = {
        // 开启命名空间
        namespaced:true,
        // 准备 actions---用于响应组件中的动作
        /* 
            commit参数采用解构赋值    
         */
        actions : {
           // 获取商品详情数据,
           async goodsInfo({commit},id){
               
              let result = await reqGoodsDetail(id)
  
                // 判断状态是否等于200
              if(result.data.code == 200){
                commit("GOODSINFO",result.data.data)
              }
           },

           /* 
             添加到购物车(对已有物品进行数量改动),
             这里只是一个异步请求，不需要返回数据
           */
           async addOrUpdateShopCart({commit},{skuId,skuNum}){
               let result = await reqAddOrUpdateShopCart(skuId,skuNum)

                 // 判断状态是否等于200, 200表示成功
                 if(result.data.code == 200){
                    return result.data.message
                 }else{
                    // 加入购物车失败
                    return Promise.reject(new Error("faile"))
                 }
           }
        },
  
        // 准备 mutations---用于操作数据(state)
        mutations : {
            GOODSINFO(state,data){
            state.goodsInfo = data
          }
        },
  
        /* 
          准备 getters -- 用于将state进行加工,并且需要组件间复用时可以使用
          相当于跨组件的 computed 计算属性，
  
          主要作用就是：为了简化数据而生的
        */
        getters:{
          // 商品导航分类信息
          categoryView(state){
             return state.goodsInfo.categoryView || {}
          },
          // 商品主要信息
          skuInfo(state){
            return state.goodsInfo.skuInfo || {}
          },

          //商品配置信息 
          spuSaleAttrList(state){
            return state.goodsInfo.spuSaleAttrList || {}
          },

        },
  
        // 准备 state---用于存储数据
        //  注意： 这里的属性值不能瞎写, 得看服务器返回的数据格式是什么
        state:{
          // 商品详情数据
          goodsInfo:{},
          
        }
  }
  
  export default detail