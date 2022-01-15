/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import path from "path";
import WindCSS from "vite-plugin-windicss";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {ConfigEnv, defineConfig} from "vite";
import Components from "unplugin-vue-components/vite";
import { Command } from "./src/config/env";
import { production, development, staticPath } from "./src/config";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(function (env: ConfigEnv) {
  return {
    base: env.mode === development ? "./" : `${staticPath}/`,
    define: {
      "process.env": {
        mode: env.mode === development ? development : production,
        command: env.command === Command.serve ? Command.serve : Command.build,
      }
    },
    build: {
			minify: "terser",
      target: 'modules',
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules')
              const path_ = arr[arr.length - 1]
              const node_module = path_.split('/')[1].toString()
              if (['echarts', 'lodash'].includes(node_module)) {
                return node_module
              }
            }
          }
        },
        external: [
          // /element-plus/,
          // /lodash/,
          // /vue/,
          // /vue-router/,
        ],
      },
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true
      //   },
      // }
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
  };
});
