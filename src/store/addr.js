import { HttpReq } from '@/tool/request'
import { GET_DEFAULT_ADDRESS, GET_ADDRESS  } from './mutation-types'

export default {
    namespaced: true,
    state: () => ({
        defaultAddress: {},
        addrList: [],
    }),
    getters: {
        selectAddrById: state => id => state.addrList.find( v => v.id == id )
    },
    mutations: {
        [GET_DEFAULT_ADDRESS](state, data){
            // console.log("[addr]: 数据已更新", data.result);
            state.defaultAddress = data.result
        },
        [GET_ADDRESS](state, data){
            // console.log("[addr]: 数据已更新", data.result);
            state.addrList = data.result
        },
    },
    actions: {
        async getDefaultAddress({commit}){
            commit(GET_DEFAULT_ADDRESS, await HttpReq('/defalutAddress', null, 1) )
        },
        async getAddress({commit}){
            commit(GET_ADDRESS, await HttpReq('/address', null, 1) )
        },
        async addAddress( {commit}, playload ){
            return await HttpReq('/address', playload, 0)
        },
        async setDefaultAddr( {commit}, playload ){
            let { id } = playload
            return await HttpReq('/setDefault' + '/' + id, null, 0)
        },
        async delAddress({ commit }, playload) {
            let { id } = playload
            return await HttpReq('/address' + '/' + id, null, 3)
        },
        async updatedAddress({ commit }, {id, ...data}) {
            return await HttpReq('/address' + '/' + id, data, 2)
        },

        // {
    // "name": "hahaha",
    //     "phone": "18812345678",
    //         "area": "4,53,518",
    //             "area_name": "福建",
    //                 "desc": "这是一个非常详细的地址，更新地址接口的数据示例值",
    //                     "post_code": "100000",
    //                         "status": "1"
// }

    }
}

