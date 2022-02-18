<script setup lang="ts">
import {ref} from 'vue';
import { toNumberCashFormat } from 'src/utils/convert/to'
const data={
  header: [
    { name: 'Project Name', key: 'nameProject' },//nameProject
    { name: 'Type', key: 'salePrice' },
    { name: 'Total Ralsed', key: 'token' },
    { name: 'Sale Price', key: 'supply' },
    { name: 'Current Price', key: 'endedIn' },
    { name: 'Current ROI USD', key: 'endedIn' },
    { name: 'ATH ROI USD', key: 'endedIn' },
    { name: 'Chain', key: 'endedIn' },
    { name: 'TGE Platform', key: 'endedIn' },
    { name: 'Rating', key: 'endedIn' },
  ],
  list: [
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
    { name: 'Astar Network',tips:'ASTR', Type:'挖矿',Ralsed:88888.88,Sale:0.0756,Price:13.573,Current:755.82,ROI:319,Chain:'1',Platform:'Gate.io',Rating:8.0},
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
        <template v-for="(item,index) in data.list" :key="index">
          <tr class="h-14">
            <td>
              <div class="flex-center">
                <IconFont size="32" type="icon-HECOYuan"/>
                <div class="ml-1.5">
                  <div class="numberDefault text-number line-height-no">{{item.name}}</div>
                  <div class="nameTag text-number text-left line-height-no">{{item.tips}}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="numberDefault text-number">{{item.Type}}</div>
            </td>
            <td>
              <div class="numberDefault text-number">{{toNumberCashFormat(item.Ralsed,'$','','Not Set')}}</div>
            </td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.Sale,'$','','Not Set')}}</div></td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.Price,'$','','Not Set')}}</div></td>
            <td><div class="numberDefault text-number">{{toNumberCashFormat(item.Current,'x','','Not Set')}}</div></td>
            <td>
              <div class="numberDefault text-number">{{toNumberCashFormat(item.ROI,'x','','Not Set')}}</div>
            </td>
            <td>
              <div class="flex-center text-left">              
                <IconFont size="16" type="icon-HECO"/>
              </div>
            </td>
            <td> 
              <div class="flex-center">
                <IconFont size="16" type="icon-HECO"/>
                <v-router class="link text-number" href="https:www.baidu.com">Gate.io</v-router>
              </div>
            </td>
            <td>
              <div class="flex-center">
                <IconFont size="12" type="icon-star"/>
                <span class="star-txt">{{ item.Rating}}</span>
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
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
  &:first-child {
    @apply pl-3;
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
