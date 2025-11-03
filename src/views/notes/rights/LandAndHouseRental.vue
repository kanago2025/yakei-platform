<!-- src/views/notes/rights/LandAndHouseRental.vue -->
<template>
  <div class="land-house-rental-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>借地借家法（借家）</span>
        </div>
        <h1>借地借家法（借家）</h1>
        <p>日本借地借家法中关于房屋租赁的特殊规定，重点保护租客权益，涉及契约更新、正当事由、造作买取请求权等重要制度</p>
        
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
            <li>理解借地借家法的立法目的和适用范围</li>
            <li>掌握普通建物赁贷借与定期建物赁贷借的区别</li>
            <li>熟悉契约更新、终止的法律规则和正当事由要求</li>
            <li>了解造作买取请求权、借賃増減請求权的适用条件</li>
            <li>掌握转贷借关系中各方的权利义务</li>
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
          <h2>1. 借地借家法概述</h2>
          
          <h3>立法目的与适用范围</h3>
          <div class="concept-explanation">
            <p>借地借家法是为了保护相对弱势的租客而制定的特别法。在租赁关系中，房东通常处于优势地位，该法旨在实现双方契约的对等性。</p>
            
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>借地借家法优先于民法适用，但仅限于需要保护租客权益的情形。明显临时使用的情况不适用本法。</p>
            </div>
          </div>

          <h3>适用与不适用情形</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">✅</div>
              <div class="timing-content">
                <h4>适用情形</h4>
                <p>长期居住的住宅租赁</p>
                <p>普通建物赁贷借</p>
                <p>定期建物赁贷借</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">❌</div>
              <div class="timing-content">
                <h4>不适用情形</h4>
                <p>明显临时使用（度假别墅）</p>
                <p>选举事务所等短期使用</p>
                <p>免费的使用借贷</p>
              </div>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="case-study">
            <div class="case-item">
              <h4>🏠 适用案例</h4>
              <p>小林租了一套公寓长期居住，受借地借家法保护。房东要解除契约需要正当事由。</p>
            </div>
            <div class="case-item">
              <h4>🏖️ 不适用案例</h4>
              <p>太郎为了短期出差租了3个月的商务公寓，属于临时使用，适用民法规则而非借地借家法。</p>
            </div>
          </div>
        </section>

        <!-- 普通建物赁贷借 -->
        <section id="ordinary-lease" class="content-section">
          <h2>2. 普通建物赁贷借</h2>
          
          <h3>契约期间规定</h3>
          <div class="contract-period">
            <div class="period-item">
              <div class="period-icon">📅</div>
              <div class="period-content">
                <h4>最长期间</h4>
                <p><strong>无限制</strong>（超过50年也可）</p>
              </div>
            </div>
            <div class="period-item">
              <div class="period-icon">⏱️</div>
              <div class="period-content">
                <h4>最短期间</h4>
                <p><strong>无限制</strong></p>
              </div>
            </div>
            <div class="period-item">
              <div class="period-icon">⚠️</div>
              <div class="period-content">
                <h4>特殊规定</h4>
                <p>约定期间<strong>不满1年</strong>时，视为无固定期间契约</p>
              </div>
            </div>
          </div>

          <h3>契约更新规则</h3>
          <div class="renewal-rules">
            <div class="rule-type">
              <h4>有固定期间的情况</h4>
              <div class="rule-details">
                <div class="rule-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p>期满前<strong>1年-6个月</strong>内，房东必须通知不续约</p>
                  </div>
                </div>
                <div class="rule-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p>拒绝更新需要<strong>正当事由</strong></p>
                  </div>
                </div>
                <div class="rule-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p>未通知则<strong>自动更新</strong>（法定更新）</p>
                  </div>
                </div>
                <div class="rule-step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <p>更新后变为<strong>无固定期间</strong>契约</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="rule-type">
              <h4>无固定期间的情况</h4>
              <div class="rule-details">
                <div class="rule-step">
                  <div class="step-number">👤</div>
                  <div class="step-content">
                    <p><strong>房东解约</strong>：需正当事由 + 6个月宽限期</p>
                  </div>
                </div>
                <div class="rule-step">
                  <div class="step-number">👥</div>
                  <div class="step-content">
                    <p><strong>租客解约</strong>：无需正当事由 + 3个月宽限期</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>正当事由的判断标准</h3>
          <div class="just-cause-criteria">
            <div class="criteria-grid">
              <div class="criterion">
                <h4>1. 房东的使用必要性</h4>
                <p>房东是否确实需要自用房屋</p>
              </div>
              <div class="criterion">
                <h4>2. 租客的情况</h4>
                <p>居住年数、家庭构成、有无其他住所</p>
              </div>
              <div class="criterion">
                <h4>3. 房屋的利用状况</h4>
                <p>房屋现状、使用情况等</p>
              </div>
              <div class="criterion">
                <h4>4. 腾退补偿</h4>
                <p>是否提供合理的搬迁补偿</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 租客的特殊权利 -->
        <section id="tenant-rights" class="content-section">
          <h2>3. 租客的特殊权利</h2>
          
          <h3>造作买取请求权</h3>
          <div class="fixture-purchase">
            <div class="rights-explanation">
              <p>租客退租时要求房东购买其安装设施的权利，旨在保护租客的投资利益。</p>
            </div>

            <h4>行使要件</h4>
            <div class="requirements">
              <div class="req-item">
                <div class="req-icon">✅</div>
                <div class="req-content">
                  <p>经房东<strong>同意安装</strong>的造作（空调、橱柜等）</p>
                </div>
              </div>
              <div class="req-item">
                <div class="req-icon">✅</div>
                <div class="req-content">
                  <p>因<strong>期间届满或正常解约</strong>而终止契约</p>
                </div>
              </div>
              <div class="req-item">
                <div class="req-icon">❌</div>
                <div class="req-content">
                  <p><strong>债务不履行解除</strong>时不可行使</p>
                </div>
              </div>
            </div>

            <h4>特约效力</h4>
            <div class="special-agreement">
              <div class="agreement-item important">
                <p>不承认买取请求权的特约<strong>有效</strong></p>
                <p class="agreement-note">尊重当事人意思自治，避免房东不同意安装造作</p>
              </div>
            </div>
          </div>

          <h3>借賃増減請求権</h3>
          <div class="rent-adjustment">
            <div class="adjustment-conditions">
              <h4>适用条件</h4>
              <p>地租或房租与<strong>周边行情相比明显不相当</strong>时</p>
            </div>

            <div class="adjustment-process">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>临时支付</h4>
                  <p>诉讼确定前可按<strong>自认相当额</strong>支付</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>差额处理</h4>
                  <p>判决后需支付/返还<strong>差额 + 年10%利息</strong></p>
                </div>
              </div>
            </div>

            <h4>特约效力比较</h4>
            <div class="agreement-comparison">
              <div class="table-container">
                <table class="comparison-table">
                  <thead>
                    <tr>
                      <th>租赁类型</th>
                      <th>不涨租特约</th>
                      <th>不减租特约</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>普通租赁</strong></td>
                      <td class="valid">有效</td>
                      <td class="invalid">无效</td>
                    </tr>
                    <tr>
                      <td><strong>定期租赁</strong></td>
                      <td class="valid">有效</td>
                      <td class="valid">有效</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="table-note">
                <p>普通租赁：<strong>约不增真不增，约不减可以减</strong></p>
                <p>定期租赁：<strong>约不增真不增，约不减真不减</strong></p>
              </div>
            </div>
          </div>
        </section>

        <!-- 转贷借关系 -->
        <section id="sublease" class="content-section">
          <h2>4. 转贷借关系</h2>
          
          <h3>转贷借的成立</h3>
          <div class="sublease-establishment">
            <div class="establishment-rule">
              <p>租客转租需经<strong>房东承诺</strong>，经承诺的转借人享有与租客同等的保护。</p>
            </div>
          </div>

          <h3>原契约终止的影响</h3>
          <div class="termination-effects">
            <div class="effect-item">
              <div class="effect-type">期间届满</div>
              <div class="effect-result">
                <p>房东通知转借人 + <strong>6个月</strong>后终止</p>
              </div>
            </div>
            <div class="effect-item">
              <div class="effect-type">合意解除</div>
              <div class="effect-result">
                <p>转借人<strong>无需搬离</strong></p>
              </div>
            </div>
            <div class="effect-item">
              <div class="effect-type">债务不履行解除</div>
              <div class="effect-result">
                <p>转借人必须<strong>立即搬离</strong>（无需给予支付机会）</p>
              </div>
            </div>
          </div>

          <h3>转借人的权利</h3>
          <div class="sublessee-rights">
            <div class="rights-item">
              <p>经房东承诺的转借人可<strong>独立向房东</strong>行使造作买取请求权</p>
            </div>
          </div>
        </section>

        <!-- 借地上建物的租赁 -->
        <section id="land-lease" class="content-section">
          <h2>5. 借地上建物的租赁</h2>
          
          <h3>基本规则</h3>
          <div class="basic-rules">
            <div class="rule-explanation">
              <p>在借地权土地上建造的房屋，其租赁行为<strong>不属于土地利用权的转让或转贷</strong>，无需地主同意。</p>
            </div>
          </div>

          <h3>借地权终止的影响</h3>
          <div class="land-right-termination">
            <div class="termination-type">
              <h4>期间届满</h4>
              <div class="termination-details">
                <p>租客如在<strong>1年前不知情</strong>，可申请最多<strong>1年宽限期</strong></p>
              </div>
            </div>
            <div class="termination-type">
              <h4>债务不履行解除</h4>
              <div class="termination-details">
                <p>地主可<strong>立即要求</strong>租客搬离</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 定期建物赁贷借 -->
        <section id="fixed-term-lease" class="content-section">
          <h2>6. 定期建物赁贷借</h2>
          
          <h3>特征</h3>
          <div class="fixed-term-features">
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">🔄</div>
                <div class="feature-content">
                  <h4>不更新</h4>
                  <p>期满自动终止</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">💰</div>
                <div class="feature-content">
                  <h4>不买取</h4>
                  <p>无造作买取请求权</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">⏹️</div>
                <div class="feature-content">
                  <h4>不延续</h4>
                  <p>无契约延续性</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📝</div>
                <div class="feature-content">
                  <h4>无限制</h4>
                  <p>利用目的无限制</p>
                </div>
              </div>
            </div>
          </div>

          <h3>成立要件</h3>
          <div class="establishment-requirements">
            <div class="requirement-item important">
              <div class="req-number">1</div>
              <div class="req-content">
                <p>必须以<strong>书面或电磁记录</strong>订立契约</p>
              </div>
            </div>
            <div class="requirement-item important">
              <div class="req-number">2</div>
              <div class="req-content">
                <p>必须另行<strong>书面说明</strong>"不更新、期满终止"的内容</p>
              </div>
            </div>
            <div class="requirement-item warning">
              <div class="req-number">!</div>
              <div class="req-content">
                <p>未说明则"不更新"特约<strong>无效</strong>，变为普通租赁</p>
              </div>
            </div>
          </div>

          <h3>中途解约规则</h3>
          <div class="midterm-termination">
            <div class="termination-party">
              <h4>房东解约</h4>
              <p>期间1年以上时，需在期满前<strong>1年-6个月</strong>内通知（无需正当事由）</p>
            </div>
            <div class="termination-party">
              <h4>租客解约</h4>
              <p>仅限<strong>200㎡以下居住用房屋</strong>，因不得已事由可中途解约（申请后<strong>1个月</strong>终止）</p>
            </div>
          </div>

          <h3>拆除预定建物的租赁</h3>
          <div class="demolition-lease">
            <div class="demolition-info">
              <p>适用于明确将在<strong>一定期间后拆除</strong>的建筑物</p>
              <p>必须在<strong>记载拆除事由的书面或电磁记录</strong>中约定</p>
            </div>
          </div>
        </section>

        <!-- 实务注意事项 -->
        <section id="practical-notes" class="content-section">
          <h2>7. 实务注意事项</h2>
          
          <h3>对抗要件</h3>
          <div class="opposability">
            <div class="opposability-item">
              <div class="opposability-type">借家权登记</div>
              <div class="opposability-status difficult">
                <p>现实中困难</p>
              </div>
            </div>
            <div class="opposability-item">
              <div class="opposability-type">建物交付</div>
              <div class="opposability-status easy">
                <p>实际入住即具备</p>
              </div>
            </div>
          </div>

          <h3>居住用建物贷借权的承继</h3>
          <div class="succession-rights">
            <div class="succession-rule">
              <p>租客死亡时，同居的<strong>内缘配偶或养子</strong>可承继权利</p>
            </div>
            <div class="succession-details">
              <div class="detail-item">
                <h4>特约效力</h4>
                <p>排除承继的特约<strong>有效</strong></p>
              </div>
              <div class="detail-item">
                <h4>不承继声明</h4>
                <p>同居人可在<strong>知悉后1个月内</strong>表示不承继</p>
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
          <router-link to="/video?topic=land-house-rental" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=land-house-rental" class="action-button">
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
  { id: 'ordinary-lease', title: '普通建物赁贷借', icon: '🏠' },
  { id: 'tenant-rights', title: '租客特殊权利', icon: '⚖️' },
  { id: 'sublease', title: '转贷借关系', icon: '🔄' },
  { id: 'land-lease', title: '借地上建物租赁', icon: '🏗️' },
  { id: 'fixed-term-lease', title: '定期建物赁贷借', icon: '📅' },
  { id: 'practical-notes', title: '实务注意事项', icon: '💼' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '借地借家法（しゃくちしゃっかほう）',
    chinese: '借地借家法',
    explanation: '保护借地人和借家人权益的特别法，优先于民法适用',
    example: '租房纠纷时优先适用借地借家法而非民法'
  },
  {
    japanese: '法定更新（ほうていこうしん）',
    chinese: '法定更新',
    explanation: '租赁期满前未及时通知不续约，契约自动更新的制度',
    example: '房东未在期满前6个月-1年内通知不续约，契约自动更新'
  },
  {
    japanese: '造作買取請求権（ぞうさかいうけせいきゅうけん）',
    chinese: '造作买取请求权',
    explanation: '租客退租时要求房东购买其安装设施的权利',
    example: '经房东同意安装的空调，退租时可要求房东购买'
  },
  {
    japanese: '正当事由（せいとうじゆう）',
    chinese: '正当事由',
    explanation: '房东拒绝续约或解除契约必须具备的合理理由',
    example: '房东需要自用房屋、租客严重违约等'
  },
  {
    japanese: '定期建物賃貸借（ていきたてものちんたいしゃく）',
    chinese: '定期建物租赁',
    explanation: '不更新、期间固定的特殊租赁形式',
    example: '签订2年定期租赁，期满必须搬离'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '貸貸人Ａと貸借人Ｂとの間で締結した貸貸借契約について、ＢがＡの同意を得て建物に付加した造作がある場合であっても、本件契約終了時にＡに対して借地借家法第33条の規定に基づく造作買取請求権を行使することはできない、という特約は無効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '不承认造作买取请求权的特约是有效的，尊重当事人意思自治。'
  },
  {
    question: 'Ａを貸貸人、Ｂを貸借人とする甲建物の貸貸借契約が締結され、甲建物が適法にＢからＤに転貸されている場合、ＡがＤに対して本件契約が期間満了によって終了する旨の通知をしたときは、建物の転貸借は、その通知がされた日から３月を経過することによって終了する。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '期间届满的情况下，通知后需要经过6个月（不是3个月）转贷借才终止。'
  },
  {
    question: '定期建物賃貸借契約を締結するには、公正証書による等の書面または電磁的記録によりなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '定期建物租赁必须采用书面或电磁记录形式订立契约。'
  },
  {
    question: '定期建物賃貸借契約を締結しようとする場合、賃貸人が、当該契約に係る賃貸借は契約の更新がなく、期間の満了によって終了するとともに説明しなかったときは、契約の更新がない旨の定めは無効となる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '未另行说明"不更新、期满终止"的，该特约无效，变为普通租赁。'
  },
  {
    question: '借賃の減額をしない旨の特約がある場合、賃借人は賃貸人に対して借賃の減額を請求することができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '普通租赁中，不减租特约无效，租客仍可请求减额；但定期租赁中该特约有效。'
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
  learningStore.recordTopicStudyTime('land-house-rental', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('land-house-rental')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('land-house-rental')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('land-house-rental', 0)
  
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
.land-house-rental-page {
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

.content-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a472a;
  margin: 1.25rem 0 0.75rem;
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

.case-study {
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

/* ========= 普通建物赁贷借样式 ========= */
.contract-period {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.period-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.period-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.period-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.period-content p {
  margin: 0;
}

.renewal-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.rule-type {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rule-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.rule-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rule-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
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

.step-content p {
  margin: 0;
}

.just-cause-criteria {
  margin: 1.5rem 0;
}

.criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.criterion {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.criterion h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.criterion p {
  margin: 0;
  color: #6c757d;
}

/* ========= 租客特殊权利样式 ========= */
.fixture-purchase, .rent-adjustment {
  margin-bottom: 2rem;
}

.rights-explanation {
  margin-bottom: 1.5rem;
}

.requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.req-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.req-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.req-content p {
  margin: 0;
}

.special-agreement {
  margin: 1.5rem 0;
}

.agreement-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.agreement-item.important {
  border-left: 4px solid #2a7960;
  background: #f0f7ff;
}

.agreement-item p {
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.agreement-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  margin: 0;
}

.adjustment-conditions {
  margin-bottom: 1.5rem;
}

.adjustment-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.process-step .step-number {
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

.process-step h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.process-step p {
  margin: 0;
}

.agreement-comparison {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 1rem;
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

.valid {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.invalid {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.table-note {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.table-note p {
  margin: 0.25rem 0;
}

/* ========= 转贷借关系样式 ========= */
.sublease-establishment, .sublessee-rights {
  margin: 1.5rem 0;
}

.establishment-rule, .rights-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.termination-effects {
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
  text-align: center;
}

.effect-type {
  font-weight: bold;
  color: #1a472a;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.effect-result p {
  margin: 0;
}

/* ========= 借地上建物租赁样式 ========= */
.basic-rules, .land-right-termination {
  margin: 1.5rem 0;
}

.rule-explanation {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.land-right-termination {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.termination-type {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.termination-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.termination-details p {
  margin: 0;
}

/* ========= 定期建物赁贷借样式 ========= */
.fixed-term-features {
  margin: 1.5rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  flex-direction: column;
}

.feature-icon {
  font-size: 2rem;
}

.feature-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.feature-content p {
  margin: 0;
  color: #6c757d;
}

.establishment-requirements {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.requirement-item.important {
  border-left: 4px solid #2a7960;
  background: #f0f7ff;
}

.requirement-item.warning {
  border-left: 4px solid #ffcc00;
  background: #fff9e6;
}

.req-number {
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

.requirement-item.warning .req-number {
  background: #ffcc00;
  color: #333;
}

.req-content p {
  margin: 0;
}

.midterm-termination {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.termination-party {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.termination-party h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.termination-party p {
  margin: 0;
}

.demolition-lease {
  margin: 1.5rem 0;
}

.demolition-info {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.demolition-info p {
  margin: 0 0 0.5rem 0;
}

/* ========= 实务注意事项样式 ========= */
.opposability {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.opposability-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.opposability-type {
  font-weight: bold;
  color: #1a472a;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.opposability-status {
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}

.opposability-status.difficult {
  background: #ffe7e7;
  color: #c62828;
}

.opposability-status.easy {
  background: #e7f7e7;
  color: #2e7d32;
}

.succession-rights {
  margin: 1.5rem 0;
}

.succession-rule {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.succession-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.detail-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.detail-item p {
  margin: 0;
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
  
  .case-study {
    grid-template-columns: 1fr;
  }
  
  .contract-period {
    grid-template-columns: 1fr;
  }
  
  .renewal-rules {
    grid-template-columns: 1fr;
  }
  
  .criteria-grid {
    grid-template-columns: 1fr;
  }
  
  .requirements {
    grid-template-columns: 1fr;
  }
  
  .adjustment-process {
    grid-template-columns: 1fr;
  }
  
  .termination-effects {
    grid-template-columns: 1fr;
  }
  
  .land-right-termination {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .midterm-termination {
    grid-template-columns: 1fr;
  }
  
  .opposability {
    grid-template-columns: 1fr;
  }
  
  .succession-details {
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