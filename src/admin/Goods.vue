<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper placeholder="请输入商品名称"> </AdminTopOper>
      <!-- 表格主体 -->
      <el-table :data="pageData.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="price" label="销售价格" width="180" />
        <el-table-column prop="classifyName" label="商品分类" width="120" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
        <el-table-column prop="cards_count" label="卡密数量" width="120" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton width="300">
          <template #default="scope">
            <el-button @click="handleAdminCard(scope.row.id, scope.row.classifyId)" icon="watch">卡密管理</el-button>
          </template>
        </AdminTableButton>
      </el-table>
      <AdminPagination> </AdminPagination>
    </el-card>
    <AdminDialog>
      <template #form>
        <el-form-item label="商品名称">
          <el-input v-model="pageData.row.name"></el-input>
        </el-form-item>
        <el-form-item label="销售价格">
          <el-input v-model="pageData.row.price"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <AdminSelectClassify v-model="pageData.row.classifyId" :key="pageData.row || new Date()"> </AdminSelectClassify>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="pageData.row.sort"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="pageData.row.describe" :rows="4" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="最少购买">
          <el-input v-model="pageData.row.min"></el-input>
        </el-form-item>
        <el-form-item label="最多购买">
          <el-input v-model="pageData.row.max"></el-input>
        </el-form-item>
      </template>
    </AdminDialog>
  </div>
</template>

<script setup >
import { ref, onMounted, reactive } from 'vue'
import Api from '@/network'
import { useRouter } from 'vue-router'
const router = useRouter()

const pageData = reactive(Api.adminPage('good'))
onMounted(pageData.getPage())

const sale = () => {
  return JSON.parse(pageData.row.describe)
}
const ToSale = () => {
  pageData.row.describe = JSON.stringify(pageData.rows)
}

const handleAdminCard = (goodId, classifyId) => {
  router.push({ name: 'Card', params: { goodId, classifyId } })
}

</script>

