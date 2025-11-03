<!-- src/views/notes/rights/CoOwnership.vue -->
<template>
  <div class="co-ownership-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>共有</span>
        </div>
        <h1>共有（Co-ownership）</h1>
        <p>日本民法中的共有制度，涉及多个权利人对同一物共同享有所有权的关系，包括持分、管理行为、变更行为和分割等重要内容</p>
        
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
            <li>理解共有的基本概念和法律特征</li>
            <li>掌握持分的定义、推定规则和处分方式</li>
            <li>熟悉共有物的管理、变更行为分类和决策机制</li>
            <li>了解共有关系解消的方式和分割方法</li>
            <li>掌握特殊情况下（所在不明共有者）的处理规则</li>
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
          
          <h3>定义与特征</h3>
          <div class="concept-explanation">
            <p>共有是指多个主体共同拥有一物的所有权关系。日本民法对共有持谨慎态度，倾向于促进共有关系的解消。</p>
            
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>民法认为共有容易引发纠纷，因此设计了各种制度来促进共有关系的解消，如随时分割请求权。</p>
            </div>
          </div>

          <h3>重要特征</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🔗</div>
              <div class="timing-content">
                <h4>全部使用权</h4>
                <p>各共有人对共有物全部享有使用权，而非物理分割</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">⚖️</div>
              <div class="timing-content">
                <h4>相互制约</h4>
                <p>共有人之间相互制约，不能单独决定重大事项</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">🔄</div>
              <div class="timing-content">
                <h4>解消倾向</h4>
                <p>民法鼓励共有关系解消，避免长期纠纷</p>
              </div>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="case-study">
            <div class="case-content">
              <h4>ABC三人购车案例</h4>
              <p>ABC三人各出资500万日元购买1500万日元的汽车。</p>
              <div class="case-details">
                <div class="case-point">✅ 每人都有权使用整辆汽车</div>
                <div class="case-point">✅ 不是"轮流使用4个月"的概念</div>
                <div class="case-point">✅ 按持分享有全部使用权</div>
                <div class="case-point">❌ 不是"车的前半部分归A"这样的物理分割</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 持分 -->
        <section id="shares" class="content-section">
          <h2>2. 持分（份额）</h2>
          
          <h3>持分的确定</h3>
          <div class="share-determination">
            <div class="determination-rules">
              <div class="rule-item">
                <h4>约定优先</h4>
                <p>有约定时按约定确定持分比例</p>
              </div>
              <div class="rule-item">
                <h4>均等推定</h4>
                <p>无约定时推定为均等持分</p>
              </div>
              <div class="rule-item">
                <h4>自由处分</h4>
                <p>持分可以自由处分，无需其他共有人同意</p>
              </div>
            </div>
          </div>

          <h3>持分处分规则</h3>
          <div class="share-flowchart">
            <div class="flow-steps">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>持分处分</h4>
                  <p>共有人对自有持分的处置</p>
                </div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>三种方式</h4>
                  <div class="sub-steps">
                    <div class="sub-step">转让给第三人</div>
                    <div class="sub-step">持分放弃</div>
                    <div class="sub-step">继承</div>
                  </div>
                </div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>法律效果</h4>
                  <div class="sub-steps">
                    <div class="sub-step">无需其他共有人同意</div>
                    <div class="sub-step">自动归其他共有人</div>
                    <div class="sub-step">按继承规则处理</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>实务要点</h3>
          <div class="practice-points">
            <div class="point-item">
              <h4>🔄 持分转让</h4>
              <ul>
                <li>其他共有人没有优先购买权</li>
                <li>持分可以作为抵押标的物</li>
                <li>持分价值按出资比例或约定比例计算</li>
              </ul>
            </div>
            <div class="point-item">
              <h4>📈 持分变动</h4>
              <ul>
                <li>持分放弃：自动归其他共有人</li>
                <li>死亡无继承人：持分归其他共有人</li>
                <li>持分比例变化需明确约定</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 使用与义务 -->
        <section id="usage-obligations" class="content-section">
          <h2>3. 共有物的使用与义务</h2>
          
          <h3>使用规则</h3>
          <div class="usage-rules">
            <div class="rule-cards">
              <div class="rule-card">
                <div class="card-icon">📊</div>
                <div class="card-content">
                  <h4>按比例使用</h4>
                  <p>各共有人有权按持分比例使用共有物全部</p>
                </div>
              </div>
              <div class="rule-card">
                <div class="card-icon">💰</div>
                <div class="card-content">
                  <h4>超额补偿</h4>
                  <p>超出持分比例使用时，需向其他共有人支付使用对价</p>
                </div>
              </div>
              <div class="rule-card">
                <div class="card-icon">🚫</div>
                <div class="card-content">
                  <h4>不妨碍义务</h4>
                  <p>不得妨碍其他共有人行使权利</p>
                </div>
              </div>
            </div>
          </div>

          <h3>善管注意义务</h3>
          <div class="duty-explanation">
            <p>共有人对共有物负有<strong>善良管理者的注意义务</strong>，要求比对自己物品更高的注意程度：</p>
            
            <div class="duty-requirements">
              <div class="requirement-item">
                <h4>妥善保管</h4>
                <p>妥善保管和维护共有物，防止价值减损</p>
              </div>
              <div class="requirement-item">
                <h4>禁止损害</h4>
                <p>不得故意损坏或放任共有物价值减损</p>
              </div>
              <div class="requirement-item">
                <h4>合理使用</h4>
                <p>按照共有物的性质和用途合理使用</p>
              </div>
            </div>
          </div>

          <h3>实务案例</h3>
          <div class="practical-case">
            <div class="case-scenario">
              <h4>车辆使用案例</h4>
              <p>A独自使用共有车辆期间，B和C的权利：</p>
              <div class="case-analysis">
                <div class="analysis-point correct">
                  <strong>可以：</strong>要求A按持分比例支付使用费
                </div>
                <div class="analysis-point correct">
                  <strong>可以：</strong>在合理范围内要求轮流使用
                </div>
                <div class="analysis-point incorrect">
                  <strong>不可以：</strong>当然地要求A立即交还车辆
                </div>
                <div class="analysis-point correct">
                  <strong>可以：</strong>如A过度使用导致损耗，要求其承担责任
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 管理行为 -->
        <section id="management-actions" class="content-section">
          <h2>4. 共有物的管理行为</h2>
          
          <h3>三类行为区分</h3>
          <div class="action-types">
            <div class="table-container">
              <table class="actions-table">
                <thead>
                  <tr>
                    <th>行为类型</th>
                    <th>决策机制</th>
                    <th>具体例子</th>
                    <th>法律依据</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>保存行为</strong></td>
                    <td class="decision-single">各共有人单独决定</td>
                    <td>房屋维修、排除非法占有、支付必要税费</td>
                    <td>民法第252条</td>
                  </tr>
                  <tr>
                    <td><strong>管理行为</strong></td>
                    <td class="decision-majority">持分价格过半数决定</td>
                    <td>3年以下房屋租赁、5年以下土地租赁、日常管理</td>
                    <td>民法第252条</td>
                  </tr>
                  <tr>
                    <td><strong>变更行为</strong></td>
                    <td class="decision-unanimous">全体共有人同意</td>
                    <td>出售共有物、大规模改建、改变用途</td>
                    <td>民法第251条</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>重要概念澄清</h3>
          <div class="concept-clarification">
            <div class="clarification-item">
              <h4>"持分价格过半数" ≠ "人数过半数"</h4>
              <div class="comparison">
                <div class="comparison-item">
                  <h5>过半数</h5>
                  <p>20人中需<strong>11人以上</strong>同意</p>
                  <div class="example">从第11人开始起有效</div>
                </div>
                <div class="comparison-item">
                  <h5>1/2以上</h5>
                  <p>20人中需<strong>10人以上</strong>同意</p>
                  <div class="example">包括第10个人</div>
                </div>
              </div>
            </div>
          </div>

          <h3>特殊管理规则</h3>
          <div class="special-rules">
            <div class="rule-items">
              <div class="rule-item">
                <div class="rule-icon">👥</div>
                <div class="rule-content">
                  <h4>管理者选任/解任</h4>
                  <p>持分价格过半数决定</p>
                </div>
              </div>
              <div class="rule-item">
                <div class="rule-icon">🔧</div>
                <div class="rule-content">
                  <h4>轻微变更</h4>
                  <p>持分价格过半数决定</p>
                </div>
              </div>
              <div class="rule-item">
                <div class="rule-icon">🏗️</div>
                <div class="rule-content">
                  <h4>重大变更</h4>
                  <p>必须全体同意</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 解消与分割 -->
        <section id="dissolution-partition" class="content-section">
          <h2>5. 共有关系解消与分割</h2>
          
          <h3>分割请求权</h3>
          <div class="partition-rights">
            <div class="rights-comparison">
              <div class="right-item">
                <h4>原则：随时请求</h4>
                <p>各共有人可随时请求分割共有物</p>
                <div class="right-note">民法为解消共有关系提供便利</div>
              </div>
              <div class="right-item">
                <h4>例外：特约限制</h4>
                <p>可约定5年内不分割，期满可续约</p>
                <div class="right-note warning">每次续约不超过5年</div>
              </div>
            </div>
          </div>

          <h3>分割方法</h3>
          <div class="partition-methods">
            <div class="method-cards">
              <div class="method-card">
                <div class="method-icon">🏞️</div>
                <div class="method-content">
                  <h4>现物分割</h4>
                  <p>物理分割共有物</p>
                  <div class="method-suitability">
                    <strong>适合：</strong>土地等可分物
                  </div>
                </div>
              </div>
              <div class="method-card">
                <div class="method-icon">💵</div>
                <div class="method-content">
                  <h4>价格赔偿</h4>
                  <p>一人取得全部，向其他人支付金钱补偿</p>
                  <div class="method-suitability">
                    <strong>适合：</strong>不可分或价值差异大
                  </div>
                </div>
              </div>
              <div class="method-card">
                <div class="method-icon">🔨</div>
                <div class="method-content">
                  <h4>竞卖分割</h4>
                  <p>拍卖共有物，按持分分配价款</p>
                  <div class="method-suitability">
                    <strong>适合：</strong>协议不成时
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3>分割流程</h3>
          <div class="partition-flow">
            <div class="flow-diagram">
              <div class="flow-step first">
                <div class="step-title">分割请求</div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step decision">
                <div class="step-title">协议是否成立</div>
                <div class="step-branches">
                  <div class="branch yes">是 → 按协议分割</div>
                  <div class="branch no">否 → 向法院请求分割</div>
                </div>
              </div>
              <div class="flow-arrow">↓</div>
              <div class="flow-step final">
                <div class="step-title">法院决定分割方式</div>
                <div class="step-options">
                  <div class="option">现物分割</div>
                  <div class="option">价格赔偿</div>
                  <div class="option">竞卖</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 特殊情况 -->
        <section id="special-cases" class="content-section">
          <h2>6. 特殊情况处理</h2>
          
          <h3>所在不明共有者</h3>
          <div class="missing-owner">
            <div class="situation-handling">
              <div class="handling-item">
                <h4>前提条件</h4>
                <p>经法院许可</p>
              </div>
              <div class="handling-item">
                <h4>变更行为</h4>
                <p>其他共有人可基于全体同意进行</p>
              </div>
              <div class="handling-item">
                <h4>管理事项</h4>
                <p>可基于持分价格过半数决定</p>
              </div>
            </div>
          </div>

          <h3>态度不明共有者</h3>
          <div class="unresponsive-owner">
            <div class="handling-procedure">
              <div class="procedure-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>催告程序</h4>
                  <p>对管理事项进行催告</p>
                </div>
              </div>
              <div class="procedure-arrow">→</div>
              <div class="procedure-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>仍不表态</h4>
                  <p>经催告仍不明确答复</p>
                </div>
              </div>
              <div class="procedure-arrow">→</div>
              <div class="procedure-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>法院许可</h4>
                  <p>经法院许可由其他共有人过半数决定</p>
                </div>
              </div>
            </div>
            <div class="procedure-note">
              <strong>注意：</strong>仅限管理行为，重大变更仍需全体同意
            </div>
          </div>

          <h3>费用负担规则</h3>
          <div class="cost-rules">
            <div class="cost-items">
              <div class="cost-item">
                <h4>💰 费用分担</h4>
                <p>管理费用按持分比例分担</p>
              </div>
              <div class="cost-item">
                <h4>⏰ 不履行后果</h4>
                <p>不履行费用支付义务超过1年，其他共有人可支付补偿金取得其持分</p>
              </div>
              <div class="cost-item">
                <h4>📈 垫付债权</h4>
                <p>垫付费用形成债权，可向持分受让人追偿</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 不动产特殊规则 -->
        <section id="real-estate-rules" class="content-section">
          <h2>7. 不动产共有的特殊规则</h2>
          
          <h3>所在不明共有者的不动产处理</h3>
          <div class="real-estate-handling">
            <div class="handling-options">
              <div class="option-item">
                <h4>持分取得</h4>
                <p>经法院决定，其他共有人可取得不明共有者的持分</p>
              </div>
              <div class="option-item">
                <h4>整体转让</h4>
                <p>经法院决定，可将包含不明共有者持分的不动产整体转让</p>
              </div>
            </div>
          </div>

          <h3>遗产共有的时间限制</h3>
          <div class="inheritance-time-limit">
            <div class="time-limit-box">
              <h4>⏳ 10年等待期</h4>
              <p>遗产共有时，自继承开始需满<strong>10年</strong>才适用所在不明共有者的特殊规则</p>
              <div class="time-note">
                目的是保护潜在继承人的权利
              </div>
            </div>
          </div>

          <h3>登记实务要点</h3>
          <div class="registration-points">
            <div class="registration-items">
              <div class="reg-item">
                <h4>📋 关系记载</h4>
                <p>共有关系需在登记簿上明确记载</p>
              </div>
              <div class="reg-item">
                <h4>🔄 变更登记</h4>
                <p>持分转让需办理变更登记</p>
              </div>
              <div class="reg-item">
                <h4>🛡️ 对抗要件</h4>
                <p>分割协议需经登记才能对抗第三人</p>
              </div>
            </div>
          </div>

          <h3>实务提醒</h3>
          <div class="practice-reminder">
            <div class="reminder-content">
              <h4>⚠️ 重要注意事项</h4>
              <ul>
                <li>共有不动产的管理需要特别注意决策机制</li>
                <li>变更行为必须全体同意，实务中容易产生纠纷</li>
                <li>建议在共有关系成立时明确约定管理规则</li>
                <li>及时办理相关登记手续，保护自身权益</li>
              </ul>
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
          <router-link to="/video?topic=co-ownership" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=co-ownership" class="action-button">
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
  { id: 'shares', title: '持分', icon: '📊' },
  { id: 'usage-obligations', title: '使用与义务', icon: '⚖️' },
  { id: 'management-actions', title: '管理行为', icon: '👥' },
  { id: 'dissolution-partition', title: '解消与分割', icon: '🔄' },
  { id: 'special-cases', title: '特殊情况', icon: '🔍' },
  { id: 'real-estate-rules', title: '不动产规则', icon: '🏠' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '共有（きょうゆう）',
    chinese: '共有',
    explanation: '多个权利人对同一物共同享有所有权的法律关系',
    example: 'ABC三人共同出资购买一辆汽车，各自按出资比例享有所有权'
  },
  {
    japanese: '持分（もちぶん）',
    chinese: '持分/份额',
    explanation: '共有人在共有物中所占的权利比例',
    example: '三人共有房屋，持分各1/3；无特别约定时推定为均等'
  },
  {
    japanese: '保存行為（ほぞんこうい）',
    chinese: '保存行为',
    explanation: '为维持共有物现状和效用而采取的必要措施',
    example: '房屋漏水维修、驱赶非法占有人'
  },
  {
    japanese: '管理行為（かんりこうい）',
    chinese: '管理行为',
    explanation: '对共有物进行日常管理和收益的行为',
    example: '签订3年以下的房屋租赁合同、收取租金'
  },
  {
    japanese: '変更行為（へんこうこうい）',
    chinese: '变更行为',
    explanation: '改变共有物性质、形状或效用的重大行为',
    example: '出售共有房屋、进行大规模增建改建'
  }
]

// 练习题数据
const quizzes = [
  {
    question: '不動産の共有に関し、共有物の保存行為については、各共有者が単独であることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '保存行为是维持共有物现状的必要措施，各共有人可以单独进行，如房屋维修、排除非法占有等。'
  },
  {
    question: 'A、B及びCが、持分を各３分の１とする甲土地を共有している場合に、A、B及びCは、５年を超えない期間内は甲土地を分割しない旨の契約を締結することができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '共有人可以约定5年以内不分割共有物，这种特约可以更新，但每次不得超过5年。'
  },
  {
    question: '共有者の一人が、自己の持分を第三者に譲渡するには、他の共有者の同意が必要である。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '共有人可以自由处分自己的持分，无需其他共有人同意，这是持分独立性的体现。'
  },
  {
    question: '共有物の形状または効用の著しい変更を伴わない変更行為については、持分価格の過半数で決めることができる。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '轻微变更不涉及共有物根本性质的改变，可以由持分价格过半数决定，无需全体同意。'
  },
  {
    question: '共有物の分割について協議が調わない場合、各共有者は、裁判所に分割を請求することができない。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '协议不成时，任何共有人都可以向法院请求分割，这是民法为解消共有关系提供的救济途径。'
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
  learningStore.recordTopicStudyTime('co-ownership', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('co-ownership')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('co-ownership')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('co-ownership', 0)
  
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
.co-ownership-page {
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

.case-study {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.case-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-details {
  display: grid;
  gap: 0.5rem;
}

.case-point {
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.case-point.correct {
  background: #e7f7e7;
  border-left: 3px solid #28a745;
}

.case-point.incorrect {
  background: #ffe7e7;
  border-left: 3px solid #dc3545;
}

/* ========= 持分样式 ========= */
.share-determination {
  margin-bottom: 2rem;
}

.determination-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.rule-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.rule-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.share-flowchart {
  margin: 2rem 0;
}

.flow-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.flow-step {
  flex: 1;
  min-width: 200px;
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

.flow-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.sub-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sub-step {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.practice-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.point-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.point-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.point-item ul {
  padding-left: 1.25rem;
  margin: 0;
}

.point-item li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* ========= 使用与义务样式 ========= */
.usage-rules {
  margin-bottom: 2rem;
}

.rule-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.rule-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.card-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.card-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.duty-explanation {
  margin-bottom: 2rem;
}

.duty-requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.requirement-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.requirement-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.practical-case {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.case-scenario h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.case-analysis {
  display: grid;
  gap: 0.5rem;
}

.analysis-point {
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.analysis-point.correct {
  background: #e7f7e7;
  border-left: 3px solid #28a745;
}

.analysis-point.incorrect {
  background: #ffe7e7;
  border-left: 3px solid #dc3545;
}

/* ========= 管理行为样式 ========= */
.action-types {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.actions-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.actions-table th, .actions-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.actions-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.actions-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.decision-single {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.decision-majority {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

.decision-unanimous {
  background-color: #ffe7e7 !important;
  color: #c62828;
  font-weight: bold;
}

.concept-clarification {
  margin: 2rem 0;
}

.clarification-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.clarification-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.comparison-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.comparison-item h5 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.example {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

.special-rules {
  margin: 2rem 0;
}

.rule-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
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

/* ========= 解消与分割样式 ========= */
.partition-rights {
  margin-bottom: 2rem;
}

.rights-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.right-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.right-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.right-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.right-note.warning {
  background: #fff9e6;
  border-left: 3px solid #ffcc00;
}

.partition-methods {
  margin: 2rem 0;
}

.method-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.method-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.method-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.method-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.method-suitability {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.partition-flow {
  margin: 2rem 0;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.flow-step {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.flow-step.first {
  background: #e7f7e7;
  border-color: #2a7960;
}

.flow-step.decision {
  background: #fff9e6;
  border-color: #ffcc00;
}

.flow-step.final {
  background: #eef7ff;
  border-color: #a8c6ff;
}

.step-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a472a;
}

.step-branches {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.branch {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.branch.yes {
  background: #e7f7e7;
  border-left: 3px solid #28a745;
}

.branch.no {
  background: #ffe7e7;
  border-left: 3px solid #dc3545;
}

.step-options {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.option {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.flow-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

/* ========= 特殊情况样式 ========= */
.missing-owner {
  margin-bottom: 2rem;
}

.situation-handling {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.handling-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.handling-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.unresponsive-owner {
  margin: 2rem 0;
}

.handling-procedure {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.procedure-step {
  flex: 1;
  min-width: 150px;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.procedure-step .step-number {
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

.procedure-arrow {
  font-size: 1.5rem;
  color: #2a7960;
  font-weight: bold;
}

.procedure-note {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff9e6;
  border-radius: 4px;
  text-align: center;
  font-size: 0.875rem;
}

.cost-rules {
  margin: 2rem 0;
}

.cost-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.cost-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.cost-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ========= 不动产规则样式 ========= */
.real-estate-handling {
  margin-bottom: 2rem;
}

.handling-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.option-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.option-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.inheritance-time-limit {
  margin: 2rem 0;
}

.time-limit-box {
  padding: 1.5rem;
  background: #fff9e6;
  border-radius: 8px;
  border-left: 4px solid #ffcc00;
  text-align: center;
}

.time-limit-box h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.time-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 4px;
  font-size: 0.875rem;
  font-style: italic;
}

.registration-points {
  margin: 2rem 0;
}

.registration-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.reg-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.reg-item h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.practice-reminder {
  margin: 2rem 0;
}

.reminder-content {
  padding: 1.5rem;
  background: #ffe7e7;
  border-radius: 8px;
  border-left: 4px solid #dc3545;
}

.reminder-content h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reminder-content ul {
  padding-left: 1.25rem;
  margin: 0;
}

.reminder-content li {
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
  
  .effect-timing {
    grid-template-columns: 1fr;
  }
  
  .determination-rules {
    grid-template-columns: 1fr;
  }
  
  .flow-steps {
    flex-direction: column;
  }
  
  .practice-points {
    grid-template-columns: 1fr;
  }
  
  .rule-cards {
    grid-template-columns: 1fr;
  }
  
  .duty-requirements {
    grid-template-columns: 1fr;
  }
  
  .rights-comparison {
    grid-template-columns: 1fr;
  }
  
  .method-cards {
    grid-template-columns: 1fr;
  }
  
  .handling-procedure {
    flex-direction: column;
  }
  
  .situation-handling {
    grid-template-columns: 1fr;
  }
  
  .cost-items {
    grid-template-columns: 1fr;
  }
  
  .handling-options {
    grid-template-columns: 1fr;
  }
  
  .registration-items {
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
  
  .comparison {
    grid-template-columns: 1fr;
  }
  
  .rule-items {
    grid-template-columns: 1fr;
  }
}
</style>