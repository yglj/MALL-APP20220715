<template>
    <div class="addrManger-body">
        <van-address-edit :area-list="areaList" :show-delete=" addrMangerState == 'edit' " show-set-default
            show-search-result :address-info="addr" :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
            @change-detail="onChangeDetail" />

        <!-- <div class="input-item" v-for="(item, name) in addr " :key="name" :name="name">
            {{ translateName[name] }}:
            <input type="text" :placeholder="item">
        </div> -->
    </div>
</template>

<script setup>
import { defineProps , defineEmits, ref } from 'vue'
import { areaList } from '@vant/area-data'
import { Toast, Notify } from 'vant'
import { useStore } from 'vuex'

import Mock from 'mockjs'

const store = useStore()
const props = defineProps({
    currentAddr: [String, Number, Object],
    addrMangerState: String
})
const emits = defineEmits(
    ['chgAddrStatus']
)

// const translateName = {
//     "name": "收件人姓名",
//     "phone": "手机号",
//     "area_name": "省市区域",
//     "desc": "详细地址",
// }

// let addr = {
//     "name": "如xxxx",
//     "phone": "如137xxxx1111",
//     "area_name": "input 省市区域",
//     "desc": "input 详细地址",
// }



// area: "150102"
// area_name: "内蒙古自治区 呼和浩特市 新城区"
// createdAt: "2022-08-03T03:34:54.000Z"
// default_set: "1"
// desc: "盘龙城41号222"
// id: 2380
// name: "韩艳"
// phone: "15012345678"
// post_code: null
// status: "1"
// updatedAt: "2022-08-03T03:34:55.000Z"
// user_id: 1887
const { addrMangerState, currentAddr } = props
let addr = addrMangerState == 'edit' ? {
    addressDetail: currentAddr.desc,
    name: currentAddr.name,
    tel: currentAddr.phone,
    isDefault: Boolean( Number(currentAddr.default_set) ),
    areaCode: currentAddr.area
} : {
    addressDetail: "盘龙城41号222",
    areaCode: "110101",
    city: "北京市",
    country: "",
    county: "东城区",
    isDefault: false,
    name: Mock.mock('@cname'),
    postalCode: "",
    province: "北京市",
    tel: "15012345678"
}

const searchResult = ref([]);

const onSave = async (saveData) => {
    // {
    //     "name": "hahaha",
    //         "phone": "18812345678",
    //             "password": "xxxxxxx",
    //                 "area": "2,52,501",
    //                     "area_name": "北京省市辖区西城区",
    //                         "desc": "详细地址",
    //                             "post_code": "100000"
    // }
    let addr = {
        id: currentAddr && currentAddr.id,
        name: saveData.name,
        phone: saveData.tel,
        area: saveData.areaCode,
        area_name: [saveData.province, saveData.city == saveData.province ? '' : saveData.city, saveData.county].join(" "),
        desc: saveData.addressDetail,
        "default_set": saveData.isDefault
    }
    // add or updated
    let res =
    addrMangerState == 'add' ? await store.dispatch('addr/addAddress', addr) :
    addrMangerState == 'edit' ? await store.dispatch('addr/updatedAddress', addr) : null
    if(!res.msg) {
        Toast('error option')
        return
    }
    //  set default addr
    if (saveData.isDefault){
        let res2 = await store.dispatch('addr/setDefaultAddr', {id: res.result.id})
    }
    res.msg.includes('成功') && Notify({
        message: res.msg,
        color: '#dcffff',
        background: '#3fade1',
        duration: 1000
    })
    setTimeout(async ()=>{
        await store.dispatch('addr/getAddress')
        emits('chgAddrStatus')
    }, 1200)
}


const onDelete = async () => {
    let id = currentAddr && currentAddr.id
    let res = await store.dispatch('addr/delAddress', {id})
    res.msg.includes('成功') && Notify({
        message: res.msg,
        color: '#dcffff',
        background: '#3fade1',
        duration: 1000
    })
    setTimeout(async () => {
        await store.dispatch('addr/getAddress')
        emits('chgAddrStatus')
    }, 1200)
}
const onChangeDetail = (val) => {
    console.log("搜索详细地址");
    if (val) {
        searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
        ];
    } else {
        searchResult.value = [];
    }
};

</script>

<style lang="scss" scoped>




.addrManger-body {
    margin-top: 0.12rem;
    background: #fff;
    width: 100%;
    height: 88vh;
}

.input-item {
    display: block;
    background: #fff;
    height: 0.44rem;
    border-bottom: 1px solid #bbb;
    margin: 0 0.18rem;
    font-size: 0.16rem;
    line-height: 0.44rem;
    color: #666;

    input {
        outline: none;
        border: none;
        color: #111;
    }
}

.input-item:last-of-type {
    border: none;
}
</style>