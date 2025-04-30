<template>
  <section id="homeView">
    <div class="page">
      <Section1/>
      <Section7/>
      <Section2/>
      <Section3/>
      <Section8/>
<!--      <Section4/>-->
<!--      <Section5/>-->
<!--      <Section6/>-->
    </div>
  </section>
</template>

<script>
  import Section1 from "../../components/rending/section1";
  import Section2 from "../../components/rending/section2";
  import Section3 from "../../components/rending/section3";
//  import Section4 from "../../components/rending/section4";
//  import Section5 from "../../components/rending/section5";
//  import Section6 from "../../components/rending/section6";
  import Section7 from "../../components/rending/section7";
  import Section8 from "../../components/rending/section8";

export default {
  name: 'HelloWorld',
  components:{
    Section1,Section2,Section3,
//    Section4,
//    Section5,
    Section7,
    Section8
//    Section6
  }
}
</script>