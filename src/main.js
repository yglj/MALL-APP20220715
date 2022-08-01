import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './style/reset.css'
import './style/base.scss'
import 'normalize.css'

import Vant from 'vant';
import 'vant/lib/index.css';

import './style/root.scss'
import { Lazyload } from 'vant'

import {VueMasonryPlugin } from 'vue-masonry'


const Vue = createApp(App)
.use(store)
.use(router)
.use(Vant)
.use(Lazyload, {
    lazyComponent: true,
    loading: "./loading.jpg",
    listenEvents: ['load'],
    preload: 1.5
})
.use(VueMasonryPlugin)
.mount('#app')

// Vue.config.devtools = true


// 注册时可以配置额外的选项
