



import { request } from "./request"
import { get_baseApi } from "./baseApi"
import card from "./api/card"
import order from "./api/order"


const Api = {
  get_baseApi: get_baseApi,
  card: card(request),
  order: order(request),
  adminPage: function (props) {
    const { $delete, $get_page, $post, $put } = this.get_baseApi(props)
    return {
      count: 6,
      limit: 6,
      offset: 1,
      searchKey: '',
      isEdit: false,
      dialogVisible: false,
      row: {},
      rows: [],
      where: {},
      handleCreate () {
        this.isEdit = false
        this.dialogVisible = true
        this.row = {}
      },
      handleEdit (index, row) {
        console.log( row )
        this.isEdit = true
        this.dialogVisible = true
        this.row = row
       
      },
      handleSearch () { },
      async handleDelete (index, row) {
        let { data } = await $delete({ id: row.id })
        this.getPage()
      },
      async getPage () {
        console.log(this)
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
  }
}

export default Api