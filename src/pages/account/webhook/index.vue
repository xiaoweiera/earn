<script setup lang="ts">
/**
 * @file Web Hook
 */
</script>

<template>
  <div class="bg-global-bg-grey p-4">
    <div class="max-w-full w-150 mx-auto">
      <h3 class="text-14-18 text-global-black-title font-m">Webhook 绑定</h3>
      <div class="p-4 rounded-md bg-white mt-3">
        <!--平台列表-->
        <div>
          <h5 class="text-12-16 text-global-black-title font-m">绑定平台</h5>
          <div class="flex items-center mt-3">
            <label class="platform">
              <icon-font type="icon-telegram" size="32" />
            </label>
            <label class="platform ml-3 disable">
              <icon-font type="icon-discord2" size="32" />
            </label>
            <label class="platform ml-3 disable">
              <icon-font type="icon-wechat" size="32" />
            </label>
          </div>

          <div class="mt-12">
            <p>表单</p>
          </div>

          <div class="mt-12">
            <h5 class="text-12-16 text-global-black-title font-m">引导绑定</h5>
            <div class="bg-global-bg-grey p-4 mt-3 text-12-20 text-global-black-desc">
              <p class="text-14-20 font-m">Webhook 的用处</p>
              <p class="mt-1.5">在机器人被拉入群组后，将Token填入上方输入框进行绑定后，您关注的指标，该机器人会第一时间推送会将账号绑定的指标快讯，推送至该群组。</p>
              <p class="text-14-20 font-m mt-4">如何创建机器人？</p>
              <p class="mt-1.5">
                在 telegram 中我们可以通过和一个名为 BotFather 的机器人交互来申请自己的机器人
                <br />
                具体步骤如下：
              </p>
              <p class="mt-1.5">
                1. 添加 BotFatheri 为好友，点击这里 添加 Botfather
                <br />
                2. 打开和 Botfather 的对话框发送 “/newbot” 这一步过后Botfather会提示你输入你要创建的机器人的名字，这个名字可以随意，是我们称呼它的名字
                <br />
                3. 设置自定义机器人的名字（这个名字不同于上一步的名字，这个名字是唯一的）结尾必须是 “_bot” 或者 “Bot” 不能包含中文，标点符号
                <br />
                4. 如果上一步执行成功那么 Botfather 会返回该机器人的 Token，大概长这样：123456789：ABCDEfghiJK4314daDSadSa7
                <br />
                记住这个 Token，到这里机器人就创建好了
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.platform {
  @apply text-global-darkblue cursor-pointer;
  @apply w-14 h-14 flex items-center justify-center;
  @apply border border-solid border-global-darkblue border-opacity-24 rounded-md;
  &.disable {
    @apply text-global-highTitle text-opacity-25 cursor-default;
    @apply border-global-highTitle border-opacity-10;
  }
}
</style>
