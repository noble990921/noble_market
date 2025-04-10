<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">HOT! ITEM!</p>
        <p class="sub_text">요즘 가장 핫한 상품 온스토어</p>
        <div class="swiper_box">
          <swiper :key="swiperKey" :options="currentSwiperOption">
            <swiper-slide v-for="h in HOTITEM" :key="h.id">
              <img :src="h.img">
              <div class="text_box">
                <div class="content">
                  <p class="title">{{h.title}}</p>
                  <p class="text">{{h.text}}</p>
                </div>
                <i class="el-icon-right"></i>
              </div>
            </swiper-slide>
          </swiper>
          <div v-if="!mobileVersion" class="swiper-pagination2"></div>
          <div v-if="!mobileVersion" class="swiper-button-next"></div>
          <div v-if="!mobileVersion" class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  const HOTITEM = [
    {
      id:'1',
      img: require('../../assets/images/home/section2/1.jpg'),
      title:'까르띠에 러브 팔찌',
      text:'자세히 살펴보기'
    },
    {
      id:'2',
      img: require('../../assets/images/home/section2/2.jpg'),
      title:'까르띠에 러브링 웨딩 밴드',
      text:'자세히 살펴보기'
    },
    {
      id:'3',
      img: require('../../assets/images/home/section2/3.png'),
      title:'오데마피게 로얄오크 15400ST 스틸 검판',
      text:'자세히 살펴보기'
    },
    {
      id:'4',
      img: require('../../assets/images/home/section2/4.jpg'),
      title:'오데마피게 로얄오크',
      text:'자세히 살펴보기'
    },
    {
      id:'5',
      img: require('../../assets/images/home/section2/5.jpg'),
      title:'오데마피게 로얄오크',
      text:'자세히 살펴보기'
    },
    {
      id:'6',
      img: require('../../assets/images/home/section2/6.jpg'),
      title:'오데마피게 로얄오크',
      text:'자세히 살펴보기'
    }
  ]
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css'
  export default {
    name: "section2",
    components: {
      Swiper, SwiperSlide
    },
    data() {
      return {
        destSwiperOption: {
          slidesPerView: '3',
          spaceBetween: 20,
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
          slidesPerView: '1.2',
          spaceBetween: 12,
          autoplay: false,
          centerInsufficientSlides: true,
          allowTouchMove: true,
          centeredSlides: true,
        },
        HOTITEM,mobileVersion:'',swiperKey:0,
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