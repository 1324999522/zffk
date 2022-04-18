
<template>
  <!-- 新建与编辑dialog -->
  <el-dialog v-model="adminPage.dialogVisible" title="新建" width="400px">
    <el-form ref="form" :model="adminPage.row" label-width="100px" size="medium">
      <slot name="form"> </slot>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="adminPage.dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="baseCurd.create()">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { get_baseApi } from '@/network/baseApi.js'
export default {
  props: {
    baseCurd: Object
  },
  data () {
    const adminPage = this.$store.state.adminPage
    return {
      adminPage: adminPage,
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
