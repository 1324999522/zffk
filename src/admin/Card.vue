<template>
  <div id="card">
    <el-card>
      <AdminTopOper placeholder='请输入订单号或卡密'>
        <template #defaut>
          <AdminSelectClassify v-model="pageData.where.classifyId" @change="change_classify"> </AdminSelectClassify>
          <AdminSelectGood v-model="pageData.where.goodId" @change="change_good"> </AdminSelectGood>
          <el-radio-group v-model="pageData.where.is_sell" @change="pageData.getPage()">
            <el-radio-button label="已售出" />
            <el-radio-button label="未使用" />
          </el-radio-group>

          <el-date-picker v-model="date" @change="dateChange" type="datetimerange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" />
          <el-button type="primary" @click="handleTakeCard()">提取卡密</el-button>
          <el-button type="primary" @click="handleTakeCard()">复制选中</el-button>
          <el-button type="primary" @click="handleTakeCard()">导出卡密</el-button>
        </template>
      </AdminTopOper>

      <!-- 表格主体 -->
      <el-table :data="pageData.rows" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="number" label="卡密信息" width="380" show-overflow-tooltip />
        <el-table-column prop="status" label="销售状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.is_sell == 1 ? 'danger' : 'success'">{{ scope.row.is_sell == 1 ? '已售出' : '未使用' }}</el-tag>
          </template>
        </el-table-column>
        <!-- <AdminTableTagSwitch> </AdminTableTagSwitch> -->
        <el-table-column label="入库时间" width="165">
          <template #default="scope">
            <el-link type="primary" @click="Click_createdAt(scope.row.createdAt)">{{ scope.row.createdAt }}</el-link>
          </template>
        </el-table-column>
        <AdminTableButton> </AdminTableButton>
      </el-table>

      <AdminPagination> </AdminPagination>
    </el-card>

    <AdminDialog>
      <template #form>
        <el-form-item label="卡密信息">
          <el-input v-model="pageData.row.number"></el-input>
        </el-form-item>
        <el-form-item label="优先出售">
          <el-input v-model="pageData.row.sort"></el-input>
        </el-form-item>
      </template>
    </AdminDialog>

    <el-dialog v-model="is_dialogTakeCard" title="提取卡密" width="400px">
      <el-form ref="form" label-width="100px" size="default">
        <el-form-item label="剩余卡密">{{ pageData.count }} </el-form-item>
        <el-form-item label="提取数量"><el-input v-model="takeCardCount"></el-input> </el-form-item>
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
import { ref, onMounted, reactive } from 'vue'
import Api from '@/network'
import Store from '@/store'
import { useRoute } from 'vue-router'
const pageData = reactive(Api.adminPage('card'))
const route = useRoute()

pageData.where.is_sell = '未使用'



onMounted(() => {
  let { orderName, classifyId, goodId } = route.params
  if (orderName) {
    pageData.searchKey = orderName
    pageData.where.is_sell = '已售出'
  }
  if (goodId) pageData.where.goodId = Number(goodId)
  if (goodId) pageData.where.classifyId = Number(classifyId)

  pageData.getPage()
})
let is_selection = false
let takeCardCount = ref(1)
let is_dialogTakeCard = ref(false)
let date = ref([])
const handleSelectionChange = () => {
  //is_dialogTakeCard = true
}
const handleTakeCard = () => is_dialogTakeCard.value = true
const dateChange = (value) => {
  pageData.where.createdAt = value
  pageData.getPage()
}
const Click_createdAt = (value) => {

  date.value = [value, value.slice(0, 17) + '59']
  dateChange(date)
}
const change_classify = (value) => {
  //is_dialogTakeCard.value = true
  Store.state.AdminSelectGood({ classifyId: value })
}
const change_good = (value) => {
  pageData.where.goodId = value
  pageData.getPage()
}
const takeCard = () => {
  Api.order.takeCard({
    count: takeCardCount.value,
    goodId: pageData.where.goodId,
  })
}
</script>


<style lang="less"  scoped>
#card {
  max-width: 1050px;
  .el-checkbox {
    height: 20px !important;
  }
}
</style>