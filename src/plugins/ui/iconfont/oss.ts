/**
 * @file 存储在 Ali OSS 上的图标
 * @author svon.me@gmail.com
 */

import { getEnv } from "src/config";
import { isHttp, Equals } from 'src/utils'

const statusRight = 'status-right' // 右侧箭头

// 保存在 Ali OSS 中的图标
const ossList: string[] = [
  statusRight,
  '24', // 24.svg
  'apy', // apy.svg
  'arrow', // arrow.svg, arrow.png
  'arrow_ok', // arrow_ok.svg
  'calendar', // calendar.svg
  'channels', // channels.svg
  'close', // close.svg
  'coinwind', // coinwind.jpg
  'defi', // defi.svg
  'defi_flow', // defi_flow.svg
  'down', // down.svg
  'growthPad', // growthPad.svg
  'help', // help.svg
  'inter', // inter.svg
  'kingdata', // kingdata.png
  'lang', // lang.png
  'loading', // loading.jpg
  'mdx', // mdx.png
  'mobile', // mobile.svg
  'more', // more.svg
  'nav-more', // nav-more.svg
  'navigation', // navigation.svg
  'new', // new.svg
  'plus', // plus.svg
  'remove', // remove.svg
  'report', // report.svg
  'sina', // sina.svg
  'table', // table.svg
  'top1', // top1.svg
  'trend', // trend.svg
  'twitter-white', // twitter-white.svg
  'union', // union.svg
  'up', // up.svg
  'user', // user.svg
  'vector', // vector.svg
]

const getLink = function(value: string, suffix: string = 'svg'): string | undefined {
  if (value) {
    const env = getEnv();
    if (isHttp(value) || value.includes('.')) {
      return value
    }
    if(Equals(value,'redTip')){
      return `${env.VITE_oss}/common/redTip.png`
    }
    if(Equals(value,'Optimism') || Equals(value,'OptimismYuan')){
      return `${env.VITE_oss}/common/weizhi.png`
    }
    if (Equals(value,'AVALANCHE')) {
      return `${env.VITE_oss}/apyTwo/avaxChain.png`
    }
    if (Equals(value,'SOLANA')) {
      return 'https://res.kingdata.xyz/apyTwo/sol.png'
    }
    if (Equals(value, "vip1")) {
      return `${env.VITE_oss}/static/images/icon/vip1.svg`;
    }
    // 特殊 icon
    if (value === 'down' && suffix === 'png') {
      return 'https://res.kingdata.xyz/nav/down.png'
    }
    if (value === statusRight) {
      return `${env.VITE_oss}/nav/statusRight.png`
    }
    if (ossList.includes(value)) {
      return `${env.VITE_oss}/icon/${value}.${suffix}`
    }
  }
  return void 0
}

export { ossList, getLink }
