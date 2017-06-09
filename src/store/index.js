import Vue from 'vue'
import Vuex from 'vuex'
// import vuexI18n from 'vuex-i18n'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import ui from './modules/ui'
import user from './modules/user'
import filter from './modules/filter'
import pool from './modules/pool'
// import Mutations from './mutation-types'

Vue.use(Vuex)
const Store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    // i18n: vuexI18n.store,
    ui,
    user,
    filter,
    pool
  }
})

// Vue.use(vuexI18n.plugin, Store)

export default Store
