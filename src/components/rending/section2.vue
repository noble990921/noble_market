<template>
  <section id="section2">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">Best</p>
        <p class="sub_text">인기상품</p>
        <div class="item_box">
          <div class="item" v-for=" h in HOTITEM" :key="h.id">
            <img :src="h.img">
            <div class="info_box">
              <p class="title">{{h.title}}</p>
              <p class="text">{{h.text}}</p>
              <p class="price">{{h.price}}원</p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <button>
          더보기
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  const HOTITEM = [
    {
      id:'1',
      img: require('../../assets/images/home/section2/1.jpg'),
      title:'까르띠에',
      text:'까르띠에 러브 팔찌',
      price:'123,123'
    },
    {
      id:'2',
      img: require('../../assets/images/home/section2/2.jpg'),
      title:'까르띠에',
      text:'까르띠에 러브링 웨딩 밴드',
      price:'123,123'
    },
    {
      id:'3',
      img: require('../../assets/images/home/section2/3.png'),
      title:'오데마피게',
      text:'오데마피게 로얄오크 15400ST 스틸 검판',
      price:'123,123'
    },
    {
      id:'4',
      img: require('../../assets/images/home/section2/4.jpg'),
      title:'오데마피게',
      text:'오데마피게 로얄오크',
      price:'123,123'
    },
    {
      id:'5',
      img: require('../../assets/images/home/section2/5.jpg'),
      title:'오데마피게',
      text:'오데마피게 로얄오크',
      price:'123,123'
    },
  ]
  import 'swiper/css/swiper.css'
  export default {
    name: "section2",
    components: {
    },
    data() {
      return {
        HOTITEM

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