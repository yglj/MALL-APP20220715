<template>
    <div>
        <!-- 人机认证 -->
        <button @click="captcha.reset">重置</button>
        <button>关闭</button>
        <div id="captcha">
        </div>
    </div>
</template>

<script setup>
import '@/vendor/slidercaptcha.min.css'
import '@/vendor/longbow.slidercaptcha.min'
import { ref, onMounted } from 'vue'

let captcha = ref(null)
onMounted(()=>{
    captcha.value = sliderCaptcha({
        id: "captcha",
        onSuccess(){
            console.log("人类");
        },
        onFail(){
            console.log("robet");
        },
        verify(){
            console.log("默认行为");
            return true
        }
    })
})

</script>

<style lang="scss" scoped>

</style>