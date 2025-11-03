<!-- src/views/notes/rights/AdjacentRelations.vue -->
<template>
  <div class="adjacent-relations-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>相邻关系</span>
        </div>
        <h1>相邻关系（相隣関係）</h1>
        <p>土地所有者之间因土地利用而产生的权利义务关系，包括邻地使用权、通行权、竹木处理等重要的日常生活法律问题</p>
        
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
            <li>理解相邻关系的法律概念和基本原则</li>
            <li>掌握邻地使用权的行使条件和限制</li>
            <li>熟悉土地通行权的适用条件和义务</li>
            <li>了解竹木枝根越界的处理规则</li>
            <li>掌握目隠し义务的适用范围</li>
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
          <h2>1. 相邻关系基本概念</h2>
          
          <h3>相邻关系的定义</h3>
          <div class="concept-explanation">
            <p>相邻关系是指相邻土地所有者之间，在各自行使所有权时，因土地利用的相互影响而产生的权利义务关系。其核心目的是平衡相邻各方的利益，实现土地资源的合理利用。</p>
            
            <div class="example-box">
              <h4>📝 现实意义</h4>
              <p>相邻关系是日常生活中最常见的法律问题之一，涉及围墙修建、树木修剪、通行权利等方方面面，理解这些规则有助于和谐邻里关系。</p>
            </div>
          </div>

          <h3>基本原则</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🤝</div>
              <div class="timing-content">
                <h4>相互尊重原则</h4>
                <p>尊重邻地的合法权益，不得滥用权利</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">⚖️</div>
              <div class="timing-content">
                <h4>最小损害原则</h4>
                <p>选择对邻地损害最小的方式行使权利</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>合理补偿原则</h4>
                <p>造成损害时应给予合理的经济补偿</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 邻地使用权 -->
        <section id="neighbor-use-right" class="content-section">
          <h2>2. 邻地使用权</h2>
          
          <h3>使用条件</h3>
          <div class="use-conditions">
            <p>土地所有者可以在以下必要情况下请求使用邻地：</p>
            
            <div class="conditions-list">
              <div class="condition-item">
                <div class="condition-icon">🏗️</div>
                <div class="condition-content">
                  <h4>建筑工程</h4>
                  <p>在边界附近修筑、拆除、修缮墙壁或建筑物</p>
                </div>
              </div>
              <div class="condition-item">
                <div class="condition-icon">📐</div>
                <div class="condition-content">
                  <h4>测量调查</h4>
                  <p>进行边界标的调查或边界相关测量</p>
                </div>
              </div>
              <div class="condition-item">
                <div class="condition-icon">🌳</div>
                <div class="condition-content">
                  <h4>树木修剪</h4>
                  <p>修剪越境树枝等目的</p>
                </div>
              </div>
            </div>
          </div>

          <h3>使用限制</h3>
          <div class="use-limitations">
            <div class="limitation-item">
              <h4>🚪 居住建筑物</h4>
              <p>必须获得居住者的承诺才能进入</p>
            </div>
            <div class="limitation-item">
              <h4>📢 通知义务</h4>
              <p>必须事先通知邻地所有者和使用者</p>
            </div>
            <div class="limitation-item">
              <h4>🔍 方法选择</h4>
              <p>必须选择对邻地损害最小的方法</p>
            </div>
          </div>

          <h3>特殊情况处理</h3>
          <div class="special-cases">
            <div class="case-item">
              <h4>紧急情况</h4>
              <p>如事前通知困难，可在使用后及时通知</p>
            </div>
            <div class="case-item">
              <h4>损害补偿</h4>
              <p>因使用造成损害时必须支付赔偿金</p>
            </div>
          </div>
        </section>

        <!-- 土地通行权 -->
        <section id="land-passage-right" class="content-section">
          <h2>3. 土地通行权</h2>
          
          <h3>通行权成立条件</h3>
          <div class="passage-conditions">
            <p>当土地被其他土地包围而无通路至公共道路时，该土地所有者有权通过周围土地到达公共道路。</p>
            
            <div class="condition-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>完全包围</h4>
                  <p>土地完全被其他土地包围</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>无其他通路</h4>
                  <p>无其他通路至公共道路</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>必须通过</h4>
                  <p>必须通过邻地才能到达公共道路</p>
                </div>
              </div>
            </div>
          </div>

          <h3>通行方式限制</h3>
          <div class="passage-limitations">
            <div class="limitation-item">
              <h4>🛣️ 路径选择</h4>
              <p>必须选择损害最小的路径和方法</p>
            </div>
            <div class="limitation-item">
              <h4>💴 偿金支付</h4>
              <p>通行权人必须向邻地所有者支付偿金</p>
            </div>
            <div class="limitation-item">
              <h4>⚠️ 例外情况</h4>
              <p>因土地分割造成的袋地，只能通过分割后的其他土地通行</p>
            </div>
          </div>

          <h3>实际案例</h3>
          <div class="case-example">
            <div class="example-box">
              <h4>📝 袋地通行案例</h4>
              <p>A的土地被B、C、D三块土地完全包围，无法直接通往公共道路。A可以选择对B、C、D中损害最小的土地（比如距离公共道路最近、对邻地影响最小的路径）行使通行权，但需要向该邻地所有者支付相应的偿金。</p>
            </div>
          </div>
        </section>

        <!-- 竹木枝根处理 -->
        <section id="tree-branch-root" class="content-section">
          <h2>4. 竹木枝根处理规则</h2>
          
          <h3>越境树枝的处理</h3>
          <div class="branch-handling">
            <div class="handling-methods">
              <div class="method-item">
                <div class="method-icon">📋</div>
                <div class="method-content">
                  <h4>基本原则</h4>
                  <p>不能自行修剪，应要求竹木所有者修剪</p>
                </div>
              </div>
              <div class="method-item">
                <div class="method-icon">⏰</div>
                <div class="method-content">
                  <h4>催告后修剪</h4>
                  <p>催告后在合理期间内未修剪的，可自行修剪</p>
                </div>
              </div>
              <div class="method-item">
                <div class="method-icon">❓</div>
                <div class="method-content">
                  <h4>所有者不明</h4>
                  <p>竹木所有者不明或所在地不明的，可自行修剪</p>
                </div>
              </div>
            </div>
          </div>

          <h3>越境树根的处理</h3>
          <div class="root-handling">
            <div class="handling-difference">
              <div class="difference-item">
                <h4>🌱 自行切除权</h4>
                <p>邻地竹木的根越境时，可自行切除</p>
              </div>
              <div class="difference-item">
                <h4>🚫 无需催告</h4>
                <p>与树枝不同，切除树根无需事先催告</p>
              </div>
            </div>
            
            <div class="example-box">
              <h4>📝 重要区别</h4>
              <p>树枝和树根的处理规则不同：树枝原则上不能自行修剪（需催告），而树根可以立即自行切除。这是因为树根在地下生长，对土地利用的影响更为直接和严重。</p>
            </div>
          </div>
        </section>

        <!-- 目隠し义务 -->
        <section id="privacy-obligation" class="content-section">
          <h2>5. 目隠し义务</h2>
          
          <h3>适用范围</h3>
          <div class="obligation-scope">
            <p>在距离边界线1米以内的位置设置能够俯瞰他人宅地的窗户或阳台时，必须设置目隠し（遮挡设施）。</p>
            
            <div class="scope-details">
              <div class="detail-item">
                <h4>📏 距离要求</h4>
                <p>距离边界：1米以内</p>
              </div>
              <div class="detail-item">
                <h4>🏠 设施类型</h4>
                <p>窗户、阳台等可俯瞰的设施</p>
              </div>
              <div class="detail-item">
                <h4>📍 对象土地</h4>
                <p>他人的宅地（居住用地）</p>
              </div>
            </div>
          </div>

          <h3>法律目的</h3>
          <div class="legal-purpose">
            <div class="purpose-explanation">
              <h4>保护隐私权</h4>
              <p>保护邻地的隐私权，防止因近距离设置窗户等设施而侵害邻地的居住安宁。</p>
              <p>这一规定体现了法律对个人生活空间和隐私的尊重，是现代都市生活中重要的相邻关系规则。</p>
            </div>
          </div>

          <h3>实务应用</h3>
          <div class="practical-application">
            <div class="application-item">
              <h4>新建建筑</h4>
              <p>新建房屋时必须在设计阶段就考虑目隠し义务</p>
            </div>
            <div class="application-item">
              <h4>改造工程</h4>
              <p>改造现有建筑时如涉及边界附近开窗，必须设置遮挡</p>
            </div>
            <div class="application-item">
              <h4>遮挡方式</h4>
              <p>可采用磨砂玻璃、百叶窗、固定遮挡板等方式</p>
            </div>
          </div>
        </section>

        <!-- ライフライン设备权 -->
        <section id="lifeline-equipment" class="content-section">
          <h2>6. ライフライン设备权</h2>
          
          <h3>设备设置权</h3>
          <div class="equipment-rights">
            <div class="right-item">
              <div class="right-icon">⚡</div>
              <div class="right-content">
                <h4>必要范围内</h4>
                <p>在必要范围内，可以在他人土地上设置电气、水道、煤气等管道设备</p>
              </div>
            </div>
          </div>

          <h3>设备使用权</h3>
          <div class="equipment-usage">
            <div class="usage-item">
              <div class="usage-icon">🔧</div>
              <div class="usage-content">
                <h4>使用权利</h4>
                <p>在必要范围内，可以使用他人所有的设备</p>
              </div>
            </div>
          </div>

          <h3>设置程序要求</h3>
          <div class="setup-requirements">
            <div class="requirement-item">
              <h4>🔍 方法选择</h4>
              <p>必须选择损害最小的方法</p>
            </div>
            <div class="requirement-item">
              <h4>📢 通知义务</h4>
              <p>必须提前通知土地所有者</p>
            </div>
            <div class="requirement-item">
              <h4>⚖️ 特殊情况</h4>
              <p>事前通知困难时，必须在法院指定场所公告或在官报登载</p>
            </div>
            <div class="requirement-item">
              <h4>💰 损害补偿</h4>
              <p>造成损害时必须支付赔偿金</p>
            </div>
          </div>
        </section>

        <!-- 实务注意事项 -->
        <section id="practical-notes" class="content-section">
          <h2>7. 实务注意事项</h2>
          
          <h3>权利行使顺序</h3>
          <div class="exercise-order">
            <div class="order-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>事先协商</h4>
                  <p>事先与邻地所有者协商</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>书面通知</h4>
                  <p>书面通知并说明使用目的和期间</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>方法选择</h4>
                  <p>选择对邻地影响最小的方法</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>支付补偿</h4>
                  <p>及时支付相关补偿金</p>
                </div>
              </div>
            </div>
          </div>

          <h3>纠纷预防措施</h3>
          <div class="dispute-prevention">
            <div class="prevention-item">
              <h4>📏 明确边界</h4>
              <p>明确边界线位置，避免争议</p>
            </div>
            <div class="prevention-item">
              <h4>📝 书面协议</h4>
              <p>事先签订书面协议，明确权利义务</p>
            </div>
            <div class="prevention-item">
              <h4>📸 保留证据</h4>
              <p>保留相关证据材料，拍照存档</p>
            </div>
            <div class="prevention-item">
              <h4>👨‍💼 专业协助</h4>
              <p>寻求专业人士协助，避免法律风险</p>
            </div>
          </div>

          <h3>常见问题处理</h3>
          <div class="common-issues">
            <div class="issue-item">
              <h4>🚨 紧急情况</h4>
              <p>可先行使权利后补办手续，但需及时通知</p>
            </div>
            <div class="issue-item">
              <h4>❌ 邻地拒绝</h4>
              <p>在符合法定条件时，即使邻地拒绝也可依法行使权利</p>
            </div>
            <div class="issue-item">
              <h4>💵 补偿标准</h4>
              <p>参照市场价格或实际损失确定补偿金额</p>
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
          <router-link to="/video?topic=adjacent-relations" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=adjacent-relations" class="action-button">
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
  { id: 'neighbor-use-right', title: '邻地使用权', icon: '🏗️' },
  { id: 'land-passage-right', title: '土地通行权', icon: '🛣️' },
  { id: 'tree-branch-root', title: '竹木处理', icon: '🌳' },
  { id: 'privacy-obligation', title: '目隠し义务', icon: '🚪' },
  { id: 'lifeline-equipment', title: '设备权', icon: '⚡' },
  { id: 'practical-notes', title: '实务注意', icon: '💼' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '相隣関係（そうりんかんけい）',
    chinese: '相邻关系',
    explanation: '相邻土地所有者之间因土地利用而产生的权利义务关系',
    example: '邻居之间关于围墙修建、树木修剪的权利义务'
  },
  {
    japanese: '隣地使用権（りんちしようけん）',
    chinese: '邻地使用权',
    explanation: '为进行必要的工程或测量而使用邻地的权利',
    example: '为修缮自家围墙而临时使用邻居土地'
  },
  {
    japanese: '土地の通行権（とちのつうこうけん）',
    chinese: '土地通行权',
    explanation: '被其他土地包围而无通路至公共道路时，通过周围土地的权利',
    example: '袋地所有者通过邻地到达公共道路'
  },
  {
    japanese: '竹木の枝と根（ちくぼくのえだとね）',
    chinese: '竹木的枝和根',
    explanation: '邻地竹木枝根越界时的处理规则',
    example: '邻居树木枝条伸入自家院落时的修剪权利'
  },
  {
    japanese: '目隠し（めかくし）',
    chinese: '遮挡设施',
    explanation: '在边界附近设置窗户或阳台时必须安装的遮挡设施',
    example: '距离边界1米内设置窗户时需要安装窗帘或遮挡板'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '土地の所有者は、隣地から木の根が境界線を越えて伸びてきたときは、自らこれを切断できる。（2004-7-4）',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '邻地竹木的根越境时，土地所有者可以自行切除，无需事先催告。'
  },
  {
    question: '複数の筆の他の土地に囲まれて公道に通じない土地の所有者は、公道に至るため、その土地を囲んでいる他の土地を自由に選んで通行することができる。（2009-4-2）',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '袋地所有者必须选择对邻地损害最小的路径通行，不能自由选择任意路径。'
  },
  {
    question: '隣地使用権を行使する場合、住家であっても、居住者の承諾がなくても立ち入ることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '使用邻地时，如涉及居住建筑物，必须获得居住者的承诺才能进入。'
  },
  {
    question: '境界線より１ｍ未満の距離で他人の宅地を見渡せる窓を設けるときには、目隠しをつけなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '距离边界1米以内设置可俯瞰他人宅地的窗户时，必须设置遮挡设施。'
  },
  {
    question: '隣地の竹木の枝が境界線を越えた場合、直ちに自ら切除することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '原则上应要求竹木所有者切除，只有在催告后未切除或所有者不明等特殊情况下才能自行切除。'
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
  learningStore.recordTopicStudyTime('adjacent-relations', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('adjacent-relations')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('adjacent-relations')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('adjacent-relations', 0)
  
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
.adjacent-relations-page {
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

/* ========= 邻地使用权样式 ========= */
.use-conditions {
  margin-bottom: 2rem;
}

.conditions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.condition-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.condition-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.condition-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.condition-content p {
  margin: 0;
  color: #6c757d;
}

.use-limitations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.limitation-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.limitation-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.special-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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

/* ========= 土地通行权样式 ========= */
.passage-conditions {
  margin-bottom: 2rem;
}

.condition-flow {
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

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.passage-limitations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.case-example {
  margin: 2rem 0;
}

/* ========= 竹木处理样式 ========= */
.branch-handling {
  margin-bottom: 2rem;
}

.handling-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.method-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.method-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.method-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.method-content p {
  margin: 0;
  color: #6c757d;
}

.root-handling {
  margin: 2rem 0;
}

.handling-difference {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.difference-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.difference-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 目隠し义务样式 ========= */
.obligation-scope {
  margin-bottom: 2rem;
}

.scope-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.detail-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.detail-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.legal-purpose {
  margin: 2rem 0;
}

.purpose-explanation {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.purpose-explanation h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.practical-application {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.application-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.application-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 设备权样式 ========= */
.equipment-rights {
  margin-bottom: 2rem;
}

.right-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.right-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.right-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.right-content p {
  margin: 0;
  color: #6c757d;
}

.equipment-usage {
  margin: 2rem 0;
}

.usage-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.usage-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.usage-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.usage-content p {
  margin: 0;
  color: #6c757d;
}

.setup-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
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
}

/* ========= 实务注意事项样式 ========= */
.exercise-order {
  margin-bottom: 2rem;
}

.order-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
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
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-content p {
  margin: 0;
  color: #6c757d;
}

.dispute-prevention {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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
}

.common-issues {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.issue-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.issue-item h4 {
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
  
  .conditions-list {
    grid-template-columns: 1fr;
  }
  
  .use-limitations {
    grid-template-columns: 1fr;
  }
  
  .special-cases {
    grid-template-columns: 1fr;
  }
  
  .condition-flow {
    grid-template-columns: 1fr;
  }
  
  .passage-limitations {
    grid-template-columns: 1fr;
  }
  
  .handling-methods {
    grid-template-columns: 1fr;
  }
  
  .handling-difference {
    grid-template-columns: 1fr;
  }
  
  .scope-details {
    grid-template-columns: 1fr;
  }
  
  .practical-application {
    grid-template-columns: 1fr;
  }
  
  .setup-requirements {
    grid-template-columns: 1fr;
  }
  
  .order-steps {
    grid-template-columns: 1fr;
  }
  
  .dispute-prevention {
    grid-template-columns: 1fr;
  }
  
  .common-issues {
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