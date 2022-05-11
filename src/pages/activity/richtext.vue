<script setup lang="ts">
/**
 * @file 富文本标签
 * @auth svon.me@gmail.com
 */

defineProps({
  html: {
    type: String,
    default: "",
  },
});

const getHtml = function (value: string): string {
  if (value) {
    // 将多个换行符替换为1行
    const text = value.replace(/>\s+</g, "><br/><");
    // 判断 a 标签是否为新开窗口
    return text.replace(/<a.*?>/gi, function (link: string) {
      if (link.includes("target")) {
        return link;
      }
      return link.replace(/href=/i, "target=\"_blank\" href=");
    });
  }
  return "";
};
</script>

<template>
  <div class="mt-4 rich-text">
    <div class="text-16-22 text-global-highTitle text-opacity-85">
      <div v-if="html" v-html="getHtml(html)"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
