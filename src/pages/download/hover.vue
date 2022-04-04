<script lang="ts" setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <ui-hover placement="top" width="fit-content">
    <template #label>
      <slot></slot>
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
