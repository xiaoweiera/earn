/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
import dotenv from "dotenv";
import {oss, staticPath} from "./src/config/";
import WindCSS from "vite-plugin-windicss";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Language from "./src/types/language";
import {ConfigEnv, defineConfig} from "vite";
import safeGet from "@fengqiaogang/safe-get";
import Components from "unplugin-vue-components/vite";
import { Command, production, development } from "./src/config/process";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


const getConfig = function (env: ConfigEnv) {
  if (env.mode === development || env.mode === production) {
    return env;
  }
  const src = path.join(__dirname, `.env.${env.mode}`);
  const config = dotenv.config({
    path: src
  });
  const data = config.parsed as object;
  return {
    command: env.command,
    mode: safeGet<string>(data, "VITE_NODE") || production,
    lang: safeGet<string>(data, "VITE_LANG") || Language.en,
  }
}

const getSassData = function (env: ConfigEnv) {
  const root = "./";
  const lang = safeGet<string>(env, "lang") || Language.en;
  const staticUrl: string = env.mode === development ? root : `${staticPath}/${lang}/`;
  const data = {
    "g-url": oss,
    "static": staticUrl === root ? "" : staticUrl,
  }
  const array: string[] = [];
  _.each(data, function (value: string, key: string) {
    const code = `${key}: "${value}";`;
    array.push('$' + code);
  });
  return {
    lang,
    staticUrl,
    sass: array.join("\n"),
  };
}


export default defineConfig(async function (env: ConfigEnv) {
  const config = getConfig(env);
  const data = getSassData(config);
  console.log("vite config", config);
  return {
    base: data.staticUrl,
    define: {
      "process.env": {
        lang: data.lang,
        mode: config.mode === development ? development : production,
        command: config.command === Command.serve ? Command.serve : Command.build,
      }
    },
    build: {
			minify: "terser",
      target: 'modules',
      // chunkSizeWarningLimit: 500,
    },
    css: {
      preprocessorOptions: {
        css: {
          charset: false
        },
        scss: {
          charset: false,
          additionalData: data.sass
        }
      }
    },
    resolve: {
      extensions: [".ts", ".vue", ".js", ".tsx"],
      alias: {
        '~/': `${path.resolve(__dirname, "src")}/`,
        'src/': `${path.resolve(__dirname, "src")}/`,
      },
    },
    plugins: [
      vuePlugin(),
      WindCSS(),
      vueJsx({}),
      Components({
        dts: true,
        include: [/\.vue$/],
        extensions: ['vue'],
        directoryAsNamespace: true,
        exclude: [/node_modules/, /\.git/, /\.nuxt/],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
      }),
    ],
    // ssr: {
    //   external: [],
    //   noExternal: ['element-plus','web3']
    // },
  };
});
