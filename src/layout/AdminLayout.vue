<template>
  <div id="AdminLayout" >
    <Header/>
    <div id="AdminDashboard">
    <slot/>
    </div>
  </div>
</template>

<script>
  import Header from "../admin/AdminHeader";
  export default {
    name: "AdminLayout",
    components:{
      Header
    }
  }
</script>