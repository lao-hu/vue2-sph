<template>
  <div>
    <!-- 商品分类导航 -->
     <TypeNav/>
     <ListContainer/>
     <Recommend/>
     <Rank/>
     <Like/>
     <!-- 
      组件间通信方式：
        组件间通信：
                props:父子
                插槽:父子
                自定义事件:子父
                全局事件总线$bus:万能
                pubsub:万能
                Vuex:万能
                $ref:父子通信

        这里采用的是props 通信          
      -->
      <!-- 
         floor组件：数据是Home父组件给的
       -->
     <Floor v-for="result in floorsList" :key="result.id" :result="result" />

     <Brand/>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import {mapState} from "vuex"

import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
  name:"Home",
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  }
  ,
  computed:{
     /* 
      开启了命名空间，
      mapState辅助函数在使用的时候必须加上，模块名称

      mapState('模块名', ['xxx'])
    */
    ...mapState("home",{
      /* 
        state参数就是，home模块中的数据
      */
      floorsList:state => state.floorsList
    })
  },
 
  mounted(){
    // 派发一个 vuex的action, 通过Vuex发起ajax请求，将数据存储到仓库中
       this.$store.dispatch("home/floorsList");
      
      
  }
}
</script>

<style>

</style>