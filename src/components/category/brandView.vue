<template>
  <div id="brandView">
    <div class="brand_container">
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
        <li v-for="f in filteredBrands" :key="f.id">
          <img src="../../assets/images/home/section7/mbrand_logo.png"/>
          <div>
            <strong>{{ f.enName }}</strong>
            <p>{{ f.koName }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BrandView",
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
        brands: [
          {id:1, enName:'Gucci',koName:'구찌'},
          {id:2, enName:'Christian Dior',koName:'크리스챤 디올'},
          {id:3, enName:'Louis Vuitton',koName:'루이 비통'},
          {id:4, enName:'Moncler',koName:'몽클레르'},
          {id:5, enName:'Bottega Veneta',koName:'보테가 베네타'},
          {id:6, enName:'Chanel',koName:'샤넬'},
          {id:7, enName:'Hermes',koName:'에르메스'}
        ],
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
      }
    },
    created() {

    }
  };
</script>