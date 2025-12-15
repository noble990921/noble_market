<template>
  <div id="ProductManagement">
    <div class="add_btn">
      <button @click="$router.push('/admin/product/save')">추가</button>
    </div>
    <div class="pr_container">
      <div class="pr_container_top">
        <div class="top_setting">
          <div class="pr_public_checkbox">
            <span class="title_label">공개/비공개</span>
            <span class="check_span">
            <el-checkbox-group v-model="openList">
              <el-checkbox label="1">공개</el-checkbox>
              <el-checkbox label="2">비공개</el-checkbox>
            </el-checkbox-group>
          </span>
          </div>
          <div class="pr_category_box">
            <span class="title_label">카테고리</span>
            <span class="select_span">
              <el-select v-model="type" placeholder="선택해주세요.">
                <el-option label="전체보기" value=""/>
                <el-option :label="f" :value="name" v-for="(f, name) in SET_PRODUCT_CATEGORY" :key="name"/>
               </el-select>
            </span>
          </div>
          <div class="pr_search_box">
            <span class="title_label">상세검색</span>
            <span class="select_span">
              <el-input v-model.trim="keyword" placeholder="상픔을 입력해주세요."
                        @keyup.native.enter="search"></el-input>
            </span>
          </div>
        </div>
        <div class="pr_top_btn">
          <button @click="search">
            검색
          </button>
        </div>
      </div>
      <div class="pr_container_bottom">
        <el-table v-loading="isLoading"  @row-click="goContent" border :data="productList" class="clicked" with="100%">
          <el-table-column label="날짜" >
            <template slot-scope="{row}">
              <p>{{ row.createDate.toDate() | moment("YYYY-MM-DD HH:mm") }}</p>
            </template>
          </el-table-column>
          <el-table-column label="카테고리" >
            <template slot-scope="{row}">
              <p>{{SET_PRODUCT_CATEGORY[row.category]}}</p>
            </template>
          </el-table-column>
          <el-table-column label="세부카테고리" >
            <template slot-scope="{row}">
              <p>{{row.subCategory.title || '-'}} </p>
            </template>
          </el-table-column>
          <el-table-column label="브랜드" >
            <template slot-scope="{row}">
              <p>{{row.brand || '-'}} </p>
            </template>
          </el-table-column>
          <el-table-column label="상품가격" >
            <template slot-scope="{row}">
              <p>{{row.price | formatNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="상품" >
            <template slot-scope="{row}">
              <p>{{row.product}}</p>
            </template>
          </el-table-column>
          <el-table-column label="공개여부" >
            <template slot-scope="{row}">
              <p>{{SET_ISOPEN[row.isOpen]}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-col class="el_pagination">
          <el-pagination :background="true" :hide-on-single-page="false" :page-size="size" :current-page="page"
                         :total="total" @current-change="getData" layout="prev,pager,next"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { db } from "@/firebase";

  const SET_PRODUCT_CATEGORY = {
    "1": "OUTER", "2": "TOP", "3": "BOTTOM", "4": "SHOES", "5": "WALLET", "6": "BAG","7":"WATCH","8":"ACC"
  }
  const SET_PRODUCT_BRAND = {
    "1": "구찌", "2": "디올", "3": "루이비통", "4": "몽클", "5": "보테가", "6": "샤넬","7":"에르메스","9":"입생로랑","10":"톰브","8":"프라다"
  }
  const SUB_CATEGORY_OPTIONS = {
    "1": ["패딩", "재킷","바람막이","가디건","후드집업","코트","조끼/베스트","슈트/블레이저","무스탕/퍼"],
    "2": ["맨투맨/스웨트", "후드","긴소매","반소매","민소매","피케/카라","니트/스웨터","셔츠/블라우스"],
    "3": ["데님", "트레이닝/조거","코튼","슬랙스","숏 팬츠","원피스/스커트"],
    "4": ["스니커즈", "구두/로퍼","샌들/슬리퍼","부츠/워커"],
    "5": ["장지갑", "중지갑","반지갑","카드/명합지갑","동전/여권지갑"],
    "6": ["미니백", "백팩","숄더백","토트백","크로스백","클러치","더플백","에코백","캐리어"],
    "8": ["목걸이", "팔찌","반지","귀걸이","키링/기타"],
  }
  const SET_ISOPEN = {
    "1": "공개",
    "2": "비공개"
  }
  export default {
    name: "ProductManagement",
    data() {
      return {
        openList: ["1", "2"],
        type: '',
        SET_PRODUCT_CATEGORY,
        SET_PRODUCT_BRAND,
        SUB_CATEGORY_OPTIONS,
        SET_ISOPEN,
        isLoading:false,
        keyword: '',
        total: 0, size: 10, page: 0,
        productList: []
      }
    },
    methods:{
      search(){
        console.log('검색!!!')
      },
      goContent(content){
        const vm = this
        if (content.id) {
          vm.$router.push(`/admin/product/content/${content.id}`);
        } else {
          vm.$alert('상품 정보를 찾을 수 없습니다.', '오류');
        }
      },
      async getData(page = 1) {
        const vm = this;
        vm.isLoading = true;
        vm.page = page;

        try {
          let query = db.collection("products")
          .orderBy("createDate", "desc")
          .limit(vm.size);

          if (page > 1 && vm.productList.length > 0) {
            const lastVisibleDoc = await db.collection("products")
            .orderBy("createDate", "desc")
            .limit((page - 1) * vm.size)
            .get();

            const lastDoc = lastVisibleDoc.docs[lastVisibleDoc.docs.length - 1];

            if (lastDoc) {
              query = query.startAfter(lastDoc);
            }
          }

          const querySnapshot = await query.get();

          vm.productList = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              createDate: data.createDate || '',
              category: data.category || '',
              product: data.title || '',
              isOpen: data.isOpen || false,
              price: data.price,
              subCategory: data.subCategory || '',
              brand: data.brand || ''
            };
          });
          const totalQuery = await db.collection("products").get();
          vm.total = totalQuery.size;

        } catch (error) {
          console.error("데이터 가져오기 오류:", error);
          vm.$alert("데이터를 불러오는 중 오류가 발생했습니다.", "오류");
        } finally {
          vm.isLoading = false;
        }
      },
    },
    mounted() {
      this.getData();
    }

  }
</script>