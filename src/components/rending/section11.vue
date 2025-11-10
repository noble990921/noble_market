<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Top Shoes</p>
        <p class="sub_text">인기 신발 <span @click="$router.push('/product/SHOES')">더보기</span></p>
        <div class="item_box">
          <div class="item" @click="$router.push('/SHOES/detail/241')">
            <img src="/media/products/shoes/241/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Hermes</p>
              <p class="name">(W) 에르메스 오란 샌들 카프스킨 & 골드 피케르 에크루즈</p>
              <p class="text">H021056Z03</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/SHOES/detail/333')">
            <img src="/media/products/shoes/333/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Hermes</p>
              <p class="name">에르메스 이즈미르 샌들 카프스킨 & 블랑</p>
              <p class="text">H041141ZH02</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/SHOES/detail/354')">
            <img src="/media/products/shoes/354/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Dior</p>
              <p class="name">디올 알파 샌들 베이지 & 블랙 디올 오블리크 자카드</p>
              <p class="text">3SA081YXV-H961</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/SHOES/detail/224')">
            <img src="/media/products/shoes/224/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Hermes</p>
              <p class="name">에르메스 바운싱 스니커즈 카프스킨 스웨이드 고트스킨 & 블랑</p>
              <p class="text">H221898ZH91</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/SHOES/detail/288')">
            <img src="/media/products/shoes/288/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Valentino</p>
              <p class="name">(W) 발렌티노 가라바니 로만 스터드 카프스킨 슬라이드 샌들 블랙</p>
              <p class="text">S0BU9ZWM0NO</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button @click="$router.push('/product/SHOES')">
          더보기
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import 'swiper/css/swiper.css'
  export default {
    name: "section2",
    components: {
    },
    data() {
      return {
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