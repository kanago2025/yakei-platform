<!-- src/views/Practice.vue -->
<template>
  <div class="practice">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>强化练习</h1>
          <p>针对性练习系统，根据您的学习进度和薄弱环节智能推荐练习题，巩固知识点，提升应试能力</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>VIP会员可享受无限制练习和详细分析报告</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ totalPracticeQuestions }}</span>
              <span class="stat-label">练习题目</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ overallAccuracy }}%</span>
              <span class="stat-label">平均正确率</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalStudyTime }}h</span>
              <span class="stat-label">学习时长</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-section">
          <h3>按分野练习</h3>
          <div class="domain-buttons">
            <button 
              v-for="domain in domains" 
              :key="domain.id"
              class="domain-btn" 
              :class="{ 
                active: activeDomain === domain.id,
                'premium-only': domain.requiresPremium && !userStore.isPremium
              }"
              @click="switchDomain(domain.id)"
              :disabled="domain.requiresPremium && !userStore.isPremium"
            >
              <span class="domain-icon">{{ domain.icon }}</span>
              <span class="domain-name">{{ domain.name }}</span>
              <span class="domain-count">{{ domain.questionCount }}题</span>
              <span v-if="domain.requiresPremium && !userStore.isPremium" class="premium-tag">VIP</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>练习工具</h3>
          <div class="tool-buttons">
            <button class="tool-btn" @click="startRandomPractice" :disabled="!userStore.isLoggedIn">
              <span class="tool-icon">🎲</span>
              <span>随机练习</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <button class="tool-btn" @click="startWeaknessPractice" :disabled="!userStore.isLoggedIn">
              <span class="tool-icon">🎯</span>
              <span>弱点练习</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <router-link to="/exam" class="tool-btn">
              <span class="tool-icon">📝</span>
              <span>真题模拟</span>
            </router-link>
            <router-link to="/dashboard" class="tool-btn">
              <span class="tool-icon">📊</span>
              <span>学习进度</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 练习模式选择 -->
        <div class="practice-modes">
          <div class="mode-card" @click="startQuickPractice" :class="{ 'disabled': !userStore.isLoggedIn }">
            <div class="mode-icon">⚡</div>
            <h3>快速练习</h3>
            <p>10道随机题目，快速检验知识掌握情况</p>
            <div class="mode-stats">
              <span>平均用时: 15分钟</span>
              <span>正确率: 72%</span>
            </div>
            <div v-if="!userStore.isLoggedIn" class="mode-overlay">
              <span>请先登录</span>
            </div>
          </div>

          <div class="mode-card" @click="startDomainPractice" :class="{ 'disabled': !userStore.isLoggedIn }">
            <div class="mode-icon">📚</div>
            <h3>分野专项</h3>
            <p>针对特定分野进行深度练习</p>
            <div class="mode-stats">
              <span>平均用时: 30分钟</span>
              <span>正确率: 68%</span>
            </div>
            <div v-if="!userStore.isLoggedIn" class="mode-overlay">
              <span>请先登录</span>
            </div>
          </div>

          <div class="mode-card" @click="startTimedPractice" :class="{ 'disabled': !userStore.isLoggedIn }">
            <div class="mode-icon">⏱️</div>
            <h3>限时挑战</h3>
            <p>模拟真实考试时间压力</p>
            <div class="mode-stats">
              <span>平均用时: 45分钟</span>
              <span>正确率: 65%</span>
            </div>
            <div v-if="!userStore.isLoggedIn" class="mode-overlay">
              <span>请先登录</span>
            </div>
          </div>
        </div>

        <!-- VIP专属练习模式 -->
        <div v-if="userStore.isPremium" class="premium-modes">
          <h2 class="section-title">VIP专属练习</h2>
          <div class="practice-modes">
            <div class="mode-card premium" @click="startAIPractice">
              <div class="mode-icon">🤖</div>
              <h3>AI智能练习</h3>
              <p>基于AI分析的个性化练习计划</p>
              <div class="mode-stats">
                <span>自适应难度</span>
                <span>精准推荐</span>
              </div>
              <div class="premium-badge">VIP专属</div>
            </div>

            <div class="mode-card premium" @click="startExamSimulation">
              <div class="mode-icon">🎯</div>
              <h3>模拟考试</h3>
              <p>全真模拟考试环境练习</p>
              <div class="mode-stats">
                <span>真实场景</span>
                <span>详细分析</span>
              </div>
              <div class="premium-badge">VIP专属</div>
            </div>

            <div class="mode-card premium" @click="startWeaknessAnalysis">
              <div class="mode-icon">📊</div>
              <h3>弱点分析</h3>
              <p>深度分析薄弱环节并提供专项练习</p>
              <div class="mode-stats">
                <span>精准定位</span>
                <span>专项突破</span>
              </div>
              <div class="premium-badge">VIP专属</div>
            </div>
          </div>
        </div>

        <!-- 当前领域练习 -->
        <div class="domain-practice" v-if="activeDomain && userStore.isLoggedIn">
          <div class="domain-header">
            <h2>{{ getDomainName(activeDomain) }} - 练习题目</h2>
            <div class="domain-progress">
              <div class="progress-info">
                <span>掌握度</span>
                <span>{{ getDomainAccuracy(activeDomain) }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainAccuracy(activeDomain) + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="questions-grid">
            <div 
              v-for="(question, index) in getDomainQuestions(activeDomain)" 
              :key="question.id"
              class="question-card"
              :class="{ 
                'answered': question.userAnswer,
                'correct': question.userAnswer && question.userAnswer === question.correctAnswer,
                'incorrect': question.userAnswer && question.userAnswer !== question.correctAnswer,
                'premium-only': question.requiresPremium && !userStore.isPremium,
                'active': activeQuestionIndex === index
              }"
              @click="setActiveQuestion(index)"
            >
              <!-- VIP专属题目标识 -->
              <div v-if="question.requiresPremium && !userStore.isPremium" class="premium-overlay">
                <div class="premium-lock">
                  <span class="lock-icon">🔒</span>
                  <span>VIP专属题目</span>
                </div>
              </div>
              
              <div class="question-header">
                <span class="question-number">问题 {{ question.number }}</span>
                <span class="difficulty" :class="question.difficulty">
                  {{ getDifficultyText(question.difficulty) }}
                </span>
                <button 
                  class="bookmark-btn"
                  :class="{ bookmarked: question.bookmarked }"
                  @click.stop="toggleBookmark(question.id)"
                >
                  <span>{{ question.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>

              <div class="question-content">
                <p class="question-text">{{ question.text }}</p>
                
                <div class="options">
                  <label 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="option"
                    :class="{ 
                      'selected': question.userAnswer === option.id,
                      'correct-option': showAnswers && option.id === question.correctAnswer,
                      'incorrect-option': showAnswers && question.userAnswer === option.id && option.id !== question.correctAnswer
                    }"
                  >
                    <input
                      type="radio"
                      :name="'question-' + question.id"
                      :value="option.id"
                      v-model="question.userAnswer"
                      @change="checkAnswer(question)"
                      :disabled="showAnswers || (question.requiresPremium && !userStore.isPremium)"
                    />
                    <span class="option-text">{{ option.text }}</span>
                  </label>
                </div>

                <div v-if="showAnswers && question.userAnswer" class="answer-explanation">
                  <div class="explanation-header">
                    <span class="result" :class="question.userAnswer === question.correctAnswer ? 'correct' : 'incorrect'">
                      {{ question.userAnswer === question.correctAnswer ? '✓ 正确' : '✗ 错误' }}
                    </span>
                    <span class="correct-answer">正确答案: {{ getCorrectAnswerText(question) }}</span>
                  </div>
                  <p class="explanation-text">{{ question.explanation }}</p>
                  <div class="explanation-actions">
                    <button class="action-btn" @click="addToWrongQuestions(question)">
                      📝 加入错题本
                    </button>
                    <button class="action-btn" @click="showSimilarQuestions(question)">
                      🔍 相似题目
                    </button>
                  </div>
                </div>
              </div>

              <div class="question-footer">
                <span class="knowledge-point">{{ question.knowledgePoint }}</span>
                <span class="practice-count">练习 {{ question.practiceCount }} 次</span>
                <span class="time-spent" v-if="question.timeSpent">用时: {{ question.timeSpent }}秒</span>
                <span v-if="question.requiresPremium" class="premium-tag">VIP</span>
              </div>
            </div>
          </div>

          <div class="practice-actions">
            <button class="btn btn-secondary" @click="resetPractice">
              🔄 重新开始
            </button>
            <button class="btn btn-primary" @click="showAnswers = !showAnswers">
              {{ showAnswers ? '👁️ 隐藏答案' : '👁️ 显示答案' }}
            </button>
            <button class="btn btn-primary" @click="submitPractice">
              📤 提交练习
            </button>
          </div>
        </div>

        <!-- 练习统计 -->
        <div class="practice-stats" v-if="userStore.isLoggedIn">
          <div class="stats-card">
            <h3>练习统计</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ completedQuestions }}/{{ totalQuestions }}</div>
                <div class="stat-label">完成题目</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ correctAnswers }}</div>
                <div class="stat-label">正确回答</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ currentAccuracy }}%</div>
                <div class="stat-label">当前正确率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ totalPracticeTime }}分钟</div>
                <div class="stat-label">总练习时间</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 未登录提示 -->
        <section v-if="!userStore.isLoggedIn" class="login-prompt">
          <div class="prompt-content">
            <h3>登录以保存练习记录</h3>
            <p>登录后可以保存您的练习进度、查看详细分析报告，并获得个性化学习建议</p>
            <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
          </div>
        </section>

        <!-- 免费用户升级提示 -->
        <section v-if="userStore.isLoggedIn && !userStore.isPremium" class="upgrade-prompt">
          <div class="prompt-content">
            <h3>升级VIP会员，解锁更多练习功能</h3>
            <p>VIP会员可享受无限制练习、AI智能推荐、弱点分析等高级功能</p>
            <button class="btn btn-premium" @click="upgradeToPremium">
              ⭐ 升级VIP会员
            </button>
          </div>
        </section>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>系统化练习，全面提升应试能力</h2>
          <p>通过针对性练习和即时反馈，快速发现知识盲点，强化薄弱环节，稳步提升考试成绩</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="startNewPractice" :disabled="!userStore.isLoggedIn">
              {{ userStore.isLoggedIn ? '开始新的练习' : '请先登录' }}
            </button>
            <router-link to="/exam" class="btn btn-secondary">尝试真题模拟</router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const learningStore = useLearningStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const activeDomain = ref('rights')
const activeQuestionIndex = ref(0)
const showAnswers = ref(false)
const practiceTime = ref(0)
const practiceTimer = ref(null)
const questionTimers = ref({})
const bookmarks = ref(new Set())

// 五大分野数据
const domains = [
  { 
    id: 'rights', 
    name: '权利关系', 
    icon: '⚖️', 
    questionCount: 28,
    accuracy: 78,
    requiresPremium: false
  },
  { 
    id: 'business', 
    name: '宅建业法', 
    icon: '🏢', 
    questionCount: 32,
    accuracy: 82,
    requiresPremium: false
  },
  { 
    id: 'regulations', 
    name: '法令制限', 
    icon: '📏', 
    questionCount: 35,
    accuracy: 65,
    requiresPremium: false
  },
  { 
    id: 'tax', 
    name: '税・価格', 
    icon: '💰', 
    questionCount: 18,
    accuracy: 71,
    requiresPremium: false
  },
  { 
    id: 'exempt', 
    name: '五问免除', 
    icon: '✅', 
    questionCount: 12,
    accuracy: 88,
    requiresPremium: false
  },
  { 
    id: 'advanced', 
    name: '高级专题', 
    icon: '🚀', 
    questionCount: 25,
    accuracy: 0,
    requiresPremium: true
  }
]

// 知识点数据 - 添加计时相关字段
const questions = ref({
  rights: [
    {
      id: 'q_rights_001',
      number: 1,
      text: '重要事項説明書には、代表者の記名があれば宅地建物取引士の記名は必要がない。',
      options: [
        { id: 'A', text: '○ (正しい)' },
        { id: 'B', text: '× (誤り)' }
      ],
      correctAnswer: 'B',
      explanation: '重要事项说明书（35条书面文件）上必须有宅建士的签名，仅有"代表人签名"是不够的。',
      difficulty: 'medium',
      knowledgePoint: '重要事项说明',
      practiceCount: 15,
      userAnswer: null,
      bookmarked: false,
      requiresPremium: false,
      timeSpent: 0,
      startTime: null
    },
    {
      id: 'q_rights_002',
      number: 2,
      text: '媒介契約において、宅地建物取引業者は、依頼者に対して取引の進捗状況を報告する義務がある。',
      options: [
        { id: 'A', text: '○ (正しい)' },
        { id: 'B', text: '× (誤り)' }
      ],
      correctAnswer: 'A',
      explanation: '根据宅建业法，宅建业者有义务向委托人报告交易进展情况。',
      difficulty: 'easy',
      knowledgePoint: '媒介契约',
      practiceCount: 12,
      userAnswer: null,
      bookmarked: true,
      requiresPremium: false,
      timeSpent: 0,
      startTime: null
    }
  ],
  business: [
    {
      id: 'q_business_001',
      number: 1,
      text: '宅地建物取引業者は、業務に関して受領した金銭を、自己の金銭と区別して保管しなければならない。',
      options: [
        { id: 'A', text: '○ (正しい)' },
        { id: 'B', text: '× (誤り)' }
      ],
      correctAnswer: 'A',
      explanation: '宅建业者必须将业务相关款项与自有资金分开保管，这是重要的资金管理义务。',
      difficulty: 'medium',
      knowledgePoint: '营业保证金',
      practiceCount: 8,
      userAnswer: null,
      bookmarked: false,
      requiresPremium: false,
      timeSpent: 0,
      startTime: null
    }
  ],
  advanced: [
    {
      id: 'q_advanced_001',
      number: 1,
      text: '宅地建物取引業者が自ら売主となる場合、瑕疵担保責任に関する特約を設けることができるが、その内容には一定の制限がある。',
      options: [
        { id: 'A', text: '買主に不利な特約は一切認められない' },
        { id: 'B', text: '買主に不利な特約も一定の範囲で認められる' },
        { id: 'C', text: '特約の内容に制限はない' },
        { id: 'D', text: '特約を設けることはできない' }
      ],
      correctAnswer: 'B',
      explanation: '宅建业者作为卖方时，可以设定瑕疵担保责任的特约，但内容有一定限制，不能完全免除责任。',
      difficulty: 'hard',
      knowledgePoint: '瑕疵担保责任',
      practiceCount: 5,
      userAnswer: null,
      bookmarked: false,
      requiresPremium: true,
      timeSpent: 0,
      startTime: null
    }
  ]
})

// 计算属性
const totalPracticeQuestions = computed(() => {
  return Object.values(questions.value).reduce((total, domainQuestions) => {
    return total + domainQuestions.length;
  }, 0);
})

const overallAccuracy = computed(() => {
  const totalAccuracy = domains.reduce((sum, domain) => sum + domain.accuracy, 0);
  return Math.round(totalAccuracy / domains.length);
})

const totalStudyTime = computed(() => {
  return Math.round(totalPracticeQuestions.value * 0.5);
})

const completedQuestions = computed(() => {
  return Object.values(questions.value).reduce((total, domainQuestions) => {
    return total + domainQuestions.filter(q => q.userAnswer).length;
  }, 0);
})

const totalQuestions = computed(() => {
  return Object.values(questions.value).reduce((total, domainQuestions) => {
    return total + domainQuestions.length;
  }, 0);
})

const correctAnswers = computed(() => {
  return Object.values(questions.value).reduce((total, domainQuestions) => {
    return total + domainQuestions.filter(q => q.userAnswer === q.correctAnswer).length;
  }, 0);
})

const currentAccuracy = computed(() => {
  if (completedQuestions.value === 0) return 0;
  return Math.round((correctAnswers.value / completedQuestions.value) * 100);
})

const totalPracticeTime = computed(() => {
  return Object.values(questions.value).reduce((total, domainQuestions) => {
    return total + domainQuestions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
  }, 0) / 60; // 转换为分钟
})

// 方法
const switchDomain = (domainId) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  const domain = domains.find(d => d.id === domainId)
  if (domain.requiresPremium && !userStore.isPremium) {
    alert('此分野需要VIP会员权限，请升级VIP会员')
    return
  }
  
  activeDomain.value = domainId;
  activeQuestionIndex.value = 0;
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
}

const setActiveQuestion = (index) => {
  // 停止当前题目的计时
  stopQuestionTimer(activeQuestionIndex.value);
  
  // 设置新的活跃题目
  activeQuestionIndex.value = index;
  
  // 开始新题目的计时
  startQuestionTimer(index);
}

const startQuestionTimer = (questionIndex) => {
  const domainQuestions = getDomainQuestions(activeDomain.value);
  if (domainQuestions[questionIndex]) {
    domainQuestions[questionIndex].startTime = Date.now();
  }
}

const stopQuestionTimer = (questionIndex) => {
  const domainQuestions = getDomainQuestions(activeDomain.value);
  const question = domainQuestions[questionIndex];
  
  if (question && question.startTime) {
    const timeSpent = Math.floor((Date.now() - question.startTime) / 1000); // 转换为秒
    question.timeSpent = (question.timeSpent || 0) + timeSpent;
    question.startTime = null;
    
    // 保存到本地存储
    savePracticeProgress();
  }
}

const getDomainName = (domainId) => {
  const domain = domains.find(d => d.id === domainId);
  return domain ? domain.name : '';
}

const getDomainAccuracy = (domainId) => {
  const domain = domains.find(d => d.id === domainId);
  return domain ? domain.accuracy : 0;
}

const getDomainQuestions = (domainId) => {
  return questions.value[domainId] || [];
}

const getDifficultyText = (difficulty) => {
  const difficultyMap = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  };
  return difficultyMap[difficulty] || difficulty;
}

const checkAnswer = (question) => {
  if (!userStore.isLoggedIn) return
  
  // 停止当前题目的计时
  const domainQuestions = getDomainQuestions(activeDomain.value);
  const currentIndex = domainQuestions.findIndex(q => q.id === question.id);
  if (currentIndex !== -1) {
    stopQuestionTimer(currentIndex);
  }
  
  // 更新练习次数
  question.practiceCount++
  
  // 保存练习记录 - 对齐项目圣经数据结构
  savePracticeRecord(question)
  
  // 更新学习进度
  updateLearningProgress(activeDomain.value, question.timeSpent || 0)
  
  // 自动切换到下一题
  setTimeout(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < domainQuestions.length) {
      setActiveQuestion(nextIndex);
    }
  }, 1000);
}

const savePracticeRecord = (question) => {
  if (!userStore.user?.id) return
  
  // 对齐项目圣经的 practice_records 表结构
  const practiceRecord = {
    userId: userStore.user.id,
    questionId: question.id,
    userAnswer: question.userAnswer,
    isCorrect: question.userAnswer === question.correctAnswer,
    timeSpent: question.timeSpent || 0,
    createdAt: new Date().toISOString(),
    domain: activeDomain.value,
    knowledgePoint: question.knowledgePoint
  }
  
  // 保存到本地存储 - 使用项目圣经的表名
  const records = JSON.parse(localStorage.getItem('practice_records') || '[]')
  
  // 检查是否已有相同记录，避免重复
  const existingIndex = records.findIndex(record => 
    record.userId === practiceRecord.userId && 
    record.questionId === practiceRecord.questionId &&
    record.createdAt.slice(0, 16) === practiceRecord.createdAt.slice(0, 16) // 同一天内的记录
  )
  
  if (existingIndex !== -1) {
    records[existingIndex] = practiceRecord
  } else {
    records.push(practiceRecord)
  }
  
  localStorage.setItem('practice_records', JSON.stringify(records))
  console.log('练习记录已保存:', practiceRecord)
}

const updateLearningProgress = (domainId, studyTime) => {
  if (!userStore.user?.id) return
  
  // 对齐项目圣经的 learning_progress 表结构
  const progressRecord = {
    userId: userStore.user.id,
    topicId: domainId,
    status: completedQuestions.value >= totalQuestions.value ? 'completed' : 'in_progress',
    lastAccessed: new Date().toISOString(),
    completionPercentage: Math.round((completedQuestions.value / totalQuestions.value) * 100),
    totalStudyTime: (getDomainStudyTime(domainId) || 0) + studyTime
  }
  
  // 保存到本地存储 - 使用项目圣经的表名
  const progressData = JSON.parse(localStorage.getItem('learning_progress') || '[]')
  
  // 更新或添加进度记录
  const existingIndex = progressData.findIndex(progress => 
    progress.userId === progressRecord.userId && progress.topicId === progressRecord.topicId
  )
  
  if (existingIndex !== -1) {
    progressData[existingIndex] = progressRecord
  } else {
    progressData.push(progressRecord)
  }
  
  localStorage.setItem('learning_progress', JSON.stringify(progressData))
  console.log('学习进度已更新:', progressRecord)
}

const getDomainStudyTime = (domainId) => {
  const progressData = JSON.parse(localStorage.getItem('learning_progress') || '[]')
  const domainProgress = progressData.find(progress => 
    progress.userId === userStore.user?.id && progress.topicId === domainId
  )
  return domainProgress ? domainProgress.totalStudyTime : 0
}

const toggleBookmark = (questionId) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以使用收藏功能')
    openLoginDialog()
    return
  }
  
  Object.values(questions.value).forEach(domainQuestions => {
    const question = domainQuestions.find(q => q.id === questionId);
    if (question) {
      question.bookmarked = !question.bookmarked;
    }
  });
  
  // 保存到本地存储
  saveBookmarksToLocalStorage()
}

const getCorrectAnswerText = (question) => {
  const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
  return correctOption ? correctOption.text : '';
}

const addToWrongQuestions = (question) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以使用错题本功能')
    openLoginDialog()
    return
  }
  
  // 添加到错题本的逻辑
  console.log('添加到错题本:', question);
  alert(`已添加到错题本: ${question.knowledgePoint}`);
  
  // 保存到本地存储
  saveWrongQuestionsToLocalStorage(question)
}

const showSimilarQuestions = (question) => {
  // 显示相似题目的逻辑
  console.log('显示相似题目:', question);
}

const resetPractice = () => {
  Object.values(questions.value).forEach(domainQuestions => {
    domainQuestions.forEach(question => {
      question.userAnswer = null;
      question.timeSpent = 0;
      question.startTime = null;
    });
  });
  showAnswers.value = false;
  practiceTime.value = 0;
  activeQuestionIndex.value = 0;
  
  // 重置计时器
  if (practiceTimer.value) {
    clearInterval(practiceTimer.value);
    practiceTimer.value = null;
  }
}

const submitPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以提交练习')
    openLoginDialog()
    return
  }
  
  if (completedQuestions.value === 0) {
    alert('请至少完成一道题目后再提交');
    return;
  }
  
  // 停止所有题目的计时
  const domainQuestions = getDomainQuestions(activeDomain.value);
  domainQuestions.forEach((_, index) => stopQuestionTimer(index));
  
  const score = currentAccuracy.value;
  let message = '';
  
  if (score >= 80) {
    message = `优秀！您的正确率为 ${score}%，继续保持！`;
  } else if (score >= 60) {
    message = `良好！您的正确率为 ${score}%，还有提升空间！`;
  } else {
    message = `需要加强！您的正确率为 ${score}%，建议重点复习相关知识点。`;
  }
  
  // 保存最终练习记录
  savePracticeProgress()
  
  alert(`练习提交成功！\n${message}`);
}

const startQuickPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始快速练习模式');
}

const startDomainPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始分野专项练习模式');
}

const startTimedPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  resetPractice();
  startTimer();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始限时挑战模式 - 计时开始！');
}

const startRandomPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始随机练习模式');
}

const startWeaknessPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始弱点练习模式');
}

const startNewPractice = () => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以开始练习')
    openLoginDialog()
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始新的练习会话');
}

const startAIPractice = () => {
  if (!userStore.isPremium) {
    alert('此功能需要VIP会员权限')
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始AI智能练习模式');
}

const startExamSimulation = () => {
  if (!userStore.isPremium) {
    alert('此功能需要VIP会员权限')
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始模拟考试练习模式');
}

const startWeaknessAnalysis = () => {
  if (!userStore.isPremium) {
    alert('此功能需要VIP会员权限')
    return
  }
  
  resetPractice();
  startQuestionTimer(activeQuestionIndex.value);
  alert('开始弱点分析模式');
}

const upgradeToPremium = () => {
  alert('升级VIP会员，享受更多专属功能')
  // 这里应该跳转到VIP升级页面
}

const startTimer = () => {
  if (practiceTimer.value) {
    clearInterval(practiceTimer.value);
  }
  practiceTimer.value = setInterval(() => {
    practiceTime.value++;
  }, 60000); // 每分钟更新一次
}

const savePracticeProgress = () => {
  const progress = {
    domains: domains,
    questions: questions.value,
    lastUpdated: new Date().toISOString()
  }
  localStorage.setItem('practiceProgress', JSON.stringify(progress))
}

const loadPracticeProgress = () => {
  const savedProgress = localStorage.getItem('practiceProgress')
  if (savedProgress) {
    const progress = JSON.parse(savedProgress)
    Object.assign(questions.value, progress.questions || questions.value)
  }
}

const saveBookmarksToLocalStorage = () => {
  const bookmarks = []
  Object.values(questions.value).forEach(domainQuestions => {
    domainQuestions.forEach(question => {
      if (question.bookmarked) {
        bookmarks.push(question.id)
      }
    })
  })
  localStorage.setItem('practiceBookmarks', JSON.stringify(bookmarks))
}

const loadBookmarksFromLocalStorage = () => {
  const savedBookmarks = localStorage.getItem('practiceBookmarks')
  if (savedBookmarks) {
    const bookmarks = JSON.parse(savedBookmarks)
    Object.values(questions.value).forEach(domainQuestions => {
      domainQuestions.forEach(question => {
        question.bookmarked = bookmarks.includes(question.id)
      })
    })
  }
}

const saveWrongQuestionsToLocalStorage = (question) => {
  const wrongQuestions = JSON.parse(localStorage.getItem('wrongQuestions') || '[]')
  if (!wrongQuestions.find(q => q.id === question.id)) {
    wrongQuestions.push({
      id: question.id,
      text: question.text,
      knowledgePoint: question.knowledgePoint,
      userAnswer: question.userAnswer,
      correctAnswer: question.correctAnswer,
      timeSpent: question.timeSpent,
      addedAt: new Date().toISOString()
    })
    localStorage.setItem('wrongQuestions', JSON.stringify(wrongQuestions))
  }
}

// 打开登录弹窗 - 使用全局事件
const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuOpen.value = false
  }
}

// 监听活跃题目变化
watch(activeQuestionIndex, (newIndex, oldIndex) => {
  if (oldIndex !== newIndex) {
    stopQuestionTimer(oldIndex);
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize);
  
  // 从本地存储加载用户数据
  loadPracticeProgress()
  loadBookmarksFromLocalStorage()
  
  // 确保学习数据已加载
  learningStore.loadFromStorage()
  
  // 开始第一题的计时
  if (userStore.isLoggedIn && activeDomain.value) {
    startQuestionTimer(activeQuestionIndex.value);
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  
  // 停止所有计时器
  if (practiceTimer.value) {
    clearInterval(practiceTimer.value);
  }
  
  // 停止所有题目计时
  const domainQuestions = getDomainQuestions(activeDomain.value);
  domainQuestions.forEach((_, index) => stopQuestionTimer(index));
})
</script>

<style scoped>
.practice {
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

.domain-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.domain-btn {
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
  position: relative;
  border: none;
  font-family: inherit;
}

.domain-btn:hover:not(:disabled) {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.domain-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
}

.domain-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.domain-btn.premium-only {
  border-style: dashed;
}

.premium-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #f59e0b;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
}

.domain-icon {
  font-size: 24px;
}

.domain-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.domain-count {
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

/* ========= 练习模式选择 ========= */
.practice-modes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
}

.mode-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  cursor: pointer;
  text-align: center;
  position: relative;
}

.mode-card:hover:not(.disabled) {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.mode-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mode-card.premium {
  border: 2px solid #f59e0b;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.mode-overlay {
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
  font-weight: 600;
  color: var(--muted);
}

.premium-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f59e0b;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.mode-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.mode-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

.mode-card p {
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.mode-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--muted);
}

/* ========= VIP专属练习模式 ========= */
.premium-modes {
  margin-bottom: 3rem;
  width: 100%;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

/* ========= 领域练习区域 ========= */
.domain-practice {
  margin-bottom: 3rem;
  width: 100%;
}

.domain-header {
  margin-bottom: 2rem;
}

.domain-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.domain-progress {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1rem;
  max-width: 300px;
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

/* ========= 问题网格 ========= */
.questions-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.question-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
  cursor: pointer;
}

.question-card:hover {
  box-shadow: var(--shadow-lg);
}

.question-card.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(42, 121, 96, 0.2);
}

.question-card.correct {
  border-left: 4px solid #10b981;
}

.question-card.incorrect {
  border-left: 4px solid #ef4444;
}

.question-card.premium-only {
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
  gap: 0.5rem;
  color: #f59e0b;
  font-weight: 600;
}

.lock-icon {
  font-size: 1.5rem;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.question-number {
  font-weight: 600;
  color: var(--primary-dark);
}

.difficulty {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.difficulty.easy {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.difficulty.medium {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.difficulty.hard {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s ease;
  padding: 4px;
  border-radius: 4px;
}

.bookmark-btn:hover, .bookmark-btn.bookmarked {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.question-content {
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  color: var(--text);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option.correct-option {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.option.incorrect-option {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.option input[type="radio"] {
  margin-top: 2px;
}

.option-text {
  flex: 1;
  line-height: 1.4;
}

.answer-explanation {
  margin-top: 1.25rem;
  padding: 1rem;
  background: var(--primary-light);
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.explanation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.result.correct {
  color: #10b981;
  font-weight: 600;
}

.result.incorrect {
  color: #ef4444;
  font-weight: 600;
}

.correct-answer {
  color: var(--muted);
  font-size: 0.875rem;
}

.explanation-text {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.explanation-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card-bg);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  font-family: inherit;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.875rem;
  color: var(--muted);
  gap: 0.5rem;
  flex-wrap: wrap;
}

.knowledge-point {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.practice-count {
  font-size: 0.75rem;
}

.time-spent {
  font-size: 0.75rem;
  color: var(--primary);
  font-weight: 600;
}

/* ========= 练习操作按钮 ========= */
.practice-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  width: 100%;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.25);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(42, 121, 96, 0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-dark);
  border: 1px solid var(--primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--primary-light);
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

/* ========= 练习统计 ========= */
.practice-stats {
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
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.25rem;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--primary-light);
  border-radius: 8px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
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
  
  .practice-modes {
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
  
  .practice-modes {
    grid-template-columns: 1fr;
  }
  
  .domain-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .practice-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .explanation-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .question-footer {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
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
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .explanation-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    text-align: center;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>