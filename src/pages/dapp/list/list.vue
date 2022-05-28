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
      type: String,
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
