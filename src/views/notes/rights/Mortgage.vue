<!-- src/views/notes/rights/Mortgage.vue -->
<template>
  <div class="mortgage-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>抵当权</span>
        </div>
        <h1>抵当权（抵押权）</h1>
        <p>日本民法中的担保物权制度，涉及抵押权设定、效力范围、优先受偿、法定地上权及最高额抵押权等重要内容</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">16</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50分钟</span>
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
            <li>理解抵当权的定义、性质和基本特征</li>
            <li>掌握抵当权的设定、登记和对抗要件</li>
            <li>熟悉抵当权的效力范围及优先弁済规则</li>
            <li>了解抵当权与第三者关系中的保护制度</li>
            <li>掌握根抵当权的特殊规定和实务要点</li>
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
          <h2>1. 抵当权的基本概念</h2>
          
          <h3>抵当权的定义</h3>
          <div class="concept-explanation">
            <p>抵当权是指债权人（抵当权者）对债务人或第三人（抵当权设定者）不转移占有而供担保的不动产，在债务人不履行债务时，依法享有的就该财产变价并优先受偿的权利。</p>
            
            <div class="example-box">
              <h4>📝 典型案例</h4>
              <p>A借给B 1000万日元，B以自有房产设定抵押权。若B不还款，A可申请拍卖该房产，从拍卖款中优先受偿。</p>
            </div>
          </div>

          <h3>抵当权关系中的角色</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🏦</div>
              <div class="timing-content">
                <h4>抵当权者</h4>
                <p>债权人，享有抵押权</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">👤</div>
              <div class="timing-content">
                <h4>抵当权设定者</h4>
                <p>提供抵押财产的人（可能是债务人或物上保证人）</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>被担保债权</h4>
                <p>受抵押权担保的债权</p>
              </div>
            </div>
          </div>

          <h3>抵当权的设定</h3>
          <div class="setting-process">
            <div class="process-steps">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>诺成契约</h4>
                  <p>双方合意即可成立抵押权</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>登记</h4>
                  <p>对抗第三人的要件</p>
                </div>
              </div>
              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>抵押权实行</h4>
                  <p>债务不履行时拍卖抵押物</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 抵当权的性质 -->
        <section id="mortgage-nature" class="content-section">
          <h2>2. 抵当权的性质</h2>
          
          <h3>四大性质</h3>
          <div class="nature-grid">
            <div class="nature-item">
              <div class="nature-icon">🔗</div>
              <div class="nature-content">
                <h4>付従性（附从性）</h4>
                <p>抵当权从属于被担保债权而存在：</p>
                <ul>
                  <li>债权成立 → 抵押权成立</li>
                  <li>债权消灭 → 抵押权消灭</li>
                  <li>债权无效 → 抵押权无效</li>
                </ul>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">🔄</div>
              <div class="nature-content">
                <h4>随伴性（伴随性）</h4>
                <p>债权转让时，抵押权随之转让，不能单独转让抵押权。</p>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">⚖️</div>
              <div class="nature-content">
                <h4>不可分性</h4>
                <p>债权全部清偿前，抵押权人可就抵押物的全部行使权利。</p>
              </div>
            </div>
            <div class="nature-item">
              <div class="nature-icon">🔄</div>
              <div class="nature-content">
                <h4>物上代位性</h4>
                <p>抵押物毁损、灭失或被征收时，抵押权人可对保险金、赔偿金、补偿金等行使权利。</p>
              </div>
            </div>
          </div>

          <h3>物上代位性的行使</h3>
          <div class="substitution-examples">
            <div class="example-item">
              <h4>火灾保险金请求权</h4>
              <p>抵押房屋被火烧毁，抵押权人可对火灾保险金行使权利</p>
            </div>
            <div class="example-item">
              <h4>损害赔偿请求权</h4>
              <p>基于不法行为的损害赔偿请求权</p>
            </div>
            <div class="example-item">
              <h4>买卖代金请求权</h4>
              <p>目的物被卖却时，可行使买卖代金请求权</p>
            </div>
          </div>

          <div class="important-notes">
            <div class="note-item">
              <h4>⚠️ 重要提醒</h4>
              <p><strong>物上代位必须在金钱支付给债务者之前进行冻结！</strong>如果保险公司先赔付给债务者，就无法清楚区分这笔钱是否是保险金了。</p>
            </div>
          </div>
        </section>

        <!-- 抵当权的设定与效力 -->
        <section id="mortgage-effect" class="content-section">
          <h2>3. 抵当权的设定与效力</h2>
          
          <h3>设定方式</h3>
          <div class="setting-methods">
            <div class="method-item">
              <h4>诺成契约</h4>
              <p>双方合意即可成立</p>
            </div>
            <div class="method-item">
              <h4>对抗要件</h4>
              <p>登记（不登记不得对抗第三人）</p>
            </div>
          </div>

          <h3>效力范围</h3>
          <div class="effect-scope">
            <div class="scope-categories">
              <div class="category-item">
                <h4>主物</h4>
                <p>土地、建筑物等抵押财产本身</p>
              </div>
              <div class="category-item">
                <h4>从物</h4>
                <p>抵押权设定时已存在的附属物（如空调、固定设备）</p>
              </div>
              <div class="category-item">
                <h4>附加一体物</h4>
                <p>与抵押物难以分离的增建部分</p>
              </div>
              <div class="category-item">
                <h4>从权利</h4>
                <p>土地租赁权等（限于抵押权设定时已存在）</p>
              </div>
              <div class="category-item">
                <h4>果实</h4>
                <p>原则上不及于孳息，但债务不履行后可及于</p>
              </div>
            </div>
          </div>

          <h3>优先弁済的限制</h3>
          <div class="priority-limits">
            <div class="limit-scenario">
              <h4>有多数抵押权人时</h4>
              <div class="scenario-detail">
                <p>利息等限于<strong>最后2年分</strong></p>
                <div class="scenario-note">为了保护后顺位抵押权人的利益</div>
              </div>
            </div>
            <div class="limit-scenario">
              <h4>无其他利害关系人时</h4>
              <div class="scenario-detail">
                <p><strong>无此限制</strong></p>
                <div class="scenario-note">可回收全部本金和利息</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 抵当权与第三者的关系 -->
        <section id="third-party" class="content-section">
          <h2>4. 抵当权与第三者的关系</h2>
          
          <h3>抵押权与租赁权的关系</h3>
          <div class="lease-mortgage">
            <div class="relation-case">
              <h4>抵押权登记在前</h4>
              <div class="case-result">
                <p>租赁权<strong>不得对抗</strong>抵押权人</p>
                <div class="case-note">承租人要搬离，但有6个月明渡犹豫期间</div>
              </div>
            </div>
            <div class="relation-case">
              <h4>租赁权登记在前</h4>
              <div class="case-result">
                <p>租赁权<strong>可对抗</strong>抵押权人</p>
                <div class="case-note">承租人可继续居住</div>
              </div>
            </div>
          </div>

          <h3>第三取得者的保护制度</h3>
          <div class="third-party-protection">
            <div class="protection-method">
              <div class="method-icon">💵</div>
              <div class="method-content">
                <h4>代价清偿</h4>
                <p>第三取得者可向抵押权人支付债务金额消灭抵押权</p>
              </div>
            </div>
            <div class="protection-method">
              <div class="method-icon">📝</div>
              <div class="method-content">
                <h4>抵押权消灭请求</h4>
                <p>第三取得者向抵押权人支付或提存得到承诺的金额，消灭抵押权</p>
              </div>
            </div>
            <div class="protection-method">
              <div class="method-icon">🏷️</div>
              <div class="method-content">
                <h4>竞买</h4>
                <p>拍卖时第三取得者可参与竞买以保有所有权</p>
              </div>
            </div>
          </div>

          <div class="important-notes">
            <div class="note-item">
              <h4>🚫 限制条件</h4>
              <p><strong>主债务者、保证人不得行使抵押权消灭请求权！</strong>因为他们本来就是应该还债的立场。</p>
            </div>
          </div>
        </section>

        <!-- 法定地上权与一括竞卖 -->
        <section id="legal-surface" class="content-section">
          <h2>5. 法定地上权与一括竞卖</h2>
          
          <h3>法定地上权的成立要件</h3>
          <div class="legal-surface-conditions">
            <div class="condition-list">
              <div class="condition-item">
                <div class="condition-check">✓</div>
                <div class="condition-text">抵押权设定时土地上已有建筑物</div>
              </div>
              <div class="condition-item">
                <div class="condition-check">✓</div>
                <div class="condition-text">土地与建筑物属同一人所有</div>
              </div>
              <div class="condition-item">
                <div class="condition-check">✓</div>
                <div class="condition-text">土地或建筑物或两者均设定了抵押权</div>
              </div>
              <div class="condition-item">
                <div class="condition-check">✓</div>
                <div class="condition-text">因拍卖导致土地与建筑物分属不同人</div>
              </div>
            </div>
          </div>

          <h3>一括竞卖制度</h3>
          <div class="bulk-auction">
            <div class="auction-scenario">
              <h4>适用情形</h4>
              <p>抵押权设定时为空地，其后建造了建筑物</p>
            </div>
            <div class="auction-effect">
              <h4>法律效果</h4>
              <p>可请求土地与建筑物<strong>一并拍卖</strong>，但仅就<strong>土地价款</strong>优先受偿</p>
            </div>
            <div class="auction-limit">
              <h4>限制条件</h4>
              <p>建筑物占有人对抵押权人有对抗力时除外</p>
            </div>
          </div>

          <h3>实务要点</h3>
          <div class="practical-points">
            <div class="point-item">
              <h4>建物未登记</h4>
              <p>即使建物没有登记，给土地设定抵押权时，法定地上权仍成立</p>
            </div>
            <div class="point-item">
              <h4>更地抵押</h4>
              <p>抵押权设定时是空地（更地），设定后建造建物，法定地上权不成立</p>
            </div>
          </div>
        </section>

        <!-- 根抵当权 -->
        <section id="root-mortgage" class="content-section">
          <h2>6. 根抵当权（最高额抵押权）</h2>
          
          <h3>定义与特征</h3>
          <div class="root-mortgage-concept">
            <p>为担保一定范围内不特定债权，在最高限额内设定的抵押权。</p>
            
            <div class="example-box">
              <h4>📝 实务案例</h4>
              <p>珠宝商为连续进货需要，在5000万日元额度内设定根抵当权。未来1年内可多次借款，只要合计不超过5000万日元。</p>
            </div>
          </div>

          <h3>与普通抵押权的区别</h3>
          <div class="comparison-table">
            <div class="table-container">
              <table class="features-table">
                <thead>
                  <tr>
                    <th>特征</th>
                    <th>普通抵当权</th>
                    <th>根抵当权</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>付従性</strong></td>
                    <td>有</td>
                    <td class="different">元本确定前无</td>
                  </tr>
                  <tr>
                    <td><strong>随伴性</strong></td>
                    <td>有</td>
                    <td class="different">元本确定前无</td>
                  </tr>
                  <tr>
                    <td><strong>担保范围</strong></td>
                    <td>特定债权</td>
                    <td class="different">不特定债权</td>
                  </tr>
                  <tr>
                    <td><strong>利息限制</strong></td>
                    <td>最后2年分</td>
                    <td class="different">极度额内无限制</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>元本确定</h3>
          <div class="principal-determination">
            <div class="determination-methods">
              <div class="method-item">
                <h4>确定期日届至</h4>
                <p>设定时约定的确定期日到来</p>
              </div>
              <div class="method-item">
                <h4>确定请求</h4>
                <p>根抵当权者随时可请求确定</p>
              </div>
              <div class="method-item">
                <h4>债务者破产</h4>
                <p>债务者破产时自动确定</p>
              </div>
            </div>
            
            <div class="determination-effect">
              <h4>确定效果</h4>
              <p>变为普通抵押权，确定时存在的债权额即为担保债权额</p>
            </div>
          </div>

          <h3>变更限制</h3>
          <div class="change-limits">
            <div class="change-item">
              <h4>元本确定前</h4>
              <p>可变更被担保债权范围、债务者</p>
            </div>
            <div class="change-item">
              <h4>极度额变更</h4>
              <p>需利害关系人承诺</p>
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
          <router-link to="/video?topic=mortgage" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=mortgage" class="action-button">
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
  { id: 'mortgage-nature', title: '抵当权性质', icon: '🔍' },
  { id: 'mortgage-effect', title: '设定与效力', icon: '⚖️' },
  { id: 'third-party', title: '与第三者关系', icon: '👥' },
  { id: 'legal-surface', title: '法定地上权', icon: '🏠' },
  { id: 'root-mortgage', title: '根抵当权', icon: '💰' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '抵当権（ていとうけん）',
    chinese: '抵押权',
    explanation: '债务人或第三人不转移财产占有，将该财产作为债权的担保，债务人不履行债务时，债权人有权依法以该财产折价或以拍卖、变卖该财产的价款优先受偿的权利',
    example: 'A向B借款1000万日元，以自有房产设定抵押权担保'
  },
  {
    japanese: '根抵当権（ねていとうけん）',
    chinese: '最高额抵押权',
    explanation: '在最高债权额限度内，为担保一定期间内连续发生的债权而设定的抵押权',
    example: '珠宝商为连续进货需要，在5000万日元额度内设定根抵当权'
  },
  {
    japanese: '物上代位（ぶつじょうだいい）',
    chinese: '物上代位',
    explanation: '担保物灭失、毁损或者被征用时，担保物权人可以对保险金、赔偿金或者补偿金等行使权利',
    example: '抵押房屋被火烧毁，抵押权人可对火灾保险金行使权利'
  },
  {
    japanese: '法定地上権（ほうていちじょうけん）',
    chinese: '法定地上权',
    explanation: '土地和建筑物属于同一人，仅以土地或建筑物抵押，拍卖后土地与建筑物分属不同人时，依法自动成立的地上权',
    example: '土地和房屋一同抵押拍卖后，原房主自动获得使用土地的权利'
  },
  {
    japanese: '一括競売（いっかつきょうばい）',
    chinese: '一并拍卖',
    explanation: '抵押权人可请求将土地及其上建筑物一并拍卖，但仅就土地价款优先受偿',
    example: '空地设定抵押后建造房屋，抵押权人可请求土地房屋一并拍卖'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '抵当権は、抵当権設定者と抵当権者との抵当権設定契約によって成立し、その効力を生ずるためには、抵当権の登記をしなければならない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '抵押权因双方合意即成立，登记仅为对抗第三人的要件，非成立要件。'
  },
  {
    question: '土地及びその地上建物の所有者が同一である場合に、土地に抵当権が設定され、その実行により土地と建物の所有者が異なるに至ったときは、建物について法定地上権が成立する。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '符合法定地上权的全部成立要件，依法自动成立地上权。'
  },
  {
    question: '根抵当権は、極度額の範囲内であれば、被担保債権の範囲に属する利息の請求権については、その満期となった最後の２年分についてのみ行使することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '根抵当权在极度额范围内担保全部利息，不受"最后2年分"的限制。'
  },
  {
    question: '抵当不動産の第三取得者は、抵当権消滅請求をすることができるが、その債務について連帯保証をした者は、抵当権消滅請求をすることができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '第三取得者可行使抵押权消灭请求权，但连带保证人属于债务者一方，不得行使。'
  },
  {
    question: 'AのBに対する債務を担保するため、A所有の更地に抵当権を設定した後に、Aがその土地上に建物を築造した場合、抵当権者は、抵当権の実行として、土地とともに建物を競売することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '此为一括竞卖的典型情形，抵押权人可请求土地与建筑物一并拍卖。'
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
  learningStore.recordTopicStudyTime('mortgage', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('mortgage')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('mortgage')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('mortgage', 0)
  
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
.mortgage-page {
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

.setting-process {
  margin: 2rem 0;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.process-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
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

/* ========= 抵当权性质样式 ========= */
.nature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.nature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.nature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.nature-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.nature-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.nature-content li {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.substitution-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.example-item {
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 3px solid #2a7960;
}

.example-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.example-item p {
  margin: 0;
  font-size: 0.875rem;
}

.important-notes {
  margin: 2rem 0;
}

.note-item {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
}

.note-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ========= 抵当权设定与效力样式 ========= */
.setting-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.method-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.method-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.effect-scope {
  margin: 2rem 0;
}

.scope-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.category-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.category-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.category-item p {
  margin: 0;
  font-size: 0.875rem;
}

.priority-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.limit-scenario {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.limit-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.scenario-detail p {
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.scenario-note {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

/* ========= 抵当权与第三者关系样式 ========= */
.lease-mortgage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.relation-case {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.relation-case h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-result p {
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.case-note {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

.third-party-protection {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.protection-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.method-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.method-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.method-content p {
  margin: 0;
  font-size: 0.875rem;
}

/* ========= 法定地上权样式 ========= */
.legal-surface-conditions {
  margin: 1.5rem 0;
}

.condition-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.condition-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.condition-check {
  width: 24px;
  height: 24px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.bulk-auction {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.auction-scenario, .auction-effect, .auction-limit {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.auction-scenario h4, .auction-effect h4, .auction-limit h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.practical-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.point-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.point-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

/* ========= 根抵当权样式 ========= */
.root-mortgage-concept {
  margin-bottom: 2rem;
}

.comparison-table {
  margin: 2rem 0;
}

.table-container {
  overflow-x: auto;
}

.features-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.features-table th, .features-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.features-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.features-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.different {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.principal-determination {
  margin: 2rem 0;
}

.determination-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.determination-methods .method-item {
  text-align: center;
}

.determination-effect {
  padding: 1.5rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
  text-align: center;
}

.determination-effect h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.change-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.change-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.change-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
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
  
  .process-steps {
    grid-template-columns: 1fr;
  }
  
  .nature-grid {
    grid-template-columns: 1fr;
  }
  
  .substitution-examples {
    grid-template-columns: 1fr;
  }
  
  .setting-methods {
    grid-template-columns: 1fr;
  }
  
  .scope-categories {
    grid-template-columns: 1fr;
  }
  
  .priority-limits {
    grid-template-columns: 1fr;
  }
  
  .lease-mortgage {
    grid-template-columns: 1fr;
  }
  
  .third-party-protection {
    grid-template-columns: 1fr;
  }
  
  .bulk-auction {
    grid-template-columns: 1fr;
  }
  
  .practical-points {
    grid-template-columns: 1fr;
  }
  
  .determination-methods {
    grid-template-columns: 1fr;
  }
  
  .change-limits {
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