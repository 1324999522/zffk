<template>
  <div class="AdminTopOper">
    <el-space wrap :size="15">
      <el-input v-model="pageData.searchKey" :placeholder="placeholder"></el-input>
      <el-button v-if="showSearch" type="primary" icon="Search" @click="pageData.handleSearch()">搜索</el-button>
      <el-button v-if="showNew" type="primary" icon="Plus" @click="pageData.handleCreate()">新建</el-button>
      <slot name="defaut"> </slot>
    </el-space>
  </div>
</template>


<script setup >
import Api from '@/network'
import { reactive } from 'vue'
const pageData = reactive(Api.pageData)

const props = defineProps({
  showSearch: { type: Boolean, default: true },
  showNew: { type: Boolean, default: true },
  placeholder: { type: String, default: '请输入' },
})

</script>


<style lang="less" scoped>
.AdminTopOper {
  display: flex;
  margin-bottom: 15px;
}
</style>
