<template>
  <div id="noble_detail_bottom">
    <div class="ndb_container">
      <div class="detail_mainImg">
        <p class="title">제품정보</p>
        <img src="../../../../public/media/productDetail/product_img2.png">
<!--        <div class="mainImgBox" v-for="(img,i) in product.mainImg" :key="i">-->
<!--          <img :src="img">-->
<!--        </div>-->
      </div>
      <div class="detail_subImg" v-if="product.detailImg && product.detailImg.length > 0"
           :class="{ 'blur-overlay': !isLogin || !user }">
        <p class="title">제품상세</p>
        <div class="detail_subImgBox" v-for="(img,i) in product.detailImg" :key="i">
          <img :src="typeof img === 'string' ? img : img.url">
        </div>
      </div>
      <div class="detail_wearingImg" v-if="product.wearingImg && product.wearingImg.length > 0"
           :class="{ 'blur-overlay': !isLogin || !user }">
        <p class="title" style="margin: 120px 0 30px 0">제품착샷</p>
        <div class="detail_subImgBox" v-for="(img,i) in product.wearingImg" :key="i">
          <img :src="typeof img === 'string' ? img : img.url">
        </div>
      </div>
      <div class="detail_notice"
           :class="{ 'blur-overlay': !isLogin || !user }">
        <p class="title" style="margin: 120px 0 30px 0">안내 사항</p>
        <img src="../../../../public/media/productDetail/product_notice2.png">
      </div>
<!--      <div class="detail_review">-->
<!--        <div class="review_top">-->
<!--          <div>-->
<!--            <p class="title">구매 후기 ({{ productReviews.length }})-->
<!--              <span class="stars">-->
<!--    <i-->
<!--        class="el-icon-star-on"-->
<!--        v-for="n in 5"-->
<!--        :key="n"-->
<!--        :style="{ color: n <= filledStars ? '#ff6600' : '#ccc' }"-->
<!--    ></i>-->
<!--                &lt;!&ndash;    <span class="avg">({{ averageRating }})</span>&ndash;&gt;-->
<!--  </span>-->
<!--            </p>-->
<!--            <p @click="showPhotoOnly = !showPhotoOnly" style="cursor: pointer;">-->
<!--              <i class="el-icon-picture-outline"></i> 포토 구매평만 보기-->
<!--            </p>-->
<!--          </div>-->
<!--          <p @click="reviewWrite" class="review_make">리뷰작성</p>-->
<!--        </div>-->
<!--        <div class="review_box" v-if="productReviews.length">-->
<!--          <div class="review_content" v-for="review in productReviews" :key="review.id" >-->
<!--            &lt;!&ndash; 별점 &ndash;&gt;-->
<!--            <div class="star">-->
<!--              <i-->
<!--                  class="el-icon-star-on"-->
<!--                  v-for="n in 5"-->
<!--                  :key="n"-->
<!--                  :style="{ color: n <= review.rating ? '#000' : '#ccc' }"-->
<!--              ></i>-->

<!--              <p class="meta">{{ review.user }}</p>-->
<!--            </div>-->

<!--            &lt;!&ndash; 내용 &ndash;&gt;-->
<!--            <p class="content">{{ review.content }}</p>-->

<!--            &lt;!&ndash; 이미지 썸네일 &ndash;&gt;-->
<!--            <div v-if="review.images.length" class="thumbs">-->
<!--              <img-->
<!--                  v-for="(img, i) in review.images"-->
<!--                  :key="i"-->
<!--                  :src="img"-->
<!--                  class="thumb"-->
<!--                  @click="openImageModal(review.images, i)"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <p v-else style="margin-top: 15px">이 상품의 첫번째 리뷰를 작성해보세요.</p>-->
<!--      </div>-->

      <div class="detail_related">
        <div class="related_product" v-if="relatedByCategory.length>0">
          <p class="title" style="margin-bottom: 20px">관련 상품</p>
          <div class="hot_item">
            <div class="item_box">
              <div class="item"  v-for="item in relatedByCategory" :key="item.id"
                   @click="goToProductDetail(item)">
                <div class="img_box">
                  <img v-if="item.mainImg && item.mainImg.length" :src="item.mainImg[0]"/>
                </div>
                <div class="info_box">
                  <p class="brand_name">{{item.enBrand}}</p>
                  <p class="name">{{item.name}}</p>
                  <p class="text">{{item.modelNumber}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="related_product" v-if="relatedByBrand.length>0">
          <p class="title" style="margin-bottom: 20px">관련 브랜드</p>
          <div class="hot_item">
            <div class="item_box">
              <div class="item" v-for="item in relatedByBrand" :key="item.id"
                   @click="goToProductDetail(item)">
                <div class="img_box">
                  <img v-if="item.mainImg && item.mainImg.length" :src="item.mainImg[0]"/>
                </div>
                <div class="info_box">
                  <p class="brand_name">{{item.enBrand}}</p>
                  <p class="name">{{item.name}}</p>
                  <p class="text">{{item.modelNumber}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedImages.length" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <swiper :options="swiperOption" ref="swiper">
          <swiper-slide v-for="(img, idx) in selectedImages" :key="idx">
            <img :src="img" class="modal-image" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <button class="close-btn" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {BAG_REVIEWS} from "../../../data/riviews/bagRiviews.js"
  import {CATEGORY_CODE_TO_NAME} from "../../../constants/Set"
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import {mapGetters} from "vuex";

  export default {
    name: "NobleDetailBottom",
    components: {
      swiper: Swiper,
      swiperSlide: SwiperSlide
    },
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
      averageRating() {
        if (!this.productReviews.length) return 0;
        const total = this.productReviews.reduce((sum, r) => sum + r.rating, 0);
        return (total / this.productReviews.length).toFixed(1);
      },
      filledStars() {
        return Math.round(this.averageRating);
      },
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
        selectedImages: [],
        selectedImageIndex: 0,
        allReviews: BAG_REVIEWS,
        CATEGORY_CODE_TO_NAME,
        swiperOption: {
          slidesPerView: 'auto',
          autoplay: false,
          freeMode: false,
          initialSlide: 0,
          pagination: { el: ".swiper-pagination", clickable: true },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        },
        showPhotoOnly: false,
      }
    },
    methods: {
      reviewWrite(){
        if(this.isLogin){
          this.$alert('구매자만 리뷰를 작성할수있습니다.')
        }else{
          this.$alert('로그인 후 이용가능합니다.')
        }
      },
      goToProductDetail(item) {
        const categoryName = CATEGORY_CODE_TO_NAME[item.category];
        this.$router.push(`/${categoryName}/detail/${item.id}`);
      },
      shuffleAndPick(arr, count) {
        return arr
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      },
      openImageModal(images, index) {
        this.selectedImages = images
        this.selectedImageIndex = index
        this.swiperOption.initialSlide = index
        this.$nextTick(() => {
          if (this.$refs.swiper && this.$refs.swiper.swiper) {
            this.$refs.swiper.swiper.slideTo(index, 0)
          }
        })
      },
      closeModal() {
        this.selectedImages = []
      },
    },
    created(){
      this.allProducts
    }
  }
</script>
