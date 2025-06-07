<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Top Watch</p>
        <p class="sub_text">인기 시계</p>
        <div class="item_box">
          <div class="item" @click="$router.push('/Watch/detail/562')">
            <img src="/media/products/watch/562/mainImg.webp">
            <div class="info_box">
              <p class="title">Rolex</p>
              <p class="text">롤렉스 서브마리너 데이트 41mm 블랙 오이스터</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Watch/detail/570')">
            <img src="/media/products/watch/570/mainImg.webp">
            <div class="info_box">
              <p class="title">Richard</p>
              <p class="text">리차드밀 플라이백 크로노그래프</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Watch/detail/594')">
            <img src="/media/products/watch/594/mainImg.webp">
            <div class="info_box">
              <p class="title">Audemars Piguet</p>
              <p class="text">오데마 피게 로얄 오크 15500ST 검판</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Watch/detail/590')">
            <img src="/media/products/watch/590/mainImg.webp">
            <div class="info_box">
              <p class="title">Rolex</p>
              <p class="text">롤렉스 GMT-마스터 2 40mm 블랙 오이스터</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/Watch/detail/581')">
            <img src="/media/products/watch/581/mainImg.webp">
            <div class="info_box">
              <p class="title">Rolex</p>
              <p class="text">롤렉스 GMT-마스터 2 40mm 블랙 쥬빌리</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button @click="$router.push('/product/Watch')">
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