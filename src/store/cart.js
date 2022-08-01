import { HttpReq } from '@/tool/request'

export default {
    namespaced: true,
    state: () => ({
        cartList: []
    }),
    getters: {
        cartListCount:(state) => state.cartList.length,
        cartCountById: state => id => {
            let item = null
            if(id && state.cartList.length > 0){
                item = state.cartList.find(val => val.goods_id == id)
            }
            return item && item.num || 0
        },
    },
    mutations: {
        getCartData(state, res){
            state.cartList = res.result
            console.log(res.result);
        }
    },
    actions: {
        async getCartData({state, commit, getters}, id){
            let res;
            res = await HttpReq('/shoppingCart', null, 1)
            commit('getCartData', res)
            id && getters.cartCountById(id)
        },
        addCart({ state, commit, getters }, id){
            return new Promise((resolve)=>{
                HttpReq('/shoppingCart', {
                    "goods_id": id,
                    "num": 1,
                }, 0).then(
                    res => {
                        resolve(res)
                    }
                )
            })
        },
        changeCartItem({ state, commit, getters }, playload){
            let {goods_id, add} = playload;
            let item = state.cartList.find(val => val.goods_id == goods_id);
            if(item.num <=1 && add <= 0) return
            return new Promise((resolve) => {
                HttpReq(`/shoppingCart/${item.id}`, {
                    "goods_id": goods_id,
                    "num": item.num + add,
                }, 2).then(
                    res => resolve(res)
                )
            })
        },
        delCartItem({ state, commit, getters }, playload) {
            let { cart_id } = playload;
            return new Promise((resolve) => {
                HttpReq(`/shoppingCart/${cart_id}`, null, 3).then(
                    res => resolve(res)
                )
            })
        },
    }
}