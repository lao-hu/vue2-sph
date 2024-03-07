/* 
注意：
    css里面可以使用 路径映射，记得在@符号前面加 ~
        如： ~@/assets/images/bg1.png

*/

// 引入 vue 
import Vue from 'vue'
// 引入 App 
import App from './App.vue'

// 图片懒加载
import VueLazyload from 'vue-lazyload'

// 引入 图片
import moren from './assets/moren.jpg';

Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:moren
})

// VueRoute
import router from '@/router';

// 引入 vuex 管理文件
import store from '@/store/index';


// 引入 vee-validate
import "@/plugins/vee-validate";


/* 
 全局组件:
  商品分类导航三级联动
*/
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name,TypeNav)

// 全局组件 轮播图
import Carousel from "@/components/Carousel"
Vue.component(Carousel.name,Carousel)

// 全局组件 分页器
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name,Pagination)

// element-ui 饿了吗UI
import { Button, MessageBox} from 'element-ui';
// 第一种注册方式，全局注册
Vue.component(Button.name, Button);

// 第二种注册方式，挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;



/* 
引入MockServe.js 让mockjs执行一次
*/
import "@/mock/mockServe"

// 引入swiper样式
import "swiper/css/swiper.min.css";

// 统一接口api文件夹里面全部请求函数
import * as api from '@/api'; 



new Vue({
  render: h => h(App),
  c{
    /** 安装全局事件总线, $bus 就是当前应用的vm */
    Vue.prototype.$bus = this;
    Vue.prototype.$api = api
  },
  // 注册路由, 组件上面有$route,$routes 属性
  router,
  // 注册 vuex, 组件上面有$store 属性
  store
}).$mount('#app')

