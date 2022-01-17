<script lang="ts">
import { defineComponent } from "vue";
import router from "src/plugins/router/index";
import * as mixin from "src/plugins/router/props";
export default defineComponent({
  name: "VRouter",
  mixins: [mixin],
  components: { router }
})
</script>

<template>
  <router :name="name" :href="href" :target="target">
    <template #default>
      <slot></slot>
    </template>
  </router>
</template>

