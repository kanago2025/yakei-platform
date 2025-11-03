<!-- src/views/notes/business/Deposit.vue -->
<template>
  <div class="deposit-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>营业保证金</span>
        </div>
        <h1>营业保证金</h1>
        <p>保护消费者权益的重要制度，确保不动产交易中的债务纠纷能够得到合理赔偿</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">22</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">45分钟</span>
            <span class="stat-label">建议学习时间</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">6</span>
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
            <li>理解营业保证金制度的目的和意义</li>
            <li>掌握营业保证金的供托金额、方式和流程</li>
            <li>熟悉营业保证金的还付条件和范围</li>
            <li>了解营业保证金的取回条件和公告要求</li>
            <li>能够区分不同情况下的供托要求</li>
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

        <!-- 营业保证金制度简介 -->
        <section id="deposit-intro" class="content-section">
          <h2>1. 营业保证金制度简介</h2>
          
          <div class="intro-content">
            <div class="intro-text">
              <p><strong>营业保证金制度</strong>是为了保护消费者权益而设立的重要制度。当消费者与不动产交易业者发生债务纠纷时，如果业者无法支付赔偿，消费者可以从供托的保证金中获得赔付。</p>
              
              <div class="highlight-box important">
                <h4>💡 制度目的</h4>
                <p>防止因开发商跑路、破产等情况导致消费者蒙受损失，确保交易安全。</p>
              </div>
            </div>
            
            <div class="process-flow">
              <h3>事业开始流程</h3>
              <div class="flow-steps">
                <div class="flow-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>免许</h4>
                    <p>取得宅建业免许</p>
                  </div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>供托</h4>
                    <p>供托营业保证金</p>
                  </div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>届出</h4>
                    <p>向免许权者届出</p>
                  </div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>事业开始</h4>
                    <p>正式开始营业</p>
                  </div>
                </div>
              </div>
              <div class="flow-note">
                <strong>注意：</strong>必须按顺序完成所有步骤，仅供托保证金但未届出仍不能开业。
              </div>
            </div>
          </div>
        </section>

        <!-- 供托细则 -->
        <section id="deposit-details" class="content-section">
          <h2>2. 营业保证金供托细则</h2>
          
          <h3>供托金额标准</h3>
          <div class="amount-standards">
            <div class="standard-item main">
              <div class="standard-icon">🏢</div>
              <div class="standard-content">
                <h4>主事务所（本店）</h4>
                <div class="amount">1,000万日元</div>
              </div>
            </div>
            <div class="standard-item branch">
              <div class="standard-icon">🏬</div>
              <div class="standard-content">
                <h4>从事务所（支店）</h4>
                <div class="amount">500万日元 × 事务所数</div>
              </div>
            </div>
          </div>

          <div class="calculation-example">
            <h4>📊 计算示例</h4>
            <p>本店1个 + 支店3个的情况：</p>
            <div class="calculation">
              <div>本店：1,000万日元</div>
              <div>支店：500万日元 × 3 = 1,500万日元</div>
              <div class="total">合计：2,500万日元</div>
            </div>
          </div>

          <h3>供托方式</h3>
          <div class="deposit-methods">
            <div class="method-item">
              <h4>💰 金钱供托</h4>
              <p>直接以现金形式供托</p>
            </div>
            <div class="method-item">
              <h4>📈 有价证券供托</h4>
              <p>可使用的有价证券及折算比例：</p>
              <div class="table-container">
                <table class="comparison-table">
                  <thead>
                    <tr>
                      <th>有价证券类型</th>
                      <th>折算比例</th>
                      <th>示例</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>国債証券</strong></td>
                      <td>100%</td>
                      <td>1,000万日元国債 = 1,000万日元</td>
                    </tr>
                    <tr>
                      <td><strong>地方債証券・政府保証債証券</strong></td>
                      <td>90%</td>
                      <td>1,000万日元地方債 = 900万日元</td>
                    </tr>
                    <tr>
                      <td><strong>其他有价证券</strong></td>
                      <td>80%</td>
                      <td>1,000万日元其他证券 = 800万日元</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="important-notes">
            <div class="note-item warning">
              <h4>⚠️ 重要注意</h4>
              <ul>
                <li>金钱和有价证券可以混合使用</li>
                <li>变更供托方式时需立即向免许权者届出</li>
                <li>案内所不需要供托营业保证金</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 供托流程与管理 -->
        <section id="deposit-process" class="content-section">
          <h2>3. 供托流程与管理</h2>
          
          <h3>供托地点</h3>
          <div class="deposit-location">
            <div class="location-info">
              <div class="location-icon">📍</div>
              <div class="location-content">
                <h4>供托所</h4>
                <p>日本各地的法务局</p>
                <p class="emphasis">必须在<strong>主事务所最寄りの供託所</strong>供托</p>
              </div>
            </div>
          </div>

          <h3>事务所增设时的供托</h3>
          <div class="branch-addition">
            <div class="addition-process">
              <h4>🏗️ 增设流程</h4>
              <ol>
                <li>向主事务所最寄りの供託所<strong>追加供托</strong>保证金</li>
                <li>添附供托书副本向免许权者<strong>届出</strong></li>
                <li>完成届出后新事务所才能<strong>开始营业</strong></li>
              </ol>
            </div>
          </div>

          <h3>未及时供托的后果</h3>
          <div class="consequences">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker">1</div>
                <div class="timeline-content">
                  <h4>免许取得后3个月内</h4>
                  <p>如未进行供托届出，免许权者<strong>必须催告</strong></p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">2</div>
                <div class="timeline-content">
                  <h4>催告后1个月内</h4>
                  <p>如仍未届出，免许权者<strong>可以取消</strong>免许</p>
                </div>
              </div>
            </div>
            <div class="consequence-note">
              <strong>注意：</strong>免许权者"可以"取消免许，而不是"必须"取消。
            </div>
          </div>
        </section>

        <!-- 保管替换与二重供托 -->
        <section id="deposit-transfer" class="content-section">
          <h2>4. 保管替换与二重供托</h2>
          
          <h3>主事务所移转的情况</h3>
          <div class="transfer-scenarios">
            <div class="scenario">
              <h4>🔄 仅金钱供托时</h4>
              <div class="scenario-content">
                <div class="scenario-title">保管替换（保管替え）</div>
                <div class="process-flow">
                  <div class="process-step">
                    <div class="step-label">宅建业者</div>
                    <div class="step-arrow">→</div>
                    <div class="step-label">向旧供托所请求保管替换</div>
                    <div class="step-arrow">→</div>
                    <div class="step-label">新供托所</div>
                  </div>
                </div>
                <ul>
                  <li>必须<strong>迟滞なく（及时）</strong>进行</li>
                  <li>仅限<strong>金钱供托</strong>的情况</li>
                </ul>
              </div>
            </div>
            
            <div class="scenario">
              <h4>📊 含有价证券时</h4>
              <div class="scenario-content">
                <div class="scenario-title">二重供托</div>
                <div class="process-flow">
                  <div class="process-step">
                    <div class="step-label">向新供托所供托</div>
                    <div class="step-arrow">→</div>
                    <div class="step-label">形成二重供托</div>
                    <div class="step-arrow">→</div>
                    <div class="step-label">从旧供托所取回</div>
                  </div>
                </div>
                <ul>
                  <li>避免出现无保证金供托的空窗期</li>
                  <li>取回时<strong>不需要公告</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="transfer-notes">
            <div class="note-item important">
              <h4>💡 关键区别</h4>
              <p><strong>金钱供托</strong> → 可请求保管替换</p>
              <p><strong>含有价证券</strong> → 必须进行二重供托</p>
            </div>
          </div>
        </section>

        <!-- 还付制度 -->
        <section id="deposit-refund" class="content-section">
          <h2>5. 还付制度（赔付）</h2>
          
          <h3>还付条件</h3>
          <div class="refund-conditions">
            <div class="condition-item eligible">
              <h4>✅ 可以还付的情况</h4>
              <ul>
                <li>宅建物买卖产生的债权</li>
                <li>宅建物交换产生的债权</li>
                <li>宅建物租借产生的债权</li>
                <li>其他宅建业交易中产生的债权</li>
              </ul>
              <div class="condition-note">
                <strong>对象：</strong>与宅建业者进行交易的一般消费者
              </div>
            </div>
            <div class="condition-item ineligible">
              <h4>❌ 不能还付的情况</h4>
              <ul>
                <li>员工的工资纠纷</li>
                <li>广告公司的报酬纠纷</li>
                <li>电气工事费用</li>
                <li>内装工事费用</li>
                <li>建设工事费用</li>
                <li>同为宅建业者的交易对方</li>
              </ul>
            </div>
          </div>

          <h3>还付流程</h3>
          <div class="refund-process">
            <div class="process-description">
              <p>蒙受损失的消费者<strong>直接向供托所申请赔付</strong>，在供托的营业保证金范围内获得赔偿。</p>
            </div>
          </div>

          <h3>还付后的补充要求</h3>
          <div class="replenishment">
            <div class="replenishment-timeline">
              <div class="timeline-item">
                <div class="timeline-marker">1</div>
                <div class="timeline-content">
                  <h4>收到不足通知</h4>
                  <p>免许权者发出营业保证金不足通知</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">2</div>
                <div class="timeline-content">
                  <h4>2周内供托</h4>
                  <p>收到通知后<strong>2周内</strong>补充不足金额</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">3</div>
                <div class="timeline-content">
                  <h4>2周内届出</h4>
                  <p>供托后<strong>2周内</strong>向免许权者届出</p>
                </div>
              </div>
            </div>
            <div class="penalty-note">
              <strong>罚则：</strong>如未及时补充和届出，可能受到业务停止处分，情节严重者免许可能被取消。
            </div>
          </div>
        </section>

        <!-- 保证金取回 -->
        <section id="deposit-withdrawal" class="content-section">
          <h2>6. 营业保证金取回</h2>
          
          <h3>取回事由</h3>
          <div class="withdrawal-reasons">
            <div class="reasons-grid">
              <div class="reason-item">
                <h4>📅 免许期间届满</h4>
              </div>
              <div class="reason-item">
                <h4>🚪 废业届出</h4>
              </div>
              <div class="reason-item">
                <h4>💼 宅建业者死亡</h4>
              </div>
              <div class="reason-item">
                <h4>🏢 公司合并消灭</h4>
              </div>
              <div class="reason-item">
                <h4>❌ 免许取消</h4>
              </div>
              <div class="reason-item">
                <h4>📍 主事务所移转</h4>
              </div>
              <div class="reason-item">
                <h4>🤝 加入保证协会</h4>
              </div>
              <div class="reason-item">
                <h4>🏬 事务所一部废止</h4>
              </div>
            </div>
          </div>

          <h3>取回流程与公告要求</h3>
          <div class="withdrawal-process">
            <div class="process-comparison">
              <div class="comparison-item">
                <h4>📢 需要公告的情况</h4>
                <ul>
                  <li>免许期间届满</li>
                  <li>废业、破产等免许失效</li>
                  <li>免许取消处分</li>
                  <li>事务所一部废止</li>
                </ul>
                <div class="process-note">
                  <strong>要求：</strong>6个月以上的公告期间
                </div>
              </div>
              <div class="comparison-item">
                <h4>🔇 不需要公告的情况</h4>
                <ul>
                  <li>二重供托时</li>
                  <li>加入保证协会时</li>
                  <li>取回事由发生10年后</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="withdrawal-example">
            <h4>📝 取回计算示例</h4>
            <p>原供托：本店+支店 = 1,500万日元</p>
            <p>支店关闭后只需：本店 = 1,000万日元</p>
            <p class="result">可取回：500万日元（仍需公告）</p>
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
          <router-link to="/video?topic=deposit-intro" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=deposit" class="action-button">
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
  { id: 'deposit-intro', title: '制度简介', icon: '📖' },
  { id: 'deposit-details', title: '供托细则', icon: '💰' },
  { id: 'deposit-process', title: '供托流程', icon: '📋' },
  { id: 'deposit-transfer', title: '保管替换', icon: '🔄' },
  { id: 'deposit-refund', title: '还付制度', icon: '💸' },
  { id: 'deposit-withdrawal', title: '保证金取回', icon: '📤' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '営業保証金（えいぎょうほしょうきん）',
    chinese: '营业保证金',
    explanation: '宅建业者为保护消费者权益而供托的保证金',
    example: '本店1,000万日元，支店500万日元'
  },
  {
    japanese: '供託（きょうたく）',
    chinese: '供托',
    explanation: '将金钱或有价证券存入法务局供托所的行为',
    example: '必须在主事务所最寄りの供託所供托'
  },
  {
    japanese: '保管替え（ほかんがえ）',
    chinese: '保管替换',
    explanation: '主事务所移转时，仅金钱供托情况下可申请的保管转移',
    example: '仅限金钱供托，含有价证券时不可'
  },
  {
    japanese: '二重供託（にじゅうきょうたく）',
    chinese: '二重供托',
    explanation: '主事务所移转时，含有价证券供托情况下形成的新旧供托所同时供托状态',
    example: '取回时不需要公告'
  },
  {
    japanese: '還付（かんぷ）',
    chinese: '还付',
    explanation: '消费者从供托的营业保证金中获得赔付的制度',
    example: '仅限于宅建业交易中产生的债权'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者A（甲県知事免許）が甲県内に本店及び２つの支店を設置して宅地建物取引業を営もうとする場合、供託すべき営業保証金の合計額は1,200万円である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '本店1,000万日元 + 支店500万日元×2 = 2,000万日元，不是1,200万日元。'
  },
  {
    question: '新たに宅地建物取引業を営もうとする者は、営業保証金を金銭又は国土交通省令で定める有価証券により、主たる事務所の最寄りの供託所に供託した後に、国土交通大臣又は都道府県知事の免許を受けなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '正确的顺序是：先取得免许，然后供托营业保证金，顺序不能颠倒。'
  },
  {
    question: '宅地建物取引業者は、主たる事務所を移転したためその最寄りの供託所が変更した場合、国債証券をもって営業保証金を供託しているときは、遅滞なく、従前の主たる事務所の最寄りの供託所に対し、営業保証金の保管替えを請求しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '含有价证券（包括国債証券）的情况下不能请求保管替换，必须进行二重供托。'
  },
  {
    question: '営業保証金の還付は、宅地建物取引業の取引により生じた債権を有する者に限り受けることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '还付仅限于宅建业交易中产生的债权，其他债权（如员工工资、广告费等）不能还付。'
  },
  {
    question: '営業保証金の不足が生じた場合、宅地建物取引業者は、不足の生じた日から２週間以内に不足額を供託しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '应该是从收到免许权者的不足通知之日起2周内供托，不是从不足发生之日起。'
  },
  {
    question: '営業保証金の取戻しをする場合、すべての場合において６か月以上の公告が必要である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '二重供托、加入保证协会、取回事由发生10年后等情况不需要公告。'
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
  learningStore.recordTopicStudyTime('deposit', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('deposit')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('deposit')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('deposit', 0)
  
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
.deposit-page {
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
  background: linear-gradient(135deg, rgba(74, 107, 157, 0.05), rgba(74, 107, 157, 0.02));
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
  color: #4a6b9d;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #2c3e5c;
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
  color: #4a6b9d;
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
  color: #2c3e5c;
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
  color: #2c3e5c;
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
  color: #2c3e5c;
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
  color: #2c3e5c;
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
  border-left: 4px solid #4a6b9d;
}

.term-japanese {
  font-weight: bold;
  color: #4a6b9d;
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
  color: #2c3e5c;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e5c;
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

/* ========= 制度简介样式 ========= */
.intro-content {
  display: grid;
  gap: 2rem;
}

.intro-text {
  line-height: 1.6;
}

.highlight-box {
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.highlight-box.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.highlight-box h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.process-flow {
  margin: 2rem 0;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.flow-step {
  text-align: center;
  flex: 1;
  min-width: 120px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4a6b9d;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 0.5rem;
}

.step-content h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e5c;
}

.step-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.flow-arrow {
  color: #4a6b9d;
  font-weight: bold;
  font-size: 1.25rem;
}

.flow-note {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
}

/* ========= 供托金额样式 ========= */
.amount-standards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.standard-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.standard-item.main {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.standard-item.branch {
  background: #e7f0f7;
  border: 1px solid #4a6b9d;
}

.standard-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.standard-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e5c;
}

.amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e5c;
}

.calculation-example {
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.calculation-example h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.calculation {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.calculation div {
  margin-bottom: 0.5rem;
}

.calculation .total {
  font-weight: bold;
  color: #2c3e5c;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
}

/* ========= 供托方式样式 ========= */
.deposit-methods {
  display: grid;
  gap: 2rem;
  margin: 2rem 0;
}

.method-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.method-item h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ========= 表格样式 ========= */
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
  background-color: #4a6b9d;
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

/* ========= 重要注意样式 ========= */
.important-notes {
  margin: 2rem 0;
}

.note-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.note-item.warning {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.note-item.important {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.note-item h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.note-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.note-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 供托地点样式 ========= */
.deposit-location {
  margin: 2rem 0;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.location-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.location-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e5c;
}

.location-content p {
  margin: 0.25rem 0;
}

.emphasis {
  font-weight: bold;
  color: #2c3e5c;
}

/* ========= 事务所增设样式 ========= */
.branch-addition {
  margin: 2rem 0;
}

.addition-process {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.addition-process h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.addition-process ol {
  padding-left: 1.5rem;
  margin: 0;
}

.addition-process li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 时间线样式 ========= */
.timeline {
  margin: 2rem 0;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.timeline-marker {
  width: 30px;
  height: 30px;
  background: #4a6b9d;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.timeline-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e5c;
}

.timeline-content p {
  margin: 0;
  line-height: 1.6;
}

.consequence-note {
  padding: 1rem;
  background: #fff9e6;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
}

/* ========= 保管替换样式 ========= */
.transfer-scenarios {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.scenario {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.scenario h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.scenario-content {
  text-align: center;
}

.scenario-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #4a6b9d;
}

.process-step {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.step-label {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  font-size: 0.875rem;
}

.step-arrow {
  color: #4a6b9d;
  font-weight: bold;
}

.scenario-content ul {
  padding-left: 1.25rem;
  margin: 0;
  text-align: left;
}

.scenario-content li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.transfer-notes {
  margin: 2rem 0;
}

/* ========= 还付条件样式 ========= */
.refund-conditions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.condition-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.condition-item.eligible {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.condition-item.ineligible {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.condition-item h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.condition-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.condition-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.condition-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  font-size: 0.875rem;
}

/* ========= 还付流程样式 ========= */
.refund-process {
  margin: 2rem 0;
}

.process-description {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  border-left: 4px solid #4a6b9d;
  line-height: 1.6;
}

/* ========= 补充要求样式 ========= */
.replenishment {
  margin: 2rem 0;
}

.replenishment-timeline {
  margin: 1.5rem 0;
}

.penalty-note {
  padding: 1rem;
  background: #fff9e6;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
}

/* ========= 取回样式 ========= */
.withdrawal-reasons {
  margin: 2rem 0;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.reason-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.reason-item h4 {
  margin: 0;
  color: #2c3e5c;
}

.withdrawal-process {
  margin: 2rem 0;
}

.process-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.comparison-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comparison-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.comparison-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.process-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 5px;
  font-size: 0.875rem;
}

.withdrawal-example {
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.withdrawal-example h4 {
  margin: 0 0 1rem 0;
  color: #2c3e5c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.withdrawal-example p {
  margin: 0.5rem 0;
}

.withdrawal-example .result {
  font-weight: bold;
  color: #2c3e5c;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
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
  color: #2c3e5c;
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
  border-color: #4a6b9d;
  background: #e7f0f7;
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
  background: #4a6b9d;
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
  background: #3a5b8d;
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
  background: #4a6b9d;
  color: white;
}

.btn-primary:hover {
  background: #3a5b8d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 107, 157, 0.3);
}

.btn-outline {
  background: transparent;
  color: #4a6b9d;
  border: 1px solid #4a6b9d;
}

.btn-outline:hover {
  background: #e7f0f7;
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
  background: linear-gradient(135deg, #4a6b9d, #3a5b8d);
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
  background: linear-gradient(135deg, #4a6b9d, #2c3e5c);
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
  
  .amount-standards {
    grid-template-columns: 1fr;
  }
  
  .flow-steps {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
  }
  
  .transfer-scenarios {
    grid-template-columns: 1fr;
  }
  
  .refund-conditions {
    grid-template-columns: 1fr;
  }
  
  .process-comparison {
    grid-template-columns: 1fr;
  }
  
  .reasons-grid {
    grid-template-columns: repeat(2, 1fr);
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
  
  .reasons-grid {
    grid-template-columns: 1fr;
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