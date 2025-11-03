<!-- src/views/notes/rights/ContractWork.vue -->
<template>
  <div class="contract-work-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>请负</span>
        </div>
        <h1>请负（承包契约）</h1>
        <p>日本民法中的承包契约制度，涉及请负人与注文者的权利义务关系、担保责任、契约解除等重要内容</p>
        
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
            <li>理解请负契约的定义和基本特征</li>
            <li>掌握请负人的担保责任内容及适用条件</li>
            <li>熟悉注文者的解除权行使条件和限制</li>
            <li>了解请负契约中报酬支付的特殊规则</li>
            <li>掌握担保责任的期间限制和特约效力</li>
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
          <h2>1. 请负契约的基本概念</h2>
          
          <h3>请负契约的定义</h3>
          <div class="concept-explanation">
            <p>请负契约是指当事人一方（请负人）约定完成一定工作，另一方（注文者）约定对此支付报酬的契约。</p>
            
            <div class="example-box">
              <h4>📝 现实案例</h4>
              <p>A委托B装修房屋，B完成装修工作后，A向B支付装修费用。这就是典型的请负契约关系。</p>
            </div>
          </div>

          <h3>契约特征</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🤝</div>
              <div class="timing-content">
                <h4>双务契约</h4>
                <p>双方互负义务：请负人完成工作，注文者支付报酬</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>有偿契约</h4>
                <p>注文者必须支付相应报酬</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">📝</div>
              <div class="timing-content">
                <h4>诺成契约</h4>
                <p>意思表示一致即成立，无需特定形式</p>
              </div>
            </div>
          </div>

          <h3>重要时间节点</h3>
          <div class="time-sequence">
            <div class="sequence-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>工作完成</h4>
                <p>报酬支付请求权产生</p>
              </div>
            </div>
            <div class="sequence-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>成果物引渡与报酬支付</h4>
                <p>同时履行关系</p>
              </div>
            </div>
            <div class="sequence-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>工作完成与报酬支付</h4>
                <p>非同时履行关系（工作完成为先）</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 请负人的担保责任 -->
        <section id="guarantee-responsibility" class="content-section">
          <h2>2. 请负人的担保责任</h2>
          
          <h3>担保责任的内容</h3>
          <div class="responsibility-content">
            <p>当工作成果存在契约不适合（瑕疵）时，注文者可以行使以下权利：</p>
            
            <div class="rights-grid">
              <div class="right-item">
                <div class="right-icon">🔧</div>
                <div class="right-content">
                  <h4>修补请求</h4>
                  <p><strong>原则上可以要求请负人进行修补</strong></p>
                  <div class="right-note">但修补费用过高时，基于社会通念可能不被认可</div>
                </div>
              </div>
              <div class="right-item">
                <div class="right-icon">📉</div>
                <div class="right-content">
                  <h4>报酬减额请求</h4>
                  <p><strong>需先进行履行追完的催告</strong></p>
                  <div class="right-note">在一定期间内未修补完成时方可行使</div>
                </div>
              </div>
              <div class="right-item">
                <div class="right-icon">💸</div>
                <div class="right-content">
                  <h4>损害赔偿请求</h4>
                  <p><strong>原则上可以请求损害赔偿</strong></p>
                  <div class="right-note">修补不能时特别适用</div>
                </div>
              </div>
              <div class="right-item">
                <div class="right-icon">🚫</div>
                <div class="right-content">
                  <h4>契约解除请求</h4>
                  <p><strong>需先发出追完请求催告</strong></p>
                  <div class="right-note">经过相当期间仍未修补时方可解除；瑕疵严重导致契约目的明显不能达成时，可无催告解除</div>
                </div>
              </div>
            </div>
          </div>

          <h3>实务案例</h3>
          <div class="practice-case">
            <div class="case-item">
              <h4>💻 软件开发案例</h4>
              <p>开发者提交的代码出现BUG，注文者需要：</p>
              <ol>
                <li>先要求开发者修复BUG（履行追完）</li>
                <li>在一定期间内修复不成，才能要求报酬减额</li>
                <li>如果BUG严重影响使用，可以解除契约</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- 担保责任的限制 -->
        <section id="guarantee-limits" class="content-section">
          <h2>3. 担保责任的限制</h2>
          
          <h3>原则限制</h3>
          <div class="limit-principle">
            <div class="principle-item">
              <div class="principle-icon">🛡️</div>
              <div class="principle-content">
                <h4>材料或指示问题</h4>
                <p>按照注文者提供的材料或指示进行工作时，发生契约不适合，请负人<strong>不负担保责任</strong>。</p>
              </div>
            </div>
          </div>

          <h3>例外情况</h3>
          <div class="exception-case">
            <div class="exception-item">
              <div class="exception-icon">⚠️</div>
              <div class="exception-content">
                <h4>知情不报</h4>
                <p>请负人<strong>明知材料或指示不当却不告知</strong>时，即使按照注文者指示工作，仍需负担保责任。</p>
                <div class="exception-note">体现了诚实信用原则的要求</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 担保责任的期间限制 -->
        <section id="time-limits" class="content-section">
          <h2>4. 担保责任的期间限制</h2>
          
          <h3>原则规定</h3>
          <div class="time-limit-principle">
            <div class="time-limit-item">
              <div class="time-icon">⏰</div>
              <div class="time-content">
                <h4>1年通知期限</h4>
                <p>注文者自知悉契约不适合之时起<strong>1年内</strong>未通知请负人，则丧失担保责任追及权。</p>
                <div class="time-note">目的是促进权利及时行使，维护法律关系稳定</div>
              </div>
            </div>
          </div>

          <h3>例外情况</h3>
          <div class="time-exceptions">
            <div class="exception-item">
              <div class="exception-icon">🔍</div>
              <div class="exception-content">
                <h4>请负人知情或重大过失</h4>
                <p>成果物引渡时，请负人<strong>已知悉瑕疵</strong>或因<strong>重大过失不知晓</strong>时，即使超过1年仍负担保责任。</p>
                <div class="exception-note">防止请负人恶意隐瞒瑕疵</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 担保责任的特约 -->
        <section id="special-agreements" class="content-section">
          <h2>5. 担保责任的特约</h2>
          
          <h3>特约效力</h3>
          <div class="agreement-validity">
            <div class="validity-item">
              <div class="validity-icon">📄</div>
              <div class="validity-content">
                <h4>免责特约原则有效</h4>
                <p>当事人可约定"即使成果物有瑕疵，请负人也不负担保责任"，该特约<strong>原则上有效</strong>。</p>
                <div class="validity-note">体现契约自由原则</div>
              </div>
            </div>
          </div>

          <h3>特约限制</h3>
          <div class="agreement-limits">
            <div class="limit-item">
              <div class="limit-icon">🚫</div>
              <div class="limit-content">
                <h4>知情不报的例外</h4>
                <p>请负人<strong>明知瑕疵存在却不告知</strong>时，即使有免责特约仍须负担保责任。</p>
                <div class="limit-note">诚实信用原则优先于契约自由原则</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 注文者的解除权 -->
        <section id="client-rights" class="content-section">
          <h2>6. 注文者的解除权</h2>
          
          <h3>解除条件</h3>
          <div class="termination-conditions">
            <div class="condition-item">
              <div class="condition-icon">🔄</div>
              <div class="condition-content">
                <h4>任意解除权</h4>
                <p>工作完成前，注文者<strong>可随时解除</strong>契约</p>
                <div class="condition-note">需赔偿请负人因此遭受的损害</div>
              </div>
            </div>
          </div>

          <h3>解除效果</h3>
          <div class="termination-effects">
            <div class="effect-item">
              <div class="effect-icon">⚖️</div>
              <div class="effect-content">
                <h4>契约面向将来消灭</h4>
                <p>解除效力不溯及既往，已履行的部分仍然有效</p>
              </div>
            </div>
            <div class="effect-item">
              <div class="effect-icon">💵</div>
              <div class="effect-content">
                <h4>比例报酬请求权</h4>
                <p>请负人可根据已完成工作的比例请求相应报酬</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 请负人的报酬请求权 -->
        <section id="contractor-rights" class="content-section">
          <h2>7. 请负人的报酬请求权</h2>
          
          <h3>报酬支付时期</h3>
          <div class="payment-timing">
            <div class="timing-item">
              <div class="timing-icon">✅</div>
              <div class="timing-content">
                <h4>工作完成后</h4>
                <p>工作完成后方可请求报酬</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">🔄</div>
              <div class="timing-content">
                <h4>同时履行关系</h4>
                <p>成果物引渡与报酬支付为同时履行关系</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">⏩</div>
              <div class="timing-content">
                <h4>非同时履行</h4>
                <p>工作完成与报酬支付不是同时履行关系（工作完成为先）</p>
              </div>
            </div>
          </div>

          <h3>比例报酬请求权</h3>
          <div class="proportional-payment">
            <div class="payment-case">
              <h4>适用情形</h4>
              <ul>
                <li>因注文者归责事由导致工作不能完成</li>
                <li>契约在工作完成前解除</li>
              </ul>
              <div class="payment-note">
                <p>请负人可根据注文者所得利益比例请求相应报酬</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 与委任契约的比较 -->
        <section id="comparison" class="content-section">
          <h2>8. 请负与委任的比较</h2>
          
          <h3>主要区别</h3>
          <div class="comparison-table">
            <div class="table-container">
              <table class="compare-table">
                <thead>
                  <tr>
                    <th>比较项目</th>
                    <th>请负契约</th>
                    <th>委任契约</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>报酬原则</strong></td>
                    <td>有偿原则</td>
                    <td>无偿原则</td>
                  </tr>
                  <tr>
                    <td><strong>成果要求</strong></td>
                    <td>以工作完成为要件</td>
                    <td>以事务处理为要件</td>
                  </tr>
                  <tr>
                    <td><strong>解除权</strong></td>
                    <td>注文者任意解除需赔偿</td>
                    <td>双方均可任意解除</td>
                  </tr>
                  <tr>
                    <td><strong>担保责任</strong></td>
                    <td>有担保责任</td>
                    <td>无担保责任</td>
                  </tr>
                  <tr>
                    <td><strong>报酬支付</strong></td>
                    <td>工作完成后支付</td>
                    <td>事务完成后结算</td>
                  </tr>
                </tbody>
              </table>
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
          <router-link to="/video?topic=contract-work" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=contract-work" class="action-button">
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
  { id: 'guarantee-responsibility', title: '担保责任', icon: '🛡️' },
  { id: 'guarantee-limits', title: '责任限制', icon: '🚫' },
  { id: 'time-limits', title: '期间限制', icon: '⏰' },
  { id: 'special-agreements', title: '特约效力', icon: '📄' },
  { id: 'client-rights', title: '注文者权利', icon: '👤' },
  { id: 'contractor-rights', title: '请负人权利', icon: '👷' },
  { id: 'comparison', title: '比较分析', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '請負（うけおい）',
    chinese: '承包契约',
    explanation: '当事人约定一方完成工作，另一方支付报酬的契约',
    example: 'A委托B装修房屋，B完成装修后A支付报酬'
  },
  {
    japanese: '注文者（ちゅうもんしゃ）',
    chinese: '定作人',
    explanation: '委托他人完成工作并支付报酬的一方',
    example: '委托建筑公司建造房屋的业主'
  },
  {
    japanese: '請負人（うけおいにん）',
    chinese: '承包人',
    explanation: '接受委托完成工作的一方',
    example: '承接装修工程的装修公司'
  },
  {
    japanese: '担保責任（たんぽせきにん）',
    chinese: '担保责任',
    explanation: '请负人对工作成果不符合约定时承担的责任',
    example: '装修质量不合格时，装修公司需负责修复'
  },
  {
    japanese: '契約不適合（けいやくふてきごう）',
    chinese: '契约不适合',
    explanation: '工作成果不符合契约约定的品质、性能等要求',
    example: '建造的房屋出现漏水等质量问题'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '請負契約において、仕事の完成前に注文者が契約を解除する場合、請負人が受ける損害を賠償する必要はない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '工作完成前，注文者可以解除契约，但必须赔偿请负人的损害。'
  },
  {
    question: '請負人は、注文者の指図によって仕事を行った場合、その仕事の結果について担保責任を負わない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '按照注文者的指示进行工作，请负人不负担保责任，但请负人明知指示不当而不告知的除外。'
  },
  {
    question: '請負契約の担保責任について、注文者は契約不適合を知った時から1年以内に請負人に通知しなければ、担保責任を追及できない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '注文者知道契约不适合后1年内必须通知请负人，否则不能追究担保责任，但请负人知道或重大过失不知道的除外。'
  },
  {
    question: '請負契約において、仕事の完成前であれば、請負人も損害を賠償して契約を解除することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '只有注文者可以在工作完成前赔偿损害而解除契约，请负人无此权利。'
  },
  {
    question: '請負契約において、成果物の引渡しと報酬の支払いは同時履行の関係に立つ。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '成果物引渡与报酬支付是同时履行关系，但工作完成与报酬支付不是同时履行关系。'
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
  learningStore.recordTopicStudyTime('contract-work', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('contract-work')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('contract-work')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('contract-work', 0)
  
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
.contract-work-page {
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

.time-sequence {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.sequence-step {
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

/* ========= 担保责任样式 ========= */
.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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
  margin: 0.25rem 0;
}

.right-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.practice-case {
  margin: 2rem 0;
}

.case-item {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.case-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-item ol {
  padding-left: 1.5rem;
}

.case-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 担保责任限制样式 ========= */
.limit-principle, .exception-case {
  margin: 1.5rem 0;
}

.principle-item, .exception-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.principle-icon, .exception-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.principle-content h4, .exception-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.principle-content p, .exception-content p {
  margin: 0.25rem 0;
}

.exception-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fff9e6;
  border-radius: 4px;
  font-size: 0.875rem;
  border-left: 3px solid #ffcc00;
}

/* ========= 期间限制样式 ========= */
.time-limit-principle, .time-exceptions {
  margin: 1.5rem 0;
}

.time-limit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.time-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.time-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.time-content p {
  margin: 0.25rem 0;
}

.time-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* ========= 特约样式 ========= */
.agreement-validity, .agreement-limits {
  margin: 1.5rem 0;
}

.validity-item, .limit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.validity-icon, .limit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.validity-content h4, .limit-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.validity-content p, .limit-content p {
  margin: 0.25rem 0;
}

.validity-note, .limit-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* ========= 注文者权利样式 ========= */
.termination-conditions, .termination-effects {
  margin: 1.5rem 0;
}

.condition-item, .effect-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.condition-icon, .effect-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.condition-content h4, .effect-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.condition-content p, .effect-content p {
  margin: 0.25rem 0;
}

.condition-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fff9e6;
  border-radius: 4px;
  font-size: 0.875rem;
  border-left: 3px solid #ffcc00;
}

/* ========= 请负人权利样式 ========= */
.payment-timing, .proportional-payment {
  margin: 1.5rem 0;
}

.payment-case {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.payment-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.payment-case ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.payment-case li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.payment-note {
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 4px;
  border-left: 3px solid #2a7960;
}

/* ========= 比较表格样式 ========= */
.comparison-table {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.compare-table th, .compare-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.compare-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.compare-table tr:nth-child(even) {
  background-color: #f8f9fa;
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
  
  .time-sequence {
    grid-template-columns: 1fr;
  }
  
  .rights-grid {
    grid-template-columns: 1fr;
  }
  
  .payment-timing {
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