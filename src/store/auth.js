//import { auth } from '@/firebase';

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLogin: localStorage.getItem('isLogin') === 'true',
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isLogin = !!user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLogin', 'true');
      } else {
        localStorage.removeItem('user');
        localStorage.setItem('isLogin', 'false');
      }
    },
    LOGOUT(state) {
      state.user = null;
      state.isLogin = false;
      localStorage.removeItem('user');
      localStorage.setItem('isLogin', 'false');
    },
  },
  actions: {
    async login({ commit }, user) {
      commit("SET_USER", user);
    },
    async logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    user: (state) => state.user,
    isLogin: (state) => state.isLogin,
  },
};