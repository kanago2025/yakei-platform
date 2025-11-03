<!-- src/views/notes/business/Agent.vue -->
<template>
  <div class="agent-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>宅地建物取引士</span>
        </div>
        <h1>宅地建物取引士</h1>
        <p>不动产交易的专业资格者，负责重要事项说明、契约安全保障及交易纠纷预防的核心角色</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">28</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">60分钟</span>
            <span class="stat-label">建议学习时间</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">8</span>
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
            <li>掌握宅地建物取引士的资格取得流程和登录要求</li>
            <li>理解宅建士的欠格事由和禁止条件</li>
            <li>熟悉宅建士证的交付、更新和管理要求</li>
            <li>了解变更登录、登录移转的流程和条件</li>
            <li>掌握宅建士的届出义务和监督管理制度</li>
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

        <!-- 宅建士资格取得流程 -->
        <section id="qualification-process" class="content-section">
          <h2>1. 宅地建物取引士资格取得流程</h2>
          
          <h3>从考试合格到成为宅建士的完整流程</h3>
          <div class="process-flow">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>考试合格</h4>
                <p>通过宅建士国家考试</p>
                <div class="step-note">合格身份一生有效（除非被取消）</div>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>满足登录条件</h4>
                <ul>
                  <li><strong>2年以上实务经验</strong> 或</li>
                  <li><strong>登録実務講習</strong>（国土交通大臣登録）</li>
                </ul>
                <div class="step-note">必须满足其中一项条件</div>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>资格登录</h4>
                <p>在都道府县知事处进行资格登录</p>
                <div class="step-note">登录一生有效，全国通用</div>
              </div>
            </div>
            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>宅建士证交付</h4>
                <p>取得宅地建物取引士证</p>
                <div class="step-note">有效期间5年，需要更新</div>
              </div>
            </div>
          </div>

          <h3>实务经验与讲习要求</h3>
          <div class="qualification-comparison">
            <div class="comparison-item">
              <h4>📊 实务经验路径</h4>
              <ul>
                <li><strong>2年以上</strong>宅建相关实务经验</li>
                <li>需提供工作经验证明</li>
                <li>经验必须与不动产交易相关</li>
              </ul>
            </div>
            <div class="comparison-item">
              <h4>🎓 讲习路径</h4>
              <ul>
                <li>国土交通大臣登録的実務講習</li>
                <li>通过讲习可替代实务经验</li>
                <li>需达到规定的考核标准</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 欠格事由 -->
        <section id="disqualification" class="content-section">
          <h2>2. 欠格事由（不能登录的情况）</h2>
          
          <h3>宅建业者免许的欠格事由与共通事项</h3>
          <div class="disqualification-grid">
            <div class="disqualification-category">
              <h4>🚫 个人身份限制</h4>
              <ul>
                <li>破产程序开始后尚未复权者</li>
                <li>心身故障无法适正执行业务者</li>
                <li>成年被监护人/被保佐人</li>
                <li>暴力团员或退出未满5年者</li>
              </ul>
            </div>
            <div class="disqualification-category">
              <h4>⚖️ 刑事处罚相关</h4>
              <ul>
                <li>一定刑罚被执行者</li>
                <li>违反宅建业法被处罚者</li>
                <li>其他法律规定的禁止情形</li>
              </ul>
            </div>
            <div class="disqualification-category">
              <h4>📋 行政处分相关</h4>
              <ul>
                <li>免许取消处分后未满5年</li>
                <li>登録消除处分后未满5年</li>
                <li>事务禁止处分期间</li>
              </ul>
            </div>
          </div>

          <h3>登録消除处分的具体事由</h3>
          <div class="elimination-reasons">
            <div class="reason-item serious">
              <div class="reason-icon">🔴</div>
              <div class="reason-content">
                <h4>严重违规行为（消除后5年内不能登录）</h4>
                <ul>
                  <li>不正当手段取得登录</li>
                  <li>不正当手段取得宅建士证</li>
                  <li>事务禁止处分情节特别严重</li>
                  <li>违反事务禁止处分</li>
                  <li>无宅建士证执行业务且情节严重</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>未成年人登录的特殊规定</h3>
          <div class="minor-registration">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>未成年人类型</th>
                    <th>登录可能性</th>
                    <th>条件</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>与成年人同等行为能力</strong></td>
                    <td>✅ 可登录</td>
                    <td>无特殊限制</td>
                  </tr>
                  <tr>
                    <td><strong>与成年人不同等行为能力</strong></td>
                    <td>⚠️ 有条件登录</td>
                    <td>本人和法定代理人均无欠格事由</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 宅建士的登录管理 -->
        <section id="registration-management" class="content-section">
          <h2>3. 宅建士的登录管理</h2>
          
          <h3>变更登录</h3>
          <div class="change-registration">
            <div class="notice-box important">
              <strong>必须及时申请变更登录的情况</strong>
              <p>以下事项变更时，必须<strong>迟滞なく（及时）</strong>申请变更登录：</p>
            </div>
            
            <div class="change-items">
              <div class="change-item">
                <h4>👤 个人信息变更</h4>
                <ul>
                  <li><strong>氏名</strong>（需要宅建士证书换交付）</li>
                  <li><strong>住所</strong>（需要宅建士证书换交付）</li>
                  <li><strong>本籍</strong></li>
                </ul>
              </div>
              <div class="change-item">
                <h4>🏢 勤务信息变更</h4>
                <ul>
                  <li><strong>商号或名称</strong>（勤务的宅建业者）</li>
                  <li><strong>免许证番号</strong>（勤务的宅建业者）</li>
                </ul>
              </div>
            </div>

            <div class="special-notes">
              <h4>💡 特别注意</h4>
              <ul>
                <li>事务禁止处分期间<strong>也需要</strong>申请变更登录</li>
                <li>勤务先业者住所变更时，如不进行免许换え则无需届出</li>
                <li>如进行免许换え导致免许证番号变更，则需要届出</li>
              </ul>
            </div>
          </div>

          <h3>登录的移转</h3>
          <div class="transfer-registration">
            <div class="transfer-info">
              <div class="info-item">
                <h4>🔄 移转性质</h4>
                <p><strong>任意申请</strong>，不是义务</p>
                <p class="note">登录效力全国通用，无需必须移转</p>
              </div>
              <div class="info-item">
                <h4>🚫 禁止期间</h4>
                <p>事务禁止期间<strong>不能</strong>进行登录移转</p>
              </div>
              <div class="info-item">
                <h4>⏱️ 有效期间</h4>
                <p>移转后的宅建士证<strong>继承</strong>移转前的有效期间</p>
                <p class="note">不是重新计算5年</p>
              </div>
            </div>

            <div class="transfer-process">
              <h4>📋 移转流程（例）</h4>
              <div class="process-example">
                <div class="process-step">
                  <div class="step-label">甲県知事登録宅建士A</div>
                  <div class="step-arrow">→</div>
                  <div class="step-label">经甲県知事申请</div>
                  <div class="step-arrow">→</div>
                  <div class="step-label">乙県知事登录</div>
                </div>
              </div>
            </div>

            <div class="transfer-conditions">
              <h4>✅ 移转条件</h4>
              <ul>
                <li><strong>仅限</strong>勤务先都道府县变更的情况</li>
                <li>仅自宅住所变更<strong>不能</strong>申请登录移转</li>
                <li>例：甲県登录→乙県居住→丙県勤务：可向丙県申请移转</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 届出义务 -->
        <section id="reporting-obligation" class="content-section">
          <h2>4. 届出义务</h2>
          
          <h3>死亡等情况的届出要求</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>事由</th>
                  <th>届出义务者</th>
                  <th>失效时间</th>
                  <th>届出期限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>死亡</strong></td>
                  <td>相続人</td>
                  <td>死亡时</td>
                  <td>死亡を知った日から30日以内</td>
                </tr>
                <tr>
                  <td><strong>心身故障</strong></td>
                  <td>本人・法定代理人・同居親族</td>
                  <td>届出时</td>
                  <td>事由发生日から30日以内</td>
                </tr>
                <tr>
                  <td><strong>破产</strong></td>
                  <td>本人</td>
                  <td>届出时</td>
                  <td>事由发生日から30日以内</td>
                </tr>
                <tr>
                  <td><strong>其他</strong></td>
                  <td>本人</td>
                  <td>届出时</td>
                  <td>事由发生日から30日以内</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="reporting-notes">
            <div class="note-item important">
              <h4>💡 重要注意点</h4>
              <ul>
                <li>死亡情况的届出期限是<strong>"知道死亡之日"</strong>起30日内，不是死亡之日</li>
                <li>其他情况的届出期限是<strong>"事由发生之日"</strong>起30日内</li>
                <li>届出后登录效力在届出时失效（死亡时为死亡时失效）</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 宅地建物取引士证 -->
        <section id="agent-certificate" class="content-section">
          <h2>5. 宅地建物取引士证</h2>
          
          <h3>宅建士证的基本要求</h3>
          <div class="certificate-basics">
            <div class="certificate-item">
              <h4>📇 证件信息</h4>
              <ul>
                <li>氏名、生年月日、住所</li>
                <li>登录番号、登录年月日</li>
                <li>有效期间、交付年月日</li>
                <li>発行番号</li>
              </ul>
            </div>
            <div class="certificate-item">
              <h4>⏱️ 有效期间</h4>
              <ul>
                <li><strong>5年有效</strong></li>
                <li>可更新</li>
                <li>更新时需要接受法定讲习</li>
              </ul>
            </div>
            <div class="certificate-item">
              <h4>🚫 无条件交付</h4>
              <ul>
                <li>与宅建业免许不同</li>
                <li>不能对宅建士证附加条件</li>
                <li>必须无条件交付</li>
              </ul>
            </div>
          </div>

          <h3>提示义务</h3>
          <div class="presentation-obligation">
            <div class="obligation-type">
              <h4>📋 必须提示的情况</h4>
              <ul>
                <li><strong>重要事项说明时</strong>（即使无请求也必须提示）</li>
                <li><strong>交易关系者请求时</strong></li>
              </ul>
            </div>
            <div class="privacy-protection">
              <h4>🔒 隐私保护措施</h4>
              <ul>
                <li>允许在住所栏<strong>贴可移除的贴纸</strong></li>
                <li>禁止<strong>涂黑或贴不可移除的贴纸</strong></li>
                <li>必须保证提示时能确认完整信息</li>
              </ul>
            </div>
          </div>

          <h3>讲习要求</h3>
          <div class="training-requirements">
            <div class="training-item">
              <h4>🎓 必须接受讲习的情况</h4>
              <ul>
                <li>宅建士证<strong>交付申请</strong>时（申请前6个月内）</li>
                <li>宅建士证<strong>更新</strong>时</li>
              </ul>
            </div>
            <div class="training-item">
              <h4>✅ 免除讲习的情况</h4>
              <ul>
                <li>考试合格后<strong>1年以内</strong>申请交付</li>
                <li>登录移转时<strong>同时</strong>申请交付</li>
                <li>遗失后再发行申请</li>
              </ul>
            </div>
          </div>

          <h3>宅建士证的管理</h3>
          <div class="certificate-management">
            <div class="management-type">
              <h4>📤 提出义务</h4>
              <ul>
                <li>事务禁止处分时必须<strong>提出</strong>宅建士证</li>
                <li>向<strong>交付知事</strong>提出（不一定是处分知事）</li>
                <li>事务禁止期间结束后可请求返还</li>
              </ul>
            </div>
            <div class="management-type">
              <h4>📥 返纳义务</h4>
              <ul>
                <li>宅建士证<strong>失效</strong>时</li>
                <li>登录<strong>消除</strong>时</li>
                <li>必须返还给<strong>交付知事</strong></li>
              </ul>
            </div>
            <div class="management-type">
              <h4>🔄 书换交付</h4>
              <ul>
                <li><strong>住所或氏名</strong>变更时需要书换交付</li>
                <li><strong>勤务先</strong>变更时<strong>不需要</strong>书换交付</li>
                <li>需与变更登录<strong>同时申请</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 宅建士的业务处理 -->
        <section id="business-handling" class="content-section">
          <h2>6. 宅建士的业务处理</h2>
          
          <div class="business-principles">
            <div class="principle-item">
              <h4>🎯 业务处理原则</h4>
              <ul>
                <li><strong>公正且诚实</strong>地处理事务</li>
                <li>确保消费者<strong>安全交易</strong></li>
                <li>与周边业务从业者<strong>协同合作</strong></li>
                <li><strong>维持和提高</strong>知识能力</li>
              </ul>
            </div>
            <div class="principle-item">
              <h4>🚫 禁止行为</h4>
              <ul>
                <li>损害信用的行为</li>
                <li>损害品位的行为</li>
                <li>其他不正当行为</li>
              </ul>
            </div>
          </div>

          <h3>宅建士的法定事务</h3>
          <div class="legal-affairs">
            <div class="affair-item important">
              <div class="affair-icon">📋</div>
              <div class="affair-content">
                <h4>重要事项的说明</h4>
                <p>35条说明义务的核心业务</p>
              </div>
            </div>
            <div class="affair-item important">
              <div class="affair-icon">📄</div>
              <div class="affair-content">
                <h4>重要事项说明书记名</h4>
                <p>必须由宅建士记名</p>
              </div>
            </div>
            <div class="affair-item important">
              <div class="affair-icon">✍️</div>
              <div class="affair-content">
                <h4>37条书面的记名</h4>
                <p>契约书的法律要求</p>
              </div>
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
          <router-link to="/video?topic=agent-intro" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=agent" class="action-button">
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
  { id: 'qualification-process', title: '资格取得', icon: '🎓' },
  { id: 'disqualification', title: '欠格事由', icon: '🚫' },
  { id: 'registration-management', title: '登录管理', icon: '📋' },
  { id: 'reporting-obligation', title: '届出义务', icon: '📝' },
  { id: 'agent-certificate', title: '宅建士证', icon: '📇' },
  { id: 'business-handling', title: '业务处理', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '宅地建物取引士登録（たくちたてものとりひきしとうろく）',
    chinese: '宅地建物取引士登录',
    explanation: '考试合格后满足条件者在都道府县知事处进行的资格登记',
    example: '登录一生有效，全国通用'
  },
  {
    japanese: '欠格事由（けっかくじゆう）',
    chinese: '欠格事由',
    explanation: '不能取得宅建士登录的法定事由，包括刑事、行政处分等',
    example: '破产未复权、心身故障、暴力团员等'
  },
  {
    japanese: '変更登録（へんこうとうろく）',
    chinese: '变更登录',
    explanation: '登录事项变更时必须及时申请的登记变更手续',
    example: '氏名、住所等变更时需要申请'
  },
  {
    japanese: '登録の移転（とうろくのいてん）',
    chinese: '登录的移转',
    explanation: '勤务地变更时向新的都道府县申请登录转移',
    example: '经现任知事向新任知事申请，非义务性'
  },
  {
    japanese: '宅地建物取引士証（たくちたてものとりひきししょう）',
    chinese: '宅地建物取引士证',
    explanation: '宅建士执行业务时必须持有的证件，5年有效需更新',
    example: '重要事项说明时必须提示'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引士資格試験に合格した者は、合格した日から10年以内に登録の申請をしなければ、その合格は無効となる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '合格身份一生有效（除非被取消），没有10年期限的限制。'
  },
  {
    question: '未成年者は、成年者と同一の行為能力を有していたとしても、成年に達するまでは宅地建物取引士の登録を受けることができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '与成年人同等行为能力的未成年人可以登录，无需等到成年。'
  },
  {
    question: '宅地建物取引士A（甲県知事登録）が、宅地建物取引業者B社（乙県知事免許）に従事した場合、Aは乙県知事に対し、甲県知事を経由して登録の移転を申請しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '登录的移转是任意申请，不是义务。登录效力全国通用。'
  },
  {
    question: '丙県知事の登録を受けている宅地建物取引士が、丁県知事への登録の移転の申請とともに宅地建物取引士証の交付の申請をした場合は、丁県知事から、移転前の宅地建物取引士証の有効期間が経過するまでの期間を有効期間とする新たな宅地建物取引士証が交付される。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '移转后的宅建士证继承移转前的有效期间，不是重新计算5年。'
  },
  {
    question: '宅地建物取引士が死亡した場合、その相続人は、死亡した日から30日以内に、その旨を当該宅地建物取引士の登録をしている都道府県知事に届け出なければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '死亡情况的届出期限是"知道死亡之日"起30日内，不是死亡之日。'
  },
  {
    question: '宅地建物取引士は、勤務先を変更したとき、宅地建物取引士証の書換え交付の申請を行わなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '勤务先变更不需要书换交付，只有住所或氏名变更时需要。'
  },
  {
    question: '事務禁止処分期間中でも、変更の登録の申請は必要である。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '事务禁止处分期间也需要申请变更登录，但期间不能进行登录移转。'
  },
  {
    question: '宅地建物取引士証の有効期間は、登録の移転をした場合、新たに5年間となる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '移转后的宅建士证继承移转前的剩余有效期间，不是重新计算5年。'
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
  learningStore.recordTopicStudyTime('agent', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('agent')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('agent')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('agent', 0)
  
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
.agent-page {
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

/* ========= 流程步骤样式 ========= */
.process-flow {
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

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.step-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.step-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #2a7960;
}

/* ========= 资格比较样式 ========= */
.qualification-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.comparison-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comparison-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.comparison-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 欠格事由网格样式 ========= */
.disqualification-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.disqualification-category {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.disqualification-category h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.disqualification-category ul {
  padding-left: 1.25rem;
  margin: 0;
}

.disqualification-category li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 消除事由样式 ========= */
.elimination-reasons {
  margin: 2rem 0;
}

.reason-item {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.reason-item.serious {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.reason-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.reason-content h4 {
  margin: 0 0 1rem 0;
  color: #c62828;
}

.reason-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.reason-content li {
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

/* ========= 变更登录样式 ========= */
.change-registration {
  margin: 2rem 0;
}

.notice-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.notice-box.important {
  background: #ffe7e7;
  border-color: #dc3545;
}

.change-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
}

.change-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.change-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.change-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.change-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.special-notes {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  border-left: 4px solid #2a7960;
}

.special-notes h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.special-notes ul {
  padding-left: 1.25rem;
  margin: 0;
}

.special-notes li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 登录移转样式 ========= */
.transfer-registration {
  margin: 2rem 0;
}

.transfer-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.info-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.info-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.info-item p {
  margin: 0;
}

.note {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.transfer-process {
  margin: 2rem 0;
}

.process-example {
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 12px;
}

.process-step {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.step-label {
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  font-size: 0.875rem;
}

.step-arrow {
  color: #2a7960;
  font-weight: bold;
}

.transfer-conditions {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 12px;
  border: 1px solid #28a745;
}

.transfer-conditions h4 {
  margin: 0 0 1rem 0;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.transfer-conditions ul {
  padding-left: 1.25rem;
  margin: 0;
}

.transfer-conditions li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 届出表格样式 ========= */
.reporting-table {
  margin: 2rem 0;
}

.reporting-notes {
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

/* ========= 宅建士证样式 ========= */
.certificate-basics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.certificate-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.certificate-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.certificate-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.certificate-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.presentation-obligation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.obligation-type, .privacy-protection {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.obligation-type h4, .privacy-protection h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.obligation-type ul, .privacy-protection ul {
  padding-left: 1.25rem;
  margin: 0;
}

.obligation-type li, .privacy-protection li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.training-requirements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.training-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.training-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.training-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.training-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.certificate-management {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.management-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.management-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.management-type ul {
  padding-left: 1.25rem;
  margin: 0;
}

.management-type li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 业务处理样式 ========= */
.business-principles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.principle-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.principle-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.principle-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.principle-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.legal-affairs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.affair-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.affair-item.important {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.affair-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.affair-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.affair-content p {
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
  
  .qualification-comparison {
    grid-template-columns: 1fr;
  }
  
  .change-items {
    grid-template-columns: 1fr;
  }
  
  .presentation-obligation {
    grid-template-columns: 1fr;
  }
  
  .training-requirements {
    grid-template-columns: 1fr;
  }
  
  .business-principles {
    grid-template-columns: 1fr;
  }
  
  .transfer-info {
    grid-template-columns: 1fr;
  }
  
  .certificate-basics,
  .certificate-management {
    grid-template-columns: 1fr;
  }
  
  .disqualification-grid {
    grid-template-columns: 1fr;
  }
  
  .legal-affairs {
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
  
  .process-flow {
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