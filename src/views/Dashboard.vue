<template>
  <div class="dashboard">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>学习仪表盘</h1>
          <p>可视化学习进度，智能分析学习数据，个性化学习建议，助您高效备考</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>尊贵会员可查看详细学习分析报告</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ learningStore.overallProgress }}%</span>
              <span class="stat-label">总体进度</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ learnedTopicsCount }}</span>
              <span class="stat-label">已学知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ correctRate }}%</span>
              <span class="stat-label">平均正确率</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ streakDays }}</span>
              <span class="stat-label">连续学习</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 统计卡片 -->
        <section class="stats-section">
          <div class="section-header">
            <h2>学习统计</h2>
            <p>全面了解您的学习进度和表现</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card primary">
              <div class="stat-content">
                <div class="stat-icon">📚</div>
                <div class="stat-info">
                  <div class="stat-value">{{ learningStore.overallProgress }}%</div>
                  <div class="stat-label">总体进度</div>
                </div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">🎯</div>
                <div class="stat-info">
                  <div class="stat-value">{{ learnedTopicsCount }}</div>
                  <div class="stat-label">已学知识点</div>
                </div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">📝</div>
                <div class="stat-info">
                  <div class="stat-value">{{ correctRate }}%</div>
                  <div class="stat-label">平均正确率</div>
                </div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">⏱️</div>
                <div class="stat-info">
                  <div class="stat-value">{{ formatStudyTime(totalStudyTime) }}</div>
                  <div class="stat-label">总学习时长</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 五大分野掌握度 -->
        <section class="domains-section">
          <div class="section-header">
            <h2>五大分野掌握度</h2>
            <p>各领域学习进度分布</p>
          </div>
          <div class="domains-grid">
            <div 
              v-for="domain in domainStats" 
              :key="domain.id"
              class="domain-card"
            >
              <div class="card-header">
                <div class="domain-icon">{{ domain.icon }}</div>
                <h3 class="domain-name">{{ domain.name }}</h3>
              </div>
              <div class="domain-progress">
                <div class="progress-info">
                  <span>掌握度</span>
                  <span>{{ calculateDomainProgress(domain.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: calculateDomainProgress(domain.id) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 知识点掌握情况 -->
        <section class="knowledge-section">
          <div class="section-header">
            <h2>知识点掌握情况</h2>
            <p>各知识点学习进度详情</p>
          </div>
          <div class="knowledge-list">
            <div 
              v-for="(progress, topicId) in learningStore.progress" 
              :key="topicId"
              class="knowledge-item"
            >
              <div class="knowledge-info">
                <h4 class="knowledge-name">{{ getTopicName(topicId) }}</h4>
                <span class="knowledge-domain">{{ getTopicDomain(topicId) }}</span>
              </div>
              <div class="knowledge-progress">
                <div class="progress-text">
                  <span>掌握度</span>
                  <span>{{ progress.completionPercentage }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: progress.completionPercentage + '%' }"
                    :class="getProgressClass(progress.completionPercentage)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 最近活动 -->
        <section class="recent-section">
          <div class="section-header">
            <h2>最近活动</h2>
            <p>您的学习记录和成就</p>
          </div>
          <div class="activity-list">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="activity-card"
            >
              <div class="card-header">
                <div class="activity-icon" :class="activity.type">
                  {{ getActivityIcon(activity.type) }}
                </div>
                <div class="activity-info">
                  <h4 class="activity-title">{{ activity.title }}</h4>
                  <span class="activity-time">{{ formatTime(activity.time) }}</span>
                </div>
              </div>
              <p class="activity-desc">{{ activity.description }}</p>
            </div>
          </div>
        </section>

        <!-- 未登录提示 -->
        <section v-if="!userStore.isLoggedIn" class="login-prompt">
          <div class="prompt-content">
            <h3>登录以保存学习记录</h3>
            <p>登录后可以保存您的学习进度、查看详细分析报告，并获得个性化学习建议</p>
            <button class="btn btn-primary" @click="login">立即登录</button>
          </div>
        </section>

        <!-- 免费用户升级提示 -->
        <section v-if="userStore.isLoggedIn && !userStore.isPremium" class="upgrade-prompt">
          <div class="prompt-content">
            <h3>升级尊贵会员，解锁更多学习功能</h3>
            <p>尊贵会员可享受详细学习分析、个性化学习路径、AI智能推荐等高级功能</p>
            <button class="btn btn-premium" @click="upgradeToPremium">
              ⭐ 升级尊贵会员
            </button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'

const userStore = useUserStore()
const learningStore = useLearningStore()

// 主题名称映射
const topicNames = {
  'rights_agency': '意思表示・代理',
  'contract_law': '契約法総論',
  'land_building': '土地・建物',
  'tax_system': '税制基礎',
  'registration': '登記制度',
  'important_matters': '重要事項説明',
  'mortgage': '抵当権',
  'agency_law': '代理法',
  'business_meaning': '宅建業の意味',
  'business_license': '免許の要件',
  'office_requirements': '事務所の要件',
  'license_requirements': '免許の要件',
  'rights_capacity': '権利能力',
  'regulations_building': '建築規制',
  'tax_fixed': '固定資産税',
  'exempt_market': '免除事項'
}

const topicDomains = {
  'rights_agency': '权利关系',
  'contract_law': '权利关系', 
  'land_building': '法令制限',
  'tax_system': '税・価格',
  'registration': '五问免除',
  'important_matters': '宅建业法',
  'mortgage': '权利关系',
  'agency_law': '权利关系',
  'business_meaning': '宅建业法',
  'business_license': '宅建业法',
  'office_requirements': '宅建业法',
  'license_requirements': '宅建业法',
  'rights_capacity': '权利关系',
  'regulations_building': '法令制限',
  'tax_fixed': '税・価格',
  'exempt_market': '五问免除'
}

const domainStats = [
  { id: 'rights', name: '权利关系', icon: '⚖️' },
  { id: 'business', name: '宅建业法', icon: '🏢' },
  { id: 'regulations', name: '法令制限', icon: '📏' },
  { id: 'tax', name: '税・価格', icon: '💰' },
  { id: 'exempt', name: '五问免除', icon: '✅' }
]

// 计算属性 - 修复与 store 结构匹配
const learnedTopicsCount = computed(() => {
  return Object.values(learningStore.progress).filter(topic => 
    topic.completionPercentage > 0
  ).length
})

const totalStudyTime = computed(() => {
  return Object.values(learningStore.progress).reduce((sum, topic) => 
    sum + topic.totalStudyTime, 0
  )
})

const streakDays = computed(() => {
  const totalStudyHours = totalStudyTime.value / 3600
  return Math.min(18, Math.floor(totalStudyHours / 2))
})

const correctRate = computed(() => {
  const topics = Object.values(learningStore.progress)
  if (topics.length === 0) return 0
  
  const topicsWithScore = topics.filter(topic => topic.quizScore > 0)
  if (topicsWithScore.length === 0) return 0
  
  const totalScore = topicsWithScore.reduce((sum, topic) => sum + topic.quizScore, 0)
  return Math.round(totalScore / topicsWithScore.length)
})

const recentActivities = computed(() => {
  const activities = []
  
  // 从学习进度生成活动
  Object.entries(learningStore.progress)
    .filter(([_, progress]) => progress.completionPercentage > 0 && progress.lastAccessed)
    .sort(([_, a], [__, b]) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
    .slice(0, 5)
    .forEach(([topicId, progress]) => {
      activities.push({
        id: `progress_${topicId}`,
        type: 'study',
        title: `学习了"${getTopicName(topicId)}"`,
        description: `掌握度: ${progress.completionPercentage}%`,
        time: new Date(progress.lastAccessed)
      })
    })
  
  return activities
})

// 方法
const getProgressClass = (progress) => {
  if (progress >= 80) return 'excellent'
  if (progress >= 60) return 'good'
  return 'average'
}

const getActivityIcon = (type) => {
  const icons = {
    'study': '📚',
    'practice': '🎯',
    'exam': '📝',
    'video': '🎥'
  }
  return icons[type] || '📋'
}

const formatTime = (time) => {
  if (!time) return '从未学习'
  
  if (typeof time === 'string') {
    time = new Date(time)
  }
  
  const now = new Date()
  const diff = now - time
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (hours < 1) return '刚刚'
  if (hours < 24) return `${hours}小时前`
  if (days === 1) return '昨天'
  return `${days}天前`
}

const formatStudyTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
}

const getTopicName = (topicId) => {
  return topicNames[topicId] || topicId
}

const getTopicDomain = (topicId) => {
  return topicDomains[topicId] || '其他'
}

const calculateDomainProgress = (domainId) => {
  const domainName = domainStats.find(d => d.id === domainId)?.name
  const domainTopics = Object.entries(learningStore.progress).filter(([topicId, _]) => 
    getTopicDomain(topicId) === domainName
  )
  
  if (domainTopics.length === 0) return 0
  
  const totalProgress = domainTopics.reduce((sum, [_, progress]) => 
    sum + progress.completionPercentage, 0
  )
  
  return Math.round(totalProgress / domainTopics.length)
}

const upgradeToPremium = () => {
  userStore.isPremium = true
  alert('已升级为尊贵会员！')
}

const login = () => {
  // 模拟登录
  userStore.login({
    id: 1,
    name: '测试用户',
    subscription_tier: 'free'
  })
  alert('登录成功！')
}

onMounted(() => {
  console.log('Dashboard组件已挂载')
  // 确保从本地存储加载数据
  learningStore.loadFromStorage()
})
</script>

<style scoped>
/* 基础样式 */
.dashboard {
  min-height: 100vh;
  background: #f8fafc;
  color: #334155;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  line-height: 1.5;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 12px;
  padding: 40px 30px;
  margin: 20px 0;
  text-align: center;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e5a47;
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #2a7960;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

/* 主要内容区域 */
.main-content {
  margin: 3rem 0;
}

/* 区域头部 */
.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e5a47;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card.primary {
  background: linear-gradient(135deg, #2a7960, #1e5a47);
  color: white;
}

.stat-card.primary .stat-value,
.stat-card.primary .stat-label {
  color: white;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2a7960;
  margin-bottom: 0.25rem;
}

.stat-card.primary .stat-value {
  color: white;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.stat-card.primary .stat-label {
  color: rgba(255, 255, 255, 0.8);
}

/* 五大分野掌握度 */
.domains-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.domains-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.domain-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.domain-card:hover {
  border-color: #2a7960;
  transform: translateY(-2px);
}

.domain-card .card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.domain-icon {
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  background: rgba(42, 121, 96, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2a7960;
}

.domain-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e5a47;
  margin: 0;
}

.domain-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2a7960;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-fill.excellent {
  background: #10b981;
}

.progress-fill.good {
  background: #f59e0b;
}

.progress-fill.average {
  background: #ef4444;
}

/* 知识点掌握情况 */
.knowledge-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.knowledge-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.knowledge-item:hover {
  border-color: #2a7960;
  transform: translateY(-2px);
}

.knowledge-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.knowledge-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e5a47;
  margin: 0;
}

.knowledge-domain {
  font-size: 0.75rem;
  color: #64748b;
  background: rgba(42, 121, 96, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.knowledge-progress .progress-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

/* 最近活动 */
.recent-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.activity-card:hover {
  border-color: #2a7960;
  transform: translateY(-2px);
}

.activity-card .card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.activity-icon {
  font-size: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.study {
  background: rgba(42, 121, 96, 0.2);
  color: #2a7960;
}

.activity-icon.practice {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e5a47;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: #64748b;
}

.activity-desc {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #2a7960;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1e5a47;
  transform: translateY(-2px);
}

.btn-premium {
  background: #f59e0b;
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
}

.btn-premium:hover {
  background: #d97706;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35);
}

/* 登录提示 */
.login-prompt, .upgrade-prompt {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  margin: 2.5rem 0;
  border: 1px solid #e2e8f0;
}

.upgrade-prompt {
  border: 2px solid #f59e0b;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.prompt-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e5a47;
  margin-bottom: 0.75rem;
}

.prompt-content p {
  color: #64748b;
  margin-bottom: 1.25rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 2rem 1rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .header-content p {
    font-size: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .domains-grid {
    grid-template-columns: 1fr;
  }
  
  .knowledge-info {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .stat-number {
    font-size: 1.75rem;
  }
  
  .domain-card .card-header {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .activity-card .card-header {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>