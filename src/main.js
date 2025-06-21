import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko';
import Vuelidate from "vuelidate";
//import { auth,db } from "@/firebase";
import './common/plugins/filter';
import BootstrapVue from 'bootstrap-vue';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueMoment from 'vue-moment'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)



/** authService.js 파일에 loginWithEmail 기능과 같아서 일단 주석처리 ,만들었던 이유는? 새로고침할때 로그인 풀려서 (그건 localStorage 처리)* */
//auth.onAuthStateChanged(async (user) => {
//  if (user) {
//    // 로그인 상태일 경우 Vuex에 사용자 정보를 저장
//    const userDoc = await db.collection("users").doc(user.uid).get();
//    store.dispatch("auth/login", {
//      uid: user.uid,
//      email: user.email,
//      name: userDoc.data()?.name,
//      role: userDoc.data()?.role,
//    });
//  } else {
//    // 로그아웃 상태일 경우 Vuex 초기화
//    store.dispatch("auth/logout");
//  }
//});

Vue.use(Vuelidate);
Vue.use(BootstrapVue)
Vue.use(VueMoment)

import store from './store';
Vue.use(ElementUI, { locale })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


// F12, Ctrl+Shift+I 차단
//document.addEventListener('keydown', function (e) {
//  if ((e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F12') {
//    e.preventDefault();
////    alert('개발자 도구 차단됨');
//    return;
//  }
//});
//// 마우스 우클릭 차단
//document.addEventListener('contextmenu', function (e) {
//  e.preventDefault();
//});