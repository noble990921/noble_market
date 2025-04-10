<template>
  <div id="CartView">
    <div class="cart_view_container">
      <div class="cart_view_box">
        <p class="title">장바구니</p>
        <div class="progress">
          <p :class="{active : component =='Cart' }">1.장바구니</p><i class="el-icon-arrow-right"></i>
          <p :class="{active : component =='CartForm' }">2.주문서작성</p><i class="el-icon-arrow-right"></i>
          <p :class="{active : component =='CartComp' }">3.주문완료</p><i class="el-icon-arrow-right"></i>
        </div>
        <component :is="component" @changeComp="changeComp"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import Cart from '../cart/Cart'
  import CartForm from '../cart/CartForm'
  import CartComp from '../cart/CartComp'
  export default {
    name: "Cart_View",
    components: {
      Cart, CartForm, CartComp,
    },
    data(){
      return{
        component:'Cart'
      }
    },
    methods:{
      changeComp(component){
        this.component =  component
      }
    }
  }
</script>
