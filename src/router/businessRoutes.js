// 宅建业法路由
const businessRoutes = [
  {
    path: '/notes/business/business-meaning',
    name: 'BusinessMeaning',
    component: () => import('@/views/notes/business/BusinessMeaning.vue'),
    meta: {
      title: '宅建业含义 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '宅建业含义']
    }
  },
  {
    path: '/notes/business/office-requirements',
    name: 'OfficeRequirements',
    component: () => import('@/views/notes/business/OfficeRequirements.vue'),
    meta: {
      title: '事务所规定 - 宅建业法',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '事务所规定']
    }
  },
  {
    path: '/notes/business/agent',
    name: 'Agent',
    component: () => import('@/views/notes/business/Agent.vue'),
    meta: {
      title: '宅地建物取引士 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '宅地建物取引士']
    }
  },
  {
    path: '/notes/business/deposit',
    name: 'BusinessDeposit',
    component: () => import('@/views/notes/business/Deposit.vue'),
    meta: {
      title: '营业保证金 - 宅建业法',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '营业保证金']
    }
  },
  {
    path: '/notes/business/compensationdeposit',
    name: 'CompensationDeposit',
    component: () => import('@/views/notes/business/CompensationDeposit.vue'),
    meta: {
      title: '弁济业务保证金 - 宅建业法',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '弁济业务保证金']
    }
  },
  {
    path: '/notes/business/mediation',
    name: 'Mediation',
    component: () => import('@/views/notes/business/Mediation.vue'),
    meta: {
      title: '媒介与代理 - 宅建业法',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '媒介与代理']
    }
  },
  {
    path: '/notes/business/advertising-regulation',
    name: 'AdvertisingRegulation',
    component: () => import('@/views/notes/business/AdvertisingRegulation.vue'),
    meta: {
      title: '广告规制 - 宅建业法',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '广告规制']
    }
  },
  {
    path: '/notes/business/license-requirements',
    name: 'LicenseRequirements',
    component: () => import('@/views/notes/business/LicenseRequirements.vue'),
    meta: {
      title: '免许详解 - 宅建业法',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '免许制度']
    }
  },
  {
    path: '/notes/business/important-matters',
    name: 'ImportantMatters',
    component: () => import('@/views/notes/business/ImportantMatters.vue'),
    meta: {
      title: '重要事项说明 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '重要事项说明']
    }
  },
  {
    path: '/notes/business/37-document',
    name: '37Document',
    component: () => import('@/views/notes/business/37Document.vue'),
    meta: {
      title: '37条书面 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '37条书面']
    }
  },
  {
    path: '/notes/business/Seller-Restrictions',
    name: 'SellerRestrictions',
    component: () => import('@/views/notes/business/SellerRestrictions.vue'),
    meta: {
      title: '自己卖主的制限 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '自己卖主的制限']
    }
  },
  {
    path: '/notes/business/Housing-DefectWarranty',
    name: 'HousingDefectWarranty',
    component: () => import('@/views/notes/business/HousingDefectWarranty.vue'),
    meta: {
      title: '住宅瑕疵担保履行法 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '住宅瑕疵担保履行法']
    }
  },
  {
    path: '/notes/business/Compensation-Limit',
    name: 'CompensationLimit',
    component: () => import('@/views/notes/business/CompensationLimit.vue'),
    meta: {
      title: '报酬额的制限 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '报酬额的制限']
    }
  },
  {
    path: '/notes/business/Supervision-Penalty',
    name: 'SupervisionPenalty',
    component: () => import('@/views/notes/business/SupervisionPenalty.vue'),
    meta: {
      title: '监督与罚则 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '监督与罚则']
    }
  },
  {
    path: '/notes/business/Other-BusinessRegulations',
    name: 'OtherBusinessRegulations',
    component: () => import('@/views/notes/business/OtherBusinessRegulations.vue'),
    meta: {
      title: '其他业务上的规制 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '其他业务上的规制']
    }
  },
  {
    path: '/notes/business/Outside-Office',
    name: 'OutsideOffice',
    component: () => import('@/views/notes/business/OutsideOffice.vue'),
    meta: {
      title: '事务所以外场所的规制 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '事务所以外场所的规制']
    }
  }
]

export default businessRoutes
