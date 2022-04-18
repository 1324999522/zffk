<template>
  <div class="AdminTopOper">
    <el-input
      v-model="adminPage.searchKey"
      placeholder="请输入分类名称"
    ></el-input>
    <el-button type="primary" icon="Search" @click="adminPage.handleSearch()"
      >搜索</el-button
    >
    <el-button type="primary" icon="Plus" @click="adminPage.handleCreate()"
      >新建</el-button
    >
  </div>
</template>

<script>
import { get_baseApi } from '@/network/baseApi.js'
export default {
  props: {
    baseCurd: Object
  },
  data () {
    const adminPage = this.$store.state.adminPage
    return {
      adminPage: adminPage,
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.AdminTopOper {
  display: flex;
  margin-bottom: 15px;
}
.AdminTopOper .el-input {
  width: 220px;
  margin-right: 15px;
}
</style>
