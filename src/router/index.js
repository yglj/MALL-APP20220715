
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import LoginView from '../views/login/LoginPage.vue'
import RegisterView from '../views/login/RegisterPage.vue'
import searchView from '../views/home/search/SearchPage.vue'
import shopView from '../views/home/shop/ShopPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: searchView
  },
  {
    path: '/shop/:shopId',
    name: 'shop',
    component: shopView
  },
  {
    path: '/goods/:goodsId',
    name: 'goods',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsPage.vue'),
    beforeEnter: (to, from, next) => {
      next()
    },
    beforeRouteUpdate(to, from, next) {
      next()
    },
    beforeRouteLeave(to, from, next) {
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/OrderPage.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import(/* webpackChunkName: "pay" */ '../views/order/PayPage.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart/CartPage.vue'),
  },
  {
    path: '/me',
    name: 'me',
    component: () => import(/* webpackChunkName: "me" */ '../views/custom/CustomPage.vue')
  },
  {
    path: '/addr',
    name: 'addr',
    component: () => import(/* webpackChunkName: "addr" */ '../views/custom/AddrPage.vue')
  },
  {
    path: '/classify/:classify_id',
    name: 'classify',
    component: () => import(/* webpackChunkName: "addr" */ '../views/home/components/Classify.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 登录拦截
router.beforeEach((to, form, next)=>{
  let isLogin = sessionStorage.getItem("isLogin")
  let authList = ['/login', '/register']
  setTimeout( ()=>{
    isLogin || authList.includes(to.path) ? next() : router.push('/login')
  }, 10)
})

export default router
