/**
 * Vuex home 模块
 * @date 2023/11/2 - 20:41:34
 * @author 老胡
 */


// API 统一管理 
import {
  reqCategoryList,
  MockGetBannerList,
  MockGetFloorsList
} from '@/api/index'



/**
 * @type {Vuex}
 */

// Vuex home模块
const home = {
     // 开启命名空间
     namespaced:true,
      /* 
      准备 actions---用于响应组件中的动作
        commit参数采用解构赋值
      */
  actions:{
     // 通过接口API函数调用，向服务器发送请求，获取服务器数据
    async categoryList({commit}){
      let result = await reqCategoryList()
          // 判断状态是否等于200
      if(result.data.code == 200){
        commit("CATEGORYLIST",result.data.data)
      }
    },
  

    // 通过mockjs,首页Banner获取数据
    async bannerList({commit}){
      let result = await MockGetBannerList()
    
        // 判断状态是否等于200
        if(result.data.code == 200){
          commit("BANNERLIST",result.data.data)
        }  
    },


    async floorsList({commit}){
      let result = await MockGetFloorsList()
   
     // 判断状态是否等于200
      if(result.data.code == 200){
        commit("FLOORSLIST",result.data.data)
      }  
    } 
  },
  // 准备 mutations---用于操作数据(state)
  mutations:{
    CATEGORYLIST(state,data){
      state.categoryList = data
    },

    BANNERLIST(state,data){
      state.bannerList = data
    },

    FLOORSLIST(state,data){
      state.floorsList = data
    }
  },

/* 
  准备 getters -- 用于将state进行加工,并且需要组件间复用时可以使用
  相当于跨组件的 computed 计算属性

  主要作用就是：为了简化数据而生的
*/
  getters:{
 
  },

  // 准备 state---用于存储数据
  /* 
    state 数据默认值别瞎写, 服务器返回的数组，默认值就是数组，服务器返回的是对象，默认值就是对象
  */
  state:{
    // 三级联动数据
    categoryList:[],
    // mock模拟的 banner数据
    bannerList:[],
    // mock模拟的 floors数据
    floorsList:[]
  }
}

export default home
