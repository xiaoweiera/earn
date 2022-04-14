/**
 * @file Eslint 规则配置
 * @author svon.me@gmail.com
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // 全局变量
  globals: {
    typeof: "readonly",
    defineProps: "readonly",
    defineEmits: "readonly"
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    // 指定 ESLint 的解析器
    parser: "@typescript-eslint/parser",
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: "module",
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-undef": "warn",
    "no-throw-literal": "off",
    "n/no-deprecated-api": "off",
    "vue/no-mutating-props": "off",
    "vue/no-v-html": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "vue/multi-word-component-names": "off",
    "no-duplicate-imports": "off",
    "vue/no-template-shadow": "off",
    "no-template-curly-in-string": "off",
    "node/no-deprecated-api": "off",
    "arrow-parens": ["error", "always"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error", {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        },
        "multilineDetection": "brackets"
      }
    ],
    // 缩紧风格 if else 不换行
    "brace-style": ["error", "1tbs"],
    "@typescript-eslint/brace-style": ["error", "1tbs"],
    // console 验证
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-void": "off",
    "array-callback-return": "off",
    // 使用单引号
    "quotes": ["error", "double"],
    // 末尾必须使用分号
    "semi": ["error", "always" ],
    "@typescript-eslint/semi": ["error", "always" ],
    // 禁止 catch 中的参数与外层作用域范围内的变量或参数同名
    "no-catch-shadow": ["error"],
    // 禁止使用 delete 操作符
    "no-delete-var": ["error"],
    // 缩紧 2 个空格
    "indent": ["error", 2],
    "no-tabs": "off",
    // 不允许在 if for while 判断条件中出现赋值逻辑
    "no-cond-assign": ["error", "always"],
    // 不允许使用常量或字面量做逻辑表达式
    "no-constant-condition": ["error"],
    // 不允许出现重复 case 条件
    "no-duplicate-case": ["error"],
    // 不允许出现空的代码块
    "no-empty": ["error"],
    // 不允许把全局对象当函数使用
    "no-obj-calls": ["error"],
    // 禁用 eval 使用 JSON
    "no-eval": ["error"],
    // 禁用无意义的使用 call 和 apply
    "no-useless-call": ["error"],
    // 编写有意义的立即执行函数
    "wrap-iife": ["error"],
    /*
      不允许在计算属性中使用空格
      正确格式 var arr = [1,2,3]; arr[0];
      错误格式 var arr = [1,2,3]; arr[ 0];
    */
    "computed-property-spacing": ["error", "never"],
    // 小括号内不允许有空格
    "space-in-parens": ["error", "never"],
    // 三元表达式不允许换行
    "multiline-ternary": "off",
    // 禁止连续赋值
    "no-multi-assign": ["error"],
    // 运算符前后有空格
    "space-infix-ops": ["error"],
    "no-unreachable": [0],
    "node/no-callback-literal": 0,
    "@typescript-eslint/indent": "off",
    "vue/singleline-html-element-content-newline": "off",
    "prefer-promise-reject-errors": "off",
    "vue/attribute-hyphenation":0
  }
};
