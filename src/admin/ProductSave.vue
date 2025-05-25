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
                <el-option :label="f" :value="name" v-for="(f, name) in SET_PRODUCT_BRAND" :key="name"/>
               </el-select>
            </span>
          </div>
          <div id="ps_title_box" class="set_row">
            <span class="title_label">상품이름</span>
            <span class="select_span">
               <el-input v-model="info.title" placeholder="제목을 입력해주세요."></el-input>
            </span>
          </div>
          <div id="ps_price_box" class="set_row">
            <span class="title_label">상품가격</span>
            <span class="select_span">
               <el-input type="Number" v-model="info.price" placeholder="가격을 입력해주세요."></el-input>
            </span>
          </div>
          <div id="ps_img_box" class="set_row">
            <span class="title_label">상품 대표사진</span>
            <span class="select_span">
              <el-input disabled v-model="info.img"></el-input>
              <el-upload
                  class="upload-demo"
                  :action="''"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :limit="1"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
              >
      <el-button size="small" type="primary">파일 선택</el-button>
    </el-upload>
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

  const SET_PRODUCT_CATEGORY = {
    "1": "OUTER", "2": "TOP", "3": "BOTTOM", "4": "SHOES", "5": "WALLET", "6": "BAG","7":"WATCH","8":"ACC"
  }
  const SET_PRODUCT_BRAND = {
    "1": "구찌", "2": "디올", "3": "루이비통", "4": "몽클", "5": "보테가", "6": "샤넬","7":"에르메스","9":"입생로랑","10":"톰브","8":"프라다"
  }
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
          id: null,
          isOpen: null,
          category: '',
          subCategory:'',
          brand:'',
          siteInfo: null,
          content: '',
          price: '',
          img:'',
          sellQuantity:0,
        },
        SET_PRODUCT_CATEGORY,
        SET_PRODUCT_BRAND,
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
      initSubCategoryImgMap() {
        const allSubCategories = Object.values(SUB_CATEGORY_OPTIONS).flat(); // 모든 서브카테고리를 모음
        this.subCategoryImgMap = {};
        allSubCategories.forEach(({ title, img }) => {
          this.subCategoryImgMap[title] = img;
        });
      },
      async saveProduct() {
        const vm = this;

        if (
            !vm.info.title ||
            !vm.type ||
            vm.info.isOpen === null ||
            !vm.info.createDate ||
            !vm.info.price ||
            !vm.info.img ||
            !vm.info.category,
            !vm.info.brand,
            !vm.info.subCategory // 서브 카테고리가 선택되지 않으면 저장하지 않도록 추가
        ) {
          vm.$alert("모든 필드를 입력해주세요.", "알림");
          return;
        }

        const productData = {
          title: vm.info.title,
          category: vm.type,
          subCategory: {
            id: vm.selectedSubCategoryInfo?.id || null,
            title: vm.info.subCategory,
            img: vm.selectedSubCategoryInfo?.img || "",
          },
          brand:vm.info.brand,
          isOpen: vm.info.isOpen,
          createDate: vm.info.createDate,
          content: vm.info.content || "",
          price: vm.info.price,
          img: vm.info.img, // 이미지 URL을 Firestore에 저장
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
        this.info.subCategory = ""; // 서브 카테고리 초기화
      },
      handleFileChange(file) {
        const vm = this;

        // 1. 로컬 프리뷰 먼저 보여주기 (즉시 실행)
        const reader = new FileReader();
        reader.onload = (e) => {
          vm.info.img = e.target.result; // Base64 형태라 즉시 img로 사용 가능
        };
        reader.readAsDataURL(file.raw);

        // 2. 백그라운드에서 Firebase 업로드
        const storageRef = storage.ref();
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const fileName = `${file.name.split('.')[0]}_${timestamp}.${extension}`;
        const fileRef = storageRef.child(`images/${fileName}`);
        const uploadTask = fileRef.put(file.raw);

        uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              console.error("이미지 업로드 중 오류 발생:", error);
              this.$alert("이미지 업로드에 실패했습니다.", "오류");
            },
            async () => {
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
              vm.info.img = downloadURL; // Firebase URL로 덮어쓰기
            }
        );
      },

      beforeUpload(file) {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
          this.$message.error("이미지 파일만 업로드 가능합니다.");
        }
        return isImage;
      },

      changeContent({key, html}) {
        this.info[key] = html || '';
      },
    },
    mounted() {
      const {params, query} = this.$route;
      if (params.params) {
        this.info.id = params.params;
        this.info.title = query.title || "";
        this.type = query.category || "";
        this.info.createDate = query.createDate ? query.createDate : null;
        this.info.isOpen = query.isOpen || null;
        this.info.content = query.content || "";
      }
      this.initSubCategoryImgMap();
    }
  }
</script>