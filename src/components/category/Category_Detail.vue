<template>
  <div class="product_detail">
    <div class="detail_container">
      <div class="detail_top">
        <div class="detail_img">
          <img :src="product.img">
        </div>
        <div class="detail_content">
          <h1>{{product.title}}</h1>
          <div class="detail_info">
            <tbody>
            <tr>
              <th><p class="price">판매가</p></th>
              <td><p class="price">{{product.price | formatNumber}}원</p></td>
            </tr>
            <tr>
              <th><p>국내/해외배송</p></th>
              <td><p>해외배송</p></td>
            </tr>
            <tr>
              <th><p>배송방법</p></th>
              <td><p>택배</p></td>
            </tr>
            <tr>
              <th><p>배송비</p></th>
              <td><p>{{product.delivery | formatNumber}}원</p></td>
            </tr>
            </tbody>
          </div>
          <div class="totalProducts">
            <p>{{ product.title }}</p>
            <div class="quantity_control">
              <button @click="decreaseQuantity">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>
            <p class="total_price">총 가격: {{ totalPrice | formatNumber}}원</p>
          </div>
          <div class="totalPrice">
            <p class="title">TOTAL <span>(QUANTITY)</span></p>
            <p class="total">{{ totalPrice | formatNumber }}원<span> ({{ quantity }}개)</span></p>
          </div>
          <div class="btn_box">
            <button @click="setCartItem" class="cart">장바구니 담기</button>
            <button @click="directSell">바로 구매</button>
          </div>
        </div>
      </div>
<!--      <div class="detail_bottom">-->
<!--        <div class="tab_box">-->
<!--          <button :class="{ active: currentTab === 'description' }" @click="currentTab = 'description'">상세정보</button>-->
<!--          <button :class="{ active: currentTab === 'review' }" @click="currentTab = 'review'">구매평</button>-->
<!--          <button :class="{ active: currentTab === 'qna' }" @click="currentTab = 'qna'">Q&A</button>-->
<!--        </div>-->
<!--        <div class="tab_content">-->
<!--          <div v-if="currentTab === 'description'">-->
<!--            <p v-html="product.description"></p>-->
<!--          </div>-->
<!--          <div v-if="currentTab === 'review'">-->
<!--            <ReviewList :productId="productId" :user="user"/>-->
<!--          </div>-->
<!--          <div v-if="currentTab === 'qna'">-->
<!--            <QnaList :productId="productId" :user="user"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
//  import watchItems from '../../constants/watch_item';
//  import bagItems from '../../constants/bag_item';
//  import shoesItems from '../../constants/shoes_item';
//  import topItems from '../../constants/top_item';
//  import walletItems from '../../constants/wallet_item';
//  import accItems from '../../constants/acc_item';
//  import {getProductData} from "../../common/api/product";
  import {db} from "../../firebase";
  import {mapGetters} from "vuex";
  import firebase from "firebase";

  export default {
    name: "CategoryDetail",
    components: {
//      Description,
//      ReviewList,
//      QnaList
    },
    data() {
      return {
        product: {},
        quantity: 1,
//        component: 'Description',
      };
    },
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
//      totalPrice() {
//        return this.quantity * this.product.price + this.product.delivery;
//      },
      totalPrice() {
        return (this.product.price || 0) * this.quantity + (this.product.delivery || 0);
      },
      delivery(){
        return this.product.delivery || 0
      }
    },
    methods: {
      changeComp(newComp) {
        this.component = newComp;
      },
      async getData() {
        try {
          const productId = this.$route.params.id;
          const productDoc = await db.collection("products").doc(productId).get();

          if (productDoc.exists) {
            this.product = productDoc.data();
          } else {
            console.error("상품이 존재하지 않습니다.");
          }
        } catch (error) {
          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
        }
      },
      async directSell() {
        if (!this.isLogin) {
          this.$alert("로그인이 필요합니다!");
          return;
        }

        const userId = this.user?.uid;
        try {
          const cartSheetItem = {
            id:this.$route.params.id,
            category: this.$route.params.category,
            title: this.product.title,
            img: this.product.img,
            price: this.product.price,
            quantity: this.quantity,
            totalPrice: this.totalPrice,
            delivery: this.delivery
          };

          // Firestore에 주문 정보 저장
          await firebase.firestore().collection("cartSheet").add({
            userId,
            items: [cartSheetItem], // 배열로 저장
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          // Firestore 저장이 완료된 후 페이지 이동
          this.$router.push('/direct_view');

        } catch (error) {
          console.error("주문 처리 중 오류 발생:", error);
          this.$alert("주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      },
      async setCartItem() {
        if (!this.isLogin) {
          this.$alert("로그인이 필요합니다!");
          return;
        }

        const userId = this.user.uid; // 로그인한 사용자 ID
        const cartRef = db.collection("cart").doc(userId); // Firestore 경로 설정

        try {
          // Firestore에서 기존 장바구니 데이터 가져오기
          const docSnap = await cartRef.get();
          let cart = docSnap.exists ? docSnap.data().items : [];

          const cartItem = {
            id:this.$route.params.id,
            category: this.$route.params.category,
            title: this.product.title,
            img: this.product.img,
            price: this.product.price,
            quantity: this.quantity,
            totalPrice: this.totalPrice,
            delivery: this.delivery
          };

          // 장바구니에 동일한 상품이 있는지 확인
          const existingItemIndex = cart.findIndex(
              (item) => item.id === cartItem.id && item.category === cartItem.category
          );

          if (existingItemIndex !== -1) {
            // 기존 상품이 있으면 수량과 총 가격 업데이트
            cart[existingItemIndex].quantity += this.quantity;
            cart[existingItemIndex].totalPrice += this.totalPrice;
          } else {
            // 새로운 상품이면 추가
            cart.push(cartItem);
          }

          // Firestore에 장바구니 데이터 저장
          await cartRef.set({items: cart});

          this.$confirm("장바구니에 상품이 담겼습니다! 장바구니로 이동하시겠습니까?")
          .then(() => {
            this.$router.push("/cart_view");
          })
          .catch(() => {
            return;
          });
        } catch (error) {
          console.error("장바구니 저장 중 오류 발생:", error);
        }
      },
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
//      fetchProductData(category, id) {
//        const dataMap = {
//          watch: watchItems,
//          bag: bagItems,
//          shoes: shoesItems,
//          top: topItems,
//          wallet: walletItems,
//          acc: accItems,
//        };
//
//        const categoryData = dataMap[category];
//        if (categoryData) {
//          this.product = categoryData.find(item => item.id == id);
//        } else {
//          console.error('errrrrr:', category);
//        }
//      },
    },
    created() {
//      const category = this.$route.params.category;
//      const id = this.$route.params.id;
//      this.fetchProductData(category, id);
      this.getData();
    },
  };
</script>