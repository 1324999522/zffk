<template>
  <div class="home">
    客户端

    <el-space wrap>
      <el-card v-for="item in classifys" :key="item.id" @click="click_classify(item)" :class="{ classifyActive: item == classify }" direction="vertical">
        {{ item.name }}
      </el-card>
    </el-space>

    <el-space wrap class="goods">
      <el-card v-for="item in goods" :key="item.id" @click="click_good(item)" :class="{ goodActive: item == good }" direction="vertical">
        {{ item.name }}
        <div>{{ item.price }}元</div>
      </el-card>
    </el-space>

    <el-row :gutter="20" class="Submit">
      <el-col :span="8" class="fastOpe">
        <el-button type="primary" icon="Edit" circle />
        <el-button type="success" icon="Check" circle />
      </el-col>
      <el-col :span="16" class="PaymentMethod"> 使用支付宝支付 ￥{{ good.price * count }} </el-col>
    </el-row>

    <el-card class="describe">
      <template #header>
        <div class="card-header">商品简介</div>
      </template>
      <span>{{ good.describe }}</span>
    </el-card>

    <el-input-number v-model="count" :min="good.min" :max="good.max" @change="handleCount" />
  </div>
</template>

<script setup >
import { ref, onMounted, reactive } from 'vue'
import Api from '@/network'

let count = ref(1)
let good = ref({})
let classify = ref({})
let GoodApi = Api.get_baseApi('good')
let goods = ref([])
let ClassifyApi = Api.get_baseApi('good')
let classifys = ref([])

onMounted(async () => {
  let { data } = await ClassifyApi.$get_page()
  classifys.value = data.rows
  classify.value = data.rows[0]

  let { data: goodDate } = await GoodApi.$get_page()
  goods.value = goodDate.rows
  good.value = goodDate.rows[0]
})

const click_classify = (item) => {
  classify.value = item
}
const click_good = (item) => {
  good.value = item
}
const handleCount = (value) => {

}



</script>

<style lang="less" >
.home {
  padding: 10px;
  .goods {
    margin-top: 40px;
  }
  .classifyActive {
    background-color: var(--el-color-primary);
    color: white;
  }
  .goodActive {
    border: 1px solid var(--el-color-primary);
    overflow: hidden;
    color: var(--el-color-primary);
  }
}
.Submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  font-weight: 700;
  height: 60px;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 0 0.2rem #efefef;
  .PaymentMethod {
    background-color: var(--el-color-primary);
    color: white;
    font-size: 17px;
  }
}
.describe {
  margin-top: 20px;
  margin-bottom: 20px;
  span {
    font-size: 14px;
    color: #999;
    font-weight: 700;
  }
}
</style>
