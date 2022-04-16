<template>
  <el-select v-model="value" placeholder="Select" size="large">
    <el-option
      v-for="item in dataArray"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    value: Number,
    dataArray: Array,
  },
  data () {
    return {}
  },
  created () {

  },
  methods: {

  }
}
</script>
