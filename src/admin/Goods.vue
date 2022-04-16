<template>
  <div id="classify_list">
    <el-card>
      <div class="top">
        <el-input
          v-model="adminPage.searchKey"
          placeholder="请输入分类名称"
        ></el-input>
        <el-button
          type="primary"
          icon="Search"
          @click="adminPage.handleSearch()"
          >搜索</el-button
        >
        <el-button type="primary" icon="Plus" @click="adminPage.handleCreate()"
          >新建</el-button
        >
      </div>

      <!-- 表格主体 -->
      <el-table :data="adminPage.rows" style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="商品名称" width="180" />
        <el-table-column prop="name" label="商品分类" width="120" />
        <el-table-column prop="status" label="销售状态" width="220">
          <template #default="scope">
            <el-tag
              style="margin-right: 10px; width: 50px"
              :type="scope.row.status == 'OFF' ? 'danger' : ''"
            >
              {{ scope.row.status }}
            </el-tag>

            <el-switch
              v-model="scope.row.status"
              active-value="ON"
              inactive-value="OFF"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <el-table-column label="Operations" width="240">
          <template #default="scope">
            <el-button
              size="mini"
              @click="adminPage.handleEdit(scope.$index, scope.row)"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="Are you sure to delete this?"
              @confirm="baseCurd.handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="mini" type="danger" icon="Delete"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :getPage="baseCurd.getPage"> </Pagination>
    </el-card>

    <!-- 新建与编辑dialog -->
    <el-dialog v-model="adminPage.dialogVisible" title="新建" width="400px">
      <el-form
        ref="form"
        :model="adminPage.row"
        label-width="100px"
        size="medium"
      >
        <el-form-item label="商品名称">
          <el-input v-model="adminPage.row.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <MySelect :value="adminPage.row.classifyId" :dataArray="classifys">
          </MySelect>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="adminPage.row.sort"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="adminPage.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="baseCurd.create()"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
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


  }
}
</script>

<style lang="less" >
</style>