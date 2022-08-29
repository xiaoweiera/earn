<script lang="ts" setup>
import {computed} from "vue";
import {isObject, isHttp} from "src/utils";
import {createHref} from "src/plugins/router/pack";

const props = defineProps({
  desc: {
    type: String,
    default: "",
  },
  href: {
    type: [String, Object],
    default: "",
  },
  // 能否直接点击
  click: {
    type: Boolean,
    default: false
  }
});

const url = computed(() => {
  if (props.href) {
    if (isObject(props.href) || isHttp(props.href as string)) {
      return props.href;
    }
  }
  return "";
});
</script>

<template>
  <ui-hover placement="top">
    <template #label>
      <div class="flex cursor-pointer">
        <template v-if="url">
          <v-router v-if="click" :href="url" class="flex" target="_blank">
            <slot/>
          </v-router>
          <template v-else>
            <v-router :href="url" class="flex md:hidden" target="_blank">
              <slot/>
            </v-router>
            <div class="hidden md:flex">
              <slot/>
            </div>
          </template>
        </template>
        <template v-else>
          <slot/>
        </template>
      </div>
    </template>
    <template #content>
      <div class="p-2">
        <div class="text-center">
          <div class="flex">
            <ui-qrcode :value="createHref(href)" height="90" href width="90"/>
          </div>
        </div>
        <slot name="desc">
          <div class="pt-1 text-center whitespace-nowrap">
            <span class="text-xs text-global-highTitle text-opacity-85">{{ desc }}</span>
          </div>
        </slot>
      </div>
    </template>
  </ui-hover>
</template>
