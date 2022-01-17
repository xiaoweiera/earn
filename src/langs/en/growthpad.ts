import { oss } from "src/config";
export default {
  title: 'GrowthPad',
  case: 'Examples',
  growth: '{project} growth',
  apply: "https://docs.google.com/forms/d/e/1FAIpQLSd13i7lYlRFJ9Yi7AJctW9QyviLUGvlscYFN4LJRZTRlIKkdQ/viewform",
  aboutLink: "https://kingdata.medium.com/about-kingdata-growthpad-36907c18440c",
  status: {
    wait: 'Coming soon',
    ing: 'Ongoing',
    closure: 'Ended',
    suspend: 'suspend'
  },
  reward: {
    about: '≈',
    count: 'Reward Amount',
    value: 'Reward Value',
    perPerson: 'The Max Reward Per Person',
    total: 'Reward {count} {token}',
    maxTotal: '{count} {token} at maximum',
    // finished: 'Finish all tasks: {reward}（TOP {count} users）',
    // anytask: 'Finish one of tasks: {reward}（TOP {count} users）',
    finished: 'Finish all tasks: {reward}',
    anytask: 'Finish one of tasks: {reward}',
    send: '(In reward calculation, the final award amount is subject to the actual amount issued after calculation.)',
  },
  register: 'Information Registration',
  submit: 'Register',
  address: {
    warning: 'Finish Information Registration first',
    iCard: 'Your address: ',
    reward: 'Your expected reward: ',
    confirm: 'Confirmation',
    invalid: 'Invalid Address',
    tips: `Once confirmed, the address can't be modified`,
    notify1: '* Please register your address receiving rewards(Rewards for tasks related to TVL will be directly airdropped into the verification address) If you fail to register in time, the reward will not be issued.',
    notify2: '* Rewards will be uniformly distributed to your reward receiving address within 10 working days after the event ends, and rewards for tasks related to holdings will be distributed directly to the verification address.',
    checkMessage: `Submitted
Expected reward +{reward} {token}`,
    week_reward: 'Expected reward (not issued)：<i>{reward} {token}</i>',
    total_reward: 'Settled reward: <i>{reward} {token} (The reward will be issued within 10 working days after the weekly settlement date)</i>'
  },
  about: {
    title: '{project} Dexes',
    reward: 'Token info',
    website: 'Official website',
    community: 'Community',
    projectDetail: 'Project introduction',
    tokenDetail: 'Token introduction',
    name: 'Coin',
    symbol: 'Coin',
    online: 'Online Time',
    count: 'Total',
    marketValue: 'Market Value',
    circulation: 'Circulation',
    price: 'Price',
    luanched: 'Public Chain',
    exchanges: 'Dexes',
    exchangeValues: 'Huobi, Binance and etc'
  },
  countdown: {
    title: 'Opening countdown',
    endTitle:'End the countdown'
  },
  growthTasks: 'Tasks',
  button: {
    invite: 'Invite',   // 要求
    checking: 'Verify', // 资质验证
    testing: 'Verify'   // 去检测
  },
  weibo: {
    success: 'Upload succesfully',
    placeholder: 'Please upload image!',
    article: 'Article URL:',
    articleImg: 'Screenshot: ',
    articlePlaceholder: 'Enter article url',
    notify1: '* Please include individual homepage of mainstream media.',
    notify2: '* The format should be jpg,png and etc. Not more than 5M.',
    // title: 'Write original experience with {count}+ words about {project} and publish to mainstream media.',
    title: 'Write a {count}-word original {project} experience article and publish it in mainstream media.',
    // tips: '* 已提交等待审核，重新提交会替换之前的内容。'
    tips: '* Verifying,when resubmitting the previous information will be covered. ',
    retwitter: 'And retweet the twitter.',
    warn: 'After submitting for review, you cannot modify it. Please check your submission carefully.',
    fail: 'The content of the article does not meet the requirements.'
  },
  invited: {
    count: 'My invitation: ',
    code: 'My invitation code: ',
    partake: 'Sunshine award',
    userCount: 'My invitation (Register):',
    activeCount: 'My invitation (Participate Growthpad):',
    help: `1. Registering with your invitation code and completing more than one set of tasks in any event is considered successful participation in GrowthPad.
2. Relevant rewards of Growthpad are distributed according to the number of statistics.`
  },
  chat: {
    speak: 'And send message in the community.',
    qrcode: 'Scan code to join {name} official wechat community'
  },
  form: {
    address: 'Confirm',
    warning: 'Once confirmed, the address can\'t be modified and the reward will be airdrop.',
    placeholderBsc: 'Enter BSC address',
    placeholderETH: 'Enter ETH address',
    placeholderTelegram: 'Enter your username',
    twitter: 'Enter Twitter ID',
    retwitter: 'Enter Twitter ID',
    sina: 'Enter Weibo ID'
  },
  copy: 'Inviting you to register in KingData，{url}',
  warning: {
    telegram: 'Leaving the telegram group will be regarded as unfinished before the activity ends.',
    follow: 'Removing follow the twitter will be regarded as unfinished before the activity ends.',
    article: 'Deleting the tweet will be regarded as unfinished before the activity ends.',

    twitter: 'Removing follow/Deleting the tweet all will be regarded as unfinished before the activity ends.',
    sina: 'Removing follow/Deleting the repost all will be regarded as unfinished before the activity ends.'
  },

  vip: {
    // invite: '成为 {group} VIP 用户或邀请三名好友。',
    // invite: 'Become {group} VIP or inviting 3 users to register.',
    invite: '{group} VIP (Non-VIP users invite 3 friends).',
    description: 'By inviting 3 users to register KingData.',
    // activity: 'Become {group} VIP or inviting 3 users; Join {project} telegram; Follow {project} Twitter and Retweet the twitter about the activity.',
    activity: '{group} VIP (Non-VIP users invite 3 friends);   Join {project} telegram;   Follow {project} Twitter and retweet the twitter about the activity.'
  },
  activity: {
    twitter: 'This activity'
  },
  front: {
    // '500': '{value}（TOP 500 users）',
    // '2000': '{value}（TOP 2,000 users）',
    '500': '{value}',
    '2000': '{value}'
  },

  wechat: {
    title: '{project}-GrowthPad',
    desc: '做任务支持{project}，领百万token奖励'
  },

  mdx: {
    title: 'Help MDEX grow and receive MDX rewards worth $200,000',
    address: {
      placeholder: 'Enter BSC address',
    },
    dashboard: {
      desc: `In order to give back to community users, MDEX cooperated with KingData to launch an incentive activity worth over $200,000 on GrowthPad. In order to give back to as many supporters as possible, the tasks are set with different difficulty thresholds. And participants only need to complete the task to get the corresponding reward.

      Rule: Before starting the task, participants need to the KingData account and enter the BSC wallet address which is used to receive reward. After filling in, participants can choose the task they want to participate in according to the task description, fill in the corresponding information for verification. If the conditions are verified, the corresponding rewards will be given. Rewards will be uniformly distributed to your registered address after the activity. Rewards will be distributed to your registered address in 10 working days after the event ends ;the reward of tasks about holding quantity will be air-drop into the address verified.`
    },
    about: {
      name: 'MDX',
      exchanges: 'Huobi, Binance and etc',
      online: '1/19/2021',
      count: '1 billion',
      marketValue: '300 millions',
      circulation: '300 millions',
      luanched: 'HECO/BSC',
      detail: `Mdex is the decentralized exchange (DEX) platform built on HECO, the Huobi exchange blockchain. It is strategically positioned as the optimal choice for Eco-token transactions and the largest DeFi ecosystem with DEX, IMO, and DAO integration.

It is a decentralized exchange based on Automated Market Maker (AMM) technology on the HECO and Binance Smart Chain (BSC) with a tune of over $5 billion in total value locked. They aim to create cross-chain compatibility between leading chains to create a composite DEX ecosystem.`,
    },
    // copy: 'Inviting your {title}, {url}',
    copy: 'Oh my god，GrowthPad is so cool！GrowthPad took 500,000 U to reward DeFi users on a large scale！！！Salute！Quickly check your wallet address: {url}',
    // copyIndex: 'Share the GrowthPad $500000 reward with simple finger swipes~ Link：{url}',
    copyIndex: 'Oh my god，GrowthPad is so cool！GrowthPad took 500,000 U to reward DeFi users on a large scale！！！Salute！Quickly check your wallet address: {url}',
    share: {
      title: 'Invite 1 friend to participate in the GrowthPad to share 1% of the total prize pool.',
      // lable: `Invite more and reward more.
      // The amount of reward = the number that you invite / total numbers * 1% total bonus. `,
      lable: `Invite more and reward more. <i>The amount of reward = The number that you invite to participate / total invitations * total bonus* 1%.</i>`,
      telegram: 'https://t.me/MdexEN'
    },
    weibo: {
      label: `The reward is based on the number of followers or article reading volume on different platforms. The more followers and reading volume, the more rewards participants will get. The reward amount is 100~300 MDX. (The number of followers is not less than 2000, and the reading volume is not less than 1000).`,
      description: 'Mainstream media include, but are not limited to, well-known platforms at home and abroad, such as the currency circle media column, Weibo, Twitter, Reddit, WeChat, Zhihu, Bihu, Toutiao and so on.',
    },
    activity: {
      warning: 'The reward will be airdropped into the verification address, which can not be changed.',

      // pancake: 'TVL in PanCakeSwap is more than 10K USDT; Join MDEX telegram; Follow MDEX Twitter; Retweet the twitter about the activity.',
      pancake: 'Users who provide liquidity (TVL) worth over 10,000 USDT in PancakeSwap；Join MDEX telegram; Follow MDEX Twitter and retweet the twitter about the activity.',
      pancakeCondition: 'Qualification: TVL in PancakeSwap is more than 10K USDT.',

      // uniswap: 'TVL in Uniswap is more than 10K USDT; Join MDEX telegram; Follow MDEX Twitter; Retweet the twitter about the activity.',
      uniswap: 'Users who provide liquidity (TVL) worth over 10,000 USDT in UniSwap；Join MDEX telegram; Follow MDEX Twitter and retweet the twitter about the activity.',
      uniswapCondition: 'Qualification: TVL in Uniswap is more than 10K USDT.',

      // sushiswap: 'TVL in Sushiswap is more than 10K USDT; Join MDEX telegram; Follow MDEX Twitter; Retweet the twitter about the activity.',
      sushiswap: 'Users who provide liquidity (TVL) worth over 10,000 USDT in SushiSwap；Join MDEX telegram; Follow MDEX Twitter and retweet the twitter about the activity.',
      sushiswapCondition: 'Qualification: TVL in Sushiswap is more than 10K USDT.',
    },
  },
  channels: {
    title: 'Help Channels grow and receive USDT rewards worth $100,000',
    address: {
      placeholder: 'Enter HECO address',
      tips: '(The reward will be issued with equal value of tokens Can)'
    },
    dashboard: {
      desc: `In order to give back to community users, Channels cooperated with KingData to launch an incentive activity worth over $100,000 on GrowthPad. In order to give back to as many supporters as possible, the tasks are set with different difficulty thresholds. And participants only need to complete the task to get the corresponding reward.

      Rule: Before starting the task, participants need to the KingData account and enter the HECO wallet address which is used to receive reward. After filling in, participants can choose the task they want to participate in according to the task description, fill in the corresponding information for verification. If the conditions are verified, the corresponding rewards will be given. Rewards will be uniformly distributed to your registered address after the activity. Rewards will be distributed to your registered address in 10 working days after the event ends ;the reward of tasks about holding quantity will be air-drop into the address verified. <span style="color: #e9592d;">(All rewards will be issued with equal value of token Can)</span>`
    },
    weibo: {
      label: 'The reward is based on the number of followers or article reading volume on different platforms. The more followers and reading volume, the more rewards participants will get. The reward amount is 30~100 USDT. (The number of followers is not less than 2000, and the reading volume is not less than 1000).',
      description: 'Mainstream media include, but are not limited to, well-known platforms at home and abroad, such as the currency circle media column, Weibo, Twitter, Reddit, WeChat, Zhihu, Bihu, Toutiao and so on.',
    },
    chat: {
      speak: 'And send screenshots of Channels deposit / borrow in the group.'
    },
    share: {
      // telegram: 'https://t.me/ChannelsGlobal',
      telegram: 'https://t.me/ChannelsEN',
      lable: 'Based on the proportion of the number of users inviting,  Divide up the bonus pool of 1%'
    },
    about: {
      name: 'CAN',
      exchanges: 'Huobi, Binance and etc',
      online: '19/1/2021',
      count: '1,000 millions',
      luanched: 'ETH / Omni',
      detail: 'Channels is the safest and most useful decentralized lending platform on HECO. Channels.finance is the first fully decentralized lending platform on HECO, focusing on users’ asset security. The first platform launched LP mortgage lending + LP Asset Mining Aggregator. CAN is the token of Channels platform; The whole circulation is 5,000,000 tokens.'
    },
    task1: {
      title: 'TVL in Venus is more than 10K USDT, and the total amount of deposits and loans in Channels exceeds 1,000 USDT. Join Channels telegram group; Follow Channels Twitter and retweet the twitter；Follow Channels Weibo and repost the weibo.',
      // description: '完成任意任务：<i>最多奖励 {count} {unit}</i>',
      description: 'The following task rewards are settled independently, and the accumulated reward can be <i>up to {count} {unit}</i>.',
    },
    task2: {
      title: 'TVL in Creams is more than 10K USDT, and the total amount of deposits and loans in Channels exceeds 1,000 USDT. Join Channels telegram group; Follow Channels Twitter and retweet the twitter；Follow Channels Weibo and repost the weibo.',
    },
    task3: {
      title: 'TVL in Compounds is more than 10K USDT, and the total amount of deposits and loans in Channels exceeds 1,000 USDT. Join Channels telegram group; Follow Channels Twitter and retweet the twitter；Follow Channels Weibo and repost the weibo.',
    },
    activity: {
      warning: 'The reward will be air-drop into the address verified,which can not be changed.',

      label: 'Qualification: TVL in {group} is more than 10K USDT.',

      telegramDesc: 'Join Channels telegram group and post the screenshot of more than 1K USDT Channels\' loan / deposit  in the group',
      twitterDesc: 'Repost the top twitter and @ 3 friends',
      sinaDesc: 'Weibo and @3 friends'
    },
  },
  coinwind: {
    title: 'Help CoinWind grow and receive MDX rewards worth $200,000',
    address: {
      placeholder: 'Enter BSC address',
    },
    about: {
      online: '25/5/2021',
      count: '100M',
      luanched: 'ETH、HECO、BSC',
      detail: `CoinWind is a HECO and BSC Ecological Single Token pledge Income Optimal Platform. The contract automatically matches pledged tokens to maximize all users’ incomes with a minimum hedging free loss strategy.

CoinWind aims to build a DeFi digital asset bank, launching a product with high yield and safety and reliability, pooling different tokens deposited by users into different pools, and then mobilizing funds from a certain token pool to participate in different liquidity pledge according to the strategy, so as to achieve higher returns for users.

CoinWind now supports the pledge of HECO and BSC mainchain ecologies, and will support more mainchain ecologies such as ETH in the future.`,
    },
    copy: 'Inviting you to participate in {title}, Win 1 million dollars award, {url}',
    share: {
      lable: 'Based on the proportion of the number of users inviting,  Divide up the bonus pool of 1%',
      title: 'CoinWind Lucky Bonus',
      users: 'My invitation(CoindWind):',
      invite: 'The user with the largest number of invitations and the user with the most rewards for completing CoinWind tasks will share 1% of the special prize pool.',
      desc: '* The invitee needs to complete 1 CoinWind special task to be considered as 1 valid inviter.',
      telegram: 'https://t.me/CoinWind'
    },
    dashboard: {
      desc: `In order to give back to community users, CoinWind cooperated with KingData to launch an incentive activity worth over $200,000 on GrowthPad. In order to give back to as many supporters as possible, the tasks are set with different difficulty thresholds. And participants only need to complete the task to get the corresponding reward.

      Rule: Before starting the task, participants need to the KingData account and enter the BSC wallet address which is used to receive reward. After filling in, participants can choose the task they want to participate in according to the task description, fill in the corresponding information for verification. If the conditions are verified, the corresponding rewards will be given. Rewards will be uniformly distributed to your registered address after the activity. Rewards will be distributed to your registered address in 10 working days after the event ends ;the reward of tasks about holding quantity will be air-drop into the address verified.`
    },
    task1: {
      title: 'KingData VIP (Non-VIP users invite 3 friends); Join CoinWind telegram; Follow CoinWind Twitter and retweet the twitter about the activity.',
      // title: 'Become KingData VIP; Join CoinWind telegram; Follow CoinWind Twitter and repost the twitter about the activity.'
    },
    task2: {
      title: 'TVL in Pancake Bunny is more than 10K USDT; Join CoinWind telegram; Follow CoinWind Twitter and retweet the twitter about the activity.',
      condition1: 'Qualification: TVL in PanCake Bunny is more than 10K USDT.',
    },
    task3: {
      title: 'TVL in autofarm is more than 10K USDT; Join CoinWind telegram; Follow CoinWind Twitter and retweet the twitter about the activity.',
      condition1: 'Qualification: TVL in autofarm is more than 10K USDT.',
    },
    task4: {
      title: 'TVL in Belt.fi is more than 10K USDT; Join CoinWind telegram; Follow CoinWind Twitter and retweet the twitter about the activity.',
      condition1: 'Qualification: TVL in Belt.fi is more than 10K USDT.',
    },
    weibo: {
      label: 'The reward is based on the number of followers or article reading volume on different platforms. The more followers and reading volume, the more rewards participants will get. The reward amount is 100~300 COW. (The number of followers is not less than 2000, and the reading volume is not less than 1000)',
      description: 'Mainstream media include, but are not limited to, well-known platforms at home and abroad, such as the currency circle media column, Weibo, Twitter, Reddit, WeChat, Zhihu, Bihu, Toutiao and so on.',
    },

  },
  growthpad: {
    title: 'Help CoinWind',
    address: {
      placeholder: 'Enter BSC / HECO address',
    },
    about: {
      telegram: 'https://t.me/KingDataEN', // 英文电报群
      detail: `GrowthPad is aimed to help the project accurately screen and locate users through accurate user behavior portraits, sophisticated modeling, and efficient task mode. At the same time, GrowthPad helps the project distribute generous rewards to target users and avoid invalid users in order to achieve rapid project growth.

GrowthPad conducts comprehensive mining and analysis of data on the chain and mainstream project data on the public chain, and has established a rich database of user behavior characteristics. Currently GrowthPad supports the following public chains: ETH, HECO, BSC, OKChain.`
    },
    dashboard: {
      banner:`${oss}/nav/growthBannerEn.jpg`,
      reward: {
        count: 'Total Reward',
        value: 'The Max Reward Per Person',
        person: 'Amount of This Reward'
      },
      desc: 'There are already three projects settled in the growth events of this Growth Pad project, namely MDEX, CoinWind and Channels. The total prize pool of this event is Token worth $500,000, of which MDEX growth event bonus is $200,000, CoinWind growth event bonus is $200,000, and Channels growth event bonus is $100,000. Participate in the GrowthPad on this page and share 12,000 USDT extra rewards together.',
    },
    task1: {
      title: 'Post the poster and the content on Twitter, take a screenshot and upload it.'
    },
    task2: {
      title: 'Forward the specified content below to the telegram group, take a screenshot and upload it. The more the forwarding group, the more rewards.',
      desc: 'Your reward = the number of groups you forwarded / total number of forwarding groups * 8,000 USDT.'
    },
    button: {
      save: 'Save image'
    },
    label: {
      upload: 'Upload image:',
      picture: 'Poster picture:',
      content: 'Content:',
      friends: 'Upload the screenshot of the posted Twitter:'
    },
    tips: {
      uploadMax: 'The size does not exceed 2M.',
      portrait: 'The screenshot contains your Twitter profile photo, complete poster + content and publishing time interval.',
      active: 'Long press on the phone to save the picture or open the link in the browser and click to save the picture.'
    },
    share: {
      image: `${oss}/static/share/26771623219339_.pic_hd.jpg`,
      link: 'Share the GrowthPad extra 12,000 USDT reward with simple finger swipes~ Link: <a href="{url}" target="_blank">{url}</a>',
      copy: 'Share the GrowthPad extra 12,000 USDT reward with simple finger swipes~ Link: {url}'
    }
  },
  chainwallet: {
    // 分享标题
    title: 'Help CoinWind',
    project: {
      warn: 'Due to force majeure, the activity is postponed to July 2.'
    },
    dashboard: {
      banner: `${oss}/image/growthpad/chainwallet/banner.jpg`,
      reward: {
        count: 'Total prize pool',
        value: 'Highest reward per person',
        person: 'Reward amount'
      },
      desc: `In order to give back to community users, ChainWallet cooperated with KingData to launch an incentive activity worth 200,000 CHA on GrowthPad. In order to give back to as many supporters as possible, the tasks are set with different difficulty thresholds. And participants only need to complete the task to get the corresponding reward.

Rule: Before starting the task, participants need to the KingData account and enter the BSC wallet address which is used to receive reward. After filling in, participants can choose the task they want to participate in according to the task description, fill in the corresponding information for verification. If the conditions are verified, the corresponding rewards will be given. Rewards will be uniformly distributed to your registered address after the activity. Rewards will be distributed to your registered address in 10 working days after the event ends; the reward of tasks about holding quantity will be air-drop into the address verified.`
    },
    address: {
      placeholder: 'Enter BSC / HECO address',
    },
    about: {
      online: '1/19/2021',
      count: '1 billion',
      luanched: 'BSC',
      detail: `Chain Wallet Team has been deeply involved in the development of wallets, smart contracts, and NFT. Chain Wallet recently formed a business and overseas operation team. Chain Wallet is committed to lowering the industry threshold so that everyone has their own digital assets. In the future, Chain Wallet will work with partners to promote the development of the blockchain industry.`,
      tokenDetail: `Through circulation in various scenarios, CHA serves as a means of payment and proof of membership rights and interests, opening up the entire product business line of Chain Wallet. Users can also participate in Chain Wallet governance by mortgaging CHA when submitting proposals to prevent malicious initiation of proposals. Currently, CHA supports various scenarios such as advertising fee payment, DApp listing, decentralized transaction listing, and token official website inclusion.`,
    },
    help: {
      val1: 'Any problems?',
      val2: 'Contact us',
    },
    task4: {
      title: 'Provide a liquidity in ChainWallet, and get rewards based on the amount of pledge, the maximum reward is 2500 CHA.',
      rule1: 'More than 500 U and less than 10,000 U, reward 250 CHA',
      rule2: 'More than 10,000 U and less than 100,000 U, reward 1,000 CHA',
      rule3: 'More than 100,000 U, reward 2,500 CHA',
      rule4: 'The reward will be airdropped into the verification address.'
    },
    task5: {
      desc: `The reward is based on the number of followers or article readings volume on different platforms. The more follwers and reading volume, the more rewards participants will get. The reward amount is 100~500 CHA. (The number of follwers is not less than 2,000, and the number of readings is not less than 1,000) Mainstream media: Twittter,Facebook,Weibo,Zhihu, Toutiao, etc.`
    }
  },
  heco: {
    title: 'LUCKY HECO'
  }
};
