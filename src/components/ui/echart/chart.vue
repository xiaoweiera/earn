<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */

import _ from "lodash";
import { uuid, toBoolean } from "src/utils/";
import { $ } from "src/plugins/browser/event";
import window from "src/plugins/browser/window";
import safeGet from "@fengqiaogang/safe-get";
import * as echarts from "echarts";
import { graphic } from "src/logic/ui/echart/option";
import { makeChart, getGrid } from "src/logic/ui/echart/";
import { chartProps } from "src/logic/ui/echart/props";
import { getCurrentInstance, onMounted, onBeforeUnmount } from "vue";
import { Direction, LegendItem } from "src/types/echarts/type";
import safeSet from "@fengqiaogang/safe-set";

const chartName = uuid();

const emitEvent = defineEmits(["load"]);

const props = defineProps(chartProps());

const instance = getCurrentInstance();

const chart = makeChart();

let _$echarts: any;

const getChart = function () {
  if (_$echarts) {
    return _$echarts;
  }
  const vNode = instance?.vnode;
  if (vNode) {
    const dom: HTMLDivElement = vNode.el as any;
    const container = dom.querySelector(".j-echarts");
    if (container) {
      _$echarts = echarts.init(container as HTMLElement);
    }
  }
  return _$echarts;
};

const getBasisOption = function (dom: HTMLElement) {
  const legend = chart.getLegend(props.legend);
  const list = safeGet<object[]>(legend, "data") || [];
  return {
    legend,
    // 背景
    graphic: graphic(30),
    backgroundColor: props.bgColor,
    // 布局
    grid: getGrid(props.legend, dom, list, props.grid),
  };
};

const getOption = function () {
  const series = chart.getSeriesList(props);
  const xAxis = chart.getXAxis(props.direction);
  const yAxis = chart.getYAxis(series, props);
  const opt = {
    series,
    tooltip: chart.getTooltip(),
  };

  // 垂直方向
  if (Direction.vertical === props.direction) {
    safeSet(opt, "xAxis", yAxis);
    safeSet(opt, "yAxis", xAxis);
  } else {
    safeSet(opt, "xAxis", xAxis);
    safeSet(opt, "yAxis", yAxis);
  }
  return opt;
};
// 重置图表大小
const onResize = function () {
  const chart = getChart();
  if (chart) {
    chart.resize({
      silent: true,
      animation: {
        duration: 0,
      },
    });
    setTimeout(function () {
      const option = getBasisOption(chart.getDom());
      chart.setOption(option, {
        replaceMerge: "grid",
      });
    });
  }
};

// 绘制图表
const onDrawing = async function () {
  const chart = getChart();
  if (chart) {
    const value = {
      ...getOption(),
      ...getBasisOption(chart.getDom()),
    };
    if (props.custom) {
      const opt = await Promise.resolve(props.custom<object>(value));
      if (opt) {
        chart.setOption({ ...opt });
      } else {
        chart.setOption(value);
      }
    } else {
      chart.setOption(value);
    }
  }
  return chart;
};

const onSync = async function () {
  const chart = getChart();
  if (chart) {
    let value: object = {
      ...getOption(),
      ...getBasisOption(chart.getDom()),
    };
    if (props.custom) {
      const opt = await Promise.resolve(props.custom<object>(value));
      if (opt) {
        value = opt;
      }
    }
    chart.setOption(value, {
      silent: true,
      replaceMerge: ["series", "legend", "yAxis", "xAxis"],
    });
  }
};

const onChangeLegend = function (data: object) {
  const name = safeGet<string>(data, "name");
  if (name && chart.legend) {
    const disabled = toBoolean(safeGet<boolean>(data, `selected.${name}`));
    const list: LegendItem[] = [];
    for (const item of chart.legend.value) {
      if (item.name === name) {
        const data = {
          ...item,
          disabled: !disabled,
        };
        list.push(data);
      } else {
        list.push(item);
      }
    }
    chart.setLegend(list);
    onSync();
  }
};

const init = async function () {
  const chart = await onDrawing();
  if (chart) {
    // 监听浏览器大小变化事件
    $(window).on(`resize.${chartName}`, _.debounce(onResize, 300));
    // 监听图例点击事件
    chart.on("legendselectchanged", _.debounce(onChangeLegend, 300));
  }
  emitEvent("load");
};

onMounted(function () {
  return setTimeout(init);
});
onBeforeUnmount(function () {
  $(window).off(`resize.${chartName}`);
});
</script>

<template>
  <div>
    <div class="h-full j-echarts"></div>
  </div>
</template>
