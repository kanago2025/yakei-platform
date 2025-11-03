<!-- src/views/notes/rights/PaymentAndSetoff.vue -->
<template>
  <div class="payment-setoff-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>弁济和相杀</span>
        </div>
        <h1>弁济和相杀</h1>
        <p>日本民法中的债务清偿和债权抵消制度，涉及还债的有效要件、还债代位、相杀的成立条件和禁止情形等重要内容</p>
        
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
            <li>理解弁济（还债）的基本概念和有效要件</li>
            <li>掌握可以还债的人和向谁还债有效的规则</li>
            <li>熟悉还债的提供、充当和代位的法律规定</li>
            <li>掌握相杀（抵消）的成立条件和法律效力</li>
            <li>了解相杀禁止的特殊情形和实务应用</li>
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

        <!-- 弁济的基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 弁济的基本概念</h2>
          
          <h3>弁济的定义</h3>
          <div class="concept-explanation">
            <p>弁济是指债务人按照债务内容履行义务，使债权消灭的法律行为。这是债权消灭的最主要原因。</p>
            
            <div class="example-box">
              <h4>📝 重要特征</h4>
              <ul>
                <li>原则上谁还债都可以</li>
                <li>有利害关系的第三者即使违背债务人意思，还债也有效</li>
                <li>还债后可以请求交付收据</li>
              </ul>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>保证人还债案例</h4>
                <p>A借给B 100万日元，B的保证人C替B还款给A。虽然B反对，但C作为有利害关系的第三者，还债有效，A的债权消灭。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 可以还债的人 -->
        <section id="who-can-pay" class="content-section">
          <h2>2. 可以还债的人</h2>
          
          <h3>基本原则</h3>
          <div class="heir-order">
            <p>对债权人来说，债务由谁清偿都可以，不一定非要债务人本人。</p>
            
            <div class="order-flow">
              <div class="flow-step">
                <div class="step-number">✓</div>
                <div class="step-content">
                  <h4>可以还债的人</h4>
                  <p>债务人本人、保证人、利害关系第三人等</p>
                  <div class="step-note">原则：谁都可以还债</div>
                </div>
              </div>
            </div>
          </div>

          <h3>例外情形</h3>
          <div class="important-notes">
            <div class="note-item">
              <h4>🚫 还债无效的情形</h4>
              <ul>
                <li><strong>债务性质不允许：</strong>如必须由特定人履行的债务（特定艺术家的演出、专业医生的诊疗）</li>
                <li><strong>当事人有特约：</strong>约定只能由债务人本人清偿</li>
                <li><strong>无利害关系的第三者：</strong>违背债权人或债务人意思时，还债可能无效</li>
              </ul>
            </div>
          </div>

          <h3>利害关系人的范围</h3>
          <div class="comparison-table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>✅ 有利害关系的人</th>
                  <th>❌ 无利害关系的人</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>保证人</td>
                  <td>父母</td>
                </tr>
                <tr>
                  <td>后顺位抵押权人</td>
                  <td>兄弟</td>
                </tr>
                <tr>
                  <td>第三取得者</td>
                  <td>朋友</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 向谁还债有效 -->
        <section id="valid-payment" class="content-section">
          <h2>3. 向谁还债有效</h2>
          
          <h3>基本原则</h3>
          <div class="concept-explanation">
            <p>向债权人或其代理人还债有效。基于法令规定或当事人意思表示，向有受领权者还债时，债权消灭。</p>
          </div>

          <h3>表见还债</h3>
          <div class="example-box">
            <h4>📝 表见还债的概念</h4>
            <p>债务者向非真正债权者还债，但基于某种外观表现，债务者善意无过失时，还债有效。</p>
          </div>

          <div class="case-scenario">
            <h4>典型案例分析</h4>
            <div class="scenario-steps">
              <div class="scenario-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p><strong>A是债权人</strong>，持有对B的债权</p>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p><strong>C拿着A的印章和存折</strong>，外观上像债权人</p>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p><strong>B善意地向C还债</strong>，基于交易通念，还债有效</p>
                </div>
              </div>
            </div>
            <div class="scenario-result">
              <p><strong>结果：</strong>虽然C不是真正债权人，但B善意无过失，还债有效，A的债权消灭。</p>
            </div>
          </div>
        </section>

        <!-- 还债的提供和方法 -->
        <section id="payment-offer" class="content-section">
          <h2>4. 还债的提供和方法</h2>
          
          <h3>还债提供的意义</h3>
          <div class="concept-explanation">
            <p>债务人做好还债准备并催告债权人受领：</p>
            <ul>
              <li>可以对抗同时履行抗辩权</li>
              <li>免除债务不履行责任</li>
            </ul>
          </div>

          <h3>提供方法</h3>
          <div class="payment-methods">
            <div class="method-item">
              <div class="method-icon">💵</div>
              <div class="method-content">
                <h4>现实提供</h4>
                <p>拿着钱或目的物去债权人处交付</p>
                <div class="method-note">原则方法</div>
              </div>
            </div>
            <div class="method-item">
              <div class="method-icon">🗣️</div>
              <div class="method-content">
                <h4>口头提供</h4>
                <p>债权人拒绝受领时，通知还债准备完毕</p>
                <div class="method-note">例外方法</div>
              </div>
            </div>
          </div>

          <div class="important-notes">
            <div class="note-item">
              <h4>⚠️ 重要注意</h4>
              <p>自开支票因缺乏支付确实性，不能算作现实提供。（判例）</p>
            </div>
          </div>
        </section>

        <!-- 还债的充当 -->
        <section id="payment-allocation" class="content-section">
          <h2>5. 还债的充当</h2>
          
          <h3>场景说明</h3>
          <div class="concept-explanation">
            <p>同一债权人对债务人持有多笔债权时，部分还债不足以消灭所有债务，需要确定偿还哪笔债务。</p>
            
            <div class="example-box">
              <h4>📝 具体场景</h4>
              <p>B买房子时借了A 100万，B买汽车时又借了A 80万。当B手里只有50万想先还一部分时，这50万用来还哪笔债务？</p>
            </div>
          </div>

          <h3>充当顺序</h3>
          <div class="allocation-order">
            <div class="allocation-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>合意充当最优先</h4>
                <p>债权人和债务人协商决定</p>
                <div class="step-note">双方合意</div>
              </div>
            </div>
            <div class="allocation-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>指定充当</h4>
                <p>无合意时，债权人或债务人指定</p>
                <div class="step-note">单方指定</div>
              </div>
            </div>
            <div class="allocation-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>法定充当</h4>
                <p>无指定时，依法定顺序：费用 → 利息 → 本金</p>
                <div class="step-note">法律强制</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 还债代位和代物还债 -->
        <section id="subrogation" class="content-section">
          <h2>6. 还债代位和代物还债</h2>
          
          <h3>还债代位</h3>
          <div class="concept-explanation">
            <p>第三人还债后，在其求偿权范围内代位行使原债权人的权利。</p>
          </div>

          <h3>还债代位要件</h3>
          <div class="subrogation-conditions">
            <div class="condition-item">
              <div class="condition-icon">✅</div>
              <div class="condition-content">
                <h4>有正当利益的第三者</h4>
                <p>还债后自动代位</p>
                <div class="condition-status">自动代位</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">🔄</div>
              <div class="condition-content">
                <h4>无正当利益的第三者</h4>
                <p>需要债权人通知或债务人承诺</p>
                <div class="condition-status">需要对抗要件</div>
              </div>
            </div>
          </div>

          <h3>代物还债</h3>
          <div class="example-box">
            <h4>📝 代物还债案例</h4>
            <p>债权者A借给债务者B 10万日元，B没有钱还时，B可以把自己价值10万日元的电脑给债权者A，也可以抵消债务。</p>
            <p><strong>要件：</strong>需要当事人合意</p>
          </div>
        </section>

        <!-- 相杀的基本概念和条件 -->
        <section id="setoff-basics" class="content-section">
          <h2>7. 相杀的基本概念和条件</h2>
          
          <h3>相杀的定义</h3>
          <div class="concept-explanation">
            <p>两人互负同种债务时，各以其债权充当债务的清偿，从而使各自的债务在对等额度内相互消灭。</p>
          </div>

          <h3>相杀适状要件</h3>
          <div class="setoff-conditions">
            <div class="condition-item">
              <div class="condition-icon">1</div>
              <div class="condition-content">
                <h4>债权对立</h4>
                <p>AB互负债务</p>
                <div class="condition-status">必须满足</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">2</div>
              <div class="condition-content">
                <h4>债权同种</h4>
                <p>同为金钱债务等</p>
                <div class="condition-status">必须满足</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">3</div>
              <div class="condition-content">
                <h4>债权有效</h4>
                <p>即使在时效完成前为相杀适状，时效完成后仍可相杀</p>
                <div class="condition-status">必须满足</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">4</div>
              <div class="condition-content">
                <h4>均已到期</h4>
                <p>双方债务均到清偿期</p>
                <div class="condition-status">原则要求</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">5</div>
              <div class="condition-content">
                <h4>性质允许</h4>
                <p>债务性质允许相杀</p>
                <div class="condition-status">必须满足</div>
              </div>
            </div>
          </div>

          <h3>自动债权和受动债权</h3>
          <div class="example-box">
            <h4>📝 概念说明</h4>
            <p><strong>自动债权：</strong>主张相杀一方持有的债权</p>
            <p><strong>受动债权：</strong>被主张相杀一方持有的债权</p>
            <p><strong>谁主张，谁的债权就是自动债权</strong></p>
          </div>
        </section>

        <!-- 相杀的禁止情形 -->
        <section id="setoff-prohibition" class="content-section">
          <h2>8. 相杀的禁止情形</h2>
          
          <h3>不法行为加害者</h3>
          <div class="prohibition-cases">
            <div class="case-item">
              <div class="case-icon">🚗</div>
              <div class="case-content">
                <h4>恶意的不法行为</h4>
                <p>A对B有100万债权，AB发生矛盾，A砸了B的车，汽车修理费100万</p>
                <div class="case-result">
                  <p><strong>加害者A不能主张相杀</strong>，但被害者B可以主张相杀</p>
                </div>
              </div>
            </div>
            <div class="case-item">
              <div class="case-icon">🏥</div>
              <div class="case-content">
                <h4>人身侵害的损害赔偿</h4>
                <p>A对B有100万债权，A开车不小心撞了B，医药费100万</p>
                <div class="case-result">
                  <p><strong>加害者A不能主张相杀</strong>，被害者B可以主张相杀</p>
                </div>
              </div>
            </div>
          </div>

          <h3>债权冻结</h3>
          <div class="freeze-scenario">
            <h4>冻结后取得债权的相杀禁止</h4>
            <div class="scenario-steps">
              <div class="scenario-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p>B借给A日元100万（B得到对A的债权）</p>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p>B从C借款100万，B的对A债权被冻结</p>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p>B从A借款100万（A得到对B的债权）</p>
                </div>
              </div>
            </div>
            <div class="scenario-result warning">
              <p><strong>结果：</strong>A的债权是在B的受动债权冻结后取得的，所以A不能主张相杀</p>
            </div>
          </div>

          <div class="freeze-scenario">
            <h4>冻结前取得债权的相杀允许</h4>
            <div class="scenario-steps">
              <div class="scenario-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <p>B借给A日元100万（B得到对A的债权）</p>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <p>B从A借款100万（AB互相持有债权）</p>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <p>B从C借款100万，B的对A债权被冻结</p>
                </div>
              </div>
            </div>
            <div class="scenario-result success">
              <p><strong>结果：</strong>A的债权是在B的受动债权冻结前得到的，所以A可以主张相杀</p>
            </div>
          </div>
        </section>

        <!-- 相杀的方法和效力 -->
        <section id="setoff-method" class="content-section">
          <h2>9. 相杀的方法和效力</h2>
          
          <h3>法律性质</h3>
          <div class="legal-nature">
            <div class="nature-item">
              <div class="nature-icon">⚡</div>
              <div class="nature-content">
                <h4>形成权</h4>
                <p>单方意思表示即可产生法律效果</p>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">↩️</div>
              <div class="nature-content">
                <h4>溯及效力</h4>
                <p>效力溯及至相杀适状之时</p>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">🚫</div>
              <div class="nature-content">
                <h4>无条件性</h4>
                <p>不能附带条件或期限</p>
              </div>
            </div>
          </div>

          <h3>禁止附条件和期限的理由</h3>
          <div class="prohibition-reasons">
            <div class="reason-item">
              <h4>如果允许附条件</h4>
              <p>相杀的效力将变得不确定，因为条件的成就与否是不确定的，这将导致相杀的效果也处于不确定状态。</p>
            </div>
            <div class="reason-item">
              <h4>如果允许附期限</h4>
              <p>相杀的效力将被推迟到某一特定时间点，这不仅违背了相杀的即时性原则，还可能引发更多的法律纠纷。</p>
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
          <router-link to="/video?topic=payment-setoff" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=payment-setoff" class="action-button">
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
  { id: 'basic-concepts', title: '弁济基本概念', icon: '📖' },
  { id: 'who-can-pay', title: '可以还债的人', icon: '👥' },
  { id: 'valid-payment', title: '向谁还债有效', icon: '✅' },
  { id: 'payment-offer', title: '还债的提供', icon: '💵' },
  { id: 'payment-allocation', title: '还债的充当', icon: '📊' },
  { id: 'subrogation', title: '还债代位', icon: '🔄' },
  { id: 'setoff-basics', title: '相杀基本概念', icon: '⚖️' },
  { id: 'setoff-prohibition', title: '相杀禁止', icon: '🚫' },
  { id: 'setoff-method', title: '相杀方法', icon: '⚡' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '弁济（べんさい）',
    chinese: '还债/债务清偿',
    explanation: '债务人按照债务内容履行义务，使债权消灭的行为',
    example: 'A借给B 10万日元，B还款给A，债务消灭'
  },
  {
    japanese: '相殺（そうさい）',
    chinese: '抵消',
    explanation: '两人互负同种债务时，各以其债权充当债务的清偿',
    example: 'A欠B 10万，B欠A 8万，相杀后A只需还B 2万'
  },
  {
    japanese: '弁済による代位（べんさいによるだいい）',
    chinese: '还债代位',
    explanation: '第三人还债后，在其求偿权范围内代位行使原债权人的权利',
    example: '保证人C替债务人B还债后，可以代位向B行使债权'
  },
  {
    japanese: '代物弁済（だいぶつべんさい）',
    chinese: '代物还债',
    explanation: '以他物代替原定给付来清偿债务',
    example: 'B欠A 10万，用价值10万的电脑抵债'
  },
  {
    japanese: '相殺適状（そうさいてきじょう）',
    chinese: '相杀适状',
    explanation: '满足相杀成立要件的状态',
    example: 'AB互负金钱债务，且均已到期，处于可相杀状态'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '債務の性質が第三者による弁済を許さない場合、利害関係のない第三者が債務者の意思に反して弁済しても、その弁済は有効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '债务性质不允许第三者还债时，即使是有利害关系的第三者违背债务人意思还债也无效。'
  },
  {
    question: '相殺は、双方の債務が弁済期にあるときにのみすることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '自动债权到期时，即使受动债权未到期，如果自动债权人主张相杀，视为受动债权人放弃期限利益，也可以相杀。'
  },
  {
    question: '不法行為による損害賠償債務は、被害者側から相殺を主張することはできるが、加害者側から相殺を主張することはできない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '不法行为的损害赔偿债务，被害者可以主张相杀，但加害者不能主张相杀。'
  },
  {
    question: '債権が差し押さえられた後で取得した自動債権をもって、差し押さえられた受動債権と相殺することはできる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '债权被冻结后取得的自动债权，不能与被冻结的受动债权相杀，否则失去债权冻结的意义。'
  },
  {
    question: '相殺の意思表示には、条件や期限を付けることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '相杀是形成权，基于其即时性和无条件性的本质，不能附带条件或期限。'
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
  learningStore.recordTopicStudyTime('payment-setoff', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('payment-setoff')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('payment-setoff')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('payment-setoff', 0)
  
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
.payment-setoff-page {
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

/* ========= 可以还债的人样式 ========= */
.heir-order {
  margin-bottom: 2rem;
}

.order-flow {
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

.important-notes {
  margin: 1.5rem 0;
}

.note-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.note-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.note-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.note-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.comparison-table-container {
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

/* ========= 向谁还债有效样式 ========= */
.case-scenario {
  margin: 2rem 0;
}

.scenario-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.scenario-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.scenario-step .step-number {
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

.scenario-step p {
  margin: 0;
}

.scenario-result {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.scenario-result.warning {
  background: #fff9e6;
  border-left: 4px solid #ffcc00;
}

.scenario-result.success {
  background: #e7f7e7;
  border-left: 4px solid #2e7d32;
}

/* ========= 还债的提供和方法样式 ========= */
.payment-methods {
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

.method-note {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

/* ========= 还债的充当样式 ========= */
.allocation-order {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.allocation-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.allocation-step .step-number {
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

.allocation-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.allocation-step p {
  margin: 0 0 1rem 0;
  color: #6c757d;
}

/* ========= 还债代位样式 ========= */
.subrogation-conditions {
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

.condition-status {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
}

.condition-status.can-substitute {
  background: #e7f7e7;
  color: #2e7d32;
}

.condition-status.cannot-substitute {
  background: #ffe7e7;
  color: #c62828;
}

/* ========= 相杀基本概念样式 ========= */
.setoff-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.setoff-conditions .condition-item {
  text-align: center;
}

.setoff-conditions .condition-icon {
  width: 40px;
  height: 40px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto;
}

/* ========= 相杀禁止样式 ========= */
.prohibition-cases {
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

.case-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.case-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-content p {
  margin: 0 0 1rem 0;
  color: #6c757d;
}

.case-result {
  padding: 1rem;
  background: #fff9e6;
  border-radius: 4px;
  font-weight: bold;
}

.freeze-scenario {
  margin: 2rem 0;
}

/* ========= 相杀方法样式 ========= */
.legal-nature {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.nature-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.nature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.nature-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.prohibition-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.reason-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.reason-item h4 {
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
  
  .order-flow {
    grid-template-columns: 1fr;
  }
  
  .payment-methods {
    grid-template-columns: 1fr;
  }
  
  .allocation-order {
    grid-template-columns: 1fr;
  }
  
  .subrogation-conditions {
    grid-template-columns: 1fr;
  }
  
  .setoff-conditions {
    grid-template-columns: 1fr;
  }
  
  .prohibition-cases {
    grid-template-columns: 1fr;
  }
  
  .legal-nature {
    grid-template-columns: 1fr;
  }
  
  .prohibition-reasons {
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