<!-- src/views/notes/rights/Lease.vue -->
<template>
  <div class="lease-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>赁贷借</span>
        </div>
        <h1>赁贷借（租赁借贷）</h1>
        <p>日本民法中的租赁借贷制度，涉及租赁契约、权利义务关系、对抗要件、转贷让渡及敷金等重要内容</p>
        
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
            <span class="stat-number">3</span>
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
            <li>理解赁贷借契约的基本概念和法律性质</li>
            <li>掌握赁贷人与赁借人的权利义务关系</li>
            <li>熟悉赁借权的对抗要件和登记制度</li>
            <li>了解转贷与赁借权让渡的区别和限制</li>
            <li>掌握敷金（押金）的法律性质和返还规则</li>
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
          <h2>1. 赁贷借契约的基本概念</h2>
          
          <h3>定义与性质</h3>
          <div class="concept-explanation">
            <p>赁贷借契约是指支付租金借用他人物品，并在契约结束时返还的契约关系。这是日常生活中最常见的契约类型之一，包括房屋租赁、车辆租赁、物品租赁等。</p>
            
            <div class="example-box">
              <h4>📝 日常案例</h4>
              <p>小明租了一套公寓，月租1000元。这就是典型的赁贷借契约：小明支付租金获得居住权，房东收取租金提供居住空间。</p>
            </div>
          </div>

          <h3>契约特征</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🤝</div>
              <div class="timing-content">
                <h4>双务契约</h4>
                <p>双方互负义务：赁贷人提供使用，赁借人支付租金</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>有偿契约</h4>
                <p>需要支付租金作为对价</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">📝</div>
              <div class="timing-content">
                <h4>诺成契约</h4>
                <p>意思表示一致即成立，不需要特殊形式</p>
              </div>
            </div>
          </div>

          <h3>存续期间</h3>
          <div class="duration-rules">
            <div class="rule-item">
              <h4>最长期限</h4>
              <p><strong>50年</strong> - 超过部分自动缩短为50年</p>
            </div>
            <div class="rule-item">
              <h4>最短期限</h4>
              <p><strong>无限制</strong> - 可以是几小时、几天</p>
            </div>
            <div class="rule-item">
              <h4>无期限契约</h4>
              <p>可以不定期间，随时解约</p>
            </div>
          </div>
        </section>

        <!-- 赁贷人义务 -->
        <section id="lessor-obligations" class="content-section">
          <h2>2. 赁贷人的义务</h2>
          
          <h3>使用收益义务</h3>
          <div class="obligation-item">
            <p>赁贷人必须确保租赁物处于适合使用的状态，并在整个租赁期间维持这种状态。</p>
          </div>

          <h3>修缮义务</h3>
          <div class="repair-obligations">
            <div class="repair-item">
              <h4>基本修缮义务</h4>
              <p>租赁物损坏时，赁贷人负有修缮义务</p>
            </div>
            <div class="repair-item">
              <h4>赁贷人怠于修缮时</h4>
              <p>赁借人可以：</p>
              <ul>
                <li>免除该期间的租金支付</li>
                <li>自行修缮并要求偿还必要费用</li>
              </ul>
            </div>
            <div class="repair-item">
              <h4>例外情况</h4>
              <p>因赁借人责任造成的损坏，赁贷人无修缮义务</p>
            </div>
          </div>

          <h3>费用偿还义务</h3>
          <div class="cost-obligations">
            <div class="cost-item">
              <div class="cost-icon">🔧</div>
              <div class="cost-content">
                <h4>必要费</h4>
                <p><strong>定义：</strong>为维持租赁物正常使用而支出的费用</p>
                <p><strong>偿还：</strong>可立即请求全额偿还</p>
                <div class="cost-example">例如：修理破损的窗户玻璃</div>
              </div>
            </div>
            <div class="cost-item">
              <div class="cost-icon">📈</div>
              <div class="cost-content">
                <h4>有益费</h4>
                <p><strong>定义：</strong>增加租赁物价值的费用</p>
                <p><strong>偿还：</strong>仅在价值增加现存时，在契约结束时按增加额或支出额请求偿还</p>
                <div class="cost-example">例如：将老旧马桶更换为智能马桶</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 赁借人义务 -->
        <section id="lessee-obligations" class="content-section">
          <h2>3. 赁借人的义务</h2>
          
          <h3>租金支付义务</h3>
          <div class="rent-payment">
            <div class="payment-rule">
              <h4>支付原则</h4>
              <p><strong>后付款</strong> - 每月末支付当月租金</p>
              <div class="payment-example">
                <p>例如：5月份的租金在5月31日支付</p>
              </div>
            </div>
          </div>

          <h3>通知义务</h3>
          <div class="notification-obligation">
            <p>发现租赁物需要修缮时，应及时通知赁贷人</p>
          </div>

          <h3>修缮受忍义务</h3>
          <div class="repair-tolerance">
            <p>必须接受赁贷人进行的必要修缮，不得无理拒绝</p>
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>即使修缮工程对使用造成不便，赁借人也不能拒绝。这是为了维护租赁物的长期价值和使用安全。</p>
            </div>
          </div>

          <h3>原状回复义务</h3>
          <div class="restoration-obligation">
            <p>契约结束时，赁借人需将租赁物恢复原状，但以下情况除外：</p>
            <div class="exemption-list">
              <div class="exemption-item">
                <div class="exemption-icon">🔄</div>
                <div class="exemption-content">
                  <h4>正常使用造成的损耗</h4>
                  <p>地板正常磨损、墙壁轻微变色等</p>
                </div>
              </div>
              <div class="exemption-item">
                <div class="exemption-icon">⏳</div>
                <div class="exemption-content">
                  <h4>经年劣化</h4>
                  <p>因时间推移自然老化</p>
                </div>
              </div>
              <div class="exemption-item">
                <div class="exemption-icon">🚫</div>
                <div class="exemption-content">
                  <h4>非因赁借人责任造成的损坏</h4>
                  <p>地震、台风等不可抗力或第三人造成的损坏</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 对抗要件与让渡 -->
        <section id="opposability-transfer" class="content-section">
          <h2>4. 对抗要件与赁借权让渡</h2>
          
          <h3>对抗要件的必要性</h3>
          <div class="opposability-necessity">
            <p>当租赁物所有权变更时，赁借人需要具备对抗要件才能向新所有者主张租赁权。</p>
            
            <div class="scenario-comparison">
              <div class="scenario">
                <h4>无对抗要件时</h4>
                <div class="scenario-content">
                  <p>新所有者："我买了这个房子，请你搬出去！"</p>
                  <p class="outcome negative">→ 赁借人无法对抗，必须搬离</p>
                </div>
              </div>
              <div class="scenario">
                <h4>有对抗要件时</h4>
                <div class="scenario-content">
                  <p>新所有者："我买了这个房子，请你搬出去！"</p>
                  <p class="outcome positive">→ 赁借人可以对抗，继续居住</p>
                </div>
              </div>
            </div>
          </div>

          <h3>对抗要件的形式</h3>
          <div class="opposability-forms">
            <div class="form-item">
              <div class="form-icon">📋</div>
              <div class="form-content">
                <h4>赁借权登记</h4>
                <p>最有效的对抗要件</p>
              </div>
            </div>
            <div class="form-item">
              <div class="form-icon">🏠</div>
              <div class="form-content">
                <h4>建筑物的交付（借家法）</h4>
                <p>建筑物的对抗要件</p>
              </div>
            </div>
            <div class="form-item">
              <div class="form-icon">🌳</div>
              <div class="form-content">
                <h4>借地上建筑物的登记（借地法）</h4>
                <p>土地租赁的对抗要件</p>
              </div>
            </div>
          </div>

          <h3>赁借权让渡与转贷的区别</h3>
          <div class="transfer-comparison">
            <div class="comparison-item">
              <h4>赁借权让渡</h4>
              <ul>
                <li>赁借人将租赁权完全转让给他人</li>
                <li>原赁借人退出契约关系</li>
                <li>新赁借人直接与赁贷人建立关系</li>
              </ul>
            </div>
            <div class="comparison-item">
              <h4>转贷</h4>
              <ul>
                <li>赁借人将租赁物再次出租</li>
                <li>原赁借人仍对赁贷人负责</li>
                <li>形成双重租赁关系</li>
              </ul>
            </div>
          </div>

          <h3>无断让渡转贷的后果</h3>
          <div class="unauthorized-consequences">
            <p>原则上赁贷人可以解除契约，但存在"非背信性特殊情况"时除外。</p>
            <div class="example-box">
              <h4>📝 非背信性特殊情况</h4>
              <p>例如：赁借人将部分房间转租给同居的子女，且不影响赁贷人利益时，可能不被认为是背信行为。</p>
            </div>
          </div>
        </section>

        <!-- 敷金制度 -->
        <section id="deposit-system" class="content-section">
          <h2>5. 敷金（押金）制度</h2>
          
          <h3>法律性质</h3>
          <div class="deposit-nature">
            <p>敷金是为担保租金等债务而支付的金钱，具有担保物权的性质。</p>
          </div>

          <h3>返还规则</h3>
          <div class="return-rules">
            <div class="rule-item">
              <h4>返还时机</h4>
              <p><strong>不是同时履行关系</strong>：必须先退房才能请求返还敷金</p>
            </div>
            <div class="rule-item">
              <h4>抵付规则</h4>
              <p>赁借人不能主张用敷金抵付租金，但赁贷人可以</p>
            </div>
            <div class="rule-item">
              <h4>扣除范围</h4>
              <ul>
                <li>未付租金</li>
                <li>原状回复费用</li>
                <li>其他契约约定的费用</li>
              </ul>
            </div>
          </div>

          <h3>敷金的承继</h3>
          <div class="deposit-succession">
            <div class="succession-scenario">
              <h4>赁贷人变更时</h4>
              <p>敷金返还义务由新赁贷人承继</p>
              <div class="scenario-flow">
                <div class="flow-step">旧赁贷人A</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">新赁贷人B</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">赁借人向B请求返还</div>
              </div>
            </div>
            <div class="succession-scenario">
              <h4>赁借人变更时</h4>
              <p>原赁借人的敷金不自动承继给新赁借人</p>
              <div class="scenario-flow">
                <div class="flow-step">旧赁借人B</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">赁贷人A返还敷金给B</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">新赁借人C重新支付敷金</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 契约更新与解约 -->
        <section id="contract-renewal" class="content-section">
          <h2>6. 契约的更新与解约</h2>
          
          <h3>有期限契约</h3>
          <div class="fixed-term-contract">
            <div class="term-rules">
              <div class="term-rule">
                <h4>最长期限</h4>
                <p><strong>50年</strong> - 超过部分自动缩短为50年</p>
              </div>
              <div class="term-rule">
                <h4>最短期限</h4>
                <p><strong>无限制</strong> - 可以是几小时、几天</p>
              </div>
              <div class="term-rule">
                <h4>中途解约</h4>
                <p>期间内原则上不得中途解约</p>
              </div>
            </div>
          </div>

          <h3>无期限契约</h3>
          <div class="indefinite-term-contract">
            <div class="termination-rules">
              <div class="termination-rule">
                <h4>解约权利</h4>
                <p>随时可以提出解约</p>
              </div>
              <div class="termination-rule">
                <h4>解约生效时间</h4>
                <ul>
                  <li><strong>土地</strong>：提出后1年</li>
                  <li><strong>建筑物</strong>：提出后3个月</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>默示更新</h3>
          <div class="tacit-renewal">
            <p>期间届满后，赁借人继续使用且赁贷人不提出异议时，视为以相同条件更新契约。</p>
            <div class="renewal-process">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>期间届满</h4>
                  <p>原契约期间结束</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>继续使用</h4>
                  <p>赁借人继续使用租赁物</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>不提出异议</h4>
                  <p>赁贷人知情但不提出异议</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>自动更新</h4>
                  <p>视为以相同条件更新契约</p>
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
          <router-link to="/video?topic=lease" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=lease" class="action-button">
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
  { id: 'lessor-obligations', title: '赁贷人义务', icon: '👤' },
  { id: 'lessee-obligations', title: '赁借人义务', icon: '👥' },
  { id: 'opposability-transfer', title: '对抗要件与让渡', icon: '🛡️' },
  { id: 'deposit-system', title: '敷金制度', icon: '💰' },
  { id: 'contract-renewal', title: '契约更新', icon: '📝' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '賃貸借（ちんたいしゃく）',
    chinese: '租赁借贷',
    explanation: '支付租金借用他人物品，契约结束时返还的契约关系',
    example: '租房契约、DVD租赁、租车服务'
  },
  {
    japanese: '賃借権の対抗力（ちんしゃくけんのたいこうりょく）',
    chinese: '租赁权的对抗效力',
    explanation: '赁借人向新所有者主张继续租赁关系的法律效力',
    example: '赁借权登记后，即使房屋出售，新业主也不能随意赶走租客'
  },
  {
    japanese: '転貸（てんたい）',
    chinese: '转租',
    explanation: '赁借人将租赁物再次出租给第三人的行为',
    example: '租客将租来的房屋部分转租给他人'
  },
  {
    japanese: '敷金（しききん）',
    chinese: '押金/保证金',
    explanation: '为担保租金等债务而预先支付的金钱',
    example: '租房时支付相当于2个月租金的押金'
  },
  {
    japanese: '原状回復義務（げんじょうかいふくぎむ）',
    chinese: '原状恢复义务',
    explanation: '契约结束时将租赁物恢复原状的义务',
    example: '退租时将房屋打扫干净，修复人为损坏'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '建物の賃貸人が賃貸物の保存に必要な修繕をする場合、賃借人は修繕工事のため使用収益に支障が生じても、これを拒むことはできない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '赁借人负有修缮受忍义务，即使修缮工程对使用造成不便，也不能无理拒绝。'
  },
  {
    question: '賃貸人Aと賃借人Bとの間で締結した居住用建物の賃貸借契約に関し、BがAに無断でCに当該建物を転貸した場合であっても、Aに対する背信行為と認めるに足りない特段の事情があるときは、Aは賃貸借契約を解除することができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '存在非背信性特殊情况时，即使无断转贷，赁贷人也不能解除契约。'
  },
  {
    question: '建物の賃貸借契約が期間満了により終了した場合、賃借人は、未払賃料債務がある場合、賃貸人に対し、敷金をその債務の弁済に充てるよう請求することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '赁借人不能主张用敷金抵付租金，只有赁贷人可以主张。'
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
  learningStore.recordTopicStudyTime('lease', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('lease')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('lease')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('lease', 0)
  
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
.lease-page {
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

.duration-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rule-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.rule-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.rule-item p {
  margin: 0;
}

/* ========= 赁贷人义务样式 ========= */
.obligation-item {
  margin-bottom: 1.5rem;
}

.repair-obligations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.repair-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.repair-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.repair-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.cost-obligations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.cost-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.cost-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.cost-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.cost-content p {
  margin: 0.25rem 0;
}

.cost-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

/* ========= 赁借人义务样式 ========= */
.rent-payment {
  margin-bottom: 1.5rem;
}

.payment-rule {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.payment-rule h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.payment-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.notification-obligation, .repair-tolerance {
  margin-bottom: 1.5rem;
}

.restoration-obligation {
  margin: 1.5rem 0;
}

.exemption-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.exemption-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.exemption-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.exemption-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.exemption-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 对抗要件样式 ========= */
.opposability-necessity {
  margin-bottom: 2rem;
}

.scenario-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.scenario {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.scenario-content p {
  margin: 0.5rem 0;
}

.outcome {
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

.outcome.negative {
  background: #ffe7e7;
  color: #c62828;
}

.outcome.positive {
  background: #e7f7e7;
  color: #2e7d32;
}

.opposability-forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.form-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.form-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.form-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.form-content p {
  margin: 0;
  color: #6c757d;
}

.transfer-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.comparison-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.comparison-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.unauthorized-consequences {
  margin: 1.5rem 0;
}

/* ========= 敷金制度样式 ========= */
.deposit-nature {
  margin-bottom: 1.5rem;
}

.return-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.deposit-succession {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.succession-scenario {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.succession-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.scenario-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.flow-step {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  flex: 1;
  margin: 0 0.5rem;
}

.flow-arrow {
  font-weight: bold;
  color: #2a7960;
}

/* ========= 契约更新样式 ========= */
.fixed-term-contract, .indefinite-term-contract {
  margin-bottom: 2rem;
}

.term-rules, .termination-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.term-rule, .termination-rule {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.term-rule h4, .termination-rule h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.tacit-renewal {
  margin: 1.5rem 0;
}

.renewal-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.process-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.process-step .step-number {
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

.process-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.process-step p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
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
  
  .duration-rules {
    grid-template-columns: 1fr;
  }
  
  .repair-obligations {
    grid-template-columns: 1fr;
  }
  
  .cost-obligations {
    grid-template-columns: 1fr;
  }
  
  .exemption-list {
    grid-template-columns: 1fr;
  }
  
  .scenario-comparison {
    grid-template-columns: 1fr;
  }
  
  .opposability-forms {
    grid-template-columns: 1fr;
  }
  
  .transfer-comparison {
    grid-template-columns: 1fr;
  }
  
  .return-rules {
    grid-template-columns: 1fr;
  }
  
  .deposit-succession {
    grid-template-columns: 1fr;
  }
  
  .term-rules, .termination-rules {
    grid-template-columns: 1fr;
  }
  
  .renewal-process {
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
  
  .scenario-flow {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .flow-step {
    margin: 0.25rem 0;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
  }
}
</style>