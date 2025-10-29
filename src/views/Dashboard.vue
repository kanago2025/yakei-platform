<template>
  <div class="dashboard">
    <div class="container">
      <!-- 顶部导航栏 -->
      <header class="top-nav">
        <router-link to="/" class="logo">
          <span class="mark">宅</span>
          <span class="name">宅学苑</span>
        </router-link>
        
        <nav class="nav-links" :class="{ 'mobile-show': mobileMenuOpen }">
          <router-link to="/">首页</router-link>
          <router-link to="/notes">中文笔记</router-link>
          <router-link to="/video">视频学习</router-link>
          <router-link to="/practice">强化练习</router-link>
          <router-link to="/exam">真题模拟</router-link>
          <router-link to="/community">学习社群</router-link>
          <router-link to="/dashboard" class="active">学习进度</router-link>
          <router-link to="/login">登录 / 注册</router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </header>

      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>学习仪表盘</h1>
          <p>可视化学习进度，智能分析学习数据，个性化学习建议，助您高效备考</p>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ dashboardData.overallProgress }}%</span>
              <span class="stat-label">总体进度</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ dashboardData.learnedPoints }}</span>
              <span class="stat-label">已学知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ dashboardData.averageAccuracy }}%</span>
              <span class="stat-label">平均正确率</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ dashboardData.streakDays }}</span>
              <span class="stat-label">连续学习</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-section">
          <h3>学习概览</h3>
          <div class="overview-buttons">
            <button 
              v-for="overview in overviewTypes" 
              :key="overview.id"
              class="overview-btn" 
              :class="{ active: activeOverview === overview.id }"
              @click="switchOverview(overview.id)"
            >
              <span class="overview-icon">{{ overview.icon }}</span>
              <span class="overview-name">{{ overview.name }}</span>
              <span class="overview-desc">{{ overview.description }}</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>快速操作</h3>
          <div class="action-buttons">
            <button class="action-btn" @click="continueLearning">
              <span class="action-icon">▶️</span>
              <span>继续学习</span>
            </button>
            <button class="action-btn" @click="reviewWeakPoints">
              <span class="action-icon">🎯</span>
              <span>复习弱点</span>
            </button>
            <router-link to="/practice" class="action-btn">
              <span class="action-icon">📝</span>
              <span>强化练习</span>
            </router-link>
            <router-link to="/exam" class="action-btn">
              <span class="action-icon">⏱️</span>
              <span>模拟考试</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 统计卡片 -->
        <div class="stats-grid">
          <div class="stat-card primary">
            <div class="stat-content">
              <div class="stat-icon">📚</div>
              <div class="stat-info">
                <div class="stat-value">{{ learningStore.overallProgress }}%</div>
                <div class="stat-label">总体进度</div>
              </div>
            </div>
            <div class="progress-ring">
              <svg width="80" height="80">
                <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.3)" stroke-width="6" fill="none"></circle>
                <circle cx="40" cy="40" r="35" stroke="white" stroke-width="6" fill="none" 
                        :stroke-dasharray="220" :stroke-dashoffset="220 - (220 * learningStore.overallProgress / 100)" stroke-linecap="round"></circle>
              </svg>
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
            <div class="stat-trend" :class="getTrendClass(learningStore.overallProgress)">
              +{{ learningStore.overallProgress }}%
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">📝</div>
              <div class="stat-info">
                <div class="stat-value">{{ learningStore.correctRate }}%</div>
                <div class="stat-label">平均正确率</div>
              </div>
            </div>
            <div class="stat-trend" :class="getTrendClass(learningStore.correctRate)">
              {{ learningStore.correctRate >= 70 ? '+' : '' }}{{ learningStore.correctRate }}%
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">⏱️</div>
              <div class="stat-info">
                <div class="stat-value">{{ formatStudyTime(learningStore.totalStudyTime) }}</div>
                <div class="stat-label">总学习时长</div>
              </div>
            </div>
            <div class="stat-badge" v-if="learningStore.totalStudyTime > 3600">
              🔥 坚持中
            </div>
          </div>
        </div>

        <!-- 仪表盘主要内容 -->
        <div class="dashboard-grid">
          <!-- 学习进度趋势 -->
          <div class="chart-section">
            <div class="section-header">
              <h3>学习进度趋势</h3>
              <div class="time-filter">
                <button 
                  v-for="period in timePeriods" 
                  :key="period.id"
                  class="filter-btn"
                  :class="{ active: activePeriod === period.id }"
                  @click="switchPeriod(period.id)"
                >
                  {{ period.name }}
                </button>
              </div>
            </div>
            <div class="chart-container">
              <div class="chart-placeholder">
                <div class="chart-bars">
                  <div 
                    v-for="(data, index) in progressData" 
                    :key="index"
                    class="bar" 
                    :style="{ height: data.progress + '%' }"
                    :title="`${data.date}: ${data.progress}%`"
                  ></div>
                </div>
                <div class="chart-labels">
                  <span v-for="(data, index) in progressData" :key="index">
                    {{ formatChartLabel(data.date) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 知识点掌握情况 -->
          <div class="knowledge-section">
            <div class="section-header">
              <h3>知识点掌握情况</h3>
              <router-link to="/notes" class="view-all">查看全部</router-link>
            </div>
            <div class="knowledge-list">
              <div 
                v-for="(progress, topicId) in learningStore.progress" 
                :key="topicId"
                class="knowledge-item"
              >
                <div class="knowledge-info">
                  <span class="knowledge-name">{{ getTopicName(topicId) }}</span>
                  <span class="knowledge-domain">{{ getTopicDomain(topicId) }}</span>
                </div>
                <div class="knowledge-progress">
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: progress.completionPercentage + '%' }"
                      :class="getProgressClass(progress.completionPercentage)"
                    ></div>
                  </div>
                  <span class="progress-text">{{ progress.completionPercentage }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 五大分野掌握度 -->
          <div class="domains-section">
            <div class="section-header">
              <h3>五大分野掌握度</h3>
            </div>
            <div class="domains-grid">
              <div 
                v-for="domain in domainStats" 
                :key="domain.id"
                class="domain-card"
              >
                <div class="domain-icon">{{ domain.icon }}</div>
                <div class="domain-info">
                  <h4 class="domain-name">{{ domain.name }}</h4>
                  <div class="domain-progress">
                    <div class="progress-info">
                      <span class="progress-label">掌握度</span>
                      <span class="progress-value">{{ calculateDomainProgress(domain.id) }}%</span>
                    </div>
                    <div class="progress-bar">
                      <div 
                        class="progress-fill" 
                        :style="{ width: calculateDomainProgress(domain.id) + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="domain-actions">
                  <router-link 
                    :to="domain.link" 
                    class="btn btn-outline"
                  >
                    学习
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- 最近活动 -->
          <div class="recent-activity">
            <div class="section-header">
              <h3>最近活动</h3>
              <button class="view-all" @click="loadMoreActivities">查看更多</button>
            </div>
            <div class="activity-list">
              <div 
                v-for="activity in recentActivities" 
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon" :class="activity.type">
                  {{ getActivityIcon(activity.type) }}
                </div>
                <div class="activity-content">
                  <div class="activity-title">{{ activity.title }}</div>
                  <div class="activity-desc">{{ activity.description }}</div>
                  <div class="activity-time">{{ formatTime(activity.time) }}</div>
                </div>
                <div class="activity-meta" v-if="activity.score">
                  <span class="score" :class="getScoreClass(activity.score)">
                    {{ activity.score }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 个性化建议 -->
          <div class="recommendation-section">
            <div class="section-header">
              <h3>个性化建议</h3>
            </div>
            <div class="recommendation-list">
              <div 
                v-for="recommendation in personalizedRecommendations" 
                :key="recommendation.id"
                class="recommendation-item"
                :class="recommendation.priority"
              >
                <div class="rec-icon">{{ recommendation.icon }}</div>
                <div class="rec-content">
                  <h4>{{ recommendation.title }}</h4>
                  <p>{{ recommendation.description }}</p>
                  <div class="rec-actions">
                    <button 
                      class="btn btn-sm"
                      :class="recommendation.priority === 'high' ? 'btn-primary' : 'btn-outline'"
                      @click="followRecommendation(recommendation)"
                    >
                      {{ recommendation.action }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 学习目标 -->
          <div class="goals-section">
            <div class="section-header">
              <h3>学习目标</h3>
              <button class="btn btn-outline" @click="editGoals">编辑目标</button>
            </div>
            <div class="goals-list">
              <div 
                v-for="goal in learningGoals" 
                :key="goal.id"
                class="goal-item"
              >
                <div class="goal-info">
                  <div class="goal-header">
                    <h4 class="goal-title">{{ goal.title }}</h4>
                    <span class="goal-deadline">{{ goal.deadline }}</span>
                  </div>
                  <p class="goal-desc">{{ goal.description }}</p>
                </div>
                <div class="goal-progress">
                  <div class="progress-info">
                    <span class="progress-label">完成度</span>
                    <span class="progress-value">{{ goal.progress }}%</span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: goal.progress + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>持续学习，稳步提升</h2>
          <p>基于您的学习数据，我们为您提供个性化的学习路径和建议，助您高效备考</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="startLearningSession">开始学习</button>
            <router-link to="/exam" class="btn btn-secondary">模拟考试</router-link>
          </div>
        </div>
      </section>

      <!-- 页脚 -->
      <footer class="footer">
        <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLearningStore } from '@/stores/learning'
import { useUserStore } from '@/stores/user'

const learningStore = useLearningStore()
const userStore = useUserStore()

const mobileMenuOpen = ref(false)
const activeOverview = ref('progress')
const activePeriod = ref('week')

// 主题名称映射
const topicNames = {
  'rights_agency': '権利関係・代理',
  'contract_law': '契約法律',
  'land_building': '土地・建物',
  'tax_system': '税制',
  'registration': '登記・測量',
  'important_matters': '重要事項説明',
  'mortgage': '抵当権',
  'agency_law': '代理法'
}

const topicDomains = {
  'rights_agency': '权利关系',
  'contract_law': '权利关系',
  'land_building': '法令制限',
  'tax_system': '税・価格',
  'registration': '登記・測量',
  'important_matters': '宅建业法',
  'mortgage': '权利关系',
  'agency_law': '权利关系'
}

// 配置数据
const overviewTypes = [
  { 
    id: 'progress', 
    name: '学习进度', 
    icon: '📊', 
    description: '整体学习情况'
  },
  { 
    id: 'performance', 
    name: '学习表现', 
    icon: '🎯', 
    description: '练习和考试表现'
  },
  { 
    id: 'goals', 
    name: '学习目标', 
    icon: '🎯', 
    description: '目标完成情况'
  },
  { 
    id: 'analytics', 
    name: '学习分析', 
    icon: '📈', 
    description: '深度数据分析'
  }
]

const timePeriods = [
  { id: 'week', name: '本周' },
  { id: 'month', name: '本月' },
  { id: 'quarter', name: '本季度' }
]

const domainStats = [
  { id: 'rights', name: '权利关系', icon: '⚖️', link: '/notes?domain=rights' },
  { id: 'business', name: '宅建业法', icon: '🏢', link: '/notes?domain=business' },
  { id: 'regulations', name: '法令制限', icon: '📏', link: '/notes?domain=regulations' },
  { id: 'tax', name: '税・価格', icon: '💰', link: '/notes?domain=tax' },
  { id: 'exempt', name: '五问免除', icon: '✅', link: '/notes?domain=exempt' }
]

// 计算属性
const dashboardData = computed(() => ({
  overallProgress: learningStore.overallProgress,
  learnedPoints: learnedTopicsCount.value,
  averageAccuracy: learningStore.correctRate,
  streakDays: calculateStreakDays(),
  pointsTrend: 12,
  accuracyTrend: 3
}))

const learnedTopicsCount = computed(() => {
  return Object.values(learningStore.progress).filter(topic => 
    topic.completionPercentage > 0
  ).length
})

const recentActivities = computed(() => {
  const activities = []
  
  // 从练习记录生成活动
  learningStore.practiceRecords.slice(-5).forEach(record => {
    activities.push({
      id: record.id,
      type: 'practice',
      title: '完成了练习题',
      description: `题目 #${record.questionId}`,
      time: new Date(record.createdAt),
      score: record.isCorrect ? '100%' : '0%'
    })
  })
  
  // 从学习进度生成活动
  Object.entries(learningStore.progress).forEach(([topicId, progress]) => {
    if (progress.lastAccessed) {
      activities.push({
        id: `progress_${topicId}`,
        type: 'study',
        title: `学习了"${getTopicName(topicId)}"`,
        description: `学习时长: ${formatTime(progress.totalStudyTime)}`,
        time: new Date(progress.lastAccessed),
        score: null
      })
    }
  })
  
  // 按时间排序并返回最近5个
  return activities
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5)
})

const personalizedRecommendations = computed(() => {
  const recommendations = []
  
  // 根据学习进度生成建议
  const weakTopics = Object.entries(learningStore.progress)
    .filter(([_, progress]) => progress.completionPercentage < 50)
    .slice(0, 2)
  
  weakTopics.forEach(([topicId, progress]) => {
    recommendations.push({
      id: `weak_${topicId}`,
      icon: '📚',
      title: `重点复习${getTopicName(topicId)}`,
      description: `当前掌握度${progress.completionPercentage}%，建议加强学习`,
      action: '开始复习',
      priority: 'high'
    })
  })
  
  // 根据练习正确率生成建议
  if (learningStore.correctRate < 70) {
    recommendations.push({
      id: 'practice',
      icon: '🎯',
      title: '加强练习训练',
      description: '当前正确率较低，建议多做练习题巩固知识点',
      action: '专项练习',
      priority: 'medium'
    })
  }
  
  // 通用建议
  if (recommendations.length < 3) {
    recommendations.push({
      id: 'exam',
      icon: '📊',
      title: '参加模拟考试',
      description: '检验学习成果，熟悉考试节奏和时间分配',
      action: '模拟考试',
      priority: 'medium'
    })
  }
  
  return recommendations
})

const progressData = computed(() => {
  // 生成模拟进度数据（实际项目中应该从历史记录中获取）
  return [
    { date: '1月15日', progress: Math.min(60, learningStore.overallProgress) },
    { date: '1月16日', progress: Math.min(75, learningStore.overallProgress) },
    { date: '1月17日', progress: Math.min(65, learningStore.overallProgress) },
    { date: '1月18日', progress: Math.min(80, learningStore.overallProgress) },
    { date: '1月19日', progress: Math.min(78, learningStore.overallProgress) },
    { date: '1月20日', progress: Math.min(85, learningStore.overallProgress) },
    { date: '1月21日', progress: learningStore.overallProgress }
  ]
})

const learningGoals = ref([
  {
    id: 1,
    title: '完成权利关系学习',
    description: '掌握意思表示、代理制度、物权变动等核心概念',
    deadline: '1月31日前',
    progress: Math.min(65, learningStore.overallProgress)
  },
  {
    id: 2,
    title: '宅建业法专项突破',
    description: '重点掌握重要事项说明、媒介契约等高频考点',
    deadline: '2月15日前',
    progress: Math.min(80, learningStore.overallProgress)
  },
  {
    id: 3,
    title: '模拟考试达到80分',
    description: '通过系统练习提升考试成绩',
    deadline: '2月28日前',
    progress: Math.min(45, learningStore.overallProgress)
  }
])

// 方法
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuOpen.value = false
  }
}

const switchOverview = (overviewId) => {
  activeOverview.value = overviewId
}

const switchPeriod = (periodId) => {
  activePeriod.value = periodId
}

const getTrendClass = (value) => {
  if (value > 0) return 'positive'
  if (value < 0) return 'negative'
  return 'neutral'
}

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

const getScoreClass = (score) => {
  if (score.includes('%')) {
    const percent = parseInt(score)
    if (percent >= 80) return 'excellent'
    if (percent >= 60) return 'good'
    return 'average'
  } else {
    const points = parseInt(score)
    if (points >= 80) return 'excellent'
    if (points >= 70) return 'good'
    return 'average'
  }
}

const formatTime = (time) => {
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

const formatChartLabel = (date) => {
  return date.split('月')[1].replace('日', '')
}

const formatStudyTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}h${minutes}m`
  }
  return `${minutes}m`
}

const getTopicName = (topicId) => {
  return topicNames[topicId] || topicId
}

const getTopicDomain = (topicId) => {
  return topicDomains[topicId] || '其他'
}

const calculateDomainProgress = (domainId) => {
  const domainTopics = Object.entries(learningStore.progress).filter(([topicId, _]) => 
    getTopicDomain(topicId) === domainStats.find(d => d.id === domainId)?.name
  )
  
  if (domainTopics.length === 0) return 0
  
  const totalProgress = domainTopics.reduce((sum, [_, progress]) => 
    sum + progress.completionPercentage, 0
  )
  
  return Math.round(totalProgress / domainTopics.length)
}

const calculateStreakDays = () => {
  // 简单的连续学习天数计算（实际项目中应该基于学习记录）
  return Math.min(18, Math.floor(learningStore.totalStudyTime / 3600 / 2))
}

const continueLearning = () => {
  const lastActivity = recentActivities.value[0]
  alert(`继续学习: ${lastActivity.title}`)
}

const reviewWeakPoints = () => {
  const weakPoints = Object.entries(learningStore.progress)
    .filter(([_, progress]) => progress.completionPercentage < 70)
  
  if (weakPoints.length > 0) {
    const [topicId] = weakPoints[0]
    alert(`开始复习弱点: ${getTopicName(topicId)}`)
  } else {
    alert('恭喜！您目前没有明显的弱点需要复习')
  }
}

const loadMoreActivities = () => {
  alert('加载更多学习活动...')
}

const followRecommendation = (recommendation) => {
  alert(`执行建议: ${recommendation.title}`)
}

const editGoals = () => {
  alert('编辑学习目标...')
}

const startLearningSession = () => {
  alert('开始新的学习会话...')
}

// 生命周期
onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 确保学习数据已加载
  learningStore.loadFromStorage()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
/* CSS 变量定义 - 与其他模块保持一致 */
:root {
  --primary: #2a7960;
  --primary-dark: #205e4a;
  --primary-light: #e8f5f0;
  --bg: #f6f9fc;
  --card-bg: #ffffff;
  --text: #0b2130;
  --muted: #64748b;
  --border: #e2e8f0;
  --radius: 12px;
  --gap: 20px;
  --max-width: 1200px;
  --container-padding: 20px;
  
  /* 新增仪表盘相关变量 */
  --excellent: #10b981;
  --good: #3b82f6;
  --average: #f59e0b;
  --poor: #ef4444;
  --positive: #10b981;
  --negative: #ef4444;
  --neutral: #6b7280;
}
</style>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", "Noto Sans JP", "Noto Sans", Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ========= 布局容器 ========= */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ========= 顶部导航栏 ========= */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--primary-dark);
  text-decoration: none;
  font-size: 18px;
}

.logo .mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-links a:hover, .nav-links a.active {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.nav-links a.active {
  font-weight: 700;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--muted);
  padding: 8px;
  border-radius: 8px;
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 20px;
  padding: 40px;
  margin: 30px 0;
  text-align: center;
}

.header-content h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.header-content p {
  font-size: 18px;
  color: var(--muted);
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
}

/* ========= 快速导航 ========= */
.quick-nav {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin: 40px 0;
}

.nav-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.overview-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.overview-btn {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.overview-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.overview-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
}

.overview-icon {
  font-size: 24px;
}

.overview-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.overview-desc {
  font-size: 12px;
  color: var(--muted);
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-btn {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.action-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.action-icon {
  font-size: 20px;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 40px 0;
  flex: 1;
}

/* ========= 统计卡片网格 ========= */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: var(--card-bg);
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(12, 35, 50, 0.12);
}

.stat-card.primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.stat-card.primary .stat-value,
.stat-card.primary .stat-label {
  color: white;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 32px;
  opacity: 0.8;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.stat-card.primary .stat-value {
  color: white;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
  font-weight: 500;
}

.stat-card.primary .stat-label {
  color: rgba(255, 255, 255, 0.8);
}

.progress-ring {
  position: absolute;
  top: 20px;
  right: 20px;
}

.progress-ring circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.3s ease;
}

.stat-trend {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
}

.stat-trend.positive {
  background: color-mix(in srgb, var(--positive) 20%, transparent);
  color: var(--positive);
}

.stat-trend.negative {
  background: color-mix(in srgb, var(--negative) 20%, transparent);
  color: var(--negative);
}

.stat-trend.neutral {
  background: color-mix(in srgb, var(--neutral) 20%, transparent);
  color: var(--neutral);
}

.stat-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  background: var(--primary-light);
  color: var(--primary-dark);
}

/* ========= 仪表盘网格布局 ========= */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 24px;
  margin-bottom: 40px;
}

.chart-section {
  grid-column: 1;
  grid-row: 1;
}

.knowledge-section {
  grid-column: 2;
  grid-row: 1;
}

.domains-section {
  grid-column: 1;
  grid-row: 2;
}

.recent-activity {
  grid-column: 2;
  grid-row: 2;
}

.recommendation-section {
  grid-column: 1;
  grid-row: 3;
}

.goals-section {
  grid-column: 2;
  grid-row: 3;
}

/* ========= 通用区域样式 ========= */
.chart-section,
.knowledge-section,
.domains-section,
.recent-activity,
.recommendation-section,
.goals-section {
  background: var(--card-bg);
  padding: 24px;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
}

.view-all {
  font-size: 14px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.view-all:hover {
  text-decoration: underline;
}

.time-filter {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--muted);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn.active,
.filter-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* ========= 图表区域 ========= */
.chart-container {
  padding: 20px 0;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 12px;
  height: 160px;
  margin-bottom: 20px;
  padding: 0 10px;
}

.bar {
  flex: 1;
  background: linear-gradient(to top, var(--primary), var(--primary-dark));
  border-radius: 4px 4px 0 0;
  min-height: 20px;
  transition: height 0.3s ease;
  cursor: pointer;
  position: relative;
}

.bar:hover {
  opacity: 0.8;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
  padding: 0 10px;
}

/* ========= 知识点掌握情况 ========= */
.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.knowledge-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.knowledge-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.knowledge-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.knowledge-domain {
  font-size: 12px;
  color: var(--muted);
  background: var(--bg);
  padding: 2px 6px;
  border-radius: 8px;
}

.knowledge-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-fill.excellent {
  background: var(--excellent);
}

.progress-fill.good {
  background: var(--good);
}

.progress-fill.average {
  background: var(--average);
}

.progress-text {
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
  min-width: 30px;
  text-align: right;
}

/* ========= 五大分野掌握度 ========= */
.domains-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.domain-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
  transition: all 0.2s ease;
}

.domain-card:hover {
  background: var(--primary-light);
}

.domain-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  background: var(--primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.domain-info {
  flex: 1;
}

.domain-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 8px;
}

.domain-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.domain-progress .progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.progress-label {
  color: var(--muted);
}

.progress-value {
  color: var(--primary);
  font-weight: 600;
}

.domain-actions {
  display: flex;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-light);
}

.btn-outline {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: var(--bg);
  border-color: var(--muted);
}

/* ========= 最近活动 ========= */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
  transition: all 0.2s ease;
}

.activity-item:hover {
  background: var(--primary-light);
}

.activity-icon {
  font-size: 16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.study {
  background: color-mix(in srgb, var(--primary) 20%, transparent);
  color: var(--primary);
}

.activity-icon.practice {
  background: color-mix(in srgb, var(--good) 20%, transparent);
  color: var(--good);
}

.activity-icon.exam {
  background: color-mix(in srgb, var(--average) 20%, transparent);
  color: var(--average);
}

.activity-icon.video {
  background: color-mix(in srgb, #8b5cf6 20%, transparent);
  color: #8b5cf6;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
}

.activity-desc {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 4px;
}

.activity-time {
  font-size: 11px;
  color: var(--muted);
}

.activity-meta {
  display: flex;
  align-items: center;
}

.score {
  font-size: 14px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
}

.score.excellent {
  background: color-mix(in srgb, var(--excellent) 20%, transparent);
  color: var(--excellent);
}

.score.good {
  background: color-mix(in srgb, var(--good) 20%, transparent);
  color: var(--good);
}

.score.average {
  background: color-mix(in srgb, var(--average) 20%, transparent);
  color: var(--average);
}

/* ========= 个性化建议 ========= */
.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recommendation-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
  transition: all 0.2s ease;
}

.recommendation-item.high {
  border-left: 4px solid var(--primary);
}

.recommendation-item.medium {
  border-left: 4px solid var(--average);
}

.recommendation-item.low {
  border-left: 4px solid var(--muted);
}

.recommendation-item:hover {
  background: var(--primary-light);
}

.rec-icon {
  font-size: 20px;
  margin-top: 2px;
  flex-shrink: 0;
}

.rec-content {
  flex: 1;
}

.rec-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 6px;
}

.rec-content p {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
  margin-bottom: 10px;
}

.rec-actions {
  display: flex;
}

/* ========= 学习目标 ========= */
.goals-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.goal-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.goal-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.goal-deadline {
  font-size: 12px;
  color: var(--muted);
  background: var(--primary-light);
  padding: 2px 6px;
  border-radius: 8px;
}

.goal-desc {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
  margin: 0;
}

.goal-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ========= 底部行动号召 ========= */
.cta-section {
  text-align: center;
  padding: 40px 0;
  margin: 60px 0 40px;
}

.cta-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.cta-section p {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ========= 页脚 ========= */
.footer {
  text-align: center;
  padding: 40px 0;
  margin-top: 60px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 14px;
  width: 100%;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .chart-section,
  .knowledge-section,
  .domains-section,
  .recent-activity,
  .recommendation-section,
  .goals-section {
    grid-column: 1;
  }
  
  .chart-section { grid-row: 1; }
  .knowledge-section { grid-row: 2; }
  .domains-section { grid-row: 3; }
  .recent-activity { grid-row: 4; }
  .recommendation-section { grid-row: 5; }
  .goals-section { grid-row: 6; }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    margin: 0 20px;
    z-index: 100;
  }
  
  .nav-links.mobile-show {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .page-header {
    padding: 30px 20px;
  }
  
  .header-content h1 {
    font-size: 28px;
  }
  
  .header-content p {
    font-size: 16px;
  }
  
  .header-stats {
    gap: 20px;
  }
  
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .overview-buttons {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 20px 16px;
  }
  
  .header-content h1 {
    font-size: 24px;
  }
  
  .header-content p {
    font-size: 16px;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .time-filter {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-btn {
    flex: 1;
    text-align: center;
  }
  
  .domain-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .domain-info {
    width: 100%;
  }
  
  .activity-item {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .recommendation-item {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .goal-header {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>