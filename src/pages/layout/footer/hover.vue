<script setup lang="ts">
import { computed } from "vue"
import { isHttp } from '~/utils'

const props = defineProps({
  desc: {
    type: String
  },
  href: {
    type: String
  },
})

const url = computed<string>(function() {
  if (props.href && isHttp(props.href)) {
    return props.href
  }
  return ''
})

</script>

<template>
  <ui-hover>
    <template #label>
      <div class="flex cursor-pointer ">
        <v-router class="flex md:hidden" :href="url" target="_blank">
          <slot></slot>
        </v-router>
        <div class="hidden md:flex">
          <slot></slot>
        </div>
      </div>
    </template>
    <template #content>
      <div class="text-center">
        <div class="flex">
          <ui-qrcode width="90" height="90" href :value="href"></ui-qrcode>
        </div>
      </div>
      <div class="pt-1 text-center whitespace-nowrap">
        <span class="text-xs text-global-highTitle text-opacity-85">{{ desc }}</span>
      </div>
    </template>
  </ui-hover>
</template>


