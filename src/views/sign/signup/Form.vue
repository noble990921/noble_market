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
      }
    },
    validations: {
      username: {required, email,},
      password: {required, minLength: minLength(6)},
      checkPassword: {required, sameAsPassword: sameAs('password'),},
      name: {required, minLength: minLength(2),},
      phoneNumber: {required, minLength: minLength(13)}
    },
    methods: {
      async submit() {
        const vm = this;
        vm.$v.$touch();
        if (vm.$v.$invalid) {
          return;
        }
        try {
          const { user } = await auth.createUserWithEmailAndPassword(vm.username, vm.password);

          await db.collection('users').doc(user.uid).set({
            email: vm.username,
            name: vm.name,
            phoneNumber: vm.phoneNumber,
            role: 'user',
//            password: vm.password
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // 가입 시간 저장
          });
          await auth.signOut();  //firebase 자체에서는  로그인 동작을 비활성화하는 옵션x,회원가입 후 강제로 로그아웃 처리
          vm.$emit('changeComp', 'Comp');
        } catch (err) {
          console.error(err);
          if (err.code === 'auth/email-already-in-use') {
            alert("이 이메일 주소는 이미 사용 중입니다.");
          }
          alert("회원가입 중 오류가 발생했습니다: " + err.message);
        }
      }
    },
  }
</script>