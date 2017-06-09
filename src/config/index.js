import url from './url'

export const typemoduleLabel = {
  'shareUnitValue': '单位净值',
  'shareUnitAccumulateValue': '累计净值',
  'rate': '收益',
  'standardDeviation': '波动率',
  'sharpeRate': '夏普比',
  'maxWithdraw': '最大回撤',
  'infoRate': '卡玛比'
}

// 特殊筛选条件
export const typeModule = [
  {
    label: '单位净值',
    value: 'shareUnitValue'
  },
  {
    label: '累计净值',
    value: 'shareUnitAccumulateValue'
  },
  {
    label: '收益',
    value: 'rate'
  },
  {
    label: '波动率',
    value: 'standardDeviation'
  },
  {
    label: '夏普比',
    value: 'sharpeRate'
  },
  {
    label: '最大回撤',
    value: 'maxWithdraw'
  },
  {
    label: '卡玛比',
    value: 'infoRate'
  }
]

// 私募产品--筛选条件
export const filterModule = [
  {
    type: 'investStrategyTypes',
    label: '投资类型',
    count: 0,
    items: [
      {
        label: '股票策略',
        value: 1
      },
      {
        label: '宏观策略',
        value: 2
      },
      {
        label: '债券策略',
        value: 3
      },
      {
        label: '组合策略',
        value: 4
      },
      {
        label: '复合策略',
        value: 5
      },
      {
        label: '管理期货',
        value: 6
      },
      {
        label: '相对价值',
        value: 7
      },
      {
        label: '事件驱动',
        value: 8
      },
      {
        label: '货币型',
        value: 9
      },
      {
        label: '套利型',
        value: 11
      },
      {
        label: '多空仓型',
        value: 12
      },
      {
        label: '定增新三板',
        value: 13
      },
      {
        label: 'FoF',
        value: 14
      },
      {
        label: '其他',
        value: 0
      }
    ]
  },
  {
    type: 'types',
    label: '基金类型',
    count: 0,
    items: [
      {
        label: '股权投资基金',
        value: 1
      },
      {
        label: '证券投资基金',
        value: 2
      },
      {
        label: '基金子公司',
        value: 3
      },
      {
        label: '基金专户',
        value: 4
      },
      {
        label: 'QFII',
        value: 5
      },
      {
        label: '期货资管',
        value: 6
      },
      {
        label: '信托计划',
        value: 7
      },
      {
        label: '券商资管',
        value: 8
      },
      {
        label: '保险资管',
        value: 9
      },
      {
        label: '创业投资基金',
        value: 10
      },
      {
        label: '银行理财产品',
        value: 11
      },
      {
        label: '其他投资基金',
        value: 0
      }
    ]
  },
  {
    type: 'dataQuality',
    label: '数据质量',
    count: 0,
    items: [
      {
        // authenticated
        label: '认证',
        value: 1
      },
      {
        // complete
        label: '完整',
        value: 2
      },
      {
        // intime
        label: '及时',
        value: 3
      }
    ]
  },
  {
    type: 'unRegistInAmac',
    label: '备案状态',
    count: 0,
    single: true,
    items: [
      {
        label: '已备案',
        value: 0
      },
      {
        label: '未备案',
        value: 1
      }
    ]
  },
  {
    type: 'managerTypes',
    label: '管理状态',
    count: 0,
    items: [
      {
        label: '自主管理',
        value: 1
      },
      {
        label: '顾问管理',
        value: 2
      },
      {
        label: '受托管理',
        value: 3
      },
      {
        label: '主动管理',
        value: 4
      },
      {
        label: '被动管理',
        value: 5
      },
      {
        label: '未知',
        value: 0
      }
    ]
  },
  {
    type: 'workingState',
    label: '运作状态',
    count: 0,
    single: true,
    items: [
      {
        label: '正在运行',
        value: 1
      },
      {
        label: '已清盘',
        value: 2
      },
      {
        label: '提前清算',
        value: 3
      },
      {
        label: '未知',
        value: 0
      }
    ]
  },
  {
    type: 'contactStartDate',
    label: '成立时间',
    count: 0,
    single: true,
    items: [
      {
        label: '1年以内',
        value: '0-1'
      },
      {
        label: '2年以内',
        value: '0-2'
      },
      {
        label: '3年以内',
        value: '0-3'
      },
      {
        label: '大于5年',
        value: '5'
      }
    ]
  },
  {
    type: 'lastNetValueDate',
    label: '披露时间',
    count: 0,
    single: true,
    items: [
      {
        label: '1天',
        value: '0-1'
      },
      {
        label: '7天',
        value: '0-7'
      },
      {
        label: '14天',
        value: '0-14'
      },
      {
        label: '31天',
        value: '0-31'
      },
      {
        label: '90天',
        value: '0-90'
      },
      {
        label: '更久以前',
        value: '90'
      }
    ]
  }
]
// 收益周期
export const incomeCycle = {
  title: '收益周期',
  selected: 'whole',
  items: [
    {
      label: '当年',
      value: '0'
    },
    {
      label: '最近1个月',
      value: '1'
    },
    {
      label: '最近3个月',
      value: '3'
    },
    {
      label: '最近6个月',
      value: '6'
    },
    {
      label: '最近1年',
      value: '12'
    },
    {
      label: '最近2年',
      value: '24'
    },
    {
      label: '最近3年',
      value: '36'
    },
    {
      label: '成立以来',
      value: 'whole'
    }
  ]
}

// 风险周期
export const riskCycle = {
  title: '风险周期',
  selected: 'whole',
  items: [
    {
      label: '当年',
      value: '0'
    },
    {
      label: '最近6个月',
      value: '6'
    },
    {
      label: '最近1年',
      value: '12'
    },
    {
      label: '最近2年',
      value: '24'
    },
    {
      label: '最近3年',
      value: '36'
    },
    {
      label: '成立以来',
      value: 'whole'
    }
  ]
}

// 基金
export const FundLabel = [
  '股权投资基金',
  '证券投资基金',
  '基金子公司',
  '基金专户',
  'QFII',
  '期货资管',
  '信托计划',
  '券商资管',
  '保险资管',
  '创业投资基金',
  '银行理财产品',
  '其他投资基金'
]

export const FundValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0]

// 投资
export const InvestLabel = [
  '股票策略',
  '宏观策略',
  '债券策略',
  '组合策略',
  '复合策略',
  '管理期货',
  '相对价值',
  '事件驱动',
  '货币型',
  '套利型',
  '多空仓型',
  '定增新三板',
  'FoF',
  '其他'
]

export const InvestValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 0]

// 是否清盘
export const WorkingStateLabel = [
  '正在运行',
  '已清盘',
  '提前清算',
  '未知'
]

export const WorkingStateValue = [1, 2, 3, 0]

//  管理状态
export const ManagerTypeLabel = [
  '自主管理',
  '顾问管理',
  '受托管理',
  '主动管理',
  '被动管理',
  '未知'
]

export const ManagerTypeValue = [1, 2, 3, 4, 5, 0]

export const TimeConfig = [
  {key: '1', value: '最近1个月'},
  {key: '2', value: '最近2个月'},
  {key: '3', value: '最近3个月'},
  {key: '6', value: '最近6个月'},
  {key: '12', value: '最近1年'},
  {key: '24', value: '最近2年'},
  {key: '36', value: '最近3年'},
  {key: 'whole', value: '成立以来'}
]

export const SourceList = {
  '0': '其他',
  '1': '爬虫抓取',
  '2': '网站',
  '3': '系统',
  '4': '邮箱',
  '5': '管理人发送',
  '6': '管理人自动转发',
  '7': '外包（托管）发送',
  '8': '外包（托管）系统下载'
}

export const TimeLabel = {
  '0': '当年',
  '1': '最近1个月',
  '3': '最近3个月',
  '6': '最近6个月',
  '12': '最近1年',
  '24': '最近2年',
  '36': '最近3年',
  'whole': '成立以来'
}

export const RiskLabel = {
  '0': '当年',
  '6': '最近6个月',
  '12': '最近1年',
  '24': '最近2年',
  '36': '最近三年',
  'whole': '成立以来'
}

export const TimeValue = ['0', '1', '3', '6', '12', '24', '36', 'whole']

export const RiskValue = ['0', '6', '12', '24', '36', 'whole']

export const OrgManagerTypeLabel = ['其他', '证券投资基金', '股权投资基金', '创业投资基金', '其他投资基金', '股权、创业投资基金']

export const AmacMemberLabel = ['非会员', '观察会员', '普通会员']

export const TzKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 0]

export const Tz = ['股票策略', '宏观策略', '债券策略', '组合策略', '复合策略', '管理期货', '相对价值', '事件驱动', '货币型', '套利型', '多空仓型', '定增新三板', 'FoF', '其他']

// 私募机构--筛选条件
export const orgFilterModule = [
  {
    type: 'managerType',
    label: '管理类别',
    count: 0,
    items: [
      {
        label: '证券投资基金',
        value: 1
      },
      {
        label: '股权投资基金',
        value: 2
      },
      {
        label: '创业投资基金',
        value: 3
      },
      {
        label: '其他投资基金',
        value: 4
      },
      {
        label: '股权、创业投资基金',
        value: 5
      },
      {
        label: '其他',
        value: 0
      }
    ]
  },
  {
    type: 'amacMember',
    label: '协会会员',
    count: 0,
    items: [
      {
        label: '观察会员',
        value: 1
      },
      {
        label: '普通会员',
        value: 2
      },
      {
        label: '非会员',
        value: 0
      }
    ]
  },
  {
    type: 'signed',
    label: '签约情况',
    count: 0,
    single: true,
    items: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 0
      }
    ]
  },
  {
    type: 'integrity',
    label: '诚信情况',
    count: 0,
    single: true,
    items: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 0
      }
    ]
  },
  {
    type: 'hasSpecTip',
    label: '特别提示',
    count: 0,
    single: true,
    items: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 0
      }
    ]
  }
]

export default {
  url
}
