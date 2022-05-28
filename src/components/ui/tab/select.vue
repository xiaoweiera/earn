<script setup lang="ts">
/**
 * @file tab - select
 * @auth svon.me@gmail.com
 */

import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import { ElOption, ElSelect } from "element-plus";
import type { CallbackList, Item } from "src/logic/ui/tab";
import { makeLink, Trigger } from "src/logic/ui/tab";
import * as console from "src/plugins/log/";
import { createHref } from "src/plugins/router/pack";
import { isFunction, toInteger } from "src/utils";
import I18n from "src/utils/i18n/";
import { setInject, stateAlias } from "src/utils/use/state";
import type { PropType } from "vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const i18n = I18n();
const $route = useRoute();
const $router = useRouter();
const triggerTabChange = setInject(stateAlias.ui.tab);
const active = ref<string | number>("");
const emitEvent = defineEmits(["change"]);

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
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
  return { ...$route.query, ...$route.params };
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
    setTimeout(() => {
      if (triggerTabChange) {
        triggerTabChange(getUrlData());
      }
    });
  }
};

const onChangeSelect = async function (value: string) {
  const item = selectData(value);
  const href = makeLink(props.activeName, item, Trigger.router);
  const url = createHref(href);
  await $router.push(url);
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
  <div>
    <div class="flex items-center">
      <slot name="label">
        <div v-if="label" class="ui-label text-14-18 text-global-highTitle mr-2 md:mr-4">
          <span class="whitespace-nowrap">{{ label }}</span>
        </div>
      </slot>
      <div class="flex-1 w-1">
        <el-select v-model="active" class="rounded-kd6px w-full" :placeholder="i18n.apy.pleaseSelect" @change="onChangeSelect">
          <template v-for="(item, index) in tabList" :key="index">
            <el-option :label="item.name" :value="item[activeName]" />
          </template>
        </el-select>
      </div>
    </div>
  </div>
</template>
