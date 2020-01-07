import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import index from './modules/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    index
  },
  state: {
    direction: 'forward'
  },
  mutations: {
    updateDirection (state, direction) {
      state.direction = direction;
    }
  },
  actions: {}
});