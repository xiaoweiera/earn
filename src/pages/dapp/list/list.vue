<script lang="ts">
/**
 * @file Dapp 列表
 * @auth svon.me@gmail.com
 */
import { defineComponent } from "vue";
import { upperFirst } from "src/utils/";

import Ido from "../ido/index.vue";
import Mint from "../nft.vue";
import Airdrop from "../airdrop/index.vue";

import type { PropType } from "vue";
import type { DAppType } from "src/types/dapp/dapp";

export default defineComponent({
  name: "DAppList",
  components: {
    Ido,
    Igo: Ido,
    Mint,
    Airdrop,
  },
  props: {
    // dapp 类型
    name: {
      type: String as PropType<DAppType>,
      required: true,
    },
  },
  methods: {
    getName() {
      return upperFirst(this.name);
    },
  },
});
</script>

<template>
  <div>
    <component :is="getName()" :name="name"></component>
  </div>
</template>
