<script setup lang="ts">
/**
 * @file 文字展示
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import { uuid } from "src/utils/";

const id = ref<string>(`desc-${uuid()}`);
</script>

<template>
  <div>
    <input :id="id" type="checkbox" :name="id" class="hidden" />
    <div class="description">
      <div>
        <slot></slot>
      </div>
      <div class="view-all">
        <label :for="id">
          <slot name="button">
            <span class="text-global-darkblue cursor-pointer">View all</span>
          </slot>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.description {
  max-height: 80px;
  overflow: hidden;
  position: relative;
  .view-all {
    position: absolute;
    left: 0;
    top: 61px;
    right: 0;
    background: #fff;
    height: 20px;
    font-size: 20px;
  }
}

input {
  &:checked + .description {
    max-height: initial;
    overflow: initial;
    .view-all {
      @apply hidden;
    }
  }
}
</style>
