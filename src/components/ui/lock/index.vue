<script lang="ts" setup>
/**
 * @file 锁
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import { ElDialog, ElButton } from "element-plus";
import { getShareLink } from "src/logic/ui/lock";
import type { Type, LockData } from "src/types/common/lock";

const i18n = I18n();
const status = ref<boolean>(false);
const emitEvent = defineEmits(["sync"]);

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<Type>,
    required: true,
  },
  data: {
    type: Object as PropType<LockData>,
    required: true,
  },
});

const onClick = function () {
  status.value = true;
  return emitEvent("sync");
};

const getCopyValue = function (value?: string) {
  const url = getShareLink(props.type, props.id);
  if (value) {
    return `${value}  \n${url}`;
  }
  return url;
};
</script>

<template>
  <client-only class="ui-lock relative">
    <div class="virtual-shadow h-20 absolute left-0 right-0 bottom-full"></div>
    <div class="text-center">
      <div>
        <IconFont size="24" type="icon-lock" />
      </div>
      <p class="lock-tips mt-2">
        <span class="text-12-16 text-white tips-wrap">
          <span class="bg-global-gemstone inline-block px-3 py-1.5 rounded-global-kd30px">{{ i18n.common.lock.text1 }}</span>
        </span>
      </p>
      <p class="mt-6 text-global-highTitle text-opacity-45">
        <span class="text-12-18">{{ i18n.common.lock.text2 }}</span>
      </p>
      <v-login class="mt-3 text-global-darkblue flex justify-center items-center">
        <ui-share-twitter :href="getShareLink(type, id)" :text="text">
          <div class="circular">
            <IconFont class="flex" size="16" type="icon-twitter" />
          </div>
        </ui-share-twitter>
        <ui-share-telegram :href="getShareLink(type, id)" :text="text" class="ml-4">
          <div class="circular">
            <IconFont size="16" type="icon-telegram" />
          </div>
        </ui-share-telegram>
        <v-copy :value="getCopyValue(text)" class="ml-4 cursor-pointer">
          <ui-hover :offset="5" class="flex-popover" rounded>
            <template #label>
              <div class="circular">
                <IconFont size="16" type="icon-link" />
              </div>
            </template>
            <template #content>
              <div class="text-global-darkblue text-12-18">{{ i18n.common.share.link }}</div>
            </template>
          </ui-hover>
        </v-copy>
        <div class="ml-4 cursor-pointer">
          <el-button class="px-3 h-10 button-sync rounded-global-kd30px" @click="onClick">
            <span class="text-global-darkblue">{{ i18n.common.lock.shared }}</span>
          </el-button>
        </div>
      </v-login>
      <el-dialog v-model="status" :append-to-body="true" :destroy-on-close="true" width="340px">
        <template #title>
          <span class="text-16-24 font-m text-global-highTitle">{{ i18n.common.lock.progress }}</span>
        </template>
        <div>
          <div class="text-12-16 text-global-highTitle text-opacity-85 lock-progress">
            <span>{{ i18n.common.lock.gain }}</span>
            <b class="mx-1.5 font-b text-16-18 text-global-gemstone">
              <template v-if="data.share_target > data.share_progress">{{ data.share_target - data.share_progress }}</template>
              <template v-else>0</template>
            </b>
            <span v-html="i18n.common.lock.unlock"></span>
          </div>
          <div class="mt-3 text-global-gemstone user" :class="{ grid: data.share_target >= 5 }">
            <template v-for="index in data.share_target" :key="index">
              <i v-if="index <= data.share_progress" :data-portrait="index % 6" class="circular"></i>
              <i v-else class="circular">
                <IconFont size="16" type="icon-user-plus" />
              </i>
            </template>
          </div>
          <div class="mt-6">
            <el-button class="w-full" type="primary" size="large" @click="status = false">
              <span>{{ i18n.common.lock.again }}</span>
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
@import "src/styles/function";

.virtual-shadow {
  @apply z-100;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.0716618) 0%, rgba(255, 255, 255, 0) 12.78%, #ffffff 100%);
}

.button-sync {
  @apply flex items-center justify-center;
  @apply border border-solid border-global-highTitle border-opacity-12;
}

.circular {
  @extend .button-sync;
  @apply w-10 h-10 rounded-1/2 overflow-hidden;

  @at-root .user & {
    @apply bg-global-gemstone bg-opacity-6;
    @apply border-dashed border-global-gemstone;

    &[data-portrait] {
      @apply bg-center bg-no-repeat bg-cover border-0;
    }

    @for $index from 1 through 6 {
      &[data-portrait="#{$index}"] {
        background-image: cdn("/static/images/portrait/0#{$index}.jpg");
      }
    }
  }
}

.user {
  &.grid {
    @apply grid-cols-5 gap-4;
  }
  &:not(.grid) {
    @apply flex justify-center items-center;
  }
}

.lock-tips {
  @apply relative;
  &:before {
    content: "";
    @apply block absolute left-0 right-0 top-1/2 transform -translate-y-1/2;
    @apply border-t border-dashed border-global-highTitle border-opacity-10;
  }

  .tips-wrap {
    @apply relative z-1 px-3 bg-white inline-block;
  }
}
.lock-progress {
  word-break: break-word;
  @apply break-words;
  ::v-deep(i) {
    @apply text-global-darkblue not-italic;
    @at-root [lang="cn"] & {
      @apply mx-1;
    }
  }
}
</style>
