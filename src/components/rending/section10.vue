<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Top Wallet</p>
        <p class="sub_text">인기 지갑 <span @click="$router.push('/product/WALLET')">더보기</span></p>
        <div class="item_box">
          <div class="item" @click="$router.push('/Wallet/detail/384')">
            <img src="/media/products/wallet/384/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Dior</p>
              <p class="name">디올 새들 플랩 카드 홀더 블루 디올 오블리크 자카드</p>
              <p class="text">S5611CTZQ-M928/928U</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Wallet/detail/544')">
            <img src="/media/products/wallet/544/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Gucci</p>
              <p class="name">구찌 브라운 인테리어 GG 롱 카드 케이스 베이지 에보니</p>
              <p class="text">768249-FACQC-9773</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Wallet/detail/424')">
            <img src="/media/products/wallet/424/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Celine</p>
              <p class="name">셀린느 트리옹프 캔버스 플랩 카드 홀더 탄</p>
              <p class="text">10I582CPJ-04LU</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Wallet/detail/485')">
            <img src="/media/products/wallet/485/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Dior</p>
              <p class="name">디올 카드 홀더 베이지 & 블랙 디올 오블리크 자카드</p>
              <p class="text">2ESCH135YSE-H05E</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Wallet/detail/490')">
            <img src="/media/products/wallet/490/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Bottega Veneta</p>
              <p class="name">보테가 베네타 플랩 카드 케이스 다크 그린</p>
              <p class="text">592619VCPQ43009</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button @click="$router.push('/product/WALLET')">
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