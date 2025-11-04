// 权利关系路由
const rightsRoutes = [
  {
    path: '/notes/rights/declaration-of-intent',
    name: 'DeclarationOfIntent',
    component: () => import('@/views/notes/rights/DeclarationOfIntent.vue'),
    meta: {
      title: '意思表示 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '意思表示']
    }
  },
  {
    path: '/notes/rights/limited-capacity-persons',
    name: 'LimitedCapacityPersons',
    component: () => import('@/views/notes/rights/LimitedCapacityPersons.vue'),
    meta: {
      title: '制限行为能力者 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '制限行为能力者']
    }
  },
  {
    path: '/notes/rights/prescription',
    name: 'Prescription',
    component: () => import('@/views/notes/rights/Prescription.vue'),
    meta: {
      title: '时效 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '时效']
    }
  },
  {
    path: '/notes/rights/agency',
    name: 'Agency',
    component: () => import('@/views/notes/rights/Agency.vue'),
    meta: {
      title: '代理 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '代理']
    }
  },
  {
    path: '/notes/rights/debt-performance',
    name: 'DebtPerformance',
    component: () => import('@/views/notes/rights/DebtPerformance.vue'),
    meta: {
      title: '债务不履行与弁济 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '债务不履行与弁济']
    }
  },
  {
    path: '/notes/rights/contract-inappropriateness',
    name: 'ContractInappropriateness',
    component: () => import('@/views/notes/rights/ContractInappropriateness.vue'),
    meta: {
      title: '契约不适合责任 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '契约不适合责任']
    }
  },
  {
    path: '/notes/rights/succession',
    name: 'Succession',
    component: () => import('@/views/notes/rights/Succession.vue'),
    meta: {
      title: '相続 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '相続']
    }
  },
  {
    path: '/notes/rights/property-change',
    name: 'PropertyChange',
    component: () => import('@/views/notes/rights/PropertyChange.vue'),
    meta: {
      title: '物权变动 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '物权变动']
    }
  },
  {
    path: '/notes/rights/real-estate-registration',
    name: 'RealEstateRegistration',
    component: () => import('@/views/notes/rights/RealEstateRegistration.vue'),
    meta: {
      title: '不动产登记法 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '不动产登记法']
    }
  },
  {
    path: '/notes/rights/mortgage',
    name: 'Mortgage',
    component: () => import('@/views/notes/rights/Mortgage.vue'),
    meta: {
      title: '抵当权 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '抵当权']
    }
  },
  {
    path: '/notes/rights/guarantee-and-joint-debt',
    name: 'GuaranteeAndJointDebt',
    component: () => import('@/views/notes/rights/GuaranteeAndJointDebt.vue'),
    meta: {
      title: '保证与连带债务 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '保证与连带债务']
    }
  },
  {
    path: '/notes/rights/co-ownership',
    name: 'CoOwnership',
    component: () => import('@/views/notes/rights/CoOwnership.vue'),
    meta: {
      title: '共有 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '共有']
    }
  },
  {
    path: '/notes/rights/condominium-ownership',
    name: 'CondominiumOwnership',
    component: () => import('@/views/notes/rights/CondominiumOwnership.vue'),
    meta: {
      title: '建物区分所有法 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '建物区分所有法']
    }
  },
  {
    path: '/notes/rights/lease',
    name: 'Lease',
    component: () => import('@/views/notes/rights/Lease.vue'),
    meta: {
      title: '赁贷借 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '赁贷借']
    }
  },
  {
    path: '/notes/rights/land-and-house-rental',
    name: 'LandAndHouseRental',
    component: () => import('@/views/notes/rights/LandAndHouseRental.vue'),
    meta: {
      title: '借地借家法（借家） - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '借地借家法（借家）']
    }
  },
  {
    path: '/notes/rights/land-lease',
    name: 'LandLease',
    component: () => import('@/views/notes/rights/LandLease.vue'),
    meta: {
      title: '借地借家法（借地） - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '借地借家法（借地）']
    }
  },
  {
    path: '/notes/rights/tort',
    name: 'Tort',
    component: () => import('@/views/notes/rights/Tort.vue'),
    meta: {
      title: '不法行为 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '不法行为']
    }
  },
  {
    path: '/notes/rights/contract-work',
    name: 'Contractwork',
    component: () => import('@/views/notes/rights/ContractWork.vue'),
    meta: {
      title: '请负 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '请负']
    }
  },
  {
    path: '/notes/rights/assignment-of-claim',
    name: 'Assignmentofclaim',
    component: () => import('@/views/notes/rights/AssignmentOfClaim.vue'),
    meta: {
      title: '债权让渡 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '债权让渡']
    }
  },
  {
    path: '/notes/rights/adjacent-relations',
    name: 'AdjacentRelations',
    component: () => import('@/views/notes/rights/AdjacentRelations.vue'),
    meta: {
      title: '相邻关系 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '相邻关系']
    }
  },
  {
    path: '/notes/rights/risk-burden',
    name: 'RiskBurden',
    component: () => import('@/views/notes/rights/RiskBurden.vue'),
    meta: {
      title: '危险负担 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '危险负担']
    }
  },
  {
    path: '/notes/rights/payment-and-setoff',
    name: 'PaymentAndSetoff',
    component: () => import('@/views/notes/rights/PaymentAndSetoff.vue'),
    meta: {
      title: '弁济和相杀 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '弁济和相杀']
    }
  },
  {
    path: '/notes/rights/other-important-matters',
    name: 'OtherImportantMatters',
    component: () => import('@/views/notes/rights/OtherImportantMatters.vue'),
    meta: {
      title: '其他重要事项 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '其他重要事项']
    }
  }
]

export default rightsRoutes
