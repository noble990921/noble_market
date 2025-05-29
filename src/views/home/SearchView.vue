<template>
  <div id="SearchView">
    <div class="searchView_container">
      <div class="search_area">
        <div class="search">
          <input
              v-model="searchText"
              @keyup.enter="search"
              type="text"
              placeholder="브랜드, 상품, 프로필 등"
          >
          <i class="el-icon-search" @click="search"></i>
        </div>
      </div>
      <div class="pc_container" v-loading="loading">
        <!--        <div class="category_box">-->
        <!--          <ul>-->
        <!--            <li v-for="(s, idx) in subCategory" :key="idx"-->
        <!--                :class="{ active: selectedSubCategory === s.title }"-->
        <!--                @click="selectedSubCategory = s.title">-->
        <!--              <img :src="require(`../../../public/media/category/${s.img}.png`)">-->
        <!--              <p v-if="subCategory.length>0">{{ s.title }}</p>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->
        <div class="product_item_container">
          <div class="product_header">
            <p>총 <span>{{ total }}</span>개의 상품이 있습니다.</p>
<!--            <el-select v-model="value" placeholder="-정렬방식-">-->
<!--              <el-option-->
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
          </div>
          <div class="product_main">
            <div @click="goToProductDetail(i)"
                 class="product_list"
                 v-for="i in pagedItems"
                 :key="i.id">
              <div class="img_box">
                <img :src="i.mainImg[0]">
              </div>
              <p class="brand_name">{{ i.brand }}</p>
              <p class="name">{{ i.enName }}</p>
              <p class="text">{{ i.name }}</p>
              <p class="price">가격문의</p>
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
//  import {db} from "@/firebase";
  import * as productModules from '@/data/products/index.js'
import {CATEGORY_CODE_TO_NAME} from "@/constants/Set";

  export default {
    name: "SearchView",
    data() {
      return {
        searchText: '',
        total: 0,
        size: 20,
        page: 1,
        options: [
          {value: "신상품", label: "신상품"},
          {value: "낮은가격", label: "낮은가격"},
          {value: "높은가격", label: "높은가격"},
        ],
        value: '',
        product: [],
        pagedItems: [],
        loading: false
      }
    },
    watch: {
      value() {
        this.sortItems();
      },
    },
    methods: {
//      async getData() {
//        this.loading = true
//        try {
//          console.time("getProductData 응답시간");
//
//          const querySnapshot = await db.collection("products")
//          .orderBy("createDate", "desc") // Firestore에서 정렬 적용
//          .get();
//
//          this.product = querySnapshot.docs.map(doc => {
//            const data = doc.data();
//            return {
//              id: doc.id,
//              ...data,
//              createDate: data.createDate?.toDate()
//            };
//          }).filter(item => {
//            const keyword = this.searchText.toLowerCase();
//            return (
//                (item.title && item.title.toLowerCase().includes(keyword)) ||
//                (item.brand && item.brand.toLowerCase().includes(keyword)) ||
//                (item.category && item.category.toLowerCase().includes(keyword))
//            );
//          });
//          this.total = this.product.length;
//          this.updatePagedItems();
//          console.log('testtttt', this.product)
//
////          console.log('sss', this.subCategory)
//
//          console.timeEnd("getProductData 응답시간");
//        } catch (error) {
//          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
//        }
//        this.loading = false
//      },
      goToProductDetail(item) {
        const categoryName = CATEGORY_CODE_TO_NAME[item.category];
        this.$router.push(`/${categoryName}/detail/${item.id}`);
      },
      async getData() {
        this.loading = true;
        try {
          console.time("getProductData 응답시간");

          const allProducts = Object.values(productModules).flatMap(module =>
              Object.values(module)
          );

          const keyword = this.searchText.toLowerCase();
          this.product = allProducts.filter(item => {
            return (
                (item.modelNumber && item.modelNumber.toLowerCase().includes(keyword)) ||
                (item.enBrand && item.enBrand.toLowerCase().includes(keyword)) ||
                (item.enName && item.enName.toLowerCase().includes(keyword)) ||
                (item.name && item.name.toLowerCase().includes(keyword)) ||
                (item.brand && item.brand.toLowerCase().includes(keyword)) ||
                (item.category && item.category.toLowerCase().includes(keyword))
            );
          });

          this.total = this.product.length;
          this.updatePagedItems();

          console.log("필터링된 상품:", this.product);
          console.timeEnd("getProductData 응답시간");

        } catch (error) {
          console.error("로컬 상품 데이터를 가져오는 중 오류 발생:", error);
        }
        this.loading = false;
      },
      search() {
        return this.getData()
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
          this.product.sort((a, b) => b.createDate - a.createDate);
        }
        this.updatePagedItems();
      },
    },
    created() {
      this.searchText = this.$route.query.keyword;
      this.getData();
    }
  }
</script>
