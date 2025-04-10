import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import getters from './modules/Getters'
import actions from './modules/Actions'
import mutations from './modules/Mutations'

Vue.use(Vuex);

const state = {

}

export default new Vuex.Store({
  modules: {
    auth,
  },
  state,
  mutations,
  getters,
  actions,
});