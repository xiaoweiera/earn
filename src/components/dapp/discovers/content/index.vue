<script setup lang="ts">


</script>

<template>
  <div>
    <v-router target="_blank">
      <!-- 项目图片和tip角标 -->
      <div class="relative h-40">
        <DappDiscoversContentHeader/>
      </div>

      <!-- 项目头像和项目名 -->
      <div class="w-full h-51.25 px-4 absolute top-35.75 left-0 bg-global-white rounded-md">
        <DappDiscoversContentTitle/>
        <!-- 项目描述 -->
        <div>
          <DappDiscoversContentDec></DappDiscoversContentDec>
        </div>
        <!-- 项目价格 -->
        <div>
          <DappDiscoversContentPrice/>
        </div>

        <!-- 项目时间 -->
        <div>
          <DappDiscoversContentTime/>
        </div>
      </div>
    </v-router>
  </div>
</template>