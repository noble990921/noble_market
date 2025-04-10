<template>
  <div class="product_category" id="Acc_View">
    <div class="pc_container">
      <div class="title">
        <p>ACC</p>
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
          <div @click="$router.push(`/acc/detail/${i.id}`)" class="product_list" v-for="i in pagedItems" :key="i.id">
            <img :src="i.img">
            <p class="name">{{i.title}}</p>
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
  import { getProductData } from "../../common/api/product";

  export default {
    name: "Acc_View",
    watch:{
      value() {
        this.sortItems();
      },
    },
    data() {
      return {
        pagedItems: [],
        total: 0, size: 10, page:1,
        options: [
          {value: '신상품', label: '신상품'},
          {value: '낮은가격', label: '낮은가격'},
          {value: '높은가격', label: '높은가격'},
        ],
        value: '',
        product:[],
      }
    },
    methods: {
      async getData() {
        try {
          const data = await getProductData();
          this.product = data.filter((item) => item.category === '5');
          this.totalLength();
          this.updatePagedItems();
        } catch (error) {
          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        }
      },
      totalLength() {
        this.total = this.product.length;
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
        if (this.value === '낮은가격') {
          this.product.sort((a, b) => a.price - b.price);
        } else if (this.value === '높은가격') {
          this.product.sort((a, b) => b.price - a.price);
        } else if (this.value === '신상품') {
          this.product.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        }
        this.updatePagedItems();
      },
    },
    created() {
      this.getData();
      this.sortItems();
    }

  }
</script>