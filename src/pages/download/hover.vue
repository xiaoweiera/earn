<script setup lang="ts">
const props = defineProps({
  desc: {
    type: String,
  },
});
</script>

<template>
  <ui-hover width="fit-content" placement="top">
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
        </div>
      </client-only>
    </template>
  </ui-hover>
  <div></div>
</template>
