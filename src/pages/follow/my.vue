<script setup>
import Card from 'src/pages/earn/card.vue'
import {onMounted, reactive, ref} from "vue"
import {chainName} from "src/logic/earn/index"
import API from "../../api";

const props = defineProps({
  addressList: {
    type: Object,
    required: true
  },
  eventType: {
    type: String,
    required: true
  }
})
const api = new API()
const data = ref([])
const param = reactive({
  chain: chainName,
  addresses: props.addressList ? props.addressList?.join(',') : '',
})
const getData = async () => {
  data.value = await api.earn.getAddressInfo(param)
}
onMounted(async () => {
  await getData()
})
</script>
<template>
  <div class="flex flex-wrap -ml-6">
    <template v-for="item in data">
      <card class="item" :data="item"/>
    </template>
  </div>
</template>
<style scoped lang="scss">
.item {
  width: calc(50% - 24px);
  @apply mt-6 ml-6;
}
</style>