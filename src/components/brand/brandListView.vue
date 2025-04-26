<template>
  <div id="brandListView">
    <div class="brand_container" v-loading="loading">
      <div class="filter_tab">
        <ul>
          <li v-for="f in filterItems" :key="f.id"
              :class="{ active: selectedFilter === f.text }"
              @click="selectedFilter = f.text">
            {{ f.text }}
          </li>
        </ul>
      </div>

      <ul class="brand_list">
        <li v-for="f in filteredBrands" :key="f.id" @click="$router.push(`/brand/${f.enName.replace(/\s+/g, '')}`)">
          <img :src="f.img"/>
          <div class="text">
            <strong>{{ f.enName }}</strong>
            <p>{{ f.koName }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { db } from "@/firebase";
  import {SET_PRODUCT_BRAND} from "../../constants/Set"
  export default {
    name: "BrandListView",
    data() {
      return {
        selectedFilter: "전체",
        filterItems: [
          { id: 0, text: "전체" },
          { id: 1, text: "ㄱ" },
          { id: 2, text: "ㄴ" },
          { id: 3, text: "ㄷ" },
          { id: 4, text: "ㄹ" },
          { id: 5, text: "ㅁ" },
          { id: 6, text: "ㅂ" },
          { id: 7, text: "ㅅ" },
          { id: 8, text: "ㅇ" },
          { id: 9, text: "ㅈ" },
          { id: 10, text: "ㅊ" },
          { id: 11, text: "ㅋ" },
          { id: 12, text: "ㅌ" },
          { id: 13, text: "ㅍ" },
          { id: 14, text: "ㅎ" },
        ],
        brands: [],
        SET_PRODUCT_BRAND,
        loading: false
      };
    },
    computed: {
      filteredBrands() {
        if (this.selectedFilter === "전체"){
          return this.brands
        }else {
          return this.brands.filter(brand => {
            const firstChar = brand.koName.charAt(0);
            const chosung = this.getChosung(firstChar);
            return chosung === this.selectedFilter;
          });
        }
      },
    },
    methods:{
      getChosung(str) {
        const CHOSUNG_LIST = [
          "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ",
          "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ",
          "ㅌ", "ㅍ", "ㅎ"
        ];
        const code = str.charCodeAt(0) - 44032; // 한글 유니코드 시작점에서 얼만큼 떨어졌는지
        const chosungIndex = Math.floor(code / 588); // 초성 인덱스 계산
        return CHOSUNG_LIST[chosungIndex]; // 초성 리턴
      },
      async fetchBrandsFromProducts() {
        this.loading =true
        try {
          const snapshot = await db.collection("products").get();
          const brandKeySet = new Set();

          snapshot.forEach(doc => {
            const data = doc.data();
            const brandKey = data.brand; // 예: "1", "2" 같은 값
            if (brandKey && SET_PRODUCT_BRAND[brandKey]) {
              brandKeySet.add(brandKey);
            }
          });

          this.brands = Array.from(brandKeySet).map(key => SET_PRODUCT_BRAND[key]);
          console.log('brands',this.brands)
        } catch (err) {
          console.error("브랜드 목록 가져오기 실패:", err);
        }
        this.loading =false
      }
      },
    created() {
      this.fetchBrandsFromProducts()
    }
  };
</script>