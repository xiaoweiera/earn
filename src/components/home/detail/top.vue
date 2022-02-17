<script setup lang="ts">

</script>
<template>
  <div class="w-full bg h-37.5 p-3 font-kdFang">
    <div class="flex">
      <IconFont size="16" type="icon-hot"/>
      <span class="ml-1.5 text-kd14px18px font-medium font-kdFang text-global-highTitle">Tag Top 3</span>
    </div>
    <template v-for="item in [1,2,3]">
      <div class="flex items-center justify-between mt-3 h-6">
        <div class="flex items-center">
          <IconFont size="24" type="icon-HECOYuan"/>
          <span class="text-kd14px18px ml-1.5 font-medium text-global-highTitle text-opacity-85">Alpaca</span>
          <span class="text-kd12px16px ml-1.5 text-global-highTitle text-opacity-45">HLS</span>
        </div>
        <div class="flex items-center">
          <IconFont size="16" type="icon-star"/>
          <span class="ml-1 text-kd14px16px text-number text-global-highTitle">9.8</span>
        </div>
      </div>

    </template>
  </div>
</template>
<style scoped lang="scss">
.bg{
  background: #FAFBFC;
}

</style>