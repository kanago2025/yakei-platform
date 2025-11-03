<!-- src/views/Exam.vue -->
<template>
  <div class="exam">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>真题模拟</h1>
          <p>历年真题与模拟考试，真实考试环境模拟，全面检验学习成果，提升应试能力</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>VIP会员可享受无限制考试和详细分析报告</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ examStats.totalExams }}</span>
              <span class="stat-label">模拟考试</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ examStats.averageScore }}分</span>
              <span class="stat-label">平均成绩</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ examStats.passedExams }}/{{ examStats.totalExams }}</span>
              <span class="stat-label">通过考试</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-section">
          <h3>考试类型</h3>
          <div class="type-buttons">
            <button 
              v-for="type in examTypes" 
              :key="type.id"
              class="type-btn" 
              :class="{ active: activeType === type.id }"
              @click="switchType(type.id)"
            >
              <span class="type-icon">{{ type.icon }}</span>
              <span class="type-name">{{ type.name }}</span>
              <span class="type-count">{{ getTypeCount(type.id) }}个考试</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>考试工具</h3>
          <div class="tool-buttons">
            <button class="tool-btn" @click="startQuickExam" :disabled="!userStore.isLoggedIn">
              <span class="tool-icon">⚡</span>
              <span>快速测试</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <button class="tool-btn" @click="showExamHistory" :disabled="!userStore.isLoggedIn">
              <span class="tool-icon">📊</span>
              <span>考试记录</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <router-link to="/practice" class="tool-btn">
              <span class="tool-icon">🎯</span>
              <span>强化练习</span>
            </router-link>
            <router-link to="/video" class="tool-btn">
              <span class="tool-icon">🎥</span>
              <span>视频复习</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 考试列表 -->
        <section class="exam-section">
          <div class="section-header">
            <h2>{{ getActiveTypeName() }}考试</h2>
            <p>选择适合您的考试类型，全面提升应试能力</p>
            <div class="section-progress">
              <div class="progress-info">
                <span>完成进度</span>
                <span>{{ getTypeProgress(activeType) }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getTypeProgress(activeType) + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="exam-grid">
            <div 
              v-for="exam in filteredExams" 
              :key="exam.id"
              class="exam-card"
              :class="{
                'new': exam.isNew,
                'recommended': exam.isRecommended,
                'completed': exam.userScore !== null,
                'premium-only': exam.requiredSubscription === 'premium' && !userStore.isPremium
              }"
            >
              <!-- VIP专属标识 -->
              <div v-if="exam.requiredSubscription === 'premium' && !userStore.isPremium" class="premium-overlay">
                <div class="premium-lock">
                  <span class="lock-icon">🔒</span>
                  <span>VIP专属</span>
                </div>
              </div>
              
              <div class="card-header">
                <div class="card-badge" :class="exam.difficultyClass">{{ exam.badgeText }}</div>
                <button class="bookmark-btn" @click="toggleBookmark(exam.id)">
                  <span>{{ exam.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>
              
              <div class="card-icon">{{ exam.icon }}</div>
              <h3 class="card-title">{{ exam.title }}</h3>
              <p class="card-desc">{{ exam.description }}</p>
              
              <div class="card-meta">
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ exam.duration }}分钟
                </span>
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ exam.questionCount }}题
                </span>
                <span class="meta-item">
                  <span class="meta-icon">🎯</span>
                  {{ exam.difficulty }}
                </span>
              </div>
              
              <div class="card-progress" v-if="exam.userScore !== null">
                <div class="progress-text">
                  <span>您的成绩</span>
                  <span :class="getScoreClass(exam.userScore)">{{ exam.userScore }}分</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: (exam.userScore / exam.totalScore * 100) + '%' }"></div>
                </div>
                <div class="progress-status">
                  <span class="status" :class="exam.userScore >= exam.passingScore ? 'passed' : 'failed'">
                    {{ exam.userScore >= exam.passingScore ? '通过' : '未通过' }}
                  </span>
                  <span class="attempts">尝试 {{ exam.attemptCount }} 次</span>
                </div>
              </div>
              
              <div class="card-actions">
                <button 
                  v-if="exam.userScore === null && canTakeExam(exam)"
                  class="btn btn-primary"
                  @click="startExam(exam)"
                  :disabled="!userStore.isLoggedIn"
                >
                  {{ !userStore.isLoggedIn ? '需登录' : '开始考试' }}
                </button>
                <button 
                  v-else-if="exam.userScore !== null"
                  class="btn btn-secondary"
                  @click="reviewExam(exam)"
                >
                  查看详情
                </button>
                <button 
                  v-else
                  class="btn btn-upgrade"
                  @click="upgradeToPremium"
                >
                  升级VIP
                </button>
                
                <button 
                  class="btn btn-outline"
                  @click="retakeExam(exam)"
                  :disabled="!canTakeExam(exam) || !userStore.isLoggedIn"
                >
                  重新考试
                </button>
              </div>
            </div>
          </div>

          <div v-if="filteredExams.length === 0" class="no-exams">
            <div class="no-exams-icon">📝</div>
            <h3>暂无相关考试</h3>
            <p>请尝试调整筛选条件或选择其他考试类型</p>
          </div>
        </section>

        <!-- 考试统计 -->
        <section class="stats-section" v-if="userStore.isLoggedIn">
          <div class="section-header">
            <h2>考试统计</h2>
            <p>全面了解您的学习进度和考试表现</p>
          </div>

          <div class="stats-grid">
            <div class="stats-card">
              <h3>总体统计</h3>
              <div class="stats-content">
                <div class="stat-item">
                  <div class="stat-value">{{ examStats.totalAttempts }}</div>
                  <div class="stat-label">总考试次数</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ examStats.averageScore }}分</div>
                  <div class="stat-label">平均成绩</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ examStats.bestScore }}分</div>
                  <div class="stat-label">最高成绩</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ examStats.totalTime }}h</div>
                  <div class="stat-label">总学习时间</div>
                </div>
              </div>
            </div>

            <div class="stats-card">
              <h3>分野掌握度</h3>
              <div class="domain-progress">
                <div 
                  v-for="domain in domainStats" 
                  :key="domain.id"
                  class="domain-item"
                >
                  <div class="domain-info">
                    <span class="domain-name">{{ domain.name }}</span>
                    <span class="domain-score">{{ domain.score }}%</span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: domain.score + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 最近考试记录 -->
        <section class="recent-section" v-if="recentExams.length > 0 && userStore.isLoggedIn">
          <div class="section-header">
            <h2>最近考试记录</h2>
            <p>查看您最近的考试表现和学习进度</p>
          </div>

          <div class="recent-grid">
            <div 
              v-for="exam in recentExams" 
              :key="exam.id"
              class="recent-card"
            >
              <div class="card-header">
                <h4 class="card-title">{{ exam.title }}</h4>
                <span class="exam-date">{{ formatDate(exam.date) }}</span>
              </div>
              <div class="card-result">
                <div class="score-display">
                  <span class="score" :class="getScoreClass(exam.score)">{{ exam.score }}分</span>
                  <span class="status" :class="exam.score >= exam.passingScore ? 'passed' : 'failed'">
                    {{ exam.score >= exam.passingScore ? '通过' : '未通过' }}
                  </span>
                </div>
                <div class="exam-details">
                  <span class="detail-item">用时: {{ exam.timeUsed }}分钟</span>
                  <span class="detail-item">正确: {{ exam.correctCount }}/{{ exam.totalCount }}</span>
                </div>
              </div>
              <div class="card-actions">
                <button class="btn btn-outline" @click="reviewExam(exam)">查看详情</button>
                <button class="btn btn-outline" @click="retakeExam(exam)">重新考试</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 未登录提示 -->
        <section v-if="!userStore.isLoggedIn" class="login-prompt">
          <div class="prompt-content">
            <h3>登录以保存考试记录</h3>
            <p>登录后可以保存您的考试进度、查看详细分析报告，并获得个性化学习建议</p>
            <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
          </div>
        </section>

        <!-- 免费用户升级提示 -->
        <section v-if="userStore.isLoggedIn && !userStore.isPremium" class="upgrade-prompt">
          <div class="prompt-content">
            <h3>升级VIP会员，解锁更多考试功能</h3>
            <p>VIP会员可享受无限制考试、高级模拟考试、详细分析报告等高级功能</p>
            <button class="btn btn-premium" @click="upgradeToPremium">
              ⭐ 升级VIP会员
            </button>
          </div>
        </section>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>真实考试环境模拟，全面提升应试能力</h2>
          <p>通过历年真题和模拟考试，熟悉考试形式，掌握时间分配，稳步提升考试成绩</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="startQuickExam" :disabled="!userStore.isLoggedIn">
              {{ userStore.isLoggedIn ? '开始快速测试' : '请先登录' }}
            </button>
            <router-link to="/practice" class="btn btn-secondary">强化练习</router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const activeType = ref('all')
const selectedYear = ref('all')
const selectedDifficulty = ref('all')

// 考试类型数据
const examTypes = [
  { 
    id: 'all', 
    name: '全部考试', 
    icon: '📚',
    description: '所有类型的考试'
  },
  { 
    id: 'simulation', 
    name: '模拟考试', 
    icon: '🎯',
    description: '最新考纲模拟'
  },
  { 
    id: 'past', 
    name: '历年真题', 
    icon: '📅',
    description: '历年实际考题'
  },
  { 
    id: 'chapter', 
    name: '章节测试', 
    icon: '📖',
    description: '按知识点测试'
  },
  { 
    id: 'timed', 
    name: '限时挑战', 
    icon: '⏱️',
    description: '时间压力测试'
  }
]

// 考试数据
const exams = [
  {
    id: 'exam-2024-1',
    title: '2024年模拟考试 #1',
    description: '基于最新考纲的全真模拟考试，涵盖所有考试领域',
    type: 'simulation',
    year: 2024,
    duration: 120,
    questionCount: 50,
    difficulty: '中等',
    difficultyClass: 'medium',
    badgeText: '模拟',
    icon: '1',
    totalScore: 100,
    passingScore: 70,
    isNew: true,
    isRecommended: true,
    requiredSubscription: 'free',
    userScore: 78,
    attemptCount: 1,
    bookmarked: true
  },
  {
    id: 'exam-2023-real',
    title: '2023年宅建士真题',
    description: '2023年实际考试题目，真实考试体验',
    type: 'past',
    year: 2023,
    duration: 120,
    questionCount: 50,
    difficulty: '中等',
    difficultyClass: 'medium',
    badgeText: '真题',
    icon: '2',
    totalScore: 100,
    passingScore: 70,
    isNew: false,
    isRecommended: true,
    requiredSubscription: 'free',
    userScore: 65,
    attemptCount: 2,
    bookmarked: false
  },
  {
    id: 'exam-2022-real',
    title: '2022年宅建士真题',
    description: '2022年实际考试题目，历年真题练习',
    type: 'past',
    year: 2022,
    duration: 120,
    questionCount: 50,
    difficulty: '中等',
    difficultyClass: 'medium',
    badgeText: '真题',
    icon: '3',
    totalScore: 100,
    passingScore: 70,
    isNew: false,
    isRecommended: false,
    requiredSubscription: 'free',
    userScore: null,
    attemptCount: 0,
    bookmarked: false
  },
  {
    id: 'chapter-rights',
    title: '权利关系章节测试',
    description: '权利关系领域专项测试，重点考察民法相关知识',
    type: 'chapter',
    year: 2024,
    duration: 60,
    questionCount: 25,
    difficulty: '简单',
    difficultyClass: 'easy',
    badgeText: '章节',
    icon: '4',
    totalScore: 100,
    passingScore: 60,
    isNew: true,
    isRecommended: false,
    requiredSubscription: 'free',
    userScore: 85,
    attemptCount: 1,
    bookmarked: true
  },
  {
    id: 'timed-challenge-1',
    title: '限时挑战 #1',
    description: '高强度时间压力测试，提升答题速度',
    type: 'timed',
    year: 2024,
    duration: 90,
    questionCount: 50,
    difficulty: '困难',
    difficultyClass: 'hard',
    badgeText: '限时',
    icon: '5',
    totalScore: 100,
    passingScore: 70,
    isNew: false,
    isRecommended: true,
    requiredSubscription: 'free',
    userScore: 72,
    attemptCount: 1,
    bookmarked: false
  },
  {
    id: 'vip-exam-1',
    title: 'VIP专属模拟 #1',
    description: '高难度模拟考试，包含最新题型和深度分析',
    type: 'simulation',
    year: 2024,
    duration: 120,
    questionCount: 60,
    difficulty: '困难',
    difficultyClass: 'hard',
    badgeText: 'VIP',
    icon: '⭐',
    totalScore: 100,
    passingScore: 75,
    isNew: true,
    isRecommended: true,
    requiredSubscription: 'premium',
    userScore: null,
    attemptCount: 0,
    bookmarked: false
  }
]

const examStats = {
  totalExams: 12,
  totalAttempts: 25,
  averageScore: 73,
  bestScore: 92,
  passedExams: 8,
  totalTime: 36
}

const domainStats = [
  { id: 'rights', name: '权利关系', score: 78 },
  { id: 'business', name: '宅建业法', score: 85 },
  { id: 'regulations', name: '法令制限', score: 65 },
  { id: 'tax', name: '税・価格', score: 72 },
  { id: 'exempt', name: '五问免除', score: 88 }
]

const recentExams = [
  {
    id: 'exam-2024-1',
    title: '2024年模拟考试 #1',
    date: '2024-01-15',
    score: 78,
    passingScore: 70,
    timeUsed: 115,
    correctCount: 39,
    totalCount: 50
  },
  {
    id: 'chapter-rights',
    title: '权利关系章节测试',
    date: '2024-01-12',
    score: 85,
    passingScore: 60,
    timeUsed: 55,
    correctCount: 21,
    totalCount: 25
  },
  {
    id: 'exam-2023-real',
    title: '2023年宅建士真题',
    date: '2024-01-10',
    score: 65,
    passingScore: 70,
    timeUsed: 118,
    correctCount: 32,
    totalCount: 50
  }
]

// 计算属性
const availableYears = computed(() => {
  const years = [...new Set(exams.map(exam => exam.year))]
  return years.sort((a, b) => b - a)
})

const filteredExams = computed(() => {
  let filtered = exams

  // 按类型筛选
  if (activeType.value !== 'all') {
    filtered = filtered.filter(exam => exam.type === activeType.value)
  }

  // 按年份筛选
  if (selectedYear.value !== 'all') {
    filtered = filtered.filter(exam => exam.year === parseInt(selectedYear.value))
  }

  // 按难度筛选
  if (selectedDifficulty.value !== 'all') {
    filtered = filtered.filter(exam => {
      const difficultyMap = {
        'easy': '简单',
        'medium': '中等',
        'hard': '困难'
      }
      return exam.difficulty === difficultyMap[selectedDifficulty.value]
    })
  }

  return filtered
})

// 方法
const getTypeCount = (typeId) => {
  if (typeId === 'all') return exams.length
  return exams.filter(exam => exam.type === typeId).length
}

const getTypeProgress = (typeId) => {
  const typeExams = typeId === 'all' ? exams : exams.filter(exam => exam.type === typeId)
  if (typeExams.length === 0) return 0
  
  const completed = typeExams.filter(exam => exam.userScore !== null).length
  return Math.round((completed / typeExams.length) * 100)
}

const getActiveTypeName = () => {
  const type = examTypes.find(t => t.id === activeType.value)
  return type ? type.name : '全部'
}

const getScoreClass = (score) => {
  if (score >= 80) return 'excellent'
  if (score >= 70) return 'good'
  if (score >= 60) return 'average'
  return 'poor'
}

const canTakeExam = (exam) => {
  if (!userStore.isLoggedIn) return false
  if (exam.requiredSubscription === 'premium' && !userStore.isPremium) return false
  return true
}

const toggleBookmark = (examId) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以使用收藏功能')
    openLoginDialog()
    return
  }
  
  const exam = exams.find(e => e.id === examId)
  if (exam) {
    exam.bookmarked = !exam.bookmarked
    saveBookmarksToLocalStorage()
  }
}

const startExam = (exam) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始考试')
    openLoginDialog()
    return
  }
  
  if (!canTakeExam(exam)) {
    alert('您没有权限参加此考试，请升级VIP会员')
    return
  }
  
  console.log('开始考试:', exam.title)
  alert(`开始考试: ${exam.title}`)
}

const reviewExam = (exam) => {
  console.log('查看考试详情:', exam.title)
  alert(`查看考试详情: ${exam.title}`)
}

const retakeExam = (exam) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以重新考试')
    openLoginDialog()
    return
  }
  
  if (!canTakeExam(exam)) {
    alert('您没有权限参加此考试，请升级VIP会员')
    return
  }
  
  console.log('重新考试:', exam.title)
  if (confirm(`确定要重新参加"${exam.title}"吗？`)) {
    startExam(exam)
  }
}

const startQuickExam = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始快速测试')
    openLoginDialog()
    return
  }
  
  const quickExam = {
    id: 'quick-test',
    title: '快速能力测试',
    description: '10道题目快速评估当前水平',
    duration: 20,
    questionCount: 10
  }
  startExam(quickExam)
}

const showExamHistory = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以查看考试记录')
    openLoginDialog()
    return
  }
  
  console.log('显示考试历史')
}

const upgradeToPremium = () => {
  alert('升级VIP会员，享受更多专属功能')
}

const switchType = (typeId) => {
  activeType.value = typeId
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

const saveBookmarksToLocalStorage = () => {
  const bookmarks = exams
    .filter(exam => exam.bookmarked)
    .map(exam => exam.id)
  
  localStorage.setItem('examBookmarks', JSON.stringify(bookmarks))
}

const loadBookmarksFromLocalStorage = () => {
  const savedBookmarks = localStorage.getItem('examBookmarks')
  if (savedBookmarks) {
    const bookmarks = JSON.parse(savedBookmarks)
    exams.forEach(exam => {
      exam.bookmarked = bookmarks.includes(exam.id)
    })
  }
}

// 打开登录弹窗 - 使用全局事件
const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  loadBookmarksFromLocalStorage()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.exam {
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
.page-header,
.quick-nav,
.main-content,
.cta-section {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  width: 100%;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
  max-width: 700px;
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

.badge-icon {
  font-size: 16px;
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
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 快速导航 ========= */
.quick-nav {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
}

.nav-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.type-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.type-btn {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: none;
  font-family: inherit;
}

.type-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.type-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
}

.type-icon {
  font-size: 24px;
}

.type-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.type-count {
  font-size: 12px;
  color: var(--muted);
}

.tool-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.tool-btn {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  border: none;
  font-family: inherit;
  position: relative;
}

.tool-btn:hover:not(:disabled) {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.tool-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tool-hint {
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--primary);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
}

.tool-icon {
  font-size: 20px;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 3rem 0;
  flex: 1;
  width: 100%;
}

/* ========= 区域头部 ========= */
.section-header {
  margin-bottom: 2rem;
  width: 100%;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--muted);
  margin-bottom: 1.5rem;
  max-width: 600px;
  line-height: 1.6;
}

.section-progress {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1rem;
  max-width: 300px;
  box-shadow: var(--shadow-sm);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--muted);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* ========= 考试网格 ========= */
.exam-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
}

.exam-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
}

.exam-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.exam-card.premium-only {
  opacity: 0.7;
}

.premium-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.premium-lock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--premium);
  font-weight: 600;
}

.lock-icon {
  font-size: 24px;
}

.exam-card.new::before {
  content: "新";
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  z-index: 1;
}

.exam-card.recommended {
  border-color: var(--primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.card-badge.easy {
  background: var(--primary-light);
  color: var(--primary);
}

.card-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.card-badge.hard {
  background: #fee2e2;
  color: #991b1b;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s ease;
  padding: 4px;
  border-radius: 4px;
}

.bookmark-btn:hover {
  color: var(--primary);
  background: var(--primary-light);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--primary);
  font-size: 18px;
  font-weight: 600;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
  line-height: 1.4;
}

.card-desc {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--muted);
}

.meta-icon {
  font-size: 14px;
}

/* ========= 考试进度 ========= */
.card-progress {
  background: var(--bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border);
  margin-bottom: 20px;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--muted);
}

.progress-text .excellent { color: var(--excellent); }
.progress-text .good { color: var(--good); }
.progress-text .average { color: var(--average); }
.progress-text .poor { color: var(--poor); }

.progress-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.status {
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.status.passed {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.status.failed {
  background: #fee2e2;
  color: #dc2626;
}

.attempts {
  color: var(--muted);
}

/* ========= 卡片操作 ========= */
.card-actions {
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--bg);
  border-color: var(--muted);
}

.btn-upgrade {
  background: var(--premium);
  color: white;
}

.btn-upgrade:hover {
  background: #d97706;
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

/* ========= 统计区域 ========= */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
}

.stats-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.stats-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.stats-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stats-content .stat-item {
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stats-content .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stats-content .stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 领域进度 ========= */
.domain-progress {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.domain-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.domain-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.domain-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
}

.domain-score {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
}

/* ========= 最近考试 ========= */
.recent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
}

.recent-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.recent-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.recent-card .card-title {
  font-size: 1rem;
  margin: 0;
  flex: 1;
}

.exam-date {
  font-size: 0.75rem;
  color: var(--muted);
  white-space: nowrap;
  margin-left: 0.75rem;
}

.card-result {
  margin-bottom: 1rem;
}

.score-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.score-display .score {
  font-size: 1.25rem;
  font-weight: 700;
}

.score-display .score.excellent { color: var(--excellent); }
.score-display .score.good { color: var(--good); }
.score-display .score.average { color: var(--average); }
.score-display .score.poor { color: var(--poor); }

.exam-details {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--muted);
}

/* ========= 无考试状态 ========= */
.no-exams {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--muted);
  width: 100%;
}

.no-exams-icon {
  font-size: 4rem;
  margin-bottom: 1.25rem;
  opacity: 0.5;
}

.no-exams h3 {
  font-size: 1.25rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.no-exams p {
  font-size: 1rem;
}

/* ========= 登录提示 ========= */
.login-prompt, .upgrade-prompt {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2.5rem;
  text-align: center;
  margin: 2.5rem 0;
  border: 1px solid var(--border);
  width: 100%;
}

.upgrade-prompt {
  border: 2px solid #f59e0b;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.prompt-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

.prompt-content p {
  color: var(--muted);
  margin-bottom: 1.25rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* ========= 底部行动号召 ========= */
.cta-section {
  text-align: center;
  padding: 2.5rem 0;
  margin: 3rem 0 2.5rem;
  width: 100%;
}

.cta-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .exam-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .recent-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .container {
    padding: 0 var(--container-padding, 1.5rem);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .header-content p {
    font-size: 1rem;
  }
  
  .exam-grid {
    grid-template-columns: 1fr;
  }
  
  .type-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .stats-content {
    grid-template-columns: 1fr;
  }
  
  .recent-grid {
    grid-template-columns: 1fr;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .container {
    padding: 0 var(--container-padding, 1rem);
  }
}

@media (max-width: 480px) {
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .exam-details {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .score-display {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>