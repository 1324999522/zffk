
<template >
  <el-table-column label="操作" :width="width">
    <template #default="scope">
      <span class="AdminTableButton">
        <el-button v-if="showEdit" @click="pageData.handleEdit(scope.$index, scope.row)" icon="Edit">编辑</el-button>
        <slot :row="scope.row" :index="scope.$index"></slot>
        <el-popconfirm v-if="showDelete" title="Are you sure to delete this?" @confirm="pageData.handleDelete(scope.$index, scope.row)">
          <template #reference>
            <el-button type="danger" icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
      </span>
    </template>
  </el-table-column>
</template>


<script setup >
import Api from '@/network'
import { reactive } from 'vue'
const pageData = reactive(Api.pageData)

const props = defineProps({
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: true },
  width: { type: String, default: '200' },
})
</script>


<style lang="less" >
.AdminTableButton .el-button {
  height: 32px;
  padding: 7px 12px;
  font-size: 12px;
}
</style>
