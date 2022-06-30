<script setup lang="ts">
defineProps({
  placement: {
    type: String,
    default() {
      return "top";
    },
  },
});
</script>

<template>
  <div class="relative ui-popover z-100">
    <div class="cursor-pointer">
      <slot name="reference" />
    </div>
    <div class="text-global-default z-11 relative whitespace-pre-wrap placement-box text-xs" :class="`placement-${placement}`">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-popover {
  &:hover {
    .placement-box {
      display: block;
    }
  }
}
.placement-box {
  position: absolute;
  left: 30%;
  margin-top: 5px;
  background: #fff;
  border-radius: 6px;
  display: none;
  width: fit-content;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.placement-top {
  bottom: 100%;
  transform: translate(-50%, -14px);
  &:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    left: 50%;
    top: 100%;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #fff;
    transform: translateX(-50%);
  }
}
</style>
