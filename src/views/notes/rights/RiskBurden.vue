<!-- src/views/notes/rights/RiskBurden.vue -->
<template>
  <div class="risk-burden-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>危险负担</span>
        </div>
        <h1>危险负担（危険負担）</h1>
        <p>因不可归责于双方当事人的事由导致债务不能履行时，损失风险由谁承担的法律制度</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">12</span>
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
            <li>理解危险负担的基本概念和法律性质</li>
            <li>掌握危险负担的转移时间点（引渡前后）</li>
            <li>熟悉履行迟滞期间的危险负担特殊规则</li>
            <li>了解可归责于债权者事由时的特殊处理</li>
            <li>能够运用危险负担规则分析具体案例</li>
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
          <h2>1. 危险负担的基本概念</h2>
          
          <h3>定义理解</h3>
          <div class="concept-explanation">
            <p>危险负担是指在双务合同中，因不可归责于双方当事人的事由导致债务不能履行时，损失风险由谁承担的法律制度。</p>
            
            <div class="example-box">
              <h4>📝 核心特征</h4>
              <ul>
                <li>适用于<strong>双务合同</strong>（双方互负债务）</li>
                <li>事由<strong>不可归责于任何一方</strong></li>
                <li>涉及债务履行不能的后果分配</li>
              </ul>
            </div>
          </div>

          <h3>生活化理解</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">📦</div>
              <div class="timing-content">
                <h4>网购类比</h4>
                <p>就像网购商品在运输途中损坏，这个损失应该由卖家承担还是买家承担？危险负担就是解决这类问题的规则。</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">🏠</div>
              <div class="timing-content">
                <h4>房屋买卖</h4>
                <p>签约后交房前房屋因地震毁坏，买主是否还要支付房款？危险负担规则决定风险分配。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 一般规则 -->
        <section id="general-rules" class="content-section">
          <h2>2. 危险负担的一般规则</h2>
          
          <h3>引渡前 vs 引渡后</h3>
          <div class="rules-flowchart">
            <div class="flowchart-container">
              <div class="flowchart-item">
                <div class="flowchart-header">
                  <div class="flowchart-icon">📤</div>
                  <h4>引渡前</h4>
                </div>
                <div class="flowchart-content">
                  <p><strong>危险由卖主承担</strong></p>
                  <div class="flowchart-result">
                    <span class="result-badge can-refuse">买主可拒绝付款</span>
                  </div>
                </div>
              </div>
              <div class="flowchart-arrow">→</div>
              <div class="flowchart-item">
                <div class="flowchart-header">
                  <div class="flowchart-icon">📥</div>
                  <h4>引渡后</h4>
                </div>
                <div class="flowchart-content">
                  <p><strong>危险由买主承担</strong></p>
                  <div class="flowchart-result">
                    <span class="result-badge must-pay">买主仍需付款</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>典型案例分析</h3>
          <div class="case-examples">
            <div class="case-item">
              <div class="case-header">
                <span class="case-badge before-delivery">引渡前</span>
                <h4>案例1：正常交易中的地震</h4>
              </div>
              <div class="case-content">
                <p><strong>场景：</strong>A卖房给B，签约价3000万，房屋在引渡前因地震灭失</p>
                <div class="case-analysis">
                  <div class="analysis-step">
                    <span class="step-marker">①</span>
                    <span>引渡前 + 不可归责事由</span>
                  </div>
                  <div class="analysis-step">
                    <span class="step-marker">②</span>
                    <span>危险由卖主A承担</span>
                  </div>
                  <div class="analysis-step">
                    <span class="step-marker">③</span>
                    <span>B可以拒绝支付3000万房款</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="case-item">
              <div class="case-header">
                <span class="case-badge after-delivery">引渡后</span>
                <h4>案例2：引渡后的风险</h4>
              </div>
              <div class="case-content">
                <p><strong>场景：</strong>A已将房屋交付给B，后因地震灭失</p>
                <div class="case-analysis">
                  <div class="analysis-step">
                    <span class="step-marker">①</span>
                    <span>引渡后 + 不可归责事由</span>
                  </div>
                  <div class="analysis-step">
                    <span class="step-marker">②</span>
                    <span>危险由买主B承担</span>
                  </div>
                  <div class="analysis-step">
                    <span class="step-marker">③</span>
                    <span>B仍需支付3000万房款，不能解除契约</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 特殊情形 -->
        <section id="special-cases" class="content-section">
          <h2>3. 特殊情形：可归责于债权者</h2>
          
          <h3>法律规则</h3>
          <div class="legal-rule-box">
            <p>因可归责于债权者的事由导致债务不能履行的，债权人不得拒绝履行对待给付。</p>
          </div>

          <h3>典型案例分析</h3>
          <div class="special-case">
            <div class="case-scenario">
              <h4>📖 具体案例</h4>
              <p>卖主A带买主B看房，B随手扔烟头引发火灾，房屋烧毁。</p>
            </div>
            <div class="case-consequences">
              <h4>⚖️ 法律后果</h4>
              <div class="consequence-list">
                <div class="consequence-item">
                  <span class="consequence-icon">💰</span>
                  <div class="consequence-content">
                    <h5>付款义务不免除</h5>
                    <p>B不能拒绝支付房款（仍需履行对待给付）</p>
                  </div>
                </div>
                <div class="consequence-item">
                  <span class="consequence-icon">🔄</span>
                  <div class="consequence-content">
                    <h5>利益返还义务</h5>
                    <p>如果A因此获得利益（如保险金），应偿还给B</p>
                  </div>
                </div>
                <div class="consequence-item">
                  <span class="consequence-icon">⚖️</span>
                  <div class="consequence-content">
                    <h5>损害赔偿责任</h5>
                    <p>B可能还要承担损害赔偿责任</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 履行迟滞 -->
        <section id="performance-delay" class="content-section">
          <h2>4. 履行迟滞期间的特别规则</h2>
          
          <div class="delay-comparison">
            <div class="delay-type">
              <div class="delay-header">
                <div class="delay-icon">⏰</div>
                <h3>债务者履行迟滞</h3>
              </div>
              <div class="delay-content">
                <h4>规则内容</h4>
                <p>在债务者原因导致的履行迟滞期间，因不可归责事由导致履行不能的，责任归责于债务者。</p>
                
                <div class="delay-example">
                  <h5>📋 案例说明</h5>
                  <ul>
                    <li>A与B约定10月1日交房，但A逾期未交</li>
                    <li>10月15日发生地震，房屋损毁</li>
                    <li><strong>结果：</strong>危险由A承担，B可请求损害赔偿</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="delay-type">
              <div class="delay-header">
                <div class="delay-icon">🙅</div>
                <h3>债权者履行迟滞</h3>
              </div>
              <div class="delay-content">
                <h4>规则内容</h4>
                <p>在债权者原因导致的履行迟滞期间，因不可归责事由导致履行不能的，责任归责于债权者。</p>
                
                <div class="delay-example">
                  <h5>📋 案例说明</h5>
                  <ul>
                    <li>A与B约定10月1日交房，但B找理由拒绝收房</li>
                    <li>10月15日发生地震，房屋损毁</li>
                    <li><strong>结果：</strong>危险由B承担，B仍需支付房款</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 实务要点 -->
        <section id="practical-points" class="content-section">
          <h2>5. 实务要点总结</h2>
          
          <h3>⚠️ 重要提醒</h3>
          <div class="important-points">
            <div class="point-item">
              <h4>危险负担转移的关键时点</h4>
              <div class="point-details">
                <div class="detail-item">
                  <span class="detail-type">动产：</span>
                  <span class="detail-content">交付时</span>
                </div>
                <div class="detail-item">
                  <span class="detail-type">不动产：</span>
                  <span class="detail-content">登记完成且实际交付时</span>
                </div>
                <div class="detail-item">
                  <span class="detail-type">权利：</span>
                  <span class="detail-content">权利转移登记完成时</span>
                </div>
              </div>
            </div>

            <div class="point-item">
              <h4>证明责任分配</h4>
              <div class="point-details">
                <div class="detail-item">
                  <span class="detail-type">主张危险负担已转移：</span>
                  <span class="detail-content">需证明引渡已完成</span>
                </div>
                <div class="detail-item">
                  <span class="detail-type">主张不可归责事由：</span>
                  <span class="detail-content">需证明事件无法预见和避免</span>
                </div>
                <div class="detail-item">
                  <span class="detail-type">主张对方归责事由：</span>
                  <span class="detail-content">需证明对方存在过错</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 制度区别 -->
        <section id="system-differences" class="content-section">
          <h2>6. 与其他制度的区别</h2>
          
          <h3>危险负担 vs 瑕疵担保</h3>
          <div class="comparison-table">
            <div class="table-container">
              <table class="differences-table">
                <thead>
                  <tr>
                    <th>区别点</th>
                    <th>危险负担</th>
                    <th>瑕疵担保</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>发生时间</strong></td>
                    <td>契约成立后</td>
                    <td>契约成立时已存在</td>
                  </tr>
                  <tr>
                    <td><strong>事由性质</strong></td>
                    <td>不可归责事由</td>
                    <td>标的物本身缺陷</td>
                  </tr>
                  <tr>
                    <td><strong>法律效果</strong></td>
                    <td>风险分配</td>
                    <td>责任承担</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>危险负担 vs 债务不履行</h3>
          <div class="comparison-table">
            <div class="table-container">
              <table class="differences-table">
                <thead>
                  <tr>
                    <th>区别点</th>
                    <th>危险负担</th>
                    <th>债务不履行</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>归责事由</strong></td>
                    <td>不可归责</td>
                    <td>可归责</td>
                  </tr>
                  <tr>
                    <td><strong>救济方式</strong></td>
                    <td>风险分配</td>
                    <td>损害赔偿</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 风险防范 -->
        <section id="risk-prevention" class="content-section">
          <h2>7. 风险防范措施</h2>
          
          <div class="prevention-advice">
            <div class="advice-group">
              <h3>👤 对买主的建议</h3>
              <div class="advice-list">
                <div class="advice-item">
                  <span class="advice-icon">⚡</span>
                  <span>尽快完成引渡手续</span>
                </div>
                <div class="advice-item">
                  <span class="advice-icon">📝</span>
                  <span>及时办理所有权转移登记</span>
                </div>
                <div class="advice-item">
                  <span class="advice-icon">🛡️</span>
                  <span>考虑购买相关保险</span>
                </div>
              </div>
            </div>

            <div class="advice-group">
              <h3>👨‍💼 对卖主的建议</h3>
              <div class="advice-list">
                <div class="advice-item">
                  <span class="advice-icon">🏠</span>
                  <span>在引渡前妥善保管标的物</span>
                </div>
                <div class="advice-item">
                  <span class="advice-icon">📋</span>
                  <span>及时投保相关险种</span>
                </div>
                <div class="advice-item">
                  <span class="advice-icon">⏱️</span>
                  <span>明确约定引渡时间和方式</span>
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
          <router-link to="/video?topic=risk-burden" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=risk-burden" class="action-button">
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
  { id: 'general-rules', title: '一般规则', icon: '⚖️' },
  { id: 'special-cases', title: '特殊情形', icon: '🚨' },
  { id: 'performance-delay', title: '履行迟滞', icon: '⏰' },
  { id: 'practical-points', title: '实务要点', icon: '💼' },
  { id: 'system-differences', title: '制度区别', icon: '🔍' },
  { id: 'risk-prevention', title: '风险防范', icon: '🛡️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '危険負担（きけんふたん）',
    chinese: '危险负担',
    explanation: '因不可归责于双方的事由导致债务不能履行时，损失风险由谁承担的问题',
    example: '地震导致买卖房屋灭失，房款支付义务是否免除'
  },
  {
    japanese: '引渡（ひきわたし）',
    chinese: '交付',
    explanation: '将标的物实际转移给买受人占有的行为',
    example: '卖主将房屋钥匙交给买主，完成房屋引渡'
  },
  {
    japanese: '履行遅滞（りこうちたい）',
    chinese: '履行迟滞',
    explanation: '债务人无正当理由未在履行期内履行债务的状态',
    example: '约定10月1日交房，但卖主逾期未交付'
  },
  {
    japanese: '不可抗力（ふかこうりょく）',
    chinese: '不可抗力',
    explanation: '无法预见、无法避免且无法克服的客观情况',
    example: '地震、台风、战争等天灾人祸'
  },
  {
    japanese: '反对给付（はんたいきゅうふ）',
    chinese: '对待给付',
    explanation: '双务合同中一方为换取对方给付而承担的给付义务',
    example: '买卖合同中，买主的付款义务相对于卖主的交货义务'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '売主Aと買主Bの間で締結された建物売買契約において、引渡前に地震により建物が滅失した場合、買主Bは代金支払義務を免れる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '根据危险负担规则，引渡前因不可归责事由导致标的物灭失的，危险由卖主承担，买主可以拒绝履行对待给付（支付房款）。'
  },
  {
    question: '履行遅滞中の債務者について、不可抗力による履行不能が生じた場合でも、債務者は危険を負担する。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '在债务者原因导致的履行迟滞期间，即使因不可抗力导致履行不能，责任仍归责于债务者。'
  },
  {
    question: '買主の帰責事由により履行不能となった場合、買主は代金支払義務を免れる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '因可归责于债权者（买主）的事由导致履行不能的，债权人不得拒绝履行对待给付，仍需支付房款。'
  },
  {
    question: '引渡後の危険は買主が負担するため、地震により建物が滅失しても買主は代金を支払わなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '引渡完成后，危险负担转移至买主，即使因不可抗力导致标的物灭失，买主仍需履行付款义务。'
  },
  {
    question: '危険負担の規定は、当事者双方の帰責事由がない場合にのみ適用される。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '危险负担制度专门处理不可归责于双方当事人的事由导致的履行不能问题，如有归责事由则适用其他规则。'
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
  learningStore.recordTopicStudyTime('risk-burden', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('risk-burden')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('risk-burden')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('risk-burden', 0)
  
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
.risk-burden-page {
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

/* ========= 一般规则样式 ========= */
.rules-flowchart {
  margin: 2rem 0;
}

.flowchart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.flowchart-item {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  min-width: 250px;
}

.flowchart-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.flowchart-icon {
  font-size: 2.5rem;
}

.flowchart-header h4 {
  margin: 0;
  color: #1a472a;
  font-size: 1.25rem;
}

.flowchart-content p {
  font-weight: bold;
  margin-bottom: 1rem;
}

.flowchart-result {
  margin-top: 1rem;
}

.result-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.875rem;
}

.result-badge.can-refuse {
  background: #e7f7e7;
  color: #2e7d32;
}

.result-badge.must-pay {
  background: #ffe7e7;
  color: #c62828;
}

.flowchart-arrow {
  font-size: 2rem;
  color: #2a7960;
  font-weight: bold;
}

.case-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.case-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.case-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.case-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}

.case-badge.before-delivery {
  background: #ffe7e7;
  color: #c62828;
}

.case-badge.after-delivery {
  background: #e7f7e7;
  color: #2e7d32;
}

.case-header h4 {
  margin: 0;
  color: #1a472a;
}

.case-content p {
  margin-bottom: 1rem;
}

.case-analysis {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.analysis-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.step-marker {
  width: 24px;
  height: 24px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* ========= 特殊情形样式 ========= */
.legal-rule-box {
  background: #fff9e6;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #ffcc00;
  font-weight: bold;
}

.special-case {
  margin: 2rem 0;
}

.case-scenario {
  background: #f0f7ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #2a7960;
}

.case-scenario h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.case-consequences h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.consequence-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.consequence-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.consequence-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.consequence-content h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.consequence-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 履行迟滞样式 ========= */
.delay-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.delay-type {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.delay-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.delay-icon {
  font-size: 2rem;
}

.delay-header h3 {
  margin: 0;
  color: #1a472a;
}

.delay-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.delay-example {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.delay-example h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.delay-example ul {
  padding-left: 1.25rem;
  margin: 0;
}

.delay-example li {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

/* ========= 实务要点样式 ========= */
.important-points {
  margin: 2rem 0;
}

.point-item {
  margin-bottom: 2rem;
}

.point-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.point-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.detail-type {
  font-weight: bold;
  color: #2a7960;
  flex-shrink: 0;
  min-width: 120px;
}

.detail-content {
  color: #333;
}

/* ========= 制度区别样式 ========= */
.comparison-table {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.differences-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.differences-table th, .differences-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.differences-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.differences-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

/* ========= 风险防范样式 ========= */
.prevention-advice {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.advice-group {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.advice-group h3 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.advice-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.advice-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.advice-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
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
  
  .flowchart-container {
    flex-direction: column;
  }
  
  .flowchart-arrow {
    transform: rotate(90deg);
  }
  
  .case-examples {
    grid-template-columns: 1fr;
  }
  
  .consequence-list {
    grid-template-columns: 1fr;
  }
  
  .delay-comparison {
    grid-template-columns: 1fr;
  }
  
  .point-details {
    grid-template-columns: 1fr;
  }
  
  .prevention-advice {
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
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .detail-type {
    min-width: auto;
  }
}
</style>