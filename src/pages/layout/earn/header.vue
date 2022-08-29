<script setup>

</script>
<template>
  <div>
    <div class="h-15 px-6 flex justify-between">
      <div class="flex items-center">
        <img class="h-6.5" src="./public/images/earn/logo.png">
        <v-router href="https:www.baidu.com" class="navItem ml-8" target="_blank">Followed</v-router>
        <v-router href="https:www.baidu.com" class="navItem ml-8" target="_blank">CopyAccounts</v-router>
      </div>
      <div class="flex items-center">
        <span class="navItem hand">CN</span>
        <div class="border-right"/>
        <span class="navItem">APP</span>
        <div class="border-right"/>
        <div class="connect">
          <img class="h-4 w-4 mr-1" src="./public/images/earn/wallet.png">
          <div class="navItem hand">Connect</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.border-right{
  border-right:1px solid rgba(255, 255, 255, 0.2);
  @apply mx-4 w-1 h-3;
}
.layout{
  background-image: url("./public/images/earn/bg.png");
  background-size: 100% 800px;
  background-repeat: no-repeat;
}
.navItem{
  font-family: huawei-medium;
  @apply text-kd14px22px text-global-hui01;
}
.connect{
  @apply px-2.5 h-8 rounded-kd4px bg-global-lan04 flex items-center;
}
</style>