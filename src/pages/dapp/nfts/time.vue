<script lang="ts" setup>
import I18n from "src/utils/i18n";
import DAppNftCutDown from "./cutdown.vue";

defineProps({
  value: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const i18n = I18n();
</script>
<template>
  <div>
    <div class="w-full h-13 flex justify-between items-center">
      <div class="min-w-22.5 mr-1.25">
        <DAppNftCutDown :value="value.mint_start_at" />
      </div>
      <div>
        <div
          class="w-18 h-6 bg-global-darkblue md:bg-global-white md:bg-opacity-0 go-part md:border-1 border-global-white border-opacity-45 rounded-md py-1.5 px-3 flex items-center justify-center"
        >
          <span class="text-kd12px16px text-global-white font-medium font-kdFang">{{ i18n.home.nftProject.mint }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.go-part {
  &:hover {
    @apply bg-global-darkblue border-global-darkblue;
    span {
      @apply text-global-white;
    }
  }
}
</style>
