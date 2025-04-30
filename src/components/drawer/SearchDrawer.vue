<template>
  <el-drawer
      id="SearchDrawer"
      :visible="visible"
      :with-header="true"
      direction="btt"
      size="100%"
      :close-on-click-modal="true"
      :modal="false"
      @close="handleClose"
  >
    <div class="drawer-content">
      <div class="search_area">
        <div class="search">
          <input
              v-model="searchText"
              @keyup.enter="search"
              type="text"
              placeholder="브랜드, 상품, 프로필 등"
          >
          <i class="el-icon-search" @click="search"></i>
        </div>
      </div>

      <!-- 최근 검색어 -->
      <div class="search_content_wrap">
        <div class="recent_area" v-if="recentSearches.length">
          <div class="layer_search_item">
            <div class="layer_search_title_wrap">
              <span class="title">최근 검색어</span>
              <span class="title_sub_text" @click="clearRecentSearches">지우기</span>
            </div>
            <div class="layer_search_item_content_wrap">
              <div class="recent_box">
                <div class="search_list">
                  <div
                      class="search_item"
                      v-for="(item, index) in recentSearches"
                      :key="index"
                  >
                    <p @click="searchFromRecent(item)">{{ item }}</p>
                    <i class="el-icon-close" @click="removeRecentSearch(index)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 추천 검색어 -->
        <div class="search_card_items">
          <div class="layer_search_item tag">
            <div class="layer_search_title_wrap">
              <span class="title">추천 검색어</span>
            </div>
            <div class="layer_search_item_content_wrap">
              <div class="search_card_tag_wrap">
                <p
                    class="search_card_tag"
                    v-for="(tag, index) in suggestedTags"
                    :key="index"
                    @click="searchFromRecent(tag)"
                >
                  {{ tag }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 검색 결과 -->
        <div v-if="filteredProducts.length" class="search_results">
          <h3>검색 결과</h3>
          <ul>
            <li v-for="product in filteredProducts" :key="product.id">
              {{ product.title }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </el-drawer>
</template>

<script>
//  import {db} from "@/firebase";

  export default {
    name: "SearchDrawer",
    props: {
      visible: Boolean,
    },
    data() {
      return {
        searchText: '',
        recentSearches: [],
        suggestedTags: ['까르띠에', '에르메스', '러브팔찌', '오데마피게', '커플링'],
        products: [
          { id: 1, title: '아이폰 14', category: '스마트폰', brand: 'Apple' },
          { id: 2, title: '아이폰 S23', category: '스마트폰', brand: 'Samsung' },
          { id: 3, title: '아이폰 프로', category: '노트북', brand: 'Apple' },
        ],
        filteredProducts: []
      };
    },
    methods: {
      handleClose() {
        this.$emit('update:visible', false);
      },
      search() {
        if (!this.searchText.trim()) return;

        this.addRecentSearch(this.searchText.trim());

//        const keyword = this.searchText.trim().toLowerCase();
//        this.filteredProducts = this.products.filter(product => {
//          return (
//              product.title.toLowerCase().includes(keyword) ||
//              product.category.toLowerCase().includes(keyword) ||
//              product.brand.toLowerCase().includes(keyword)
//          );
//        });
        this.handleClose()
        this.$router.push('/search_view')
        this.searchText = ''
      },
      addRecentSearch(keyword) {
        // 이미 있는 경우 삭제하고 맨 앞으로
        this.recentSearches = this.recentSearches.filter(item => item !== keyword);
        this.recentSearches.unshift(keyword);

        // 최대 7개 유지
        if (this.recentSearches.length > 7) {
          this.recentSearches.pop();
        }
      },
      clearRecentSearches() {
        this.recentSearches = [];
      },
      removeRecentSearch(index) {
        this.recentSearches.splice(index, 1);
      },
      searchFromRecent(keyword) {
        this.searchText = keyword;
        this.search();
      }
    },
    created(){
    }
  }
</script>