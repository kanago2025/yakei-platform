<!-- src/views/notes/yefa/BusinessMeaning.vue -->
<template>
  <div class="business-meaning">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>宅建业的含义</span>
        </div>
        <h1>宅建业的含义</h1>
        <p>宅建士考试基础知识点，理解宅建业定义和免许制度的入门章节</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">15</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">30分钟</span>
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
          <h2>📚 学习目标</h2>
          <ul>
            <li>理解宅建业法的立法目的和消费者保护理念</li>
            <li>掌握宅建业的四大判断要素</li>
            <li>能够区分需要免许和不需要免许的情况</li>
            <li>熟悉近年法改正对实务操作的影响</li>
            <li>了解免许不需要的特殊情况</li>
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

        <!-- 宅建业法概述 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 宅建业法概述</h2>
          <p><strong>宅建业法</strong>是日本规范不动产交易的核心法律，旨在保护消费者权益，确保交易公正透明。</p>
          
          <div class="case-scenario">
            <strong>实务背景：</strong>
            不动产交易涉及巨额资金且信息复杂，普通消费者在专业知识上处于弱势。宅建业法通过设立专门规则，防止欺诈、虚假宣传等不当行为，保障交易安全。
          </div>
          
          <div class="highlight-box">
            <strong>立法目的：</strong>
            <ul>
              <li><strong>保护消费者</strong>：弥补消费者专业知识不足</li>
              <li><strong>确保交易安全</strong>：防止重大误解和交易风险</li>
              <li><strong>规范市场秩序</strong>：建立诚信的不动产交易体系</li>
            </ul>
          </div>
        </section>

        <!-- 宅建业的四大要素 -->
        <section id="four-elements" class="content-section">
          <h2>2. 宅建业的四大判断要素</h2>
          <p>判断一个行为是否属于宅建业，需要同时满足以下四个条件：</p>

          <div class="elements-diagram">
            <div class="element-item">
              <div class="element-number">①</div>
              <div class="element-content">
                <h3>宅地或建物</h3>
                <p>涉及宅地或建筑物的交易</p>
              </div>
            </div>
            <div class="element-connector">+</div>
            <div class="element-item">
              <div class="element-number">②</div>
              <div class="element-content">
                <h3>取引行为</h3>
                <p>属于法定的交易行为</p>
              </div>
            </div>
            <div class="element-connector">+</div>
            <div class="element-item">
              <div class="element-number">③</div>
              <div class="element-content">
                <h3>业务性质</h3>
                <p>具有反复持续的特征</p>
              </div>
            </div>
            <div class="element-connector">=</div>
            <div class="element-result">
              <div class="result-text">需要免许</div>
            </div>
          </div>

          <div class="highlight-box">
            <strong>记忆口诀：</strong>
            "有地有房 + 在做交易 + 反复持续 = 需要执照"
          </div>
        </section>

        <!-- 要素一：宅地 -->
        <section id="element-land" class="content-section">
          <h2>3. 要素一：宅地（3种情形）</h2>
          
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>具体内容</th>
                  <th>典型案例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>现有建筑物土地</strong></td>
                  <td>现在有建筑物建在上面的土地</td>
                  <td>带房屋的土地、公寓用地</td>
                </tr>
                <tr>
                  <td><strong>建设目的土地</strong></td>
                  <td>以建造建筑物为目的进行交易的土地</td>
                  <td>空地但计划建住宅出售</td>
                </tr>
                <tr>
                  <td><strong>用途地域内土地</strong></td>
                  <td>城市规划中用途区域内的土地</td>
                  <td>市街化区域内的土地</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="case-scenario">
            <strong>特别注意：</strong>
            <ul>
              <li>与登记簿上的"地目"无关（即使登记为"山林"，实际用作宅地就按宅地处理）</li>
              <li>用途地域内的<strong>公园、道路、河川等公共设施用地除外</strong></li>
              <li>用途地域外的原野，如作为原野交易，不属于宅地</li>
            </ul>
          </div>
        </section>

        <!-- 要素二：建物 -->
        <section id="element-building" class="content-section">
          <h2>4. 要素二：建物</h2>
          
          <h3>基本定义</h3>
          <p>有屋顶、柱子、墙壁的建筑物</p>
          
          <h3>包含范围</h3>
          <ul>
            <li><strong>整栋建筑物</strong>：独栋住宅、公寓、仓库、商业大楼</li>
            <li><strong>建筑物的一部分</strong>：公寓的一个房间、办公室的一间</li>
          </ul>

          <div class="highlight-box">
            <strong>记忆技巧：</strong>
            符合"家徒四壁"的基本特征——有墙、有柱、有顶。临时搭建的帐篷明显不属于建物。
          </div>
        </section>

        <!-- 要素三：取引 -->
        <section id="element-transaction" class="content-section">
          <h2>5. 要素三：取引（8种行为）</h2>
          
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>行为类型</th>
                  <th>自己作为当事人</th>
                  <th>代理他人</th>
                  <th>媒介(居间)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>买卖</strong></td>
                  <td class="required">属于取引</td>
                  <td class="required">属于取引</td>
                  <td class="required">属于取引</td>
                </tr>
                <tr>
                  <td><strong>交换</strong></td>
                  <td class="required">属于取引</td>
                  <td class="required">属于取引</td>
                  <td class="required">属于取引</td>
                </tr>
                <tr>
                  <td><strong>贷借(租赁)</strong></td>
                  <td class="not-required">不属于取引</td>
                  <td class="required">属于取引</td>
                  <td class="required">属于取引</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>重要区别</h3>
          <ul>
            <li><strong>自ら貸借</strong>：自己作为房东出租房产 → <strong class="not-required">不属于取引</strong></li>
            <li><strong>代理貸借</strong>：代理房东出租房产 → <strong class="required">属于取引</strong></li>
            <li><strong>媒介貸借</strong>：为租客和房东牵线 → <strong class="required">属于取引</strong></li>
          </ul>

          <div class="case-scenario">
            <strong>实务案例：</strong>
            宅建业者A公司，自己拥有一套房子，A公司自己作为房东把这套房子租了出去。问：这个行为属于取引吗？需要记载到账簿里吗？<br>
            <strong>答案：</strong>属于<strong>自ら貸借</strong>，不属于取引，没有记载义务。
          </div>
        </section>

        <!-- 要素四：业 -->
        <section id="element-business" class="content-section">
          <h2>6. 要素四：业（业务性质）</h2>
          
          <h3>两个核心特征</h3>
          <ol>
            <li><strong>不特定多数</strong>：交易对象不固定、不限定</li>
            <li><strong>反復継続</strong>：行为具有重复性、持续性</li>
  </ol>

          <h3>判断实例</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>案例</th>
                  <th>是否属于"业"</th>
                  <th>判断理由</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>将土地分成10块，分别卖给多个朋友</td>
                  <td class="required">属于</td>
                  <td>交易对象为朋友的朋友，满足不特定多数；分块出售满足反复持续</td>
                </tr>
                <tr>
                  <td>一次性出售唯一的自住房产</td>
                  <td class="not-required">不属于</td>
                  <td>一次性交易，不具备反复持续性</td>
                </tr>
                <tr>
                  <td>将10套房子分10次卖，但只卖给公司同事</td>
                  <td class="not-required">不属于</td>
                  <td>虽然交易反复持续，但交易对象特定</td>
                </tr>
                <tr>
                  <td>代理他人反复买卖土地</td>
                  <td class="required">属于</td>
                  <td>代理人和本人都需要免许（代理人行为效果归属于本人）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 免许不需要的情况 -->
        <section id="exemptions" class="content-section">
          <h2>7. 免许不需要的特殊情况</h2>
          
          <h3>国・地方公共団体</h3>
          <ul>
            <li><strong>完全豁免</strong>：免许不需要，且宅建业法规则基本不适用</li>
            <li><strong>例子</strong>：县政府出售公有土地</li>
          </ul>
          
          <h3>信託会社・信託銀行</h3>
          <ul>
            <li><strong>部分豁免</strong>：免许不需要，但<strong>其他宅建业法规则仍需遵守</strong></li>
            <li><strong>需要</strong>：向国土交通大臣进行届出（备案）</li>
          </ul>

          <div class="highlight-box">
            <strong>重要区别：</strong>
            <ul>
              <li><strong>国・地方公共団体</strong>：完全不需要遵守宅建业法</li>
              <li><strong>信託会社・信託銀行</strong>：只是免许不需要，其他规则都要遵守</li>
            </ul>
          </div>
        </section>

        <!-- 近年法改正 -->
        <section id="legal-updates" class="content-section">
          <h2>8. 近年法改正要点</h2>
          
          <h3>2022年数字化改革</h3>
          <ul>
            <li>重要事项说明书可电子交付</li>
            <li>契约书盖章非强制</li>
          </ul>
          
          <h3>2024-2025年实务简化</h3>
          <ul>
            <li>国土交通大臣许可申请流程简化</li>
            <li>从业者名簿记载项目简化</li>
            <li>宅建业者名簿记载项目简化</li>
          </ul>

          <div class="case-scenario">
            <strong>实务影响：</strong>
            这些改革体现了宅建业管理的现代化趋势，简化了行政手续，适应了数字化交易的需求。
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
            <button class="answer-btn" @click="toggleAnswer(index)">
              {{ showAnswerIndex === index ? '隐藏答案' : '显示答案' }}
            </button>
            <div 
              v-if="showAnswerIndex === index" 
              class="answer-explanation"
            >
              <strong>答案：</strong> {{ getCorrectAnswer(quiz) }}<br>
              <strong>中文解释：</strong> {{ quiz.explanation }}
            </div>
          </div>

          <div class="quiz-actions">
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
          <router-link to="/video?topic=business-meaning" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=business-meaning" class="action-button">
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
  { id: 'basic-concepts', title: '概述', icon: '📝' },
  { id: 'four-elements', title: '四大要素', icon: '🎯' },
  { id: 'element-land', title: '要素一：宅地', icon: '🏞️' },
  { id: 'element-building', title: '要素二：建物', icon: '🏢' },
  { id: 'element-transaction', title: '要素三：取引', icon: '💰' },
  { id: 'element-business', title: '要素四：业', icon: '📊' },
  { id: 'exemptions', title: '免许例外', icon: '🔄' },
  { id: 'legal-updates', title: '法改正', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '宅地建物取引業法（たくちたてものとりひきぎょうほう）',
    chinese: '宅地建筑物交易业法',
    explanation: '规范不动产中介业务的专门法律，核心目的是保护消费者权益',
    example: '就像房产交易的"交通规则"，确保交易安全有序'
  },
  {
    japanese: '免許（めんきょ）',
    chinese: '许可/执照',
    explanation: '从事宅建业的法定资格，类似中国的营业执照',
    example: '无免许从事宅建业属于违法，将受处罚'
  },
  {
    japanese: '媒介・代理（ばいかい・だいり）',
    chinese: '居间与代理',
    explanation: '宅建业的两种核心业务形态',
    example: '中介撮合买卖属于"媒介"，代客户签约属于"代理"'
  },
  {
    japanese: '自ら貸借（みずからたいしゃく）',
    chinese: '自行租赁',
    explanation: '自己作为房东出租房产的行为',
    example: '房东直接出租自己的房子给租客，不属于宅建业法定义的"取引"'
  },
  {
    japanese: '用途地域（ようとちいき）',
    chinese: '用途区域',
    explanation: '城市规划中规定的土地使用功能分区',
    example: '市街化区域、工业专用区域等都属于用途地域'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業とは、宅地又は建物の取引を業として行うことをいう。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '这是宅建业的法定定义，必须同时满足"宅地或建物"+"取引"+"业"三个要素。'
  },
  {
    question: '個人が自己居住用の住宅を一度だけ売却する場合、宅建業の免許が必要である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '一次性出售自住房产不具备"业务"的反复持续性特征，不需要免许。'
  },
  {
    question: '信託会社が宅建業を行う場合、免許は不要であるが、その他の宅建業法の規定は適用される。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '信託公司只是免许不需要，但其他宅建业法规则仍需遵守。'
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
  learningStore.recordTopicStudyTime('business_meaning', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('business_meaning')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('business_meaning')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('business_meaning', 0)
  
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
.business-meaning {
  min-height: 100vh;
  background-color: var(--bg);
}

.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 2rem;
  margin: 1rem 0 2rem;
  text-align: center;
}

.breadcrumb {
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 1rem;
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
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
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 2rem 0;
}

/* ========= 快速导航 ========= */
.quick-nav {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.quick-nav h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
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
  background: var(--bg);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
}

.nav-link:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.125rem;
}

/* ========= 学习目标 ========= */
.learning-goals {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.learning-goals h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
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
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.term-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary);
}

.term-japanese {
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.term-chinese {
  font-weight: bold;
  color: var(--text);
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
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border);
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
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

/* ========= 四大要素图示 ========= */
.elements-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.element-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--primary-light);
  border-radius: var(--radius);
  min-width: 150px;
}

.element-number {
  background: var(--primary);
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.element-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.element-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--muted);
}

.element-connector {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

.element-result {
  padding: 1rem;
  background: var(--primary);
  color: white;
  border-radius: var(--radius);
  font-weight: bold;
}

/* ========= 案例和重点盒子 ========= */
.case-scenario {
  background: #f0f7ff;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid var(--primary);
  line-height: 1.6;
}

.highlight-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  line-height: 1.6;
}

.highlight-box strong {
  color: #92400e;
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
  border: 1px solid var(--border);
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: var(--primary);
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

.comparison-table .required {
  color: #28a745;
  font-weight: bold;
  text-align: center;
}

.comparison-table .not-required {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
}

/* ========= 练习题样式 ========= */
.quiz-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.quiz-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.quiz-item {
  background: #f9f9f9;
  border-radius: var(--radius);
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
  border-color: var(--primary);
  background: var(--primary-light);
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

.answer-btn {
  background: var(--primary);
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
  background: var(--primary-dark);
}

.answer-explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 5px;
  line-height: 1.6;
}

.quiz-actions {
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
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* ========= 底部行动按钮 ========= */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  text-decoration: none;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, var(--primary-dark), #164536);
}

.action-button.video {
  background: linear-gradient(135deg, #2a7960, #205e4a);
}

.action-button.video:hover {
  background: linear-gradient(135deg, #205e4a, #164536);
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
  
  .elements-diagram {
    flex-direction: column;
  }
  
  .element-connector {
    transform: rotate(90deg);
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
  
  .quiz-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>