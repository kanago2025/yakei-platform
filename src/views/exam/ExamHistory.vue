<!-- src/views/exam/ExamHistory.vue -->
<template>
  <div class="exam-history">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-main">
            <h1>考试历史</h1>
            <p>查看您的所有考试记录，追踪学习进步，发现薄弱环节</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline" @click="goToExamList">
              ← 返回考试列表
            </button>
            <button class="btn btn-primary" @click="startNewExam">
              开始新考试
            </button>
          </div>
        </div>
      </div>

      <!-- 统计概览 -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.totalExams }}</div>
              <div class="stat-label">总考试次数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.passRate }}%</div>
              <div class="stat-label">通过率</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.averageScore }}</div>
              <div class="stat-label">平均分数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.totalStudyTime }}</div>
              <div class="stat-label">总学习时间</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 成绩趋势 -->
      <section class="trend-section">
        <div class="section-header">
          <h2>成绩趋势</h2>
          <p>追踪您的学习进步，了解成绩变化趋势</p>
        </div>
        <div class="trend-chart">
          <div class="chart-container">
            <div class="chart-grid">
              <div class="y-axis">
                <div class="y-label">50</div>
                <div class="y-label">40</div>
                <div class="y-label">30</div>
                <div class="y-label">20</div>
                <div class="y-label">10</div>
                <div class="y-label">0</div>
              </div>
              <div class="chart-area">
                <div class="bars-container">
                  <div 
                    v-for="(exam, index) in recentExams" 
                    :key="exam.id"
                    class="bar-wrapper"
                    @click="selectExam(exam)"
                  >
                    <div 
                      class="score-bar"
                      :style="{ height: (exam.score / 50) * 100 + '%' }"
                      :class="{
                        'passed': exam.passed,
                        'failed': !exam.passed,
                        'selected': selectedExamId === exam.id
                      }"
                    >
                      <div class="bar-value">{{ exam.score }}</div>
                    </div>
                    <div class="bar-label">{{ formatDateShort(exam.submitTime) }}</div>
                  </div>
                </div>
                <!-- 及格线 -->
                <div class="passing-line" :style="{ bottom: (35 / 50) * 100 + '%' }">
                  <div class="line"></div>
                  <div class="label">及格线 (35分)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 筛选和搜索 -->
      <section class="filter-section">
        <div class="filter-controls">
          <div class="filter-group">
            <label class="filter-label">考试类型</label>
            <select v-model="filters.examType" class="filter-select">
              <option value="all">全部类型</option>
              <option value="simulation">模拟考试</option>
              <option value="chapter">章节练习</option>
              <option value="mistake">错题重做</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">时间范围</label>
            <select v-model="filters.timeRange" class="filter-select">
              <option value="all">全部时间</option>
              <option value="week">最近一周</option>
              <option value="month">最近一月</option>
              <option value="quarter">最近三月</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">通过状态</label>
            <select v-model="filters.passStatus" class="filter-select">
              <option value="all">全部状态</option>
              <option value="passed">通过</option>
              <option value="failed">未通过</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">搜索</label>
            <div class="search-box">
              <input 
                v-model="filters.searchText" 
                type="text" 
                placeholder="搜索考试名称..." 
                class="search-input"
              >
              <span class="search-icon">🔍</span>
            </div>
          </div>
        </div>
        <div class="filter-actions">
          <button class="btn btn-outline" @click="resetFilters">
            重置筛选
          </button>
          <button class="btn btn-primary" @click="applyFilters">
            应用筛选
          </button>
        </div>
      </section>

      <!-- 考试记录列表 -->
      <section class="records-section">
        <div class="section-header">
          <div class="header-left">
            <h2>考试记录</h2>
            <p>共 {{ filteredExams.length }} 条记录</p>
          </div>
          <div class="header-right">
            <div class="sort-controls">
              <label class="sort-label">排序方式：</label>
              <select v-model="sortBy" class="sort-select">
                <option value="submitTime">考试时间</option>
                <option value="score">考试成绩</option>
                <option value="title">考试名称</option>
              </select>
              <button 
                class="sort-direction"
                @click="toggleSortDirection"
              >
                {{ sortDirection === 'desc' ? '↓' : '↑' }}
              </button>
            </div>
          </div>
        </div>

        <div class="records-list">
          <div 
            v-for="exam in sortedExams" 
            :key="exam.id"
            class="exam-record-card"
            :class="{
              'passed': exam.passed,
              'failed': !exam.passed,
              'selected': selectedExamId === exam.id
            }"
            @click="selectExam(exam)"
          >
            <div class="record-main">
              <div class="exam-info">
                <h3 class="exam-title">{{ exam.title }}</h3>
                <div class="exam-meta">
                  <span class="exam-type">{{ exam.typeText }}</span>
                  <span class="exam-date">{{ formatDateTime(exam.submitTime) }}</span>
                  <span class="exam-duration">用时: {{ formatTime(exam.timeUsed) }}</span>
                </div>
              </div>
              <div class="exam-score">
                <div class="score-display" :class="getScoreClass(exam.score)">
                  <span class="score-value">{{ exam.displayScore }}</span>
                  <span class="score-label">{{ exam.scoreLabel }}</span>
                </div>
                <div class="pass-status" :class="exam.passed ? 'passed' : 'failed'">
                  {{ exam.passed ? '通过' : '未通过' }}
                </div>
              </div>
            </div>
            <div class="record-details">
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="label">正确率</span>
                  <span class="value">{{ exam.accuracy }}%</span>
                </div>
                <div class="detail-item">
                  <span class="label">做对题数</span>
                  <span class="value">{{ exam.correctCount }}/{{ exam.totalQuestions }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">平均用时</span>
                  <span class="value">{{ formatSeconds(exam.averageTimePerQuestion) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">时间利用率</span>
                  <span class="value">{{ exam.timeEfficiency }}%</span>
                </div>
              </div>
            </div>
            <div class="record-actions">
              <button class="btn btn-outline btn-sm" @click.stop="reviewExam(exam)">
                <span class="btn-icon">📖</span>
                查看回顾
              </button>
              <button class="btn btn-outline btn-sm" @click.stop="retakeExam(exam)">
                <span class="btn-icon">🔄</span>
                重新考试
              </button>
              <button 
                v-if="!exam.passed" 
                class="btn btn-outline btn-sm" 
                @click.stop="focusWeakAreas(exam)"
              >
                <span class="btn-icon">🎯</span>
                专项练习
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredExams.length === 0" class="no-records">
          <div class="no-records-icon">📝</div>
          <h3>暂无考试记录</h3>
          <p>开始您的第一次考试来创建记录</p>
          <button class="btn btn-primary" @click="startNewExam">
            开始新考试
          </button>
        </div>

        <!-- 分页控件 -->
        <div v-if="filteredExams.length > 0" class="pagination">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            上一页
          </button>
          <div class="pagination-pages">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              class="pagination-page"
              :class="{ active: page === currentPage }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            下一页
          </button>
        </div>
      </section>

      <!-- 选中的考试详情 -->
      <section v-if="selectedExam" class="detail-section">
        <div class="section-header">
          <h2>考试详情</h2>
          <p>查看选中考试的详细信息</p>
        </div>
        <div class="detail-card">
          <div class="detail-header">
            <h3>{{ selectedExam.title }}</h3>
            <div class="exam-tags">
              <span class="tag type-tag">{{ selectedExam.typeText }}</span>
              <span class="tag status-tag" :class="selectedExam.passed ? 'passed' : 'failed'">
                {{ selectedExam.passed ? '通过' : '未通过' }}
              </span>
              <span class="tag score-tag" :class="getScoreClass(selectedExam.score)">
                {{ selectedExam.displayScore }} {{ selectedExam.scoreLabel }}
              </span>
            </div>
          </div>
          <div class="detail-content">
            <div class="detail-grid detailed">
              <div class="detail-column">
                <h4>基本信息</h4>
                <div class="info-list">
                  <div class="info-item">
                    <span class="label">考试时间</span>
                    <span class="value">{{ formatDateTime(selectedExam.submitTime) }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">考试时长</span>
                    <span class="value">{{ selectedExam.duration }} 分钟</span>
                  </div>
                  <div class="info-item">
                    <span class="label">实际用时</span>
                    <span class="value">{{ formatTime(selectedExam.timeUsed) }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">及格分数</span>
                    <span class="value">{{ selectedExam.passingScore }} 分</span>
                  </div>
                </div>
              </div>
              <div class="detail-column">
                <h4>成绩分析</h4>
                <div class="info-list">
                  <div class="info-item">
                    <span class="label">正确率</span>
                    <span class="value">{{ selectedExam.accuracy }}%</span>
                  </div>
                  <div class="info-item">
                    <span class="label">做对题数</span>
                    <span class="value">{{ selectedExam.correctCount }}/{{ selectedExam.totalQuestions }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">平均用时</span>
                    <span class="value">{{ formatSeconds(selectedExam.averageTimePerQuestion) }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">时间利用率</span>
                    <span class="value">{{ selectedExam.timeEfficiency }}%</span>
                  </div>
                </div>
              </div>
              <div class="detail-column">
                <h4>强弱项分析</h4>
                <div class="weak-areas-preview">
                  <div v-if="selectedExam.weakAreas && selectedExam.weakAreas.length > 0" class="areas-list">
                    <div 
                      v-for="area in selectedExam.weakAreas.slice(0, 3)" 
                      :key="area.id"
                      class="area-tag weak"
                    >
                      {{ area.name }} ({{ area.accuracy }}%)
                    </div>
                  </div>
                  <div v-else class="no-weak-areas">
                    暂无弱项数据
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-actions">
            <button class="btn btn-primary" @click="reviewExam(selectedExam)">
              查看完整回顾
            </button>
            <button class="btn btn-outline" @click="retakeExam(selectedExam)">
              重新考试
            </button>
            <button class="btn btn-outline" @click="exportExamResult(selectedExam)">
              导出结果
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const exams = ref([])
const selectedExamId = ref(null)
const filters = ref({
  examType: 'all',
  timeRange: 'all',
  passStatus: 'all',
  searchText: ''
})
const sortBy = ref('submitTime')
const sortDirection = ref('desc')
const currentPage = ref(1)
const pageSize = 10

// 统计数据
const stats = ref({
  totalExams: 0,
  passRate: 0,
  averageScore: 0,
  totalStudyTime: '0小时'
})

// 计算属性
const selectedExam = computed(() => {
  return exams.value.find(exam => exam.id === selectedExamId.value)
})

const filteredExams = computed(() => {
  let filtered = exams.value

  // 考试类型筛选
  if (filters.value.examType !== 'all') {
    filtered = filtered.filter(exam => exam.type === filters.value.examType)
  }

  // 时间范围筛选
  if (filters.value.timeRange !== 'all') {
    const now = new Date()
    let startDate
    switch (filters.value.timeRange) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case 'quarter':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
    }
    filtered = filtered.filter(exam => new Date(exam.submitTime) >= startDate)
  }

  // 通过状态筛选
  if (filters.value.passStatus !== 'all') {
    filtered = filtered.filter(exam => 
      filters.value.passStatus === 'passed' ? exam.passed : !exam.passed
    )
  }

  // 搜索筛选
  if (filters.value.searchText) {
    const searchLower = filters.value.searchText.toLowerCase()
    filtered = filtered.filter(exam => 
      exam.title.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

const sortedExams = computed(() => {
  const sorted = [...filteredExams.value]
  
  sorted.sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy.value) {
      case 'score':
        aValue = a.score
        bValue = b.score
        break
      case 'title':
        aValue = a.title
        bValue = b.title
        break
      case 'submitTime':
      default:
        aValue = new Date(a.submitTime)
        bValue = new Date(b.submitTime)
    }
    
    if (sortDirection.value === 'desc') {
      return aValue > bValue ? -1 : 1
    } else {
      return aValue < bValue ? -1 : 1
    }
  })
  
  // 分页
  const startIndex = (currentPage.value - 1) * pageSize
  return sorted.slice(startIndex, startIndex + pageSize)
})

const totalPages = computed(() => {
  return Math.ceil(filteredExams.value.length / pageSize)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  let start = Math.max(1, currentPage.value - 2)
  let end = Math.min(total, start + 4)
  
  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const recentExams = computed(() => {
  return exams.value
    .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime))
    .slice(0, 10)
})

// 方法
const initializeData = () => {
  // 模拟考试数据
  exams.value = Array.from({ length: 25 }, (_, index) => {
    const types = [
      { type: 'simulation', text: '模拟考试' },
      { type: 'chapter', text: '章节练习' },
      { type: 'mistake', text: '错题重做' }
    ]
    const type = types[Math.floor(Math.random() * types.length)]
    const score = Math.floor(Math.random() * 21) + 30 // 30-50分
    const passed = score >= 35
    const totalQuestions = 50
    const correctCount = Math.round((score / 50) * totalQuestions)
    
    return {
      id: `exam_${index + 1}`,
      title: `2024年${type.text} #${index + 1}`,
      type: type.type,
      typeText: type.text,
      score: score,
      displayScore: score,
      scoreLabel: '分',
      correctCount: correctCount,
      totalQuestions: totalQuestions,
      accuracy: Math.round((correctCount / totalQuestions) * 100),
      timeUsed: Math.floor(Math.random() * 3600) + 1800, // 30-90分钟
      submitTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      passed: passed,
      duration: 120,
      passingScore: 35,
      averageTimePerQuestion: Math.floor(Math.random() * 60) + 30,
      timeEfficiency: Math.floor(Math.random() * 30) + 70,
      weakAreas: generateWeakAreas()
    }
  })
  
  // 更新统计数据
  updateStats()
  
  // 默认选中第一个考试
  if (exams.value.length > 0) {
    selectedExamId.value = exams.value[0].id
  }
}

const generateWeakAreas = () => {
  const areas = ['宅建业法', '权利关系', '法令制限', '税・其他', '五问免除']
  return areas
    .map(name => ({
      id: name,
      name: name,
      accuracy: Math.floor(Math.random() * 40) + 30 // 30-70%
    }))
    .filter(area => area.accuracy < 70)
    .slice(0, 3)
}

const updateStats = () => {
  const total = exams.value.length
  const passed = exams.value.filter(exam => exam.passed).length
  const totalScore = exams.value.reduce((sum, exam) => sum + exam.score, 0)
  const totalTime = exams.value.reduce((sum, exam) => sum + exam.timeUsed, 0)
  
  stats.value = {
    totalExams: total,
    passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
    averageScore: total > 0 ? Math.round(totalScore / total) : 0,
    totalStudyTime: formatTotalTime(totalTime)
  }
}

const getScoreClass = (score) => {
  if (score >= 40) return 'excellent'
  if (score >= 35) return 'good'
  if (score >= 30) return 'average'
  return 'poor'
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}小时${minutes}分`
  } else if (minutes > 0) {
    return `${minutes}分${secs}秒`
  } else {
    return `${secs}秒`
  }
}

const formatTotalTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  return `${hours}小时`
}

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}分${secs.toString().padStart(2, '0')}秒`
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
}

const selectExam = (exam) => {
  selectedExamId.value = exam.id
}

const reviewExam = (exam) => {
  router.push({
    path: '/exam/review',
    query: { 
      examId: exam.id,
      sessionId: `session_${exam.id}`
    }
  })
}

const retakeExam = (exam) => {
  router.push({
    path: '/exam/session',
    query: { examId: exam.id }
  })
}

const focusWeakAreas = (exam) => {
  const weakFields = exam.weakAreas.map(area => area.id)
  router.push({
    path: '/practice',
    query: { 
      fields: weakFields.join(','),
      type: 'targeted'
    }
  })
}

const goToExamList = () => {
  router.push('/exam')
}

const startNewExam = () => {
  router.push('/exam')
}

const applyFilters = () => {
  currentPage.value = 1
  // 筛选逻辑已经在计算属性中处理
}

const resetFilters = () => {
  filters.value = {
    examType: 'all',
    timeRange: 'all',
    passStatus: 'all',
    searchText: ''
  }
  currentPage.value = 1
}

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const exportExamResult = (exam) => {
  // 模拟导出功能
  console.log('导出考试结果:', exam.id)
  alert('导出功能开发中...')
}

onMounted(() => {
  initializeData()
})
</script>

<style scoped>
.exam-history {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 20px;
}

.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 2rem;
  margin: 2rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-main h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.header-main p {
  font-size: 1.125rem;
  color: var(--muted);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ========= 统计概览 ========= */
.stats-section {
  margin: 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
  opacity: 0.8;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-dark);
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 成绩趋势 ========= */
.trend-section {
  margin: 3rem 0;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--muted);
  margin: 0;
}

.trend-chart {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.chart-container {
  position: relative;
  height: 300px;
}

.chart-grid {
  display: flex;
  height: 100%;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 1rem;
  border-right: 1px solid var(--border);
  min-width: 40px;
}

.y-label {
  font-size: 0.75rem;
  color: var(--muted);
  text-align: right;
}

.chart-area {
  flex: 1;
  position: relative;
  margin-left: 1rem;
}

.bars-container {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 100%;
  padding: 0 1rem;
}

.bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.bar-wrapper:hover {
  transform: translateY(-5px);
}

.score-bar {
  width: 30px;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  min-height: 20px;
}

.score-bar.passed {
  background: linear-gradient(to top, var(--excellent), #10b981);
}

.score-bar.failed {
  background: linear-gradient(to top, var(--poor), #ef4444);
}

.score-bar.selected {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-dark);
  white-space: nowrap;
}

.bar-label {
  font-size: 0.75rem;
  color: var(--muted);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.passing-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
}

.passing-line .line {
  height: 2px;
  background: #ef4444;
  position: relative;
}

.passing-line .label {
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 0.75rem;
  color: #ef4444;
  background: var(--bg);
  padding: 2px 6px;
  border-radius: 4px;
}

/* ========= 筛选区域 ========= */
.filter-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 36px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

.filter-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* ========= 考试记录列表 ========= */
.records-section {
  margin: 3rem 0;
}

.records-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left h2 {
  margin-bottom: 0.25rem;
}

.header-left p {
  margin: 0;
  color: var(--muted);
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.875rem;
  color: var(--muted);
}

.sort-select {
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
}

.sort-direction {
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  font-size: 0.875rem;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.exam-record-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid var(--border);
}

.exam-record-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.exam-record-card.passed {
  border-left-color: var(--excellent);
}

.exam-record-card.failed {
  border-left-color: var(--poor);
}

.exam-record-card.selected {
  background: var(--primary-light);
  border-color: var(--primary);
}

.record-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.exam-info {
  flex: 1;
  min-width: 300px;
}

.exam-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.exam-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.exam-type {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.exam-date,
.exam-duration {
  font-size: 0.875rem;
  color: var(--muted);
}

.exam-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 80px;
}

.score-display {
  text-align: center;
}

.score-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
}

.score-value.excellent { color: var(--excellent); }
.score-value.good { color: var(--good); }
.score-value.average { color: var(--average); }
.score-value.poor { color: var(--poor); }

.score-label {
  font-size: 0.75rem;
  color: var(--muted);
}

.pass-status {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.pass-status.passed {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.pass-status.failed {
  background: #fee2e2;
  color: #dc2626;
}

.record-details {
  margin-bottom: 1rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item .label {
  font-size: 0.875rem;
  color: var(--muted);
}

.detail-item .value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.record-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* ========= 无记录状态 ========= */
.no-records {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--muted);
}

.no-records-icon {
  font-size: 4rem;
  margin-bottom: 1.25rem;
  opacity: 0.5;
}

.no-records h3 {
  font-size: 1.5rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.no-records p {
  font-size: 1rem;
  margin-bottom: 2rem;
}

/* ========= 分页控件 ========= */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 0.5rem;
}

.pagination-page {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
}

.pagination-page:hover {
  border-color: var(--primary);
}

.pagination-page.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* ========= 考试详情 ========= */
.detail-section {
  margin: 3rem 0;
}

.detail-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
}

.exam-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.type-tag {
  background: var(--primary-light);
  color: var(--primary);
}

.status-tag.passed {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.status-tag.failed {
  background: #fee2e2;
  color: #dc2626;
}

.score-tag.excellent { background: rgba(16, 185, 129, 0.1); color: var(--excellent); }
.score-tag.good { background: rgba(59, 130, 246, 0.1); color: var(--good); }
.score-tag.average { background: rgba(245, 158, 11, 0.1); color: var(--average); }
.score-tag.poor { background: rgba(239, 68, 68, 0.1); color: var(--poor); }

.detail-content {
  margin-bottom: 2rem;
}

.detail-grid.detailed {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-column h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-light);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  font-size: 0.875rem;
  color: var(--muted);
}

.info-item .value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.weak-areas-preview {
  min-height: 100px;
}

.areas-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.area-tag {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.area-tag.weak {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.no-weak-areas {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--muted);
  font-size: 0.875rem;
}

.detail-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ========= 按钮样式 ========= */
.btn {
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

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover:not(:disabled) {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn-icon {
  margin-right: 4px;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filter-controls {
    grid-template-columns: 1fr;
  }
  
  .detail-grid.detailed {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--container-padding, 1.5rem);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .records-section .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .record-main {
    flex-direction: column;
  }
  
  .exam-info {
    min-width: auto;
  }
  
  .exam-score {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .exam-tags {
    width: 100%;
    justify-content: flex-start;
  }
  
  .detail-actions {
    justify-content: center;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  .container {
    padding: 0 var(--container-padding, 1rem);
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1.5rem;
  }
  
  .header-main h1 {
    font-size: 2rem;
  }
  
  .header-main p {
    font-size: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .trend-chart {
    padding: 1rem;
  }
  
  .bars-container {
    padding: 0 0.5rem;
  }
  
  .score-bar {
    width: 20px;
  }
  
  .exam-record-card {
    padding: 1rem;
  }
  
  .detail-card {
    padding: 1.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>