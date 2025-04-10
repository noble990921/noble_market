<template>
  <div class="best_items">
    <div class="item_box">
      <div @click="$router.push(`/wallet/detail/${i.id}`)" class="item" v-for="i in bestSellItem" :key="i.id">
        <img :src="i.img">
        <p class="name">{{i.name}}</p>
        <p class="price">{{i.price | formatNumber}}원</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ITEM from '../../constants/wallet_item'
  export default {
    name: "WalletBest",
    computed:{
      bestSellItem(){
        return this.ITEM.slice()
        .sort((a, b) => b.sellCount - a.sellCount)
        .slice(0, 4);
      }
    },
    data(){
      return{
        ITEM
      }
    }
  }
</script>