<!-- src/views/exam/ExamReview.vue -->
<template>
  <div class="exam-review">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-main">
            <h1>考试回顾</h1>
            <p>详细分析您的考试表现，了解强弱项，提升学习效率</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline" @click="goBack">
              ← 返回考试列表
            </button>
            <button class="btn btn-primary" @click="retakeExam">
              重新考试
            </button>
            <button class="btn btn-secondary" @click="showExamHistory">
              考试记录
            </button>
          </div>
        </div>
      </div>

      <!-- 考试概览 -->
      <section class="overview-section">
        <div class="overview-grid">
          <!-- 总体成绩 -->
          <div class="overview-card score-card">
            <div class="card-header">
              <h3>总体成绩</h3>
              <div class="exam-type">{{ examData.typeText }}</div>
            </div>
            <div class="score-display">
              <div class="score-main" :class="getScoreClass(examResult.score)">
                <span class="score-number">{{ displayScore }}</span>
                <span class="score-label">{{ scoreLabel }}</span>
              </div>
              <div class="score-details">
                <div class="detail-item">
                  <span class="label">正确率</span>
                  <span class="value">{{ examResult.accuracy }}%</span>
                </div>
                <div class="detail-item">
                  <span class="label">做对题数</span>
                  <span class="value">{{ examResult.correctCount }}/{{ examResult.totalQuestions }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">考试用时</span>
                  <span class="value">{{ formatTime(examResult.timeUsed) }}</span>
                </div>
                <div class="detail-item">
                  <span class="label">提交时间</span>
                  <span class="value">{{ formatDate(examResult.submitTime) }}</span>
                </div>
              </div>
            </div>
            <div class="pass-status" :class="examResult.passed ? 'passed' : 'failed'">
              <span class="status-icon">{{ examResult.passed ? '✅' : '❌' }}</span>
              <span class="status-text">{{ examResult.passed ? '通过考试' : '未通过考试' }}</span>
            </div>
          </div>

          <!-- 分野分析 -->
          <div class="overview-card domain-card">
            <div class="card-header">
              <h3>分野分析</h3>
              <span class="subtitle">各领域掌握情况</span>
            </div>
            <div class="domain-analysis">
              <div 
                v-for="domain in domainAnalysis" 
                :key="domain.id"
                class="domain-item"
              >
                <div class="domain-info">
                  <span class="domain-name">{{ domain.name }}</span>
                  <span class="domain-score">{{ domain.correctCount }}/{{ domain.totalCount }}</span>
                </div>
                <div class="progress-section">
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: domain.accuracy + '%' }"
                      :class="getAccuracyClass(domain.accuracy)"
                    ></div>
                  </div>
                  <span class="accuracy">{{ domain.accuracy }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 考试信息 -->
          <div class="overview-card info-card">
            <div class="card-header">
              <h3>考试信息</h3>
            </div>
            <div class="info-list">
              <div class="info-item">
                <span class="label">考试标题</span>
                <span class="value">{{ examData.title }}</span>
              </div>
              <div class="info-item">
                <span class="label">考试类型</span>
                <span class="value">{{ examData.typeText }}</span>
              </div>
              <div class="info-item">
                <span class="label">题目数量</span>
                <span class="value">{{ examResult.totalQuestions }} 题</span>
              </div>
              <div class="info-item">
                <span class="label">考试时长</span>
                <span class="value">{{ examData.duration }} 分钟</span>
              </div>
              <div class="info-item">
                <span class="label">及格分数</span>
                <span class="value">{{ examData.passingScore }} 分</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 详细分析 -->
      <section class="analysis-section">
        <div class="section-header">
          <h2>详细分析</h2>
          <p>深入了解您的考试表现，发现学习中的薄弱环节</p>
        </div>

        <div class="analysis-grid">
          <!-- 答题时间分布 -->
          <div class="analysis-card">
            <h3>答题时间分布</h3>
            <div class="time-analysis">
              <div class="time-item">
                <span class="time-label">平均每题用时</span>
                <span class="time-value">{{ formatSeconds(examResult.averageTimePerQuestion) }}</span>
              </div>
              <div class="time-item">
                <span class="time-label">最快答题</span>
                <span class="time-value">{{ formatSeconds(examResult.fastestAnswer) }}</span>
              </div>
              <div class="time-item">
                <span class="time-label">最慢答题</span>
                <span class="time-value">{{ formatSeconds(examResult.slowestAnswer) }}</span>
              </div>
              <div class="time-item">
                <span class="time-label">时间利用率</span>
                <span class="time-value">{{ examResult.timeEfficiency }}%</span>
              </div>
            </div>
          </div>

          <!-- 正确率趋势 -->
          <div class="analysis-card">
            <h3>正确率趋势</h3>
            <div class="accuracy-trend">
              <div class="trend-item" v-for="(trend, index) in accuracyTrend" :key="index">
                <div class="trend-bar">
                  <div 
                    class="trend-fill" 
                    :style="{ height: trend.accuracy + '%' }"
                    :class="getAccuracyClass(trend.accuracy)"
                  ></div>
                </div>
                <span class="trend-label">{{ trend.label }}</span>
                <span class="trend-value">{{ trend.accuracy }}%</span>
              </div>
            </div>
          </div>

          <!-- 强弱项分析 -->
          <div class="analysis-card weak-areas-card">
            <h3>强弱项分析</h3>
            <div class="weak-areas">
              <div class="strength-section">
                <h4>强项领域</h4>
                <div class="area-list">
                  <div 
                    v-for="area in strongAreas" 
                    :key="area.id"
                    class="area-item strength"
                  >
                    <span class="area-name">{{ area.name }}</span>
                    <span class="area-accuracy">{{ area.accuracy }}%</span>
                  </div>
                  <div v-if="strongAreas.length === 0" class="no-data">
                    暂无强项数据
                  </div>
                </div>
              </div>
              <div class="weakness-section">
                <h4>弱项领域</h4>
                <div class="area-list">
                  <div 
                    v-for="area in weakAreas" 
                    :key="area.id"
                    class="area-item weakness"
                  >
                    <span class="area-name">{{ area.name }}</span>
                    <span class="area-accuracy">{{ area.accuracy }}%</span>
                  </div>
                  <div v-if="weakAreas.length === 0" class="no-data">
                    暂无弱项数据
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 题目回顾 -->
      <section class="questions-section">
        <div class="section-header">
          <div class="header-left">
            <h2>题目回顾</h2>
            <p>查看所有题目及其解析，重点复习错题</p>
          </div>
          <div class="header-right">
            <div class="filter-controls">
              <button 
                class="filter-btn" 
                :class="{ active: activeFilter === 'all' }"
                @click="setFilter('all')"
              >
                全部题目
              </button>
              <button 
                class="filter-btn" 
                :class="{ active: activeFilter === 'wrong' }"
                @click="setFilter('wrong')"
              >
                仅错题
              </button>
              <button 
                class="filter-btn" 
                :class="{ active: activeFilter === 'marked' }"
                @click="setFilter('marked')"
              >
                已标记
              </button>
            </div>
          </div>
        </div>

        <div class="questions-list">
          <div 
            v-for="(question, index) in filteredQuestions" 
            :key="question.id"
            class="question-review-card"
            :class="{
              'wrong': !question.isCorrect,
              'marked': question.marked
            }"
          >
            <div class="question-header">
              <div class="question-meta">
                <span class="question-number">第 {{ question.number }} 题</span>
                <span class="question-status" :class="question.isCorrect ? 'correct' : 'wrong'">
                  {{ question.isCorrect ? '正确' : '错误' }}
                </span>
                <span class="question-difficulty" :class="question.difficultyClass">
                  {{ question.difficultyText }}
                </span>
                <span class="question-field">{{ question.field }}</span>
              </div>
              <div class="question-actions">
                <button 
                  class="btn btn-outline btn-sm"
                  :class="{ 'active': question.marked }"
                  @click="toggleMark(question.id)"
                >
                  <span class="btn-icon">{{ question.marked ? '★' : '☆' }}</span>
                  {{ question.marked ? '已标记' : '标记' }}
                </button>
                <button 
                  class="btn btn-outline btn-sm"
                  @click="addToWrongAnswers(question)"
                  v-if="!question.isCorrect"
                >
                  加入错题本
                </button>
              </div>
            </div>

            <div class="question-content">
              <div class="question-text" v-html="question.text"></div>
              
              <!-- 选项区域 -->
              <div class="options-review">
                <div 
                  v-for="option in question.options" 
                  :key="option.key"
                  class="option-review-item"
                  :class="{
                    'correct': option.key === question.correctAnswer,
                    'selected': question.userAnswer && 
                               (question.type === 'multi_choice' 
                                 ? question.userAnswer.split(',').includes(option.key)
                                 : question.userAnswer === option.key),
                    'wrong-selected': !question.isCorrect && 
                                    question.userAnswer && 
                                    (question.type === 'multi_choice' 
                                      ? question.userAnswer.split(',').includes(option.key)
                                      : question.userAnswer === option.key) &&
                                    option.key !== question.correctAnswer
                  }"
                >
                  <div class="option-indicator">
                    <div class="option-marker">
                      <span v-if="option.key === question.correctAnswer" class="correct-marker">✓</span>
                      <span v-else-if="!question.isCorrect && question.userAnswer && 
                              (question.type === 'multi_choice' 
                                ? question.userAnswer.split(',').includes(option.key)
                                : question.userAnswer === option.key)" 
                            class="wrong-marker">✗</span>
                      <span v-else class="option-key">{{ option.key }}</span>
                    </div>
                  </div>
                  <div class="option-text" v-html="option.text"></div>
                </div>
              </div>

              <!-- 答案解析 -->
              <div class="explanation-section">
                <h4>答案解析</h4>
                <div class="explanation-content" v-html="question.explanation"></div>
                <div class="explanation-meta">
                  <span>您的答案: <strong>{{ question.userAnswer || '未作答' }}</strong></span>
                  <span>正确答案: <strong>{{ question.correctAnswer }}</strong></span>
                  <span>答题用时: <strong>{{ formatSeconds(question.timeSpent) }}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredQuestions.length === 0" class="no-questions">
          <div class="no-questions-icon">📝</div>
          <h3>暂无相关题目</h3>
          <p>请尝试调整筛选条件</p>
        </div>
      </section>

      <!-- 行动建议 -->
      <section class="recommendation-section">
        <div class="section-header">
          <h2>学习建议</h2>
          <p>基于您的考试表现，为您提供个性化的学习建议</p>
        </div>

        <div class="recommendation-grid">
          <div class="recommendation-card">
            <div class="card-icon">🎯</div>
            <h3>重点复习领域</h3>
            <ul class="recommendation-list">
              <li v-for="area in weakAreas.slice(0, 3)" :key="area.id">
                {{ area.name }} (正确率: {{ area.accuracy }}%)
              </li>
              <li v-if="weakAreas.length === 0">暂无弱项，继续保持！</li>
            </ul>
            <button class="btn btn-outline btn-sm" @click="startSmartPractice">
              智能组卷练习
            </button>
          </div>

          <div class="recommendation-card">
            <div class="card-icon">⏱️</div>
            <h3>时间管理建议</h3>
            <div class="time-recommendation">
              <p v-if="examResult.timeEfficiency < 70">
                您的答题时间利用率较低，建议加强时间管理训练
              </p>
              <p v-else-if="examResult.timeEfficiency < 90">
                时间管理良好，可以进一步优化答题节奏
              </p>
              <p v-else>
                时间管理优秀，继续保持！
              </p>
              <p>平均每题用时: {{ formatSeconds(examResult.averageTimePerQuestion) }}</p>
            </div>
          </div>

          <div class="recommendation-card">
            <div class="card-icon">📚</div>
            <h3>下一步学习计划</h3>
            <div class="study-plan">
              <button class="btn btn-outline" @click="goToWrongAnswers">
                查看错题本
              </button>
              <button class="btn btn-outline" @click="startTargetedPractice">
                专项练习
              </button>
              <button class="btn btn-primary" @click="retakeExam">
                重新考试
              </button>
              <button class="btn btn-secondary" @click="showExamHistory">
                考试记录
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 智能组卷推荐 -->
      <section v-if="weakAreas.length > 0" class="smart-exam-recommendation">
        <div class="section-header">
          <h2>智能学习推荐</h2>
          <p>基于您的薄弱环节，推荐个性化的学习方案</p>
        </div>
        
        <div class="smart-recommendation-card">
          <div class="recommendation-content">
            <div class="recommendation-icon">🧠</div>
            <div class="recommendation-text">
              <h3>个性化智能组卷</h3>
              <p>基于您在本考试中的薄弱领域，为您生成针对性的练习试卷，重点提升 {{ weakAreas.slice(0, 2).map(area => area.name).join('、') }} 等领域的掌握程度。</p>
              <div class="weakness-tags">
                <span 
                  v-for="area in weakAreas.slice(0, 3)" 
                  :key="area.id"
                  class="weakness-tag"
                >
                  {{ area.name }} ({{ area.accuracy }}%)
                </span>
              </div>
            </div>
          </div>
          <div class="recommendation-actions">
            <button class="btn btn-primary" @click="startSmartExam">
              开始智能组卷
            </button>
            <button class="btn btn-outline" @click="customizeSmartExam">
              自定义组卷
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 状态管理
const activeFilter = ref('all')
const examData = ref({})
const examResult = ref({})
const questions = ref([])

// 计算属性
const displayScore = computed(() => {
  if (examResult.value.displayType === 'score') {
    return examResult.value.score
  } else {
    return `${examResult.value.correctCount}/${examResult.value.totalQuestions}`
  }
})

const scoreLabel = computed(() => {
  return examResult.value.displayType === 'score' ? '分' : '做对题数'
})

const domainAnalysis = computed(() => {
  // 按领域分组统计
  const domains = {}
  questions.value.forEach(q => {
    if (!domains[q.field]) {
      domains[q.field] = {
        id: q.field,
        name: q.field,
        correctCount: 0,
        totalCount: 0,
        accuracy: 0
      }
    }
    domains[q.field].totalCount++
    if (q.isCorrect) {
      domains[q.field].correctCount++
    }
  })

  // 计算正确率
  Object.values(domains).forEach(domain => {
    domain.accuracy = Math.round((domain.correctCount / domain.totalCount) * 100)
  })

  return Object.values(domains)
})

const strongAreas = computed(() => {
  return domainAnalysis.value
    .filter(domain => domain.accuracy >= 80)
    .sort((a, b) => b.accuracy - a.accuracy)
})

const weakAreas = computed(() => {
  return domainAnalysis.value
    .filter(domain => domain.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
})

const accuracyTrend = computed(() => {
  const chunkSize = Math.ceil(questions.value.length / 5)
  const trends = []
  
  for (let i = 0; i < 5; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, questions.value.length)
    const chunk = questions.value.slice(start, end)
    
    if (chunk.length > 0) {
      const correctCount = chunk.filter(q => q.isCorrect).length
      const accuracy = Math.round((correctCount / chunk.length) * 100)
      
      trends.push({
        label: `${start + 1}-${end}`,
        accuracy: accuracy
      })
    }
  }
  
  return trends
})

const filteredQuestions = computed(() => {
  let filtered = questions.value
  
  if (activeFilter.value === 'wrong') {
    filtered = filtered.filter(q => !q.isCorrect)
  } else if (activeFilter.value === 'marked') {
    filtered = filtered.filter(q => q.marked)
  }
  
  return filtered
})

// 方法
const initializeReview = () => {
  // 从路由参数或本地存储获取考试数据
  const examId = route.query.examId
  const sessionId = route.query.sessionId
  
  // 模拟数据 - 实际应该从API获取
  examData.value = {
    id: examId,
    title: '2024年模拟考试 #1',
    type: 'simulation',
    typeText: '模拟考试',
    duration: 120,
    passingScore: 35
  }
  
  examResult.value = {
    score: 42,
    correctCount: 42,
    totalQuestions: 50,
    accuracy: 84,
    timeUsed: 6540, // 秒
    submitTime: new Date().toISOString(),
    passed: true,
    displayType: 'score',
    averageTimePerQuestion: 65,
    fastestAnswer: 15,
    slowestAnswer: 180,
    timeEfficiency: 91
  }
  
  // 生成模拟题目数据
  generateQuestions()
}

const generateQuestions = () => {
  const fields = ['宅建业法', '权利关系', '法令制限', '税・其他', '五问免除']
  const difficulties = [
    { level: 1, text: '简单', class: 'easy' },
    { level: 2, text: '中等', class: 'medium' },
    { level: 3, text: '困难', class: 'hard' }
  ]
  
  questions.value = Array.from({ length: 50 }, (_, index) => {
    const field = fields[Math.floor(Math.random() * fields.length)]
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
    const isCorrect = Math.random() > 0.2 // 80%正确率
    const userAnswer = isCorrect ? 'B' : 'A'
    
    return {
      id: `q_${index + 1}`,
      number: index + 1,
      type: 'single_choice',
      text: `下列关于${field}相关知识的说法中，正确的是？`,
      options: [
        { key: 'A', text: '这是一个错误的选项内容' },
        { key: 'B', text: '这是正确的选项内容' },
        { key: 'C', text: '这个选项描述了相关的情况' },
        { key: 'D', text: '最后一个选项内容' }
      ],
      correctAnswer: 'B',
      userAnswer: userAnswer,
      explanation: '本题考察相关法律条款的具体应用。正确答案需要结合实际情况和法律条文进行判断。错误的选项通常是因为理解偏差或记忆错误。',
      field: field,
      difficulty: difficulty.level,
      difficultyText: difficulty.text,
      difficultyClass: difficulty.class,
      isCorrect: isCorrect,
      marked: Math.random() > 0.8, // 20%的题目被标记
      timeSpent: Math.floor(Math.random() * 120) + 30 // 30-150秒
    }
  })
}

const getScoreClass = (score) => {
  if (score >= 40) return 'excellent'
  if (score >= 35) return 'good'
  if (score >= 30) return 'average'
  return 'poor'
}

const getAccuracyClass = (accuracy) => {
  if (accuracy >= 80) return 'excellent'
  if (accuracy >= 70) return 'good'
  if (accuracy >= 60) return 'average'
  return 'poor'
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}小时${minutes}分${secs}秒`
  } else if (minutes > 0) {
    return `${minutes}分${secs}秒`
  } else {
    return `${secs}秒`
  }
}

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}分${secs.toString().padStart(2, '0')}秒`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const setFilter = (filter) => {
  activeFilter.value = filter
}

const toggleMark = (questionId) => {
  const question = questions.value.find(q => q.id === questionId)
  if (question) {
    question.marked = !question.marked
    // 实际应该调用API保存标记状态
  }
}

const addToWrongAnswers = (question) => {
  if (!question.isCorrect) {
    // 调用API将题目添加到错题本
    console.log('添加到错题本:', question.id)
    alert('已添加到错题本')
  }
}

const goBack = () => {
  router.push('/exam')
}

const retakeExam = () => {
  router.push({
    path: '/exam/session',
    query: { examId: examData.value.id }
  })
}

const goToWrongAnswers = () => {
  router.push('/wrong-answers')
}

const showExamHistory = () => {
  router.push('/exam/history')
}

const startTargetedPractice = () => {
  // 基于弱项领域生成专项练习
  const weakFields = weakAreas.value.map(area => area.id)
  router.push({
    path: '/practice',
    query: { 
      fields: weakFields.join(','),
      type: 'targeted'
    }
  })
}

const startSmartPractice = () => {
  // 基于当前考试的弱项领域启动智能组卷
  const weakFields = weakAreas.value.map(area => area.id)
  router.push({
    path: '/exam/smart-config',
    query: { 
      focusAreas: weakFields.join(','),
      source: 'exam_review',
      examId: examData.value.id
    }
  })
}

const startSmartExam = () => {
  // 启动智能组卷
  router.push('/exam/smart-config')
}

const customizeSmartExam = () => {
  // 自定义智能组卷
  router.push({
    path: '/exam/smart-config',
    query: { 
      custom: 'true',
      examId: examData.value.id
    }
  })
}

onMounted(() => {
  initializeReview()
})
</script>

<style scoped>
/* 新增智能推荐卡片样式 */
.smart-exam-recommendation {
  margin: 3rem 0;
}

.smart-recommendation-card {
  background: linear-gradient(135deg, var(--primary-light), rgba(42, 121, 96, 0.1));
  border-radius: var(--radius);
  padding: 2rem;
  border: 2px solid var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.recommendation-content {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  flex: 1;
}

.recommendation-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.recommendation-text h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.recommendation-text p {
  color: var(--muted);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.weakness-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.weakness-tag {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.recommendation-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* 其他现有样式保持不变 */
.exam-review {
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

/* ========= 考试概览 ========= */
.overview-section {
  margin: 3rem 0;
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}

.overview-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
}

.exam-type {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.subtitle {
  font-size: 0.875rem;
  color: var(--muted);
}

/* 成绩卡片 */
.score-display {
  text-align: center;
  margin-bottom: 1.5rem;
}

.score-main {
  margin-bottom: 1.5rem;
}

.score-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.score-number.excellent { color: var(--excellent); }
.score-number.good { color: var(--good); }
.score-number.average { color: var(--average); }
.score-number.poor { color: var(--poor); }

.score-label {
  font-size: 1rem;
  color: var(--muted);
}

.score-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item .label {
  font-size: 0.875rem;
  color: var(--muted);
}

.detail-item .value {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.pass-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
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

/* 领域分析 */
.domain-analysis {
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

.progress-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-fill.excellent { background: var(--excellent); }
.progress-fill.good { background: var(--good); }
.progress-fill.average { background: var(--average); }
.progress-fill.poor { background: var(--poor); }

.accuracy {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
  min-width: 40px;
  text-align: right;
}

/* 信息卡片 */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

/* ========= 详细分析 ========= */
.analysis-section {
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

.analysis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}

.analysis-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.analysis-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

/* 时间分析 */
.time-analysis {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.time-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-light);
}

.time-item:last-child {
  border-bottom: none;
}

.time-label {
  font-size: 0.875rem;
  color: var(--muted);
}

.time-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
}

/* 正确率趋势 */
.accuracy-trend {
  display: flex;
  align-items: end;
  gap: 0.75rem;
  height: 120px;
}

.trend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.trend-bar {
  width: 100%;
  height: 80px;
  background: var(--border);
  border-radius: 4px;
  display: flex;
  align-items: end;
  position: relative;
}

.trend-fill {
  width: 100%;
  border-radius: 4px;
  transition: height 0.5s ease;
}

.trend-fill.excellent { background: var(--excellent); }
.trend-fill.good { background: var(--good); }
.trend-fill.average { background: var(--average); }
.trend-fill.poor { background: var(--poor); }

.trend-label {
  font-size: 0.75rem;
  color: var(--muted);
}

.trend-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary-dark);
}

/* 强弱项分析 */
.weak-areas-card {
  grid-column: span 2;
}

.weak-areas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.strength-section h4,
.weakness-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.strength-section h4 {
  color: var(--excellent);
}

.weakness-section h4 {
  color: var(--poor);
}

.area-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.area-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.area-item.strength {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
}

.area-item.weakness {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.2);
}

.area-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.area-accuracy {
  font-size: 0.875rem;
  font-weight: 600;
}

.area-item.strength .area-accuracy {
  color: var(--excellent);
}

.area-item.weakness .area-accuracy {
  color: var(--poor);
}

.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--muted);
  font-size: 0.875rem;
}

/* ========= 题目回顾 ========= */
.questions-section {
  margin: 3rem 0;
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

.filter-controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--primary);
}

.filter-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* 题目回顾卡片 */
.questions-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-review-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.question-review-card.wrong {
  border-left: 4px solid var(--poor);
}

.question-review-card.marked {
  border-left: 4px solid #f59e0b;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.question-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.question-number {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.question-status {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.question-status.correct {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.question-status.wrong {
  background: #fee2e2;
  color: #dc2626;
}

.question-difficulty {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.question-difficulty.easy {
  background: var(--primary-light);
  color: var(--primary);
}

.question-difficulty.medium {
  background: #fef3c7;
  color: #92400e;
}

.question-difficulty.hard {
  background: #fee2e2;
  color: #dc2626;
}

.question-field {
  padding: 4px 8px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--muted);
}

.question-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn-icon {
  margin-right: 4px;
}

/* 题目内容 */
.question-content {
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

/* 选项回顾 */
.options-review {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.option-review-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.option-review-item.correct {
  border-color: #10b981;
  background: #ecfdf5;
}

.option-review-item.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option-review-item.wrong-selected {
  border-color: #ef4444;
  background: #fef2f2;
}

.option-indicator {
  flex-shrink: 0;
}

.option-marker {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
}

.option-review-item .option-marker {
  border: 2px solid var(--border);
}

.option-review-item.correct .option-marker {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.option-review-item.wrong-selected .option-marker {
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

/* 答案解析 */
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

.explanation-content {
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

/* 无题目状态 */
.no-questions {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--muted);
}

.no-questions-icon {
  font-size: 4rem;
  margin-bottom: 1.25rem;
  opacity: 0.5;
}

.no-questions h3 {
  font-size: 1.25rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.no-questions p {
  font-size: 1rem;
}

/* ========= 学习建议 ========= */
.recommendation-section {
  margin: 3rem 0;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.recommendation-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  text-align: center;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.recommendation-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.recommendation-list {
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommendation-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.875rem;
}

.recommendation-list li:last-child {
  border-bottom: none;
}

.time-recommendation {
  text-align: left;
}

.time-recommendation p {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.time-recommendation p:last-child {
  margin-bottom: 0;
}

.study-plan {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

.btn-outline.active {
  background: var(--primary);
  color: white;
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

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .analysis-grid {
    grid-template-columns: 1fr;
  }
  
  .weak-areas-card {
    grid-column: span 1;
  }
  
  .weak-areas {
    grid-template-columns: 1fr;
  }
  
  .smart-recommendation-card {
    flex-direction: column;
    text-align: center;
  }
  
  .recommendation-content {
    flex-direction: column;
    align-items: center;
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
  
  .questions-section .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-controls {
    width: 100%;
    justify-content: flex-start;
  }
  
  .question-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .question-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .explanation-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .recommendation-grid {
    grid-template-columns: 1fr;
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
  
  .overview-card {
    padding: 1rem;
  }
  
  .analysis-card {
    padding: 1rem;
  }
  
  .question-review-card {
    padding: 1rem;
  }
  
  .question-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .option-review-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>