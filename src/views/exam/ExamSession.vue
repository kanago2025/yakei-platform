<!-- src/views/ExamSession.vue -->
<template>
  <div class="exam-session">
    <!-- 考试头部 - 固定定位 -->
    <header class="exam-header" :class="{ 'warning': timeLeft < 600 }">
      <div class="container">
        <div class="header-content">
          <div class="exam-info">
            <h1>{{ examData.title }}</h1>
            <p class="exam-desc">{{ examData.description }}</p>
          </div>
          
          <div class="exam-controls">
            <!-- 计时器 -->
            <div class="timer-section">
              <div class="timer" :class="{
                'warning': timeLeft < 600,
                'critical': timeLeft < 300
              }">
                {{ formatTime(timeLeft) }}
              </div>
              <div class="timer-label">剩余时间</div>
            </div>

            <!-- 进度 -->
            <div class="progress-section">
              <div class="progress-info">
                <span>题目</span>
                <span>{{ currentQuestion + 1 }}/{{ questions.length }}</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: ((currentQuestion + 1) / questions.length * 100) + '%' }"
                ></div>
              </div>
            </div>

            <!-- 控制按钮 -->
            <div class="control-buttons">
              <button 
                v-if="examData.canPause" 
                class="btn btn-outline"
                @click="togglePause"
                :disabled="isSubmitting"
              >
                {{ isPaused ? '继续考试' : '暂停' }}
              </button>
              <button 
                class="btn btn-primary"
                @click="submitExam"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? '提交中...' : '提交试卷' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 暂停遮罩 -->
    <div v-if="isPaused" class="pause-overlay">
      <div class="pause-content">
        <div class="pause-icon">⏸️</div>
        <h2>考试已暂停</h2>
        <p>请点击"继续考试"按钮恢复考试</p>
        <div class="pause-time">
          已用时: {{ formatTime(examData.duration * 60 - timeLeft) }}
        </div>
        <button class="btn btn-primary" @click="togglePause">
          继续考试
        </button>
      </div>
    </div>

    <!-- 主要内容 -->
    <main class="exam-main">
      <div class="container">
        <div class="exam-content">
          <!-- 题目区域 -->
          <section class="question-section">
            <div class="question-header">
              <div class="question-meta">
                <span class="question-number">第 {{ currentQuestion + 1 }} 题</span>
                <span class="question-type">{{ currentQuestionData.type === 'multi_choice' ? '多选题' : '单选题' }}</span>
                <span class="question-difficulty" :class="currentQuestionData.difficultyClass">
                  {{ currentQuestionData.difficultyText }}
                </span>
              </div>
              
              <div class="question-actions">
                <button 
                  class="btn btn-outline btn-sm"
                  :class="{ 'active': isMarked }"
                  @click="toggleMark"
                >
                  <span class="btn-icon">{{ isMarked ? '★' : '☆' }}</span>
                  {{ isMarked ? '已标记' : '标记' }}
                </button>
              </div>
            </div>

            <!-- 题目内容 -->
            <div class="question-content">
              <div class="question-text" v-html="currentQuestionData.text"></div>
              
              <!-- 选项区域 -->
              <div class="options-section">
                <div 
                  v-for="(option, index) in currentQuestionData.options" 
                  :key="index"
                  class="option-item"
                  :class="{
                    'selected': isOptionSelected(option.key),
                    'correct': showAnswer && option.key === currentQuestionData.correctAnswer,
                    'wrong': showAnswer && isOptionSelected(option.key) && option.key !== currentQuestionData.correctAnswer
                  }"
                  @click="selectOption(option.key)"
                >
                  <div class="option-selector">
                    <div class="option-circle">
                      <div class="option-inner" v-if="isOptionSelected(option.key)"></div>
                    </div>
                    <span class="option-key">{{ option.key }}.</span>
                  </div>
                  <div class="option-content" v-html="option.text"></div>
                </div>
              </div>
            </div>

            <!-- 答案解析（提交后显示） -->
            <div v-if="showAnswer" class="answer-section">
              <div class="answer-header">
                <h3>答案解析</h3>
                <div class="answer-status" :class="isAnswerCorrect ? 'correct' : 'wrong'">
                  {{ isAnswerCorrect ? '回答正确' : '回答错误' }}
                </div>
              </div>
              <div class="explanation" v-html="currentQuestionData.explanation"></div>
              <div class="answer-stats">
                <span>正确率: {{ currentQuestionData.correctRate }}%</span>
                <span>难度: {{ currentQuestionData.difficultyText }}</span>
              </div>
            </div>
          </section>

          <!-- 答题卡侧边栏 -->
          <aside class="answer-sheet-sidebar">
            <div class="sidebar-content">
              <div class="sidebar-section">
                <h3>答题卡</h3>
                <div class="answer-sheet">
                  <div 
                    v-for="(question, index) in questions" 
                    :key="index"
                    class="sheet-item"
                    :class="{
                      'current': index === currentQuestion,
                      'answered': question.userAnswer,
                      'marked': question.marked,
                      'viewed': question.viewed
                    }"
                    @click="goToQuestion(index)"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
              </div>

              <div class="sidebar-section">
                <h3>答题状态</h3>
                <div class="status-legends">
                  <div class="status-item">
                    <div class="status-color current"></div>
                    <span>当前题目</span>
                  </div>
                  <div class="status-item">
                    <div class="status-color answered"></div>
                    <span>已作答</span>
                  </div>
                  <div class="status-item">
                    <div class="status-color marked"></div>
                    <span>已标记</span>
                  </div>
                  <div class="status-item">
                    <div class="status-color"></div>
                    <span>未作答</span>
                  </div>
                </div>
              </div>

              <div class="sidebar-section">
                <h3>考试信息</h3>
                <div class="exam-info-list">
                  <div class="info-item">
                    <span class="info-label">考试类型:</span>
                    <span class="info-value">{{ examData.typeText }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">题目数量:</span>
                    <span class="info-value">{{ questions.length }} 题</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">已作答:</span>
                    <span class="info-value">{{ answeredCount }} 题</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">已标记:</span>
                    <span class="info-value">{{ markedCount }} 题</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <!-- 导航控制 -->
        <footer class="exam-footer">
          <div class="nav-controls">
            <button 
              class="btn btn-outline"
              @click="prevQuestion"
              :disabled="currentQuestion === 0"
            >
              上一题
            </button>
            
            <div class="nav-info">
              <span>题目导航</span>
            </div>
            
            <button 
              class="btn btn-outline"
              @click="nextQuestion"
              :disabled="currentQuestion === questions.length - 1"
            >
              下一题
            </button>
          </div>
        </footer>
      </div>
    </main>

    <!-- 提交确认对话框 -->
    <div v-if="showSubmitDialog" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>提交试卷</h3>
        </div>
        <div class="modal-body">
          <p>您确定要提交试卷吗？提交后无法修改答案。</p>
          <div class="submit-stats">
            <div class="stat-item">
              <span class="stat-label">已作答:</span>
              <span class="stat-value">{{ answeredCount }}/{{ questions.length }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">剩余时间:</span>
              <span class="stat-value">{{ formatTime(timeLeft) }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">标记题目:</span>
              <span class="stat-value">{{ markedCount }} 题</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="showSubmitDialog = false">
            继续答题
          </button>
          <button class="btn btn-primary" @click="confirmSubmit">
            确认提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 考试状态
const examData = ref({
  id: '',
  title: '',
  description: '',
  type: 'random', // random, yearly, simulation
  typeText: '随机组卷',
  duration: 120, // 分钟
  questionCount: 50,
  canPause: true,
  startTime: null
})

const questions = ref([])
const currentQuestion = ref(0)
const timeLeft = ref(0) // 秒
const isPaused = ref(false)
const isSubmitting = ref(false)
const showSubmitDialog = ref(false)
const examTimer = ref(null)

// 计算属性
const currentQuestionData = computed(() => {
  return questions.value[currentQuestion.value] || {}
})

const isMarked = computed(() => {
  return currentQuestionData.value.marked || false
})

const showAnswer = computed(() => {
  return isSubmitting.value
})

const isAnswerCorrect = computed(() => {
  const question = currentQuestionData.value
  if (!question.userAnswer || !question.correctAnswer) return false
  return question.userAnswer === question.correctAnswer
})

const answeredCount = computed(() => {
  return questions.value.filter(q => q.userAnswer).length
})

const markedCount = computed(() => {
  return questions.value.filter(q => q.marked).length
})

// 方法
const initializeExam = () => {
  const examId = route.query.examId
  const type = route.query.type || 'random'
  // 智能组卷类型支持
  if (type === 'smart') {
    // 从智能组卷store获取生成的考试
    const smartExamStore = useSmartExamStore()
    const smartExam = smartExamStore.generatedExams.find(
      exam => exam.id === examId
    )
    if (smartExam) {
      examData.value = {
        id: smartExam.id,
        title: smartExam.title,
        description: '基于您的学习数据生成的个性化试卷',
        type: 'smart',
        typeText: '智能组卷',
        duration: smartExam.duration,
        questionCount: smartExam.questions.length,
        canPause: true,
        startTime: new Date()
      }
      questions.value = smartExam.questions
      timeLeft.value = smartExam.duration * 60
      startTimer()
      loadExamProgress()
      return
    }
  }
  
  // 设置考试数据
  examData.value = {
    id: examId,
    title: getExamTitle(type, examId),
    description: getExamDescription(type),
    type: type,
    typeText: getTypeText(type),
    duration: parseInt(route.query.duration) || 120,
    questionCount: parseInt(route.query.questionCount) || 50,
    canPause: type === 'yearly', // 历年真题可暂停
    startTime: new Date()
  }
  
  // 初始化时间
  timeLeft.value = examData.value.duration * 60
  
  // 生成模拟题目
  generateQuestions(examData.value.questionCount)
  
  // 开始计时
  startTimer()
  
  // 加载保存的进度
  loadExamProgress()
}

const generateQuestions = (count) => {
  const questionTypes = ['single_choice', 'multi_choice']
  const difficulties = [
    { level: 1, text: '简单', class: 'easy' },
    { level: 2, text: '中等', class: 'medium' },
    { level: 3, text: '困难', class: 'hard' }
  ]
  
  const fields = ['宅建业法', '权利关系', '法令制限', '税・其他', '五问免除']
  const topics = {
    '宅建业法': ['免许制度', '重要事项说明', '媒介代理', '营业保证金'],
    '权利关系': ['代理', '抵当権', '物権変動', '相続'],
    '法令制限': ['都市計画法', '建築基準法', '国土利用計画法'],
    '税・其他': ['不动产税', '价格评定'],
    '五问免除': ['住宅金融', '景品表示法', '土地建物']
  }
  
  questions.value = Array.from({ length: count }, (_, index) => {
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)]
    const field = fields[Math.floor(Math.random() * fields.length)]
    const topicList = topics[field]
    const topic = topicList[Math.floor(Math.random() * topicList.length)]
    
    return {
      id: `q_${index + 1}`,
      number: index + 1,
      type: type,
      text: `下列关于${topic}的说法中，正确的是？`,
      options: generateOptions(type),
      correctAnswer: type === 'multi_choice' ? 'A,C' : 'B',
      explanation: '本题考察的是相关法律条款的具体应用。正确答案需要结合实际情况和法律条文进行判断。',
      difficulty: difficulty.level,
      difficultyText: difficulty.text,
      difficultyClass: difficulty.class,
      correctRate: Math.floor(Math.random() * 30) + 50, // 50-80% 正确率
      field: field,
      topic: topic,
      userAnswer: null,
      marked: false,
      viewed: false,
      timeSpent: 0
    }
  })
}

const generateOptions = (type) => {
  const options = [
    { key: 'A', text: '这是一个正确的选项内容' },
    { key: 'B', text: '这是另一个选项内容，可能是正确答案' },
    { key: 'C', text: '这个选项描述了相关的情况' },
    { key: 'D', text: '最后一个选项内容，可能包含重要信息' }
  ]
  
  if (type === 'multi_choice') {
    options.push(
      { key: 'E', text: '多选题的额外选项内容' }
    )
  }
  
  return options
}

const startTimer = () => {
  examTimer.value = setInterval(() => {
    if (!isPaused.value && timeLeft.value > 0) {
      timeLeft.value--
      
      // 自动保存进度（每30秒）
      if (timeLeft.value % 30 === 0) {
        saveExamProgress()
      }
      
      // 自动提交（时间到）
      if (timeLeft.value === 0) {
        autoSubmitExam()
      }
    }
  }, 1000)
}

const togglePause = () => {
  isPaused.value = !isPaused.value
}

const selectOption = (optionKey) => {
  if (isSubmitting.value) return
  
  const question = questions.value[currentQuestion.value]
  if (question.type === 'multi_choice') {
    // 多选逻辑
    const currentAnswers = question.userAnswer ? question.userAnswer.split(',') : []
    if (currentAnswers.includes(optionKey)) {
      // 取消选择
      question.userAnswer = currentAnswers.filter(key => key !== optionKey).join(',')
    } else {
      // 添加选择
      question.userAnswer = [...currentAnswers, optionKey].sort().join(',')
    }
  } else {
    // 单选逻辑
    question.userAnswer = question.userAnswer === optionKey ? null : optionKey
  }
  
  // 标记为已查看
  question.viewed = true
  
  // 自动保存
  saveExamProgress()
}

const isOptionSelected = (optionKey) => {
  const question = questions.value[currentQuestion.value]
  if (!question.userAnswer) return false
  
  if (question.type === 'multi_choice') {
    return question.userAnswer.split(',').includes(optionKey)
  } else {
    return question.userAnswer === optionKey
  }
}

const toggleMark = () => {
  questions.value[currentQuestion.value].marked = !questions.value[currentQuestion.value].marked
  saveExamProgress()
}

const prevQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    questions.value[currentQuestion.value].viewed = true
  }
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
    questions.value[currentQuestion.value].viewed = true
  }
}

const goToQuestion = (index) => {
  currentQuestion.value = index
  questions.value[currentQuestion.value].viewed = true
}

const submitExam = () => {
  showSubmitDialog.value = true
}

const confirmSubmit = async () => {
  isSubmitting.value = true
  showSubmitDialog.value = false
  
  // 停止计时器
  clearInterval(examTimer.value)
  
  // 保存最终进度
  saveExamProgress()
  
  // 模拟API调用
  try {
    await submitExamToAPI()
    
    // 跳转到结果页面
    router.push({
      path: '/exam/review',
      query: { 
        examId: examData.value.id,
        sessionId: generateSessionId()
      }
    })
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
    isSubmitting.value = false
  }
}

const autoSubmitExam = () => {
  if (!isSubmitting.value) {
    alert('考试时间已到，系统将自动提交试卷')
    confirmSubmit()
  }
}

const submitExamToAPI = async () => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('考试提交成功:', {
        examId: examData.value.id,
        answers: questions.value.map(q => ({
          questionId: q.id,
          userAnswer: q.userAnswer,
          timeSpent: q.timeSpent
        })),
        totalTime: examData.value.duration * 60 - timeLeft.value
      })
      resolve()
    }, 1000)
  })
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const saveExamProgress = () => {
  const progress = {
    examId: examData.value.id,
    currentQuestion: currentQuestion.value,
    timeLeft: timeLeft.value,
    answers: questions.value.map(q => ({
      id: q.id,
      userAnswer: q.userAnswer,
      marked: q.marked,
      viewed: q.viewed
    })),
    timestamp: new Date().toISOString()
  }
  
  localStorage.setItem(`exam_progress_${examData.value.id}`, JSON.stringify(progress))
}

const loadExamProgress = () => {
  const saved = localStorage.getItem(`exam_progress_${examData.value.id}`)
  if (saved) {
    const progress = JSON.parse(saved)
    
    // 恢复答题进度
    progress.answers.forEach(savedAnswer => {
      const question = questions.value.find(q => q.id === savedAnswer.id)
      if (question) {
        question.userAnswer = savedAnswer.userAnswer
        question.marked = savedAnswer.marked
        question.viewed = savedAnswer.viewed
      }
    })
    
    // 恢复当前题目
    currentQuestion.value = progress.currentQuestion || 0
    
    // 恢复时间（但不超过总时间）
    const elapsedTime = examData.value.duration * 60 - progress.timeLeft
    const maxElapsed = Math.min(elapsedTime, examData.value.duration * 60 * 0.95) // 最多恢复95%的时间
    timeLeft.value = examData.value.duration * 60 - maxElapsed
  }
}

const getExamTitle = (type, examId) => {
  const titles = {
    random: '随机组卷测试',
    yearly: '历年真题考试',
    simulation: '智能模拟考试'
  }
  return titles[type] || '模拟考试'
}

const getExamDescription = (type) => {
  const descriptions = {
    random: '基于知识体系随机生成的模拟试卷',
    yearly: '真实历年考试题目，体验真实考试环境',
    simulation: '基于您的学习情况智能生成的个性化试卷'
  }
  return descriptions[type] || '模拟考试'
}

const getTypeText = (type) => {
  const types = {
    random: '随机组卷',
    yearly: '历年真题',
    simulation: '模拟测试'
  }
  return types[type] || '模拟考试'
}

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 防止页面刷新或关闭
const beforeUnloadHandler = (event) => {
  if (!isSubmitting.value) {
    event.preventDefault()
    event.returnValue = '考试正在进行中，确定要离开吗？您的进度将会被保存。'
    return event.returnValue
  }
}

onMounted(() => {
  initializeExam()
  window.addEventListener('beforeunload', beforeUnloadHandler)
})

onUnmounted(() => {
  if (examTimer.value) {
    clearInterval(examTimer.value)
  }
  window.removeEventListener('beforeunload', beforeUnloadHandler)
})
</script>

<style scoped>
.exam-session {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 80px; /* 为固定头部留出空间 */
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========= 考试头部 ========= */
.exam-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-bottom: 3px solid var(--primary);
}

.exam-header.warning {
  border-bottom-color: #f59e0b;
}

.exam-header.critical {
  border-bottom-color: #dc2626;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.exam-info h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.exam-desc {
  font-size: 0.875rem;
  color: var(--muted);
  margin: 0;
}

.exam-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.timer-section {
  text-align: center;
}

.timer {
  font-size: 1.75rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: var(--primary);
}

.timer.warning {
  color: #f59e0b;
}

.timer.critical {
  color: #dc2626;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.timer-label {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 0.25rem;
}

.progress-section {
  min-width: 120px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 0.25rem;
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
  transition: width 0.3s ease;
}

.control-buttons {
  display: flex;
  gap: 0.75rem;
}

/* ========= 暂停遮罩 ========= */
.pause-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.pause-content {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.pause-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.pause-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.pause-content p {
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.pause-time {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 2rem;
}

/* ========= 主要内容 ========= */
.exam-main {
  padding: 2rem 0;
}

.exam-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

/* ========= 题目区域 ========= */
.question-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.question-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.question-number {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.question-type {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
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

.btn-sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn-icon {
  margin-right: 4px;
}

/* ========= 题目内容 ========= */
.question-content {
  margin-bottom: 2rem;
}

.question-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--primary-dark);
  margin-bottom: 2rem;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-item:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option-item.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option-item.correct {
  border-color: #10b981;
  background: #ecfdf5;
}

.option-item.wrong {
  border-color: #ef4444;
  background: #fef2f2;
}

.option-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.option-circle {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-item.selected .option-circle {
  border-color: var(--primary);
}

.option-item.correct .option-circle {
  border-color: #10b981;
}

.option-item.wrong .option-circle {
  border-color: #ef4444;
}

.option-inner {
  width: 10px;
  height: 10px;
  background: var(--primary);
  border-radius: 50%;
}

.option-item.correct .option-inner {
  background: #10b981;
}

.option-item.wrong .option-inner {
  background: #ef4444;
}

.option-key {
  font-weight: 600;
  color: var(--primary-dark);
  min-width: 20px;
}

.option-content {
  flex: 1;
  line-height: 1.5;
}

/* ========= 答案解析 ========= */
.answer-section {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--primary);
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.answer-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.answer-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.answer-status.correct {
  background: #ecfdf5;
  color: #065f46;
}

.answer-status.wrong {
  background: #fef2f2;
  color: #991b1b;
}

.explanation {
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 1rem;
}

.answer-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 答题卡侧边栏 ========= */
.answer-sheet-sidebar {
  position: sticky;
  top: 100px;
}

.sidebar-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-section:last-child {
  margin-bottom: 0;
}

.sidebar-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.answer-sheet {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.sheet-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sheet-item:hover {
  border-color: var(--primary);
  transform: scale(1.05);
}

.sheet-item.current {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.sheet-item.answered {
  background: var(--primary-light);
  color: var(--primary);
  border-color: var(--primary);
}

.sheet-item.marked {
  background: #fef3c7;
  color: #92400e;
  border-color: #f59e0b;
}

.sheet-item.viewed {
  border-color: var(--primary);
}

.status-legends {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
}

.status-color {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border);
  border-radius: 4px;
}

.status-color.current {
  background: var(--primary);
  border-color: var(--primary);
}

.status-color.answered {
  background: var(--primary-light);
  border-color: var(--primary);
}

.status-color.marked {
  background: #fef3c7;
  border-color: #f59e0b;
}

.exam-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.info-label {
  color: var(--muted);
}

.info-value {
  font-weight: 600;
  color: var(--primary-dark);
}

/* ========= 考试底部 ========= */
.exam-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.nav-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-info {
  color: var(--muted);
  font-size: 0.875rem;
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
  z-index: 3000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.submit-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .exam-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .answer-sheet-sidebar {
    position: static;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .exam-controls {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .exam-header {
    padding: 0.5rem 0;
  }
  
  .exam-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .question-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .question-meta {
    flex-wrap: wrap;
  }
  
  .control-buttons {
    width: 100%;
    justify-content: center;
  }
  
  .answer-sheet {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .submit-stats {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .question-section {
    padding: 1.5rem;
  }
  
  .option-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .option-selector {
    width: 100%;
  }
  
  .answer-sheet {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .nav-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-info {
    order: -1;
  }
}
</style>