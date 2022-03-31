<script lang="ts" setup>
/**
 * @file tab 组件
 * @author svon.me@gmail.com
 */

import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import { ElOption, ElScrollbar, ElSelect } from "element-plus";
import type { CallbackList, Item } from "src/logic/ui/tab";
import { makeLink, Trigger, TriggerValue } from "src/logic/ui/tab";
import * as console from "src/plugins/log/";
import { createHref } from "src/plugins/router/pack";
import { isFunction, toInteger, uuid } from "src/utils";
import { setInject, stateAlias } from "src/utils/use/state";
import type { PropType } from "vue";
import { computed, onMounted, ref, toRaw, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const $route = useRoute();
const $router = useRouter();
const key = ref<string>(uuid());
const triggerTabChange = setInject(stateAlias.ui.tab);
const active = ref<string | number>("");
const emitEvent = defineEmits(["change"]);

const props = defineProps({
  /**
   * 设置路由根据那个字段来匹配
   * @description /xxx/xx?[activeName]=[id]
   * @description /xxx/xx?tab=[id] // 默认效果
   */
  activeName: {
    type: String,
    default: () => "id",
  },
  def: {
    type: String,
    default: "",
  },
  list: {
    required: true,
    default: () => [],
    type: [Function, Array] as PropType<Item[] | CallbackList>,
  },
  trigger: {
    type: String as PropType<Trigger>,
    default: () => Trigger.router,
  },
  split: {
    type: Number,
    default: () => 0,
  },
});

const getList = function (): Item[] {
  if (props.list) {
    if (isFunction(props.list)) {
      try {
        const fun = props.list as CallbackList;
        return fun();
      } catch (e) {
        console.log(e);
        return [];
      }
    }
    return props.list as Item[];
  }
  return [];
};

const tabList = computed<Item[]>(getList);

const selectData = function (value: string | number, list = getList()): Item {
  const db = new DBList(list, props.activeName);
  const where: Array<string | number> = [value];
  if (/^[\d]+$/.test(value as string)) {
    where.push(toInteger(value));
  }
  return db.selectOne<Item>({ [props.activeName]: where });
};

const getUrlData = function () {
  return { ...$route.params, ...$route.query };
};

const getActiveValue = function () {
  let item: Item | undefined = void 0;
  const value = safeGet<string>(getUrlData(), props.activeName);
  if (value) {
    item = selectData(value);
  }
  // 如果未能匹配选中的数据
  if (!item) {
    if (props.def) {
      item = selectData(props.def);
    } else {
      // 默认为第一个 tab
      const [first] = getList();
      item = first;
    }
  }
  if (item) {
    return safeGet<string>(item, props.activeName);
  }
};

const onChange = function (value = getActiveValue(), important = false) {
  if (value && (active.value !== value || important)) {
    active.value = value;
    const data = selectData(value);
    emitEvent("change", data);
    if (triggerTabChange) {
      triggerTabChange(getUrlData());
    }
  }
};

const onClick = function (data: Item) {
  // 只处理为 click 模式的切换
  if (props.trigger === Trigger.click) {
    return onChange(safeGet<string>(data, props.activeName));
  }
};

const className = function (data: Item): string {
  let value: string = data.className ? data.className : "";
  if (safeGet<string>(data, props.activeName) === active.value) {
    value = value ? `${value} active` : "active";
  }
  return value;
};

// 判断是否选中 select 中的数据
const isSelectActive = function () {
  const array = getList();
  const list = array.slice(props.split);
  const item = selectData(active.value, list);
  return !!item;
};

const onChangeSelect = async function (value: string) {
  if (props.trigger === Trigger.router) {
    const item = selectData(value);
    const href = makeLink(props.activeName, item, props.trigger);
    const url = createHref(href);
    await $router.push(url);
  }
  onChange(value, true);
};

onMounted(() => {
  onChange();
  watch($route, () => {
    onChange();
  });
});
</script>

<template>
  <div v-show="tabList.length > 0" :class="{ 'overflow-hidden': split < 1, 'w-full': split > 0 }" class="ui-tab">
    <div v-if="split > 0" :key="key" class="tab-wrap">
      <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
        <v-router v-show="index < props.split" :class="className(item)" :href="makeLink(activeName, item, trigger)" :name="TriggerValue[trigger]" class="inline-block whitespace-nowrap tab-item p-2" @click="onClick(item)">
          <slot :data="item" name="default">
            <div v-if="item.logo" class="flex items-center">
              <IconFont :type="item.logo" class="mr-1.5" size="16" />
              <span class="text-18-24 font-m">{{ item.name }}</span>
            </div>
            <span v-else class="text-18-24 font-m">{{ item.name }}</span>
          </slot>
        </v-router>
      </template>
      <client-only v-if="split < tabList.length" class="tab-item inline-block text-18-24 font-m" style="padding: 0">
        <el-select v-if="isSelectActive()" v-model="active" class="rounded-kd6px w-30 md:w-40 active" placeholder="other" @change="onChangeSelect">
          <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
            <el-option v-if="index >= split" :label="item.name" :value="item[activeName]" />
          </template>
        </el-select>
        <el-select v-else class="rounded-kd6px w-30 md:w-40" placeholder="other" @change="onChangeSelect">
          <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
            <el-option v-if="index >= split" :label="item.name" :value="item[activeName]" />
          </template>
        </el-select>
      </client-only>
    </div>
    <el-scrollbar v-else>
      <div class="flex tab-wrap">
        <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
          <v-router :class="className(item)" :href="makeLink(activeName, item, trigger)" :name="TriggerValue[trigger]" class="block whitespace-nowrap tab-item p-2" @click="onClick(item)">
            <slot :data="item" name="default">
              <div v-if="item.logo" class="flex items-center">
                <IconFont :type="item.logo" class="mr-1.5" size="16" />
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

<style lang="scss" scoped>
.ui-tab {
  @apply max-w-full;
}

/**
  .el-scrollbar {
    @apply border-b border-solid border-global-highTitle border-opacity-6;
  }
*/
%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}

%active {
  @apply text-global-primary;
}

.tab-wrap {
  .el-select {
    ::v-deep(input) {
      color: #033666 !important;
      @apply font-m font-kd18px24px;
    }

    &.active {
      ::v-deep(input) {
        @extend %active;
      }
    }
  }

  .tab-item {
    @apply ml-4 md:ml-8 text-global-highTitle text-opacity-45;
    @extend %first-ml0;

    &:after {
      @apply absolute left-0 right-0 bottom-0;
      @apply h-0.5 rounded-sm bg-global-darkblue;
    }

    &.active {
      @extend %active;
      @apply relative;
      &:after {
        content: "";
      }
    }

    ::v-deep(.el-input__inner) {
      @apply rounded-md;
    }

    /**
    &:not(a) {
      &:not([href]) {
        @apply cursor-pointer ml-9;
        @extend %first-ml0;
      }
    }
     */
  }
}

::v-deep(.el-select) {
  background: #fafbfc !important;
}
</style>
