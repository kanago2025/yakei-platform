<!-- src/views/notes/business/OtherBusinessRegulations.vue -->
<template>
  <div class="other-business-regulations-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>其他业务上的规制</span>
        </div>
        <h1>其他业务上的规制</h1>
        <p>供托所说明义务、守秘义务、业务禁止事项等宅建业者必须遵守的重要业务规制</p>
        
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
            <li>掌握供托所相关说明义务的内容和时机</li>
            <li>理解宅建业者的守秘义务及其例外情况</li>
            <li>熟悉业务上各种禁止行为的具体内容</li>
            <li>了解违反业务规制的监督处分和罚则关系</li>
            <li>掌握重要事实说明义务的范围和实务要点</li>
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

        <!-- 供托所说明义务 -->
        <section id="deposit-office" class="content-section">
          <h2>1. 供托所相关说明义务</h2>
          
          <h3>说明时期与对象</h3>
          <div class="explanation-period">
            <div class="period-item important">
              <h4>📅 说明时期</h4>
              <p>必须在<strong>契约成立前</strong>进行说明</p>
              <div class="note">与重要事项说明同时期进行，但属于独立义务</div>
            </div>
            <div class="period-item">
              <h4>👥 说明对象</h4>
              <p>说明对象：<strong>交易双方当事者</strong>（宅建业者除外）</p>
            </div>
          </div>

          <h3>说明方式特点</h3>
          <div class="explanation-methods">
            <div class="method-item">
              <h4>👨‍💼 说明主体</h4>
              <ul>
                <li>可由宅建业者直接说明</li>
                <li><strong>不需要宅建士</strong></li>
              </ul>
            </div>
            <div class="method-item">
              <h4>🗣️ 说明形式</h4>
              <ul>
                <li><strong>口头说明即可</strong></li>
                <li>不需要书面交付</li>
              </ul>
            </div>
            <div class="method-item">
              <h4>📝 说明性质</h4>
              <ul>
                <li>与重要事项说明分开进行</li>
                <li>属于独立的法律义务</li>
              </ul>
            </div>
          </div>

          <h3>说明内容区分</h3>
          <div class="explanation-content">
            <div class="content-type">
              <h4>🏢 未加入保证协会时</h4>
              <div class="content-details">
                <div class="detail-item">
                  <span class="detail-icon">📍</span>
                  <span>营业保证金的供托所及所在地</span>
                </div>
              </div>
            </div>
            <div class="content-type">
              <h4>🤝 已加入保证协会时</h4>
              <div class="content-details">
                <div class="detail-item">
                  <span class="detail-icon">🏛️</span>
                  <span>保证协会名称、住所、事务所所在地</span>
                </div>
                <div class="detail-item">
                  <span class="detail-icon">💰</span>
                  <span>弁済業務保证金的供托所及所在地</span>
                </div>
              </div>
            </div>
          </div>

          <div class="important-note">
            <h4>💡 重要实务要点</h4>
            <ul>
              <li>说明义务在<strong>契约成立前</strong>必须履行</li>
              <li>与第37条书面交付<strong>不是同一时期</strong>，必须在契约成立前说明</li>
              <li>说明对象包括买卖、交换、借贷等所有交易的双方</li>
            </ul>
          </div>
        </section>

        <!-- 守秘义务 -->
        <section id="confidentiality" class="content-section">
          <h2>2. 守秘义务</h2>
          
          <h3>义务主体与期间</h3>
          <div class="obligation-scope">
            <div class="scope-item">
              <h4>👨‍💼 义务主体</h4>
              <ul>
                <li>宅建业者及其从业者（使用人）</li>
                <li>包括所有接触客户信息的员工</li>
              </ul>
            </div>
            <div class="scope-item">
              <h4>⏰ 义务期间</h4>
              <ul>
                <li><strong>现役期间和离职后</strong>都需遵守</li>
                <li>义务期间没有时间限制</li>
              </ul>
            </div>
            <div class="scope-item">
              <h4>🔒 保护范围</h4>
              <ul>
                <li>涵盖业务辅助过程中知悉的所有秘密</li>
                <li>包括客户个人信息、交易条件等</li>
              </ul>
            </div>
          </div>

          <h3>例外情况（可泄露）</h3>
          <div class="exception-cases">
            <div class="exception-item allowed">
              <div class="exception-icon">⚖️</div>
              <div class="exception-content">
                <h4>依法院命令作为证人时</h4>
                <p>在法庭作证等法律程序中的必要披露</p>
              </div>
            </div>
            <div class="exception-item allowed">
              <div class="exception-icon">🏛️</div>
              <div class="exception-content">
                <h4>税务职员基于质问检查权询问时</h4>
                <p>依法接受税务调查时的必要回答</p>
              </div>
            </div>
            <div class="exception-item allowed">
              <div class="exception-icon">✅</div>
              <div class="exception-content">
                <h4>得到委托人本人同意时</h4>
                <p>客户明确同意披露相关信息</p>
              </div>
            </div>
            <div class="exception-item allowed">
              <div class="exception-icon">🔍</div>
              <div class="exception-content">
                <h4>其他正当理由</h4>
                <p>法律法规允许的其他披露情况</p>
              </div>
            </div>
          </div>

          <h3>禁止行为示例</h3>
          <div class="prohibited-actions">
            <div class="prohibited-item">
              <div class="prohibited-icon">❌</div>
              <div class="prohibited-content">
                <h4>向朋友透露客户信息</h4>
                <p>即使是闲聊中提及也构成违规</p>
              </div>
            </div>
            <div class="prohibited-item">
              <div class="prohibited-icon">❌</div>
              <div class="prohibited-content">
                <h4>在网络上发布交易细节</h4>
                <p>社交媒体等公开渠道的信息泄露</p>
              </div>
            </div>
            <div class="prohibited-item">
              <div class="prohibited-icon">❌</div>
              <div class="prohibited-content">
                <h4>退职后泄露前公司的业务秘密</h4>
                <p>离职后义务仍然持续</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 业务禁止事项 -->
        <section id="prohibited-acts" class="content-section">
          <h2>3. 业务禁止事项</h2>
          
          <h3>不当履行延迟的禁止</h3>
          <div class="prohibition-detail">
            <div class="prohibition-item">
              <h4>🚫 禁止的具体行为</h4>
              <ul>
                <li>不动产<strong>登记手续</strong>的不当延迟</li>
                <li>不动产<strong>交付</strong>的不当延迟</li>
                <li>交易<strong>对价支付</strong>的不当延迟</li>
              </ul>
            </div>
            <div class="prohibition-item">
              <h4>💡 实务注意点</h4>
              <ul>
                <li>判断标准：是否超出合理业务处理时间</li>
                <li>包括故意拖延和重大过失导致的延迟</li>
                <li>影响客户权益的都可能构成违规</li>
              </ul>
            </div>
          </div>

          <h3>重要事实说明义务</h3>
          <div class="disclosure-obligation">
            <div class="disclosure-scope">
              <h4>📋 说明事项范围</h4>
              <ol>
                <li>第35条重要事项说明的事项</li>
                <li>供托所等相关说明事项</li>
                <li>第37条书面记载事项</li>
                <li>其他对客户判断有重要影响的事项</li>
              </ol>
            </div>
            <div class="disclosure-types">
              <h4>🚫 禁止行为类型</h4>
              <div class="type-grid">
                <div class="type-item">
                  <h5>不告知</h5>
                  <p>故意隐瞒重要事实</p>
                </div>
                <div class="type-item">
                  <h5>不实告知</h5>
                  <p>提供虚假信息</p>
                </div>
              </div>
            </div>
            <div class="disclosure-purpose">
              <h4>🎯 禁止行为目的</h4>
              <ul>
                <li>劝诱缔约</li>
                <li>阻止撤回申请</li>
                <li>阻止解除合同</li>
                <li>妨碍债权行使</li>
              </ul>
            </div>
          </div>

          <h3>重要影响事项示例</h3>
          <div class="important-matters">
            <div class="matters-grid">
              <div class="matter-item">
                <h5>🏠 不动产基本信息</h5>
                <ul>
                  <li>位置、规模、性质</li>
                  <li>现在或未来的利用限制</li>
                </ul>
              </div>
              <div class="matter-item">
                <h5>🚇 环境与便利性</h5>
                <ul>
                  <li>环境条件</li>
                  <li>交通等便利性</li>
                </ul>
              </div>
              <div class="matter-item">
                <h5>💰 交易条件</h5>
                <ul>
                  <li>对价金额及支付方法</li>
                  <li>其他交易条件</li>
                </ul>
              </div>
              <div class="matter-item">
                <h5>🏢 相关方信息</h5>
                <ul>
                  <li>业者或关系者的资力</li>
                  <li>业者或关系者的信用</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 报酬与手付限制 -->
        <section id="compensation-limits" class="content-section">
          <h2>4. 报酬与手付的限制</h2>
          
          <h3>不当高额报酬禁止</h3>
          <div class="compensation-limitation">
            <div class="limitation-item">
              <h4>💰 禁止内容</h4>
              <ul>
                <li>不得要求超过法定限额的报酬</li>
                <li><strong>仅要求即构成违法</strong>，不要求实际受领</li>
              </ul>
            </div>
            <div class="limitation-item">
              <h4>⚖️ 法律后果</h4>
              <ul>
                <li>违反监督处分和罚则均有规定</li>
                <li>可能面临业务停止等处分</li>
              </ul>
            </div>
          </div>

          <h3>手付贷与等禁止</h3>
          <div class="hand-money-restrictions">
            <div class="restriction-type prohibited">
              <h4>🚫 禁止行为</h4>
              <ul>
                <li>手付金的贷款</li>
                <li>手付金的后付</li>
                <li>其他信用提供行为</li>
              </ul>
            </div>
            <div class="restriction-type allowed">
              <h4>✅ 允许行为</h4>
              <ul>
                <li>手付金关于银行借贷的斡旋</li>
                <li>手付金的减额</li>
              </ul>
            </div>
          </div>

          <h3>禁止理由</h3>
          <div class="prohibition-reasons">
            <div class="reason-item">
              <h4>🛡️ 消费者保护</h4>
              <p>避免客户因资金压力无法取消合同</p>
            </div>
            <div class="reason-item">
              <h4>⚖️ 确保自主权</h4>
              <p>确保消费者取消合同的自主权</p>
            </div>
            <div class="reason-item">
              <h4>🚫 防止不正当缔约</h4>
              <p>防止不正当的合同缔结</p>
            </div>
          </div>
        </section>

        <!-- 其他禁止行为 -->
        <section id="other-prohibitions" class="content-section">
          <h2>5. 其他禁止行为</h2>
          
          <h3>断定的判断提供禁止</h3>
          <div class="prohibition-detail">
            <div class="prohibition-item">
              <h4>🚫 禁止内容</h4>
              <ul>
                <li>不得提供"确实会产生利益"的误解性判断</li>
                <li><strong>不问故意与否</strong>，行为本身即违法</li>
              </ul>
            </div>
            <div class="prohibition-item">
              <h4>⚖️ 法律后果</h4>
              <ul>
                <li>只有监督处分，没有罚则</li>
                <li>可能面临业务改善命令等</li>
              </ul>
            </div>
          </div>

          <h3>威迫行为禁止</h3>
          <div class="coercion-prohibition">
            <div class="prohibition-item">
              <h4>🚫 禁止内容</h4>
              <ul>
                <li>不得通过威迫来缔结合同</li>
                <li>不得威迫阻止撤回申请或合同解除</li>
              </ul>
            </div>
            <div class="prohibition-item">
              <h4>⚖️ 法律后果</h4>
              <ul>
                <li>只有监督处分，没有罚则</li>
              </ul>
            </div>
          </div>

          <h3>其他具体禁止行为</h3>
          <div class="other-prohibited-acts">
            <div class="prohibited-acts-list">
              <div class="act-item">
                <span class="act-number">1</span>
                <span>关于将来环境或交通便利的误解性断定判断</span>
              </div>
              <div class="act-item">
                <span class="act-number">2</span>
                <span>无正当理由拒绝给予判断时间</span>
              </div>
              <div class="act-item">
                <span class="act-number">3</span>
                <span>未事先告知商号、劝诱者姓名及目的而进行劝诱</span>
              </div>
              <div class="act-item">
                <span class="act-number">4</span>
                <span>对方表示不缔约后仍继续劝诱</span>
              </div>
              <div class="act-item">
                <span class="act-number">5</span>
                <span>在令人困扰的时间打电话或访问</span>
              </div>
              <div class="act-item">
                <span class="act-number">6</span>
                <span>深夜或长时间劝诱等扰乱生活行为</span>
              </div>
              <div class="act-item">
                <span class="act-number">7</span>
                <span>对方撤回申请时拒绝返还预收款</span>
              </div>
              <div class="act-item">
                <span class="act-number">8</span>
                <span>对方放弃手付解除合同时无正当理由拒绝</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 监督与罚则 -->
        <section id="supervision-penalties" class="content-section">
          <h2>6. 监督与罚则</h2>
          
          <h3>监督处分与罚则对应关系</h3>
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>禁止行为</th>
                  <th>监督处分</th>
                  <th>罚则</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>守秘义务违反</strong></td>
                  <td>●</td>
                  <td>●（50万日元以下）</td>
                </tr>
                <tr>
                  <td><strong>不当履行延迟</strong></td>
                  <td>●</td>
                  <td>●</td>
                </tr>
                <tr>
                  <td><strong>重要事实不告知·不实告知</strong></td>
                  <td>●</td>
                  <td>●（类型不同刑期不同）</td>
                </tr>
                <tr>
                  <td><strong>不当高额报酬要求</strong></td>
                  <td>●</td>
                  <td>●</td>
                </tr>
                <tr>
                  <td><strong>手付贷与等</strong></td>
                  <td>●</td>
                  <td>●</td>
                </tr>
                <tr>
                  <td><strong>断定的判断提供</strong></td>
                  <td>●</td>
                  <td>×</td>
                </tr>
                <tr>
                  <td><strong>威迫行为等</strong></td>
                  <td>●</td>
                  <td>×</td>
                </tr>
                <tr>
                  <td><strong>其他禁止行为</strong></td>
                  <td>●</td>
                  <td>×</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>罚则轻重区分</h3>
          <div class="penalty-levels">
            <div class="penalty-item serious">
              <h4>🔴 第47条第1号</h4>
              <p>2年以下拘禁刑或300万日元以下罚金</p>
              <div class="penalty-note">最严重的罚则等级</div>
            </div>
            <div class="penalty-item medium">
              <h4>🟡 第47条第2号</h4>
              <p>1年以下拘禁刑或100万日元以下罚金</p>
              <div class="penalty-note">中等严重程度</div>
            </div>
            <div class="penalty-item light">
              <h4>🟢 第47条第3号</h4>
              <p>6个月以下拘禁刑或100万日元以下罚金</p>
              <div class="penalty-note">相对较轻的罚则</div>
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
          <router-link to="/video?topic=business-regulations" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=business-regulations" class="action-button">
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
  { id: 'deposit-office', title: '供托所说明', icon: '🏛️' },
  { id: 'confidentiality', title: '守秘义务', icon: '🔒' },
  { id: 'prohibited-acts', title: '禁止事项', icon: '🚫' },
  { id: 'compensation-limits', title: '报酬限制', icon: '💰' },
  { id: 'other-prohibitions', title: '其他禁止', icon: '⚖️' },
  { id: 'supervision-penalties', title: '监督罚则', icon: '👮' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '供託所（こうたくしょ）',
    chinese: '供托所',
    explanation: '存放营业保证金或弁済業務保证金的官方机构',
    example: '客户可从供托所领取保证金来弥补损失'
  },
  {
    japanese: '守秘義務（しゅひぎむ）',
    chinese: '守秘义务',
    explanation: '不得泄露业务上知悉的秘密的法定义务',
    example: '现役期间和离职后都需遵守'
  },
  {
    japanese: '不当な履行遅延（ふとうなりこうちえん）',
    chinese: '不当履行延迟',
    explanation: '故意拖延登记、交付、付款等应尽义务的行为',
    example: '拖延办理所有权转移登记'
  },
  {
    japanese: '重要事項（じゅうこうじこう）',
    chinese: '重要事项',
    explanation: '影响交易判断的关键信息',
    example: '不动产权利关系、法令限制等'
  },
  {
    japanese: '手付貸与（てつけたいよ）',
    chinese: '手付贷与',
    explanation: '提供手付金的贷款或信用支持的行为',
    example: '允许客户后付手付金'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者は、宅地建物取引業保証協会の社員であるときは、営業保証金を供託した主たる事務所の最寄りの供託所及びその所在地について説明をする必要はない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '加入保证协会时，只需说明保证协会的相关信息和弁済業務保证金的供托所，不需要说明营业保证金的供托所。'
  },
  {
    question: '宅地建物取引業者の従業者である宅地建物取引士は、本人の同意がある場合を除き、正当な理由がある場合でも、宅地建物取引業の業務を補助したことについて知り得た秘密を他に漏らしてはならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '有正当理由时可以泄露秘密，如法院作证、税务调查等，不限于本人同意的情况。'
  },
  {
    question: '宅地建物取引業者は、契約の相手方に対して資金不足を理由に手付の貸付けを行ったが、契約締結後償還された場合は法に違反しない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '手付贷与行为本身即违法，无论事后是否偿还。'
  },
  {
    question: '宅地建物取引業者は、取引の関係者から供託所の所在地について説明を求められた場合にのみ、これについて説明すれば足りる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '供托所说明是契约成立前的主动义务，不待请求就必须说明。'
  },
  {
    question: '宅地建物取引業者がその業務に関してなすべき宅地の引渡しを不当に遅延する行為は、監督処分の対象となるが、罰則の対象とはならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '不当履行延迟既是监督处分对象，也是罚则对象（6个月以下拘禁刑或100万日元以下罚金）。'
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
  learningStore.recordTopicStudyTime('other-business-regulations', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('other-business-regulations')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('other-business-regulations')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('other-business-regulations', 0)
  
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
.other-business-regulations-page {
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
  margin: 1rem 0 0.5rem;
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

/* ========= 供托所说明样式 ========= */
.explanation-period {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.period-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.period-item.important {
  background: #fff9e6;
  border-color: #ffcc00;
}

.period-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #2a7960;
}

.explanation-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.method-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.method-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.method-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.method-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.explanation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.content-type {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.content-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.content-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.detail-icon {
  font-size: 1.125rem;
}

.important-note {
  padding: 1.5rem;
  background: #e7f7e7;
  border-radius: 12px;
  border: 1px solid #28a745;
  margin: 1.5rem 0;
}

.important-note h4 {
  margin: 0 0 1rem 0;
  color: #2e7d32;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.important-note ul {
  padding-left: 1.25rem;
  margin: 0;
}

.important-note li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 守秘义务样式 ========= */
.obligation-scope {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.scope-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.scope-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.exception-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.exception-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
}

.exception-item.allowed {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.exception-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.exception-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.exception-content p {
  margin: 0;
  color: #6c757d;
}

.prohibited-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.prohibited-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #ffe7e7;
  border-radius: 12px;
  border: 1px solid #dc3545;
}

.prohibited-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.prohibited-content h4 {
  margin: 0 0 0.5rem 0;
  color: #c62828;
}

.prohibited-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 业务禁止事项样式 ========= */
.prohibition-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.prohibition-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.prohibition-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prohibition-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.prohibition-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.disclosure-obligation {
  margin: 2rem 0;
}

.disclosure-scope {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.disclosure-scope h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.disclosure-scope ol {
  padding-left: 1.5rem;
  margin: 0;
}

.disclosure-scope li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.disclosure-types {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.disclosure-types h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.type-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.type-item h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.type-item p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.disclosure-purpose {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.disclosure-purpose h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.disclosure-purpose ul {
  padding-left: 1.25rem;
  margin: 0;
}

.disclosure-purpose li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.important-matters {
  margin: 1.5rem 0;
}

.matters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.matter-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.matter-item h5 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.matter-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.matter-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 报酬限制样式 ========= */
.compensation-limitation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.limitation-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.limitation-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.limitation-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.limitation-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.hand-money-restrictions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.restriction-type {
  padding: 1.5rem;
  border-radius: 12px;
}

.restriction-type.prohibited {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.restriction-type.allowed {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.restriction-type h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.restriction-type ul {
  padding-left: 1.25rem;
  margin: 0;
}

.restriction-type li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.prohibition-reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.reason-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.reason-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.reason-item p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 其他禁止行为样式 ========= */
.coercion-prohibition {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.other-prohibited-acts {
  margin: 1.5rem 0;
}

.prohibited-acts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.act-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.act-number {
  background: #2a7960;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* ========= 监督罚则样式 ========= */
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

.penalty-levels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.penalty-item {
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.penalty-item.serious {
  background: #ffe7e7;
  border: 1px solid #dc3545;
}

.penalty-item.medium {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.penalty-item.light {
  background: #e7f7e7;
  border: 1px solid #28a745;
}

.penalty-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.penalty-item p {
  margin: 0 0 0.5rem 0;
}

.penalty-note {
  font-size: 0.75rem;
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
  
  .explanation-period {
    grid-template-columns: 1fr;
  }
  
  .explanation-methods {
    grid-template-columns: 1fr;
  }
  
  .explanation-content {
    grid-template-columns: 1fr;
  }
  
  .obligation-scope {
    grid-template-columns: 1fr;
  }
  
  .exception-cases {
    grid-template-columns: 1fr;
  }
  
  .prohibited-actions {
    grid-template-columns: 1fr;
  }
  
  .prohibition-detail {
    grid-template-columns: 1fr;
  }
  
  .type-grid {
    grid-template-columns: 1fr;
  }
  
  .matters-grid {
    grid-template-columns: 1fr;
  }
  
  .compensation-limitation {
    grid-template-columns: 1fr;
  }
  
  .hand-money-restrictions {
    grid-template-columns: 1fr;
  }
  
  .prohibition-reasons {
    grid-template-columns: 1fr;
  }
  
  .coercion-prohibition {
    grid-template-columns: 1fr;
  }
  
  .penalty-levels {
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