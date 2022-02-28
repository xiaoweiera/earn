<script setup lang="ts">
import Header from "./header/index.vue";
import Footer from "./footer/index.vue";
import Notice from "./notice/index.vue";
</script>
<template>
  <div class="layout">
    <input type="checkbox" name="ui-header-mobile" id="ui-header-mobile">
    <Header/>
    <div class="main">
      <Notice/>
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>


