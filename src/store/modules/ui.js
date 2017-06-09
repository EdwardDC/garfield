export default {
  state: {
    isLoading: false,
    signin: false,
    isOpening: true,
    direction: 'forward',
    productpPool: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateSigninStatus (state, payload) {
      state.signin = payload.signin
    },
    updatePosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateOpeningStatus (state, payload) {
      state.isOpening = payload.isOpening
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    updateProductPool (state, payload) {
      state.productpPool = payload.productpPool
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updatePosition', top: top})
    }
  }
}
