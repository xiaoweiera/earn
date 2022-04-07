<script setup lang="ts">
import { toArray, uuid } from "src/utils";
import DBList from "@fengqiaogang/dblist";
import { ref, toRaw } from "vue";
import API from "src/api";
import { getValue } from "src/utils/root/data";
import * as alias from "src/utils/root/alias";
import { createRef } from "src/utils/ssr/ref";
const api = new API();
const props = defineProps({
  // 项目 id
  projectId: {
    type: [Number, String],
    required: true,
  },
  // 每页评论数限制
  limit: {
    type: Number,
    default: () => 30,
  },
  // 是否开启评论框
  discuss: {
    type: Boolean,
    default: () => true,
  },
  // 是否在概览页显示
  isShow: {
    type: Object,
    required: true,
  },
});
const list: any = createRef<object[]>(alias.comment.list, []);
const uuidKey = ref<string>(uuid());

// 加载数据
const requestList = async function (query: object) {
  const params: any = { ...query, project_id: props.projectId };
  const res: any = await api.comment.getCommentAndReply(params);
  return toArray(res);
};
// 提交评论
const submitBack = (info: object) => {
  list.value = [info].concat(list.value);
  uuidKey.value = uuid();
};
// 删除评论
const deleteReply = function (id: number) {
  const children = "replies";
  const db = new DBList([], "id");
  db.insert(db.flatten(list.value, children));
  db.remove({ id });
  list.value = db.childrenDeep(undefined, children);
  uuidKey.value = uuid();
};
// 分页组件响应完毕
const onLoad = function ([data]: any[]) {
  const value: any[] = toRaw(data);
  if (value && value.length > 0) {
    if (props.isShow) {
      props.isShow.value = true;
    }
    list.value = value;
  } else {
    list.value = [];
  }
};
const initValue = function () {
  const data = getValue(alias.comment.list, []);
  if (data.length > 0) {
    return data;
  }
};
</script>
<template>
  <div>
    <div v-if="discuss" class="mb-3">
      <CommentChat :id="projectId" type="publish" @submit="submitBack" />
    </div>
    <div>
      <ui-pagination :limit="10" :init-value="initValue()" :request="requestList" @change="onLoad">
        <template #default="scope">
          <div :key="uuidKey" :class="scope.id">
            <template v-for="(item, index) in list" :key="index">
              <div class="bg-global-white rounded-kd6px" :class="{ 'mt-3': index > 0 }">
                <CommentMessage :id="item.id" class="py-4 md:px-4" :data="item" @delete="deleteReply" />
              </div>
            </template>
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
