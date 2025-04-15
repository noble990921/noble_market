<template>
  <div id="ProductContent">
    <div class="add_btn">
      <button @click="$router.push('/admin/product/management')"  class="cancel_btn">취소</button>
      <button @click="goToEdit" class="save_btn">수정</button>
      <button @click="deleteProduct" class="delete_btn">삭제</button>
    </div>
    <div class="ps_container">
      <div class="ps_container_top">
        <div class="top_setting">
          <div id="ps_public_select_box" class="set_row">
            <span class="title_label">공개여부</span>
            <span class="pc_select_span">{{ SET_ISOPEN[info.isOpen] }}</span>
          </div>
          <div id="ps_date_box" class="set_row">
            <span class="title_label">날짜</span>
            <span class="pc_select_span">{{ info.createDate | moment("YYYY-MM-DD HH:mm") }}</span>
          </div>
          <div id="ps_category_box" class="set_row">
            <span class="title_label">카테고리</span>
            <span class="pc_select_span">{{SET_PRODUCT_CATEGORY[info.category]}}</span>
          </div>
          <div id="ps_title_box" class="set_row">
            <span class="title_label">상품이름</span>
            <span class="pc_select_span">{{info.title}}</span>
          </div>
          <div id="ps_price_box" class="set_row">
            <span class="title_label">상품가격</span>
            <span class="pc_select_span">{{info.price | formatNumber}}</span>
          </div>
          <div id="ps_img_box" class="set_row">
            <span class="title_label">대표사진</span>
            <span class="ps_img_span"><img :src="info.img"></span>
          </div>
        </div>
        <div class="bottom_text" style="padding: 0 12px;">
          <span v-html="info.content"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {db} from "@/firebase";

  const SET_PRODUCT_CATEGORY = {
    "1": "OUTER", "2": "TOP", "3": "BOTTOM", "4": "SHOES", "5": "WALLET", "6": "BAG","7":"WATCH","8":"ACC"
  }
  const SET_ISOPEN = {
    "1": "공개",
    "2": "비공개"
  }
  export default {
    name: "ProductContent",
    data() {
      return {
        SET_PRODUCT_CATEGORY,
        SET_ISOPEN,
        info: {}, noticeStyle: {}, query: ''
      }
    },
    methods: {
      async getData() {
        const vm = this;
        try {
          const productId = vm.$route.params.params;
          if (!productId) {
            vm.$alert('상품 정보를 찾을 수 없습니다.', '오류');
            return;
          }
          const doc = await db.collection('products').doc(productId).get();
          if (doc.exists) {
            const data = doc.data();
            vm.info = {
              id: doc.id,
              createDate: data.createDate.toDate() || '',
              category: data.category || '',
              title: data.title || '',
              isOpen: data.isOpen || false,
              content: data.content || '',
              price:data.price,
              img:data.img
            };

//            this.$nextTick(() => {
//              this.$refs.editor.setContent(this.info.content);
//            });
          } else {
            vm.$alert('상품 정보를 찾을 수 없습니다.', '오류');
          }
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
          vm.$alert('데이터를 불러오는 중 오류가 발생했습니다.', '오류');
        }
      },

      changeContent({ key, html }) {
        this.info[key] = html || '';
      },
      async deleteProduct() {
        const vm = this;
        try {
          await vm.$confirm('상품을 삭제 하시겠습니까?', '알림');
          await db.collection('products').doc(vm.info.id).delete();
          vm.$alert('상품이 성공적으로 삭제되었습니다.', '알림');
          vm.$router.push('/admin/product/management');
        } catch (error) {
          console.error('상품 삭제 중 오류 발생:', error);
          vm.$alert('상품 삭제에 실패했습니다. 다시 시도해주세요.', '오류');
        }
      },
      goToEdit() {
        const vm = this
        vm.$router.push({
          path: `/admin/product/save/${vm.info.id}`,
          query: {
            title: vm.info.title,
            category: vm.info.category,
            createDate: vm.info.createDate,
            isOpen: vm.info.isOpen,
            content: vm.info.content,
          }});
      },
      },
    mounted() {
      this.getData();
    },
    created(){

    }
    }
</script>