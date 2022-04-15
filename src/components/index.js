





import * as ElIcons from '@element-plus/icons'
import Pagination from '@/components/Pagination'

export default function (app) {

  
  for (const name in ElIcons) {
    app.component(name, ElIcons[name])
  }

  app.component('Pagination', Pagination)


}