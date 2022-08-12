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
import { defineProps, defineEmits, toRefs, emits } from 'vue'
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
        },
        addrMangerState: {
            type: String
        }
    },
    emits: [
        'chgAddrStatus', 'doClick', 'goBack'
    ],
    setup(props, context) {

        let { title, doName, addrMangerState } = toRefs(props)

        const doClick = () => {
            context.emit('doClick')
        }

        let router = useRouter()
        const goBack = () => {
            context.emit('goBack')
            if( addrMangerState.value == 'list'){
                router.go(-1)
            }else {
                // only setup script use defineEmits
                context.emit('chgAddrStatus')
            }
        }

        return { title, doName, goBack, doClick }
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