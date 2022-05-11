import { oss } from "src/config/";
export default {
  product: "Products",
  user: "Name",
  chart: "Charts",
  outLogin: "Log Out",
  betaSrc: `${oss}/liquidity/betaEn.png`,
  soonLine: `${oss}/nav/navOnLineTipEn.jpg`,
  defi: {
    name: "DeFi",
    apy: {
      name: "APY",
      desc: "Quickly get high-yield mining pools",
    },
    liquidity: {
      name: "DEX Smart Money",
      desc: "Easy to know ins and outs of liquid funds",
    },
    quotes: {
      name: "Market and Trade",
      desc: "Professional K-line chart and aggregate trading",
    },
  },
  service: {
    name: "Earn",
    growthPad: {
      name: "GrowthPad",
      desc: "Do tasks, earn crypto",
      children: {
        growthPad: { name: "GrowthPad" },
        project: { name: "Project Application" },
        about: { name: "About" },
      },
    },
  },
  analysis: {
    name: "Dashboards",
    hData: {
      name: "Alerts",
      desc: "Seize any trading opportunity",
    },
    chart: {
      name: "Dashboard",
      desc: "Easily view project core data",
      children: {
        chart: { name: "My Chart" },
        recommad: { name: "Featured Content" },
        special: {
          name: "Featured Data",
          children: {
            usdt: { name: "USDT Issuance and Premium" },
            shichang: { name: "User and Sentiment" },
            quanqiu: { name: "Major Financial Index" },
            huidu: { name: "Grayscale Fund" },
          },
        },
        project: {
          name: "Project Comparison",
          children: {
            dex: { name: "DEX Comparison" },
            defi: { name: "DeFi Overall" },
            gonglian: { name: "Public Chain Comparison" },
          },
        },
        bsc: {
          name: "BSC and Ecological Project",
          children: {
            bsc: { name: "Binance BSC Topic" },
          },
        },
        heco: {
          name: "HECO and Ecological Project",
          children: {
            mdex: { name: "MDEX Project" },
            heco: { name: "HECO Public Chain" },
            mdx: { name: "MDX Token" },
            coin: { name: "CoinWind Overall" },
          },
        },
        eth: {
          name: "ETH and Ecological Project",
          children: {
            sushi: { name: "SUSHI Project" },
            uni: { name: "UNI Project" },
            ampl: { name: "AMPL Project" },
            eth: { name: "ETH Chain Data" },
          },
        },
        dot: {
          name: "DOT and Ecological Project ",
          children: {
            dot: { name: "DOT Platform Data" },
          },
        },
        fil: {
          name: "FIL and Ecological Project ",
          children: {
            fil: { name: "FIL Platform Data" },
          },
        },
        exchange: {
          name: "Exchange Data",
          children: {
            zhuliu: { name: "Mainstream Exchange Balance" },
            jiaoyi: { name: "Exchange BTC Flow" },
          },
        },
      },
    },
    report: {
      name: "Research",
      desc: "Deeper and more comprehensive project research",
    },
  },
  dataTools: {
    name: "Tools",
    top: {
      name: "Top of Plate",
      desc: "Trade by referring to the top",
    },
    history: {
      name: "Today in History",
      desc: "Predict risks through historical data",
    },
    nav: {
      name: "Data Website Navigation",
      desc: "Comprehensive blockchain resource website",
    },
  },
};
