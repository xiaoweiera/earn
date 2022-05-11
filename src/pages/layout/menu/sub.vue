<script setup lang="ts">
/**
 * @file 三级导航
 * @auth svon.me@gmail.com
 */
import { toArray, size } from "src/utils";
import { PropType } from "vue";
import { MenuItem } from "src/types/menu";
import { getValue } from "src/utils/root/data";
import DBList from "@fengqiaogang/dblist";
import SubContent from "../header/sub.vue";

defineProps({
  header: {
    required: false,
    type: Object as PropType<MenuItem>,
    default() {
      return void 0;
    },
  },
});

const getList = function (header: MenuItem) {
  const active = getValue<string>("menuActive");
  if (active && header) {
    const where = { id: active };
    const db = new DBList([]);
    db.insert(db.flatten(toArray(header)));
    const data = db.parent<MenuItem>(where);
    if (data && data.layout) {
      return [];
    }
    return db.siblings<MenuItem>(where);
  }
  return [];
};
</script>

<template>
  <div v-if="size(getList(header)) > 0" class="h-12.5">
    <SubContent class="h-full pl-8" :list="getList(header)"></SubContent>
  </div>
</template>
