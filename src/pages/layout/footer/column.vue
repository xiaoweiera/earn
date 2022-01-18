<script setup lang="ts">
import {PropType, computed} from "vue";
import { Footer } from "src/config/footer";
import { Target } from "src/plugins/router/props";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    required: true,
    type: Object as PropType<Footer>,
  }
});

const id = computed<string>(function () {
  return `footer-column-${props.index}`;
})

</script>
<template>
  <div>
    <div class="menu-label hidden lg:block">
      <span class="text-18">{{ data.label }}</span>
    </div>
    <input class="menu-active hidden" :id="id" type="checkbox" :name="id">
    <label class="menu-label cursor-pointer block lg:hidden" :for="id">
    <span class="select-none w-full flex justify-between items-center">
      <span class="text-base">{{ data.label }}</span>
      <IconFont class="arrow" type="icon-arrow-down" size="16"/>
    </span>
    </label>
    <div class="pt-3 lg:pt-6 menu-content">
      <template v-for="(item, idx) in data.children" :key="idx">
        <!-- 带图标 -->
        <div v-if="item.icon" class="menu-item">
          <span class="text-14-18 block">{{ item.name }}</span>
          <v-router :href="item.href" :target="item.blank ? Target.blank: Target.self"  class="flex items-center text-global-primary mt-0.5">
            <IconFont :type="item.icon"/>
            <span class="ml-1.5">{{ item.value }}</span>
          </v-router>
        </div>

        <v-router v-else-if="item.href" class="menu-item text-14-18 hover:text-global-primary" :href="item.href" :target="item.blank ? '_blank': ''">{{ item.name }}</v-router>

        <div v-else-if="item.qrcode" class="menu-item">
          <!--                    <UiFooterHover :href="item.qrcode" :desc="item.desc" :router="false">-->
          <!--                      <span class="text-14-18">{{ item.name }}</span>-->
          <!--                    </UiFooterHover>-->
        </div>
        <span v-else class="menu-item text-14-18">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-label {
  @apply text-global-highTitle font-medium;
  .arrow {
    @apply flex;
    transition: all 0.3s;
  }
}

.menu-content {
  @apply hidden lg:block;

  .menu-item {
    @apply mb-3 lg:mb-4 block;
    &:last-child {
      @apply mb-0;
    }
  }

}
.menu-active {
  &:checked {
    & ~ .menu-label {
      .arrow {
        transform: rotate(180deg);
      }
    }
    & ~ .menu-content {
      @apply block;
    }
  }
}
</style>
