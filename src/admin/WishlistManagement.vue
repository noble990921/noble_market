<template>
  <div id="WishlistManagement">
    <h2>찜목록 관리 ({{ users.length }}명)</h2>
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-else class="user-list">
      <div v-if="users.length === 0" class="empty">
        <p>찜한 상품이 있는 회원이 없습니다.</p>
      </div>
      <div
        v-for="(user, index) in users"
        :key="index"
        class="user-card"
        :class="{ expanded: expandedUsers.includes(user.uid) }"
      >
        <div class="user-header" @click="toggleUser(user.uid)">
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p class="email">{{ user.email }}</p>
            <p class="phone">{{ user.phoneNumber }}</p>
            <p class="partner">파트너코드: {{ user.partnerCode }}</p>
          </div>
          <div class="wishlist-count">
            <i class="el-icon-star-on"></i>
            <span>{{ user.wishlistCount }}개</span>
            <i
              :class="expandedUsers.includes(user.uid) ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i>
          </div>
        </div>

        <transition name="expand">
          <div v-if="expandedUsers.includes(user.uid)" class="wishlist-products">
            <div v-if="loadingProducts[user.uid]" class="loading-products">
              <i class="el-icon-loading"></i> 상품 로딩 중...
            </div>
            <div v-else-if="userProducts[user.uid] && userProducts[user.uid].length === 0" class="no-products">
              찜한 상품 정보를 불러올 수 없습니다.
            </div>
            <div v-else class="product-grid">
              <div
                v-for="product in userProducts[user.uid]"
                :key="product.id"
                class="product-card"
                @click="openProductDetail(product)"
              >
                <div class="product-img">
                  <img :src="getImageUrl(product.mainImg[0])" :alt="product.name" />
                </div>
                <div class="product-info">
                  <p class="brand">{{ product.enBrand }}</p>
                  <p class="name">{{ product.name }}</p>
                  <p class="model">{{ product.modelNumber }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { mapGetters } from "vuex";
import { SET_CATEGORY_MAP } from "@/constants/Set";

export default {
  name: "WishlistManagement",
  computed: {
    ...mapGetters("auth", ["user", "isLogin"]),
  },
  data() {
    return {
      users: [],
      loading: true,
      expandedUsers: [],
      userProducts: {},
      loadingProducts: {},
    };
  },
  methods: {
    async fetchUsers() {
      try {
        // 찜목록이 있는 모든 사용자 조회 (admin 전용)
        const query = db.collection("users").where("wishlist", "!=", []);

        const snapshot = await query.get();

        this.users = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const wishlist = data.wishlist || [];
            return {
              uid: doc.id,
              ...data,
              wishlistCount: wishlist.length,
              createdAt: data.createdAt?.toDate?.() || null,
            };
          })
          .filter((user) => {
            // 정상 사용자만 필터링: email 또는 name이 있고, 찜한 상품이 있는 유저
            const hasValidInfo = user.email || user.name;
            const hasWishlist = user.wishlistCount > 0;
            return hasValidInfo && hasWishlist;
          })
          .sort((a, b) => b.wishlistCount - a.wishlistCount); // 찜 많은 순

        console.log("📊 찜목록 있는 회원:", this.users.length);
      } catch (error) {
        console.error("회원 정보 불러오기 오류:", error);
        this.$message.error("회원 정보를 불러오는데 실패했습니다.");
      } finally {
        this.loading = false;
      }
    },

    async toggleUser(userId) {
      const index = this.expandedUsers.indexOf(userId);
      if (index > -1) {
        // 닫기
        this.expandedUsers.splice(index, 1);
      } else {
        // 열기 - 상품 정보 로드
        this.expandedUsers.push(userId);
        if (!this.userProducts[userId]) {
          await this.loadUserProducts(userId);
        }
      }
    },

    async loadUserProducts(userId) {
      this.$set(this.loadingProducts, userId, true);
      try {
        const userDoc = await db.collection("users").doc(userId).get();
        const wishlistIds = userDoc.data()?.wishlist || [];

        if (wishlistIds.length === 0) {
          this.$set(this.userProducts, userId, []);
          return;
        }

        const products = await this.getProductsByIds(wishlistIds);
        this.$set(this.userProducts, userId, products);
      } catch (error) {
        console.error(`사용자 ${userId} 찜목록 로딩 오류:`, error);
        this.$set(this.userProducts, userId, []);
      } finally {
        this.$set(this.loadingProducts, userId, false);
      }
    },

    async getProductsByIds(productIds) {
      const products = [];

      for (const productId of productIds) {
        try {
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
            // 로컬 데이터에서 조회
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
      const categories = Object.keys(SET_CATEGORY_MAP);

      for (const category of categories) {
        try {
          const module = await import(`@/data/products/${category.toLowerCase()}.js`);
          const products = Object.values(module.PRODUCTS);
          const product = products.find((p) => String(p.id) === String(productId));
          if (product) {
            return product;
          }
        } catch (error) {
          continue;
        }
      }
      return null;
    },

    getImageUrl(img) {
      if (!img) return '';
      return typeof img === 'string' ? img : (img.url || '');
    },

    openProductDetail(product) {
      const categoryId = product.category;
      const categoryName = Object.keys(SET_CATEGORY_MAP).find(
        (key) => String(SET_CATEGORY_MAP[key]) === String(categoryId)
      );

      let url = "";
      if (categoryName) {
        url = `/${categoryName}/detail/${product.id}`;
      } else {
        url = `/product/detail/${product.id}`;
      }

      // 새 탭에서 열기
      window.open(url, "_blank");
    },

    formatDate(date) {
      if (!date) return "";
      return new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Asia/Seoul",
      }).format(date);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped lang="scss">
#WishlistManagement {
  padding: 20px;

  h2 {
    margin-bottom: 30px;
    font-size: 24px;
    color: #fff;
  }

  .loading {
    text-align: center;
    padding: 40px;
    font-size: 16px;
    color: #666;
  }

  .empty {
    text-align: center;
    padding: 60px;
    color: #999;
    font-size: 16px;
  }

  .user-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .user-card {
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background: #fff;
    transition: all 0.3s;

    &.expanded {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #f9f9f9;
      }

      .user-info {
        flex: 1;

        h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #1a1a1a;
          font-weight: 600;
        }

        p {
          margin: 4px 0;
          font-size: 13px;
          color: #666;

          &.email {
            color: #333;
          }

          &.partner {
            color: #999;
            font-size: 12px;
          }
        }
      }

      .wishlist-count {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: #f5f5f5;
        border-radius: 6px;

        .el-icon-star-on {
          color: #f56c6c;
          font-size: 20px;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .el-icon-arrow-down,
        .el-icon-arrow-up {
          margin-left: 8px;
          color: #999;
          font-size: 14px;
        }
      }
    }

    .wishlist-products {
      padding: 0 20px 20px 20px;
      border-top: 1px solid #f0f0f0;

      .loading-products {
        text-align: center;
        padding: 40px;
        color: #666;
        font-size: 14px;

        i {
          margin-right: 8px;
        }
      }

      .no-products {
        text-align: center;
        padding: 40px;
        color: #999;
        font-size: 14px;
      }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 15px;
        padding-top: 20px;

        .product-card {
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
          }

          .product-img {
            width: 100%;
            height: 150px;
            background: #f5f5f5;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .product-info {
            padding: 10px;

            .brand {
              font-size: 11px;
              color: #999;
              margin-bottom: 4px;
            }

            .name {
              font-size: 13px;
              color: #333;
              font-weight: 500;
              margin-bottom: 4px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .model {
              font-size: 11px;
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
