<template>
  <div class="product_category" :id="`${category}_View`">
    <div class="pc_container">
      <div class="category_box">
        <ul>
          <li v-for="(s, idx) in subCategory" :key="idx"
              :class="{ active: selectedSubCategory === s.title }"
              @click="selectedSubCategory = s.title">
            <p>{{ s.title }}</p>
          </li>
        </ul>
      </div>
      <div class="product_item_container">
        <div class="product_header">
          <p>총 <span>{{ total }}</span>개의 상품이 있습니다.</p>
          <el-select v-model="value" placeholder="-정렬방식-">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="product_main">
          <div @click="$router.push(`/${category}/detail/${i.id}`)"
               class="product_list"
               v-for="i in filteredProducts"
               :key="i.id">
            <img :src="i.img">
            <p class="name">{{ i.title }}</p>
            <p class="price">{{ i.price | formatNumber }}원</p>
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
</template>

<script>
  import { db } from "../../firebase";

  export default {
    name: "CategoryView",
    props: ["category"],
    data() {
      return {
        total: 0,
        size: 20,
        page: 1,
        options: [
          { value: "신상품", label: "신상품" },
          { value: "낮은가격", label: "낮은가격" },
          { value: "높은가격", label: "높은가격" },
        ],
        value: "",
        product: [],
        subCategory: [], // subCategory를 배열로 초기화
        selectedSubCategory: "전체", // 전체 카테고리 선택
      };
    },
    watch: {
      value() {
        this.sortItems();
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
      async getData() {
        try {
          console.time("getProductData 응답시간");

          const querySnapshot = await db.collection("products")
          .where("category", "==", this.getCategoryId()) // 카테고리 필터 적용
          .orderBy("createDate", "desc") // Firestore에서 정렬 적용
          .get();

          this.product = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.total = this.product.length;
          this.updatePagedItems();

          // subCategory 목록 처리 (전체를 포함한 목록)
          const subCategorySet = new Set(this.product.map((p) => p.subCategory?.title ?? "전체"));
          const subCategoryList = [
            { title: "전체", img: "all" },
            ...Array.from(subCategorySet).filter((s) => s !== "전체").map((title) => ({ title, img: `${title}_img` })),
          ];
          this.subCategory = subCategoryList;

          console.timeEnd("getProductData 응답시간");
        } catch (error) {
          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        }
      },
      getCategoryId() {
        const categoryMap = {
          OUTER: "1",
          TOP: "2",
          BOTTOM: "3",
          SHOES: "4",
          WALLET: "5",
          BAG: "6",
          WATCH: "7",
          ACC: "8",
        };
        return categoryMap[this.category] || "";
      },
      updatePagedItems() {
        const start = (this.page - 1) * this.size;
        const end = start + this.size;
        return this.filteredProducts.slice(start, end);
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
          this.product.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        }
        this.updatePagedItems();
      },
    },
    created() {
      this.getData();
    },
  };
</script>