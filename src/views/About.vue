<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ abc }}
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      </template>
    </el-upload>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
export default {
  setup () {
    let abc = ref(1)

    onMounted(() => {
      abc.value = 10
    })
    return {
      abc
    }
  }
}

</script>
