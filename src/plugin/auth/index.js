import IFetch from '@/plugin/fetch'
class Auth {
  static install (Vue, store, options) {
    Vue.prototype.$auth = new Auth(store, options)
  }

  rights = new Map()

  constructor (store = null, options = {}) {
    this.store = store
    this.options = options
    this.iFetch = new IFetch(store)
  }

  signin () {
    this.iFetch.get('/atree/api/users/session').then(json => {
      if (json) {
        this.store.commit('signin', json.data || {})
        this.loadPool()
      }
    })
  }

  signout () {
    this.iFetch.get('/sso/api/users/logout').then(json => {
      if (json) {
        window.location.href = '/sso'
      }
    })
  }

  loadPool () {
    this.iFetch.get('/atree/api/pcs/', {from: 0, size: 999}).then(json => {
      if (json) {
        this.store.commit('loadPool', json.dataList || [])
      }
    })
  }

  rightsConvert () {}

  getRights () {
    return this.rights
  }
}

export default Auth
