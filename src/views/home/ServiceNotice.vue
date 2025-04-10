<template>
  <div class="tradeCompView" id="Support_Notice">
    <el-container class="tcv-main bxt--content" direction="vertical">
      <div class="home-title">
        <p class="home-title-text">공지사항</p>
      </div>
      <div class="home-content">
        <div class="service-table-area">
          <el-table :data="GetNotice" @row-click="goDetail" class="clicked" row-key="id">
            <el-table-column headerAlign="left" label="제목">
              <template slot-scope="{row}">
                <p>{{row.title}}</p>
              </template>
            </el-table-column>
            <el-table-column align="right" label="날짜" width="180px">
              <template slot-scope="{row}">
<!--                <p>{{row.createDate | moment('YYYY.MM.DD')}}</p>-->
                <p>{{row.createDate}}</p>
              </template>
            </el-table-column>
          </el-table>
<!--          <el-row>-->
<!--            <el-col>-->
<!--              <el-pagination class="da-pagination" :background="true" :hideOnSinglePage="false" :pageSize="size" :total="total"-->
<!--                             @current-change="getNotice" layout="prev,pager,next"></el-pagination>-->
<!--            </el-col>-->
<!--          </el-row>-->
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  import GetNotice from '../../constants/noticeData'

  export default {
    name: 'ServiceNotice',
    components: {
    },
    data: () => ({
      GetNotice,
      obj: {tab: 'faq'},
      list: [], total: 0, size: 10, page: 1, isLast: true,
    }),
    watch: {
    },
    computed: {
    },
    methods: {
      changePath(tab) {
        let id = tab.id;
        this.obj = {tab: id};
      },
//      async getNotice(page = 1) {
//        const vm = this;
//        const {data, status, message} = await GetContentNoticeList('ClientList', "1", null, page - 1, vm.size);
//        if (status === 200) {
//
//          console.log('ttqq',data)
//          vm.page++
//          vm.isLast = data.last
//          vm.total = data.totalElements;
//          vm.list = data.content;
//        } else {
//          vm.$alert(message, '알림')
//        }
//      },
      goDetail(m) {
        this.$router.push("/service/notice/" + m.id)
      }
    },
    created() {
    }
  }
</script>
