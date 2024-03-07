<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="list in cartList" :key="list.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="list.isChecked == 1"
              @change="CartChecked(list.skuId,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="list.imgUrl" />
            <div class="item-msg">{{ list.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ list.skuPrice }}</span>
          </li>
          <!-- 
             产品数量
           -->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', list)"
            >-
            </a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="list.skuNum"
              @change="handler('change', list, $event)"
            />

            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', list)"
              >
              +
              </a>

          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ list.skuPrice * list.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShop(list.skuId)">删除</a>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartList.length > 0 "  @change="changeAllCheck"/> 
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllChecked(cartList)">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a  href="###" >结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入map辅助函数
import { mapGetters } from "vuex";

// 按需引入 lodash的throttle 函数 (节流函数)
import throttle from "lodash/throttle"

export default {
  name: "ShopCart",
  data() {
    return {
      num: "",
    };
  },

  computed: {

    //  mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
    ...mapGetters("shopcart", ["cartList"]),
 
    // 计算全部总价
    totalPrice() {
      // 声明一个变量接收总价
      let sum = 0;

      //  遍历 this.cartList 对象
      this.cartList.forEach((ele) => {
        // 计算每条商品数量*单价
        sum += ele.skuNum * ele.skuPrice;
      });
      return sum;
    },


    // 判断是否【全选选择框】勾选
    isAllCheck() {
      // every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试
      // 判断所有的
      return this.cartList.every((ele) => ele.isChecked == 1);
    },

  },

  // 方法
  methods: {

    // 获取个人数据
    getData() {
      // 派发一个 vuex的action, 通过Vuex发起请求，将数据存储到仓库中
      this.$store.dispatch("shopcart/shopCartList");
    },


    // 修改购物车购买某个产品的数量
    /* 
      type: 区分点击的是那个元素
      list: 点击的是那个产品
      event: 事件对象
    */
    handler:throttle( async function(type, list, event){
       // 定义一个参数 表示返回产品数量
       let goodsNum = 0

      /* 
         goodsNum: 
                 正数表示数量增加，负数表示数量减少，0表示数量不变
      */
      switch (type) {
        case "add":
            // 加一
            goodsNum = 1

        break;
        case "mins":
         
            // 判断产品数量是否大于1 ,如果大于1 就是负1，否则就 0
            goodsNum =  list.skuNum > 1 ? - 1 : 0 

        break;
        case "change":
              // 用户输入的值*1， (包含非数字字符) or 非数字字符 * 数字字符 = NaN
            let value = event.target.value * 1;
        
              // 如果是NaN 或 负数 ，0表示数量不变
            if (isNaN(value) || value < 1) {
            goodsNum = 0;
            
            } else {
              // 如果是浮点数就取整 - 产品本身的数量
              // 列如：  parseInt(18.8) -  14 = 8
            goodsNum = parseInt(value) - list.skuNum;
            }
          
        break;
      }

      try {
         // 成功
         // 派发一个 vuex的action, 通过Vuex发起请求
          await this.$store.dispatch("detail/addOrUpdateShopCart",{
              skuId:list.skuId,
              skuNum:goodsNum
          })
          // 再次发送请求，更新购物车列表
          this.getData()
        }catch (error) {
          //   服务器存储失败，提示错误
          alert(error.message)
        } 
    },500),

    
    // 删除购物车的商品
    async deleteShop(skuId){
        try {

          // 成功
         // 派发一个 vuex的action, 通过Vuex发起请求
          await this.$store.dispatch("shopcart/deleteCart",skuId)

          // 再次发送请求. 更新购物车列表
          this.getData()
        } catch (error) {
           //   服务器存储失败，提示错误
          alert(error.message)
        }
    },

    // 修改选中状态
    async CartChecked(id,event){
            // 0 表示 取消选中，1表示选中
          let isChecked = event.target.checked ? 1 : 0;
        try {
          // 派发一个 vuex的action, 通过Vuex发起请求
          await  this.$store.dispatch("shopcart/checkCart",{id,isChecked})

            // 再次发送请求. 更新购物车列表
            this.getData()
          } catch (error) {
            //   服务器存储失败，提示错误
            alert(error.message)
          }
        
      },

      // 删除选中产品
      async deleteAllChecked(cartList){
        try {
            // 派发一个 vuex的action, 通过Vuex发起请求
            await this.$store.dispatch("shopcart/deleteAllCheckedCart")
              // 再次发送请求. 更新购物车列表
            this.getData()
        } catch (error) {
            //   服务器存储失败，提示错误
            alert(error.message)
        }

      },


      // 修改全部选中商品
    async changeAllCheck(e){
        // 0 表示 取消选中，1表示选中
        let checked = e.target.checked ? 1 : 0;

        try {
              // 派发一个 vuex的action, 通过Vuex发起请求
         await this.$store.dispatch("shopcart/cartAllChecked",{checked})
              // 再次发送请求. 更新购物车列表
            this.getData()
        } catch (error) {
            //   服务器存储失败，提示错误
            alert(error.message)
        }
       // this.$store.dispatch("shopcart/cartAllChecked",{checked})
     }
  },
  // 组件加载完毕
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
            padding: 7px 0;
            font-size: 15px;
            text-align: center;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
            width: 84px;
            display: block;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      span {
        vertical-align: middle;
         padding: 0 5px;
        display: inline-block;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>