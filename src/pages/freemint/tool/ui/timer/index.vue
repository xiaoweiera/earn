<script setup lang="ts">
/**
 * 定时 Mint
 */
import { ref } from "vue";
import { ElInput, ElSwitch, ElDatePicker } from "element-plus";
const sendNumber = ref(""); //发送数量
const sendInterval = ref(""); //发送键哥
const beginTime = ref(""); //开始时间
const endTime = ref(""); //结束时间
const timerTime = ref(""); //定时时间
const isHot = ref(false); //狂热模式
const isBurning = ref(false); //烧块定时
const isBegin = ref(false); //定时启动
</script>
<template>
  <div class="border-css kd-input">
    <div>
      <div class="flex items-center">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/time.png" />
        <span class="title">定时 Mint</span>
      </div>
      <div class="des mt-1.5">定时为本地操作,请不要关闭网页或关闭电脑</div>
    </div>
    <!--    狂暴模式-->
    <div class="item">
      <div class="state mr-6">
        <div class="txt mr-2">狂暴模式</div>
        <el-switch v-model="isHot" width="34"></el-switch>
      </div>
      <div class="state mr-6">
        <div class="item-des mr-1.5">发送数量</div>
        <el-input v-model="sendNumber" class="timer-info" placeholder="" autocomplete="off" />
      </div>
      <div class="state mr-6">
        <div class="item-des mr-1.5">发送间隔</div>
        <el-input v-model="sendInterval" class="timer-info" placeholder="" autocomplete="off" />
      </div>
    </div>
    <!--    烧块定时-->
    <div class="item">
      <div class="state mr-6">
        <div class="txt mr-2">烧块定时</div>
        <el-switch v-model="isBurning" width="34"></el-switch>
      </div>
      <div class="state mr-6">
        <div class="item-des mr-1.5">开始时间</div>
        <el-date-picker v-model="beginTime" class="timer-info" type="datetime" placeholder="选择开始时间"></el-date-picker>
      </div>
      <div class="state mr-6">
        <div class="item-des mr-1.5">结束时间</div>
        <el-date-picker v-model="endTime" class="timer-info" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </div>
    </div>
    <!--    定时启动-->
    <div class="item">
      <div class="state mr-6">
        <div class="txt mr-2">定时启动</div>
        <el-switch v-model="isBegin" width="34"></el-switch>
      </div>
      <div class="state mr-6 w-full">
        <div class="item-des mr-1.5">开始时间</div>
        <el-date-picker v-model="timerTime" class="flex-1" type="datetime" placeholder="选择开始时间"></el-date-picker>
      </div>
      <!--      class: ok - no - stop-->
      <div class="ok">启动定时</div>
    </div>
    <!--    区块高度-->
    <div class="state mt-4.5">
      <div class="text-kd12px16px text-global-black-desc">开始区块高度：</div>
      <span class="text-kd14px18px text-global-primary font-medium">#23193912319</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.state {
  @apply flex items-center;
}
::v-deep(.el-date-editor) {
  @apply w-63.25;
}
.timer-info {
  @apply w-63.25;
}
.title {
  @apply text-kd14px18px font-medium text-global-black-title;
}
.des {
  @apply text-kd12px16px text-global-text-grey;
}
.item-des {
  @apply text-kd13px18px text-global-black-desc whitespace-nowrap;
}
.txt {
  @apply text-kd12px16px text-global-black-title whitespace-nowrap;
}
.item {
  @apply flex items-center mt-4;
}
::v-deep(.el-switch__core) {
  @apply h-4.5;
}
::v-deep(.el-switch__action) {
  @apply w-3.5 h-3.5;
}
.button-css {
  @apply h-8 px-3 text-kd14px18px font-medium rounded-kd4px;
  @apply flex items-center flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
.ok {
  @extend .button-css;
  @apply bg-global-primary bg-opacity-6 text-global-primary;
}
.no {
  @extend .button-css;
  @apply bg-global-highTitle bg-opacity-6 text-global-highTitle text-opacity-45;
}
.stop {
  @extend .button-css;
  @apply bg-global-red text-global-white;
}
</style>
