<template>
  <div>
    <!-- 三级联动菜单导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--
          面包屑导航
        -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名称的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
        
            <!-- 品牌信息  -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 
              遍历商品属性信息 
              -->
            <li class="with-x" v-for=" (props,index) in searchParams.props" :key="index">
              {{ props.split(":")[1] }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--
          品牌信息，这里使用自定义事件是为了练习
        -->
        <SearchSelector 
        @trademarkInfo="trademarkInfo" 
        @attrsInfo="attrsInfo"
        />

        <!-- 详情 -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <!-- 
                  示例：1:desc,1:asc，

                  判断 order 里面是否有 1 如果有就添加class 类
                 -->
                <li :class="{active:searchParams.order.indexOf(1) != -1 }" @click="changeOrder(1)">
                  <a href="javascript:;">综合
                    <!-- 判断 order 里面是否有 1 那就显示 箭头  -->
                    <template v-if="searchParams.order.indexOf(1) != -1">
                          <!-- 判断 order 里面是否包含 asc，有就显示上箭头 -->
                         <span v-show="searchParams.order.indexOf('asc') != -1">⬆</span>
                         <!-- 判断 order 里面是否包含 desc，有就显示下箭头 -->
                         <span v-show="searchParams.order.indexOf('desc') != -1">⬇</span>
                    </template>

                  </a>
                </li >
                <!-- 

                 示例： 2:desc,2:asc，
                 
                 判断 order 里面是否有 2 如果有就添加class 类
                 -->
                <li :class="{active:searchParams.order.indexOf(2) != -1 } " @click="changeOrder(2)">
                  <a href="javascript:;">价格 
                    <!-- 判断 order 里面是否有 2 那就显示 箭头  -->
                    <template v-if="searchParams.order.indexOf(2) != -1">
                           <!-- 判断 order 里面是否包含 asc，有就显示上箭头 -->
                         <span v-show="searchParams.order.indexOf('asc') != -1">⬆</span>
                         <!-- 判断 order 里面是否包含 desc，有就显示下箭头 -->
                         <span v-show="searchParams.order.indexOf('desc') != -1">⬇</span>

                    </template>
                  </a>
                </li>
               
              </ul>

            </div>
          </div>

          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`" >
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link  :to="`/detail/${goods.id}`" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{goods.title}}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
             
            </ul>
          </div>

          <!-- 分页器 -->
          <Pagination 
          :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize"
          :total="total"
          :continues="5"
          @getpageNo="getpageNo"
           />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入子组件
import SearchSelector from "./SearchSelector/SearchSelector"

// 引入 vuex的辅助函数
import {mapGetters,mapState} from 'vuex'

export default {
  name: "Search",
  components: {
    SearchSelector,
  }
  ,data(){
    return {
        // 每次请求服务器携带的参数
       searchParams:{
          // 一级分类id
          category1Id:"",  
           // 二级分类id
          category2Id:"", 
          // 三级分类id
          category3Id: "", 
          // 分类名称
          categoryName: "", 
           // 搜索关键词
          keyword: "",    
          /* 
            排序方式 
            1: 综合,2: 价格 asc: 升序,desc: 降序  
            示例: "1:desc"
          */
          order: "1:desc",      
          // 第几页，这里默认第一页
          pageNo: 1,    
          // 每页几条数据
          pageSize: 5, 
        /* 
         商品属性的数组: ["属性ID:属性值:属性名"]
         示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        */
          props: [],
         /* 
         品牌: "ID:品牌名称"
         示例: "1:苹果"
         */
          trademark: ""
       }
    }
  }
  ,computed:{
    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
    ...mapGetters("search",['goodsList']),
    
     /* 
      开启了命名空间，
      mapState辅助函数在使用的时候必须加上，模块名称

      mapState('模块名', ['xxx'])
    */
    ...mapState("search",{
      /* 
        state参数就是，search模块中的数据
        
        获取一共有多少条数据
      */
      total:state => state.searchList.total
    })
  }


  ,methods:{
    // 获取数据
     getData(){
        // 派发一个 vuex的action, 通过Vuex发起ajax请求，将数据存储到仓库中
        this.$store.dispatch("search/searchList",this.searchParams);
     },

     // 删除面包屑分类名称标签
    removeCategoryName(){
  
      /* 
        把属性的值设置为空的话，发起请求的时候，还是携带该属性，

        而把属性的值设置成undefined, 发起请求的时候就不会携带该属性
      */
      this.searchParams.categoryName = undefined
    
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      
      // 重启在再次发起请求
      this.getData()

      // search跳search ，修改地址栏信息
      if(this.$route.params){
        this.$router.push({name:"search",params:this.$route.params})
      } 
    },

    // 删除keyword关键字的标签
    removeKeyword(){
      
      /* 
        把属性的值设置为空的话，发起请求的时候，还是携带该属性，

        而把属性的值设置成undefined, 发起请求的时候就不会携带该属性
      */
       this.searchParams.keyword = undefined

       // 重启在再次发起请求
      this.getData()
	    
      // 通知Header组件清除关键字
	   this.$bus.$emit("clear")
    },

    // 删除品牌标签
    removeTrademark(){
      this.searchParams.trademark  = undefined
     // 在发起请求获取search列表进行展示
      this.getData()
    },



    // 删除商品属性信息
    removeProps(index){
      this.searchParams.props.splice(index,1)
     // 在发起请求获取search列表进行展示
     this.getData()
    },


    //修改order属性 ,点击是综合还是价格: 综合(1) , 价格(2)
    changeOrder(flag){
       //  分割order属性
      let orders = this.searchParams.order.split(":")
     
      // 准备新的属性
      let newOrder = "";
      // 点击的是综合
      if(flag == orders[0]){
        newOrder = `${flag}:${orders[1] == "desc" ? "asc" :"desc"}`
      }else{
        // 初次切换设定默认值是降序
       newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder 

      // 在发起请求获取search列表进行展示
      this.getData()
     
    },



    // 自定义事件方法，品牌事件回调函数
    trademarkInfo(data){
    /* 
      品牌: "ID:品牌名称"
      示例: "1:苹果"
    */
      // 拼接参数信息给属性
      this.searchParams.trademark = `${data.tmId}:${data.tmName}`
      // 在发起请求获取search列表进行展示
      this.getData()
    },

    
    // 自定义事件方法，属性事件的回调函数
    /* 
    商品属性的数组: ["属性ID:属性值:属性名"]
    示例: ["2:6.0～6.24英寸:屏幕尺寸"]
    */
    attrsInfo(data){
      // 拼接参数
      let props = `${data.attrs.attrId}:${data.attr}:${data.attrs.attrName}`;

      // 数组去重
      if(this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
      }
       
      // 在发起请求获取search列表进行展示
      this.getData()
    },

    //  自定义事件，当前页的回调函数

    getpageNo(page){
       // 整理带给服务器的参数
       this.searchParams.pageNo = page
      // 在发起请求获取search列表进行展示
      this.getData()
    }

  },


  // 数据监听：监听属性身上的属性值的变化
  watch:{
    // 监听路由信息是否发生变化
    $route(newV,oldV){
   
      // 如果路由信息发生变化， 把$route路由里面的参数，赋值给searchParams
      Object.assign(this.searchParams,this.$route.query,this.$route.params)

      // 再次发起请求
      this.getData()

      /* 
         把属性的值设置为空的话，发起请求的时候，还是携带该属性，

        而把属性的值设置成undefined, 发起请求的时候就不会携带该属性
      */
     this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined

    }
  }

  // 声明周期函数，组件加载完毕之前执行一次 
  ,beforeMount(){

     // ES6 新增方法 Object.assign()合并对象,
     /* 
        在组件加载完毕之前，把$route路由里面的参数，赋值给searchParams
     */
     Object.assign(this.searchParams,this.$route.query,this.$route.params)

  }

  // 声明周期函数，组件加载完成
  ,mounted(){
    // 组件加载完毕，调用函数发送请求
    
    // 在发送请求之前带给服务器参数：searchParams
    this.getData()

  
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                span{
                  font-weight: bold;
                  font-size: 14px;
                }
              }
             
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      
    }
  }
}
</style>