<template>
  <el-drawer
      id="SearchDrawer"
      :visible="visible"
      :with-header="true"
      direction="btt"
      size="100%"
      :close-on-click-modal="true"
      :modal="false"
      @close="handleClose">
    <div class="drawer-content">
      <div class="search_area">
        <div class="search">
          <input type="text" placeholder="브랜드, 상품, 프로필, 태그 등">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="search_content_wrap">
        <div class="recent_area">
            <div class="layer_search_item">
              <div class="layer_search_title_wrap">
                <span class="title">최근 검색어</span>
                <span class="title_sub_text">지우기</span>
              </div>
              <div class="layer_search_item_content_wrap">
                <div class="recent_box">
                  <div class="search_list">
                    <div class="search_item">
                      <p>test</p>
                      <i class="el-icon-close"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="search_card_items">
        <div class="layer_search_item tag">
          <div class="layer_search_title_wrap">
            <span class="title">추천 검색어</span>
          </div>
          <div class="layer_search_item_content_wrap">
            <div class="search_card_tag_wrap">
              <p class="search_card_tag">내폰시세</p>
              <p class="search_card_tag">내폰시세</p>
              <p class="search_card_tag">내폰시세</p>
              <p class="search_card_tag">내폰시세</p>
              <p class="search_card_tag">내폰시세</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  export default {
    name: "SearchDrawer",
    props: {
      visible: {
        type: Boolean
      },
    },
    methods:{
      handleClose() {
        this.$emit('update:visible', false);
      }
    }
  }
</script>