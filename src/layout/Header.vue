<template>
  <section id="Header">
    <div
        id="header_top_list"
        v-if="!isScroll">
      <div v-if="isLogin">
        <p>환영합니다, {{ user.name }}님</p>
      </div>
      <ul>
        <li
            v-for="a in loginMenu"
            :key="a.id"
            @click="a.func ? exeFunc(a.func) : goToUrl(a.url)"
            >
          <template v-if="a.title === '고객센터'">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link" style="font-size: 12px;color: #6a6a6a;">
                {{ a.title }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="c in CATEGORY" :key="c.id">
                  <p @click="goToUrl(c.url)">{{ c.title }}</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template v-else>
            {{ a.title }}
          </template>
        </li>
      </ul>
    </div>
    <div
        id="overlay"
        v-if="asideOpen"></div>
    <div
        id="aside"
        :class="{ open: asideOpen }">
      <i
          class="el-icon-close"
          @click="toggleAside"></i>
      <div class="aside_header">
        <div class="logo">
          <img
              class="logo_img"
              src="../assets/images/logo3.png">
        </div>
        <div class="aside_menu">
          <ul>
            <li
                v-for="m in loginMenu"
                :key="m.id"
                @click="handleMenuClick(m)"
                >
              {{ m.title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="aside_box">
        <div class="aside_top">
          <ul>
            <li
                v-for="m in MENU"
                :key="m.id" @click="handleMenuClick(m)">
              <p>{{m.title}}</p>
            </li>
          </ul>
        </div>
        <div class="aside_bottom">
          <div class="title">
            <p>고객센터</p>
            <i
                class="el-icon-plus"
                @click="toggleCategory"></i>
          </div>
          <div
              class="categoryList"
              v-if="category">
            <ul>
              <li
                  v-for="c in CATEGORY"
                  :key="c.id" @click="handleMenuClick(c)">
                <p>{{c.title}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="header_box">
      <div class="header_top">
        <div
            class="left_icon"
            @click="toggleAside">
          <img src="../assets/images/menu_icon.png">
        </div>
        <div
            class="logo"
            @click="$router.push('/')"
            style="cursor: pointer">
          <img src="../assets/images/logo3.png">
        </div>
        <div class="right_icon">
          <i class="el-icon-search"></i>

          <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a style="color: #000" href="/order_list">주문목록</a></el-dropdown-item>
              <el-dropdown-item><a style="color: #000" href="/order_list">취소/반품</a></el-dropdown-item>
              <el-dropdown-item><a style="color: #000" href="/order_list">찜 리스트</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <i class="el-icon-goods" @click="$router.push('/cart_view')"></i>
        </div>
      </div>
      <div class="header_bottom">
        <ul>
          <li
              v-for="m in MENU"
              :key="m.id">
            <a :href="m.url">
              {{m.title}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";
  import {logout} from "@/services/authService";

  const ASIDEMENU = [
    /** type     0:로그인시에만 표시, 1:로그인전에만 표시, 2:로그인,로그인전표시 3: 관리자 */
    {id: "0", title: "관리자페이지", url: "/admin/dashboard", type: "3"},
    {id: "1", title: "로그인", url: "/login", type: "1"},
    {id: "2", title: "회원가입", url: "/signup", type: "1"},
    {id: "3", title: "주문목록", url: "/order_list", type: "2"},
    {id: "4", title: "장바구니", url: "/cart_view", type: "2"},
    {id: "5", title: "고객센터", type: "2"},
    {id: "6", title: "로그아웃", func: "logout", type: "0"},
  ];

//  const MENU = [
//    {id: "1", title: "TOP", url: "/product/top"},
//    {id: "2", title: "BAG", url: "/product/bag"},
//    {id: "3", title: "SHOES", url: "/product/shoes"},
//    {id: "4", title: "WALLET", url: "/product/wallet"},
//    {id: "5", title: "WATCH", url: "/product/watch"},
//    {id: "6", title: "ACC", url: "/product/acc"},
//    {id: "7", title: "About Us", url: "/introduction"},
//  ];
  const MENU = [
    {id: "1", title: "About Us", url: "/introduction"},
    {id: "2", title: "OUTER", url: "/product/OUTER"},
    {id: "3", title: "TOP", url: "/product/TOP"},
    {id: "4", title: "BOTTOM", url: "/product/BOTTOM"},
    {id: "5", title: "SHOES", url: "/product/SHOES"},
    {id: "6", title: "WALLET", url: "/product/WALLET"},
    {id: "7", title: "BAG", url: "/product/BAG"},
    {id: "8", title: "WATCH", url: "/product/WATCH"},
    {id: "9", title: "ACC", url: "/product/ACC"},
    {id: "10", title: "Community", url: "/product/community"},
  ];

  const CATEGORY = [
    {id: "1", title: "공지사항", url: "/service/notice"},
//    {id: "2", title: "상품사용후기", url: "/service/reviews"},
    {id: "4", title: "1:1문의", url: "/service/contact"},
  ];

  export default {
    name: "Header",
    data() {
      return {
        MENU, ASIDEMENU, CATEGORY,
        asideOpen: false, category: false, isScroll: false
      }
    },
//    computed: {
//      ...mapGetters("auth", {
//        isLogin: "isLogin",
//        me: "user",
//      }),
//    },
    computed: {
      ...mapGetters("auth", ["isLogin", "user"]),
      loginMenu() {
        return this.ASIDEMENU.filter((menu) => {
          if (menu.type === "3") {
            return this.isLogin && this.user?.role === "admin";
          }
          return menu.type === "2" || (this.isLogin ? menu.type === "0" : menu.type === "1");
        });
      },
    },
    methods: {
      handleMenuClick(m) {
        if (m.func) {
          this.exeFunc(m.func);
        } else if (m.url) {
          this.goToUrl(m.url);
        }
        this.asideOpen = false;
      },
      exeFunc(func) {
        this[func]();
      },
      async logout() {
        const vm = this
        try {
          const confirm = await vm.$confirm('로그아웃 하시겠습니까?', '알림');
          if (confirm) {
            await logout();
            vm.$router.push("/");
          }
        } catch (error) {
          console.error("로그아웃 실패:", error.message);
        }
      },
      goToUrl(url) {
        this.$router.push(url)
      },
      toggleAside() {
        this.asideOpen = !this.asideOpen;
      },
      toggleCategory() {
        this.category = !this.category;
      },
      handleScroll() {
        this.isScroll = window.scrollY > 0;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    created() {
    }
  }
</script>