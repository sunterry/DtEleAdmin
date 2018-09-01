import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import routings from './modules/routings'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    routings
  }
})
