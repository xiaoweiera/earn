<script setup lang="ts">
import { ref } from "vue"
const loading = ref<boolean>(false);
defineProps({
  list: {
    type: Object,
  }
})
</script>
<template>
  <div class="discover-item">
    <div>
      <!--遍历展示项目列表信息-->
      <div class="discover-list relative h-87.5 border border-global-highTitle border-opacity-6 rounded-md cursor-pointer">
        <ui-spin :loading="loading">
          <!-- <template v-for="item in list" :key="item.id">
            <DappDiscoversContentAd v-if="item.commercial" :data="item"/>
            <DappDiscoversContent v-else :data="item"/>
          </template> -->
          <DappDiscoversContent :data="list"></DappDiscoversContent>
          <!-- <DappDiscoversContentAd></DappDiscoversContentAd> -->
        </ui-spin>
      </div>
      <!-- 加载更多按钮 -->
      <!-- <div class="text-center pt-3" v-show="nextMore && onNext">
        <UiButtonMore :request="onNext"/>
      </div> -->
    </div>
    <!--空数据时，提示内容-->
    <!-- <div class="mt-3" v-else>
      <div v-show="!loading">
        <Empty v-if="group === ProjectGroupId.history" :desc="I18n.apy.tips.noData"></Empty>
        <div v-else class="text-center py-35">
          <p class="text-16-24 text-global-highTitle text-opacity-85">{{ I18n.dapp.empty.title }}</p>
          <p class="text-12-16 text-global-highTitle text-opacity-65 mt-2">
            <router-link class="text-global-darkblue" :to="historyLink()">{{ I18n.dapp.empty.text1 }}</router-link>
            <span>{{ I18n.dapp.empty.text2 }}</span>
            <v-router class="text-global-darkblue" :href="config.dappApply" target="_blank">{{ I18n.dapp.empty.text3 }}</v-router>
          </p>
        </div>
      </div>
    </div> -->
  </div>



  <!-- <div class="discover-item">
    <div class="discover-list ">
      <div class="relative h-40">
       
      </div>
      <div class=""> 
        
        <div>
          
          
          
        </div>
      </div>
    </div>
  </div> -->
</template>
<style lang="scss" scoped>
.discover-item {
  &:hover {
    .discover-list {
      box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>