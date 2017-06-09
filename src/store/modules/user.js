import _ from '@/libs/util'
export default {
  state: {
    id: '',
    nickname: ''
  },
  mutations: {
    signin (state, payload) {
      _.cloneDeep(state, payload)
    }
  },
  actions: {}
}
