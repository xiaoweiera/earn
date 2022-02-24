<script setup lang="ts">
import {ref} from 'vue';
import { toNumberCashFormat } from 'src/utils/convert/to'
defineProps({
  list: {
    type: Object,
  }
})
const data={
  header: [
    { name: 'Project Name', key: 'name' },//nameProject
    { name: 'Type', key: 'data_type' },
    { name: 'Total Ralsed', key: 'ido_fundraising_goal' },
    { name: 'Sale Price', key: 'ido_price' },
    { name: 'Current Price', key: 'current_price' },
    { name: 'Current ROI USD', key: 'current_roi_usd' },
    { name: 'ATH ROI USD', key: 'ath_since_ido' },
    { name: 'Chain', key: 'chain' },
    { name: 'TGE Platform', key: 'tge_platform' },
    { name: 'Rating', key: 'overall_score' },
  ]
}
</script>
<template>
  <div class="table-box">
    <table class="table-my">
      <thead>
      <tr class="h-11.5">
        <template v-for="(item, index) in data.header" :key="index">
          <td class="thead-hr">{{item.name}}</td>
        </template>
      </tr>
      </thead>
      <tbody>
        <template v-for="(item,index) in list" :key="index">
          <tr class="h-14">
            <td>
              <div class="flex-center">
                <IconFont size="32" type="icon-HECOYuan"/>
                <div class="ml-1.5">
                  <div class="numberDefault text-number line-height-no">{{item.name}}</div>
                  <div class="nameTag text-number text-left line-height-no">{{item.symbol}}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="numberDefault text-number" v-if="item.categories">{{item.category}}</div>
            </td>
            <td>
              <div class="numberDefault text-number">{{toNumberCashFormat(item.ido_fundraising_goal,'$','','Not Set')}}</div>
            </td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.ido_price,'$','','Not Set')}}</div></td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.current_price,'$','','Not Set')}}</div></td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.current_roi_usd,'x','','Not Set')}}</div></td>
            <td>
              <div class="numberDefault text-number">{{toNumberCashFormat(item.ath_since_ido,'x','','Not Set')}}</div>
            </td>
            <td>
              <div class="flex-center justify-center">              
                <IconFont size="16" type="icon-HECO"/>
              </div>
            </td>
            <td> 
              <div class="flex-center justify-center">
                <IconFont size="16" type="icon-HECO"/>
                <v-router class="link text-number" href="https:www.baidu.com">Gate.io</v-router>
              </div>
            </td>
            <td>
              <div class="flex-center justify-center">
                <IconFont size="12" type="icon-star"/>
                <span class="star-txt">{{ item.overall_score}}</span>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.thead-hr{
  @apply border-b-1 border-global-highTitle border-opacity-6;
}
thead td{
  @apply text-center text-kd12px16px text-global-highTitle text-opacity-45;
  &:first-child {
    @apply text-left pl-3;
  }
}
tbody td{
  @apply text-center text-kd14px18px text-global-highTitle;
  &:first-child {
    @apply pl-3;
  }
}
.table-box{
  @apply  w-full  bg-global-white rounded-kd16px;
}
.table-my{
  border-collapse:separate;border-spacing: 0px 0px;
  @apply w-full bg-opacity-0 rounded-kd6px;
}

.flex-center{
  @apply flex items-center;
}
.link{
  @apply ml-1 text-global-primary text-kd14px16px;
}
.star-txt{
  @apply ml-1 text-number text-kd14px16px text-global-highTitle;
}
.numberDefault{
  @apply text-kd14px16px text-global-highTitle;
}
.unit{
  @apply ml-1 font-kdFang font-medium text-kd12px16px text-global-highTitle text-opacity-65;
}
.numberChange{
  @apply text-kd12px18px;
}
.nameTag{
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}
.nameNameDes{
  @apply text-kd16px18px text-global-highTitle;
}
.nameDes{
  @apply  text-kd14px16px text-global-highTitle text-opacity-45;
}
</style>
