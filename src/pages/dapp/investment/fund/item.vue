<script lang="ts" setup>
const num = 17;
const getLeft = function () {
  if(num > 12){
    return "-ml-1.25"
  }else {
    return "ml-1"
  }
}
</script>

<template>
  <div>
    <div class="min-h-75 p-1.5 bg-global-white border-1 border-global-highTitle border-opacity-6 rounded-md">
      <!-- logo -->
      <div class="w-full mt-3">
        <div class="w-24 h-24 mx-auto">
          <div class="w-full h-full border-1 border-global-highTitle border-opacity-6 rounded-xl">
            <ui-image class="w-full h-full rounded-xl" fit="cover" src="https://jsdata-web.kingdata.xyz/media/Rarity/Gallery/237561404597baaab7378b83fd3152e1.png"></ui-image>
          </div>
        </div>
      </div>
      <!-- name -->
      <div class="w-full mt-1.5">
        <p class="w-full text-center">
          <span class="text-kd24px28px text-global-highTitle font-kdBarlow">Drunk Robots</span>
        </p>
      </div>
      <!-- 总数 -->
      <div class="w-full mt-2">
        <p class="w-full text-center">
          <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">Total:</span>
          <span class="mx-1 text-kd20px20px text-global-highTitle text-opacity-85 font-semibold font-kdBarlow">24</span>
          <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">investors</span>
        </p>
      </div>
      <!-- 参与logo -->
      <div class="w-full mt-2 px-1.5">
        <div class="w-full py-2 border-t-1 border-b-1 border-global-highTitle border-opacity-6 flex">
          <div class="flex-1 flex justify-center">
            <p :class="getLeft()" class="w-6 h-6 border-2 border-global-white box-content rounded-full" v-for="item in num-3" :key="item">
              <ui-image class="w-full h-full" rounded fit="cover" src="https://jsdata-web.kingdata.xyz/media/DeFi/NFT/a808e7d0c37f22b86ceef3abaa0f5161"></ui-image>
            </p>
          </div>
          <p class="flex items-center">
            <span class="text-kd16px20px text-global-darkblue font-kdBarlow font-medium">+24</span>
          </p>
        </div>
      </div>
      <!-- 更多 -->
      <div class="w-full mt-2">
        <p class="w-full h-11 bg-global-orange rounded-md flex items-center justify-center">
          <span class="text-kd16px22px text-global-white font-medium font-kdFang">Learn More</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>