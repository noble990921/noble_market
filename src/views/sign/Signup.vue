<template>
  <div id="Signup">
    <div class="signup_view">
      <div class="signup_view_box">
        <p class="title">회원가입</p>
        <div class="progress">
          <p :class="{active : component =='Term' }">1.약관동의</p><i class="el-icon-arrow-right"></i>
          <p :class="{active : component =='Form' }">2.정보입력</p><i class="el-icon-arrow-right"></i>
          <p :class="{active : component =='Comp' }">3.가입완료</p><i class="el-icon-arrow-right"></i>
        </div>
        <component :is="component" @changeComp="changeComp"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import Term from './signup/Term'
  import Form from './signup/Form'
  import Comp from './signup/Comp'
  export default {
    name: "Signup",
    components: {
      Term, Form, Comp,
    },
    data(){
      return{
        component:'Term'
      }
    },
    methods:{
      changeComp(component){
        this.component =  component
      }
    }
  }
</script>
