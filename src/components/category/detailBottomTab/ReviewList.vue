<template>
  <div id="reviewList">
    <div class="review_container">
      <p class="p1">구매평 <span>({{ filteredReviews.length }})</span></p>
      <p class="p2">상품을 구매하신 분들이 작성한 리뷰입니다.</p>
      <button>구매평 작성</button>

      <div class="review_select_box">
        <p @click="showPhotoOnly = !showPhotoOnly" style="cursor: pointer;">
          <i class="el-icon-picture-outline"></i> 포토 구매평만 보기
        </p>
        <select v-model="sortOption">
          <option value="latest">최신순</option>
          <option value="highScore">별점 높은순</option>
        </select>
      </div>

      <div class="review_box">
        <div v-if="filteredReviews.length">
          <div v-for="(review, index) in filteredReviews" :key="review.id || index" class="review">
            <div class="star">
              <i class="el-icon-star-on" v-for="n in review.rating" :key="n"></i>
            </div>
            <p>{{ review.content }}</p>
            <div v-if="review.images && review.images.length" class="thumbs">
              <img
                  v-for="(img, i) in review.images"
                  :key="i"
                  :src="img"
                  @click="openImageModal(review.images, i)"
              />
            </div>
            <p>{{ formatDate(review.date) }} | {{ review.user }}</p>
          </div>
        </div>
        <p v-else>등록된 구매평이 없습니다.</p>
      </div>
    </div>

    <!-- Swiper 이미지 모달 -->
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
  import firebase from "firebase/app"
  import "firebase/firestore"
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: "ReviewList",
    components: {
      swiper: Swiper,
      swiperSlide: SwiperSlide
    },
    data() {
      return {
        reviews: [],
        showPhotoOnly: false,
        sortOption: "latest",
        selectedImages: [],
        selectedImageIndex: 0,
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
        }
      }
    },
    computed: {
      filteredReviews() {
        let result = [...this.reviews]
        if (this.showPhotoOnly) {
          result = result.filter(r => r.images && r.images.length > 0)
        }
        if (this.sortOption === "latest") {
          result.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (this.sortOption === "highScore") {
          result.sort((a, b) => b.rating - a.rating)
        }
        return result
      }
    },
    methods: {
      formatDate(dateStr) {
        return dateStr ? dateStr.slice(0, 10) : ""
      },
      async loadFirebaseReviews() {
        try {
          const snapshot = await firebase.firestore().collection("reviews").get()
          const firebaseData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          this.reviews = [...firebaseData, ...this.reviews]
        } catch (err) {
          console.error("리뷰 불러오기 실패:", err)
        }
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
      generateDummyReviews(count = 50) {
        const dummy = []
        const sampleText = ["좋아요!", "별로에요", "아주 만족", "보통입니다", "다시 살 의향 있어요"]
        for (let i = 0; i < count; i++) {
          const randomImages = Math.random() > 0.5
              ? Array.from({ length: Math.ceil(Math.random() * 3) }, (_, idx) =>
                  `https://picsum.photos/200/200?random=${i * 10 + idx}`
              )
              : []
          dummy.push({
            id: `dummy-${i}`,
//            user: `사용자${i + 1}`,
            content: sampleText[Math.floor(Math.random() * sampleText.length)],
            rating: Math.ceil(Math.random() * 5),
            images: randomImages,
            date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            verified: Math.random() > 0.5
          })
        }
        return dummy
      }
    },
    created() {
      this.reviews = this.generateDummyReviews(50)
      this.loadFirebaseReviews()
    }
  }
</script>
