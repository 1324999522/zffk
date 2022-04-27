<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper > </AdminTopOper>

      <!-- 表格主体 -->
      <el-table :data="pageData.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="分类名称" width="220" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
         <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton > </AdminTableButton>
      </el-table>

      <AdminPagination > </AdminPagination>
    </el-card>

    <AdminDialog>
      <template #form>
        <el-form-item label="分类名称">
          <el-input v-model="pageData.row.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="pageData.row.sort"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="pageData.row.sort"></el-input>
        </el-form-item>
      </template>
    </AdminDialog>
  </div>
</template>

<script setup >
import { ref, onMounted, reactive } from 'vue'
import Api from '@/network'

const pageData = reactive(Api.adminPage('classify'))
onMounted(pageData.getPage())

</script>


