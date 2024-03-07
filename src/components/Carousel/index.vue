<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!-- 
                     遍历轮播图
                    -->
      <div
        class="swiper-slide"
        v-for="res in list"
        :key="res.id"
      >
        <img :src="res.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props:["list"],
  watch:{
     list:{
     immediate:true,
       handler(){
          /* 
            在ListContainer组件，new Swiper 放在 mounted()函数里不行，为什么这里可以了
            因为：ListContainer 组件是在当前发送请求，动态渲染结构，(数据还没有回来，渲染结构还没结束，new Swiper就开始执行了)，
            所以在里ListContainer组件，这样写不行，

            这里可以写：
                请求是父组件发的，父组件通过props传递过来的，结构早已经有了
          */
           this.$nextTick(function(){
             new Swiper(this.$refs.cur, {
                observer: true,
                autoplay: true,//可选选项，自动滑动
                 loop:true,  // 无限循环

                // 使用分页器导航
                pagination: {
                  el: '.swiper-pagination',
                  // 小圆点是否可以点击
                  clickable :true,
                },
                // 使用前进后退按钮来控制Swiper切换。
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              })
           })
       }
     }
  }
}
</script>