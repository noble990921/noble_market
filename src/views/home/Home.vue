<template>
  <section id="homeView">
    <div class="page">
      <Section1/>
      <Section2/>
      <Section3/>
<!--      <Section4/>-->
      <Section5/>
<!--      <Section6/>-->
    </div>
  </section>
</template>

<script>
  import Section1 from "../../components/rending/section1";
  import Section2 from "../../components/rending/section2";
  import Section3 from "../../components/rending/section3";
//  import Section4 from "../../components/rending/section4";
  import Section5 from "../../components/rending/section5";
//  import Section6 from "../../components/rending/section6";

export default {
  name: 'HelloWorld',
  components:{
    Section1,Section2,Section3,
//    Section4,
    Section5,
//    Section6
  }
}
</script>