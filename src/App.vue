<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
    <img
        v-if="isLogin && partnerInfo && partnerInfo.kakaoUrl"
        @click="goToUrl(partnerInfo.kakaoUrl)"
        class="kakao_icon"
        src="../public/media/kakao_icon.png"
    />
    <popup-dialog :key="popup.id" :popup="popup" :visible.sync="popup.isShow" :width="popup.width"
                  v-for="popup in popupList"/>
<!--    <popup-dialog :key="popup.id + 'realTime'" :popup="popup" :visible.sync="popup.isShow" :width="popup.width"-->
<!--                  :realTime="true" v-for="popup in realtimePopupList"/>-->
  </div>
</template>

<script>
  import AdminLayout from "@/layout/AdminLayout";
  import NoLayout from "@/layout/NoLayout";
  import HomeLayout from "@/layout/home/HomeLayout";
  import {mapGetters} from "vuex";
  import PopupDialog from "./components/dialog/PopupDialog";


  export default {
    name: 'App',
    components: {
      NoLayout, HomeLayout, AdminLayout,PopupDialog
    },
    computed: {
      ...mapGetters('auth', ['isLogin', 'user',"partnerInfo"]),
      layout() {
        return (this.$route.meta.layout || 'No') + 'Layout'
      }
    },
    watch: {
      $route() {
        this.setupPopups();
      }
    },
    data(){
      return{
        popupList:[]
      }
    },
    methods:{
      goToUrl(url) {
        if (url) window.open(url, "_blank");
      },
      setupPopups() {
        const isHome = this.$route.path === '/';

        if (!isHome) {
          this.popupList = [];
          return;
        }

        const allPopups = [
          { id: 1, content: '/media/popup_img.png', type: 1, isShow: false, width: '384px' },
        ];

        this.popupList = allPopups
        .filter(p => !this.$cookies.get(`Hide_BX_Popup_${p.id}`))
        .map(p => ({ ...p, isShow: true }));
      }
    },
    created() {
      if (this.$route.path === '/') {
        this.setupPopups();
      }
    },
  }
</script>