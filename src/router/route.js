
// 路由懒加载

/* 
  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
  如果我们能把不同路由对应的组件分割成不同的代码块，
  然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/


// 动态引入路由组件
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')

// 订单交易
const Trade = () => import('@/pages/Trade')

// 支付
const Pay = () => import('@/pages/Pay')
// 支付成功
const PaySuccess = () => import( '@/pages/PaySuccess')

// 个人中心
const Center = () => import('@/pages/Center')


// 二级路由
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')


// 对外暴露配置数组
export default [
    {
        // 支付成功
        path:"/center",
        component:Center,
        // name 路由命名
        name:"center",
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
        },
        // 二级路由
        children:[
            {
                path:"myorder",
                component:MyOrder,
                // name 路由命名
                name:"myorder",
            },
            {
                path:"grouporder",
                component:GroupOrder,
                // name 路由命名
                name:"grouporder",
            },
           
            {
                // 二级路由 重定向
                path:"/center",
                redirect:"/center/myorder"
            }
        ]
    },
    {
        // 支付成功
        path:"/paysuccess",
        component:PaySuccess,
        // name 路由命名
        name:"paysuccess",
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
        }
    }
    ,{
        // 支付
        path:"/pay",
        component:Pay,
        // name 路由命名
        name:"pay",
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
        },
        /* 
           路由独享守卫:
                to:即将要进入的目标 路由对象
                from: Route: 当前导航正要离开的路由
                next: 放行函数
        */
        beforeEnter:(to, from, next) => {
              // 如果你想去支付页面，必须是从交易结算页面进来
              if(from.path == "/trade"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        // 订单交易
        path:"/trade",
        component:Trade,
        // name 路由命名
        name:"trade",
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
        },
        /*  路由独享守卫:
                to:即将要进入的目标 路由对象
                from: Route: 当前导航正要离开的路由
                next: 放行函数
        */
        beforeEnter:(to, from, next) => {
            // 如果你想去交易页面，必须是从购物车页面进来
            if(from.path == "/shopcart"){
                next()
            }else{
                next(false)
            }
        }
    
    }
    ,{
        // 购物车组件
        /* 
            :id , 使用占位符声明接收 params  参数
            ?号 表示param参数可传可不传
        */
        path: "/shopcart",
        component: ShopCart,
        // name 路由命名
        name:"shopcart",
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
            
            
        }
    },
    {
        // 商品详情组件
        /* 
            :id , 使用占位符声明接收 params  参数
            ?号 表示param参数可传可不传
        */
        path: "/detail/:id",
        component: Detail,
        // name 路由命名
        name:"detail",
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
            
            isCategoryList:true
        }
       
    },
    {
        // 添加购物车组件
        /* 
            :id , 使用占位符声明接收 params  参数
            ?号 表示param参数可传可不传
        */
        path: "/addcartsuccess",
        component: AddCartSuccess,
        // name 路由命名
        name:"addcartsuccess",
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
            
        }
        
    },

    {
        // 搜索 组件

        // 使用占位符声明接收 params  参数
        // ? 表示param参数可传可不传
        path: "/search/:keyword?",
        component: Search,
        // name 路由命名
        name: "search",
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
             
             isCategoryList:true
        },
    
         /* 
           1. props 配置的一种写法 ，props 值为对象，该对象中所有的key-value的组合最终都会通过props 传给Detail组件
           1.1 props:{a:1,b:100},

           2.  props 配置的二种写法 ，props 值为true，则把路由收到的所有params参数 通过props 传给Detail组件
           2.1 props:true,
           
           3. props 配置的三种写法 ，props 值为函数，该函数返回对象中每一组key-value 都会 通过props 传给Detail组件
           props($route){
                  return {
                      id:$route.query.id,
                       title:$route.query.title,
                       content:$route.query.content
                }
            },
        */
        
    }
    
    ,{
        // 首页组件
        path: "/home",
        component: Home,
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: true,
             
            isCategoryList:true
        }
    },

    {
        // 登录 组件
        path: "/login",
        component: Login,
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: false,
             
             
        }
    },

    {
        // 注册组件
        path: "/register",
        component: Register,
        // name 路由命名
        name: "register",
        // 路由元信息
        meta: {
            // show 控制Footer组件的显示隐藏
            show: false,
             
             
        }
    },

    /* 
      重定向默认访问 /home页面      
    */
    {
        path: "/",
        redirect: "/home"
    }
]