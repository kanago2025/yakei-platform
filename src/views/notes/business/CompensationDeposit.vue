<!-- src/views/notes/business/CompensationDeposit.vue -->
<template>
  <div class="compensation-deposit-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>弁济业务保证金</span>
        </div>
        <h1>弁济业务保证金</h1>
        <p>保证协会制度下的替代性保证金机制，为宅建业者提供更灵活的资金保障方案</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">18</span>
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
          <h2>📚 学习目标</h2>
          <ul>
            <li>理解弁济业务保证金制度的基本概念和设立目的</li>
            <li>掌握保证协会的组织结构和加入条件</li>
            <li>熟悉弁济业务保证金的缴纳、供托和返还流程</li>
            <li>了解赔付请求的认证和资金补充机制</li>
            <li>掌握与营业保证金的区别和联系</li>
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

        <!-- 基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 基本概念</h2>
          
          <h3>弁济业务保证金制度的目的</h3>
          <div class="concept-purpose">
            <div class="purpose-item">
              <h4>🎯 制度背景</h4>
              <p>传统营业保证金要求较高金额（本店1000万，支店500万），对中小业者造成资金压力。弁济业务保证金制度提供了更灵活的替代方案。</p>
            </div>
            <div class="purpose-item">
              <h4>💡 制度优势</h4>
              <p>通过保证协会的集体保障机制，降低单个业者的资金负担，同时确保消费者权益保护。</p>
            </div>
          </div>

          <h3>保证协会简介</h3>
          <div class="association-info">
            <div class="info-card">
              <h4>🏛️ 组织性质</h4>
              <ul>
                <li>接受国土交通大臣指定的<strong>一般社团法人</strong></li>
                <li>宅建业者<strong>只能加入一个</strong>保证协会</li>
                <li>加入保证协会的业者称为<strong>"社员"</strong></li>
              </ul>
            </div>
            <div class="info-card">
              <h4>📋 主要协会</h4>
              <ul>
                <li><strong>全国宅地建物取引业保证协会</strong>（ハトのマーク）</li>
                <li><strong>不动产保证协会</strong>（ウサギのマーク）</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 保证协会业务 -->
        <section id="association-business" class="content-section">
          <h2>2. 保证协会的业务</h2>
          
          <h3>必须业务</h3>
          <div class="mandatory-business">
            <div class="business-item important">
              <div class="business-icon">🔄</div>
              <div class="business-content">
                <h4>苦情的解决</h4>
                <p>处理社员与消费者之间的交易纠纷和投诉</p>
                <div class="business-note">处理结果必须向社员周知</div>
              </div>
            </div>
            <div class="business-item important">
              <div class="business-icon">🎓</div>
              <div class="business-content">
                <h4>宅建业相关研修</h4>
                <p>为宅建士等从业人员提供专业培训</p>
              </div>
            </div>
            <div class="business-item important">
              <div class="business-icon">💰</div>
              <div class="business-content">
                <h4>弁济业务</h4>
                <p>对社员交易产生的债权进行赔付</p>
                <div class="business-note">包括加入协会前的交易债权</div>
              </div>
            </div>
          </div>

          <h3>任意业务</h3>
          <div class="optional-business">
            <div class="business-grid">
              <div class="business-card">
                <h4>一般保证业务</h4>
                <p>对社员债务的连带保证</p>
              </div>
              <div class="business-card">
                <h4>手付金等保管事业</h4>
                <p>定金等款项的保管服务</p>
              </div>
              <div class="business-card">
                <h4>研修费用助成</h4>
                <p>对宅建业者团体研修的经费支持</p>
              </div>
              <div class="business-card">
                <h4>其他必要业务</h4>
                <p>促进宅建业健全发展的相关业务</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 缴纳与供托 -->
        <section id="payment-deposit" class="content-section">
          <h2>3. 缴纳与供托</h2>
          
          <h3>弁济业务保证金分担金的缴纳</h3>
          <div class="payment-process">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>缴纳主体</h4>
                <p><strong>宅建业者</strong>向保证协会缴纳</p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>缴纳时间</h4>
                <p><strong>加入协会之日</strong>前必须完成缴纳</p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>缴纳金额</h4>
                <ul>
                  <li><strong>主事务所：60万円</strong></li>
                  <li><strong>其他事务所：30万円/个</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <h3>弁济业务保证金的供托</h3>
          <div class="deposit-process">
            <div class="deposit-step">
              <div class="step-icon">⏱️</div>
              <div class="step-content">
                <h4>供托时间</h4>
                <p>收到分担金后<strong>1周内</strong>必须供托</p>
              </div>
            </div>
            <div class="deposit-step">
              <div class="step-icon">🏦</div>
              <div class="step-content">
                <h4>供托主体</h4>
                <p><strong>保证协会</strong>向指定供托所供托</p>
              </div>
            </div>
            <div class="deposit-step">
              <div class="step-icon">📄</div>
              <div class="step-content">
                <h4>届出义务</h4>
                <p>供托后必须向<strong>免许权者</strong>届出</p>
                <div class="step-note">注意：由保证协会届出，不是业者</div>
              </div>
            </div>
          </div>

          <h3>重要区别</h3>
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>项目</th>
                  <th>弁济业务保证金分担金</th>
                  <th>弁济业务保证金</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>缴纳主体</strong></td>
                  <td>宅建业者</td>
                  <td>保证协会</td>
                </tr>
                <tr>
                  <td><strong>缴纳对象</strong></td>
                  <td>保证协会</td>
                  <td>供托所</td>
                </tr>
                <tr>
                  <td><strong>缴纳形式</strong></td>
                  <td>只能金钱</td>
                  <td>金钱或有价证券</td>
                </tr>
                <tr>
                  <td><strong>缴纳时间</strong></td>
                  <td>加入协会前</td>
                  <td>收到分担金后1周内</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 赔付流程 -->
        <section id="compensation-process" class="content-section">
          <h2>4. 赔付流程</h2>
          
          <h3>赔付请求流程</h3>
          <div class="compensation-flow">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>债权发生</h4>
                <p>消费者与社员交易产生债权</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>认证申请</h4>
                <p>消费者向保证协会申请<strong>认证</strong></p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>获得认证</h4>
                <p>保证协会对赔付金额进行认证</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>赔付请求</h4>
                <p>消费者凭认证向供托所请求赔付</p>
              </div>
            </div>
          </div>

          <h3>赔付金额上限</h3>
          <div class="compensation-limit">
            <div class="limit-card">
              <h4>💰 赔付上限</h4>
              <p>赔付金额上限为<strong>该业者如未加入协会应缴纳的营业保证金金额</strong></p>
              <div class="example">
                <strong>例：</strong>本店1个+支店5个的业者A
                <br>营业保证金：1000万 + 5×500万 = 3500万
                <br>赔付上限：<strong>3500万円</strong>
              </div>
            </div>
          </div>

          <h3>赔付对象范围</h3>
          <div class="compensation-target">
            <div class="target-item">
              <h4>✅ 可请求赔付</h4>
              <ul>
                <li>与社员交易的<strong>消费者</strong></li>
                <li>社员<strong>加入协会前</strong>的交易对象</li>
                <li>宅建业相关交易产生的债权</li>
              </ul>
            </div>
            <div class="target-item">
              <h4>❌ 不可请求赔付</h4>
              <ul>
                <li><strong>宅建业者</strong>之间的交易</li>
                <li>非宅建业相关的债权</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 资金补充机制 -->
        <section id="fund-supplement" class="content-section">
          <h2>5. 资金补充机制</h2>
          
          <h3>赔付后的资金补充</h3>
          <div class="supplement-process">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>赔付发生</h4>
                <p>供托所向消费者赔付</p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>通知补充</h4>
                <p>国土交通大臣通知保证协会补充资金</p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>协会供托</h4>
                <p>保证协会<strong>2周内</strong>补充供托</p>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>业者缴纳</h4>
                <p>相关业者<strong>2周内</strong>缴纳还付充当金</p>
                <div class="step-note">逾期不缴纳将失去社员资格</div>
              </div>
            </div>
          </div>

          <h3>准备金制度</h3>
          <div class="reserve-system">
            <div class="reserve-item">
              <h4>弁济业务保证金准备金</h4>
              <ul>
                <li>为应对赔付资金不足而设立的<strong>准备金</strong></li>
                <li>从弁济业务保证金产生的<strong>利息和分红</strong>必须转入准备金</li>
                <li>准备金用于补充赔付后的资金缺口</li>
              </ul>
            </div>
            <div class="reserve-item">
              <h4>特别弁济业务保证金分担金</h4>
              <ul>
                <li>准备金仍不足时向<strong>全体社员</strong>征收</li>
                <li>社员必须在<strong>1个月内</strong>缴纳</li>
                <li>逾期不缴纳将<strong>失去社员资格</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 资格丧失与取回 -->
        <section id="qualification-withdrawal" class="content-section">
          <h2>6. 资格丧失与取回</h2>
          
          <h3>社员资格丧失的情况</h3>
          <div class="qualification-loss">
            <div class="loss-reasons">
              <div class="reason-item">
                <h4>💸 缴纳义务不履行</h4>
                <ul>
                  <li>还付充当金不缴纳</li>
                  <li>特别弁济业务保证金分担金不缴纳</li>
                  <li>事务所增设后分担金不缴纳</li>
                </ul>
              </div>
              <div class="reason-item">
                <h4>⏰ 时间限制违反</h4>
                <ul>
                  <li>各种缴纳义务的期限违反</li>
                  <li>届出义务的不履行</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>资格丧失后的处理</h3>
          <div class="after-loss">
            <div class="loss-process">
              <div class="process-step important">
                <div class="step-icon">⚠️</div>
                <div class="step-content">
                  <h4>紧急措施</h4>
                  <p>丧失资格后<strong>1周内</strong>必须供托营业保证金</p>
                  <div class="step-note">否则将受到业务停止处分</div>
                </div>
              </div>
            </div>
          </div>

          <h3>保证金取回</h3>
          <div class="withdrawal-comparison">
            <div class="comparison-card">
              <h4>🏦 营业保证金取回</h4>
              <ul>
                <li><strong>需要公告</strong>（6个月以上）</li>
                <li>由业者或承继人取回</li>
              </ul>
            </div>
            <div class="comparison-card">
              <h4>💼 弁济业务保证金取回</h4>
              <ul>
                <li><strong>事务所一部废止：无需公告</strong></li>
                <li>社员资格丧失：需要公告</li>
                <li>由<strong>保证协会</strong>取回</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 与营业保证金的比较 -->
        <section id="comparison" class="content-section">
          <h2>7. 与营业保证金的比较</h2>
          
          <div class="detailed-comparison">
            <table>
              <thead>
                <tr>
                  <th>比较项目</th>
                  <th>营业保证金</th>
                  <th>弁济业务保证金</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>制度性质</strong></td>
                  <td>个体保障</td>
                  <td>集体保障</td>
                </tr>
                <tr>
                  <td><strong>缴纳金额</strong></td>
                  <td>本店1000万，支店500万</td>
                  <td>本店60万，支店30万</td>
                </tr>
                <tr>
                  <td><strong>资金形式</strong></td>
                  <td>金钱或有价证券</td>
                  <td>业者→协会：只能金钱<br>协会→供托所：金钱或证券</td>
                </tr>
                <tr>
                  <td><strong>事务所增设</strong></td>
                  <td>事前缴纳</td>
                  <td>增设后2周内缴纳</td>
                </tr>
                <tr>
                  <td><strong>赔付上限</strong></td>
                  <td>实际供托金额</td>
                  <td>相当于营业保证金的金额</td>
                </tr>
                <tr>
                  <td><strong>取回公告</strong></td>
                  <td>需要公告</td>
                  <td>事务所一部废止：无需公告<br>资格丧失：需要公告</td>
                </tr>
              </tbody>
            </table>
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
          <router-link to="/video?topic=compensation-deposit" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=compensation-deposit" class="action-button">
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
  { id: 'basic-concepts', title: '基本概念', icon: '📖' },
  { id: 'association-business', title: '保证协会业务', icon: '🏛️' },
  { id: 'payment-deposit', title: '缴纳与供托', icon: '💰' },
  { id: 'compensation-process', title: '赔付流程', icon: '🔄' },
  { id: 'fund-supplement', title: '资金补充', icon: '💸' },
  { id: 'qualification-withdrawal', title: '资格丧失', icon: '⚠️' },
  { id: 'comparison', title: '比较分析', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '弁済業務保証金（べんさいぎょうむほしょうきん）',
    chinese: '弁济业务保证金',
    explanation: '保证协会收到社员缴纳的分担金后，向供托所供托的保证金',
    example: '用于消费者债权赔付的保障资金'
  },
  {
    japanese: '弁済業務保証金分担金（べんさいぎょうむほしょうきんぶんたんきん）',
    chinese: '弁济业务保证金分担金',
    explanation: '宅建业者向保证协会缴纳的资金，用于构成弁济业务保证金',
    example: '本店60万円，支店30万円/个'
  },
  {
    japanese: '宅地建物取引業保証協会（たくちたてものとりひきぎょうほしょうきょうかい）',
    chinese: '宅地建物取引业保证协会',
    explanation: '经国土交通大臣指定的一般社团法人，提供集体保障服务',
    example: '全国宅地建物取引业保证协会（鸽子标志）'
  },
  {
    japanese: '還付充当金（かんぷじゅうとうきん）',
    chinese: '还付充当金',
    explanation: '赔付发生后，相关社员向保证协会缴纳的补充资金',
    example: '必须在收到通知后2周内缴纳'
  },
  {
    japanese: '特別弁済業務保証金分担金（とくべつべんさいぎょうむほしょうきんぶんたんきん）',
    chinese: '特别弁济业务保证金分担金',
    explanation: '准备金不足时向全体社员征收的额外分担金',
    example: '必须在1个月内缴纳，否则丧失社员资格'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業保証協会の社員は、他の保証協会の社員となることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '保证协会只能加入一个，不能重复加入其他保证协会。'
  },
  {
    question: '弁済業務保証金分担金の納付は、金銭のほか有価証券をもってこれに充てることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '业者向协会缴纳分担金只能使用金钱，不能使用有价证券。'
  },
  {
    question: '弁済業務保証金の還付を受けることができる者は、宅地建物取引業者との取引により生じた債権を有する者に限られ、宅地建物取引業者は還付を受けることができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '宅建业者之间的交易债权不能请求弁济业务保证金赔付。'
  },
  {
    question: '保証協会の社員が事務所を新設した場合、その設置した日から2週間以内に追加の弁済業務保証金分担金を保証協会に納付しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '事务所增设后2周内必须缴纳追加的分担金，否则丧失社员资格。'
  },
  {
    question: '弁済業務保証金の取戻しに際し、一部の事務所を廃止した場合、公告をすることなく直ちに取戻しが可能である。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '事务所一部废止时的取回无需公告，与营业保证金不同。'
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
  learningStore.recordTopicStudyTime('compensation-deposit', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('compensation-deposit')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('compensation-deposit')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('compensation-deposit', 0)
  
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
/* 使用与Agent.vue相同的样式结构，确保设计统一 */
.compensation-deposit-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 页面头部样式 - 与Agent.vue保持一致 */
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

/* 主要内容区域 */
.main-content {
  margin: 2rem 0;
}

/* 快速导航 */
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

/* 学习目标 */
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

/* 关键术语 */
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

/* 内容区块 */
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

/* 基本概念样式 */
.concept-purpose {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.purpose-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #2a7960;
}

.purpose-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.association-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.info-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.info-card h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-card ul {
  padding-left: 1.25rem;
  margin: 0;
}

.info-card li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* 保证协会业务样式 */
.mandatory-business {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.business-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.business-item.important {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.business-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.business-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.business-content p {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
}

.business-note {
  font-size: 0.75rem;
  color: #2a7960;
  font-style: italic;
}

.optional-business {
  margin: 2rem 0;
}

.business-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.business-card {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.business-card h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  font-size: 0.875rem;
}

.business-card p {
  margin: 0;
  font-size: 0.75rem;
  color: #6c757d;
}

/* 缴纳与供托样式 */
.payment-process, .deposit-process, .compensation-flow, .supplement-process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.process-step {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  position: relative;
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

.step-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
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

.step-content ul {
  padding-left: 1.25rem;
  margin: 0;
  text-align: left;
}

.step-content li {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.step-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #2a7960;
}

/* 表格样式 */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  margin: 2rem 0;
}

.comparison-table th, .comparison-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: #2a7960;
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

.detailed-comparison {
  margin: 2rem 0;
}

.detailed-comparison table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.detailed-comparison th, .detailed-comparison td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: left;
}

.detailed-comparison th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.detailed-comparison tr:nth-child(even) {
  background-color: #f8f9fa;
}

/* 赔付流程样式 */
.compensation-limit {
  margin: 2rem 0;
}

.limit-card {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 12px;
  border: 1px solid #28a745;
}

.limit-card h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.example {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border-left: 3px solid #2a7960;
}

.compensation-target {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.target-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.target-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.target-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.target-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* 资金补充样式 */
.reserve-system {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.reserve-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.reserve-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.reserve-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.reserve-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* 资格丧失样式 */
.qualification-loss {
  margin: 2rem 0;
}

.loss-reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.reason-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.reason-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reason-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.reason-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.after-loss {
  margin: 2rem 0;
}

.process-step.important {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.withdrawal-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.comparison-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.comparison-card h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comparison-card ul {
  padding-left: 1.25rem;
  margin: 0;
}

.comparison-card li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* 练习题样式 */
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

/* 按钮样式 */
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

/* 底部行动按钮 */
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

/* 响应式设计 */
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
  
  .concept-purpose,
  .association-info,
  .compensation-target,
  .reserve-system,
  .loss-reasons,
  .withdrawal-comparison {
    grid-template-columns: 1fr;
  }
  
  .mandatory-business {
    grid-template-columns: 1fr;
  }
  
  .business-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .payment-process,
  .deposit-process,
  .compensation-flow,
  .supplement-process {
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
  
  .business-grid {
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