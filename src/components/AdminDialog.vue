
<template>
  <!-- 新建与编辑dialog -->
  <el-dialog v-model="show" title="新建" width="400px">
    <el-form ref="form" label-width="100px" size="default">
      <slot name="form"> </slot>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup >
const props = defineProps({ show: Boolean })
const $emit = defineEmits(['confirm', 'cancel'])
const confirm = () => $emit('confirm')
const cancel = () => $emit('cancel')
</script>




