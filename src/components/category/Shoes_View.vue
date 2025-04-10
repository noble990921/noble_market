<template>
  <div class="product_category" id="Shoes_View">
    <div class="pc_container">
      <div class="title">
        <p>SHOES</p>
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
  import ITEM from '../../constants/shoes_item'
  export default {
    name: "Shoes_View",
    data() {
      return {
        ITEM,
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
    }
  }
</script>