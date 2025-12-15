<template>
  <div class="wishlist_page">
    <div class="wishlist_container" v-loading="loading">
      <div class="wishlist_header">
        <h2>찜 목록</h2>
        <p>총 <span>{{ wishlist.length }}</span>개의 상품이 있습니다.</p>
      </div>

      <div class="wishlist_main" v-if="wishlist.length > 0">
        <div
            class="wishlist_item"
            v-for="item in pagedItems"
            :key="item.id">
          <div class="item_content" @click="goToDetail(item)">
            <div class="img_box">
              <img :src="item.mainImg[0]" :alt="item.name">
            </div>
            <p class="brand_name">{{ item.enBrand }}</p>
            <p class="name">{{ item.name }}</p>
            <p class="text">{{ item.modelNumber }}</p>
          </div>
          <button class="remove_btn" @click.stop="removeFromWishlist(item.id)">
            <i class="el-icon-delete"></i> 삭제
          </button>
        </div>
      </div>

      <div class="empty_state" v-else>
        <i class="el-icon-star-off"></i>
        <p>찜한 상품이 없습니다</p>
        <el-button type="primary" @click="$router.push('/')">쇼핑 계속하기</el-button>
      </div>

      <el-pagination
          v-if="wishlist.length > size"
          class="da-pagination"
          :background="true"
          :hide-on-single-page="false"
          :page-size="size"
          :total="wishlist.length"
          @current-change="handlePageChange"
          :current-page="page"
          layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import firebase from "firebase/app";
import { mapGetters } from "vuex";
import { SET_CATEGORY_MAP } from "@/constants/Set";

export default {
  name: "Wishlist",
  data() {
    return {
      loading: false,
      wishlist: [],
      pagedItems: [],
      page: 1,
      size: 30,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLogin", "user"]),
  },
  watch: {
    page() {
      this.updatePagedItems();
    },
  },
  methods: {
    async loadWishlist() {
      if (!this.isLogin || !this.user) {
        this.$alert("로그인이 필요한 서비스입니다.", "알림", {
          confirmButtonText: "확인",
          callback: () => {
            this.$router.push("/login");
          },
        });
        return;
      }

      this.loading = true;
      try {
        const userId = this.user.uid;
        const userDoc = await db.collection("users").doc(userId).get();

        if (!userDoc.exists) {
          this.wishlist = [];
          this.loading = false;
          return;
        }

        const wishlistIds = userDoc.data().wishlist || [];
        console.log("🔍 찜목록 ID:", wishlistIds);

        if (wishlistIds.length === 0) {
          this.wishlist = [];
          this.loading = false;
          return;
        }

        // 상품 정보 가져오기
        const products = await this.getProductsByIds(wishlistIds);
        this.wishlist = products;
        this.updatePagedItems();
      } catch (error) {
        console.error("찜목록 로딩 오류:", error);
        this.$message.error("찜목록을 불러오는데 실패했습니다.");
      }
      this.loading = false;
    },

    async getProductsByIds(productIds) {
      const products = [];

      for (const productId of productIds) {
        try {
          // productId를 문자열로 변환 (Firestore는 문자열 ID만 허용)
          const productIdStr = String(productId);

          // Firestore에서 상품 조회
          const productDoc = await db.collection("products").doc(productIdStr).get();

          if (productDoc.exists) {
            const data = productDoc.data();
            products.push({
              id: productDoc.id,
              ...data,
            });
          } else {
            // 로컬 데이터에서 조회 (카테고리별로 검색)
            const localProduct = await this.findProductInLocalData(productId);
            if (localProduct) {
              products.push(localProduct);
            }
          }
        } catch (error) {
          console.error(`상품 ${productId} 조회 오류:`, error);
        }
      }

      return products;
    },

    async findProductInLocalData(productId) {
      // 모든 카테고리를 순회하면서 로컬 데이터에서 상품 찾기
      const categories = Object.keys(SET_CATEGORY_MAP);

      for (const category of categories) {
        try {
          const module = await import(`@/data/products/${category.toLowerCase()}.js`);
          const products = Object.values(module.PRODUCTS);
          // 타입 무관하게 비교 (숫자 ID와 문자열 ID 모두 처리)
          const product = products.find((p) => String(p.id) === String(productId));
          if (product) {
            return product;
          }
        } catch (error) {
          // 해당 카테고리 파일이 없으면 건너뛰기
          continue;
        }
      }
      return null;
    },

    async removeFromWishlist(productId) {
      try {
        const confirm = await this.$confirm(
          "찜 목록에서 삭제하시겠습니까?",
          "알림",
          {
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            type: "warning",
          }
        );

        if (confirm) {
          const userId = this.user.uid;
          const userRef = db.collection("users").doc(userId);

          await userRef.set(
            {
              wishlist: firebase.firestore.FieldValue.arrayRemove(productId),
            },
            { merge: true }
          );

          // 로컬 상태 업데이트 (타입 무관하게 비교)
          this.wishlist = this.wishlist.filter((item) => String(item.id) !== String(productId));
          this.updatePagedItems();

          this.$message.success("찜 목록에서 삭제되었습니다.");
        }
      } catch (error) {
        if (error !== "cancel") {
          console.error("찜 삭제 오류:", error);
          this.$message.error("삭제 중 오류가 발생했습니다.");
        }
      }
    },

    goToDetail(product) {
      // 상품의 카테고리 찾기 (타입 무관하게 비교)
      const categoryId = product.category;
      const categoryName = Object.keys(SET_CATEGORY_MAP).find(
        (key) => String(SET_CATEGORY_MAP[key]) === String(categoryId)
      );

      if (categoryName) {
        this.$router.push(`/${categoryName}/detail/${product.id}`);
      } else {
        // 카테고리 정보가 없으면 기본 경로 사용
        this.$router.push(`/product/detail/${product.id}`);
      }
    },

    updatePagedItems() {
      const start = (this.page - 1) * this.size;
      const end = start + this.size;
      this.pagedItems = this.wishlist.slice(start, end);
    },

    handlePageChange(newPage) {
      this.page = newPage;
      window.scrollTo(0, 0);
    },
  },

  mounted() {
    this.loadWishlist();
  },
};
</script>
