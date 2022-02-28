<script setup lang="ts">
/**
 * @file tab 组件
 * @author svon.me@gmail.com
 */

import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import {useRoute, useRouter} from "vue-router";
import { createHref } from "src/plugins/router/pack";
import {isFunction, toInteger, uuid} from "src/utils";
import {ElOption, ElScrollbar, ElSelect} from "element-plus";
import { stateAlias, setInject } from "src/utils/use/state";
import {computed, onMounted, PropType, ref, toRaw, watch} from "vue";
import {CallbackList, Item, makeLink, Trigger, TriggerValue} from "src/logic/ui/tab";


const $route = useRoute();
const $router = useRouter();
const key = ref<string>(uuid());
const triggerTabChange = setInject(stateAlias.ui.tab);
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
    default: () => "id",
  },
  def: {
    type: String
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
    default: () => 0
  }
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
}

const tabList = computed<Item[]>(getList);

const selectData = function (value: string | number, list = getList()): Item {
  const db = new DBList(list, props.activeName);
  const where: Array<string | number> = [value];
  if (/^[\d]+$/.test(value as string)) {
    where.push(toInteger(value));
  }
  return db.selectOne<Item>({ [props.activeName]: where });
}

const getActiveValue = function () {
  let item: Item | undefined = void 0;
  const value = safeGet<string>(toRaw($route.query), props.activeName);
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
}

const onChange = function (value = getActiveValue()) {
  if (value && active.value !== value) {
    active.value = value;
    const data = selectData(value);
    emitEvent("change", data);
    if (triggerTabChange) {
      const query = $route.query;
      triggerTabChange(query);
    }
  }
}

const onClick = function (data: Item) {
  // 只处理为 click 模式的切换
  if (props.trigger === Trigger.click) {
    return onChange(safeGet<string>(data, props.activeName));
  }
}

const className = function (data: Item): string {
  let value: string = data.className ? data.className : "";
  if (safeGet<string>(data, props.activeName) === active.value) {
    value = value ? `${value} active` : "active";
  }
  return value;
}

// 判断是否选中 select 中的数据
const isSelectActive = function () {
  const array = getList()
  const list = array.slice(props.split);
  const item = selectData(active.value, list);
  return !!item;
}

const onChangeSelect = async function (value: string) {
  if (props.trigger === Trigger.router) {
    const item = selectData(value);
    const href = makeLink(props.activeName, item, props.trigger);
    const url = createHref(href);
    await $router.push(url);
  }
  onChange(value);
}

onMounted(function () {
  onChange();
  watch($route, function () {
    onChange();
  });
});

</script>

<template>
  <div class="ui-tab max-w-full" :class="{'overflow-hidden': split < 1, 'w-full': split > 0}" v-show="tabList.length > 0">
    <div class="tab-wrap" v-if="split > 0" :key="key">
      <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
        <v-router v-show="index < props.split" :href="makeLink(activeName, item, trigger)" @click="onClick(item)" class="inline-block whitespace-nowrap tab-item p-2" :class="className(item)" :name="TriggerValue[trigger]">
          <slot name="default" :data="item">
            <div v-if="item.icon" class="flex items-center">
              <IconFont class="mr-1.5" :type="item.icon" size="24"/>
              <span class="text-18-24 font-m">{{ item.name }}</span>
            </div>
            <span v-else class="text-18-24 font-m">{{ item.name }}</span>
          </slot>
        </v-router>
      </template>
      <client-only class="tab-item inline-block text-18-24 font-m" v-if="split < tabList.length">
        <el-select class="border-0 w-40 active" v-if="isSelectActive()" v-model="active" @change="onChangeSelect">
          <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
            <el-option v-if="index >= split" :label="item.name" :value="item[activeName]"></el-option>
          </template>
        </el-select>
        <el-select class="border-0 w-40" v-else @change="onChangeSelect">
          <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
            <el-option v-if="index >= split" :label="item.name" :value="item[activeName]"></el-option>
          </template>
        </el-select>
      </client-only>
    </div>
    <el-scrollbar v-else>
      <div class="flex tab-wrap">
        <template v-for="(item, index) in tabList" :key="`${index}-${key}`">
          <v-router :href="makeLink(activeName, item, trigger)" @click="onClick(item)" class="block whitespace-nowrap tab-item p-2" :class="className(item)" :name="TriggerValue[trigger]">
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
  @apply text-global-darkblue text-opacity-100;
}
.tab-wrap {
  .el-select {
    ::v-deep(input) {
      @apply font-m font-kd18px24px;
    }
    &.active {
      ::v-deep(input) {
        @extend %active;
      }
    }
  }
  .tab-item {
    @apply ml-8 text-global-highTitle text-opacity-45;
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
    &:not(a) {
      &:not([href]) {
        @apply cursor-pointer ml-9;
        @extend %first-ml0;
      }
    }
  }
}
</style>
