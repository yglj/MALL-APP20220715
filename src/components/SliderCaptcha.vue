<template>
    <teleport to="body">
        <div class="mask"></div>
        <div class="captcha-ct">
            <h2>請完成登錄驗證</h2>
            <div class="btns">
                <button @click="captcha.reset">重置</button>
                <button @click="$emit('update:showCaptcha', false )" :value="showCaptcha">关闭</button>
            </div>
            <!-- 人机认证 -->
            <div id="captcha">
            </div>

        </div>
    </teleport>
</template>

<script setup>
import '@/vendor/slidercaptcha.min.css'
import '@/vendor/longbow.slidercaptcha.min'
import { ref, onMounted } from 'vue'

const props = defineProps(
    {
        'showCaptcha': Boolean
    }
)

const emits = defineEmits([
    'captchaSuccess', 'captchaFail', 'update:showCaptcha'
])

let captcha = ref(null)



onMounted(()=>{
    captcha.value = sliderCaptcha({
        id: "captcha",
        loadingText: '正在加载中...',
        onSuccess(){
            emits('captchaSuccess')
        },
        onFail(){
            emits('captchaFail')
        },
        verify(){
            // 默认行为
            return true
        }
    })

})

</script>

<style lang="scss" scoped>

button {
    border: none;
    outline: solid 1px #0dd3ff;
    margin: 0 0.2rem 0.2rem;
    padding: 0.1rem;
    border: 1px solid #0389ff;
    width: 1rem;
    background: #0389ff;
    color: #fff;
    font-weight: normal;
}

.captcha-ct {
    padding: 0.2rem;
    padding-top: 0.1rem;
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px dashed #1c79c0;
        /* fallback for old browsers */
        // background: -webkit-linear-gradient(to right, rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125));
        /* Chrome 10-25, Safari 5.1-6 */
        // background: linear-gradient(to right, rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125));
        /* W3C, IE 10+/ Edge, Frefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: #fdfdfd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;

    h2 {
        font-size: 0.2rem;
        margin-bottom: 0.2rem;
    }
    #captcha {
        height: 2rem;
        position: relative;
        &::after {
            display: block;
            content: '请稍稍等候...';
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 40%;
            font-size: 0.2rem;
            z-index: -1;
        }
    }
}
.mask {
    position: absolute;
    left: 0;
    top: 0;
    &::after {
        content: '';
        display: block;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.25);
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>