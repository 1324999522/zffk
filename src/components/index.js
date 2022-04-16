





import * as ElIcons from '@element-plus/icons'
import Pagination from '@/components/Pagination'
import MySelect from '@/components/MySelect'
export default function (app) {


  for (const name in ElIcons) {
    app.component(name, ElIcons[name])
  }

  app.component('Pagination', Pagination)
  app.component('MySelect', MySelect)


}