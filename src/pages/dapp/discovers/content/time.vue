<script setup lang="ts">
import DappDiscoversCutdown from '../cutdown.vue'
</script>
<template>
  <div>
    <div class="w-full h-15.5 flex justify-between items-center">
      <div class="flex-1">
        <DappDiscoversCutdown></DappDiscoversCutdown>
      </div>
      <v-router target="_blank" class="ml-6.5">
        <div class="w-20 go-part border-1 border-global-darkblue rounded-md py-1.5 px-3 flex items-center justify-center">
          <span class="text-kd14px18px text-global-darkblue">去参与</span>
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