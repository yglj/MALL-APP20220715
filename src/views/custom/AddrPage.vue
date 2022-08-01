<template>
    <div class="body">
        <Header :title=" title " :doName=" doName "></Header>

        <div class="addr-list" v-if="addrMangerState == 'list' ">
            <h2>我的收货地址</h2>
            <div class="addr-item" v-for="item, idx in addrList" :key="idx">
                <p>
                    <span class="name"> {{ item.name }}</span>
                    <span class="phone"> {{ item.phone }}</span>
                </p>
                <p class="addr">
                    {{ item.addr }}
                </p>
                <div class="enter-arrow" @click="goEditAddr">
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <AddrMangerPage v-else></AddrMangerPage>

    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { mapState, useStore } from 'vuex'
import Header from '@/components/Header.vue'
import AddrMangerPage from './AddrMangerPage.vue'

export default {
    setup() {
        const state = reactive({
            title: "管理收货地址",
            count: 0,
            doName: '新建',
            addrMangerState: "list",
            // addrList: computed()
        });

        let addrList =computed( mapState([
            // 映射 this.count 为 store.state.count
            'addrList'
        ]) )

        console.log("is Addrlist  ?", addrList);

        const goEditAddr = () => {
            state.addrMangerState = "edit"
            state.doName = "保存"
            state.title = "编辑收货地址"
        }

        return {
            ...toRefs(state), goEditAddr
        };
    },
    components: { Header, AddrMangerPage, addrList }
}
</script>

<style lang="scss" scoped>





.body {
    height: calc(100vh - 0.2rem);
    background: #f1f1f1;
}

.addr-list {
    box-sizing: border-box;
    padding: 0.18rem 0.16rem;
    h2 {
        font-size: 0.16rem;
        font-weight: bold;
    }

    .addr-item {
        position: relative;
        box-sizing: border-box;
        margin-top: 0.16rem;
        padding: 0.18rem 0.16rem;
        width: 3.39rem;
        height: 1.04rem;
        border-radius: 0.06rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
        background: #fff;

        span {
            color: #999;
        }

        .name {
            margin-right: 0.66rem;
        }
        .addr {
            width: 2.6rem;
            height: 0.4rem;
            margin-top: 0.08rem;
            color: #333;
        }

        .enter-arrow {
            font-size: 0.24rem;
            position: absolute;
            right: 0.16rem;
            top: 50%;
            transform: translateY(-50%);
            i {
                font-size: 0.16rem;
                color: #B6B6B6;
            }
        }
    }
}

</style>