//import { auth } from '@/firebase';
import { db } from '@/firebase';
export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLogin: localStorage.getItem('isLogin') === 'true',
    partnerInfo: JSON.parse(localStorage.getItem('partnerInfo')) || null, // 추가
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
        localStorage.removeItem('partnerInfo');
      }
    },
    LOGOUT(state) {
      state.user = null;
      state.isLogin = false;
      localStorage.removeItem('user');
      localStorage.setItem('isLogin', 'false');
    },
    SET_PARTNER_INFO(state, info) {
      state.partnerInfo = info;
      localStorage.setItem("partnerInfo", JSON.stringify(info));
    },
  },
  actions: {
//    async login({ commit }, user) {
//      commit("SET_USER", user);
//    },
//    async logout({ commit }) {
//      commit("LOGOUT");
//    },
    async login({ commit, dispatch }, authUser) {
      const userDoc = await db.collection("users").doc(authUser.uid).get();
      const userData = userDoc.data();

//      console.log("📄 유저 정보 로드됨:", userData);
      commit("SET_USER", userData);

      if (userData?.partnerCode) {
        console.log("✅ partnerCode 있음:", userData.partnerCode);

        // ➕ 만약 유저가 partner라면, partnerCode 기준 admin만 찾기
        if (userData.role === 'partner') {
          console.log("🔁 partner이므로 admin 기준으로 fetch");
          await dispatch("fetchAdminInfoByPartnerCode", userData.partnerCode);
        } else {
          await dispatch("fetchPartnerInfo", userData.partnerCode);
        }
      } else {
        console.warn("❌ partnerCode 없음!");
      }
    },
    async fetchAdminInfoByPartnerCode({ commit }) {
      const snapshot = await db
      .collection("users")
      .where("partnerCode", "==", "main")
      .where("role", "==", "admin")
      .get();

      if (!snapshot.empty) {
        const adminData = snapshot.docs[0].data();
        console.log("👑 admin info 로드됨:", adminData);
        commit("SET_PARTNER_INFO", adminData);
      } else {
        console.warn("❗ partnerCode로 admin 유저 못 찾음");
      }
    },

    async logout({ commit }) {
      commit("LOGOUT");
    },

    // ✅ 추천인 정보 불러오기
    async fetchPartnerInfo({ commit }, partnerCode) {
      console.log("📦 fetchPartnerInfo 실행됨", partnerCode);
      const snapshot = await db
      .collection("users")
      .where("partnerCode", "==", partnerCode)
      .where("role", "in", ["admin", "partner"])
      .get();

//      console.log("🔥 partner snapshot", snapshot.empty ? '비어있음' : snapshot.docs[0].data());

      if (!snapshot.empty) {
        const partnerData = snapshot.docs[0].data();
        commit("SET_PARTNER_INFO", partnerData);
      }
    },

  },
  getters: {
    user: (state) => state.user,
    isLogin: (state) => state.isLogin,
    partnerInfo: (state) => state.partnerInfo,
  },
};