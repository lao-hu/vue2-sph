const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //transpileDependencies: true,
  
  // 关闭生成js.map文件
  productionSourceMap:false,

  // 关闭语法检查
  lintOnSave:false, 

   /* 开启代理服务器  方式一： 简单配置  */
 /*  devServer: {
    proxy: 'http://127.0.0.1:5000'
  }, */

 /* 开启代理服务器  方式二： 复杂配置  */
 devServer: {
  proxy: {
    '/api': {
      target: 'http://39.98.123.211:8510',
      /*  pathRewrite 重写路径 
           pathRewrite : {"正则表达式":"值"}
      */
      //pathRewrite:{"^/api":''}, // 匹配以api开头的路径
     // ws: true,  // 用于支持 websocket 
    //  changeOrigin: true // 用于控制请求头中的host值
    },
    
  }
}
})
