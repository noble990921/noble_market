<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Top Bag</p>
        <p class="sub_text">인기 가방 <span @click="$router.push('/product/Bag')">더보기</span></p>
        <div class="item_box">
          <div class="item" @click="$router.push('/Bag/detail/14')">
            <img src="/media/products/bag/14/mainImg.png">
            <div class="info_box">
              <p class="brand_name">Hermes</p>
              <p class="name">에르메스 버킨 25 백 토고 & 골드 하드웨어 골드</p>
              <p class="text">H041344CC37</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Bag/detail/19')">
            <img src="/media/products/bag/19/mainImg.png">
            <div class="info_box">
              <p class="brand_name">Dior</p>
              <p class="name">디올 숄더 스트랩 파우치 베이지 & 블랙 디올 오블리크 자카드</p>
              <p class="text">2OBBC119YSE-H05E</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Bag/detail/41')">
            <img src="/media/products/bag/41/mainImg.png">
            <div class="info_box">
              <p class="brand_name">Dior</p>
              <p class="name">디올 새들백 베이지 & 블랙 디올 오블리크 자카드</p>
              <p class="text">1ADPO093YKY-H28E</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Bag/detail/16')">
            <img src="/media/products/bag/16/mainImg.png">
            <div class="info_box">
              <p class="brand_name">Chanel</p>
              <p class="name">샤넬 스몰 백팩 그레인드 샤이니 카프스킨 & 골드 메탈 블랙</p>
              <p class="text">AS3787-B10184-94305/AS3787-B16985-94305</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Bag/detail/2')">
            <img src="/media/products/bag/2/mainImg.png">
            <div class="info_box">
              <p class="brand_name">Hermes Birkin30 Etoupe Gold</p>
              <p class="name">에르메스 벌킨30 에토프 금장</p>
              <p class="text">ITJF6B6V894I</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button @click="$router.push('/product/Bag')">
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