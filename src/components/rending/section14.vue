<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Top ACC</p>
        <p class="sub_text">인기 악세사리</p>
<!--        <div class="item_box">-->
<!--          <div class="item" v-for=" h in HOTITEM" :key="h.id">-->
<!--            <img :src="h.img">-->
<!--            <div class="info_box">-->
<!--              <p class="title">{{h.title}}</p>-->
<!--              <p class="text">{{h.text}}</p>-->
<!--              <p class="price">{{h.price}}원</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="item_box">
          <div class="item" @click="$router.push('/ACC/detail/623')">
            <img src="/media/products/acc/623/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Damiani</p>
              <p class="name">다미아니 벨에포크 다이아몬드 네클리스 화이트 골드</p>
              <p class="text">20083507/20083490/20073457/20073470</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/ACC/detail/638')">
            <img src="/media/products/acc/638/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Cartier</p>
              <p class="name">까르띠에 러브 브레이슬릿 스몰 옐로우 골드</p>
              <p class="text">B60475</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/ACC/detail/630')">
            <img src="/media/products/acc/630/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Bulgari</p>
              <p class="name">불가리 세이브 더 칠드런 네클리스 스털링 실버</p>
              <p class="text">361007</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/ACC/detail/695')">
            <img src="/media/products/acc/695/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Cartier</p>
              <p class="name">까르띠에 러브 웨딩 밴드 옐로우 골드</p>
              <p class="text">B40850</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/ACC/detail/657')">
            <img src="/media/products/acc/657/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Hermes</p>
              <p class="name">(W) 에르메스 클릭아슈 브레이슬릿 로즈 골드 하드웨어 & 블랑</p>
              <p class="text">H700001FO31</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button @click="$router.push('/product/ACC')">
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