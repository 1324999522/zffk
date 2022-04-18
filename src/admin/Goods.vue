<template>
  <div id="classify_list">
    <el-card>
      <AdminTopOper> </AdminTopOper>
      <!-- 表格主体 -->
      <el-table :data="adminPage.rows">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="classifyName" label="商品分类" width="120" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
        <el-table-column prop="cards_count" label="卡密数量" width="120" />
        <el-table-column prop="createdAt" label="创建时间" width="200" />
        <AdminTableButton :baseCurd="baseCurd">
          <template #default="scope">
            <el-button icon="Plus" @click="handleAddCard(scope.row)">添加卡密</el-button>
          </template>
        </AdminTableButton>
      </el-table>

      <Pagination :getPage="baseCurd.getPage"> </Pagination>
    </el-card>

    <AdminDialog :baseCurd="baseCurd">
      <template #form>
        <el-form-item label="商品名称">
          <el-input v-model="adminPage.row.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <MySelect v-model="adminPage.row.classifyId" :dataArray="classifys"> </MySelect>
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
const { $get_page: Classify_$get_page } = get_baseApi('classify')
export default {
  data () {
    const adminPage = this.$store.state.adminPage
    const baseCurd = adminPage.curd(get_baseApi('good'))
    return {
      adminPage: adminPage,
      baseCurd: baseCurd,
      classifys: [],
    }
  },
  async created () {
    this.baseCurd.getPage()
    let { data } = await Classify_$get_page()
    this.classifys = data.rows
  },
  methods: {
    handleAddCard (good) {
      this.$router.push({
        name: 'cardAdd',
        params: good
      })
    },
  }
}
</script>

<style lang="less" >
</style>