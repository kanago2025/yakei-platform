<!-- src/views/notes/rights/DeclarationOfIntent.vue -->
<template>
  <div class="declaration-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>意思表示</span>
        </div>
        <h1>意思表示</h1>
        <p>法律行为的基础，契约成立的核心要素，涉及欺诈、错误、心里留保等多种法律情形</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">15</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">45分钟</span>
            <span class="stat-label">建议学习时间</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5</span>
            <span class="stat-label">练习题</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ userProgress }}%</span>
            <span class="stat-label">掌握进度</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 快速导航 -->
        <div class="quick-nav">
          <h3>本页导航</h3>
          <div class="nav-links">
            <a 
              v-for="section in sections" 
              :key="section.id"
              :href="`#${section.id}`"
              class="nav-link"
              @click.prevent="scrollToSection(section.id)"
            >
              <span class="nav-icon">{{ section.icon }}</span>
              {{ section.title }}
            </a>
          </div>
        </div>

        <!-- 学习目标 -->
        <section class="learning-goals">
          <h2>🎯 学习目标</h2>
          <ul>
            <li>理解意思表示的基本概念和法律效力</li>
            <li>掌握欺诈、强迫、错误等可撤销意思表示的要件和效果</li>
            <li>熟悉心里留保、通谋虚伪表示等无效意思表示的类型</li>
            <li>了解意思表示与第三者的关系及对抗要件</li>
            <li>能够区分无效与撤销的法律效果差异</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🔤 关键术语</h2>
          <div class="terms-grid">
            <div 
              v-for="term in keyTerms" 
              :key="term.japanese"
              class="term-card"
            >
              <div class="term-japanese">{{ term.japanese }}</div>
              <div class="term-chinese">{{ term.chinese }}</div>
              <div class="term-explanation">{{ term.explanation }}</div>
              <div class="term-example">{{ term.example }}</div>
            </div>
          </div>
        </section>

        <!-- 基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 意思表示的基本概念</h2>
          
          <h3>定义与生效</h3>
          <div class="concept-explanation">
            <p>意思表示是指表意人将内心期望发生特定法律效果的意思向外部表达的行为。契约的成立原则上需要申请和承诺两个意思表示的合致。</p>
            
            <div class="example-box">
              <h4>📝 案例说明</h4>
              <p>A想卖土地，对B说"卖给你"，B回答"买"。双方意思表示合致，买卖契约成立。</p>
            </div>
          </div>

          <h3>生效时间</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">📨</div>
              <div class="timing-content">
                <h4>到达生效原则</h4>
                <p>意思表示自到达对方之时起生效</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">🚫</div>
              <div class="timing-content">
                <h4>妨碍到达</h4>
                <p>如对方无正当理由妨碍到达，视为已到达</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">⚡</div>
              <div class="timing-content">
                <h4>效力持续</h4>
                <p>表意者死亡或丧失能力不影响已发出意思表示的效力</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 契约成立要件 -->
        <section id="contract-formation" class="content-section">
          <h2>2. 契约的成立要件</h2>
          
          <h3>合意原则</h3>
          <div class="agreement-principle">
            <p>契约成立的核心是双方意思表示的合致，即"要约"与"承诺"的一致。</p>
            
            <div class="contract-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>要约</h4>
                  <p>A对B说："这块土地卖给你"</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>承诺</h4>
                  <p>B回答："我买"</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>契约成立</h4>
                  <p>双方意思表示合致，买卖契约成立</p>
                </div>
              </div>
            </div>
          </div>

          <h3>形式要求</h3>
          <div class="form-requirements">
            <div class="requirement-item">
              <h4>📄 书面形式</h4>
              <ul>
                <li>原则上不需要书面形式</li>
                <li>口头约定同样具有法律效力</li>
                <li>特定情况下法律可能要求书面形式（如不动产买卖）</li>
              </ul>
            </div>
          </div>

          <h3>权利义务关系</h3>
          <div class="rights-obligations">
            <div class="relationship-diagram">
              <div class="party seller">
                <h4>卖方 A</h4>
                <div class="obligation">交付标的物的义务</div>
                <div class="right">请求价款的权利</div>
              </div>
              <div class="relationship-arrow">⇄</div>
              <div class="party buyer">
                <h4>买方 B</h4>
                <div class="obligation">支付价款的义务</div>
                <div class="right">请求交付标的物的权利</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 可撤销的意思表示 -->
        <section id="revocable-declaration" class="content-section">
          <h2>3. 可撤销的意思表示</h2>
          
          <h3>欺诈（詐欺）</h3>
          <div class="fraud-section">
            <div class="fraud-example">
              <div class="example-scenario">
                <div class="scenario-title">欺诈案例</div>
                <div class="scenario-content">
                  <div class="actor fraudster">A（欺诈者）</div>
                  <div class="action">"这土地会贬值，现在卖给我吧"</div>
                  <div class="actor victim">B（被欺诈者）</div>
                  <div class="action">"好吧，我卖"</div>
                </div>
              </div>
            </div>

            <div class="legal-effects">
              <div class="effect-item">
                <h4>当事人之间</h4>
                <p class="effect-positive">可撤销</p>
              </div>
              <div class="effect-item">
                <h4>对第三者</h4>
                <p class="effect-caution">撤销前不可对抗善意无过失第三者</p>
              </div>
            </div>

            <div class="third-party-relation">
              <h4>第三者关系</h4>
              <div class="relation-flow">
                A(被欺诈) → B(欺诈者) → C(善意无过失第三者)
                <div class="relation-note">A不能对C主张撤销</div>
              </div>
            </div>
          </div>

          <h3>强迫（強迫）</h3>
          <div class="coercion-section">
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>欺诈</th>
                    <th>强迫</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>当事人之间</td>
                    <td>可撤销</td>
                    <td>可撤销</td>
                  </tr>
                  <tr>
                    <td>对善意无过失第三者</td>
                    <td>不可对抗</td>
                    <td class="highlight">可对抗</td>
                  </tr>
                  <tr>
                    <td>受害者过错</td>
                    <td>有落度（过错）</td>
                    <td>无落度（无过错）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>错误（錯誤）</h3>
          <div class="mistake-section">
            <div class="mistake-types">
              <div class="type-item">
                <h4>表示错误</h4>
                <p>说错、写错等外在表示错误</p>
                <div class="type-example">
                  <strong>例子：</strong>把1000万写成100万
                </div>
              </div>
              <div class="type-item">
                <h4>动机错误</h4>
                <p>内心认识错误，原则上不可撤销</p>
                <div class="type-example">
                  <strong>例子：</strong>误以为地铁站会建在附近而购买土地
                </div>
              </div>
            </div>

            <div class="revocation-requirements">
              <h4>撤销要件</h4>
              <div class="requirements-list">
                <div class="requirement">
                  <div class="req-number">1</div>
                  <div class="req-content">
                    <strong>重要性：</strong>错误必须是法律行为目的和社会通念上的重要错误
                  </div>
                </div>
                <div class="requirement">
                  <div class="req-number">2</div>
                  <div class="req-content">
                    <strong>无重大过失：</strong>表意人无重大过失
                  </div>
                </div>
              </div>
            </div>

            <div class="exceptions">
              <h4>例外情况</h4>
              <p>即使有重大过失，以下情况仍可撤销：</p>
              <ul>
                <li>对方恶意或重大过失</li>
                <li>双方陷入同一错误</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 无效的意思表示 -->
        <section id="invalid-declaration" class="content-section">
          <h2>4. 无效的意思表示</h2>
          
          <h3>心里留保</h3>
          <div class="mental-reservation">
            <div class="reservation-example">
              <div class="example-title">《大染坊》案例</div>
              <div class="example-detail">
                <p>店员开玩笑说："1块钱一件布"，陈寿亭明知是玩笑却当真购买。</p>
                <p><strong>结果：</strong>因陈寿亭恶意，契约无效</p>
              </div>
            </div>

            <div class="legal-principles">
              <div class="principle-item">
                <h4>原则</h4>
                <p class="principle-valid">有效（保护交易安全）</p>
              </div>
              <div class="principle-item">
                <h4>例外</h4>
                <p class="principle-invalid">对方恶意时无效</p>
              </div>
            </div>
          </div>

          <h3>通谋虚伪表示</h3>
          <div class="false-representation">
            <div class="representation-case">
              <h4>典型案例：虚假转让</h4>
              <p>A为逃避债务，与B串通将房产名义转移给B，实际上并无真实买卖意图。</p>
            </div>

            <div class="representation-effects">
              <div class="effect-principle">
                <h4>原则</h4>
                <p class="effect-invalid">无效</p>
              </div>
              <div class="effect-third">
                <h4>对第三者</h4>
                <p class="effect-caution">不得对抗善意第三者</p>
              </div>
            </div>
          </div>

          <h3>违反公序良俗</h3>
          <div class="public-order">
            <div class="violation-examples">
              <div class="example-item">
                <div class="example-icon">🔫</div>
                <div class="example-content">
                  <h5>杀人契约</h5>
                  <p>约定杀害他人的契约绝对无效</p>
                </div>
              </div>
              <div class="example-item">
                <div class="example-icon">💔</div>
                <div class="example-content">
                  <h5>爱人契约</h5>
                  <p>包养协议违反公序良俗</p>
                </div>
              </div>
            </div>
            
            <div class="violation-effect">
              <h4>法律效果</h4>
              <ul>
                <li>绝对无效</li>
                <li>可对抗所有第三者</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 与第三者的关系 -->
        <section id="third-party-relations" class="content-section">
          <h2>5. 与第三者的关系</h2>
          
          <h3>善意与恶意的区分</h3>
          <div class="good-faith-explanation">
            <div class="faith-types">
              <div class="faith-type">
                <h4>善意</h4>
                <p>不知情</p>
              </div>
              <div class="faith-type">
                <h4>恶意</h4>
                <p>知情或应知而不知</p>
              </div>
              <div class="faith-type">
                <h4>善意无过失</h4>
                <p>不知情且无过失</p>
              </div>
            </div>
          </div>

          <h3>对抗关系总结</h3>
          <div class="resistance-summary">
            <div class="table-container">
              <table class="resistance-table">
                <thead>
                  <tr>
                    <th>类型</th>
                    <th>恶意第三者</th>
                    <th>善意有过失第三者</th>
                    <th>善意无过失第三者</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>欺诈</strong></td>
                    <td class="can-resist">可对抗</td>
                    <td class="can-resist">可对抗</td>
                    <td class="cannot-resist">不可对抗</td>
                  </tr>
                  <tr>
                    <td><strong>强迫</strong></td>
                    <td class="can-resist">可对抗</td>
                    <td class="can-resist">可对抗</td>
                    <td class="can-resist">可对抗</td>
                  </tr>
                  <tr>
                    <td><strong>错误</strong></td>
                    <td class="can-resist">可对抗</td>
                    <td class="can-resist">可对抗</td>
                    <td class="cannot-resist">不可对抗</td>
                  </tr>
                  <tr>
                    <td><strong>心里留保</strong></td>
                    <td class="invalid">无效</td>
                    <td class="invalid">无效</td>
                    <td class="valid">有效</td>
                  </tr>
                  <tr>
                    <td><strong>通谋虚伪</strong></td>
                    <td class="invalid">无效</td>
                    <td class="invalid">无效</td>
                    <td class="valid">有效</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>转得者保护原则</h3>
          <div class="transferee-protection">
            <div class="protection-principle">
              <p>在 <strong>A → B → C → D</strong> 的转卖链条中：</p>
              <div class="protection-rule">
                <div class="rule-icon">✅</div>
                <div class="rule-content">
                  只要<strong>C或D任何一方善意</strong>，最终D胜诉
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 练习题 -->
        <section id="quiz" class="quiz-section">
          <h2>✍️ 练习题</h2>
          
          <div 
            v-for="(quiz, index) in quizzes" 
            :key="index"
            class="quiz-item"
          >
            <div class="quiz-question">{{ quiz.question }}</div>
            <div class="quiz-options">
              <div 
                v-for="option in quiz.options" 
                :key="option.text"
                class="quiz-option"
                :class="{ 
                  'selected': selectedAnswers[index] === option.text,
                  'correct': showAnswers && option.correct,
                  'incorrect': showAnswers && selectedAnswers[index] === option.text && !option.correct
                }"
                @click="selectAnswer(index, option.text)"
              >
                {{ option.text }}
              </div>
            </div>
            <div class="quiz-actions">
              <button class="answer-btn" @click="toggleAnswer(index)">
                {{ showAnswerIndex === index ? '隐藏答案' : '显示答案' }}
              </button>
            </div>
            <div 
              v-if="showAnswerIndex === index" 
              class="answer-explanation"
            >
              <strong>答案：</strong> {{ getCorrectAnswer(quiz) }}<br>
              <strong>中文解释：</strong> {{ quiz.explanation }}
            </div>
          </div>

          <div class="quiz-footer-actions">
            <button class="btn btn-primary" @click="checkAllAnswers">
              检查全部答案
            </button>
            <button class="btn btn-outline" @click="resetQuiz">
              重新练习
            </button>
          </div>
        </section>

        <!-- 底部行动按钮 -->
        <div class="action-buttons">
          <router-link to="/video?topic=declaration-intro" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=declaration" class="action-button">
            <span>📝</span>
            开始强化练习
          </router-link>
          <router-link to="/notes?domain=rights" class="action-button">
            <span>📚</span>
            返回权利关系
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLearningStore } from '@/stores/learning'
import { useRouter } from 'vue-router'

const learningStore = useLearningStore()
const router = useRouter()

// 用户学习进度
const userProgress = ref(0)
const startTime = ref(new Date())

// 页面章节导航
const sections = [
  { id: 'key-terms', title: '关键术语', icon: '🔤' },
  { id: 'basic-concepts', title: '基本概念', icon: '📖' },
  { id: 'contract-formation', title: '契约成立', icon: '📝' },
  { id: 'revocable-declaration', title: '可撤销表示', icon: '🔄' },
  { id: 'invalid-declaration', title: '无效表示', icon: '❌' },
  { id: 'third-party-relations', title: '第三者关系', icon: '👥' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '意思表示（いしひょうじ）',
    chinese: '意思表示',
    explanation: '将自己的内心意思向外部表达的行为',
    example: 'A对B说"我卖给你这块土地"'
  },
  {
    japanese: '詐欺（さぎ）',
    chinese: '欺诈',
    explanation: '欺骗他人使其做出意思表示的行为',
    example: 'A欺骗B说"这土地会贬值"，诱使B低价出售'
  },
  {
    japanese: '強迫（きょうはく）',
    chinese: '强迫',
    explanation: '通过威胁迫使他人做出意思表示的行为',
    example: 'A威胁B"不卖给我就对你家人不利"'
  },
  {
    japanese: '錯誤（さくご）',
    chinese: '错误',
    explanation: '因误解或认识错误而做出的意思表示',
    example: 'A本想买铅笔1支，却说成买1盒'
  },
  {
    japanese: '心裡留保（しんりりゅうほ）',
    chinese: '心里留保',
    explanation: '表意人内心意思与表示不一致的戏谑行为',
    example: 'A开玩笑说"1块钱卖给你"，B却当真'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '詐欺による意思表示は、無効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '欺诈的意思表示是可撤销，不是无效。无效与撤销有本质区别。'
  },
  {
    question: '強迫による意思表示の取消しは、善意無過失の第三者に対抗することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '强迫的受害者即使对善意无过失的第三者也可主张撤销。'
  },
  {
    question: '動機の錯誤は、相手方に表示していない場合、取消しができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '动机错误只有在向对方表示的情况下才可撤销。'
  },
  {
    question: '心裡留保による意思表示は、相手方が悪意の場合、無効となる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '心里留保在对方恶意时无效，这是保护表意人的例外。'
  },
  {
    question: '通謀虚偽表示の無効は、善意の第三者に対抗することができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '通谋虚伪表示的无效不得对抗善意第三者，以保护交易安全。'
  }
]

// 答题状态
const selectedAnswers = ref(Array(quizzes.length).fill(null))
const showAnswerIndex = ref(null)
const showAnswers = ref(false)

// 方法
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const selectAnswer = (index, answer) => {
  selectedAnswers.value[index] = answer
  // 更新学习进度
  updateProgress()
}

const toggleAnswer = (index) => {
  showAnswerIndex.value = showAnswerIndex.value === index ? null : index
}

const getCorrectAnswer = (quiz) => {
  const correctOption = quiz.options.find(option => option.correct)
  return correctOption ? correctOption.text : ''
}

const checkAllAnswers = () => {
  showAnswers.value = true
  updateProgress()
}

const resetQuiz = () => {
  selectedAnswers.value = Array(quizzes.length).fill(null)
  showAnswers.value = false
  showAnswerIndex.value = null
  userProgress.value = 0
}

const updateProgress = () => {
  const total = quizzes.length
  const correct = quizzes.reduce((count, quiz, index) => {
    const selected = selectedAnswers.value[index]
    if (!selected) return count
    
    const isCorrect = quiz.options.find(opt => opt.text === selected)?.correct || false
    return count + (isCorrect ? 1 : 0)
  }, 0)
  
  userProgress.value = Math.round((correct / total) * 100)
}

// 记录学习时间
const recordStudyTime = () => {
  const currentTime = new Date()
  const studyTime = Math.floor((currentTime - startTime.value) / 1000) // 转换为秒
  learningStore.recordTopicStudyTime('declaration', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('declaration')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('declaration')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('declaration', 0)
  
  // 设置定时器，每30秒记录一次学习时间
  const timer = setInterval(() => {
    recordStudyTime()
  }, 30000)
  
  onUnmounted(() => {
    clearInterval(timer)
    // 组件卸载时记录总学习时间
    recordStudyTime()
  })
})
</script>

<style scoped>
.declaration-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0 2rem;
  text-align: center;
}

.breadcrumb {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.breadcrumb a {
  color: #2a7960;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #1a472a;
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
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
  font-size: 1.75rem;
  font-weight: 700;
  color: #2a7960;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 2rem 0;
}

/* ========= 快速导航 ========= */
.quick-nav {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quick-nav h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a472a;
  margin-bottom: 1rem;
}

.nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
}

.nav-link:hover {
  background: #e9ecef;
  color: #1a472a;
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.125rem;
}

/* ========= 学习目标 ========= */
.learning-goals {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.learning-goals h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
}

.learning-goals ul {
  padding-left: 1.5rem;
}

.learning-goals li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

/* ========= 关键术语 ========= */
.key-terms {
  margin-bottom: 2rem;
}

.key-terms h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.term-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #2a7960;
}

.term-japanese {
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.term-chinese {
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.term-explanation {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.term-example {
  background: #eef7ff;
  padding: 1rem;
  border-radius: 5px;
  font-style: italic;
  border-left: 3px solid #a8c6ff;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 内容区块 ========= */
.content-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a472a;
  margin: 1.5rem 0 1rem;
}

.content-section p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.content-section ul, .content-section ol {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.content-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 基本概念样式 ========= */
.concept-explanation {
  margin-bottom: 2rem;
}

.example-box {
  background: #f0f7ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid #2a7960;
}

.example-box h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.effect-timing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.timing-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.timing-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.timing-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.timing-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 契约成立样式 ========= */
.contract-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.flow-step {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.form-requirements {
  margin: 1.5rem 0;
}

.requirement-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.requirement-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.requirement-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.requirement-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.rights-obligations {
  margin: 2rem 0;
}

.relationship-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.party {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  min-width: 200px;
  text-align: center;
}

.party h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.obligation, .right {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  font-size: 0.875rem;
}

.obligation {
  background: #ffe7e7;
  color: #c62828;
}

.right {
  background: #e7f7e7;
  color: #2e7d32;
}

.relationship-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

/* ========= 可撤销意思表示样式 ========= */
.fraud-section, .coercion-section, .mistake-section {
  margin-bottom: 2rem;
}

.fraud-example {
  margin-bottom: 1.5rem;
}

.example-scenario {
  background: #fff9e6;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #ffcc00;
}

.scenario-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a472a;
}

.scenario-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.actor {
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
}

.fraudster {
  background: #ffe7e7;
  color: #c62828;
}

.victim {
  background: #e7f7e7;
  color: #2e7d32;
}

.action {
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-left: 1rem;
}

.legal-effects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

.effect-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.effect-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.effect-positive {
  color: #2e7d32;
  font-weight: bold;
}

.effect-caution {
  color: #c62828;
  font-weight: bold;
}

.third-party-relation {
  margin-top: 1.5rem;
}

.relation-flow {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-family: monospace;
}

.relation-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.comparison-table {
  margin: 1.5rem 0;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th, .comparison-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.comparison-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.highlight {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.mistake-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.type-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.type-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.type-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
}

.revocation-requirements {
  margin: 2rem 0;
}

.requirements-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.requirement {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.req-number {
  width: 30px;
  height: 30px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.req-content {
  flex: 1;
}

.exceptions {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border: 1px solid #ffcc00;
}

.exceptions h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 无效意思表示样式 ========= */
.mental-reservation, .false-representation, .public-order {
  margin-bottom: 2rem;
}

.reservation-example {
  margin-bottom: 1.5rem;
}

.example-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.example-detail {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.legal-principles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.principle-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.principle-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.principle-valid {
  color: #2e7d32;
  font-weight: bold;
}

.principle-invalid {
  color: #c62828;
  font-weight: bold;
}

.representation-case {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.representation-case h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.representation-effects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.effect-principle, .effect-third {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.effect-principle h4, .effect-third h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.effect-invalid {
  color: #c62828;
  font-weight: bold;
}

.violation-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.example-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.example-icon {
  font-size: 1.5rem;
}

.example-content h5 {
  margin: 0 0 0.25rem 0;
  color: #1a472a;
}

.example-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.violation-effect {
  padding: 1.5rem;
  background: #ffe7e7;
  border-radius: 8px;
  border: 1px solid #dc3545;
}

.violation-effect h4 {
  margin: 0 0 1rem 0;
  color: #c62828;
}

.violation-effect ul {
  padding-left: 1.25rem;
  margin: 0;
}

.violation-effect li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 第三者关系样式 ========= */
.good-faith-explanation {
  margin: 1.5rem 0;
}

.faith-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.faith-type {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.faith-type h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.faith-type p {
  margin: 0;
  color: #6c757d;
}

.resistance-summary {
  margin: 2rem 0;
}

.table-container {
  overflow-x: auto;
}

.resistance-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.resistance-table th, .resistance-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.resistance-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.resistance-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.can-resist {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.cannot-resist {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.invalid {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

.valid {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.transferee-protection {
  margin: 2rem 0;
}

.protection-principle {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.protection-rule {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rule-icon {
  font-size: 1.5rem;
}

.rule-content {
  flex: 1;
  font-weight: bold;
  color: #1a472a;
}

/* ========= 练习题样式 ========= */
.quiz-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.quiz-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a472a;
  margin-bottom: 1.5rem;
}

.quiz-item {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.quiz-question {
  font-weight: bold;
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
  line-height: 1.5;
}

.quiz-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.quiz-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
  background: white;
  min-width: 120px;
  justify-content: center;
}

.quiz-option:hover {
  background: #f0f0f0;
}

.quiz-option.selected {
  border-color: #2a7960;
  background: #e9f7f0;
}

.quiz-option.correct {
  border-color: #28a745;
  background: #e7f7e7;
  color: #2e7d32;
}

.quiz-option.incorrect {
  border-color: #dc3545;
  background: #ffe7e7;
  color: #c62828;
}

.quiz-actions {
  margin-bottom: 1rem;
}

.answer-btn {
  background: #2a7960;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.answer-btn:hover {
  background: #1a472a;
}

.answer-explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 5px;
  line-height: 1.6;
}

.quiz-footer-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

/* ========= 按钮样式 ========= */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #2a7960;
  color: white;
}

.btn-primary:hover {
  background: #1a472a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-outline {
  background: transparent;
  color: #2a7960;
  border: 1px solid #2a7960;
}

.btn-outline:hover {
  background: #e9f7f0;
  transform: translateY(-2px);
}

/* ========= 底部行动按钮 ========= */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2a7960, #1a472a);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.action-button.video {
  background: linear-gradient(135deg, #2a7960, #205e4a);
}

/* ========= 响应式设计 ========= */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .header-content h1 {
    font-size: 1.75rem;
  }
  
  .header-stats {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .nav-links {
    grid-template-columns: 1fr;
  }
  
  .terms-grid {
    grid-template-columns: 1fr;
  }
  
  .effect-timing {
    grid-template-columns: 1fr;
  }
  
  .contract-flow {
    grid-template-columns: 1fr;
  }
  
  .relationship-diagram {
    flex-direction: column;
  }
  
  .legal-effects {
    grid-template-columns: 1fr;
  }
  
  .mistake-types {
    grid-template-columns: 1fr;
  }
  
  .legal-principles {
    grid-template-columns: 1fr;
  }
  
  .representation-effects {
    grid-template-columns: 1fr;
  }
  
  .violation-examples {
    grid-template-columns: 1fr;
  }
  
  .faith-types {
    grid-template-columns: 1fr;
  }
  
  .quiz-options {
    flex-direction: column;
  }
  
  .quiz-option {
    min-width: auto;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .content-section, 
  .learning-goals, 
  .quiz-section, 
  .quick-nav {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .quiz-footer-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>