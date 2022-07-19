<template>
    <div>
        <div class="phoneStatus"></div>
        <div class="login-logo">
            <img src="@/assets/login-logo.png" alt="">
        </div>
        <div class="login-form">

            <input type="text" placeholder="请输入手机号" v-model="uphone.str">
            <div :class="['tip', { 'fail': !checkStatus, 'success': checkStatus }]">{{ uphone.tip }}</div>

            <input type="text" placeholder="请输入密码" v-model="upwd.str">
            <div class="tip">{{ upwd.tip }}</div>

            <!-- <slot name="input"></slot> -->
            <div v-if=" btnText == '注册' ">
                <input type="text" placeholder="确认密码" v-model="upwd2.str">
                <div class="tip" id="pwdAgain">{{ upwd2.tip }}</div>
            </div>

            <button @click="handleClick">{{ btnText }}</button>
            <slot name="loginText"> </slot>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, toRefs } from 'vue'
import { HttpReq } from '../../tool/request'

const props = defineProps(
    {
        btnText: String,
    }
)

let uphone = reactive({str: '', name:"手机号", tip: null})
let upwd = reactive({ str: '', name: "密码", tip: null })
let upwd2 = reactive({ str: '', name: "确认密码", tip: null })
let checkStatus = ref(true)

let {btnText} = toRefs(props)



/*
1、姓名
 /^[\u4e00-\u9fa5]{2,4}$/     ``//2-4个中文字符正则
2、手机号码
/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

*/

function checkIpt(re, obj){
    if(obj.str == ""){
        obj.tip = `${obj.name}为空`
        return false
    }

    if(re.test(obj.str)){
        obj.tip = `${obj.name}不合规`
        return false
    }

    obj.tip = ""
    return true
}

function check(){
    let phoneRe = /^[\u4e00-\u9fa5]{2,4}$/
    let pwdRe = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if(checkIpt(phoneRe, uphone) && checkIpt(pwdRe, upwd) ){
        if (btnText == "注册" && checkIpt(pwdRe, upwd2)){
            return true
        }else{
            return true
        }
    }

}

// 登录或注册
async function handleClick(){
    // 校验用户输入
    if(!check()) return false
    let res = await HttpReq(
        'login',
        {
            "phone": uphone.str,
            "password": upwd.str
        }
    )
    console.log(res);
    // 发送请求
}


</script>

<style lang="scss" scoped>
    .success {
        color: green;
    }
    .fail {
        color: red;
    }

    .phoneStatus {
        width: 100%;
        height: 0.2rem;
        background-color: gold;
    }

    .login-logo {
        margin: 1.2rem auto 0.4rem;
        width: 0.66rem;
        height: 0.66rem;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .login-form {
        width: 100%;
        .tip {
            margin: 0 auto;
            width: 2.95rem;
            height: 0.16rem;
            line-height: 0.16rem;
            // text-indent: 2em;
            font-size: 0.12rem
        }

        input {
            display: block;
            box-sizing: border-box;
            width: 2.95rem;
            margin: 0 auto 0rem;
            padding: 0.12rem 0.16rem;
            height: 0.48rem;
            background: #f9f9f9;
            border: 1px solid rgba(0, 0, 0, .1);
            border-radius: 0.06rem;
            font-size: 0.16rem
        }
        button {
            display: block;
            outline: none;
            border: none;
            margin: 0.16rem auto ;
            width: 2.95rem;
            height: 0.48rem;
            background: #0091FF;
            box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
            border-radius: 4px;
            color: #fff;
            font-size: 0.16rem;
            text-align: center;
            line-height: 0.48rem;
        }

        #pwdAgain {
            margin-bottom: 0.16rem;
        }
    }
</style>