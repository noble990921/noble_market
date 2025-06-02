<template>
  <el-dialog title="SIZE GUIDE" :visible="visible" class="dialog-size" @close="handleClose">
    <div class="dialog_body">
      <!-- BAG 템플릿 -->
      <template v-if="product.sizeData.type === 'bag'">
        <img :src="product.sizeData.img">
        <table class="size_table">
          <thead>
          <tr><th>cm</th><th>높이</th><th>너비</th><th>폭</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit}}</th><td>{{p.z}}</td><td>{{p.x}}</td><td>{{p.y}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- OUTER 템플릿 -->
      <template v-else-if="product.sizeData.type === 'outer'">
        <img class="outer_img" :src="product.sizeData.img">
<!--        <table class="size_table">-->
<!--          <thead>-->
<!--          <tr><th>cm</th><th>어깨</th><th>가슴</th><th>소매</th><th>총장</th></tr>-->
<!--          </thead>-->
<!--          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">-->
<!--          <tr><th>{{p.unit}}</th><td>{{p.shoulder}}</td><td>{{p.chest}}</td><td>{{p.sleeve}}</td><td>{{p.length}}</td></tr>-->
<!--          </tbody>-->
<!--        </table>-->
<!--        <p class="notice">{{ sizeNotice }}</p>-->
      </template>

      <template v-if="product.sizeData.type === 'bottom'">
        <img :src="product.sizeData.img">
        <table class="size_table">
          <thead>
          <tr><th></th><th>총 기장</th><th>허리단면</th><th>허벅지단면</th><th>밑단단면</th><th>밑위</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit}}</th><td>{{p.totalLength}}</td><td>{{p.waistSection}}</td><td>{{p.crossSection}}</td>
            <td>{{p.bottomSection}}</td><td>{{p.rise}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <template v-if="product.sizeData.type === 'skirt'">
        <img :src="product.sizeData.img">
        <table class="size_table">
          <thead>
          <tr><th></th><th>총 기장</th><th>허리단면</th><th>힙단면</th></tr>
          </thead>
          <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
          <tr><th>{{p.unit}}</th><td>{{p.totalLength}}</td><td>{{p.hipSection}}</td></tr>
          </tbody>
        </table>
        <p class="notice">{{ sizeNotice }}</p>
      </template>

      <!-- 기본 fallback -->
      <template v-else>
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
      sizeNotice() {
        const type = this.product?.sizeData?.type;
        switch (type) {
          case 'bag':
            return '사이즈는 측정 기준에 따라 오차가 있을 수 있습니다.';
          case 'outer':
            return '사이즈는 상품별로 약간의 편차가 있을 수 있습니다.';
          case 'bottom':
            return '참고: 위 치수는 유사 제품의 평균적인 수치를 기반으로 한 추정치이며, 실제 제품과 차이가 있을 수 있습니다.';
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
    }
  };
</script>