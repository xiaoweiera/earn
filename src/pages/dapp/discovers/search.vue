<script lang="ts" setup>
import {ref} from 'vue';
import {getParam} from "src/utils/router";
import {config as routerConfig} from "src/router/config";
import DappDiscoversContentType from './content/type.vue';
import DappDiscoversContentChain from './content/chain.vue';
import DappDiscoversContentField from './content/field.vue';

const search = ref<string>("");

const chainData: any = function () {
  const query = getParam<object>();
  return [
    {
      'platform': 106,
      'name': 'all',
      'slug': 'all',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          platform: 106
        }
      }
    },
    {
      'platform': 107,
      'name': 'ETH',
      'slug': 'ETH',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          platform: 107
        }
      }
    },
    {
      'platform': 108,
      'name': 'Bsc',
      'slug': 'Bsc',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          platform: 108
        }
      }
    },
    {
      'platform': 109,
      'name': 'Polygon',
      'slug': 'POS',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          platform: 109
        }
      }
    }
  ];
}

const chainData2 = function () {
  const query = getParam<object>();
  return [
    {
      'group': 100,
      'name': 'all',
      'slug': 'all',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          group: 100
        }
      }
    },
    {
      'group': 101,
      'name': 'ETH',
      'slug': 'ETH',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          group: 101
        }
      }
    },
    {
      'group': 102,
      'name': 'Bsc',
      'slug': 'Bsc',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          group: 102
        }
      }
    },
    {
      'group': 103,
      'name': 'Polygon',
      'slug': 'POS',
      'logo': 'icon-quanbu',
      href: {
        path: routerConfig.dappList,
        query: {
          ...query,
          group: 103
        }
      }
    }
  ]
}
</script>
<template>
  <div class="mt-5">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center flex-1">
        <!-- 项目类型 -->
        <div class="flex-1">
          <DappDiscoversContentType :list="chainData2" name="group" title="项目类型"/>
        </div>
        <div class="flex items-center">
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
          <!-- 公链 -->
          <DappDiscoversContentChain title="公链"/>
        </div>
      </div>
      <!-- 搜索框 -->
      <DappDiscoversContentField :query="search" title="项目名称"/>
    </div>
    <!-- platform -->
    <DappDiscoversContentType :list="chainData" class="mt-4" name="platform" title="platform"/>
  </div>
</template>
