<template>
  <div class="product_brand" :id="`${brand}_View`">
    <div class="pb_container">
      <div id="brand_section1">
        <img v-if="!deskWidth" :src="require(`../../../public/media/brand/${brand}.png`)">
        <img v-else :src="require(`../../../public/media/brand/m${brand}.png`)">
      </div>
      <div id="brand_section2">
        <div class="product_item_container" v-loading="loading">
          <div class="product_item_container_top">
            <div class="product_header">
              <div class="text">
                <p class="etitle">{{ brandInfo.enName }}</p>
                <p class="ktitle">{{ brandInfo.koName }}</p>
              </div>
<!--              <el-select v-model="value" placeholder="-정렬방식-">-->
<!--                <el-option-->
<!--                    v-for="item in options"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
            </div>
            <div class="category_box">
              <ul>
                <li
                    v-for="(c, idx) in categories"
                    :key="idx"
                    :class="{ active: selectedCategory === c }"
                    @click="selectedCategory = c"
                >
                  <!--                <img :src="require(`@/assets/category/${reverseCategoryMap[c].img}.png`)">-->
                  <p>{{ reverseCategoryMap[c] ? reverseCategoryMap[c].label : '전체' }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="product_main">
            <div class="main_container">
              <div
                  v-for="i in displayedProducts"
                  :key="i.id"
                  class="product_list"
                  @click="$router.push(`/${brand}/detail/${i.id}`)"
              >
                              <img :src="i.img" />
                <p class="name">{{ i.title }}</p>
                <p class="price">가격문의</p>
              </div>
            </div>
          </div>
          <el-pagination
              class="da-pagination"
              :background="true"
              :hide-on-single-page="false"
              :page-size="size"
              :total="total"
              @current-change="handlePageChange"
              :current-page="page"
              layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {SET_CATEGORY_MAP, SET_PRODUCT_BRAND} from "@/constants/Set";
  import {db} from "@/firebase";
  const reverseCategoryMap = {
    "1": { label: "아우터", img: "outer" },
    "2": { label: "상의", img: "top" },
    "3": { label: "하의", img: "bottom" },
    "4": { label: "신발", img: "shoes" },
    "5": { label: "지갑", img: "wallet" },
    "6": { label: "가방", img: "bag" },
    "7": { label: "시계", img: "watch" },
    "8": { label: "악세사리", img: "accessory" },
  };
  export default {
    name: "brandView",
    props: {
      brand: {
        type: String,
        required: true
      }
    },
    watch: {
      value() {
        this.sortItems();
      },
    },
    computed: {
      deskWidth(){
        return this.windowWidth < 1024
      },
      displayedProducts() {
        if (this.selectedCategory === "전체") {
          return this.filteredProducts;
        }
        return this.filteredProducts.filter(product => product.category === this.selectedCategory);
      },
      brandInfo() {
        return Object.values(SET_PRODUCT_BRAND).find(b =>
            b.enName.replace(/\s+/g, '') === this.brand
        ) || {}; // 못 찾으면 빈 객체
      },

    },
    data() {
      return {
        reverseCategoryMap,
        SET_PRODUCT_BRAND,
        total: 0,
        size: 20,
        page: 1,
        pagedItems:[],
        options: [
          { value: "신상품", label: "신상품" },
          { value: "낮은가격", label: "낮은가격" },
          { value: "높은가격", label: "높은가격" },
        ],
        value: "",
        products: [],     // 전체 상품
        filteredProducts: [],  // 현재 브랜드에 속하는 상품
        categories: [],
        selectedCategory: "전체",
        loading:false,
        windowWidth: window.innerWidth
      };
    },
    methods:{
      async getData() {
        this.loading = true;
        const querySnapshot = await db.collection("products").orderBy("createDate", "desc").get();
        this.products = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createDate: data.createDate ? data.createDate.toDate() : null,
          };
        });

        // 브랜드별 필터
        this.filteredProducts = this.products.filter(product =>
            product.brand == this.brandInfo.id
        );
        console.log('123123',this.products)

        // 카테고리 뽑기
        const categorySet = new Set(
            this.filteredProducts.map(product => product.category)
        );
        this.categories = ["전체", ...Array.from(categorySet)];


        this.loading = false;
      },
      updateWidth(){
        this.windowWidth = window.innerWidth
      },
      getCategoryId() {
        return SET_CATEGORY_MAP[this.category] || "";
      },
      updatePagedItems() {
        const start = (this.page - 1) * this.size;
        const end = start + this.size;
        this.pagedItems = this.displayedProducts.slice(start, end);
      },
      handlePageChange(newPage) {
        this.page = newPage;
        this.updatePagedItems();
      },
      sortItems() {
        if (this.value === "낮은가격") {
          this.products.sort((a, b) => a.price - b.price);
        } else if (this.value === "높은가격") {
          this.products.sort((a, b) => b.price - a.price);
        } else if (this.value === "신상품") {
          this.products.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        }
        this.updatePagedItems();
      },
    },
    mounted(){
      window.addEventListener('resize',this.updateWidth)
    },
    created() {
      this.getData();
      console.log('넘어온 브랜드 이름:', this.brand);
      console.log('찾은 브랜드 정보:', this.brandInfo);
    }
  }
</script>