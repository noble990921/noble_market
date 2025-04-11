<template>
  <section id="section1">
    <div class="s1_container">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img class="background-image" v-if="deskWidth" src="../../assets/images/home/section1/s1_m_img.png">
          <img class="background-image" v-else src="../../assets/images/home/section1/s1_img.png">
        </swiper-slide>
        <swiper-slide>
          <img class="background-image" v-if="deskWidth" src="../../assets/images/home/section1/s1_m_img2.png">
          <img class="background-image" v-else src="../../assets/images/home/section1/s1_img2.png">
        </swiper-slide>
        <swiper-slide>
          <img class="background-image" v-if="deskWidth" src="../../assets/images/home/section1/s1_m_img3.png">
          <img class="background-image" v-else src="../../assets/images/home/section1/s1_img3.png">
        </swiper-slide>
        <swiper-slide>
          <img class="background-image" v-if="deskWidth" src="../../assets/images/home/section1/s1_m_img4.png">
          <img class="background-image" v-else src="../../assets/images/home/section1/s1_img4.png">
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css'
  export default {
    name: "section1",
    components:{
      Swiper, SwiperSlide
    },
    computed:{
      deskWidth(){
        return this.windowWidth < 1024
      }
    },
    data(){
      return{
        swiperOption: {
          slidesPerView: 'auto',
          autoplay: {delay: 10000, disableOnInteraction: false},
          freeMode: true,
          centerInsufficientSlides: true,
          allowTouchMove: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
        windowWidth: window.innerWidth
      }
    },
    methods:{
      updateWidth(){
        this.windowWidth = window.innerWidth
      }
    },
    mounted(){
      window.addEventListener('resize',this.updateWidth)
    }
  }
</script>