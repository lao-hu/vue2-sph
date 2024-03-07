<template>
  <div class="outer">
    <Header></Header>
    <!-- 路由出口地方 -->
    <router-view></router-view>
    <!-- 
      Footer 组件，只有在 home search 组件 才显示
     -->
    <Footer v-show="true"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    /* 
      出于性能问题的考虑，把 this.$store.dispatch("home/categoryList") 放到App.vue 组件里面很合适
    */
    // 派发一个 vuex的action , 获取三级联动的api
  
       this.$store.dispatch("home/categoryList")
  
  }
}
</script>

<style>

</style>
