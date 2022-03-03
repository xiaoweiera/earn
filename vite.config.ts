/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import path from "path";
// @ts-ignore
import argv from "@fengqiaogang/argv";
import WindCSS from "vite-plugin-windicss";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {ConfigEnv, defineConfig} from "vite";
import { getConfig } from "./src/config/env";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { ImportMetaEnv, production, development, Command, oss } from "./src/types/env";


const getSassData = function (env: ImportMetaEnv & ConfigEnv) {
  const root = "./";
  const staticUrl: string = env.mode === Command.serve ? root : env.VITE_staticDomain;
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

const getBuildConfig = function (config: ImportMetaEnv) {
  if (config.VITE_mode === production) {
    return {
      minify: "terser",
      target: 'modules',
      manifest: true,
      chunkSizeWarningLimit: 500,
      sourcemap: false, // 是否生成 source map
      terserOptions: {
        // 删除 console 日志
        compress: {
          drop_console: true,
          drop_debugger: true
        },
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
        },
        external: [
          // /element-plus/
        ],
      },
    };
  } else {
    return {
      minify: "esbuild", // 编译速度最快
      target: 'modules',
      sourcemap: true,
    };
  }
}


// @ts-ignore
export default defineConfig(async function () {
  const config = await getConfig(argv);
  const data = getSassData({ ...argv, ...config });
  console.log("vite config : ", config);
  const buildConfig = getBuildConfig(config);
  return {
    base: /^.+\/$/.test(data.staticUrl) ? data.staticUrl : `${data.staticUrl}/`,
    mode: config.VITE_command === Command.build ? production : development,
    define: {
      "process.env": {
        ...config,
        command: config.VITE_command,
      }
    },
    build: buildConfig,
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
