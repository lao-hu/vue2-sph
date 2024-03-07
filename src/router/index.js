// 路由配置

import Vue from 'vue'
// 引入插件
import VueRouter from 'vue-router'
//安装插件VueRouter
Vue.use(VueRouter);

// 引入 路由配置对象
import routes from '@/router/route';

// 引入仓库
import store from '@/store';

// 先把VueRouter原型对象push,先保存一份
let orginpush = VueRouter.prototype.push
// 先把VueRouter原型对象replace,先保存一份
let orginreplace = VueRouter.prototype.replace


/* 
重写push
localtion ：往哪里跳转（传递哪些参数）
resolve：成功回调
reject :失败回调
*/
VueRouter.prototype.push = function (location, resolve, reject) {

  if (resolve && reject) {
    // 这里其实还是用的 Vue.prototype.pus 方法
    orginpush.call(this, location, resolve, reject);
  } else {
    orginpush.call(this, location, () => { }, () => { });
  }
}

/* 
重写replace
localtion ：往哪里跳转（传递哪些参数）
resolve：成功回调
reject :失败回调
*/
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // 这里其实还是用的 Vue.prototype.pus 方法
    orginreplace.call(this, location, resolve, reject);
  } else {
    orginreplace.call(this, location, () => { }, () => { });
  }
}

let router =  new VueRouter({
  routes,
  /* 
    路由滚动行为：  `to` 和 `from` 都是路由对象
  */
  scrollBehavior (to, from, savedPosition) {
  // console.log("to:",to,"from",from,"savedPosition",savedPosition);
  // 设置滚动条在最上面
    return {y: 0 }
  }
});

/* 
  全局前置守卫, 
    to:即将要进入的目标 路由对象
    from: Route: 当前导航正要离开的路由
    next: 放行函数
*/
router.beforeEach(async (to,form,next) => {
  

  // 获取用户登录 ，token
  let token = store.state.user.userToken 
  // 获取用户名
  let name = store.state.user.userinfo.name

 
  // 判断登录成功的token，是否存在
  if(token){
   
     //  token 存在表示，已登录，无法跳转登录与注册页面
      if(to.path == "/login" || to.path == "/register"){
          next("/home")
        
      }else{

        // 登录了，去的非登录与注册页面

        // 如果用户名已有，就直接放行
        if(name){
        
          next()
       
        }else{
          // 如果没有就，派发一个 vuex的action 

          // 获取用户信息
            try {
              // 获取用户名成功
             
              await store.dispatch("user/userInfo")
              next()

            } catch (error) {
               // token 过期，失效，无法获取用户信息
             
               // 请求token,用户信息，
               await store.dispatch("user/userLogout")
                
                // 跳转登录页面
                next("/login")
            } 
            
           // 
        }
      }
  }else{
    // 未登录情况：

    // 未登录不能去 trade，pay paysuccess,center 等页面
    if(to.path.indexOf("/trade")!= -1 || to.path.indexOf("/pay") != -1 ||  to.path.indexOf("/center") != -1){
      
       // 跳转登录页面,把原来想去的页面，以参数的形式传递给login
       next(`/login?redirect=${to.path}`)
    }else{
      // 如果去的不是上面的那些页面就放行
      next()
    }
    
  }

})

// 创建暴露一个路由
export default router