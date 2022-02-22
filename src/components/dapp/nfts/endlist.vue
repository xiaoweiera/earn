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
    { name: 'Project Name', key: 'nameProject' },//nameProject
    { name: 'Current ROI USD', key: 'salePrice' },
    { name: 'Owners', key: 'token' },
    { name: 'Supply', key: 'supply' },
    { name: 'Floor Price', key: 'endedIn' },
    { name: 'Mint Price', key: 'endedIn' },
    { name: 'Chain', key: 'endedIn' },
    { name: 'Rating', key: 'endedIn' },
  ],
}
</script>
<template>
  <div class="table-box">
    <table class="table-my">
      <thead>
      <tr class="h-11.5 ">
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
                  <div class="nameTag text-number text-left line-height-no">{{item.data_type}}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="text-right pr-8 text-kd14px16px text-global-highTitle text text-number">{{item.categories[0]}}</div>
            </td>
            <td>
              <div class="numberDefault text-number">{{toNumberCashFormat(item.owners,'','','Not Set')}}</div>
            </td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.issue_volume,'','','N/A')}}</div></td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.floor_price,'$','','Not Set')}}</div></td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.mint_price,'$','','Not Set')}}</div></td>
            <td>
              <div class="flex-center justify-center">              
                <IconFont size="16" type="icon-HECO"/>
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
  @apply text-kd12px16px text-global-highTitle text-opacity-65 text-center;
  &:first-child {
    @apply text-left;
  }
  &:nth-child(2) {
    @apply text-right pr-8;
  }
}
tbody td{
  @apply text-kd14px18px text-global-highTitle;
}
.table-box{
  @apply  w-full  bg-global-white rounded-kd16px;
}
.table-my{
  border-collapse:separate;border-spacing: 0px 0px;
  @apply w-full bg-opacity-0 px-7 rounded-kd6px;
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
  @apply text-kd14px16px text-global-highTitle text-center;
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
