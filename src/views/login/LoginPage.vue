<template>
    <div>
        <LoginCom :btnText="btnText">
            <template v-slot:loginText>
                <div class="login-text">
                    <router-link to="/register">立即注册</router-link>
                    <span>|</span>
                    <router-link to="/register">忘记密码</router-link>
                </div>
            </template>
        </LoginCom>
    </div>
</template>

<script setup>
import LoginCom from './LoginCom.vue';
import {ref} from 'vue'

let btnText = ref("登录")

// sessionStorage.setItem("isLogin", true)

</script>

<style lang="scss" scoped>

    .login-text {
        width: 2rem;
        margin: 0 auto;
        font-size: 0.14rem;
        text-align: center;
        a, span {
            color: rgba(0, 0, 0, 0.50);
            font-weight: bold;
            line-height: 0.2rem;
        }
        span{
            margin: 0 0.12rem;
        }
    }
</style>