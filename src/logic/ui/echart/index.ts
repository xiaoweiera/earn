/**
 * @file echarts 配置项
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import { toRaw } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { calcYAxis } from "src/logic/ui/echart/series";
import type { Callback } from "src/types/common/";
import { getReactiveInject, getRefInject } from "src/utils/use/state";
import { xAxis as makeXAxisOption, yAxisKline as makeYAxisOption } from "./option";
import { isObject, toArray, compact, flatten, forEach, toBoolean, numberUint } from "src/utils";
import { EchartsOptionName, SeriesType, LegendData, Position, LegendDirection, GridModel, Direction, LegendItem } from "src/types/echarts/type";

// 获取提示框配置
const getTooltip = function (tooltip: object): object {
  return tooltip;
};

// 获取 X 轴配置
const getXAxis = function (xAxis: object, direction: Direction) {
  const [option] = makeXAxisOption();
  return _.map(toArray(xAxis), function (data: object) {
    const opt = { ...option, ...data };
    // 判断是否是横向展示
    if (direction === Direction.vertical) {
      return _.pick(opt, ["type", "data", "axisTick", "axisLine"]);
    }
    return opt;
  });
};

// 获取 Y 轴配置
// const getYAxis = function (yAxis: object[]) {
//   return _.map(yAxis, (value: object) => toRaw(value));
// };

// 获取 Y 轴配置数据
const getYAxisData = function (yAxisData: any[]) {
  return function (position: Position) {
    for (let i = 0; i < yAxisData.length; i++) {
      const item: object = yAxisData[i];
      const value = safeGet<Position>(item, "position");
      if (value && value === position) {
        return item;
      }
    }
  };
};

export const getYAxis = function (yAxisData: object[], legends: LegendItem[], seriesList: object[], props: any) {
  const leftData: any[] = [];
  const rightData: any[] = [];
  const yaxis: any[] = [];

  forEach(function (item: any, index: number) {
    let value = safeGet<any[]>(seriesList, `[${index}].data`);
    // 判断是否需要隐藏数据
    if (!toBoolean(item.show) || toBoolean(item.disabled)) {
      value = [];
    }
    if (item.position === Position.right) {
      rightData.push(value);
    } else {
      leftData.push(value);
    }
  }, legends);

  const getYAxisValue = getYAxisData(yAxisData);

  const app = function (data: any[], position: Position) {
    const yaxisData = getYAxisValue(position) || {};
    const max = safeGet<number>(yaxisData, "max");
    const min = safeGet<number>(yaxisData, "min");
    const value = calcYAxis(data, props.stack && position === Position.left, props.log, max, min);
    const textStyleKey = "axisLabel.textStyle";
    const textStyle = safeGet<string>(yaxisData, textStyleKey);
    const [option] = makeYAxisOption(function (value: number) {
      const formatter = safeGet<Callback>(yaxisData, "axisLabel.formatter");
      let res: string | number = 0;
      if (props.log) {
        if (value === 0) {
          return 0;
        }
        res = numberUint(Math.pow(10, value));
      } else {
        res = numberUint(value);
      }
      if (formatter) {
        return formatter(res, {
          number: value,
          log: props.log,
        });
      }
      return res;
    });
    if (textStyle) {
      const temp = safeGet(option, textStyleKey) || {};
      const value = Object.assign(temp, textStyle);
      safeSet(option, textStyleKey, value);
    }
    return Object.assign(
      {},
      option,
      value,
      {
        position,
      },
      _.omit(yaxisData, ["position", "axisLabel"]),
    );
  };

  if (leftData.length > 0) {
    const opt = app(leftData, Position.left);
    yaxis.push(opt);
  }
  if (rightData.length > 0) {
    const opt = app(rightData, Position.right);
    yaxis.push(opt);
  }
  return yaxis;
};

// 获取图例配置
const getLegend = function (legends: object[], direction: LegendDirection | boolean = LegendDirection.bottom) {
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

  const option = {
    data,
    selected,
  };
  if (direction === LegendDirection.top) {
    safeSet(option, "top", 0);
  } else if (direction === LegendDirection.left) {
    safeSet(option, "left", 0);
    safeSet(option, "top", "middle");
    safeSet(option, "orient", "vertical");
  } else if (direction === LegendDirection.right) {
    safeSet(option, "right", 0);
    safeSet(option, "top", "middle");
    safeSet(option, "orient", "vertical");
  } else {
    safeSet(option, "bottom", 0);
  }
  return option;
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

export const clacLegendBoxWidth = function (legends: object[]): number {
  let width = 0;
  const list = toArray(legends);
  const array = flatten(list);
  _.forEach(compact(array), (item: object, index: number) => {
    let name = safeGet<string>(item, "name") || safeGet<string>(item, "value");
    name = `${name || ""}`;
    const len = name.length;
    width += len * 9 + 14;
    if (index > 0) {
      width += 15;
    }
  });
  return width;
};

export const clacLegendRows = function (legends: object[], dom: HTMLElement) {
  const width = clacLegendBoxWidth(legends || []);
  if (dom && dom.clientWidth) {
    const boxWidth = dom.clientWidth - 20 * 2;
    return Math.ceil(width / boxWidth);
  }
  return 0;
};

// chart Layout 容器配置
export const getGrid = function (direction: LegendDirection | boolean, dom: HTMLElement, legends: object[], grid: GridModel): GridModel {
  if (!direction) {
    return grid;
  }
  const row = clacLegendRows(legends, dom);
  let height = 35;
  if (row > 1) {
    height = row * 25 + 10;
  }
  if (direction === LegendDirection.top) {
    return {
      top: height,
      left: 15,
      right: 15,
      bottom: 5,
      containLabel: true,
    };
  }
  if (direction === LegendDirection.bottom) {
    return {
      top: 15,
      left: 15,
      right: 15,
      bottom: height,
      containLabel: true,
    };
  }
  if (direction === LegendDirection.left) {
    return {
      top: 10,
      right: 20,
      bottom: 10,
      containLabel: true,
    };
  }
  if (direction === LegendDirection.right) {
    return {
      top: 10,
      left: 10,
      bottom: 10,
      containLabel: true,
    };
  }
  return grid;
};

export const makeChart = function () {
  const legend = getRefInject<LegendItem[]>(EchartsOptionName.legend);
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
    getXAxis: function (direction: Direction) {
      if (xAxis) {
        return getXAxis(toRaw<object>(xAxis), direction);
      }
      return [];
    },
    getYAxis: function (seriesList: object[], props: object) {
      if (yAxis && yAxis.value && legend && legend.value) {
        return getYAxis(yAxis.value, legend.value, seriesList, props);
      }
      return [{ type: "value" }];
    },
    getTooltip: function () {
      if (tooltip) {
        return getTooltip(toRaw<object>(tooltip));
      }
      return {};
    },
    getLegend: function (direction: LegendDirection | boolean) {
      if (legend && legend.value) {
        return getLegend(legend.value, direction);
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
