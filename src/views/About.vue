<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ abc }}

   
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
