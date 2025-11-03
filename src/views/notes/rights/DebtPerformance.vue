<!-- src/views/notes/rights/DebtPerformance.vue -->
<template>
  <div class="debt-performance-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>债务不履行与弁济</span>
        </div>
        <h1>债务不履行与弁济</h1>
        <p>契约履行中的违约救济措施，包括损害赔偿、契约解除和清偿等法律制度</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">18</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50分钟</span>
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
            <li>理解债务不履行的基本概念和三种类型</li>
            <li>掌握损害赔偿请求与契约解除的要件和效果</li>
            <li>熟悉手付解除与债务不履行解除的区别</li>
            <li>了解弁济（清偿）的各种方式和要求</li>
            <li>能够区分不同情况下债务人的归责事由</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🔤 关键术语</h2>
          <div class="terms-grid">
            <div class="term-card">
              <div class="term-japanese">債務不履行（さいむふりこう）</div>
              <div class="term-chinese">债务不履行</div>
              <div class="term-explanation">债务人未能按照契约约定履行债务的违约行为</div>
              <div class="term-example">例如：约定4月1日交房，但卖方未能按时交付</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">履行遅滞（りこうちたい）</div>
              <div class="term-chinese">履行迟滞</div>
              <div class="term-explanation">债务人能够履行但未在约定期间内履行债务</div>
              <div class="term-example">例如：买方有钱但拖延支付购房款</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">履行不能（りこうふのう）</div>
              <div class="term-chinese">履行不能</div>
              <div class="term-explanation">因客观原因导致债务无法履行的状态</div>
              <div class="term-example">例如：买卖的房屋在交付前因火灾烧毁</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">手付解除（てづけかいじょ）</div>
              <div class="term-chinese">手付解除</div>
              <div class="term-explanation">通过放弃或加倍返还手付金来解除契约的制度</div>
              <div class="term-example">例如：买方放弃已付定金来解除购房契约</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">弁済（べんさい）</div>
              <div class="term-chinese">清偿</div>
              <div class="term-explanation">债务人按照契约内容履行债务的行为</div>
              <div class="term-example">例如：买方支付购房款，卖方交付房屋</div>
            </div>
          </div>
        </section>

        <!-- 债务不履行概述 -->
        <section id="debt-overview" class="content-section">
          <h2>1. 债务不履行概述</h2>
          
          <h3>什么是债务不履行</h3>
          <div class="concept-explanation">
            <p>债务不履行是指债务人未能按照契约约定履行债务的违约行为。简单来说就是"约好了但没做到"。</p>
            
            <div class="example-box">
              <h4>📝 生活案例</h4>
              <p>小明向小红借款10万元，约定3个月后归还。到期后小明以各种理由拖延不还，这就构成了债务不履行。</p>
            </div>
          </div>

          <h3>债务不履行的三种类型</h3>
          <div class="performance-types">
            <div class="type-item">
              <div class="type-icon">🚫</div>
              <div class="type-content">
                <h4>履行不能</h4>
                <p>客观上无法履行债务</p>
                <div class="type-example">
                  <strong>例子：</strong>买卖的房屋在交付前被烧毁，卖方无法交付
                </div>
              </div>
            </div>
            <div class="type-item">
              <div class="type-icon">⏰</div>
              <div class="type-content">
                <h4>履行迟滞</h4>
                <p>能够履行但未按时履行</p>
                <div class="type-example">
                  <strong>例子：</strong>买方有钱但拖延支付购房款
                </div>
              </div>
            </div>
            <div class="type-item">
              <div class="type-icon">⚠️</div>
              <div class="type-content">
                <h4>不完全履行</h4>
                <p>履行了但不符合约定要求</p>
                <div class="type-example">
                  <strong>例子：</strong>卖方交付了房屋但未办理所有权转移登记
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 归责事由与救济措施 -->
        <section id="remedies" class="content-section">
          <h2>2. 归责事由与救济措施</h2>
          
          <h3>归责事由的重要性</h3>
          <div class="attribution-explanation">
            <p>归责事由是指债务不履行是否可归责于债务人的故意或过失。这决定了债权人能否请求损害赔偿。</p>
            
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>情况</th>
                    <th>损害赔偿</th>
                    <th>契约解除</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>债务人有归责事由</td>
                    <td class="can-do">○ 可以请求</td>
                    <td class="can-do">○ 可以解除</td>
                  </tr>
                  <tr>
                    <td>债务人无归责事由<br>（债权人亦无归责事由）</td>
                    <td class="cannot-do">× 不可请求</td>
                    <td class="can-do">○ 可以解除</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>救济措施的选择</h3>
          <div class="remedy-options">
            <div class="remedy-item">
              <h4>🏠 损害赔偿请求</h4>
              <ul>
                <li><strong>要件：</strong>债务不履行 + 债务人归责事由</li>
                <li><strong>效果：</strong>填补债权人因债务不履行遭受的损失</li>
                <li><strong>特点：</strong>可以事先约定损害赔偿额（违约金属推定）</li>
              </ul>
            </div>
            <div class="remedy-item">
              <h4>🔓 契约解除</h4>
              <ul>
                <li><strong>要件：</strong>债务不履行（无需归责事由）</li>
                <li><strong>效果：</strong>契约溯及既往失效，恢复原状</li>
                <li><strong>限制：</strong>债务不履行轻微时不可解除</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 履行迟滞的具体规则 -->
        <section id="performance-delay" class="content-section">
          <h2>3. 履行迟滞的具体规则</h2>
          
          <h3>履行迟滞的开始时间</h3>
          <div class="delay-timing">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>债务类型</th>
                    <th>例子</th>
                    <th>履行迟滞开始时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>确定期限债务</strong></td>
                    <td>4月1日交付房屋</td>
                    <td>期限到来时（4月1日）</td>
                  </tr>
                  <tr>
                    <td><strong>不确定期限债务</strong></td>
                    <td>父亲死亡后交付房屋</td>
                    <td>期限到来后收到履行请求时，或知道期限到来时的较早者</td>
                  </tr>
                  <tr>
                    <td><strong>停止条件债务</strong></td>
                    <td>考试合格后交付房屋</td>
                    <td>债务人知道条件成就时</td>
                  </tr>
                  <tr>
                    <td><strong>无期限债务</strong></td>
                    <td>未约定交付时间</td>
                    <td>收到履行请求时</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>履行迟滞的解除程序</h3>
          <div class="cancellation-procedure">
            <div class="procedure-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>催告</h4>
                  <p>设定相当期间，催促对方履行债务</p>
                  <div class="step-example">"请在一周内支付购房款，否则解除契约"</div>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>等待期间</h4>
                  <p>给予债务人最后履行机会</p>
                  <div class="step-example">等待一周时间</div>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>解除</h4>
                  <p>期间届满仍未履行时解除契约</p>
                  <div class="step-example">发出解除通知，契约溯及既往失效</div>
                </div>
              </div>
            </div>
          </div>

          <div class="exception-note">
            <h4>💡 例外情况（无需催告即可解除）</h4>
            <ul>
              <li><strong>履行不能：</strong>债务完全无法履行时</li>
              <li><strong>拒绝履行：</strong>债务人明确表示不履行时</li>
              <li><strong>定期行为：</strong>特定日期前不履行就失去意义的契约</li>
            </ul>
          </div>
        </section>

        <!-- 手付解除制度 -->
        <section id="hand-money" class="content-section">
          <h2>4. 手付解除制度</h2>
          
          <h3>什么是手付（定金）</h3>
          <div class="hand-money-explanation">
            <p>手付是买卖契约缔结时，买方向卖方支付的定金，主要用于解约手付的功能。</p>
            
            <div class="money-flow">
              <div class="flow-item">
                <div class="flow-title">契约时</div>
                <div class="flow-amount">支付手付金600万</div>
                <div class="flow-desc">（总价6000万的10%）</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-item">
                <div class="flow-title">交付时</div>
                <div class="flow-amount">支付剩余款5400万</div>
                <div class="flow-desc">手付金转为价款的一部分</div>
              </div>
            </div>
          </div>

          <h3>手付解除的方法</h3>
          <div class="cancellation-methods">
            <div class="method buyer-method">
              <h4>👤 买方解除（手付放弃）</h4>
              <div class="method-detail">
                <div class="money-action">放弃已支付的手付金</div>
                <div class="method-example">支付了600万定金，放弃后损失600万解除契约</div>
              </div>
            </div>
            <div class="method seller-method">
              <h4>👥 卖方解除（手付倍返）</h4>
              <div class="method-detail">
                <div class="money-action">返还双倍手付金</div>
                <div class="method-example">收到600万定金，返还1200万解除契约</div>
              </div>
            </div>
          </div>

          <h3>手付解除的限制</h3>
          <div class="cancellation-limits">
            <div class="limit-rule">
              <div class="rule-icon">⏰</div>
              <div class="rule-content">
                <h4>履行着手前</h4>
                <p>必须在<strong>对方履行着手前</strong>行使手付解除权</p>
                <div class="rule-note">自己是否履行着手不影响解除权</div>
              </div>
            </div>
            <div class="limit-rule">
              <div class="rule-icon">💸</div>
              <div class="rule-content">
                <h4>损害赔偿不可</h4>
                <p>手付解除后<strong>不能请求损害赔偿</strong></p>
                <div class="rule-note">与债务不履行解除的重要区别</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 弁济（清偿）制度 -->
        <section id="performance" class="content-section">
          <h2>5. 弁济（清偿）制度</h2>
          
          <h3>什么是弁济</h3>
          <div class="performance-explanation">
            <p>弁济是指债务人按照契约内容履行债务，使债务关系消灭的行为。简单来说就是"还债"。</p>
            
            <div class="performance-examples">
              <div class="example-item">
                <div class="example-icon">💰</div>
                <div class="example-content">
                  <h5>金钱债务</h5>
                  <p>支付借款、货款等金钱</p>
                </div>
              </div>
              <div class="example-item">
                <div class="example-icon">🏠</div>
                <div class="example-content">
                  <h5>交付债务</h5>
                  <p>交付房屋、土地等物品</p>
                </div>
              </div>
              <div class="example-item">
                <div class="example-icon">📝</div>
                <div class="example-content">
                  <h5>登记债务</h5>
                  <p>办理所有权转移登记</p>
                </div>
              </div>
            </div>
          </div>

          <h3>弁济的提供</h3>
          <div class="performance-offer">
            <p>当债权人拒绝受领时，债务人可以通过"提供"来避免履行迟滞责任。</p>
            
            <div class="offer-types">
              <div class="offer-type">
                <h4>现实提供</h4>
                <p>原则上需要实际携带标的物前往提供</p>
                <div class="offer-example">携带现金前往债权人处准备支付</div>
              </div>
              <div class="offer-type">
                <h4>口头提供</h4>
                <p>债权人预先拒绝时，口头通知准备履行即可</p>
                <div class="offer-example">电话通知已准备好款项，请来领取</div>
              </div>
            </div>
          </div>

          <h3>代物弁济与供託</h3>
          <div class="special-performance">
            <div class="special-type">
              <h4>🥬 代物弁济</h4>
              <p>用其他给付代替原定给付来消灭债务</p>
              <div class="type-example">用蔬菜抵偿借款，需双方合意</div>
            </div>
            <div class="special-type">
              <h4>🏛️ 供託</h4>
              <p>债权人拒绝受领时，将标的物提存于供託所</p>
              <div class="type-example">将款项存入法务局指定的供託所</div>
            </div>
          </div>
        </section>

        <!-- 金钱债务的特则 -->
        <section id="money-debt" class="content-section">
          <h2>6. 金钱债务的特则</h2>
          
          <h3>金钱债务的严格性</h3>
          <div class="money-strictness">
            <p>金钱债务（如借款返还、货款支付）适用特别严格的规则。</p>
            
            <div class="strict-rules">
              <div class="rule-item">
                <div class="rule-icon">🚫</div>
                <div class="rule-content">
                  <h4>无履行不能</h4>
                  <p>金钱债务只有履行迟滞，没有履行不能</p>
                  <div class="rule-detail">可以说"晚点还"，但不能说"不还"</div>
                </div>
              </div>
              <div class="rule-item">
                <div class="rule-icon">⚡</div>
                <div class="rule-content">
                  <h4>无免责事由</h4>
                  <p>即使因不可抗力迟延，也要承担履行迟滞责任</p>
                  <div class="rule-detail">地震、战争也不是欠钱不还的理由</div>
                </div>
              </div>
              <div class="rule-item">
                <div class="rule-icon">📊</div>
                <div class="rule-content">
                  <h4>无立证责任</h4>
                  <p>债权人无需证明损害额，只需证明履行迟滞事实</p>
                  <div class="rule-detail">损害额原则上为法定利息（年3%）</div>
                </div>
              </div>
            </div>
          </div>

          <h3>损害赔偿额的计算</h3>
          <div class="damage-calculation">
            <div class="calculation-example">
              <div class="example-title">借款返还迟延案例</div>
              <div class="example-details">
                <div class="detail-item">
                  <span class="detail-label">借款金额：</span>
                  <span class="detail-value">100万元</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">约定返还日：</span>
                  <span class="detail-value">2023年1月1日</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">实际返还日：</span>
                  <span class="detail-value">2024年1月1日</span>
                </div>
                <div class="detail-item highlight">
                  <span class="detail-label">迟延损害赔偿：</span>
                  <span class="detail-value">100万 × 3% = 3万元</span>
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
          <router-link to="/video?topic=debt-performance" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=debt" class="action-button">
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
  { id: 'debt-overview', title: '债务不履行概述', icon: '📖' },
  { id: 'remedies', title: '救济措施', icon: '⚖️' },
  { id: 'performance-delay', title: '履行迟滞', icon: '⏰' },
  { id: 'hand-money', title: '手付解除', icon: '💸' },
  { id: 'performance', title: '弁济制度', icon: '🔄' },
  { id: 'money-debt', title: '金钱债务', icon: '💰' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 练习题数据
const quizzes = [
  {
    question: '債務不履行による契約の解除には、債務者に帰責事由があることが必要である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '债务不履行的契约解除不需要债务人的归责事由，但损害赔偿请求需要归责事由。'
  },
  {
    question: '手付解除をした場合、別途損害賠償を請求することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '手付解除后不能另行请求损害赔偿，这是与债务不履行解除的重要区别。'
  },
  {
    question: '金銭債務の履行遅滞については、債務者に帰責事由がなくても、損害賠償を請求することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '金钱债务的履行迟滞即使债务人无归责事由，也要承担损害赔偿责任，这是金钱债务的特则。'
  },
  {
    question: '売主は、買主が履行に着手していても、自らが履行に着手する前であれば、手付金の倍額を返還することによって契約を解除することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '手付解除必须在对方履行着手前行使，如果买主已经履行着手，卖主就不能手付解除了。'
  },
  {
    question: '損害賠償額の予定をした場合、実際の損害額が予定額より大きいことを証明しても、予定額を超えて請求することはできない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '损害赔偿额的预定具有确定效力，无论实际损害额多少，都按预定额请求，不能增减。'
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
  learningStore.recordTopicStudyTime('debt-performance', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('debt-performance')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('debt-performance')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('debt-performance', 0)
  
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
.debt-performance-page {
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

/* ========= 债务不履行概述样式 ========= */
.performance-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.type-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.type-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.type-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.type-content p {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
}

.type-example {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
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

/* ========= 归责事由与救济措施样式 ========= */
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

.can-do {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.cannot-do {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.remedy-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.remedy-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.remedy-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remedy-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.remedy-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 履行迟滞样式 ========= */
.delay-timing {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.delay-timing table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.delay-timing th, .delay-timing td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.delay-timing th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.delay-timing tr:nth-child(even) {
  background-color: #f8f9fa;
}

.cancellation-procedure {
  margin: 2rem 0;
}

.procedure-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.step {
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
  margin: 0 0 0.5rem 0;
  color: #6c757d;
}

.step-example {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

.exception-note {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border: 1px solid #ffcc00;
  margin-top: 1.5rem;
}

.exception-note h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exception-note ul {
  padding-left: 1.25rem;
  margin: 0;
}

.exception-note li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 手付解除样式 ========= */
.hand-money-explanation {
  margin-bottom: 2rem;
}

.money-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.flow-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  min-width: 150px;
}

.flow-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.flow-amount {
  font-size: 1.125rem;
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.25rem;
}

.flow-desc {
  font-size: 0.875rem;
  color: #6c757d;
}

.flow-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.cancellation-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.method {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.method h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.method-detail {
  text-align: center;
}

.money-action {
  font-size: 1.125rem;
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.5rem;
}

.method-example {
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
}

.cancellation-limits {
  margin: 2rem 0;
}

.limit-rule {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.rule-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.rule-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rule-content p {
  margin: 0 0 0.5rem 0;
}

.rule-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

/* ========= 弁济制度样式 ========= */
.performance-examples {
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

.offer-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.offer-type {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.offer-type h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.offer-type p {
  margin: 0 0 0.5rem 0;
}

.offer-example {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

.special-performance {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.special-type {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.special-type h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.special-type p {
  margin: 0 0 0.5rem 0;
}

.type-example {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

/* ========= 金钱债务样式 ========= */
.strict-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rule-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.rule-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rule-content p {
  margin: 0 0 0.5rem 0;
}

.rule-detail {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

.damage-calculation {
  margin: 2rem 0;
}

.calculation-example {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.example-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a472a;
}

.example-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-label {
  font-weight: 500;
}

.detail-value {
  font-weight: bold;
}

.highlight {
  background: #e7f7e7 !important;
  color: #2e7d32;
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
  
  .performance-types {
    grid-template-columns: 1fr;
  }
  
  .remedy-options {
    grid-template-columns: 1fr;
  }
  
  .procedure-steps {
    grid-template-columns: 1fr;
  }
  
  .money-flow {
    flex-direction: column;
  }
  
  .cancellation-methods {
    grid-template-columns: 1fr;
  }
  
  .performance-examples {
    grid-template-columns: 1fr;
  }
  
  .offer-types {
    grid-template-columns: 1fr;
  }
  
  .special-performance {
    grid-template-columns: 1fr;
  }
  
  .strict-rules {
    grid-template-columns: 1fr;
  }
  
  .example-details {
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