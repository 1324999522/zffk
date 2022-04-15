<template>
  <div id='user_list'>
    <el-card>
      <div class='top'>
        <el-input placeholder=""></el-input>
        <el-button type="primary" icon='Search' @click="handleSearch()">搜索</el-button>
        <el-button type="primary" icon='Plus' @click="handleCreate()">新建</el-button>
        <!-- <el-button type="danger" icon='Delete' @click="handleDeleteMany()">删除</el-button> -->
      </div>

      <!-- 表格主体 -->
      <el-table :data="users" style="width: 100%">

        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="username" label="用户名" width="220" />
        <el-table-column label="Operations" width="240">
          <template #default="scope">
            <img v-show="scope.row.wechat_qrcode" class='wechat_qrcode' :src="scope.row.wechat_qrcode" alt="">
            <el-button size="mini" @click="handleBindWechat(scope.$index, scope.row)">绑定微信</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="count" background @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>

    <!-- 新建与编辑dialog -->
    <el-dialog v-model="dialogVisible" title="新建" width="30%">
      <el-form ref="form" :model="user" label-width="100px" size='medium'>
        <el-form-item label="客户名称">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="user.unit"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="create()">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<script >
import { get_baseApi } from '@/network/baseApi.js'
let { $get_page, $get_one, $post, $put, $delete, $delete_many } = get_baseApi('user')
import { get_user_bindWechatQrcode } from '@/network/api/user.js'

export default {
  components: {
  },
  data() {
    return {
      users: [], user: {}, dialogVisible: false, count: 10, limit: 10, offset: 1, isEdit: false,
    }
  },
  async created() {
    this.getPage()
  },
  methods: {
    async handleDelete(index, row) {
      let { data } = await $delete({ id: row.id })
      this.getPage()
      // data == 1
    },
    handleSearch() {

    },
    handleCreate() {
      this.isEdit = false
      this.dialogVisible = true
      this.user = {}
    },
    handleEdit(index, row) {
      this.isEdit = true
      this.dialogVisible = true
      this.user = row
    },
    async getPage() {
      let { data } = await $get_page({ limit: this.limit, offset: this.offset })
      this.users = data.rows
      this.count = data.count
    },
    async create() {
      if (this.isEdit) { this.update(); return }
      let { data } = await $post(this.user)
      this.user = data
      this.getPage()
    },
    async update() {
      let { data } = await $put(this.user)
      this.getPage()
    },
    // 分页查询方法
    handleSizeChange(val) { this.limit = val; this.getPage() },
    handleCurrentChange(val) { this.offset = val; this.getPage() },
    //获取绑定微信二维码 
    async handleBindWechat(index,row){
      let res = await get_user_bindWechatQrcode({userId:row.id})
      row.wechat_qrcode = res.data.qr
    }
  }
}
</script>

<style lang="less" >
.wechat_qrcode{
  width: 150px;
  height: 150px;
}
</style>