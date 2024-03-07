// 表单验证区域
// 引入 vue 
import Vue from 'vue'
// 引入vee-validate 来进行表单验证
import VeeValidate from 'vee-validate';
// 引入中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate)
// 国际化中文
VeeValidate.Validator.localize('zh_CN', {
    messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    // 给校验的 field 属性名映射中文名称
    attributes: {
        phone: '手机号',
        code: '验证码',
        password:'密码',
        password1:'确认密码',
        agree:'协议'
    }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('tongyi', {
    // 返回布尔值或解析为布尔值的Promise。
    validate: value => {
        // console.log(value);
    return value
    },
    //将添加到默认区域设置消息中。
    //返回一条消息。
    getMessage: field =>{
        console.log(field);
      return field + '必须同意'
    } 
})