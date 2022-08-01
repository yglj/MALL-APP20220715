import { createStore } from 'vuex'
import user from './user'
import cart from './cart'

export default createStore({
  state: {
    shops: [11,22,33,44,5,6,7,9],
    routerType: 'push'
  },
  getters: {
    shops:(state) => (shopId) => {
      return shopId ? [ state.shops.at(shopId) ] : state.shops
    },
    routerType: state => state.routerType
  },
  mutations: {
      changeRouterType(state, newRouterType){
        state.routerType = newRouterType
      }
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
