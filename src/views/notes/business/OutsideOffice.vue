<!-- src/views/notes/business/OutsideOffice.vue -->
<template>
  <div class="outside-office-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=business">宅建业法</router-link> &gt; 
          <span>事务所以外场所的规制</span>
        </div>
        <h1>事务所以外场所的规制</h1>
        <p>掌握案内所、现地等事务所以外场所的法律要求，确保合规经营</p>
        
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
          <h2>🎯 学习目标</h2>
          <ul>
            <li>理解事务所以外场所的定义和分类</li>
            <li>掌握案内所、现地的标识设置要求</li>
            <li>熟悉专任宅建士在不同场所的设置要求</li>
            <li>了解案内所的届出义务和流程</li>
            <li>掌握不同场所的规制差异对比</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🔤 关键术语</h2>
          <div class="terms-grid">
            <div class="term-card">
              <div class="term-japanese">案内所（あんないじょ）</div>
              <div class="term-chinese">案内所</div>
              <div class="term-explanation">事务所以外设立的用于业务活动的场所，如分售公寓的样板间、车站前的接待处等</div>
              <div class="term-example">例：分譲マンションのモデルルーム、駅前案内所</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">現地（げんち）</div>
              <div class="term-chinese">现地</div>
              <div class="term-explanation">分售的宅地或建筑物所在的场所</div>
              <div class="term-example">例：分譲する宅地や建物が所在する場所</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">専任の宅地建物取引士（せんにんのたくちたてものとりひきし）</div>
              <div class="term-chinese">专任宅地建物取引士</div>
              <div class="term-explanation">在特定场所专门从事业务的宅建士</div>
              <div class="term-example">例：案内所で契約の申込みを受けたり契約を締結する場合に設置</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">届出（とどけで）</div>
              <div class="term-chinese">届出</div>
              <div class="term-explanation">向行政机关提交的备案或报告</div>
              <div class="term-example">例：案内所設置の届出を業務開始10日前までに行う</div>
            </div>
            <div class="term-card">
              <div class="term-japanese">標識（ひょうしき）</div>
              <div class="term-chinese">标识</div>
              <div class="term-explanation">标明宅建业者身份的法定标牌</div>
              <div class="term-example">例：事務所、案内所、現地に掲示する表示板</div>
            </div>
          </div>
        </section>

        <!-- 基本概念 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 基本概念</h2>
          
          <h3>事务所以外场所的定义</h3>
          <div class="concept-explanation">
            <p>宅建业者的业务活动不仅限于事务所内进行，还包括以下场所：</p>
            
            <div class="location-types">
              <div class="location-item">
                <h4>🏢 案内所</h4>
                <p>为开展业务而设置的场所，如：</p>
                <ul>
                  <li>分售公寓的样板间（モデルルーム）</li>
                  <li>车站前的接待处（駅前案内所）</li>
                  <li>展会等临时性场所</li>
                </ul>
              </div>
              <div class="location-item">
                <h4>📍 现地</h4>
                <p>分售的宅地或建筑物所在的场所</p>
                <ul>
                  <li>实际的土地或建筑物所在地</li>
                  <li>用于现场展示和说明</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>案内所的分类</h3>
          <div class="classification-comparison">
            <div class="classification-item">
              <h4>📝 接受申込的案内所</h4>
              <ul>
                <li>接受买卖契约的申込</li>
                <li>缔结买卖契约</li>
                <li>需要设置专任宅建士</li>
                <li>需要届出</li>
              </ul>
            </div>
            <div class="classification-item">
              <h4>ℹ️ 不接受申込的案内所</h4>
              <ul>
                <li>仅提供信息咨询</li>
                <li>不接受申込和契约缔结</li>
                <li>不需要设置专任宅建士</li>
                <li>不需要届出</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 法律依据 -->
        <section id="legal-basis" class="content-section">
          <h2>2. 法律依据</h2>
          
          <h3>主要法律条文</h3>
          <div class="legal-provisions">
            <div class="provision-item">
              <h4>第50条 - 标识的掲示等</h4>
              <p>宅地建物取引業者は、事務所等及び事務所等以外の国土交通省令で定めるその業務を行う場所ごとに、公衆の見やすい場所に、国土交通省令で定める標識を掲げなければならない。</p>
              <div class="provision-note">
                <strong>要点：</strong> 事务所以外的业务场所也必须掲示标识
              </div>
            </div>
            <div class="provision-item">
              <h4>第31条之3 - 宅地建物取引士的设置</h4>
              <p>宅地建物取引業者は、その事務所その他国土交通省令で定める場所ごとに、事務所等の規模、業務内容等を考慮して国土交通省令で定める数の成年者である専任の宅地建物取引士を置かなければならない。</p>
              <div class="provision-note">
                <strong>要点：</strong> 包括事务所以外的特定场所
              </div>
            </div>
            <div class="provision-item">
              <h4>第50条第2项 - 案内所的届出</h4>
              <p>宅地建物取引業者は、国土交通省令の定めるところにより、あらかじめ、第三十一条の三第一項の国土交通省令で定める場所について所在地、業務内容、業務を行う期間及び専任の宅地建物取引士の氏名を免許を受けた国土交通大臣又は都道府県知事及びその所在地を管轄する都道府県知事に届け出なければならない。</p>
              <div class="provision-note">
                <strong>要点：</strong> 案内所设置需要事前届出
              </div>
            </div>
          </div>
        </section>

        <!-- 设置要求 -->
        <section id="setup-requirements" class="content-section">
          <h2>3. 设置要求</h2>
          
          <h3>标识的设置要求</h3>
          <div class="identification-requirements">
            <div class="requirement-item">
              <h4>🏷️ 现地的标识</h4>
              <ul>
                <li><strong>设置义务者：</strong> 卖主</li>
                <li><strong>标识内容：</strong> 卖主的标识</li>
                <li><strong>设置位置：</strong> 公众易于看到的地方</li>
              </ul>
            </div>
            <div class="requirement-item">
              <h4>🏷️ 案内所的标识</h4>
              <ul>
                <li><strong>设置义务者：</strong> 设置案内所的业者</li>
                <li><strong>标识内容：</strong> 设置业者的标识 + 卖主信息</li>
                <li><strong>特殊要求：</strong> 必须记载卖主的商号、名称及免许证番号</li>
              </ul>
            </div>
          </div>

          <div class="identification-example">
            <h4>📋 标识设置实例</h4>
            <div class="example-scenario">
              <div class="scenario-diagram">
                <div class="diagram-item">
                  <div class="diagram-label">卖主A（开发商）</div>
                  <div class="diagram-arrow">委托媒介</div>
                </div>
                <div class="diagram-item">
                  <div class="diagram-label">业者B（媒介业者）</div>
                  <div class="diagram-arrow">设置案内所</div>
                </div>
                <div class="diagram-item">
                  <div class="diagram-label">案内所</div>
                </div>
              </div>
              <div class="scenario-explanation">
                <p><strong>现地标识：</strong> 卖主A的标识</p>
                <p><strong>案内所标识：</strong> 业者B的标识（必须记载卖主A的商号、名称及免许证番号）</p>
              </div>
            </div>
          </div>

          <h3>专任宅建士的设置要求</h3>
          <div class="takken-shi-requirements">
            <div class="requirement-comparison">
              <div class="comparison-item">
                <h4>✅ 需要设置的情况</h4>
                <ul>
                  <li>接受申込的案内所</li>
                  <li>缔结契约的案内所</li>
                  <li><strong>设置人数：</strong> 至少1人</li>
                  <li><strong>设置义务者：</strong> 设置案内所的业者</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>❌ 不需要设置的情况</h4>
                <ul>
                  <li>不接受申込的案内所</li>
                  <li>现地</li>
                  <li>仅提供咨询的场所</li>
                </ul>
              </div>
            </div>

            <div class="special-case">
              <h4>💡 特殊情况：多家业者共用案内所</h4>
              <p>当多家宅建业者共同设置一个案内所时：</p>
              <ul>
                <li>只需要<strong>任何一家业者</strong>设置1名专任宅建士</li>
                <li>不需要每家业者都设置1人</li>
                <li>设置义务由实际设置案内所的业者承担</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 实务要点 -->
        <section id="practical-points" class="content-section">
          <h2>4. 实务要点</h2>
          
          <h3>案内所的届出要求</h3>
          <div class="reporting-requirements">
            <div class="reporting-table">
              <div class="table-container">
                <table class="comparison-table">
                  <thead>
                    <tr>
                      <th>项目</th>
                      <th>具体要求</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>届出期间</strong></td>
                      <td>业务开始<strong>10日前</strong>まで</td>
                    </tr>
                    <tr>
                      <td><strong>届出事项</strong></td>
                      <td>所在地・业务内容・期间・专任宅建士的姓名</td>
                    </tr>
                    <tr>
                      <td><strong>届出对象</strong></td>
                      <td>
                        <ul>
                          <li>案内所所在地管辖的知事</li>
                          <li>免许权者（国土交通大臣或都道府县知事）</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>免除届出</strong></td>
                      <td>不接受申込和契约缔结的案内所不需要届出</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h3>其他设置物的要求</h3>
          <div class="other-requirements">
            <div class="requirement-summary">
              <div class="summary-item">
                <h4>💰 报酬额的掲示</h4>
                <ul>
                  <li><strong>事务所：</strong> 必须掲示</li>
                  <li><strong>案内所：</strong> 不需要掲示</li>
                  <li><strong>现地：</strong> 不需要掲示</li>
                </ul>
              </div>
              <div class="summary-item">
                <h4>📒 帐簿的备置</h4>
                <ul>
                  <li><strong>事务所：</strong> 必须备置</li>
                  <li><strong>案内所：</strong> 不需要备置</li>
                  <li><strong>现地：</strong> 不需要备置</li>
                </ul>
              </div>
              <div class="summary-item">
                <h4>👥 从业者名簿的备置</h4>
                <ul>
                  <li><strong>事务所：</strong> 必须备置</li>
                  <li><strong>案内所：</strong> 不需要备置</li>
                  <li><strong>现地：</strong> 不需要备置</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 综合对比 -->
        <section id="comprehensive-comparison" class="content-section">
          <h2>5. 综合对比</h2>
          
          <h3>不同场所的规制要求对比</h3>
          <div class="comparison-table-full">
            <div class="table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>事务所</th>
                    <th>案内所（接受申込）</th>
                    <th>案内所（不接受申込）</th>
                    <th>现地</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>标识</strong></td>
                    <td>✅ 必须</td>
                    <td>✅ 必须</td>
                    <td>✅ 必须</td>
                    <td>✅ 必须</td>
                  </tr>
                  <tr>
                    <td><strong>专任宅建士</strong></td>
                    <td>✅ 5人に1人以上</td>
                    <td>✅ 最低1人</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                  </tr>
                  <tr>
                    <td><strong>从业者名簿</strong></td>
                    <td>✅ 必须</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                  </tr>
                  <tr>
                    <td><strong>帐簿</strong></td>
                    <td>✅ 必须</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                  </tr>
                  <tr>
                    <td><strong>报酬额掲示</strong></td>
                    <td>✅ 必须</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                    <td>❌ 不需要</td>
                  </tr>
                  <tr>
                    <td><strong>案内所届出</strong></td>
                    <td>—</td>
                    <td>✅ 必须</td>
                    <td>❌ 不需要</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>重要实务提醒</h3>
          <div class="important-reminders">
            <div class="reminder-item important">
              <h4>⚠️ 标识设置的特殊要求</h4>
              <ul>
                <li>案内所的标识必须<strong>同时记载卖主信息</strong></li>
                <li>这是为了让来访客户了解真正的卖主信息</li>
                <li>仅设置媒介业者的标识是不够的</li>
              </ul>
            </div>
            <div class="reminder-item important">
              <h4>⏰ 届出的时间要求</h4>
              <ul>
                <li>案内所的届出必须在<strong>业务开始10日前</strong>完成</li>
                <li>届出对象包括<strong>两地</strong>：案内所所在地知事和免许权者</li>
                <li>免许权者为国土交通大臣时，需经由案内所所在地知事向大臣届出</li>
              </ul>
            </div>
            <div class="reminder-item important">
              <h4>👨‍💼 宅建士设置的关键点</h4>
              <ul>
                <li>接受申込的案内所<strong>必须</strong>设置专任宅建士</li>
                <li>多家业者共用案内所时，<strong>只需1名</strong>专任宅建士</li>
                <li>不接受申込的案内所<strong>不需要</strong>设置专任宅建士</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 案例分析 -->
        <section id="case-analysis" class="content-section">
          <h2>6. 案例分析</h2>
          
          <h3>典型案例分析</h3>
          <div class="case-studies">
            <div class="case-item">
              <h4>🏢 分售公寓的案内所设置</h4>
              <div class="case-scenario">
                <p><strong>情境：</strong> 宅建业者A社（甲県知事免许）分售100户公寓，设置不接受申込和契约缔结的案内所</p>
                <div class="case-requirements">
                  <h5>要求分析：</h5>
                  <ul>
                    <li>✅ <strong>标识设置：</strong> 必须设置A社的标识</li>
                    <li>❌ <strong>专任宅建士：</strong> 不需要设置</li>
                    <li>❌ <strong>案内所届出：</strong> 不需要届出</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="case-item">
              <h4>🤝 多家业者共同案内所</h4>
              <div class="case-scenario">
                <p><strong>情境：</strong> 宅建业者B、C、D三家公司为销售同一楼盘共同设置一个接受申込的案内所</p>
                <div class="case-requirements">
                  <h5>要求分析：</h5>
                  <ul>
                    <li>✅ <strong>标识设置：</strong> 必须设置（包含卖主信息）</li>
                    <li>✅ <strong>专任宅建士：</strong> 需要设置，但只需其中一家公司提供1人</li>
                    <li>✅ <strong>案内所届出：</strong> 需要届出</li>
                  </ul>
                </div>
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
          <router-link to="/video?topic=outside-office" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=business" class="action-button">
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
  { id: 'basic-concepts', title: '基本概念', icon: '📚' },
  { id: 'legal-basis', title: '法律依据', icon: '⚖️' },
  { id: 'setup-requirements', title: '设置要求', icon: '🏢' },
  { id: 'practical-points', title: '实务要点', icon: '💼' },
  { id: 'comprehensive-comparison', title: '综合对比', icon: '📊' },
  { id: 'case-analysis', title: '案例分析', icon: '🔍' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 练习题数据
const quizzes = [
  {
    question: '宅地建物取引業者A社（甲県知事免許）がマンション（100戸）を分譲する場合において、A社は、売買契約の締結をせず、契約の申込みの受付も行わない案内所を設置する場合、法第50条第1項に規定する標識を掲示する必要はない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '案内所必须掲示标识，无论是否接受申込或缔结契约。'
  },
  {
    question: '宅地建物取引業者は、20戸以上の一団の分譲建物の売買契約の申込みのみを受ける案内所を設置し、売買契約の締結は事務所で行う場合、当該案内所には専任の宅地建物取引士を置く必要はない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '接受申込的案内所必须设置至少1名专任宅建士。'
  },
  {
    question: '宅地建物取引業者が、分譲宅地の現地に標識を掲示する場合、その標識には、当該分譲宅地の売主である宅地建物取引業者の商号又は名称及び免許証番号を表示しなければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '现地的标识必须掲示卖主的商号、名称及免许证番号。'
  },
  {
    question: '複数の宅地建物取引業者が共同で一つの案内所を設置する場合、それぞれの宅地建物取引業者がそれぞれ専任の宅地建物取引士を置かなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '多家业者共用案内所时，只需其中一家业者设置1名专任宅建士。'
  },
  {
    question: '宅地建物取引業者が、売買契約の申込みのみを受ける案内所を設置する場合、その設置について、あらかじめ、案内所の所在地を管轄する都道府県知事に届け出なければならない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '接受申込的案内所需要在业务开始10日前向案内所所在地知事和免许权者届出。'
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
  learningStore.recordTopicStudyTime('outside-office', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('outside-office')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('outside-office')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('outside-office', 0)
  
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
.outside-office-page {
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
.concept-explanation {
  margin: 2rem 0;
}

.location-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
}

.location-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.location-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.location-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.classification-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.classification-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.classification-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.classification-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.classification-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 法律依据样式 ========= */
.legal-provisions {
  margin: 2rem 0;
}

.provision-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #2a7960;
}

.provision-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.provision-item p {
  margin: 0 0 1rem 0;
  font-style: italic;
  color: #555;
  line-height: 1.6;
}

.provision-note {
  background: #e7f7e7;
  padding: 1rem;
  border-radius: 5px;
  border-left: 3px solid #28a745;
}

.provision-note strong {
  color: #2e7d32;
}

/* ========= 设置要求样式 ========= */
.identification-requirements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.requirement-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.requirement-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.requirement-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.requirement-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.identification-example {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 12px;
  border: 1px solid #a8c6ff;
}

.identification-example h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.scenario-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.diagram-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.diagram-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.diagram-arrow {
  color: #2a7960;
  font-weight: bold;
}

.scenario-explanation p {
  margin: 0.5rem 0;
}

.takken-shi-requirements {
  margin: 2rem 0;
}

.requirement-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
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

.special-case {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 12px;
  border: 1px solid #ffcc00;
  margin-top: 1.5rem;
}

.special-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.special-case ul {
  padding-left: 1.25rem;
  margin: 0;
}

.special-case li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 实务要点样式 ========= */
.reporting-requirements {
  margin: 2rem 0;
}

.reporting-table {
  margin: 1.5rem 0;
}

.other-requirements {
  margin: 2rem 0;
}

.requirement-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.summary-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.summary-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.summary-item li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 综合对比样式 ========= */
.comparison-table-full {
  margin: 2rem 0;
}

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

.important-reminders {
  margin: 2rem 0;
}

.reminder-item {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.reminder-item.important {
  background: #fff9e6;
  border: 1px solid #ffcc00;
}

.reminder-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reminder-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.reminder-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 案例分析样式 ========= */
.case-studies {
  margin: 2rem 0;
}

.case-item {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.case-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.case-scenario p {
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.case-requirements h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.case-requirements ul {
  padding-left: 1.25rem;
  margin: 0;
}

.case-requirements li {
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
  
  .location-types {
    grid-template-columns: 1fr;
  }
  
  .classification-comparison {
    grid-template-columns: 1fr;
  }
  
  .identification-requirements {
    grid-template-columns: 1fr;
  }
  
  .requirement-comparison {
    grid-template-columns: 1fr;
  }
  
  .requirement-summary {
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