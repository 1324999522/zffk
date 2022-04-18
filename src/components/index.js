





import * as ElIcons from '@element-plus/icons'
import Pagination from '@/components/Pagination'
import MySelect from '@/components/MySelect'
import AdminDialog from '@/components/AdminDialog'
import AdminTableButton from '@/components/AdminTableButton'
import AdminTableTagSwitch from '@/components/AdminTableTagSwitch'
import AdminTopOper from '@/components/AdminTopOper'
export default function (app) {


  for (const name in ElIcons) {
    app.component(name, ElIcons[name])
  }

  app.component('Pagination', Pagination)
  app.component('MySelect', MySelect)
  app.component('AdminDialog', AdminDialog)
  app.component('AdminTableButton', AdminTableButton)
  app.component('AdminTableTagSwitch', AdminTableTagSwitch)
  app.component('AdminTopOper', AdminTopOper)


}