<template>
  <div id="homeView">
    <Header/>
    <el-container>
      <el-aside id="homeAside" width="280px" v-if="deskSize">
          <ul>
            <template v-for="m in ASIDE_MENU[path]">
              <li :key="m.id" @click="routerPush(m)"
                  :class="{'is-active': $route.path.includes(m.url)}"
                  v-if="(m.url || m.func)  && (m.auth ? isLogin : true)">
                {{(m.label)}}
              </li>
            </template>
          </ul>
        </el-aside>
        <el-main id="homeMain">
          <slot/>
        </el-main>
    </el-container>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Header from '../../layout/Header'
  const ASIDE_MENU = {
    'service': [
      {id: 1, url: '/service/notice', label: '공지사항',},
//      {id: 2, url: '/service/reviews', label: '상품사용후기',},
      {id: 3, url: '/service/contact', label: '1:1문의',}
    ]

  }
  export default {
    name: "HomeLayout",
    components:{
      Header
    },
    data() {
      return {
        ASIDE_MENU,
        path:'',
        windowWidth:window.innerWidth
      }
    },
    computed:{
      ...mapGetters("auth", ["isLogin", "user"]),
      deskSize(){
        return this.windowWidth > 1024
      }
    },
    methods:{
      routerPush({url, func}) {
        const vm = this;
        if (url) {
          vm.$router.push(url)
        } else {
          vm[func]()
        }
      },
      updateWidth(){
        this.windowWidth = window.innerWidth;
      }
    },
    mounted(){
      window.addEventListener('resize',this.updateWidth)
    },
    async created(){
      const vm  =  this;
      vm.path = vm.$route.path.split('/')[1]
    }
  }
</script>
