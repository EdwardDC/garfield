export default {
  state: {
    poolList: [],
    productId: []
  },
  mutations: {
    loadPool (state, payload) {
      state.poolList = payload
    },
    addProduct (state, payload) {
      state.productId = payload
    }
  },
  actions: {}
}
