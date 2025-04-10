<template>
  <div id="OrderList">
    <div class="ol_contianer">
      <div class="order_main">
        <p class="p1">주문목록</p>
        <div v-if="order.length>0">
          <div class="order_list_item" v-for="o in order" :key="o.id">
            <p style="margin-bottom: 20px">{{formatDate(o.time)}}</p>
            <div class="item_box">
              <img :src="o.img">
              <div class="order_info">
                <p class="status">배송중</p>
                <p>{{ o.title }}</p>
              </div>
            </div>
            <div class="quantity_box">
              <p>수량</p>
              <div class="quantity_control">
                <span>{{ o.quantity }}</span>
              </div>
            </div>
            <div class="total_price">
              <p class="p3">주문금액</p>
              <p class="p4">{{o.totalPrice | formatNumber}}원</p>
            </div>
            <div class="button_box">
              <button @click="setCartItem(o)">장바구니 담기</button>
              <button @click="check()" class="btn2">배송조회</button>
              <button @click="check()">교환,반품 신청</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p style="color: #6d6d6d">주문내역이 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import {db} from "../../firebase";
  import {mapGetters} from "vuex";

  export default {
    name: "OrderList",
    data() {
      return {
        order: [],
      }
    },
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
    },
    methods: {
      formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
          return new Date(timestamp.seconds * 1000).toLocaleString("ko-KR"); //Firestore Timestamp 변환
        }
        return "-"; //값이 없으면 기본값
      },
      async fetchOrderList() {
        if (!this.isLogin) {
          this.$alert("로그인이 필요합니다!");
          this.$router.push("/login");
          return;
        }

        const userId = this.user.uid;
        const orderRef = db.collection("orders").where("userId", "==", userId);

        try {
          const querySnapshot = await orderRef.get();
          let orders = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
//            const cartItems = Array.isArray(data.cartItem) ? data.cartItem : Object.values(data.cartItem);
            const time = data.createdAt
//            const cartItems = Object.values(data.cartItem);
            const cartItems = Object.values(data.cartItem).map(item => ({
              ...item,
              time: time // 각 cartItem에 time 추가
            }));
            orders = orders.concat(cartItems);
          });
          this.order = orders;
          console.log('1',this.order)
        } catch (error) {
          console.error("주문 목록을 불러오는 중 오류 발생:", error);
        }
      },
      async setCartItem(o) {
        const userId = this.user.uid; // 로그인한 사용자 ID
        const cartRef = db.collection("cart").doc(userId); // Firestore 경로 설정

        try {
          // Firestore에서 기존 장바구니 데이터 가져오기
          const docSnap = await cartRef.get();
          let cart = docSnap.exists ? docSnap.data().items : [];

          const cartItem = {
            id: o.id,
            category: o.category,
            title: o.title,
            img: o.img,
            price: o.price,
            quantity: o.quantity,
            totalPrice: o.totalPrice,
            delivery: o.delivery,
          };

          // 장바구니에 동일한 상품이 있는지 확인
          const existingItemIndex = cart.findIndex(
              (cartItem) => cartItem.id === o.id && cartItem.category === o.category
          );

          if (existingItemIndex !== -1) {
            // 기존 상품이 있으면 수량과 총 가격 업데이트
            cart[existingItemIndex].quantity += o.quantity;
            cart[existingItemIndex].totalPrice += o.totalPrice;
          } else {
            // 새로운 상품이면 추가
            cart.push(cartItem);
          }

          // Firestore에 장바구니 데이터 저장
          await cartRef.set({ items: cart });

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
      check(){
        this.$alert('고객센터의 문의 부탁드립니다.','알림')
      }
    },
    created() {
      this.fetchOrderList();
    },
  }
</script>