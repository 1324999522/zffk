<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper></AdminTopOper>
      <!-- 表格主体 -->
      <el-table :data="adminPage.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="分类名称" width="220" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton :baseCurd="baseCurd"> </AdminTableButton>
      </el-table>

      <AdminPagination :getPage="baseCurd.getPage"> </AdminPagination>
    </el-card>

    <AdminDialog @Confirm="baseCurd.create()">
      <template #form>
        <el-form-item label="分类名称">
          <el-input v-model="adminPage.row.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="adminPage.row.sort"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="adminPage.row.sort"></el-input>
        </el-form-item>
      </template>
    </AdminDialog>
  </div>
</template>

<script >
import Api from '@/network/index.js'

export default {
  data () {
    const adminPage = this.$store.state.adminPage
    const baseCurd = adminPage.curd(Api.get_baseApi('order'))
    return {
      adminPage: adminPage,
      baseCurd: baseCurd,
    }
  },
  async created () {
    this.baseCurd.getPage()
  },
}
</script>

<style lang="less" >
</style>