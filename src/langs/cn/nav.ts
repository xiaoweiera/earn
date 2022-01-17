import { oss } from "src/config";
export default {
    product:'产品',
    user:'用户名',
    chart:'我的图表',
    outLogin:'退出',
    betaSrc:`${oss}/liquidity/betaCn.png`,
    soonLine:`${oss}/nav/navOnLineTip.jpg`,
    defi:{
        name:'DeFi',
        apy: {
            name:'APY',
            desc:'快速发现高收益矿池',
        },
        liquidity: {
            name:'DEX 聪明钱',
            desc:'流动性资金来龙去脉一目了然',
        },
        quotes: {
            name:'行情与交易',
            desc:'专业的K线图和聚合交易',

        },
    },
    service:{
        name:'Earn',
        growthPad: {
            name:'GrowthPad',
            desc:'做任务赢奖励',

            children:{
                growthPad:{name:'GrowthPad',},
                project:{name:'项目申请',},
                about:{name:'产品介绍',}
            }
        }
    },
    analysis:{
        name:'数据',
        hData: {
            name:'7x24数据预警',
            desc:'不错过任何交易机会',
        },
        chart: {
            name:'数据看板',
            desc:'轻松查看核心业务数据',

            children:{
                chart:{
                    name:'我的图表',
                },
                recommad:{
                    name:'精选推荐',

                },
                special:{
                    name:'特色数据',
                    children:{
                        usdt:{name:'USDT基金数据专题'},
                        shichang:{name:'市场情绪数据专题',},
                        quanqiu:{name:'全球主要金融指数',},
                        huidu:{name:'灰度基金数据',}
                    }
                },
                project:{
                    name:'项目对比数据',
                    children:{
                        dex:{name:'DEX数据对比',},
                        defi:{name:'DeFi总体数据专题',},
                        gonglian:{name:'公链数据对比',},
                    }
                },
                bsc:{
                    name:'BSC及生态项目数据',
                    children:{
                        bsc:{name:'币安BSC数据专题',},
                    }
                },
                heco:{
                    name:'Heco及生态项目数据',
                    children:{
                        mdex:{name:'MDEX 项目数据',},
                        heco:{name:'Heco 公链数据',},
                        mdx:{name:'MDX Token 数据',},
                        coin:{name:'CoinWind 整体数据',},
                    }
                },
                eth:{
                    name:'ETH及生态项目数据',
                    children:{
                        sushi:{name:'SUSHI 项目数据',},
                        uni:{name:'UNI 项目数据',},
                        ampl:{name:'AMPL 项目数据',},
                        eth:{name:'ETH 链上数据',},
                    }
                },
                dot:{
                    name:'DOT及生态项目数据',
                    children:{
                        dot:{name:'DOT 平台数据',},
                    }
                },
                fil:{
                    name:'FIL及生态项目数据',
                    children:{
                        fil:{name:'FIL 平台数据',},
                    }
                },
                exchange:{
                    name:'交易所相关数据',
                    children:{
                        zhuliu:{name:'主流交易所钱包余额专题',},
                        jiaoyi:{name:'交易所BTC流向监控',},
                    }
                }
            }
        },
        report: {
            name:'研究报告',
            desc:'更深、更全的项目研究',

        }
    },
    dataTools:{
        name:'工具',
        top: {
            name:'板块龙头',
            desc:'依据龙头做买卖',

        },
        history: {
            name:'历史的今天',
            desc:'通过历史数据预知风险',

        },
        nav: {
            name:'数据网站导航',
            desc:'所有行业数据网站汇总',

        }
    }

}
