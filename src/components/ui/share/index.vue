<script lang="ts" setup>
/**
 * @file 分享
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import { onMounted, ref } from "vue";
import { ElDialog } from "element-plus";
import window from "src/plugins/browser/window";

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

onMounted(function () {
  link.value = props.url || window.location.href;
});
</script>

<template>
  <client-only class="inline-block cursor-pointer">
    <div class="text-global-darkblue" @click="status = true">
      <slot>
        <div class="rounded px-3 py-2 border border-solid border-global-darkblue border-opacity-12">
          <IconFont class="mr-1 align-middle" size="16" type="icon-share" />
          <span class="font-m align-middle">{{ i18n.dapp.share.label }}</span>
        </div>
      </slot>
    </div>
    <el-dialog v-model="status" :append-to-body="true" :title="i18n.common.title.share" width="340px">
      <div class="flex items-center justify-center" @click="status = false">
        <ui-share-twitter :href="link" :text="value" />
        <span class="block mx-8 w-px h-6 bg-global-highTitle bg-opacity-10"></span>
        <ui-share-telegram :href="link" />
      </div>
      <template #footer>
        <v-copy :value="link" class="block w-full cursor-pointer bg-global-bgFb" @click="status = false">
          <div class="link-content p-2 rounded-md border border-solid border-global-highTitle border-opacity-6">
            <div class="flex items-center text-global-highTitle text-opacity-65">
              <span class="block w-1 flex-1 whitespace-nowrap truncate">{{ link }}</span>
              <IconFont class="text-global-highTitle text-opacity-35" size="16" type="icon-copy" />
            </div>
          </div>
        </v-copy>
      </template>
    </el-dialog>
  </client-only>
</template>
