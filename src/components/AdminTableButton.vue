
<template >
  <el-table-column label="操作" width="200">
    <template #default="scope">
      <span class="AdminTableButton">
        <el-button @click="adminPage.handleEdit(scope.$index, scope.row)" icon="Edit">编辑</el-button>
        <slot :row="scope.row" :index="scope.$index"></slot>
        <el-popconfirm title="Are you sure to delete this?" @confirm="adminPage.handleDelete(scope.$index, scope.row)">
          <template #reference>
            <el-button type="danger" icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </span>
    </template>
  </el-table-column>
</template>


<script setup >
const props = defineProps({ adminPage: Object })
</script>


<style lang="less" >
.AdminTableButton .el-button {
  height: 32px;
  padding: 7px 12px;
  font-size: 12px;
}
</style>
