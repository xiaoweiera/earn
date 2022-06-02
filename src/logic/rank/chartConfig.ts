const grid = () => {
  return {
    left: "0%",
    right: "0%",
    top: "0%",
    bottom: "0%",
    containLabel: false,
  };
};

const tooltips = (getTip: any) => {
  return {
    padding: [8, 10, 8, 10],
    trigger: "axis",
    extraCssText: "z-index:21",
    backgroundColor: "rgba(255, 255, 255, 0.9);",
    textStyle: {
      color: "black",
    },
    borderWidth: 1.5,
    borderColor: "rgba(0, 0, 0, 0.06)",
    confine: true,
    formatter: (value: any) => {
      return getTip(value);
    },
  };
};

const xAxis = (xdata: any) => {
  return {
    axisTick: {
      show: false, // 隐藏刻度线
    },
    axisLine: {
      show: false, // 不显示坐标轴线
    },
    type: "category",
    boundaryGap: false,
    data: xdata,
  };
};

//y轴左侧配置
export const yAxisModel = (max: number | undefined, min: number | undefined) => {
  return {
    show: false,
    axisLine: {
      show: false, // 不显示坐标轴线
    },
    axisTick: {
      show: false, // 隐藏刻度线
    },
    splitLine: {
      show: false,
    },
    type: "value",
    max: max ? max + max * 0.1 : max,
    min: min ? min - Math.abs(min) * 0.1 : min,
  };
};
const seriesModel = (series: any, isArea: boolean) => {
  return [
    {
      data: series,
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: {
        width: 1,
        color: "rgba(0, 180, 100, 1)",
      },
      areaStyle: isArea
        ? {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0, 180, 100, 0.1)", // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(0, 180, 100, 0.0)", //   0% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        }
        : null,
    },
  ];
};

export const chartConfig = (xData: Array<string>, series: any, getTip: any, isArea = true, max?: number | undefined, min?: number | undefined) => {
  return {
    grid: grid(),
    tooltip: getTip ? tooltips(getTip) : null,
    xAxis: xAxis(xData),
    yAxis: yAxisModel(max, min),
    series: seriesModel(series, isArea),
  };
};
