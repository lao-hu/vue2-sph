/*
 vuex:
    0.在Vue中实现集中式状态（数据）管理的一个Vue插件，
      对Vue应用中多个组件的共享状态进行集中式管理（读/写），也是一种组件间通信方式，适用于任意组件间通信
    
      1.state 统一定义管理公共数据

      2.mutations: 使用它来修改数据

      3.getters: 类似于vue中的计算属性

      4.actions: 类似于methods,用于发起异步请求,比如axios

      5.modules: 模块拆分

 */

/* 该文件用于创建Vuex中最核心的 store */
// 引入 vue 
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 安装Vuex
Vue.use(Vuex)

// 引入home 模块
import home from '@/store/home'

// 引入search 模块
import search from '@/store/search';

// 引入商品详情模块 detail
import detail from '@/store/detail';

// 引入 商品购物车模块
import shopcart from '@/store/shopcart';

// 引入用户模块（包含登录和注册） 
import user from '@/store/user';

// 引入结算页面
import trade from '@/store/trade';

// 暴露store 
export default new Vuex.Store({
  
    /* 
    modules:
        为了避免在一个复杂的项目 state 中的数据变得臃肿，
        Vuex 允许将 Store 分成不同的模块，
        每个模块都有属于自己的 state，getter，action，mutation
    */
    modules:{
          home,
          search,
          detail,
          shopcart,
          user,
          trade
    }
});
