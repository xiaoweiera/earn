<script setup lang="ts">
import I18n from "src/utils/i18n";
import DappDiscoversCutdown from "../cutdown.vue";

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  status: {
    type: String,
    default: "",
  },
});
const i18n = I18n();
</script>
<template>
  <div v-if="data">
    <div class="w-full h-15.5 flex justify-between items-center">
      <div>
        <DappDiscoversCutdown :value="status === 'ongoing' ? data.ido_end_at : data.ido_start_at" />
      </div>
      <div>
        <div
          class="min-w-20 go-part border-1 border-global-darkblue rounded-md py-1.5 px-3 flex items-center justify-center"
        >
          <span class="text-kd14px18px text-global-darkblue font-medium">{{ i18n.home.idoIgoProject.join }}</span>
        </div>
      </div>
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
