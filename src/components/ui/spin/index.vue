<script lang="ts" setup>
defineProps({
  /* 控制 loading 显示与隐藏 */
  loading: {
    type: Boolean,
    default() {
      return false;
    },
  },
  /* 是否全屏居中显示，默认为 true */
  fit: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
</script>

<template>
  <div :class="{ fit: fit }" class="ui-spin">
    <slot />
    <div v-show="loading" class="loading-icon left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <IconFont size="40" type="loading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-spin {
  &.fit {
    .loading-icon {
      @apply fixed z-9999;
    }
  }

  &:not(.fit) {
    @apply relative;
    .loading-icon {
      @apply absolute;
    }
  }
}
</style>
