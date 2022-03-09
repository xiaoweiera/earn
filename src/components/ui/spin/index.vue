<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default() {
      return false;
    },
  },
  fit: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
</script>

<template>
  <div class="spin">
    <slot />
    <span v-show="loading" class="loading-icon" :class="{'fit': fit}">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@keyframes loading-rotate{
  to{
    transform:rotate(1turn);
  }
}

@keyframes loading-dash{
  0%{
    stroke-dasharray: 1, 200;
    stroke-dashoffset:0;
  }
  50%{
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px
  }
  to{
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

.loading-icon {
  &.fit {
    @apply fixed;
  }
  &:not(.fit) {
    @apply absolute;
  }
  @apply left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2;
  @apply z-100;
  .circular {
    height: 42px;
    width: 42px;
    @apply text-global-primary;
    animation: loading-rotate 2s linear infinite;
  }
  .path {
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #409eff;
    stroke-linecap: round;
    animation: loading-dash 1.5s ease-in-out infinite;
  }
}
</style>
