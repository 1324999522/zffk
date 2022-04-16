import { createStore } from 'vuex'
import { adminPage } from './adminPage.js'
// 创建一个新的 store 实例
export default createStore({
  state () {
    return {
      adminPage: adminPage

    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

