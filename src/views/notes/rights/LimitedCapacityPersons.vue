<!-- src/views/notes/rights/LimitedCapacity.vue -->
<template>
  <div class="limited-capacity-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>限制行为能力者</span>
        </div>
        <h1>限制行为能力者</h1>
        <p>民法对判断能力不充分者的特殊保护制度，涉及未成年人、成年被后见人、被保佐人、被辅助人四种类型</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">12</span>
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
          <h2>🎯 学习目标</h2>
          <ul>
            <li>理解意思能力、行为能力、权利能力的基本概念和区别</li>
            <li>掌握四种限制行为能力人的定义和保护要件</li>
            <li>熟悉限制行为能力人法律行为的效力和取消权行使</li>
            <li>了解对交易相对方的保护制度和催告权</li>
            <li>能够区分不同类型限制行为能力人的权利差异</li>
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
          <h2>1. 基本概念：三种能力</h2>
          
          <div class="concept-cards">
            <div class="concept-card">
              <div class="concept-icon">👤</div>
              <div class="concept-content">
                <h3>权利能力</h3>
                <p>成为权利和义务主体的资格</p>
                <div class="concept-detail">
                  <strong>特点：</strong>人人生而平等，出生时获得，死亡时丧失
                </div>
              </div>
            </div>
            
            <div class="concept-card">
              <div class="concept-icon">🧠</div>
              <div class="concept-content">
                <h3>意思能力</h3>
                <p>理解自己行为法律后果的认知能力</p>
                <div class="concept-detail">
                  <strong>无意思能力者：</strong>幼儿、泥醉者、重度精神障碍者<br>
                  <strong>法律效果：</strong>契约原始无效（不是撤销）
                </div>
              </div>
            </div>
            
            <div class="concept-card">
              <div class="concept-icon">📝</div>
              <div class="concept-content">
                <h3>行为能力</h3>
                <p>独立进行有效法律行为的能力</p>
                <div class="concept-detail">
                  <strong>限制行为能力人：</strong>有意思能力但行为能力受限<br>
                  <strong>法律效果：</strong>契约可以撤销
                </div>
              </div>
            </div>
          </div>

          <div class="capacity-comparison">
            <h3>能力类型对比</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>能力类型</th>
                    <th>定义</th>
                    <th>不具备时的法律效果</th>
                    <th>典型人群</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>意思能力</strong></td>
                    <td>理解行为后果的认知能力</td>
                    <td class="effect-invalid">无效</td>
                    <td>幼儿、泥醉者</td>
                  </tr>
                  <tr>
                    <td><strong>行为能力</strong></td>
                    <td>独立进行法律行为的能力</td>
                    <td class="effect-revocable">可撤销</td>
                    <td>未成年人、被后见人</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 四种限制行为能力人 -->
        <section id="four-types" class="content-section">
          <h2>2. 四种限制行为能力人</h2>
          
          <div class="types-overview">
            <div class="type-scale">
              <div class="scale-labels">
                <span>判断能力低</span>
                <span>判断能力高</span>
              </div>
              <div class="scale-bar">
                <div class="scale-point" style="left: 0%">
                  <div class="point-label">成年被后见人</div>
                </div>
                <div class="scale-point" style="left: 33%">
                  <div class="point-label">被保佐人</div>
                </div>
                <div class="scale-point" style="left: 66%">
                  <div class="point-label">被辅助人</div>
                </div>
                <div class="scale-point" style="left: 100%">
                  <div class="point-label">未成年人</div>
                </div>
              </div>
            </div>
          </div>

          <div class="types-details">
            <!-- 未成年人 -->
            <div class="type-detail">
              <h3>👦 未成年人</h3>
              <div class="type-info">
                <div class="info-item">
                  <strong>定义：</strong>18岁未满者
                </div>
                <div class="info-item">
                  <strong>保护者：</strong>亲权者或未成年后见人
                </div>
                <div class="info-item">
                  <strong>保护程度：</strong>中等
                </div>
              </div>
              
              <div class="legal-effects">
                <h4>法律行为效果</h4>
                <div class="effect-item positive">
                  <div class="effect-icon">✅</div>
                  <div class="effect-content">
                    <strong>可以撤销：</strong>原则上，未成年人单独签订的契约可以撤销
                  </div>
                </div>
                <div class="effect-item negative">
                  <div class="effect-icon">❌</div>
                  <div class="effect-content">
                    <strong>不能撤销的情况：</strong>
                    <ul>
                      <li>法定代理人同意的行为</li>
                      <li>被许可的营业相关行为</li>
                      <li>处分被允许处分的财产</li>
                      <li>单纯获得权利或免除义务的行为</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="example-box">
                <h4>📝 案例：高中生卖漫画</h4>
                <p>高中生A得到父亲许可，在二手网站贩卖看过的漫画书。这种营业行为一旦获得法定代理人同意，就不能以未成年为由撤销。</p>
              </div>
            </div>

            <!-- 成年被后见人 -->
            <div class="type-detail">
              <h3>🧓 成年被后见人</h3>
              <div class="type-info">
                <div class="info-item">
                  <strong>定义：</strong>因精神障碍欠缺辨识能力的常态者 + 后见开始审判
                </div>
                <div class="info-item">
                  <strong>保护者：</strong>成年后见人
                </div>
                <div class="info-item">
                  <strong>保护程度：</strong>最强
                </div>
              </div>
              
              <div class="legal-effects">
                <h4>法律行为效果</h4>
                <div class="effect-item positive">
                  <div class="effect-icon">✅</div>
                  <div class="effect-content">
                    <strong>可以撤销：</strong>几乎所有单独行为都可以撤销
                  </div>
                </div>
                <div class="special-note">
                  <strong>⚠️ 特别注意：</strong>即使获得成年后见人同意，单独行为仍然可以撤销！
                </div>
                <div class="effect-item negative">
                  <div class="effect-icon">❌</div>
                  <div class="effect-content">
                    <strong>不能撤销的情况：</strong>
                    <ul>
                      <li>日用品购买等日常生活行为</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="example-box">
                <h4>📝 案例：买面包</h4>
                <p>成年被后见人A去便利店买面包，这种日常生活所必需的行为有效，不能撤销。</p>
              </div>
            </div>

            <!-- 被保佐人 -->
            <div class="type-detail">
              <h3>👨 被保佐人</h3>
              <div class="type-info">
                <div class="info-item">
                  <strong>定义：</strong>因精神障碍辨识能力显著不足者 + 保佐开始审判
                </div>
                <div class="info-item">
                  <strong>保护者：</strong>保佐人
                </div>
                <div class="info-item">
                  <strong>保护程度：</strong>中等偏弱
                </div>
              </div>
              
              <div class="legal-effects">
                <h4>法律行为效果</h4>
                <div class="effect-item positive">
                  <div class="effect-icon">✅</div>
                  <div class="effect-content">
                    <strong>可以撤销：</strong>仅限于重要财产行为未经同意时
                  </div>
                </div>
                <div class="effect-item negative">
                  <div class="effect-icon">❌</div>
                  <div class="effect-content">
                    <strong>重要财产行为（需保佐人同意）：</strong>
                    <ul>
                      <li>借钱或提供保证</li>
                      <li>不动产买卖、租赁</li>
                      <li>遗产继承的承认或放弃</li>
                      <li>新建、改建、大规模修缮契约</li>
                      <li>长期租赁（土地5年以上，建筑物3年以上）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- 被辅助人 -->
            <div class="type-detail">
              <h3>👩 被辅助人</h3>
              <div class="type-info">
                <div class="info-item">
                  <strong>定义：</strong>因精神障碍辨识能力不足者 + 补助开始审判
                </div>
                <div class="info-item">
                  <strong>保护者：</strong>补助人
                </div>
                <div class="info-item">
                  <strong>保护程度：</strong>最弱
                </div>
              </div>
              
              <div class="legal-effects">
                <h4>法律行为效果</h4>
                <div class="effect-item">
                  <div class="effect-icon">ℹ️</div>
                  <div class="effect-content">
                    <strong>个性化保护：</strong>由家庭裁判所针对特定法律行为赋予保护
                  </div>
                </div>
                <div class="effect-item">
                  <div class="effect-icon">🔒</div>
                  <div class="effect-content">
                    <strong>保护形式（三选一）：</strong>
                    <ol>
                      <li>本人同意必要的辅助</li>
                      <li>完全由辅助人代理</li>
                      <li>本人同意和辅助人代理双重保护</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div class="special-note">
                <strong>💡 重要特征：</strong>成为被辅助人必须经过本人同意！
              </div>
            </div>
          </div>
        </section>

        <!-- 保护者权限比较 -->
        <section id="protector-rights" class="content-section">
          <h2>3. 保护者权限比较</h2>
          
          <div class="rights-comparison">
            <div class="table-container">
              <table class="rights-table">
                <thead>
                  <tr>
                    <th>保护者权限</th>
                    <th>未成年人保护者</th>
                    <th>成年后见人</th>
                    <th>保佐人</th>
                    <th>补助人</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>同意权</strong></td>
                    <td class="has-right">◎</td>
                    <td class="no-right">×</td>
                    <td class="has-right">◎</td>
                    <td class="conditional">△</td>
                  </tr>
                  <tr>
                    <td><strong>取消权</strong></td>
                    <td class="has-right">◎</td>
                    <td class="has-right">◎</td>
                    <td class="has-right">◎</td>
                    <td class="conditional">△</td>
                  </tr>
                  <tr>
                    <td><strong>追认权</strong></td>
                    <td class="has-right">◎</td>
                    <td class="has-right">◎</td>
                    <td class="has-right">◎</td>
                    <td class="conditional">△</td>
                  </tr>
                  <tr>
                    <td><strong>代理权</strong></td>
                    <td class="has-right">◎</td>
                    <td class="has-right">◎</td>
                    <td class="conditional">△</td>
                    <td class="conditional">△</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="legend">
              <div class="legend-item">
                <span class="legend-symbol has-right">◎</span>
                <span class="legend-text">有该权限</span>
              </div>
              <div class="legend-item">
                <span class="legend-symbol no-right">×</span>
                <span class="legend-text">无该权限</span>
              </div>
              <div class="legend-item">
                <span class="legend-symbol conditional">△</span>
                <span class="legend-text">经审判可获特定权限</span>
              </div>
            </div>
          </div>

          <div class="important-notes">
            <h3>💡 重要注意事项</h3>
            <div class="notes-grid">
              <div class="note-card">
                <h4>成年后见人的特殊规定</h4>
                <p>成年后见人<strong>没有同意权</strong>，因为即使获得同意，成年被后见人仍可能做出不当行为。</p>
              </div>
              <div class="note-card">
                <h4>不动产处分限制</h4>
                <p>成年后见人处分被后见人居住用不动产时，必须获得<strong>家庭裁判所的许可</strong>。</p>
              </div>
              <div class="note-card">
                <h4>诈术使用后果</h4>
                <p>限制行为能力人使用诈术使对方相信其为完全行为能力人时，<strong>不能撤销</strong>契约。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 取消权与追认 -->
        <section id="revocation-recognition" class="content-section">
          <h2>4. 取消权与追认</h2>
          
          <div class="timeline-explanation">
            <h3>同意 vs 追认</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker">①</div>
                <div class="timeline-content">
                  <h4>同意（事前）</h4>
                  <p>契约签订前获得保护者许可</p>
                  <div class="example">
                    <strong>例子：</strong>"爸爸，我想买这个游戏机！" "好的，买吧！"
                  </div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">②</div>
                <div class="timeline-content">
                  <h4>契约成立</h4>
                  <p>限制行为能力人签订契约</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">③</div>
                <div class="timeline-content">
                  <h4>追认（事后）</h4>
                  <p>契约签订后获得保护者追认</p>
                  <div class="example">
                    <strong>例子：</strong>"爸爸，我买了这个游戏机..." "好吧，既然买了就算了。"
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cancellation-rights">
            <h3>取消权的行使</h3>
            <div class="rights-details">
              <div class="right-item">
                <h4>谁可以取消？</h4>
                <ul>
                  <li>限制行为能力人本人</li>
                  <li>法定代理人（保护者）</li>
                  <li>限制行为能力人成为完全行为能力人后的本人</li>
                </ul>
              </div>
              <div class="right-item">
                <h4>取消的效果</h4>
                <ul>
                  <li>契约自始无效</li>
                  <li>可以对抗善意第三者</li>
                  <li>双方互相返还已受领的给付</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 对交易相对方的保护 -->
        <section id="counterparty-protection" class="content-section">
          <h2>5. 对交易相对方的保护</h2>
          
          <div class="protection-measures">
            <div class="protection-card">
              <div class="protection-icon">📢</div>
              <div class="protection-content">
                <h3>催告权</h3>
                <p>交易相对方可以设定1个月以上期限，催告保护者是否追认</p>
                <div class="protection-detail">
                  <strong>效果：</strong>
                  <ul>
                    <li>期限内未答复 → 视为追认</li>
                    <li>被保佐人/被辅助人本人未答复 → 视为取消</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="protection-card">
              <div class="protection-icon">🎭</div>
              <div class="protection-content">
                <h3>诈术抗辩</h3>
                <p>限制行为能力人使用诈术时，不能主张取消</p>
                <div class="protection-detail">
                  <strong>要件：</strong>
                  <ul>
                    <li>限制行为能力人使用欺骗手段</li>
                    <li>使对方相信其为完全行为能力人</li>
                    <li>但对方恶意时仍可取消</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="protection-card">
              <div class="protection-icon">⏰</div>
              <div class="protection-content">
                <h3>取消权期间限制</h3>
                <p>为维护法律关系稳定，设置取消权行使期限</p>
                <div class="protection-detail">
                  <strong>期限：</strong>
                  <ul>
                    <li>自可追认时起5年</li>
                    <li>自行为时起20年</li>
                    <li>以较早者为准</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="protection-card">
              <div class="protection-icon">⚖️</div>
              <div class="protection-content">
                <h3>法定追认</h3>
                <p>特定行为视为追认，放弃取消权</p>
                <div class="protection-detail">
                  <strong>视为追认的行为：</strong>
                  <ul>
                    <li>全部或部分履行债务</li>
                    <li>请求对方履行契约</li>
                    <li>转让取得的权利</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="protection-example">
            <h3>📝 保护案例：土地转卖</h3>
            <div class="example-scenario">
              <div class="scenario-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <strong>未成年人A</strong>未经父母同意，将家中土地卖给<strong>中介B</strong>
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <strong>中介B</strong>将土地转卖给<strong>善意买主C</strong>并完成登记
                </div>
              </div>
              <div class="scenario-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <strong>A的父母</strong>以未成年为由取消契约，要求<strong>C</strong>返还土地
                </div>
              </div>
              <div class="scenario-result">
                <div class="result-icon">✅</div>
                <div class="result-content">
                  <strong>法律效果：</strong>A可以要求C返还土地，但C可行使催告权等保护措施
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
          <router-link to="/video?topic=limited-capacity" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=limited-capacity" class="action-button">
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
  { id: 'four-types', title: '四种类型', icon: '👥' },
  { id: 'protector-rights', title: '保护者权限', icon: '⚖️' },
  { id: 'revocation-recognition', title: '取消与追认', icon: '🔄' },
  { id: 'counterparty-protection', title: '相对方保护', icon: '🛡️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '意思能力（いしのうりょく）',
    chinese: '意思能力',
    explanation: '理解自己行为法律后果的认知能力，契约成立的必要条件',
    example: '幼儿、泥醉者、重度精神障碍者无意思能力'
  },
  {
    japanese: '制限行為能力者（せいげんこういのうりょくしゃ）',
    chinese: '限制行为能力人',
    explanation: '有意思能力但行为能力受限制的人，包括四种类型',
    example: '未成年人、成年被后见人、被保佐人、被辅助人'
  },
  {
    japanese: '成年被後見人（せいねんひこうけんにん）',
    chinese: '成年被后见人',
    explanation: '因精神障碍欠缺辨识能力的常态者，需经后见开始审判',
    example: '几乎所有的单独法律行为都可以撤销'
  },
  {
    japanese: '取消権（とりけしけん）',
    chinese: '取消权',
    explanation: '限制行为能力人或其保护者撤销契约的权利',
    example: '未成年人未经同意买手机，父母可以取消购买契约'
  },
  {
    japanese: '追認（ついにん）',
    chinese: '追认',
    explanation: '对可撤销行为的事后承认，使契约确定有效',
    example: '孩子买了游戏机后，父母说"既然买了就算了"'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '意思無能力者の行った契約は、取消すことができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '意思无能力者的契约是无效，不是可撤销。无效与可撤销有本质区别。'
  },
  {
    question: '成年被後見人が成年後見人の同意を得て行った行為は、取消すことができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '成年被后见人即使获得成年后见人同意，单独行为仍然可以撤销。'
  },
  {
    question: '被保佐人が保佐人の同意を得ずに行った日用品の購入は、取消すことができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '被保佐人的日用品购买等日常生活行为，不需要保佐人同意，也不能撤销。'
  },
  {
    question: '制限行為能力者が詐術を用いて行為能力者であると信じさせた場合、当該行為を取り消すことができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '使用诈术的限制行为能力人不能主张取消，这是对交易安全的保护。'
  },
  {
    question: '未成年者が単独で行った借金の免除契約は、取消すことができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '单纯获得权利或免除义务的行为，未成年人不需要法定代理人同意，也不能撤销。'
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
  learningStore.recordTopicStudyTime('limited-capacity', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('limited-capacity')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('limited-capacity')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('limited-capacity', 0)
  
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
.limited-capacity-page {
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
.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.concept-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.concept-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.concept-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.concept-content p {
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.concept-detail {
  font-size: 0.875rem;
  color: #6c757d;
  line-height: 1.5;
}

.capacity-comparison {
  margin-top: 2rem;
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
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
}

.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.effect-invalid {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.effect-revocable {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

/* ========= 四种类型样式 ========= */
.types-overview {
  margin-bottom: 2rem;
}

.type-scale {
  position: relative;
  margin: 2rem 0;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.scale-bar {
  position: relative;
  height: 8px;
  background: linear-gradient(90deg, #c62828, #ff9800, #4caf50, #2a7960);
  border-radius: 4px;
  margin-bottom: 3rem;
}

.scale-point {
  position: absolute;
  transform: translateX(-50%);
  text-align: center;
}

.point-label {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.types-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.type-detail {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.type-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  font-size: 0.875rem;
}

.legal-effects {
  margin: 1.5rem 0;
}

.effect-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.effect-item.positive {
  border-left: 4px solid #4caf50;
}

.effect-item.negative {
  border-left: 4px solid #f44336;
}

.effect-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.effect-content {
  flex: 1;
}

.effect-content ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.25rem;
}

.effect-content li {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.special-note {
  padding: 1rem;
  background: #fff9e6;
  border-radius: 8px;
  border: 1px solid #ffcc00;
  margin: 1rem 0;
  font-weight: 500;
}

.example-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f0f7ff;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.example-box h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.example-box p {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ========= 保护者权限比较样式 ========= */
.rights-comparison {
  margin: 2rem 0;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.rights-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.rights-table th, .rights-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.rights-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.rights-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.has-right {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.no-right {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.conditional {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-symbol {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.legend-symbol.has-right {
  background-color: #e7f7e7;
  color: #2e7d32;
}

.legend-symbol.no-right {
  background-color: #ffe7e7;
  color: #c62828;
}

.legend-symbol.conditional {
  background-color: #fff9e6;
  color: #e65100;
}

.legend-text {
  font-size: 0.875rem;
  color: #6c757d;
}

.important-notes {
  margin-top: 2rem;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.note-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.note-card h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.note-card p {
  margin: 0;
  line-height: 1.6;
  font-size: 0.875rem;
}

/* ========= 取消权与追认样式 ========= */
.timeline-explanation {
  margin-bottom: 2rem;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 30px;
  width: 2px;
  background: #2a7960;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 80px;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  background: #2a7960;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  z-index: 1;
}

.timeline-content {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.timeline-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.timeline-content p {
  margin: 0 0 1rem 0;
}

.example {
  padding: 0.75rem;
  background: #f0f7ff;
  border-radius: 4px;
  font-size: 0.875rem;
}

.cancellation-rights {
  margin-top: 2rem;
}

.rights-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.right-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.right-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.right-item ul {
  margin: 0;
  padding-left: 1.25rem;
}

.right-item li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* ========= 对交易相对方的保护样式 ========= */
.protection-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.protection-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.protection-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.protection-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.protection-content p {
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.protection-detail {
  font-size: 0.875rem;
  color: #6c757d;
}

.protection-detail ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.25rem;
}

.protection-detail li {
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.protection-example {
  margin-top: 2rem;
}

.example-scenario {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #2a7960;
}

.scenario-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
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

.step-content {
  flex: 1;
}

.scenario-result {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #e7f7e7;
  border-radius: 4px;
  margin-top: 1rem;
}

.result-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.result-content {
  flex: 1;
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
  
  .concept-cards {
    grid-template-columns: 1fr;
  }
  
  .type-info {
    grid-template-columns: 1fr;
  }
  
  .protection-measures {
    grid-template-columns: 1fr;
  }
  
  .rights-details {
    grid-template-columns: 1fr;
  }
  
  .notes-grid {
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
  
  .timeline::before {
    left: 15px;
  }
  
  .timeline-item {
    padding-left: 50px;
  }
  
  .timeline-marker {
    width: 30px;
    height: 30px;
    font-size: 0.875rem;
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
  
  .legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>