<template>
  <section id="section9">
    <div class="s2_container">
      <div class="hot_item">
        <p class="title">CELEB PICK</p>
        <p class="sub_text">셀럽 픽</p>
        <div class="item_box" >
              <div class="item" @click="goToProduct(product)" v-for="product in displayProducts" :key="product.id">
                <img :src="product.thumbnail" :alt="product.name">
                <div class="info_box">
                  <p class="brand_name">{{ product.brand }}</p>
                  <p class="name">{{ product.name }}</p>
                </div>
              </div>
        </div>
<!--        <div class="btn_box">-->
<!--          <button @click="viewMore">더보기</button>-->
<!--        </div>-->
      </div>
    </div>
  </section>
</template>

<script>
  import {CELEB_PICKS} from '@/constants/celebPick'
  import {PRODUCTS as BAG_PRODUCTS} from '@/data/products/bag'

  export default {
    name: "section9",
    components: {
    },
    data() {
      return {
        mobileVersion: '',
        swiperKey: 0,
        currentSwiperOption: {},
        showAll: false
      }
    },
    computed: {
      celebProducts() {
        return CELEB_PICKS.bags.map(id => {
          const product = BAG_PRODUCTS[id]
          if (!product) return null
          return {
            id: product.id,
            name: product.name,
            brand: product.brand,
            thumbnail: product.celebImg || product.mainImg[0],
            category: 'bag'
          }
        }).filter(p => p !== null)
      },
      displayProducts() {
        const vm = this
        if (vm.showAll) {
          return vm.celebProducts
        }
        // 랜덤 6개 선택
        return vm.celebProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
      }
    },
    methods: {

      goToProduct(product) {
        const vm = this
        vm.$router.push(`/${product.category}/detail/${product.id}`)
      },
      viewMore() {
      }
    },
    mounted() {

    },
  }
</script>