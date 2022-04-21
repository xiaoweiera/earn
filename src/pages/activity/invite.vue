<script setup lang="ts">
/**
 * @file 邀请活动
 * @auth svon.me@gmail.com
 *
 *
 */

import I18n from "src/utils/i18n";
import Footer from "./footer.vue";
import Download from "./download.vue";
import Fixed from "./fixed.vue";
import { asyncLoad } from "src/plugins/lazyload";

const i18n = I18n();

const Register = asyncLoad(() => import("./register.vue"));
</script>

<template>
  <div>
    <div>
      <ui-image src="https://iph.href.lu/1440x500?text=activity&fg=ffffff&bg=4D56FF" fit="none" />
    </div>
    <div class="pt-16 px-4 pb-8">
      <div class="max-w-200 mx-auto">
        <h3 class="text-32 font-b text-global-highTitle">活动名称</h3>
        <p class="mt-3 text-14-20 text-global-highTitle text-opacity-85">
          <span>{{ i18n.activity.label.time }}</span>
          <span>Feb 5,2022/ 12PMUTC</span>
        </p>
        <h4 class="mt-8 text-global-highTitle text-24-28">{{ i18n.activity.label.prize }}</h4>
        <div class="mt-4 activity-content-wrap">
          <div class="text-16-22 text-global-highTitle text-opacity-85">
            <p>活动内容活动内容活动内容活动内容</p>
            <p class="mt-4">需要翻译的文案：</p>
            <div class="mt-1 p-2 border border-solid border-gray-300 text-black">
              <p>
                非常抱歉，您不满足领取条件
                <br />
                加入社区了解更多活动信息
              </p>
              <p class="mt-4">
                您已成功领取过该空投
                <br />
                请勿重复操作
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4">
      <div class="max-w-200 mx-auto">
        <div class="pb-8">
          <div class="mb-4 text-center">
            <h3 class="text-24-28 font-m text-global-highTitle">{{ i18n.activity.label.register }}</h3>
          </div>
          <!--用户注册-->
          <Register :id="1234" />
        </div>
        <div class="pb-15">
          <Download :id="1234" />
        </div>
        <div class="pb-15">
          <ui-image src="https://iph.href.lu/800x157?text=合作伙伴&fg=666666&bg=cccccc" fit="none" />
        </div>
      </div>
    </div>
    <div class="pb-6 px-4">
      <div class="max-w-200 mx-auto pt-6 border-t border-solid border-global-highTitle border-opacity-6">
        <Footer />
      </div>
    </div>
    <Fixed />
  </div>
</template>
