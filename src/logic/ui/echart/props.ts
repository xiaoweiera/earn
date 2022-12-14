import { PropType } from "vue";
import type { Callback } from "src/types/common";
import { layout } from "src/types/echarts/colors";
import type { GridModel } from "src/types/echarts/type";
import { LegendDirection, Direction } from "src/types/echarts/type";

export const chartProps = function () {
  return {
    // 是否开启log效果
    log: {
      type: Boolean,
      default: () => false,
    },
    // 是否开启堆积
    stack: {
      type: Boolean,
      default: () => false,
    },
    // 是否启用阴影 （type = line 时有效）
    area: {
      type: Boolean,
      default: () => false,
    },
    // 自定义 echarts Option 数据
    custom: {
      type: Function as PropType<Callback>,
      default: null,
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: () => layout.bgColor,
    },
    // 图列位置及是否显示
    legend: {
      type: [String, Boolean] as PropType<LegendDirection | boolean>,
      default: () => LegendDirection.bottom,
      validator(value: string | boolean): boolean {
        let status = false;
        switch (value) {
        case LegendDirection.top:
        case LegendDirection.left:
        case LegendDirection.right:
        case LegendDirection.bottom:
        case LegendDirection.custom:
          status = true;
          break;
        }
        if (value === false) {
          status = true;
        }
        return status;
      },
    },
    grid: {
      type: Object as PropType<GridModel>,
      default: function () {
        return {
          top: 15,
          left: 15,
          right: 15,
          bottom: 15,
          containLabel: true,
        };
      },
    },
    // 图形位置
    direction: {
      type: String as PropType<Direction>,
      default: () => Direction.horizontal,
      validator: (value: string) => {
        return value === Direction.horizontal || value === Direction.vertical;
      },
    },
    // 自定义 Class
    customClass: {
      type: String,
      default: () => "h-full",
    },
    // 是否显示 loading 效果
    showLoading: {
      type: Boolean,
      default: () => true,
    },
  };
};
