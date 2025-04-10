<template>
  <div id="CartView">
    <div class="cart_view_container">
      <div class="cart_view_box">
        <div class="progress">
          <p :class="{active : component =='DirectForm' }">1.주문서작성</p><i class="el-icon-arrow-right"></i>
          <p :class="{active : component =='DirectComp' }">2.주문완료</p>
        </div>
        <component :is="component" @changeComp="changeComp"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import DirectForm from '../../cart/direct/DirectForm'
  import DirectComp from '../../cart/direct/DirectComp'
  export default {
    name: "Direct_View",
    components: {
      DirectForm, DirectComp,
    },
    data(){
      return{
        component:'DirectForm'
      }
    },
    methods:{
      changeComp(component){
        this.component =  component
      }
    }
  }
</script>
