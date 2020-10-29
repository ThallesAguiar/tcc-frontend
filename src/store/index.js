import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
// import actions from './actions';

//modules
import auth from './modules/auth.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,

  mutations: mutations,

  // actions: actions,

  modules: {
    auth
  },
})
