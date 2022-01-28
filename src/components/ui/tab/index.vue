<script setup lang="ts">
/**
 * @file tab 组件
 * @author svon.me@gmail.com
 */

import {useRoute} from "vue-router";
import { toInteger } from "src/utils";
import DBList from "@fengqiaogang/dblist";
import safeSet from "@fengqiaogang/safe-set";
import safeGet from "@fengqiaogang/safe-get";
import {Item, makeLink, Trigger} from "src/logic/ui/tab";
import {defineEmits, onMounted, PropType, ref, toRaw, watch} from "vue";

const $router = useRoute();
const active = ref<string | number>("");
const emitEvent = defineEmits(['change'])

const props = defineProps({
  /**
   * 设置路由根据那个字段来匹配
   * @description /xxx/xx?[activeName]=[id]
   * @description /xxx/xx?tab=[id] // 默认效果
   */
  activeName: {
    type: String,
    default: () => "type",
  },
  def: {
    type: String
  },
  list: {
    required: true,
    default: () => [],
    type: Array as PropType<Item[]>,
  },
  trigger: {
    type: String as PropType<Trigger>,
    default: () => Trigger.router,
  }
});

const getActiveValue = function () {
  let item: Item | undefined = void 0;
  const db = new DBList([], 'id');
  db.insert(props.list);
  const value = safeGet<string>(toRaw($router.query), props.activeName);
  if (value) {
    if (/^[0-9]+$/.test(value)) {
      item = db.selectOne<Item>({
        id: [toInteger(value), value]
      });
    } else {
      item = db.selectOne<Item>({ id: value });
    }
  }
  // 如果未能匹配选中的数据
  if (!item) {
    if (props.def) {
      return props.def;
    }
    // 默认为第一个 tab
    const [first] = db.clone<Item>();
    if (first) {
      item = first;
    }
  }
  if (item) {
    return item.id;
  }
}

const onChange = function (value = getActiveValue()) {
  if (value && active.value !== value) {
    active.value = value;
    const data = {};
    safeSet(data, props.activeName, value);
    emitEvent('change', data);
  }
}

const onClick = function (data: Item) {
  if (data.href) {
    return true;
  }
  return onChange(data.id);
}

const className = function (data: Item): string {
  let value: string = data.className ? data.className : "";
  if (data.id === active.value) {
    value = value ? `${value} active` : "active";
  }
  return value;
}

onMounted(function () {
  onChange();
  watch($router, function () {
    onChange();
  });
});

</script>

<template>
  <div class="max-w-full overflow-hidden" v-show="list.length > 0">
    <el-scrollbar>
      <div class="flex tab-wrap">
        <template v-for="(item, index) in list" :key="index">
          <v-router :href="makeLink(activeName, item)" @click="onClick(item)" class="block whitespace-nowrap tab-item p-2" :class="className(item)" :name="trigger">
            <slot name="default" :data="item">
              <div v-if="item.icon" class="flex items-center">
                <IconFont class="mr-1.5" :type="item.icon" size="24"/>
                <span class="text-18-24 font-m">{{ item.name }}</span>
              </div>
              <span v-else class="text-18-24 font-m">{{ item.name }}</span>
            </slot>
          </v-router>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>


<style scoped lang="scss">
.el-scrollbar {
  @apply border-b border-solid border-global-highTitle border-opacity-6;
}
%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}
.tab-wrap {
  .tab-item {
    @apply ml-8 text-global-highTitle text-opacity-45;
    @extend %first-ml0;

    &:after {
      @apply absolute left-0 right-0 bottom-0;
      @apply h-0.5 rounded-sm bg-global-darkblue;
    }
    &.active {
      @apply relative text-global-darkblue text-opacity-100;
      &:after {
        content: "";
      }
    }
    &:not(a) {
      &:not([href]) {
        @apply cursor-pointer ml-9;
        @extend %first-ml0;
      }
    }
  }
}
</style>
