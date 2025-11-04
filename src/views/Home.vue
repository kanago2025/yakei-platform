<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <div class="welcome-message">
            <h1 v-if="userStore.isLoggedIn">🎉 欢迎回来，{{ userStore.userName }}！</h1>
            <h1 v-else>🎉 欢迎来到宅学苑！</h1>
            <p class="user-status" v-if="userStore.isLoggedIn">
              <span class="status-badge" :class="userStore.userType">
                {{ userStore.userType === 'premium' ? '👑 尊贵会员' : '👤 免费用户' }}
              </span>
              <span class="login-time">登录时间：{{ currentTime }}</span>
            </p>
            <p class="welcome-text" v-else>
              专为在日华人设计的宅建士资格考试备考平台，立即开始您的学习之旅！
            </p>
          </div>
          <div class="quick-stats" v-if="userStore.isLoggedIn">
            <div class="stat-item">
              <span class="stat-number">{{ learningStore.overallProgress }}%</span>
              <span class="stat-label">总体进度</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ learnedTopicsCount }}</span>
              <span class="stat-label">已学知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ learningStore.correctRate }}%</span>
              <span class="stat-label">练习正确率</span>
            </div>
          </div>
          <div class="quick-actions" v-else>
            <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
            <button class="btn btn-secondary" @click="openRegisterDialog">免费注册</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 平台介绍 -->
        <section class="platform-intro">
          <div class="intro-content">
            <h1>日本宅建士资格考试</h1>
            <h2>中文学习助考平台</h2>
            
            <p class="intro-text">
              专为在日华人设计的宅建士资格考试备考平台，通过中文学习宅建士考试的内容，
              系统化理解并掌握五大分野知识点，助您高效通过宅建士资格考试。
            </p>

            <div class="action-buttons">
              <router-link to="/notes" class="btn btn-primary">
                <span class="btn-icon">📚</span>
                开始学习
              </router-link>
              <button @click="showPlatformIntro" class="btn btn-secondary">
                <span class="btn-icon">ℹ️</span>
                了解详情
              </button>
            </div>
          </div>
        </section>

        <!-- 学习卡片区域 -->
        <section class="learning-cards-section">
          <div class="section-header">
            <h2>学习功能模块</h2>
            <p class="section-desc">选择适合您的学习方式</p>
          </div>
          <div class="learning-cards">
            <div 
              class="card" 
              v-for="card in visibleLearningCards" 
              :key="card.id"
              :class="{ 'disabled': !card.enabled }"
              @click="handleCardClick(card)"
            >
              <div class="card-icon">{{ card.icon }}</div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
              <div v-if="!card.enabled" class="coming-soon-badge">即将开放</div>
            </div>
          </div>
        </section>

        <!-- 知识点快速入口 -->
        <section class="quick-access">
          <div class="section-header">
            <h2>知识点快速学习</h2>
            <p class="section-desc">测试阶段开放的核心知识点</p>
          </div>
          <div class="topic-grid">
            <div 
              class="topic-item"
              v-for="topic in visibleTopics"
              :key="topic.id"
              @click="navigateToTopic(topic)"
            >
              <span class="topic-name">{{ topic.name }}</span>
              <span class="topic-field">{{ topic.field }}</span>
            </div>
          </div>
        </section>

        <!-- 五大分野 -->
        <section class="domains-section">
          <div class="section-header">
            <h2>五大学习分野</h2>
            <p class="section-desc">全面覆盖宅建士考试核心内容</p>
          </div>
          <div class="domains-grid">
            <div 
              v-for="domain in domains" 
              :key="domain.id"
              class="domain-card"
              @click="navigateToDomain(domain.id)"
            >
              <div class="domain-icon">{{ domain.icon }}</div>
              <h3>{{ domain.name }}</h3>
              <p>{{ domain.description }}</p>
              <div class="domain-progress" v-if="userStore.isLoggedIn">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: calculateDomainProgress(domain.id) + '%' }"
                  ></div>
                </div>
                <span class="progress-text">已学 {{ calculateDomainProgress(domain.id) }}%</span>
              </div>
              <div class="domain-action" v-else>
                <button class="btn btn-sm" @click.stop="openLoginDialog">开始学习</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 调试信息（仅在测试环境显示） -->
        <div v-if="showDebugInfo" class="debug-info">
          <h4>环境信息</h4>
          <p>当前环境: {{ currentPhase }}</p>
          <p>可见知识点: {{ visibleTopics.length }} 个</p>
          <p>可见功能: {{ visibleLearningCards.filter(card => card.enabled).length }} 个</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import FeatureControl from '@/utils/featureControl.js'

const userStore = useUserStore()
const learningStore = useLearningStore()
const router = useRouter()
const currentTime = ref('')

// 当前环境信息
const currentPhase = FeatureControl.getCurrentPhase()
const showDebugInfo = currentPhase === 'test'

// 学习卡片数据（根据功能控制动态生成）
const learningCards = ref([
  {
    id: 'notes',
    title: '中文笔记',
    description: '系统学习所有知识点',
    icon: '📚',
    route: '/notes',
    enabled: FeatureControl.isRouteVisible('notes')
  },
  {
    id: 'video',
    title: '视频学习',
    description: '观看讲解视频',
    icon: '🎥',
    route: '/video',
    enabled: FeatureControl.isRouteVisible('video')
  },
  {
    id: 'practice',
    title: '强化练习',
    description: '针对性题目练习',
    icon: '💪',
    route: '/practice',
    enabled: FeatureControl.isRouteVisible('practice')
  },
  {
    id: 'exam',
    title: '真题模拟',
    description: '真实考试环境模拟',
    icon: '📝',
    route: '/exam',
    enabled: FeatureControl.isRouteVisible('exam')
  },
  {
    id: 'dashboard',
    title: '学习仪表盘',
    description: '查看学习进度和分析',
    icon: '📊',
    route: '/dashboard',
    enabled: FeatureControl.isRouteVisible('dashboard')
  },
  {
    id: 'community',
    title: '学习社群',
    description: '与其他考生交流',
    icon: '👥',
    route: '/community',
    enabled: FeatureControl.isRouteVisible('community')
  }
])

// 五大分野数据
const domains = [
  {
    id: 'business',
    name: '宅建业法',
    icon: '🏢',
    description: '宅地建物取引业法相关规定，包括免许制度、重要事项说明、广告规制等'
  },
  {
    id: 'rights',
    name: '权利关系',
    icon: '⚖️',
    description: '民法基础知识，包括意思表示、代理、物权变动、不动产登记等核心法律概念'
  },
  {
    id: 'regulations',
    name: '法令制限',
    icon: '📏',
    description: '都市计划法、建筑基准法、国土利用计划法等土地使用和建筑相关法规'
  },
  {
    id: 'tax',
    name: '税・価格',
    icon: '💰',
    description: '不动产取得税、固定资产税、所得税等税务知识和价格评估基础'
  },
  {
    id: 'exempt',
    name: '5問免除',
    icon: '✅',
    description: '住宅金融支援机构法、需给统计、土地建物特性等五问免除领域知识'
  }
]

// 所有知识点数据
const allTopics = ref([
  // 宅建业法知识点
  { id: 'business-meaning', name: '宅建业含义', field: '宅建业法', route: '/notes/business/business-meaning' },
  { id: 'important-matters', name: '重要事项说明', field: '宅建业法', route: '/notes/business/important-matters' },
  { id: 'mediation', name: '媒介与代理', field: '宅建业法', route: '/notes/business/mediation' },
  { id: 'license-requirements', name: '免许制度', field: '宅建业法', route: '/notes/business/license-requirements' },
  { id: 'agent', name: '宅地建物取引士', field: '宅建业法', route: '/notes/business/agent' },
  { id: 'office-requirements', name: '事务所规定', field: '宅建业法', route: '/notes/business/office-requirements' },
  { id: 'deposit', name: '营业保证金', field: '宅建业法', route: '/notes/business/deposit' },
  { id: 'compensationdeposit', name: '弁济业务保证金', field: '宅建业法', route: '/notes/business/compensationdeposit' },
  { id: 'advertising-regulation', name: '广告规制', field: '宅建业法', route: '/notes/business/advertising-regulation' },
  { id: '37-document', name: '37条书面', field: '宅建业法', route: '/notes/business/37-document' },
  { id: 'Seller-Restrictions', name: '自己卖主的制限', field: '宅建业法', route: '/notes/business/Seller-Restrictions' },
  { id: 'Housing-DefectWarranty', name: '住宅瑕疵担保履行法', field: '宅建业法', route: '/notes/business/Housing-DefectWarranty' },
  { id: 'Compensation-Limit', name: '报酬额的制限', field: '宅建业法', route: '/notes/business/Compensation-Limit' },
  { id: 'Supervision-Penalty', name: '监督与罚则', field: '宅建业法', route: '/notes/business/Supervision-Penalty' },
  { id: 'Other-BusinessRegulations', name: '其他业务上的规制', field: '宅建业法', route: '/notes/business/Other-BusinessRegulations' },
  { id: 'Outside-Office', name: '事务所以外场所的规制', field: '宅建业法', route: '/notes/business/Outside-Office' },
  
  // 权利关系知识点
  { id: 'agency', name: '代理', field: '权利关系', route: '/notes/rights/agency' },
  { id: 'mortgage', name: '抵当权', field: '权利关系', route: '/notes/rights/mortgage' },
  { id: 'property-change', name: '物权变动', field: '权利关系', route: '/notes/rights/property-change' },
  { id: 'succession', name: '相続', field: '权利关系', route: '/notes/rights/succession' },
  { id: 'declaration-of-intent', name: '意思表示', field: '权利关系', route: '/notes/rights/declaration-of-intent' },
  { id: 'limited-capacity-persons', name: '制限行为能力者', field: '权利关系', route: '/notes/rights/limited-capacity-persons' },
  { id: 'prescription', name: '时效', field: '权利关系', route: '/notes/rights/prescription' },
  { id: 'debt-performance', name: '债务不履行与弁济', field: '权利关系', route: '/notes/rights/debt-performance' },
  { id: 'contract-inappropriateness', name: '契约不适合责任', field: '权利关系', route: '/notes/rights/contract-inappropriateness' },
  { id: 'real-estate-registration', name: '不动产登记法', field: '权利关系', route: '/notes/rights/real-estate-registration' },
  { id: 'guarantee-and-joint-debt', name: '保证与连带债务', field: '权利关系', route: '/notes/rights/guarantee-and-joint-debt' },
  { id: 'co-ownership', name: '共有', field: '权利关系', route: '/notes/rights/co-ownership' },
  { id: 'condominium-ownership', name: '建物区分所有法', field: '权利关系', route: '/notes/rights/condominium-ownership' },
  { id: 'lease', name: '赁贷借', field: '权利关系', route: '/notes/rights/lease' },
  { id: 'land-and-house-rental', name: '借地借家法（借家）', field: '权利关系', route: '/notes/rights/land-and-house-rental' },
  { id: 'land-lease', name: '借地借家法（借地）', field: '权利关系', route: '/notes/rights/land-lease' },
  { id: 'tort', name: '不法行为', field: '权利关系', route: '/notes/rights/tort' },
  { id: 'contract-work', name: '请负', field: '权利关系', route: '/notes/rights/contract-work' },
  { id: 'assignment-of-claim', name: '债权让渡', field: '权利关系', route: '/notes/rights/assignment-of-claim' },
  { id: 'adjacent-relations', name: '相邻关系', field: '权利关系', route: '/notes/rights/adjacent-relations' },
  { id: 'risk-burden', name: '危险负担', field: '权利关系', route: '/notes/rights/risk-burden' },
  { id: 'payment-and-setoff', name: '弁济和相杀', field: '权利关系', route: '/notes/rights/payment-and-setoff' },
  { id: 'other-important-matters', name: '其他重要事项', field: '权利关系', route: '/notes/rights/other-important-matters' }
])

// 计算属性：可见的学习卡片
const visibleLearningCards = computed(() => {
  return learningCards.value
})

// 计算属性：可见的知识点
const visibleTopics = computed(() => {
  return allTopics.value.filter(topic => {
    if (currentPhase !== 'test') return true
    
    const category = topic.field === '宅建业法' ? 'businessLaw' : 'rightsRelations'
    return FeatureControl.isTopicVisible(category, topic.id)
  })
})

// 计算属性
const learnedTopicsCount = computed(() => {
  return Object.values(learningStore.progress).filter(topic => 
    topic.completionPercentage > 0
  ).length
})

// 计算领域进度
const calculateDomainProgress = (domainId) => {
  const domainMapping = {
    'rights': ['declaration_ofintent', 'rights_capacity', 'agency_law'],
    'business': ['business_meaning', 'office_requirements', 'agent', 'deposit'],
    'regulations': ['land_building', 'regulations_building'],
    'tax': ['tax_system', 'tax_fixed'],
    'exempt': ['registration', 'exempt_market']
  }
  
  const domainTopics = domainMapping[domainId] || []
  if (domainTopics.length === 0) return 0
  
  const totalProgress = domainTopics.reduce((sum, topicId) => {
    const progress = learningStore.progress[topicId]
    return sum + (progress?.completionPercentage || 0)
  }, 0)
  
  return Math.round(totalProgress / domainTopics.length)
}

// 处理卡片点击
const handleCardClick = (card) => {
  if (!card.enabled) {
    router.push('/coming-soon')
    return
  }
  router.push(card.route)
}

// 导航到知识点
const navigateToTopic = (topic) => {
  router.push(topic.route)
}

// 导航到具体领域
const navigateToDomain = (domainId) => {
  if (!userStore.isLoggedIn) {
    openLoginDialog()
    return
  }
  
  // 使用 router.push 并传递查询参数
  router.push({
    path: '/notes',
    query: { domain: domainId }
  })
}

// 显示平台介绍
const showPlatformIntro = () => {
  alert(`🏠 宅学苑平台介绍

🌟 核心特色：
• 中文理解日本宅建士考试内容
• 知识点视频讲解
• 个性化学习路径
• 刻意练习系统

📚 学习资源：
• 完整覆盖五大考试分野
• 系统化知识体系
• 历年真题库
• 智能错题本

🎯 学习目标：
帮助在日华人克服语言障碍
高效备考，一次通过考试！`)
}

// 打开登录弹窗 - 使用全局事件
const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

// 打开注册弹窗 - 使用全局事件
const openRegisterDialog = () => {
  window.dispatchEvent(new CustomEvent('open-register-dialog'))
}

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)
  learningStore.loadFromStorage()
  
  console.log('首页 - 当前环境:', currentPhase)
  console.log('首页 - 可见功能卡:', visibleLearningCards.value.filter(card => card.enabled).length)
  console.log('首页 - 可见知识点:', visibleTopics.value.length)
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 20px;
}

/* === 修复容器居中问题 === */
.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
  width: 100%;
  box-sizing: border-box;
}

/* 确保所有主要部分都有适当的间距 */
.hero-banner,
.main-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

/* ========= 欢迎横幅 ========= */
.hero-banner {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 4rem 0;
  margin-top: 0;
  width: 100%;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
}

.welcome-message h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-badge.free {
  background: rgba(255, 255, 255, 0.2);
}

.status-badge.premium {
  background: gold;
  color: #856404;
}

.login-time {
  font-size: 0.9rem;
  opacity: 0.9;
}

.welcome-text {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.quick-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

.quick-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-icon {
  font-size: 1.2rem;
}

/* ========= 主要内容 ========= */
.main-content {
  padding: 4rem 0;
  flex: 1;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
}

.section-header h2 {
  font-size: 2.2rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-desc {
  font-size: 1.1rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto;
}

/* ========= 平台介绍 ========= */
.platform-intro {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
  width: 100%;
}

.intro-content h1 {
  font-size: 2.5rem;
  color: var(--primary-dark);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.intro-content h2 {
  font-size: 1.5rem;
  color: var(--muted);
  margin: 0 0 2rem 0;
  font-weight: 500;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ========= 学习卡片区域 ========= */
.learning-cards-section {
  padding: 3rem 0;
  margin-bottom: 3rem;
  width: 100%;
}

.learning-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.card:hover:not(.disabled) {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  border-color: #667eea;
}

.card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #f8f9fa;
}

.card-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.card h3 {
  margin: 10px 0;
  color: #333;
}

.card p {
  color: #666;
  margin: 0;
}

.coming-soon-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff6b6b;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

/* ========= 知识点快速入口 ========= */
.quick-access {
  margin: 40px 0;
  width: 100%;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.topic-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
}

.topic-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.topic-name {
  display: block;
  font-weight: 500;
  color: #333;
}

.topic-field {
  display: block;
  font-size: 0.9em;
  color: #667eea;
  margin-top: 5px;
}

/* ========= 五大分野 ========= */
.domains-section {
  padding: 3rem 0;
  margin-bottom: 3rem;
  width: 100%;
}

.domains-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.domain-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.domain-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.domain-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.domain-card h3 {
  color: var(--primary-dark);
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.domain-card p {
  color: var(--muted);
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
  flex-grow: 1;
}

.domain-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: var(--muted);
  font-weight: 600;
}

.domain-action {
  margin-top: auto;
}

/* ========= 调试信息 ========= */
.debug-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 30px;
  border-left: 4px solid #28a745;
  width: 100%;
}

.debug-info h4 {
  margin: 0 0 10px 0;
  color: #28a745;
}

.debug-info p {
  margin: 5px 0;
  font-family: monospace;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .domains-grid,
  .learning-cards,
  .topic-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .container {
    padding: 0 var(--container-padding, 1.5rem);
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .quick-stats, .quick-actions {
    width: 100%;
    justify-content: center;
  }
  
  .platform-intro h1 {
    font-size: 2rem;
  }
  
  .platform-intro h2 {
    font-size: 1.2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .domains-grid,
  .learning-cards,
  .topic-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--container-padding, 1rem);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .intro-content h1 {
    font-size: 2rem;
  }
  
  .user-status {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .quick-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .quick-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .quick-actions .btn {
    width: 100%;
  }
}
</style>