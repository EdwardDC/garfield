// import axios from 'axios'
import util from '@/libs/util'
var axios = {
  create () {}
}
const getInstance = Symbol('getInstance')
/*
  Http 拦截处理
*/
class Axios {
  static options = {
    baseUrl: ''
  }

  constructor (store, options) {
    this.getInstance()

    this.instance.interceptors.request.use(function (config) {
      // before request is sent
      try {
        // var token = localStorage.getItem('token') || ''
        // config.defaults.headers.common['token'] = token
        let xpbtoken = util.getCookie('xpbtoken')
        if (xpbtoken) {
          config.defaults.headers.common.headers = { xpbtoken }
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Request URL: "${config.url}", There is no token! Please check the request params...`)
        }
      }
      return config
    }, function (error) {
      // request error
      return Promise.reject(error)
    })

    this.instance.interceptors.response.use(function (response) {
      // Do something with response data
      return response
    }, function (error) {
      var status = error.response.status
      var message = ''
      switch (status) {
        case 400:
          message = '请求路径错误'
          break
        case 401:
          message = '未授权, 重新登录'
          break
        case 403:
          message = '禁止访问，请稍后再试'
          break
        case 404:
          message = '无法找到'
          break
        case 500:
          message = '服务端异常，请稍后重试'
          break
        default:
          message = '未知错误请联系管理人员'
          break
      }
      if (store.dispatch) {
        store.dispatch('message', {
          title: '错误',
          msg: message
        })
      }
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Response status: "${status}", Please check the response params...`)
      }
      // request error
      return Promise.reject(error)
    })
  }

  [getInstance] () {
    var instance = axios.create()
    return function () {
      return instance
    }
  }

  getInstance () {
    var instance = this.instance = this[getInstance]()()
    return instance
  }

  doGet (url, config) {
    return this.instance.get(url, config || {})
  }

  doPost (url, config) {
    return this.instance.post(url, config || {})
  }

  doPut (url, config) {
    return this.instance.put(url, config || {})
  }

  doDelete (url, config) {
    return this.instance.delete(url, config || {})
  }

  static install (Vue, store, options) {
    Vue.prototype.$http = new Axios(store, options).instance
  }
}

export default Axios
