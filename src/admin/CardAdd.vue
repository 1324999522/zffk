<template>
  <el-card class="cardAdd">
    <MySelect :value="form.classifyId" :dataArray="classifys"> </MySelect>

    <MySelect :value="form.goodId" :dataArray="goods"> </MySelect>

    <el-input
      v-model="textarea2"
      :rows="15"
      type="textarea"
      placeholder="Please input"
    />

    <el-button type="primary">添加卡密</el-button>
  </el-card>
</template>

<script   >
import { get_baseApi } from '@/network/baseApi.js'
const { $get_page: Classify_$get_page } = get_baseApi('classify')
const { $get_page: Good_$get_page } = get_baseApi('good')
export default {
  name: 'card',
  components: {

  },
  data () {
    return {
      classifys: [],
      goods: [],
      form: {}
    }
  },
  async created () {
    let { data } = await Classify_$get_page()
    this.classifys = data.rows
    let { data: goods_data } = await Good_$get_page()
    this.goods = goods_data.rows
  }
}
</script>

<style lang="less" scoped>
.cardAdd {
  max-width: 800px;
  padding: 20px;
}
.el-textarea {
  margin: 20px 0px;
}
.el-select {
  margin-right: 20px !important;
}
</style>
