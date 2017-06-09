export default {
  state: {
    product: {
      /*
       * @type String:类型 -> 'shareUnitValue' (单位净值) | 'shareUnitAccumulateValue' (累计净值)
       * | 'rate' (收益) | 'standardDeviation' (标准差or波动率) | 'sharpeRate'(夏普比)
       * | 'maxWithdraw'(最大回撤) | 'infoRate' (信息比率)
       * @periodName String:周期 -> '0'(当年) | '1'(最近1个月) | '3'('最近3个月') | '6'(最近6个月)
       * | '12' (最近1年) | '24'(最近2年) | '36'(最近3年) | 'whole'(成立以来)
       * @from Number:最小值
       * @to Number:最大值
      */
      filterCache: [],
      /*
       * @type String
       * | 'investStrategyTypes'(投资类型) | 'types'(基金类型)
       * | 'dataQuality'(数据质量) -> 1(认证: authenticated);2(完整: complete);3(及时: intime)
       * | 'unRegistInAmac'(备案状态__单选) -> 0(已备案: false);1(未备案: true)
       * | 'managerTypes'(管理状态) | 'workingState'(运作状态__单选)
       * | 'contactStartDate'(成立时间__单选) -> {from, to}结构，数据以"-"分割
       * | 'lastNetValueDate'(披露时间__单选) -> {from, to}结构，数据以"-"分割
      */
      conditionCache: {},
      sort: {}
    },
    org: {
      /*
       * @type String
       * | 'fundScale'(管理规模) -> {from, to}结构，数据以"-"分割
       * | 'fundsCount'(产品数量) -> {from, to}结构，数据以"-"分割
       * | 'establishDate'(成立日期) -> {from, to}结构，数据以"-"分割
       * | 'registeredCapital'(注册资本) -> {from, to}结构，数据以"-"分割
       * | 'managerType'(管理类别)
       * | 'amacMember'(协会会员)
       * | 'signed'(签约情况_单选) -> 0(未签约: false);1(已签约: true)
       * | 'integrity'(诚信情况__单选) -> 0(否: false);1(是: true)
       * | 'hasSpecTip'(特别提示__单选) -> 0(否: false);1(是: true)
      */
      filterCache: {},
      sort: {}
    }
  },
  getter: {},
  mutations: {
    updateProductFilter (state, payload) {
      let {type, data} = payload
      if (type === 'condition') {
        state.product.conditionCache = data
      } else if (type === 'filter') {
        state.product.filterCache = data
      }
    },
    findFilter (state, payload) {}
  },
  actions: {}
}
