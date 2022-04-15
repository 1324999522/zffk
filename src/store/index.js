import { createStore } from 'vuex'

// 创建一个新的 store 实例
export default createStore({
  state () {
    return {
      adminPage: {
        count: 10,
        limit: 10,
        offset: 1,
        searchKey: '',
        isEdit: false,
        dialogVisible: false,
        row: {},
        rows: [],
        handleCreate () {
          this.isEdit = false
          this.dialogVisible = true
          this.row = {}
        },
        handleEdit (index, row) {
          this.isEdit = true
          this.dialogVisible = true
          this.row = row
        },
        handleSearch () { },
        curd (options) {
          const adminPage = this
          const { $delete, $get_page, $post, $put } = options
          return {
            async handleDelete (index, row) {
              let { data } = await $delete({ id: row.id })
              this.getPage()
            },
            async getPage () {
              let { data } = await $get_page({ limit: adminPage.limit, offset: adminPage.offset, searchKey: adminPage.searchKey })
              adminPage.rows = data.rows
              adminPage.count = data.count
            },
            async create () {
              if (adminPage.isEdit) { this.update(); return }
              let { data } = await $post(adminPage.row)
              adminPage.row = data
              this.getPage()
            },
            async update () {
              let { data } = await $put(adminPage.row)
              this.getPage()
            },
          }
        }
      }

    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

