/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

// @ts-ignore
import argv from "@fengqiaogang/argv";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import _ from "lodash";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import {ConfigEnv, defineConfig} from "vite";
import WindCSS from "vite-plugin-windicss";
import {getConfig} from "./src/config/env";
import {Command, development, ImportMetaEnv, oss, production} from "./src/types/env";

import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'


const getSassData = function(env: ImportMetaEnv & ConfigEnv) {
  const root = "./";
  const staticUrl: string = env.mode === Command.serve ? root : env.VITE_staticDomain;
  const data = {
    "g-url": oss,
    "static": staticUrl === root ? "" : staticUrl,
  };
  const array: string[] = [];
  _.each(data, function(value: string, key: string) {
    const code = `${key}: "${value}";`;
    array.push("$" + code);
  });
  return {
    staticUrl,
    sass: array.join("\n"),
  };
};

const getBuildConfig = function(config: ImportMetaEnv) {
  if (config.VITE_mode === production) {
    return {
      minify: "esbuild", // 编译速度最快
      target: "modules",
      manifest: true,
      chunkSizeWarningLimit: 500,
      sourcemap: false, // 是否生成 source map
      rollupOptions: {
        output: {
          inlineDynamicImports: false,
        },
      },
    };
  } else {
    return {
      minify: "esbuild",
      target: "modules",
      sourcemap: true,
    };
  }
};

// @ts-ignore
export default defineConfig(async function() {
  const config = await getConfig(argv);
  const data = getSassData({...argv, ...config});
  const buildConfig = getBuildConfig(config);
  return {
    base: /^.+\/$/.test(data.staticUrl) ? data.staticUrl : `${data.staticUrl}/`,
    mode: config.VITE_command === Command.build ? production : development,
    define: {
      "process.env": {
        ...config,
        command: config.VITE_command,
      },
      global: 'globalThis'
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
        "src/": `${path.resolve(__dirname, "src")}/`,
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
      NodeModulesPolyfills(),
      GlobalsPolyfills({
        process: true,
        buffer: true,
      }),

      Components({
        dts: true,
        include: [/\.vue$/],
        extensions: ["vue"],
        directoryAsNamespace: true,
        exclude: [/node_modules/, /\.git/, /\.nuxt/],
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          })
        ],
      }),
    ],
  };
});
