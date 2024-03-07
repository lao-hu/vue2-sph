<template>
  <div class="type-nav">
    <!-- 
      事件委托(事件委派)，把鼠标移除事件委托给祖先元素
     -->
    <div 
    class="container"
    @mouseleave="leaveShow"
    @mouseenter="enterShow" 
    >
      <h2 class="all" >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      
      </nav>
      <!-- 
        三级联动

        transition 封装的组件，制作过渡动画
        
       -->
       
      <transition name="sort" >
        <div class="sort" v-show="show" >
          <div class="all-sort-list2">
            <!--    
              goSearch 利用了事件委派，把原本a标签元素点击事件，委托了父元素
              编程式导航+事件委派
            -->
            <div class="item" 
            v-for="(result,index) in categoryList" 
            :key="result.categoryId"
            @click="goSearch"  
            >
              <!-- 一级分类 -->
              <h3 
              @mouseenter="changeIndex(index)"
              :class="{bg1:currentIndex === index}"
              >
                <a 
                :data-categoryName="result.categoryName"
                :data-category1Id="result.categoryId"
                >
                  {{result.categoryName}}
                </a>
              </h3>
              <div 
              class="item-list clearfix" 
              v-show="currentIndex === index"
              >
                <!-- 二级分类 与三级分类地方 -->
                <div 
                class="subitem" 
                v-for="res in result.categoryChild" :key="res.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a 
                        :data-categoryName="res.categoryName"
                        :data-category2Id="res.categoryId"
                      >{{res.categoryName}}</a>
                    </dt>
                    <dd>
                      <em 
                      v-for="r in res.categoryChild" :key="r.categoryId"
                      >
                        <a 
                          :data-categoryName="r.categoryName"
                          :data-category3Id="r.categoryId"
                        >{{r.categoryName}}</a>
                      </em>
                    
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
          </div>
        </div>
	    </transition>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import {mapState} from "vuex"

// 按需引入 lodash的throttle 函数 (节流函数)
import throttle from "lodash/throttle"


export default {
  name: "TypeNav",

  data(){
    return {
        // 储存用户鼠标移动的索引值
        currentIndex : -1,
        show:true
    }
  }
  ,computed:{
    /* 
      开启了命名空间，
      mapState辅助函数在使用的时候必须加上，模块名称

      mapState('模块名', ['xxx'])
    */
    ...mapState("home",{
      /* 
        state参数就是，home模块中的数据
      */
      categoryList:state => state.categoryList
    })
  },
  methods:{
    //修改鼠标移动的索引值
    // _.throttle 节流函数
    changeIndex:throttle(function(index){
      /* 
          正常情况:(用户慢慢操作)，鼠标进入，每一个一级分类都会触发，都会触发鼠标进入事件

          非正常情况:(用户操作过快，刷的一下)：
            本来应该全部的一级分类都触发，但是经过测试只有部分触发，
            就是由于用户速度过快，导致浏览器反应不过来，如果当前回调函数中有大量业务
            有可能导致卡顿现象
      
      */
      this.currentIndex = index
       
    },200),

    // 进行路由导航跳转，这里利用 事件委派
   
    goSearch(e){
    /* 
      这里的跳转可以利用 编程式导航+事件委派

      利用事件委派会出现的问题：
        1. 怎么知道点击的a标签
        2. 怎么传递参数(如:标签名字，标签id)
    */ 
     

     /* 
        a标签上有自定义属性 data-categoryName。可以用来判断是否是a标签
     */
     //获取当前元素
      let element = e.target
      /* 
         通过元素的dataset属性，获取自定义属性,dataset返回的是一个对象

         在通过解构赋值的方式，获取自定义属性的值
      */
      let {categoryname,category1id,category2id,category3id} = element.dataset

      // 判断是否点击的a标签，
      if(categoryname){
        // 整理路由参数
        let searchQuery = {name:"search",query:{categoryName:categoryname},params:{}}
          // 区分 一级分类id，二级分类id，三级分类id

          if(category1id)
          {
            // 一级分类id
            searchQuery.query.category1Id = category1id

          }else if(category2id){
            // 二级分类id
            searchQuery.query.category2Id = category2id

          }else if(category3id){
            //三级分类id
          searchQuery.query.category3Id = category3id

          }
       
          // 判断是否有params 参数，如果有添加上params参数
          if(this.$route.params){
            searchQuery.params = this.$route.params
          }
          // 编程式路由跳转
          this.$router.push(searchQuery)
      }
    },
    enterShow(){
      this.menuShow(true)
    },
    leaveShow(){
      this.currentIndex = -1
       this.menuShow()
    },
    
    // 菜单展示隐藏
    menuShow(isshow=false){
     
          // 如果是search路由下,三级联动菜单显示
      if(this.$route.name == "search"){
        this.show = isshow
      }else if(this.$route.name == "detail"){
        // 如果是detail路由下，三级联动将自动隐藏
        this.show = isshow
      }
    }
  },

  // 组件挂载完毕，可以向服务器发送请求
  mounted(){
       this.menuShow()
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
           // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;

                  a{
                    cursor: pointer;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;

                  a{
                    cursor: pointer;
                  }
                  }
                }
              }
            }
          }

         /*  &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .bg1{
          background-color: #22afd3;
          color: #fff;
        }
      }
    }

    // 过渡样式动画
      /* 进入的起点 , 离开的终点 */
    .sort-entry,.sort-leave-to{
      height: 0;
    }
    /* 进入的终点 , 离开的起点*/
    .sort-entry-to,.sort-leave{
      height: 461px;
    }
    /* 整个进入的过程中  */
    .sort-entry-active{
      transition: all 1s linear;
    }
  }
}

</style>