import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

import generatorDynamicRouter from './generator-routers.js'

const { menuNav, childrenNav, routers, routes_data } = generatorDynamicRouter()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/admin/classify'
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import('../views/About.vue')
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: function () {
      return import('@/admin/layouts/base_layout.vue')
    },
    children: routers[0].children,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from) => {
//   console.log(to)
//   // ...
//   // 返回 false 以取消导航

// })

router.menuNav = menuNav[0].children
router.routes_data = routes_data




export default router
