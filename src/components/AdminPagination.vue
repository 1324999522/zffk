<template>
  <el-pagination
    :page-sizes="[6, 10, 20, 50, 100]"
    :page-size="pageData.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageData.count"
    background
    hide-on-single-page
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>


<script setup >
import Api from '@/network'
import { reactive } from 'vue'
const pageData = reactive(Api.pageData)

const $emit = defineEmits(['confirm', 'cancel'])
const handleSizeChange = (val) => {
  pageData.limit = val
  pageData.getPage()
}
const handleCurrentChange = (val) => {
  pageData.offset = val
  pageData.getPage()
}
</script>


