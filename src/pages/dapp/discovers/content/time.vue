<script setup lang="ts">
import DappDiscoversCutdown from '../cutdown.vue'
import I18n from "src/utils/i18n";

defineProps({
  data: {
    type: Object,
  },
  status: {
    type: String,
  }
})
const i18n = I18n();
</script>
<template>
  <div v-if="data">
    <div class="w-full h-15.5 flex justify-between items-center">
      <div>
        <DappDiscoversCutdown :value="status === 'ongoing' ? data.ido_end_at : data.ido_start_at"></DappDiscoversCutdown>
      </div>
      <v-router target="_blank" :href='data.url'>
        <div class="min-w-20 go-part border-1 border-global-darkblue rounded-md py-1.5 px-3 flex items-center justify-center">
          <span class="text-kd14px18px text-global-darkblue font-medium">{{ i18n.home.idoIgoProject.join }}</span>
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