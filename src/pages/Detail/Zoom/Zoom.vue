<template>
  <div class="spec-preview" 
  @mousemove="changeMask" 
  >
      <!-- ?. 是es2020 也就是es11的写法 -->
    <img :src="skuImageList?.[imgIndex].imgUrl" />
    <div class="event"></div>
    <!-- 放大镜的大图 -->
    <div class="big">
      <!-- ?. 是es2020 也就是es11的写法 -->
      <img :src="skuImageList?.[imgIndex].imgUrl" ref="big" />
    </div>
    <!-- 放大镜色块 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      // 图片索引值
      imgIndex: 0,
   
    };
  }
  ,
  methods: {
    // 进入图片显示放大镜色块
    changeMask(e) {
  
      // 获取放大镜元素
      let mask = this.$refs.mask
      // 获取大图片元素
      let big  = this.$refs.big

      // 获取X坐标
      let x = e.offsetX - (mask.offsetWidth/2)
      // 获取Y坐标
      let y = e.offsetY - (mask.offsetHeight/2)


      if(x <= 0){
          x = 0
      }
      if(x >= mask.offsetWidth){
         x = mask.offsetWidth
      }
      if(y <= 0){
          y = 0
      }
      if(y >= mask.offsetHeight){
         y = mask.offsetHeight
      }
      //设置 放大镜色块的 style 属性值
      mask.style.top  = `${y}px`
      mask.style.left = `${x}px`

      /* 
        因为大图片是小图片的两倍，所以需要乘以2
        负的。是因为大图片需要往相反的方向移动
      */
      //
      big.style.top = `${(-y*2)}px`
      big.style.left = `${(-x*2)}px`

       // console.log("mask.offsetWidth:",mask.offsetWidth);
 
      
       //console.log("offsetY：",e.offsetY);
      //console.log("offsetX：",e.offsetX,);
    },
   
  },
  mounted() {
    // 采用全局事件总线，定义了 zoomImgUrl 事件,接收索引值
    this.$bus.$on("zoomImgUrl", (index) => {
      this.imgIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>