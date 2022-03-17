<script lang="ts" setup>
/**
 * @file 分享
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import { computed, onMounted, ref } from "vue";
import window from "src/plugins/browser/window";
import { ElDialog } from "element-plus";
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

const i18n = I18n();
const link = ref<string>("");
const status = ref<boolean>(false);

const twitterLink = computed(function () {
  const query = [];
  if (props.value) {
    query.push(`text=${props.value}`);
  }
  query.push(`url=${link.value}`);
  return `https://twitter.com/share?${query.join("&")}`;
});

const telegramLink = computed(function () {
  return `https://t.me/share/url?url=${link.value}`;
});

onMounted(function () {
  link.value = props.url || window.location.href;
});
</script>

<template>
  <client-only class="inline-block cursor-pointer">
    <div @click="status = true">
      <slot>
        <div
          class="rounded px-3 py-2 text-global-darkblue border border-solid border-global-darkblue border-opacity-12"
        >
          <IconFont class="mr-1 align-middle" size="16" type="icon-share" />
          <span class="font-m align-middle">{{ i18n.dapp.share.label }}</span>
        </div>
      </slot>
    </div>
    <el-dialog v-model="status" :append-to-body="true" :title="i18n.common.title.share" width="340px">
      <div class="flex items-center justify-center" @click="status = false">
        <v-router :href="twitterLink" target="_blank">
          <IconFont bright size="36" type="twitter" />
        </v-router>
        <split class="block mx-8 w-px h-6 bg-global-highTitle bg-opacity-10"></split>
        <v-router :href="telegramLink" target="_blank">
          <IconFont bright size="36" type="telegram" />
        </v-router>
      </div>
      <template #footer>
        <v-copy :value="link" class="block w-full cursor-pointer" @click="status = false">
          <div
            class="link-content p-2 rounded-md flex items-center border border-solid border-global-highTitle border-opacity-6"
            style="background: #fbfbfb"
          >
            <span class="block w-1 flex-1 whitespace-nowrap truncate text-global-highTitle text-opacity-65">{{
              link
            }}</span>
            <IconFont class="cursor-pointer text-global-highTitle text-opacity-35" size="16" type="icon-copy" />
          </div>
        </v-copy>
      </template>
    </el-dialog>
  </client-only>
</template>
