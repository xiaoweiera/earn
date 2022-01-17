import { oss } from "src/config";
export default {
  title: '快人一步 投 DApp 好项目',
  apply: '提交新项目',
  group: {
    all: '全部类型',
    viewOnline: '查看已上线项目',
    search: '搜索项目'
  },
  header: {
    info: '项目信息',
    mediaData: '社媒数据',
    type: '项目类型',
    time: '上线时间(UTC)',
    operate: '操作',
    projectYield: '项目收益',
  },
  website: '查看更多',
  timeEnd: '剩余时间',
  sort: {
    timeDesc: '按上线时间降序',
    timeAsc: '按上线时间升序',
    priceDesc: '按价格降序',
    priceAsc: '按价格升序',
    clout: '热度排序',
    create_time: '时间排序',
    rec: '运营精选',
    history: '历史项目',
    online: '即将上线'
  },
  status: {
    success: `${oss}/image/dapp/ongoing_cn.png`,
    wait: '/assets/dapp/wait_cn.png'
  },
  page: {
    title: 'KingData DApp 新项目榜单',
    content: '快速发现每个人都在谈论的最新 DApps、DeFi、NFT、游戏和网站。'
  },
  meta: {
    description: 'KingData DApp 新项目榜单 快速发现每个人都在谈论的最新 DApps、DeFi、NFT、游戏和网站。'
  },
  rank:{
    title:'快速发现优质 DApp',
    chartTitle:'所有公链总 TVL',
    comparison:'显示对比',
    searchProject:'搜索项目',
    page:{
      title:'KingData DApp 排行榜',
      content:'快速发现热门 DApps、DeFi、NFT、游戏和网站',
      meta:'KingData 新项目榜单，在这里快速发现人们讨论最多的新产品，以及当下热门的 DeFi 、NFT、Game等 DApp 项目。旨在帮助项目方摆脱传统的冷启动方式，提供一个快速曝光的流量平台。'
    },
    table:{
      order:'排名',
      name:'名称',
      type:'类别',
      chain:'公链',
      user:'用户',
      revenue: '变化率',
      balance:'资产',
      volume:'交易量',
      marketcap:'市值',
      tvl:'TVL/变化率',
      mcap:'MCap/TVL',
      highestYield: '最高收益',
      highestPrice: '开盘最高价',
      costPrice: '成本价',
      onlineTime: '上线时间',
    }
  },
  info: {
    auditReports: '审计公司',
    media: '社交媒体',
    chain: '所在公链',
    state: '项目状态',
    status: '进行中',
    price: '当前价格',
    supply: '发行数量',
    unit: '条'
  },
  comment: {
    title: '项目评测'
  },
  help: {
    title: '参与方式',
    tutorial: '公链使用教程',
    using : '{name}  使用教程'
  },
  share: {
    title: '解锁财富密码',
    label: '分享',
    // message: '分享 3 次链接，解锁财富密码。',
    message: '我在 KingData 发现一个不错的新项目：{link}，你看看',
    step: {
      count: '分享至3个',
      platform: '任意平台或好友',
      send: '发送分享截图至',
      join: '加入优质项目讨论群',
      wechat: '和行业大佬交流信息'
    }
  },
  priceData:{
    high: '最高收益',
    openHighPrice: '开盘最高价',
    openPrice: '成本价',
    base: '成本价',
    count: '发行数量',
    floorPrice: '当前地板价'
  },
  risk: {
    title: '风险评估说明：',
    tips: `该风险评估结果是根据 <i>项目赛道、团队实力、投资机构、生态、代币发行方案、社交媒体热度、安全审计</i>等因素综合进行评估所得评级，该评级仅代表KingData观点，不具备任何投资建议，投资者需谨慎进行操作。`
  },
  empty: {
    title: '暂无待上线项目',
    text1: '"查看历史项目"',
    text2: '，或',
    text3: ' "提交新项目"'
  },
  project: {
    rec: '精选项目',
    audit: '审计',
    media: '社区',
    contracts: '合约',
    whitePaper: '白皮书',
    dashboard: '概览',
    symbol: '代币',
    symbolPrice: '代币价格',
    symbolSale: '代币出售',
    reviews: '测评',
    moreReviews: '查看更多评测',
    news: '资讯',
    airdrop: '空投',
    joinAirDrop: '参与空投',
    moreAirDrop: '更多空投',
    moreProject: '更多项目',
    idoPrice: 'IDO 价格',
    owners: '持有人',
    fundraising: '筹款目标',
    hoursUp: '24H涨幅',
    hoursTrading: '24H交易量',
    marketCap: '市值',
    dilutedMarketCap: '完全稀释后市值',
    circulationSupply: '流通供应量',
    totalSupply: '总供应量',
    maximumSupply: '最大供应量',
    avgPrice: '平均成交价',
    avgFloorPrice: '平均地板价',
    balance:'资产',
    highestYield: '最高收益',
    score: '评分',
    hoursSale: '24H售卖',
    highestPrice: '开盘最高价',
    person: '人',
    totalVolume: '总交易量',
    hotAirdrop: '热门空投',
    statistics: '链上数据',
    tvl: 'TVL',
    floorPrice: '地板价',
    flash: '快讯',
    article: '文章',
    copy: '复制成功',
  }
}
