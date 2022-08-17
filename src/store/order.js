import { HttpReq } from '@/tool/request'
import { GET_ORDER_LIST, PREPARE_ORDER, DEL_PREPARE_ORDER } from './mutation-types'


// 1：已删除，0：已过期，1: 已下单，2: 已支付，3: 已发货, 4: 退货中，5: 退款中，6: 已完成，7：已取消
export default {
    namespaced: true,
    state: () => ({
        orderList: [],
        prepareOrder: JSON.parse(sessionStorage.getItem('order_goods_info')) ,
        orderStatusList: {
            '-1': '已删除', 0: '已过期', '1': '已下单', 2:'已支付', 3:'已发货', 4: '退货中', 5: '退款中',6: '已完成', 7:'已取消'
        }
    }),
    getters: {
        // updateOrderList: state => state.orderList
        orderStatus: state => num => state.orderStatusList[num]
    },
    mutations: {
        [GET_ORDER_LIST](state, data){
            // console.log("[mutatuions]: 数据已更新", data.result.rows);
            state.orderList = data.result.rows
        },
        [PREPARE_ORDER](state, {goods_info}){
            state.prepareOrder = goods_info
            sessionStorage.setItem("order_goods_info", JSON.stringify(goods_info))
        },
        [DEL_PREPARE_ORDER](state){
            sessionStorage.removeItem("order_goods_info")
        },

    },
    actions: {
        async getOrderList({commit}, id){
            //  actions  use async await >  return promose >  dispatch().then()
            let res = await HttpReq('/order', {'limit': 10000}, 1)
            return new Promise(
                (resolve, reject) => {
                    commit(GET_ORDER_LIST, res )
                    resolve(res)
                }
            )
        },
        async addOrder({ state, commit, getters }, { addr_id, goods_info, shoppingCartIds }){
            let res = await HttpReq('/order',  { addr_id, goods_info, shoppingCartIds } , 0)
            return new Promise((resolve) => { resolve( res ) })
        },
        updatedOrder({ state, commit, getters }, playload){
            let { id, addr_id, status } = playload;
            return new Promise((resolve) => {
                let res =  HttpReq(`/order/${id}`, {
                    addr_id, status
                }, 2)
                resolve(res)
            })
        },
        deleteOrder({ state, commit, getters }, playload){
            let { order_id} = playload;
            return new Promise((resolve) => {
                let res = HttpReq(`/order/${order_id}`, null, 3)
                resolve(res)
            })
        },
    }
}

// {
//     "addr_id": 1871,
//         "goods_info": [
//             {
//                 "id": 3370,
//                 "num": 100
//             },
//             {
//                 "id": 3373,
//                 "num": 123
//             }
//         ],
//             "project_id": 24,
//                 "shoppingCartIds": [
//                     3370,
//                     3373
//                 ]
// }