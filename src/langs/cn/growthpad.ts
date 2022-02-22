import { oss } from 'src/config/';
import I18n from "~/utils/i18n";
export default {
  title: 'GrowthPad',
  case: '案例',
  growth: '{project} 增长',
  // 申请入驻地址
  apply: "https://docs.google.com/forms/d/e/1FAIpQLSd13i7lYlRFJ9Yi7AJctW9QyviLUGvlscYFN4LJRZTRlIKkdQ/viewform",
  aboutLink: 'https://www.yuque.com/kingdata_growthpad/tlll4r/blz39c',
  status: {
    wait: '即将开始',
    ing: '进行中',
    closure: '已结束',
    suspend: '任务关闭'
  },
  friends: '并@{count}名好友',
  reward: {
    about: '约',
    count: '奖励数量',
    value: '奖励价值',
    perPerson: '每人最高可领取',
    total: '奖励 {count} {token}',
    maxTotal: '最多可得 {count} {token}',
    // finished: '完成全部任务：{reward}（前{count}名用户）',
    // anytask: '完成任意任务：{reward}（前{count}名用户）',
    finished: '完成全部任务：{reward}',
    finishedTop: '完成全部任务：{reward}（前{count}名用户）',
    anytask: '完成任意任务：{reward}',
    send: '(奖励核算中，最终奖励金额以核算后实际发放金额为准。)',
  },
  register: '信息登记',
  submit: '登记',

  address: {
    warning: '请先完成信息登记',
    iCard: '您登记的奖励领取地址为：',
    reward: '预计获得奖励：',
    confirm: '地址确认',
    invalid: '地址无效',
    tips: '地址一旦确认不可修改',
    notify1: '* 请登记您的领取奖励地址，如未及时登记，则奖励不进行发放。',
    notify2: '* 奖励将于活动结束后10个工作日内统一发放到您的奖励接收地址',
    checkMessage: `内容已提交
预计获得奖励 +{reward} {token}`,
    week_reward: '预计获得奖励 (未发放)：<i>{reward} {token}</i>',
    total_reward: '已结算奖励：<i>{reward} {token} (奖励会在每周结算日后10个工作日内发放)</i>'
  },
  about: {
    title: '{project} 去中心化交易所',
    reward: '奖励代币信息',
    website: '项目官网',
    community: '项目社群',
    projectDetail: '项目介绍',
    tokenDetail: '代币介绍',
    name: '代币名称',
    symbol: '代币名称',
    online: '上线时间',
    count: '发行总量',
    marketValue: '市值',
    circulation: '当前流通量',
    price: '当前价格',
    luanched: '所在公链',
    exchanges: '上线交易所',
  },
  countdown: {
    title: '开始倒计时',
    endTitle:'结束倒计时'
  },
  growthTasks: '奖励任务',
  button: {
    invite: '去邀请',
    checking: '资质验证',
    testing: '去检测'
  },
  weibo: {
    success: '图片上传成功',
    error: '图片上传失败',
    placeholder: '请上传图片！',
    article: '文章链接：',
    articleImg: '上传图片：',
    articlePlaceholder: '输入文章链接',
    notify1: '* 截图内容请包含主流媒体个人主页',
    notify2: '* 请上传 .JPG .PNG .JPEG 等文件格式，大小控制在 5 M 以内',
    title: '撰写 {count} 字以上原创 {project} 体验文章，并发布在主流媒体。',
    tips: '* 已提交等待审核，重新提交会替换之前的内容。',
    retwitter: '并转发推特。',
    warn: '提交审核后不可修改，请仔细检查您提交的内容。',
    fail: '文章内容不符合要求'
  },
  invited: {
    count: '我邀请参与活动的人数：',
    code: '我的邀请码：',
    partake: '阳光普照奖',
    userCount: '我邀请注册的人数:',
    activeCount: '注册人数中参与活动的人数:',
    help: `1.使用您的邀请码注册并在任意活动中完成一组以上的任务即算成功参与活动。
2.增长马拉松活动的相关奖励按照该人数进行统计发放。`
  },
  chat: {
    speak: '并完成任意发言。',
    qrcode: '扫码加入 {name} 官方微信社群'
  },
  form: {
    address: '确认地址',
    warning: '地址一旦确认不可修改，任务奖励将发放到该地址中',
    placeholderBsc: '请输入 BSC 地址',
    placeholderETH: '请输入 ETH 地址',
    placeholderHECO: '请输入 HECO 地址',
    placeholderUID: '请输入火币用户ID',
    placeholderTelegram: '输入您的 Username',
    twitter: '请输入 Twitter ID',
    retwitter: '请输入 Twitter ID',
    discord: '请输入您的昵称',
    sina: '请输入您的微博昵称'
  },
  copy: '邀请你注册 KingData，{url}',
  warning: {
    telegram: '活动结束前退出电报群视为未完成任务',
    follow: '活动结束前取消关注视为未完成任务',
    article: '活动结束前删除推文视为未完成任务',
    twitter: '活动结束前取消关注/删除推文视为未完成任务',
    sina: '活动结束前取消关注/删除微博视为未完成任务'
  },
  vip: {
    // invite: '成为 {group} VIP 用户或邀请三名好友注册。',
    invite: '是 {group} VIP 用户（非VIP用户邀请3名好友）',
    description: '邀请三个用户注册即可成为 VIP 用户',
    // activity: 'KingData VIP 用户或邀请三名好友；加入 {project} 电报群；关注 {project} Twitter 并转发本条活动 Twitter。',
    activity: 'KingData VIP 用户（非VIP用户邀请3名好友），加入 {project} 电报群、关注 {project} Twitter、转发本条活动 Twitter。'
  },
  activity: {
    twitter: '本条活动 Twitter',
  },
  front: {
    // '500': '{value}（前500名用户）',
    // '2000': '{value}（前2000名用户）'
    '500': '{value}',
    '2000': '{value}'
  },

  wechat: {
    title: '{project}增长-GrowthPad',
    desc: '做任务支持{project}，领百万Token奖励'
  },

  mdx: {
    title: '助力 MDEX 增长，领取20万美元 MDX 奖励',
    address: {
      placeholder: '输入参与领取奖励的 BSC 地址',
    },
    dashboard: {
      desc: `MDEX 为奖励长期支持 MDEX 的用户，联合 KingData 在 GrowthPad 上开启价值超 $200000 的奖励活动，为尽可能回馈到更多的支持者，任务分别设定了不同难度的门槛，只需要完成任务就可获得对应奖励。

      活动规则：开始任务前需要先登录 KingData 账号并填写用户领取奖励的 BSC 钱包地址，填写完毕后即可根据任务说明选择自己要参加的活动，填写对应的信息进行验证，验证符合条件则给予对应奖励。奖励会在活动结束后 10 个工作日内，统一发放到您登记的地址中；验证持仓价值任务的奖励会发放到您验证持仓的地址中。`,
    },
    about: {
      name: 'MDX',
      exchanges: '火币、币安等23家',
      online: '2021年1月19日',
      count: '10亿',
      marketValue: '3亿',
      circulation: '3亿',
      luanched: 'HECO/BSC',
      detail: `MDEX 是基于自动化做市机制的去中心化交易产品，旨在融合多种基础公链的差异化优势，打造高性能复合型 DEX 生态，以流动性挖矿与交易挖矿的“双重挖矿激励”给予参与者最大化回馈，并通过手续费回购销毁机制实现了自驱式价值捕获生态闭环。

MDEX 致力于打造集 DEX、IMO、DAO 为一体的 DeFi 平台，为更多优质资产提供一站式流动性服务，为用户提供更加安全可信、资产多样、高性价比的交易体验。

MDEX 以 HECO 生态链为起点，MDEX 会将成功经验不断复制到以太坊、波卡生态，不断拓展 MDEX 生态与社区，让更多 DeFi 用户享受到 MDEX 生态的红利。`,
    },
    // copy: '邀请您{title}，{url}',
    copy: '我操，GrowthPad 这个项目真牛逼，拿了 50万U 对 DeFi 用户进行大规模的奖励。你们拿自己的地址去检测看看资格：{url}',
    // copyIndex: '动动手指，瓜分 GrowthPad 50万美元奖励~ 链接：{url}',
    copyIndex: '我操，GrowthPad 这个项目真牛逼，拿了 50万U 对 DeFi 用户进行大规模的奖励。你们拿自己的地址去检测看看资格：{url}',
    share: {
      title: '邀请1名好友参与 GrowthPad 活动，即可瓜分总奖池1%的奖励。',
      // lable: `邀请好友越多，获得奖励越多。<i>用户奖励金额 = 该用户邀请人数 / 总邀请人数 * 总奖池金额 * 1%</i>`,
      lable: `邀请好友越多，获得奖励越多。<i>用户奖励金额 = 该用户邀请参与活动人数 / 邀请参与活动总人数 * 总奖励金额的 1%</i>`,
      telegram: 'https://t.me/MixDex'
    },
    weibo: {
      label: `依据不同平台粉丝数或文章阅读量进行奖励，粉丝数、阅读数据越多，获得奖励越多，奖励金额 100~300 MDX。（粉丝数不低于2000人，阅读量不低于1000）。`,
      description: '主流媒体包括不限于：币圈媒体专栏、微博、Twitter、Reddit、微信公众号、知乎、币乎、头条等国内外知名平台。'
    },
    activity: {
      warning: '该任务奖励会发放到验证的地址中，地址验证后不可修改',

      // pancake: 'PancakeSwap 提供流动性(TVL)超过 10000 USDT，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
      pancake: '在 PancakeSwap 提供流动性(TVL)价值超 10000 USDT的用户，加入 MDEX 电报群，关注 MDEX Twitter，转发本条活动 Twitter。',
      pancakeCondition: '任务资格：PancakeSwap 提供流动性(TVL)超过 10000 USDT',


      // uniswap: 'Uniswap 提供流动性(TVL)超过 10000 USDT，加入 MDEX 电报群，关注 MDEX Twitter 并转发活动 Twitter。',
      uniswap: '在 UniSwap 提供流动性(TVL)价值超 10000 USDT 的用户，加入 MDEX 电报群，关注 MDEX Twitter，转发本条活动 Twitter。',
      uniswapCondition: '任务资格 Uniswap 提供流动性(TVL)超过 10000 USDT',

      // sushiswap: 'SushiSwap 提供流动性(TVL)超过 10000 USDT，加入 MDEX 电报群；关注 MDEX Twitter；转发活动 Twitter。',
      sushiswap: '在 SushiSwap 提供流动性(TVL)价值超 10000 USDT的用户，加入 MDEX 电报群，关注 MDEX Twitter，转发本条活动 Twitter。',
      sushiswapCondition: '任务资格：SushiSwap 提供流动性(TVL)超过 10000 USDT',
    },
  },
  channels: {
    title: '助力 Channels 增长，领取10万美元 USDT 奖励',
    address: {
      placeholder: '输入参与领取奖励的 HECO 地址',
      tips: '(奖励将发放等价值的代币 Can)'
    },
    dashboard: {
      desc: `Channels 为奖励长期支持 Channels 的用户，联合 KingData 在 GrowthPad 上开启价值超 $100000 的激励活动，为尽可能回馈到更多的支持者，任务分别设定了不同难度的门槛，只需要完成任务就可获得对应奖励。

      活动规则：开始任务前需要先登录 KingData 账号并填写用户领取奖励的 HECO 钱包地址，填写完毕后即可根据任务说明选择自己要参加的活动，填写对应的信息进行验证，验证符合条件则给予对应奖励。奖励会在活动结束后统一发放到您登记的地址中；验证持仓价值任务的奖励会发放到您验证持仓的地址中。奖励会在活动结束后 10 个工作日内，统一发放到您登记的地址中；验证持仓价值任务的奖励会发放到您验证持仓的地址中。<span style="color: #e9592d;">（所有奖励将以等价值的代币 Can 进行发放）</span>`
    },
    weibo: {
      label: `依据不同平台粉丝数或文章阅读量进行奖励，粉丝数、阅读数据越多，获得奖励越多，奖励金额 30~100 USDT。（粉丝数不低于2000人，阅读量不低于1000）。`,
      description: '主流媒体包括不限于：币圈媒体专栏、微博、Twitter、Reddit、微信公众号、知乎、币乎、头条等国内外知名平台。'
    },
    chat: {
      speak: '并在群里发布 Channels 存 / 借款截图'
    },
    share: {
      telegram: 'https://t.me/channels_finance',
      lable: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%',
    },
    about: {
      name: 'CAN',
      exchanges: '火币、币安等23家',
      online: '2021年1月19日',
      count: '10亿',
      luanched: 'ETH/Omni',
      detail: 'Channels.finance 是 HECO 上首个完全去中心化的借贷平台，主打用户资产安全性，首发支持LP抵押借贷 + LP 机枪池，目前已支持 17 个主流币种和 12 个 (Mdex) LP 资产抵押借贷。CAN 是平台代币，总流通量 5000000, 已上线火币等交易所。'
    },
    task1: {
      title: 'Venus 提供流动性(TVL)价值超过 10000 USDT，Channels 的存借总额超过 1000 USDT；加入 Channels 电报群；关注 Channels Twitter 并转发推特；关注 Channels 微博并转发微博。',
      description: '以下任务奖励独立结算，<i>累计可得最多奖励 {count} {unit}</i>。',
    },
    task2: {
      title: 'Cream 提供流动性(TVL)价值超过 10000 USDT，Channels 的存借总额超过 1000 USDT；加入 Channels 电报群；关注 Channels Twitter 并转发推特；关注 Channels 微博并转发微博。'
    },
    task3: {
      title: 'Compound 提供流动性(TVL)价值超过 10000 USDT，Channels 的存借总额超过 1000 USDT；加入 Channels 电报群；关注 Channels Twitter 并转发推特；关注 Channels 微博并转发微博。'
    },
    activity: {
      warning: '该任务奖励会发放到验证的地址中，地址验证后不可修改',
      label: '任务资格：{group} 提供流动性(TVL)价值超过 10000 USDT',
      telegramDesc: '并在群里晒出 Channels 存借款总额超过1000U的截图',
      twitterDesc: '并转发置顶推特并 @3个好友',
      sinaDesc: '微博并 @3个好友'
    },
  },
  coinwind: {
    title: '助力 CoinWind 增长，领取20万美元 MDX 奖励',
    address: {
      placeholder: '输入参与领取奖励的 BSC 地址',
    },
    about: {
      exchanges: '火币、币安等23家',
      online: '2021年5月25日',
      count: '1亿',
      luanched: 'ETH、HECO、BSC',
      detail: `CoinWind 是一个 DeFi 智能质押金融平台，通过合约自动将质押的币种进行撮合配对，配合对冲无常损失策略，将用户收益最大化，有效解决了用户单币种质押收益低、LP 质押无常损失大等风险问题。

CoinWind 旨在打造一个 DeFi 数字资产银行，推出高收益与安全可靠并存的产品，将用户存入的不同代币汇集到不同的池中，然后根据策略调动某代币池的资金参与不同的流动性质押，从而为用户实现更高的收益。

CoinWind 产品会通过组合策略有效降低流动性质押中的无常损失。 CoinWind 首发 HECO 生态链，现已垮链到 BSC 上运行。`,
    },
    copy: '邀请您参与${title}，赢取百万美元奖励，{url}',
    share: {
      lable: '根据邀请用户数占总参与人数的比例，瓜分总奖池的1%',
      title: 'CoinWind 专属活动增长大使奖励',
      users: '我的邀请人数(CoinWind 专场)：',
      invite: '邀请人数最多的用户与完成 CoinWind 任务获得奖励最多的用户将共同瓜分专场奖金池的 1%',
      desc: '* 被邀请人需完成 1 个 CoinWind 专场任务才视为 1 个有效邀请人数。',
      telegram: 'https://t.me/coinwind_cn'
    },
    dashboard: {
      desc: `CoinWind 为奖励长期支持 CoinWind 的用户，联合 KingData 在 GrowthPad 上开启价值超 $200000 的激励活动，为尽可能回馈到更多的支持者，任务分别设定了不同难度的门槛，只需要完成任务就可获得对应奖励。

活动规则：开始任务前需要先登录 KingData 账号并填写用户领取奖励的 BSC 钱包地址，填写完毕后即可根据任务说明选择自己要参加的活动，填写对应的信息进行验证，验证符合条件则给予对应 COW 奖励。奖励会在活动结束后统一发放到您登记的地址中；验证持仓价值任务的 COW 奖励会发放到您验证持仓的地址中。奖励会在活动结束后 10 个工作日内，统一发放到您登记的地址中；验证持仓价值任务的奖励会发放到您验证持仓的地址中。`,
    },
    task1: {
      title: 'KingData VIP 用户 (非VIP用户邀请3名好友)，加入 CoinWind 电报群、关注CoinWind Twitter、转发本条活动 Twitter.',
      // title: 'KingData VIP 注册用户；加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的 Twitter。'
    },
    task2: {
      title: 'Pancake Bunny 提供流动性(TVL)价值超过 10000 USDT; 加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的 Twitter。',
      condition1: '任务资格：Pancake Bunny 提供流动性(TVL)价值超过 10000 USDT',
    },
    task3: {
      title: 'autofarm 提供流动性(TVL)价值超过 10000 USDT; 加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的 Twitter。',
      condition1: '任务资格：autofarm 提供流动性(TVL)价值超过 10000 USDT',
    },
    task4: {
      title: 'Belt.fi 提供流动性(TVL)价值超过 10000 USDT; 加入 CoinWind 中文或英文电报群；关注 CoinWind Twitter 且转发本条活动的 Twitter。',
      condition1: '任务资格：Belt.fi 提供流动性(TVL)价值超过 10000 USDT',
    },
    weibo: {
      label: `依据不同平台粉丝数或文章阅读量进行奖励，粉丝数、阅读数据越多，获得奖励越多，奖励金额 100~300 COW。（粉丝数不低于2000人，阅读量不低于1000）。`,
      description: '主流媒体包括不限于：币圈媒体专栏、微博、Twitter、Reddit、微信公众号、知乎、币乎、头条等国内外知名平台。'
    },
  },
  growthpad: {
    title: '助力 CoinWind',
    address: {
      placeholder: '输入参与领取奖励的 BSC / HECO 地址',
    },
    about: {
      telegram: 'https://t.me/KingDataCN', // 中文电报群
      detail: `GrowthPad 通过精准的用户行为画像，精妙的建模、高效的任务模式，旨在让产品可以摆脱传统的冷启动方式，可以快速且精准找到目标用户。同时帮助项目把丰厚奖励分发给目标用户，避免无效用户，以实现项目的快速增长。
GrowthPad 对链上数据以及公链主流项目数据进行了全面挖掘和分析，建立了丰富的用户行为特征数据库。 目前支持的公链包括：ETH、HECO、BSC、OKChain。`
    },
    dashboard: {
      banner:`${oss}/nav/growthBannerCn.jpg`,
      reward: {
        count: '总奖池金额',
        value: '单人最高可获得',
        person: '该项奖励金额'
      },
      desc: '本期 GrowthPad 项目增长活动已入驻 3 家，分别是 MDEX、CoinWind 和 Channels。本期活动总奖池金额为价值 $50 万的 Token ，其中 MDEX 增长活动奖金 $20万，CoinWind 增长活动奖金 $20万，Channels 增长活动奖金 $10 万。参与本页面 GrowthPad 活动，一起瓜分 12000 USDT 额外奖励。',
    },
    task1: {
      title: '转发下方活动海报+指定文案至微信朋友圈，截图并上传。'
    },
    task2: {
      title: '转发下方指定文案至 200 人以上的币圈微信群，截图并上传，转发群越多，奖励越多。',
      desc: '您的奖励金额 = 您转发的群数 / 总转发群个数 * 8000 USDT'
    },
    button: {
      save: '保存图片'
    },
    label: {
      upload: '上传图片:',
      picture: '海报图片:',
      content: '活动文案:',
      friends: '上传朋友圈截图:'
    },
    tips: {
      uploadMax: '上传大小不超过 2M',
      portrait: '截图包含您的微信头像，完整的活动海报 + 文案及发布时间间隔。',
      active: '手机长按保存图片或在浏览器中打开链接点击保存图片'
    },
    share: {
      image: `${oss}/static/share/26801623219557_.pic_hd.jpg`,
      link: '动动手指，就可瓜分 GrowthPad 额外 12000 USDT 奖励~ 链接：<a href="{url}" target="_blank">{url}</a>',
      copy: '动动手指，就可瓜分 GrowthPad 额外 12000 USDT 奖励~ 链接：{url}'
    }
  },
  chainwallet: {
    // 分享标题
    title: '助力 ChainWallet 增长',
    project: {
      warn: '由于不可抗力原因，活动延期至7月2日。'
    },
    dashboard: {
      banner: `${oss}/image/growthpad/chainwallet/banner.jpg`,
      reward: {
        count: '总奖池金额',
        value: '单人最高可获得',
        person: '该项奖励金额'
      },
      desc: 'ChainWallet 为奖励长期支持 ChainWallet 的用户，联合 KingData 在 GrowthPad 上开启20万枚 CHA 的奖励活动，为尽可能回馈到更多的支持者，任务分别设定了不同难度的门槛，只需要完成任务就可获得对应奖励。活动规则：开始任务前需要先登录 KingData 账号并填写用户领取奖励的 BSC 钱包地址，填写完毕后即可根据任务说明选择自己要参加的活动，填写对应的信息进行验证，验证符合条件则给予对应奖励。奖励会在活动结束后 10 个工作日内，统一发放到您登记的地址中；验证持仓价值任务的奖励会发放到您验证持仓的地址中。'
    },
    address: {
      placeholder: '输入参与领取奖励的 BSC / HECO 地址',
    },
    about: {
      online: '2021年1月19日',
      count: '10亿',
      luanched: 'BSC',
      detail: `Chain Wallet Team 一直深耕钱包、智能合约、NFT的开发，Chain Wallet 近期组建了商务、海外运营团队 Chain Wallet 将致力于降低行业门槛，让人人都拥有自己的数字资产，后续我们希望和各位合作伙伴一起建立友好的合作关系，一起推动区块链行业发展。`,
      tokenDetail: `CHA 通过多种场景下的流通，作为支付手段与会员权益身份证明，打通 Chain Wallet 整个产品业务线。也可以参与 Chain Wallet 治理提交提案时需要抵押 CHA，以防止恶意发起提议。当前 CHA 广告费用支付、上架 DApp、上架去中心化交易、代币官网收录等场景。`,
    },
    help: {
      val1: '参加活动遇到问题？',
      val2: '加入电报群联系客服',
    },
    task4: {
      title: '在 ChainWallet 提供一笔流动性，根据质押量获得奖励，最高可得 2500 CHA',
      rule1: '大于 500U 小于 10000U，奖励 250 CHA',
      rule2: '大于 10000U 小于 100000U，奖励 1000 CHA',
      rule3: '大于 100000U，奖励 2500 CHA',
      rule4: '验证持仓价值任务的奖励会发放到您验证持仓的地址中'
    },
    task5: {
      desc: `依据不同平台粉丝数或文章阅读量进行奖励，粉丝数、阅读数据越多，获得奖励越多，奖励金额 100~500 CHA。（粉丝数不低于 2000 人，阅读量不低于 1000） 主流媒体包括不限于：微博、Twitter、币乎、知乎、Facebook、头条、币圈媒体专栏等。`
    }
  },
  heco: {
    // 分享标题
    title: 'LUCKY HECO',
  },
  meme: {
    title: 'KingData 表情包大赛',
    dashboard: {
      description: `我们在 Discord 小组中举办了一场 meme 比赛，奖池为价值 2500 美元的 BabyDoge。请参阅下面的比赛详细信息和机制。
在下方进行信息登记并完成任务列表中的任务即可获得评选资格。

表决：
1、25% 的分数来自 Discord 社区投票，25% 来自 Twitter 点赞，50% 来自 KingData 团队和员工的投票。
2、1 🐢（乌龟）反应 = 1 次社区投票，
3、KingData 团队和员工将在内部投票。

参与时间：
- 参与时间：2022年1月14日-2022年1月22日
- 获奖者公布：2022年1月27日
- 奖励分配：2022年1月31日或之前`
    },
    address: {
      placeholder: '请输入领取奖励的 Bep-20 地址'
    },
    about: {
      title: '奖励信息',
      sub: '奖品总计：2500 美元的 BabyDoge',
      desc: `<span class="text-18-28 block mb-2 text-global-highTitle font-m">其它：</span>
<span class="block">- 比赛的获胜者将通过 Discord 联系。</span>
<span class="block">- KingData 保留对这些规则和机制进行任何最终和具有约束力的修改的权利。</span>`,
      detail: `- 第一名：价值 800 美元的 BabyDoge
- 第二名：价值 500 美元的 BabyDoge
- 第三名：价值 400 美元的 BabyDoge
- 第四名：价值 300 美元的 BabyDoge
- 第五名：价值 200 美元的 BabyDoge
- 第六名：价值 100 美元的 BabyDoge
- 第七名：价值 75 美元的 BabyDoge
- 第八名：价值 60 美元的 BabyDoge
- 第九名：价值 40 美元的 BabyDoge
- 第十名：价值 25 美元的 BabyDoge`
    },
    task1: {
      title: '点击下载',
      value: 'KingData 媒体资产'
    },
    task2: {
      value: 'KingData 官方 Discord 群',
      sub: '创建你的 meme 并将其发布到 #meme-contest 频道。',
      description: '您可以发布多次，但只能以得票最高的一次为准'
    },
    task3: {
      title: '用#KingData #KingDataMeme #MemeContest 在',
      after: '上发布推文',
    }
  },
  emoji: {
    share: '快来和我一起参与KingData专属限量蓝鲸NFT空投活动，共享2022年第一场NFT红包雨吧！，链接{url}',
    banner: '/static/growthpad/emoji_cn.jpg',
    title: "KingData专属限量蓝鲸NFT空投活动",
    placeholder: '请输入领取奖励的 polygon 地址',
    description: `2021年是各类赛道连番起势的一年，也是丰收的一年，加密艺术NFT也在2021年迅速出圈。KingData以平台吉祥物蓝鲸为原型打造了一系列专属限量蓝鲸NFT作为福利空投给所有用户。此次活动，一共空投5款蓝鲸NFT，每款4万枚，共20万枚。用户按照要求完成任务即可获取。
    
    感谢大家的支持与热情，KingData专属限量蓝鲸NFT空投活动受到广泛关注，为响应大家呼吁，KingData决定，将活动时间延长至2022年2月8日23点59分。空投奖励在活动结束后统一发送。`,
    about: {
      title: "KingData 专属限量蓝鲸NFT介绍",
      description: `KingData 是一个基于多维度数据赋能交易的数据聚合与追踪平台。用户可一站式发掘优质新项目、实时监控链上数据动态找到最优投资机会。基于平台性质，结合蓝鲸具有惊人的信息传播能力为灵感，将蓝鲸作为 KingData 吉祥物，同时创造出一系列 KingData 专属限量蓝鲸NFT。
      
      KingdData坚守蓝鲸信息传播品质，励志为每一位用户提供有价值的数据信息。同时，希望以平台专属蓝鲸NFT作为连接双方的纽带，在时代的浪潮中，同步前行，一路相伴。`
    },
    task1: {
      twitter: '推文',
      invite: '邀请三名好友注册 KingData',
      title: '加入KingData社群，并邀请3名用户注册KingData。'
    },
    task2: {
      title: '体验 KingData 产品，并完成指定操作',
    },
    task3: {
      title: '在',
      value: 'KingData 大户地址追踪',
      after: '关注任意巨鲸地址'
    },
    task4: {
      title: '访问',
      value: 'KingData Dapp 项目',
      after: '挑选1个自己喜欢的项目，为该项目写测评'
    },
    task5: {
      title: '访问',
      value: 'KingData Dapp 项目',
      after: '挑选1个自己喜欢的项目，为该项目评分'
    },
    task6: {
      after: '中任意1篇文章至10个Telegram社群并加上简单的推荐文字，并将截图上传'
    }
  }
};
