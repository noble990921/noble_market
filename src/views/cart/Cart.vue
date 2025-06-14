<template>
  <div id="Cart">
    <div class="cart_container" v-if="cart.length>0">
      <div class="cart_main">
        <p class="p1">장바구니 상품</p>
        <div class="cart_total">
          <p>일반상품 ({{cart.length}})</p>
        </div>
        <div class="cart_item" v-for="i in cart" :key="i.id">
          <div class="item_box">
            <input type="checkbox" v-model="i.selected"/>
            <img :src="i.img">
            <div class="cart_info">
              <p style="font-weight: bold;">{{ i.title }}</p>
<!--              <p>가격문의</p>-->
              <p>배송비: {{i.delivery | formatNumber}}원</p>
            </div>
            <i @click="RemoveItem(i)" class="el-icon-close"></i>
          </div>
          <div class="quantity_box">
            <p>수량</p>
            <div class="quantity_control">
              <button @click="decreaseQuantity(i)">-</button>
              <span>{{ i.quantity }}</span>
              <button @click="increaseQuantity(i)">+</button>
            </div>
          </div>
          <div class="total_price">
            <p class="p3">주문금액</p>
            <p class="p4">{{i.totalPrice | formatNumber}}원</p>
          </div>
          <div class="button_box">
            <button @click="showAlert">관심상품</button>
            <button @click="buyItem(i)" class="btn2">주문하기</button>
          </div>
        </div>
      </div>
      <div class="cart_side">
        <div class="side_container">
          <div class="total_box">
            <div class="totalSummary__item">
              <p>총 상품금액</p>
              <p>{{ selectedTotalPrice | formatNumber }}원</p>
            </div>
            <div class="totalSummary__item">
              <p>총 배송비</p>
              <p>{{ totalDelivery | formatNumber }}원</p>
            </div>
            <div class="total">
              <p>결제예정금액</p>
              <p>{{ finalTotalPrice | formatNumber }}원</p>
            </div>
          </div>
          <div class="btn_box">
            <button class="btn2" @click="selectAll">전체상품주문</button>
            <button @click="processSelected">선택상품주문</button>
          </div>
        </div>
      </div>
    </div>
    <div class="noitem" v-else>
      <div class="noitem_container">
        <i class="el-icon-warning-outline"></i>
        <p>장바구니가 비어 있습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import {db} from "../../firebase";
  import {mapGetters} from "vuex";

  export default {
    name: "Cart",
    data() {
      return {
        cart: [],
        BuyProducts: []
      }
    },
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
      selectedTotalPrice() {
        return this.cart
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.totalPrice, 0);
      },
      totalDelivery() {
        return this.cart
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.delivery, 0);
      },
      finalTotalPrice() {
        return this.selectedTotalPrice + this.totalDelivery;
      }
    },
    methods: {
      showAlert() {
        this.$alert("등록 되었습니다.");
      },
      // Firestore에서 장바구니 데이터 가져오기
      async fetchCart() {
        if (!this.isLogin) {
          this.$alert("로그인이 필요합니다!");
          this.$router.push("/login");
          return;
        }

        const userId = this.user.uid;
        const cartRef = db.collection("cart").doc(userId);

        try {
          const docSnap = await cartRef.get();
          // exists 는  Firebase Firestore에서 가져온 문서(DocumentSnapshot)가 존재하는지 확인하는 속성
          if (docSnap.exists) {
            this.cart = docSnap.data().items;
          } else {
            this.cart = [];
          }
        } catch (error) {
          console.error("장바구니 데이터를 불러오는 중 오류 발생:", error);
        }
      },
      // 상품 주문
      async buyItem(i) {
        const userId = this.user?.uid;
        if (!userId) return;

        const selectedItem = this.cart.find(item => item.id === i.id);
        if (!selectedItem) return;

        try {
          // Firestore에 주문 정보 저장
          await firebase.firestore().collection("cartSheet").add({
            userId,
            items: [selectedItem],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          // 장바구니에서 해당 상품 제거
//          this.cart = this.cart.filter(item => item.id !== i.id);
//          await firebase.firestore().collection("cart").doc(userId).set({items: this.cart}, {merge: true});

          this.$emit("changeComp", "CartForm");
        } catch (error) {
          console.error("주문 처리 중 오류 발생:", error);
        }
      },
      // Firestore에 장바구니 데이터 저장
      async updateCart() {
        const userId = this.user?.uid;
        if (!userId) return;

        try {
          const cartRef = firebase.firestore().collection("cart").doc(userId);
          await cartRef.set({items: this.cart}, {merge: true});
        } catch (error) {
          console.error("장바구니 업데이트 오류:", error);
        }
      },
      // 상품 수량 증가
      increaseQuantity(item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
        this.updateCart();
      },
      // 상품 수량 감소
      decreaseQuantity(item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.quantity * item.price;
          this.updateCart();
        } else {
          this.$alert("수량은 최소 1개 이상이어야 합니다.");
        }
      },
      //  장바구니에서 상품 삭제
      async RemoveItem(i) {
        const confirmed = await this.$confirm("장바구니에서 삭제하시겠습니까?");
        if (!confirmed) return;

        this.cart = this.cart.filter(item => item.id !== i.id);

        const userId = this.user?.uid;
        if (!userId) return;

        try {
          const cartRef = firebase.firestore().collection("cart").doc(userId);
          await cartRef.set({items: this.cart}, {merge: true});
          this.$alert(`${i.title} 상품이 삭제되었습니다!`);
        } catch (error) {
          console.error("장바구니 삭제 오류:", error);
        }
      },
      //  전체 상품 주문
      async selectAll() {
        const confirmed = await this.$confirm("장바구니의 모든 상품을 구매하시겠습니까?");
        if (!confirmed) return;

        const userId = this.user?.uid;
        if (!userId) return;

        try {
          this.cart.forEach((item) => {
            item.selected = true;
          });
          this.BuyProducts = this.cart.filter((item) => item.selected);
          console.log('test',this.BuyProducts)

          if (this.BuyProducts.length > 0) {
            // Firestore에 주문 저장
            await firebase.firestore().collection("cartSheet").add({
              userId,
              items: this.BuyProducts,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });

            // 장바구니 비우기
//            this.cart = [];
//            await firebase.firestore().collection("cart").doc(userId).set({ items: [] });

            this.$emit("changeComp", "CartForm");
          }
        } catch (error) {
          console.error("전체 상품 주문 오류:", error);
        }
      },

      // 선택한 상품만 주문
      async processSelected() {
        this.BuyProducts = this.cart.filter((item) => item.selected);
        if (this.BuyProducts.length === 0) {
          this.$alert("선택된 상품이 없습니다.");
          return;
        }

        const userId = this.user?.uid;
        if (!userId) return;

        try {
          // Firestore에 주문 저장
          await firebase.firestore().collection("cartSheet").add({
            userId,
            items: this.BuyProducts,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });

          // 장바구니에서 주문한 상품 제거
//          this.cart = this.cart.filter((item) => !item.selected);
//          await firebase.firestore().collection("cart").doc(userId).set({ items: this.cart });

          this.$emit("changeComp", "CartForm");
        } catch (error) {
          console.error("선택 상품 주문 오류:", error);
        }
      }

      //localstorage 로 짠코드
//      showAlert() {
//        this.$alert("등록 되었습니다.");
//      },
      //      fetchCart() {
//        const CartItem = JSON.parse(localStorage.getItem("CartItem"));
//        if (CartItem) {
//          this.cart = CartItem.map((item) => ({
//            ...item,
//            selected: false,
//          }));
//        }
//      },
//      buyItem(i){
//        const vm = this;
//        vm.BuyProducts = vm.cart.filter((item) => item.id == i.id);
//        localStorage.setItem('BuyItem', JSON.stringify(vm.BuyProducts));
//        console.log('BuyItem',vm.BuyProducts)
//        vm.$emit('changeComp', 'CartForm');
//      },
//      increaseQuantity(item) {
//        item.quantity += 1;
//        item.totalPrice = item.quantity * item.price;
//        localStorage.setItem('CartItem', JSON.stringify(this.cart));
//      },
//      decreaseQuantity(item) {
//        if (item.quantity > 1) {
//          item.quantity -= 1;
//          item.totalPrice = item.quantity * item.price;
//          localStorage.setItem("CartItem", JSON.stringify(this.cart));
//        } else {
//          this.$alert("수량은 최소 1개 이상이어야 합니다.");
//        }
//      },
//      RemoveItem(i) {
//        this.$confirm('장바구니에서 삭제하시겠습니까?')
//        .then(() => {
//          this.cart = this.cart.filter(
//              item => !(item.id === i.id && item.category === i.category)
//          );
//          localStorage.setItem('CartItem', JSON.stringify(this.cart));
//          this.$alert(`${i.name} 상품이 삭제되었습니다!`);
//        })
//        .catch(() => {
//          return
//        });
//      },
//      selectAll() {
//        const vm = this;
//        vm.$confirm('장바구니에 모든상품을 구매 하시겠습니까?')
//        .then(() => {
//          vm.cart.forEach((item) => {
//            item.selected = true;
//          });
//          vm.BuyProducts = vm.cart.filter((item) => item.selected);
//          localStorage.setItem('BuyItem', JSON.stringify(vm.BuyProducts));
//          console.log('BuyItem', vm.BuyProducts)
//          vm.$emit('changeComp', 'CartForm');
//        })
//        .catch(() => {
//          return
//        });
//      },
//      processSelected() {
//        const vm = this
//        vm.BuyProducts = vm.cart.filter((item) => item.selected);
//        if (vm.BuyProducts.length > 0) {
//          localStorage.setItem('BuyItem', JSON.stringify(vm.BuyProducts));
//          vm.$emit('changeComp', 'CartForm');
//          console.log("주문된 상품:", vm.BuyProducts);
//        } else {
//          vm.$alert("선택된 상품이 없습니다.");
//        }
//      },
    },
    created() {
      this.fetchCart();
    },
  }
</script>