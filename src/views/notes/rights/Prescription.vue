<!-- src/views/notes/rights/Prescription.vue -->
<template>
  <div class="prescription-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>时效</span>
        </div>
        <h1>时效</h1>
        <p>因时间的经过而引起权利变动的法律制度，包括取得时效和消灭时效</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">12</span>
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
            <li>理解时效制度的基本概念和存在理由</li>
            <li>掌握取得时效的成立要件和占有期间计算</li>
            <li>熟悉消灭时效的期间计算和中断事由</li>
            <li>了解时效的更新、完成犹予制度</li>
            <li>掌握时效的援用、放弃规则及其法律效果</li>
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

        <!-- 时效基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 时效的基本概念</h2>
          
          <h3>时效的定义与种类</h3>
          <div class="concept-explanation">
            <p>时效是指因一定期间的经过而引起权利关系变动的法律制度。时效制度的存在理由包括：</p>
            <ul>
              <li>对长期事实关系的信赖保护</li>
              <li>不保护"躺在权利上睡觉的人"</li>
              <li>节省司法资源，维护社会安定</li>
            </ul>
            
            <div class="prescription-types">
              <div class="type-card">
                <div class="type-icon">📈</div>
                <div class="type-content">
                  <h4>取得时效</h4>
                  <p>时间经过 → 取得权利</p>
                  <p class="type-desc">占有他人之物满足一定条件后取得所有权</p>
                </div>
              </div>
              <div class="type-card">
                <div class="type-icon">📉</div>
                <div class="type-content">
                  <h4>消灭时效</h4>
                  <p>时间经过 → 丧失权利</p>
                  <p class="type-desc">权利人在一定期间内不行使权利导致权利消灭</p>
                </div>
              </div>
            </div>
          </div>

          <h3>可通过时效取得的权利</h3>
          <div class="acquirable-rights">
            <div class="rights-grid">
              <div class="right-item">
                <div class="right-icon">🏠</div>
                <div class="right-name">所有权</div>
              </div>
              <div class="right-item">
                <div class="right-icon">📝</div>
                <div class="right-name">地上权</div>
              </div>
              <div class="right-item">
                <div class="right-icon">🔑</div>
                <div class="right-name">永佃权</div>
              </div>
              <div class="right-item">
                <div class="right-icon">🛣️</div>
                <div class="right-name">地役权</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 取得时效 -->
        <section id="acquisitive-prescription" class="content-section">
          <h2>2. 取得时效</h2>
          
          <h3>成立要件</h3>
          <div class="requirements">
            <div class="requirement-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>以所有的意思占有</h4>
                <p>将自己的物作为自己所有而占有的意思</p>
                <div class="example-box">
                  <strong>例子：</strong>租赁的情况下，无论占有多少年都无法通过时效取得，因为缺乏"所有的意思"
                </div>
              </div>
            </div>
            <div class="requirement-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>平稳且公然占有</h4>
                <p>不是通过暴力手段取得，也不是秘密占有</p>
                <div class="example-box">
                  <strong>例子：</strong>公开在土地上建造房屋并居住
                </div>
              </div>
            </div>
            <div class="requirement-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>满足占有期间</h4>
                <div class="timing-table">
                  <table>
                    <thead>
                      <tr>
                        <th>占有开始时的状态</th>
                        <th>所需期间</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>善意无过失</td>
                        <td class="highlight">10年</td>
                      </tr>
                      <tr>
                        <td>善意有过失・恶意</td>
                        <td class="highlight">20年</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <h3>占有期间的特别计算</h3>
          <div class="special-calculation">
            <div class="calculation-case">
              <h4>案例1：出租期间的计算</h4>
              <div class="case-flow">
                <div class="flow-step">
                  <div class="step-label">A自主占有</div>
                  <div class="step-duration">7年</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-label">出租给B</div>
                  <div class="step-duration">3年</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-label">时效完成</div>
                  <div class="step-result">A取得所有权</div>
                </div>
              </div>
              <p class="case-note">※ 出租期间也计入占有期间，因为A通过B继续占有</p>
            </div>

            <div class="calculation-case">
              <h4>案例2：占有承继的计算</h4>
              <div class="case-flow">
                <div class="flow-step">
                  <div class="step-label">A善意无过失占有</div>
                  <div class="step-duration">7年</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-label">B继承（恶意）</div>
                  <div class="step-duration">3年</div>
                </div>
                <div class="flow-arrow">→</div>
                <div class="flow-step">
                  <div class="step-label">时效完成</div>
                  <div class="step-result">B取得所有权</div>
                </div>
              </div>
              <p class="case-note">※ 占有承继时，善意恶意看占有开始时的状态，B只需再占有3年即可完成时效</p>
            </div>
          </div>

          <h3>占有承继的特殊规则</h3>
          <div class="succession-rules">
            <div class="rule-item">
              <div class="rule-icon">⚠️</div>
              <div class="rule-content">
                <h4>瑕疵承继原则</h4>
                <p>占有承继人承继前主的占有瑕疵（如恶意）</p>
              </div>
            </div>
            <div class="rule-item">
              <div class="rule-icon">✅</div>
              <div class="rule-content">
                <h4>期间合并计算</h4>
                <p>承继人可以将自己的占有期间与前主的占有期间合并计算</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 消灭时效 -->
        <section id="extinctive-prescription" class="content-section">
          <h2>3. 消灭时效</h2>
          
          <h3>消灭时效的期间</h3>
          <div class="extinctive-periods">
            <div class="period-diagram">
              <div class="period-path">
                <div class="period-start">
                  <div class="period-label">权利行使可能时</div>
                  <div class="period-arrow">↓</div>
                  <div class="period-duration">10年</div>
                </div>
                <div class="period-divider">或</div>
                <div class="period-start">
                  <div class="period-label">知道权利时</div>
                  <div class="period-arrow">↓</div>
                  <div class="period-duration">5年</div>
                </div>
              </div>
              <div class="period-result">时效完成</div>
            </div>
            <p class="period-note">※ 以较早到达的期间为准</p>
          </div>

          <h3>"权利行使可能时"的解释</h3>
          <div class="exercisable-time">
            <div class="time-table">
              <table>
                <thead>
                  <tr>
                    <th>债务类型</th>
                    <th>例子</th>
                    <th>消灭时效开始</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>确定期限付债务</td>
                    <td>4月1日交货</td>
                    <td>期限到来时</td>
                  </tr>
                  <tr>
                    <td>不确定期限付债务</td>
                    <td>A的父亲死亡时交货</td>
                    <td>期限到来时</td>
                  </tr>
                  <tr>
                    <td>停止条件付债务</td>
                    <td>A考试合格时交货</td>
                    <td>条件成就时</td>
                  </tr>
                  <tr>
                    <td>无期限债务</td>
                    <td>—</td>
                    <td>立即开始</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>特殊债权的消灭时效</h3>
          <div class="special-debts">
            <div class="debt-type">
              <h4>生命健康损害赔偿债权</h4>
              <div class="debt-periods">
                <div class="debt-period">
                  <div class="period-condition">知道损害时</div>
                  <div class="period-arrow">→</div>
                  <div class="period-years">5年</div>
                </div>
                <div class="debt-period">
                  <div class="period-condition">权利行使可能时</div>
                  <div class="period-arrow">→</div>
                  <div class="period-years">20年</div>
                </div>
              </div>
              <p class="debt-note">※ 考虑到慢性病可能多年后才被发现，特意延长至20年</p>
            </div>
          </div>

          <h3>不适用消灭时效的权利</h3>
          <div class="non-extinctive">
            <div class="non-extinctive-item">
              <div class="item-icon">🏠</div>
              <div class="item-content">
                <h4>所有权</h4>
                <p>所有权不因消灭时效而消灭，即使30年未使用的别墅，所有者仍然是所有者</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 时效的更新与完成犹予 -->
        <section id="prescription-renewal" class="content-section">
          <h2>4. 时效的更新与完成犹予</h2>
          
          <h3>基本概念区分</h3>
          <div class="renewal-concepts">
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <div class="concept-content">
                <h4>时效的更新</h4>
                <p>将已经经过的期间归零，重新开始计算</p>
              </div>
            </div>
            <div class="concept-card">
              <div class="concept-icon">⏸️</div>
              <div class="concept-content">
                <h4>时效的完成犹予</h4>
                <p>时效完成过程暂停，期间停止计算</p>
              </div>
            </div>
          </div>

          <h3>裁判上的请求</h3>
          <div class="judicial-request">
            <div class="request-flow">
              <div class="flow-step">
                <div class="step-icon">⚖️</div>
                <div class="step-content">
                  <h4>提起诉讼</h4>
                  <p class="step-effect">→ 时效完成犹予</p>
                </div>
              </div>
              <div class="flow-branch">
                <div class="branch-option">
                  <div class="option-icon">✅</div>
                  <div class="option-content">
                    <h5>胜诉</h5>
                    <p class="option-effect">→ 时效更新</p>
                  </div>
                </div>
                <div class="branch-option">
                  <div class="option-icon">❌</div>
                  <div class="option-content">
                    <h5>撤诉・驳回</h5>
                    <p class="option-effect">→ 6个月完成犹予</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>其他中断事由</h3>
          <div class="other-interruptions">
            <div class="interruption-item">
              <div class="interruption-icon">📨</div>
              <div class="interruption-content">
                <h4>裁判外请求（催告）</h4>
                <p>发送内容证明邮件等 → <strong>6个月完成犹予</strong></p>
                <p class="interruption-note">※ 只能使用一次，再次催告无效</p>
              </div>
            </div>
            <div class="interruption-item">
              <div class="interruption-icon">🤝</div>
              <div class="interruption-content">
                <h4>承认</h4>
                <p>债务人承认债务 → <strong>时效更新</strong></p>
                <div class="acknowledgment-examples">
                  <div class="example">
                    <div class="example-icon">💰</div>
                    <div class="example-text">债务的部分清偿</div>
                  </div>
                  <div class="example">
                    <div class="example-icon">⏳</div>
                    <div class="example-text">请求支付延期</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="interruption-item">
              <div class="interruption-icon">🛡️</div>
              <div class="interruption-content">
                <h4>临时扣押・财产保全</h4>
                <p>申请财产保全 → <strong>6个月完成犹予</strong></p>
              </div>
            </div>
          </div>
        </section>

        <!-- 时效的援用与放弃 -->
        <section id="prescription-invocation" class="content-section">
          <h2>5. 时效的援用与放弃</h2>
          
          <h3>时效的援用</h3>
          <div class="invocation-explanation">
            <div class="invocation-principle">
              <div class="principle-icon">ℹ️</div>
              <div class="principle-content">
                <h4>援用的必要性</h4>
                <p>时效完成后不会自动产生效果，必须由当事人主张（援用）才能享受时效利益</p>
              </div>
            </div>

            <div class="invocation-process">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>时效完成</h4>
                  <p>经过法定期间，时效条件满足</p>
                </div>
              </div>
              <div class="process-arrow">→</div>
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>可选择状态</h4>
                  <p>当事人可以选择是否使用时效利益</p>
                </div>
              </div>
              <div class="process-arrow">→</div>
              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>援用意思表示</h4>
                  <p>"我要使用时效利益"的意思表示</p>
                </div>
              </div>
            </div>
          </div>

          <h3>可以援用时效的人</h3>
          <div class="invocation-persons">
            <div class="persons-grid">
              <div class="person-item">
                <div class="person-icon">👤</div>
                <div class="person-name">债务人</div>
              </div>
              <div class="person-item">
                <div class="person-icon">🤝</div>
                <div class="person-name">保证人</div>
              </div>
              <div class="person-item">
                <div class="person-icon">🏢</div>
                <div class="person-name">物上保证人</div>
              </div>
              <div class="person-item">
                <div class="person-icon">🔑</div>
                <div class="person-name">抵押不动产第三取得者</div>
              </div>
            </div>
            <p class="persons-note">※ 必须是因时效而直接受益的人</p>
          </div>

          <h3>时效利益的放弃</h3>
          <div class="abandonment-rules">
            <div class="abandonment-timing">
              <div class="timing-item invalid">
                <div class="timing-icon">🚫</div>
                <div class="timing-content">
                  <h4>时效完成前</h4>
                  <p>不得放弃时效利益（放弃特约无效）</p>
                </div>
              </div>
              <div class="timing-item valid">
                <div class="timing-icon">✅</div>
                <div class="timing-content">
                  <h4>时效完成后</h4>
                  <p>可以放弃时效利益</p>
                </div>
              </div>
            </div>

            <div class="abandonment-effect">
              <h4>承认的特殊效果</h4>
              <div class="effect-warning">
                <div class="warning-icon">⚠️</div>
                <div class="warning-content">
                  <p>时效完成后，债务人即使不知道时效完成而承认债务，也不能再援用时效</p>
                </div>
              </div>
            </div>
          </div>

          <h3>时效的溯及效</h3>
          <div class="retroactive-effect">
            <div class="retroactive-principle">
              <div class="principle-icon">↩️</div>
              <div class="principle-content">
                <h4>效果追溯到起算日</h4>
                <p>时效完成后，其法律效果追溯到时效期间的起算日</p>
              </div>
            </div>

            <div class="retroactive-examples">
              <div class="example-item">
                <h4>取得时效的场合</h4>
                <p>视为从一开始就是所有者 → 不需要损害赔偿</p>
              </div>
              <div class="example-item">
                <h4>消灭时效的场合</h4>
                <p>视为从一开始就没有借贷关系 → 不需要支付迟延损害金</p>
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
          <router-link to="/video?topic=prescription" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=prescription" class="action-button">
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
  { id: 'acquisitive-prescription', title: '取得时效', icon: '📈' },
  { id: 'extinctive-prescription', title: '消灭时效', icon: '📉' },
  { id: 'prescription-renewal', title: '更新与犹予', icon: '🔄' },
  { id: 'prescription-invocation', title: '援用与放弃', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '取得時効（しゅとくじこう）',
    chinese: '取得时效',
    explanation: '因一定期间的持续占有而取得权利的制度',
    example: '占有他人土地20年后取得该土地所有权'
  },
  {
    japanese: '消滅時効（しょうめつじこう）',
    chinese: '消灭时效',
    explanation: '因权利人在一定期间内不行使权利而导致权利消灭的制度',
    example: '借款10年内未主张权利，债权消灭'
  },
  {
    japanese: '時効の援用（じこうのえんよう）',
    chinese: '时效的援用',
    explanation: '主张享受时效利益的意思表示',
    example: '债务人主张"因时效完成，我不需要偿还债务"'
  },
  {
    japanese: '時効の更新（じこうのこうしん）',
    chinese: '时效的更新',
    explanation: '因特定事由使已经经过的时效期间归零，重新开始计算',
    example: '债务人承认债务后，消灭时效期间重新计算'
  },
  {
    japanese: '時効の完成猶予（じこうのかんせいゆうよ）',
    chinese: '时效的完成犹予',
    explanation: '因特定事由使时效完成过程暂停',
    example: '提起诉讼后，时效完成过程暂停'
  }
]

// 练习题数据
const quizzes = [
  {
    question: 'ＡがＢの所有地を長期間占有している。Ａが善意無過失で占有を開始し、所有の意思をもって、平穏かつ公然に７年間占有を続けた後、Ｃに３年間賃貸した場合、Ａは、その土地の所有権を時効取得することはできない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '出租期间也计入占有期间，因为A通过C继续占有，合计10年满足取得时效要件。'
  },
  {
    question: 'Ａ所有の土地の占有者がＡからＢ、ＢからＣと移った。Ｂが平穏・公然・善意・無過失に所有の意思をもって８年間占有し、ＣがＢから土地の譲渡を受けて２年間占有した場合、当該土地の真の所有者はＢではなかったとＣが知っていたとしても、Ｃは10年の取得時効を主張できる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '占有承继时，善意恶意看占有开始时的状态，B是善意无过失，C只需再占有2年即可完成10年取得时效。'
  },
  {
    question: 'Ｂは、Ａ所有の土地をＡのものであると知って占有を続け、この土地の所有権を時効により取得した。この場合において、Ｂが所有権を取得した時点は、時効が完成したときである。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '时效具有溯及效，效果追溯到起算日，不是时效完成时。'
  },
  {
    question: 'Aは、Bに対し建物を賃貸し、月額10万円の賃料債権を有している。Aが、Bに対する賃料債権につき内容証明郵便により支払を請求したときは、その請求により消滅時効は更新する。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '裁判外请求（催告）只产生6个月的完成犹予，不产生时效更新效果。'
  },
  {
    question: 'Aは、Bに対し建物を賃貸し、月額10万円の賃料債権を有している。Bが、賃料債権の消滅時効が完成した後にその賃料債権を承認したときは、消滅時効の完成を知らなかったときでも、その完成した消滅時効の援用をすることは許されない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '时效完成后承认债务，即使不知道时效完成的事实，基于诚信原则也不能再援用时效。'
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
  learningStore.recordTopicStudyTime('prescription', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('prescription')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('prescription')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('prescription', 0)
  
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
.prescription-page {
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
.prescription-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.type-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.type-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.type-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.type-content p {
  margin: 0;
}

.type-desc {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.acquirable-rights {
  margin: 1.5rem 0;
}

.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.right-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.right-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.right-name {
  font-weight: 600;
  color: #1a472a;
}

/* ========= 取得时效样式 ========= */
.requirements {
  margin: 1.5rem 0;
}

.requirement-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

.example-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
}

.timing-table {
  margin-top: 1rem;
}

.timing-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.timing-table th, .timing-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.timing-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.timing-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.highlight {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.special-calculation {
  margin: 2rem 0;
}

.calculation-case {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.calculation-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
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

.step-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.step-duration, .step-result {
  font-size: 0.875rem;
  color: #6c757d;
}

.flow-arrow {
  font-size: 1.25rem;
  color: #2a7960;
  font-weight: bold;
}

.case-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 0.5rem;
}

.succession-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
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
  font-size: 1.5rem;
  flex-shrink: 0;
}

.rule-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rule-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 消灭时效样式 ========= */
.extinctive-periods {
  margin: 1.5rem 0;
}

.period-diagram {
  text-align: center;
  padding: 2rem;
  background: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #a8c6ff;
}

.period-path {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.period-start {
  text-align: center;
}

.period-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.period-arrow {
  font-size: 1.25rem;
  color: #2a7960;
  margin: 0.5rem 0;
}

.period-duration {
  font-weight: bold;
  color: #2a7960;
  font-size: 1.125rem;
}

.period-divider {
  font-weight: bold;
  color: #6c757d;
}

.period-result {
  font-weight: bold;
  color: #2a7960;
  font-size: 1.25rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 8px;
  display: inline-block;
  border: 2px solid #2a7960;
}

.period-note {
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 1rem;
}

.exercisable-time {
  margin: 1.5rem 0;
}

.time-table {
  overflow-x: auto;
}

.time-table table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.time-table th, .time-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.time-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.time-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.special-debts {
  margin: 2rem 0;
}

.debt-type {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.debt-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.debt-periods {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.debt-period {
  text-align: center;
}

.period-condition {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.period-arrow {
  font-size: 1.25rem;
  color: #2a7960;
  margin: 0.5rem 0;
}

.period-years {
  font-weight: bold;
  color: #2a7960;
  font-size: 1.125rem;
}

.debt-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 1rem;
}

.non-extinctive {
  margin: 1.5rem 0;
}

.non-extinctive-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border: 1px solid #ffcc00;
}

.item-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.item-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.item-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 时效更新样式 ========= */
.renewal-concepts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.concept-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.concept-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.concept-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.concept-content p {
  margin: 0;
  color: #6c757d;
}

.judicial-request {
  margin: 2rem 0;
}

.request-flow {
  padding: 2rem;
  background: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #a8c6ff;
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-effect {
  font-weight: bold;
  color: #2a7960;
  margin: 0;
}

.flow-branch {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.branch-option {
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

.option-effect {
  font-weight: bold;
  color: #2a7960;
  margin: 0;
  font-size: 0.875rem;
}

.other-interruptions {
  margin: 2rem 0;
}

.interruption-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.interruption-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.interruption-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.interruption-content p {
  margin: 0 0 0.5rem 0;
}

.interruption-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  margin: 0;
}

.acknowledgment-examples {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.example {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 0.875rem;
}

.example-icon {
  font-size: 1rem;
}

.example-text {
  margin: 0;
}

/* ========= 时效援用样式 ========= */
.invocation-explanation {
  margin: 1.5rem 0;
}

.invocation-principle {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 2rem;
}

.principle-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.principle-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.principle-content p {
  margin: 0;
  color: #6c757d;
}

.invocation-process {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.process-step {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  min-width: 150px;
}

.process-step .step-number {
  margin: 0 auto 1rem;
}

.process-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.process-step p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.process-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.invocation-persons {
  margin: 2rem 0;
}

.persons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.person-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.person-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.person-name {
  font-weight: 600;
  color: #1a472a;
}

.persons-note {
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

.abandonment-rules {
  margin: 2rem 0;
}

.abandonment-timing {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.timing-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
}

.timing-item.invalid {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.timing-item.valid {
  background: #e7f7e7;
  border: 1px solid #28a745;
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
}

.abandonment-effect {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border: 1px solid #ffcc00;
}

.abandonment-effect h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.effect-warning {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.warning-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.warning-content p {
  margin: 0;
  color: #6c757d;
}

.retroactive-effect {
  margin: 2rem 0;
}

.retroactive-principle {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.retroactive-principle .principle-icon {
  font-size: 2rem;
}

.retroactive-principle h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.retroactive-principle p {
  margin: 0;
  color: #6c757d;
}

.retroactive-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.example-item {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #a8c6ff;
}

.example-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.example-item p {
  margin: 0;
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
  
  .prescription-types {
    grid-template-columns: 1fr;
  }
  
  .rights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .case-flow {
    flex-direction: column;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
  }
  
  .succession-rules {
    grid-template-columns: 1fr;
  }
  
  .period-path {
    flex-direction: column;
  }
  
  .debt-periods {
    flex-direction: column;
  }
  
  .renewal-concepts {
    grid-template-columns: 1fr;
  }
  
  .flow-branch {
    grid-template-columns: 1fr;
  }
  
  .invocation-process {
    flex-direction: column;
  }
  
  .process-arrow {
    transform: rotate(90deg);
  }
  
  .persons-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .abandonment-timing {
    grid-template-columns: 1fr;
  }
  
  .retroactive-examples {
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
  
  .rights-grid {
    grid-template-columns: 1fr;
  }
  
  .persons-grid {
    grid-template-columns: 1fr;
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