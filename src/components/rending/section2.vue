<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Top Clothes</p>
        <p class="sub_text">인기 의류 <span @click="$router.push('/product/TOP')">더보기</span></p>
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
          <div class="item" @click="$router.push('/TOP/detail/103')">
            <img src="/media/products/top/103/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Wooyoungmi</p>
              <p class="name">우영미 3D 플라워 백로고 티셔츠 블랙</p>
              <p class="text">W243TS05708B</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/TOP/detail/137')">
            <img src="/media/products/top/137/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Wooyoungmi</p>
              <p class="name">우영미 코튼 백로고 티셔츠 블랙</p>
              <p class="text">W251TS07708B</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/TOP/detail/147')">
            <img src="/media/products/top/147/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Moncler</p>
              <p class="name">몽클레르 트라이컬러 트림 코튼 티셔츠 오프 화이트</p>
              <p class="text">K1-091-8C71600-87296-004</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/TOP/detail/162')">
            <img src="/media/products/top/162/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Dior</p>
              <p class="name">디올 자카드 오블리크 폴로 셔츠 화이트 블루 브라운</p>
              <p class="text">293M832AT396-C085</p>
            </div>
          </div>
          <div class="item" @click="$router.push('/OUTER/detail/53')">
            <img src="/media/products/outer/53/mainImg.webp">
            <div class="info_box">
              <p class="brand_name">Thom Browne</p>
              <p class="name">(W) 톰브라운 파인 메리노 울 밀라노 스티치 사선 클래식 브이넥 가디건 네이비</p>
              <p class="text">FKC207A-00014-415</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button @click="$router.push('/product/TOP')">
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