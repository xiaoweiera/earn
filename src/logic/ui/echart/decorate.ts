/**
 * @file 数据处理
 * @author svon.me@gmail.com
 */
import _ from "lodash";
import DBList from "@fengqiaogang/dblist";
import type { LegendItem, YAxis } from "src/types/echarts/type";
import { EchartData, SeriesType } from "src/types/echarts/type";
import { convertInterval, dateTime, dateYMDHmFormat, dateFormat, dateYMDFormat, isObject, uuid } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";

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
      legends,
      key: uuid(),
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
