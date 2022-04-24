<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper :adminPage="adminPage"> </AdminTopOper>
      <!-- 表格主体 -->
      <el-table :data="adminPage.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="classifyName" label="商品分类" width="120" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
        <el-table-column prop="cards_count" label="卡密数量" width="120" />
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton :adminPage="adminPage"></AdminTableButton>
        <el-table-column label="卡密操作" width="300">
          <template #default="scope">
            <span class="AdminTableButton">
              <el-button @click="handleAddCard(scope.row)">添加</el-button>
              <el-button @click="adminPage.handleEdit(scope.$index, scope.row)">提取</el-button>
              <el-button @click="adminPage.handleEdit(scope.$index, scope.row)">管理</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <AdminPagination :adminPage="adminPage"> </AdminPagination>
    </el-card>
    <AdminDialog @Confirm="adminPage.create()" :show="adminPage.dialogVisible" :key="adminPage.row.id || new Date()" @cancel="adminPage.dialogVisible = false">
      <template #form>
        <el-form-item label="商品名称">
          <el-input v-model="adminPage.row.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <AdminSelectClassify v-model="adminPage.row.classifyId"> </AdminSelectClassify>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="adminPage.row.sort"></el-input>
        </el-form-item>
      </template>
    </AdminDialog>
  </div>
</template>

<script setup >
import { ref, onMounted, reactive } from 'vue'
import Api from '@/network'

const adminPage = reactive(Api.adminPage('good'))
onMounted(adminPage.getPage())
</script>

