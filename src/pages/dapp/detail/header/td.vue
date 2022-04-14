<template>
  <div class="td-item w-1/2 flex-1 p-4 last:pr-0 border-solid border-global-highTitle border-opacity-6">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.td-item {
  @apply relative border-b min-w-1/2;

  &:before {
    content: "";
    @apply absolute;
    @apply w-px;
    @apply top-4 bottom-4 left-0;
    @apply bg-global-highTitle bg-opacity-6;
  }

  &:first-child {
    @apply pl-0;
  }

  &:first-child,
  &:nth-child(3) {
    &:before {
      content: none;
    }
  }

  @screen md {
    width: initial;
    min-width: initial;
    &:nth-child(3) {
      &:before {
        content: "";
      }
    }
  }
}
</style>
