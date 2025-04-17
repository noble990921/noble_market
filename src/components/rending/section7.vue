<template>
  <Section id="section7">
    <div class="s7_container">
      <div class="brand_item">
        <div class="item_box" v-for="b in BRANDITEM" :key="b.id">
          <img :src="b.img" v-if="!deskWidth">
          <img :src="b.mimg" v-else>
          <p class="title">{{b.title}}</p>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
  const BRANDITEM = [
    {
      id:'1',
      img: require('../../assets/images/home/section7/brand_logo.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo.png'),
      title:'구찌',
    },{
      id:'2',
      img: require('../../assets/images/home/section7/brand_logo2.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo2.png'),
      title:'디올',
    },{
      id:'3',
      img: require('../../assets/images/home/section7/brand_logo3.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo3.png'),
      title:'루이비통',
    },{
      id:'4',
      img: require('../../assets/images/home/section7/brand_logo4.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo4.png'),
      title:'몽클',
    },{
      id:'5',
      img: require('../../assets/images/home/section7/brand_logo5.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo5.png'),
      title:'보테가',
    },{
      id:'6',
      img: require('../../assets/images/home/section7/brand_logo6.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo6.png'),
      title:'샤넬',
    },{
      id:'7',
      img: require('../../assets/images/home/section7/brand_logo7.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo7.png'),
      title:'에르메스',
    },{
      id:'8',
      img: require('../../assets/images/home/section7/brand_logo8.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo8.png'),
      title:'입생로랑',
    },{
      id:'9',
      img: require('../../assets/images/home/section7/brand_logo9.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo9.png'),
      title:'톰브',
    },{
      id:'10',
      img: require('../../assets/images/home/section7/brand_logo10.png'),
      mimg: require('../../assets/images/home/section7/mbrand_logo10.png'),
      title:'프라다',
    },
  ]
//  const BRANDITEM2 = [
//    {
//      id:'1',
//      img: require('../../assets/images/home/section7/1.png'),
//      title:'디올',
//    },
//    {
//      id:'2',
//      img: require('../../assets/images/home/section7/1.png'),
//      title:'디올',
//    },
//    {
//      id:'3',
//      img: require('../../assets/images/home/section7/1.png'),
//      title:'디올',
//    },
//    {
//      id:'4',
//      img: require('../../assets/images/home/section7/1.png'),
//      title:'디올',
//    },
//    {
//      id:'5',
//      img: require('../../assets/images/home/section7/1.png'),
//      title:'디올',
//    },
//  ]
  export default {
    name: "section7",
    components: {
    },
    computed:{
      deskWidth(){
        return this.windowWidth < 1024
      }
    },
    data() {
      return {
        BRANDITEM,
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