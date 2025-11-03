<!-- src/views/notes/business/CompensationLimit.vue -->
<template>
  <div class="compensation-limit-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>报酬额的限制</span>
        </div>
        <h1>报酬额的限制</h1>
        <p>宅建业者中介服务费的法定上限计算规则，包括买卖、交换、租赁等不同交易类型的报酬计算方法</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">18</span>
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
          <h2>📚 学习目标</h2>
          <ul>
            <li>掌握买卖、交换场合的报酬额计算方法</li>
            <li>理解媒介与代理契约的报酬额差异</li>
            <li>熟悉租赁场合的报酬额限制规则</li>
            <li>了解低廉空家特例的适用条件</li>
            <li>掌握消费税在报酬计算中的处理方法</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🧑‍⚖️ 关键术语</h2>
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

        <!-- 基本概念与必要经费 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 基本概念与必要经费</h2>
          
          <h3>报酬的定义</h3>
          <div class="concept-box">
            <p>报酬是指宅建业者在进行<strong>媒介</strong>或<strong>代理</strong>业务时收取的中介手续费。根据<strong>宅地建物取引业法第46条</strong>，报酬额必须遵守国土交通大臣规定的上限。</p>
          </div>

          <h3>必要经费的处理</h3>
          <div class="expense-handling">
            <div class="expense-item">
              <div class="expense-icon">💰</div>
              <div class="expense-content">
                <h4>包含在报酬内的费用</h4>
                <ul>
                  <li>一般广告费等业务经费</li>
                  <li>日常运营成本</li>
                  <li>标准服务范围内费用</li>
                </ul>
              </div>
            </div>
            <div class="expense-item">
              <div class="expense-icon">📝</div>
              <div class="expense-content">
                <h4>可另行收取的费用</h4>
                <ul>
                  <li>依客户特别要求产生的<strong>实际费用</strong></li>
                  <li>远程现地调查费</li>
                  <li>特殊广告宣传费</li>
                  <li class="important">需事先获得客户同意</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 买卖、交换的报酬计算 -->
        <section id="sale-calculation" class="content-section">
          <h2>2. 买卖、交换的报酬计算</h2>
          
          <h3>速算法计算公式</h3>
          <div class="table-container">
            <table class="calculation-table">
              <thead>
                <tr>
                  <th>买卖价格</th>
                  <th>计算公式</th>
                  <th>计算示例（500万日元）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>200万日元以下</strong></td>
                  <td>买卖价格的5%</td>
                  <td>200万×5% = 10万日元</td>
                </tr>
                <tr>
                  <td><strong>200万超～400万日元以下</strong></td>
                  <td>买卖价格的4% + 2万日元</td>
                  <td>300万×4% + 2万 = 14万日元</td>
                </tr>
                <tr>
                  <td><strong>400万日元超</strong></td>
                  <td>买卖价格的3% + 6万日元</td>
                  <td>500万×3% + 6万 = 21万日元</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>不同契约类型的报酬限制</h3>
          <div class="contract-types">
            <div class="contract-type">
              <h4>🏠 媒介契约</h4>
              <div class="contract-details">
                <div class="detail-item">
                  <span class="detail-label">从单方客户：</span>
                  <span class="detail-value">基准额以内</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">从双方客户：</span>
                  <span class="detail-value">基准额的2倍以内</span>
                </div>
                <div class="example">
                  <strong>例：</strong>1000万日元买卖，基准额36万日元<br>
                  从单方最多36万，从双方最多72万日元
                </div>
              </div>
            </div>
            <div class="contract-type">
              <h4>📑 代理契约</h4>
              <div class="contract-details">
                <div class="detail-item">
                  <span class="detail-label">从单方客户：</span>
                  <span class="detail-value">基准额的2倍以内</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">从双方客户：</span>
                  <span class="detail-value">同一交易中合计不得超过基准额的2倍</span>
                </div>
                <div class="example">
                  <strong>例：</strong>1000万日元买卖，基准额36万日元<br>
                  从单方最多72万，双方合计不超过72万日元
                </div>
              </div>
            </div>
          </div>

          <h3>复数业者参与的情况</h3>
          <div class="multiple-agents">
            <div class="notice-box important">
              <strong>重要规则：</strong>同一交易中所有业者收取的报酬总额不得超过基准额的2倍
            </div>
            
            <div class="agent-scenario">
              <h4>场景示例</h4>
              <div class="scenario-diagram">
                <div class="parties">
                  <div class="party seller">卖方A</div>
                  <div class="arrow">→</div>
                  <div class="agent agent-a">业者A（代理）</div>
                  <div class="arrow">→</div>
                  <div class="transaction">买卖契约</div>
                  <div class="arrow">→</div>
                  <div class="agent agent-b">业者B（媒介）</div>
                  <div class="arrow">→</div>
                  <div class="party buyer">买方B</div>
                </div>
              </div>
              <div class="scenario-calculation">
                <p><strong>5000万日元土地买卖：</strong></p>
                <ul>
                  <li>基准额：5000万×3% + 6万 = 156万日元</li>
                  <li>业者A（代理）：最多156万日元</li>
                  <li>业者B（媒介）：最多156万日元</li>
                  <li><strong>但双方合计不得超过312万日元</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 租赁的报酬限制 -->
        <section id="rental-limits" class="content-section">
          <h2>3. 租赁的报酬限制</h2>
          
          <div class="rental-comparison">
            <div class="rental-type">
              <h4>🏡 居住用建筑物租赁</h4>
              <div class="rental-details">
                <div class="detail-group">
                  <h5>媒介契约</h5>
                  <ul>
                    <li>贷主、借主合计：<strong>租金1个月份以内</strong></li>
                    <li>未获承诺时：从单方客户最多收取<strong>1/2个月份</strong></li>
                    <li>获得承诺时：从单方客户最多收取<strong>1个月份</strong></li>
                  </ul>
                </div>
                <div class="detail-group">
                  <h5>代理契约</h5>
                  <ul>
                    <li>贷主、借主合计：<strong>租金1个月份以内</strong></li>
                    <li>分配比例自由</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="rental-type">
              <h4>🏢 居住用以外建筑物租赁</h4>
              <div class="rental-details">
                <div class="detail-group">
                  <h5>媒介/代理契约</h5>
                  <ul>
                    <li>贷主、借主合计：<strong>租金1个月份以内</strong></li>
                    <li>分配比例自由</li>
                  </ul>
                </div>
                <div class="detail-group important">
                  <h5>权利金收受时</h5>
                  <ul>
                    <li>可将权利金视为买卖代金计算报酬</li>
                    <li>与租金计算比较，取<strong>较高者</strong></li>
                    <li>权利金：权利设定对价且不返还的金钱</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h3>权利金计算示例</h3>
          <div class="rights-fee-example">
            <div class="example-scenario">
              <p><strong>场景：</strong>商铺租赁，月租金20万日元，权利金100万日元</p>
              <div class="calculation-steps">
                <div class="step">
                  <span class="step-label">租金计算：</span>
                  <span class="step-value">20万日元（1个月份）</span>
                </div>
                <div class="step">
                  <span class="step-label">权利金计算：</span>
                  <span class="step-value">100万×3% + 6万 = 9万日元</span>
                </div>
                <div class="step result">
                  <span class="step-label">采用金额：</span>
                  <span class="step-value">20万日元（取较高者）</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 低廉空家特例 -->
        <section id="vacant-house" class="content-section">
          <h2>4. 低廉空家特例</h2>
          
          <div class="special-exception">
            <div class="exception-type">
              <h4>💰 买卖、交换特例</h4>
              <div class="exception-conditions">
                <h5>适用条件</h5>
                <ul>
                  <li>不含税代金<strong>800万日元以下</strong>的宅地或建筑物</li>
                  <li>使用状态不问</li>
                  <li>通常需要更多现地调查费用</li>
                </ul>
              </div>
              <div class="exception-limits">
                <h5>报酬上限</h5>
                <ul>
                  <li><strong>媒介：</strong>从单方客户30万日元+消费税以内</li>
                  <li><strong>代理：</strong>从单方客户60万日元+消费税以内</li>
                </ul>
              </div>
            </div>
            <div class="exception-type">
              <h4>🏚️ 租赁特例</h4>
              <div class="exception-conditions">
                <h5>适用条件</h5>
                <ul>
                  <li>长期空置且将来也无使用可能的宅地或建筑物</li>
                  <li>现长期无人居住</li>
                  <li>将来也无居住或事业使用可能</li>
                  <li>租金不问</li>
                </ul>
              </div>
              <div class="exception-limits">
                <h5>报酬上限</h5>
                <ul>
                  <li><strong>从贷主：</strong>租金2.2倍+消费税以内</li>
                  <li><strong>从借主：</strong>原则上租金1.1倍+消费税以内</li>
                  <li>居住用需获得借主承诺</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="exam-hint">
            <h4>💡 考题提示</h4>
            <p>当题目中出现<strong>"通常よりも現地調査費用等を要するもの"</strong>描述时，通常考察低廉空家特例。</p>
          </div>
        </section>

        <!-- 消费税处理 -->
        <section id="consumption-tax" class="content-section">
          <h2>5. 消费税处理</h2>
          
          <h3>土地与建筑物的区别</h3>
          <div class="tax-differences">
            <div class="tax-type">
              <h4>🌳 土地</h4>
              <ul>
                <li><strong>非课税对象</strong></li>
                <li>直接使用不含税价格计算</li>
                <li>无需考虑消费税</li>
              </ul>
            </div>
            <div class="tax-type">
              <h4>🏠 建筑物</h4>
              <ul>
                <li><strong>课税对象</strong></li>
                <li>需将不含税价格计入计算</li>
                <li>最后加上消费税额</li>
              </ul>
            </div>
          </div>

          <h3>消费税率</h3>
          <div class="tax-rates">
            <div class="rate-item">
              <span class="rate-type">消费税课税事业者：</span>
              <span class="rate-value">10%</span>
            </div>
            <div class="rate-item">
              <span class="rate-type">消费税免税事业者：</span>
              <span class="rate-value">4%（可加算みなし仕入率）</span>
            </div>
          </div>

          <h3>计算顺序示例</h3>
          <div class="calculation-example">
            <div class="example-case">
              <p><strong>案例：</strong>土地5000万日元 + 建筑物2000万日元（含税），业者为消费税课税事业者</p>
              <div class="calculation-steps">
                <div class="step">
                  <span class="step-number">1</span>
                  <span class="step-desc">土地：5000万日元（非课税）</span>
                </div>
                <div class="step">
                  <span class="step-number">2</span>
                  <span class="step-desc">建筑物：2000万 ÷ 1.1 = 1818万日元（不含税）</span>
                </div>
                <div class="step">
                  <span class="step-number">3</span>
                  <span class="step-desc">合计：5000万 + 1818万 = 6818万日元</span>
                </div>
                <div class="step">
                  <span class="step-number">4</span>
                  <span class="step-desc">基准额：6818万 × 3% + 6万 = 210.54万日元</span>
                </div>
                <div class="step">
                  <span class="step-number">5</span>
                  <span class="step-desc">含税报酬：210.54万 × 1.1 = 231.594万日元</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 练习题 -->
        <section id="quiz" class="quiz-section">
          <h2>❓ 判断题</h2>
          
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
          <router-link to="/video?topic=compensation-limit" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=compensation" class="action-button">
            <span>📝</span>
            开始强化练习
          </router-link>
          <router-link to="/notes?domain=business" class="action-button">
            <span>📚</span>
            返回宅建业法
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
  { id: 'key-terms', title: '关键术语', icon: '🧑‍⚖️' },
  { id: 'basic-concepts', title: '基本概念', icon: '📚' },
  { id: 'sale-calculation', title: '买卖计算', icon: '💰' },
  { id: 'rental-limits', title: '租赁限制', icon: '🏠' },
  { id: 'vacant-house', title: '空家特例', icon: '🏚️' },
  { id: 'consumption-tax', title: '消费税', icon: '🧾' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '媒介（ばいかい）',
    chinese: '中介',
    explanation: '宅建业者作为中间人促成交易双方签订契约',
    example: '卖方和买方通过同一中介公司成交'
  },
  {
    japanese: '代理（だいり）',
    chinese: '代理',
    explanation: '宅建业者以一方当事人的名义签订契约',
    example: '中介公司作为卖方的代理人与买方签订买卖合同'
  },
  {
    japanese: '報酬額の制限（ほうしゅうがくのせいげん）',
    chinese: '报酬额的限制',
    explanation: '法律规定的宅建业者可以收取报酬的上限额度',
    example: '1000万日元买卖的媒介报酬上限为36万日元'
  },
  {
    japanese: '権利金（けんりきん）',
    chinese: '权利金',
    explanation: '租赁契约中作为权利设定对价支付且不返还的金钱',
    example: '商铺租赁时支付给房东的入门金'
  },
  {
    japanese: '空き家等（あきやとう）',
    chinese: '空置房屋等',
    explanation: '长期无人居住且将来也无使用可能的宅地或建筑物',
    example: '闲置多年的老朽住宅'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者は、依頼者の依頼に基づいて広告をした場合、報酬とは別にその広告料金を請求することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '基于客户要求产生的广告实际费用，可在报酬外另行收取。'
  },
  {
    question: '居住用建物の貸借の媒介に係る報酬の額は、権利金の授受がある場合、当該権利金の額を売買に係る代金の額とみなして算定することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '居住用建筑物租赁的报酬计算不能使用权利金计算方法。'
  },
  {
    question: '宅地建物取引業者が売買の媒介と代理の両方の依頼を受けている場合、報酬の合計額は基準額の4倍まで受領することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '同一交易中，无论媒介还是代理，报酬总额不得超过基准额的2倍。'
  },
  {
    question: '空き家等の売買における低廉空家特例は、消費税抜きの代金が800万円以下の宅地又は建物に適用される。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '低廉空家特例的适用条件是不含税代金800万日元以下。'
  },
  {
    question: '土地の売買における報酬計算では、消費税を考慮する必要がない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '土地是非课税对象，直接使用买卖价格计算报酬即可。'
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
  learningStore.recordTopicStudyTime('compensation-limit', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('compensation-limit')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('compensation-limit')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('compensation-limit', 0)
  
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
.compensation-limit-page {
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
.concept-box {
  background: #f0f7ff;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
  margin: 1.5rem 0;
}

.expense-handling {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.expense-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.expense-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.expense-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.expense-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.expense-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.expense-content li.important {
  color: #dc3545;
  font-weight: bold;
}

/* ========= 表格样式 ========= */
.table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
}

.calculation-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.calculation-table th, .calculation-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.calculation-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
  text-align: center;
}

.calculation-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.calculation-table tr:hover {
  background-color: #e9ecef;
}

/* ========= 契约类型样式 ========= */
.contract-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.contract-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.contract-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contract-details {
  margin: 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.detail-label {
  font-weight: 500;
}

.detail-value {
  color: #2a7960;
  font-weight: 600;
}

.example {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 复数业者样式 ========= */
.multiple-agents {
  margin: 2rem 0;
}

.notice-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.notice-box.important {
  background: #ffe7e7;
  border-color: #dc3545;
}

.agent-scenario {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.scenario-diagram {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.parties {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.party, .agent, .transaction {
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  font-weight: 500;
}

.agent {
  background: #e7f7e7;
  border-color: #28a745;
}

.arrow {
  color: #2a7960;
  font-weight: bold;
}

.scenario-calculation {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
}

.scenario-calculation ul {
  padding-left: 1.5rem;
  margin: 1rem 0 0 0;
}

.scenario-calculation li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 租赁比较样式 ========= */
.rental-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.rental-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.rental-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rental-details {
  margin: 0;
}

.detail-group {
  margin-bottom: 1.5rem;
}

.detail-group h5 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 1rem;
}

.detail-group ul {
  padding-left: 1.25rem;
  margin: 0;
}

.detail-group li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.detail-group.important {
  background: #fff9e6;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #ffcc00;
}

/* ========= 权利金示例样式 ========= */
.rights-fee-example {
  margin: 2rem 0;
}

.example-scenario {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.calculation-steps {
  margin-top: 1rem;
}

.step {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 5px;
}

.step.result {
  background: #e7f7e7;
  font-weight: bold;
}

.step-label {
  font-weight: 500;
}

.step-value {
  color: #2a7960;
  font-weight: 600;
}

/* ========= 特例样式 ========= */
.special-exception {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.exception-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.exception-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exception-conditions, .exception-limits {
  margin-bottom: 1.5rem;
}

.exception-conditions h5, .exception-limits h5 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 1rem;
}

.exception-conditions ul, .exception-limits ul {
  padding-left: 1.25rem;
  margin: 0;
}

.exception-conditions li, .exception-limits li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.exam-hint {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 12px;
  border: 1px solid #28a745;
}

.exam-hint h4 {
  margin: 0 0 1rem 0;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exam-hint p {
  margin: 0;
  line-height: 1.6;
}

/* ========= 消费税样式 ========= */
.tax-differences {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.tax-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.tax-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.tax-type ul {
  padding-left: 1.25rem;
  margin: 0;
  text-align: left;
}

.tax-type li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.tax-rates {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rate-type {
  font-weight: 500;
}

.rate-value {
  color: #2a7960;
  font-weight: 600;
}

.calculation-example {
  margin: 2rem 0;
}

.example-case {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.calculation-steps {
  margin-top: 1.5rem;
}

.step-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  margin-right: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
}

.step-desc {
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
  
  .expense-handling {
    grid-template-columns: 1fr;
  }
  
  .contract-types {
    grid-template-columns: 1fr;
  }
  
  .rental-comparison {
    grid-template-columns: 1fr;
  }
  
  .special-exception {
    grid-template-columns: 1fr;
  }
  
  .tax-differences {
    grid-template-columns: 1fr;
  }
  
  .tax-rates {
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
  
  .parties {
    flex-direction: column;
    align-items: center;
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
    gap: 0.5rem;
  }
  
  .step {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>