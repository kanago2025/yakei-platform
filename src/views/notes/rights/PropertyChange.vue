<!-- src/views/notes/rights/PropertyChange.vue -->
<template>
  <div class="property-change-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>物权变动</span>
        </div>
        <h1>物权变动</h1>
        <p>日本民法中的物权变动制度，涉及所有权转移、对抗要件、登记制度及对抗第三人等重要内容</p>
        
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
            <li>理解物权变动的基本概念和效力发生时间</li>
            <li>掌握不动产物权变动的对抗要件（登记）及其效力</li>
            <li>熟悉对抗问题的处理规则，特别是二重让与的情况</li>
            <li>了解不需要登记即可对抗的第三人类型</li>
            <li>掌握各种情况下对抗第三人的规则（取消前后、解除前后、时效完成前后等）</li>
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
          <h2>1. 物权变动的基本概念</h2>
          
          <h3>什么是物权变动？</h3>
          <div class="concept-explanation">
            <p>物权变动是指物权的发生、变更和消灭，如所有权的转移。</p>
            
            <div class="example-box">
              <h4>📝 案例说明</h4>
              <p>A把房子卖给B，所有权从A转移到了B，像这样的所有权移转就叫做物权变动。</p>
            </div>
          </div>

          <h3>物权变动的效力</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🏠</div>
              <div class="timing-content">
                <h4>不动产</h4>
                <p>基于买卖契约的意思表示，发生效力。只要没有特约，所有权立即移转给买主。</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">📦</div>
              <div class="timing-content">
                <h4>动产</h4>
                <p>只要做了引渡，就具备了对抗力。</p>
              </div>
            </div>
          </div>

          <h3>重要原则</h3>
          <div class="important-principles">
            <div class="principle-item">
              <h4>规则1</h4>
              <p>进行了不动产的买卖契约时，即使不登记，所有权也移转给买主。</p>
            </div>
            <div class="principle-item">
              <h4>规则2</h4>
              <p>所有权不登记的话，不能向第三者对抗。</p>
            </div>
            <div class="principle-item">
              <h4>核心要点</h4>
              <p>不动产相关的物权变动，如果不登记，无法对抗第三者，先登记者赢。</p>
            </div>
          </div>
        </section>

        <!-- 对抗要件（登记） -->
        <section id="registration" class="content-section">
          <h2>2. 对抗要件（登记）</h2>
          
          <h3>登记的作用</h3>
          <div class="registration-concept">
            <p>土地或建物的所有权要主张，原则上需要登记。登记是指在法务局的登记簿上记录一定事项。</p>
            
            <div class="analogy-box">
              <h4>📝 简单比喻</h4>
              <p>就像在物品上写名字表示是自己的东西一样，在登记簿上登记名字，就可以主张是自己的东西。</p>
            </div>
          </div>

          <h3>登记的基本规则</h3>
          <div class="registration-rules">
            <div class="rule-item">
              <div class="rule-icon">🥇</div>
              <div class="rule-content">
                <h4>先登记者胜出</h4>
                <p>契约先后不影响，登记先后决定胜负</p>
              </div>
            </div>
            <div class="rule-item">
              <div class="rule-icon">🔄</div>
              <div class="rule-content">
                <h4>对前主和相续人</h4>
                <p>买主可以无登记对抗卖主的前主和相续人</p>
              </div>
            </div>
          </div>

          <h3>特殊情况说明</h3>
          <div class="special-cases">
            <div class="case-item">
              <h4>对卖主的前主</h4>
              <p>买主可以无登记对抗所有权</p>
              <div class="case-example">
                <strong>例：</strong>A → B → C（登记在A名下），C可以无登记对抗A
              </div>
            </div>
            <div class="case-item">
              <h4>对卖主的相续人</h4>
              <p>买主可以无登记对抗所有权</p>
              <div class="case-example">
                <strong>例：</strong>A卖给B后死亡，C继承A的登记，B可以无登记对抗C
              </div>
            </div>
          </div>
        </section>

        <!-- 二重让与的对抗问题 -->
        <section id="double-transfer" class="content-section">
          <h2>3. 二重让与的对抗问题</h2>
          
          <h3>什么是二重让与？</h3>
          <div class="double-transfer-concept">
            <p>同一标的物先后让与给两个以上的受让人而产生的争议。</p>
            
            <div class="conflict-scenario">
              <div class="party-a">
                <h4>B的主张</h4>
                <p>这个土地是我的！</p>
                <div class="contract-info">契约：2月10日</div>
              </div>
              <div class="versus">VS</div>
              <div class="party-b">
                <h4>C的主张</h4>
                <p>这个土地是我的！</p>
                <div class="contract-info">契约：2月15日 + 登记</div>
              </div>
            </div>
          </div>

          <h3>解决规则</h3>
          <div class="solution-rules">
            <div class="solution-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>契约时间不重要</h4>
                <p>契约的先后顺序不影响结果</p>
              </div>
            </div>
            <div class="solution-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>登记时间决定胜负</h4>
                <p>先完成登记者取得所有权</p>
              </div>
            </div>
            <div class="solution-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>C胜出</h4>
                <p>虽然B的契约在先，但C先完成登记</p>
              </div>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="case-illustration">
            <div class="timeline">
              <div class="timeline-event">
                <div class="event-date">2月10日</div>
                <div class="event-content">A与B签订买卖契约</div>
              </div>
              <div class="timeline-event">
                <div class="event-date">2月15日</div>
                <div class="event-content">A与C签订买卖契约 + 完成登记</div>
              </div>
              <div class="timeline-event result">
                <div class="event-date">结果</div>
                <div class="event-content">C取得土地所有权</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 不需要登记即可对抗的第三人 -->
        <section id="no-registration-needed" class="content-section">
          <h2>4. 不需要登记即可对抗的第三人</h2>
          
          <h3>无权利者</h3>
          <div class="rights-categories">
            <div class="category-item">
              <div class="category-icon">🚫</div>
              <div class="category-content">
                <h4>定义</h4>
                <p>从无权利者处受让权利的人</p>
                <div class="category-note">无权利者从无权利者处受让，仍是无权利者！</div>
              </div>
            </div>
            <div class="category-item">
              <div class="category-icon">🤥</div>
              <div class="category-content">
                <h4>虚伪表示</h4>
                <p>因虚伪表示而取得登记的人</p>
                <div class="category-example">
                  A ↔ B（虚伪表示）→ 登记转移
                </div>
              </div>
            </div>
          </div>

          <h3>不法占据者</h3>
          <div class="illegal-occupier">
            <div class="occupier-scenario">
              <div class="occupier-claim">
                <h4>不法占据者的主张</h4>
                <p>"我住在这里就是我的土地！不交出来！有意见就拿出登记来！"</p>
              </div>
              <div class="true-owner-rights">
                <h4>真正权利人的权利</h4>
                <p>即使没有登记，也可以对抗不法占据者，请求交还</p>
              </div>
            </div>
          </div>

          <h3>背信的恶意者</h3>
          <div class="bad-faith">
            <div class="bad-faith-types">
              <div class="type-item">
                <h4>欺诈</h4>
                <p>通过欺诈手段妨碍登记申请的人</p>
              </div>
              <div class="type-item">
                <h4>强迫</h4>
                <p>通过强迫手段妨碍登记申请的人</p>
                <div class="threat-example">
                  "去登记所的话会遇到可怕的人哦！" ← 强迫行为
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 取消与第三人 -->
        <section id="cancellation" class="content-section">
          <h2>5. 取消与第三人</h2>
          
          <h3>取消前的第三人</h3>
          <div class="cancellation-timing">
            <div class="timing-case">
              <h4>欺诈的情况</h4>
              <div class="case-outcome cannot-resist">
                不可对抗善意无过失的第三人
              </div>
            </div>
            <div class="timing-case">
              <h4>强迫的情况</h4>
              <div class="case-outcome can-resist">
                无论善意恶意都可对抗
              </div>
            </div>
          </div>

          <h3>取消后的第三人</h3>
          <div class="cancellation-scenario">
            <div class="scenario-flow">
              <div class="flow-step">
                <div class="step-icon">📝</div>
                <div class="step-content">
                  <h4>A取消契约</h4>
                  <p>"我要取消！"</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-icon">🔄</div>
                <div class="step-content">
                  <h4>B转卖给C</h4>
                  <p>"不想返还，卖给C吧！"</p>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-icon">⚖️</div>
                <div class="step-content">
                  <h4>解决方式</h4>
                  <p>以登记决定胜负</p>
                  <div class="step-detail">A有登记 → A胜出<br>C有登记 → C胜出</div>
                </div>
              </div>
            </div>
          </div>

          <h3>重要区别</h3>
          <div class="important-distinction">
            <div class="distinction-item">
              <h4>取消前的第三人</h4>
              <p>登记有无不影响</p>
            </div>
            <div class="distinction-item">
              <h4>取消后的第三人</h4>
              <p>以登记决定胜负</p>
            </div>
          </div>
        </section>

        <!-- 解除与第三人 -->
        <section id="rescission" class="content-section">
          <h2>6. 解除与第三人</h2>
          
          <h3>解除前的第三人</h3>
          <div class="rescission-before">
            <div class="rule-summary">
              <div class="rule-icon">📋</div>
              <div class="rule-text">
                <h4>有登记的第三人胜出</h4>
                <p>解除前出现的第三人，如果有登记，则第三人胜出</p>
              </div>
            </div>
          </div>

          <h3>解除后的第三人</h3>
          <div class="rescission-after">
            <div class="rule-summary">
              <div class="rule-icon">⚔️</div>
              <div class="rule-text">
                <h4>有登记的一方胜出</h4>
                <p>解除后出现的第三人，登记在先的一方胜出</p>
              </div>
            </div>
          </div>

          <h3>基本原则</h3>
          <div class="basic-principle">
            <div class="principle-highlight">
              <span class="highlight-text">"解除"出现时，基本上以登记决定胜负</span>
            </div>
            <div class="principle-note">
              <p>无论是解除前还是解除后的第三人，登记都是关键因素</p>
            </div>
          </div>
        </section>

        <!-- 各种特殊情况 -->
        <section id="special-cases" class="content-section">
          <h2>7. 各种特殊情况</h2>
          
          <h3>共同相续与第三人</h3>
          <div class="co-inheritance">
            <div class="case-scenario">
              <h4>情景</h4>
              <p>A和B共同继承土地，但B以单独继承名义登记，并擅自卖给第三人C</p>
            </div>
            <div class="case-resolution">
              <h4>解决</h4>
              <div class="resolution-steps">
                <div class="resolution-step">
                  <div class="step-mark">①</div>
                  <div class="step-content">B对A的持分是无权利者</div>
                </div>
                <div class="resolution-step">
                  <div class="step-mark">②</div>
                  <div class="step-content">C从无权利者处受让，也是无权利者</div>
                </div>
                <div class="resolution-step">
                  <div class="step-mark">③</div>
                  <div class="step-content">A可以无登记对抗C</div>
                </div>
              </div>
            </div>
          </div>

          <h3>遗产分割与第三人</h3>
          <div class="inheritance-division">
            <div class="division-scenario">
              <h4>情景</h4>
              <p>A和B共同继承，协议土地归A单独所有，但B登记自己持分后卖给C</p>
            </div>
            <div class="division-resolution">
              <h4>解决</h4>
              <p>B的持分通过遗产分割已转移给A，B同时需要对A和C履行义务</p>
              <div class="resolution-note">
                这构成二重让与状态，以登记决定胜负
              </div>
            </div>
          </div>

          <h3>相续放弃与第三人</h3>
          <div class="inheritance-renunciation">
            <div class="renunciation-scenario">
              <h4>情景</h4>
              <p>A和B共同继承土地，B放弃相续但仍登记并卖给C</p>
            </div>
            <div class="renunciation-resolution">
              <h4>解决</h4>
              <div class="resolution-logic">
                <div class="logic-step">B放弃相续 → 视为从一开始就不是相续人</div>
                <div class="logic-step">B是无权利者 → C也是无权利者</div>
                <div class="logic-step">A可以无登记对抗C</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 时效完成与第三人 -->
        <section id="prescription" class="content-section">
          <h2>8. 时效完成与第三人</h2>
          
          <h3>时效完成前的第三人</h3>
          <div class="prescription-before">
            <div class="outcome-summary">
              <div class="outcome-icon">👑</div>
              <div class="outcome-content">
                <h4>时效完成者胜出</h4>
                <p>无论第三人是否有登记，时效完成者都可以对抗</p>
              </div>
            </div>
          </div>

          <h3>时效完成后的第三人</h3>
          <div class="prescription-after">
            <div class="outcome-summary">
              <div class="outcome-icon">📜</div>
              <div class="outcome-content">
                <h4>以登记决定胜负</h4>
                <p>时效完成后出现的第三人，登记在先的一方胜出</p>
              </div>
            </div>
          </div>

          <h3>记忆要点总结</h3>
          <div class="memory-summary">
            <div class="table-container">
              <table class="summary-table">
                <thead>
                  <tr>
                    <th>情况</th>
                    <th>处理规则</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>取消前的第三人</strong></td>
                    <td>欺诈：善意无过失不可对抗<br>强迫：无论善意恶意都可对抗</td>
                  </tr>
                  <tr>
                    <td><strong>取消后的第三人</strong></td>
                    <td class="registration-rule">登记！</td>
                  </tr>
                  <tr>
                    <td><strong>解除前的第三人</strong></td>
                    <td class="registration-rule">登记！</td>
                  </tr>
                  <tr>
                    <td><strong>解除后的第三人</strong></td>
                    <td class="registration-rule">登记！</td>
                  </tr>
                  <tr>
                    <td><strong>时效完成前的第三人</strong></td>
                    <td class="prescription-rule">时效完成者胜出！</td>
                  </tr>
                  <tr>
                    <td><strong>时效完成后的第三人</strong></td>
                    <td class="registration-rule">登记！</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>实用建议</h3>
          <div class="practical-tips">
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>○○后的第三人</h4>
                <p>看到"○○后"的表述，基本都要看登记！</p>
              </div>
            </div>
            <div class="tip-item">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>解除</h4>
                <p>看到"解除"，基本都要看登记！</p>
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
          <router-link to="/video?topic=property-change" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=property-change" class="action-button">
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
  { id: 'registration', title: '对抗要件', icon: '📝' },
  { id: 'double-transfer', title: '二重让与', icon: '🔄' },
  { id: 'no-registration-needed', title: '无需登记', icon: '🚫' },
  { id: 'cancellation', title: '取消', icon: '❌' },
  { id: 'rescission', title: '解除', icon: '⚔️' },
  { id: 'special-cases', title: '特殊情况', icon: '🔍' },
  { id: 'prescription', title: '时效完成', icon: '⏰' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '物権変動（ぶっけんへんどう）',
    chinese: '物权变动',
    explanation: '物权的发生、变更和消灭，如所有权的转移',
    example: 'A把房子卖给B，所有权从A转移到B'
  },
  {
    japanese: '対抗要件（たいこうようけん）',
    chinese: '对抗要件',
    explanation: '物权变动后，能够对抗第三人的法律要件',
    example: '不动产的登记，动产的交付'
  },
  {
    japanese: '登記（とうき）',
    chinese: '登记',
    explanation: '在法务局登记簿上记录相关事项，作为不动产物权变动的对抗要件',
    example: '买房后到法务局办理所有权转移登记'
  },
  {
    japanese: '二重譲渡（にじゅうじょうと）',
    chinese: '二重让与',
    explanation: '同一标的物先后让与给两个以上的受让人',
    example: 'A把同一土地先后卖给B和C'
  },
  {
    japanese: '背信的悪意者（はいしんてきあくいしゃ）',
    chinese: '背信的恶意者',
    explanation: '明知物权变动却以损害真正权利人为目的而取得权利的人',
    example: '通过欺诈、强迫手段妨碍登记申请的人'
  }
]

// 练习题数据
const quizzes = [
  {
    question: 'Aは、自己所有の建物をBに売却したが、Bはまだ所有権移転登記を行っていない。Aはこの建物をFから買い受け、FからAに対する所有権移転登記がまだ行われていない場合、Bは、Fに対し、この建物の所有権を対抗できる。（2004-3-4）',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '对卖主的前主，买主可以无登记对抗所有权。'
  },
  {
    question: 'Aは、自己所有の甲地をBに売却し、代金を受領して引渡しを終えたが、AからBに対する所有権移転登記はまだ行われていない。Aの死亡によりCが単独相続し、甲地について相続を原因とするAからCへの所有権移転登記がなされた場合、Bは、自らへの登記をしていないので、甲地の所有権をCに対抗できない。（2005-8-1）',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '对卖主的相续人，买主可以无登记对抗所有权。'
  },
  {
    question: 'Aは、自己所有の建物をBに売却したが、Bはまだ所有権移転登記を行っていない。Cが何らの権原なくこの建物を不法占有している場合、Bは、Cに対し、この建物の所有権を対抗でき、明渡しを請求できる。（2004-3-1）',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '对不法占据者，买主可以无登记对抗所有权。'
  },
  {
    question: 'A所有の甲土地につき、AとBとの間で売買契約が締結された。AがBにだまされたとして詐欺を理由にAB間の売買契約を取り消した後、Bが甲土地をAに返還せずにDに転売してDが所有権移転登記を備えても、AはDから甲土地を取り戻すことができる。（2011-1-3）',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '取消后的第三人，需要登记才能对抗。'
  },
  {
    question: 'A所有の甲土地につき、時効により所有権を取得したBは、時効完成前にAから甲土地を購入して所有権移転登記を備えたCに対して、時効による所有権の取得を主張することができない。（2012-6-1）',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '时效完成前的第三人，时效完成者胜出。'
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
  learningStore.recordTopicStudyTime('property-change', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('property-change')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('property-change')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('property-change', 0)
  
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
.property-change-page {
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

.important-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.principle-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.principle-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 对抗要件样式 ========= */
.registration-concept {
  margin-bottom: 2rem;
}

.analogy-box {
  background: #e9f7f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  border-left: 4px solid #2a7960;
}

.analogy-box h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.registration-rules {
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
  font-size: 2rem;
  flex-shrink: 0;
}

.rule-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.special-cases {
  margin: 2rem 0;
}

.case-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.case-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* ========= 二重让与样式 ========= */
.double-transfer-concept {
  margin-bottom: 2rem;
}

.conflict-scenario {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.party-a, .party-b {
  text-align: center;
  padding: 1rem;
  flex: 1;
}

.party-a h4, .party-b h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.versus {
  font-weight: bold;
  color: #6c757d;
  padding: 0 1rem;
}

.contract-info {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.solution-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.solution-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.solution-step .step-number {
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

.solution-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.case-illustration {
  margin: 2rem 0;
}

.timeline {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #2a7960;
}

.timeline-event {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 60px;
}

.timeline-event::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2a7960;
  border: 3px solid white;
}

.event-date {
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.25rem;
}

.event-content {
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.timeline-event.result .event-content {
  background: #e7f7e7;
  border-color: #2a7960;
}

/* ========= 无需登记样式 ========= */
.rights-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.category-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.category-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.category-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.category-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fff9e6;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

.category-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.illegal-occupier {
  margin: 2rem 0;
}

.occupier-scenario {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
}

.occupier-claim h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.true-owner-rights {
  margin-top: 1rem;
  padding: 1rem;
  background: #e7f7e7;
  border-radius: 4px;
}

.bad-faith {
  margin: 2rem 0;
}

.bad-faith-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.type-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.type-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.threat-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #ffe7e7;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

/* ========= 取消样式 ========= */
.cancellation-timing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.timing-case {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.timing-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-outcome {
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
}

.cannot-resist {
  background: #ffe7e7;
  color: #c62828;
}

.can-resist {
  background: #e7f7e7;
  color: #2e7d32;
}

.cancellation-scenario {
  margin: 2rem 0;
}

.scenario-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.flow-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.step-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.flow-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-detail {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.important-distinction {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.distinction-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.distinction-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 解除样式 ========= */
.rescission-before, .rescission-after {
  margin: 1.5rem 0;
}

.rule-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rule-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.rule-text h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.basic-principle {
  margin: 2rem 0;
}

.principle-highlight {
  text-align: center;
  padding: 1.5rem;
  background: #2a7960;
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.highlight-text {
  font-size: 1.25rem;
  font-weight: bold;
}

.principle-note {
  text-align: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

/* ========= 特殊情况样式 ========= */
.co-inheritance, .inheritance-division, .inheritance-renunciation {
  margin-bottom: 2rem;
}

.case-scenario, .division-scenario, .renunciation-scenario {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.case-scenario h4, .division-scenario h4, .renunciation-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-resolution, .division-resolution, .renunciation-resolution {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.case-resolution h4, .division-resolution h4, .renunciation-resolution h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.resolution-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resolution-step {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-mark {
  width: 30px;
  height: 30px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.resolution-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fff9e6;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

.resolution-logic {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.logic-step {
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
}

/* ========= 时效完成样式 ========= */
.prescription-before, .prescription-after {
  margin: 1.5rem 0;
}

.outcome-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.outcome-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.outcome-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.memory-summary {
  margin: 2rem 0;
}

.summary-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.summary-table th, .summary-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
}

.summary-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
  text-align: left;
}

.summary-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.registration-rule {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
  text-align: center;
}

.prescription-rule {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
  text-align: center;
}

.practical-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.tip-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tip-content h4 {
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
  
  .effect-timing {
    grid-template-columns: 1fr;
  }
  
  .important-principles {
    grid-template-columns: 1fr;
  }
  
  .registration-rules {
    grid-template-columns: 1fr;
  }
  
  .conflict-scenario {
    flex-direction: column;
    gap: 1rem;
  }
  
  .solution-rules {
    grid-template-columns: 1fr;
  }
  
  .rights-categories {
    grid-template-columns: 1fr;
  }
  
  .bad-faith-types {
    grid-template-columns: 1fr;
  }
  
  .cancellation-timing {
    grid-template-columns: 1fr;
  }
  
  .scenario-flow {
    grid-template-columns: 1fr;
  }
  
  .important-distinction {
    grid-template-columns: 1fr;
  }
  
  .practical-tips {
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