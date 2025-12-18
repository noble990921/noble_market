<template>
  <div id="noble_detail_bottom">
    <!-- 탭 네비게이션 -->
    <div class="tab_navigation" ref="tabNavigation">
      <div class="tab_container">
        <button
          v-for="tab in visibleTabs"
          :key="tab.id"
          type="button"
          class="tab_button"
          :class="{ active: activeTab === tab.id }"
          @click="scrollToSection(tab.id, tab.section)">
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </div>

    <div class="ndb_container">
      <div class="detail_mainImg" ref="detail_mainImg">
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
      <div class="detail_wearingImg" ref="detail_wearingImg" v-if="product.wearingImg && product.wearingImg.length > 0"
           :class="{ 'blur-overlay': !isLogin || !user }">
        <p class="title" style="margin: 120px 0 30px 0">제품착샷</p>
        <div class="detail_subImgBox" v-for="(img,i) in product.wearingImg" :key="i">
          <img :src="typeof img === 'string' ? img : img.url">
        </div>
      </div>
      <div class="detail_sizeImg" ref="detail_sizeImg" v-if="product.sizeData && product.sizeData.img">
        <!-- 가방 템플릿 -->
        <template v-if="product.sizeData.type === 'bag'">
          <img :src="product.sizeData.img">
          <table class="size_table">
            <thead>
            <tr><th>cm</th><th>높이</th><th>너비</th><th>폭</th></tr>
            </thead>
            <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
            <tr><th>{{p.unit || '-'}}</th><td>{{p.z || '-'}}</td><td>{{p.x || '-'}}</td><td>{{p.y || '-'}}</td></tr>
            </tbody>
          </table>
          <p class="notice">*사이즈는 측정 기준에 따라 오차가 있을 수 있습니다.*</p>
        </template>

        <!-- 아우터/상의 템플릿 -->
        <template v-else-if="isOuterOrTop">
          <img :src="product.sizeData.img">
          <table class="size_table" v-if="product.sizeData.size && product.sizeData.size.length > 0">
            <thead>
            <tr><th>cm</th><th>총장</th><th>어깨너비</th><th>가슴단면</th><th>소매길이</th></tr>
            </thead>
            <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
            <tr><th>{{p.unit || '-'}}</th><td>{{p.totalLength || '-'}}</td><td>{{p.shoulderWidth || '-'}}</td><td>{{p.chestSection || '-'}}</td><td>{{p.sleeveLength || '-'}}</td></tr>
            </tbody>
          </table>
          <p class="notice">*사이즈는 상품별로 약간의 편차가 있을 수 있습니다.*</p>
        </template>

        <!-- 하의 템플릿 -->
        <template v-else-if="isBottom">
          <img :src="product.sizeData.img">
          <table class="size_table" v-if="product.sizeData.size && product.sizeData.size.length > 0">
            <thead>
            <tr><th></th><th>총장</th><th>허리단면</th><th>엉덩이단면</th><th>허벅지단면</th><th>밑위</th><th>밑위단면</th></tr>
            </thead>
            <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
            <tr><th>{{p.unit || '-'}}</th><td>{{p.totalLength || '-'}}</td><td>{{p.waistSection || '-'}}</td><td>{{p.hipSection || '-'}}</td>
              <td>{{p.thighSection || '-'}}</td><td>{{p.rise || '-'}}</td><td>{{p.hemSection || '-'}}</td></tr>
            </tbody>
          </table>
          <p class="notice">*참고: 위 치수는 유사 제품의 평균적인 수치를 기반으로 한 추정치이며, 실제 제품과 차이가 있을 수 있습니다.*</p>
        </template>

        <!-- 원피스/스커트 템플릿 -->
        <template v-else-if="product.sizeData.type === 'dressskirt'">
          <img :src="product.sizeData.img">
          <table class="size_table" v-if="product.sizeData.size && product.sizeData.size.length > 0">
            <thead>
            <tr><th></th><th>총장</th><th>허리단면</th><th>엉덩이단면</th><th>허벅지단면</th><th>밑위</th><th>밑위단면</th></tr>
            </thead>
            <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
            <tr><th>{{p.unit || '-'}}</th><td>{{p.totalLength || '-'}}</td><td>{{p.waistSection || '-'}}</td><td>{{p.hipSection || '-'}}</td>
              <td>{{p.thighSection || '-'}}</td><td>{{p.rise || '-'}}</td><td>{{p.hemSection || '-'}}</td></tr>
            </tbody>
          </table>
          <p class="notice">*사이즈는 상품별로 약간의 편차가 있을 수 있습니다.*</p>
        </template>

        <!-- 신발 템플릿 (사진만) -->
        <template v-else-if="product.sizeData.type === 'shoes'">
          <img :src="product.sizeData.img">
          <p class="notice">*발볼 넓이 및 발등 높이에 따라 착화감이 다를 수 있습니다.*</p>
        </template>
      </div>
      <div class="detail_notice" ref="detail_notice"
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
      },
      visibleTabs() {
        const tabs = [
          { id: 'info', name: '상품정보', section: 'detail_mainImg', show: true },
          {
            id: 'wearing',
            name: '착샷',
            section: 'detail_wearingImg',
            show: this.product.wearingImg && this.product.wearingImg.length > 0
          },
          {
            id: 'size',
            name: '사이즈',
            section: 'detail_sizeImg',
            show: this.product.sizeData && this.product.sizeData.img && this.product.sizeData.size && this.product.sizeData.size.length > 0
          },
          { id: 'notice', name: '안내사항', section: 'detail_notice', show: true }
        ];
        return tabs.filter(tab => tab.show);
      },
      isOuterOrTop() {
        // 아우터/상의 계열 타입들
        const outerTopTypes = [
          'padding', 'jacket', 'windbreaker', 'cardigan', 'hoodzipup', 'mustang',
          'coat', 'vest', 'suit',  // 아우터
          'sweatshirt', 'hood', 'longsleeve', 'knitsweater', 'shortsleeve',
          'polo', 'sleeveless', 'shirtblouse'  // 상의
        ];
        return outerTopTypes.includes(this.product?.sizeData?.type);
      },
      isBottom() {
        // 하의 계열 타입들
        const bottomTypes = ['denim', 'jogger', 'cotton', 'slacks', 'shortpants'];
        return bottomTypes.includes(this.product?.sizeData?.type);
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
        activeTab: 'info',
        isUserScrolling: true  // 스크롤로 탭 변경 허용 플래그
      }
    },
    methods: {
      scrollToSection(tabId, sectionRef) {
        // 탭 클릭 시 자동 스크롤 감지 비활성화
        this.isUserScrolling = false;
        this.activeTab = tabId;

        const element = this.$refs[sectionRef];
        if (element) {
          const tabNavHeight = this.$refs.tabNavigation ? this.$refs.tabNavigation.offsetHeight : 0;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - tabNavHeight - 20; // 탭 높이 + 여유 공간

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // 스크롤 완료 후 자동 감지 재활성화 (500ms 후)
          setTimeout(() => {
            this.isUserScrolling = true;
          }, 500);
        }
      },
      handleScroll() {
        // 탭 클릭으로 인한 스크롤 중이면 무시
        if (!this.isUserScrolling) return;

        const tabNavHeight = this.$refs.tabNavigation ? this.$refs.tabNavigation.offsetHeight : 0;
        const scrollPosition = window.pageYOffset + tabNavHeight + 100; // 100px 여유

        // visibleTabs 순서대로 섹션 확인
        for (let i = this.visibleTabs.length - 1; i >= 0; i--) {
          const tab = this.visibleTabs[i];
          const element = this.$refs[tab.section];

          if (element) {
            const elementTop = element.offsetTop;

            // 현재 스크롤 위치가 섹션을 지나갔으면 해당 탭 활성화
            if (scrollPosition >= elementTop) {
              if (this.activeTab !== tab.id) {
                this.activeTab = tab.id;
              }
              break;
            }
          }
        }
      },
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
    },
    mounted() {
      // 스크롤 이벤트 리스너 등록
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      // 스크롤 이벤트 리스너 제거 (메모리 누수 방지)
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
