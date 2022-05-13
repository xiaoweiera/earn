<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import window from "src/plugins/browser/window";
import document from "src/plugins/browser/document";
import { Model } from "src/logic/home";
import { getagoTimeStamp, getTip } from "src/lib/tool";
import { address } from "src/logic/common/wallet";
import * as echarts from "echarts";
import { chartConfig } from "src/logic/rank/chartConfig";
const api = new Model();
const param: any = reactive({
  address: address.value ? address.value : "0x6cf9aa65ebad7028536e353393630e2340ca6049",
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
const draw = (xData: Array<string>, series: any) => {
  // @ts-ignore
  const chartOption = chartConfig(xData, series, getTip);
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
