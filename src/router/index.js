import { createRouter, createWebHashHistory } from 'vue-router'

import createAdminRouters from './createAdminRouters.js'
const adminRoutes = createAdminRouters()



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/Home.vue'), redirect: '/admin/classify' },
    { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
    { path: '/admin', name: 'Admin', component: () => import('@/admin/layouts/base_layout.vue'), redirect: '/admin/classify', children: adminRoutes, },
  ]
})

// router.beforeEach((to, from) => {
//   console.log(to)
//   // ...
//   // 返回 false 以取消导航

// })

router.adminRoutes = adminRoutes


export default router
