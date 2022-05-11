
<template>
  <!-- 新建与编辑dialog -->
  <el-dialog v-model="pageData.dialogVisible" :title="pageData.dialogTitle" width="400px" class="adminDialog" >
    <el-form ref="form" label-width="100px" size="default" >
      <slot name="form"> </slot>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="pageData.dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="pageData.create()">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup >
import Api from '@/network'
import { reactive } from 'vue'
const pageData = reactive(Api.pageData)


</script>

<style lang="less" >

</style>




