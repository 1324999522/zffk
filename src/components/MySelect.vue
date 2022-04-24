<template>
  <el-select v-model="modelValue" placeholder="Select"  @change="change">
    <el-option v-for="item in dataArray" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script>
export default {
  props: {
    dataArray: Array,
    modelValue: Number,
  },
  data () {
    return {
      value: null
    }
  },
  created () {
    
  },
  methods: {
    change (val) {
      this.$emit('update:modelValue', val)
      this.$emit('change', val)
    },

  }
}
</script>
