<template>
  <div class="exam">
    <div class="container">
      <!-- 顶部导航栏 - 集成用户状态 -->
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
          <router-link to="/exam" class="active">真题模拟</router-link>
          <router-link to="/community">学习社群</router-link>
          <router-link to="/dashboard">学习进度</router-link>
          
          <!-- 用户状态显示 -->
          <div class="user-status" v-if="userStore.isLoggedIn">
            <span class="user-avatar">👤</span>
            <span class="user-info">
              <span class="user-name">{{ userStore.userName }}</span>
              <span class="user-tier">{{ userStore.subscriptionTier === 'premium' ? 'VIP会员' : '免费会员' }}</span>
            </span>
          </div>
          <router-link v-else to="/login" class="login-link">
            <span class="user-avatar">👤</span>
            <span>访客登录</span>
          </router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </header>

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
          <div class="exam-type-buttons">
            <button 
              v-for="type in examTypes" 
              :key="type.id"
              class="type-btn" 
              :class="{ active: activeType === type.id }"
              @click="switchType(type.id)"
            >
              <span class="type-icon">{{ type.icon }}</span>
              <span class="type-name">{{ type.name }}</span>
              <span class="type-desc">{{ type.description }}</span>
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
        <section class="exam-list-section">
          <div class="section-header">
            <h2>{{ getActiveTypeName() }}考试</h2>
            <div class="filter-options">
              <select v-model="selectedYear" class="filter-select">
                <option value="all">全部年份</option>
                <option v-for="year in availableYears" :key="year" :value="year">
                  {{ year }}年
                </option>
              </select>
              <select v-model="selectedDifficulty" class="filter-select">
                <option value="all">全部难度</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
          </div>

          <div class="exam-cards">
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
                <div class="exam-badges">
                  <span v-if="exam.isNew" class="badge new">新</span>
                  <span v-if="exam.isRecommended" class="badge recommended">推荐</span>
                  <span class="badge type" :class="exam.type">{{ getTypeBadgeText(exam.type) }}</span>
                  <span v-if="exam.requiredSubscription === 'premium'" class="badge premium">VIP</span>
                </div>
                <div class="exam-actions">
                  <button 
                    class="bookmark-btn"
                    :class="{ bookmarked: exam.bookmarked }"
                    @click="toggleBookmark(exam.id)"
                    :disabled="!userStore.isLoggedIn"
                  >
                    {{ exam.bookmarked ? '⭐' : '☆' }}
                  </button>
                </div>
              </div>

              <div class="card-content">
                <h3 class="exam-title">{{ exam.title }}</h3>
                <p class="exam-description">{{ exam.description }}</p>
                
                <div class="exam-meta">
                  <div class="meta-item">
                    <span class="meta-icon">⏱️</span>
                    <span class="meta-text">{{ exam.duration }}分钟</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">📝</span>
                    <span class="meta-text">{{ exam.questionCount }}题</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">🎯</span>
                    <span class="meta-text">{{ exam.difficulty }}</span>
                  </div>
                </div>

                <div class="exam-progress" v-if="exam.userScore !== null">
                  <div class="progress-info">
                    <span class="progress-label">您的成绩</span>
                    <span class="progress-score" :class="getScoreClass(exam.userScore)">
                      {{ exam.userScore }}分
                    </span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: (exam.userScore / exam.totalScore * 100) + '%' }"
                    ></div>
                  </div>
                  <div class="progress-status">
                    <span class="status" :class="exam.userScore >= exam.passingScore ? 'passed' : 'failed'">
                      {{ exam.userScore >= exam.passingScore ? '通过' : '未通过' }}
                    </span>
                    <span class="attempts">尝试 {{ exam.attemptCount }} 次</span>
                  </div>
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
        <section class="exam-stats-section" v-if="userStore.isLoggedIn">
          <div class="stats-grid">
            <div class="stats-card">
              <h3>考试统计</h3>
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
        <section class="recent-exams-section" v-if="recentExams.length > 0 && userStore.isLoggedIn">
          <h2 class="section-title">最近考试记录</h2>
          <div class="recent-exams">
            <div 
              v-for="exam in recentExams" 
              :key="exam.id"
              class="recent-exam-card"
            >
              <div class="exam-header">
                <h4 class="exam-title">{{ exam.title }}</h4>
                <span class="exam-date">{{ formatDate(exam.date) }}</span>
              </div>
              <div class="exam-result">
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
              <div class="exam-actions">
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
            <router-link to="/login" class="btn btn-primary">立即登录</router-link>
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

      <!-- 页脚 -->
      <footer class="footer">
        <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'Exam',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      mobileMenuOpen: false,
      activeType: 'all',
      selectedYear: 'all',
      selectedDifficulty: 'all',
      examTypes: [
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
      ],
      exams: [
        {
          id: 'exam-2024-1',
          title: '2024年模拟考试 #1',
          description: '基于最新考纲的全真模拟考试，涵盖所有考试领域',
          type: 'simulation',
          year: 2024,
          duration: 120,
          questionCount: 50,
          difficulty: '中等',
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
          totalScore: 100,
          passingScore: 75,
          isNew: true,
          isRecommended: true,
          requiredSubscription: 'premium',
          userScore: null,
          attemptCount: 0,
          bookmarked: false
        },
        {
          id: 'vip-exam-2',
          title: 'VIP专属历年真题解析',
          description: '历年真题深度解析，包含专家讲解和错题分析',
          type: 'past',
          year: 2024,
          duration: 120,
          questionCount: 50,
          difficulty: '中等',
          totalScore: 100,
          passingScore: 70,
          isNew: true,
          isRecommended: true,
          requiredSubscription: 'premium',
          userScore: null,
          attemptCount: 0,
          bookmarked: false
        }
      ],
      examStats: {
        totalExams: 12,
        totalAttempts: 25,
        averageScore: 73,
        bestScore: 92,
        passedExams: 8,
        totalTime: 36
      },
      domainStats: [
        { id: 'rights', name: '权利关系', score: 78 },
        { id: 'business', name: '宅建业法', score: 85 },
        { id: 'regulations', name: '法令制限', score: 65 },
        { id: 'tax', name: '税・価格', score: 72 },
        { id: 'exempt', name: '五问免除', score: 88 }
      ],
      recentExams: [
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
    }
  },
  computed: {
    availableYears() {
      const years = [...new Set(this.exams.map(exam => exam.year))]
      return years.sort((a, b) => b - a)
    },
    filteredExams() {
      let filtered = this.exams

      // 按类型筛选
      if (this.activeType !== 'all') {
        filtered = filtered.filter(exam => exam.type === this.activeType)
      }

      // 按年份筛选
      if (this.selectedYear !== 'all') {
        filtered = filtered.filter(exam => exam.year === parseInt(this.selectedYear))
      }

      // 按难度筛选
      if (this.selectedDifficulty !== 'all') {
        filtered = filtered.filter(exam => {
          const difficultyMap = {
            'easy': '简单',
            'medium': '中等',
            'hard': '困难'
          }
          return exam.difficulty === difficultyMap[this.selectedDifficulty]
        })
      }

      return filtered
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
      }
    },
    switchType(typeId) {
      this.activeType = typeId
    },
    getActiveTypeName() {
      const type = this.examTypes.find(t => t.id === this.activeType)
      return type ? type.name : '全部'
    },
    getTypeBadgeText(type) {
      const typeMap = {
        'simulation': '模拟',
        'past': '真题',
        'chapter': '章节',
        'timed': '限时'
      }
      return typeMap[type] || type
    },
    getScoreClass(score) {
      if (score >= 80) return 'excellent'
      if (score >= 70) return 'good'
      if (score >= 60) return 'average'
      return 'poor'
    },
    canTakeExam(exam) {
      // 检查用户是否有权限参加考试
      if (!this.userStore.isLoggedIn) return false
      if (exam.requiredSubscription === 'premium' && !this.userStore.isPremium) return false
      return true
    },
    toggleBookmark(examId) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以使用收藏功能')
        return
      }
      
      const exam = this.exams.find(e => e.id === examId)
      if (exam) {
        exam.bookmarked = !exam.bookmarked
        
        // 保存到本地存储
        this.saveBookmarksToLocalStorage()
      }
    },
    startExam(exam) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始考试')
        this.$router.push('/login')
        return
      }
      
      if (!this.canTakeExam(exam)) {
        alert('您没有权限参加此考试，请升级VIP会员')
        return
      }
      
      console.log('开始考试:', exam.title)
      // 这里应该跳转到考试页面
      alert(`开始考试: ${exam.title}`)
    },
    reviewExam(exam) {
      console.log('查看考试详情:', exam.title)
      // 这里应该跳转到考试详情页面
      alert(`查看考试详情: ${exam.title}`)
    },
    retakeExam(exam) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以重新考试')
        this.$router.push('/login')
        return
      }
      
      if (!this.canTakeExam(exam)) {
        alert('您没有权限参加此考试，请升级VIP会员')
        return
      }
      
      console.log('重新考试:', exam.title)
      // 这里应该重置考试进度并开始考试
      if (confirm(`确定要重新参加"${exam.title}"吗？`)) {
        this.startExam(exam)
      }
    },
    startQuickExam() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始快速测试')
        this.$router.push('/login')
        return
      }
      
      // 快速测试逻辑
      const quickExam = {
        id: 'quick-test',
        title: '快速能力测试',
        description: '10道题目快速评估当前水平',
        duration: 20,
        questionCount: 10
      }
      this.startExam(quickExam)
    },
    showExamHistory() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以查看考试记录')
        this.$router.push('/login')
        return
      }
      
      // 显示考试历史逻辑
      console.log('显示考试历史')
    },
    upgradeToPremium() {
      alert('升级VIP会员，享受更多专属功能')
      // 这里应该跳转到VIP升级页面
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return `${date.getMonth() + 1}月${date.getDate()}日`
    },
    saveBookmarksToLocalStorage() {
      const bookmarks = this.exams
        .filter(exam => exam.bookmarked)
        .map(exam => exam.id)
      
      localStorage.setItem('examBookmarks', JSON.stringify(bookmarks))
    },
    loadBookmarksFromLocalStorage() {
      const savedBookmarks = localStorage.getItem('examBookmarks')
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks)
        this.exams.forEach(exam => {
          exam.bookmarked = bookmarks.includes(exam.id)
        })
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    
    // 从本地存储加载用户偏好
    this.loadBookmarksFromLocalStorage()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
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
  
  /* 新增考试相关变量 */
  --excellent: #10b981;
  --good: #3b82f6;
  --average: #f59e0b;
  --poor: #ef4444;
  --premium: #f59e0b;
}
</style>

<style scoped>
.exam {
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

/* 用户状态样式 */
.user-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--primary-light);
  color: var(--primary-dark);
}

.user-avatar {
  font-size: 18px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-tier {
  font-size: 12px;
  opacity: 0.8;
}

.login-link {
  display: flex;
  align-items: center;
  gap: 8px;
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
  position: relative;
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

.exam-type-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.type-btn {
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

.type-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
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

.type-desc {
  font-size: 12px;
  color: var(--muted);
}

.tool-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tool-btn {
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
  position: relative;
}

.tool-btn:hover:not(:disabled) {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
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
  margin: 40px 0;
  flex: 1;
}

/* ========= 考试列表区域 ========= */
.exam-list-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
}

.filter-options {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

/* ========= 考试卡片网格 ========= */
.exam-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.exam-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
}

.exam-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(12, 35, 50, 0.12);
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
  align-items: flex-start;
  margin-bottom: 16px;
}

.exam-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.badge.new {
  background: #ff6b6b;
  color: white;
}

.badge.recommended {
  background: var(--primary);
  color: white;
}

.badge.type {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.badge.premium {
  background: var(--premium);
  color: white;
}

.exam-actions {
  display: flex;
  gap: 8px;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s ease;
  padding: 4px;
}

.bookmark-btn:hover:not(:disabled), .bookmark-btn.bookmarked {
  color: #f59e0b;
}

.bookmark-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ========= 考试卡片内容 ========= */
.card-content {
  margin-bottom: 20px;
}

.exam-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 8px;
  line-height: 1.4;
}

.exam-description {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.exam-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}

.meta-icon {
  font-size: 14px;
}

.meta-text {
  font-weight: 500;
}

/* ========= 考试进度 ========= */
.exam-progress {
  background: var(--bg);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid var(--border);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 14px;
  color: var(--muted);
}

.progress-score {
  font-size: 16px;
  font-weight: 700;
}

.progress-score.excellent { color: var(--excellent); }
.progress-score.good { color: var(--good); }
.progress-score.average { color: var(--average); }
.progress-score.poor { color: var(--poor); }

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.5s ease;
}

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

/* ========= 考试卡片操作 ========= */
.card-actions {
  display: flex;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  flex: 1;
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
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--primary-light);
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
}

/* ========= 无考试状态 ========= */
.no-exams {
  text-align: center;
  padding: 60px 40px;
  color: var(--muted);
}

.no-exams-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.no-exams h3 {
  font-size: 20px;
  color: var(--primary-dark);
  margin-bottom: 8px;
}

.no-exams p {
  font-size: 16px;
}

/* ========= 考试统计区域 ========= */
.exam-stats-section {
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.stats-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
}

.stats-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 20px;
  text-align: center;
}

.stats-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: var(--bg);
  border-radius: 8px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
}

/* ========= 领域进度 ========= */
.domain-progress {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.domain-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.domain-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.domain-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.domain-score {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

/* ========= 最近考试记录 ========= */
.recent-exams-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 24px;
}

.recent-exams {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.recent-exam-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  border: 1px solid var(--border);
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.exam-header .exam-title {
  font-size: 16px;
  margin: 0;
  flex: 1;
}

.exam-date {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  margin-left: 12px;
}

.exam-result {
  margin-bottom: 16px;
}

.score-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.score-display .score {
  font-size: 20px;
  font-weight: 700;
}

.score-display .score.excellent { color: var(--excellent); }
.score-display .score.good { color: var(--good); }
.score-display .score.average { color: var(--average); }
.score-display .score.poor { color: var(--poor); }

.exam-details {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--muted);
}

.exam-actions {
  display: flex;
  gap: 8px;
}

/* ========= 登录提示 ========= */
.login-prompt {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 40px;
  text-align: center;
  margin: 40px 0;
  border: 1px solid var(--border);
}

.prompt-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
}

.prompt-content p {
  color: var(--muted);
  margin-bottom: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
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
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .exam-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .recent-exams {
    grid-template-columns: repeat(2, 1fr);
  }
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
  
  .exam-type-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .exam-cards {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-options {
    width: 100%;
    justify-content: flex-start;
  }
  
  .stats-content {
    grid-template-columns: 1fr;
  }
  
  .recent-exams {
    grid-template-columns: 1fr;
  }
  
  .card-actions {
    flex-direction: column;
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
  
  .exam-meta {
    flex-direction: column;
    gap: 8px;
  }
  
  .exam-header {
    flex-direction: column;
    gap: 8px;
  }
  
  .exam-date {
    margin-left: 0;
  }
  
  .score-display {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  
  .exam-details {
    flex-direction: column;
    gap: 4px;
  }
}
</style>