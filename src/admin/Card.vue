<template>
  <div id="card">
    <el-card>
      <AdminTopOper> </AdminTopOper>

      <div v-show="is_selection">
        <el-button type="primary" icon="Search" @click="adminPage.handleSearch()">搜索</el-button>
        <el-button type="primary" icon="Search" @click="adminPage.handleSearch()">搜索</el-button>
        <el-button type="primary" icon="Search" @click="adminPage.handleSearch()">搜索</el-button>
      </div>

      <!-- 表格主体 -->
      <el-table :data="adminPage.rows" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="number" label="卡密信息" width="220" />
        <!-- <AdminTableTagSwitch> </AdminTableTagSwitch> -->
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton :baseCurd="baseCurd"> </AdminTableButton>
      </el-table>

      <Pagination :getPage="baseCurd.getPage"> </Pagination>
    </el-card>

    <AdminDialog :baseCurd="baseCurd">
      <template #form>
        <el-form-item label="卡密信息">
          <el-input v-model="adminPage.row.number"></el-input>
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
import { get_baseApi } from '@/network/baseApi.js'

export default {
  data () {
    const adminPage = this.$store.state.adminPage
    const baseCurd = adminPage.curd(get_baseApi('card'))
    return {
      adminPage: adminPage,
      baseCurd: baseCurd,
      is_selection: false,
    }
  },
  async created () {
    this.baseCurd.getPage()
  },
  methods:{
    handleSelectionChange(val){
      console.log(val )
      this.is_selection = true
    }
  }
  
}
</script>

<style lang="less" >
#card .el-checkbox {
  height: 20px !important;
}
</style>