<template>
  <el-dialog title="SIZE GUIDE" :close-on-click-modal="false" :close-on-press-escape="false" :visible="visible"
             class="dialog-size" @close="handleClose">
   <div class="dialog_body">
     <img :src="product.sizeData.img">
     <table class="size_table" v-if="product.sizeData.type == 'bag'">
       <thead>
       <tr>
         <th>cm</th>
         <th>높이</th>
         <th>너비</th>
         <th>폭</th>
       </tr>
       </thead>
       <tbody v-for="(p,idx) in product.sizeData.size" :key="idx">
       <tr>
         <th>{{p.unit}}</th>
         <td>{{p.z}}</td>
         <td>{{p.x}}</td>
         <td>{{p.y}}</td>
       </tr>
       </tbody>
     </table>
   </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "sizeDialog",
    props:{
      visible: {
        type: Boolean
      },
//      width: {
//        type: String,
//        default: '800px'
//      },
      product:{
        type: Object
      }
    },
    methods:{
      handleClose() {
        this.$emit('update:visible', false)
      },
    }
  }
</script>