<!-- src/views/notes/business/Mediation.vue -->
<template>
  <div class="mediation-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>媒介代理</span>
        </div>
        <h1>媒介代理</h1>
        <p>不动产交易中的委托契约制度，涵盖媒介契约、代理契约及相关法律规定</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">25</span>
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
            <li>掌握媒介契约的基本概念和法律依据</li>
            <li>理解三种媒介契约的区别和适用场景</li>
            <li>熟悉媒介契约书面的交付要求和记载事项</li>
            <li>了解指定流通机构（レインズ）的登录义务</li>
            <li>掌握代理契约与媒介契约的关联规制</li>
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

        <!-- 媒介契约基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 媒介契约基本概念</h2>
          
          <h3>定义与适用范围</h3>
          <div class="concept-grid">
            <div class="concept-item">
              <h4>📋 媒介契约定义</h4>
              <p><strong>媒介契约</strong>是指委托宅建业者寻找交易对象（买主或卖主）的契约。</p>
              <div class="example-box">
                <strong>例子：</strong>卖主委托中介寻找买主的契约
              </div>
            </div>
            <div class="concept-item">
              <h4>⚖️ 代理契约定义</h4>
              <p><strong>代理契约</strong>是在媒介基础上，增加代表委托人缔结契约的权限。</p>
              <div class="example-box">
                <strong>例子：</strong>中介有权代表卖主与买主签订买卖契约
              </div>
            </div>
          </div>

          <h3>适用范围</h3>
          <div class="application-scope">
            <div class="scope-item applicable">
              <div class="scope-icon">✅</div>
              <div class="scope-content">
                <h4>适用情况</h4>
                <ul>
                  <li><strong>买卖、交换</strong>的媒介或代理</li>
                  <li>宅建业法第34条之2规定的书面交付义务</li>
                </ul>
              </div>
            </div>
            <div class="scope-item not-applicable">
              <div class="scope-icon">❌</div>
              <div class="scope-content">
                <h4>不适用情况</h4>
                <ul>
                  <li><strong>租赁（贷借）</strong>契约</li>
                  <li>非宅建业者的个人间交易</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>契约形态</h3>
          <div class="contract-types">
            <div class="contract-type">
              <h4>🏠 一般媒介契约</h4>
              <ul>
                <li>可重复委托其他中介</li>
                <li>可自己发现交易</li>
                <li>规制相对宽松</li>
              </ul>
            </div>
            <div class="contract-type">
              <h4>🔒 专任媒介契约</h4>
              <ul>
                <li>不可委托其他中介</li>
                <li>可自己发现交易</li>
                <li>有定期报告义务</li>
              </ul>
            </div>
            <div class="contract-type">
              <h4>🔐 专属专任媒介契约</h4>
              <ul>
                <li>不可委托其他中介</li>
                <li>不可自己发现交易</li>
                <li>规制最为严格</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 三种媒介契约的区别 -->
        <section id="contract-comparison" class="content-section">
          <h2>2. 三种媒介契约的区别</h2>
          
          <h3>详细对比表</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>项目</th>
                  <th>一般媒介契约</th>
                  <th>专任媒介契约</th>
                  <th>专属专任媒介契约</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>其他中介委托</strong></td>
                  <td class="allowed">✅ 可</td>
                  <td class="not-allowed">❌ 不可</td>
                  <td class="not-allowed">❌ 不可</td>
                </tr>
                <tr>
                  <td><strong>自己发现交易</strong></td>
                  <td class="allowed">✅ 可</td>
                  <td class="allowed">✅ 可</td>
                  <td class="not-allowed">❌ 不可</td>
                </tr>
                <tr>
                  <td><strong>有效期间</strong></td>
                  <td>无限制</td>
                  <td>3个月以内</td>
                  <td>3个月以内</td>
                </tr>
                <tr>
                  <td><strong>报告频率</strong></td>
                  <td>无规制</td>
                  <td>2周1次以上</td>
                  <td>1周1次以上</td>
                </tr>
                <tr>
                  <td><strong>レインズ登录期限</strong></td>
                  <td>无义务</td>
                  <td>7日内（休业日除外）</td>
                  <td>5日内（休业日除外）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>重要规制要点</h3>
          <div class="regulation-points">
            <div class="regulation-item important">
              <div class="regulation-icon">⚠️</div>
              <div class="regulation-content">
                <h4>有效期间规制</h4>
                <ul>
                  <li>专任/专属专任媒介契约有效期间<strong>3个月以内</strong></li>
                  <li>超过3个月的约定自动缩短为3个月</li>
                  <li>更新需<strong>委托人申请</strong>，不能自动更新</li>
                  <li>更新后期间仍为<strong>3个月以内</strong></li>
                </ul>
              </div>
            </div>
            <div class="regulation-item important">
              <div class="regulation-icon">⚖️</div>
              <div class="regulation-content">
                <h4>特约效力</h4>
                <ul>
                  <li><strong>不利委托人的特约无效</strong></li>
                  <li>有利委托人的特约有效</li>
                  <li>例如：5日1次报告（比法定更频繁）有效</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 媒介契约书面的交付 -->
        <section id="contract-document" class="content-section">
          <h2>3. 媒介契约书面的交付</h2>
          
          <h3>交付义务要求</h3>
          <div class="delivery-requirements">
            <div class="requirement-item">
              <h4>⏰ 交付时机</h4>
              <p>契约成立后<strong>遅滞なく（及时）</strong>交付</p>
            </div>
            <div class="requirement-item">
              <h4>📄 适用范围</h4>
              <p>仅适用于<strong>买卖、交换</strong>媒介</p>
            </div>
            <div class="requirement-item">
              <h4>🖋️ 记名要求</h4>
              <p>需<strong>宅建业者记名押印</strong></p>
              <div class="important-note">
                <strong>注意：</strong>不是宅建士的记名押印
              </div>
            </div>
            <div class="requirement-item">
              <h4>💻 电子交付</h4>
              <p>经委托人承诺可用<strong>电子交付</strong></p>
            </div>
          </div>

          <h3>必须记载事项</h3>
          <div class="document-items">
            <div class="item-grid">
              <div class="item-card">
                <div class="item-number">1</div>
                <div class="item-content">
                  <h5>物件特定事项</h5>
                  <p>所在、地番、构造等</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">2</div>
                <div class="item-content">
                  <h5>买卖价格或评价额</h5>
                  <p>发表意见时需说明根据</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">3</div>
                <div class="item-content">
                  <h5>媒介契约种类</h5>
                  <p>一般/专任/专属专任</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">4</div>
                <div class="item-content">
                  <h5>有效期间及解除事项</h5>
                  <p>契约期间和解除条件</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">5</div>
                <div class="item-content">
                  <h5>建物状况调查</h5>
                  <p>既有建物的调查斡旋事项</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">6</div>
                <div class="item-content">
                  <h5>报酬相关事项</h5>
                  <p>报酬金额和支付条件</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">7</div>
                <div class="item-content">
                  <h5>指定流通机构登录</h5>
                  <p>レインズ登录相关事项</p>
                </div>
              </div>
              <div class="item-card">
                <div class="item-number">8</div>
                <div class="item-content">
                  <h5>标准约款依据</h5>
                  <p>是否基于标准媒介契约约款</p>
                </div>
              </div>
            </div>
          </div>

          <h3>价格意见义务</h3>
          <div class="price-opinion">
            <div class="opinion-rules">
              <div class="rule-item">
                <h4>🗣️ 根据说明</h4>
                <p>对价格或评价额发表意见时必须<strong>说明根据</strong></p>
              </div>
              <div class="rule-item">
                <h4>📝 说明形式</h4>
                <p>根据可以<strong>口头说明</strong>，不要求书面</p>
              </div>
              <div class="rule-item">
                <h4>👨‍💼 鉴定士委托</h4>
                <p><strong>不需要</strong>委托不动产鉴定士</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 指定流通机构义务 -->
        <section id="reins-obligation" class="content-section">
          <h2>4. 指定流通机构（レインズ）义务</h2>
          
          <h3>登录义务要求</h3>
          <div class="reins-requirements">
            <div class="reins-type">
              <h4>🔒 专任媒介契约</h4>
              <div class="deadline">
                <strong>登录期限：</strong>契约日起<strong>7日内</strong>
              </div>
              <div class="note">
                <em>契约日和休业日除外</em>
              </div>
            </div>
            <div class="reins-type">
              <h4>🔐 专属专任媒介契约</h4>
              <div class="deadline">
                <strong>登录期限：</strong>契约日起<strong>5日内</strong>
              </div>
              <div class="note">
                <em>契约日和休业日除外</em>
              </div>
            </div>
            <div class="reins-type">
              <h4>🏠 一般媒介契约</h4>
              <div class="deadline">
                <strong>登录义务：</strong>无义务
              </div>
              <div class="note">
                <em>但可任意登录</em>
              </div>
            </div>
          </div>

          <h3>登录事项</h3>
          <div class="registration-items">
            <div class="included-items">
              <h4>✅ 必须登录事项</h4>
              <ul>
                <li>物件所在、规模、形质</li>
                <li>买卖价格或评价额</li>
                <li>主要法令限制</li>
                <li>契约条件相关信息</li>
              </ul>
            </div>
            <div class="excluded-items">
              <h4>❌ 不包括事项</h4>
              <ul>
                <li><strong>所有者姓名</strong></li>
                <li><strong>登记种类</strong></li>
                <li>个人隐私信息</li>
              </ul>
            </div>
          </div>

          <h3>通知与证明书交付</h3>
          <div class="notification-delivery">
            <div class="notification-item">
              <h4>📢 通知义务</h4>
              <ul>
                <li>契约成立时<strong>遅滞なく</strong>通知レインズ</li>
                <li>通知事项：登录番号、交易价格、契约成立年月日</li>
              </ul>
            </div>
            <div class="notification-item">
              <h4>📄 证明书交付</h4>
              <ul>
                <li>登录完成后<strong>立即交付</strong>登录证明书给委托人</li>
                <li>不能用"提示"，必须"交付"</li>
                <li>经承诺可用电子交付</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 业务处理状况报告 -->
        <section id="business-reporting" class="content-section">
          <h2>5. 业务处理状况报告</h2>
          
          <h3>申込报告义务</h3>
          <div class="application-report">
            <div class="report-type universal">
              <div class="report-icon">📋</div>
              <div class="report-content">
                <h4>所有媒介契约类型</h4>
                <ul>
                  <li>有买卖、交换申込时<strong>遅滞なく</strong>报告</li>
                  <li>报告方法无限制（口头可）</li>
                  <li>适用于一般、专任、专属专任所有类型</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>定期报告义务</h3>
          <div class="regular-reporting">
            <div class="report-frequency">
              <div class="frequency-item">
                <h4>🏠 一般媒介</h4>
                <div class="frequency">
                  <strong>报告频率：</strong>无规制
                </div>
              </div>
              <div class="frequency-item">
                <h4>🔒 专任媒介</h4>
                <div class="frequency">
                  <strong>报告频率：</strong>2周1次以上
                </div>
                <div class="note">
                  <em>含休业日，报告方法无限制</em>
                </div>
              </div>
              <div class="frequency-item">
                <h4>🔐 专属专任</h4>
                <div class="frequency">
                  <strong>报告频率：</strong>1周1次以上
                </div>
                <div class="note">
                  <em>含休业日，报告方法无限制</em>
                </div>
              </div>
            </div>
          </div>

          <h3>实务注意事项</h3>
          <div class="practical-notes">
            <div class="note-item important">
              <h4>💡 重要实务要点</h4>
              <ul>
                <li>报告可以<strong>口头形式</strong>进行</li>
                <li>报告频率计算<strong>包含休业日</strong></li>
                <li>不利委托人的报告特约<strong>无效</strong></li>
                <li>有利委托人的报告特约<strong>有效</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 代理契约的准用 -->
        <section id="agency-contract" class="content-section">
          <h2>6. 代理契约的准用</h2>
          
          <h3>法律依据</h3>
          <div class="legal-basis">
            <div class="basis-item">
              <h4>📚 宅地建物取引業法</h4>
              <p>第<strong>34条の3</strong>规定代理契约准用媒介契约</p>
            </div>
          </div>

          <h3>准用规定内容</h3>
          <div class="application-rules">
            <div class="rule-grid">
              <div class="rule-card">
                <div class="rule-icon">📄</div>
                <div class="rule-content">
                  <h5>书面交付要求</h5>
                  <p>代理契约准用媒介契约的书面交付要求</p>
                </div>
              </div>
              <div class="rule-card">
                <div class="rule-icon">💻</div>
                <div class="rule-content">
                  <h5>レインズ登录义务</h5>
                  <p>代理契约同样需要履行登录义务</p>
                </div>
              </div>
              <div class="rule-card">
                <div class="rule-icon">📊</div>
                <div class="rule-content">
                  <h5>报告义务</h5>
                  <p>代理契约同样需要履行报告义务</p>
                </div>
              </div>
              <div class="rule-card">
                <div class="rule-icon">⚖️</div>
                <div class="rule-content">
                  <h5>规制一致性</h5>
                  <p>代理契约与媒介契约适用相同规制</p>
                </div>
              </div>
            </div>
          </div>

          <h3>实务注意事项</h3>
          <div class="agency-notes">
            <div class="agency-note-item">
              <h4>🔑 代理权限明确</h4>
              <ul>
                <li>代理权限必须在契约中<strong>明确记载</strong></li>
                <li>明确代理人的权限范围和限制</li>
              </ul>
            </div>
            <div class="agency-note-item">
              <h4>🎯 责任区分</h4>
              <ul>
                <li>代理契约的受托人有<strong>更大的权限和责任</strong></li>
                <li>必须明确区分媒介与代理的权限范围</li>
              </ul>
            </div>
            <div class="agency-note-item">
              <h4>📋 契约管理</h4>
              <ul>
                <li>建立完善的代理契约管理制度</li>
                <li>定期审查代理权限的执行情况</li>
              </ul>
            </div>
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
          <router-link to="/video?topic=mediation-intro" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=mediation" class="action-button">
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
  { id: 'key-terms', title: '关键术语', icon: '🔤' },
  { id: 'basic-concepts', title: '基本概念', icon: '📋' },
  { id: 'contract-comparison', title: '契约区别', icon: '⚖️' },
  { id: 'contract-document', title: '契约书面', icon: '📄' },
  { id: 'reins-obligation', title: 'レインズ义务', icon: '💻' },
  { id: 'business-reporting', title: '业务报告', icon: '📊' },
  { id: 'agency-contract', title: '代理契约', icon: '🔑' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '媒介契約（ばいかいけいやく）',
    chinese: '媒介契约',
    explanation: '委托不动产中介寻找交易对象的契约',
    example: '卖主委托中介寻找买主的契约'
  },
  {
    japanese: '専任媒介契約（せんにんばいかいけいやく）',
    chinese: '专任媒介契约',
    explanation: '只能委托一家中介，但允许自己寻找交易对象的契约',
    example: '3个月内只能通过A中介卖房，但可以自己找买主'
  },
  {
    japanese: '専属専任媒介契約（せんぞくせんにんばいかいけいやく）',
    chinese: '专属专任媒介契约',
    explanation: '只能委托一家中介，且不允许自己寻找交易对象的契约',
    example: '3个月内只能通过A中介卖房，不能自己找买主'
  },
  {
    japanese: '指定流通機構（レインズ）',
    chinese: '指定流通机构',
    explanation: '国土交通大臣指定的不动产流通标准信息系统',
    example: 'https://system.reins.jp/'
  },
  {
    japanese: '自己発見取引（じこはっけんとりひき）',
    chinese: '自己发现交易',
    explanation: '委托人自己寻找交易对象的行为',
    example: '卖主通过朋友介绍找到买主'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者Ａは、Ｂ所有の宅地の売却の媒介依頼を受け、Ｂと専任媒介契約を締結した。媒介契約の締結にあたって、業務処理状況を５日に１回報告するという特約は無効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '5日1次的报告频率比法定的2周1次更频繁，对委托人有利，因此特约有效。'
  },
  {
    question: '宅地建物取引業者Ａは、宅地建物取引業者でないＥから宅地の売却についての依頼を受け、専属専任媒介契約を締結したときは、当該宅地について法で規定されている事項を、契約締結の日から休業日数を含め５日以内に指定流通機構へ登録する義務がある。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '登录期限5日内不包括休业日，必须是营业日。'
  },
  {
    question: '媒介契約の締結に際して交付する書面には、宅地建物取引士の記名押印が必要である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '需要宅建业者的记名押印，不是宅建士的记名押印。'
  },
  {
    question: '一般媒介契約の場合、指定流通機構への登録は任意であるが、登録した場合には登録済証を依頼者に引き渡さなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '一般媒介无登录义务，但一旦登录就必须交付登录证明书。'
  },
  {
    question: '媒介契約書面の交付に代えて、依頼者の承諾を得て電磁的方法により提供することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '经委托人承诺，可以用电子方式代替书面交付。'
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
  learningStore.recordTopicStudyTime('mediation', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('mediation')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('mediation')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('mediation', 0)
  
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
.mediation-page {
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
.concept-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.concept-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.concept-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.example-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 3px solid #2a7960;
}

.application-scope {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.scope-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.scope-item.applicable {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.scope-item.not-applicable {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.scope-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.scope-content h4 {
  margin: 0 0 1rem 0;
}

.scope-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.scope-content li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.contract-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.contract-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.contract-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.contract-type ul {
  padding-left: 1.25rem;
  margin: 0;
  text-align: left;
}

.contract-type li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 表格样式 ========= */
.table-container {
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

.comparison-table td.allowed {
  background-color: #e7f7e7;
  color: #2e7d32;
}

.comparison-table td.not-allowed {
  background-color: #ffe7e7;
  color: #c62828;
}

.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.comparison-table tr:hover {
  background-color: #e9ecef;
}

.regulation-points {
  margin: 2rem 0;
}

.regulation-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.regulation-item.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.regulation-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.regulation-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.regulation-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.regulation-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 交付要求样式 ========= */
.delivery-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.requirement-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.requirement-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.requirement-item p {
  margin: 0;
}

.important-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #ffe7e7;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #c62828;
}

.document-items {
  margin: 2rem 0;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.item-number {
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

.item-content h5 {
  margin: 0 0 0.25rem 0;
  color: #1a472a;
}

.item-content p {
  margin: 0;
  font-size: 0.75rem;
  color: #6c757d;
}

.price-opinion {
  margin: 2rem 0;
}

.opinion-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.rule-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.rule-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.rule-item p {
  margin: 0;
}

/* ========= レインズ义务样式 ========= */
.reins-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.reins-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.reins-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.deadline {
  margin-bottom: 0.5rem;
}

.note {
  font-size: 0.75rem;
  color: #6c757d;
}

.registration-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.included-items, .excluded-items {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.included-items h4, .excluded-items h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.included-items ul, .excluded-items ul {
  padding-left: 1.25rem;
  margin: 0;
}

.included-items li, .excluded-items li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.notification-delivery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.notification-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.notification-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notification-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.notification-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 业务报告样式 ========= */
.application-report {
  margin: 2rem 0;
}

.report-type {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.report-type.universal {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.report-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.report-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.report-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.report-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.regular-reporting {
  margin: 2rem 0;
}

.report-frequency {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.frequency-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.frequency-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.frequency {
  margin-bottom: 0.5rem;
}

.practical-notes {
  margin: 2rem 0;
}

.note-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.note-item.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
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

/* ========= 代理契约样式 ========= */
.legal-basis {
  margin: 2rem 0;
}

.basis-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.basis-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.basis-item p {
  margin: 0;
}

.application-rules {
  margin: 2rem 0;
}

.rule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.rule-card {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.rule-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.rule-content h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rule-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.agency-notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.agency-note-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.agency-note-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.agency-note-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.agency-note-item li {
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
  
  .concept-grid {
    grid-template-columns: 1fr;
  }
  
  .application-scope {
    grid-template-columns: 1fr;
  }
  
  .contract-types {
    grid-template-columns: 1fr;
  }
  
  .delivery-requirements {
    grid-template-columns: 1fr;
  }
  
  .item-grid {
    grid-template-columns: 1fr;
  }
  
  .opinion-rules {
    grid-template-columns: 1fr;
  }
  
  .reins-requirements {
    grid-template-columns: 1fr;
  }
  
  .registration-items {
    grid-template-columns: 1fr;
  }
  
  .notification-delivery {
    grid-template-columns: 1fr;
  }
  
  .report-frequency {
    grid-template-columns: 1fr;
  }
  
  .rule-grid {
    grid-template-columns: 1fr;
  }
  
  .agency-notes {
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