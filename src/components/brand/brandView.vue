<template>
  <div class="product_brand" :id="`${brand}_View`">
    <h1>{{ brand }} 브랜드 페이지</h1>
  </div>
</template>

<script>
  export default {
    name: "brandView",
    props: {
      brand: {
        type: String,
        required: true
      }
    },
    created() {
      console.log('넘어온 브랜드 이름:', this.brand);
    }
  }
</script>