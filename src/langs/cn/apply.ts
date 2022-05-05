export default {
  title: "提交项目",
  description: "KingData 新项目榜单，在这里快速发现人们讨论最多的新产品，以及当下热门的 DeFi 、NFT、Game等 DApp 项目，旨在帮助项目方摆脱传统的冷启动方式，提供一个快速曝光的流量平台。",
  submit: "提交审核",
  label: {
    logo: "项目 LOGO 或图片",
    name: "项目名称",
    website: "官方网站",
    categories: "项目类型",
    chains: "公链",
    description: "项目介绍",
    comment: "推荐理由",
    online_time: "上线时间",
    online_timezone: "时区",
    telegram: "项目 Telegram",
    personalTelegram: "个人Telegram",
    discord: "项目 Discord",
    twitter: "项目 Twitter",
    username: "姓名",
    contact: "手机号或电子邮件",
    audit: {
      name: "审计公司",
      url: "公司链接",
    },
  },
  placeholder: {
    name: "", // 请输入项目名称
    website: "", // 请输入官网链接
    description: "", // 请输入项目介绍
    comment: "", // 该内容将会以测评的形式，出现在「项目评测」区
    online_time: "", // 请选择上线时间
    online_timezone: "", // 请选择时区
    telegram: "", // 请输入项目 Telegram 链接
    discord: "", // 请输入项目 Discord 链接
    twitter: "", // 请输入项目 Twitter 链接
    username: "", // 请输入姓名或昵称
    contact: "", // 请输入手机号或电子邮箱
    audit: {
      name: "请输入审计公司名称",
      url: "请输入审计公司链接",
    },
  },
  rules: {
    required: "此项为必填项",
    checkbox: "请选择至少一项",
    url: "请填写平台链接",
  },
  tips: {
    error: "服务器异常，请稍后重试！",
    confirm: "我知道了",
    title: "提交成功",
    content: "运营将在1个工作日内完成审核，请耐心等待。",
    message: `我的项目被 KingData 收录了! 
https://kingdata.com/dapp/{id} 
你看看`,
  },
};
