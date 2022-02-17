<script setup lang="ts">
import DappNftsCutdown from './cutdown.vue'
</script>
<template>
  <div>
    <div class="w-full h-13 flex justify-between items-center">
      <div>
        <DappNftsCutdown></DappNftsCutdown>
      </div>
      <v-router target="_blank">
        <div class="w-20 h-7 bg-global-darkblue md:bg-global-white md:bg-opacity-0 gopart md:border-1 border-global-white border-opacity-45 rounded-md py-1.5 px-3 flex items-center justify-center">
          <span class="text-kd14px18px text-global-white font-medium font-kdFang">Mint</span>
        </div>
      </v-router>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.go-part {
  &:hover {
    @apply bg-global-darkblue;
    span {
      @apply text-global-white;
    }
  }
}
</style>