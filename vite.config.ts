/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
import {oss, staticPath} from "./src/config/";
import WindCSS from "vite-plugin-windicss";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {ConfigEnv, defineConfig} from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { Command, production, development } from "./src/config/process";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


const getConfig = function (env: ConfigEnv) {
  return env;
}

const getSassData = function (env: ConfigEnv) {
  const root = "./";
  const staticUrl: string = env.mode === development ? root : staticPath;
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
    staticUrl,
    sass: array.join("\n"),
  };
}


export default defineConfig(async function (env: ConfigEnv) {
  const config = getConfig(env);
  const data = getSassData(config);
  console.log("vite config : ", config);
  console.log("sass data: ", data.sass);
  return {
    base: data.staticUrl,
    define: {
      "process.env": {
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
      AutoImport({
        resolvers: [ElementPlusResolver({
          importStyle: "sass"
        })],
      }),
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
