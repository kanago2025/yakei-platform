<!-- src/views/notes/rights/AssignmentOfClaim.vue -->
<template>
  <div class="assignment-of-claim-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>债权让渡</span>
        </div>
        <h1>债权让渡</h1>
        <p>日本民法中的债权让渡制度，涉及让渡要件、二重让渡处理、限制特约效力及债务人抗辩权等重要内容</p>
        
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
            <li>理解债权让渡的基本概念和法律性质</li>
            <li>掌握债权让渡的对抗要件和效力</li>
            <li>熟悉二重让渡的处理规则和优先顺序</li>
            <li>了解债权让渡限制特约的法律效果</li>
            <li>掌握债务人在债权让渡中的抗辩权</li>
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
          <h2>1. 债权让渡的基本概念</h2>
          
          <h3>债权让渡的定义</h3>
          <div class="concept-explanation">
            <p>债权让渡是指债权人将其对债务人的债权转让给第三人的法律行为。债权作为财产权的一种，原则上可以自由让渡。</p>
            
            <div class="example-box">
              <h4>📝 重要特征</h4>
              <ul>
                <li>债权让渡不需要债务人同意</li>
                <li>包括已经发生的债权和将来可能发生的债权</li>
                <li>让渡可以是无偿也可以是有偿</li>
                <li>即使有禁止让渡特约，让渡行为原则上仍然有效</li>
              </ul>
            </div>
          </div>

          <h3>债权让渡中的角色</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">👤</div>
              <div class="timing-content">
                <h4>让渡人</h4>
                <p>原债权人，将债权转让给他人的人</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">👥</div>
              <div class="timing-content">
                <h4>让受人</h4>
                <p>新债权人，接受债权转让的人</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💼</div>
              <div class="timing-content">
                <h4>债务人</h4>
                <p>需要向新债权人履行债务的人</p>
              </div>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="case-study">
            <div class="case-item">
              <h4>案例：A将对B的借款债权让渡给C</h4>
              <div class="case-steps">
                <div class="step">A（原债权人）对B（债务人）有1000万借款债权</div>
                <div class="step">A将该债权让渡给C（新债权人）</div>
                <div class="step">B需要向C偿还1000万借款</div>
                <div class="step">A需要通知B债权已让渡给C</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 对抗要件 -->
        <section id="requirements" class="content-section">
          <h2>2. 债权让渡的对抗要件</h2>
          
          <h3>对抗要件的必要性</h3>
          <div class="requirements-explanation">
            <p>为了让债权让渡能够对抗债务人和其他第三人，必须满足法定的对抗要件，防止债务人重复清偿。</p>
            
            <div class="example-box warning">
              <h4>⚠️ 没有对抗要件的风险</h4>
              <p>如果没有完成对抗要件，债务人向原债权人清偿仍为有效，新债权人无法要求债务人重新清偿。</p>
            </div>
          </div>

          <h3>对抗债务人的要件</h3>
          <div class="requirements-options">
            <div class="option-item">
              <div class="option-icon">📢</div>
              <div class="option-content">
                <h4>让渡人通知</h4>
                <p><strong>让渡人向债务人发出债权让渡通知</strong></p>
                <p>口头或书面形式均可</p>
                <div class="option-note">原则上必须由让渡人亲自通知，代理人通知也有效</div>
              </div>
            </div>
            <div class="option-item">
              <div class="option-icon">✍️</div>
              <div class="option-content">
                <h4>债务人承诺</h4>
                <p><strong>债务人对债权让渡作出承诺</strong></p>
                <p>明确表示接受债权让渡的事实</p>
                <div class="option-note">承诺可以是明示或默示的</div>
              </div>
            </div>
          </div>

          <h3>通知的形式要求</h3>
          <div class="notification-forms">
            <div class="form-item">
              <h4>普通通知</h4>
              <ul>
                <li>口头通知有效</li>
                <li>书面通知更佳</li>
                <li>没有确定日付要求</li>
              </ul>
            </div>
            <div class="form-item">
              <h4>确定日付通知</h4>
              <ul>
                <li>内容证明邮件</li>
                <li>公证证书</li>
                <li>用于二重让渡时的优先权确定</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 二重让渡 -->
        <section id="double-assignment" class="content-section">
          <h2>3. 二重让渡的处理规则</h2>
          
          <h3>二重让渡的概念</h3>
          <div class="double-assignment-concept">
            <p>同一债权被多次让渡给不同受让人的情况。日本民法允许二重让渡，通过明确的规则确定优先顺序。</p>
            
            <div class="example-box">
              <h4>📝 二重让渡场景</h4>
              <p>A将对B的1000万债权先让渡给C，后又让渡给D。当还款期限到来时，C和D谁有权要求B还款？</p>
            </div>
          </div>

          <h3>优先顺序规则</h3>
          <div class="priority-rules">
            <div class="rule-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>第一步：看确定日付证书</h4>
                <p>首先比较谁有确定日付的证书通知</p>
                <div class="step-note">有确定日付证书者优先</div>
              </div>
            </div>
            <div class="rule-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>第二步：看到达时间</h4>
                <p>如果都有确定日付证书，比较证书到达债务人的时间</p>
                <div class="step-note">先到达者优先</div>
              </div>
            </div>
            <div class="rule-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>第三步：确定日付不重要</h4>
                <p>确定日付的先后不重要，重要的是到达时间</p>
                <div class="step-note warning">注意：不是看确定日付的日期！</div>
              </div>
            </div>
          </div>

          <h3>实际案例解析</h3>
          <div class="case-analysis">
            <div class="analysis-item">
              <h4>案例：A将债权二重让渡给C和D</h4>
              <div class="analysis-details">
                <div class="detail-row">
                  <div class="detail-label">C的通知：</div>
                  <div class="detail-value">确定日付6月1日，6月4日到达债务人B</div>
                </div>
                <div class="detail-row">
                  <div class="detail-label">D的通知：</div>
                  <div class="detail-value">确定日付6月2日，6月3日到达债务人B</div>
                </div>
                <div class="detail-row result">
                  <div class="detail-label">结果：</div>
                  <div class="detail-value"><strong>D优先</strong>（虽然确定日付较晚，但先到达）</div>
                </div>
              </div>
            </div>
          </div>

          <h3>特殊情况处理</h3>
          <div class="special-cases">
            <div class="case-item">
              <h4>同时到达的情况</h4>
              <p>如果C和D的带确定日付的债权让渡通知证书同时到达债务人B，此时C和D都具备对抗要件，债务人B可以向任何一方清偿。</p>
            </div>
          </div>
        </section>

        <!-- 让渡限制特约 -->
        <section id="restriction-clause" class="content-section">
          <h2>4. 债权让渡限制特约</h2>
          
          <h3>限制特约的效力</h3>
          <div class="clause-effectiveness">
            <p>即使债权人与债务人有禁止让渡的特约，让渡行为原则上仍然有效，但对恶意或重大过失的让受人有特殊规则。</p>
            
            <div class="example-box">
              <h4>📝 立法目的</h4>
              <p>为了保护善意第三人，如果让渡无效，不知道限制特约而购买债权的让受人将遭受损失。</p>
            </div>
          </div>

          <h3>对恶意或重大过失让受人的限制</h3>
          <div class="restriction-rules">
            <div class="restriction-item">
              <div class="restriction-icon">🚫</div>
              <div class="restriction-content">
                <h4>债务人可以拒绝履行</h4>
                <p><strong>让受人知道或应当知道限制特约</strong></p>
                <p>债务人可以向恶意或重大过失的让受人拒绝履行债务</p>
              </div>
            </div>
            <div class="restriction-item">
              <div class="restriction-icon">💰</div>
              <div class="restriction-content">
                <h4>向原债权人清偿有效</h4>
                <p><strong>债务人向原债权人清偿可以对抗让受人</strong></p>
                <p>即使债权已让渡，债务人向原债权人清偿仍为有效</p>
              </div>
            </div>
          </div>

          <h3>实务应用要点</h3>
          <div class="practical-tips">
            <div class="tip-item">
              <h4>让受人的尽职调查</h4>
              <p>在受让债权前，应调查是否存在让渡限制特约，避免被认定为恶意或重大过失。</p>
            </div>
            <div class="tip-item">
              <h4>债务人的保护</h4>
              <p>债务人应在合同中明确记载让渡限制条款，并在债权让渡发生时及时主张权利。</p>
            </div>
          </div>
        </section>

        <!-- 债务人抗辩权 -->
        <section id="debtor-defense" class="content-section">
          <h2>5. 债务人的抗辩权</h2>
          
          <h3>抗辩权的法律基础</h3>
          <div class="defense-basis">
            <p>债权让渡不应损害债务人的既得权利，债务人可以基于让渡前发生的事由对抗新的债权人。</p>
          </div>

          <h3>主要的抗辩事由</h3>
          <div class="defense-reasons">
            <div class="reason-item">
              <div class="reason-icon">⚖️</div>
              <div class="reason-content">
                <h4>通知前的抗辩事由</h4>
                <p>债务人可以基于通知或承诺前已发生的抗辩事由对抗让受人</p>
                <div class="reason-example">
                  <strong>案例：</strong>B已向A偿还300万，A仍按1000万让渡给C，B可以主张债权只剩700万
                </div>
              </div>
            </div>
            <div class="reason-item">
              <div class="reason-icon">🔄</div>
              <div class="reason-content">
                <h4>抵销权</h4>
                <p>债务人对原债权人的债权可以抵销被让渡的债权</p>
                <div class="reason-example">
                  <strong>案例：</strong>B对A有1000万债权，可以抵销A让渡给C的1000万债权
                </div>
              </div>
            </div>
            <div class="reason-item">
              <div class="reason-icon">✅</div>
              <div class="reason-content">
                <h4>已向原债权人清偿</h4>
                <p>在具备对抗要件前，债务人向原债权人清偿有效</p>
                <div class="reason-example">
                  <strong>案例：</strong>B在收到让渡通知前已向A清偿，对C不承担清偿责任
                </div>
              </div>
            </div>
          </div>

          <h3>抵销权的行使条件</h3>
          <div class="setoff-conditions">
            <div class="condition-item">
              <h4>时间要求</h4>
              <p>必须在让受人具备对抗要件之前主张抵销</p>
            </div>
            <div class="condition-item">
              <h4>债权要求</h4>
              <p>抵销的债权必须在让渡前已经存在</p>
            </div>
            <div class="condition-item">
              <h4>清偿期要求</h4>
              <p>抵销的债权必须已到清偿期</p>
            </div>
          </div>
        </section>

        <!-- 实务要点 -->
        <section id="practical-points" class="content-section">
          <h2>6. 实务要点总结</h2>
          
          <h3>债权让渡的操作流程</h3>
          <div class="operation-flow">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>签订让渡合同</h4>
                <p>让渡人与让受人签订债权让渡合同</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>准备通知文件</h4>
                <p>准备内容证明邮件等确定日付证书</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>通知债务人</h4>
                <p>及时向债务人发出债权让渡通知</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>保存证据</h4>
                <p>妥善保存通知和承诺的相关证据</p>
              </div>
            </div>
          </div>

          <h3>风险防范措施</h3>
          <div class="risk-prevention">
            <div class="prevention-item">
              <h4>🔍 尽职调查</h4>
              <ul>
                <li>调查债权是否存在限制特约</li>
                <li>确认债权是否已被让渡</li>
                <li>核实债务人的清偿能力</li>
              </ul>
            </div>
            <div class="prevention-item">
              <h4>📄 文件管理</h4>
              <ul>
                <li>使用内容证明邮件进行通知</li>
                <li>保存确定日付证书原件</li>
                <li>记录通知到达时间</li>
              </ul>
            </div>
            <div class="prevention-item">
              <h4>⚖️ 法律确认</h4>
              <ul>
                <li>确认让渡合同的合法性</li>
                <li>审查债务人的抗辩事由</li>
                <li>评估二重让渡的风险</li>
              </ul>
            </div>
          </div>

          <h3>常见问题解答</h3>
          <div class="faq-section">
            <div class="faq-item">
              <h4>Q: 债权让渡需要债务人同意吗？</h4>
              <p>A: 不需要债务人同意，但需要通知债务人或获得债务人承诺才能对抗债务人。</p>
            </div>
            <div class="faq-item">
              <h4>Q: 禁止让渡特约的效力如何？</h4>
              <p>A: 即使有禁止让渡特约，让渡行为仍然有效，但对恶意或重大过失的让受人，债务人可以拒绝履行。</p>
            </div>
            <div class="faq-item">
              <h4>Q: 二重让渡时如何确定优先权？</h4>
              <p>A: 首先看谁有确定日付证书，如果都有则看谁的证书先到达债务人，确定日付的日期不重要。</p>
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
          <router-link to="/video?topic=assignment-of-claim" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=assignment-of-claim" class="action-button">
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
  { id: 'requirements', title: '对抗要件', icon: '⚖️' },
  { id: 'double-assignment', title: '二重让渡', icon: '🔄' },
  { id: 'restriction-clause', title: '限制特约', icon: '🚫' },
  { id: 'debtor-defense', title: '债务人抗辩', icon: '🛡️' },
  { id: 'practical-points', title: '实务要点', icon: '💼' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '債権譲渡（さいけんじょうと）',
    chinese: '债权让渡',
    explanation: '将债权从原债权人（让渡人）转移给新债权人（让受人）的法律行为',
    example: 'A将对B的1000万借款债权让渡给C'
  },
  {
    japanese: '対抗要件（たいこうようけん）',
    chinese: '对抗要件',
    explanation: '债权让渡要对抗债务人和其他第三人必须满足的法定条件',
    example: '让渡人对债务人的通知或债务人的承诺'
  },
  {
    japanese: '確定日付（かくていひづけ）',
    chinese: '确定日期',
    explanation: '公证人证明的不可更改的日期，用于确定法律行为的先后顺序',
    example: '内容证明邮件、公证证书上的日期'
  },
  {
    japanese: '二重譲渡（にじゅうじょうと）',
    chinese: '二重让渡',
    explanation: '同一债权被多次让渡给不同受让人的情况',
    example: 'A将债权先让渡给C，后又让渡给D'
  },
  {
    japanese: '相殺権（そうさいけん）',
    chinese: '抵销权',
    explanation: '债务人可以用自己对原债权人的债权抵销被让渡的债权',
    example: 'B对A有1000万债权，可以抵销A让渡给C的债权'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '債権の譲渡は、当事者間に譲渡禁止の特約がある場合には、無効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '即使有让渡禁止特约，让渡行为仍然有效，但恶意或重大过失的让受人，债务人可以拒绝履行。'
  },
  {
    question: '債権の二重譲渡が行われた場合、確定日付のある証書による通知の先後によって優先順位が決まる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '二重让渡时，优先顺序由通知到达债务人的先后决定，而不是确定日付的先后。'
  },
  {
    question: '債務者は、譲渡の通知又は承諾前に生じた事由に基づいて、譲受人に対して抗弁をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '债务人可以基于通知或承诺前发生的事由对抗新的债权人。'
  },
  {
    question: '債権譲渡の对抗要件は、書面による通知又は承諾でなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '债权让渡的对抗要件，口头形式的通知或承诺也可以。'
  },
  {
    question: '債権の譲渡制限特約があることを知らずに債権を譲り受けた譲受人は、常に債務者に対して債権の履行を請求できる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '如果让受人有重大过失而不知道限制特约，债务人也可以拒绝履行。'
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
  learningStore.recordTopicStudyTime('assignment-of-claim', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('assignment-of-claim')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('assignment-of-claim')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('assignment-of-claim', 0)
  
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
.assignment-of-claim-page {
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

.example-box.warning {
  background: #fff9e6;
  border-left: 4px solid #ffcc00;
}

.example-box h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.effect-timing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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

.case-study {
  margin: 2rem 0;
}

.case-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.case-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step {
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* ========= 对抗要件样式 ========= */
.requirements-explanation {
  margin-bottom: 2rem;
}

.requirements-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.option-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.option-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.option-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.option-content p {
  margin: 0.25rem 0;
}

.option-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.notification-forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.form-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.form-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.form-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.form-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 二重让渡样式 ========= */
.double-assignment-concept {
  margin-bottom: 2rem;
}

.priority-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rule-step {
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

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-content p {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.step-note {
  padding: 0.5rem;
  background: #e9f7f0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #2a7960;
  font-weight: bold;
}

.step-note.warning {
  background: #fff9e6;
  color: #e65100;
}

.case-analysis {
  margin: 2rem 0;
}

.analysis-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.analysis-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.analysis-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-label {
  font-weight: bold;
  min-width: 100px;
}

.detail-value {
  flex: 1;
}

.detail-row.result {
  padding-top: 0.75rem;
  border-top: 1px solid #e9ecef;
}

.special-cases {
  margin: 2rem 0;
}

.case-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.case-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 让渡限制特约样式 ========= */
.clause-effectiveness {
  margin-bottom: 2rem;
}

.restriction-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.restriction-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.restriction-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.restriction-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.restriction-content p {
  margin: 0.25rem 0;
}

.practical-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tip-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.tip-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tip-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.tip-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 债务人抗辩权样式 ========= */
.defense-basis {
  margin-bottom: 2rem;
}

.defense-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.reason-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.reason-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.reason-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.reason-content p {
  margin: 0.25rem 0;
}

.reason-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

.setoff-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.condition-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.condition-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.condition-item p {
  margin: 0;
}

/* ========= 实务要点样式 ========= */
.operation-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.flow-step .step-number {
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

.flow-step p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.risk-prevention {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.prevention-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.prevention-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prevention-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.prevention-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.faq-section {
  margin: 2rem 0;
}

.faq-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.faq-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.faq-item p {
  margin: 0;
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
  
  .requirements-options {
    grid-template-columns: 1fr;
  }
  
  .priority-rules {
    grid-template-columns: 1fr;
  }
  
  .restriction-rules {
    grid-template-columns: 1fr;
  }
  
  .defense-reasons {
    grid-template-columns: 1fr;
  }
  
  .operation-flow {
    grid-template-columns: 1fr;
  }
  
  .risk-prevention {
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