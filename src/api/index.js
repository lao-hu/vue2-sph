// 统一管理API接口模块

// 引入axios(带有请求，响应的拦截器)，
import requests from './api';

// 引入mockjs模拟数据请求,mock是模拟数据，并不是真实数据
import mockRequests from "./mockAjax"


/* 
    注意: requests 可以函数调用：requests({xx:xx,...}),
    还可以 requests.get(xxx),或 requests.post(xxx)

*/
 

// mock请求----开始

//mock是模拟数据，并不是真实数据
// 获取首页banner，（首页轮播图）
export const MockGetBannerList = () => mockRequests.get("/banner")

// 获取 首页家用电器的数据
export const MockGetFloorsList = () => mockRequests.get("/floors")

// 获取收货地址
export const MockUserAddress = () => mockRequests.get("user/userAddress")

// 结算页面的商品数据
export const MockUserOrder = () => mockRequests.get("user/userOrder")


//
export const MockMyOrder = (page,limit) => mockRequests.get(`user/myorder/${page}/${limit}`)
// mock请求----结束



//三级联动
/* 
 /api/product/getBaseCategoryList ， get  ，无参数
*/ 

export const reqCategoryList = () => requests({url:"product/getBaseCategoryList",method:'get'})

/* 
  搜索商品接口：
        请求地址：/api/list
        请求方式： post

   data至少是一个空对象
*/
export const reqSearchInfo = (data) => requests.post("list",data)

/* 
    商品详情接口：
        请求地址： /api/item/{ skuId }
        请求方式： get
        请求参数：
            id:商品id
          
*/
export const reqGoodsDetail = (id) => requests.get(`item/${id}`)


/* 
  添加到购物车(对已有物品进行数量改动)
        请求地址：/api/cart/addToCart/{ skuId }/{ skuNum }
        请求方式：post
        请求参数：
            skuID:商品id
            skuNum:
                商品数量
                正数代表增加
                负数代表减少
*/
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests.post(`cart/addToCart/${skuId}/${skuNum}`)

/* 
  获取购物车列表:
          请求地址 :/api/cart/cartList
          请求方式：GET
          请求参数：无
*/

export const reqShopCartList = () => requests.get(`cart/cartList`)

/* 
     删除购物车商品
            请求地址: /api/cart/deleteCart/{skuId}
            请求方式：DELETE
            请求参数：skuID  商品id
*/

export const reqDeleteCart = (skuId) => requests.delete(`cart/deleteCart/${skuId}`)

/* 
        切换商品选中状态
            请求地址：/api/cart/checkCart/{skuID}/{isChecked}
            请求方式：GET
            请求参数：
                skuID:商品id
                isChecked:
                    商品选中状态
                    0代表取消选中
                    1代表选中
*/

export const reqCheckCart = (id,isChecked) => requests.get(`cart/checkCart/${id}/${isChecked}`)

/* 
   获取验证码，
   请求地址：/api/user/passport/sendCode/{phone}
   请求方式：GET
   请求参数：
            phone - 手机号

*/
export const reqSendCode = (phone) => requests.get(`user/passport/sendCode/${phone}`)


/* 
    注册用户
        请求地址：/api/user/passport/register 
        请求方式：POST
        请求参数：
            phone - 手机号
            password - 密码
            code - 验证码
*/

export const reqUserRegister = (data) => requests.post(`user/passport/register`,data)

/* 
    登录接口
        请求地址：/api/user/passport/login
        请求方式：POST
        请求参数：
            phone    = 用户名 
            password = 密码
*/

export const reqUserLogin = (data) => requests.post(`user/passport/login`,data)

/*
   获取用户信息 需要带 token
        请求地址：api/user/passport/auth/getUserInfo
             请求方式：GET
*/
export const reqUserInfo = () => requests.get("user/passport/auth/getUserInfo")

/* 
     退出登录
        请求地址：/api/user/passport/logout
        请求方式：GET
        请求参数：无

*/
export const reqLogout = () => requests.get("user/passport/logout")

/* 

注意：当前接口已失效！！！

    获取用户地址信息
        请求地址：/api/user/userAddress/auth/findUserAddressList
        请求方式：GET
        请求参数：无
*/

export const reqAddressInfo = () => requests.get(`user/userAddress/auth/findUserAddressList`)


/* 
注意：当前接口已失效！！！

获取订单交易页信息: 
    请求地址：/api/order/auth/trade
        请求方式：GET
        请求参数：无

*/

export const reqOrderInfo = () => requests.get(`order/auth/trade`)


/* 
注意：当前接口已失效！！！

    提交订单：
        请求地址： /api/order/auth/submitOrder?tradeNo={tradeNo}
        请求方式：POST
        请求参数： object一个对象
*/

export const reqSubmitOrder = (tradeNo,data) => requests.post(`order/auth/submitOrder?tradeNo=${tradeNo}`,data)


/* 
注意：当前接口已失效！！！

 获取订单支付信息
    请求地址：/api/payment/weixin/createNative/{orderId}
    请求方式：GET
    参数类型

*/
export const reqPayInfo = (orderId) => requests.get(`payment/weixin/createNative/${orderId}`)


/* 
    查询支付订单状态
        请求地址：/api/payment/weixin/queryPayStatus/{orderId}
        请求方式：GET
 
*/
export const reqPayStatus = (orderId) => requests.get(`payment/weixin/queryPayStatus/${orderId}`)


/* 
    获取我的订单列表
        请求地址：/api/order/auth/{page}/{limit}
        请求方式：GET
        参数类型：
*/

export const reqCenterInfo = (page,limit) => requests.get(`order/auth/${page}/${limit}`)