<script setup lang="ts">
import {PropType} from "vue";
import { Footer } from "src/config/footer";

defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    required: true,
    type: Object as PropType<Footer>,
  }
});

</script>
<template>
  <div>
    <div class="menu-label">
      <span class="text-18">{{ index }} - {{ data.label }}</span>
    </div>
  </div>
</template>
