// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import Notes from '@/views/Notes.vue'
import Video from '@/views/Video.vue'
import Practice from '@/views/Practice.vue'
import Exam from '@/views/Exam.vue' 
import Dashboard from '@/views/Dashboard.vue'
import Community from '@/views/Community.vue'
import UserManagement from '@/views/UserManagement.vue'

// 获取当前阶段配置
const currentPhase = import.meta.env.VITE_APP_PHASE || 'test'
const appTitle = import.meta.env.VITE_APP_TITLE || '宅学苑'

// 功能配置 - 根据环境变量控制显示
const featureConfig = {
  // 测试阶段可见的模块
  test: {
    // 核心功能模块
    home: true,
    notes: true,
    video: true,        // 改为 true - 启用视频学习
    practice: true,     // 改为 true - 启用强化练习
    exam: true,
    dashboard: true,
    community: true,    // 改为 true - 启用学习社群
    userManagement: false,
    
    // 知识领域控制
    businessLaw: {
      enabled: true,
      visibleTopics: [
        'business-meaning',      // 宅建业含义
        'important-matters',     // 重要事项说明
        'mediation',             // 媒介与代理
        'license-requirements',  // 免许制度
        'agent'                  // 宅地建物取引士
      ]
    },
    rightsRelations: {
      enabled: true,
      visibleTopics: [
        'agency',                // 代理
        'mortgage',              // 抵当权
        'property-change',       // 物权变动
        'succession',            // 相続
        'declaration-of-intent'  // 意思表示
      ]
    },
    legalRestrictions: false,
    taxOther: false,
    fiveQuestionExempt: false
  },
  // 生产环境 - 全部功能开放
  production: {
    home: true,
    notes: true,
    video: true,
    practice: true,
    exam: true,
    dashboard: true,
    community: true,
    userManagement: true,
    businessLaw: { enabled: true, visibleTopics: 'all' },
    rightsRelations: { enabled: true, visibleTopics: 'all' },
    legalRestrictions: true,
    taxOther: true,
    fiveQuestionExempt: true
  },
  // 开发环境 - 全部功能开放
  development: {
    home: true,
    notes: true,
    video: true,
    practice: true,
    exam: true,
    dashboard: true,
    community: true,
    userManagement: true,
    businessLaw: { enabled: true, visibleTopics: 'all' },
    rightsRelations: { enabled: true, visibleTopics: 'all' },
    legalRestrictions: true,
    taxOther: true,
    fiveQuestionExempt: true
  }
}

// 获取当前环境的功能配置
const features = featureConfig[currentPhase] || featureConfig.test

// 辅助函数：检查知识点是否可见
const isTopicVisible = (category, topicName) => {
  const categoryConfig = features[category]
  if (!categoryConfig?.enabled) return false
  
  // 如果是生产环境或开发环境，显示所有知识点
  if (categoryConfig.visibleTopics === 'all') return true
  
  // 测试环境只显示指定的知识点
  return categoryConfig.visibleTopics?.includes(topicName) || false
}

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: `首页 - ${appTitle}`,
      requiresAuth: false,
      testPhase: features.home,
      public: true
    }
  },
  {
    path: '/video',
    name: 'Video',
    component: Video,
    meta: {
      title: `视频学习 - ${appTitle}`,
      requiresAuth: false,
      testPhase: features.video,
      comingSoon: !features.video
    }
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice,
    meta: {
      title: `强化练习 - ${appTitle}`,
      requiresAuth: false,
      testPhase: features.practice,
      comingSoon: !features.practice
    }
  },
  {
    path: '/exam',
    name: 'Exam',
    component: Exam,
    meta: {
      title: `真题模拟 - ${appTitle}`,
      requiresAuth: false,
      testPhase: features.exam,
      public: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: `学习仪表盘 - ${appTitle}`,
      requiresAuth: false,
      testPhase: features.dashboard,
      public: true
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
    meta: {
      title: `学习社群 - ${appTitle}`,
      requiresAuth: false,
      testPhase: features.community,
      comingSoon: !features.community
    }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: {
      title: `中文笔记 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记'],
      testPhase: features.notes,
      public: true
    }
  },
  
  // ========== 宅建业法路由 ==========
  {
    path: '/notes/business/business-meaning',
    name: 'BusinessMeaning',
    component: () => import('@/views/notes/business/BusinessMeaning.vue'),
    meta: {
      title: `宅建业含义 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '宅建业含义'],
      testPhase: isTopicVisible('businessLaw', 'business-meaning'),
      category: 'business',
      topic: 'business-meaning'
    }
  },
  {
    path: '/notes/business/office-requirements',
    name: 'OfficeRequirements',
    component: () => import('@/views/notes/business/OfficeRequirements.vue'),
    meta: {
      title: `事务所规定 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '事务所规定'],
      testPhase: isTopicVisible('businessLaw', 'office-requirements'),
      category: 'business',
      topic: 'office-requirements'
    }
  },
  {
    path: '/notes/business/agent',
    name: 'Agent',
    component: () => import('@/views/notes/business/Agent.vue'),
    meta: {
      title: `宅地建物取引士 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '宅地建物取引士'],
      testPhase: isTopicVisible('businessLaw', 'agent'),
      category: 'business',
      topic: 'agent'
    }
  },
  {
    path: '/notes/business/deposit',
    name: 'BusinessDeposit',
    component: () => import('@/views/notes/business/Deposit.vue'),
    meta: {
      title: `营业保证金 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '营业保证金'],
      testPhase: isTopicVisible('businessLaw', 'deposit'),
      category: 'business',
      topic: 'deposit'
    }
  },
  {
    path: '/notes/business/compensationdeposit',
    name: 'CompensationDeposit',
    component: () => import('@/views/notes/business/CompensationDeposit.vue'),
    meta: {
      title: `弁济业务保证金 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '弁济业务保证金'],
      testPhase: isTopicVisible('businessLaw', 'compensationdeposit'),
      category: 'business',
      topic: 'compensationdeposit'
    }
  },
  {
    path: '/notes/business/mediation',
    name: 'Mediation',
    component: () => import('@/views/notes/business/Mediation.vue'),
    meta: {
      title: `媒介与代理 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '媒介与代理'],
      testPhase: isTopicVisible('businessLaw', 'mediation'),
      category: 'business',
      topic: 'mediation'
    }
  },
  {
    path: '/notes/business/advertising-regulation',
    name: 'AdvertisingRegulation',
    component: () => import('@/views/notes/business/AdvertisingRegulation.vue'),
    meta: {
      title: `广告规制 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '广告规制'],
      testPhase: isTopicVisible('businessLaw', 'advertising-regulation'),
      category: 'business',
      topic: 'advertising-regulation'
    }
  },
  {
    path: '/notes/business/license-requirements',
    name: 'LicenseRequirements',
    component: () => import('@/views/notes/business/LicenseRequirements.vue'),
    meta: {
      title: `免许详解 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '免许制度'],
      testPhase: isTopicVisible('businessLaw', 'license-requirements'),
      category: 'business',
      topic: 'license-requirements'
    }
  },
  {
    path: '/notes/business/important-matters',
    name: 'ImportantMatters',
    component: () => import('@/views/notes/business/ImportantMatters.vue'),
    meta: {
      title: `重要事项说明 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '重要事项说明'],
      testPhase: isTopicVisible('businessLaw', 'important-matters'),
      category: 'business',
      topic: 'important-matters'
    }
  },
  {
    path: '/notes/business/37-document',
    name: '37Document',
    component: () => import('@/views/notes/business/37Document.vue'),
    meta: {
      title: `37条书面 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '37条书面'],
      testPhase: isTopicVisible('businessLaw', '37-document'),
      category: 'business',
      topic: '37-document'
    }
  },
  {
    path: '/notes/business/Seller-Restrictions',
    name: 'SellerRestrictions',
    component: () => import('@/views/notes/business/SellerRestrictions.vue'),
    meta: {
      title: `自己卖主的制限 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '自己卖主的制限'],
      testPhase: isTopicVisible('businessLaw', 'Seller-Restrictions'),
      category: 'business',
      topic: 'Seller-Restrictions'
    }
  },
  {
    path: '/notes/business/Housing-DefectWarranty',
    name: 'HousingDefectWarranty',
    component: () => import('@/views/notes/business/HousingDefectWarranty.vue'),
    meta: {
      title: `住宅瑕疵担保履行法 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '住宅瑕疵担保履行法'],
      testPhase: isTopicVisible('businessLaw', 'Housing-DefectWarranty'),
      category: 'business',
      topic: 'Housing-DefectWarranty'
    }
  },
  {
    path: '/notes/business/Compensation-Limit',
    name: 'CompensationLimit',
    component: () => import('@/views/notes/business/CompensationLimit.vue'),
    meta: {
      title: `报酬额的制限 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '报酬额的制限'],
      testPhase: isTopicVisible('businessLaw', 'Compensation-Limit'),
      category: 'business',
      topic: 'Compensation-Limit'
    }
  },
  {
    path: '/notes/business/Supervision-Penalty',
    name: 'SupervisionPenalty',
    component: () => import('@/views/notes/business/SupervisionPenalty.vue'),
    meta: {
      title: `监督与罚则 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '监督与罚则'],
      testPhase: isTopicVisible('businessLaw', 'Supervision-Penalty'),
      category: 'business',
      topic: 'Supervision-Penalty'
    }
  },
  {
    path: '/notes/business/Other-BusinessRegulations',
    name: 'OtherBusinessRegulations',
    component: () => import('@/views/notes/business/OtherBusinessRegulations.vue'),
    meta: {
      title: `其他业务上的规制 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '其他业务上的规制'],
      testPhase: isTopicVisible('businessLaw', 'Other-BusinessRegulations'),
      category: 'business',
      topic: 'Other-BusinessRegulations'
    }
  },
  {
    path: '/notes/business/Outside-Office',
    name: 'OutsideOffice',
    component: () => import('@/views/notes/business/OutsideOffice.vue'),
    meta: {
      title: `事务所以外场所的规制 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '宅建业法', '事务所以外场所的规制'],
      testPhase: isTopicVisible('businessLaw', 'Outside-Office'),
      category: 'business',
      topic: 'Outside-Office'
    }
  },

  // ========== 权利关系路由 ==========
  {
    path: '/notes/rights/declaration-of-intent',
    name: 'DeclarationOfIntent',
    component: () => import('@/views/notes/rights/DeclarationOfIntent.vue'),
    meta: {
      title: `意思表示 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '意思表示'],
      testPhase: isTopicVisible('rightsRelations', 'declaration-of-intent'),
      category: 'rights',
      topic: 'declaration-of-intent'
    }
  },
  {
    path: '/notes/rights/limited-capacity-persons',
    name: 'LimitedCapacityPersons',
    component: () => import('@/views/notes/rights/LimitedCapacityPersons.vue'),
    meta: {
      title: `制限行为能力者 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '制限行为能力者'],
      testPhase: isTopicVisible('rightsRelations', 'limited-capacity-persons'),
      category: 'rights',
      topic: 'limited-capacity-persons'
    }
  },
  {
    path: '/notes/rights/prescription',
    name: 'Prescription',
    component: () => import('@/views/notes/rights/Prescription.vue'),
    meta: {
      title: `时效 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '时效'],
      testPhase: isTopicVisible('rightsRelations', 'prescription'),
      category: 'rights',
      topic: 'prescription'
    }
  },
  {
    path: '/notes/rights/agency',
    name: 'Agency',
    component: () => import('@/views/notes/rights/Agency.vue'),
    meta: {
      title: `代理 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '代理'],
      testPhase: isTopicVisible('rightsRelations', 'agency'),
      category: 'rights',
      topic: 'agency'
    }
  },
  {
    path: '/notes/rights/debt-performance',
    name: 'DebtPerformance',
    component: () => import('@/views/notes/rights/DebtPerformance.vue'),
    meta: {
      title: `债务不履行与弁济 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '债务不履行与弁济'],
      testPhase: isTopicVisible('rightsRelations', 'debt-performance'),
      category: 'rights',
      topic: 'debt-performance'
    }
  },
  {
    path: '/notes/rights/contract-inappropriateness',
    name: 'ContractInappropriateness',
    component: () => import('@/views/notes/rights/ContractInappropriateness.vue'),
    meta: {
      title: `契约不适合责任 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '契约不适合责任'],
      testPhase: isTopicVisible('rightsRelations', 'contract-inappropriateness'),
      category: 'rights',
      topic: 'contract-inappropriateness'
    }
  },
  {
    path: '/notes/rights/succession',
    name: 'Succession',
    component: () => import('@/views/notes/rights/Succession.vue'),
    meta: {
      title: `相続 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '相続'],
      testPhase: isTopicVisible('rightsRelations', 'succession'),
      category: 'rights',
      topic: 'succession'
    }
  },
  {
    path: '/notes/rights/property-change',
    name: 'PropertyChange',
    component: () => import('@/views/notes/rights/PropertyChange.vue'),
    meta: {
      title: `物权变动 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '物权变动'],
      testPhase: isTopicVisible('rightsRelations', 'property-change'),
      category: 'rights',
      topic: 'property-change'
    }
  },
  {
    path: '/notes/rights/real-estate-registration',
    name: 'RealEstateRegistration',
    component: () => import('@/views/notes/rights/RealEstateRegistration.vue'),
    meta: {
      title: `不动产登记法 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '不动产登记法'],
      testPhase: isTopicVisible('rightsRelations', 'real-estate-registration'),
      category: 'rights',
      topic: 'real-estate-registration'
    }
  },
  {
    path: '/notes/rights/mortgage',
    name: 'Mortgage',
    component: () => import('@/views/notes/rights/Mortgage.vue'),
    meta: {
      title: `抵当权 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '抵当权'],
      testPhase: isTopicVisible('rightsRelations', 'mortgage'),
      category: 'rights',
      topic: 'mortgage'
    }
  },
  {
    path: '/notes/rights/guarantee-and-joint-debt',
    name: 'GuaranteeAndJointDebt',
    component: () => import('@/views/notes/rights/GuaranteeAndJointDebt.vue'),
    meta: {
      title: `保证与连带债务 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '保证与连带债务'],
      testPhase: isTopicVisible('rightsRelations', 'guarantee-and-joint-debt'),
      category: 'rights',
      topic: 'guarantee-and-joint-debt'
    }
  },
  {
    path: '/notes/rights/co-ownership',
    name: 'CoOwnership',
    component: () => import('@/views/notes/rights/CoOwnership.vue'),
    meta: {
      title: `共有 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '共有'],
      testPhase: isTopicVisible('rightsRelations', 'co-ownership'),
      category: 'rights',
      topic: 'co-ownership'
    }
  },
  {
    path: '/notes/rights/condominium-ownership',
    name: 'CondominiumOwnership',
    component: () => import('@/views/notes/rights/CondominiumOwnership.vue'),
    meta: {
      title: `建物区分所有法 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '建物区分所有法'],
      testPhase: isTopicVisible('rightsRelations', 'condominium-ownership'),
      category: 'rights',
      topic: 'condominium-ownership'
    }
  },
  {
    path: '/notes/rights/lease',
    name: 'Lease',
    component: () => import('@/views/notes/rights/Lease.vue'),
    meta: {
      title: `赁贷借 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '赁贷借'],
      testPhase: isTopicVisible('rightsRelations', 'lease'),
      category: 'rights',
      topic: 'lease'
    }
  },
  {
    path: '/notes/rights/land-and-house-rental',
    name: 'LandAndHouseRental',
    component: () => import('@/views/notes/rights/LandAndHouseRental.vue'),
    meta: {
      title: `借地借家法（借家） - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '借地借家法（借家）'],
      testPhase: isTopicVisible('rightsRelations', 'land-and-house-rental'),
      category: 'rights',
      topic: 'land-and-house-rental'
    }
  },
  {
    path: '/notes/rights/land-lease',
    name: 'LandLease',
    component: () => import('@/views/notes/rights/LandLease.vue'),
    meta: {
      title: `借地借家法（借地） - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '借地借家法（借地）'],
      testPhase: isTopicVisible('rightsRelations', 'land-lease'),
      category: 'rights',
      topic: 'land-lease'
    }
  },
  {
    path: '/notes/rights/tort',
    name: 'Tort',
    component: () => import('@/views/notes/rights/Tort.vue'),
    meta: {
      title: `不法行为 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '不法行为'],
      testPhase: isTopicVisible('rightsRelations', 'tort'),
      category: 'rights',
      topic: 'tort'
    }
  },
  {
    path: '/notes/rights/contract-work',
    name: 'Contractwork',
    component: () => import('@/views/notes/rights/ContractWork.vue'),
    meta: {
      title: `请负 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '请负'],
      testPhase: isTopicVisible('rightsRelations', 'contract-work'),
      category: 'rights',
      topic: 'contract-work'
    }
  },
  {
    path: '/notes/rights/assignment-of-claim',
    name: 'Assignmentofclaim',
    component: () => import('@/views/notes/rights/AssignmentOfClaim.vue'),
    meta: {
      title: `债权让渡 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '债权让渡'],
      testPhase: isTopicVisible('rightsRelations', 'assignment-of-claim'),
      category: 'rights',
      topic: 'assignment-of-claim'
    }
  },
  {
    path: '/notes/rights/adjacent-relations',
    name: 'AdjacentRelations',
    component: () => import('@/views/notes/rights/AdjacentRelations.vue'),
    meta: {
      title: `相邻关系 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '相邻关系'],
      testPhase: isTopicVisible('rightsRelations', 'adjacent-relations'),
      category: 'rights',
      topic: 'adjacent-relations'
    }
  },
  {
    path: '/notes/rights/risk-burden',
    name: 'RiskBurden',
    component: () => import('@/views/notes/rights/RiskBurden.vue'),
    meta: {
      title: `危险负担 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '危险负担'],
      testPhase: isTopicVisible('rightsRelations', 'risk-burden'),
      category: 'rights',
      topic: 'risk-burden'
    }
  },
  {
    path: '/notes/rights/payment-and-setoff',
    name: 'PaymentAndSetoff',
    component: () => import('@/views/notes/rights/PaymentAndSetoff.vue'),
    meta: {
      title: `弁济和相杀 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '弁济和相杀'],
      testPhase: isTopicVisible('rightsRelations', 'payment-and-setoff'),
      category: 'rights',
      topic: 'payment-and-setoff'
    }
  },
  {
    path: '/notes/rights/other-important-matters',
    name: 'OtherImportantMatters',
    component: () => import('@/views/notes/rights/OtherImportantMatters.vue'),
    meta: {
      title: `其他重要事项 - ${appTitle}`,
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '权利关系', '其他重要事项'],
      testPhase: isTopicVisible('rightsRelations', 'other-important-matters'),
      category: 'rights',
      topic: 'other-important-matters'
    }
  },
// ========== 题目管理路由 ==========
{
  path: '/questions',
  name: 'QuestionManagement',
  component: () => import('@/views/QuestionManagement.vue'),
  meta: {
    title: `题目管理 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/questions/list',
  name: 'QuestionList',
  component: () => import('@/views/questions/List.vue'),
  meta: {
    title: `题目列表 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/questions/add',
  name: 'AddQuestion',
  component: () => import('@/views/questions/Add.vue'),
  meta: {
    title: `添加题目 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/questions/categories',
  name: 'QuestionCategories',
  component: () => import('@/views/questions/Categories.vue'),
  meta: {
    title: `题目分类 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/questions/import',
  name: 'QuestionImport',
  component: () => import('@/views/questions/Import.vue'),
  meta: {
    title: `批量导入 - ${appTitle}`,
    requiresAuth: false,
    public: true
  }
},

// ========== 考试练习路由 ==========
{
  path: '/exams/simulate',
  name: 'ExamSimulate',
  component: () => import('@/views/exams/Simulate.vue'),
  meta: {
    title: `模拟考试 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/exams/history',
  name: 'ExamHistory',
  component: () => import('@/views/exams/History.vue'),
  meta: {
    title: `考试记录 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/exams/smart',
  name: 'SmartExam',
  component: () => import('@/views/exams/Smart.vue'),
  meta: {
    title: `智能组卷 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},

// ========== 其他功能路由 ==========
{
  path: '/wrong-answers',
  name: 'WrongAnswers',
  component: () => import('@/views/WrongAnswers.vue'),
  meta: {
    title: `错题本 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/progress',
  name: 'Progress',
  component: () => import('@/views/Progress.vue'),
  meta: {
    title: `学习进度 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/profile',
  name: 'Profile',
  component: () => import('@/views/Profile.vue'),
  meta: {
    title: `个人资料 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},
{
  path: '/settings',
  name: 'Settings',
  component: () => import('@/views/Settings.vue'),
  meta: {
    title: `设置 - ${appTitle}`,
    requiresAuth: false,
    testPhase: true,
    public: true
  }
},


  // ========== 用户管理 ==========
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
    meta: {
      title: `用户管理 - ${appTitle}`,
      requiresAuth: true,
      breadcrumb: ['首页', '系统管理', '用户管理'],
      testPhase: features.userManagement,
      comingSoon: !features.userManagement
    }
  },

  // ========== 功能页面 ==========
  {
    path: '/test-template',
    name: 'TestTemplate',
    component: () => import('@/views/TestTemplate.vue'),
    meta: {
      title: `模板测试 - ${appTitle}`,
      requiresAuth: false,
      testPhase: false,
      comingSoon: true
    }
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    component: () => import('@/views/ComingSoon.vue'),
    meta: {
      title: `功能即将开放 - ${appTitle}`,
      requiresAuth: false,
      testPhase: true,
      public: true
    }
  },

  // ========== 404 页面处理 ==========
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: `页面未找到 - ${appTitle}`,
      requiresAuth: false,
      testPhase: true,
      public: true
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 测试阶段访问控制
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = appTitle
  }
  
  // 检查是否测试阶段
  const isTestPhase = currentPhase === 'test'
  
  // 测试阶段访问控制
  if (isTestPhase && to.meta.testPhase === false) {
    // 如果是测试阶段且页面标记为不可见，跳转到即将开放页面
    next('/coming-soon')
    return
  }
  
  // 权限检查
  if (to.meta.requiresAuth) {
    const isAuthenticated = checkAuth()
    if (!isAuthenticated) {
      next('/')
      return
    }
  }
  
  next()
})

// 简单的权限检查函数
function checkAuth() {
  // 这里应该实现实际的权限检查逻辑
  return true
}

// 导出功能配置，供其他组件使用
export { features, currentPhase, isTopicVisible, appTitle }

export default router