<!-- src/views/notes/rights/OtherImportantMatters.vue -->
<template>
  <div class="other-important-matters-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>其他重要事项</span>
        </div>
        <h1>委任、赠与等其他重要事项</h1>
        <p>日本民法中的事务管理、赠与契约、委任契约、使用借贷及地役权等重要法律制度</p>
        
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
            <li>理解事务管理的概念、成立要件和法律效果</li>
            <li>掌握赠与契约的性质、成立要件和法律效果</li>
            <li>理解委任契约的概念、特征和当事人的权利义务</li>
            <li>了解使用借贷与租赁借贷的区别</li>
            <li>掌握地役权的基本概念和特性</li>
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

        <!-- 事务管理 -->
        <section id="transaction-management" class="content-section">
          <h2>1. 事务管理</h2>
          
          <h3>概念解析</h3>
          <div class="concept-explanation">
            <p>事务管理是指没有法定义务或约定义务的人，为避免他人利益受损失而主动管理他人事务的行为。</p>
            
            <div class="example-box">
              <h4>📝 典型案例</h4>
              <p>A看到邻居B的房子屋顶因台风损坏，而B常年不在家。A出于好心主动修缮了B的房子屋顶。这种好心帮忙的行为就是事务管理。</p>
            </div>
          </div>

          <h3>法律要件</h3>
          <div class="legal-requirements">
            <div class="requirement-item">
              <div class="requirement-icon">🎯</div>
              <div class="requirement-content">
                <h4>目的正当性</h4>
                <p>必须是为了本人利益而管理</p>
              </div>
            </div>
            <div class="requirement-item">
              <div class="requirement-icon">⚖️</div>
              <div class="requirement-content">
                <h4>方法适当性</h4>
                <p>必须根据最适合本人利益的方法进行管理</p>
              </div>
            </div>
            <div class="requirement-item">
              <div class="requirement-icon">🙅</div>
              <div class="requirement-content">
                <h4>意思尊重</h4>
                <p>管理行为不能违反本人明示或可推知的意思</p>
              </div>
            </div>
          </div>

          <h3>法律效果</h3>
          <div class="legal-effects">
            <div class="effect-item">
              <h4>费用偿还请求权</h4>
              <p>管理人可请求偿还必要费用和有益费用</p>
            </div>
            <div class="effect-item">
              <h4>无报酬请求权</h4>
              <p>管理人不能请求报酬</p>
            </div>
            <div class="effect-item">
              <h4>违反意思的管理</h4>
              <p>违反本人意思的管理只能在现存利益范围内请求偿还</p>
            </div>
          </div>

          <div class="important-notes">
            <div class="note-item">
              <h4>⚠️ 重要提醒</h4>
              <p>如果A进行了违反本人意思的事务管理，比如过度豪华装修，那么只能在本人的现存利益范围内请求偿还费用。</p>
            </div>
          </div>
        </section>

        <!-- 赠与契约 -->
        <section id="gift-contract" class="content-section">
          <h2>2. 赠与契约</h2>
          
          <h3>基本概念</h3>
          <div class="concept-explanation">
            <p>赠与契约是指一方无偿将自己的财产给予另一方，另一方表示接受的契约。</p>
          </div>

          <h3>契约性质</h3>
          <div class="contract-properties">
            <div class="property-item">
              <div class="property-icon">🤝</div>
              <div class="property-content">
                <h4>诺成契约</h4>
                <p>双方意思表示一致即成立</p>
              </div>
            </div>
            <div class="property-item">
              <div class="property-icon">💰</div>
              <div class="property-content">
                <h4>无偿契约</h4>
                <p>受赠人无需支付对价</p>
              </div>
            </div>
            <div class="property-item">
              <div class="property-icon">📝</div>
              <div class="property-content">
                <h4>不要式契约</h4>
                <p>口头即可成立</p>
              </div>
            </div>
          </div>

          <h3>重要规则</h3>
          <div class="important-rules">
            <div class="rule-item">
              <h4>口头赠与的解除</h4>
              <p>没有书面的赠与，在履行完成前可以解除</p>
            </div>
            <div class="rule-item">
              <h4>不动产赠与</h4>
              <p>不动产赠与如果已完成登记，视为履行完成</p>
            </div>
            <div class="rule-item">
              <h4>书面赠与的约束力</h4>
              <p>有书面的赠与契约不可解除</p>
            </div>
            <div class="rule-item">
              <h4>担保责任</h4>
              <p>原则上赠与人不承担担保责任，但负担赠与除外</p>
            </div>
          </div>

          <h3>负担赠与</h3>
          <div class="burden-gift">
            <div class="burden-explanation">
              <p>如果赠与附有义务（负担），赠与人在负担限度内承担与卖主同样的担保责任。</p>
              <div class="example-box">
                <h4>📝 负担赠与案例</h4>
                <p>A将房屋赠与B，但要求B承担照顾A的父母的义务。这种情况下，A在照顾义务的限度内需要对房屋的质量承担担保责任。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 委任契约 -->
        <section id="mandate-contract" class="content-section">
          <h2>3. 委任契约</h2>
          
          <h3>概念定义</h3>
          <div class="concept-explanation">
            <p>委任是指委任者委托受任者处理法律行为，受任者承诺处理的契约。</p>
          </div>

          <h3>权利义务关系</h3>
          <div class="rights-obligations">
            <div class="ro-item">
              <div class="ro-icon">🔍</div>
              <div class="ro-content">
                <h4>善管注意义务</h4>
                <p>受任者负有善良管理人的注意义务</p>
                <div class="ro-note">有偿·无偿均适用</div>
              </div>
            </div>
            <div class="ro-item">
              <div class="ro-icon">💸</div>
              <div class="ro-content">
                <h4>费用预付请求权</h4>
                <p>受任者可以请求预付必要费用</p>
              </div>
            </div>
            <div class="ro-item">
              <div class="ro-icon">🎁</div>
              <div class="ro-content">
                <h4>报酬请求权</h4>
                <p>受任者原则上不能请求报酬（除非有特约）</p>
              </div>
            </div>
          </div>

          <h3>契约终止</h3>
          <div class="contract-termination">
            <p>委任契约因以下事由终止：</p>
            <div class="termination-reasons">
              <div class="reason-item">
                <h4>死亡</h4>
                <p>委任者或受任者死亡</p>
              </div>
              <div class="reason-item">
                <h4>破产</h4>
                <p>委任者或受任者破产</p>
              </div>
              <div class="reason-item">
                <h4>成年被监护人</h4>
                <p>受任者被宣告为成年被监护人</p>
              </div>
            </div>
          </div>

          <h3>解除规则</h3>
          <div class="termination-rules">
            <div class="rule-item">
              <h4>自由解除权</h4>
              <p>双方均可随时解除契约</p>
            </div>
            <div class="rule-item">
              <h4>不利时期解除</h4>
              <p>在不利时期解除需承担损害赔偿责任</p>
            </div>
            <div class="rule-item">
              <h4>利益委任解除</h4>
              <p>为受任者利益（非仅为报酬）的委任，解除时也需赔偿</p>
            </div>
          </div>
        </section>

        <!-- 使用借贷 -->
        <section id="loan-for-use" class="content-section">
          <h2>4. 使用借贷</h2>
          
          <h3>基本特征</h3>
          <div class="concept-explanation">
            <p>使用借贷是无偿借用他人物的契约，与有偿的租赁借贷相对。</p>
          </div>

          <h3>与租赁借贷的区别</h3>
          <div class="comparison-table">
            <div class="table-container">
              <table class="loan-comparison-table">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>使用借贷</th>
                    <th>租赁借贷</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>对价</strong></td>
                    <td class="loan-use">无偿</td>
                    <td class="loan-rent">有偿</td>
                  </tr>
                  <tr>
                    <td><strong>对抗第三人</strong></td>
                    <td class="loan-use">不能对抗</td>
                    <td class="loan-rent">登记后可对抗</td>
                  </tr>
                  <tr>
                    <td><strong>必要费用</strong></td>
                    <td class="loan-use">借主承担通常必要费</td>
                    <td class="loan-rent">贷主偿还</td>
                  </tr>
                  <tr>
                    <td><strong>契约不适合责任</strong></td>
                    <td class="loan-use">原则上不承担</td>
                    <td class="loan-rent">承担与卖主同样责任</td>
                  </tr>
                  <tr>
                    <td><strong>借主死亡</strong></td>
                    <td class="loan-use">不继承</td>
                    <td class="loan-rent">继承</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>特殊规则</h3>
          <div class="special-rules">
            <div class="rule-item">
              <h4>借主解除权</h4>
              <p>借主可随时解除契约</p>
            </div>
            <div class="rule-item">
              <h4>贷主解除权</h4>
              <p>贷主在借主接受物之前可解除无书面契约</p>
            </div>
            <div class="rule-item">
              <h4>禁止无断转贷</h4>
              <p>未经同意不得转借给第三人</p>
            </div>
          </div>

          <div class="important-notes">
            <div class="note-item">
              <h4>📌 重要说明</h4>
              <p>使用借贷不适用借地借家法，因此在终止契约时不需要正当事由。</p>
            </div>
          </div>
        </section>

        <!-- 地役权 -->
        <section id="easement" class="content-section">
          <h2>5. 地役权</h2>
          
          <h3>基本概念</h3>
          <div class="concept-explanation">
            <p>地役权是指为了达到一定目的（如通行），使用他人的土地为自己土地提供便利的权利。</p>
            
            <div class="easement-diagram">
              <div class="diagram-content">
                <div class="land-item">
                  <div class="land-name">甲地（要役地）</div>
                  <div class="land-description">A所有的土地，享有地役权</div>
                </div>
                <div class="arrow">→ 通行地役权 →</div>
                <div class="land-item">
                  <div class="land-name">乙地（承役地）</div>
                  <div class="land-description">B所有的土地，供他人使用</div>
                </div>
              </div>
            </div>
          </div>

          <h3>相关术语</h3>
          <div class="related-terms">
            <div class="term-item">
              <h4>要役地</h4>
              <p>享有地役权的土地（自己的土地）</p>
            </div>
            <div class="term-item">
              <h4>承役地</h4>
              <p>供他人使用的土地（他人的土地）</p>
            </div>
          </div>

          <h3>地役权的性质</h3>
          <div class="easement-properties">
            <div class="property-item">
              <div class="property-icon">🔗</div>
              <div class="property-content">
                <h4>附随性</h4>
                <p>地役权随要役地所有权当然移转</p>
                <div class="property-note">只要没有特约，地役权伴随着要役地的所有权当然移转</div>
              </div>
            </div>
            <div class="property-item">
              <div class="property-icon">🚫</div>
              <div class="property-content">
                <h4>不可分离性</h4>
                <p>不能与要役地分离单独让渡</p>
                <div class="property-note">不可以和要役地分离，单独把地役权让渡</div>
              </div>
            </div>
            <div class="property-item">
              <div class="property-icon">⏰</div>
              <div class="property-content">
                <h4>可时效取得</h4>
                <p>连续使用20年以上可时效取得</p>
              </div>
            </div>
          </div>

          <h3>时效取得条件</h3>
          <div class="acquisition-conditions">
            <div class="condition-item">
              <h4>亲自开设通路</h4>
              <p>通行人必须亲自在他人的土地上开设通路</p>
            </div>
            <div class="condition-item">
              <h4>连续使用</h4>
              <p>必须连续通行20年以上</p>
            </div>
            <div class="condition-item">
              <h4>符合要件</h4>
              <p>必须符合时效取得的其他要件</p>
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
          <router-link to="/video?topic=other-important-matters" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=other-important-matters" class="action-button">
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
  { id: 'transaction-management', title: '事务管理', icon: '📋' },
  { id: 'gift-contract', title: '赠与契约', icon: '🎁' },
  { id: 'mandate-contract', title: '委任契约', icon: '🤝' },
  { id: 'loan-for-use', title: '使用借贷', icon: '🏠' },
  { id: 'easement', title: '地役权', icon: '🗺️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '事務管理（じむかんり）',
    chinese: '事务管理',
    explanation: '没有法定或约定义务，为避免他人利益受损失而管理他人事务的行为',
    example: '邻居外出，主动帮其修理被台风损坏的屋顶'
  },
  {
    japanese: '贈与（ぞうよ）',
    chinese: '赠与',
    explanation: '无偿将财产给予他人，他人表示接受的行为',
    example: 'A将一台电脑无偿送给B，B接受'
  },
  {
    japanese: '委任（いにん）',
    chinese: '委任',
    explanation: '当事人约定一方委托他方处理事务，他方承诺处理的契约',
    example: 'A委托B代为购买房屋，B同意'
  },
  {
    japanese: '使用貸借（しようたいしゃく）',
    chinese: '使用借贷',
    explanation: '无偿将物借给他人使用，他人使用后返还的契约',
    example: 'A将自行车无偿借给B使用一周'
  },
  {
    japanese: '地役権（ちえきけん）',
    chinese: '地役权',
    explanation: '为达到一定目的，使用他人土地为自己土地提供便利的权利',
    example: 'A在B的土地上设立通行地役权，以便通往公路'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '事務管理は、法律上の義務がない者が、他人の事務を管理することをいう。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '事务管理确实是指没有法定义务的人管理他人事务的行为。'
  },
  {
    question: '贈与契約は、書面によらないと効力を生じない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '赠与契约是诺成契约，口头即可成立，不需要书面形式。'
  },
  {
    question: '委任契約は、委任者と受任者のいずれからも、いつでも解除することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '委任契约的双方都可以随时解除，但在不利时期解除需承担损害赔偿责任。'
  },
  {
    question: '使用貸借は、無償で物を貸し借りする契約である。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '使用借贷确实是无偿借用他人物的契约。'
  },
  {
    question: '地役権は、要役地から分離して譲渡することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '地役权具有不可分离性，不能与要役地分离单独让渡。'
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
  learningStore.recordTopicStudyTime('other-important-matters', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('other-important-matters')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('other-important-matters')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('other-important-matters', 0)
  
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
.other-important-matters-page {
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

/* ========= 事务管理样式 ========= */
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

.legal-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.requirement-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.requirement-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.requirement-content p {
  margin: 0;
  color: #6c757d;
}

.legal-effects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.effect-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.effect-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.important-notes {
  margin: 1.5rem 0;
}

.note-item {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border: 1px solid #ffcc00;
}

.note-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ========= 赠与契约样式 ========= */
.contract-properties {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.property-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.property-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.property-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.property-content p {
  margin: 0;
  color: #6c757d;
}

.important-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rule-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rule-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.burden-gift {
  margin: 2rem 0;
}

.burden-explanation {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

/* ========= 委任契约样式 ========= */
.rights-obligations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.ro-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.ro-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.ro-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.ro-content p {
  margin: 0;
  color: #6c757d;
}

.ro-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

.contract-termination {
  margin: 2rem 0;
}

.termination-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.reason-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.reason-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.termination-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

/* ========= 使用借贷样式 ========= */
.comparison-table {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.loan-comparison-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.loan-comparison-table th, .loan-comparison-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.loan-comparison-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.loan-comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.loan-use {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.loan-rent {
  background-color: #eef7ff !important;
  color: #1565c0;
  font-weight: bold;
}

.special-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

/* ========= 地役权样式 ========= */
.easement-diagram {
  margin: 1.5rem 0;
}

.diagram-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.land-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  min-width: 200px;
}

.land-name {
  font-weight: bold;
  color: #1a472a;
  margin-bottom: 0.5rem;
}

.arrow {
  font-size: 1.25rem;
  color: #2a7960;
  font-weight: bold;
}

.related-terms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.term-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.term-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.easement-properties {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.property-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

.acquisition-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.condition-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.condition-item h4 {
  margin: 0 0 0.5rem 0;
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
  
  .legal-requirements {
    grid-template-columns: 1fr;
  }
  
  .legal-effects {
    grid-template-columns: 1fr;
  }
  
  .contract-properties {
    grid-template-columns: 1fr;
  }
  
  .important-rules {
    grid-template-columns: 1fr;
  }
  
  .rights-obligations {
    grid-template-columns: 1fr;
  }
  
  .termination-reasons {
    grid-template-columns: 1fr;
  }
  
  .termination-rules {
    grid-template-columns: 1fr;
  }
  
  .diagram-content {
    flex-direction: column;
  }
  
  .related-terms {
    grid-template-columns: 1fr;
  }
  
  .easement-properties {
    grid-template-columns: 1fr;
  }
  
  .acquisition-conditions {
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