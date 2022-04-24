<template>
  <el-pagination
    :page-sizes="[6, 10, 20, 50, 100]"
    :page-size="adminPage.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="adminPage.count"
    background
    hide-on-single-page
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>


<script setup >
const { adminPage } = defineProps({ adminPage: Object })
const $emit = defineEmits(['confirm', 'cancel'])
const handleSizeChange = (val) => {
  adminPage.limit = val
  adminPage.getPage()
}
const handleCurrentChange = (val) => {
  adminPage.offset = val
  adminPage.getPage()
}
</script>


