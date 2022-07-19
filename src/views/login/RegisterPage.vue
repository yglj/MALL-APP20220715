<template>
    <div>
        <LoginCom :btnText="btnText">
            <template v-slot:loginText>
                <div class="register-text">
                    <router-link to="/login">已有账号去登录</router-link>
                </div>
            </template>
        </LoginCom>
    </div>
</template>

<script setup>
import LoginCom from './LoginCom.vue';

// import { ref } from 'vue'

let btnText = "注册"

</script>

<style lang="scss" scoped>

.register-text {
    width: 2rem;
    margin: 0 auto;
    font-size: 0.14rem;
    text-align: center;

    a,
    span {
        color: rgba(0, 0, 0, 0.50);
        font-weight: bold;
        line-height: 0.2rem;
    }

}
</style>