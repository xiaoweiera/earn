<script lang="ts" setup>
/**
 * @file 邀请活动
 * @auth svon.me@gmail.com
 */

import API from "src/api/";
import * as track from "src/logic/track";
import { onMounted, computed } from "vue";
import I18n from "src/utils/i18n";
import Footer from "./footer.vue";
import Download from "./download.vue";
import Fixed from "./fixed.vue";
import Register from "./register.vue";
import RichText from "./richtext.vue";
import { Invite } from "src/types/common/activity";
import { getValue } from "src/utils/root/data";
import { alias, onLoadReactive, createReactive } from "src/utils/ssr/ref";
import { dateYMDHmsFormat } from "src/utils/";

const detail = createReactive<Invite>(alias.activity.invite.detail, {} as Invite);

const i18n = computed(function () {
  if (detail && detail.language) {
    return I18n(detail.language);
  }
  return I18n();
});

onMounted(function () {
  const id = getValue<string>("query.id");
  if (id) {
    // 上报数据
    track.push(track.Origin.gio, track.event.landing.show, { activity_id: id });
    // 判断详情数据是否为空
    onLoadReactive<Invite>(detail, function () {
      const api = new API();
      return api.activity.getInviteDetail<Invite>(id);
    });
  }
});
</script>

<template>
  <div>
    <template v-if="detail.cover && detail.cover_mobile">
      <div class="hidden md:block">
        <ui-image :src="detail.cover" fit="none" />
      </div>
      <div class="block md:hidden">
        <ui-image :src="detail.cover_mobile" fit="none" />
      </div>
    </template>
    <template v-else-if="detail.cover">
      <ui-image :src="detail.cover" fit="none" />
    </template>
    <template v-else-if="detail.cover_mobile">
      <ui-image :src="detail.cover_mobile" fit="none" />
    </template>

    <div class="pt-16 px-4 pb-8">
      <div class="max-w-200 mx-auto">
        <h3 v-show="detail.name" class="mb-3 text-32 font-b text-global-highTitle">{{ detail.name }}</h3>
        <p v-show="detail.begin_time" class="mb-8 text-14-20 text-global-highTitle text-opacity-85">
          <span class="block md:inline mb-1 md:mb-0">{{ i18n.activity.label.time }}</span>
          <span>{{ dateYMDHmsFormat(detail.begin_time) }}</span>
          <template v-if="detail.end_time">
            <span class="mx-2">-</span>
            <span>{{ dateYMDHmsFormat(detail.end_time) }}</span>
          </template>
        </p>
        <h4 class="text-global-highTitle text-24-28">{{ i18n.activity.label.prize }}</h4>
        <RichText :html="detail.description" />
      </div>
    </div>
    <div class="px-4">
      <div class="max-w-200 mx-auto">
        <div class="pb-8">
          <div class="mb-4 text-center">
            <h3 class="text-24-28 font-m text-global-highTitle">{{ i18n.activity.label.register }}</h3>
          </div>
          <!--用户注册-->
          <client-only v-if="detail.id">
            <Register :detail="detail" />
          </client-only>
        </div>
        <div v-if="detail.id" class="pb-15">
          <Download :detail="detail" />
        </div>
        <div v-if="detail.partners_poster && detail.partners_poster_mobile" class="pb-15">
          <div class="hidden md:block">
            <ui-image :src="detail.partners_poster" fit="none" :preview="[detail.partners_poster]" />
          </div>
          <div class="block md:hidden">
            <ui-image :src="detail.partners_poster_mobile" fit="none" :preview="[detail.partners_poster_mobile]" />
          </div>
        </div>
        <div v-else-if="detail.partners_poster" class="pb-15">
          <ui-image :src="detail.partners_poster" fit="none" :preview="[detail.partners_poster]" />
        </div>
        <div v-else-if="detail.partners_poster_mobile" class="pb-15">
          <ui-image :src="detail.partners_poster_mobile" fit="none" :preview="[detail.partners_poster_mobile]" />
        </div>
      </div>
    </div>
    <div class="pb-6 px-4">
      <div class="max-w-200 mx-auto pt-6 border-t border-solid border-global-highTitle border-opacity-6">
        <Footer :detail="detail" />
      </div>
    </div>
    <Fixed v-if="detail.id" :detail="detail" />
  </div>
</template>
