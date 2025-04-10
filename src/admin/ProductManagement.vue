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
          <el-table-column label="날짜" width="20%">
            <template slot-scope="{row}">
              <p>{{ row.createDate.toDate() | moment("YYYY-MM-DD HH:mm") }}</p>
            </template>
          </el-table-column>
          <el-table-column label="카테고리" width="15%">
            <template slot-scope="{row}">
              <p>{{SET_PRODUCT_CATEGORY[row.category]}}</p>
            </template>
          </el-table-column>
          <el-table-column label="상품가격" width="15%">
            <template slot-scope="{row}">
              <p>{{row.price | formatNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="상품" width="40%">
            <template slot-scope="{row}">
              <p>{{row.product}}</p>
            </template>
          </el-table-column>
          <el-table-column label="공개여부" width="15%">
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
    "1": "Top", "2": "Bag", "3": "Wallet", "4": "Watch", "5": "Shoes", "6": "Acc"
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
              price: data.price
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