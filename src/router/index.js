// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Notes from '@/views/Notes.vue'
import Video from '@/views/Video.vue'
import Practice from '@/views/Practice.vue'
import Exam from '@/views/Exam.vue' 
import Dashboard from '@/views/Dashboard.vue'
import Community from '@/views/Community.vue'
import ImportantMatters from '@/views/notes/business/ImportantMatters.vue'
import UserManagement from '@/views/UserManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页 - 宅学苑',
      requiresAuth: false
    }
  },
  {
    path: '/video',
    name: 'Video',
    component: Video,
    meta: {
      title: '视频学习 - 宅学苑',
      requiresAuth: false
    }
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice,
    meta: {
      title: '强化练习 - 宅学苑',
      requiresAuth: false
    }
  },
  {
    path: '/exam',
    name: 'Exam',
    component: Exam,
    meta: {
      title: '真题模拟 - 宅学苑',
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: '学习仪表盘 - 宅学苑',
      requiresAuth: false
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
    meta: {
      title: '学习社群 - 宅学苑',
      requiresAuth: false
    }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: {
      title: '中文笔记 - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记']
    }
  },
  // 宅建业法路由
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
  name: 'CompensationDeposit', // 注意：这里应该是驼峰命名
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
  path: '/notes/business/advertising-regulation', // 修正路径
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
},
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
    meta: {
      title: '用户管理 - 宅学苑',
      requiresAuth: true,
      breadcrumb: ['首页', '系统管理', '用户管理']
    }
  },
   // 权利关系路由
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
  name: ':Prescription',
  component: () => import('@/views/notes/rights/Prescription.vue'),
  meta: {
    title: '时效 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '时效']
  }
},
{
  path: '/notes/rights/agency',
  name: ':Agency',
  component: () => import('@/views/notes/rights/Agency.vue'),
  meta: {
    title: '代理 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '代理']
  }
},
{
  path: '/notes/rights/debt-performance',
  name: ':DebtPerformance',
  component: () => import('@/views/notes/rights/DebtPerformance.vue'),
  meta: {
    title: '债务不履行与弁济 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '债务不履行与弁济']
  }
},
{
  path: '/notes/rights/contract-inappropriateness',
  name: ':ContractInappropriateness',
  component: () => import('@/views/notes/rights/ContractInappropriateness.vue'),
  meta: {
    title: '契约不适合责任 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '契约不适合责任']
  }
},
{
  path: '/notes/rights/succession',
  name: ':Succession',
  component: () => import('@/views/notes/rights/Succession.vue'),
  meta: {
    title: '相続 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '相続']
  }
},
{
  path: '/notes/rights/property-change',
  name: ':PropertyChange',
  component: () => import('@/views/notes/rights/PropertyChange.vue'),
  meta: {
    title: '物权变动 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '物权变动']
  }
},
{
  path: '/notes/rights/real-estate-registration',
  name: ':RealEstateRegistration',
  component: () => import('@/views/notes/rights/RealEstateRegistration.vue'),
  meta: {
    title: '不动产登记法 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '不动产登记法']
  }
},
{
  path: '/notes/rights/mortgage',
  name: ':Mortgage',
  component: () => import('@/views/notes/rights/Mortgage.vue'),
  meta: {
    title: '抵当权 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '抵当权']
  }
},
{
  path: '/notes/rights/guarantee-and-joint-debt',
  name: ':GuaranteeAndJointDebt',
  component: () => import('@/views/notes/rights/GuaranteeAndJointDebt.vue'),
  meta: {
    title: '保证与连带债务 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '保证与连带债务']
  }
},
{
  path: '/notes/rights/co-ownership',
  name: ':CoOwnership',
  component: () => import('@/views/notes/rights/CoOwnership.vue'),
  meta: {
    title: '共有 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '共有']
  }
},
{
  path: '/notes/rights/condominium-ownership',
  name: ':CondominiumOwnership',
  component: () => import('@/views/notes/rights/CondominiumOwnership.vue'),
  meta: {
    title: '建物区分所有法 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '建物区分所有法']
  }
},
{
  path: '/notes/rights/lease',
  name: ':Lease',
  component: () => import('@/views/notes/rights/Lease.vue'),
  meta: {
    title: '赁贷借 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '赁贷借']
  }
},
{
  path: '/notes/rights/land-and-house-rental',
  name: ':LandAndHouseRental',
  component: () => import('@/views/notes/rights/LandAndHouseRental.vue'),
  meta: {
    title: '借地借家法（借家） - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '借地借家法（借家）']
  }
},
{
  path: '/notes/rights/land-lease',
  name: ':LandLease',
  component: () => import('@/views/notes/rights/LandLease.vue'),
  meta: {
    title: '借地借家法（借地） - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '借地借家法（借地）']
  }
},
{
  path: '/notes/rights/tort',
  name: ':Tort',
  component: () => import('@/views/notes/rights/Tort.vue'),
  meta: {
    title: '不法行为 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '不法行为']
  }
},
{
  path: '/notes/rights/contract-work',
  name: ':Contractwork',
  component: () => import('@/views/notes/rights/ContractWork.vue'),
  meta: {
    title: '请负 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '请负']
  }
},
{
  path: '/notes/rights/assignment-of-claim',
  name: ':Assignmentofclaim',
  component: () => import('@/views/notes/rights/AssignmentOfClaim.vue'),
  meta: {
    title: '债权让渡 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '债权让渡']
  }
},
{
  path: '/notes/rights/adjacent-relations',
  name: ':AdjacentRelations',
  component: () => import('@/views/notes/rights/AdjacentRelations.vue'),
  meta: {
    title: '相邻关系 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '相邻关系']
  }
},
{
  path: '/notes/rights/risk-burden',
  name: ':RiskBurden',
  component: () => import('@/views/notes/rights/RiskBurden.vue'),
  meta: {
    title: '危险负担 - 宅学苑',
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '危险负担']
  }
},
{
  path: '/notes/rights/payment-and-setoff',
  name: ':PaymentAndSetoff',
  component: () => import('@/views/notes/rights/PaymentAndSetoff.vue'),
  meta: {
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '弁济和相杀']
  }
},
{
  path: '/notes/rights/other-important-matters',
  name: ':OtherImportantMatters',
  component: () => import('@/views/notes/rights/OtherImportantMatters.vue'),
  meta: {
    requiresAuth: false,
    breadcrumb: ['首页', '笔记', '权利关系', '其他重要事项']
  }
},

  {
    path: '/test-template',
    name: 'TestTemplate',
    component: () => import('@/views/TestTemplate.vue'),
    meta: {
      title: '模板测试 - 宅学苑',
      requiresAuth: false
    }
  },
  // 404 页面处理
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '页面未找到 - 宅学苑',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '宅学苑' // 默认标题
  }
  
  // 简单的权限检查示例
  if (to.meta.requiresAuth) {
    // 这里可以添加实际的权限检查逻辑
    const isAuthenticated = checkAuth() // 假设有一个检查登录状态的函数
    if (!isAuthenticated) {
      // 如果未登录，重定向到登录页面
      next('/')
      return
    }
  }
  
  next()
})

// 简单的权限检查函数（示例）
function checkAuth() {
  // 这里应该实现实际的权限检查逻辑
  // 例如检查 localStorage、Vuex/Pinia 状态等
  return true // 暂时返回 true 允许访问
}

export default router