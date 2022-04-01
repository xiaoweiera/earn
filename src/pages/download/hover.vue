<script setup lang="ts">
const props = defineProps({
  desc: {
    type: String,
  },
  href: {
    type: String,
  },
});
</script>

<template>
  <ui-hover width="fit-content">
    <template #label>
      <span class="flex cursor-pointer">
        <span>
          <slot></slot>
        </span>
      </span>
    </template>
    <template #content>
      <client-only>
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
      </client-only>
    </template>
  </ui-hover>
</template>
