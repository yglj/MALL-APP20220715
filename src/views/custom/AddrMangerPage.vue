<template>
    <div class="addrManger-body">
        <div class="input-item"
        v-for="(item, name) in addr " :key="name" :name="name">
            {{ translateName[name] }}:
            <input type="text" :placeholder="item">
        </div>
    </div>
</template>

<script setup>

const translateName = {
    "city": "所在城市",
    "position": "小区/大厦/学校",
    "door": "楼号-门牌号",
    "receiver": "收货人",
    "rphone": "联系电话"
}

let addr = {
    "city": "如北京市",
    "position": "如国防大理工可以源",
    "door": "a号88层",
    "receiver": "请填写收货人姓名",
    "rphone": "请填写收货手机号"
}

</script>

<style lang="scss" scoped>




.addrManger-body {
    margin-top: 0.12rem;
    background: #fff;
    width: 100%;
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