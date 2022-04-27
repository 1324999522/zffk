<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper :showNew="false"></AdminTopOper>
      <!-- 表格主体 -->
      <el-table :data="pageData.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="订单号" width="180" />
        <el-table-column prop="name" label="商品名称" width="160" />
        <el-table-column prop="count" label="购买数量" width="100" />
        <el-table-column prop="orderPrice" label="订单总价" width="100" />
        <el-table-column prop="status" label="支付状态" width="100" />
        <el-table-column prop="createdAt" label="创建时间" width="210" />
        <AdminTableButton :showEdit="false" width="300">
          <template #default="scope">
            <el-button @click="handleAddCard(scope.row)" icon="watch">查看卡密</el-button>
          </template>
        </AdminTableButton>
      </el-table>

      <AdminPagination :showEdit="false"> </AdminPagination>
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
import { onMounted, reactive } from 'vue'
import Api from '@/network'

const pageData = reactive(Api.adminPage('order'))
onMounted(pageData.getPage())

</script>
