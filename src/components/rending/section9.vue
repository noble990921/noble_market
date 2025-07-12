<template>
  <section id="section9">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">CELEB PICK</p>
        <p class="sub_text">셀럽 픽</p>
        <div class="swiper_box">
          <swiper :key="swiperKey" :options="currentSwiperOption">
            <swiper-slide v-for="h in INFLUENCER_IMG_DATA" :key="h.id">
              <img :src="h.img">
            </swiper-slide>
          </swiper>
          <!--          <div v-if="!mobileVersion" class="swiper-pagination2"></div>-->
          <div v-if="!mobileVersion" class="swiper-button-next"></div>
          <div v-if="!mobileVersion" class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {INFLUENCER_IMG_DATA} from '../../../public/plugins/influencer/influencerData'
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css'

  export default {
    name: "section2",
    components: {
      Swiper, SwiperSlide
    },
    data() {
      return {
        destSwiperOption: {
          slidesPerView: 6,
          spaceBetween: 12,
          autoplay: false,
          centerInsufficientSlides: true,
          allowTouchMove: true,
          pagination: {
            el: '.swiper-pagination2',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        mobileSwiperOption: {
          slidesPerView: 2.7,
          spaceBetween: 8,
          autoplay: false,
          centerInsufficientSlides: true,
          allowTouchMove: true,
          centeredSlides: false,
        },
        mobileVersion: '', swiperKey: 0,
        currentSwiperOption: {}, INFLUENCER_IMG_DATA
      }
    },
    methods: {
      updateSwiperOption() {
        const vm = this
        if (window.innerWidth < 1024) {
          vm.currentSwiperOption = vm.mobileSwiperOption
          vm.mobileVersion = true
        } else {
          vm.currentSwiperOption = vm.destSwiperOption
          vm.mobileVersion = false
        }
        vm.swiperKey += 1;
      }
    },
    mounted() {
      const vm = this;
      vm.updateSwiperOption();
      window.addEventListener('resize', vm.updateSwiperOption)
    },
  }
</script>