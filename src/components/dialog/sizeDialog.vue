<template>
  <el-dialog title="SIZE GUIDE" :visible="visible" class="dialog-size" @close="handleClose">
    <div class="dialog_body">
      <!-- 가방 템플릿 -->
      <template v-if="product.sizeData.type === 'bag'">
        <img :src="product.sizeData.img">
        <table class="size_table">
          <thead>
          <tr><th>cm</th><th>높이</th><th>너비</th><th>폭</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit || '-'}}</th><td>{{p.z || '-'}}</td><td>{{p.x || '-'}}</td><td>{{p.y || '-'}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- 아우터/상의 템플릿 (padding, jacket, windbreaker, cardigan, sweatshirt, hood 등) -->
      <template v-else-if="isOuterOrTop">
        <img class="outer_img" :src="product.sizeData.img">
        <table class="size_table" v-if="product.sizeData.size && product.sizeData.size.length > 0">
          <thead>
          <tr><th>cm</th><th>총장</th><th>어깨너비</th><th>가슴단면</th><th>소매길이</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit || '-'}}</th><td>{{p.totalLength || '-'}}</td><td>{{p.shoulderWidth || '-'}}</td><td>{{p.chestSection || '-'}}</td><td>{{p.sleeveLength || '-'}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- 하의 템플릿 (denim, jogger, cotton, slacks, shortpants) -->
      <template v-else-if="isBottom">
        <img :src="product.sizeData.img">
        <table class="size_table" v-if="product.sizeData.size && product.sizeData.size.length > 0">
          <thead>
          <tr><th></th><th>총장</th><th>허리단면</th><th>엉덩이단면</th><th>허벅지단면</th><th>밑위</th><th>밑위단면</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit || '-'}}</th><td>{{p.totalLength || '-'}}</td><td>{{p.waistSection || '-'}}</td><td>{{p.hipSection || '-'}}</td>
            <td>{{p.thighSection || '-'}}</td><td>{{p.rise || '-'}}</td><td>{{p.hemSection || '-'}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- 원피스/스커트 템플릿 -->
      <template v-else-if="product.sizeData.type === 'dressskirt'">
        <img :src="product.sizeData.img">
        <table class="size_table" v-if="product.sizeData.size && product.sizeData.size.length > 0">
          <thead>
          <tr><th></th><th>총장</th><th>허리단면</th><th>엉덩이단면</th><th>허벅지단면</th><th>밑위</th><th>밑위단면</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit || '-'}}</th><td>{{p.totalLength || '-'}}</td><td>{{p.waistSection || '-'}}</td><td>{{p.hipSection || '-'}}</td>
            <td>{{p.thighSection || '-'}}</td><td>{{p.rise || '-'}}</td><td>{{p.hemSection || '-'}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- 신발 템플릿 (사진만, 테이블 없음) -->
      <template v-else-if="product.sizeData.type === 'shoes'">
        <img :src="product.sizeData.img">
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- 기본 fallback -->
      <template v-else-if="!product.sizeData || !product.sizeData.type">
        <p>사이즈 정보가 준비되지 않았습니다.</p>
      </template>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "sizeDialog",
    props: {
      visible: Boolean,
      product: Object
    },
    computed: {
      isOuterOrTop() {
        // 아우터/상의 계열 타입들
        const outerTopTypes = [
          'padding', 'jacket', 'windbreaker', 'cardigan', 'hoodzipup', 'mustang',
          'coat', 'vest', 'suit',  // 아우터
          'sweatshirt', 'hood', 'longsleeve', 'knitsweater', 'shortsleeve',
          'polo', 'sleeveless', 'shirtblouse'  // 상의
        ];
        return outerTopTypes.includes(this.product?.sizeData?.type);
      },
      isBottom() {
        // 하의 계열 타입들
        const bottomTypes = ['denim', 'jogger', 'cotton', 'slacks', 'shortpants'];
        return bottomTypes.includes(this.product?.sizeData?.type);
      },
      sizeNotice() {
        const type = this.product?.sizeData?.type;

        // 아우터/상의
        if (this.isOuterOrTop) {
          return '사이즈는 상품별로 약간의 편차가 있을 수 있습니다.';
        }

        // 하의
        if (this.isBottom) {
          return '참고: 위 치수는 유사 제품의 평균적인 수치를 기반으로 한 추정치이며, 실제 제품과 차이가 있을 수 있습니다.';
        }

        // 개별 타입
        switch (type) {
          case 'bag':
            return '사이즈는 측정 기준에 따라 오차가 있을 수 있습니다.';
          case 'dressskirt':
            return '사이즈는 상품별로 약간의 편차가 있을 수 있습니다.';
          case 'shoes':
            return '발볼 넓이 및 발등 높이에 따라 착화감이 다를 수 있습니다.';
          default:
            return '';
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:visible', false);
      }
    },
    created(){
      console.log('test:',this.product)
    }
  };
</script>