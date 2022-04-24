<template>
  <div class="AdminTopOper">
    <el-space wrap :size="15">
      <el-input v-model="adminPage.searchKey" placeholder="请输入分类名称"></el-input>
      <el-button type="primary" icon="Search" @click="adminPage.handleSearch()">搜索</el-button>
      <el-button type="primary" icon="Plus" @click="adminPage.handleCreate()">新建</el-button>
      <slot name="defaut"> </slot>
    </el-space>
  </div>
</template>


<script setup >
const props = defineProps({
  adminPage: Object
})

</script>


<style lang="less" scoped>
.AdminTopOper {
  display: flex;
  margin-bottom: 15px;
}
</style>
