export default {
  users: "用户数", //用户数
  balance: "合约资产", //合约资产
  mcapWithMaxSupplyTvl: "", //完整稀释市值/额定TVL
  tvl: "TVL", //TVL
  price: "价格", //当前价格
  currentRoi: "实时收益率", //当前收益率%(都是x100后的数字)对比IDO价格
  athPrice: "历史最高价", //历史最高价
  athRoi: "历史最高ROI", //历史最高涨幅%(都是x100后的数字)
  currentRoiFromAth: "历史最高价回撤", //从历史最高价格到现在价格低跌幅%
  atlPrice: "历史最低价", //历史最低价
  volume: "交易额", //交易量
  mcapWithCirculationSupply: "流通市值", //流通市值(流动量*price)
  mcapWithMaxSupply: "总市值", //总市值(最大供应量*price)
  circulationSupply: "流通量", //流通量
  maxSupply: "总供应量", //最大供应量
  owners: "持有人", //所有者数量
  avgPrice: "平均价格", //平均价格
  buyer: "买家人数", //买家人数
  seller: "卖家人数", //卖家人数
  buyerSeller: "买卖比例", //买卖比例
  whales: "巨鲸人数", //巨鲸人数
  whalesRadio: "巨鲸人数比", //巨鲸人数占总holders的比例
  volumeWithWhales: "巨鲸持仓总量", //所有巨鲸持仓量总量
  volumeWithWhalesRadio: "巨鲸持仓占比", //所有巨鲸持仓量总量占总供应量
  holdersFromBuleChip: "蓝筹持有人", //蓝筹Holders
  holdersFromBuleChipRatio: "蓝筹持有人占比", //蓝筹占比
  volumeWithBuleChipHolder: "蓝筹持仓", //蓝筹持仓
  volumeWithBuleChipHolderRadio: "蓝筹持仓占比", //蓝筹持仓占比
  tradeCount: "交易次数", //本nft被交易总次数
  avgProfiting: "订单平均盈利金额", //平均盈利
  profitTradeRadio: "盈利订单占比", //盈利订单占比
  mintCount: "Mint 售出数量", //mint售卖数量
  mintProgress: "Mint 售出进度", //MINT售出进度条
  mintTime: "Mint时间", //mint时间
  buy_url: "购买地址", //NFT购买地址
  airdrop_url: "领取空投链接", //空投地址
  airdrop_amount: "空投总量", //空投总量
  airdrop_winner_count: "空投名额", //空投名额
  airdrop_joined_user: "空投参与人数", //空投参与人数
  airdrop_symbol: "空投代币", //空投代币
  airdrop_start_at: "空投开始时间", //空投开始时间
  airdrop_end_at: "空投结束时间", //空投结束时间
  ido_sale_amount: "IDO 数量", //IDO代币出售
  ido_price: "IDO价格", //IDO价格
  ido_fundraising_goal: "筹款目标", //筹款目标
  ido_symbol: "IDO代币名称", //IDO代币名称
  ido_start_at: "IDO开始时间", //IDO开始时间
  ido_end_at: "IDO结束时间", //IDO结束时间
  issue_volume: "发行量", //发行量
  mint_price: "Mint价格", //mint价格
  mint_start_at: "Mint开始", //mint开始时间
  mint_end_at: "Mint结束", //mint结束时间
  price_unit: "", //计价单位
  data_source: "数据来源", //数据来源
  push_timestamp: "推送时间", //推送时间
  push_to_app: "推送到app", //推送到app
  cmc_id: "CMC项目id", //coinmarketcap项目id
  src_logo_url: "数据源logo", //数据源logo
  src_site: "数据源站点", //数据源站点
  src_name: "数据源项目名称", //数据源项目名称
  user_id: "提交人ID", //提交人ID
  user_telegram: "提交人的TG", //提交人的TG
  contact: "提交人联系方式", //提交人联系方式
  username: "提交人信息", //提交人信息
  sort_num: "排序字段", //排序字段
  is_top: "是否置顶", //是否置顶
  is_recommend: "运营精选", //运营精选
  is_ad: "广告标识", //广告标识
  is_featured: "特色标识", //特色标识
  state: "审核状态", //审核状态
  is_nft_rank: "为NFT排行榜项目", //为NFT排行榜项目
  is_dapp_rank: "Dapp排行榜项目", //Dapp排行榜项目
  is_potential_airdrop: "潜在空投", //潜在空投
  is_airdrop: "Dapp发行方式分类:空投", //Dapp发行方式分类:空投
  is_igo: "Dapp发行方式分类：IGO项目", //Dapp发行方式分类：IGO项目
  is_ido: "Dapp发行方式分类:IDO项目", //Dapp发行方式分类:IDO项目
  is_mint: "NFT发行方式分类:Mint项目", //NFT发行方式分类:Mint项目
  is_nft: "项目类型分类：是否为NFT", //项目类型分类：是否为NFT
  is_dapp: "项目类型分类：是否为dapp", //项目类型分类：是否为dapp
  recommend_time: "标记为精选的时间", //标记为精选的时间
  update_time: "更新时间", //更新时间
  create_time: "创建时间", //创建时间
  publish_timestamp: "发布时间(运营发布到线上的时间戳)", //发布时间(运营发布到线上的时间戳)
  online_time: "项目开盘时间", //项目开盘时间
  name: "项目名称", //项目名称
  logo: "项目Logo", //项目Logo
  website: "项目官网", //项目官网
  website_domain: "官网域名", //官网域名
  symbol: "Token", //平台币
  related_symbols: "相关代币(平台币的array）", //相关代币(平台币的array）
  gallery: "图集", //图集
  chains: "所在公链", //所在公链
  categories: "项目类型", //项目类型
  risk: "风险标识", //风险标识
  description: "项目描述", //项目描述(中英文)
  recommendation_reason: "首页推荐理由", //首页推荐理由(中英文)
  long_description: "项目长描述", //项目长描述
  comment: "官方评测", //官方评测(中英文)
  participation: "参与方式", //参与方式(中英文)
  participation_url: "参与链接", //参与链接
  medias: "社交媒体", //社交媒体
  safety: "审计机构", //审计机构
  white_paper: "白皮书", //白皮书
  contracts: "合约地址", //合约地址
  contract_list: "合约地址列表", //合约地址列表
  community: "社区信息", //社区信息
  cover: "封面", //封面
  tge_platform: "发行平台", //发行平台
  clout: "热度(显示评分人数)", //热度(显示评分人数)
  sys_clout: "热度(系统评分人数-默认生成50-100)", //热度(系统评分人数-默认生成50-100)
  overall_score: "综合得分(显示综合评分)", //综合得分(显示综合评分)
  score: "得分(系统综合评分-默认生成7-9.8)", //得分(系统综合评分-默认生成7-9.8)
  remark: "备注", //备注
  shortlist_reason: "", //入围理由
  award_reason: "", //获奖理由
  final_score: "", //年度榜单活动截止时刻的项目综合得分
  final_clout: "", //年度榜单活动截止时刻的总打分人数
};
