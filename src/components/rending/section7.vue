<template>
  <Section id="section7">
    <div class="s7_container">
      <div class="brand_item">
        <div class="item_box" v-for="b in brandList" :key="b.id" @click="$router.push(b.url)">
          <div class="brand_img">
            <img :src="b.img" v-if="!deskWidth">
            <img :src="b.mimg" v-else>
          </div>
            <p class="title">{{b.koName}}</p>
<!--          <div class="add_item" v-else>-->
<!--            <div>-->
<!--              <i class="el-icon-arrow-right"></i>-->
<!--            </div>-->
<!--            <p class="title">{{b.title}}</p>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
  import { SET_PRODUCT_BRAND } from "../../constants/Set";
  export default {
    name: "section7",
    components: {
    },
    computed:{
      deskWidth(){
        return this.windowWidth < 1024
      },
    },
    data() {
      return {
        SET_PRODUCT_BRAND,
        brandList: [],
        windowWidth: window.innerWidth
      }
    },
    methods:{
      updateWidth(){
        this.windowWidth = window.innerWidth
      },
      //      localStorage를 활용해 "brandList-2025-6-13" 같은 키로 하루 기준 캐시를 유지합니다.
//
//      날짜가 바뀌면 자동으로 새로운 9개를 Fisher-Yates Shuffle을 통해 추출합니다.
//
//      koName을 제목으로 출력하고, 이미지는 deskWidth 기준으로 데스크탑/모바일 구분합니다.
      getTodayKey() {
        const today = new Date();
        return `brandList-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      },
      initializeBrandList() {
        const todayKey = this.getTodayKey();
        const saved = localStorage.getItem(todayKey);

        if (saved) {
          this.brandList = JSON.parse(saved);
        } else {
          const allBrands = Object.values(SET_PRODUCT_BRAND);

          // "더보기" 같은 고정 id 혹은 koName은 제외
          const filtered = allBrands.filter(b => b.koName !== "더보기");

          // 랜덤 셔플
          for (let i = filtered.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
          }

          const random9 = filtered.slice(0, 9);

          // "더보기" 항목 정의 (10번째 고정)
          const moreItem = {
            id: "more",
            koName: "더보기",
            img: require('../../assets/images/home/section7/add.png'),
            mimg: require('../../assets/images/home/section7/madd.png'),
            url: "/brand"
          };

          const finalList = [...random9, moreItem];
          this.brandList = finalList;
          localStorage.setItem(todayKey, JSON.stringify(finalList));
        }
      },
    },
    mounted(){
      this.initializeBrandList();
      window.addEventListener('resize',this.updateWidth)
    }
  }
</script>