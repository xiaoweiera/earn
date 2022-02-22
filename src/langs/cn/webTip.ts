import { oss } from 'src/config/';
export default {
    go:'立即体验',
    newFeatures:'新增功能',
    fixIcon:'🎉',
    fix:'更新优化',
    address:{
        name: ['大户地址追踪 🔥'],
        img: `${oss}/common/addressTipCn.jpg`,
        title: '大户地址追踪 🔥',
        href: '/whaleaddress/change',
        contents:[''],
        descs: [
            `掌握巨鲸资产动向 ，捕获潜力财富密码，巨鲸持仓解析、 投资分布总览、交易行为监控、大额异动播报。现已追踪SBF、孙哥、三箭资本、V神等150+地址。`,
        ]
    },
    comment:{
        name: ['DApp项目测评 🔥'],
        img: `${oss}/image/dapp/testCn.jpg`,
        title: 'DApp项目测评 🔥',
        href: '/dapp/discover',
        contents:[''],
        descs: [
            '1. DApp新项目正式上线评测功能，助您更好的判断和遴选投资标的',
            '2. 正式开启“测评师招募计划” ，诚邀行业内社区长、KOL、资深从业者加入，扫码即可申请'
        ]
    },
    apy:{
        name: ['APY 焕然一新 🔥'],
        img: `${oss}/apyTwo/apyTipCn.jpg`,
        title: 'APY 焕然一新 🔥',
        href: '/apy',
        contents:[''],
        descs:[
            '1、挖矿APY拥有多样榜单。从安全、高收益、热点概念项目角度助力您快速发现最适自己的矿池。如：一年翻倍专区，TVL 百万矿区，GameFi 概念专区等；分析矿池收录了LP池，拥有更多选择。',
            '2、新增借贷 APR 多样榜单。借贷最佳路径推荐，帮助您快速发现低成本借贷最佳路径。并有真实利率计算器，综合对比真实借款成本，做出更正确的决策。',
            '3、新增项目 APY 分析。TVL、支持公链、池子数、审计报告等项目信息一应俱全；同类项目、数据对比，优劣一目了然。',
            '4、新增币种 APY 分析。同一 Token 放在哪里收益最高，最安全，一点便知。'
        ]
    },
    down:{
        name: ['DEX 数据下钻 🔥'],
        img: `${oss}/liquidity/dexCn.jpg`,
        title: 'DEX 数据下钻 🔥',
        href: '/liquidity',
        contents:['增加“数据详情展示”功能。'],
        descs:['用户在放大图表状态下，点击图表中任意柱图，可展示该时间范围中所有地址行为数据明细。快速定位异常地址，跟着聪明钱做决策。']
    },
    liquidity:{
        name: ['DEX 数据分析 🔥'],
        img: `${oss}/liquidity/webTipCn.jpg`,
        title: 'DEX 数据分析 🔥',
        href: '/liquidity',
        contents:[
            'KingData 新功能上线——全网首家 DEX 数据分析工具'],
        descs: [
            '1. LP+Swap双边数据深度透视分析',
            '2. 更早曝光蓄谋跑路项目',
            '3. 发现聪明的钱流向',
            '4. 大户、散户行为一目了然'
        ]
    },
    topic:{
        name: ['数据看板','时间范围选择 🔥'],
        img: `${oss}/liquidity/topicCn.jpg`,
        title: '数据看板-时间范围选择 🔥',
        href: '/',
        contents:[''],
        descs:[
            '1、数据展示优化，增加全部历史数据展示功能，自定义日期区间展示功能。',
            '2、新增ETH、HECO、BSC、Polygon四条主流公链11组数据对比。其中包括：每日手续费对比、每日每笔手续费对比、待处理交易笔数对比、每日交易次数对比……',
        ]
    },
    fix1:{
        name: '7月28日更新',
        href: '/liquidity',
        descs: [
            '1. 优化了数据图表的体验',
            '2. 修复了数据图表中已知存在问题数据（SUSHI数据修复、MDEX项目数据修复、MDX Token 数据修复、UniSwap数据修复、DeFi数据修复、AMPL数据修复）',
            '3. 新增了UNISWAP V3流动性数据',
            '4. 修复了APY大全目前已知的问题'
        ]
    },
    fix2:{
        name: 'APY收录',
        img: `${oss}/liquidity/apyCn.jpg`,
        href: '/apy',
        title:'APY收录',
        descs: [
            `新收录3个项目，分别是KSwap-OEC、EarnDeFi-HECO、Golff(V2)-HECO+BSC+ETH`
        ]
    },

}
