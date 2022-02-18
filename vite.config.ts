/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
import WindCSS from "vite-plugin-windicss";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {ConfigEnv, defineConfig} from "vite";
import { getConfig } from "./src/config/env";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { ImportMetaEnv, production, development, Command, oss, staticDomain } from "./src/types/env";


const getSassData = function (env: ImportMetaEnv) {
  const root = "./";
  const staticUrl: string = env.VITE_mode === development ? root : staticDomain;
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
  const config = await getConfig(env);
  const data = getSassData(config);
  console.log("vite config : ", config);
  console.log("sass data: ", data.sass);
  return {
    base: data.staticUrl,
    mode: env.command === Command.build ? production : development,
    define: {
      "process.env": {
        ...config,
        command: env.command,
      }
    },
    build: env.command === Command.build ? {
			minify: "esbuild", // 编译速度最快
      target: 'modules',
      manifest: true,
      chunkSizeWarningLimit: 500,
      sourcemap: false, // 是否生成 source map
    } : {
      minify: "esbuild", // 编译速度最快
      target: 'modules',
      sourcemap: true,
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
  };
});
