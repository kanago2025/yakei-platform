<!-- src/views/notes/business/AdvertisingRegulation.vue -->
<template>
  <div class="advertising-regulation-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>广告规制</span>
        </div>
        <h1>广告规制</h1>
        <p>不动产交易广告的法律规范，确保信息真实准确，保护消费者权益</p>
        
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
            <li>掌握宅建业法中关于广告规制的基本概念和法律依据</li>
            <li>理解取引态样明示义务的具体要求和实务操作</li>
            <li>熟悉夸大广告、钓鱼广告等禁止行为的认定标准</li>
            <li>了解未完成物件广告和签约的时间限制规定</li>
            <li>掌握违反广告规制的监督处分和罚则</li>
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
          <h2>1. 广告规制的基本概念</h2>
          
          <div class="concept-intro">
            <p>广告规制是宅建业法中的重要内容，旨在保护消费者免受不实信息的误导，确保不动产交易的公正性。</p>
          </div>

          <div class="regulation-purpose">
            <h3>🎯 规制目的</h3>
            <div class="purpose-grid">
              <div class="purpose-item">
                <div class="purpose-icon">🛡️</div>
                <div class="purpose-content">
                  <h4>消费者保护</h4>
                  <p>防止消费者基于错误信息做出判断</p>
                </div>
              </div>
              <div class="purpose-item">
                <div class="purpose-icon">⚖️</div>
                <div class="purpose-content">
                  <h4>市场秩序</h4>
                  <p>维护不动产市场的正常秩序</p>
                </div>
              </div>
              <div class="purpose-item">
                <div class="purpose-icon">🤝</div>
                <div class="purpose-content">
                  <h4>利益平衡</h4>
                  <p>保护交易弱势方的利益</p>
                </div>
              </div>
            </div>
          </div>

          <div class="legal-basis">
            <h3>📖 法律依据</h3>
            <div class="legal-list">
              <div class="legal-item">
                <div class="legal-number">第32条</div>
                <div class="legal-content">
                  <strong>夸大广告等禁止</strong>
                  <p>禁止与事实显著不符的表示</p>
                </div>
              </div>
              <div class="legal-item">
                <div class="legal-number">第34条</div>
                <div class="legal-content">
                  <strong>取引态样明示</strong>
                  <p>广告时必须明示交易方式</p>
                </div>
              </div>
              <div class="legal-item">
                <div class="legal-number">第36条</div>
                <div class="legal-content">
                  <strong>未完成物件规制</strong>
                  <p>限制未完成物件的广告和签约</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 取引态样明示义务 -->
        <section id="transaction-disclosure" class="content-section">
          <h2>2. 取引态样的明示义务</h2>
          
          <div class="disclosure-requirements">
            <div class="requirement-item important">
              <div class="requirement-icon">📢</div>
              <div class="requirement-content">
                <h4>法律依据：宅建业法第34条</h4>
                <p>宅建业者在进行广告时必须明确交易方式</p>
              </div>
            </div>
          </div>

          <h3>明示时机要求</h3>
          <div class="timing-requirements">
            <div class="timing-item">
              <div class="timing-label">广告时</div>
              <div class="timing-content">
                <p>必须明确取引态样</p>
                <div class="timing-note">首次接触消费者时</div>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-label">接受订单时</div>
              <div class="timing-content">
                <p>必须再次明确取引态样</p>
                <div class="timing-note">即使广告时已明示</div>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-label">分次广告时</div>
              <div class="timing-content">
                <p>每次都必须明示</p>
                <div class="timing-note">分次销售同一地块时</div>
              </div>
            </div>
          </div>

          <h3>取引态样分类</h3>
          <div class="transaction-types">
            <div class="type-item">
              <div class="type-name">自当事者</div>
              <div class="type-description">自己作为契约当事人参与交易</div>
            </div>
            <div class="type-item">
              <div class="type-name">代理</div>
              <div class="type-description">作为代理人参与交易</div>
            </div>
            <div class="type-item">
              <div class="type-name">媒介</div>
              <div class="type-description">作为中介促成交易</div>
            </div>
          </div>

          <div class="practical-notes">
            <h4>💡 实务要点</h4>
            <ul>
              <li>明示方式可以是<strong>口头或书面</strong></li>
              <li>自5贷借不属于"取引"，无需明示</li>
              <li>违反时将受到<strong>监督处分</strong></li>
            </ul>
          </div>
        </section>

        <!-- 夸大广告禁止 -->
        <section id="exaggerated-ads" class="content-section">
          <h2>3. 夸大广告的禁止</h2>
          
          <div class="prohibition-basis">
            <div class="prohibition-item important">
              <div class="prohibition-icon">🚫</div>
              <div class="prohibition-content">
                <h4>法律依据：宅建业法第32条</h4>
                <p>禁止夸大广告行为，确保广告内容真实准确</p>
              </div>
            </div>
          </div>

          <h3>禁止内容范围</h3>
          <div class="prohibited-content">
            <div class="content-category">
              <h4>🏠 物件信息</h4>
              <ul>
                <li>所在、规模、形质</li>
                <li>环境、交通便利性</li>
                <li>利用限制（现在或将来）</li>
              </ul>
            </div>
            <div class="content-category">
              <h4>💰 交易条件</h4>
              <ul>
                <li>代金、借赁等对价金额</li>
                <li>支付方法</li>
                <li>金钱借贷的斡旋</li>
              </ul>
            </div>
          </div>

          <h3>认定标准</h3>
          <div class="identification-criteria">
            <div class="criterion-item">
              <div class="criterion-icon">👥</div>
              <div class="criterion-content">
                <h4>一般消费者认知</h4>
                <p>"显著"的判断基于一般消费者的认知水平</p>
              </div>
            </div>
            <div class="criterion-item">
              <div class="criterion-icon">⚡</div>
              <div class="criterion-content">
                <h4>行为违法性</h4>
                <p>即使无人相信，发布行为本身即构成违法</p>
              </div>
            </div>
            <div class="criterion-item">
              <div class="criterion-icon">🎭</div>
              <div class="criterion-content">
                <h4>表现形式</h4>
                <p>包括直接虚假和引人误解的表示</p>
              </div>
            </div>
          </div>

          <div class="case-examples">
            <h4>📋 典型案例</h4>
            <div class="case-item negative">
              <div class="case-title">❌ 违法案例</div>
              <div class="case-description">将实际交通不便的物件宣传为"交通极其便利"</div>
            </div>
            <div class="case-item negative">
              <div class="case-title">❌ 违法案例</div>
              <div class="case-description">夸大未来开发计划，误导消费者预期</div>
            </div>
          </div>
        </section>

        <!-- 钓鱼广告禁止 -->
        <section id="bait-ads" class="content-section">
          <h2>4. 钓鱼广告的禁止</h2>
          
          <div class="bait-ads-intro">
            <p>禁止以引诱顾客为目的发布不实广告，实际推销其他物件</p>
          </div>

          <h3>具体表现形式</h3>
          <div class="bait-forms">
            <div class="bait-item">
              <div class="bait-icon">👻</div>
              <div class="bait-content">
                <h4>不存在物件</h4>
                <p>完全虚构的房源信息</p>
              </div>
            </div>
            <div class="bait-item">
              <div class="bait-icon">🎣</div>
              <div class="bait-content">
                <h4>无意交易物件</h4>
                <p>存在但无意实际交易的物件</p>
              </div>
            </div>
            <div class="bait-item">
              <div class="bait-icon">🚧</div>
              <div class="bait-content">
                <h4>无法交易物件</h4>
                <p>存在但无法成为交易对象的物件</p>
              </div>
            </div>
          </div>

          <h3>规制范围</h3>
          <div class="regulation-scope">
            <div class="scope-item">
              <h4>传统媒体</h4>
              <ul>
                <li>报纸、杂志广告</li>
                <li>宣传单页</li>
                <li>户外广告</li>
              </ul>
            </div>
            <div class="scope-item">
              <h4>新媒体</h4>
              <ul>
                <li>互联网网站</li>
                <li>社交媒体</li>
                <li>移动应用</li>
              </ul>
            </div>
          </div>

          <div class="special-note">
            <h4>⚠️ 特别注意</h4>
            <p>契约成立后继续刊登不实广告也构成违法</p>
          </div>
        </section>

        <!-- 未完成物件规制 -->
        <section id="uncompleted-properties" class="content-section">
          <h2>5. 未完成物件的广告规制</h2>
          
          <div class="uncompleted-intro">
            <p>对未完成物件的广告和签约有严格的时间限制，确保交易安全</p>
          </div>

          <h3>规制对象</h3>
          <div class="regulated-objects">
            <div class="object-item">
              <div class="object-icon">🏗️</div>
              <div class="object-content">
                <h4>未完成宅地</h4>
                <p>尚未完成造成工事的土地</p>
              </div>
            </div>
            <div class="object-item">
              <div class="object-icon">🏢</div>
              <div class="object-content">
                <h4>未完成建物</h4>
                <p>尚未完成建筑工事的建筑物</p>
              </div>
            </div>
          </div>

          <h3>允许时间表</h3>
          <div class="timing-table">
            <div class="table-container">
              <table class="regulation-table">
                <thead>
                  <tr>
                    <th>行为类型</th>
                    <th>广告</th>
                    <th>买卖、交换契约</th>
                    <th>贷借契约</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>许可确认前</strong></td>
                    <td>❌ 不可</td>
                    <td>❌ 不可</td>
                    <td>✅ 可签约</td>
                  </tr>
                  <tr>
                    <td><strong>许可确认后</strong></td>
                    <td>✅ 可</td>
                    <td>✅ 可</td>
                    <td>✅ 可</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="regulation-reason">
            <h4>📝 规制理由</h4>
            <p>未完成物件只能通过预想图等了解，存在设计与实际差异的风险。经过行政厅许可确认后，可以认为广告与现实差异较小。</p>
          </div>

          <div class="required-permits">
            <h4>📋 必要许可确认</h4>
            <div class="permit-list">
              <div class="permit-item">
                <strong>开发许可</strong>
                <p>都市计划法第29条（宅地造成）</p>
              </div>
              <div class="permit-item">
                <strong>建筑确认</strong>
                <p>建筑基准法第6条（建筑物建设）</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 其他相关规制 -->
        <section id="other-regulations" class="content-section">
          <h2>6. 其他相关规制</h2>
          
          <h3>供托所说明义务</h3>
          <div class="deposit-obligation">
            <div class="obligation-details">
              <div class="detail-item">
                <h4>说明内容</h4>
                <ul>
                  <li>供托所及所在地</li>
                  <li>保证协会名称、住所</li>
                  <li><strong>无需说明</strong>保证金金额</li>
                </ul>
              </div>
              <div class="detail-item">
                <h4>说明对象</h4>
                <ul>
                  <li>向交易双方当事者说明</li>
                  <li>交易对方为宅建业者时<strong>无需说明</strong></li>
                </ul>
              </div>
              <div class="detail-item">
                <h4>说明方式</h4>
                <ul>
                  <li>契约成立前说明</li>
                  <li>可口头说明</li>
                  <li>宅建业者自身说明（无需宅建士）</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>不当履行延迟禁止</h3>
          <div class="delay-prohibition">
            <div class="delay-types">
              <div class="delay-item">
                <div class="delay-icon">📝</div>
                <div class="delay-content">
                  <h4>登记延迟</h4>
                  <p>所有权转移登记不当延迟</p>
                </div>
              </div>
              <div class="delay-item">
                <div class="delay-icon">🔑</div>
                <div class="delay-content">
                  <h4>引渡延迟</h4>
                  <p>物件交付不当延迟</p>
                </div>
              </div>
              <div class="delay-item">
                <div class="delay-icon">💴</div>
                <div class="delay-content">
                  <h4>支付延迟</h4>
                  <p>对价支付不当延迟</p>
                </div>
              </div>
            </div>
          </div>

          <h3>手付金贷与劝诱禁止</h3>
          <div class="earnest-money">
            <div class="prohibited-allowed">
              <div class="prohibited">
                <h4>🚫 禁止行为</h4>
                <ul>
                  <li>为促成契约而提供手付金借贷</li>
                  <li>手付金分割支付劝诱</li>
                  <li>手付金延迟支付劝诱</li>
                </ul>
              </div>
              <div class="allowed">
                <h4>✅ 允许行为</h4>
                <ul>
                  <li>代金减额</li>
                  <li>手付减额</li>
                  <li>手付金借入斡旋</li>
                  <li>报酬额分割受领</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 监督与罚则 -->
        <section id="supervision-penalties" class="content-section">
          <h2>7. 监督与罚则</h2>
          
          <div class="penalties-intro">
            <p>违反广告规制将受到相应的行政处分和刑事处罚</p>
          </div>

          <h3>监督处分类型</h3>
          <div class="supervision-types">
            <div class="supervision-item">
              <div class="supervision-level">初级</div>
              <div class="supervision-content">
                <h4>指示处分</h4>
                <p>要求改正违规行为</p>
              </div>
            </div>
            <div class="supervision-item">
              <div class="supervision-level">中级</div>
              <div class="supervision-content">
                <h4>业务停止处分</h4>
                <p>1年以内停止全部或部分业务</p>
              </div>
            </div>
            <div class="supervision-item">
              <div class="supervision-level">严重</div>
              <div class="supervision-content">
                <h4>免许取消处分</h4>
                <p>取消宅建业者资格</p>
              </div>
            </div>
          </div>

          <h3>罚则类型</h3>
          <div class="penalty-types">
            <div class="penalty-item serious">
              <div class="penalty-icon">⚖️</div>
              <div class="penalty-content">
                <h4>夸大广告</h4>
                <p>2年以下拘禁刑或300万日元以下罚金</p>
                <div class="penalty-note">情节严重的刑事处罚</div>
              </div>
            </div>
            <div class="penalty-item moderate">
              <div class="penalty-icon">📋</div>
              <div class="penalty-content">
                <h4>钓鱼广告</h4>
                <p>1年以下拘禁刑或100万日元以下罚金</p>
                <div class="penalty-note">一般违规的刑事处罚</div>
              </div>
            </div>
            <div class="penalty-item light">
              <div class="penalty-icon">💰</div>
              <div class="penalty-content">
                <h4>其他违规</h4>
                <p>罚款等行政处罚</p>
                <div class="penalty-note">轻微违规的行政处分</div>
              </div>
            </div>
          </div>

          <div class="enforcement-notes">
            <h4>💡 执行要点</h4>
            <ul>
              <li>取引态样明示义务违反<strong>不受罚则</strong>，只受监督处分</li>
              <li>广告开始时期限制违反<strong>不受罚则</strong>，只受监督处分</li>
              <li>夸大广告、钓鱼广告等<strong>同时受罚则和监督处分</strong></li>
            </ul>
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
          <router-link to="/video?topic=advertising-regulation" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=advertising" class="action-button">
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
  { id: 'transaction-disclosure', title: '取引态样明示', icon: '📢' },
  { id: 'exaggerated-ads', title: '夸大广告禁止', icon: '🚫' },
  { id: 'bait-ads', title: '钓鱼广告禁止', icon: '🎣' },
  { id: 'uncompleted-properties', title: '未完成物件', icon: '🏗️' },
  { id: 'other-regulations', title: '其他规制', icon: '⚖️' },
  { id: 'supervision-penalties', title: '监督罚则', icon: '📋' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '取引態様（とりひきたいよう）',
    chinese: '交易方式',
    explanation: '指宅建业者在交易中扮演的角色，如自当事者、代理、媒介等',
    example: '在广告中必须明确说明是"自当事者"还是"媒介"'
  },
  {
    japanese: '誇大広告（こだいこうこく）',
    chinese: '夸大广告',
    explanation: '对物件情况作与事实显著不符或使人误认的表示',
    example: '将实际交通不便的物件宣传为"交通极其便利"'
  },
  {
    japanese: 'おとり広告（おとりこうこく）',
    chinese: '钓鱼广告',
    explanation: '以不存在或无意交易的物件吸引顾客，实际推销其他物件',
    example: '刊登条件优越但实际不存在的房源信息'
  },
  {
    japanese: '未完成物件（みかんせいぶっけん）',
    chinese: '未完成物件',
    explanation: '尚未完成造成工事或建筑工事的宅地或建物',
    example: '开发许可或建筑确认前的预售房屋'
  },
  {
    japanese: '開発許可（かいはつきょか）',
    chinese: '开发许可',
    explanation: '根据都市计划法第29条对宅地造成工事的许可',
    example: '分售宅地前必须取得的行政许可'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者は、宅地又は建物の売買、交換又は貸借に関する広告をするときは、取引態様の別を明示しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '根据宅建业法第34条，进行不动产交易广告时必须明示交易方式。'
  },
  {
    question: '宅地建物取引業者は、建築確認申請中の建物について、建築確認申請中である旨を表示すれば、自ら売主として当該建物を販売する旨の広告をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '未完成物件必须在建筑确认等许可下达后才能进行广告，仅表示"申请中"是不够的。'
  },
  {
    question: 'おとり広告は、実際に取引する意思のない物件の広告を出す行為であり、誇大広告等の禁止の「著しく事実に相違する表示」に該当する。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '钓鱼广告属于与事实显著不符的表示，违反宅建业法第32条规定。'
  },
  {
    question: '宅地建物取引業者は、未完成物件の貸借契約については、開発許可や建築確認がなくても広告をすることができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '未完成物件的贷借契约虽可随时签约，但广告仍需在开发许可或建筑确认后。'
  },
  {
    question: '取引態様の明示義務に違反した場合、罰則（罰金や懲役）の対象となる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '取引态样明示义务违反会受到监督处分，但不是罚则（刑事处罚）的对象。'
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
  learningStore.recordTopicStudyTime('advertising-regulation', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('advertising-regulation')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('advertising-regulation')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('advertising-regulation', 0)
  
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
.advertising-regulation-page {
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
.concept-intro {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 4px solid #2a7960;
}

.regulation-purpose {
  margin: 2rem 0;
}

.purpose-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.purpose-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.purpose-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.purpose-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.purpose-content p {
  margin: 0;
  color: #6c757d;
}

.legal-basis {
  margin: 2rem 0;
}

.legal-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.legal-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.legal-number {
  background: #2a7960;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  flex-shrink: 0;
}

.legal-content {
  flex: 1;
}

.legal-content strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.legal-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 取引态样样式 ========= */
.disclosure-requirements {
  margin: 2rem 0;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.requirement-item.important {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.requirement-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.requirement-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.requirement-content p {
  margin: 0;
  color: #6c757d;
}

.timing-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.timing-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.timing-label {
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.timing-content p {
  margin: 0 0 0.5rem 0;
}

.timing-note {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.transaction-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.type-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.type-name {
  font-weight: bold;
  color: #2a7960;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.type-description {
  color: #6c757d;
  font-size: 0.875rem;
}

.practical-notes {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 12px;
  border: 1px solid #ffcc00;
}

.practical-notes h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.practical-notes ul {
  padding-left: 1.25rem;
  margin: 0;
}

.practical-notes li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 夸大广告样式 ========= */
.prohibition-basis {
  margin: 2rem 0;
}

.prohibition-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.prohibition-item.important {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.prohibition-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.prohibition-content h4 {
  margin: 0 0 0.5rem 0;
  color: #c62828;
}

.prohibition-content p {
  margin: 0;
  color: #6c757d;
}

.prohibited-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.content-category {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.content-category h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content-category ul {
  padding-left: 1.25rem;
  margin: 0;
}

.content-category li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.identification-criteria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.criterion-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.criterion-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.criterion-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.criterion-content p {
  margin: 0;
  color: #6c757d;
}

.case-examples {
  margin: 2rem 0;
}

.case-item {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.case-item.negative {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.case-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.case-description {
  color: #6c757d;
}

/* ========= 钓鱼广告样式 ========= */
.bait-ads-intro {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 4px solid #2a7960;
}

.bait-forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.bait-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.bait-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.bait-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.bait-content p {
  margin: 0;
  color: #6c757d;
}

.regulation-scope {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.scope-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.scope-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.scope-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.scope-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.special-note {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 12px;
  border: 1px solid #ffcc00;
}

.special-note h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.special-note p {
  margin: 0;
  color: #6c757d;
}

/* ========= 未完成物件样式 ========= */
.uncompleted-intro {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 4px solid #2a7960;
}

.regulated-objects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.object-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.object-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.object-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.object-content p {
  margin: 0;
  color: #6c757d;
}

.timing-table {
  margin: 2rem 0;
}

.table-container {
  overflow-x: auto;
}

.regulation-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.regulation-table th, .regulation-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.regulation-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.regulation-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.regulation-reason {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 12px;
  margin: 2rem 0;
  border: 1px solid #28a745;
}

.regulation-reason h4 {
  margin: 0 0 1rem 0;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required-permits {
  margin: 2rem 0;
}

.permit-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.permit-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.permit-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #1a472a;
}

.permit-item p {
  margin: 0;
  color: #6c757d;
}

/* ========= 其他规制样式 ========= */
.deposit-obligation {
  margin: 2rem 0;
}

.obligation-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.detail-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.detail-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.detail-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.delay-prohibition {
  margin: 2rem 0;
}

.delay-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.delay-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.delay-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.delay-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.delay-content p {
  margin: 0;
  color: #6c757d;
}

.earnest-money {
  margin: 2rem 0;
}

.prohibited-allowed {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.prohibited, .allowed {
  padding: 1.5rem;
  border-radius: 12px;
}

.prohibited {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.allowed {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.prohibited h4, .allowed h4 {
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prohibited ul, .allowed ul {
  padding-left: 1.25rem;
  margin: 0;
}

.prohibited li, .allowed li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 监督罚则样式 ========= */
.penalties-intro {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  margin-bottom: 2rem;
  border-left: 4px solid #2a7960;
}

.supervision-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.supervision-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.supervision-level {
  background: #2a7960;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  flex-shrink: 0;
}

.supervision-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.supervision-content p {
  margin: 0;
  color: #6c757d;
}

.penalty-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.penalty-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.penalty-item.serious {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.penalty-item.moderate {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.penalty-item.light {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.penalty-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.penalty-content h4 {
  margin: 0 0 0.5rem 0;
}

.penalty-content p {
  margin: 0 0 0.5rem 0;
}

.penalty-note {
  font-size: 0.75rem;
  color: #6c757d;
}

.enforcement-notes {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 12px;
  border: 1px solid #ffcc00;
}

.enforcement-notes h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.enforcement-notes ul {
  padding-left: 1.25rem;
  margin: 0;
}

.enforcement-notes li {
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
  
  .purpose-grid,
  .legal-list,
  .timing-requirements,
  .transaction-types,
  .prohibited-content,
  .identification-criteria,
  .bait-forms,
  .regulation-scope,
  .regulated-objects,
  .obligation-details,
  .delay-types,
  .prohibited-allowed,
  .supervision-types,
  .penalty-types {
    grid-template-columns: 1fr;
  }
  
  .permit-list {
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