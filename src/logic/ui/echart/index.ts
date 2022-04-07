/**
 * @file echarts 配置项
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { toRaw } from "vue";
import { isObject } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { EchartsOptionName, SeriesType, LegendData, Position } from "src/types/echarts/type";
import { getReactiveInject, getRefInject } from "src/utils/use/state";

// 获取提示框配置
const getTooltip = function (tooltip: object): object {
  return tooltip;
};

// 获取 X 轴配置
const getXAxis = function (xAxis: object) {
  return [xAxis];
};

// 获取 Y 轴配置
const getYAxis = function (yAxis: object[]) {
  return _.map(yAxis, (value: object) => toRaw(value));
};

// 获取图例配置
const getLegend = function (legends: object[]) {
  const data: object[] = [];
  const selected: object = {};
  _.forEach(legends, function (item: object) {
    const name = safeGet<string>(item, "name");
    const disabled = safeGet<boolean>(item, "disabled");
    if (name) {
      safeSet(selected, name, !disabled);
      data.push({
        name,
        value: toRaw(item),
      });
    }
  });
  return {
    data,
    selected,
  };
};

// 处理单个数据
const _getSeriesData = function (value: any) {
  if (isObject(value)) {
    return value;
  }
  return { value };
};

// 获取 series 列表数据
const getSeriesList = function (legends: object[], series: object[]): object[] {
  const { data: legendList } = getLegend(legends);
  const option: object[] = [];
  _.forEach(legendList, function (item: object) {
    const name = safeGet<string>(item, "name");
    const legend = safeGet<LegendData>(item, "value") || {};
    const index = legend.index;
    const type: SeriesType = legend.type;
    const position = legend.position;
    const data = safeGet<any[]>(series, `${index}.data`) || [];
    option.push({
      name,
      type,
      yAxisIndex: position === Position.right ? 1 : 0,
      data: _.map(data, (value: any) => _getSeriesData(value)),
    });
  });
  return option;
};

export const makeChart = function () {
  const legend = getRefInject<object[]>(EchartsOptionName.legend);
  const tooltip = getReactiveInject<object>(EchartsOptionName.tooltip);
  const xAxis = getReactiveInject<object>(EchartsOptionName.xAxis);
  const yAxis = getRefInject<object[]>(EchartsOptionName.yAxis);
  const seriesList = getRefInject<object[]>(EchartsOptionName.series);

  return {
    tooltip,
    xAxis,
    yAxis,
    legend,
    seriesList,
    getXAxis: function () {
      if (xAxis) {
        return getXAxis(toRaw<object>(xAxis));
      }
      return [];
    },
    getYAxis: function () {
      if (yAxis && yAxis.value) {
        return getYAxis(yAxis.value);
      }
      return [{ type: "value" }];
    },
    getTooltip: function () {
      if (tooltip) {
        return getTooltip(toRaw<object>(tooltip));
      }
      return {};
    },
    getLegend: function () {
      if (legend && legend.value) {
        return getLegend(legend.value);
      }
      return {};
    },
    getSeriesList: function () {
      if (legend && legend.value && seriesList && seriesList.value) {
        return getSeriesList(legend.value, seriesList.value);
      }
      return [];
    },
  };
};
