<script setup lang="ts">
import { defineProps, computed } from "vue"
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
  <UiHover width="fit-content">
    <template #label>
      <span class="flex cursor-pointer">
        <span>
          <slot></slot>
        </span>
      </span>
    </template>
    <template #content>
      <client-only>
        <div class="text-center">
          <div class="inline-block">
            <UiQrcode width="90" height="90" href :value="href"></UiQrcode>
          </div>
        </div>
        <div class="pt-1 text-center whitespace-nowrap">
          <span class="text-xs text-global-highTitle text-opacity-85">{{ desc }}</span>
        </div>
      </client-only>
    </template>
  </UiHover>
</template>


