<!-- src/views/notes/rights/ContractInappropriateness.vue -->
<template>
  <div class="contract-inappropriateness-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>契约不适合责任</span>
        </div>
        <h1>契约不适合责任</h1>
        <p>民法改正后的重要概念，涉及买卖契约中标的物与约定不符时的救济手段和责任承担</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">15</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">40分钟</span>
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
            <li>理解契约不适合责任的基本概念和法律性质</li>
            <li>掌握契约不适合的三种类型及其具体表现</li>
            <li>熟悉买主的四种救济手段及其适用条件</li>
            <li>了解担保责任的期间限制和特约规定</li>
            <li>能够区分契约不适合责任与瑕疵担保责任的区别</li>
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
          <h2>1. 基本概念</h2>
          
          <h3>定义与历史演变</h3>
          <div class="concept-explanation">
            <p><strong>契约不适合责任</strong>是指买卖契约中，交付的标的物与契约内容不符时，卖主必须承担的法律责任。</p>
            
            <div class="history-evolution">
              <div class="evolution-item">
                <div class="evolution-era">改正前</div>
                <div class="evolution-content">
                  <h4>卖主的担保责任</h4>
                  <p>买主对卖主原则上只有契约解除和损害赔偿请求权</p>
                </div>
              </div>
              <div class="evolution-arrow">→</div>
              <div class="evolution-item">
                <div class="evolution-era">改正后</div>
                <div class="evolution-content">
                  <h4>契约不适合责任</h4>
                  <p>买主不仅有解除权和损害赔偿请求权，还有追究请求权和代金减额请求权</p>
                </div>
              </div>
            </div>
          </div>

          <h3>重要性</h3>
          <div class="importance-section">
            <div class="importance-item">
              <div class="importance-icon">📚</div>
              <div class="importance-content">
                <h4>考试重点</h4>
                <p>宅建业法中"自ら売主制限"领域的重要知识点</p>
              </div>
            </div>
            <div class="importance-item">
              <div class="importance-icon">⚖️</div>
              <div class="importance-content">
                <h4>实务应用</h4>
                <p>不动产买卖中常见的纠纷处理依据</p>
              </div>
            </div>
            <div class="importance-item">
              <div class="importance-icon">🔄</div>
              <div class="importance-content">
                <h4>规则变化</h4>
                <p>民法改正后名称和规则都发生了重大变化</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 契约不适合类型 -->
        <section id="inappropriateness-types" class="content-section">
          <h2>2. 契约不适合的三种类型</h2>
          
          <h3>🔍 目的物的契约不适合</h3>
          <div class="types-grid">
            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">📦</div>
                <h4>种类不适合</h4>
              </div>
              <div class="type-definition">
                <p><strong>定义：</strong>交付的标的物种类与约定不同</p>
              </div>
              <div class="type-example">
                <h5>📝 案例说明</h5>
                <p>买主A从卖主B手中买了房子，但是房子屋顶有洞、漏雨。</p>
                <p>约定购买A歌手的CD，实际交付B歌手的CD。</p>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">⭐</div>
                <h4>品质不适合</h4>
              </div>
              <div class="type-definition">
                <p><strong>定义：</strong>交付的标的物不具备约定品质</p>
              </div>
              <div class="type-example">
                <h5>📝 案例说明</h5>
                <p>购买的电脑性能不符合约定规格。</p>
                <p>购买的公寓无法获得约定的眺望。</p>
                <p>事故房屋未在契约中明示。</p>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">📏</div>
                <h4>数量不适合</h4>
              </div>
              <div class="type-definition">
                <p><strong>定义：</strong>交付的标的物数量与约定不符</p>
              </div>
              <div class="type-example">
                <h5>📝 案例说明</h5>
                <p>买主A从卖主B手中买了100平的房子，但实际测量只有90平。</p>
                <p>"100㎡的土地以3,000万円购买"契约，实际只有90㎡。</p>
              </div>
            </div>
          </div>

          <h3>⚖️ 权利相关的契约不适合</h3>
          <div class="rights-types">
            <div class="rights-type">
              <h4>① 移转权利的不适合</h4>
              <ul>
                <li>地上权、地役权等权利存在</li>
                <li>约定的地役权、敷地利用权不存在</li>
                <li>他人对抗性赁借权存在</li>
              </ul>
            </div>
            <div class="rights-type">
              <h4>② 权利一部未移转</h4>
              <ul>
                <li>权利的一部分属于他人</li>
                <li class="case-example"><strong>案例：</strong>购买100㎡土地，其中10㎡属于他人</li>
                <li class="case-example"><strong>案例：</strong>买主A从卖主B手中买了300平的土地，但其中有100平设定了地上权和质权</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 救济手段 -->
        <section id="remedies" class="content-section">
          <h2>3. 买主的救济手段</h2>
          
          <h3>▲ 追完请求权</h3>
          <div class="remedy-section">
            <div class="remedy-content">
              <div class="remedy-definition">
                <h4>内容</h4>
                <ul>
                  <li>目的物的修补</li>
                  <li>代替物的引渡</li>
                  <li>不足分的引渡</li>
                </ul>
              </div>
              
              <div class="remedy-characteristics">
                <h4>特点</h4>
                <ul>
                  <li>买主可以选择请求方式</li>
                  <li>即使卖主无归责事由也可行使</li>
                  <li>买主有归责事由时不可行使</li>
                </ul>
              </div>
            </div>

            <div class="remedy-example">
              <h4>📝 实务要点</h4>
              <p><strong>追完方法：</strong>虽然由买主选择，但卖主如果没有对买主负责不相当的负担时，可以采用与买主请求的方法不同的方法履行追完请求。</p>
              <div class="example-scenario">
                <p><strong>例：</strong>买主要求卖主修好产品的瑕疵，但是卖主没有修，而是直接引渡了一个好的产品，这样也可以。</p>
              </div>
            </div>
          </div>

          <h3>▲ 代金减额请求权</h3>
          <div class="remedy-section">
            <div class="remedy-content">
              <div class="remedy-conditions">
                <h4>行使条件</h4>
                <ul>
                  <li>原则上需要先进行追完催告</li>
                  <li>催告期间内未追完时可行使</li>
                </ul>
              </div>
              
              <div class="remedy-exceptions">
                <h4>无需催告的情况</h4>
                <ol>
                  <li><strong>履行追完不能：</strong>现在制造中止，调达不可能</li>
                  <li><strong>卖主拒绝：</strong>"我绝对不追完！"明确表示拒绝</li>
                  <li><strong>定期行为：</strong>圣诞蛋糕12/31才送到…</li>
                </ol>
              </div>
            </div>

            <div class="remedy-note">
              <h4>💡 重要特点</h4>
              <ul>
                <li>不需要卖主有归责事由</li>
                <li>买主有归责事由时不可行使</li>
              </ul>
            </div>
          </div>

          <h3>▲ 损害赔偿请求权</h3>
          <div class="remedy-summary">
            <div class="remedy-item">
              <div class="remedy-icon">💰</div>
              <div class="remedy-info">
                <h4>性质</h4>
                <p>基于债务不履行</p>
              </div>
            </div>
            <div class="remedy-item">
              <div class="remedy-icon">⚖️</div>
              <div class="remedy-info">
                <h4>要件</h4>
                <p>卖主有归责事由</p>
              </div>
            </div>
            <div class="remedy-item">
              <div class="remedy-icon">🛡️</div>
              <div class="remedy-info">
                <h4>效果</h4>
                <p>请求因契约不适合造成的损失赔偿</p>
              </div>
            </div>
          </div>

          <h3>▲ 契约解除权</h3>
          <div class="remedy-summary">
            <div class="remedy-item">
              <div class="remedy-icon">📝</div>
              <div class="remedy-info">
                <h4>性质</h4>
                <p>基于债务不履行</p>
              </div>
            </div>
            <div class="remedy-item">
              <div class="remedy-icon">✅</div>
              <div class="remedy-info">
                <h4>要件</h4>
                <p>不需要卖主有归责事由</p>
              </div>
            </div>
            <div class="remedy-item">
              <div class="remedy-icon">🚫</div>
              <div class="remedy-info">
                <h4>限制</h4>
                <p>买主有归责事由时不可行使</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 权利行使要件 -->
        <section id="exercise-requirements" class="content-section">
          <h2>4. 权利行使的要件限制</h2>
          
          <h3>📊 归责事由与权利关系</h3>
          <div class="responsibility-table">
            <table>
              <thead>
                <tr>
                  <th>权利类型</th>
                  <th>卖主有归责事由</th>
                  <th>卖主无归责事由（买主也无）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>追完请求权</strong></td>
                  <td class="can-exercise">○</td>
                  <td class="can-exercise">○</td>
                </tr>
                <tr>
                  <td><strong>代金减额</strong></td>
                  <td class="can-exercise">○</td>
                  <td class="can-exercise">○</td>
                </tr>
                <tr>
                  <td><strong>损害赔偿</strong></td>
                  <td class="can-exercise">○</td>
                  <td class="cannot-exercise">×</td>
                </tr>
                <tr>
                  <td><strong>解除</strong></td>
                  <td class="can-exercise">○</td>
                  <td class="can-exercise">○</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>⏰ 期间限制</h3>
          <div class="time-limitations">
            <div class="limitation-category">
              <h4>目的物的契约不适合</h4>
              <div class="limitation-details">
                <div class="detail-item">
                  <span class="detail-type">种类：</span>
                  <span class="detail-period">知悉时起1年内通知</span>
                </div>
                <div class="detail-item">
                  <span class="detail-type">品质、数量：</span>
                  <span class="detail-period">与消灭时效相同</span>
                </div>
              </div>
            </div>

            <div class="limitation-category">
              <h4>权利相关的契约不适合</h4>
              <div class="limitation-details">
                <div class="detail-item">
                  <span class="detail-type">所有类型：</span>
                  <span class="detail-period">与消灭时效相同</span>
                </div>
              </div>
            </div>

            <div class="time-periods">
              <div class="period-item">
                <h4>时效期间</h4>
                <ul>
                  <li><strong>主观期间：</strong>知悉时起5年</li>
                  <li><strong>客观期间：</strong>权利可行使时起10年</li>
                </ul>
              </div>
              <div class="period-item exception">
                <h4>例外情况</h4>
                <p>卖主恶意或重大过失时，1年期间经过也不失权</p>
                <div class="exception-note">
                  <strong>注意：</strong>目的物的种类、品质相关的契约不适合，担保责任期间为主观1年；目的物的数量、权利相关的契约不适合，没有期间限制。
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 特别规定 -->
        <section id="special-provisions" class="content-section">
          <h2>5. 担保责任的特别规定</h2>
          
          <h3>📝 担保责任免除特约</h3>
          <div class="exemption-section">
            <div class="exemption-principle">
              <div class="principle-header">
                <div class="principle-icon">✅</div>
                <h4>原则：有效</h4>
              </div>
              <div class="principle-content">
                <p>当事者合意的情况下，担保责任免除特约原则上有效</p>
                <div class="principle-example">
                  <strong>例：</strong>奥特莱斯商品，有瑕疵也不承担责任，但价格相应降低
                </div>
              </div>
            </div>

            <div class="exemption-exceptions">
              <div class="exception-header">
                <div class="exception-icon">🚫</div>
                <h4>例外：不能免责的情况</h4>
              </div>
              <div class="exception-list">
                <div class="exception-item">
                  <div class="exception-number">1</div>
                  <div class="exception-content">
                    <strong>卖主明知但不告知：</strong>即使有免责特约，卖主明知有契约不适合缺陷，却没有告知买主事实的场合，不能免责
                  </div>
                </div>
                <div class="exception-item">
                  <div class="exception-number">2</div>
                  <div class="exception-content">
                    <strong>预先设定的权利：</strong>买卖契约缔结前，卖主给买卖目的物设定了地役权等利用权的场合
                  </div>
                </div>
                <div class="exception-item">
                  <div class="exception-number">3</div>
                  <div class="exception-content">
                    <strong>他人物品：</strong>契约缔结前，卖主把不动产让渡给了第三者，该买卖目的物成为他人物品的场合
                  </div>
                </div>
              </div>
            </div>

            <div class="exemption-scenario">
              <h4>📖 案例说明</h4>
              <div class="scenario-content">
                <div class="scenario-dialogue">
                  <div class="dialogue-bubble seller">
                    "这块地有权利限制，但我就不说了！"
                  </div>
                  <div class="dialogue-note">
                    即使有免责特约，卖主仍需承担责任
                  </div>
                </div>
                <div class="scenario-dialogue">
                  <div class="dialogue-bubble seller">
                    "这个敷地利用权转让给别人吧！"
                  </div>
                  <div class="dialogue-note">
                    预先设定的权利，免责特约无效
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>🏠 他人物买卖</h3>
          <div class="alien-item-section">
            <div class="alien-principle">
              <div class="principle-card">
                <h4>原则：契约有效</h4>
                <p>即使所有者没有出售意思，契约仍然有效</p>
              </div>
            </div>

            <div class="alien-obligations">
              <h4>卖主的义务</h4>
              <div class="obligation-flow">
                <div class="flow-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <strong>从所有者处取得所有权</strong>
                    <p>卖主A负担从所有者C手中取得土地X的所有权的义务</p>
                  </div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <strong>将所有权移转给买主</strong>
                    <p>将所有权移转给买主B的义务</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="alien-remedies">
              <h4>无法履行时的救济</h4>
              <div class="remedy-options">
                <div class="remedy-option">
                  <div class="option-icon">🔓</div>
                  <div class="option-content">
                    <h5>适用规定</h5>
                    <p>债务不履行的一般规定</p>
                  </div>
                </div>
                <div class="remedy-option">
                  <div class="option-icon">📜</div>
                  <div class="option-content">
                    <h5>买主权利</h5>
                    <p>可行使解除权和损害赔偿请求权</p>
                  </div>
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
          <router-link to="/video?topic=contract-inappropriateness" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=contract-inappropriateness" class="action-button">
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
  { id: 'inappropriateness-types', title: '不适合类型', icon: '🔍' },
  { id: 'remedies', title: '救济手段', icon: '🛡️' },
  { id: 'exercise-requirements', title: '行使要件', icon: '⚖️' },
  { id: 'special-provisions', title: '特别规定', icon: '📝' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '契約不適合（けいやくふてきごう）',
    chinese: '契约不适合',
    explanation: '交付的标的物与契约约定内容不符的情况',
    example: '购买的CD与实际交付的CD歌手不同'
  },
  {
    japanese: '追完請求権（ついかんせいきゅうけん）',
    chinese: '追完请求权',
    explanation: '买主请求卖主补正契约不适合的权利',
    example: '要求卖主修补房屋漏水问题'
  },
  {
    japanese: '代金減額請求権（だいきんげんがくせいきゅうけん）',
    chinese: '代金减额请求权',
    explanation: '买主请求减少价款的权利',
    example: '土地面积不足时要求降低购买价格'
  },
  {
    japanese: '担保責任（たんぽせきにん）',
    chinese: '担保责任',
    explanation: '卖主对标的物适合契约内容所负的责任',
    example: '卖主对房屋权利瑕疵承担的责任'
  },
  {
    japanese: '他人物売買（たにんぶつばいばい）',
    chinese: '他人物买卖',
    explanation: '卖主出售不属于自己所有的物品',
    example: 'A出售属于C的土地给B，契约仍然有效'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '契約不適合責任において、買主は売主に帰責事由がなくても、代金減額請求権を行使することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '代金减额请求权不需要卖主有归责事由，即使卖主无过错，买主也可以行使该权利。'
  },
  {
    question: '目的物の種類に関する契約不適合について、買主はその事実を知った時から1年以内に売主に通知しなければ、一切の権利を行使できない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '卖主恶意或重大过失的情况下，即使1年期间经过，买主也不会丧失权利。'
  },
  {
    question: '担保責任を負わない特約があれば、売主は知りながら告げなかった事実についても責任を免れる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '即使有免责特约，卖主对明知但不告知的事实仍不能免除责任。'
  },
  {
    question: '他人物の売買契約は無効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '他人物买卖契约有效，卖主负有取得该物所有权并移转给买主的义务。'
  },
  {
    question: '履行の追完が不能な場合、買主は催告なしで直ちに代金減額請求をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '履行追完不能是代金减额请求无需催告的例外情形之一。'
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
  learningStore.recordTopicStudyTime('contract-inappropriateness', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('contract-inappropriateness')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('contract-inappropriateness')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('contract-inappropriateness', 0)
  
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
.contract-inappropriateness-page {
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

.history-evolution {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.evolution-item {
  flex: 1;
  min-width: 250px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.evolution-era {
  background: #2a7960;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  display: inline-block;
}

.evolution-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.evolution-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.evolution-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.importance-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.importance-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.importance-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.importance-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.importance-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 契约不适合类型样式 ========= */
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.type-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease;
}

.type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.type-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.type-icon {
  font-size: 1.5rem;
}

.type-header h4 {
  margin: 0;
  color: #1a472a;
}

.type-definition {
  margin-bottom: 1rem;
}

.type-example {
  background: #f0f7ff;
  padding: 1rem;
  border-radius: 5px;
  border-left: 3px solid #2a7960;
}

.type-example h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rights-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rights-type {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rights-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-example {
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-style: italic;
}

/* ========= 救济手段样式 ========= */
.remedy-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.remedy-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.remedy-definition h4, .remedy-characteristics h4, .remedy-conditions h4, .remedy-exceptions h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.remedy-example {
  padding: 1rem;
  background: white;
  border-radius: 5px;
  border-left: 4px solid #2a7960;
}

.remedy-example h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.example-scenario {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 4px;
}

.remedy-note {
  padding: 1rem;
  background: #fff9e6;
  border-radius: 5px;
  border-left: 4px solid #ffcc00;
}

.remedy-note h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.remedy-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.remedy-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.remedy-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.remedy-info h4 {
  margin: 0 0 0.25rem 0;
  color: #1a472a;
  font-size: 0.875rem;
}

.remedy-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 权利行使要件样式 ========= */
.responsibility-table {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.responsibility-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.responsibility-table th, .responsibility-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.responsibility-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.responsibility-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.can-exercise {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.cannot-exercise {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.time-limitations {
  margin: 2rem 0;
}

.limitation-category {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.limitation-category h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.limitation-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.detail-type {
  font-weight: bold;
  min-width: 100px;
}

.detail-period {
  color: #2a7960;
  font-weight: bold;
}

.time-periods {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.period-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.period-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.period-item.exception {
  background: #fff9e6;
  border-color: #ffcc00;
}

.exception-note {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 特别规定样式 ========= */
.exemption-section {
  margin-bottom: 2rem;
}

.exemption-principle {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 8px;
  border-left: 4px solid #2e7d32;
}

.principle-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.principle-icon {
  font-size: 1.5rem;
}

.principle-header h4 {
  margin: 0;
  color: #1a472a;
}

.principle-content p {
  margin: 0 0 1rem 0;
}

.principle-example {
  padding: 1rem;
  background: white;
  border-radius: 4px;
  font-style: italic;
}

.exemption-exceptions {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #ffe7e7;
  border-radius: 8px;
  border-left: 4px solid #c62828;
}

.exception-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.exception-icon {
  font-size: 1.5rem;
}

.exception-header h4 {
  margin: 0;
  color: #1a472a;
}

.exception-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.exception-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.exception-number {
  width: 30px;
  height: 30px;
  background: #c62828;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.exception-content {
  flex: 1;
}

.exemption-scenario {
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.exemption-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.scenario-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scenario-dialogue {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.dialogue-bubble {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  position: relative;
}

.dialogue-bubble.seller {
  background: #ffe7e7;
  border: 1px solid #c62828;
}

.dialogue-bubble.seller::before {
  content: "卖主";
  position: absolute;
  top: -10px;
  left: 10px;
  background: #c62828;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
}

.dialogue-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

.alien-item-section {
  margin-top: 2rem;
}

.alien-principle {
  margin-bottom: 1.5rem;
}

.principle-card {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #2e7d32;
}

.principle-card h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.principle-card p {
  margin: 0;
  color: #6c757d;
}

.alien-obligations {
  margin-bottom: 1.5rem;
}

.alien-obligations h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.obligation-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.flow-step {
  flex: 1;
  min-width: 200px;
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

.step-content strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.step-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.flow-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.alien-remedies h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.remedy-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.remedy-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.option-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.option-content h5 {
  margin: 0 0 0.25rem 0;
  color: #1a472a;
}

.option-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
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
  
  .history-evolution {
    flex-direction: column;
  }
  
  .evolution-arrow {
    transform: rotate(90deg);
  }
  
  .importance-section {
    grid-template-columns: 1fr;
  }
  
  .types-grid {
    grid-template-columns: 1fr;
  }
  
  .rights-types {
    grid-template-columns: 1fr;
  }
  
  .remedy-content {
    grid-template-columns: 1fr;
  }
  
  .remedy-summary {
    grid-template-columns: 1fr;
  }
  
  .time-periods {
    grid-template-columns: 1fr;
  }
  
  .obligation-flow {
    flex-direction: column;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
  }
  
  .remedy-options {
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
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>