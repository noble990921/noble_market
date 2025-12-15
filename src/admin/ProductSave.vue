<template>
  <div id="ProductSave">
    <div class="add_btn">
      <button @click="$router.push('/admin/product/management')" class="cancel_btn">취소</button>
      <button @click="saveProduct" class="save_btn">저장</button>
    </div>
    <div class="ps_container">
      <div class="ps_container_top">
        <div class="top_setting">
          <div id="ps_public_select_box" class="set_row">
            <span class="title_label">공개/비공개</span>
            <span class="select_span">
            <el-select v-model="info.isOpen" placeholder="선택해주세요.">
              <el-option label="공개" value="1"></el-option>
              <el-option label="비공개" value="2"></el-option>
            </el-select>
          </span>
          </div>
          <div id="ps_date_box" class="set_row">
            <span class="title_label">날짜</span>
            <span class="select_span">
                <el-date-picker style="width: 100%" :clearable="false" :editable="false" v-model="info.createDate"
                                :pickerOptions="pickerOptions" type="datetime"/>
            </span>
          </div>
          <div id="ps_category_box" class="set_row">
            <span class="title_label">카테고리</span>
            <span class="select_span">
                <el-select v-model="type" placeholder="선택해주세요.">
                <el-option :label="f" :value="name" v-for="(f, name) in SET_PRODUCT_CATEGORY" :key="name"/>
               </el-select>
            </span>
          </div>
          <div id="ps_subcategory_box" class="set_row" v-if="subCategoryOptions.length > 0">
            <span class="title_label">서브 카테고리</span>
            <span class="select_span">
        <el-select
            v-model="info.subCategory"
            placeholder="서브 카테고리를 선택해주세요.">
            <el-option
                v-for="(subCategory, index) in subCategoryOptions"
                :key="index"
                :label="subCategory.title"
                :value="subCategory.title" />
        </el-select>
      </span>
          </div>
          <div id="ps_brand_box" class="set_row">
            <span class="title_label">브랜드</span>
            <span class="select_span">
                <el-select v-model="info.brand" placeholder="브랜드를 선택해주세요.">
                <el-option :label="f" :value="f" v-for="(f, name) in SET_PRODUCT_BRAND" :key="name"/>
               </el-select>
            </span>
          </div>
          <div id="ps_title_box" class="set_row">
            <span class="title_label">상품이름 (한글)</span>
            <span class="select_span">
               <el-input v-model="info.title" placeholder="제목을 입력해주세요."></el-input>
            </span>
          </div>
          <div id="ps_en_name_box" class="set_row">
            <span class="title_label">상품이름 (영문)</span>
            <span class="select_span">
               <el-input v-model="info.enName" placeholder="영문 제목을 입력해주세요."></el-input>
            </span>
          </div>
          <div id="ps_en_brand_box" class="set_row">
            <span class="title_label">브랜드명 (영문) - 자동입력</span>
            <span class="select_span">
               <el-input v-model="info.enBrand" placeholder="브랜드 선택 시 자동입력됩니다" disabled></el-input>
            </span>
          </div>
          <div id="ps_model_number_box" class="set_row">
            <span class="title_label">모델번호</span>
            <span class="select_span">
               <el-input v-model="info.modelNumber" placeholder="모델번호를 입력해주세요."></el-input>
            </span>
          </div>
          <div id="ps_model_group_box" class="set_row">
            <span class="title_label">모델그룹 (색상 변형 그룹)</span>
            <span class="select_span">
               <el-input v-model="info.modelGroup" placeholder="같은 제품의 다른 색상이면 동일한 그룹명 입력(처음올리는 모델번호로 통일)"></el-input>
            </span>
          </div>
          <div id="ps_price_box" class="set_row">
            <span class="title_label">상품가격</span>
            <span class="select_span">
               <el-input type="Number" v-model="info.price" placeholder="가격을 입력해주세요."></el-input>
            </span>
          </div>
          <!-- 메인 이미지 (다중) -->
          <div id="ps_main_img_box" class="set_row">
            <span class="title_label">메인 이미지 (최대 8장)</span>
            <span class="select_span">
              <div class="image-preview-list">
                <div v-for="(img, idx) in info.mainImg" :key="'main-'+idx" class="image-preview-item" >
                  <img :src="img.url || img" style="width: 100px; height: 100px; object-fit: cover;"/>
                  <div class="image-controls">
                    <span class="order-number">{{ idx + 1 }}</span>
                    <el-button
                      size="mini"
                      icon="el-icon-arrow-up"
                      @click="moveImageUp(idx, 'main')"
                      :disabled="idx === 0">
                    </el-button>
                    <el-button
                      size="mini"
                      icon="el-icon-arrow-down"
                      @click="moveImageDown(idx, 'main')"
                      :disabled="idx === info.mainImg.length - 1">
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeImage(idx, 'main')">
                    </el-button>
                  </div>
                </div>
                <div v-if="info.mainImg.length < 8" class="upload-placeholder">
                  <el-upload
                      :action="''"
                      :auto-upload="false"
                      :on-change="(file) => handleMultipleFileChange(file, 'main')"
                      :show-file-list="false"
                      accept="image/*">
                    <el-button size="small" icon="el-icon-plus">추가 ({{ info.mainImg.length }}/8)</el-button>
                  </el-upload>
                </div>
              </div>
            </span>
          </div>

          <!-- 상세 이미지 (다중) -->
          <div id="ps_detail_img_box" class="set_row">
            <span class="title_label">상세 이미지 (최대 10장)</span>
            <span class="select_span">
              <div class="image-preview-list">
                <div v-for="(img, idx) in info.detailImg" :key="'detail-'+idx" class="image-preview-item">
                  <img :src="img.url || img" style="width: 100px; height: 100px; object-fit: cover;"/>
                  <div class="image-controls">
                    <span class="order-number">{{ idx + 1 }}</span>
                    <el-button
                      size="mini"
                      icon="el-icon-arrow-up"
                      @click="moveImageUp(idx, 'detail')"
                      :disabled="idx === 0">
                    </el-button>
                    <el-button
                      size="mini"
                      icon="el-icon-arrow-down"
                      @click="moveImageDown(idx, 'detail')"
                      :disabled="idx === info.detailImg.length - 1">
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeImage(idx, 'detail')">
                    </el-button>
                  </div>
                </div>
                <div v-if="info.detailImg.length < 10" class="upload-placeholder">
                  <el-upload
                      :action="''"
                      :auto-upload="false"
                      :on-change="(file) => handleMultipleFileChange(file, 'detail')"
                      :show-file-list="false"
                      accept="image/*">
                    <el-button size="small" icon="el-icon-plus">추가 ({{ info.detailImg.length }}/10)</el-button>
                  </el-upload>
                </div>
              </div>
            </span>
          </div>

          <!-- 착샷 이미지 (다중) -->
          <div id="ps_wearing_img_box" class="set_row">
            <span class="title_label">착샷 이미지 (최대 10장)</span>
            <span class="select_span">
              <div class="image-preview-list">
                <div v-for="(img, idx) in info.wearingImg" :key="'wearing-'+idx" class="image-preview-item">
                  <img :src="img.url || img" style="width: 100px; height: 100px; object-fit: cover;"/>
                  <div class="image-controls">
                    <span class="order-number">{{ idx + 1 }}</span>
                    <el-button
                      size="mini"
                      icon="el-icon-arrow-up"
                      @click="moveImageUp(idx, 'wearing')"
                      :disabled="idx === 0">
                    </el-button>
                    <el-button
                      size="mini"
                      icon="el-icon-arrow-down"
                      @click="moveImageDown(idx, 'wearing')"
                      :disabled="idx === info.wearingImg.length - 1">
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeImage(idx, 'wearing')">
                    </el-button>
                  </div>
                </div>
                <div v-if="info.wearingImg.length < 10" class="upload-placeholder">
                  <el-upload
                      :action="''"
                      :auto-upload="false"
                      :on-change="(file) => handleMultipleFileChange(file, 'wearing')"
                      :show-file-list="false"
                      accept="image/*">
                    <el-button size="small" icon="el-icon-plus">추가 ({{ info.wearingImg.length }}/10)</el-button>
                  </el-upload>
                </div>
              </div>
            </span>
          </div>

          <!-- 사이즈 정보 -->
          <div id="ps_size_box" class="set_row">
            <span class="title_label">사이즈 타입</span>
            <span class="select_span">
              <el-select v-model="info.sizeData.type" placeholder="사이즈 타입 선택">
                <el-option label="아우터" value="outer"></el-option>
                <el-option label="상의" value="top"></el-option>
                <el-option label="반팔" value="shortSleeves"></el-option>
                <el-option label="하의" value="bottom"></el-option>
                <el-option label="가방" value="bag"></el-option>
                <el-option label="스커트" value="skirt"></el-option>
              </el-select>
            </span>
          </div>

          <!-- 사이즈 데이터 입력 (타입별) -->
          <div v-if="info.sizeData.type" id="ps_size_data_box" class="set_row">
            <span class="title_label">사이즈 데이터</span>
            <span class="select_span">
              <div class="size-data-container">
                <!-- BOTTOM, SKIRT 타입 -->
                <div v-if="info.sizeData.type === 'bottom' || info.sizeData.type === 'skirt'" class="size-input-section">
                  <div v-for="(size, idx) in info.sizeData.size" :key="'size-'+idx" class="size-row">
                    <div class="size-row-header">
                      <span class="size-number">{{ idx + 1 }}</span>
                      <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="removeSizeRow(idx)"
                        :disabled="info.sizeData.size.length <= 1">삭제</el-button>
                    </div>
                    <div class="size-fields">
                      <el-input v-model="size.unit" placeholder="사이즈 (예: S (1))" style="width: 150px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.totalLength" placeholder="총 기장" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.waistSection" placeholder="허리단면" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.crossSection" placeholder="허벅지단면" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.bottomSection" placeholder="밑단단면" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.rise" placeholder="밑위" type="number" style="width: 100px;"></el-input>
                    </div>
                  </div>
                  <el-button
                    @click="addSizeRow"
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    style="margin-top: 10px;">
                    사이즈 추가
                  </el-button>
                </div>

                <!-- BAG 타입 -->
                <div v-else-if="info.sizeData.type === 'bag'" class="size-input-section">
                  <div v-for="(size, idx) in info.sizeData.size" :key="'size-'+idx" class="size-row">
                    <div class="size-row-header">
                      <span class="size-number">{{ idx + 1 }}</span>
                      <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="removeSizeRow(idx)"
                        :disabled="info.sizeData.size.length <= 1">삭제</el-button>
                    </div>
                    <div class="size-fields">
                      <el-input v-model="size.unit" placeholder="사이즈 (예: free, cm)" style="width: 150px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.z" placeholder="높이" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.x" placeholder="너비" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.y" placeholder="폭" type="number" style="width: 100px;"></el-input>
                    </div>
                  </div>
                  <el-button
                    @click="addSizeRow"
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    style="margin-top: 10px;">
                    사이즈 추가
                  </el-button>
                </div>

                <!-- OUTER, TOP, SHORT SLEEVES 타입 -->
                <div v-else-if="info.sizeData.type === 'outer' || info.sizeData.type === 'top' || info.sizeData.type === 'shortSleeves'" class="size-input-section">
                  <div v-for="(size, idx) in info.sizeData.size" :key="'size-'+idx" class="size-row">
                    <div class="size-row-header">
                      <span class="size-number">{{ idx + 1 }}</span>
                      <el-button
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="removeSizeRow(idx)"
                        :disabled="info.sizeData.size.length <= 1">삭제</el-button>
                    </div>
                    <div class="size-fields">
                      <el-input v-model="size.unit" placeholder="사이즈 (예: S, M, L)" style="width: 150px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.totalLength" placeholder="총장" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.shoulderWidth" placeholder="어깨너비" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.chestSection" placeholder="가슴단면" type="number" style="width: 100px; margin-right: 10px;"></el-input>
                      <el-input v-model.number="size.sleeveLength" placeholder="소매길이" type="number" style="width: 100px;"></el-input>
                    </div>
                  </div>
                  <el-button
                    @click="addSizeRow"
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    style="margin-top: 10px;">
                    사이즈 추가
                  </el-button>
                </div>
              </div>
            </span>
          </div>

          <!-- DetailText 동적 배열 -->
          <div id="ps_detail_text_box" class="set_row">
            <span class="title_label">상세 설명 항목</span>
            <span class="select_span">
              <div class="detail-text-container">
                <div v-for="(item, idx) in info.detailText" :key="'dt-'+idx" class="detail-text-item">
                  <div class="item-header">
                    <span class="item-number">{{ idx + 1 }}</span>
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeDetailText(idx)"
                      :disabled="info.detailText.length <= 1">삭제</el-button>
                  </div>
                  <el-input
                    v-model="item.title"
                    placeholder="제목 (예: 정품과 동일한 이탈리아산 소재)"
                    style="margin-bottom: 10px;">
                  </el-input>
                  <el-input
                    type="textarea"
                    :rows="3"
                    v-model="item.content"
                    placeholder="내용을 입력해주세요">
                  </el-input>
                </div>
                <el-button
                  @click="addDetailText"
                  type="primary"
                  icon="el-icon-plus"
                  style="margin-top: 10px;">
                  항목 추가
                </el-button>
              </div>
            </span>
          </div>

        </div>
        <div class="bottom_text">
          <my-quill-editor :content="info.content" :content-key="'content'" :name="'StrategyNoticeSave'"
                           @change="changeContent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyQuillEditor from "@/common/components/MyQuillEditor";
  import {db, storage} from "@/firebase";
  import {SET_PRODUCT_BRAND} from "@/constants/Set";
  import imageCompression from 'browser-image-compression';

  // 카테고리 매핑 (숫자 -> 영문)
  const SET_PRODUCT_CATEGORY = {
    "1": "OUTER", "2": "TOP", "3": "BOTTOM", "4": "SHOES", "5": "WALLET", "6": "BAG","7":"WATCH","8":"ACC"
  }

  // 브랜드 셀렉트박스용 변환 (한글 이름만)
  const BRAND_SELECT_OPTIONS = Object.entries(SET_PRODUCT_BRAND).reduce((acc, [, value]) => {
    acc[value.id] = value.koName;
    return acc;
  }, {})
  const SUB_CATEGORY_OPTIONS = {
    "1": [
      {id:1, title: "패딩", img: "padding"},
      {id:2, title: "재킷", img: "jacket"},
      {id:3, title: "바람막이", img: "windbreaker"},
      {id:4, title: "가디건", img: "cardigan"},
      {id:5, title: "후드집업", img: "hoodzipup"},
      {id:6, title: "코트", img: "coat"},
      {id:7, title: "조끼/베스트", img: "vest"},
      {id:8, title: "슈트/블레이저", img: "suit"},
      {id:9, title: "무스탕/퍼", img: "mustang"}
    ],
    "2": [
      {id:1, title: "맨투맨/스웨트", img: "sweatshirt"},
      {id:2, title: "후드", img: "hood"},
      {id:3, title: "긴소매", img: "longsleeve"},
      {id:4, title: "반소매", img: "shortsleeve"},
      {id:5, title: "민소매", img: "sleeveless"},
      {id:6, title: "피케/카라", img: "polo" },
      {id:7, title: "니트/스웨터", img: "knitsweater"},
      {id:8, title: "셔츠/블라우스", img: "shirtblouse"}
    ],
    "3": [
      {id:1, title: "데님", img: "denim"},
      {id:2, title: "트레이닝/조거", img: "jogger"},
      {id:3, title: "코튼", img: "cotton"},
      {id:4, title: "슬랙스", img: "slacks"},
      {id:5, title: "숏 팬츠", img: "shortpants"},
      {id:6, title: "원피스/스커트", img: "dressskirt"}
    ],
    "4": [
      {id:1, title: "스니커즈", img: "sneakers"},
      {id:2, title: "구두/로퍼", img: "loafers"},
      {id:3, title: "샌들/슬리퍼", img: "sandals"},
      {id:4, title: "부츠/워커", img: "boots"}
    ],
    "5": [
      {id:1, title: "장지갑", img: "longwallet"},
      {id:2, title: "중지갑", img: "mediumwallet"},
      {id:3, title: "반지갑", img: "shortwallet"},
      {id:4, title: "카드/명합지갑", img: "cardwallet"},
      {id:5, title: "동전/여권지갑", img: "coinpassportwallet"}
    ],
    "6": [
      {id:1, title: "미니백", img: "minibag"},
      {id:2, title: "백팩", img: "backpack"},
      {id:3, title: "숄더백", img: "shoulderbag"},
      {id:4, title: "토트백", img: "totebag"},
      {id:5, title: "크로스백", img: "crossbag"},
      {id:6, title: "클러치", img: "clutch"},
      {id:7, title: "더플백", img: "dufflebag"},
      {id:8, title: "에코백", img: "ecobag"},
      {id:9, title: "캐리어", img: "carrier"}
    ],
    "8": [
      {id:1, title: "목걸이", img: "necklace"},
      {id:2, title: "팔찌", img: "bracelet"},
      {id:3, title: "반지", img: "ring"},
      {id:4, title: "귀걸이", img: "earring"},
      {id:5, title: "키링/기타", img: "keyring"}
    ]
  }
  export default {
    name: "ProductSave",
    components: {
      MyQuillEditor
    },
    data() {
      return {
        info: {
          title: '',
          enName: '',
          id: null,
          isOpen: null,
          category: '',
          subCategory:'',
          brand:'',
          enBrand: '',
          modelNumber: '',
          modelGroup: '',
          siteInfo: null,
          content: '',
          price: '',
          mainImg: [],
          detailImg: [],
          wearingImg: [],
          detailText: [{title: '', content: ''}],
          sizeData: {
            type: '',
            img: '',
            size: []
          },
          sellQuantity:0,
        },
        SET_PRODUCT_CATEGORY,
        SET_PRODUCT_BRAND: BRAND_SELECT_OPTIONS,
        subCategoryOptions:[],
        subCategoryImgMap: {},
        type: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      }
    },
    watch: {
      type(newCategory) {
        this.watchCategoryChange(newCategory); // 카테고리 변경 시 서브 카테고리 업데이트
      },
      'info.brand'(newBrand) {
        // 브랜드 변경 시 영문 브랜드명 자동 입력
        const brandData = Object.values(SET_PRODUCT_BRAND).find(b => b.koName === newBrand);
        if (brandData) {
          this.info.enBrand = brandData.enName;
        }
      },
      'info.sizeData.type'(newType, oldType) {
        // 사이즈 타입 변경 시 기본 사이즈 행 추가 (기존 데이터가 없을 때만)
        if (newType && this.info.sizeData.size.length === 0) {
          this.addSizeRow();
        }
        // 수정 모드가 아니고, 타입을 의도적으로 변경한 경우에만 초기화
        // (수정 모드에서 데이터 로드 시에는 초기화하지 않음)
        if (newType !== oldType && oldType && !this.info.id) {
          this.info.sizeData.size = [];
          this.addSizeRow();
        }
      }
    },
    computed: {
      selectedSubCategoryInfo() {
        return this.subCategoryOptions.find(
            (item) => item.title === this.info.subCategory
        )
      }
    },
    methods: {
      // 상품 데이터 불러오기 (수정 모드)
      async loadProductData(productId) {
        const vm = this;
        try {
          const doc = await db.collection('products').doc(productId).get();
          if (doc.exists) {
            const data = doc.data();

            // 모든 필드 채우기
            vm.info.id = doc.id;
            vm.info.title = data.title || '';
            vm.info.enName = data.enName || '';
            vm.info.brand = data.brand || '';
            vm.info.enBrand = data.enBrand || '';
            vm.info.modelNumber = data.modelNumber || '';
            vm.info.modelGroup = data.modelGroup || '';
            vm.info.subCategory = data.subCategory?.title || '';
            vm.info.price = data.price || '';
            vm.info.isOpen = data.isOpen || null;
            vm.info.createDate = data.createDate?.toDate() || null;
            vm.info.content = data.content || '';
            vm.info.mainImg = (data.mainImg || []).map((img, idx) =>
              typeof img === 'string' ? { url: img, order: idx + 1 } : { ...img, order: img.order || idx + 1 }
            );
            vm.info.detailImg = (data.detailImg || []).map((img, idx) =>
              typeof img === 'string' ? { url: img, order: idx + 1 } : { ...img, order: img.order || idx + 1 }
            );
            vm.info.wearingImg = (data.wearingImg || []).map((img, idx) =>
              typeof img === 'string' ? { url: img, order: idx + 1 } : { ...img, order: img.order || idx + 1 }
            );
            vm.info.detailText = data.detailText || [{title: '', content: ''}];
            vm.info.sizeData = data.sizeData ? {
              type: data.sizeData.type || '',
              img: data.sizeData.img || '',
              size: data.sizeData.size || []
            } : {
              type: '',
              img: '',
              size: []
            };
            vm.info.sellQuantity = data.sellQuantity || 0;

            // 카테고리 설정
            vm.type = data.category || '';

            // 서브카테고리 옵션 업데이트
            vm.watchCategoryChange(vm.type);

          } else {
            vm.$alert('상품 정보를 찾을 수 없습니다.', '오류');
            vm.$router.push('/admin/product/management');
          }
        } catch (error) {
          console.error('상품 데이터 로드 오류:', error);
          vm.$alert('데이터를 불러오는 중 오류가 발생했습니다.', '오류');
        }
      },

      initSubCategoryImgMap() {
        const allSubCategories = Object.values(SUB_CATEGORY_OPTIONS).flat(); // 모든 서브카테고리를 모음
        this.subCategoryImgMap = {};
        allSubCategories.forEach(({ title, img }) => {
          this.subCategoryImgMap[title] = img;
        });
      },
      async saveProduct() {
        const vm = this;

        // 검증: 필수 필드
        if (
            !vm.info.title ||
            !vm.info.enName ||
            !vm.type ||
            vm.info.isOpen === null ||
            !vm.info.createDate ||
            !vm.info.price ||
            !vm.info.brand ||
            !vm.info.subCategory ||
            !vm.info.modelNumber
        ) {
          vm.$alert("필수 필드를 모두 입력해주세요.", "알림");
          return;
        }

        // 검증: 이미지 업로드 중인지 확인
        const uploadingMain = vm.info.mainImg.some(img => img.uploading);
        const uploadingDetail = vm.info.detailImg.some(img => img.uploading);
        const uploadingWearing = vm.info.wearingImg.some(img => img.uploading);

        console.log('업로드 상태 확인:');
        console.log('메인 이미지:', vm.info.mainImg.map(img => ({ url: img.url?.substring(0, 50), uploading: img.uploading })));
        console.log('상세 이미지:', vm.info.detailImg.map(img => ({ url: img.url?.substring(0, 50), uploading: img.uploading })));
        console.log('착샷 이미지:', vm.info.wearingImg.map(img => ({ url: img.url?.substring(0, 50), uploading: img.uploading })));

        if (uploadingMain || uploadingDetail || uploadingWearing) {
          vm.$alert("이미지 업로드가 완료될 때까지 기다려주세요.", "알림");
          return;
        }

        // 검증: 메인 이미지 필수
        if (!vm.info.mainImg.length) {
          vm.$alert("최소 1개의 메인 이미지를 업로드해주세요.", "알림");
          return;
        }

        // 검증: DetailText 빈 항목 확인
        const emptyDetailText = vm.info.detailText.some(
          item => !item.title.trim() || !item.content.trim()
        );
        if (emptyDetailText) {
          vm.$alert("상세 설명의 모든 항목(제목, 내용)을 입력해주세요.", "알림");
          return;
        }

        // 사이즈 이미지 경로 설정
        const sizeImgMap = {
          'outer': '/media/productDetail/outer_size.png',
          'top': '/media/productDetail/outer_size.png',
          'shortSleeves':'/media/productDetail/outer_size.png',
          'bottom': '/media/productDetail/bottom_size.png',
          'bag': '/media/productDetail/bag_size.png',
          'skirt': '/media/productDetail/skirt_size.png',
        };

        const productData = {
          title: vm.info.title,
          name: vm.info.title,
          enName: vm.info.enName,
          category: vm.type,
          subCategory: {
            id: vm.selectedSubCategoryInfo?.id || null,
            title: vm.info.subCategory,
            img: vm.selectedSubCategoryInfo?.img || "",
          },
          brand: vm.info.brand,
          enBrand: vm.info.enBrand || vm.info.brand,
          modelNumber: vm.info.modelNumber,
          modelGroup: vm.info.modelGroup ,
          isOpen: vm.info.isOpen,
          createDate: vm.info.createDate,
          content: vm.info.content || "",
          price: vm.info.price,
          mainImg: vm.info.mainImg.map(img => img.url || img),
          detailImg: vm.info.detailImg.map(img => img.url || img),
          wearingImg: vm.info.wearingImg.map(img => img.url || img),
          detailText: vm.info.detailText,
          sizeData: {
            type: vm.info.sizeData.type ,
            img: sizeImgMap[vm.info.sizeData.type],
            size: vm.info.sizeData.size || []
          },
          sellQuantity: vm.info.sellQuantity || 0,
        };

        try {
          if (vm.info.id) {
            // 수정 처리
            await db.collection("products").doc(vm.info.id).update(productData);
            vm.$alert("상품이 성공적으로 수정되었습니다.", "알림");
          } else {
            await db.collection("products").add(productData);
            vm.$alert("상품이 성공적으로 등록되었습니다.", "알림");
          }
          vm.$router.push("/admin/product/management");
        } catch (error) {
          console.error("상품 저장 중 오류 발생:", error);
          vm.$alert("상품 저장에 실패했습니다. 다시 시도해주세요.", "오류");
        }
      },

      // 카테고리 변경 시 서브 카테고리 옵션 업데이트
      watchCategoryChange(newCategory) {
        this.subCategoryOptions = SUB_CATEGORY_OPTIONS[newCategory] || [];
        // 수정 모드가 아닐 때만 서브 카테고리 초기화 (데이터 로드 시에는 유지)
        if (!this.info.id) {
          this.info.subCategory = "";
        }
      },

      changeContent({key, html}) {
        this.info[key] = html || '';
      },

      // 다중 이미지 업로드
      async handleMultipleFileChange(file, type) {
        const vm = this;
        const imageArray = type === 'main' ? vm.info.mainImg :
                          type === 'detail' ? vm.info.detailImg :
                          vm.info.wearingImg;
        const maxLimit = type === 'main' ? 8 :
                        type === 'detail' ? 10 :
                        10;

        if (imageArray.length >= maxLimit) {
          vm.$message.warning(`최대 ${maxLimit}장까지 업로드 가능합니다.`);
          return;
        }

        // 임시 객체 추가 (프리뷰용)
        const index = imageArray.length;
        const tempImg = { url: '', uploading: true, order: index + 1 };
        imageArray.push(tempImg);

        try {
          // 🚀 이미지 압축 및 WebP 변환
          const options = {
            maxSizeMB: 0.5,           // 최대 500KB
            maxWidthOrHeight: type === 'main' ? 1200 : 1920,  // 메인: 1200px, 상세: 1920px
            useWebWorker: true,
            fileType: 'image/webp'    // WebP로 변환
          };

          vm.$message.info('이미지 압축 중...');
          const compressedFile = await imageCompression(file.raw, options);

          const originalSize = (file.raw.size / 1024 / 1024).toFixed(2);
          const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
          console.log(`원본: ${originalSize}MB → 압축: ${compressedSize}MB (${((1 - compressedFile.size / file.raw.size) * 100).toFixed(0)}% 감소)`);

          // 로컬 프리뷰
          const reader = new FileReader();
          reader.onload = (e) => {
            tempImg.url = e.target.result;
          };
          reader.readAsDataURL(compressedFile);

          // Firebase 업로드 (압축된 파일 업로드)
          const storageRef = storage.ref();
          const timestamp = Date.now();
          const fileName = `products/${type}/${timestamp}_${index}.webp`;  // .webp 확장자
          const uploadTask = storageRef.child(fileName).put(compressedFile);

          uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
              console.error('이미지 업로드 실패:', error);
              imageArray.splice(index, 1);
              vm.$message.error('이미지 업로드에 실패했습니다.');
            },
            async () => {
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
              // Vue 2 반응성을 위해 $set 사용
              vm.$set(imageArray, index, { url: downloadURL, uploading: false, order: index + 1 });
              console.log('업로드 완료:', downloadURL);
              vm.$message.success('이미지 업로드 완료');
            }
          );
        } catch (error) {
          console.error('업로드 중 오류:', error);
          imageArray.splice(index, 1);
          vm.$message.error('이미지 처리 중 오류가 발생했습니다.');
        }
      },

      // 이미지 삭제
      removeImage(index, type) {
        if (type === 'main') {
          this.info.mainImg.splice(index, 1);
        } else if (type === 'detail') {
          this.info.detailImg.splice(index, 1);
        } else if (type === 'wearing') {
          this.info.wearingImg.splice(index, 1);
        }
      },

      // 이미지 위로 이동
      moveImageUp(index, type) {
        if (index === 0) return; // 첫 번째 이미지는 위로 이동 불가

        let imageArray;
        if (type === 'main') {
          imageArray = [...this.info.mainImg];
        } else if (type === 'detail') {
          imageArray = [...this.info.detailImg];
        } else if (type === 'wearing') {
          imageArray = [...this.info.wearingImg];
        }

        // 현재 이미지와 위 이미지의 위치를 교환
        [imageArray[index], imageArray[index - 1]] = [imageArray[index - 1], imageArray[index]];

        // 배열 업데이트
        if (type === 'main') {
          this.info.mainImg = imageArray;
        } else if (type === 'detail') {
          this.info.detailImg = imageArray;
        } else if (type === 'wearing') {
          this.info.wearingImg = imageArray;
        }
      },

      // 이미지 아래로 이동
      moveImageDown(index, type) {
        let imageArray;
        if (type === 'main') {
          imageArray = [...this.info.mainImg];
          if (index === imageArray.length - 1) return; // 마지막 이미지는 아래로 이동 불가
        } else if (type === 'detail') {
          imageArray = [...this.info.detailImg];
          if (index === imageArray.length - 1) return;
        } else if (type === 'wearing') {
          imageArray = [...this.info.wearingImg];
          if (index === imageArray.length - 1) return;
        }

        // 현재 이미지와 아래 이미지의 위치를 교환
        [imageArray[index], imageArray[index + 1]] = [imageArray[index + 1], imageArray[index]];

        // 배열 업데이트
        if (type === 'main') {
          this.info.mainImg = imageArray;
        } else if (type === 'detail') {
          this.info.detailImg = imageArray;
        } else if (type === 'wearing') {
          this.info.wearingImg = imageArray;
        }
      },

      // DetailText 항목 추가
      addDetailText() {
        this.info.detailText.push({ title: '', content: '' });
      },

      // DetailText 항목 삭제
      removeDetailText(index) {
        if (this.info.detailText.length > 1) {
          this.info.detailText.splice(index, 1);
        }
      },

      // 사이즈 행 추가
      addSizeRow() {
        const type = this.info.sizeData.type;
        let newSize = {};

        if (type === 'bottom' || type === 'skirt') {
          newSize = {
            unit: '',
            totalLength: null,
            waistSection: null,
            crossSection: null,
            bottomSection: null,
            rise: null
          };
        } else if (type === 'bag') {
          newSize = {
            unit: '',
            z: null,
            x: null,
            y: null
          };
        } else if (type === 'outer' || type === 'top' || type === 'shortSleeves') {
          newSize = {
            unit: '',
            totalLength: null,
            shoulderWidth: null,
            chestSection: null,
            sleeveLength: null
          };
        }

        this.info.sizeData.size.push(newSize);
      },

      // 사이즈 행 삭제
      removeSizeRow(index) {
        if (this.info.sizeData.size.length > 1) {
          this.info.sizeData.size.splice(index, 1);
        }
      },
    },

    async mounted() {
      const {params} = this.$route;

      // ID가 있으면 수정 모드 - Firestore에서 데이터 불러오기
      if (params.params) {
        await this.loadProductData(params.params);
      }

      this.initSubCategoryImgMap();
    }
  }
</script>