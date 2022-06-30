<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import window from "src/plugins/browser/window";
import document from "src/plugins/browser/document";
import { Model } from "src/logic/home";
import { getagoTimeStamp, getTip } from "src/lib/tool";
import { wallet_address } from "src/logic/common/wallet";
import * as echarts from "echarts";
import { chartConfig } from "src/logic/rank/chartConfig";
import * as R from "ramda";
const api = new Model();
const param: any = reactive({
  address: wallet_address.value ? wallet_address.value : "0x6cf9aa65ebad7028536e353393630e2340ca6049",
  chain: "all",
  from_ts: getagoTimeStamp(14),
  to_ts: getagoTimeStamp(0),
});
const chartData = ref({});
let myChart: any = null;

const getData = async () => {
  const data: any = await api.getLineChart(param);
  chartData.value = data;
  draw(data.fund_trending.xAxis, data.fund_trending.series);
};
const format = (series: any) => {
  const list: any = R.map((item: any) => item.value, series);
  let max = Math.max.apply(null, list);
  let min = Math.min.apply(null, list);
  return [max ? max : 0, min ? min : 0];
};
const draw = (xData: Array<string>, series: any) => {
  const [max, min] = format(series);
  // @ts-ignore
  const chartOption = chartConfig(xData, series, getTip, true, max, min);
  myChart.setOption(chartOption);
  // @ts-ignore
  window.addEventListener("resize", myChart.resize);
};
onMounted(() => {
  setTimeout(() => {
    const myChartDom = document.getElementById("homeChart");
    if (myChart) {
      myChart.dispose();
    }
    //@ts-ignore
    myChart = echarts.init(myChartDom, "light");
    getData();
  });
});
</script>
<template>
  <div class="w-full h-18 md:h-full relative">
    <div id="homeChart" class="w-full h-18 md:h-full"></div>
  </div>
</template>
