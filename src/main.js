import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import {
  Pagination, Dialog, Dropdown, DropdownMenu, DropdownItem, Menu, Submenu,
  MenuItem, MenuItemGroup, Input, InputNumber, Checkbox, Select, Option, Button,
  DatePicker, Tooltip, Breadcrumb, BreadcrumbItem, Form, FormItem, Tabs, TabPane,
  Row, Col, Collapse, CollapseItem, Loading, MessageBox, Notification, Message,
  RadioGroup, Radio, Carousel, CarouselItem, Table, TableColumn
} from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import '@/assets/css/font-awesome.css'
import '@/assets/css/main.less'
// import 'simple-line-icons/less/simple-line-icons.less'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Loading)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// Vue.config.lang = 'zh-CN'
import App from './App'
import router from './router'
import store from './store'
import Http from './plugin/fetch'
import Auth from './plugin/auth'
// import components from './components'
sync(store, router)
Vue.use(Http, store)
Vue.use(Auth, store)

import filter from './filter'
Object.keys(filter).forEach((name) => {
  Vue.filter(name, filter[name])
})

Vue.config.productionTip = false

// Vue.mixin({
//   created () {
//     console.log(this.name)
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
