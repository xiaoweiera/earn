<script lang="ts" setup>
import { computed } from "vue";
import { isHttp } from "src/utils";

const props = defineProps({
  desc: {
    type: String,
  },
  href: {
    type: String,
  },
});

const url = computed<string>(() => {
  if (props.href && isHttp(props.href)) {
    return props.href;
  }
  return "";
});

</script>

<template>
  <ui-hover placement="top">
    <template #label>
      <div class="flex cursor-pointer">
        <template v-if="url">
          <v-router :href="url" class="flex md:hidden" target="_blank">
            <slot />
          </v-router>
          <div class="hidden md:flex">
            <slot />
          </div>
        </template>
        <template v-else>
          <slot />
        </template>
      </div>
    </template>
    <template #content>
      <div class="p-2">
        <div class="text-center">
          <div class="flex">
            <ui-qrcode :value="href" height="90" href width="90" />
          </div>
        </div>
        <div class="pt-1 text-center whitespace-nowrap">
          <span class="text-xs text-global-highTitle text-opacity-85">{{ desc }}</span>
        </div>
      </div>
    </template>
  </ui-hover>
</template>
