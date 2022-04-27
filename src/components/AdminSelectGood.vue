<template>
  <el-select v-model="modelValue" placeholder="选择商品" @change="change">
    <el-option v-for="good in goods" :key="good.id" :label="good.name" :value="good.id" />
  </el-select>
</template>

<script>
import Api from '@/network/index.js'
const { $get_page } = Api.get_baseApi('good')
import Store from '@/store'
export default {
  props: {
    modelValue: Number,
  },
  data () {
    return {
      goods: []
    }
  },
  async created () {
    await this.getGoods()
    Store.state.AdminSelectGood = this.getGoods

  },
  methods: {
    async getGoods (where) {
      let { data } = await $get_page(where)
      this.goods = data.rows
    },
    change (val) {
      this.$emit('update:modelValue', val)
      this.$emit('change', val)
    },

  }
}
</script>
