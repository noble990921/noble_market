<template>
  <div id="reviewList">
    <div class="review_container">
      <p class="p1">구매평 <span>({{ filteredReviews.length }})</span></p>
      <p class="p2">상품을 구매하신 분들이 작성한 리뷰입니다.</p>
      <button @click="createDummyReview">구매평 작성</button>
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
          <div
              v-for="(review, index) in filteredReviews"
              :key="review.id || index"
              class="review"
          >
            <div class="star">
              <i class="el-icon-star-on" v-for="n in review.rating" :key="n"></i>
            </div>
            <p>{{ review.content }}</p>
            <img v-if="review.image" :src="review.image" />
            <p>{{ formatDate(review.date) }} | {{ review.user }}</p>
          </div>
        </div>
        <p v-else>등록된 구매평이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase/app"
  import "firebase/firestore"

  // 더미 리뷰 생성 함수
  function generateDummyReviews(count = 50) {
    const dummy = []
    const sampleText = ["좋아요!", "별로에요", "아주 만족", "보통입니다", "다시 살 의향 있어요"]
    for (let i = 0; i < count; i++) {
      dummy.push({
        id: `dummy-${i}`,
        user: `사용자${i + 1}`,
        content: sampleText[Math.floor(Math.random() * sampleText.length)],
        rating: Math.ceil(Math.random() * 5),
        image: Math.random() > 0.7 ? `https://picsum.photos/200/200?random=${i}` : null,
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        verified: Math.random() > 0.5
      })
    }
    return dummy
  }

  export default {
    name: "ReviewList",
    data() {
      return {
        reviews: [],
        showPhotoOnly: false,
        sortOption: "latest"
      }
    },
    computed: {
      filteredReviews() {
        let result = [...this.reviews]

        if (this.showPhotoOnly) {
          result = result.filter(r => r.image)
        }

        if (this.sortOption === "latest") {
          result = result.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (this.sortOption === "highScore") {
          result = result.sort((a, b) => b.rating - a.rating)
        }

        return result
      }
    },
    created() {
      // 더미 리뷰 먼저 넣기
      const dummy = generateDummyReviews(50)
      this.reviews = dummy

      // Firebase에서 리뷰 불러오기
      this.loadFirebaseReviews()
    },
    methods: {
      async loadFirebaseReviews() {
        try {
          const snapshot = await firebase.firestore().collection("reviews").get()
          const firebaseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          this.reviews = [...firebaseData, ...this.reviews] // Firebase 데이터가 위로
        } catch (err) {
          console.error("리뷰 불러오기 실패:", err)
        }
      },
      formatDate(dateStr) {
        return dateStr ? dateStr.slice(0, 10) : ""
      },
      async createDummyReview() {
        const review = {
          user: "익명고객",
          content: "테스트로 작성된 리뷰입니다!",
          rating: 5,
          image: null,
          date: new Date().toISOString(),
          verified: true
        }
        try {
          await firebase.firestore().collection("reviews").add(review)
          this.loadFirebaseReviews()
        } catch (e) {
          console.error("리뷰 작성 실패:", e)
        }
      }
    }
  }
</script>

<style scoped>
  .review {
    border-bottom: 1px solid #ddd;
    padding: 12px 0;
  }
  .review img {
    max-width: 100px;
    margin-top: 8px;
  }
  .star {
    color: #fbc02d;
  }
</style>