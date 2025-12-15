<template>
  <div id="ProductContent">
    <div class="add_btn">
      <button @click="$router.push('/admin/product/management')" class="cancel_btn">목록으로</button>
      <button @click="goToEdit" class="save_btn">수정</button>
      <button @click="deleteProduct" class="delete_btn">삭제</button>
    </div>

    <div class="ps_container" v-if="info.id">
      <!-- 기본 정보 -->
      <div class="info_section">
        <h3>기본 정보</h3>
        <div class="info_grid">
          <div class="info_item">
            <span class="label">공개여부</span>
            <span class="value">{{ info.isOpen === 1 ? '공개' : '비공개' }}</span>
          </div>
          <div class="info_item">
            <span class="label">등록일</span>
            <span class="value">{{ info.createDate | moment("YYYY-MM-DD HH:mm") }}</span>
          </div>
          <div class="info_item">
            <span class="label">카테고리</span>
            <span class="value">{{ getCategoryName(info.category) }}</span>
          </div>
          <div class="info_item">
            <span class="label">서브카테고리</span>
            <span class="value">{{ info.subCategory && info.subCategory.title || '-' }}</span>
          </div>
          <div class="info_item">
            <span class="label">브랜드 (한글)</span>
            <span class="value">{{ info.brand || '-' }}</span>
          </div>
          <div class="info_item">
            <span class="label">브랜드 (영문)</span>
            <span class="value">{{ info.enBrand || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 상품 정보 -->
      <div class="info_section">
        <h3>상품 정보</h3>
        <div class="info_grid">
          <div class="info_item full">
            <span class="label">상품명 (한글)</span>
            <span class="value">{{ info.title || '-' }}</span>
          </div>
          <div class="info_item full">
            <span class="label">상품명 (영문)</span>
            <span class="value">{{ info.enName || '-' }}</span>
          </div>
          <div class="info_item">
            <span class="label">모델번호</span>
            <span class="value">{{ info.modelNumber || '-' }}</span>
          </div>
          <div class="info_item">
            <span class="label">모델그룹</span>
            <span class="value">{{ info.modelGroup || '-' }}</span>
          </div>
          <div class="info_item">
            <span class="label">가격</span>
            <span class="value">{{ info.price | formatNumber }}원</span>
          </div>
          <div class="info_item">
            <span class="label">판매수량</span>
            <span class="value">{{ info.sellQuantity || 0 }}</span>
          </div>
          <div class="info_item">
            <span class="label">사이즈 타입</span>
            <span class="value">{{ info.sizeData && info.sizeData.type || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 사이즈 데이터 -->
      <div class="info_section" v-if="info.sizeData && info.sizeData.size && info.sizeData.size.length > 0">
        <h3>사이즈 데이터 ({{ info.sizeData.size.length }}개)</h3>
        <div class="size_data_list">
          <div v-for="(size, idx) in info.sizeData.size" :key="'size-'+idx" class="size_data_item">
            <div class="size_data_header">
              <span class="badge">{{ idx + 1 }}</span>
              <strong>{{ size.unit || '-' }}</strong>
            </div>
            <div class="size_data_content">
              <span v-if="size.totalLength">총기장/총장: {{ size.totalLength }}cm</span>
              <span v-if="size.waistSection">허리단면: {{ size.waistSection }}cm</span>
              <span v-if="size.crossSection">허벅지단면: {{ size.crossSection }}cm</span>
              <span v-if="size.bottomSection">밑단단면: {{ size.bottomSection }}cm</span>
              <span v-if="size.rise">밑위: {{ size.rise }}cm</span>
              <span v-if="size.shoulderWidth">어깨너비: {{ size.shoulderWidth }}cm</span>
              <span v-if="size.chestSection">가슴단면: {{ size.chestSection }}cm</span>
              <span v-if="size.sleeveLength">소매길이: {{ size.sleeveLength }}cm</span>
              <span v-if="size.z">높이: {{ size.z }}cm</span>
              <span v-if="size.x">너비: {{ size.x }}cm</span>
              <span v-if="size.y">폭: {{ size.y }}cm</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 메인 이미지 -->
      <div class="info_section">
        <h3>메인 이미지 ({{ info.mainImg && info.mainImg.length || 0 }}장)</h3>
        <div class="image_grid">
          <div v-for="(img, idx) in info.mainImg" :key="'main-'+idx" class="image_item">
            <img :src="typeof img === 'string' ? img : img.url" alt="메인 이미지">
            <span class="image_badge">{{ idx + 1 }}</span>
          </div>
          <p v-if="!info.mainImg || !info.mainImg.length">등록된 메인 이미지가 없습니다.</p>
        </div>
      </div>

      <!-- 상세 이미지 -->
      <div class="info_section">
        <h3>상세 이미지 ({{ info.detailImg && info.detailImg.length || 0 }}장)</h3>
        <div class="image_grid">
          <div v-for="(img, idx) in info.detailImg" :key="'detail-'+idx" class="image_item">
            <img :src="typeof img === 'string' ? img : img.url" alt="상세 이미지">
            <span class="image_badge">{{ idx + 1 }}</span>
          </div>
          <p v-if="!info.detailImg || !info.detailImg.length">등록된 상세 이미지가 없습니다.</p>
        </div>
      </div>

      <!-- 상세 설명 텍스트 -->
      <div class="info_section">
        <h3>상세 설명 ({{ info.detailText && info.detailText.length || 0 }}개)</h3>
        <div class="detail_text_list">
          <div v-for="(item, idx) in info.detailText" :key="'text-'+idx" class="detail_text_item">
            <div class="detail_text_header">
              <span class="badge">{{ idx + 1 }}</span>
              <strong>{{ item.title }}</strong>
            </div>
            <p class="detail_text_content">{{ item.content }}</p>
          </div>
          <p v-if="!info.detailText || !info.detailText.length">등록된 상세 설명이 없습니다.</p>
        </div>
      </div>

      <!-- 에디터 내용 -->
      <div class="info_section" v-if="info.content">
        <h3>추가 설명</h3>
        <div class="editor_content" v-html="info.content"></div>
      </div>
    </div>

    <div v-else class="loading">
      <p>상품 정보를 불러오는 중...</p>
    </div>
  </div>
</template>

<script>
  import {db} from "@/firebase";

  const SET_PRODUCT_CATEGORY = {
    "1": "OUTER", "2": "TOP", "3": "BOTTOM", "4": "SHOES", "5": "WALLET", "6": "BAG", "7": "WATCH", "8": "ACC"
  }

  export default {
    name: "ProductContent",
    data() {
      return {
        info: {}
      }
    },
    methods: {
      getCategoryName(categoryId) {
        return SET_PRODUCT_CATEGORY[categoryId] || '-';
      },

      async getData() {
        const vm = this;
        try {
          const productId = vm.$route.params.params;
          if (!productId) {
            vm.$alert('상품 정보를 찾을 수 없습니다.', '오류');
            vm.$router.push('/admin/product/management');
            return;
          }

          const doc = await db.collection('products').doc(productId).get();
          if (doc.exists) {
            const data = doc.data();
            vm.info = {
              id: doc.id,
              createDate: data.createDate && data.createDate.toDate() || null,
              category: data.category || '',
              subCategory: data.subCategory || null,
              brand: data.brand || '',
              enBrand: data.enBrand || '',
              title: data.title || '',
              name: data.name || data.title || '',
              enName: data.enName || '',
              modelNumber: data.modelNumber || '',
              modelGroup: data.modelGroup || '',
              isOpen: data.isOpen || 2,
              price: data.price || 0,
              sellQuantity: data.sellQuantity || 0,
              mainImg: data.mainImg || [],
              detailImg: data.detailImg || [],
              detailText: data.detailText || [],
              sizeData: data.sizeData || {},
              content: data.content || '',
            };
          } else {
            vm.$alert('상품 정보를 찾을 수 없습니다.', '오류');
            vm.$router.push('/admin/product/management');
          }
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
          vm.$alert('데이터를 불러오는 중 오류가 발생했습니다.', '오류');
        }
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
        // ID만 전달, ProductSave에서 데이터 로드
        this.$router.push(`/admin/product/save/${this.info.id}`);
      },
    },

    mounted() {
      this.getData();
    }
  }
</script>

<style scoped lang="scss">
  #ProductContent {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;

    .add_btn {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-bottom: 20px;

      button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;

        &.cancel_btn {
          background: #6c757d;
          color: white;
          &:hover { background: #5a6268; }
        }

        &.save_btn {
          background: #007bff;
          color: white;
          &:hover { background: #0056b3; }
        }

        &.delete_btn {
          background: #dc3545;
          color: white;
          &:hover { background: #c82333; }
        }
      }
    }

    .ps_container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .info_section {
      padding: 24px;
      border-bottom: 1px solid #e9ecef;

      &:last-child {
        border-bottom: none;
      }

      h3 {
        margin: 0 0 20px 0;
        font-size: 18px;
        font-weight: 600;
        color: #212529;
        padding-bottom: 12px;
        border-bottom: 2px solid #007bff;
      }

      .info_grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;

        .info_item {
          display: flex;
          flex-direction: column;
          gap: 4px;

          &.full {
            grid-column: 1 / -1;
          }

          .label {
            font-size: 12px;
            color: #6c757d;
            font-weight: 500;
          }

          .value {
            font-size: 14px;
            color: #212529;
            font-weight: 400;
          }
        }
      }

      .image_grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;

        .image_item {
          position: relative;
          aspect-ratio: 1;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .image_badge {
            position: absolute;
            top: 8px;
            left: 8px;
            background: rgba(0, 123, 255, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
          }
        }

        p {
          grid-column: 1 / -1;
          text-align: center;
          color: #6c757d;
          padding: 40px 0;
        }
      }

      .size_data_list {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .size_data_item {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #28a745;

          .size_data_header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;

            .badge {
              background: #28a745;
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
            }

            strong {
              font-size: 16px;
              color: #212529;
            }
          }

          .size_data_content {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;

            span {
              font-size: 13px;
              color: #495057;
              padding: 4px 12px;
              background: white;
              border-radius: 4px;
              border: 1px solid #dee2e6;
            }
          }
        }
      }

      .detail_text_list {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .detail_text_item {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #007bff;

          .detail_text_header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;

            .badge {
              background: #007bff;
              color: white;
              padding: 2px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
            }

            strong {
              font-size: 16px;
              color: #212529;
            }
          }

          .detail_text_content {
            margin: 0;
            font-size: 14px;
            color: #495057;
            line-height: 1.6;
          }
        }

        p {
          text-align: center;
          color: #6c757d;
          padding: 40px 0;
          margin: 0;
        }
      }

      .editor_content {
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        min-height: 100px;

        ::v-deep img {
          max-width: 100%;
          height: auto;
        }
      }
    }

    .loading {
      text-align: center;
      padding: 60px 20px;
      color: #6c757d;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      padding: 12px;

      .info_section {
        padding: 16px;

        .info_grid {
          grid-template-columns: 1fr;
        }

        .image_grid {
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }
      }
    }
  }
</style>
