<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startAndEnd.start > 1"
      @click="$emit('getpageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-show="startAndEnd.start > 2">···</button>

    <!-- 中间部分 -->
    <!-- v-for 是可以遍历数字的 -->
    <template v-for="(page, index) in startAndEnd.end">
      <button
        v-if="page >= startAndEnd.start"
        :key="index"
        @click="$emit('getpageNo', page)"
        :class="{active:pageNo == page}"
      >
        {{ page }}
      </button>
    </template>

    <!--                  33             33               -->
    <button v-show="startAndEnd.end < totalPage - 1">···</button>

    <!-- 尾页 -->
    <button
      v-show="startAndEnd.end != totalPage"
      @click="$emit('getpageNo', totalPage)"

      :class="{active:pageNo == totalPage}"
    >
      {{ totalPage }}
    </button>

    <!-- 下一页 -->
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getpageNo', pageNo + 1)"
    >
      下一页
    </button>

    <!-- 一共有多少条数据 -->
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  /* 
     pageNo:    在当前第几页
     pageSize： 每页显示几条数据
     total：   一共多少条数据
     continues ：连续的页码数
  */
  props: ["pageNo", "pageSize", "total", "continues"],

  // 计算属性
  computed: {
    //一共有多少页

    // 尾页
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算出连续的页码的起始数字与结束数字
    startAndEnd() {
      // 先定义两个变量存储起始数字与结束数字

      let start = 0; // 起始数字
      let end = 0; // 结束数字
      /* 
        当前页码：8
                6 7 8 9 10
        当前页码：5
                3 4 5 6 7
        当前页码：10
                8 9 10 11 12
    */

      // 连续的页码5【至少是5页】，如果出现不够5页
      if (this.continues > this.total) {
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象 【连续页码5，大于5的】
        // 起始数字 ,   当前页-取整(连续页码/2)
        start = this.pageNo - parseInt(this.continues / 2);
        // 结束数字
        end = this.pageNo + parseInt(this.continues / 2);

        //
        /* 
             纠正start 起始数字出现0和负数

             假如：有34页。
              当前页是：1
                1 2 3 4 5
              当前页是：2
                1 2 3 4 5

                
            */
        if (start < 1) {
          start = 1;
          end = this.continues;
        }

        // 纠正 end 出现大于总页数的情况
        /* 
              假如：有34页。
              当前页34：
                   30 31 32 33 34
              当前页33：
                   30 31 32 33 34 
            */
        if (end > this.totalPage) {
          /* 
             总页数 - 连续页码数 +1
             34 - 5 = 29，29不够，连续页码是 30 31 32 33 34 
             所以29+1
          */
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
      //  return "start:"+start+"=== end:"+ end;
    },
  },
  methods: {
    // 获取当前页
    getPageHandler(page) {
      console.log(page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>