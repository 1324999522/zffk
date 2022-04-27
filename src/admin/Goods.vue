<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper > </AdminTopOper>
      <!-- 表格主体 -->
      <el-table :data="pageData.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="classifyName" label="商品分类" width="120" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
        <el-table-column prop="cards_count" label="卡密数量" width="120" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton ></AdminTableButton>
        <el-table-column label="卡密操作" width="300">
          <template #default="scope">
            <span class="AdminTableButton">
              <el-button @click="handleAddCard(scope.row)">添加</el-button>
              <el-button @click="pageData.handleEdit(scope.$index, scope.row)">提取</el-button>
              <el-button @click="pageData.handleEdit(scope.$index, scope.row)">管理</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <AdminPagination > </AdminPagination>
    </el-card>
    <AdminDialog >
      <template #form>
        <el-form-item label="商品名称">
          <el-input v-model="pageData.row.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <AdminSelectClassify v-model="pageData.row.classifyId" :key="pageData.row || new Date()"> </AdminSelectClassify>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="pageData.row.sort"></el-input>
        </el-form-item>
        <el-form-item label="批发">
          <el-input v-model="pageData.row.describe"></el-input>
        </el-form-item>
      </template>
    </AdminDialog>
  </div>
</template>

<script setup >
import { ref, onMounted, reactive } from 'vue'
import Api from '@/network'

const pageData = reactive(Api.adminPage('good'))
onMounted(pageData.getPage())

const sale = () => {
  return JSON.parse(pageData.row.describe)
}
const ToSale = () => {
  pageData.row.describe = JSON.stringify(pageData.rows)
}

</script>

