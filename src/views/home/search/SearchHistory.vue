<template>
    <div class="wrap">
        <div class="list-zone">
            <div class="list-title">
                <h2>搜索历史</h2>
                <button @click="clearHistory">清除搜索历史</button>
            </div>
            <div class="data-list">
                <div v-for="(item, index) in historyList" :key="index">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="list-zone">
            <h2>热门搜索</h2>
            <div class="data-list">
                <div v-for="(item, index) in hotList" :key="index">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    historyList: Array,
    hotList: Array
})

const { historyList, hotList } = props

const clearHistory = () => {
    console.log("clear");
    historyList.value
}

</script>

<style lang="scss" scoped>

.list-zone {
    margin: 0.24rem 0.18rem 0;
    .list-title {
        line-height: 0.22rem;
        display: flex;
        justify-content: space-between;
        button {
            outline: none;
            border: none;
            background-color: #fff;
            font-size: 0.14rem;
            color: #333333;
        }
    }

    h2 {
        display: inline-block;
        width: 0.64rem;
        height: 0.22rem;
        font-size: 0.16rem;
        font-weight: bold;
        color: #333333;
    }

    .data-list{
        font-size: 0;
        div {
            margin-top: 0.12rem;
            margin-right: 0.1rem;
            display: inline-block;
            padding: 0.08rem 0.1rem;
            font-size: 0.14rem;
            color: #666;
            background-color: #f5f5f5;
        }
    }
}
</style>