<template>
  <div class="product_detail">
    <div class="detail_container">
      <div class="detail_top">
        <div class="detail_img">
          <div class="swiper_wrapper">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(img, i) in product.mainImg" :key="i">
                <div class="img_box">
                  <img :src="img"/>
                </div>
              </swiper-slide>
<!--              <div v-if="product.mainImg && product.mainImg.length > 1" class="swiper-pagination" slot="pagination"></div>-->
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
<!--            <div v-if="product.mainImg && product.mainImg.length > 1" class="swiper-button-next"></div>-->
<!--            <div v-if="product.mainImg && product.mainImg.length > 1" class="swiper-button-prev"></div>-->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
          <div class="thumbs_wrapper" v-if="colorVariants.length">
            <div
                v-for="variant in colorVariants"
                :key="variant.id"
                :class="['thumb', { active: variant.id == activeVariantId }]"
                @click="goToColorVariant(variant)"
            >
              <img :src="variant.mainImg[0]" />
            </div>
          </div>
        </div>
        <div class="detail_content">
          <div class="content_header">
            <p class="brand">{{product.enBrand}}</p>
            <p class="enName">{{product.enName}}</p>
            <p class="name">{{product.name}}</p>
            <p class="price">₩가격 문의
              <span @click="sizeDialog = true" v-if="product.sizeData">
              <img src="../../..//public/media/productDetail/ruller.svg">SIZE GUIDE</span>
            </p>
          </div>
          <div class="product_detail_notice">
            <div class="detail_notice_input">
              <div class="input_area">
                <button @click="clickInput">
                  <p>PRODUCT DETAILS</p>
                  <i class="el-icon-arrow-down"></i>
                </button>
              </div>
              <div class="input_content" v-if="inputContent">
                <ul>
                  <li v-for="(d,idx) in product.detailText" :key="idx">
                    <p class="title">{{ d.title }}</p>
                    <p class="content">{{ d.content }}</p>
                  </li>
                </ul>
                <!--                <p class="bottom_notice">-->
                <!--                  ※ 상세사진은 이슈로 인해 로고·TC코드 등은 제외되며, 가죽 질감 및 원단 퀄리티와 수공 스티치 확인용 참고 이미지로 확인 부탁드립니다.-->
                <!--                </p>-->
              </div>
            </div>
          </div>
          <div class="detail_info">
            <tbody>
            <!--            <tr>-->
            <!--              <th><p class="price">판매가</p></th>-->
            <!--              <td><p class="price">{{product.price | formatNumber}}원</p></td>-->
            <!--            </tr>-->
            <!--            <tr>-->
            <!--              <th><p>국내/해외배송</p></th>-->
            <!--              <td><p>해외배송</p></td>-->
            <!--            </tr>-->
            <!--            <tr>-->
            <!--              <th><p>배송방법</p></th>-->
            <!--              <td><p>택배</p></td>-->
            <!--            </tr>-->
            <!--            <tr>-->
            <!--              <th><p>배송비</p></th>-->
            <!--              <td><p>{{product.delivery | formatNumber}}원</p></td>-->
            <!--            </tr>-->
            <tr>
              <th><p>모델번호</p></th>
              <td>
                <p>{{product.modelNumber}}</p>
              </td>
            </tr>
            <tr>
              <th><p>추가 해택</p></th>
              <td>
                <p>국내 유통 제품 중 최고 퀄리티 보장</p>
                <p>프리미엄 검수 서비스 무료 제공</p>
                <p>박스, 더스트백, 인증서 풀패키지 구성 (일부 품목 제외)</p>
              </td>
            </tr>
            <tr>
              <th><p>제조사</p></th>
              <td><p>중국</p></td>
            </tr>
            <tr>
              <th><p>배송정보</p></th>
              <td><p>해외배송 / 무료배송</p></td>
            </tr>
            <tr>
              <th><p>배송기간</p></th>
              <td><p>2~3주 소요 (주문 즉시 출고)</p></td>
            </tr>
            </tbody>
          </div>
          <el-select v-model="value" placeholder="사이즈 / 색상">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <!--          totale price 코드 아까워서 살려둠 -->
          <!--          <div class="totalProducts">-->
          <!--            <p>{{ product.title }}</p>-->
          <!--            <div class="quantity_control">-->
          <!--              <button @click="decreaseQuantity">-</button>-->
          <!--              <span>{{ quantity }}</span>-->
          <!--              <button @click="increaseQuantity">+</button>-->
          <!--            </div>-->
          <!--            <p class="total_price">총 가격: {{ totalPrice | formatNumber}}원</p>-->
          <!--          </div>-->
          <!--          <div class="totalPrice">-->
          <!--            <p class="title">TOTAL <span>(QUANTITY)</span></p>-->
          <!--            <p class="total">{{ totalPrice | formatNumber }}원<span> ({{ quantity }}개)</span></p>-->
          <!--          </div>-->
          <div class="btn_box">
            <!--            <button @click="setCartItem" class="cart">장바구니 담기</button>-->
            <!--            <button @click="directSell">바로 구매</button>-->
            <button class="cart" @click="contact">가격 문의하기</button>
          </div>
        </div>
      </div>
      <div class="detail_bottom">
        <!--        <div class="tab_box">-->
        <!--          <button :class="{ active: component === 'Description' }" @click="component = 'Description'">상세정보</button>-->
        <!--          <button :class="{ active: component === 'ReviewList' }" @click="component = 'ReviewList'">구매평(0)</button>-->
        <!--          <button :class="{ active: component === 'QnaList' }" @click="component = 'QnaList'">Q&A(0)</button>-->
        <!--        </div>-->
        <div class="tab_content">
          <component :is="component" @changeComp="changeComp" :product="product" :allProducts="allProducts"></component>
        </div>
      </div>
    </div>

    <size-dialog v-if="sizeDialog" :visible.sync="sizeDialog" :product="product"/>
  </div>
</template>

<script>
  import {db} from "../../firebase";
  import {mapGetters} from "vuex";
  //  import firebase from "firebase";
  import Description from "../category/detailBottomTab/Description"
  import ReviewList from "../category/detailBottomTab/ReviewList"
  import QnaList from "../category/detailBottomTab/QnaList"
  import NobleDetailBottom from "../category/detailBottomTab/NobleDetailBottom"
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css'
  import SizeDialog from "../../components/dialog/sizeDialog";

  export default {
    name: "CategoryDetail",
    components: {
      Description,
      ReviewList,
      QnaList,
      NobleDetailBottom,
      Swiper, SwiperSlide, SizeDialog
    },
    watch: {
      '$route.params.id': {
        immediate: true,
        handler() {
          this.getData();
        }
      }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          observer: true,
          observeParents: true,
        },
        activeIndex: 0,
        allProducts: [],
        product: {},
        quantity: 1,
        component: 'NobleDetailBottom',
        sizeDialog: false,
        value: "",
        options: [
          {value: "사이즈 / 색상 문의", label: "사이즈 / 색상 문의"},
        ],
        inputContent: false,
        colorVariants: [],
        activeVariantId:null,
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
      delivery() {
        return this.product.delivery || 0
      }
    },
    methods: {
      goToColorVariant(variant) {
        const category = this.$route.params.category.toLowerCase();
        this.$router.push({
          path: `/${category}/detail/${variant.id}`
        });
      },
      clickInput() {
        if (this.inputContent == false) {
          return this.inputContent = true
        } else {
          return this.inputContent = false
        }
      },
      changeComp(newComp) {
        this.component = newComp;
      },
//      firebase 용
//      async getData() {
//        try {
//          const productId = this.$route.params.id;
//          const productDoc = await db.collection("products").doc(productId).get();
//
//          if (productDoc.exists) {
//            this.product = productDoc.data();
//          } else {
//            console.error("상품이 존재하지 않습니다.");
//          }
//        } catch (error) {
//          console.error("상품 데이터를 가져오는 중 오류 발생:", error);
//        }
//      },
      async getData() {
        try {
          const category = this.$route.params.category.toLowerCase();
          const productId = this.$route.params.id;

          const module = await import(`@/data/products/${category}.js`);
          const products = module.PRODUCTS;
          const matchedProduct = Object.values(products).find(p => String(p.id) === productId);

          if (matchedProduct) {
            this.product = matchedProduct;
            const sameGroup = matchedProduct.modelGroup
                ? Object.values(products).filter(
                    p => p.modelGroup === matchedProduct.modelGroup
                )
                : [];

            // 현재 상품이 목록 중 몇 번째인지 찾기 위해 변수 추가
            this.colorVariants = sameGroup;
            this.activeVariantId = matchedProduct.id;
          }

          const allModule = await import('@/data/products/index.js');
          this.allProducts = Object.values(allModule.ALL_PRODUCTS);
        } catch (error) {
          console.error('상품 데이터를 불러오는 중 오류 발생:', error);
        }
      },
      contact() {

      },
//      async directSell() {
//        if (!this.isLogin) {
//          this.$alert("로그인이 필요합니다!");
//          return;
//        }
//
//        const userId = this.user?.uid;
//        try {
//          const cartSheetItem = {
//            id: this.$route.params.id,
//            category: this.product.category,
//            brand: this.product.brand,
//            title: this.product.title,
//            img: this.product.img,
//            price: this.product.price,
//            quantity: this.quantity,
//            totalPrice: this.totalPrice,
//            delivery: this.delivery
//          };
//
//          // Firestore에 주문 정보 저장
//          await firebase.firestore().collection("cartSheet").add({
//            userId,
//            items: [cartSheetItem], // 배열로 저장
//            createdAt: firebase.firestore.FieldValue.serverTimestamp()
//          });
//
//          // Firestore 저장이 완료된 후 페이지 이동
//          this.$router.push('/direct_view');
//
//        } catch (error) {
//          console.error("주문 처리 중 오류 발생:", error);
//          this.$alert("주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
//        }
//      },
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
            id: this.$route.params.id,
            category: this.product.category,
            brand: this.product.brand,
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
    },
    mounted() {

    },
    created() {
      this.getData();
    },
  };
</script>