import { blank_layout, base_layout } from '@/admin/layouts'
// 前端路由表
const constantRouterComponents = {
    // 基础页面 layout 必须引入
    BaseLayout: base_layout,
    BlankLayout: blank_layout,
}

const routerMap = [
    { title: '系统管理', component: "BlankLayout", id: 10, icon: 'Menu', name: "system", parentId: 0, },
    { title: '测试111', component: "/test", id: 110, title: '测试', icon: 'Menu', name: "rol5e", path: "/admin/test", parentId: 10 },
    { title: '商品管理', component: "BlankLayout", id: 20, icon: 'Menu', name: "goodAdmin", parentId: 0, },
    { title: '分类列表', component: "/Classify", id: 210, icon: 'UserFilled', name: "classify", parentId: 20 },
    { title: '商品列表', component: "/Goods", id: 220, icon: 'Menu', name: "good", parentId: 20 },
    { title: '添加卡密', component: "/CardAdd", id: 230, icon: 'Menu', name: "cardAdd", parentId: 20 },
    { title: '卡密管理', component: "/Card", id: 240, icon: 'Menu', name: "Card", path: "/admin/Card", parentId: 20 },
    { title: '订单列表', component: "/order/order_list", id: 310, icon: 'Document', name: "order_list", parentId: 30 },
    { title: '测试311', component: "/test", id: 320, icon: 'Menu', name: "role4", path: "/admin/test3555", parentId: 30 },
    { title: '服务管理', component: "BlankLayout", id: 40, icon: 'Document', name: "system2", parentId: 0, },
    { title: '服务项目', component: "/service/service_list", id: 410, icon: 'Menu', name: "service_list", parentId: 40 },
    { title: '服务分类', component: "/test", id: 420, icon: 'Menu', name: "role3", parentId: 40 },
]
/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
function generator (routerMap, parent) {
    return routerMap.map(item => {
        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: item.path || `/admin/${item.name}`,
            name: item.name || item.key || '',
            component: constantRouterComponents[item.component || item.key] || (() => import(`@/admin${item.component}`)),
            meta: {
                title: item.title,
                icon: item.icon,
            }
        }
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
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
function listToTree (list, tree, parentId) {
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


export default function createAdminRouters () {

    const routes_tree = []
    //      后端数据, 根级树数组,  根级 PID
    listToTree(routerMap, routes_tree, 0)

    const adminRoutes = generator(routes_tree)

    return adminRoutes
}