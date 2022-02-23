<script setup lang="ts">
import {Item, CallbackList} from "src/logic/ui/tab";
import {PropType} from "vue";

defineProps({
  title: {
    type: String,
    default: () => '',
  },
  list: {
    type: [Function, Array] as PropType<Item[] | CallbackList>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});



</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-14-18 text-global-highTitle text-opacity-65 mr-4" v-if="title">{{title}}</div>
      <div class="flex-1">
        <ui-tab :list="list" :active-name="name" :split="2"></ui-tab>
      </div>
    </div>
  </div>
</template>
