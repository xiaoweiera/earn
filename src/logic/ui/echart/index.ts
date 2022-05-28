/**
 * @file echarts 配置项
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import _ from "lodash";
import { getBigNumber } from "src/lib/tool";
import { calcYAxis } from "src/logic/ui/echart/series";
import type { Callback } from "src/types/common/";
import { layout } from "src/types/echarts/colors";
import { Direction, EchartsOptionName, GridModel, LegendDirection, LegendItem, Position, SeriesType } from "src/types/echarts/type";
import { compact, flatten, forEach, map, toArray, toBoolean, toNumber } from "src/utils";
import { getReactiveInject, getRefInject, setInject } from "src/utils/use/state";
import { toRaw } from "vue";
import { tooltips as makeTooltipOption, xAxis as makeXAxisOption, yAxisKline as makeYAxisOption } from "./option";
import * as svg from "./svg";
import * as logicToolTip from "./tooltip";

// 获取提示框配置
const getTooltip = function (tooltip: object): object {
  const option = makeTooltipOption();
  const formatter = safeGet<Callback>(tooltip, "formatter");
  const callback = function (data: any) {
    return logicToolTip.formatter(data, formatter);
  };
  return Object.assign({}, option, tooltip, {
    formatter: callback,
  });
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
    const yAxisValue = calcYAxis(data, props.stack && position === Position.left, props.log, max, min);
    const textStyleKey = "axisLabel.textStyle";
    const textStyle = safeGet<string>(yaxisData, textStyleKey);
    const [option] = makeYAxisOption(function (value: number) {
      const formatter = safeGet<Callback>(yaxisData, "axisLabel.formatter");
      let res: string | number = 0;
      if (props.log) {
        if (value === 0) {
          return 0;
        }
        res = getBigNumber(Math.pow(10, value));
      } else {
        res = getBigNumber(value);
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
      safeSet(option, textStyleKey, Object.assign(temp, textStyle));
    }
    return Object.assign(
      {},
      option,
      yAxisValue,
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
const getLegend = function (yAxisData: object[], legends: LegendItem[], direction: LegendDirection | boolean = LegendDirection.bottom) {
  const getYAxisValue = getYAxisData(yAxisData);
  const data: object[] = [];
  const selected: object = {};
  _.forEach(legends, function (item: LegendItem) {
    const name = safeGet<string>(item, "name");
    const disabled = safeGet<boolean>(item, "disabled");
    if (name && item.show) {
      safeSet(selected, name, !disabled);
      // @ts-ignore
      const code = svg.source[item.type];
      const { itemStyle } = item;
      const opt = {
        name,
        value: toRaw(item),
        icon: `path://${code}`,
      };
      if (itemStyle) {
        Object.assign(opt, { itemStyle });
      }
      if (item.position === Position.right) {
        const autoColor = safeGet(item, "itemStyle.color");
        if (!autoColor) {
          const yAxis = getYAxisValue(Position.right) || {};
          const color = safeGet(yAxis, "axisLabel.textStyle.color");
          safeSet(opt, "itemStyle.color", color);
        }
      }
      data.push(opt);
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
  } else if (direction === LegendDirection.bottom) {
    safeSet(option, "bottom", 0);
  } else {
    safeSet(option, "show", false);
  }
  return option;
};

// 设置 series Y轴参考位置
const correctYaxisIndex = function (legends: LegendItem[]): any {
  return function (index: number) {
    const item = legends[index];
    let yAxisIndex = 0;
    if (item.position === Position.right && legends.length > 1) {
      yAxisIndex = 1;
    }
    return Object.assign({}, item, { yAxisIndex });
  };
};

// 获取 series 列表数据
const getSeriesList = function (legends: LegendItem[], yAxisOption: object[], series: object[], props: any): object[] {
  const getLegendItem = correctYaxisIndex(legends);
  const seriesList = map((item: object, index: number) => {
    const data = getLegendItem(index);
    // 判断是否需要隐藏数据
    if (!toBoolean(data.show)) {
      return void 0;
    }
    const name = safeGet<string>(data, "name") || safeGet<string>(data, "value");
    const option: any = {
      ...item,
      name,
      type: data.type,
      connectNulls: true,
      yAxisIndex: data.yAxisIndex,
      label: {
        show: false,
      },
      symbol: "none",
    };
    if (toBoolean(data.disabled)) {
      option.data = [];
    }
    safeSet(option, "itemStyle.color", safeGet<string>(data, "itemStyle.color"));

    if (data.type === SeriesType.line) {
      // 线条平滑处理
      option.smooth = true;
      if (data.index === 1) {
        // 右侧价格线删除渐变色
        safeSet(option, "areaStyle", null);
      }
      safeSet(option, "itemStyle.borderWidth", 1);
    } else {
      // 取消阴影部分设置
      safeSet(option, "areaStyle", null);
    }
    // 使用 Y 轴刻度为坐标参照时
    if (data.index === 1) {
      const autoColor = safeGet<string>(data, "itemStyle.color");
      if (!autoColor) {
        // 获取Y轴颜色
        const color = safeGet(yAxisOption, "[1].axisLabel.textStyle.color");
        safeSet(option, "itemStyle.color", color);
      }
    }
    if (data.type === SeriesType.bar) {
      // 柱状图最大宽度
      option.barMaxWidth = 50;
      const color = safeGet<string>(option, "itemStyle.color");
      if (color) {
        safeSet(option, "itemStyle.color", function (d: any) {
          // 负数时强制设置为红色
          if (d.value < 0) {
            return layout.warn;
          }
          return color;
        });
      }
    } else {
      if (props.area && data.index !== 1) {
        let areaColor = "rgba(43, 141, 255, 0.2)";
        const color = safeGet<string>(option, "itemStyle.color");
        if (color) {
          areaColor = color;
        }
        safeSet(option, "areaStyle.normal.color", {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          global: false,
          colorStops: [
            {
              offset: 0,
              color: areaColor,
            },
            {
              offset: 1,
              color: "#fff",
            },
          ],
        });
      }
    }
    if (props.stack && data.position === Position.left) {
      // 开启堆积图
      option.stack = "stack";
    }
    if (props.log) {
      option.data = map(function (item: any) {
        const value: number = item.value;
        if (value || value === 0) {
          // @ts-ignore
          let num: number;
          const origin = value;
          if (value > 0) {
            num = Math.log10(value);
          } else {
            num = Math.abs(toNumber(value));
            num = Math.log10(num) * -1;
          }
          return {
            ...item,
            value: num,
            origin,
          };
        }
        return item;
      }, option.data);
    }
    return option;
  }, series);
  return compact(seriesList);
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
  if (direction === LegendDirection.custom) {
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
  const setLegend = setInject(EchartsOptionName.legend);

  const tooltip = getReactiveInject<object>(EchartsOptionName.tooltip);
  const setTooltip = setInject(EchartsOptionName.tooltip);

  const xAxis = getReactiveInject<object>(EchartsOptionName.xAxis);
  const setXAxis = setInject(EchartsOptionName.xAxis);

  const yAxis = getRefInject<object[]>(EchartsOptionName.yAxis);
  const setYAxis = setInject(EchartsOptionName.yAxis);

  const seriesList = getRefInject<object[]>(EchartsOptionName.series);
  const setSeriesList = setInject(EchartsOptionName.series);

  return {
    tooltip,
    xAxis,
    yAxis,
    legend,
    seriesList,
    setLegend,
    setTooltip,
    setXAxis,
    setYAxis,
    setSeriesList,
    getXAxis: function (direction: Direction) {
      if (xAxis) {
        return getXAxis(toRaw<object>(xAxis), direction);
      }
      return [];
    },
    getYAxis: function (seriesList: object[], props?: object) {
      if (yAxis && yAxis.value && legend && legend.value) {
        return getYAxis(yAxis.value, legend.value, seriesList, props || {});
      }
    },
    getTooltip: function () {
      if (tooltip) {
        return getTooltip(toRaw<object>(tooltip));
      }
      return {};
    },
    getLegend: function (direction: LegendDirection | boolean) {
      if (yAxis && yAxis.value && legend && legend.value) {
        return getLegend(yAxis.value, legend.value, direction);
      }
      return {};
    },
    getSeriesList: function (props?: object) {
      if (legend && legend.value && seriesList && seriesList.value && yAxis && yAxis.value) {
        return getSeriesList(legend.value, yAxis.value, seriesList.value, props || {});
      }
      return [];
    },
  };
};
