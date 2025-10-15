<template>
  <section id="section9">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">CELEB PICK</p>
        <p class="sub_text">셀럽 픽</p>
        <div class="swiper_box">
          <swiper :key="swiperKey" :options="currentSwiperOption">
            <swiper-slide v-for="product in displayProducts" :key="product.id">
              <div class="product_item" @click="goToProduct(product)">
                <img :src="product.thumbnail" :alt="product.name">
                <div class="product_info">
                  <p class="brand">{{ product.brand }}</p>
                  <p class="name">{{ product.name }}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <!--          <div v-if="!mobileVersion" class="swiper-pagination2"></div>-->
          <div v-if="!mobileVersion" class="swiper-button-next"></div>
          <div v-if="!mobileVersion" class="swiper-button-prev"></div>
        </div>
        <div class="view_more">
          <button @click="viewMore">더보기</button>
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
    name: "section9",
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