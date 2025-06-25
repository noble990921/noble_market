<template>
  <div id="Form">
    <div class="form_container">
      <div class="_box">
        <div class="left">
          <div class="dot"></div>
          <div class="text">아이디</div>
        </div>
        <div class="right">
          <input type="text" v-model="username"
                 :class="{invalid:$v.username.$dirty && $v.username.$error}"
                 @blur="$v.username.$touch()"
          >
          <p>(이메일 형식으로 작성해주세요,ex)test@naver.com)</p>
          <p class="err" v-if="$v.username.$dirty && !$v.username.required">아이디를 입력해주세요.</p>
          <p class="err" v-if="$v.username.$dirty && !$v.username.email">이메일 형식으로 작성해주세요.</p>
          <p></p>
          <p></p>
        </div>
      </div>
      <div class="_box">
        <div class="left">
          <div class="dot"></div>
          <div class="text">비밀번호</div>
        </div>
        <div class="right">
          <input type="password" v-model="password"
                 :class="{invalid:$v.password.$error && $v.password.$dirty}"
                 @blur="$v.password.$touch()"
          >
          <p class="err" v-if="$v.password.$dirty && !$v.password.required">비밀번호를 입력해주세요.</p>
          <p class="err" v-if="$v.password.$dirty && !$v.password.minLength">비밀번호는 최소 6글자 이상이여야 합니다.</p>
        </div>
      </div>
      <div class="_box">
        <div class="left">
          <div class="dot"></div>
          <div class="text">비밀번호 확인</div>
        </div>
        <div class="right">
          <input type="password" v-model="checkPassword"
                 :class="{invalid:$v.checkPassword.$error && $v.checkPassword.$dirty}"
                 @blur="$v.checkPassword.$touch()"
          >
          <p class="err" v-if="$v.checkPassword.$dirty && !$v.checkPassword.required">비밀번호를 입력해주세요.</p>
          <p class="err" v-else-if="$v.checkPassword.$dirty && !$v.checkPassword.sameAsPassword">위 비밀번호와 일치하지 않습니다.</p>
        </div>
      </div>
      <div class="_box">
        <div class="left">
          <div class="dot"></div>
          <div class="text">이름</div>
        </div>
        <div class="right">
          <input type="text" v-model="name" :class="{invalid: $v.name.$error && $v.name.$dirty}"
                 @blur="$v.name.$touch()">
          <p class="err" v-if="$v.name.$dirty && !$v.name.required">이름을 입력해주세요.</p>
          <p class="err" v-else-if="$v.name.$dirty && !$v.name.minLength">2글자 이상으로 작성해주세요.</p>
        </div>
      </div>
      <div class="_box">
        <div class="left">
          <div class="dot"></div>
          <div class="text">휴대전화</div>
        </div>
        <div class="right">
          <masked-input
              v-model="phoneNumber"
              :value="phoneNumber"
              :mask="phoneMask"
              :class="{invalid: $v.phoneNumber.$error && $v.phoneNumber.$dirty}"
              @blur="$v.phoneNumber.$touch()"/>
          <p class="err" v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required">휴대전화를 입력해주세요.</p>
          <p class="err" v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.minLength">휴대전화를 정확히 입력해주세요.</p>
        </div>
      </div>

      <div class="_box">
        <div class="left">
          <div class="dot"></div>
          <div class="text">추천코드</div>
        </div>
        <div class="code_right">
          <div class="input_area">
            <input :class="{ verified: isPartnerVerify === 2 }" type="text" v-model="partnerCode">
            <p class="err" v-if="!partnerCode"> 미입력시 본사로 가입됩니다.</p>
          </div>
          <div class="sign-input-btn">
            <button @click="partnerVerify" v-if="isPartnerVerify !== 2">검증</button>
            <button @click="isPartnerVerify = 1" v-else>변경</button>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box">
      <button @click="$router.push('/')">취소</button>
      <button @click="submit()">다음</button>
    </div>
  </div>
</template>

<script>
  import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
  import MaskedInput from 'vue-text-mask';
  import { auth, db } from "@/firebase";
  import firebase from "firebase/app";

  export default {
    name: "Form",
    components: {
      MaskedInput
    },
    computed: {
      phoneMask() {
        return (v) => {
          const numbericValue = v.replace(/\D/g, ""); //숫자만 추출
          return numbericValue.length <= 10
              ? [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
              : [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
        };
      },
    },
    data() {
      return {
        username: '',
        password: '',
        checkPassword: '',
        name: '',
        phoneNumber: '',
        partnerCode:'',
        isPartnerVerify:1,
      }
    },
    validations: {
      username: {required, email,},
      password: {required, minLength: minLength(6)},
      checkPassword: {required, sameAsPassword: sameAs('password'),},
      name: {required, minLength: minLength(2),},
      phoneNumber: {required, minLength: minLength(13)},
    },
    methods: {
      async partnerVerify() {
        const code = this.partnerCode.trim();
        if (!code) {
          this.isPartnerVerify = 1;
          this.$alert("추천코드를 입력해주세요.");
          return;
        }

        try {
          const snapshot = await db.collection("users").where("partnerCode", "==", code).get();
          if (!snapshot.empty) {
            this.isPartnerVerify = 2;
            this.$alert("추천코드가 확인되었습니다.");
          } else {
            this.isPartnerVerify = 1;
            this.$alert("존재하지 않는 추천코드입니다.");
          }
        } catch (err) {
          console.error("추천코드 검증 중 오류:", err);
          this.$alert("검증 중 오류가 발생했습니다.");
          this.isPartnerVerify = 1;
        }
      },
      async submit() {
        const vm = this;
        vm.$v.$touch();
        if (vm.$v.$invalid) {
          return;
        }
        if (vm.partnerCode && vm.isPartnerVerify !== 2) {
          vm.$alert("추천코드를 먼저 검증해주세요.");
          return;
        }

        const finalCode = vm.partnerCode || "main";
        try {
          const { user } = await auth.createUserWithEmailAndPassword(vm.username, vm.password);

          await db.collection('users').doc(user.uid).set({
            email: vm.username,
            name: vm.name,
            phoneNumber: vm.phoneNumber,
            partnerCode: finalCode,
            role: 'user',
//            password: vm.password
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // 가입 시간 저장
          });
          await auth.signOut();  //firebase 자체에서는  로그인 동작을 비활성화하는 옵션x,회원가입 후 강제로 로그아웃 처리
          vm.$emit('changeComp', 'Comp');
        } catch (err) {
          console.error(err);
          if (err.code === "auth/email-already-in-use") {
            this.$alert("이 이메일 주소는 이미 사용 중입니다.");
          }else{
//          this.$alert("회원가입 중 오류가 발생했습니다: " + err.message);
            this.$alert("회원가입 중 오류가 발생했습니다: ");
          }
        }
      }
    },
    mounted() {
      const code = this.$route.query.partnerCode;
      if (code) {
        this.partnerCode = code;
        this.partnerVerify();
      }
    }
  }
</script>