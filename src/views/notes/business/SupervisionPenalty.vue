<!-- src/views/notes/business/SupervisionPenalty.vue -->
<template>
  <div class="supervision-penalty-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>监督与罚则</span>
        </div>
        <h1>监督与罚则</h1>
        <p>宅建业者和宅建士违反法律法规时的监督处分体系及罚则标准</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">26</span>
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
            <li>理解对宅建业者和宅建士的监督处分体系</li>
            <li>掌握指示处分、业务停止处分、免许取消处分的区别和适用条件</li>
            <li>熟悉监督处分的程序要求和公告制度</li>
            <li>了解各类违反行为的罚则标准和处罚类型</li>
            <li>掌握监督处分中的特例和特殊规定</li>
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

        <!-- 监督体系概述 -->
        <section id="supervision-overview" class="content-section">
          <h2>1. 监督体系概述</h2>
          
          <h3>监督机关权限划分</h3>
          <div class="supervision-authority">
            <div class="authority-item">
              <h4>🏛️ 国土交通大臣</h4>
              <ul>
                <li>对<strong>全国所有</strong>宅建业者和宅建士有监督权</li>
                <li>可进行必要的<strong>指导、助言、劝告</strong></li>
                <li>可要求<strong>报告</strong>和进行<strong>立入检查</strong></li>
              </ul>
            </div>
            <div class="authority-item">
              <h4>🏢 都道府县知事</h4>
              <ul>
                <li>对<strong>管辖区域内</strong>的宅建业者和宅建士有监督权</li>
                <li>可进行必要的<strong>指导、助言、劝告</strong></li>
                <li>可要求<strong>报告</strong>和进行<strong>立入检查</strong></li>
              </ul>
            </div>
          </div>

          <h3>监督处分类型（从轻到重）</h3>
          <div class="penalty-hierarchy">
            <div class="penalty-level">
              <div class="level-indicator mild">轻</div>
              <div class="level-content">
                <h4>指示处分</h4>
                <p>对违法行为发出的改正指示</p>
              </div>
            </div>
            <div class="penalty-arrow">→</div>
            <div class="penalty-level">
              <div class="level-indicator medium">中</div>
              <div class="level-content">
                <h4>业务停止处分</h4>
                <p>最长1年停止全部或部分业务</p>
              </div>
            </div>
            <div class="penalty-arrow">→</div>
            <div class="penalty-level">
              <div class="level-indicator severe">重</div>
              <div class="level-content">
                <h4>免许取消处分</h4>
                <p>取消营业资格的最严重处分</p>
              </div>
            </div>
          </div>

          <h3>监督基本原则</h3>
          <div class="supervision-principles">
            <div class="principle-card">
              <div class="principle-icon">👂</div>
              <div class="principle-content">
                <h4>听证原则</h4>
                <p>处分前必须进行<strong>听证（聴聞）</strong></p>
              </div>
            </div>
            <div class="principle-card">
              <div class="principle-icon">📢</div>
              <div class="principle-content">
                <h4>公告原则</h4>
                <p>重大处分必须<strong>公告</strong></p>
              </div>
            </div>
            <div class="principle-card">
              <div class="principle-icon">🔄</div>
              <div class="principle-content">
                <h4>信息共享</h4>
                <p>跨区域监督需<strong>信息共享</strong></p>
              </div>
            </div>
          </div>
        </section>

        <!-- 对宅建业者的监督处分 -->
        <section id="business-supervision" class="content-section">
          <h2>2. 对宅建业者的监督处分</h2>
          
          <h3>指示处分（第65条第1项）</h3>
          <div class="instruction-penalty">
            <div class="penalty-conditions">
              <h4>✅ 适用情形</h4>
              <ul>
                <li>对交易关系者<strong>造成损害</strong>或有损害风险</li>
                <li><strong>损害交易公正</strong>的行为或有损害风险</li>
                <li>违反<strong>其他法令</strong>被认为不适当</li>
                <li>宅建士受处分且业者有<strong>归责事由</strong></li>
              </ul>
            </div>
            <div class="penalty-notes">
              <div class="note-item important">
                <h4>💡 重要特征</h4>
                <ul>
                  <li>最轻的监督处分</li>
                  <li>免许权者或业务地知事均可进行</li>
                  <li>不需要公告</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>业务停止处分（第65条第2项）</h3>
          <div class="business-suspension">
            <div class="suspension-details">
              <div class="detail-item">
                <h4>⏱️ 停止期间</h4>
                <p><strong>最长1年</strong></p>
              </div>
              <div class="detail-item">
                <h4>🏛️ 处分机关</h4>
                <p>免许权者或业务地知事均可</p>
              </div>
              <div class="detail-item">
                <h4>📋 必须停止的情形</h4>
                <ul>
                  <li>违反<strong>业务停止命令</strong>继续营业</li>
                  <li><strong>不正手段</strong>取得免许</li>
                  <li>其他<strong>严重违法行为</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <h3>认可取消处分（第66条）</h3>
          <div class="approval-revocation">
            <div class="revocation-conditions">
              <h4>🔴 认可取消的情形</h4>
              <ul>
                <li>宅建业者通过<strong>不正当手段</strong>获得认可</li>
                <li>违反认可所附带的<strong>条件或限制</strong></li>
                <li>发生认可事由后<strong>不再符合认可条件</strong></li>
                <li>其他<strong>违反法令</strong>且情节严重的情形</li>
              </ul>
            </div>
            <div class="revocation-notes">
              <div class="note-item warning">
                <h4>⚠️ 处理方式</h4>
                <ul>
                  <li>只能由<strong>免许权者</strong>进行</li>
                  <li>处分前必须进行<strong>听证</strong></li>
                  <li>处分后必须<strong>公告</strong></li>
                  <li>记载于<strong>宅建业者名簿</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <h3>免许取消处分（第66条）</h3>
          <div class="license-revocation">
            <div class="revocation-conditions">
              <h4>🔴 必须取消的情形</h4>
              <ul>
                <li>出现<strong>欠格事由</strong>（破产、心身故障等）</li>
                <li>取得免许后<strong>1年内未开始营业</strong></li>
                <li><strong>持续1年以上停业</strong></li>
                <li><strong>不正手段</strong>取得免许</li>
                <li>违反<strong>业务停止处分</strong>情节严重</li>
              </ul>
            </div>
            <div class="revocation-notes">
              <div class="note-item warning">
                <h4>⚠️ 注意点</h4>
                <ul>
                  <li>只能由<strong>免许权者</strong>进行</li>
                  <li>处分后必须<strong>公告</strong></li>
                  <li>记载于<strong>宅建业者名簿</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 对宅建士的监督处分 -->
        <section id="agent-supervision" class="content-section">
          <h2>3. 对宅建士的监督处分</h2>
          
          <h3>指示处分（第68条）</h3>
          <div class="agent-instruction">
            <div class="violation-types">
              <div class="violation-item">
                <h4>🚫 主要违规行为</h4>
                <ul>
                  <li>允许他人使用<strong>自己名义</strong></li>
                  <li>业务处理中有<strong>不正或明显不当行为</strong></li>
                  <li>在其他事务所作为<strong>专任宅建士表示</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <h3>事务禁止处分（第68条）</h3>
          <div class="work-prohibition">
            <div class="prohibition-details">
              <div class="detail-item">
                <h4>⏱️ 禁止期间</h4>
                <p><strong>最长1年</strong></p>
              </div>
              <div class="detail-item">
                <h4>🏛️ 处分机关</h4>
                <p>登录地知事或行为地知事均可</p>
              </div>
              <div class="detail-item">
                <h4>📇 证件管理</h4>
                <p>处分期间必须<strong>提交宅建士证</strong></p>
              </div>
            </div>
          </div>

          <h3>登录消除处分（第68条之二）</h3>
          <div class="registration-elimination">
            <div class="elimination-conditions">
              <h4>🔴 必须消除的情形</h4>
              <ul>
                <li>出现<strong>欠格事由</strong></li>
                <li><strong>不正手段</strong>取得登录或宅建士证</li>
                <li><strong>事务禁止处分</strong>情节特别严重</li>
                <li>违反<strong>事务禁止处分</strong></li>
                <li>无宅建士证执行业务且<strong>情节严重</strong></li>
              </ul>
            </div>
            <div class="elimination-effect">
              <div class="effect-item important">
                <h4>💡 处分效果</h4>
                <ul>
                  <li>登录<strong>立即失效</strong></li>
                  <li>必须<strong>返纳宅建士证</strong></li>
                  <li>消除后<strong>5年内不能重新登录</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 监督处分程序 -->
        <section id="supervision-procedure" class="content-section">
          <h2>4. 监督处分程序</h2>
          
          <h3>听证程序要求</h3>
          <div class="hearing-procedure">
            <div class="procedure-steps">
              <div class="procedure-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>听证通知</h4>
                  <p>听证期日<strong>1周前</strong>通知并公示</p>
                </div>
              </div>
              <div class="procedure-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>公开听证</h4>
                  <p>听证必须<strong>公开进行</strong></p>
                </div>
              </div>
              <div class="procedure-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>处分决定</h4>
                  <p>基于听证结果作出处分决定</p>
                </div>
              </div>
            </div>
            <div class="hearing-requirements">
              <h4>📋 必须听证的处分</h4>
              <ul>
                <li><strong>业务停止</strong>处分</li>
                <li><strong>免许取消</strong>处分</li>
                <li><strong>认可取消</strong>处分</li>
                <li><strong>事务禁止</strong>处分</li>
              </ul>
            </div>
          </div>

          <h3>公告和通知义务</h3>
          <div class="notification-requirements">
            <div class="notification-types">
              <div class="notification-item">
                <h4>📢 必须公告的处分</h4>
                <ul>
                  <li><strong>业务停止</strong>处分</li>
                  <li><strong>免许取消</strong>处分</li>
                  <li><strong>认可取消</strong>处分</li>
                </ul>
              </div>
              <div class="notification-item">
                <h4>🔄 通知要求</h4>
                <ul>
                  <li>业务地知事处分 → 通知<strong>免许权者</strong></li>
                  <li>跨区域处分 → <strong>相关信息共享</strong></li>
                  <li>处分内容记载于<strong>宅建业者名簿</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 罚则体系 -->
        <section id="penalty-system" class="content-section">
          <h2>5. 罚则体系</h2>
          
          <h3>刑事罚（惩役+罚金）</h3>
          <div class="criminal-penalties">
            <div class="penalty-category severe">
              <h4>⛓️ 3年以下惩役或300万日元以下罚金</h4>
              <ul>
                <li><strong>无免许营业</strong></li>
                <li><strong>名义贷出</strong></li>
                <li>违反<strong>业务停止命令</strong></li>
              </ul>
            </div>
            <div class="penalty-category medium">
              <h4>⚖️ 2年以下惩役或300万日元以下罚金</h4>
              <ul>
                <li><strong>重要事实不告知</strong>等禁止行为</li>
              </ul>
            </div>
            <div class="penalty-category mild">
              <h4>📝 1年以下惩役或100万日元以下罚金</h4>
              <ul>
                <li><strong>不当高额报酬</strong>要求</li>
              </ul>
            </div>
            <div class="penalty-category light">
              <h4>💰 6月以下惩役或100万日元以下罚金</h4>
              <ul>
                <li>营业保证金供托前<strong>营业开始</strong></li>
                <li><strong>夸大广告</strong></li>
                <li><strong>不当履行迟延</strong></li>
                <li><strong>手付贷与</strong>诱引契约</li>
              </ul>
            </div>
          </div>

          <h3>行政罚（罚款）</h3>
          <div class="administrative-penalties">
            <div class="penalty-grid">
              <div class="penalty-item">
                <h4>💴 100万日元以下罚金</h4>
                <ul>
                  <li>免许申请书<strong>虚假记载</strong></li>
                  <li><strong>名义贷出</strong>营业表示</li>
                  <li>专任宅建士<strong>设置要件欠缺</strong></li>
                  <li><strong>超基准额报酬</strong>受领</li>
                </ul>
              </div>
              <div class="penalty-item">
                <h4>💵 50万日元以下罚金</h4>
                <ul>
                  <li>帐簿<strong>备置义务违反</strong></li>
                  <li>从业者名簿<strong>义务违反</strong></li>
                  <li>变更<strong>届出怠慢</strong></li>
                  <li>37条书面<strong>交付怠慢</strong></li>
                </ul>
              </div>
              <div class="penalty-item">
                <h4>💶 10万日元以下罚款</h4>
                <ul>
                  <li>宅建士证<strong>返纳义务违反</strong></li>
                  <li>宅建士证<strong>提出义务违反</strong></li>
                  <li>重要事项说明时<strong>提示义务违反</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 特殊规定 -->
        <section id="special-provisions" class="content-section">
          <h2>6. 特殊规定</h2>
          
          <h3>两罚规定</h3>
          <div class="dual-penalty">
            <div class="penalty-explanation">
              <div class="explanation-item">
                <h4>🏢 法人处罚</h4>
                <p>法人代表或从业人员业务违法时，除处罚<strong>行为者</strong>外，对<strong>法人</strong>也科处罚金</p>
              </div>
              <div class="explanation-item">
                <h4>💸 处罚标准</h4>
                <p>严重违法行为对法人科处<strong>1亿日元以下</strong>罚金</p>
              </div>
            </div>
          </div>

          <h3>与内阁总理大臣的协议</h3>
          <div class="cabinet-agreement">
            <div class="agreement-requirements">
              <div class="requirement-item important">
                <h4>🤝 协议要求</h4>
                <ul>
                  <li>消费者利益保护相关处分时</li>
                  <li>国土交通大臣需<strong>事先</strong>与内阁总理大臣协议</li>
                  <li>确保消费者保护政策的<strong>统一性</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <h3>监督处分的记录</h3>
          <div class="record-keeping">
            <div class="record-types">
              <div class="record-item">
                <h4>📚 宅建业者名簿</h4>
                <ul>
                  <li>业务停止、免许取消等处分必须<strong>记载</strong></li>
                  <li>供<strong>一般公众查阅</strong></li>
                  <li>保持<strong>信息公开透明</strong></li>
                </ul>
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
          <router-link to="/video?topic=supervision-penalty" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=supervision" class="action-button">
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
  { id: 'supervision-overview', title: '监督体系', icon: '🏛️' },
  { id: 'business-supervision', title: '业者监督', icon: '🏢' },
  { id: 'agent-supervision', title: '宅建士监督', icon: '👨‍💼' },
  { id: 'supervision-procedure', title: '处分程序', icon: '📋' },
  { id: 'penalty-system', title: '罚则体系', icon: '⚖️' },
  { id: 'special-provisions', title: '特殊规定', icon: '🔍' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据 - 添加认可取消术语
const keyTerms = [
  {
    japanese: '監督処分（かんとくしょぶん）',
    chinese: '监督处分',
    explanation: '国土交通大臣或都道府县知事对违反法律的宅建业者或宅建士采取的行政措施',
    example: '指示处分、业务停止处分、免许取消处分'
  },
  {
    japanese: '指示処分（しじしょぶん）',
    chinese: '指示处分',
    explanation: '监督机关对违法行为发出的改正指示，是最轻的监督处分',
    example: '对不当广告行为发出改正指示'
  },
  {
    japanese: '業務停止処分（ぎょうむていししょぶん）',
    chinese: '业务停止处分',
    explanation: '责令宅建业者在一定期间内停止全部或部分业务的处分',
    example: '因违反重要事项说明义务被停止业务1年'
  },
  {
    japanese: '認可取消処分（にんかとりけししょぶん）',
    chinese: '认可取消处分',
    explanation: '对宅建业者已获得的特定认可因违反条件或法律规定而予以取消的处分',
    example: '因违反认可条件被取消特定业务认可'
  },
  {
    japanese: '免許取消処分（めんきょとりけししょぶん）',
    chinese: '免许取消处分',
    explanation: '取消宅建业者营业资格的最严重处分',
    example: '因无免许营业被取消资格'
  },
  {
    japanese: '過料（かりょう）',
    chinese: '罚款（行政罚）',
    explanation: '对违反行政义务的行为科处的金钱处罚，区别于刑事罚金',
    example: '宅建士证未提示被处10万日元以下罚款'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者が、第六十五条第二項の規定による業務の停止の命令に違反して業務を営んだ場合、三年以下の懲役若しくは三百万円以下の罰金に処し、又はこれを併科することがある。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '违反业务停止命令继续营业的，处3年以下惩役或300万日元以下罚金，或并科。'
  },
  {
    question: '都道府県知事は、その免許を受けた宅地建物取引業者に対して業務の停止を命じたときは、その旨を公告しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '业务停止处分必须公告，让公众知晓。'
  },
  {
    question: '宅地建物取引士が、重要事項の説明を行うに際して宅地建物取引士証の提示を怠った場合、五十万円以下の罰金に処せられる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '重要事项说明时未提示宅建士证的，处10万日元以下罚款（过料），不是罚金。'
  },
  {
    question: '国土交通大臣は、その免許を受けた宅地建物取引業者が第三十五条第一項第十四号イに規定する宅地建物取引業者の相手方等の利益保護に関わる規定に違反した場合、監督処分をしようとするときは、あらかじめ内閣総理大臣に協議しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '消费者利益保护相关处分时，需事先与内阁总理大臣协议。'
  },
  {
    question: '業務停止処分の最大期間は、二年である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '业务停止处分的最大期间是1年。'
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
  learningStore.recordTopicStudyTime('supervision-penalty', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('supervision-penalty')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('supervision-penalty')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('supervision-penalty', 0)
  
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
.supervision-penalty-page {
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

/* ========= 监督权限样式 ========= */
.supervision-authority {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.authority-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.authority-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.authority-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.authority-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 罚则层级样式 ========= */
.penalty-hierarchy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.penalty-level {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  min-width: 180px;
}

.level-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1rem;
  color: white;
}

.level-indicator.mild {
  background: #28a745;
}

.level-indicator.medium {
  background: #ffc107;
}

.level-indicator.severe {
  background: #dc3545;
}

.level-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.level-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.penalty-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

/* ========= 监督原则样式 ========= */
.supervision-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.principle-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
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

/* ========= 指示处分样式 ========= */
.instruction-penalty {
  margin: 2rem 0;
}

.penalty-conditions {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 12px;
  border: 1px solid #28a745;
  margin-bottom: 1.5rem;
}

.penalty-conditions h4 {
  margin: 0 0 1rem 0;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.penalty-conditions ul {
  padding-left: 1.25rem;
  margin: 0;
}

.penalty-conditions li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.penalty-notes {
  margin: 1.5rem 0;
}

.note-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.note-item.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.note-item.warning {
  background: #ffe7e7;
  border: 1px solid #dc3545;
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

/* ========= 业务停止样式 ========= */
.business-suspension {
  margin: 2rem 0;
}

.suspension-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.detail-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.detail-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.detail-item p {
  margin: 0;
}

.detail-item ul {
  padding-left: 1.25rem;
  margin: 0;
  text-align: left;
}

.detail-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 认可取消样式 ========= */
.approval-revocation {
  margin: 2rem 0;
}

.approval-revocation .revocation-conditions {
  padding: 1.5rem;
  background: #fff3e0;
  border-radius: 12px;
  border: 1px solid #ff9800;
  margin-bottom: 1.5rem;
}

.approval-revocation .revocation-conditions h4 {
  margin: 0 0 1rem 0;
  color: #e65100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.approval-revocation .revocation-conditions ul {
  padding-left: 1.25rem;
  margin: 0;
}

.approval-revocation .revocation-conditions li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.approval-revocation .revocation-notes {
  margin: 1.5rem 0;
}

/* ========= 免许取消样式 ========= */
.license-revocation {
  margin: 2rem 0;
}

.license-revocation .revocation-conditions {
  padding: 1.5rem;
  background: #ffe7e7;
  border-radius: 12px;
  border: 1px solid #dc3545;
  margin-bottom: 1.5rem;
}

.license-revocation .revocation-conditions h4 {
  margin: 0 0 1rem 0;
  color: #c62828;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.license-revocation .revocation-conditions ul {
  padding-left: 1.25rem;
  margin: 0;
}

.license-revocation .revocation-conditions li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.license-revocation .revocation-notes {
  margin: 1.5rem 0;
}

/* ========= 宅建士监督样式 ========= */
.agent-instruction, .work-prohibition, .registration-elimination {
  margin: 2rem 0;
}

.violation-types, .prohibition-details, .elimination-conditions {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.violation-item h4, .elimination-conditions h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.violation-item ul, .elimination-conditions ul {
  padding-left: 1.25rem;
  margin: 0;
}

.violation-item li, .elimination-conditions li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.elimination-effect {
  margin: 1.5rem 0;
}

.effect-item {
  padding: 1.5rem;
  border-radius: 12px;
}

.effect-item.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.effect-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.effect-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.effect-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 听证程序样式 ========= */
.hearing-procedure {
  margin: 2rem 0;
}

.procedure-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.procedure-step {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
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

.hearing-requirements {
  padding: 1.5rem;
  background: #eef7ff;
  border-radius: 12px;
  border-left: 4px solid #2a7960;
}

.hearing-requirements h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hearing-requirements ul {
  padding-left: 1.25rem;
  margin: 0;
}

.hearing-requirements li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 通知要求样式 ========= */
.notification-requirements {
  margin: 2rem 0;
}

.notification-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
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

/* ========= 罚则体系样式 ========= */
.criminal-penalties {
  margin: 2rem 0;
}

.penalty-category {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.penalty-category.severe {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.penalty-category.medium {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.penalty-category.mild {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.penalty-category.light {
  background: #eef7ff;
  border: 1px solid #a8c6ff;
}

.penalty-category h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.penalty-category ul {
  padding-left: 1.25rem;
  margin: 0;
}

.penalty-category li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.administrative-penalties {
  margin: 2rem 0;
}

.penalty-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.penalty-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.penalty-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.penalty-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.penalty-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 特殊规定样式 ========= */
.dual-penalty, .cabinet-agreement, .record-keeping {
  margin: 2rem 0;
}

.penalty-explanation, .agreement-requirements, .record-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.explanation-item, .requirement-item, .record-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.explanation-item h4, .requirement-item h4, .record-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.explanation-item p, .requirement-item ul, .record-item ul {
  margin: 0;
}

.requirement-item ul, .record-item ul {
  padding-left: 1.25rem;
}

.requirement-item li, .record-item li {
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
  
  .supervision-authority {
    grid-template-columns: 1fr;
  }
  
  .penalty-hierarchy {
    flex-direction: column;
  }
  
  .penalty-arrow {
    transform: rotate(90deg);
  }
  
  .supervision-principles {
    grid-template-columns: 1fr;
  }
  
  .suspension-details {
    grid-template-columns: 1fr;
  }
  
  .notification-types {
    grid-template-columns: 1fr;
  }
  
  .penalty-grid {
    grid-template-columns: 1fr;
  }
  
  .penalty-explanation, .agreement-requirements, .record-types {
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
  
  .procedure-steps {
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