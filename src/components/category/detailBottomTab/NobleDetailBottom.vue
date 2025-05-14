<template>
  <div id="noble_detail_bottom">
    <div class="ndb_container">
      <div class="detail_mainImg">
      <p class="title">제품정보</p>
      <img src="../../../../public/media/productDetail/product_img.png">
      <div class="mainImgBox" v-for="(img,i) in product.mainImg" :key="i">
        <img :src="img">
      </div>
      </div>
      <div class="detail_subImg">
        <p>제품상세</p>
        <div class="detail_subImgBox" v-for="(img,i) in product.detailImg" :key="i">
          <img :src="img">
        </div>
      </div>
      <div class="detail_notice">
        <p style="margin: 30px 0">안내 사항</p>
        <img src="../../../../public/media/productDetail/product_notice.png">
      </div>
      <div class="detail_review">
        <p>구매 후기</p>
        <div v-if="productReviews.length">
          <div v-for="review in productReviews" :key="review.id" class="review">
            <div class="star">
              <i class="el-icon-star-on" v-for="n in review.rating" :key="n"></i>
            </div>
            <p class="content">{{ review.content }}</p>
            <div v-if="review.images.length" class="thumbs">
              <img
                  v-for="(img, i) in review.images"
                  :key="i"
                  :src="img"
                  class="thumb"
              />
            </div>
            <p class="meta">{{ review.user }}</p>
          </div>
        </div>
        <p v-else>아직 작성된 구매 후기가 없습니다.</p>
      </div>

      <div class="detail_related">
        <div class="related_product">
          <p>관련 상품</p>
        </div>
        <div class="related_product">
          <p>관련 브랜드</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { BAG_REVIEWS } from "../../../data/riviews/bagRiviews.js"
  export default {
    name: "NobleDetailBottom",
    computed: {
      productReviews() {
        return this.allReviews.filter(r => r.productId === this.product.id)
      }
    },
    props:{
      product: Object
    },
    data(){
      return{
        allReviews: BAG_REVIEWS
      }
    }
  }
</script>
