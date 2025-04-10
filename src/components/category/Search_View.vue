<template>
  <div class="product_category" id="Shoes_View">
    <div class="pc_container">
      <div class="title">
        <p>Search</p>
      </div>
      <div class="product_item_container">
        <div class="product_header">
          <p>총 <span>{{total}}</span>개의 상품이 있습니다.</p>
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
          <div @click="$router.push(`/shoes/detail/${i.id}`)" class="product_list" v-for="i in pagedItems" :key="i.id">
            <img :src="i.img">
            <p class="name">{{i.name}}</p>
            <p class="price">{{i.price | formatNumber}}원</p>
          </div>
        </div>
        <el-pagination
            class="da-pagination" :background="true" :hide-on-single-page="false" :page-size="size" :total="total"
            @current-change="handlePageChange" :current-page="page" layout="prev, pager, next">
        </el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
  import {db} from "@/firebase";

  export default {
    name: "Search_View",
    data() {
      return {
        pagedItems: [],
        total: 0, size: 10, page:1,
        options: [
          {value: '신상품', label: '신상품'},
          {value: '낮은가격', label: '낮은가격'},
          {value: '높은가격', label: '높은가격'},
        ],
        value: ''
      }
    },
    methods:{
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
      totalLength() {
        this.total = this.ITEM.length;
      },
      updatePagedItems() {
        const start = (this.page - 1) * this.size;
        const end = start + this.size;
        this.pagedItems = this.ITEM.slice(start, end);
      },
      handlePageChange(newPage) {
        this.page = newPage;
        this.updatePagedItems();
      }
    },
    created(){
      this.totalLength()
      this.updatePagedItems();
      this.getData();
    }
  }
</script>