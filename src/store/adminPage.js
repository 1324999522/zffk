const data = function () {
  return {
    count: 10,
    limit: 10,
    offset: 1,
    searchKey: '',
    isEdit: false,
    dialogVisible: false,
    row: {},
    rows: [],
    where: {}

  }
}

const adminPage = {
  ...data(),
  handleCreate () {
    this.isEdit = false
    this.dialogVisible = true
    this.row = {}
  },
  handleEdit (index, row) {
    console.log(row)
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
        let { data } = await $get_page({ ...{ limit: adminPage.limit, offset: adminPage.offset, searchKey: adminPage.searchKey }, ...adminPage.where })
        adminPage.rows = data.rows
        adminPage.count = data.count
      },
      async create () {
        if (adminPage.isEdit) { this.update(); return }
        let { data } = await $post(adminPage.row)
        adminPage.row = data
        adminPage.row.id = undefined
        this.getPage()
      },
      async update () {
        console.log( adminPage.row )
        let { data } = await $put(adminPage.row)
        this.getPage()
      },
    }
  },
  change () {
    const Data = data()
    for(let key in  Data){
      this[key] =  Data[key]
    }
  }
}




export {
  adminPage
}