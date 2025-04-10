<template>
  <div id="app">
    <componet :is="layout">
      <router-view></router-view>
    </componet>
  </div>
</template>

<script>
import AdminLayout from "@/layout/AdminLayout";
import NoLayout from "@/layout/NoLayout";
import HomeLayout from "@/layout/home/HomeLayout";

export default {
  name: 'App',
  components: {
    NoLayout,HomeLayout,AdminLayout
  },
  computed:{
    layout(){
      return (this.$route.meta.layout || 'No') + 'Layout'
    }
  }
}
</script>