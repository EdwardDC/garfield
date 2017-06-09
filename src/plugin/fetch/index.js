// import promise from 'es6-promise'
// promise.polyfill()
import Promise from 'promise-polyfill'
import { MessageBox } from 'element-ui'
// To add to window
if (!window.Promise) {
  window.Promise = Promise
}

import 'whatwg-fetch'
import _ from '@/libs/util'
class IFetch {
  static options = {
    // 允许发送cookie
    credentials: 'same-origin',
    // 允许跨域
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  static install (Vue, store, options) {
    Vue.prototype.$http = new IFetch(store, options)
  }

  bugWatcher = new Map()

  constructor (store, options) {
    this.store = store
    this.options = options || {}
  }

  preFetch (url, options) {
    let {headers = {}} = options
    let xpbtoken = _.getCookie('xpbtoken')
    if (xpbtoken) {
      options.headers = Object.assign(headers, { xpbtoken })
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`There is no token! Please check the request params...`)
      }
    }
  }

  fail (error) {
    if (process.env.NODE_ENV === 'development') {
      for (let item of this.bugWatcher.entries()) {
        console.group('request Url: ' + item[0])
        console.log('sending: ', item[1])
        console.log('error: ', error.response || error)
        console.groupEnd()
      }
    }
    if (this.store) {
      // let response = error.response || {}
      // var status = response.status
      // var message = ''
      // switch (status) {
      //   case 400:
      //     message = '请求路径错误'
      //     break
      //   case 401:
      //     message = '未授权, 重新登录'
      //     break
      //   case 403:
      //     message = '禁止访问，请稍后再试'
      //     break
      //   case 404:
      //     message = '无法找到'
      //     break
      //   case 500:
      //     message = '服务端异常，请稍后重试'
      //     break
      //   default:
      //     message = '未知错误请联系管理人员'
      //     break
      // }
      // this.store.dispatch('message', {
      //   msg: message
      // })
    }
  }

  checkStatus (resp) {
    let status = resp.status
    if (status >= 200 && status < 300) {
      return resp.json()
    } else {
      var error = new Error(`status: ${resp.status}`)
      error.response = resp
      throw error
    }
  }

  doFetch (url, options) {
    var self = this
    this.preFetch(url, options)
    this.bugWatcher.set(url, options)
    return fetch(url, options)
      .then(this.checkStatus)
      .then(json => {
        let { code, data, dataList } = json
        let hasBox = document.querySelector('.errorbox')
        let isSession = url.indexOf('api/users/session') > -1
        if (code === 0) {
          if (isSession && !data && !dataList) {
            // 弹出层
            if (!hasBox) {
              MessageBox({
                customClass: 'errorbox',
                title: '错误提示',
                message: '当前用户未登录',
                type: 'error',
                confirmButtonText: '去登录',
                closeOnClickModal: false,
                closeOnPressEscape: false,
                callback (action, instance) {
                  if (action === 'confirm') {
                    window.location.href = '/sso'
                  }
                }
              })
            }
          }
        } else if (code === -102) {
          if (!hasBox) {
            // 去登陆
            MessageBox({
              customClass: 'errorbox',
              title: '错误提示',
              message: '当前用户未登录',
              type: 'error',
              confirmButtonText: '去登录',
              closeOnClickModal: false,
              closeOnPressEscape: false,
              callback (action, instance) {
                if (action === 'confirm') {
                  window.location.href = '/sso'
                }
              }
            })
          }
        }
        return json
      }).catch(error => {
        self.fail(error)
      })
  }

  // get('xxxx', {id: 1})
  // get('xxxx', 'a=1&b=2')
  get (url, config) {
    if (config) {
      url += _.isPlainObject(config) ? _.toParam(config) : '?' + config
    }
    return this.doFetch(url, Object.assign({
      method: 'GET'
    }, IFetch.options))
  }

  post (url, config = {}) {
    return this.doFetch(url, Object.assign({
      method: 'POST',
      body: JSON.stringify(config)
    }, IFetch.options))
  }

  put (url, config) {
    return this.doFetch(url, Object.assign({
      method: 'PUT',
      body: JSON.stringify(config)
    }, IFetch.options))
  }

  delete (url, config) {
    if (config) {
      url += _.isPlainObject(config) ? _.toParam(config) : '?' + config
    }
    return this.doFetch(url, Object.assign({
      method: 'DELETE'
    }, IFetch.options))
  }

  all (urls) {
    Promise.all(urls.map(url =>
      fetch(url).then(resp => resp.text())
    )).then(texts => {
      console.log(texts)
    })
  }

  when () {}
}

export default IFetch
