// resolve => System.import('./overview.vue')
const NotFound = resolve => require(['@/views/NotFound'], resolve)
const PageOne = resolve => require(['@/views/PageOne'], resolve)
const Signin = resolve => require(['@/views/Signin'], resolve)
const Routes = [
  {
    path: '/',
    redirect: '/pageone'
  },
  {
    name: 'pageone',
    path: '/pageone',
    component: PageOne
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
