<!-- src/views/notes/rights/BuildingSegmentationOwnership.vue -->
<template>
  <div class="building-segmentation-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>建物区分所有法</span>
        </div>
        <h1>建物区分所有法</h1>
        <p>公寓等区分所有建物的所有权、管理、规约及集会制度的法律规定，保障集体生活的秩序与和谐</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">15</span>
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
            <li>理解区分所有权的基本概念和构成要素</li>
            <li>掌握管理组合、管理者和集会的运作机制</li>
            <li>熟悉规约的设定、变更和法律效力</li>
            <li>了解共用部分管理的不同行为类型和决议要求</li>
            <li>掌握复旧、重建的法定条件和决议标准</li>
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
          <h2>1. 基本概念</h2>
          
          <h3>区分所有权的构成</h3>
          <div class="concept-explanation">
            <p>区分所有权由专有部分、共用部分和敷地利用权三部分构成。</p>
            
            <div class="ownership-structure">
              <div class="structure-item">
                <div class="structure-icon">🏠</div>
                <div class="structure-content">
                  <h4>专有部分</h4>
                  <p>各区分所有者单独所有的部分</p>
                  <div class="structure-example">如：501号室</div>
                </div>
              </div>
              <div class="structure-item">
                <div class="structure-icon">🚪</div>
                <div class="structure-content">
                  <h4>共用部分</h4>
                  <p>全体区分所有者共有的部分</p>
                  <div class="structure-example">如：走廊、电梯、大厅</div>
                </div>
              </div>
              <div class="structure-item">
                <div class="structure-icon">🌳</div>
                <div class="structure-content">
                  <h4>敷地利用权</h4>
                  <p>建物所在土地的利用权利</p>
                  <div class="structure-example">如：公寓下面的土地使用权</div>
                </div>
              </div>
            </div>
          </div>

          <h3>一体化原则</h3>
          <div class="integration-principle">
            <div class="principle-item">
              <div class="principle-icon">🔗</div>
              <div class="principle-content">
                <h4>原则：不可分离</h4>
                <p>专有部分与敷地利用权原则上不可分离处分</p>
              </div>
            </div>
            <div class="principle-item">
              <div class="principle-icon">📝</div>
              <div class="principle-content">
                <h4>例外：规约特别规定</h4>
                <p>规约特别规定时可分离处分</p>
              </div>
            </div>
          </div>

          <h3>与一户建的区别</h3>
          <div class="comparison">
            <div class="comparison-item">
              <h4>一户建</h4>
              <ul>
                <li>建物和土地可分别登记</li>
                <li>建物和土地可分离处分</li>
                <li>单独所有权</li>
              </ul>
            </div>
            <div class="comparison-item">
              <h4>区分建物</h4>
              <ul>
                <li>建物和土地一体化管理</li>
                <li>专有部分与敷地利用权原则上不可分离</li>
                <li>区分所有权 + 共用部分共有</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 管理者制度 -->
        <section id="management-system" class="content-section">
          <h2>2. 管理者制度</h2>
          
          <h3>管理者的角色</h3>
          <div class="manager-role">
            <div class="role-clarification">
              <div class="clarification-item correct">
                <div class="clarification-icon">✅</div>
                <div class="clarification-content">
                  <h4>管理者的真实身份</h4>
                  <p>管理组合的理事、理事长等</p>
                  <p class="clarification-note">代理区分所有者执行集会决议和规约</p>
                </div>
              </div>
              <div class="clarification-item incorrect">
                <div class="clarification-icon">❌</div>
                <div class="clarification-content">
                  <h4>常见误解</h4>
                  <p>不是看门大爷或物业工作人员</p>
                  <p class="clarification-note">管理者可以不是区分所有者</p>
                </div>
              </div>
            </div>
          </div>

          <h3>选任与解任</h3>
          <div class="appointment-rules">
            <div class="rule-item">
              <div class="rule-icon">📊</div>
              <div class="rule-content">
                <h4>原则</h4>
                <p>区分所有者及决议权各过半同意</p>
              </div>
            </div>
            <div class="rule-item">
              <div class="rule-icon">📋</div>
              <div class="rule-content">
                <h4>例外</h4>
                <p>规约可规定管理者</p>
              </div>
            </div>
          </div>

          <h3>管理者的权限</h3>
          <div class="manager-authority">
            <div class="authority-item">
              <h4>诉讼权限</h4>
              <ul>
                <li>成为原告或被告进行诉讼</li>
                <li>进行诉讼时必须通知各区分所有者</li>
              </ul>
            </div>
            <div class="authority-item">
              <h4>法人化</h4>
              <ul>
                <li>需要区分所有者及决议权各3/4以上同意</li>
                <li>需要进行法人登记</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 集会制度 -->
        <section id="assembly-system" class="content-section">
          <h2>3. 集会制度</h2>
          
          <h3>集会的召集</h3>
          <div class="assembly-convening">
            <div class="convening-item">
              <div class="convening-icon">📅</div>
              <div class="convening-content">
                <h4>定期召集</h4>
                <p>管理者每年至少召集1次集会</p>
              </div>
            </div>
            <div class="convening-item">
              <div class="convening-icon">👥</div>
              <div class="convening-content">
                <h4>请求召集</h4>
                <p>1/5以上区分所有者可请求召开</p>
                <p class="convening-note">规约可缩减此比例</p>
              </div>
            </div>
            <div class="convening-item">
              <div class="convening-icon">📢</div>
              <div class="convening-content">
                <h4>通知期间</h4>
                <p>原则上1周前通知</p>
                <p class="convening-note">规约可缩减此期间</p>
              </div>
            </div>
          </div>

          <h3>特别规定</h3>
          <div class="special-provisions">
            <div class="provision-item">
              <h4>全员同意</h4>
              <p>全员同意时可省略召集手续</p>
            </div>
            <div class="provision-item">
              <h4>共有情况</h4>
              <p>专有部分共有时，通知1名共有者即可</p>
            </div>
            <div class="provision-item">
              <h4>重大事项</h4>
              <p>重大事项时须通知议案要领</p>
            </div>
          </div>

          <h3>决议事项限制</h3>
          <div class="resolution-limits">
            <div class="limit-item">
              <div class="limit-icon">📋</div>
              <div class="limit-content">
                <h4>原则</h4>
                <p>只能决议事先通知的事项</p>
              </div>
            </div>
            <div class="limit-item">
              <div class="limit-icon">➕</div>
              <div class="limit-content">
                <h4>规约特别规定</h4>
                <p>规约特别规定时可追加议题</p>
              </div>
            </div>
            <div class="limit-item">
              <div class="limit-icon">🚫</div>
              <div class="limit-content">
                <h4>重大事项例外</h4>
                <p>重大特别决议事项不能追加其他议题</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 决议权与议事规则 -->
        <section id="voting-rules" class="content-section">
          <h2>4. 决议权与议事规则</h2>
          
          <h3>决议权的确定</h3>
          <div class="voting-determination">
            <div class="determination-item">
              <div class="determination-icon">📏</div>
              <div class="determination-content">
                <h4>按面积比例</h4>
                <p>根据专有部分床面积比例决定</p>
              </div>
            </div>
            <div class="determination-item">
              <div class="determination-icon">👨‍👩‍👧‍👦</div>
              <div class="determination-content">
                <h4>共有情况</h4>
                <p>专有部分共有时，需选定1人行使决议权</p>
              </div>
            </div>
            <div class="determination-item">
              <div class="determination-icon">📧</div>
              <div class="determination-content">
                <h4>代理行使</h4>
                <p>可通过书面或代理人行使决议权</p>
              </div>
            </div>
          </div>

          <h3>议事录要求</h3>
          <div class="minutes-requirements">
            <div class="requirement-item">
              <h4>作成方式</h4>
              <p>由议长书面或电子作成</p>
            </div>
            <div class="requirement-item">
              <h4>署名要求</h4>
              <p>书面作成时需要议长和2名出席者署名</p>
            </div>
            <div class="requirement-item">
              <h4>阅览权利</h4>
              <p>利害关系人可请求阅览</p>
            </div>
          </div>

          <h3>特别参与权</h3>
          <div class="special-participation">
            <div class="participation-item">
              <div class="participation-icon">🗣️</div>
              <div class="participation-content">
                <h4>租借人等占有者</h4>
                <p>可出席发表意见</p>
                <p class="participation-note">但没有决议权</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 共用部分管理 -->
        <section id="common-parts" class="content-section">
          <h2>5. 共用部分管理</h2>
          
          <h3>三种行为类型</h3>
          <div class="action-types">
            <div class="action-item">
              <div class="action-header">
                <div class="action-icon">💡</div>
                <h4>保存行为</h4>
              </div>
              <div class="action-content">
                <p><strong>内容：</strong>换灯泡、修补窗户等</p>
                <p><strong>决议要求：</strong>可单独行使</p>
                <p><strong>规约：</strong>可特别规定</p>
              </div>
            </div>
            <div class="action-item">
              <div class="action-header">
                <div class="action-icon">📄</div>
                <h4>管理行为</h4>
              </div>
              <div class="action-content">
                <p><strong>内容：</strong>损害保险、夜间灯设置等</p>
                <p><strong>决议要求：</strong>需要各过半数同意</p>
              </div>
            </div>
            <div class="action-item">
              <div class="action-header">
                <div class="action-icon">🔧</div>
                <h4>变更行为</h4>
              </div>
              <div class="action-content">
                <div class="sub-action">
                  <h5>轻微变更</h5>
                  <p>各过半数同意</p>
                </div>
                <div class="sub-action">
                  <h5>重大变更</h5>
                  <p>各3/4以上同意</p>
                </div>
              </div>
            </div>
          </div>

          <h3>重大变更的特例</h3>
          <div class="major-change-exception">
            <div class="exception-item">
              <div class="exception-icon">📊</div>
              <div class="exception-content">
                <h4>区分所有者定数</h4>
                <p>可通过规约减至过半数</p>
              </div>
            </div>
            <div class="exception-item">
              <div class="exception-icon">🔒</div>
              <div class="exception-content">
                <h4>决议权</h4>
                <p>必须保持3/4以上</p>
                <p class="exception-note">不可通过规约减额</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 复旧与重建 -->
        <section id="restoration-rebuilding" class="content-section">
          <h2>6. 复旧与重建</h2>
          
          <h3>复旧的分类</h3>
          <div class="restoration-types">
            <div class="restoration-item">
              <div class="restoration-header">
                <h4>小规模灭失</h4>
                <div class="restoration-badge">建物价格1/2以下</div>
              </div>
              <div class="restoration-content">
                <ul>
                  <li>复旧决议前可各自修缮</li>
                  <li>复旧决议需要各过半数同意</li>
                </ul>
              </div>
            </div>
            <div class="restoration-item">
              <div class="restoration-header">
                <h4>大规模灭失</h4>
                <div class="restoration-badge">建物价格超过1/2</div>
              </div>
              <div class="restoration-content">
                <ul>
                  <li>需要各3/4以上同意</li>
                  <li>不可通过规约增减</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>重建</h3>
          <div class="rebuilding-rules">
            <div class="rebuilding-item">
              <div class="rebuilding-icon">🏗️</div>
              <div class="rebuilding-content">
                <h4>决议要求</h4>
                <p>需要各4/5以上同意</p>
                <p class="rebuilding-note">不可通过规约增减</p>
              </div>
            </div>
            <div class="rebuilding-item">
              <div class="rebuilding-icon">📅</div>
              <div class="rebuilding-content">
                <h4>通知期间</h4>
                <p>召集通知需提前2个月</p>
              </div>
            </div>
          </div>

          <h3>权利救济</h3>
          <div class="rights-remedy">
            <div class="remedy-item">
              <h4>大规模灭失</h4>
              <p>非赞成者可向赞成者请求买取</p>
            </div>
            <div class="remedy-item">
              <h4>重建</h4>
              <p>赞成者可向非赞成者请求卖渡</p>
            </div>
          </div>
        </section>

        <!-- 规约制度 -->
        <section id="covenant-system" class="content-section">
          <h2>7. 规约制度</h2>
          
          <h3>规约的设定与变更</h3>
          <div class="covenant-setup">
            <div class="setup-item">
              <div class="setup-icon">📊</div>
              <div class="setup-content">
                <h4>决议要求</h4>
                <p>需要各3/4以上同意</p>
              </div>
            </div>
            <div class="setup-item">
              <div class="setup-icon">📝</div>
              <div class="setup-content">
                <h4>形式要求</h4>
                <p>必须作成书面或电子版</p>
              </div>
            </div>
            <div class="setup-item">
              <div class="setup-icon">🤝</div>
              <div class="setup-content">
                <h4>特别承诺</h4>
                <p>对特别受影响者需得其承诺</p>
              </div>
            </div>
          </div>

          <h3>原始规约</h3>
          <div class="original-covenant">
            <div class="original-item">
              <div class="original-icon">👤</div>
              <div class="original-content">
                <h4>设定主体</h4>
                <p>只能由最初全部取得者设定</p>
                <p class="original-note">其他让受者不可设定</p>
              </div>
            </div>
            <div class="original-item">
              <div class="original-icon">📑</div>
              <div class="original-content">
                <h4>公证要求</h4>
                <p>必须公证证书设定</p>
              </div>
            </div>
            <div class="original-item">
              <div class="original-icon">📋</div>
              <div class="original-content">
                <h4>可规定事项</h4>
                <ul>
                  <li>规约共用部分</li>
                  <li>规约敷地</li>
                  <li>分离处分等</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>规约的效力</h3>
          <div class="covenant-effect">
            <div class="effect-item">
              <h4>效力范围</h4>
              <p>对一般承继人、特定承继人、占有者均有效</p>
            </div>
            <div class="effect-item">
              <h4>保管要求</h4>
              <p>原则上由管理者保管</p>
            </div>
            <div class="effect-item">
              <h4>阅览权利</h4>
              <p>无正当理由不得拒绝利害关系人阅览</p>
            </div>
          </div>
        </section>

        <!-- 违反义务的处置 -->
        <section id="violation-handling" class="content-section">
          <h2>8. 违反义务的处置</h2>
          
          <h3>处置内容</h3>
          <div class="violation-content">
            <div class="violation-target">
              <h4>对区分所有者</h4>
              <ul>
                <li>行为停止</li>
                <li>建物使用禁止</li>
                <li>拍卖房产</li>
              </ul>
            </div>
            <div class="violation-target">
              <h4>对占有者</h4>
              <ul>
                <li>行为停止</li>
                <li>契约解除</li>
                <li>搬离要求</li>
              </ul>
            </div>
          </div>

          <h3>行使方法</h3>
          <div class="enforcement-methods">
            <div class="method-item">
              <div class="method-header">
                <h4>行为停止</h4>
                <div class="method-badge">较轻处置</div>
              </div>
              <div class="method-content">
                <p><strong>方式：</strong>可诉讼或口头要求</p>
                <p><strong>决议要求：</strong>诉讼需各过半数同意</p>
              </div>
            </div>
            <div class="method-item">
              <div class="method-header">
                <h4>使用禁止、拍卖、解除契约</h4>
                <div class="method-badge">较重处置</div>
              </div>
              <div class="method-content">
                <p><strong>方式：</strong>必须诉讼</p>
                <p><strong>决议要求：</strong>需各3/4以上同意</p>
              </div>
            </div>
          </div>

          <h3>处罚规定</h3>
          <div class="penalty-rules">
            <div class="penalty-item">
              <div class="penalty-icon">💰</div>
              <div class="penalty-content">
                <h4>保管怠慢</h4>
                <p>可处20万日元以下罚款</p>
              </div>
            </div>
            <div class="penalty-item">
              <div class="penalty-icon">🚫</div>
              <div class="penalty-content">
                <h4>拒绝阅览</h4>
                <p>可处20万日元以下罚款</p>
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
          <router-link to="/video?topic=building-segmentation" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=building-segmentation" class="action-button">
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
  { id: 'management-system', title: '管理者制度', icon: '👨‍💼' },
  { id: 'assembly-system', title: '集会制度', icon: '👥' },
  { id: 'voting-rules', title: '决议权与议事规则', icon: '🗳️' },
  { id: 'common-parts', title: '共用部分管理', icon: '🏢' },
  { id: 'restoration-rebuilding', title: '复旧与重建', icon: '🏗️' },
  { id: 'covenant-system', title: '规约制度', icon: '📋' },
  { id: 'violation-handling', title: '违反义务处置', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '区分所有权（くぶんしょゆうけん）',
    chinese: '区分所有权',
    explanation: '对公寓等区分所有建物中专有部分的单独所有权',
    example: '501号室的所有权'
  },
  {
    japanese: '敷地利用権（しきちりようけん）',
    chinese: '敷地利用权',
    explanation: '区分所有建物所在土地的利用权利',
    example: '公寓下面的土地使用权'
  },
  {
    japanese: '規約（きやく）',
    chinese: '规约',
    explanation: '区分所有者全体制定的管理规则',
    example: '禁止在阳台饲养宠物的规定'
  },
  {
    japanese: '管理者（かんりしゃ）',
    chinese: '管理者',
    explanation: '执行管理组合业务的代表人',
    example: '管理组合的理事长'
  },
  {
    japanese: '集会（しゅうかい）',
    chinese: '集会',
    explanation: '区分所有者的决议机关',
    example: '年度业主大会'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '敷地利用権が数人で有する所有権その他の権利である場合には、区分所有者は、規約で別段の定めがあるときを除き、その有する専有部分とその専有部分に係る敷地利用権とを分離して処分することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '原则上专有部分与敷地利用权不可分离处分，规约特别规定时除外。'
  },
  {
    question: '他の区分所有者から区分所有権を譲り受け、建物の専有部分の全部を所有することとなった者は、公正証書による規約の設定を行うことができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '只有最初专有部分的全部取得者（分让业者等）可以设定原始规约。'
  },
  {
    question: '管理者は、少なくとも毎年1回集会を招集しなければならない。また、招集通知は、会日より少なくとも1週間前に、会議の目的たる事項を示し、各区分所有者に発しなければならない。ただし、この期間は、規約で伸縮することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '管理者每年至少召集1次集会，通知期间原则上1周前，规约可伸缩。'
  },
  {
    question: '共用部分の重大変更についての集会の決議は、区分所有者及び議決権の各４分の３以上の賛成が必要であるが、区分所有者の定数については、規約で過半数まで減ずることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '重大变更需要各3/4以上同意，但区分所有者定数可通过规约减至过半数。'
  },
  {
    question: '建替えの決議には、区分所有者及び議決権の各５分の４以上の賛成が必要であり、この定数は規約で別段の定めをすることができない。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '重建需要各4/5以上同意，且该定数不可通过规约增减。'
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
  learningStore.recordTopicStudyTime('building-segmentation', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('building-segmentation')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('building-segmentation')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('building-segmentation', 0)
  
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
.building-segmentation-page {
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
.ownership-structure {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.structure-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.structure-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.structure-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.structure-content p {
  margin: 0 0 1rem 0;
  color: #6c757d;
}

.structure-example {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6c757d;
}

.integration-principle {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.principle-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
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

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.comparison-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.comparison-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  text-align: center;
}

.comparison-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.comparison-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 管理者制度样式 ========= */
.manager-role {
  margin: 1.5rem 0;
}

.role-clarification {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.clarification-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
}

.clarification-item.correct {
  background: #e7f7e7;
  border: 1px solid #2e7d32;
}

.clarification-item.incorrect {
  background: #ffe7e7;
  border: 1px solid #c62828;
}

.clarification-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.clarification-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.clarification-content p {
  margin: 0.25rem 0;
}

.clarification-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
}

.appointment-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rule-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.rule-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rule-content p {
  margin: 0;
  color: #6c757d;
}

.manager-authority {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.authority-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.authority-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.authority-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.authority-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 集会制度样式 ========= */
.assembly-convening {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.convening-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.convening-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.convening-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.convening-content p {
  margin: 0;
  color: #6c757d;
}

.convening-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #2a7960;
  font-weight: bold;
}

.special-provisions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.provision-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.provision-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.resolution-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.limit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.limit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.limit-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.limit-content p {
  margin: 0;
  color: #6c757d;
}

/* ========= 决议权与议事规则样式 ========= */
.voting-determination {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.determination-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.determination-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.determination-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.determination-content p {
  margin: 0;
  color: #6c757d;
}

.minutes-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.requirement-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.requirement-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.special-participation {
  margin: 1.5rem 0;
}

.participation-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  max-width: 500px;
}

.participation-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.participation-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.participation-content p {
  margin: 0;
  color: #6c757d;
}

.participation-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #c62828;
  font-weight: bold;
}

/* ========= 共用部分管理样式 ========= */
.action-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.action-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.action-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.action-icon {
  font-size: 2rem;
}

.action-header h4 {
  margin: 0;
  color: #1a472a;
}

.action-content p {
  margin: 0.5rem 0;
}

.sub-action {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.sub-action h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.sub-action p {
  margin: 0;
}

.major-change-exception {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.exception-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.exception-icon {
  font-size: 2rem;
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

.exception-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #c62828;
  font-weight: bold;
}

/* ========= 复旧与重建样式 ========= */
.restoration-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.restoration-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.restoration-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.restoration-header h4 {
  margin: 0;
  color: #1a472a;
}

.restoration-badge {
  padding: 0.25rem 0.75rem;
  background: #2a7960;
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

.restoration-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.restoration-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.rebuilding-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rebuilding-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.rebuilding-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.rebuilding-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.rebuilding-content p {
  margin: 0;
  color: #6c757d;
}

.rebuilding-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #c62828;
  font-weight: bold;
}

.rights-remedy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.remedy-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.remedy-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 规约制度样式 ========= */
.covenant-setup {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.setup-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.setup-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.setup-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.setup-content p {
  margin: 0;
  color: #6c757d;
}

.original-covenant {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.original-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.original-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.original-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.original-content p {
  margin: 0;
  color: #6c757d;
}

.original-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #c62828;
  font-weight: bold;
}

.original-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.original-content li {
  margin-bottom: 0.25rem;
  line-height: 1.6;
}

.covenant-effect {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.effect-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.effect-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 违反义务处置样式 ========= */
.violation-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.violation-target {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.violation-target h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.violation-target ul {
  padding-left: 1.25rem;
  margin: 0;
}

.violation-target li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.enforcement-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.method-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.method-header h4 {
  margin: 0;
  color: #1a472a;
}

.method-badge {
  padding: 0.25rem 0.75rem;
  background: #2a7960;
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

.method-content p {
  margin: 0.5rem 0;
}

.penalty-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.penalty-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.penalty-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.penalty-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.penalty-content p {
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
  
  .ownership-structure {
    grid-template-columns: 1fr;
  }
  
  .integration-principle {
    grid-template-columns: 1fr;
  }
  
  .comparison {
    grid-template-columns: 1fr;
  }
  
  .role-clarification {
    grid-template-columns: 1fr;
  }
  
  .appointment-rules {
    grid-template-columns: 1fr;
  }
  
  .manager-authority {
    grid-template-columns: 1fr;
  }
  
  .assembly-convening {
    grid-template-columns: 1fr;
  }
  
  .special-provisions {
    grid-template-columns: 1fr;
  }
  
  .resolution-limits {
    grid-template-columns: 1fr;
  }
  
  .voting-determination {
    grid-template-columns: 1fr;
  }
  
  .minutes-requirements {
    grid-template-columns: 1fr;
  }
  
  .action-types {
    grid-template-columns: 1fr;
  }
  
  .major-change-exception {
    grid-template-columns: 1fr;
  }
  
  .restoration-types {
    grid-template-columns: 1fr;
  }
  
  .rebuilding-rules {
    grid-template-columns: 1fr;
  }
  
  .rights-remedy {
    grid-template-columns: 1fr;
  }
  
  .covenant-setup {
    grid-template-columns: 1fr;
  }
  
  .original-covenant {
    grid-template-columns: 1fr;
  }
  
  .covenant-effect {
    grid-template-columns: 1fr;
  }
  
  .violation-content {
    grid-template-columns: 1fr;
  }
  
  .enforcement-methods {
    grid-template-columns: 1fr;
  }
  
  .penalty-rules {
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
  
  .restoration-header,
  .method-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>