<template>
  <section id="section3">
    <div class="s3_container">
      <div class="new_item">
        <p class="title">New! ITEM!</p>
        <p class="sub_text">언제나 새로운 신상품</p>
        <div class="newItem_box">
          <div class="item" v-for="i in NEWITEM" :key="i.id">
            <img :src="i.img">
            <p class="title">{{i.title}}</p>
            <p class="price">{{i.price}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  const NEWITEM = [
    {
      id:'1',
      img: require('../../assets/images/home/section2/new_img.png'),
      title:'크리스탈 보석 귀걸이',
      price:'45,000원'
    },
    {
      id:'2',
      img: require('../../assets/images/home/section2/new_img2.png'),
      title:'하트 목걸이',
      price:'58,000원'
    },
    {
      id:'3',
      img: require('../../assets/images/home/section2/new_img3.png'),
      title:'다이아몬드 플래티늄 반지',
      price:'135,000원'
    },
    {
      id:'4',
      img: require('../../assets/images/home/section2/new_img4.png'),
      title:'데일리 목걸이',
      price:'50,000원'
    }
  ]
  export default {
    name: "section3",
    data(){
      return{
        NEWITEM,
      }
    }
  }
</script>
