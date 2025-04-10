<template>
  <section id="section5">
    <div class="s5_container">
      <div class="best_item">
        <p class="title">BEST! SELLER</p>
        <p class="sub_text">베스트 셀러를 만나보세요</p>
        <div class="best_menu">
          <ul>
            <li @click="category = b.name"
                v-for="b in BESTMENU" :key="b.id"
                :class="{active:category==b.name}"
              >
              {{b.name}}
            </li>
          </ul>
        </div>
        <component :is="category"></component>
      </div>
    </div>
  </section>
</template>

<script>
  const BESTMENU  = [
    {
      id:'1',
      name:'Top'
    },{
      id:'2',
      name:'Bag'
    },{
      id:'3',
      name:'Shoes'
    },{
      id:'4',
      name:'Wallet'
    },{
      id:'5',
      name:'Watch'
    },{
      id:'6',
      name:'Acc'
    }
  ]
  import Top from '../bestSeller/TopBest'
  import Bag from '../bestSeller/BagBest'
  import Shoes from '../bestSeller/ShoesBest'
  import Wallet from '../bestSeller/WalletBest'
  import Watch from '../bestSeller/WatchBest'
  import Acc from '../bestSeller/AccBest'

  export default {
    name: "section5",
    components:{
      Top,Bag,Shoes,Wallet,Watch,Acc
    },
    data(){
      return{
        BESTMENU,
        category:'Top'
      }
    }
  }
</script>
