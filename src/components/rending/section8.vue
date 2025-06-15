<template>
  <Section id="section8">
    <div class="s8_container">
      <div class="hot_item">
        <p class="title">NOBLE Service</p>
        <p class="sub_text">노블만의 프리미엄 고객 서비스</p>
        <div class="item_box">
          <div class="item" v-for=" s in SERVICEITEM" :key="s.id">
            <img :src="s.img">
            <div class="info_box">
              <p class="title">{{s.title}}</p>
              <p class="text">{{s.sub}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
  const SERVICEITEM =[
    {
      id:1,
      title:'인증서',
      sub:'포맷의 인증서 복제본 제공',
      img:require('../../assets/images/home/section8/s8_img.png')
    },{
      id:2,
      title:'프리미엄 패키징',
      sub:'고급 포장과 완성도 높은 출고 시스템',
      img:require('../../assets/images/home/section8/s8_img2.png')
    },{
      id:3,
      title:'출고 전 검수 사진',
      sub:'실물 제품 출고 전 검수사진 제공',
      img:require('../../assets/images/home/section8/s8_img3.png')
    },
  ]
  export default {
    name: "section8",
    components: {
    },
    computed:{
      deskWidth(){
        return this.windowWidth < 1024
      }
    },
    data() {
      return {
        SERVICEITEM,
        windowWidth: window.innerWidth
      }
    },
    methods:{
      updateWidth(){
        this.windowWidth = window.innerWidth
      }
    },
    mounted(){
      window.addEventListener('resize',this.updateWidth)
    }
  }
</script>