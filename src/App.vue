<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
    <img v-if="isLogin" class="kakao_icon" src="../public/media/kakao_icon.png"/>
  </div>
</template>

<script>
  import AdminLayout from "@/layout/AdminLayout";
  import NoLayout from "@/layout/NoLayout";
  import HomeLayout from "@/layout/home/HomeLayout";
  import {mapGetters} from "vuex";

  export default {
    name: 'App',
    components: {
      NoLayout, HomeLayout, AdminLayout
    },
    computed: {
      ...mapGetters('auth', ['isLogin', 'user']),
      layout() {
        return (this.$route.meta.layout || 'No') + 'Layout'
      }
    }
  }
</script>