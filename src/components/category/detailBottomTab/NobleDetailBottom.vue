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
        <p class="title">제품상세</p>
        <div class="detail_subImgBox" v-for="(img,i) in product.detailImg" :key="i">
          <img :src="img">
        </div>
      </div>
      <div class="detail_wearingImg">
        <p class="title" style="margin: 30px 0">제품착샷</p>
        <div class="detail_subImgBox" v-for="(img,i) in product.wearingImg" :key="i">
          <img :src="img">
        </div>
      </div>
      <div class="detail_notice">
        <p class="title" style="margin: 30px 0">안내 사항</p>
        <img src="../../../../public/media/productDetail/product_notice.png">
      </div>
      <div class="detail_review">
        <p class="title">구매 후기</p>
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
        <div class="related_product" v-if="relatedByCategory.length>0">
          <p class="title">관련 상품</p>
          <div class="hot_item">
            <div class="item_box">
              <div class="item" v-for="item in relatedByCategory" :key="item.id">
                <img :src="item.mainImg[0]"/>
                <div class="info_box">
                  <p class="title">{{item.enName}}</p>
                  <p class="text">{{item.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="related_product" v-if="relatedByBrand.length>0">
          <p class="title">관련 브랜드</p>
          <div class="hot_item">
            <div class="item_box">
              <div class="item" v-for="item in relatedByBrand" :key="item.id">
                <img :src="item.mainImg[0]"/>
                <div class="info_box">
                  <p class="title">{{item.enName}}</p>
                  <p class="text">{{item.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {BAG_REVIEWS} from "../../../data/riviews/bagRiviews.js"

  export default {
    name: "NobleDetailBottom",
    computed: {
      productReviews() {
        return this.allReviews.filter(r => r.productId === this.product.id)
      },
      relatedByCategory() {
        const sameCategory = this.allProducts.filter(p =>
            p.category === this.product.category && p.id !== this.product.id
        );
        return this.shuffleAndPick(sameCategory, 5);
      },
      relatedByBrand() {
        const sameBrand = this.allProducts.filter(p =>
            p.brand === this.product.brand && p.id !== this.product.id
        );
        return this.shuffleAndPick(sameBrand, 5);
      }
    },
    props: {
      product: Object,
      allProducts: Array
    },
    data() {
      return {
        allReviews: BAG_REVIEWS
      }
    },
    methods: {
      shuffleAndPick(arr, count) {
        return arr
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      }
    }
  }
</script>
