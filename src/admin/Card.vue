<template>
  <div id="card">
    <el-card>
      <AdminTopOper>
        <template #defaut>
          <AdminSelectClassify v-model="classifyId" @change="change_classify"> </AdminSelectClassify>
          <AdminSelectGood v-model="goodId" @change="change_good" ref="AdminSelectGood"> </AdminSelectGood>
          <el-button type="primary" icon="Search" @click="handleTakeCard()">提取卡密</el-button>
        </template>
      </AdminTopOper>

      <!-- 表格主体 -->
      <el-table :data="adminPage.rows" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="number" label="卡密信息" width="400" />
        <AdminTableTagSwitch> </AdminTableTagSwitch>
        <!-- <AdminTableTagSwitch> </AdminTableTagSwitch> -->
        <el-table-column prop="createdAt" label="创建时间" width="220" />
        <AdminTableButton :baseCurd="baseCurd"> </AdminTableButton>
      </el-table>

      <AdminPagination :getPage="baseCurd.getPage"> </AdminPagination>
    </el-card>

    <AdminDialog @Confirm="baseCurd.create()">
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
    <!-- 提取卡密dialog -->
    <el-dialog v-model="is_dialogTakeCard" title="提取卡密" width="400px">
      <el-form>
        <el-form-item label="提取数量">
          <el-input v-model="takeCardCount"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="is_dialogTakeCard = false">Cancel</el-button>
          <el-button type="primary" @click="takeCard()">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue'
import Store from '@/store'
import Api from '@/network'

const adminPage = Store.state.adminPage
const baseCurd = adminPage.curd(Api.get_baseApi('card'))
let is_selection = false
let takeCardCount = 1
let is_dialogTakeCard = ref(false)
let classifyId = null
let goodId = null

onMounted(() => {
  baseCurd.getPage()
})

const handleSelectionChange = () => {
  //is_dialogTakeCard = true
}
const handleTakeCard = () => {
  is_dialogTakeCard.value = true
}
const change_classify = (value) => {
  //is_dialogTakeCard.value = true
  // $refs.AdminSelectGood.getGoods({ classifyId: value })
}
const change_good = (value) => {
  adminPage.where.goodId = value
  baseCurd.getPage()
}
const takeCard = () => {
  Api.order.takeCard({
    count: takeCardCount || 10,
    goodId: goodId,
  })
}
</script>






<style lang="less" >
#card .el-checkbox {
  height: 20px !important;
}
// <script >
// import Api from '@/network/index.js'
// export default {
//   data () {
//     const adminPage = this.$store.state.adminPage
//     const baseCurd = adminPage.curd(Api.get_baseApi('card'))
//     return {
//       adminPage: adminPage,
//       baseCurd: baseCurd,
//       is_selection: false,
//       takeCardCount: 1,
//       is_dialogTakeCard: false,
//       classifyId: null,
//       goodId: null,
//     }
//   },
//   async created () {
//     this.baseCurd.getPage()
//   },
//   methods: {
//     handleSelectionChange (val) {

//     },
//     handleTakeCard () {
//       this.is_dialogTakeCard = true
//     },
//     change_classify (value) {
//       delete this.goodId
//       this.$refs.AdminSelectGood.getGoods({ classifyId: value })

//     },
//     change_good (value) {
//       this.adminPage.where.goodId = value
//       this.baseCurd.getPage()
//     },
//     takeCard () {
//       Api.order.takeCard({
//         count: this.takeCardCount || 10,
//         goodId: this.goodId,
//       })
//     }
//   }

// }
// </script>
</style>