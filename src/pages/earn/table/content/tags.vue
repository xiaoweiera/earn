<script setup lang="ts">
defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <div class="flex items-center mt-1">
    <template v-for="item in data[field]">
      <div class="tag">
        <ui-image v-if="item['type']!=='text'" class="w-3 h-3 mr-1" :src="item['imgUrl']"/>
        <span class="short max-w-20">{{item['text']}}</span>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.tag{
  font-family: huawei-medium;
  @apply h-5 px-2 flex items-center bg-global-hui06 rounded-kd4px text-global-hui02 text-kd12px16px;
}
.tag:not(:first-child){
  @apply ml-1;
}
</style>
