<template>
  <div class="tradeCompView" id="Support_Contact">
    <div class="Contact_Container">
      <button v-if="partnerInfo && partnerInfo.kakaoURL" @click="goToUrl(partnerInfo.kakaoURL)">카카오톡 문의</button>
      <button v-if="partnerInfo && partnerInfo.instaURL" @click="goToUrl(partnerInfo.instaUrl)">인스타 문의</button>
      <button v-if="partnerInfo && partnerInfo.teleURL" @click="goToUrl(partnerInfo.teleUrl)">텔레그램 문의</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "ServiceContact",
    computed: {
      ...mapGetters("auth", ["partnerInfo"]),
    },
    methods: {
      goToUrl(url) {
        if (url) window.open(url, "_blank");
      }
    }
  }
</script>