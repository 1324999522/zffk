<template>
  <el-select v-model="modelValue" placeholder="选择商品分类" @change="change">
    <el-option v-for="classify in classifys" :key="classify.id" :label="classify.name" :value="classify.id" />
  </el-select>
</template>

<script setup >
import { defineEmits, defineProps, ref } from 'vue'
import Api from '@/network'
const props = defineProps({ modelValue: Number })
// 获取商品分类
let classifys = ref([])
const { $get_page } = Api.get_baseApi('classify')
$get_page()
  .then(res => classifys.value = res.data.rows)
// 发出事件
const $emit = defineEmits(['change'])
const change = (val) => $emit('change', val)

</script>



