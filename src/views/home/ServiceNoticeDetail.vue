<template>
  <div class="tradeCompView" id="Support_Notice">
    <el-container class="tcv-main bxt--content" direction="vertical">
      <div class="home-content">
        <div class="tsnd-box">
          <div class="tsnd-title">
            <p>{{ content.title }}</p>
          </div>
          <div class="tsnd-content" v-html="content.content"></div>
          <div class="tsnd-btn">
            <el-button @click="$router.push('/service/notice')">뒤로가기</el-button>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  import GetNotice from '../../constants/noticeData'

  export default {
    name: 'ServiceNoticeDetail',
    data: () => ({
      content: {},
      GetNotice,
    }),
    methods: {
      getContent() {
        const id = this.$route.params.id;

        const notice = this.GetNotice.find(item => item.id === parseInt(id));
        if (notice) {
          this.content = notice;
        } else {
          this.$alert('존재하지 않는 공지입니다.', '오류');
        }
      },
    },
    mounted() {
      this.getContent();
    },
  }
</script>