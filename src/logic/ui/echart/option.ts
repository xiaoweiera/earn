// 设置网格线类型 dotted：虚线   solid:实线
export const splitLine = function (type: "dotted" | "solid" | "dashed", show = false, color?: string) {
  const style: any = { type };
  if (color) {
    style.color = color;
  }
  return {
    show, // 隐藏或显示
    lineStyle: style,
  };
};

export const xAxis = (xData: any[] = []) => {
  return [
    {
      axisTick: {
        show: false, // 隐藏刻度线
      },
      axisLine: {
        show: false, // 不显示坐标轴线
      },
      splitLine: splitLine("dotted"),
      type: "category",
      data: xData,
      align: "left",
      splitNumber: 3,
      axisLabel: {
        align: "left",
        // showMinLabel: false,
        showMaxLabel: false,
        splitNumber: 1,
        textStyle: {
          color: "#989898",
        },
      },
    },
  ];
};

export const graphic = function (fontSize = 22) {
  return {
    elements: [
      {
        type: "group",
        bounding: "raw",
        right: "center",
        bottom: "center",
        z: -100,
        silent: true,
        children: [
          {
            type: "text",
            left: "center",
            top: "center",
            z: 100,
            silent: true,
            style: {
              fill: "rgba(43, 140, 255, 0.08)",
              text: "KingData.com",
              font: `bold ${fontSize}px sans-serif`,
            },
          },
        ],
      },
    ],
  };
};
