<script setup lang="ts">
defineProps({
  width: {
    type: [Number, String],
    default: () => 200
  }
})
</script>

<template>
  <client-only class="ui-hover">
    <div class="relative">
      <slot name="label"></slot>
      <div class="ui-hover-content">
        <slot name="content"></slot>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.ui-hover {
  .ui-hover-content {
    @apply absolute left-1/2 bottom-full;
    @apply p-2 bg-white invisible overflow-hidden;
    @apply transform -translate-x-1/2 -translate-y-2;
    @apply rounded-md border border-solid border-global-border;
    max-height: 0;
    transition: all 1s linear;
  }
  &:hover {
    .ui-hover-content {
      @apply block visible;
      @apply z-1000;
      height: auto;
      max-height: 300px;
    }
  }
}
</style>
