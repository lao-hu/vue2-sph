<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <!--  -->
      <div
        class="swiper-slide"
        v-for="(list, index) in skuImageList"
        :key="list.id"
        @click="addImageClass(index)"
        
      >
        <img :src="list.imgUrl"  :class="{active: imgIndex == index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      // 图片索引值
      imgIndex: 0,
    };
  },
  props: ["skuImageList"],
  methods:{
     // 为图片添加选中样式
    addImageClass(index){
          this.imgIndex = index
        // 触发实例身上 zoomImgUrl事件
        this.$bus.$emit("zoomImgUrl",index)
        console.log(this);
    }
  },
  watch: {
    skuImageList: {
      immediate:true,
      handler() {
        /* 
              在ListContainer组件，new Swiper 放在 mounted()函数里不行，为什么这里可以了
              因为：ListContainer 组件是在当前发送请求，动态渲染结构，(数据还没有回来，渲染结构还没结束，new Swiper就开始执行了)，
              所以在里ListContainer组件，这样写不行，

              这里可以写：
                  请求是父组件发的，父组件通过props传递过来的，结构早已经有了
            */
     
        this.$nextTick(function () {
          new Swiper(this.$refs.cur, {
            // 显示几个图片
            slidesPerView: 3,
            // 使用前进后退按钮来控制Swiper切换。
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>