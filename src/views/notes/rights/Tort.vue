<!-- src/views/notes/rights/Tort.vue -->
<template>
  <div class="tort-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>不法行为</span>
        </div>
        <h1>不法行为（侵权行为）</h1>
        <p>日本民法中的不法行为制度，涉及一般不法行为、特殊不法行为、损害赔偿请求权时效、过失相杀等重要内容</p>
        
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
            <li>理解不法行为的基本概念和成立要件</li>
            <li>掌握一般不法行为与特殊不法行为的区别</li>
            <li>熟悉使用者责任、共同不法行为、工作物责任的具体适用</li>
            <li>了解不法行为损害赔偿请求权的时效规定</li>
            <li>掌握过失相杀在实务中的运用</li>
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
          <h2>1. 不法行为的基本概念</h2>
          
          <h3>不法行为的定义</h3>
          <div class="concept-explanation">
            <p>不法行为是指因故意或过失实施的违法行为，给他人造成损害的行为。</p>
            
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>正当防卫、紧急避险不属于不法行为。无责任能力的未成年人或精神障碍者不承担不法行为责任。</p>
            </div>
          </div>

          <h3>成立要件</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🎯</div>
              <div class="timing-content">
                <h4>故意或过失</h4>
                <p>主观上存在过错</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">⚖️</div>
              <div class="timing-content">
                <h4>违法行为</h4>
                <p>行为具有违法性</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💸</div>
              <div class="timing-content">
                <h4>损害发生</h4>
                <p>造成实际损害</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">🔗</div>
              <div class="timing-content">
                <h4>因果关系</h4>
                <p>行为与损害有因果关系</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 一般不法行为 -->
        <section id="general-tort" class="content-section">
          <h2>2. 一般不法行为</h2>
          
          <h3>定义与举例</h3>
          <div class="general-tort-explanation">
            <p>一般不法行为是典型的侵权行为，如交通事故、人身伤害等。</p>
            
            <div class="case-examples">
              <div class="case-item">
                <h4>🚗 交通事故案例</h4>
                <p>A开车不注意撞伤行人B，A因过失造成B受伤，构成一般不法行为。</p>
              </div>
              <div class="case-item">
                <h4>💔 人身伤害案例</h4>
                <p>C故意殴打D致其受伤，C因故意造成D损害，构成一般不法行为。</p>
              </div>
            </div>
          </div>

          <h3>损害赔偿特点</h3>
          <div class="compensation-features">
            <div class="feature-item">
              <h4>履行迟滞</h4>
              <p>损害发生同时即陷入履行迟滞，<strong>无需催告</strong></p>
            </div>
            <div class="feature-item">
              <h4>赔偿范围</h4>
              <p>包括财产损害和<strong>精神损害（慰谢料）</strong></p>
            </div>
            <div class="feature-item">
              <h4>继承性</h4>
              <p>即使被害人立即死亡，慰谢料请求权仍发生并可继承</p>
            </div>
          </div>
        </section>

        <!-- 特殊不法行为 -->
        <section id="special-tort" class="content-section">
          <h2>3. 特殊不法行为</h2>
          
          <h3>使用者责任</h3>
          <div class="employer-liability">
            <p>当员工在工作中造成他人损害时，雇主需承担赔偿责任。</p>
            
            <div class="liability-scenario">
              <h4>🏢 使用场景</h4>
              <p>公司A的员工B开着公司的车送货途中撞伤路人C。</p>
              <div class="responsibility-flow">
                <div class="flow-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>被害人C的权利</h4>
                    <p>可向使用者A和加害人B请求损害赔偿</p>
                  </div>
                </div>
                <div class="flow-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>外观判断原则</h4>
                    <p>即使是私用公司车辆，但外观上像执行职务时也可能成立</p>
                  </div>
                </div>
                <div class="flow-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>求偿限制</h4>
                    <p>雇主只能在<strong>信义原则范围内</strong>向员工求偿</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>共同不法行为</h3>
          <div class="joint-tort">
            <p>数人共同造成损害时，承担连带责任。</p>
            
            <div class="joint-scenario">
              <h4>👥 共同行为案例</h4>
              <p>A和B合伙殴打C，造成C受伤。A和B构成共同不法行为。</p>
              
              <div class="liability-details">
                <div class="detail-item">
                  <h4>连带责任</h4>
                  <p>被害人C可向A或B任一加害人请求<strong>全额赔偿</strong></p>
                </div>
                <div class="detail-item">
                  <h4>内部求偿</h4>
                  <p>加害人之间可按过失比例相互求偿</p>
                </div>
              </div>
            </div>
          </div>

          <h3>工作物责任</h3>
          <div class="structure-liability">
            <p>因建筑物等缺陷造成损害时的责任。</p>
            
            <div class="responsibility-hierarchy">
              <div class="hierarchy-item">
                <div class="hierarchy-level">一次责任人</div>
                <div class="hierarchy-content">
                  <h4>占有者</h4>
                  <p>采取必要措施可免责</p>
                </div>
              </div>
              <div class="hierarchy-item">
                <div class="hierarchy-level">二次责任人</div>
                <div class="hierarchy-content">
                  <h4>所有者</h4>
                  <p>承担<strong>无过失责任</strong>，没有例外</p>
                </div>
              </div>
            </div>
            
            <div class="structure-scenario">
              <h4>🏗️ 工作物责任案例</h4>
              <p>甲建筑物的墙壁因施工缺陷倒塌，砸伤路人B。</p>
              <ul>
                <li>占有者A若已采取必要防护措施，可免责</li>
                <li>所有者B承担无过失责任，必须赔偿</li>
                <li>B赔偿后可向施工方D求偿</li>
              </ul>
            </div>
          </div>

          <h3>注文者责任</h3>
          <div class="orderer-liability">
            <p>在承包关系中，原则上注文者不承担承包人的不法行为责任。</p>
            
            <div class="exception-case">
              <h4>🚧 例外情况</h4>
              <p>如果注文内容或指示有过失，注文者需承担责任。</p>
              <div class="example-box">
                <p><strong>案例：</strong>请负人在建房子过程中，因注文者A的不当指示导致砖头掉落砸伤路人，A需承担不法行为责任。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 损害赔偿请求权 -->
        <section id="compensation-claim" class="content-section">
          <h2>4. 损害赔偿请求权</h2>
          
          <h3>时效规定</h3>
          <div class="statute-limitations">
            <div class="limitation-item">
              <div class="limitation-type">主观时效</div>
              <div class="limitation-content">
                <h4>自知时起算</h4>
                <p>被害者知道损害及加害者时开始计算</p>
              </div>
              <div class="limitation-period">
                <span class="period-general">一般：3年</span>
                <span class="period-special">人身损害：5年</span>
              </div>
            </div>
            <div class="limitation-item">
              <div class="limitation-type">客观时效</div>
              <div class="limitation-content">
                <h4>自行为时起算</h4>
                <p>不法行为发生时开始计算</p>
              </div>
              <div class="limitation-period">
                <span class="period-absolute">一律：20年</span>
              </div>
            </div>
          </div>

          <h3>履行迟滞特点</h3>
          <div class="default-features">
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>比较项目</th>
                    <th>债务不履行</th>
                    <th>不法行为</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>履行迟滞开始</strong></td>
                    <td>债权者请求时</td>
                    <td class="highlight">损害发生时</td>
                  </tr>
                  <tr>
                    <td><strong>是否需要催告</strong></td>
                    <td>需要</td>
                    <td class="highlight">不需要</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="feature-note">
              <p>⚠️ <strong>注意：</strong>不法行为对被害者的保护更充分，损害发生即产生履行迟滞效果。</p>
            </div>
          </div>
        </section>

        <!-- 过失相杀 -->
        <section id="contributory-negligence" class="content-section">
          <h2>5. 过失相杀</h2>
          
          <h3>概念与适用</h3>
          <div class="negligence-concept">
            <p>当被害人也有过失时，可相应减轻加害人的赔偿责任。</p>
            
            <div class="negligence-comparison">
              <div class="comparison-item">
                <h4>债务不履行</h4>
                <p><strong>必须考虑</strong>被害者的过失</p>
              </div>
              <div class="comparison-item">
                <h4>不法行为</h4>
                <p><strong>可以考虑</strong>被害者的过失（任意性）</p>
              </div>
            </div>
          </div>

          <h3>特殊限制</h3>
          <div class="negligence-limits">
            <div class="limit-case">
              <h4>🚫 加害人不能主张的情况</h4>
              <ul>
                <li><strong>恶意的不法行为</strong></li>
                <li><strong>人身损害</strong></li>
              </ul>
              <div class="example-box">
                <p><strong>案例：</strong>A欠B钱不还，B恶意砸坏A的车窗。B不能主张修车费与借款抵消，但A可以主张。</p>
              </div>
            </div>
            <div class="limit-case">
              <h4>✅ 被害人可以主张的情况</h4>
              <p>在上述限制情况下，<strong>被害人仍然可以主张过失相杀</strong>。</p>
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
          <router-link to="/video?topic=tort" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=tort" class="action-button">
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
  { id: 'general-tort', title: '一般不法行为', icon: '⚖️' },
  { id: 'special-tort', title: '特殊不法行为', icon: '🏢' },
  { id: 'compensation-claim', title: '损害赔偿', icon: '💸' },
  { id: 'contributory-negligence', title: '过失相杀', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '不法行為（ふほうこうい）',
    chinese: '不法行为',
    explanation: '因故意或过失实施的违法行为，给他人造成损害的行为',
    example: '开车不注意撞伤行人'
  },
  {
    japanese: '使用者責任（しようしゃせきにん）',
    chinese: '使用者责任',
    explanation: '雇主对员工在工作中的不法行为承担的责任',
    example: '公司员工送货途中撞伤人，公司需承担责任'
  },
  {
    japanese: '共同不法行為（きょうどうふほうこうい）',
    chinese: '共同不法行为',
    explanation: '数人共同实施的不法行为，承担连带责任',
    example: '两人合伙殴打他人'
  },
  {
    japanese: '工作物責任（こうさくぶつせきにん）',
    chinese: '工作物责任',
    explanation: '因建筑物等缺陷造成损害时的责任',
    example: '墙壁倒塌砸伤路人'
  },
  {
    japanese: '慰謝料（いしゃりょう）',
    chinese: '精神损害赔偿',
    explanation: '对精神痛苦的经济补偿',
    example: '因名誉受损获得的精神抚慰金'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '故意又は過失によって他人に損害を与える行為は、すべて不法行為として扱われる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '正当防卫、紧急避险等违法性阻却事由不构成不法行为。'
  },
  {
    question: '使用者は、被用者の業務上の不法行為によって生じた損害について、被用者に対して全額の求償をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '使用者只能在信义原则范围内求偿，不能全额求偿。'
  },
  {
    question: '不法行為による損害賠償請求権は、損害及び加害者を知った時から5年間行使しないと時効により消滅する。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '一般情况是3年，只有人身损害才是5年。'
  },
  {
    question: '工作物の占有者は、損害発生防止に必要な措置を講じていた場合、工作物責任を免れることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '占有者采取必要措施可免责，但所有者仍需承担无过失责任。'
  },
  {
    question: '共同不法行為において、被害者は加害者全員に対して損害の全額を請求することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '共同不法行为人承担连带责任，被害人可向任一加害人请求全额赔偿。'
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
  learningStore.recordTopicStudyTime('tort', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('tort')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('tort')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('tort', 0)
  
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
.tort-page {
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
  text-align: center;
}

.timing-icon {
  font-size: 2rem;
  flex-shrink: 0;
  margin: 0 auto;
}

.timing-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.timing-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 一般不法行为样式 ========= */
.general-tort-explanation {
  margin-bottom: 2rem;
}

.case-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.compensation-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.feature-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.feature-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 特殊不法行为样式 ========= */
.employer-liability {
  margin-bottom: 2rem;
}

.liability-scenario {
  margin: 1.5rem 0;
}

.liability-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.responsibility-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

.joint-tort {
  margin-bottom: 2rem;
}

.joint-scenario {
  margin: 1.5rem 0;
}

.joint-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.liability-details {
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
  text-align: center;
}

.detail-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.structure-liability {
  margin-bottom: 2rem;
}

.responsibility-hierarchy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.hierarchy-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.hierarchy-level {
  background: #2a7960;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

.hierarchy-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.hierarchy-content p {
  margin: 0;
  color: #6c757d;
}

.structure-scenario {
  margin: 1.5rem 0;
}

.structure-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.structure-scenario ul {
  padding-left: 1.5rem;
}

.structure-scenario li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.orderer-liability {
  margin-bottom: 2rem;
}

.exception-case {
  margin: 1.5rem 0;
}

.exception-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 损害赔偿请求权样式 ========= */
.statute-limitations {
  margin: 1.5rem 0;
}

.limitation-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.limitation-type {
  background: #2a7960;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
}

.limitation-content {
  flex: 1;
}

.limitation-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.limitation-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}

.limitation-period {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 120px;
}

.period-general, .period-special, .period-absolute {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
}

.period-general {
  background: #e7f7e7;
  color: #2e7d32;
}

.period-special {
  background: #e3f2fd;
  color: #1565c0;
}

.period-absolute {
  background: #fff9e6;
  color: #e65100;
}

.default-features {
  margin: 2rem 0;
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 1rem;
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

.comparison-table .highlight {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.feature-note {
  padding: 1rem;
  background: #fff9e6;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
}

.feature-note p {
  margin: 0;
}

/* ========= 过失相杀样式 ========= */
.negligence-concept {
  margin-bottom: 2rem;
}

.negligence-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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

.negligence-limits {
  margin: 2rem 0;
}

.limit-case {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.limit-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.limit-case ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.limit-case li {
  margin-bottom: 0.5rem;
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
  
  .effect-timing {
    grid-template-columns: 1fr;
  }
  
  .case-examples {
    grid-template-columns: 1fr;
  }
  
  .compensation-features {
    grid-template-columns: 1fr;
  }
  
  .responsibility-flow {
    grid-template-columns: 1fr;
  }
  
  .liability-details {
    grid-template-columns: 1fr;
  }
  
  .responsibility-hierarchy {
    grid-template-columns: 1fr;
  }
  
  .limitation-item {
    flex-direction: column;
    text-align: center;
  }
  
  .negligence-comparison {
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