// resolve => System.import('./overview.vue')
const NotFound = resolve => require(['@/views/NotFound'], resolve)
const UserManage = resolve => require(['@/views/user/manage/index.vue'], resolve)
const UserModify = resolve => require(['@/views/user/modify/index.vue'], resolve)
const OrderManage = resolve => require(['@/views/order/manage/index.vue'], resolve)
const RightsManage = resolve => require(['@/views/rights/manage/index.vue'], resolve)
const Signin = resolve => require(['@/views/Signin'], resolve)
const Routes = [
  {
    path: '/',
    redirect: '/userManage'
  },
  {
    name: 'userManage',
    path: '/userManage',
    component: UserManage
  },
  {
    name: 'orderManage',
    path: '/orderManage',
    component: OrderManage
  },
  {
    name: 'userModify',
    path: '/userModify/(:userid)?',
    component: UserModify
  },
  {
    name: 'rightsManage',
    path: '/rightsManage',
    component: RightsManage
  },
  {
    name: 'signin',
    path: '/signin',
    component: Signin
  },
  {
    path: '*',
    component: NotFound
  }
]

export default Routes
