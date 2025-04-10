<template>
  <div id="Term">
    <el-checkbox class="allCheckBox" v-model="allChecked" @change="toggleAll">
      <p>모든 약관을 확인하고 전체 동의합니다.</p>
      <p class="sub">(전체 동의는 필수 및 선택 정보에 대한 동의가 포함되어 있습니다.)</p>
    </el-checkbox>
    <el-checkbox v-model="checks[0]" @change="updateAllChecked">
      <div class="checkbox_text" @click="preventCheck">
        <p>이용약관 동의 (필수)</p>
        <i @click="toggleArrowIcon(0)" class="el-icon-arrow-down" v-if="!arrowStates[0]"></i>
        <i @click="toggleArrowIcon(0)" class="el-icon-arrow-up" v-else></i>
      </div>
    </el-checkbox>
    <div class="terms-box" v-html="STATIC_TERMS" v-if="arrowStates[0]"></div>
    <el-checkbox v-model="checks[1]" @change="updateAllChecked">
      <div class="checkbox_text" @click="preventCheck">
        <p>개인정보 수집 및 이용 동의 (필수)</p>
        <i @click="toggleArrowIcon(1)" class="el-icon-arrow-down" v-if="!arrowStates[1]"></i>
        <i @click="toggleArrowIcon(1)" class="el-icon-arrow-up" v-else></i>
      </div>
    </el-checkbox>
    <div class="terms-box" v-html="STATIC_PRIVACY" v-if="arrowStates[1]"></div>
    <el-checkbox v-model="checks[2]" @change="updateAllChecked">
      <div class="checkbox_text" @click="preventCheck">
        <p>쇼핑정보 수신 동의 (선택)</p>
        <i @click="toggleArrowIcon(2)" class="el-icon-arrow-down" v-if="!arrowStates[2]"></i>
        <i @click="toggleArrowIcon(2)" class="el-icon-arrow-up" v-else></i>
      </div>
<!--      <div class="sub_checkbox">-->
<!--        <el-checkbox>-->
<!--          <p>SMS 수신 동의 (선택)</p>-->
<!--        </el-checkbox>-->
<!--        <el-checkbox>-->
<!--          <p>이메일 수신 동의 (선택)</p>-->
<!--        </el-checkbox>-->
<!--      </div>-->
    </el-checkbox>
    <div class="terms-box" v-html="STATIC_INFORMATION" v-if="arrowStates[2]"></div>
    <div class="btn_box">
      <button @click="$router.push('/')">취소</button>
      <button @click="submit">가입하기</button>
    </div>
  </div>
</template>

<script>
  import {STATIC_PRIVACY, STATIC_TERMS, STATIC_INFORMATION} from '../../../constants/terms'
  export default {
    name: "Term",
    data() {
      return {
        STATIC_TERMS, STATIC_PRIVACY,STATIC_INFORMATION,
        arrowStates: [false, false, false],
        allChecked:false,
        checks:[false,false,false]
      };
    },
    methods: {
      toggleArrowIcon(index) {
        this.$set(this.arrowStates, index, !this.arrowStates[index]);
      },
      preventCheck(event) {
        event.stopPropagation();
        event.preventDefault();
      },
      toggleAll(){
        const vm = this
        const newStatae =  vm.allChecked
        vm.checks = vm.checks.map(()=> newStatae)
      },
      updateAllChecked() {
        this.allChecked = this.checks.every((checked) => checked);
      },
      submit(){
        const vm = this
        if (vm.allChecked || vm.checks[0] && vm.checks[1]){
          vm.$emit('changeComp', 'Form');
        }else {
          if (!vm.checks[0] && !vm.checks[1]) {
             vm.$alert('약관 필수항목에 대해 동의선택을 해주시기 바랍니다.', '알림')
          } else if (vm.checks[0]) {
             vm.$alert('개인정보 수집 및 이용에 동의해주시기 바랍니다.', '알림')
          } else if (vm.checks[1]) {
             vm.$alert('이용약관 동의를 동의해주시기 바랍니다.', '알림')
          }
        }
      }
    },
  };
</script>
