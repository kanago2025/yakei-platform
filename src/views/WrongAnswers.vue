<!-- src/views/exam/WrongAnswers.vue -->
<template>
  <div class="wrong-answers">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-main">
            <h1>错题本</h1>
            <p>系统自动收录的错题，针对性复习，快速提升薄弱环节</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ wrongAnswersStats.totalWrong }}</span>
              <span class="stat-label">总错题数</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ wrongAnswersStats.weakAreas }}</span>
              <span class="stat-label">薄弱知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ wrongAnswersStats.mastered }}</span>
              <span class="stat-label">已掌握</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ wrongAnswersStats.reviewRate }}%</span>
              <span class="stat-label">复习完成率</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速操作栏 -->
      <div class="quick-actions">
        <div class="action-group">
          <h3>快速操作</h3>
          <div class="action-buttons">
            <button class="action-btn" @click="startSmartReview" :disabled="activeWrongAnswers.length === 0">
              <span class="btn-icon">🎯</span>
              <span>智能复习</span>
              <span class="btn-hint">基于薄弱点生成</span>
            </button>
            <button class="action-btn" @click="startAllReview" :disabled="activeWrongAnswers.length === 0">
              <span class="btn-icon">📚</span>
              <span>全部复习</span>
              <span class="btn-hint">{{ activeWrongAnswers.length }}题</span>
            </button>
            <button class="action-btn" @click="exportWrongAnswers" :disabled="wrongAnswers.length === 0">
              <span class="btn-icon">📤</span>
              <span>导出错题</span>
              <span class="btn-hint">PDF/Excel</span>
            </button>
            <button class="action-btn" @click="clearMastered" :disabled="masteredCount === 0">
              <span class="btn-icon">🧹</span>
              <span>清理已掌握</span>
              <span class="btn-hint">{{ masteredCount }}题</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 筛选和排序 -->
      <div class="filter-bar">
        <div class="filter-group">
          <label>分野筛选：</label>
          <select v-model="selectedField">
            <option value="all">全部分野</option>
            <option value="business">宅建业法</option>
            <option value="rights">权利关系</option>
            <option value="regulations">法令制限</option>
            <option value="tax">税・其他</option>
            <option value="exempt">五问免除</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>排序方式：</label>
          <select v-model="selectedSort">
            <option value="frequency">错误频率</option>
            <option value="recent">最近错误</option>
            <option value="difficulty">题目难度</option>
            <option value="field">知识领域</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>状态筛选：</label>
          <select v-model="selectedStatus">
            <option value="all">全部题目</option>
            <option value="active">未掌握</option>
            <option value="mastered">已掌握</option>
          </select>
        </div>
        
        <div class="search-group">
          <input 
            v-model="searchKeyword"
            type="text" 
            placeholder="搜索题目内容或知识点..."
            class="search-input"
          >
          <span class="search-icon">🔍</span>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 薄弱知识点分析 -->
        <section class="analysis-section" v-if="weakAreas.length > 0">
          <div class="section-header">
            <h2>薄弱知识点分析</h2>
            <p>基于错题数据识别的需要重点复习的领域</p>
          </div>

          <div class="weak-areas-grid">
            <div 
              v-for="area in weakAreas" 
              :key="area.id"
              class="weak-area-card"
              :class="getPriorityClass(area.priority)"
            >
              <div class="area-header">
                <h3>{{ area.name }}</h3>
                <div class="area-priority">{{ getPriorityText(area.priority) }}</div>
              </div>
              <div class="area-stats">
                <div class="stat">
                  <span class="stat-value">{{ area.wrongCount }}</span>
                  <span class="stat-label">错题数</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ area.errorRate }}%</span>
                  <span class="stat-label">错误率</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ area.avgFrequency }}</span>
                  <span class="stat-label">平均错误次数</span>
                </div>
              </div>
              <div class="area-actions">
                <button class="btn btn-outline btn-sm" @click="reviewByArea(area.id)">
                  专项复习
                </button>
                <button class="btn btn-primary btn-sm" @click="practiceByArea(area.id)">
                  强化练习
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 错题列表 -->
        <section class="wrong-answers-section">
          <div class="section-header">
            <div class="header-left">
              <h2>错题列表</h2>
              <p>共 {{ filteredWrongAnswers.length }} 道错题，其中 {{ activeWrongAnswers.length }} 道待复习</p>
            </div>
            <div class="header-right">
              <div class="view-controls">
                <button 
                  class="view-btn" 
                  :class="{ active: viewMode === 'list' }"
                  @click="viewMode = 'list'"
                >
                  📋 列表视图
                </button>
                <button 
                  class="view-btn" 
                  :class="{ active: viewMode === 'card' }"
                  @click="viewMode = 'card'"
                >
                  🗂️ 卡片视图
                </button>
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div v-if="viewMode === 'list'" class="wrong-answers-list">
            <div class="list-header">
              <div class="col-question">题目</div>
              <div class="col-field">领域</div>
              <div class="col-frequency">错误次数</div>
              <div class="col-last-wrong">最近错误</div>
              <div class="col-status">状态</div>
              <div class="col-actions">操作</div>
            </div>
            
            <div 
              v-for="item in filteredWrongAnswers" 
              :key="item.id"
              class="wrong-answer-item"
              :class="{ 'mastered': item.isMastered }"
            >
              <div class="col-question">
                <div class="question-preview" @click="showQuestionDetail(item)">
                  {{ item.questionText }}
                </div>
              </div>
              <div class="col-field">
                <span class="field-tag">{{ item.field }}</span>
              </div>
              <div class="col-frequency">
                <span class="frequency-badge" :class="getFrequencyClass(item.timesWrong)">
                  {{ item.timesWrong }}次
                </span>
              </div>
              <div class="col-last-wrong">
                {{ formatRelativeTime(item.lastWrongAt) }}
              </div>
              <div class="col-status">
                <span class="status-badge" :class="item.isMastered ? 'mastered' : 'active'">
                  {{ item.isMastered ? '已掌握' : '待复习' }}
                </span>
              </div>
              <div class="col-actions">
                <button 
                  class="btn btn-outline btn-sm"
                  @click="toggleMastered(item.id)"
                >
                  {{ item.isMastered ? '取消掌握' : '标记掌握' }}
                </button>
                <button 
                  class="btn btn-outline btn-sm"
                  @click="reviewSingleQuestion(item)"
                >
                  单独复习
                </button>
                <button 
                  class="btn btn-outline btn-sm"
                  @click="removeWrongAnswer(item.id)"
                >
                  移除
                </button>
              </div>
            </div>

            <div v-if="filteredWrongAnswers.length === 0" class="no-wrong-answers">
              <div class="no-data-icon">🎉</div>
              <h3>暂无错题</h3>
              <p>继续保持，您已经掌握了所有知识点！</p>
              <button class="btn btn-primary" @click="goToExam">
                去练习更多题目
              </button>
            </div>
          </div>

          <!-- 卡片视图 -->
          <div v-if="viewMode === 'card'" class="wrong-answers-grid">
            <div 
              v-for="item in filteredWrongAnswers" 
              :key="item.id"
              class="wrong-answer-card"
              :class="{ 'mastered': item.isMastered }"
            >
              <div class="card-header">
                <div class="card-field">
                  <span class="field-tag">{{ item.field }}</span>
                </div>
                <div class="card-actions">
                  <button 
                    class="btn-icon"
                    @click="toggleMastered(item.id)"
                    :title="item.isMastered ? '取消掌握' : '标记掌握'"
                  >
                    {{ item.isMastered ? '⭐' : '☆' }}
                  </button>
                </div>
              </div>
              
              <div class="card-content" @click="showQuestionDetail(item)">
                <div class="question-text">
                  {{ item.questionText }}
                </div>
                <div class="question-meta">
                  <div class="meta-item">
                    <span class="meta-icon">❌</span>
                    <span>错误 {{ item.timesWrong }} 次</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">📅</span>
                    <span>{{ formatRelativeTime(item.lastWrongAt) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="card-footer">
                <div class="status-indicator" :class="item.isMastered ? 'mastered' : 'active'">
                  {{ item.isMastered ? '已掌握' : '需复习' }}
                </div>
                <div class="footer-actions">
                  <button class="btn btn-outline btn-sm" @click="reviewSingleQuestion(item)">
                    复习
                  </button>
                  <button class="btn btn-outline btn-sm" @click="removeWrongAnswer(item.id)">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页控制 -->
          <div v-if="filteredWrongAnswers.length > pageSize" class="pagination">
            <button 
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              上一页
            </button>
            <span class="pagination-info">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            <button 
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              下一页
            </button>
          </div>
        </section>
      </main>
    </div>

    <!-- 题目详情模态框 -->
    <div v-if="showDetailModal" class="modal-overlay" @click="closeDetailModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>题目详情</h3>
          <button class="modal-close" @click="closeDetailModal">×</button>
        </div>
        <div class="modal-body">
          <div v-if="selectedQuestion" class="question-detail">
            <div class="detail-header">
              <div class="detail-meta">
                <span class="field-tag">{{ selectedQuestion.field }}</span>
                <span class="difficulty-tag" :class="selectedQuestion.difficultyClass">
                  {{ selectedQuestion.difficultyText }}
                </span>
                <span class="frequency-badge">
                  错误 {{ selectedQuestion.timesWrong }} 次
                </span>
              </div>
            </div>
            
            <div class="detail-content">
              <div class="question-text" v-html="selectedQuestion.fullText"></div>
              
              <div class="options-section">
                <div 
                  v-for="option in selectedQuestion.options" 
                  :key="option.key"
                  class="option-item"
                  :class="{
                    'correct': option.key === selectedQuestion.correctAnswer,
                    'wrong': selectedQuestion.userAnswer && 
                            (selectedQuestion.type === 'multi_choice' 
                              ? selectedQuestion.userAnswer.split(',').includes(option.key)
                              : selectedQuestion.userAnswer === option.key) &&
                            option.key !== selectedQuestion.correctAnswer
                  }"
                >
                  <div class="option-marker">
                    <span v-if="option.key === selectedQuestion.correctAnswer" class="correct-marker">✓</span>
                    <span v-else-if="selectedQuestion.userAnswer && 
                            (selectedQuestion.type === 'multi_choice' 
                              ? selectedQuestion.userAnswer.split(',').includes(option.key)
                              : selectedQuestion.userAnswer === option.key)" 
                          class="wrong-marker">✗</span>
                    <span v-else class="option-key">{{ option.key }}</span>
                  </div>
                  <div class="option-text" v-html="option.text"></div>
                </div>
              </div>
              
              <div class="explanation-section">
                <h4>答案解析</h4>
                <div class="explanation" v-html="selectedQuestion.explanation"></div>
                <div class="explanation-meta">
                  <span>您的答案: <strong>{{ selectedQuestion.userAnswer || '未作答' }}</strong></span>
                  <span>正确答案: <strong>{{ selectedQuestion.correctAnswer }}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="closeDetailModal">关闭</button>
          <button class="btn btn-primary" @click="reviewSingleQuestion(selectedQuestion)">
            专项复习此题
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 状态管理
const viewMode = ref('list')
const selectedField = ref('all')
const selectedSort = ref('frequency')
const selectedStatus = ref('active')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const showDetailModal = ref(false)
const selectedQuestion = ref(null)

// 模拟数据 - 错题列表
const wrongAnswers = ref([
  {
    id: 'wa_1',
    questionId: 'q_001',
    questionText: '关于宅建业法的免许制度，下列说法正确的是？',
    fullText: '关于宅建业法的免许制度，下列说法正确的是？',
    field: '宅建业法',
    topic: '免许制度',
    timesWrong: 3,
    firstWrongAt: '2024-01-10T10:30:00Z',
    lastWrongAt: '2024-01-28T14:20:00Z',
    isMastered: false,
    userAnswer: 'A',
    correctAnswer: 'B',
    type: 'single_choice',
    difficulty: 2,
    difficultyText: '中等',
    difficultyClass: 'medium',
    options: [
      { key: 'A', text: '免许有效期为3年' },
      { key: 'B', text: '免许需要每5年更新一次' },
      { key: 'C', text: '免许全国通用' },
      { key: 'D', text: '免许可以转让' }
    ],
    explanation: '宅建业法的免许制度规定，免许有效期为5年，需要定期更新。选项A的3年错误，选项C和D也不符合法律规定。'
  },
  {
    id: 'wa_2',
    questionId: 'q_002',
    questionText: '在权利关系中，代理权的范围包括哪些？',
    fullText: '在权利关系中，代理权的范围包括哪些？',
    field: '权利关系',
    topic: '代理',
    timesWrong: 2,
    firstWrongAt: '2024-01-15T09:15:00Z',
    lastWrongAt: '2024-01-25T16:45:00Z',
    isMastered: true,
    userAnswer: 'A,B',
    correctAnswer: 'A,B,C',
    type: 'multi_choice',
    difficulty: 3,
    difficultyText: '困难',
    difficultyClass: 'hard',
    options: [
      { key: 'A', text: '法定代理' },
      { key: 'B', text: '任意代理' },
      { key: 'C', text: '表见代理' },
      { key: 'D', text: '无权代理' }
    ],
    explanation: '代理权的范围包括法定代理、任意代理和表见代理。无权代理不属于代理权的范围。'
  },
  {
    id: 'wa_3',
    questionId: 'q_003',
    questionText: '都市计划法的主要内容包括？',
    fullText: '都市计划法的主要内容包括？',
    field: '法令制限',
    topic: '都市计划法',
    timesWrong: 1,
    firstWrongAt: '2024-01-20T11:00:00Z',
    lastWrongAt: '2024-01-20T11:00:00Z',
    isMastered: false,
    userAnswer: 'C',
    correctAnswer: 'D',
    type: 'single_choice',
    difficulty: 2,
    difficultyText: '中等',
    difficultyClass: 'medium',
    options: [
      { key: 'A', text: '土地利用规划' },
      { key: 'B', text: '建筑密度控制' },
      { key: 'C', text: '容积率规定' },
      { key: 'D', text: '以上都是' }
    ],
    explanation: '都市计划法的主要内容包括土地利用规划、建筑密度控制和容积率规定等，因此正确答案是以上都是。'
  }
])

// 计算属性
const wrongAnswersStats = computed(() => {
  const total = wrongAnswers.value.length
  const mastered = wrongAnswers.value.filter(item => item.isMastered).length
  const active = total - mastered
  const fields = [...new Set(wrongAnswers.value.map(item => item.field))]
  
  return {
    totalWrong: total,
    weakAreas: fields.length,
    mastered: mastered,
    reviewRate: total > 0 ? Math.round((mastered / total) * 100) : 0
  }
})

const weakAreas = computed(() => {
  const areas = {}
  
  wrongAnswers.value.forEach(item => {
    if (!areas[item.field]) {
      areas[item.field] = {
        id: item.field,
        name: item.field,
        wrongCount: 0,
        totalFrequency: 0,
        topics: new Set()
      }
    }
    
    areas[item.field].wrongCount++
    areas[item.field].totalFrequency += item.timesWrong
    areas[item.field].topics.add(item.topic)
  })
  
  return Object.values(areas).map(area => {
    const errorRate = Math.round((area.wrongCount / wrongAnswers.value.length) * 100)
    const avgFrequency = (area.totalFrequency / area.wrongCount).toFixed(1)
    
    // 计算优先级
    let priority = 1
    if (errorRate > 30) priority = 3
    else if (errorRate > 15) priority = 2
    
    return {
      ...area,
      errorRate,
      avgFrequency,
      priority,
      topicCount: area.topics.size
    }
  }).sort((a, b) => b.priority - a.priority)
})

const filteredWrongAnswers = computed(() => {
  let filtered = wrongAnswers.value
  
  // 按领域筛选
  if (selectedField.value !== 'all') {
    filtered = filtered.filter(item => item.field === getFieldName(selectedField.value))
  }
  
  // 按状态筛选
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(item => 
      selectedStatus.value === 'active' ? !item.isMastered : item.isMastered
    )
  }
  
  // 搜索筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.questionText.toLowerCase().includes(keyword) ||
      item.field.toLowerCase().includes(keyword) ||
      item.topic.toLowerCase().includes(keyword)
    )
  }
  
  // 排序
  filtered = [...filtered].sort((a, b) => {
    switch (selectedSort.value) {
      case 'frequency':
        return b.timesWrong - a.timesWrong
      case 'recent':
        return new Date(b.lastWrongAt) - new Date(a.lastWrongAt)
      case 'difficulty':
        return b.difficulty - a.difficulty
      case 'field':
        return a.field.localeCompare(b.field)
      default:
        return 0
    }
  })
  
  return filtered
})

const activeWrongAnswers = computed(() => {
  return filteredWrongAnswers.value.filter(item => !item.isMastered)
})

const masteredCount = computed(() => {
  return wrongAnswers.value.filter(item => item.isMastered).length
})

const totalPages = computed(() => {
  return Math.ceil(filteredWrongAnswers.value.length / pageSize.value)
})

const paginatedWrongAnswers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredWrongAnswers.value.slice(start, end)
})

// 方法
const getFieldName = (fieldId) => {
  const fieldMap = {
    'business': '宅建业法',
    'rights': '权利关系',
    'regulations': '法令制限',
    'tax': '税・其他',
    'exempt': '五问免除'
  }
  return fieldMap[fieldId] || fieldId
}

const getFrequencyClass = (frequency) => {
  if (frequency >= 3) return 'high'
  if (frequency === 2) return 'medium'
  return 'low'
}

const getPriorityClass = (priority) => {
  return `priority-${priority}`
}

const getPriorityText = (priority) => {
  const texts = { 1: '低优先级', 2: '中优先级', 3: '高优先级' }
  return texts[priority] || '未知'
}

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return '今天'
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) return `${diffDays}天前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
  return `${Math.floor(diffDays / 30)}月前`
}

const toggleMastered = (wrongAnswerId) => {
  const item = wrongAnswers.value.find(wa => wa.id === wrongAnswerId)
  if (item) {
    item.isMastered = !item.isMastered
    item.lastWrongAt = new Date().toISOString()
    
    // 实际应该调用API更新状态
    console.log(`更新错题掌握状态: ${wrongAnswerId} -> ${item.isMastered}`)
  }
}

const showQuestionDetail = (item) => {
  selectedQuestion.value = item
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedQuestion.value = null
}

const reviewSingleQuestion = (item) => {
  // 创建单题复习会话
  const reviewSession = {
    type: 'single_review',
    questionIds: [item.questionId],
    title: `单题复习 - ${item.field}`,
    description: `针对 "${item.questionText.substring(0, 30)}..." 的专项复习`
  }
  
  startReviewSession(reviewSession)
}

const reviewByArea = (areaId) => {
  const areaQuestions = wrongAnswers.value
    .filter(item => item.field === areaId && !item.isMastered)
    .map(item => item.questionId)
  
  if (areaQuestions.length > 0) {
    const reviewSession = {
      type: 'area_review',
      questionIds: areaQuestions,
      title: `专项复习 - ${areaId}`,
      description: `针对 ${areaId} 领域的错题复习`
    }
    
    startReviewSession(reviewSession)
  }
}

const practiceByArea = (areaId) => {
  router.push({
    path: '/practice',
    query: { 
      fields: areaId,
      type: 'targeted',
      source: 'wrong_answers'
    }
  })
}

const startSmartReview = () => {
  // 基于错误频率和最近错误时间智能选择题目
  const smartQuestions = wrongAnswers.value
    .filter(item => !item.isMastered)
    .sort((a, b) => {
      // 优先错误次数多、最近错误的题目
      const scoreA = a.timesWrong * 2 + (new Date() - new Date(a.lastWrongAt)) / (1000 * 60 * 60 * 24)
      const scoreB = b.timesWrong * 2 + (new Date() - new Date(b.lastWrongAt)) / (1000 * 60 * 60 * 24)
      return scoreB - scoreA
    })
    .slice(0, 10)
    .map(item => item.questionId)
  
  if (smartQuestions.length > 0) {
    const reviewSession = {
      type: 'smart_review',
      questionIds: smartQuestions,
      title: '智能复习',
      description: '基于您的错题情况智能生成的复习计划'
    }
    
    startReviewSession(reviewSession)
  }
}

const startAllReview = () => {
  const allQuestions = activeWrongAnswers.value.map(item => item.questionId)
  
  if (allQuestions.length > 0) {
    const reviewSession = {
      type: 'all_review',
      questionIds: allQuestions,
      title: '全部错题复习',
      description: `复习全部 ${allQuestions.length} 道待复习错题`
    }
    
    startReviewSession(reviewSession)
  }
}

const startReviewSession = (sessionConfig) => {
  // 这里应该跳转到专门的复习页面或考试会话页面
  console.log('开始复习会话:', sessionConfig)
  
  // 暂时使用alert提示
  alert(`开始${sessionConfig.title}，共${sessionConfig.questionIds.length}题`)
  
  // 实际实现应该跳转到复习页面
  // router.push({
  //   path: '/exam/review-session',
  //   query: { session: JSON.stringify(sessionConfig) }
  // })
}

const removeWrongAnswer = (wrongAnswerId) => {
  if (confirm('确定要移除此错题吗？')) {
    const index = wrongAnswers.value.findIndex(wa => wa.id === wrongAnswerId)
    if (index > -1) {
      wrongAnswers.value.splice(index, 1)
      // 实际应该调用API删除
      console.log(`删除错题: ${wrongAnswerId}`)
    }
  }
}

const clearMastered = () => {
  if (confirm('确定要清理所有已掌握的错题吗？此操作不可恢复。')) {
    wrongAnswers.value = wrongAnswers.value.filter(item => !item.isMastered)
    // 实际应该调用API批量删除
    console.log('清理已掌握错题')
  }
}

const exportWrongAnswers = () => {
  // 实现导出功能
  console.log('导出错题')
  alert('导出功能开发中...')
}

const goToExam = () => {
  router.push('/exam')
}

// 初始化
onMounted(() => {
  // 这里可以加载用户的错题数据
  console.log('初始化错题本页面')
})
</script>

<style scoped>
.wrong-answers {
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
  gap: 2rem;
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
  max-width: 500px;
}

.header-stats {
  display: flex;
  gap: 2rem;
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

/* ========= 快速操作栏 ========= */
.quick-actions {
  margin: 2rem 0;
}

.action-group h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  border: none;
  font-family: inherit;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 2rem;
}

.btn-hint {
  font-size: 0.75rem;
  color: var(--muted);
}

/* ========= 筛选栏 ========= */
.filter-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-dark);
  white-space: nowrap;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
  min-width: 120px;
}

.search-group {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
}

/* ========= 主要内容区域 ========= */
.main-content {
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

.questions-section .section-header {
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

.view-controls {
  display: flex;
  gap: 0.5rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
}

.view-btn {
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.view-btn.active {
  background: var(--primary);
  color: white;
}

/* ========= 薄弱知识点分析 ========= */
.weak-areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.weak-area-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  border-left: 4px solid var(--border);
}

.weak-area-card.priority-1 {
  border-left-color: var(--primary);
}

.weak-area-card.priority-2 {
  border-left-color: #f59e0b;
}

.weak-area-card.priority-3 {
  border-left-color: #ef4444;
}

.area-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.area-header h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
}

.area-priority {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  background: var(--bg);
}

.weak-area-card.priority-1 .area-priority {
  color: var(--primary);
  background: var(--primary-light);
}

.weak-area-card.priority-2 .area-priority {
  color: #92400e;
  background: #fef3c7;
}

.weak-area-card.priority-3 .area-priority {
  color: #dc2626;
  background: #fee2e2;
}

.area-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--muted);
}

.area-actions {
  display: flex;
  gap: 0.5rem;
}

/* ========= 错题列表 ========= */
.wrong-answers-list {
  background: var(--card-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1.5fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 0.875rem;
}

.wrong-answer-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1.5fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
  transition: background-color 0.3s ease;
}

.wrong-answer-item:hover {
  background: var(--bg);
}

.wrong-answer-item.mastered {
  opacity: 0.7;
  background: var(--primary-light);
}

.wrong-answer-item:last-child {
  border-bottom: none;
}

.question-preview {
  cursor: pointer;
  line-height: 1.4;
  color: var(--text);
}

.question-preview:hover {
  color: var(--primary);
}

.field-tag {
  display: inline-block;
  padding: 4px 8px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--muted);
}

.frequency-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.frequency-badge.high {
  background: #fee2e2;
  color: #dc2626;
}

.frequency-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.frequency-badge.low {
  background: var(--primary-light);
  color: var(--primary);
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.active {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.mastered {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.col-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* ========= 错题卡片视图 ========= */
.wrong-answers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.wrong-answer-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.wrong-answer-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.wrong-answer-card.mastered {
  opacity: 0.7;
  background: var(--primary-light);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-actions .btn-icon {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.card-actions .btn-icon:hover {
  background: var(--bg);
}

.card-content {
  cursor: pointer;
  margin-bottom: 1rem;
}

.question-text {
  line-height: 1.5;
  color: var(--text);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.question-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-icon {
  font-size: 14px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-indicator {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-indicator.active {
  background: #fef3c7;
  color: #92400e;
}

.status-indicator.mastered {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.footer-actions {
  display: flex;
  gap: 0.5rem;
}

/* ========= 无数据状态 ========= */
.no-wrong-answers,
.no-data {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--muted);
}

.no-data-icon {
  font-size: 4rem;
  margin-bottom: 1.25rem;
  opacity: 0.5;
}

.no-wrong-answers h3,
.no-data h3 {
  font-size: 1.25rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.no-wrong-answers p,
.no-data p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

/* ========= 分页 ========= */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
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
  background: var(--primary-light);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 模态框 ========= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.modal-close:hover {
  background: var(--bg);
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* ========= 题目详情 ========= */
.question-detail {
  max-width: 100%;
}

.detail-header {
  margin-bottom: 1.5rem;
}

.detail-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.difficulty-tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.difficulty-tag.easy {
  background: var(--primary-light);
  color: var(--primary);
}

.difficulty-tag.medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-tag.hard {
  background: #fee2e2;
  color: #dc2626;
}

.detail-content {
  line-height: 1.6;
}

.question-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.option-item.correct {
  border-color: #10b981;
  background: #ecfdf5;
}

.option-item.wrong {
  border-color: #ef4444;
  background: #fef2f2;
}

.option-marker {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
}

.option-item .option-marker {
  border: 2px solid var(--border);
}

.option-item.correct .option-marker {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.option-item.wrong .option-marker {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.correct-marker,
.wrong-marker {
  font-size: 14px;
}

.option-key {
  font-size: 0.875rem;
}

.option-text {
  flex: 1;
  line-height: 1.5;
}

.explanation-section {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--primary);
}

.explanation-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.explanation {
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1rem;
}

.explanation-meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: var(--muted);
  flex-wrap: wrap;
}

.explanation-meta strong {
  color: var(--primary-dark);
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

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .weak-areas-grid {
    grid-template-columns: 1fr;
  }
  
  .list-header {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .wrong-answer-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .col-question {
    grid-column: 1;
  }
  
  .col-field,
  .col-frequency,
  .col-last-wrong,
  .col-status,
  .col-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
  }
  
  .wrong-answers-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--container-padding, 1.5rem);
  }
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    justify-content: space-between;
  }
  
  .search-group {
    min-width: auto;
  }
  
  .questions-section .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .view-controls {
    width: 100%;
    justify-content: center;
  }
  
  .area-stats {
    grid-template-columns: 1fr;
  }
  
  .area-actions {
    flex-direction: column;
  }
  
  .col-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .footer-actions .btn {
    width: 100%;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
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
  
  .header-stats {
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .detail-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .explanation-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>