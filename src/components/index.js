





import * as ElIcons from '@element-plus/icons'
import AdminPagination from '@/components/AdminPagination'
import MySelect from '@/components/MySelect'
import AdminDialog from '@/components/AdminDialog'
import AdminTableButton from '@/components/AdminTableButton'
import AdminTableTagSwitch from '@/components/AdminTableTagSwitch'
import AdminTopOper from '@/components/AdminTopOper'
import AdminSelectClassify from '@/components/AdminSelectClassify'
import AdminSelectGood from '@/components/AdminSelectGood'


export default function (app) {


  for (const name in ElIcons) {
    app.component(name, ElIcons[name])
  }

  app.component('AdminPagination', AdminPagination)
  app.component('MySelect', MySelect)
  app.component('AdminDialog', AdminDialog)
  app.component('AdminTableButton', AdminTableButton)
  app.component('AdminTableTagSwitch', AdminTableTagSwitch)
  app.component('AdminTopOper', AdminTopOper)
  app.component('AdminSelectClassify', AdminSelectClassify)
  app.component('AdminSelectGood', AdminSelectGood)


}