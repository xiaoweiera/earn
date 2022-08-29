<script setup>
import {toNumberCashFormat} from "src/utils/convert/to";
import {addAddrees, removeAddrees, isFollow} from "src/logic/earn/index"
import _ from "lodash";
import {icons} from 'src/logic/earn'
import {ref} from "vue"
import {echartTransform} from "src/logic/ui/echart/decorate";
import {dateDiff} from "src/utils";

const props = defineProps({
  follow: {
    type: Boolean,
    required: true,
    default: () => false
  },
  data: {
    type: Object,
    required: true
  }
});
const state = ref(isFollow(props.data['addressName']))
const add = () => {
  addAddrees(props.data['addressName'])
  state.value = true
}
const remove = () => {
  removeAddrees(props.data['addressName'])
  state.value = false
}
const chartData = (data) => {
  const series = [];
  const xAxis = [];
  _.forEach(data, function (item) {
    const [time, value] = item;
    series.push(value);
    xAxis.push(time);
  });
  const option = {
    xAxis,
    legends: [{id: 0, name: "", unit: "", color: '#17C964'}],
    series: [series],
  };
  return echartTransform(option);
}

</script>
<template>
  <div class="p-4 card">
    <div class="flex items-center">
      <ui-image class="mr-3 rounded-full w-12 h-12 min-w-12 min-h-12" :src="data['headPic']"/>
      <div class="items-center w-full">
        <div class="flex items-center justify-between">
          <span class="text-kd16px24px text-global-hui01 huawei-medium">{{ data['addressName'] }}</span>
          <div class="flex items-center">
            <div class="card-button bg-global-lan04 ">
              <ui-image class="w-3.5 h-3.5" src="/public/images/earn/info.png"/>
            </div>
            <div v-if="state" class="card-button bg-global-red08" @click="remove">
              <ui-image class="w-3.5 h-3.5" src="/public/images/earn/followed.png"/>
            </div>
            <div v-else class="card-button bg-global-hui06" @click="add">
              <ui-image class="w-3.5 h-3.5" src="/public/images/earn/add.png"/>
            </div>
          </div>
        </div>
        <div class="flex mt-1 items-center huawei-medium">
          <div class="tip" v-for="item in data['tagList']?.slice(0,3)">
            <ui-image v-if="item.type!=='text'" class="w-3 h-3 mr-1" :src="item.imgUrl"/>
            <div class="short max-w-20">{{ item['text'] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-3 h-25 flex items-start card-txt">
      <div class="mr-10">
        <span>Return</span>
        <div class="text-kd24px32px text-global-green04">+{{ toNumberCashFormat(data['returnRate']) }}</div>
      </div>
      <div class="flex-1 h-full relative">
        <div class="absolute left-0 top-0 text-kd12px20px text-global-hui02 huawei-medium">Last Activity:
          {{ dateDiff(data['lastActivityTime']) }}
        </div>
        <ui-echart-small type="line" :data="chartData(data['roiTrending'])" class="w-full h-full"/>
      </div>
    </div>
    <div class="gang my-3"/>
    <div class="flex items-center">
      <div class="mr-5.4 flex items-center">
        <span class="mr-1 card-txt">NFT Value:</span>
        <ui-image class="mr-1 w-3 h-3" :src="icons[data['currency']]"/>
        <span class="card-number">{{ toNumberCashFormat(data['nftValue']) }}</span>
      </div>
      <div class="mr-5.4 flex items-center">
        <span class="mr-1 card-txt">FlipRate:</span>
        <span class="card-number">{{ toNumberCashFormat(data['flipRate']) }}%</span>
      </div>
      <div class="flex items-center">
        <span class="mr-1 card-txt">Copiers:</span>
        <span class="card-number">{{ toNumberCashFormat(data['copiers']) }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  background: #16181A;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
}

.tip {
  @apply h-5 px-1 w-max rounded-kd4px mr-1 flex items-center;
  @apply text-kd12px16px text-global-hui02 bg-global-hui06;
}

.card-button {
  @apply w-6 h-6 flex justify-center items-center mr-1 rounded-kd4px cursor-pointer;
}

.card-txt {
  font-family: huawei-bold;
  @apply text-kd12px20px text-global-hui02;
}

.card-number {
  font-family: huawei-bold;
  @apply text-kd12px20px text-global-hui01;
}

.gang {
  border-bottom: 1px solid #26292B;
}
</style>