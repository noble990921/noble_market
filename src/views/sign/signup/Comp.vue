<template>
  <div id="Comp">
    <div class="comp_container">
      <p>회원가입이 완료 되었습니다.</p>
      <div class="btn_box">
        <button @click="$router.push('/login')">로그인</button>
        <button @click="$router.push('/')">메인</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Comp"
  }
</script>
