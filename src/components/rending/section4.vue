<template>
  <section id="section4">
    <div class="s4_container">
      <img v-if="deskSize" src="../../assets/images/home/section4/img2.jpg">
      <img v-else src="../../assets/images/home/section4/img.jpg">
    </div>
  </section>
</template>

<script>
  export default {
    name: "section4",
    computed:{
      deskSize(){
        return this.windowWidth < 1024
      }
    },
    data(){
      return{
        windowWidth:window.innerWidth
      }
    },
    methods:{
      updateWidth(){
        this.windowWidth = window.innerWidth;
      }
    },
    mounted(){
      window.addEventListener('resize',this.updateWidth)
    }
   }
</script>