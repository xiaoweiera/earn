<script lang="ts">
import { defineComponent } from "vue";
import router from "src/plugins/router/index";
import { props } from "src/plugins/router/props";
export default defineComponent({
  props,
  name: "VRouter",
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

