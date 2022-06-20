<script setup lang="ts">
import DBList from "@fengqiaogang/dblist";
import I18n from "src/utils/i18n/";
import { setInject } from "src/utils/use/state";
// @ts-ignore
import { shortcuts, disabledDate, formatResult } from "src/logic/ui/date";
import safeGet from "@fengqiaogang/safe-get";
import { defineEmits, defineProps, onMounted, ref, computed } from "vue";
import { map, forEach, isString, isNumber, isFunction, toArray, isObject, toBoolean } from "src/utils";
import { ElDatePicker } from "element-plus";
import DateEventName from "./eventname";
const i18n = I18n();
const emitEvent = defineEmits(["change", "update:value"]);

const props = defineProps({
  shortcuts: {
    type: Object,
    default: function () {
      return {
        hour: ["7", "30"],
        day: ["7", "30", "90", "365", "all", "custom"],
      };
    },
  },
  timeEnd: {
    type: [String, Number],
    default: 0,
  },
  hiddenType: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const db = new DBList();

const setUiDate = setInject(DateEventName.value);

const timeIndex = ref<string>("");
const dateType = ref<string>("");
const customTime = ref<number[]>([]);

// @ts-ignore
const dateList = computed(function () {
  const where = {
    key: dateType.value,
  };
  return db.select(where);
});

const formatType = function (value: string) {
  if (value === "hour") {
    return "1H";
  }
  return "1D";
};

// @ts-ignore
const dateTypeList = computed(function () {
  const data = props.shortcuts;
  return map(
    function (key: string) {
      const label = formatType(key);
      let disabled = true;
      if (data[key]) {
        disabled = false;
      }
      return { label, key, disabled };
    },
    ["hour", "day"],
  );
});

const syncData = function (data: any) {
  let list: string[] = [];
  if (data && isFunction(data.value)) {
    list = data.value({ timeEnd: props.timeEnd });
  } else {
    list = toArray(data.value);
  }

  const result = formatResult(list);
  emitEvent("update:value", result);
  emitEvent("change", result);

  // 判断 inject 是否存在
  if (setUiDate) {
    // 通过 inject 更新数据
    setUiDate(result);
  }
};

// @ts-ignore 选中时间
const onClickDate = function (data: any) {
  if (data) {
    if (timeIndex.value === data.id) {
      return false;
    }
    timeIndex.value = data.id;
  }
  // 排除自定义时间的点击事件
  if (data && !data.custom) {
    customTime.value = [];
    syncData(data);
  }
};

// 选择自定义时间
// @ts-ignore
const onChangeCustomTime = function (data: any, value: number[]) {
  const { id, custom } = data;
  const tmp = { id, custom, value };
  syncData(tmp);
};

// 切换日期类型
// @ts-ignore
const onChangeType = function (type: string) {
  if (type && dateType.value !== type) {
    dateType.value = type;
    let autoValue = db.selectOne<any>({ key: type, auto: true });
    if (!autoValue) {
      autoValue = db.selectOne<any>({ key: type });
    }
    if (autoValue) {
      onClickDate(autoValue);
    }
  }
};

onMounted(function () {
  const types: string[] = [];
  forEach(function (list: any[], key: string) {
    types.push(key);
    forEach(function (item: any) {
      const value = isObject(item) ? safeGet(item, "value") : item;
      const auto = isObject(item) ? toBoolean(safeGet<boolean>(item, "default")) : false;
      const label = isObject(item) ? safeGet(item, "label") : "";
      if (value === "custom") {
        db.insert({ key, label: i18n.liquidity.mainHeader.custom, custom: true });
      } else if (label && isFunction(value)) {
        db.insert({ key, label, auto, value, custom: false });
      } else if (isString(value) || isNumber(value)) {
        const data = safeGet(shortcuts, `${value}`);
        if (data) {
          db.insert(Object.assign({ label }, data, { key, auto, custom: false }));
        }
      }
    }, list);
  }, props.shortcuts);

  const [autoType] = types;
  // 设置默认数据
  onChangeType(autoType);
});
</script>

<template>
  <div v-show="dateList.length > 0" class="flex text-kdFang">
    <client-only>
      <div class="date-select-box">
        <template v-for="item in dateList" :key="item.id">
          <template v-if="item.custom">
            <div class="custom-date-picker" :class="{ active: item.id === timeIndex }" @click="onClickDate(item)">
              <span class="custom-label">{{ item.label }}</span>
              <div class="custom-date-box">
                <el-date-picker v-model="customTime" class="ui-date-picker cursor-pointer" :disabledDate="disabledDate(timeEnd)" :unlink-panels="true" format="YYYY-MM-DD" size="mini" type="daterange" range-separator="–" :start-placeholder="i18n.apy.times.begin" :end-placeholder="i18n.apy.times.end" @change="onChangeCustomTime(item, $event)"></el-date-picker>
              </div>
            </div>
          </template>
          <template v-else>
            <span class="date-item" :class="{ active: item.id === timeIndex }" @click="onClickDate(item)">{{ item.label }}</span>
          </template>
        </template>
      </div>
      <div v-if="!hiddenType" class="date-select-box ml-3">
        <template v-for="item in dateTypeList" :key="item.label">
          <template v-if="item.disabled">
            <span class="date-item disabled">{{ item.label }}</span>
          </template>
          <template v-else>
            <span class="date-item" :class="{ active: item.key === dateType }" @click="onChangeType(item.key)">{{ item.label }}</span>
          </template>
        </template>
      </div>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.date-select-box {
  background: #fafbfc;
  border: 1px solid rgba(3, 54, 102, 0.04);
  @apply h-7 h-7 flex items-center justify-center rounded-kd6px;
}
.date-item {
  transition: all 0.3s;
  @apply text-kd12px16px font-medium cursor-pointer;
  @apply inline-block px-2 h-6 rounded-kd4px select-none;
  @apply whitespace-nowrap flex items-center;
  @apply text-kd12px16px font-medium text-global-text-grey;
  &.active {
    &:not(.custom-date-picker) {
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.06);
      @apply text-kd12px16px font-medium text-global-black-title bg-global-white;
    }
  }
}

.custom-date-picker {
  @extend .date-item;
  @apply hidden md:inline-block;
  &.active {
    .custom-label {
      @apply hidden;
    }
  }
  &:not(.active) {
    @apply relative h-7 overflow-hidden;
    .custom-date-box {
      @apply absolute left-0 top-0 right-0 bottom-0 opacity-0;
      ::v-deep {
        .ui-date-picker {
          transform: scale(100);
        }
        input {
          @apply cursor-pointer;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.ui-date-picker {
  padding: 3px !important;
  width: 170px !important;
  @apply text-center;
  i {
    display: none !important;
  }
  input {
    @apply flex-1;
  }
  span {
    width: 16px !important;
    padding: 0 !important;
  }
}
</style>
