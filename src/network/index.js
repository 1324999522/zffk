



import { request } from "./request"
import { get_baseApi } from "./baseApi"
import card from "./api/card"
import order from "./api/order"


const Api = {
  get_baseApi: get_baseApi,
  card: card(request),
  order: order(request),
  pageData: {},
  adminPage: function (props) {
    const { $delete, $get_page, $post, $put } = this.get_baseApi(props)
    const pageData = {
      count: 6,
      limit: 6,
      offset: 1,
      searchKey: '',
      isEdit: false,
      dialogVisible: false,
      dialogTitle: '新建',
      row: {},
      rows: [],
      where: {},
      handleCreate () {
        this.isEdit = false
        this.dialogVisible = true
        this.row = {}
      },
      handleEdit (index, row) {
        this.dialogTitle = '编辑'
        this.isEdit = true
        this.dialogVisible = true
        this.row = row

      },
      handleSearch () {
        this.getPage()
      },
      async handleDelete (index, row) {
        let { data } = await $delete({ id: row.id })
        this.getPage()
      },
      async getPage () {
        let { data } = await $get_page({ ...{ limit: this.limit, offset: this.offset, searchKey: this.searchKey }, ...this.where })
        this.rows = data.rows
        this.count = data.count
      },
      async create () {
        if (this.isEdit) { this.update(); return }
        let { data } = await $post(this.row)
        this.row = data
        this.row.id = undefined
        this.getPage()
      },
      async update () {
        let { data } = await $put(this.row)
        this.getPage()
      },

    }
    this.pageData = pageData
    return pageData
  }
}

export default Api