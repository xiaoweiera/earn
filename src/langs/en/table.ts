export default {
  users: "Users", //用户数
  balance: "Blance", //合约资产
  mcapWithMaxSupplyTvl: "McapWithMaxSupplyTvl", //完整稀释市值/额定TVL
  tvl: "TVL", //TVL
  price: "Price", //当前价格
  currentRoi: "CurrentRoi", //当前收益率%(都是x100后的数字)对比IDO价格
  athPrice: "ATH", //历史最高价
  athRoi: "ATH_ROI", //历史最高涨幅%(都是x100后的数字)
  currentRoiFromAth: "Drop from ATH", //从历史最高价格到现在价格低跌幅%
  atlPrice: "ATHL", //历史最低价
  volume: "Volume", //交易量
  mcapWithCirculationSupply: "MCap", //流通市值(流动量*price)
  mcapWithMaxSupply: "FDV", //总市值(最大供应量*price)
  circulationSupply: "Circulating Supply", //流通量
  maxSupply: "Total Supply", //最大供应量
  owners: "Holders", //所有者数量
  avgPrice: "Avg_Price", //平均价格
  buyer: "Buyer", //买家人数
  seller: "Seller", //卖家人数
  buyerSeller: "Buyer/Seller", //买卖比例
  whales: "Whales", //巨鲸人数
  whalesRadio: "Whales Ratio", //巨鲸人数占总holders的比例
  volumeWithWhales: "Whales Holding", //所有巨鲸持仓量总量
  volumeWithWhalesRadio: "Whales Holding Ratio", //所有巨鲸持仓量总量占总供应量
  holdersFromBlueChip: "BC Holders", //蓝筹Holders
  holdersFromBlueChipRatio: "BC Holders Ratio", //蓝筹占比
  volumeWithBlueChipHolder: "BC Holding", //蓝筹持仓
  volumeWithBlueChipHolderRadio: "BC Holding Ratio", //蓝筹持仓占比
  tradeCount: "TradeCount", //本nft被交易总次数
  avgProfiting: "Avg_Profit", //平均盈利
  profitTradeRadio: "Profit Orders Ratio", //盈利订单占比
  mintCount: "Mint Sold Num", //mint售卖数量
  mintProgress: "Mint Sold", //MINT售出进度条
  mintTime: "Mint Time", //mint时间
  buy_url: "Buy Url", //NFT购买地址
  airdrop_url: "Airdrop_url", //空投地址
  airdrop_amount: "Airdrop_Supply", //空投总量
  airdrop_winner_count: "Airdrop_Num", //空投名额
  airdrop_joined_user: "Users Joined", //空投参与人数
  airdrop_symbol: "Airdrop_Token", //空投代币
  airdrop_start_at: "Airdrop_start_at", //空投开始时间
  airdrop_end_at: "Airdrop_end_at", //空投结束时间
  ido_sale_amount: "IDO Amount", //IDO代币出售
  ido_price: "IDO_Price", //IDO价格
  ido_fundraising_goal: "Fundraising", //筹款目标
  ido_symbol: "Token_Symbol", //IDO代币名称
  ido_start_at: "IDO_Start", //IDO开始时间
  ido_end_at: "IDO_End", //IDO结束时间
  issue_volume: "Total Supply", //发行量
  mint_price: "Mint Price", //mint价格
  mint_start_at: "Mint Start", //mint开始时间
  mint_end_at: "Mint End", //mint结束时间
  price_unit: "", //计价单位
  data_source: "data_source", //数据来源
  push_timestamp: "push_timestamp", //推送时间
  push_to_app: "push_to_app", //推送到app
  cmc_id: "cmc_id", //coinmarketcap项目id
  src_logo_url: "src_logo_url", //数据源logo
  src_site: "src_site", //数据源站点
  src_name: "src_name", //数据源项目名称
  user_id: "User_id", //提交人ID
  user_telegram: "User_telegram", //提交人的TG
  contact: "Contact", //提交人联系方式
  username: "Username", //提交人信息
  sort_num: "sort_num", //排序字段
  is_top: "is_top", //是否置顶
  is_recommend: "Recommend", //运营精选
  is_ad: "is_ad", //广告标识
  is_featured: "is_featured", //特色标识
  state: "state", //审核状态
  is_nft_rank: "is_nft_rank", //为NFT排行榜项目
  is_dapp_rank: "is_dapp_rank", //Dapp排行榜项目
  is_potential_airdrop: "is_potential_airdrop", //潜在空投
  is_airdrop: "is_airdrop", //Dapp发行方式分类:空投
  is_igo: "is_igo", //Dapp发行方式分类：IGO项目
  is_ido: "is_ido", //Dapp发行方式分类:IDO项目
  is_mint: "is_mint", //NFT发行方式分类:Mint项目
  is_nft: "is_nft", //项目类型分类：是否为NFT
  is_dapp: "is_dapp", //项目类型分类：是否为dapp
  recommend_time: "recommend_time", //标记为精选的时间
  update_time: "update_time", //更新时间
  create_time: "create_time", //创建时间
  publish_timestamp: "Publish Time", //发布时间(运营发布到线上的时间戳)
  online_time: "online_time", //项目开盘时间
  name: "Name", //项目名称
  logo: "logo", //项目Logo
  website: "Website", //项目官网
  website_domain: "Website", //官网域名
  symbol: "Token", //平台币
  related_symbols: "Related_Tokens", //相关代币(平台币的array）
  gallery: "Gallery", //图集
  chains: "Chains", //所在公链
  categories: "Categories", //项目类型
  risk: "Risk", //风险标识
  description: "Description", //项目描述(中英文)
  recommendation_reason: "Recommendation", //首页推荐理由(中英文)
  long_description: "Long_description", //项目长描述
  comment: "Comment", //官方评测(中英文)
  participation: "Participation Guide", //参与方式(中英文)
  participation_url: "Participation Url", //参与链接
  medias: "Medias", //社交媒体
  safety: "Audit", //审计机构
  white_paper: "White Paper", //白皮书
  contracts: "Contracts", //合约地址
  contract_list: "Contracts List", //合约地址列表
  community: "Community", //社区信息
  cover: "cover", //封面
  tge_platform: "tge_platform", //发行平台
  clout: "clout", //热度(显示评分人数)
  sys_clout: "sys_clout", //热度(系统评分人数-默认生成50-100)
  overall_score: "overall_score", //综合得分(显示综合评分)
  score: "score", //得分(系统综合评分-默认生成7-9.8)
  remark: "remark", //备注
  shortlist_reason: "", //入围理由
  award_reason: "", //获奖理由
  final_score: "", //年度榜单活动截止时刻的项目综合得分
  final_clout: "", //年度榜单活动截止时刻的总打分人数
  whalesRatio: "WhalesRatio", // 巨鲸人数占总holders的比例
  volumeWithWhalesRatio: "volumeWithWhalesRatio", //所有巨鲸持仓量总量占总供应量
  VolumeWithBlueChipHolderRatio: "VolumeWithBlueChipHolderRatio", //蓝筹持仓占比
};
