<!-- src/views/notes/rights/GuaranteeAndJointDebt.vue -->
<template>
  <div class="guarantee-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>保证与连带债务</span>
        </div>
        <h1>保证与连带债务</h1>
        <p>日本民法中的保证制度、连带保证、连带债务等重要概念，涉及保证人的权利义务、债务性质及实务要点</p>
        
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
            <li>理解保证债务的基本概念和成立要件</li>
            <li>掌握保证债务的三大性质：付从性、随伴性、补充性</li>
            <li>熟悉普通保证与连带保证的区别</li>
            <li>了解连带债务的效力原则和例外</li>
            <li>掌握保证人和连带保证人的抗辩权</li>
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

        <!-- 保证债务基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 保证债务的基本概念</h2>
          
          <h3>保证的定义</h3>
          <div class="concept-explanation">
            <p>保证是指当<strong>主债务人</strong>无法偿还债务时，由<strong>保证人</strong>代为履行债务的契约。</p>
            
            <div class="example-box">
              <h4>📝 保证关系示意图</h4>
              <div class="relationship-diagram">
                <div class="relationship-item">
                  <div class="role">债权人 A</div>
                  <div class="arrow">← 借款关系 →</div>
                  <div class="role">主债务人 B</div>
                </div>
                <div class="relationship-item">
                  <div class="role">债权人 A</div>
                  <div class="arrow">← 保证关系 →</div>
                  <div class="role">保证人 C</div>
                </div>
                <div class="note">* 即使B反对，A和C仍可签订保证契约</div>
              </div>
            </div>
          </div>

          <h3>保证契约的成立要件</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">📝</div>
              <div class="timing-content">
                <h4>书面形式</h4>
                <p>保证契约必须采用<strong>书面形式</strong>或<strong>电磁记录</strong></p>
                <div class="timing-note">口头保证契约无效</div>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">👤</div>
              <div class="timing-content">
                <h4>契约当事人</h4>
                <p>债权人与保证人之间的契约</p>
                <div class="timing-note">不需要主债务人的同意</div>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💼</div>
              <div class="timing-content">
                <h4>保证人资格</h4>
                <p>原则上任何人都可成为保证人</p>
                <div class="timing-note">但可能有特殊限制</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 保证债务的性质 -->
        <section id="guarantee-properties" class="content-section">
          <h2>2. 保证债务的性质</h2>
          
          <h3>付从性（従属性）</h3>
          <div class="property-explanation">
            <p>保证债务以主债务的存在为前提，随主债务的变动而变动。</p>
            
            <div class="property-cases">
              <div class="case-item">
                <h4>主债务不成立</h4>
                <div class="case-content">
                  <div class="case-scenario">借款失败 → 保证债务也不成立</div>
                  <div class="case-result">❌ 保证无效</div>
                </div>
              </div>
              <div class="case-item">
                <h4>主债务消灭</h4>
                <div class="case-content">
                  <div class="case-scenario">主债务人还清债务 → 保证债务也消灭</div>
                  <div class="case-result">✅ 保证终止</div>
                </div>
              </div>
              <div class="case-item">
                <h4>主债务减额</h4>
                <div class="case-content">
                  <div class="case-scenario">主债务从1000万减至800万</div>
                  <div class="case-result">⬇️ 保证债务也减至800万</div>
                </div>
              </div>
            </div>
          </div>

          <h3>随伴性</h3>
          <div class="accompaniment-explanation">
            <p>当主债务转移时，保证债务也随之转移。</p>
            
            <div class="transfer-diagram">
              <div class="transfer-step">
                <div class="step-label">原债权关系</div>
                <div class="step-entities">
                  <div class="entity">债权人 A</div>
                  <div class="arrow">←债权→</div>
                  <div class="entity">主债务人 B</div>
                  <div class="arrow">←保证→</div>
                  <div class="entity">保证人 C</div>
                </div>
              </div>
              <div class="transfer-step">
                <div class="step-label">债权让渡后</div>
                <div class="step-entities">
                  <div class="entity">新债权人 D</div>
                  <div class="arrow">←债权→</div>
                  <div class="entity">主债务人 B</div>
                  <div class="arrow">←保证→</div>
                  <div class="entity">保证人 C</div>
                </div>
              </div>
            </div>
          </div>

          <h3>补充性</h3>
          <div class="supplementary-explanation">
            <p>保证人只有在主债务人无法履行债务时才承担保证责任。</p>
            
            <div class="rights-comparison">
              <div class="right-item">
                <h4>催告的抗辩权</h4>
                <div class="right-content">
                  <p>"请先向主债务人请求！"</p>
                  <div class="right-note">债权人未向主债务人请求即向保证人请求时，保证人可以拒绝</div>
                </div>
              </div>
              <div class="right-item">
                <h4>检索的抗辩权</h4>
                <div class="right-content">
                  <p>"主债务人有财产，请先执行他的财产！"</p>
                  <div class="right-note">保证人可以证明主债务人有清偿能力并要求先执行主债务人财产</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 共同保证与分别利益 -->
        <section id="joint-guarantee" class="content-section">
          <h2>3. 共同保证与分别利益</h2>
          
          <h3>分别的利益</h3>
          <div class="benefit-explanation">
            <p>当有多个保证人时，各保证人只承担按人数平分的保证责任。</p>
            
            <div class="benefit-example">
              <h4>案例：1000万债务，2名保证人</h4>
              <div class="calculation">
                <div class="calc-step">总债务：1000万円</div>
                <div class="calc-step">保证人数：2人</div>
                <div class="calc-step result">每人保证债务：1000万 ÷ 2 = 500万円</div>
              </div>
              
              <div class="diagram">
                <div class="creditor">债权人</div>
                <div class="debtor">主债务人<br>债务1000万</div>
                <div class="guarantors">
                  <div class="guarantor">保证人A<br>保证债务500万</div>
                  <div class="guarantor">保证人B<br>保证债务500万</div>
                </div>
              </div>
            </div>
          </div>

          <h3>根保证（最高额保证）</h3>
          <div class="root-guarantee">
            <div class="root-concept">
              <h4>概念</h4>
              <p>对<strong>一定期间内连续发生的不特定债务</strong>提供保证，如租赁合同中的租金、原状恢复费用等。</p>
            </div>
            
            <div class="root-requirements">
              <h4>个人根保证的特殊要求</h4>
              <div class="requirements-list">
                <div class="req-item">
                  <div class="req-icon">⚠️</div>
                  <div class="req-content">
                    <strong>必须设定上限额（极额度）</strong>
                    <p>未设定上限额的根保证契约无效</p>
                  </div>
                </div>
                <div class="req-item">
                  <div class="req-icon">💼</div>
                  <div class="req-content">
                    <strong>仅适用于个人</strong>
                    <p>法人不受此限制，无需设定上限额</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 连带保证 -->
        <section id="joint-guarantee-detail" class="content-section">
          <h2>4. 连带保证</h2>
          
          <h3>连带保证的特点</h3>
          <div class="joint-features">
            <p>连带保证也是保证的一种，但比普通保证对债权人更有利。</p>
            
            <div class="feature-comparison">
              <div class="comparison-item">
                <h4>普通保证</h4>
                <div class="feature-list">
                  <div class="feature">✅ 有催告抗辩权</div>
                  <div class="feature">✅ 有检索抗辩权</div>
                  <div class="feature">✅ 有分别利益</div>
                </div>
              </div>
              <div class="comparison-item">
                <h4>连带保证</h4>
                <div class="feature-list">
                  <div class="feature missing">❌ 无催告抗辩权</div>
                  <div class="feature missing">❌ 无检索抗辩权</div>
                  <div class="feature missing">❌ 无分别利益</div>
                </div>
              </div>
            </div>
          </div>

          <h3>无分别利益的含义</h3>
          <div class="no-benefit-explanation">
            <p>连带保证人即使有多个，每个保证人都对<strong>全部债务</strong>承担责任。</p>
            
            <div class="joint-example">
              <h4>案例：1000万债务，2名连带保证人</h4>
              <div class="calculation">
                <div class="calc-step">总债务：1000万円</div>
                <div class="calc-step">连带保证人数：2人</div>
                <div class="calc-step result">每人保证债务：1000万円（全额）</div>
              </div>
              
              <div class="diagram">
                <div class="creditor">债权人</div>
                <div class="debtor">主债务人<br>债务1000万</div>
                <div class="guarantors joint">
                  <div class="guarantor">连带保证人A<br>保证债务1000万</div>
                  <div class="guarantor">连带保证人B<br>保证债务1000万</div>
                </div>
              </div>
            </div>
          </div>

          <h3>绝对效与相对效</h3>
          <div class="effect-comparison">
            <div class="effect-item">
              <h4>普通保证</h4>
              <div class="effect-content">
                <p><strong>绝对效事由（影响主债务人）：</strong></p>
                <ul>
                  <li>弁济（清偿）</li>
                  <li>相杀（抵销）</li>
                </ul>
              </div>
            </div>
            <div class="effect-item">
              <h4>连带保证</h4>
              <div class="effect-content">
                <p><strong>绝对效事由（影响主债务人）：</strong></p>
                <ul>
                  <li>弁济（清偿）</li>
                  <li>相杀（抵销）</li>
                  <li>混同</li>
                  <li>更改</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 连带债务 -->
        <section id="joint-debt" class="content-section">
          <h2>5. 连带债务</h2>
          
          <h3>连带债务的概念</h3>
          <div class="joint-debt-concept">
            <p>多个债务人对同一债务各自承担<strong>全部履行责任</strong>的债务形态。</p>
            
            <div class="lunch-example">
              <h4>🍽️ 午餐案例</h4>
              <div class="example-scenario">
                <p>A、B、C三人一起吃饭，消费1500日元</p>
                <div class="scenario-details">
                  <div class="detail">• 店方可以向A、B、C中任何一人请求全额1500日元</div>
                  <div class="detail">• 如果A支付了1500日元，债务消灭</div>
                  <div class="detail">• A可以向B、C各求偿500日元</div>
                </div>
              </div>
            </div>
          </div>

          <h3>相对效原则</h3>
          <div class="relative-effect">
            <p>原则上，连带债务人中一人发生的事由<strong>不影响</strong>其他债务人。</p>
            
            <div class="effect-examples">
              <div class="example-item">
                <h4>债务免除</h4>
                <div class="example-content">
                  <p>债权人免除B的债务 → 只对B有效，A、C仍需承担全部债务</p>
                </div>
              </div>
              <div class="example-item">
                <h4>时效中断</h4>
                <div class="example-content">
                  <p>对B的时效中断 → 只对B有效，A、C的时效继续计算</p>
                </div>
              </div>
            </div>
          </div>

          <h3>绝对效例外</h3>
          <div class="absolute-effect">
            <p>以下4种情况，一人发生的事由对其他连带债务人也产生效力：</p>
            
            <div class="absolute-items">
              <div class="absolute-item">
                <div class="item-icon">💰</div>
                <div class="item-content">
                  <h4>弁济</h4>
                  <p>清偿、代物清偿、供托</p>
                </div>
              </div>
              <div class="absolute-item">
                <div class="item-icon">⚖️</div>
                <div class="item-content">
                  <h4>相杀</h4>
                  <p>债务抵销</p>
                </div>
              </div>
              <div class="absolute-item">
                <div class="item-icon">🔄</div>
                <div class="item-content">
                  <h4>更改</h4>
                  <p>契约内容变更</p>
                </div>
              </div>
              <div class="absolute-item">
                <div class="item-icon">👥</div>
                <div class="item-content">
                  <h4>混同</h4>
                  <p>债权人与债务人同一化</p>
                </div>
              </div>
            </div>
            
            <div class="memory-tip">
              <h4>💡 记忆口诀</h4>
              <p><strong>高 层 更 改 相 杀 弁 济 混 同</strong></p>
            </div>
          </div>
        </section>

        <!-- 求偿权 -->
        <section id="right-of-reimbursement" class="content-section">
          <h2>6. 求偿权</h2>
          
          <h3>保证人的求偿权</h3>
          <div class="reimbursement-basic">
            <p>保证人代为清偿债务后，有权向主债务人追偿。</p>
            
            <div class="reimbursement-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>保证人清偿</h4>
                  <p>保证人C向债权人A清偿1000万</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>债务消灭</h4>
                  <p>主债务人B对A的债务消灭</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>行使求偿权</h4>
                  <p>C向B求偿1000万</p>
                </div>
              </div>
            </div>
          </div>

          <h3>连带保证人间的求偿</h3>
          <div class="joint-reimbursement">
            <div class="joint-scenario">
              <h4>案例：连带保证人间的求偿</h4>
              <div class="scenario-details">
                <p>主债务：1000万，连带保证人：C、D</p>
                <div class="calculation">
                  <div class="calc-step">C清偿了1000万</div>
                  <div class="calc-step">C可以向主债务人B求偿：1000万</div>
                  <div class="calc-step">C可以向另一保证人D求偿：500万（负担部分）</div>
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
          <router-link to="/video?topic=guarantee" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=guarantee" class="action-button">
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
  { id: 'guarantee-properties', title: '保证债务性质', icon: '⚖️' },
  { id: 'joint-guarantee', title: '共同保证', icon: '👥' },
  { id: 'joint-guarantee-detail', title: '连带保证', icon: '🔗' },
  { id: 'joint-debt', title: '连带债务', icon: '💰' },
  { id: 'right-of-reimbursement', title: '求偿权', icon: '🔄' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '保証債務（ほしょうさいむ）',
    chinese: '保证债务',
    explanation: '当主债务人无法履行债务时，由保证人代为履行的债务',
    example: 'A向B借款，C作为保证人，当A无法还款时，C有义务代为偿还'
  },
  {
    japanese: '連帯保証（れんたいほしょう）',
    chinese: '连带保证',
    explanation: '保证人与主债务人承担连带责任的保证形式，无催告抗辩权和检索抗辩权',
    example: '连带保证人C在债权人请求时必须立即清偿，不能要求先向主债务人请求'
  },
  {
    japanese: '連帯債務（れんたいさいむ）',
    chinese: '连带债务',
    explanation: '多个债务人对同一债务各自承担全部履行责任的债务形态',
    example: 'A、B、C三人连带借款，债权人可以向其中任何一人请求全额还款'
  },
  {
    japanese: '付従性（ふじゅうせい）',
    chinese: '付从性',
    explanation: '保证债务以主债务的存在为前提，随主债务的变动而变动的性质',
    example: '主债务消灭时，保证债务也随之消灭'
  },
  {
    japanese: '求償権（きゅうしょうけん）',
    chinese: '求偿权',
    explanation: '保证人或连带债务人清偿债务后，向主债务人或其他人追偿的权利',
    example: '保证人C代为清偿后，可以向主债务人B求偿清偿金额'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '保証人となるべき者が、口頭で明確に特定の債務につき保証する旨の意思表示を債権者に対してすれば、その保証契約は有効に成立する。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '保证契约必须采用书面形式或电磁记录，口头保证契约无效。'
  },
  {
    question: 'AがBに1,000万円を貸し付け、Cが連帯保証人となった。この場合、Cは、Aからの請求に対して、自分は保証人だから、まず主たる債務者であるBに対して請求するよう主張することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '连带保证人没有催告抗辩权，不能要求债权人先向主债务人请求。'
  },
  {
    question: '連帯保証人が2人いる場合、連帯保証人間に連帯の特約がなくとも、連帯保証人は各自全額につき保証責任を負う。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '连带保证没有分别利益，即使有多个连带保证人，每个保证人都对全部债务承担责任。'
  },
  {
    question: '個人が根保証契約を締結する場合、負担の上限額を定めなければ、当該保証契約は無効となる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '个人签订根保证契约时必须设定上限额（极额度），否则契约无效。'
  },
  {
    question: '主たる債務者が債権者に対して債務を承認した場合、その効果は保証人にも及ぶ。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '基于保证债务的付从性，主债务人承认债务导致时效中断的效果及于保证人。'
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
  learningStore.recordTopicStudyTime('guarantee', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('guarantee')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('guarantee')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('guarantee', 0)
  
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
.guarantee-page {
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

.relationship-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.relationship-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.role {
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  text-align: center;
  min-width: 100px;
}

.arrow {
  color: #6c757d;
  font-weight: bold;
}

.note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  text-align: center;
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
  color: #333;
}

.timing-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 保证债务性质样式 ========= */
.property-explanation {
  margin-bottom: 2rem;
}

.property-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.case-item {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.case-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  font-size: 1rem;
}

.case-scenario {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.case-result {
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
  border-radius: 4px;
}

.accompaniment-explanation {
  margin: 2rem 0;
}

.transfer-diagram {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.transfer-step {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.step-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2a7960;
}

.step-entities {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.entity {
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.supplementary-explanation {
  margin: 2rem 0;
}

.rights-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.right-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.right-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.right-content p {
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.5rem;
}

.right-note {
  font-size: 0.875rem;
  color: #6c757d;
  line-height: 1.5;
}

/* ========= 共同保证样式 ========= */
.benefit-explanation {
  margin-bottom: 2rem;
}

.benefit-example {
  margin-top: 1.5rem;
}

.calculation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.calc-step {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.calc-step.result {
  background: #e7f7e7;
  color: #2e7d32;
  font-weight: bold;
}

.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.creditor, .debtor, .guarantor {
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  text-align: center;
  min-width: 120px;
}

.guarantors {
  display: flex;
  gap: 1rem;
}

.guarantors.joint .guarantor {
  background: #fff9e6;
  border-color: #ffcc00;
}

.root-guarantee {
  margin: 2rem 0;
}

.root-concept {
  margin-bottom: 1.5rem;
}

.root-concept h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.requirements-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.req-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.req-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.req-content strong {
  color: #1a472a;
}

.req-content p {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 连带保证样式 ========= */
.joint-features {
  margin-bottom: 2rem;
}

.feature-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.comparison-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature {
  padding: 0.5rem;
  background: #e7f7e7;
  border-radius: 4px;
  font-size: 0.875rem;
}

.feature.missing {
  background: #ffe7e7;
  color: #c62828;
}

.no-benefit-explanation {
  margin: 2rem 0;
}

.joint-example {
  margin-top: 1.5rem;
}

.effect-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.effect-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.effect-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.effect-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.effect-content li {
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

/* ========= 连带债务样式 ========= */
.joint-debt-concept {
  margin-bottom: 2rem;
}

.lunch-example {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.example-scenario p {
  font-weight: bold;
  margin-bottom: 1rem;
}

.scenario-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail {
  font-size: 0.875rem;
  padding-left: 1rem;
  position: relative;
}

.detail:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #2a7960;
}

.relative-effect {
  margin: 2rem 0;
}

.effect-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.example-item {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.example-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  font-size: 1rem;
}

.absolute-effect {
  margin: 2rem 0;
}

.absolute-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.absolute-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.item-icon {
  font-size: 2rem;
}

.absolute-item h4 {
  margin: 0;
  color: #1a472a;
}

.absolute-item p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.memory-tip {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  text-align: center;
  margin-top: 1.5rem;
}

.memory-tip h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.memory-tip p {
  margin: 0;
  font-weight: bold;
  font-size: 1.125rem;
  color: #e65100;
}

/* ========= 求偿权样式 ========= */
.reimbursement-basic {
  margin-bottom: 2rem;
}

.reimbursement-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.flow-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
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

.flow-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.joint-reimbursement {
  margin: 2rem 0;
}

.joint-scenario {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.joint-scenario h4 {
  margin: 0 0 1rem 0;
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
  
  .property-cases {
    grid-template-columns: 1fr;
  }
  
  .rights-comparison {
    grid-template-columns: 1fr;
  }
  
  .requirements-list {
    grid-template-columns: 1fr;
  }
  
  .feature-comparison {
    grid-template-columns: 1fr;
  }
  
  .effect-comparison {
    grid-template-columns: 1fr;
  }
  
  .absolute-items {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .reimbursement-flow {
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
  
  .absolute-items {
    grid-template-columns: 1fr;
  }
  
  .step-entities {
    flex-direction: column;
  }
  
  .guarantors {
    flex-direction: column;
  }
}
</style>