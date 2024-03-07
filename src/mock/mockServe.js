// mock.js 模拟数据，拦截Ajax请求

// 先引入mockjs模块
import Mock from 'mockjs';

// 引入json 数据格式, 

// 把JSON数据格式引进来：
// webpack可以默认对外暴露的：图片，json

import banner from "./data/banner.json";  //  首页轮播图
import floors from "./data/floors.json";  //  首页家用电器

import userAddress from './data/userAddress.json'; // 模拟用户收货地址

// 模拟用户交易商品信息
import userOrder from './data/userOrder.json';

import myorder from './data/myorder.json';

//模拟数据
// mock()函数：第一个参数：请求地址 --------- 第二个参数是：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});

Mock.mock("/mock/floors",{code:200,data:floors});

// mock 收件人信息
Mock.mock("/mock/user/userAddress",{code:200,message:"成功",data:userAddress,ok:true})
// mock 商品订单信息
Mock.mock("/mock/user/userOrder",{code:200,message:"成功",data:userOrder,ok:true})

// mock 个人中心我的订单
Mock.mock('/mock/user/myorder/1/10',{code:200,message:"成功",data:myorder,ok:true})