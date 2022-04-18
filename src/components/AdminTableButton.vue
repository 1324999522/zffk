
<template >
  <el-table-column label="操作" width="300">
    <template #default="scope">
      <span class="AdminTableButton">
        <el-button @click="adminPage.handleEdit(scope.$index, scope.row)" icon="Edit">编辑</el-button>
        <slot :row="scope.row" :index="scope.$index" ></slot>
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="baseCurd.handleDelete(scope.$index, scope.row)"
        >
          <template #reference>
            <el-button type="danger" icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </span>
    </template>
  </el-table-column>
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

<style lang="less" >
.AdminTableButton .el-button {
  min-height: 28px;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: calc(var(--el-border-radius-base) - 1px);
}
</style>
