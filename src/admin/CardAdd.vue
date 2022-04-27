<template>
  <el-card class="cardAdd">
    <AdminSelectClassify v-model="form.classifyId" @change="change_classify"> </AdminSelectClassify>

    <AdminSelectGood v-model="form.goodId"> </AdminSelectGood>

    <el-input v-model="form.cards" :rows="15" type="textarea" placeholder="Please input" />

    <el-button type="primary" @click="handleAddCard()">添加卡密</el-button>
  </el-card>
</template>

<script   >
import Store from '@/store'
import Api from '@/network/index.js'
const { $get_page: Classify_$get_page } = Api.get_baseApi('classify')
const { $get_page: Good_$get_page } = Api.get_baseApi('good')

export default {
  data () {
    return {
      form: {}
    }
  },
  async created () {
    if (!this.$route.params.id) return
    this.change_classify(this.$route.params.classifyId)
    this.form.goodId = Number(this.$route.params.id)
    this.form.classifyId = Number(this.$route.params.classifyId)
  },
  methods: {
    async change_classify (value) {
      delete this.form.goodId
      Store.state.AdminSelectGood({ classifyId: value })
    },
    handleAddCard () {
      const Cards = this.getCardsArray(this.form)
      let res = Api.card['post_bulkCreate'](Cards)
    },
    getCardsArray ({ cards, goodId }) {
      cards = cards.replace(/\ +/g, '')
      let numbers = cards.split(/[(\r\n)\r\n]+/)
      numbers = numbers.filter(number => number != '')
      return numbers.map((number) => {
        return { number: number, goodId: goodId }
      })
    },
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
