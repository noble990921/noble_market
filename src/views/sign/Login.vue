<template>
  <div id="Login">
    <div class="login_view">
      <div class="view_box">
        <p class="title">로그인</p>
        <form class="input_box" @submit.prevent="submit">
          <input type="text" placeholder="아이디" v-model="username"><br/>
          <input type="password" placeholder="비밀번호" v-model="password">
          <button type="submit">로그인</button>
        </form>
        <p class="sign_up_text" @click="$router.push('/signup')">회원가입</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginWithEmail} from "../../services/authService";

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async submit() {
        const vm = this;
        if (!vm.username) {
          vm.$alert('아이디를 입력해주세요.', '알림');
          return;
        } else if (!vm.password) {
          vm.$alert('비밀번호를 입력해주세요.', '알림');
          return;
        }
        try {
          await loginWithEmail(vm.username, vm.password);
          vm.$router.push('/');
        } catch (err) {
          console.log('Firebase Error Code:', err.code);
          let errorMessage;
          switch (err.code) {
            case 'auth/user-not-found':
              errorMessage = '존재하지 않는 사용자입니다. 아이디를 확인해주세요.';
              break;
            case 'auth/wrong-password':
              errorMessage = '비밀번호가 틀립니다. 다시 입력해주세요.';
              break;
            case 'auth/invalid-email':
              errorMessage = '아이디는 이메일 형식입니다.';
              break;
            default:
              errorMessage = '아이디 하고 비밀번호를 확인해주세요.';
          }
          vm.$alert(errorMessage);
        }
      }
    }
  };
</script>