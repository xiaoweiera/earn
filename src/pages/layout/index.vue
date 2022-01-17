<script setup lang="ts">
import Footer from "./footer/index.vue";
</script>
<template>
  <div class="layout">
    <div class="header"></div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>


