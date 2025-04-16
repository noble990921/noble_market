<template>
  <Section id="section7">
    <div class="s7_container">
      <div class="hot_item">
<!--        <p class="title">Brand</p>-->
<!--        <p class="sub_text">요즘 가장 핫한 상품 온스토어</p>-->
<!--        <div class="swiper_box">-->
<!--          <swiper :key="swiperKey" :options="currentSwiperOption">-->
<!--            <swiper-slide v-for="h in BRANDITEM" :key="h.id">-->
<!--              <img :src="h.img">-->
<!--              <div class="text_box">-->
<!--                <div class="content">-->
<!--                  <p class="title">{{h.title}}</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </swiper-slide>-->
<!--          </swiper>-->
<!--          <div v-if="!mobileVersion" class="swiper-pagination2"></div>-->
<!--          <div v-if="!mobileVersion" class="swiper-button-next"></div>-->
<!--          <div v-if="!mobileVersion" class="swiper-button-prev"></div>-->
<!--        </div>-->
<!--        <div class="swiper_box">-->
<!--          <swiper :key="swiperKey" :options="currentSwiperOption">-->
<!--            <swiper-slide v-for="h in BRANDITEM2" :key="h.id">-->
<!--              <img :src="h.img">-->
<!--              <div class="text_box">-->
<!--                <div class="content">-->
<!--                  <p class="title">{{h.title}}</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </swiper-slide>-->
<!--          </swiper>-->
<!--          <div v-if="!mobileVersion" class="swiper-pagination2"></div>-->
<!--          <div v-if="!mobileVersion" class="swiper-button-next"></div>-->
<!--          <div v-if="!mobileVersion" class="swiper-button-prev"></div>-->
<!--        </div>-->
      </div>
    </div>
  </Section>
</template>

<script>
  const BRANDITEM = [
    {
      id:'1',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'2',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'3',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'4',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'5',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
  ]
  const BRANDITEM2 = [
    {
      id:'1',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'2',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'3',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'4',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
    {
      id:'5',
      img: require('../../assets/images/home/section7/1.png'),
      title:'디올',
    },
  ]
//  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
//  import 'swiper/css/swiper.css'
  export default {
    name: "section7",
    components: {
//      Swiper, SwiperSlide
    },
    data() {
      return {
        destSwiperOption: {
          slidesPerView: '5',
          spaceBetween: 20,
          autoplay: false,
          freeMode:false,
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
          slidesPerView: '3',
          spaceBetween: 12,
          autoplay: false,
          freeMode:false,
          centerInsufficientSlides: true,
          allowTouchMove: true,
          centeredSlides: true,
        },
        BRANDITEM2,BRANDITEM,mobileVersion:'',swiperKey:0,
        currentSwiperOption: {}

      }
    },
    methods:{
      updateSwiperOption(){
        const vm = this
        if(window.innerWidth<1024){
          vm.currentSwiperOption = vm.mobileSwiperOption
          vm.mobileVersion = true
        }else{
          vm.currentSwiperOption = vm.destSwiperOption
          vm.mobileVersion = false
        }
        vm.swiperKey += 1;
      }
    },
    mounted() {
      const vm = this;
      vm.updateSwiperOption();
      window.addEventListener('resize',vm.updateSwiperOption)
    },
  }
</script>