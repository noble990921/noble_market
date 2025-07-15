<template>
  <header id="AdminHeader">
    <div class="left_icon" @click="toggleAside">
      <img src="../assets/images/menu_icon_white.png">
    </div>
    <div class="text_box">
      <h2>관리자 페이지</h2>
      <p @click="$router.push('/')">홈으로</p>
    </div>
    <div id="sidebar" v-if="asideOpen">
      <div class="sidebar_header">
        {{ currentHeader }}
        <i @click="toggleAside" class="el-icon-close"></i>
      </div>
      <ul>
        <li v-for="m in MENU" :key="m.id"  :class="{ active: activeMenu == m.id }"
            @click="handleMenuClick(m)">
          {{m.title}}
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
  const MENU = [
    {id: "1", title: "대시보드", url: "/admin/dashboard"},
//    {id: "2", title: "상품 관리", url: "/admin/product/management"},
//    {id: "3", title: "신규 주문", url: "/admin/new_order/management"},
//    {id: "4", title: "주문 내역", url: "/admin/order_detail/management"},
    {id: "5", title: "회원 관리", url: "/admin/user/management"},
  ];
  export default {
    name: "AdminHeader",
    computed: {
      currentHeader() {
        return this.$route.meta.title || "관리자 페이지";
      }
    },
    data() {
      return {
        MENU,
        asideOpen: true,
        activeMenu:'1'
      };
    },
    methods: {
      handleMenuClick(m) {
        this.activeMenu = m.id;
        this.goToUrl(m.url);
        if(window.innerWidth < 1024){
          this.asideOpen = false;
        }
      },
      goToUrl(url) {
        this.$router.push(url)
      },
      toggleAside() {
        this.asideOpen = !this.asideOpen;
      },
      handleResize() {
        this.asideOpen = window.innerWidth > 1024;
      },
    },
    mounted() {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    },
  };
</script>