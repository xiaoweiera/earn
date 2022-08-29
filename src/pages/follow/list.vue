<script setup>
import Item from "./item.vue"
import {reactive, ref, onMounted} from "vue"
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
  eventType: props.eventType
})

const getData = async () => {
  data.value = await api.earn.getFeedList(param)
}
onMounted(async () => {
  await getData()
})
</script>
<template>
  <div class="flex flex-wrap">
    <template v-for="item in data">
      <Item class="w-full" :data="item"/>
    </template>
  </div>
</template>
