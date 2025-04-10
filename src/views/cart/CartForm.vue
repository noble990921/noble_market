<template>
  <div id="CartForm">
    <div class="cart_form_container">
      <div class="main_container">
        <div class="main_top">
          <div class="cart_main_web">
            <div class="top_name" v-if="!deskWidth">
              <p class="p1">이미지</p>
              <p class="p2">상세정보</p>
              <p class="p1">판매가</p>
              <p class="p1">수량</p>
              <p class="p1">배송비</p>
              <p class="p1">합계</p>
            </div>
            <div class="cart_item" v-for="i in cart" :key="i.id">
              <div class="item_box" v-if="!deskWidth">
                <img class="p1" :src="i.img">
                <p class="p2" style="font-weight: bold;">{{ i.title }}</p>
                <p class="p1">{{ i.price | formatNumber }}원</p>
                <p class="p1">{{i.quantity}}</p>
                <p class="p1">{{i.delivery | formatNumber}}원</p>
                <p class="p1">{{i.totalPrice | formatNumber}}원</p>
                <i @click="RemoveItem(i)" class="el-icon-close"></i>
              </div>
              <div class="m_item_box" v-else>
                <div class="m_container">
                  <img :src="i.img">
                  <div class="m_text_b">
                    <p class="mp2" style="font-weight: bold;">{{ i.title }}</p>
                    <p class="mp1">수량: {{i.quantity}}</p>
                    <p class="mp1">가격: {{ i.price | formatNumber }}원</p>
                    <p class="mp1">배송비: {{i.delivery | formatNumber}}원</p>
                  </div>
                  <i @click="RemoveItem(i)" class="el-icon-close"></i>
                </div>
                <div class="total_price__">
                  <p>총합</p>
                  <p>{{i.totalPrice | formatNumber}}원</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main_bottom">
          <div class="cart_address">
            <div class="top_text">
              <p class="address_title">배송정보</p>
              <p class="text_p"><span>*</span> 필수입력사항</p>
            </div>
            <div class="address_info">
              <el-form ref="orderForm" :model="form" label-width="150px" :rules="rules">
                <el-form-item label="받으시는 분" prop="name" required>
                  <el-input v-model="form.name"/>
                </el-form-item>

                <el-form-item label="주소" prop="totalAddress" required>
                  <el-row>
                    <el-col :span="14">
                      <el-input v-model="form.postcode" placeholder="우편번호" readonly/>
                    </el-col>
                    <el-col :span="6">
                      <el-button style="height: 25px;padding: 4px" @click="openPostcode" type="primary">주소검색</el-button>
                    </el-col>
                  </el-row>
                  <el-input v-model="form.address" placeholder="기본주소" style="margin-top: 10px;" readonly/>
                  <el-input v-model="form.detailAddress" placeholder="상세주소" style="margin-top: 5px;"/>
                </el-form-item>

                <el-form-item label="휴대전화" prop="phoneNumber" required>
                  <el-row>
                    <el-col :span="8">
                      <el-select style="width: 100%" v-model="form.phonePrefix" placeholder="010">
                        <el-option label="010" value="010"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      <el-input v-model="form.phoneMiddle" maxlength="4"/>
                    </el-col>
                    <el-col :span="8">
                      <el-input v-model="form.phoneLast" maxlength="4"/>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="이메일" prop="totalEmail" required>
                  <el-row>
                    <el-col :span="11">
                      <el-input v-model="form.emailUser"/>
                    </el-col>
                    <el-col :span="1" style="text-align: center;">@</el-col>
                    <el-col :span="11">
                      <el-input v-model="form.emailDomain"/>
                    </el-col>
                    <el-col :span="15">
                      <el-select v-model="form.emailDomain" placeholder="직접입력">
                        <el-option label="직접입력" value=""></el-option>
                        <el-option label="naver.com" value="naver.com"></el-option>
                        <el-option label="nate.com" value="nate.com"></el-option>
                        <el-option label="gmail.com" value="gmail.com"></el-option>
                        <el-option label="daum.net" value="daum.net"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="배송메시지">
                  <el-input v-model="form.deliveryMessage"/>
                </el-form-item>
                <div class="main_footer">
                  <div class="top_text">
                    <p>결제수단</p>
                  </div>
                  <div class="payment">
                    <div class="payment_left">
                      <el-form-item label="결제수단 선택" required>
                        <el-radio-group v-model="paymentMethod">
                          <!--                          <el-radio label="card">카드 결제</el-radio>-->
                          <!--                          <el-radio label="escrow">에스크로(실시간 계좌이체)</el-radio>-->
                          <!--                          <el-radio label="mobile">휴대폰 결제</el-radio>-->
                          <el-radio label="bank">무통장 입금</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="" prop="depositorName" required>
                        <div class="depositor">
                          <p>입금자명</p>
                          <el-input v-model="form.depositorName" placeholder="입금자명을 입력하세요"/>
                        </div>
                      </el-form-item>
                      <el-form-item label="">
                        <div class="depositor">
                          <p>입금은행</p>
                          <el-select v-model="selectedBank" placeholder="은행을 선택하세요">
                            <el-option label="3333-3333-3333 (주)잭디사운드" value="카카오뱅크"/>
                          </el-select>
                        </div>
                      </el-form-item>
                    </div>
                    <div class="payment_right">
                      <p class="p1">최종결제 금액</p>
                      <p class="p2">{{finalTotalPrice | formatNumber}} <span>원</span></p>

                      <el-checkbox v-model="agreeTerms">결제정보를 확인하였으며, 구매진행에 동의합니다.</el-checkbox>

                      <el-button @click="submitForm" type="primary" class="pay-button" :disabled="!agreeTerms">결제하기
                      </el-button>
                    </div>
                  </div>
                </div>
                <p class="pp22">
                  * 입금은행 계좌번호로 입금이 완료되어야 배송을 시작합니다. (무통장 계좌정보는 홈페이지 상단에서도 확인가능합니다.)
                </p>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  //  import {db} from "@/firebase";
  import {mapGetters} from "vuex";

  export default {
    name: "CartForm",
    data() {
      return {
        paymentMethod: "bank",
        selectedBank: "카카오뱅크",
        phoneMiddle: "",
        phoneLast: "",
        agreeTerms: false,
        form: {
          name: '',
          totalAddress: '',
          postcode: '',
          address: '',
          detailAddress: '',
          phoneNumber: '',
          phonePrefix: '010',
          phoneMiddle: '',
          phoneLast: '',
          totalEmail: '',
          emailUser: '',
          emailDomain: '',
          deliveryMessage: '',
          depositorName: '',
          orderstatus:'배송확인'
        },
        rules: {
          name: [
            {required: true, message: "받으시는 분을 입력하세요.", trigger: "blur"}
          ],
          totalAddress: [
            {validator: this.validateAddress, trigger: "blur"}
          ],
          phoneNumber: [
            {validator: this.validatePhone, trigger: "blur"}
          ],
          totalEmail: [
            {validator: this.validateEmail, trigger: "blur"}
          ],
          depositorName: [
            {validator: this.validateDeositorName, trigger: "blur"}
          ],

        },
        windowWidth: window.innerWidth,
        cart: [],
        BuyProducts: [],
      }
    },
    watch: {
      phoneNumber(newVal) {
        this.form.phoneNumber = newVal;
      },
      totalAddress(newVal) {
        this.form.totalAddress = newVal
      },
      totalEmail(newVal) {
        this.form.totalEmail = newVal
      },
      depositorName(newVal) {
        this.form.depositorName = newVal
      }
    },
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
      depositorName() {
        return this.form.depositorName;
      },
      totalEmail() {
        return `${this.form.emailUser}@${this.form.emailDomain}`;
      },
      totalAddress() {
        return `${this.form.postcode} ${this.form.address} ${this.form.detailAddress}`;
      },
      phoneNumber() {
        return `${this.form.phonePrefix}-${this.form.phoneMiddle}-${this.form.phoneLast}`;
      },
      deskWidth() {
        return this.windowWidth < 1024
      },
      selectedTotalPrice() {
        return this.cart
        .filter((item) => item.price)
        .reduce((sum, item) => sum + item.totalPrice, 0);
      },
      totalDelivery() {
        return this.cart
        .filter(item => item.delivery)
        .reduce((sum, item) => sum + item.delivery, 0);
      },
      finalTotalPrice() {
        return this.selectedTotalPrice + this.totalDelivery;
      }
    },
    methods: {
      validateDeositorName(rule, value, callback) {
        if (!this.form.depositorName) {
          callback(new Error("입급자명을 입력하세요."));
        } else {
          callback();
        }
      },
      validateEmail(rule, value, callback) {
        if (!this.form.emailUser || !this.form.emailDomain) {
          callback(new Error("이메일을 입력하세요."));
        } else {
          callback();
        }
      },
      validateAddress(rule, value, callback) {
        if (!this.form.postcode) {
          callback(new Error("주소를 입력하세요."));
        } else if (!this.form.address) {
          callback(new Error("주소를 입력하세요."));
        } else if (!this.form.detailAddress) {
          callback(new Error("상세주소를 입력하세요."));
        } else {
          callback();
        }
      },
      validatePhone(rule, value, callback) {
        if (!this.form.phoneMiddle || !this.form.phoneLast) {
          callback(new Error("전화번호를 모두 입력하세요."));
        } else if (this.form.phoneMiddle.length < 4 || this.form.phoneLast.length < 4) {
          callback(new Error("전화번호를 모두 입력하세요."));
        } else {
          callback();
        }
      },
      openPostcode() {
        new window.daum.Postcode({
          oncomplete: (data) => {
            this.form.postcode = data.zonecode;
            if (data.userSelectedType === "R") {
              this.form.address = data.roadAddress;
            } else {
              this.form.address = data.jibunAddress;
            }
          }
        }).open()
      },
      async submitForm() {
        this.$refs.orderForm.validate(async valid => {
          if (valid) {
            try {
              const userId = this.user.uid; // 사용자 UID 가져오기
              const userRef = firebase.firestore().collection("users").doc(userId);
              const ordersRef = firebase.firestore().collection("orders");

              // Firestore 트랜잭션 실행
              await firebase.firestore().runTransaction(async (transaction) => {
                const userDoc = await transaction.get(userRef);
                let currentOrderCount = userDoc.exists ? userDoc.data().orderCount || 0 : 0;
                let currentTotalSpent = userDoc.exists ? userDoc.data().totalSpent || 0 : 0;
                let orderTotalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                // 주문 데이터 생성
                const orderData = {
                  userName: this.user.name,
                  userId: userId,
                  selectedTotalPrice:this.selectedTotalPrice,
                  totalDelivery:this.totalDelivery,
                  finalTotalPrice:this.finalTotalPrice,
                  orderInfo: {...this.form},
                  cartItem: {...this.cart},
                  cartQty: this.cart.length,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  orderNumber: currentOrderCount + 1, // 몇 번째 주문인지
                  totalSpent: currentTotalSpent + orderTotalPrice // 주문 총합 금액
                };

                // 주문 추가
                await ordersRef.add(orderData);

                // 사용자 정보 업데이트 (주문 횟수, 누적 금액)
                transaction.set(userRef, {
                  orderCount: currentOrderCount + 1, // 주문 횟수 증가
                  totalSpent: currentTotalSpent + orderTotalPrice // 누적 금액 증가
                }, {merge: true});
              });

              this.$alert("주문이 완료되었습니다. 입금확인 후 순차적으로 확인 메시지를 보내드립니다.");
            } catch (error) {
              console.error("주문 저장 중 오류 발생", error);
            }

            this.$emit("changeComp", "CartComp");
          }
        });
      },
      updateWidth() {
        this.windowWidth = window.innerWidth
      },

      async fetchOrders(){
        if (!this.isLogin) {
          this.$alert("로그인이 필요합니다!");
          this.$router.push("/login");
          return;
        }

        const userId = this.user?.uid;
        try {
          const ordersRef = firebase.firestore().collection("cartSheet");

          const querySnapshot = await ordersRef.where("userId", "==", userId).get();

          const cartSheet = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          const sortedCartSheet = cartSheet.sort((a, b) => b.createdAt - a.createdAt);
          if (sortedCartSheet.length > 0) {
            this.cart = sortedCartSheet[0].items
            const batch = firebase.firestore().batch();
            sortedCartSheet.slice(1).forEach(doc => {
              const docRef = ordersRef.doc(doc.id); // 삭제할 문서 참조
              batch.delete(docRef);
            });

            await batch.commit(); // Firestore에서 한 번에 삭제 실행
          }
        } catch (error) {
          console.error("주문 데이터를 불러오는 중 오류 발생:", error);
        }
      },

      //localstorage 코드
//      fetchOrders() {
//        const CartItem = JSON.parse(localStorage.getItem("CartItem"));
//        if (CartItem) {
//          this.cart = CartItem.map((item) => ({
//            ...item,
//            selected: false,
//          }));
//        }
//      },
//      RemoveItem(i) {
//        this.$confirm('선택한 상품을 삭제 하시겠습니까?')
//        .then(() => {
//          this.cart = this.cart.filter(
//              item => !(item.id === i.id && item.category === i.category)
//          );
//          localStorage.setItem('BuyItem', JSON.stringify(this.cart));
//          this.$alert(`${i.title} 상품이 삭제되었습니다!`);
//        })
//        .catch(() => {
//          return
//        });
//      },
    },
    created() {
      this.fetchOrders();
    },
    mounted() {
      window.addEventListener('resize', this.updateWidth)
    }
  }
</script>