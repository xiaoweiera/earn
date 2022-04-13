<script lang="ts" setup>
/**
 * @file 文字展示
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import { uuid } from "src/utils/";
import { asyncLoad } from "src/plugins/lazyload/";

defineProps({
  // 显示几行，默认三行
  line: {
    type: Number,
    default: 3,
  },
  // 行高, 默认20
  lineHeight: {
    type: String,
    default: "20px",
  },
  // 更多内容是否以弹窗方式展示
  dialog: {
    type: Boolean,
    default: false,
  },
});

const DialogMore = asyncLoad(() => import("./more.vue"));

const id = ref<string>(`desc-${uuid()}`);
</script>

<template>
  <div :style="`--desc-line: ${line}; --desc-line-height: ${lineHeight};`" class="ui-description">
    <input v-if="!dialog" :id="id" :name="id" class="hidden" type="checkbox" />
    <div class="content relative overflow-hidden">
      <!--描述内容-->
      <div>
        <slot></slot>
      </div>
      <div class="view-all absolute left-0 right-0 flex items-center bg-white z-2">
        <!--弹窗形式展开更多内容-->
        <dialog-more v-if="dialog">
          <template #content>
            <slot></slot>
          </template>
          <div>
            <slot name="button">
              <span class="text-global-darkblue cursor-pointer text-14-18">View all</span>
            </slot>
          </div>
        </dialog-more>
        <!--直接展开更多内容-->
        <label v-else :for="id">
          <slot name="button">
            <span class="text-global-darkblue cursor-pointer text-14-18">View all</span>
          </slot>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%virtual-shadow {
  @apply z-100;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.0716618) 0%, rgba(255, 255, 255, 0) 12.78%, #ffffff 100%);
}

/*
.view-all {
  &:before {
    content: "";
    @extend %virtual-shadow;
    @apply block absolute left-0 right-0 bottom-full h-3;
  }
}
*/

.content {
  max-height: calc((var(--desc-line) + 1) * var(--desc-line-height));
  line-height: var(--desc-line-height);

  .view-all {
    top: calc(var(--desc-line) * var(--desc-line-height));
    height: var(--desc-line-height);
  }
}

input {
  &:checked + .content {
    max-height: initial;
    overflow: initial;

    .view-all {
      @apply hidden;
    }
  }
}
</style>
