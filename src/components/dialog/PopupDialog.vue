<template>
  <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="visible"
             class="ft-dialog-popup" :width="width" append-to-body v-show="true"
             :class="popup.type == 1 ? 'imgPopup' : 'textPopup'">
    <a v-if="popup.type == 1 && popup.link" :href="popup.link">
      <img class="popup-image" :src="popup.content" @load="imgLoad = true"/>
    </a>
    <img v-else-if="popup.type == 1 && !popup.link" class="popup-image" :src="popup.content" @load="imgLoad = true"/>
    <div class="popup-preview" v-else>
      <div class="popup-preview__header">
        <el-row>
          <el-col :span="24" class="header-txt">
            <p>{{popup.title}}</p>
          </el-col>
        </el-row>
      </div>
      <div v-html="popup.content" class="popup-preview__content"></div>
    </div>

    <template slot="footer">
      <div class="footer-btns">
        <div class="fl-left" v-if="!realTime">
          <a @click="close(true)">다시보지않기</a>
        </div>
        <el-button @click="close(false)" class="close-btn">닫기</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: "PopupDialog",
    props: {
      visible: Boolean,
      popup: Object,
      width: {
        type: String,
        default: '384px'
      },
      realTime: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imgLoad: false
      }
    },
    methods: {
      close(day) {
        if (day) {
          // 하루 동안 저장 (1일)
          this.$cookies.set(`Hide_BX_Popup_${this.popup.id}`, true, '1d');
        }
        this.$emit('update:visible', false);
      }
    },
    mounted() {
      console.log('popup:', this.popup);
    }
  }
</script>