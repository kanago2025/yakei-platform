<!-- src/views/notes/yefa/ImportantMatters.vue -->
<template>
  <div class="important-matters">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>重要事项说明</span>
        </div>
        <h1>重要事项说明（35条书面）</h1>
        <p>宅建士考试核心知识点，掌握契约前必须说明的重要事项内容和流程</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">25</span>
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
          <h2>📚 学习目标</h2>
          <ul>
            <li>理解重要事项说明的法律依据和目的</li>
            <li>掌握重要事项说明的时机、对象和方法</li>
            <li>熟悉不同交易类型下的说明事项差异</li>
            <li>能够区分买卖、租赁、交换等不同情况下的说明要求</li>
            <li>了解区分所有建物的特殊说明事项</li>
            <li>掌握最新法律修正要点（2024-2025年）</li>
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

        <!-- 重要事项说明概述 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 重要事项说明概述</h2>
          <p><strong>重要事项说明</strong>是宅建业法规定的核心义务之一，旨在确保不动产交易中的信息对称，保护消费者权益。</p>
          
          <div class="case-scenario">
            <strong>实务场景：</strong>
            "如果早知道这块地不能建房子，我绝对不会买！" "如果早知道不能开美甲店，我绝对不会租这个公寓！" 为了避免这种情况发生，宅建业者必须在契约前向客户充分说明重要事项。
          </div>
          
          <div class="highlight-box">
            <strong>核心要点：</strong>
            <ul>
              <li>必须在<strong>契约成立前</strong>进行说明</li>
              <li>针对<strong>大宗商品</strong>的"说明书"式讲解</li>
              <li>保障客户知情权，避免后续纠纷</li>
              <li>由<strong>宅地建物取引士</strong>专业执行</li>
            </ul>
          </div>
        </section>

        <!-- 法律依据与目的 -->
        <section id="legal-basis" class="content-section">
          <h2>2. 法律依据与目的</h2>
          
          <h3>法律依据</h3>
          <ul>
            <li><strong>宅建业法第35条</strong>：规定重要事项说明义务</li>
            <li><strong>宅建业法施行规则</strong>：具体规定说明事项内容</li>
            <li><strong>消费者契约法</strong>：补充消费者保护规定</li>
          </ul>
          
          <h3>立法目的</h3>
          <ol>
            <li><strong>信息对称</strong>：弥补消费者专业知识不足，防止信息不对称导致的损失</li>
            <li><strong>风险防范</strong>：防止重大误解和交易风险，确保交易安全</li>
            <li><strong>纠纷预防</strong>：减少后续法律纠纷，提高交易效率</li>
            <li><strong>市场规范</strong>：促进不动产市场健康发展，建立诚信体系</li>
          </ol>

          <div class="highlight-box">
            <strong>最新法律修正要点（2024-2025年）：</strong>
            <ul>
              <li><strong>建物状况调查有效期</strong>：木造住宅1年，共同住宅（RC造等）2年</li>
              <li><strong>指定流通机构登记情况</strong>：需说明物业在指定流通机构的"交易申请受理状况"</li>
              <li><strong>宅建士押印义务废除</strong>：2022年5月修正，只需签名不再需要押印</li>
            </ul>
          </div>
        </section>

        <!-- 说明时机与对象 -->
        <section id="timing-object" class="content-section">
          <h2>3. 说明时机与对象</h2>
          
          <h3>说明时机</h3>
          <p><strong>严格在契约成立前</strong>进行，作为客户决策的重要依据。说明完成后才能签订正式契约。</p>
          
          <h3>说明对象</h3>
          <ul>
            <li><strong>买卖契约</strong> → <strong>买主</strong></li>
            <li><strong>租赁契约</strong> → <strong>借主</strong></li>
            <li><strong>交换契约</strong> → <strong>双方当事者</strong></li>
          </ul>
          
          <div class="highlight-box">
            <strong>例外情况：</strong>
            <ul>
              <li><strong>对方是宅建业者时</strong>：只需交付书面，无需口头说明（专业人员具备理解能力）</li>
              <li><strong>不动产信托受益权交易</strong>：即使对方是业者也需说明（特殊商品需要专业解释）</li>
              <li><strong>媒介契约</strong>：向交易的实际当事人说明，而非委托人</li>
            </ul>
          </div>

          <h3>说明场所</h3>
          <p>没有场所限制，可以在事务所、咖啡厅、客户家中等任何适合的场所进行。</p>
        </section>

        <!-- 说明方法与责任 -->
        <section id="method-responsibility" class="content-section">
          <h2>4. 说明方法与责任</h2>
          
          <h3>说明义务人</h3>
          <p><strong>宅建业者</strong>（说明义务主体）</p>
          
          <h3>实际说明者</h3>
          <p><strong>宅地建物取引士</strong>（专职或兼职均可，必须在宅建业者名簿上登记）</p>
          
          <h3>说明方式</h3>
          <ul>
            <li>宅建士记名的<strong>35条书面交付</strong> + 口头说明</li>
            <li>对方承诺时可使用<strong>电磁方法</strong>代替书面交付</li>
            <li><strong>IT重说</strong>（视频会议）在满足条件时可用</li>
            <li>未完成物件必须交付<strong>平面图</strong>说明形状结构</li>
          </ul>
          
          <div class="case-scenario">
            <strong>实务要求：</strong>
            <ul>
              <li>必须主动提示宅建士证（违者处10万日元以下过料）</li>
              <li>多个业者参与时，所有业者都有说明义务，但可由任一宅建士实际说明</li>
              <li>调查错误由<strong>所有业者共同承担责任</strong></li>
              <li>IT重说需确保双方能清楚交流，事先交付书面材料</li>
            </ul>
          </div>

          <h3>违反后果</h3>
          <ul>
            <li><strong>行政处分</strong>：业务停止、免许取消</li>
            <li><strong>民事责任</strong>：损害赔偿</li>
            <li><strong>刑事责任</strong>：罚款等处罚</li>
          </ul>
        </section>

        <!-- 基本说明事项 -->
        <section id="basic-items" class="content-section">
          <h2>5. 基本说明事项</h2>
          <p>无论买卖、交换还是租赁，都必须说明的基本事项：</p>
          
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>事项</th>
                  <th>内容说明</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>登记权利状况</td>
                  <td>所有权、抵押权、地上权、租赁权等登记情况</td>
                  <td>必须说明登记名義人和权利内容，包括抵押权人是否同意转让</td>
                </tr>
                <tr>
                  <td>法令限制</td>
                  <td>都市计划法、建筑基准法等法令限制</td>
                  <td>包括建蔽率、容积率、用途規制、防灾区域等</td>
                </tr>
                <tr>
                  <td>基础设施</td>
                  <td>水电燃气、排水设施状况</td>
                  <td>未整备时要说明整备计划和特别负担</td>
                </tr>
                <tr>
                  <td>灾害风险</td>
                  <td>土砂灾害、津波灾害、造成宅地防灾区域等</td>
                  <td>仅告知存在，不要求业者调查（2025年新增水害风险说明）</td>
                </tr>
                <tr>
                  <td>私道负担</td>
                  <td>私道相关的特别负担事项</td>
                  <td>建物租赁时不需要说明</td>
                </tr>
                <tr>
                  <td>契约解除</td>
                  <td>解除条件、手续等相关事项</td>
                  <td>包括手付解除等特殊解除权</td>
                </tr>
                <tr>
                  <td>损害赔偿</td>
                  <td>损害赔偿额预定、违约金等事项</td>
                  <td>需明确金额和计算方式</td>
                </tr>
                <tr>
                  <td>保全措施</td>
                  <td>手付金、代金等支付金的保全措施</td>
                  <td>金额不足50万日元时可不说明</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="highlight-box">
            <strong>2024年重要更新：建物状况调查有效期</strong>
            <ul>
              <li><strong>木造独栋住宅</strong>：调查日起<strong>1年</strong>内有效</li>
              <li><strong>共同住宅（RC造等）</strong>：调查日起<strong>2年</strong>内有效</li>
              <li>必须在重要事项说明中告知调查实施情况和结果概要</li>
            </ul>
          </div>
        </section>

        <!-- 交易类型差异 -->
        <section id="transaction-differences" class="content-section">
          <h2>6. 交易类型差异</h2>
          
          <h3>买卖与租赁的说明差异</h3>
          
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>说明事项</th>
                  <th>买卖</th>
                  <th>租赁</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>私道负担</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>建物租赁时不需要</td>
                </tr>
                <tr>
                  <td>手付金保全</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>租赁没有手付金</td>
                </tr>
                <tr>
                  <td>贷款斡旋</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>租赁通常不涉及贷款</td>
                </tr>
                <tr>
                  <td>担保责任</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>租赁没有担保责任措施</td>
                </tr>
                <tr>
                  <td>石棉记录</td>
                  <td class="required">必要</td>
                  <td class="required">必要</td>
                  <td>仅建物需要说明</td>
                </tr>
                <tr>
                  <td>耐震诊断</td>
                  <td class="required">必要</td>
                  <td class="required">必要</td>
                  <td>仅建物需要，1981年6月后新筑不要</td>
                </tr>
                <tr>
                  <td>住宅性能评价</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>仅新筑住宅买卖时需要</td>
                </tr>
                <tr>
                  <td>契约期间·更新</td>
                  <td class="not-required">不要</td>
                  <td class="required">必要</td>
                  <td>租赁特有事项</td>
                </tr>
                <tr>
                  <td>敷金精算</td>
                  <td class="not-required">不要</td>
                  <td class="required">必要</td>
                  <td>租赁特有事项</td>
                </tr>
                <tr>
                  <td>设备状况</td>
                  <td class="not-required">不要</td>
                  <td class="required">必要</td>
                  <td>仅建物租赁需要说明厨房、浴室等</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="highlight-box">
            <strong>记忆技巧：</strong>
            <ul>
              <li><strong>仅买卖需要</strong>：私道负担、手付金保全、贷款斡旋、担保责任、住宅性能评价</li>
              <li><strong>仅建物需要</strong>：石棉、耐震诊断、设备状况</li>
              <li><strong>租赁特有</strong>：契约期间、敷金精算、设备状况、定期借家权</li>
              <li><strong>共通事项</strong>：登记权利、法令限制、基础设施、灾害风险</li>
            </ul>
          </div>
        </section>

        <!-- 区分所有建物规则 -->
        <section id="condominium-rules" class="content-section">
          <h2>7. 区分所有建物规则</h2>
          <p>公寓等区分所有建物有特殊的说明要求，主要涉及规约和管理相关事项：</p>
          
          <div class="table-container">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>说明事项</th>
                  <th>买卖</th>
                  <th>租赁</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>敷地权利</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>所有权、地上权等（规约定有时）</td>
                </tr>
                <tr>
                  <td>共用部分规约</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>包括规约案，共用部分范围、持分等</td>
                </tr>
                <tr>
                  <td>专有部分用途限制</td>
                  <td class="required">必要</td>
                  <td class="required">必要</td>
                  <td>宠物禁止、商业用途限制等（规约定有时）</td>
                </tr>
                <tr>
                  <td>专用使用权</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>专用庭、专用阳台等（规约定有时）</td>
                </tr>
                <tr>
                  <td>修繕积立金</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>内容、已积金额、滞纳额（规约定有时）</td>
                </tr>
                <tr>
                  <td>管理费</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>金额、滞纳额</td>
                </tr>
                <tr>
                  <td>管理委托</td>
                  <td class="required">必要</td>
                  <td class="required">必要</td>
                  <td>仅委托时说明（管理公司名称、地址）</td>
                </tr>
                <tr>
                  <td>费用减免</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>特定人员费用减免（规约定有时）</td>
                </tr>
                <tr>
                  <td>维持修繕记录</td>
                  <td class="required">必要</td>
                  <td class="not-required">不要</td>
                  <td>仅记录存在时说明</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="case-scenario">
            <strong>实务要点：</strong>
            <ul>
              <li>区分所有建物的说明事项大多以"规约定有时"为条件</li>
              <li>租赁时只需说明专有部分用途限制和管理委托情况</li>
              <li>修繕积立金和管理费需说明具体金额和滞纳情况</li>
              <li>管理委托需说明受托方名称、地址和登记编号</li>
            </ul>
          </div>
        </section>

        <!-- 特殊情况处理 -->
        <section id="special-cases" class="content-section">
          <h2>8. 特殊情况处理</h2>
          
          <h3>多个业者参与</h3>
          <ul>
            <li>所有参与业者都有说明义务（如卖主业者和媒介业者）</li>
            <li>可由任一宅建士实际说明</li>
            <li>调查错误由<strong>所有业者共同承担责任</strong></li>
            <li>需在35条书面上共同记名</li>
          </ul>
          
          <h3>未完成物件</h3>
          <ul>
            <li>必须交付<strong>平面图</strong>进行说明</li>
            <li>说明工事完成时的形状、结构、内外装等</li>
            <li>宅地需说明道路宽度、结构等</li>
          </ul>
          
          <h3>IT重说（视频说明）</h3>
          <ul>
            <li>需事先交付说明书（电磁方法也可）</li>
            <li>确认视频语音通信状况良好</li>
            <li>对方能清楚看到宅建士证信息</li>
            <li>适用于所有交易类型（2020年修正后）</li>
          </ul>

          <h3>不动产信托受益权交易</h3>
          <ul>
            <li>即使对方是宅建业者也需说明</li>
            <li>需说明信托财产相关的重要事项</li>
            <li>特定投资者等例外情况可省略说明</li>
          </ul>

          <div class="highlight-box">
            <strong>2025年新增要求：指定流通机构登记情况</strong>
            <p>根据2025年1月1日的规则改正，需要说明该物业在指定流通机构的"交易申请受理状况"，并且此信息必须符合事实，否则可能面临指示处分。</p>
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
            <button class="answer-btn" @click="toggleAnswer(index)">
              {{ showAnswerIndex === index ? '隐藏答案' : '显示答案' }}
            </button>
            <div 
              v-if="showAnswerIndex === index" 
              class="answer-explanation"
            >
              <strong>答案：</strong> {{ getCorrectAnswer(quiz) }}<br>
              <strong>中文解释：</strong> {{ quiz.explanation }}
            </div>
          </div>

          <div class="quiz-actions">
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
          <router-link to="/video?topic=important-matters" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=important-matters" class="action-button">
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
  { id: 'basic-concepts', title: '概述', icon: '📝' },
  { id: 'legal-basis', title: '法律依据', icon: '⚖️' },
  { id: 'timing-object', title: '时机与对象', icon: '⏰' },
  { id: 'method-responsibility', title: '方法与责任', icon: '📋' },
  { id: 'basic-items', title: '基本事项', icon: '📄' },
  { id: 'transaction-differences', title: '交易差异', icon: '🔄' },
  { id: 'condominium-rules', title: '区分所有', icon: '🏢' },
  { id: 'special-cases', title: '特殊情况', icon: '🔍' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '重要事項説明 (じゅうようじこうせつめい)',
    chinese: '重要事项说明',
    explanation: '指宅建业者在契约成立前，必须通过宅地建物取引士向客户说明物件相关重要事项的法定义务。这是消费者保护的核心制度。',
    example: '例子：在购买房产前，宅建士必须向买主说明该房产的产权状况、法令限制等重要信息。'
  },
  {
    japanese: '宅地建物取引士 (たくちたてものとりひきし)',
    chinese: '宅地建物交易士',
    explanation: '具有专业资格的不动产交易专业人员，负责进行重要事项说明。必须通过国家考试并注册。',
    example: '例子：只有持有宅建士证书的专业人员才能进行正式的重要事项说明。'
  },
  {
    japanese: '35条書面 (35じょうしょめん)',
    chinese: '35条书面',
    explanation: '记载重要事项说明内容的法定文书，必须由宅建士记名并交付给客户。是说明义务履行的书面证明。',
    example: '例子：宅建士在进行说明时必须交付给客户的正式书面文件。'
  },
  {
    japanese: '区分所有建物 (くぶんしょゆうたてもの)',
    chinese: '区分所有建物',
    explanation: '指公寓等由多个专有部分和共用部分构成的建筑物，有特殊的说明要求。',
    example: '例子：公寓买卖时需要额外说明共用部分规约、修繕积立金等内容。'
  },
  {
    japanese: '媒介契約 (ばいかいけいやく)',
    chinese: '媒介契约',
    explanation: '宅建业者在交易双方间斡旋、促成合同成立，但不以任何一方名义行事的契约形式。',
    example: '例子：房产中介为买卖双方提供磋商机会，但不代表任何一方签订合同。'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '宅建業者が売買契約を締結する場合、重要事項の説明は契約成立後でもよい。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '重要事项说明必须在契约成立前进行，这是为了确保客户在签约前充分了解情况，作为决策依据。'
  },
  {
    question: '借主が宅建業者である場合、重要事項の説明は省略できるが、書面の交付は必要である。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '对方是宅建业者时，由于具备专业知识，可以省略口头说明，但仍需交付35条书面。'
  },
  {
    question: '区分所有建物の貸借契約において、修繕積立金の内容について説明する必要がある。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '区分所有建物的租赁契约中，不需要说明修繕积立金的内容，这是买卖时才需要说明的事项。'
  },
  {
    question: '未完成物件の重要事項説明には、平面図の交付が必要である。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '未完成物件必须通过平面图说明工事完成时的形状和结构，这是法定要求。'
  },
  {
    question: '複数の宅建業者が関与する取引では、すべての業者が共同して説明義務を負う。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '多个宅建业者参与的交易中，所有业者都有说明义务，调查错误时所有业者共同承担责任。'
  },
  {
    question: '鉄筋コンクリート造の共同住宅における建物状況調査の結果は、調査日から1年間有効である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '根据2024年4月1日施行的改正，共同住宅（RC造等）的建物状况调查结果有效期为2年，木造住宅才是1年。'
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
  learningStore.recordTopicStudyTime('important_matters', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('important_matters')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('important_matters')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('important_matters', 0)
  
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
.important-matters {
  min-height: 100vh;
  background-color: var(--bg);
}

.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 2rem;
  margin: 1rem 0 2rem;
  text-align: center;
}

.breadcrumb {
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 1rem;
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.header-content h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
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
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 2rem 0;
}

/* ========= 快速导航 ========= */
.quick-nav {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.quick-nav h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
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
  background: var(--bg);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
}

.nav-link:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1.125rem;
}

/* ========= 学习目标 ========= */
.learning-goals {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.learning-goals h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
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
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.term-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border-left: 4px solid var(--primary);
}

.term-japanese {
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.term-chinese {
  font-weight: bold;
  color: var(--text);
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
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.content-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border);
}

.content-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
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

/* ========= 案例和重点盒子 ========= */
.case-scenario {
  background: #f0f7ff;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid var(--primary);
  line-height: 1.6;
}

.highlight-box {
  background: #fff9e6;
  border: 1px solid #ffcc00;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  line-height: 1.6;
}

.highlight-box strong {
  color: #92400e;
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
  border: 1px solid var(--border);
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: var(--primary);
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

.comparison-table .required {
  color: #28a745;
  font-weight: bold;
  text-align: center;
}

.comparison-table .not-required {
  color: #dc3545;
  font-weight: bold;
  text-align: center;
}

/* ========= 练习题样式 ========= */
.quiz-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.quiz-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.quiz-item {
  background: #f9f9f9;
  border-radius: var(--radius);
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
  border-color: var(--primary);
  background: var(--primary-light);
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

.answer-btn {
  background: var(--primary);
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
  background: var(--primary-dark);
}

.answer-explanation {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 5px;
  line-height: 1.6;
}

.quiz-actions {
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
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* ========= 底部行动按钮 ========= */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  text-decoration: none;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, var(--primary-dark), #164536);
}

.action-button.video {
  background: linear-gradient(135deg, #2a7960, #205e4a);
}

.action-button.video:hover {
  background: linear-gradient(135deg, #205e4a, #164536);
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
  
  .quiz-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>