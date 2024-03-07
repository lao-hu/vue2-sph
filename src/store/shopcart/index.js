// Vuex 购物车 模块

// API 统一管理 ,引入api请求
import {
    reqShopCartList,
    reqDeleteCart,
    reqCheckCart
  } from '@/api/index'
  
const shopcart = {
        // 开启命名空间
        namespaced:true,
        // 准备 actions---用于响应组件中的动作
        /* 
            commit参数采用解构赋值    
         */
        actions : {

           // 获取购物车列表数据, async 返回的是 Promise 对象
           async shopCartList({commit}){
               
              let result = await reqShopCartList()
          
                // 判断状态是否等于200
              if(result.data.code == 200){
                commit("SHOPCARTLIST",result.data.data)
              }
           },
          
           // 删除购物车的商品， 这里只是一个异步请求，不需要返回数据
           // async 返回的是一个Promise 对象
           async deleteCart({commit},skuId){
              let result = await reqDeleteCart(skuId)

              // 判断状态是否等于200, 200表示成功
              if(result.data.code == 200){
                  return result.data.message
              }else{
                  // 加入购物车失败
                  return Promise.reject(new Error("faile"))
              }
            },
          

            // 切换购物车商品选中状态, 这里只是一个异步请求，不需要返回数据
            async checkCart({commit},{id,isChecked}){
              let result = await reqCheckCart(id,isChecked)
              // 判断状态是否等于200, 200表示成功
              if(result.data.code == 200){
                  return result.data.message
              }else{
                  // 加入购物车失败
                  return Promise.reject(new Error("faile"))
              }
            },


            // 删除全部选中的商品，
            deleteAllCheckedCart(context){
              // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象

               // 定义一个数组,存储对象
               let promise_all = []

              // 获取购物车产品
              let cartList = context.getters.cartList;
              // 遍历购物车商品
              cartList.forEach(element => {
                 // 购物车商品选中状态
                if(element.isChecked == 1){
                  // 返回的 Promise 对象
                   let result = context.dispatch("deleteCart",element.skuId)
                    // 添加到数组里面
                   promise_all.push(result)
                }
              });
              /* 
                Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
                如果都成功，状态变成fulfilled， 如果有一个不成功 状态就为：rejected
              */

              return  Promise.all(promise_all)
            },

            
            // 修改全部的选中商品or 取消全选

            cartAllChecked(context,{checked}){
               // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象

               // 定义一个数组,存储对象
               let promise_all = []
              
               // 获取购物车产品
              let cartList = context.getters.cartList;
              // 遍历购物车商品
              cartList.forEach(element => {
                  // 返回的 Promise 对象, checked 1表示勾选，0表示取消勾选
                  if(element.isChecked != checked ){
                    let result = context.dispatch("checkCart",{
                      id:element.skuId,
                      isChecked:checked
                    })
                   // console.log(element);
                       // 添加到数组里面
                    promise_all.push(result)
                  }
                
              });
              /* 
                Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
                如果都成功，状态变成fulfilled， 如果有一个不成功 状态就为：rejected
              */

              return  Promise.all(promise_all)
            }

        },
        // 准备 mutations---用于操作数据(state)
        mutations : {
            SHOPCARTLIST(state,data){
                state.shopCartList = data
            }
        },
  
        /* 
          准备 getters -- 用于将state进行加工,并且需要组件间复用时可以使用
          相当于跨组件的 computed 计算属性，
  
          主要作用就是：为了简化数据而生的
        */
        getters:{
            // 获取购物数据
          cartList(state){
      
            return state.shopCartList[0] ? state.shopCartList[0].cartInfoList :[]
          }
        
        },
  
        // 准备 state---用于存储数据
        //  注意： 这里的属性值不能瞎写, 得看服务器返回的数据格式是什么
        state:{
            // 搜索商品数据
           shopCartList:[]
        }
  }
  
  export default shopcart