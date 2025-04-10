<template>
  <div id="NoLayout" >
    <Header/>
    <slot/>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../layout/Header'
  import Footer from "../layout/Footer";
  export default {
    name: "NoLayout",
    components:{
      Footer,
      Header
    }
  }
</script>