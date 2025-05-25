<template>
  <div class="product_category" :id="`${category}_View`">
    <div class="pc_container" v-loading="loading">
      <div class="category_box">
        <ul>
          <li v-for="(s, idx) in subCategory" :key="idx"
              :class="{ active: selectedSubCategory === s.title }"
              @click="selectedSubCategory = s.title">
            <img :src="require(`../../../public/media/category/${s.img}.png`)">
            <p v-if="subCategory.length>0">{{ s.title }}</p>
          </li>
<!--          <li v-for="(s, idx) in 10" :key="idx"-->
<!--              :class="{ active: selectedSubCategory === s.title }"-->
<!--              @click="selectedSubCategory = s.title">-->
<!--            <img src="../../../public/media/category/all.png" alt="">-->
<!--            <p>all</p>-->
<!--          </li>-->
        </ul>
      </div>
      <div class="product_item_container">
        <div class="product_header">
          <p>총 <span>{{ total }}</span>개의 상품이 있습니다.</p>
<!--          <el-select v-model="value" placeholder="-정렬방식-">-->
<!--            <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </div>
        <div class="product_main">
          <div @click="$router.push(`/${category}/detail/${i.id}`)"
               class="product_list"
               v-for="i in pagedItems"
               :key="i.id">
            <img :src="i.mainImg[0]">
            <p class="brand_name">{{ i.brand }}</p>
            <p class="name">{{ i.enName }}</p>
            <p class="text">{{ i.name }}</p>
            <p class="price">가격문의</p>
          </div>
          <p v-if="!pagedItems.length">등록된 상품이 없습니다.</p>
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
</template>

<script>
//  import { db } from "../../firebase";
  import {SET_CATEGORY_MAP} from "../../constants/Set"

  export default {
    name: "CategoryView",
    props: ["category"],
    data() {
      return {
        SET_CATEGORY_MAP,
        total: 0,
        size: 25,
        page: 1,
        options: [
          { value: "신상품", label: "신상품" },
          { value: "낮은가격", label: "낮은가격" },
          { value: "높은가격", label: "높은가격" },
        ],
        value: "",
        product: [],
        pagedItems:[],
        subCategory: [], // subCategory를 배열로 초기화
        selectedSubCategory: "전체", // 전체 카테고리 선택,
        loading:false
      };
    },
    watch: {
      value() {
        this.sortItems();
      },
      selectedSubCategory() {
        this.page = 1;
        this.updatePagedItems();
      },
    },
    computed: {
      filteredProducts() {
        if (this.selectedSubCategory === "전체" || !this.selectedSubCategory) {
          return this.product;
        }
        return this.product.filter(
            (item) => item.subCategory?.title === this.selectedSubCategory // item.subCategory가 존재하는지 체크
        );
      },
    },
    methods: {

      //firebase 용 !
//      async getData() {
//        this.loading =true
//        try {
//          console.time("getProductData 응답시간");
//
//          const querySnapshot = await db.collection("products")
//          .where("category", "==", this.getCategoryId()) // 카테고리 필터 적용
//          .orderBy("createDate", "desc") // Firestore에서 정렬 적용
//          .get();
//
//          this.product = querySnapshot.docs.map((doc) => {
//            const data = doc.data();
//            return {
//              id: doc.id,
//              ...data,
//              createDate: data.createDate ? data.createDate.toDate() : null,
//            };
//          });
//          this.total = this.product.length;
//          this.updatePagedItems();
//
////          // subCategory 목록 처리 (전체를 포함한 목록)
////          const subCategorySet = new Set(this.product.map((p) => p.subCategory?.title ?? "전체"));
////          const subCategoryList = [
////            { title: "전체", img: "all" },
////            ...Array.from(subCategorySet).filter((s) => s !== "전체").map((title) => ({ title, img: `${title}_img` })),
////          ];
////          this.subCategory = subCategoryList;
//
//          const subCategoryMap = new Map();
//          this.product.forEach((p) => {
//            const title = p.subCategory?.title ?? "전체";
//            const img = p.subCategory?.img ?? "all";
//            const id = p.subCategory?.id ;
//            if (!subCategoryMap.has(title)) {
//              subCategoryMap.set(title, { img, id });
//            }
//          });
//          const subCategoryList = [
//            { title: "전체", img: "all", id: 0 },
//            ...Array.from(subCategoryMap.entries())
//            .filter(([title]) => title !== "전체")
//            .map(([title, { img, id }]) => ({ title, img, id }))
//            .sort((a, b) => a.id - b.id),
//          ];
//
//          this.subCategory = subCategoryList;
////          console.log('sss', this.subCategory)
//
//          console.timeEnd("getProductData 응답시간");
//        } catch (error) {
//          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
//        }
//        this.loading =false
//      },
//      getCategoryId() {
////        const categoryMap = {
////          OUTER: "1",
////          TOP: "2",
////          BOTTOM: "3",
////          SHOES: "4",
////          WALLET: "5",
////          BAG: "6",
////          WATCH: "7",
////          ACC: "8",
////        };
//        return SET_CATEGORY_MAP[this.category] || "";
//      },
      async getData() {
        this.loading = true;
        try {
          const module = await import(`../../data/products/${this.category.toLowerCase()}.js`);
          this.product = Object.values(module.PRODUCTS); // outer.js 파일에 export const PRODUCTS = { ... }

          this.total = this.product.length;
          this.updatePagedItems();

          // 하위 카테고리 정리
          const subCategoryMap = new Map();
          this.product.forEach((p) => {
            const title = p.subCategory?.title ?? "전체";
            const img = p.subCategory?.img ?? "all";
            const id = p.subCategory?.id;
            if (!subCategoryMap.has(title)) {
              subCategoryMap.set(title, { img, id });
            }
          });
          const subCategoryList = [
            { title: "전체", img: "all", id: 0 },
            ...Array.from(subCategoryMap.entries())
            .filter(([title]) => title !== "전체")
            .map(([title, { img, id }]) => ({ title, img, id }))
            .sort((a, b) => a.id - b.id),
          ];

          this.subCategory = subCategoryList;

        } catch (e) {
          console.error("카테고리 데이터 로딩 실패:", e);
        }
        this.loading = false;
      },
      updatePagedItems() {
        const start = (this.page - 1) * this.size;
        const end = start + this.size;
        this.pagedItems = this.filteredProducts.slice(start, end);
      },
      handlePageChange(newPage) {
        this.page = newPage;
        this.updatePagedItems();
      },
      sortItems() {
        if (this.value === "낮은가격") {
          this.product.sort((a, b) => a.price - b.price);
        } else if (this.value === "높은가격") {
          this.product.sort((a, b) => b.price - a.price);
        } else if (this.value === "신상품") {
          this.product.sort((a, b) => b.createDate - a.createDate);
        }
        this.updatePagedItems();
      },
    },
    created() {
      this.getData();
    },
  };
</script>