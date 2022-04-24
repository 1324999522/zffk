
<template>
  <el-table-column prop="status" label="销售状态" width="220">
    <template #default="scope">
      <el-tag style="margin-right: 10px; width: 50px" :type="scope.row.status == 'OFF' ? 'danger' : ''">{{ scope.row.status }}</el-tag>

      <el-switch v-model="scope.row.status" active-value="ON" inactive-value="OFF" />
    </template>
  </el-table-column>
</template>




