<script setup lang="ts">
import API from "src/api";
import { User } from "src/types/common/user";
import { getValue } from "src/utils/root/data";
import { alias } from "src/utils/ssr/ref";
import { computed, onMounted } from "vue";
import window from "src/plugins/browser/window";

const getUserData = async function (): Promise<User | undefined> {
  const user = getValue<User>(alias.common.user);
  if (user) {
    return user;
  }
  const api = new API();
  const data = await api.user.getInfo<User>();
  if (data) {
    return data;
  }
};

const html = computed<string | undefined>(function () {
  return getValue<string>("html");
});

onMounted(async function () {
  const user = await getUserData();
  if (user) {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }
});
</script>
<template>
  <div class="min-h-150">
    <div class="address-main" v-html="html"></div>
  </div>
</template>
