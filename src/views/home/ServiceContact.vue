<template>
  <div class="tradeCompView" id="Support_Contact">
    <div class="Contact_Container">
      <button class="learn-more" v-if="partnerInfo && partnerInfo.kakaoUrl" @click="goToUrl(partnerInfo.kakaoUrl)">카카오톡 문의</button>
      <button class="learn-more" v-if="partnerInfo && partnerInfo.instaUrl" @click="goToUrl(partnerInfo.instaUrl)">인스타 문의</button>
      <button class="learn-more" v-if="partnerInfo && partnerInfo.teleUrl" @click="goToUrl(partnerInfo.teleUrl)">텔레그램 문의</button>
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