<template>
    <div class="body">

        <div class="head-bg">
            <router-link to="/addr">
                <!-- <img class="edit-icon" src="@/assets/me-edit.png"> -->
                <van-icon name="manager" class="edit-icon" />
            </router-link>
        </div>

        <div class="myOwn">
            <div class="people">
                <img class="picture" src="@/assets/me0039.gif">
                <h2 class="uname">桑少个零的 <i class="star">16</i></h2>
                <span class="uid">645485555</span>
            </div>
            <div class="own">
                <div class="own-item" v-for="(item, idx) in ownList" :key="idx">
                    <div class="own-th"> {{ item.tab}}</div>
                    <div class="own-td">{{ item.text }}</div>
                </div>
            </div>
        </div>

        <div class="myManger">
            <div class="manger-item" v-for="(item, idx) in mangerList" :key="idx">
                <div class="manger-th">
                    <img src="" alt="">
                    {{ item.tab }}
                </div>
                <div class="enter">&gt;</div>
            </div>
        </div>
        <Docker></Docker>
    </div>
</template>

<script setup>
import Docker from '@/components/Docker.vue';
let ownList = [
    { tab: "红包", text: '218'},
    { tab: "优惠券", text: '12张'},
    { tab: "蓝豆", text: '99'},
    { tab: "黑条", text: '22218'},
]
let mangerList = [
    { tab: "我的钱包"},
    { tab: "我的地址"},
    { tab: "客服与帮助"},
]
</script>

<style lang="scss" scoped>

.body {
    // position: relative;
    height: calc(100vh - 0.2rem);
    background: #f1f1f1;
    z-index: -999;
}

.head-bg {
    position: relative;
    height: 2.5rem;
    overflow: hidden;
    z-index: 0;
    &::after{
        content: '';
        display: block;
        width: 5rem;
        height: 5rem;
        border-radius: 5rem;
        position: absolute;
        top: -2.5rem;
        left: 50%;
        background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
        transform: translateX(-50%);
    }

    .edit-icon {
        position: absolute;
        font-size: 0.21rem;
        color: #fff;
        top: 0.4rem;
        right: 0.21rem;
        width: 0.24rem;
        height: 0.192rem;
        z-index: 1;
    }
}

.myOwn {
    width: 3.39rem;
    height: 2.03rem;
    border-radius: 0.08rem;
    background: #fff;
    margin: -1.5rem auto 0;
    position: relative;
    z-index: 1;
    box-shadow: 0 0.05rem 0.05rem 0.01rem #ddd;

    .people {
        height: 1.26rem;
        border-bottom: 1px solid #f1f1f1;
        position: relative;
        text-align: center;
        padding-top: 0.01rem;
        .picture {
            width: 0.94rem;
            height: 0.94rem; 
            border-radius: 0.94rem;
            position: absolute;
            left: 50%;
            right: 50%;
            transform: translate(-50%, -50%);
            background-color: #7fd9ffe9;
        }

        .uname {
            margin-top: 0.6rem;
            font-size: 0.24rem;
            color: #262628;
            line-height: 0.36rem;
        }
        .uid {
            font-size: 0.14rem;
            color: #C1C0C9;
            display: block;
            margin-top: 0.06rem;
        }
        .star {
            display: inline-block;
            background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
            border-radius: 0.75rem;
            width: 0.36rem;
            height: 0.16rem;
            line-height: 0.16rem;
            vertical-align: middle;
            font-size: 0.12rem;
            margin-left: 0.12rem;
            color: #fff;
        }
    }

    .own {
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        height: 0.5rem;
        padding-top: 0.13rem;

        .own-item {
           height: 100%;
        }
        .own-th {
            font-size: 0.14rem;
            color: #C1C0C9;
            line-height: 0.2rem;
        }
        .own-td {
            font-size: 0.18rem;
            line-height: 0.3rem;
            color: #262628;
        }
    }


}

.myManger {
    margin: 0.16rem auto 0;
    width: 3.39rem;
    height: 1.47rem;
    border-radius: 0.08rem;
    background: #fff;
    font-size: 0.14rem;
    box-shadow: 0 0.1rem 0.1rem #ddd;
    // line-height: 0.2rem;

    .manger-item {
        height: 0.48rem;
        line-height: 0.49rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 0.16rem;
    }

    // .manger-th {
    //     display: flex;
    // }
    img {
        width: 0.22rem;
        height: 0.22rem;
        margin: 0.08rem 0.12rem 0 0;
        vertical-align: top;
    }
    .enter {
        font-weight: bold;
        font-size: 0.20rem;
        color: #C2C4CA;
    }
}
</style>