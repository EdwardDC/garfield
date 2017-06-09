import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'

Vue.use(VueRouter)

// const prefix = process.env.NODE_ENV !== 'development' ? 'newAtree' : ''

const Router = new VueRouter({
  mode: 'history',
  base: __dirname,
  // base: '/' + prefix,
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0

Router.beforeEach((to, from, next) => {
  // var { requiresAuth = true } = to.meta
  // var isLogin = Boolean(store.state.user.id)
  // if (requiresAuth && !isLogin && to.path !== '/signin') {
  //   return next({
  //     path: '/signin'
  //   })
  // }
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

Router.afterEach(route => {
  // console.log('after route')
})

export default Router
