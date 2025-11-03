<!-- src/views/notes/rights/Agency.vue -->
<template>
  <div class="agency-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>代理</span>
        </div>
        <h1>代理</h1>
        <p>法律行为的重要制度，代理人以本人名义实施行为，效果直接归属于本人</p>
        
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
            <li>理解代理制度的基本概念和法律效力</li>
            <li>掌握无权代理的法律效果和救济措施</li>
            <li>熟悉表见代理的成立要件和法律后果</li>
            <li>了解复代理的选任条件和责任归属</li>
            <li>能够区分自己契约、双方代理和利益相反行为</li>
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

        <!-- 代理的基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 代理的基本概念</h2>
          
          <h3>代理的定义</h3>
          <div class="concept-explanation">
            <p>代理是指代理人以本人名义实施法律行为，其法律效果直接归属于本人的制度。</p>
            
            <div class="example-box">
              <h4>📝 案例说明</h4>
              <p>A想卖掉土地但工作繁忙，委托B作为代理人。B以A的名义与C签订买卖契约，契约效果直接归属于A，A与C之间成立买卖关系。</p>
            </div>
          </div>

          <h3>代理的三要件</h3>
          <div class="requirements-grid">
            <div class="requirement-item">
              <div class="req-icon">🔑</div>
              <div class="req-content">
                <h4>代理权存在</h4>
                <p>代理人必须拥有代理权</p>
              </div>
            </div>
            <div class="requirement-item">
              <div class="req-icon">🏷️</div>
              <div class="req-content">
                <h4>显名原则</h4>
                <p>代理人必须表明自己是代理人</p>
              </div>
            </div>
            <div class="requirement-item">
              <div class="req-icon">📝</div>
              <div class="req-content">
                <h4>代理行为</h4>
                <p>在代理权限范围内实施法律行为</p>
              </div>
            </div>
          </div>

          <h3>显名原则的例外</h3>
          <div class="exception-cases">
            <div class="exception-item">
              <div class="exception-type">有效</div>
              <div class="exception-content">
                <strong>对方知道代理关系：</strong>即使未显名，效果也归属本人
              </div>
            </div>
            <div class="exception-item">
              <div class="exception-type">无效</div>
              <div class="exception-content">
                <strong>对方不知道代理关系：</strong>效果归属代理人
              </div>
            </div>
          </div>

          <h3>代理关系图</h3>
          <div class="relationship-diagram">
            <div class="party">
              <h4>本人 A</h4>
              <div class="role">委托代理权</div>
            </div>
            <div class="arrow">↓</div>
            <div class="party agent">
              <h4>代理人 B</h4>
              <div class="role">以A名义签约</div>
            </div>
            <div class="arrow">↓</div>
            <div class="party">
              <h4>相对方 C</h4>
              <div class="role">与A成立契约</div>
            </div>
          </div>
        </section>

        <!-- 代理权的范围与消灭 -->
        <section id="authority-scope" class="content-section">
          <h2>2. 代理权的范围与消灭</h2>
          
          <h3>代理权的种类</h3>
          <div class="authority-types">
            <div class="type-card">
              <h4>法定代理</h4>
              <p>基于法律规定产生</p>
              <div class="type-examples">
                <div class="example">父母对未成年子女</div>
                <div class="example">监护人对被监护人</div>
              </div>
            </div>
            <div class="type-card">
              <h4>任意代理</h4>
              <p>基于本人委托产生</p>
              <div class="type-examples">
                <div class="example">委托中介卖房</div>
                <div class="example">委托律师处理事务</div>
              </div>
            </div>
          </div>

          <h3>代理权的消灭事由</h3>
          <div class="termination-table">
            <table>
              <thead>
                <tr>
                  <th>消灭事由</th>
                  <th>本人</th>
                  <th>代理人</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>死亡</td>
                  <td class="terminates">○</td>
                  <td class="terminates">○</td>
                </tr>
                <tr>
                  <td>破产</td>
                  <td class="conditional">○（仅任意代理）</td>
                  <td class="terminates">○</td>
                </tr>
                <tr>
                  <td>监护开始</td>
                  <td class="no-terminate">×</td>
                  <td class="terminates">○</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>例外情况</h3>
          <div class="exceptions-list">
            <div class="exception-item">
              <div class="exception-icon">📋</div>
              <div class="exception-text">
                <strong>登记申请的代理权：</strong>不因本人死亡而消灭
              </div>
            </div>
            <div class="exception-item">
              <div class="exception-icon">👵</div>
              <div class="exception-text">
                <strong>成年监护开始：</strong>不影响代理权效力
              </div>
            </div>
          </div>
        </section>

        <!-- 无权代理 -->
        <section id="unauthorized-agency" class="content-section">
          <h2>3. 无权代理</h2>
          
          <h3>无权代理的概念</h3>
          <div class="concept-explanation">
            <p>没有代理权却以代理人身份实施法律行为。</p>
            
            <div class="warning-box">
              <h4>⚠️ 注意</h4>
              <p>无权代理与表见代理的区别在于本人是否有归责性。</p>
            </div>
          </div>

          <h3>法律效果</h3>
          <div class="legal-effects">
            <div class="effect-flow">
              <div class="flow-step">
                <div class="step-title">原则上</div>
                <div class="step-result invalid">无效</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step">
                <div class="step-title">经本人追认</div>
                <div class="step-result valid">溯及有效</div>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-step">
                <div class="step-title">追认对象</div>
                <div class="step-result">可向无权代理人或相对方作出</div>
              </div>
            </div>
          </div>

          <h3>对相对方的保护制度</h3>
          <div class="protection-measures">
            <div class="measure-card">
              <h4>1. 催告权</h4>
              <p>要求本人在合理期间内确认是否追认</p>
              <div class="measure-details">
                <strong>特点：</strong>无论相对方善意恶意均可行使
              </div>
            </div>
            <div class="measure-card">
              <h4>2. 撤销权</h4>
              <p>在本人追认前撤销契约</p>
              <div class="measure-details">
                <strong>限制：</strong>仅限善意相对方
              </div>
            </div>
            <div class="measure-card">
              <h4>3. 履行/损害赔偿请求</h4>
              <p>向无权代理人主张权利</p>
              <div class="measure-details">
                <strong>要件：</strong>相对方需善意无过失
              </div>
            </div>
          </div>

          <h3>无权代理人的责任</h3>
          <div class="liability-rules">
            <div class="rule-item">
              <div class="rule-condition">相对方善意无过失</div>
              <div class="rule-result">可请求履行或损害赔偿</div>
            </div>
            <div class="rule-item">
              <div class="rule-condition">无权代理人恶意</div>
              <div class="rule-result">即使相对方有过失也可请求</div>
            </div>
            <div class="rule-item">
              <div class="rule-condition">无权代理人为限制行为能力者</div>
              <div class="rule-result">不可请求</div>
            </div>
          </div>
        </section>

        <!-- 表见代理 -->
        <section id="apparent-agency" class="content-section">
          <h2>4. 表见代理</h2>
          
          <h3>表见代理的成立要件</h3>
          <div class="requirements-combination">
            <div class="requirement-part">
              <div class="part-title">相对方要件</div>
              <div class="part-content highlight">善意无过失</div>
            </div>
            <div class="combination-plus">+</div>
            <div class="requirement-part">
              <div class="part-title">本人要件</div>
              <div class="part-content highlight">存在归责事由</div>
            </div>
          </div>

          <h3>表见代理的三种类型</h3>
          <div class="apparent-types">
            <div class="type-card">
              <h4>1. 授权表示型</h4>
              <p>本人曾表示授予代理权</p>
              <div class="type-example">
                <strong>例子：</strong>A曾给B委任状但已收回，B仍持委任状与C签约
              </div>
            </div>
            <div class="type-card">
              <h4>2. 权限逾越型</h4>
              <p>代理权范围外的行为</p>
              <div class="type-example">
                <strong>例子：</strong>A只赋予B设定抵押权的权限，B却直接卖掉房产
              </div>
            </div>
            <div class="type-card">
              <h4>3. 权限消灭后型</h4>
              <p>代理权消灭后仍行使代理权</p>
              <div class="type-example">
                <strong>例子：</strong>B已被解雇，仍以A代理人身份签约
              </div>
            </div>
          </div>

          <h3>法律效果</h3>
          <div class="legal-consequences">
            <div class="consequence-main">
              <div class="consequence-icon">✅</div>
              <div class="consequence-content">
                <h4>代理行为有效</h4>
                <p>效果归属本人</p>
              </div>
            </div>
            <div class="consequence-options">
              <div class="option">
                <strong>相对方可选择：</strong>
                <ul>
                  <li>向本人主张表见代理</li>
                  <li>向无权代理人追及责任</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 自己契约与双方代理 -->
        <section id="self-contract" class="content-section">
          <h2>5. 自己契约与双方代理</h2>
          
          <h3>自己契约</h3>
          <div class="self-contract-explanation">
            <p>代理人自己作为契约相对方与本人交易。</p>
            
            <div class="case-scenario">
              <div class="scenario-title">典型案例</div>
              <div class="scenario-content">
                <div class="actor">A（本人）</div>
                <div class="action">委托B卖土地</div>
                <div class="actor agent">B（代理人）</div>
                <div class="action">自己作为买主购买</div>
                <div class="result invalid">原则上禁止</div>
              </div>
            </div>
          </div>

          <h3>双方代理</h3>
          <div class="dual-agency-explanation">
            <p>同一代理人同时代理契约双方。</p>
            
            <div class="case-scenario">
              <div class="scenario-title">典型案例</div>
              <div class="scenario-content dual">
                <div class="party-group">
                  <div class="actor">A（卖方）</div>
                  <div class="action">委托B卖土地</div>
                </div>
                <div class="agent-central">
                  <div class="actor agent">B（双方代理人）</div>
                </div>
                <div class="party-group">
                  <div class="actor">C（买方）</div>
                  <div class="action">委托B买土地</div>
                </div>
                <div class="result invalid">原则上禁止</div>
              </div>
            </div>
          </div>

          <h3>例外情况</h3>
          <div class="exceptions-table">
            <table>
              <thead>
                <tr>
                  <th>类型</th>
                  <th>原则</th>
                  <th>例外</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>自己契约</strong></td>
                  <td class="prohibited">禁止</td>
                  <td class="allowed">
                    <ul>
                      <li>本人同意</li>
                      <li>债务履行</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td><strong>双方代理</strong></td>
                  <td class="prohibited">禁止</td>
                  <td class="allowed">
                    <ul>
                      <li>双方本人同意</li>
                      <li>债务履行</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td><strong>利益相反行为</strong></td>
                  <td class="prohibited">禁止</td>
                  <td class="allowed">
                    <ul>
                      <li>本人同意</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 代理行为的意思表示瑕疵 -->
        <section id="declaration-defects" class="content-section">
          <h2>6. 代理行为的意思表示瑕疵</h2>
          
          <h3>代理人受欺诈、强迫</h3>
          <div class="agent-defects">
            <div class="defect-case">
              <div class="case-title">代理人B受C的强迫</div>
              <div class="case-flow">
                <div class="step">C强迫B签约</div>
                <div class="arrow">→</div>
                <div class="step">撤销权属于B</div>
                <div class="arrow">→</div>
                <div class="step">撤销效果归属A</div>
              </div>
            </div>
          </div>

          <h3>本人受欺诈、强迫</h3>
          <div class="principal-defects">
            <div class="defect-case">
              <div class="case-title">本人A受欺诈而委托B</div>
              <div class="case-flow">
                <div class="step">A被欺诈委托B</div>
                <div class="arrow">→</div>
                <div class="step">撤销权属于A</div>
                <div class="arrow">→</div>
                <div class="step">以A意思为判断基准</div>
              </div>
            </div>
          </div>

          <h3>重要原则</h3>
          <div class="important-principle">
            <div class="principle-icon">⚖️</div>
            <div class="principle-content">
              <p>意思表示的瑕疵原则上以代理人判断，但效果归属本人。</p>
            </div>
          </div>

          <h3>伪装让渡的特殊情况</h3>
          <div class="special-case">
            <div class="case-description">
              <p>A与D通谋进行伪装让渡，代理人B善意不知情。</p>
              <div class="legal-effect">
                <strong>效果：</strong>即使代理人善意，恶意的本人A不能取得房产
              </div>
            </div>
          </div>
        </section>

        <!-- 复代理 -->
        <section id="sub-agency" class="content-section">
          <h2>7. 复代理</h2>
          
          <h3>复代理的概念</h3>
          <div class="concept-explanation">
            <p>代理人选任他人代为行使代理权。</p>
            
            <div class="relationship-chart">
              <div class="level">
                <div class="role-box principal">本人 A</div>
              </div>
              <div class="arrow-down">↓ 委托</div>
              <div class="level">
                <div class="role-box agent">代理人 B</div>
              </div>
              <div class="arrow-down">↓ 选任</div>
              <div class="level">
                <div class="role-box sub-agent">复代理人 C</div>
                <div class="note">本人的代理人，非代理人的代理人</div>
              </div>
            </div>
          </div>

          <h3>选任条件</h3>
          <div class="appointment-conditions">
            <div class="condition-card">
              <h4>法定代理</h4>
              <div class="condition-result allowed">随时可以选任</div>
            </div>
            <div class="condition-card">
              <h4>任意代理</h4>
              <div class="condition-result conditional">
                需本人同意<br>或有不得已事由
              </div>
            </div>
          </div>

          <h3>责任归属</h3>
          <div class="responsibility-rules">
            <div class="responsibility-card">
              <h4>任意代理</h4>
              <div class="responsibility-detail">
                代理人对复代理人的行为向本人负责
              </div>
            </div>
            <div class="responsibility-card">
              <h4>法定代理</h4>
              <div class="responsibility-detail">
                <div class="rule-item">原则上负全部责任</div>
                <div class="rule-item exception">不得已事由时负选任监督责任</div>
              </div>
            </div>
          </div>

          <h3>复代理的性质</h3>
          <div class="nature-rules">
            <div class="nature-item">
              <div class="nature-icon">🔒</div>
              <div class="nature-text">
                <strong>权限限制：</strong>复代理权不能超过原代理权范围
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">🔄</div>
              <div class="nature-text">
                <strong>消灭连带：</strong>原代理权消灭，复代理权随之消灭
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">👤</div>
              <div class="nature-text">
                <strong>身份归属：</strong>复代理人是本人的代理人
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
          <router-link to="/video?topic=agency" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=agency" class="action-button">
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
  { id: 'authority-scope', title: '代理权范围', icon: '🔑' },
  { id: 'unauthorized-agency', title: '无权代理', icon: '🚫' },
  { id: 'apparent-agency', title: '表见代理', icon: '👁️' },
  { id: 'self-contract', title: '自己契约', icon: '🤝' },
  { id: 'declaration-defects', title: '意思瑕疵', icon: '⚖️' },
  { id: 'sub-agency', title: '复代理', icon: '🔄' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '代理（だいり）',
    chinese: '代理',
    explanation: '代理人以本人名义实施法律行为，效果直接归属于本人',
    example: 'A委托B代为出售土地，B与C签订买卖契约，效果直接归属于A'
  },
  {
    japanese: '無権代理（むけんだいり）',
    chinese: '无权代理',
    explanation: '没有代理权却以代理人身份实施法律行为',
    example: 'B未经A授权，擅自以A的代理人身份出售A的土地'
  },
  {
    japanese: '表見代理（ひょうけんだいり）',
    chinese: '表见代理',
    explanation: '虽为无权代理，但因本人有过错而使第三人相信有代理权，代理行为有效',
    example: 'A曾给B委任状但已收回，B仍持委任状与C签约，C善意无过失'
  },
  {
    japanese: '復代理（ふくだいり）',
    chinese: '复代理',
    explanation: '代理人选任他人代为行使代理权',
    example: 'B受A委托卖房，因生病无法处理，选任C代为签约'
  },
  {
    japanese: '双方代理（そうほうだいり）',
    chinese: '双方代理',
    explanation: '同一代理人同时代理双方当事人',
    example: 'B既是卖方A的代理人，又是买方C的代理人'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '買主Aが、Bの代理人Cとの間でB所有の甲地の売買契約を締結する場合において、CがBの代理人であることをAに告げていなくても、Aがその旨を知っていれば、当該売買契約によりAは甲地を取得することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '即使代理人未显名，但相对方知道代理关系时，代理行为效果归属本人。'
  },
  {
    question: '未成年者が代理人となって締結した契約の効果は、当該行為を行うにつき当該未成年者の法定代理人による同意がなければ、有効に本人に帰属しない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '未成年人可以作为代理人，其行为效果直接归属本人，不需要法定代理人同意。'
  },
  {
    question: 'Aは、Bの代理人として、C所有の土地についてCと売買契約を締結したが、CがAをだまして売買契約をさせた場合は、Aは当該売買契約を取り消すことができるが、Bは取り消すことができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '代理人受欺诈时，撤销权属于本人B，而非代理人A。'
  },
  {
    question: 'AがBに対して、A所有の甲土地を売却する代理権を令和２年７月１日に授与した場合、Bが、Aから代理権を授与されていないA所有の乙土地の売却につき、Aの代理人としてFと売買契約を締結した場合、AがFに対して追認の意思表示をすれば、Bの代理行為は追認の時からAに対して効力を生ずる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '追认具有溯及力，效力自法律行为发生时（契约订立时）产生，而非追认时。'
  },
  {
    question: 'Aが、Bの代理人としてCとの間で、B所有の土地の売買契約を締結する場合、Bが、AにB所有土地を担保として、借金をすることしか頼んでいない場合、CがAに土地売却の代理権があると信じ、それに正当の事由があっても、BC間に売買契約は成立しない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '此情形符合表见代理（权限逾越型），如相对方善意无过失，BC间买卖契约成立。'
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
  learningStore.recordTopicStudyTime('agency', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('agency')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('agency')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('agency', 0)
  
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
.agency-page {
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
.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.req-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.req-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.req-content p {
  margin: 0;
  color: #6c757d;
}

.exception-cases {
  margin: 1.5rem 0;
}

.exception-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.75rem;
}

.exception-type {
  background: #2a7960;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.exception-content {
  flex: 1;
}

.relationship-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.party {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  min-width: 120px;
}

.party.agent {
  background: #e9f7f0;
  border-color: #2a7960;
}

.party h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.role {
  font-size: 0.875rem;
  color: #6c757d;
}

.arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

/* ========= 代理权范围样式 ========= */
.authority-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.type-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.type-card h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.type-examples {
  margin-top: 1rem;
}

.example {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.termination-table {
  margin: 1.5rem 0;
}

.termination-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.termination-table th, .termination-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.termination-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.termination-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.terminates {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.conditional {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

.no-terminate {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.exceptions-list {
  margin: 1.5rem 0;
}

.exception-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.75rem;
}

.exception-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.exception-text {
  flex: 1;
}

/* ========= 无权代理样式 ========= */
.warning-box {
  background: #fff9e6;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  border-left: 4px solid #ffcc00;
}

.warning-box h4 {
  margin: 0 0 0.5rem 0;
  color: #e65100;
}

.effect-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.flow-step {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  min-width: 120px;
}

.step-title {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.step-result {
  font-weight: bold;
}

.step-result.valid {
  color: #2e7d32;
}

.step-result.invalid {
  color: #c62828;
}

.flow-arrow {
  font-size: 1.25rem;
  color: #2a7960;
  font-weight: bold;
}

.protection-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.measure-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.measure-card h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.measure-details {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.liability-rules {
  margin: 1.5rem 0;
}

.rule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.75rem;
}

.rule-condition {
  font-weight: bold;
  color: #1a472a;
}

.rule-result {
  color: #6c757d;
}

/* ========= 表见代理样式 ========= */
.requirements-combination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.requirement-part {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  min-width: 150px;
}

.part-title {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.part-content.highlight {
  color: #2a7960;
  font-weight: bold;
  font-size: 1.125rem;
}

.combination-plus {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.apparent-types {
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
}

.type-card h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.type-example {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
}

.legal-consequences {
  margin: 2rem 0;
}

.consequence-main {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.consequence-icon {
  font-size: 2rem;
}

.consequence-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.consequence-options {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

/* ========= 自己契约样式 ========= */
.case-scenario {
  margin: 1.5rem 0;
}

.scenario-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a472a;
}

.scenario-content {
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  position: relative;
}

.scenario-content.dual {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.actor {
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  text-align: center;
  margin-bottom: 0.5rem;
}

.actor.agent {
  background: #e9f7f0;
  border-color: #2a7960;
}

.action {
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  text-align: center;
  margin-bottom: 0.5rem;
}

.party-group {
  flex: 1;
  text-align: center;
}

.agent-central {
  padding: 0 1rem;
}

.result {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #c62828;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
}

.result.invalid {
  background: #c62828;
}

.exceptions-table {
  margin: 1.5rem 0;
}

.exceptions-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.exceptions-table th, .exceptions-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
}

.exceptions-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
  text-align: center;
}

.exceptions-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.prohibited {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.allowed {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
}

.allowed ul {
  margin: 0;
  padding-left: 1.25rem;
}

.allowed li {
  margin-bottom: 0.25rem;
}

/* ========= 意思瑕疵样式 ========= */
.defect-case {
  margin: 1.5rem 0;
}

.case-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a472a;
}

.case-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  flex-wrap: wrap;
}

.step {
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  text-align: center;
  min-width: 100px;
}

.important-principle {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
  margin: 1.5rem 0;
}

.principle-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.principle-content {
  flex: 1;
}

.special-case {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.legal-effect {
  margin-top: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  font-weight: bold;
}

/* ========= 复代理样式 ========= */
.relationship-chart {
  text-align: center;
  margin: 2rem 0;
}

.level {
  margin-bottom: 1rem;
}

.role-box {
  display: inline-block;
  padding: 1rem 2rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin: 0 1rem;
}

.role-box.principal {
  background: #e9f7f0;
  border-color: #2a7960;
}

.role-box.agent {
  background: #e0f0ff;
  border-color: #1976d2;
}

.role-box.sub-agent {
  background: #fff0e0;
  border-color: #e65100;
}

.arrow-down {
  margin: 0.5rem 0;
  color: #2a7960;
  font-weight: bold;
}

.note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

.appointment-conditions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.condition-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.condition-card h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.condition-result {
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
}

.condition-result.allowed {
  background: #e7f7e7;
  color: #2e7d32;
}

.condition-result.conditional {
  background: #fff9e6;
  color: #e65100;
}

.responsibility-rules {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.responsibility-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.responsibility-card h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.responsibility-detail {
  line-height: 1.6;
}

.rule-item {
  margin-bottom: 0.5rem;
}

.rule-item.exception {
  color: #e65100;
  font-style: italic;
}

.nature-rules {
  margin: 1.5rem 0;
}

.nature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.75rem;
}

.nature-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.nature-text {
  flex: 1;
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
  
  .requirements-grid {
    grid-template-columns: 1fr;
  }
  
  .authority-types {
    grid-template-columns: 1fr;
  }
  
  .protection-measures {
    grid-template-columns: 1fr;
  }
  
  .apparent-types {
    grid-template-columns: 1fr;
  }
  
  .appointment-conditions {
    grid-template-columns: 1fr;
  }
  
  .responsibility-rules {
    grid-template-columns: 1fr;
  }
  
  .requirements-combination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .scenario-content.dual {
    flex-direction: column;
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
  
  .rule-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>