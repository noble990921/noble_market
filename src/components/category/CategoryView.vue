<template>
  <div class="product_category" :id="`${category}_View`">
    <div class="pc_container">
      <div class="title">
        <p>{{ category.toUpperCase() }}</p>
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
               v-for="i in pagedItems"
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
//  import { getProductData } from "../../common/api/product";
import {db} from "../../firebase";

  export default {
    name: "CategoryView",
    props: ["category"], // 카테고리를 props로 받음
    data() {
      return {
        pagedItems: [],
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
      };
    },
    watch: {
      value() {
        this.sortItems();
      },
    },
    methods: {
//      async getData() {
//        try {
//          console.time("getProductData 응답시간");
//          const data = await getProductData();
//          console.timeEnd("getProductData 응답시간");
//          this.product = data.filter((item) => item.category === this.getCategoryId());
//          this.total = this.product.length;
//          this.product.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
//          this.updatePagedItems();
//        } catch (error) {
//          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
//        }
//      },
      // 이런식으로  Firestore에서 직접 필터링해서 가져오면 빠르다는데...흠..위에랑 속도는 비슷..
      async getData() {
        try {
          console.time("getProductData 응답시간");

          // Firestore에서 해당 카테고리의 상품만 가져옴
          const querySnapshot = await db.collection("products")
          .where("category", "==", this.getCategoryId()) // 카테고리 필터 적용
          .orderBy("createDate", "desc") // Firestore에서 정렬 적용
          .get();

          // 가져온 데이터를 배열로 변환
          this.product = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          this.total = this.product.length;
          this.updatePagedItems();

          console.timeEnd("getProductData 응답시간");
        } catch (error) {
          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        }
      },
      getCategoryId() {
        const categoryMap = {
          top: "1",
          bag: "2",
          wallet: "3",
          watch: "4",
          shoes: "5",
          acc: "6",
        };
        return categoryMap[this.category] || "";
      },
      updatePagedItems() {
        const start = (this.page - 1) * this.size;
        const end = start + this.size;
        this.pagedItems = this.product.slice(start, end);
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
