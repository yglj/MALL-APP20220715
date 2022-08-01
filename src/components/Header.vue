<template>
    <div class="header">
        <div class="back" @click="goBack">
            <van-icon name="arrow-left" />
        </div>
        <h2>{{ title }}</h2>
        <div class="do" @click="doClick">{{ doName }}</div>
    </div>
</template>

<script>
import { defineProps, defineEmits, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
    props: {
        title: {
            type: String,
            required: true,
            default: "xxoo"
        },
        doName: {
            type: String,
            required: true,
            default: "xxoo"
        }
    },
    setup(props) {

        // const emits = defineEmits([
        //     'doSomethingBtn'
        // ])

        let { title, doName } = toRefs(props)

        const doClick = () => {
            //
        }

        let router = useRouter()
        const goBack = () => {
            router.go(-1)
        }

        return { title, doName, goBack }
    }
}
</script>

<style lang="scss" scoped>


    .header {
        height: 0.44rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 0.18rem;
        align-items: center;
        color: #333;

        h2 {
            font-size: 0.16rem;
        }
    }

    .back {
        font-size: 0.24rem;
        i {
            color: #B6B6B6;
            font-size: 0.18rem;
        }
    }

    .do{
        font-size: 0.14rem;
    }

</style>