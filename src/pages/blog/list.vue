<script setup lang="ts">
import * as API from "src/api";
import { onMounted } from "vue";
import { config } from "src/router/config";
import {BlogData} from "src/types/blog/";
import { createRef } from "src/utils/ssr/ref";
const list = createRef<BlogData[]>("API.blog.getList", []);

const init = async function () {
  if (list.value.length < 1) {
    const value = await API.blog.getList<BlogData>();
    if (value) {
      list.value= value;
    }
  }
};

onMounted(init);

</script>

<template>
  <div>
    <div class="mb-3" v-for="(item, index) in list" :key="item.id">
      <v-router class="inline-block" :href="`${config.blog}/${item.id}`">
        <span>{{ index + 1 }} : {{ item.name }}</span>
      </v-router>
    </div>
  </div>
</template>
