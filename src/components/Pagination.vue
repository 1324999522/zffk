<template>
  <el-pagination
    :page-sizes="[10, 20, 50, 100]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="adminPage.count"
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script >
export default {
  props: {
    getPage: Function,
  },
  name: 'test',
  data () {
    return {
      adminPage: this.$store.state.adminPage,

    }
  },
  created () {

  },
  methods: {
    // 分页查询方法
    handleSizeChange (val) {
      this.adminPage.limit = val
      this.getPage()
    },
    handleCurrentChange (val) {
      this.adminPage.offset = val;
      this.getPage()
    },
  }
}
</script>
