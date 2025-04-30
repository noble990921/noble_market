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
  </div>
</template>

<script>
  import {db} from "@/firebase";

  export default {
    name: "SearchView",
    data(){
      return{
        searchText:'',
        total: 0,
        size: 20,
        page: 1,
        options: [
          { value: "신상품", label: "신상품" },
          { value: "낮은가격", label: "낮은가격" },
          { value: "높은가격", label: "높은가격" },
        ],
        value:'',
        product: [],
        pagedItems:[],
        loading:false
      }
    },
    watch: {
      value() {
        this.sortItems();
      },
    },
    methods:{
      async getData() {
        this.loading =true
        try {
          console.time("getProductData 응답시간");

          const querySnapshot = await db.collection("products")
          .orderBy("createDate", "desc") // Firestore에서 정렬 적용
          .get();

          this.product = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createDate: data.createDate ? data.createDate.toDate() : null,
            };
          });
          this.total = this.product.length;
          this.updatePagedItems();
          console.log('testtttt',this.product)


//          console.log('sss', this.subCategory)

          console.timeEnd("getProductData 응답시간");
        } catch (error) {
          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        }
        this.loading =false
      },
      search(){
        return
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
    created(){
      this.getData();
    }
  }
</script>
