/**
 * @file 数据处理
 * @author svon.me@gmail.com
 */
import _ from "lodash";
import DBList from "@fengqiaogang/dblist";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { ProjectType } from "src/types/echarts/data";
import type { LegendItem, YAxis } from "src/types/echarts/type";
import { EchartData, SeriesType } from "src/types/echarts/type";
import { isEmpty, AnyEquals, convertInterval, dateFormat, dateTime, dateYMDFormat, dateYMDHmFormat, isObject, uuid, toArray } from "src/utils/";

// 对 API 返回的 echart 数据进行二次处理
export const echartTransform = function (trends?: EchartData): EchartData | undefined {
  if (trends) {
    const intervalValue: string = safeGet<string>(trends, "interval") || "1D";
    const interval = convertInterval(intervalValue);
    const yAxis: YAxis = {
      left: "",
      right: "",
    };
    //@ts-ignore
    const legends = _.map(trends.legends, function (item: LegendItem) {
      const data = { ...item };
      // 未设置图形类型
      if (!data.type) {
        // 默认折线图
        data.type = SeriesType.line;
      }
      if (item.unit) {
        if (item.kline) {
          yAxis.right = item.unit;
        } else {
          yAxis.left = item.unit;
        }
      }
      return data;
    });

    const xAxis = _.map(trends.xAxis, function (date: number) {
      const time = dateTime(date);
      if (interval.type === "h") {
        const date = dateYMDHmFormat(time);
        return {
          time,
          date,
          value: dateFormat(time, "MM/DD HH:mm"),
        };
      } else {
        const date = dateYMDFormat(time);
        return {
          time,
          date,
          value: date,
        };
      }
    });
    const db = new DBList(legends, "id");
    const series = _.map(trends.series, function (list: Array<string | number>, id: string) {
      const legend = db.selectOne<LegendItem>({ id });
      const unit = safeGet<string>(legend, "unit") || "";
      const project = safeGet<string>(legend, "project") || "";
      const chain = safeGet<string>(legend, "chain") || "";
      const project_category = safeGet<string>(legend, "project_category") || "";
      const strategy_tags = safeGet<string>(legend, "strategy_tags") || "";
      return _.map(list, function (value: string | number | object, index: number) {
        if (isObject(value)) {
          return Object.assign(
            {
              unit,
              project,
              chain,
              project_category,
              strategy_tags,
              id,
            },
            _.pick(xAxis[index], ["time", "date"]),
            value,
          );
        }
        return Object.assign(
          {
            id,
            value,
            unit,
            project,
            chain,
            project_category,
            strategy_tags,
          },
          _.pick(xAxis[index], ["time", "date"]),
        );
      });
    });

    const result = {
      yAxis,
      xAxis,
      series,
      key: uuid(),
      legends: _.map(legends, function (item: object, index: number) {
        const list: object[] = series[index] as any;
        for (let i = list.length - 1; i >= 0; i--) {
          const value = safeGet(list, `[${i}].value`);
          if (isEmpty(value)) {
            continue;
          }
          safeSet(item, "last", value);
          break;
        }
        return item;
      }),
    };
    return Object.assign(result, _.omit(trends, ["xAxis", "series", "legends"])) as any;
  }
};

// echart 装饰器
export const echart = function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const fun = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    const value = await fun.apply(this, args);
    return echartTransform(value);
  };
};

// - avgProfiting 平均盈利 =??
// - price: 当前价格 = ??
// - avgPrice 平均价格 = ??

const isKline = function (name: string): boolean {
  const keys = ["avgProfiting", "price", "avgPrice"];
  return _.includes(keys, name);
};

const getUnit = function (name: string, projectType?: ProjectType, chains?: string[]): string {
  const unit = {
    tvl: "$",
    mcapWithCirculationSupply: "$",
    whalesRatio: "%",
    volumeWithWhalesRatio: "%",
    holdersFromBlueChipRatio: "%",
    volumeWithBlueChipHolderRatio: "%",
    profitTradeRatio: "%",
  };
  let value: string = safeGet<string>(unit, name) || "";
  if (value) {
    return value;
  }
  const kline = isKline(name);
  if (kline) {
    // dapp 类型项目默认返回 $
    if (projectType === ProjectType.dapp) {
      return "$";
    }
    if (chains && chains.length > 0) {
      for (const chain of chains) {
        if (chain && AnyEquals(chain, "ETH")) {
          value = "eth";
          break;
        }
        if (chain && AnyEquals(chain, "SOLANA")) {
          value = "sol";
          break;
        }
      }
    }
    // nft 默认为 eth
    if (!value && projectType === ProjectType.nft) {
      value = "eth";
    }
  }
  return value;
};

/**
 * chart 数据转换
 * @param legends 查询数据指标
 * @param list    数据列表
 * @param projectType 项目类型
 * @param chains  项目公链
 */
export const dataTransform = function (legends: string[], list: object[], projectType?: ProjectType | string, chains?: string | string[]) {
  const time = "timestamp";
  const xAxis: Array<string | number> = [];
  const series = {};
  _.forEach(legends, function (key: string) {
    safeSet(series, key, []);
  });
  _.forEach(_.sortBy(list, time), function (data: object, index: number) {
    xAxis.push(safeGet(data, time));
    _.forEach(legends, function (key: string) {
      const value = safeGet<number>(data, key);
      safeSet(series, `${key}[${index}]`, value);
    });
  });
  return {
    xAxis,
    series,
    legends: _.map(legends, (name: string) => {
      const kline = isKline(name);
      return {
        name,
        id: name,
        kline,
        unit: getUnit(name, projectType as any, _.compact(toArray(chains))),
        type: kline ? "line" : null, // 如果是价格线，则为曲线
      };
    }),
  };
};
