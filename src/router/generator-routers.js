import { blank_layout, base_layout } from '@/admin/layouts'
// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BaseLayout: base_layout,
    BlankLayout: blank_layout,

}



const routes_data = [
    {
        id: 10,
        meta: { title: '系统管理', icon: 'Menu', show: true },
        name: "system",
        parentId: 0,
        component: "BlankLayout",
    },
    {
        component: "/test",
        id: 110,
        meta: { title: '测试', icon: 'Menu', show: true },
        name: "rol5e",
        path: "/admin/test",
        parentId: 10
    },
    {
        component: "/system/User",
        id: 120,
        meta: { title: '用户管理', icon: 'Menu', show: true },
        name: "rol5e",
        path: "/system/User",
        parentId: 10
    },
    {
        id: 20,
        meta: { title: '商品管理', icon: 'Menu', show: true },
        name: "syste5m5",
        parentId: 0,
        component: "BlankLayout",
    },
    {
        component: "/Classify",
        id: 210,
        meta: { title: '分类列表', icon: 'UserFilled', show: true },
        name: "rol55e",
        path: "/admin/classify",
        parentId: 20
    },
    {
        component: "/Goods",
        id: 220,
        meta: { title: '商品列表', icon: 'Menu', show: true },
        name: "role",
        path: "/admin/goods",
        parentId: 20
    },
    {
        component: "/CardAdd",
        id: 230,
        meta: { title: '添加卡密', icon: 'Menu', show: true },
        name: "rol2e",
        path: "/admin/cardAdd",
        parentId: 20
    },
    {
        id: 30,
        meta: { title: '订单管理', icon: 'Document', show: true },
        name: "order",
        parentId: 0,
        component: "BlankLayout",
    },
    {
        component: "/order/order_list",
        id: 310,
        meta: { title: '订单列表', icon: 'Document', show: true },
        name: "order_list",
        path: "/admin/order/order_list",
        parentId: 30
    },
    {
        component: "/test",
        id: 320,
        meta: { title: '测试31', icon: 'Menu', show: true },
        name: "role4",
        path: "/admin/test3555",
        parentId: 30
    },
    {
        id: 40,
        meta: { title: '服务管理', icon: 'Document', show: true },
        name: "system2",
        parentId: 0,
        component: "BlankLayout",
    },
    {
        component: "/service/service_list",
        id: 410,
        meta: { title: '服务项目', icon: 'Menu', show: true },
        name: "service_list",
        path: "/admin/service/service_list",
        parentId: 40
    },
    {
        component: "/test",
        id: 420,
        meta: { title: '服务分类', icon: 'Menu', show: true },
        name: "role3",
        path: "/admin/test7",
        parentId: 40
    },

]

// 根级菜单
const rootRouter = {
    path: '/',
    name: 'Home',
    component: 'BaseLayout',
    meta: {
        title: '首页'
    },
    redirect: '/myAccount/workplace',
    children: []
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
function generator(routerMap, parent) {
    return routerMap.map(item => {
        const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
            // 路由名称，建议唯一
            name: item.name || item.key || '',
            // 该路由对应页面的 组件 :方案1
            // component: constantRouterComponents[item.component || item.key],
            // 该路由对应页面的 组件 :方案2 (动态加载)

            component: constantRouterComponents[item.component || item.key] || (() => import(`@/admin${item.component}`)),

            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: title,
                icon: icon || undefined,
                hiddenHeaderContent: hiddenHeaderContent,
                target: target,
                permission: item.name
            }
        }
        // 是否设置了隐藏菜单
        if (show === false) {
            currentRouter.hidden = true
        }
        // 是否设置了隐藏子菜单
        if (hideChildren) {
            currentRouter.hideChildrenInMenu = true
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
function listToTree(list, tree, parentId) {
    list.forEach(item => {
        // 判断是否为父级菜单
        if (item.parentId === parentId) {
            const child = {
                ...item,
                key: item.key || item.name,
                children: []
            }
            // 迭代 list， 找到当前菜单相符合的所有子菜单
            listToTree(list, child.children, item.id)
            // 删掉不存在 children 值的属性
            if (child.children.length <= 0) {
                delete child.children
            }
            // 加入到树中
            tree.push(child)
        }
    })
}

let menuNav = []
let childrenNav = []
let routers = []

export default function generatorDynamicRouter() {


    //      后端数据, 根级树数组,  根级 PID
    listToTree(routes_data, childrenNav, 0)




    rootRouter.children = childrenNav
    menuNav.push(rootRouter)

    routers = generator(menuNav)



    return { menuNav, childrenNav, routers, routes_data }
}