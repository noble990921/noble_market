import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from './modules/Home'
import SignRouter from './modules/Sign'
import AdminRouter from './modules/Admin'
import store from '../store';
//import {mapGetters} from "vuex";

Vue.use(Router)

const routes = [
  ...HomeRouter,
  ...SignRouter,
  ...AdminRouter
]

const router = new Router({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  const {requiresAuth , requiredRole} = to.meta;
  const isLogin = store.getters['auth/isLogin'];
  const user = store.getters['auth/user'];

  if (to.path === '/login') {
    next();
    return;
  }

  if (requiredRole) {
    // requiredRole이 'admin'인 경우 admin만 허용
    if (requiredRole === 'admin') {
      if (!isLogin || !user || user.role !== 'admin') {
        Vue.prototype.$alert('해당 페이지는 최고 관리자만 접근 가능합니다.', '알림');
        next('/');
        return;
      }
    }
    // requiredRole이 true인 경우 admin 또는 partner 허용
    else if (requiredRole === true) {
      if (!isLogin || !user || !(user.role === 'admin' || user.role === 'partner')) {
        Vue.prototype.$alert('관리자 권한이 필요합니다. 관리자 계정으로 로그인 해주세요.', '알림');
        next('/');
        return;
      }
    }
  }

  if (requiresAuth) {
    if (!isLogin && !user) {
      sessionStorage.setItem('redirectTo', to.fullPath);
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  window.scrollTo(0, 0)
  const redirectTo = sessionStorage.getItem('redirectTo');
  if (redirectTo && to.path === '/login') {
    sessionStorage.removeItem('redirectTo');
    router.push(redirectTo);
  }
});

export default router;

