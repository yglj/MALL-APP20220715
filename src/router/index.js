
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'
import LoginView from '../views/login/LoginPage.vue'
import RegisterView from '../views/login/RegisterPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, form, next)=>{
  let isLogin = sessionStorage.getItem("isLogin")
  let authList = ['login', 'register']
  console.log(authList.includes(to.name), to.name);
  setTimeout( ()=>{
    isLogin || authList.includes(to.name) ? next() : router.push('/login')
  }, 10)
})

export default router
