<!-- src/views/notes/business/HousingDefectWarranty.vue -->
<template>
  <div class="housing-defect-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>住宅瑕疵担保履行法</span>
        </div>
        <h1>住宅瑕疵担保履行法</h1>
        <p>确保新筑住宅卖主有足够资力承担瑕疵担保责任，保护消费者权益的重要法律制度</p>
        
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
            <li>理解住宅瑕疵担保履行法的立法目的和适用范围</li>
            <li>掌握资力确保措施的两种方式及其具体要求</li>
            <li>熟悉供托金额的计算方法和届出义务</li>
            <li>了解违反规定的法律后果</li>
            <li>掌握实务操作中的注意事项</li>
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

        <!-- 法律概述 -->
        <section id="law-overview" class="content-section">
          <h2>1. 法律概述与立法目的</h2>
          
          <div class="law-basics">
            <div class="law-item">
              <h4>📅 制定与施行</h4>
              <ul>
                <li><strong>制定时间</strong>：平成19年5月</li>
                <li><strong>施行时间</strong>：平成21年10月</li>
                <li><strong>立法背景</strong>：解决卖主缺乏资金实力无法履行瑕疵担保责任的问题</li>
              </ul>
            </div>
            <div class="law-item">
              <h4>🎯 立法目的</h4>
              <ul>
                <li>确保新筑住宅卖主有足够资力承担瑕疵担保责任</li>
                <li>保护消费者（买主）的合法权益</li>
                <li>促进住宅市场的健康发展</li>
              </ul>
            </div>
          </div>

          <h3>适用范围</h3>
          <div class="applicability-table">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>情况</th>
                    <th>是否适用</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>宅建业者作为自卖主</strong></td>
                    <td class="applicable">✅ 适用</td>
                    <td>主要适用对象</td>
                  </tr>
                  <tr>
                    <td><strong>买主为宅建业者</strong></td>
                    <td class="not-applicable">❌ 不适用</td>
                    <td>业者间交易不适用</td>
                  </tr>
                  <tr>
                    <td><strong>媒介业务</strong></td>
                    <td class="not-applicable">❌ 不适用</td>
                    <td>仅适用于自卖主情况</td>
                  </tr>
                  <tr>
                    <td><strong>新筑住宅（完工1年内未入住）</strong></td>
                    <td class="applicable">✅ 适用</td>
                    <td>特定对象物</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>责任期间与买主权利</h3>
          <div class="responsibility-period">
            <div class="period-info">
              <div class="info-item">
                <h4>⏱️ 责任期间</h4>
                <p><strong>10年</strong>（自物件交付日起）</p>
              </div>
              <div class="info-item">
                <h4>🏠 适用范围</h4>
                <p>结构耐力部分 + 雨水浸入防止部分</p>
              </div>
              <div class="info-item">
                <h4>⚖️ 买主权利</h4>
                <p>损害赔偿、契约解除、瑕疵修补、代金减额</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 资力确保措施 -->
        <section id="financial-measures" class="content-section">
          <h2>2. 资力确保措施的种类</h2>
          
          <div class="measures-comparison">
            <div class="measure-card">
              <div class="measure-header">
                <h3>💰 供托保证金方式</h3>
                <div class="measure-icon">🏦</div>
              </div>
              <div class="measure-content">
                <h4>供托要求</h4>
                <ul>
                  <li><strong>场所</strong>：主事务所最近的供托所</li>
                  <li><strong>物品种类</strong>：金钱或有价证券</li>
                  <li><strong>时间</strong>：基准日起3周内完成</li>
                </ul>
                
                <h4>金额计算</h4>
                <div class="calculation-method">
                  <div class="formula">
                    <strong>供托金额 = 基准日前10年交付户数 × 单位金额</strong>
                  </div>
                  <div class="special-rule">
                    <h5>特殊计算规则</h5>
                    <p>床面积<strong>55㎡以下</strong>的住宅：<strong>2户按1户</strong>计算</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="measure-card">
              <div class="measure-header">
                <h3>🛡️ 加入保险方式</h3>
                <div class="measure-icon">📄</div>
              </div>
              <div class="measure-content">
                <h4>保险要求</h4>
                <ul>
                  <li><strong>保险费用</strong>：由宅建业者（卖主）支付</li>
                  <li><strong>保险金额</strong>：<strong class="highlight">2000万日元以上</strong></li>
                  <li><strong>保险期间</strong>：<strong class="highlight">10年以上</strong>（自交付日起）</li>
                </ul>
                
                <h4>文件要求</h4>
                <ul>
                  <li>必须将<strong>保险证券</strong>交付给买主</li>
                  <li>或通过电磁方法提供替代书面</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="measures-note">
            <div class="notice-box important">
              <h4>💡 重要提示</h4>
              <p>供托和加入保险<strong>可以并用</strong>，业者可根据实际情况选择最适合的方式。</p>
            </div>
          </div>
        </section>

        <!-- 供托保证金具体要求 -->
        <section id="deposit-requirements" class="content-section">
          <h2>3. 供托保证金的具体要求</h2>
          
          <h3>供托时间要求</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker">1</div>
              <div class="timeline-content">
                <h4>基准日确定</h4>
                <p>每年<strong>3月31日</strong>为基准日</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker">2</div>
              <div class="timeline-content">
                <h4>供托期限</h4>
                <p>基准日起<strong>3周内</strong>必须完成供托</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker">3</div>
              <div class="timeline-content">
                <h4>计算期间</h4>
                <p>基准日前<strong>10年间</strong>交付的新筑住宅</p>
              </div>
            </div>
          </div>

          <h3>特殊情况处理</h3>
          <div class="special-cases">
            <div class="case-item">
              <h4>🏢 主事务所移转</h4>
              <div class="case-content">
                <div class="case-option">
                  <strong>仅金钱供托时</strong>：可请求<strong class="highlight">保管替え</strong>
                </div>
                <div class="case-option">
                  <strong>包含有价证券时</strong>：需要<strong class="highlight">重新供托</strong>
                </div>
              </div>
            </div>
            
            <div class="case-item">
              <h4>📊 面积计算特例</h4>
              <div class="case-content">
                <p>床面积<strong>55㎡以下</strong>的新筑住宅：</p>
                <div class="calculation-example">
                  <strong>2户 = 1户</strong>（供托计算时）
                </div>
              </div>
            </div>
          </div>

          <h3>信息提供义务</h3>
          <div class="information-obligation">
            <div class="obligation-item">
              <h4>📝 书面说明</h4>
              <p>必须在<strong>契约缔结前</strong>，向买主书面说明供托所的所在地等信息</p>
            </div>
            <div class="obligation-item">
              <h4>💻 电磁方法</h4>
              <p>在得到买主同意后，可通过<strong>电磁方法</strong>提供相关信息</p>
            </div>
          </div>

          <h3>保证金管理</h3>
          <div class="deposit-management">
            <div class="management-item">
              <h4>⬇️ 保证金不足时</h4>
              <ul>
                <li>收到通知后<strong>2周内</strong>必须补足</li>
                <li>供托完成后<strong>2周内</strong>向免许权者届出</li>
              </ul>
            </div>
            <div class="management-item">
              <h4>⬆️ 保证金超额时</h4>
              <ul>
                <li>可在基准日获得免许权者承认后</li>
                <li>取回<strong>超额部分</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 届出义务 -->
        <section id="reporting-obligation" class="content-section">
          <h2>4. 届出义务与违反后果</h2>
          
          <h3>届出内容要求</h3>
          <div class="reporting-content">
            <div class="reporting-item">
              <div class="reporting-number">1</div>
              <div class="reporting-details">
                <h4>总户数统计</h4>
                <p>基准日前<strong>10年内</strong>交付的新筑住宅<strong>总户数</strong></p>
              </div>
            </div>
            <div class="reporting-item">
              <div class="reporting-number">2</div>
              <div class="reporting-details">
                <h4>供托措施户数</h4>
                <p>通过<strong>供托</strong>履行瑕疵担保措施的<strong>总户数</strong></p>
              </div>
            </div>
            <div class="reporting-item">
              <div class="reporting-number">3</div>
              <div class="reporting-details">
                <h4>保险措施户数</h4>
                <p>通过<strong>保险</strong>履行瑕疵担保措施的<strong>总户数</strong></p>
              </div>
            </div>
          </div>

          <div class="reporting-timeline">
            <div class="timeline-visual">
              <div class="timeline-start">
                <div class="timeline-date">基准日</div>
                <div class="timeline-label">3月31日</div>
              </div>
              <div class="timeline-arrow">→</div>
              <div class="timeline-middle">
                <div class="timeline-date">3周内</div>
                <div class="timeline-label">届出期限</div>
              </div>
              <div class="timeline-arrow">→</div>
              <div class="timeline-end">
                <div class="timeline-date">第51天</div>
                <div class="timeline-label">业务禁止开始</div>
              </div>
            </div>
          </div>

          <h3>违反后果</h3>
          <div class="violation-consequences">
            <div class="consequence-item serious">
              <div class="consequence-icon">💰</div>
              <div class="consequence-content">
                <h4>行政处罚</h4>
                <ul>
                  <li><strong>罚金</strong>：50万日元以下</li>
                  <li><strong>业务禁止</strong>：基准日后第51天起禁止新筑住宅买卖</li>
                </ul>
              </div>
            </div>
            <div class="consequence-item critical">
              <div class="consequence-icon">⚖️</div>
              <div class="consequence-content">
                <h4>刑事处罚</h4>
                <ul>
                  <li><strong>违反禁止规定时</strong>：</li>
                  <li>1年以下惩役 <strong>或</strong> 100万日元以下罚金</li>
                  <li><strong>或两者并罚</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 实务要点 -->
        <section id="practical-points" class="content-section">
          <h2>5. 实务操作要点</h2>
          
          <div class="practical-grid">
            <div class="practical-item">
              <h4>🛡️ 买主权利保障</h4>
              <div class="practical-content">
                <p>发生瑕疵时，买主可要求：</p>
                <ul>
                  <li><strong>损害赔偿</strong></li>
                  <li><strong>契约解除</strong></li>
                  <li><strong>瑕疵修补</strong></li>
                  <li><strong>代金减额</strong></li>
                </ul>
              </div>
            </div>

            <div class="practical-item">
              <h4>📐 面积计算实务</h4>
              <div class="practical-content">
                <p>床面积<strong>55㎡以下</strong>的新筑住宅：</p>
                <div class="calculation-rule">
                  <strong>2户 = 1户</strong>（供托计算时）
                </div>
                <p class="note">适用于小户型住宅的特殊计算规则</p>
              </div>
            </div>

            <div class="practical-item">
              <h4>📄 保险证券交付</h4>
              <div class="practical-content">
                <p>加入保险时，必须：</p>
                <ul>
                  <li>将<strong>保险证券</strong>交付给买主</li>
                  <li>或提供<strong>替代书面</strong></li>
                  <li>确保买主收到相关证明文件</li>
                </ul>
              </div>
            </div>

            <div class="practical-item">
              <h4>🔄 双重措施运用</h4>
              <div class="practical-content">
                <p><strong>供托和加入保险可以并用</strong></p>
                <p class="note">业者可根据业务规模和风险状况选择最适合的方案组合</p>
              </div>
            </div>
          </div>

          <div class="practical-reminder">
            <div class="reminder-box">
              <h4>💎 核心要点总结</h4>
              <div class="reminder-content">
                <div class="reminder-item">
                  <strong>适用对象</strong>：宅建业者作为自卖主 + 新筑住宅（完工1年内未入住）
                </div>
                <div class="reminder-item">
                  <strong>责任期间</strong>：交付后10年（结构耐力部分 + 雨水浸入防止部分）
                </div>
                <div class="reminder-item">
                  <strong>资力措施</strong>：供托保证金 或 加入保险（2000万以上，10年以上）
                </div>
                <div class="reminder-item">
                  <strong>届出义务</strong>：基准日（3月31日）起3周内
                </div>
                <div class="reminder-item">
                  <strong>违反后果</strong>：罚金50万以下 + 业务禁止（第51天起）
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
          <router-link to="/video?topic=housing-defect" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=housing-defect" class="action-button">
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
  { id: 'law-overview', title: '法律概述', icon: '📖' },
  { id: 'financial-measures', title: '资力措施', icon: '💰' },
  { id: 'deposit-requirements', title: '供托要求', icon: '🏦' },
  { id: 'reporting-obligation', title: '届出义务', icon: '📝' },
  { id: 'practical-points', title: '实务要点', icon: '💼' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '住宅瑕疵担保履行法（じゅうたくかしたんぽりこうほう）',
    chinese: '住宅瑕疵担保履行法',
    explanation: '确保新筑住宅卖主有足够资力承担瑕疵担保责任的法律',
    example: '平成19年制定，平成21年施行'
  },
  {
    japanese: '資力確保措置（しりょくかくほそち）',
    chinese: '资力确保措施',
    explanation: '卖主为确保能够履行瑕疵担保责任而采取的资金保障措施',
    example: '供托保证金或加入保险'
  },
  {
    japanese: '供託（きょうたく）',
    chinese: '供托',
    explanation: '将保证金存入指定供托所的法律行为',
    example: '在主事务所最近的供托所存入金钱或有价证券'
  },
  {
    japanese: '基準日（きじゅんび）',
    chinese: '基准日',
    explanation: '每年3月31日，用于计算供托金额和届出的关键日期',
    example: '以基准日前10年内的交付户数计算供托金额'
  },
  {
    japanese: '構造耐力上主要な部分（こうぞうたいりょくじょうしゅようなぶぶん）',
    chinese: '结构耐力上主要部分',
    explanation: '建筑物的基础、土台、屋顶、墙壁、柱子等承重结构',
    example: '基础、土台、屋根、壁、柱等'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '自ら売主として新築住宅を宅地建物取引業者でない買主に引き渡した宅地建物取引業者は、当該住宅を引き渡した日から３週間以内に、その住宅に関する資力確保措置の状況について、その免許を受けた国土交通大臣又は都道府県知事に届け出なければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '届出期限是"基准日"起3周内，不是"交付日"起3周内。'
  },
  {
    question: '宅地建物取引業者が自ら売主となる新築住宅の売買において、資力確保措置として加入する保険の保険金額は、1,000万円以上でなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '保险金额必须是2000万日元以上，不是1000万日元。'
  },
  {
    question: '床面積が50㎡の新築住宅は、供託金の算定基礎となる戸数の計算において、2戸をもって1戸とみなす。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '床面积55㎡以下的住宅，在计算供托户数时，2户按1户计算。'
  },
  {
    question: '宅地建物取引業者は、資力確保措置を講じていない場合、基準日の翌日から直ちに新築住宅の売買契約を締結することができなくなる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '基准日后第51天起才禁止新筑住宅买卖，不是基准日次日。'
  },
  {
    question: '資力確保措置の届出を怠った場合、50万円以下の罰金に処せられる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '违反届出义务的罚则是50万日元以下罚金。'
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
  learningStore.recordTopicStudyTime('housing-defect', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('housing-defect')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('housing-defect')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('housing-defect', 0)
  
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
.housing-defect-page {
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

/* ========= 法律概述样式 ========= */
.law-basics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.law-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.law-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.law-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.law-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.applicability-table {
  margin: 2rem 0;
}

.table-container {
  overflow-x: auto;
  margin: 1.5rem 0;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th, .comparison-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
  text-align: center;
}

.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.comparison-table tr:hover {
  background-color: #e9ecef;
}

.applicable {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
  text-align: center;
}

.not-applicable {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.responsibility-period {
  margin: 2rem 0;
}

.period-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.info-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.info-item p {
  margin: 0;
}

/* ========= 资力确保措施样式 ========= */
.measures-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.measure-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  overflow: hidden;
}

.measure-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #2a7960, #1a472a);
  color: white;
}

.measure-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.measure-icon {
  font-size: 2rem;
}

.measure-content {
  padding: 1.5rem;
}

.measure-content h4 {
  margin: 1rem 0 0.5rem 0;
  color: #1a472a;
}

.measure-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.measure-content li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.calculation-method {
  margin-top: 1rem;
}

.formula {
  background: #f0f7ff;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
  border-left: 4px solid #2a7960;
}

.special-rule {
  background: #fff9e6;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ffcc00;
}

.special-rule h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.highlight {
  color: #c62828;
  font-weight: bold;
}

.measures-note {
  margin: 2rem 0;
}

.notice-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: 12px;
  padding: 1.5rem;
}

.notice-box.important {
  background: #ffe7e7;
  border-color: #dc3545;
}

.notice-box h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ========= 供托保证金样式 ========= */
.timeline {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #2a7960;
  z-index: 1;
}

.timeline-item {
  text-align: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.timeline-marker {
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
  position: relative;
}

.timeline-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.timeline-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.timeline-content p {
  margin: 0;
  font-size: 0.875rem;
}

.special-cases {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.case-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.case-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.case-content {
  margin: 0;
}

.case-option {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.calculation-example {
  background: #e7f7e7;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  border: 1px solid #28a745;
}

.information-obligation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.obligation-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.obligation-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.obligation-item p {
  margin: 0;
  line-height: 1.6;
}

.deposit-management {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.management-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.management-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.management-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.management-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 届出义务样式 ========= */
.reporting-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.reporting-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.reporting-number {
  width: 40px;
  height: 40px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.reporting-details h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.reporting-details p {
  margin: 0;
  line-height: 1.6;
}

.reporting-timeline {
  margin: 2rem 0;
}

.timeline-visual {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.timeline-start, .timeline-middle, .timeline-end {
  text-align: center;
  flex: 1;
}

.timeline-date {
  font-weight: bold;
  font-size: 1.125rem;
  color: #2a7960;
  margin-bottom: 0.5rem;
}

.timeline-label {
  font-size: 0.875rem;
  color: #6c757d;
}

.timeline-arrow {
  color: #2a7960;
  font-weight: bold;
  font-size: 1.5rem;
}

.violation-consequences {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.consequence-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.consequence-item.serious {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.consequence-item.critical {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.consequence-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.consequence-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.consequence-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.consequence-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 实务要点样式 ========= */
.practical-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.practical-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.practical-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.practical-content p {
  margin: 0 0 1rem 0;
}

.practical-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.practical-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.calculation-rule {
  background: #e7f7e7;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  margin: 1rem 0;
  border: 1px solid #28a745;
}

.note {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.practical-reminder {
  margin: 2rem 0;
}

.reminder-box {
  background: linear-gradient(135deg, #2a7960, #1a472a);
  color: white;
  border-radius: 12px;
  padding: 2rem;
}

.reminder-box h4 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  text-align: center;
}

.reminder-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.reminder-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  line-height: 1.6;
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
  
  .law-basics {
    grid-template-columns: 1fr;
  }
  
  .measures-comparison {
    grid-template-columns: 1fr;
  }
  
  .special-cases {
    grid-template-columns: 1fr;
  }
  
  .information-obligation {
    grid-template-columns: 1fr;
  }
  
  .deposit-management {
    grid-template-columns: 1fr;
  }
  
  .violation-consequences {
    grid-template-columns: 1fr;
  }
  
  .practical-grid {
    grid-template-columns: 1fr;
  }
  
  .reporting-content {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    flex-direction: column;
    gap: 2rem;
  }
  
  .timeline::before {
    display: none;
  }
  
  .timeline-visual {
    flex-direction: column;
    gap: 1rem;
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
  
  .reminder-content {
    grid-template-columns: 1fr;
  }
}
</style>