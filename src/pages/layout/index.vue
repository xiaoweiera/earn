<script setup lang="ts">
import Header from "./header/index.vue";
import Footer from "./footer/index.vue";
</script>
<template>
  <div class="layout">
    <Header/>
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>


