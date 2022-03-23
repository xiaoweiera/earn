/**
 * @file wind css
 */

import {defineConfig} from "vite-plugin-windicss";
import colors from "windicss/colors";
import formsPlugin from "windicss/plugin/forms";
import typography from "windicss/plugin/typography";

const cssGlobal = {
  bgHui: "#F1F3F5",
  body: "#F6FAFD",
  bodyTwo: "#F8FBFD",
  default: "#253E6F", /* 37,62,111 */
  primary: "#006FF7", /* 43, 141, 254 */
  highTitle: "#033666", /*3,54,102*/
  mobileBody: "#D8E8FF",
  numGreen: "#00B464", /* 0, 180, 100 */
  numRed: "#E9592D", /*233, 89, 45*/
  darkblue: "#006FF7", /* 0, 111, 247*/
  blueGg: "#0056C3",
  time: "#A2A4A8",
  noSelect: "#A8A8A8",
  white: "#FFFFFF",
  golden: "#D1A300",
  grey: "#7b8db1",
  money: "#F88923", /* 248, 137, 35 */
  disabled: "#cccccc", // 禁用，灰色
  plat: "#EBF7FF",
  coin: "#E4FDFF",
  loan: "#ECFFE6",
  noAsk: "#FDF4ED",
  coinTxt: "#03B7AB",
  loanTxt: "#09B86A",
  noAskTxt: "#DA9D00",
  border: "#F0F3F6",
  hoverHui: "#EDF0F5",
  topBg: "#FAFBFC",
  bgFb: "#fbfbfb",
  none: "#FFF",
  gemstone: "#F0BF12", // 黄宝石
  media: "#1DA1F2",
  bgBlack: "#272C33",
  textBlack: "#212121",
  hei: "#000000",
  orange: "#EAB144"
};

export default defineConfig({
  important: false,
  darkMode: "class",
  plugins: [
    formsPlugin,
    typography(),
  ],
  theme: {
    extend: {
      borderRadius: {
        "kd2px": "2px",
        "kd4px": "4px",
        "kd6px": "6px",
        "kd8px": "8px",
        "kd9px": "9px",
        "kd10px": "10px",
        "kd12px": "12px",
        "kd16px": "16px",
        "kd20px": "20px",
        "kd24px": "24px",
        "kd26px": "26px",
        "kd28px": "28px",
        "kd30px": "30px",
        "kd34px": "34px",
        "kd36px": "36px",
        "kd38px": "38px",
        "kd40px": "40px",
        "kd100px": "100px"
      },
      fontSize: {
        "kd12px12px": ["12px", "12px"],
        "kd12px14px": ["12px", "14px"],
        "kd10px10px": ["10px", "10px"],
        "kd20px20px": ["20px", "20px"],
        "kd20px26px": ["20px", "26px"],
        "kd26px26px": ["26px", "26px"],
        "kd11px16px": ["11px", "16px"],
        "kd14px14px": ["14px", "14px"],
        "kd14px16px": ["14px", "16px"],
        "kd14px22px": ["14px", "22px"],
        "kd14px20px": ["14px", "20px"],
        "kd14px35px": ["14px", "25px"],
        "kd12px22px": ["12px", "22px"],
        "kd12px20px": ["12px", "20px"],
        "kd12px18px": ["12px", "18px"],
        "kd18px24px": ["18px", "24px"],
        "kd18px28px": ["18px", "28px"],
        "kd18px18px": ["18px", "18px"],
        "kd28px28px": ["28px", "28px"],
        "kd18px27px": ["18px", "27px"],
        "kd36px": ["36px", "140%"],
        "kd14px0px": ["14px", "0px"],
        "kd10px16px": ["10px", "16px"],
        "kd16px16px": ["16px", "16px"],
        "kd16px18px": ["16px", "18px"],
        "kd42px110": ["42px", "110%"],
        "kd16px150": ["16px", "150%"],
        "kd15px150": ["15px", "150%"],
        "kd15px18px": ["15px", "18px"],
        "kd22px22px": ["22px", "22px"],
        "kd26px140": ["26px", "140%"],
        "kd26px31px": ["26px", "32px"],
        "kd12px16px": ["12px", "16px"],
        "kd24px30px": ["24px", "30px"],
        "kd16px24px": ["16px", "24px"],
        "kd14px18px": ["14px", "18px"],
        "kd9px14px": ["9px", "14px"],
        "kd22px28px": ["22px", "28px"],
        "kd22px26px": ["22px", "26px"],
        "kd24px150": ["24px", "150%"],
        "kd24px36px": ["24px", "36px"],
        "kd24px110": ["24px", "110%"],
        "kd42px50px": ["42px", "50px"],
        "kd24px32px": ["24px", "32px"],
        "kd36px36px": ["36px", "36px"],
        "kd10px14px": ["10px", "14px"],
        "kd24px24px": ["24px", "24px"],
        "kd24px100": ["24px", "100%"],
        "kd36px140": ["36px", "140%"],
        "kd20px24px": ["20px", "24px"],
        "kd24px112": ["24px", "112"],
        "kd30px28px": ["30px", "28px"],
        "kd20px28px": ["20px", "28px"],
        "kd16px160": ["16px", "160%"],
        "kd14px160": ["14px", "160%"],
        "kd13px19px": ["13px", "19px"],
        "kd13px20px": ["13px", "20px"],
        "kd13px18px": ["13px", "18px"],
        "kd17px17px": ["17px", "17px"],
        "kd32px32px": ["32px", "32px"],
        "kd25px28px": ["25px", "28px"],
        "kd40px40px": ["40px", "40px"],
        "kd40px60px": ["40px", "60px"],
        "kd10px12px": ["10px", "12px"],
        "kd24px28px": ["24px", "28px"],
        "kd16px20px": ["16px", "20px"],
      },
      fontWeight: {
        "b": "600",
        "m": "500",
        "r": "400",
      },
      fontFamily: {
        "kdFang": "PingFang SC",
        "kdExp": "D-DIN Exp",
        "kdInter": "i8n-font-inter",
        // "kdBarlow": "i8n-font-Barlow", /* 已在 style/font.scss 中实现 */
      },
      margin: {
        "kd32px": "32px",
        "kd35px": "35px",
        "kd4px": "4px",
      },
      maxWidth: {
        "mx1440": "1440px",
      },
      minWidth: {
        "min288px": "288px",
        "min430px": "430px"
      },
      colors: {
        green: "#009955",
        global: cssGlobal,
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              "color": "inherit",
              "opacity": 0.75,
              "fontWeight": "500",
              "textDecoration": "underline",
              "&:hover": {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: {color: "inherit"},
            strong: {color: "inherit"},
            em: {color: "inherit"},
            h1: {color: "inherit"},
            h2: {color: "inherit"},
            h3: {color: "inherit"},
            h4: {color: "inherit"},
            code: {color: "inherit"},
          },
        },
      },
    },
  },
});
