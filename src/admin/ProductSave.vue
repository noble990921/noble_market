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
  import {db} from "@/firebase";

  const SET_PRODUCT_CATEGORY = {
    "1": "Top", "2": "Bag", "3": "Wallet", "4": "Watch", "5": "Shoes", "6": "Acc"
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
          siteInfo: null,
          content: '',
          price: '',
          img:'',
          sellQuantity:0,
        },
        SET_PRODUCT_CATEGORY,
        type: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      }
    },
    methods: {
      async saveProduct() {
        const vm = this;
        if (
            !vm.info.title ||
            !vm.type ||
            vm.info.isOpen === null ||
            !vm.info.createDate ||
            !vm.info.price ||
            !vm.info.img
        ) {
          vm.$alert("모든 필드를 입력해주세요.", "알림");
          return;
        }
        const productData = {
          title: vm.info.title,
          category: vm.type,
          isOpen: vm.info.isOpen,
          createDate: vm.info.createDate,
          content: vm.info.content || "",
          price: vm.info.price,
          img: vm.info.img,
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
      handleFileChange(file) {
        const reader = new FileReader();

        // FileReader를 사용해 Base64로 변환
        reader.onload = (e) => {
          // 이미지 최적화 함수 호출
          this.optimizeImage(e.target.result, 500, 500, 0.7, (optimizedImg) => {
            this.info.img = optimizedImg; // 최적화된 이미지를 저장
          });
        };

        reader.readAsDataURL(file.raw); // 파일 읽기
      },
      //base 64로 저장한 이미지 파일크기 줄여주는 코드.
      optimizeImage(base64String, maxWidth = 300, maxHeight = 300, quality = 0.7, callback) {
        let img = new Image();
        img.src = base64String;
        img.onload = function () {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");

          // 🟢 리사이징 (비율 유지)
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // 🟢 압축 + WebP 변환 (품질 70%)
          callback(canvas.toDataURL("image/webp", quality));
        };
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
    }
  }
</script>