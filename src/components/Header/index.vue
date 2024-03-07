<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户未登录 -->
          <p v-if="!username">
            
            <span>请</span>
             <!-- 声明式导航 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
         
          </p>
          <!-- 用户已登录 -->
          <p v-else>
            
            <a href="javascript:;">{{username}}</a>
            <a class="register" @click="logout">登录退出</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          
           <router-link to="/home">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
       <!-- 声明式导航 -->
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      
      <div class="searchArea">
          <h1>【老胡学习练手之Vue框架技术】  </h1>
        <form class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keyup.enter="goSearch"
          />
          <button 

          class="sui-btn btn-xlarge btn-danger" 
          type="button" @click="goSearch" 

          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
// 引入 vuex的辅助函数
import {mapState} from 'vuex'
export default {
    name:"",
    data(){
      return {
        keyword:""
      }
    },
    computed:{
    /* 
          开启了命名空间，
          mapState辅助函数在使用的时候必须加上，模块名称

          mapState('模块名', ['xxx'])
        */
        ...mapState("user",{
          /* 
            state参数就是，search模块中的数据
            
            username用户名
          */
          username:state => state.userinfo.name
        })
    }
    ,
    methods:{
      // 搜索按钮的回调函数：需要向search路由进行跳转
      goSearch(){
       
      // 整理路由参数
       let searchQuery = {name:"search",query:{},params:{}}
       
       // 判断是否 query 参数
       if(this.$route.query){
          searchQuery.query = this.$route.query
       }

      // 把搜索的关键词添加到参数里面
      if(this.keyword){
        searchQuery.params.keyword = this.keyword
      }
      

        // 编程式路由跳转
         this.$router.push(searchQuery) 
   
      },
      
      // 退出登录
    async  logout(){
      try {
          //  派发一个 vuex的action, 通过Vuex发起请求
          await this.$store.dispatch("user/userLogout")
       this.$router.push("/home")
      } catch (error) {
          //   服务器存储失败，提示错误
          alert(error.message)
      }
      
      }
    },
    mounted(){
      // 通过全局事件总线清除 keyword 关键字
      this.$bus.$on("clear",()=>{

        // keyword 赋值为空
        this.keyword = ""
        
        // 判断this.$route.query参数是否存在
        if(this.$route.query){
           // 如果存在就把当前的query 参数给自己
           this.$router.push({name:"search",query:this.$route.query})
        }
    
      })

       
    }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>