<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{orderId}}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥17,654</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a href="javascript:;" class="btn" @click="openPay"> 立即支付 </a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
  export default {
    name: 'Pay',
    data(){
      return {
        timer:null,
        // 支付的状态码
        code:200
      }
    },
    computed:{
      orderId(){
        return this.$route.query.orderId
      }
    },
    methods:{
      // 获取支付信息
      async getPayInfo(){
         let result = await this.$api.reqPayInfo(this.orderId)
         //console.log(result);
      },

      // 立即支付按钮
     async openPay(){
        /* 
         实际上 toDataURL函数里面应该填写微信支付二维码
        */
        let result = await QRCode.toDataURL("微信支付二维码")
         // 
         this.$alert(`<img src="${result}" alt="微信支付二维码"/>`, '微信支付', {
          dangerouslyUseHTMLString: true,
          // 是否居中布局
          center:true,
          // 是否显示取消按钮
          showCancelButton:true,
          // 取消按钮的文本内容
          cancelButtonText:"支付遇见问题",
          //	确定按钮的文本内容
          confirmButtonText:"已支付成功",
          //	MessageBox是否显示右上角关闭按钮
           showClose:false,

           // beforeClose
           /* 
             function(action, instance, done)，
              action 的值为'confirm', 'cancel'或'close'；
              instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；
              done 用于关闭 MessageBox 实例
           */
           beforeClose:(action, instance, done) => {
          
              if(action == "cancel"){
                  // 点击支付遇见问题
                 alert("请联系管理员")
                 // 清除定时器
                clearInterval(this.timer)
                this.timer = null
                // 关闭弹窗
                done()
              }else{
                    // 判断是否支付了
                    // 这里是测试，所有code 写死了
                    this.code = 200;
                    if(this.code == 200){
                      // 点击确认按钮
                        // 清除定时器
                        clearInterval(this.timer)
                        this.timer = null
                         // 关闭弹窗
                        done()
                         // 跳转支付成功页面
                         this.$router.push("/paysuccess")
                    }
              }

             // console.log(instance);
           }
        }).catch((params) => {
          
        });

        /* 
           判断支付成功与失败，
           支付成功，路由跳转，如果支付失败提示信息
        */
        if(!this.timer){
          /* 
            建立一个定时器，一直询问支付是否成功
          */
          this.timer = setInterval( async () => {
            // 发送请求获取用户的订单状态 

            //注意： 目前这个 this.$api.reqPayStatus 接口有问题，无法正常使用
            let res = await this.$api.reqPayStatus(this.orderId)
             // res.data.code == 200 
             if(res.data.code == 200){
                // 清除定时器
                clearInterval(this.timer)
                this.timer = null
                // 保存成功的状态吗
                this.code = res.data.code
                // 关闭弹出框
                this.$message.close()
                // 跳转支付成功页面
                this.$router.push("/paysuccess")
             }
            
            // console.log(res);
          }, 1000);
        }

      }
    },
    mounted(){
     this.getPayInfo()
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>