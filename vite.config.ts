/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import path from "path";
import dotenv from "dotenv";
import Language from "./src/types/language";
import { staticPath } from "./src/config/";
import WindCSS from "vite-plugin-windicss";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {ConfigEnv, defineConfig} from "vite";
import Components from "unplugin-vue-components/vite";
import { Command, production, development } from "./src/config/process";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import safeGet from "@fengqiaogang/safe-get";

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
    lang: safeGet<string>(data, "VITE_LANG") || Language.en,
    mode: safeGet<string>(data, "VITE_NODE") || production,
  }
}


export default defineConfig(async function (env: ConfigEnv) {
  const config = getConfig(env);
  console.log(config);
  const lang = safeGet<string>(config, "lang") || Language.en;
  return {
    base: env.mode === development ? "./" : `${staticPath}/${lang}/`,
    define: {
      "process.env": {
        lang,
        mode: config.mode === development ? development : production,
        command: config.command === Command.serve ? Command.serve : Command.build,
      }
    },
    build: {
			minify: "terser",
      target: 'modules',
      chunkSizeWarningLimit: 500,
    },
    css: {
      preprocessorOptions: {
        css: {
          charset: false
        },
        scss: {
          charset: false
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
      WindCSS(),
      vuePlugin(),
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
