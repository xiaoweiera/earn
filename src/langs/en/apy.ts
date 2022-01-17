import { oss } from "src/config";
export default {
    test: {
        time: '(Update in {timer} s)'
    },
    webTitle:'DeFi Mining APY List',
    comprehensive:'Total APY',
    single_detail:'simple',
    compound_detail:'compound',
    InterestBear: 'Interest-bearing',
    interest: 'Interest',
    yield: 'Yield',
    single_APY:'Simple APY',
    compound_APY:'Compound APY',
    langType:'En',
    header:{
        chart:'Chart',
        watch:'72hrs monitor',
        report:'Reports',
        growthPad:'GrowthPad',
        apy:'DeFi Mining APY List'
    },
    adsPc:`${oss}/apyTwo/ads1PcEn.gif`,
    adsMobile:`${oss}/apyTwo/ads1MobileEn.gif`,
    footMobileBanner:`${oss}/nav/apyMobileFooterEn.png`,
    footPcBanner:`${oss}/nav/apyFooterEn.png`,
    projectName: 'DeFi Mining APY List',
    projectApply: 'Apply',
    des: `The website collects and sorts out the data of vaults and various lending platform on multiple public chains, and classifies them according to types for users' convenience.`,
    warn: `Disclaimer: The data on this website comes from various platform's public data. King Data has not conducted a security audit of the included content. The content does not constitute investment advice. Please pay attention to the risks!`,
    rightFlaot: {
        jqc: 'Yield APY',
        ck: 'Deposit APY',
        jk: 'Loan APY',
        back: 'Top'
    },
    tableHeader:{
        type:'Project/Coin',
        dataType:'Price/Change'
    },
    vaults: 'Yield',
    lend: 'Deposit',
    load: 'Loan',
    lendMark: 'Total Deposits',
    loadMark: 'Total Borrows',
    lendPlat: 'Lending platform',
    bigChartFilterType: {
        chain: 'Chain',
        type: 'Type',
        plat: 'Platform',
        coin: 'Coin',
        mark: 'Index'
    },
    poolsMarks: 'Index',
    downTip: 'Scan the QR code to download the App, get alerts of TOP APY changes!',
    oneMin: '1 minute ago',
    oneMinUpdate: 'Update:1 minute ago',
    more: 'More',
    times: {
        week: 'Week',
        month: 'Month',
        more: '3 Months',
        custom: 'Custom',
        begin: 'Start',
        end: 'End'
    },
    marks: {
        tvl: 'TVL',
        user: 'Total User Revenue',
        apy: 'Average APY'
    },


    jqcTable: {
        title: 'APY Comparison of DeFi Single Token Yields ',
        option: {
            single_detail:'simple',
            compound_detail:'compound',
            yield: 'Yield',
            remain: 'Remaining',
            tvl: 'TVL',
            remainRatio: 'Remaining ratio'
        },
        oneChartTitle: 'Comparison of APY change on different coin yields',
        twoChartTitle: 'Comparison of APY change on different vaults',
    },
    ckTable: {
        title: 'Deposit-APY Comparison of DeFi lending platforms',
        option: {
            single_detail:'simple',
            compound_detail:'compound',
            yield: 'Yield',
            totalSum: 'Total Deposited',
            outSum: 'Total Borrowed',
        },
        oneChartTitle: 'Comparison of deposit APY change of different coins',
        twoChartTitle: 'Comparison of deposit APY change on different platforms',
        streeChartTitle: 'Comparison of total deposits on different platforms'
    },
    jkTable: {
        title: 'Loan interest Comparison on DeFi lending platforms',
        option: {
            single_detail:'simple',
            compound_detail:'compound',
            interest: 'Interest',
            InterestBear: 'Interest-bearing',
            available: 'Available for loan',
            borrowed: 'Borrowed',
            remainRatio: 'Remaining ratio'
        },
        oneChartTitle: 'Comparison of loan APY changes of different coins',
        twoChartTitle: 'Comparison of loan APY changes on different platforms',
        streeChartTitle: 'Comparison of total amount of loan on different platforms'
    },


    tagAll: 'All',
    backTop:'Top',
    remainRatio:'Remaining ratio',
    apyName:{
        apy:'APY',
        avgApy:'Average APY'
    },
    heco: {
        title: 'HECO Node Election',
        description: {
            votes: 'Total Votes',
            voters: 'Total Participants',
            dateEnd: 'Until The End Of This Round',
            person: '{value}'
        },
        button: {
            vote: 'Vote',
            expand: 'Expand',
            off: 'Off'
        },
        note: {
            label: 'Voting rules',
            texts: [
                `1. Voting Method: Users can vote for candidates by staking HT. 1HT represents 1 vote and can only vote for one candidate. The election will have 11 main nodes and 11 candidate nodes; the top 11 candidates in the ranking are the main nodes, and 12 - 22 are candidate nodes.`,
                `2. Voting Period: The node ranking is updated according to the number of user votes, and rewards are issued every 6 hours.`,
                `3. Exit Mechanism: Users can redeem HT and exit the node voting at any time, and the redeemed HT will be locked in about 3 days before receiving.`
            ]
        },
        head: {
            name: 'Name',
            region: 'Region',
            participants: 'Participants',
            voters: 'Votes',
            percent: 'Percentage of votes',
            ratio: 'Revenue ratio',
            operation: 'Operation',
            update: 'Update time'
        }
    },
    token: {
        mining: 'Farm APY',
        lend: 'Borrow APR',
        search: 'Search',
        pool: {
            add: 'Add pools',
            selected: 'Selected',
            list: 'All pools',
            token: 'Token',
            lp: 'LP',
            lends: 'All best ways to borrow'
        },
        description: `Indicator description: Shows the net inflow of funds per unit time of the selected currency/trading pair. This indicator is calculated using active buying and active selling per unit time. Abnormal changes in funds may cause drastic fluctuations in the market.`
    },
    table: {
        chain: 'Chain',
        type: 'Pool Type',
        tag: 'Pool Strategy',
        interestRate: 'APR Info',
        borrowingLimit: 'Liquidity',
        margin: 'Margin',
        apyTotal: 'APY Info',
        single: 'Single',
        compound: 'Compound',
        remaining: 'Remaining ratio'
    },
    pool: {
        mining: 'Deposit',
        lean: 'Borrow',
        apy: 'APY',
        remainingRatio: 'Remaining ratio',
        single: 'Single',
        compound: 'Compound',

        favorite: 'Favorite',
        added: 'Added',
        cancel: 'Cancelled',
        apr: 'APR',
        info: 'Info',
        poolData: 'Pool Data',
        apyTop5: 'APY TOP 5 Pools Comparison',
        ranking: 'Ranking',
        trending: 'Trending',
    },
    tips: {
        addToken: 'Add Token',
        addTokenLp: 'Add Token & LP',
        title: 'You did‘t add favorite',
        click: 'Please click below',
        addTokenDesc: 'button below to add favorite',
        addTokenLpDesc: 'button below to add favorite',
        noData: 'Oops! No data found '
    }
};
