<template>
  <div id="Footer">
    <div class="f_container">
      <div class="logo">
        <img src="../assets/images/logo3.png" style="width: 181px">
      </div>
      <div class="content">
        <div class="first_content">
          <ul class="footer_menu">
            <li>회사소개</li>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>이용안내</li>
          </ul>
          <p class="p1">쇼핑몰 기본정보</p>
          <ul>
            <li><span>상호명:</span><p>노블</p></li>
            <li><span>대표자명:</span><p>노블</p></li>
            <li><span>사업자주소:</span><p>서울특별시 강남구 강남빌딩</p></li>
          </ul>
          <ul>
            <li><span>대표번호:</span><p>02-3134-1231</p></li>
            <li><span>인스타 정보:</span><p>n0ble.offcial</p></li>
<!--            <li><span>사업자 등록번호:</span><p>931-23-31399</p></li>-->
<!--            <li><span>통신판매업 신고번호</span></li>-->
            <li><span>통신판매업</span></li>
          </ul>
        </div>
        <div class="second_content">
          <p class="p1">고객센터 정보</p>
          <p class="p2" style="margin-bottom: 10px">상담/주문 전화: <span class="p3">카카오톡(기타SNS) 문의</span></p>
          <p class="p2">상담/주문 이메일</p>
          <p class="p3">noble@gmail.com</p>
          <p class="p2">CS운영시간</p>
<!--          <p class="p3">AM 09:00 ~ PM 12:00 (토,일,공휴일 휴무)</p>-->
          <p class="p3">AM 12:00 ~ PM 12:00 (토,일,공휴일 포함)</p>
        </div>
        <div class="third_content">
          <p class="p1">결제정보</p>
          <p class="p2">무통장 계좌정보</p>
          <p class="p3">은행: 3333-05-711992 카카오뱅크</p>
        </div>
      </div>
    </div>
    <div class="footer_f">
      <div class="text_box">
        <p>Copyright © replix. All Rights Reserved. Hosting by replix Corp.</p>
      </div>
      <div class="icon_box">
        <div v-for="i in 6" :key="i">
          <img :src="require(`../assets/images/home/footer/icon_${i}.png`)" height="24px"
              @click="commuinityOpen(i)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>
