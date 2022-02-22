import { oss } from 'src/config/';
export default {
    webTitle:'Defi挖矿收益APY大全',
    comprehensive:'综合',
    single_detail:'单利',
    compound_detail:'复利',
    interest: '利息',
    InterestBear: '计息',
    yield: '产出',
    single_APY:'单利APY',
    compound_APY:'复利APY',
    langType:'中文',
    header: {
        chart: '数据图表',
        watch: '7x24小时监控',
        report: '研究报告',
        growthPad: 'GrowthPad',
        apy: 'DeFi挖矿收益APY大全'
    },
    adsPc:`${oss}/apyTwo/ads1PcCn.gif`,
    adsMobile:`${oss}/apyTwo/ads1MobileCn.gif`,
    footMobileBanner:`${oss}/nav/apyMobileFooter.png`,
    footPcBanner:`${oss}/nav/apyFooter.png`,
    projectName: 'Defi挖矿收益APY大全',
    projectApply: '申请收录',
    des: '本站收集整理了多条公链各借贷平台和机枪池的数据,根据类型将其分类方便您的查看',
    warn: '风险提示：本站数据来源于各平台的公开数据，本站并未对收录内容做安全审计，内容不构成投资建议，请注意风险。',
    rightFlaot: {
        jqc: '机枪池APY',
        ck: '存款APY',
        jk: '借款APY',
        back: '回到顶部'
    },
    tableHeader:{
        type:'项目/币种',
        dataType:'价格/涨跌幅'
    },
    vaults: '机枪池',
    lend: '存款',
    load: '借款',
    lendMark: '存款总额',
    loadMark: '借款总额',
    lendPlat: '借贷平台',
    bigChartFilterType: {
        chain: '所在链',
        type: '类型',
        plat: '平台',
        coin: '币种',
        mark: '指标'
    },


    poolsMarks: '池子指标',
    downTip: '扫码下载 App，获取 APY 第一名变化提醒',
    oneMinUpdate: '更新:1分钟前',
    more: '更多',
    times: {
        week: '近7天',
        month: '近1月',
        more: '近3月',
        custom: '自定义',
        begin: '开始',
        end: '结束'
    },
    marks: {
        tvl: 'TVL',
        user: '用户总收益',
        apy: '平均APY'
    },

    jqcTable: {
        title: 'DeFi 单币种机枪池 APY 对比',
        option: {
            single_detail:'单利',
            compound_detail:'复利',
            yield: '产出',
            remain: '可投额度',
            tvl: '总锁仓',
            remainRatio: '剩余额度'
        },
        oneChartTitle: '各币种机枪池APY趋势对比',
        twoChartTitle: '在不同机枪池 APY 趋势对比',
    },
    ckTable: {
        title: 'DeFi 借贷平台存款 APY 对比',
        option: {
            single_detail:'单利',
            compound_detail:'复利',
            yield: '产出',
            totalSum: '存款总额',
            outSum: '借款总量',
        },
        oneChartTitle: '各币种存款APY趋势对比',
        twoChartTitle: '在不同平台存款的 APY 趋势对比',
        streeChartTitle: '各平台存款总额'
    },
    jkTable: {
        title: 'DeFi 借贷平台借款利息对比',
        option: {
            single_detail:'单利',
            compound_detail:'复利',
            interest: '利息',
            InterestBear: '计息',
            available: '可借',
            borrowed: '借出',
            remainRatio: '剩余额度'
        },
        oneChartTitle: '各币种借款APY趋势对比',
        twoChartTitle: '在不同平台借款的 APY 趋势对比',
        streeChartTitle: '各平台借款总额'
    },
    unitConfig:{
        remain:'可投额度',
        tvl:'总锁仓',
        remainRatio:'剩余额度',
        totalSum:'存款总额',
        outSum:'借款总量',
        available:'可借',
        borrowed:'借出'
    },

    tagAll: '全部',
    backTop:'回到顶部',
    remainRatio:'剩余额度',
    apyName:{
        apy:'APY',
        avgApy:'平均APY'
    },
    heco: {
        title: 'HECO 节点竞选',
        description: {
            votes: '本轮投票总票数',
            voters: '本轮投票总人数',
            dateEnd: '距本轮投票结束',
            person: '{value} 人'
        },
        button: {
            vote: '去投票',
            expand: '展开图表',
            off: '收起图表'
        },
        note: {
            label: '投票规则',
            texts: [
              '1 投票方式：用户通过质押 HT 的方式向候选人投票，1HT代表1票，仅能投给一个候选人，本次竞选开放11个主节点，11个备选节点；HT质押量排名前11的候选人为主节点，第12-22名为备选节点。',
              '2 投票周期：节点排名根据用户投票数更新，奖励每6小时发放。',
              '3 退出机制：投票用户可随时退出节点投票并取回HT，取回的HT锁定大约3天后到账。'
            ]
        },
        head: {
            name: '节点名称',
            region: '所在地区',
            participants: '参与人数',
            voters: '总票数',
            percent: '得票占比',
            ratio: '收益分成比例',
            operation: '操作',
            update: '更新时间'
        }
    },
    token: {
        mining: '挖矿收益',
        lend: '利率收益',
        search: '搜索币种',
        pool: {
            add: '添加矿池',
            selected: '已选池子',
            list: 'APY 所有池子',
            token: '单币',
            lp: 'LP',
            lends: '借贷的所有最佳路径'
        },
        description: '指标描述：展示选定币种/交易对在单位时间内的资金净流入情况，该指标是使用单位时间内主动买入-主动卖出进行计算的，异常的资金变化可能导致行情出现剧烈波动。'
    },
    table: {
        chain: '公链类型',
        type: '矿池类型',
        tag: '矿池策略',
        interestRate: '利率构成',
        borrowingLimit: '可借',
        margin: '杠杆倍数',
        apyTotal: 'APY 构成',
        single: '单利收益',
        compound: '复利收益',
        remaining: '剩余额度'
    },
    pool: {
        mining: '去挖矿',
        lean: '去借贷',
        apy: '收益率',
        remainingRatio: '可投额度',
        single: '单利',
        compound: '复利',

        favorite: '添加自选',
        added: '已收藏',
        cancel: '已取消',
        apr: '利率',
        info: '产出币种',
        poolData: '池子相关数据',
        apyTop5: 'APY TOP 5 池子对比',
        ranking: '排行对比',
        trending: '趋势对比',
    },
    tips: {
        addToken: '添加币种',
        addTokenLp: '添加币种 & LP',
        title: '您未添加自选',
        click: '请点击下方',
        addTokenDesc: '按钮添加你关注的币种',
        addTokenLpDesc: '按钮添加你关注的币种或 LP',
        noData: '暂无数据'
    }
};

