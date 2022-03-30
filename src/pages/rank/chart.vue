<!--<script lang='ts' setup>-->
<!--import I18n from '~/utils/i18n/index'-->
<!--import { defineProps, onMounted, watch, ref, reactive } from 'vue'-->
<!--import { getChart } from '../../logic/topRank/dapp'-->
<!--import { EchartData, Position } from '~/logic/echarts/interface'-->
<!--import { echartTransform } from '~/lib/common'-->
<!--import {formatRulesNumber,getNumberColor,getTip} from '~/lib/tool'-->
<!--import {chartConfig} from '~/logic/topRank/chartConfig'-->
<!--import { uuid } from '~/utils'-->
<!--import * as echarts from 'echarts'-->
<!--const i18n = I18n();-->
<!--const props = defineProps({-->
<!--  chartData:Object,-->
<!--  loading:Boolean-->
<!--})-->
<!--const loading=ref(true)-->
<!--const chartData=ref({})-->
<!--const chartKey = ref<string>(uuid())-->
<!--let myChart: any = null-->
<!--watch(props, () => {-->
<!--  chartKey.value = uuid()-->
<!--})-->

<!--const getData=async ()=>{-->
<!--  const data=await getChart('dappRank')-->
<!--  chartData.value=data-->
<!--  draw(data.xAxis,data.series)-->
<!--}-->
<!--const draw = (xData: Array<string>, series: any) => {-->
<!--  // @ts-ignore-->
<!--  const chartOption = chartConfig(xData, series,getTip)-->
<!--  myChart.setOption(chartOption)-->
<!--  // @ts-ignore-->
<!--  window.addEventListener('resize', myChart.resize)-->
<!--}-->
<!--onMounted(()=>{-->
<!--  const myChartDom = document.getElementById('rankChart')-->
<!--  if (myChart) {-->
<!--    myChart.dispose();-->
<!--  }-->
<!--  //@ts-ignore-->
<!--  myChart = echarts.init(myChartDom, 'light')-->
<!--  getData()-->
<!--})-->

<!--</script>-->
<!--<template>-->
<!--  <div  class="w-full h-full   relative">-->
<!--    <div class='flex justify-between items-center'>-->
<!--      <div class='text-kd14px18px text-global-highTitle txt45 i8n-font-Barlow'>{{I18n.dapp.rank.chartTitle}}</div>-->
<!--      <div  class='flex imyCharttems-center'>-->
<!--        <span class='text-kd22px22px md:text-kd26px26px text-global-highTitle font-bold exp mr-1.5'>${{formatRulesNumber(chartData.tvl)}}</span>-->
<!--        <span class='text-kd14px18px text-global-numGreen exp h-5.5 w-5.5  flex items-center justify-center text-center mr-1.5 bg-global-numGreen bg-opacity-16 rounded-kd4px'>{{chartData.interval}}</span>-->
<!--        <span :class='getNumberColor(chartData.tvl_change_percent)' class='text-kd14px18px flex items-center  exp mr-0.5'>-->
<!--          {{formatRulesNumber(chartData.tvl_change_percent)}}%-->
<!--          <IconFont v-if='chartData.tvl_change_percent>=0' size='14' class='text-global-numGreen' type='icon-up'/>-->
<!--          <IconFont v-else size='14' class='text-global-numRed' type='icon-down'/>-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class=" w-full   h-26.5   md:h-37  relative">-->
<!--      <div  id="rankChart" class="chartCanvas w-85.75 h-26.5   md:w-129.75 md:h-37 "></div>-->
<!--    </div>-->
<!--    &lt;!&ndash;    <UiLoading v-if="loading"/>&ndash;&gt;-->
<!--  </div>-->

<!--</template>-->
