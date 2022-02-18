<script setup lang="ts">
/**
 * @file 邮件登录
 * @author svon.me@gmail.com
 */

import {computed, ref} from "vue";
import * as Common from "src/logic/account/register";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
const domForm = ref<any>(null);

const rules = computed(Common.rules);

</script>

<template>
  <client-only>
    <el-form size="large" ref="domForm" :rules="rules" :model="formData" autocomplete="off" @submit.stop.prevent="submit">
    </el-form>
  </client-only>
</template>

