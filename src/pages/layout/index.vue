<script setup lang="ts">
import Header from "./header/index.vue";
import Footer from "./footer/index.vue";
</script>
<template>
  <div class="layout">
    <div class="layout-header">
      <Header/>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="layout-footer">
      <Footer/>
    </div>
  </div>
</template>


