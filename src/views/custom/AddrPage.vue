<template>
    <div class="body">
        <Header :title=" title " :doName=" doName " :addrMangerState="addrMangerState" @chgAddrStatus="chgAddrStatus"
            @doClick="doClick">
        </Header>

        <div class="addr-list" v-if="addrMangerState == 'list' ">
            <h2>我的收货地址</h2>

            <div class="addr-item" v-for="item, idx in addrList" :key="idx">
                <van-badge :content=" parseInt(item.default_set) && '默认' || '' " style="width:100%" color="#1989fa"
                    :offset="[-20,-16]">
                    <div @click="selectAddr(item)">
                        <p>
                            <span class="name"> {{ item.name }}</span>
                            <span class="phone"> {{ item.phone }}</span>
                        </p>
                        <p class="addr">
                            {{ item.area_name + item.desc }}
                        </p>
                    </div>

                    <div class="enter-arrow" @click="goEditAddr(item)">
                        <van-icon name="arrow" />
                    </div>
                    <van-row justify="start" align="bottom">
                        <van-col>
                            <van-button type="primary" size="mini"  plain
                                @click="setDefaultAddr(item.id)"> 设为默认地址
                            </van-button>
                        </van-col>
                        <van-col offset="4">
                            <van-button type="primary" size="mini"  plain @click="delAddress(item.id)"> 删除
                            </van-button>
                        </van-col>
                    </van-row>
                </van-badge>
            </div>
        </div>

        <AddrMangerPage v-else :currentAddr="currentAddr" :addrMangerState="addrMangerState"
            @chgAddrStatus="chgAddrStatus">
        </AddrMangerPage>

    </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount } from 'vue'
import { mapState, useStore } from 'vuex'
import Header from '@/components/Header.vue'
import AddrMangerPage from './AddrMangerPage.vue'
import { Notify } from 'vant'
import { useRoute, useRouter  } from 'vue-router'


export default {
    setup() {
        const state = reactive({
            title: "管理收货地址",
            count: 0,
            doName: '新建',
            addrMangerState: "list",
            currentAddr: null,
        });

        const store = useStore()

        let addrList =computed( ()=>{
            let addrData = store.state.addr.addrList
            return addrData.sort((a, b) => -( a.default_set - b.default_set ) )
        } )

        onBeforeMount(async ()=>{
            await store.dispatch('addr/getAddress')
        })

        const setDefaultAddr = async id => {
            let res = await store.dispatch('addr/setDefaultAddr', { id })
            res.msg.includes('成功') && Notify({
                message: res.msg,
                color: '#dcffff',
                background: '#3fade1',
                duration: 1000,
                type: "success"
            })
            setTimeout(async () => {
                await store.dispatch('addr/getAddress')
            }, 1200)
        }

        const delAddress = async (id) => {
            let res = await store.dispatch('addr/delAddress', { id })
            res.msg.includes('成功') && Notify({
                message: res.msg,
                color: '#dcffff',
                background: '#3fade1',
                duration: 1000,
                type: "success"
            })
            setTimeout(async () => {
                await store.dispatch('addr/getAddress')
            }, 1200)
        }

        const goEditAddr = (item) => {
            state.addrMangerState = "edit"
            state.doName = "保存"
            state.title = "编辑收货地址"
            state.currentAddr = item
        }

        const addAddr = () => {
            state.addrMangerState = "add"
            state.doName = "保存"
            state.title = "新建收货地址"
        }

        const chgAddrStatus = () => {
            state.addrMangerState = 'list'
            state.doName = "新建"
            state.title = "管理收货地址"
            state.currentAddr = null
        }

        const doClick = () => {
            switch(state.addrMangerState){
                case 'list':
                    addAddr()
                break
                default: alert(state.addrMangerState)
            }
        }

        const route = useRoute()
        const router = useRouter()
        const selectAddr = (item) => {
            if (route.params.from == "pay" || router.options.history.state.back == "/pay"){
                // not save in history
                router.replace({
                    path: "pay", query: { addr_id: item.id }
                })
            }
        }
        return {
            ...toRefs(state), goEditAddr, addrList, chgAddrStatus, addAddr, doClick, setDefaultAddr, delAddress, selectAddr
        };
    },
    components: { Header, AddrMangerPage }
}
</script>

<style lang="scss" scoped>




.body {
    min-height: calc(100vh - 0.2rem);
    background: #f1f1f1;
    overflow: hidden;
}

.addr-list {
    box-sizing: border-box;
    padding: 0.18rem 0.16rem;
    height: calc(100vh - 0.64rem);
    overflow-y: scroll;
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
        // height: 1.04rem;
        border-radius: 0.06rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
        background: #fff;
        font-size: 0.16rem;

        span {
            color: #999;
        }

        .name {
            margin-right: 0.66rem;
        }
        .addr {
            width: 90%;
            // height: 0.4rem;
            margin: 0.08rem 0;
            color: #333;
        }

        .enter-arrow {
            font-size: 0.24rem;
            position: absolute;
            right: 0.16rem;
            top: 50%;
            transform: translateY(-50%);
            i {
                font-size: 0.24rem;
                color: #B6B6B6;
            }
        }
    }
}

</style>