<!-- src/views/notes/rights/LandLease.vue -->
<template>
  <div class="land-lease-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain=rights">权利关系</router-link> &gt; 
          <span>借地借家法（借地）</span>
        </div>
        <h1>借地借家法（借地）</h1>
        <p>日本借地借家法中关于借地权的法律规定，涵盖普通借地权、定期借地权、借地权更新、对抗要件等重要内容</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">22</span>
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
            <li>理解借地权的基本概念和适用条件</li>
            <li>掌握普通借地权的存续期间和更新规则</li>
            <li>熟悉借地权的对抗要件和建物买取请求权</li>
            <li>了解定期借地权的种类和特征</li>
            <li>掌握借地权让渡、转贷和再筑的相关规定</li>
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
          <h2>1. 借地权基本概念</h2>
          
          <h3>什么是借地权？</h3>
          <div class="concept-explanation">
            <p>借地权是指以建筑物所有为目的的地上权或土地租赁权。例如，B从A手中借土地，在土地上建造房屋，A是借地权设定者（地主），B是借地权者（借地人）。</p>
            
            <div class="example-box">
              <h4>📝 重要提醒</h4>
              <p>借地权必须以<strong>建筑物所有为目的</strong>，临时使用（如临时工棚）或非建筑物目的（如停车场）不适用借地借家法。</p>
            </div>
          </div>

          <h3>适用条件</h3>
          <div class="effect-timing">
            <div class="timing-item">
              <div class="timing-icon">🏠</div>
              <div class="timing-content">
                <h4>建筑物所有目的</h4>
                <p>必须以建造和所有建筑物为目的</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">⏱️</div>
              <div class="timing-content">
                <h4>非临时使用</h4>
                <p>临时使用不适用借地借家法</p>
              </div>
            </div>
            <div class="timing-item">
              <div class="timing-icon">💰</div>
              <div class="timing-content">
                <h4>有偿契约</h4>
                <p>使用借贷（无偿）不适用</p>
              </div>
            </div>
          </div>

          <h3>案例说明</h3>
          <div class="example-box">
            <h4>📖 案例：高尔夫球场租赁</h4>
            <p>小林想开高尔夫球场，租用土地建设会所。这不属于"建筑物所有目的"，因此不适用借地借家法，而是适用一般租赁规则。</p>
          </div>
        </section>

        <!-- 普通借地权 -->
        <section id="ordinary-land-lease" class="content-section">
          <h2>2. 普通借地权</h2>
          
          <h3>存续期间</h3>
          <div class="heir-order">
            <p>普通借地权有严格的最短存续期间规定，旨在保护借地人的权益。</p>
            
            <div class="order-flow">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>最短期间：30年</h4>
                  <p>法律规定的最短存续期间</p>
                  <div class="step-note">保护借地人</div>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>约定少于30年</h4>
                  <p>自动变为30年</p>
                  <div class="step-note">强行规定</div>
                </div>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>约定超过30年</h4>
                  <p>按约定期间执行</p>
                  <div class="step-note">如60年按60年</div>
                </div>
              </div>
            </div>
          </div>

          <h3>契约更新方式</h3>
          <div class="inheritance-choices">
            <div class="choice-item">
              <div class="choice-icon">🤝</div>
              <div class="choice-content">
                <h4>合意更新</h4>
                <p><strong>双方协商一致更新契约</strong></p>
                <p>第一次更新：20年以上</p>
                <p>第二次以后更新：10年以上</p>
                <div class="choice-note">双方自愿</div>
              </div>
            </div>
            <div class="choice-item">
              <div class="choice-icon">📝</div>
              <div class="choice-content">
                <h4>请求更新</h4>
                <p><strong>借地人单方请求更新</strong></p>
                <p>条件：借地上有建筑物</p>
                <p>地主可提出正当异议拒绝</p>
                <div class="choice-note warning">需有建筑物</div>
              </div>
            </div>
            <div class="choice-item">
              <div class="choice-icon">⚖️</div>
              <div class="choice-content">
                <h4>法定更新</h4>
                <p><strong>自动更新</strong></p>
                <p>期间届满后继续使用土地</p>
                <p>地主未提出正当异议</p>
                <div class="choice-note">自动发生</div>
              </div>
            </div>
          </div>

          <h3>建物买取请求权</h3>
          <div class="important-notes">
            <div class="note-item">
              <h4>💰 行使条件</h4>
              <ul>
                <li><strong>适用情形：</strong>契约不更新时</li>
                <li><strong>行使主体：</strong>借地权人或转借地权者</li>
                <li><strong>限制：</strong>因债务不履行导致契约终止时不可行使</li>
                <li><strong>价格：</strong>按市价购买</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 对抗要件 -->
        <section id="opposability" class="content-section">
          <h2>3. 借地权的对抗力</h2>
          
          <h3>对抗要件（证明权利的方法）</h3>
          <div class="testament-forms">
            <div class="table-container">
              <table class="forms-table">
                <thead>
                  <tr>
                    <th>方法</th>
                    <th>借地权登记</th>
                    <th>建筑物登记</th>
                    <th>明认方法</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>实施方式</strong></td>
                    <td>土地租赁权登记</td>
                    <td>以借地权人名义登记建筑物</td>
                    <td>设立标示牌</td>
                  </tr>
                  <tr>
                    <td><strong>是否需要地主配合</strong></td>
                    <td class="required">需要</td>
                    <td class="not-required">不需要</td>
                    <td class="not-required">不需要</td>
                  </tr>
                  <tr>
                    <td><strong>效力</strong></td>
                    <td>最强</td>
                    <td>强</td>
                    <td>临时（2年）</td>
                  </tr>
                  <tr>
                    <td><strong>实务难度</strong></td>
                    <td>困难</td>
                    <td>容易</td>
                    <td>容易</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>对抗力丧失情形</h3>
          <div class="substitution-limits">
            <div class="limit-item">
              <h4>🚫 对抗力丧失</h4>
              <ul>
                <li>建筑物灭失且未设立明认方法</li>
                <li>明认方法设立后<strong>2年内未重建建筑物</strong></li>
                <li>建筑物以他人名义登记</li>
                <li>明认方法效力只有2年，2年后溯及既往消灭</li>
              </ul>
            </div>
          </div>

          <h3>实务要点</h3>
          <div class="example-box">
            <h4>💡 实务建议</h4>
            <p>建筑物灭失后，应立即在土地上设立标示牌，写明借地权者、灭失日期、再筑计划等信息，保全对抗力。2年内必须完成重建并登记。</p>
          </div>
        </section>

        <!-- 贷借与让渡 -->
        <section id="transfer-lease" class="content-section">
          <h2>4. 建筑物的贷借与让渡</h2>
          
          <h3>贷借（转租）与让渡（转让）的区别</h3>
          <div class="legal-share-rates">
            <div class="rate-item">
              <h4>贷借（转租）</h4>
              <p><strong>不需要地主承诺</strong></p>
              <p>与借地权无关</p>
            </div>
            <div class="rate-item">
              <h4>让渡（转让）</h4>
              <p><strong>需要地主承诺</strong></p>
              <p>建筑物让渡时，借地权同时转移</p>
            </div>
          </div>

          <h3>地主不承诺时的救济措施</h3>
          <div class="substitution-conditions">
            <div class="condition-item">
              <div class="condition-icon">🏛️</div>
              <div class="condition-content">
                <h4>法院介入</h4>
                <p>地主不承诺时，可向法院申请替代许可</p>
                <div class="condition-status can-substitute">可以申请</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">⏰</div>
              <div class="condition-content">
                <h4>申请期限</h4>
                <p>竞卖时：支付价款后2个月内申请</p>
                <div class="condition-status can-substitute">时间限制</div>
              </div>
            </div>
            <div class="condition-item">
              <div class="condition-icon">👤</div>
              <div class="condition-content">
                <h4>申请主体</h4>
                <p>买卖时：卖主（借地权者）申请</p>
                <p>竞卖时：买主（竞落人）申请</p>
                <div class="condition-status can-substitute">不同主体</div>
              </div>
            </div>
          </div>

          <h3>建物买取请求权的行使</h3>
          <div class="important-notes">
            <div class="note-item">
              <h4>📋 行使场景</h4>
              <ul>
                <li><strong>地主拒绝更新：</strong>借地人可行使买取请求权</li>
                <li><strong>地主不承诺让渡：</strong>建物让受人可行使买取请求权</li>
                <li><strong>竞卖公卖：</strong>第三方取得者可行使买取请求权</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- 建筑物灭失与再筑 -->
        <section id="rebuilding" class="content-section">
          <h2>5. 建筑物灭失与再筑</h2>
          
          <h3>再筑规则表</h3>
          <div class="share-table">
            <div class="table-container">
              <table class="shares-table">
                <thead>
                  <tr>
                    <th>灭失时期</th>
                    <th>地主承诺再筑</th>
                    <th>存续期间延长</th>
                    <th>备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>原契约期间中</strong></td>
                    <td class="share-spouse">有承诺</td>
                    <td class="share-relative">延长20年</td>
                    <td>从承诺日或筑造日较早者开始计算</td>
                  </tr>
                  <tr>
                    <td><strong>原契约期间中</strong></td>
                    <td>无承诺</td>
                    <td>不延长</td>
                    <td>仅剩残存期间，期满后可法定更新</td>
                  </tr>
                  <tr>
                    <td><strong>更新后</strong></td>
                    <td class="share-spouse">有承诺</td>
                    <td class="share-relative">延长20年</td>
                    <td>借地人可申请解约或放弃地上权</td>
                  </tr>
                  <tr>
                    <td><strong>更新后</strong></td>
                    <td>无承诺</td>
                    <td>不可再筑</td>
                    <td>无承诺不可再筑，擅自再筑可被解约</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>重要规则</h3>
          <div class="calculation-examples">
            <div class="example-item">
              <h4>视为承诺规则</h4>
              <div class="calculation-steps">
                <div class="step">通知再筑申请后</div>
                <div class="step">地主2个月内不提出异议</div>
                <div class="step">视为承诺</div>
              </div>
            </div>
            <div class="example-item">
              <h4>无承诺擅自再筑</h4>
              <div class="calculation-steps">
                <div class="step">地主可提出解约申请</div>
                <div class="step">解约申请3个月后</div>
                <div class="step">借地权消灭</div>
              </div>
            </div>
            <div class="example-item">
              <h4>法院介入</h4>
              <div class="calculation-steps">
                <div class="step">地主不承诺时</div>
                <div class="step">借地人可申请法院许可</div>
                <div class="step">法院许可后可再筑</div>
              </div>
            </div>
          </div>

          <h3>实务案例</h3>
          <div class="example-box">
            <h4>🔥 火灾后再筑案例</h4>
            <p>B从地主A借地30年，第25年时房屋被烧毁。B申请再筑，A不承诺。此时B只能在剩余5年内重建，期满后如果建筑物仍在，可走法定更新；如果没有建筑物，契约终止。</p>
          </div>
        </section>

        <!-- 定期借地权 -->
        <section id="fixed-term-lease" class="content-section">
          <h2>6. 定期借地权</h2>
          
          <h3>三种类型比较</h3>
          <div class="testament-forms">
            <div class="table-container">
              <table class="forms-table">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>一般定期借地权</th>
                    <th>事业用定期借地权</th>
                    <th>建物让渡特约付</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>存续期间</strong></td>
                    <td>50年以上</td>
                    <td>10年以上50年未满</td>
                    <td>30年以上</td>
                  </tr>
                  <tr>
                    <td><strong>使用目的</strong></td>
                    <td>无限制</td>
                    <td class="required">事业用（居住不可）</td>
                    <td>无限制</td>
                  </tr>
                  <tr>
                    <td><strong>更新</strong></td>
                    <td class="required">不可</td>
                    <td class="required">不可</td>
                    <td class="required">不可</td>
                  </tr>
                  <tr>
                    <td><strong>契约形式</strong></td>
                    <td>书面或电子记录</td>
                    <td class="required">公正证书</td>
                    <td>无特别要求</td>
                  </tr>
                  <tr>
                    <td><strong>建物买取请求权</strong></td>
                    <td class="required">排除</td>
                    <td class="required">排除</td>
                    <td>特约买取</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3>特征共通点</h3>
          <div class="important-notes">
            <div class="note-item">
              <h4>⚠️ 共同特征</h4>
              <ul>
                <li><strong>不可更新：</strong>期间届满即终止</li>
                <li><strong>不可行使建物买取请求权：</strong>排除买取请求权</li>
                <li><strong>期间届满后不可继续使用：</strong>必须返还土地</li>
                <li><strong>再筑不延长期间：</strong>建筑物灭失再筑不延长存续期间</li>
              </ul>
            </div>
          </div>

          <h3>特别注意</h3>
          <div class="example-box">
            <h4>🚫 事业用定期借地权的限制</h4>
            <p>事业用定期借地权<strong>绝对不能用于居住目的</strong>，即使是员工宿舍也不可以。住宅售货事业者建造售货公寓也不适用。</p>
          </div>

          <h3>建物让渡特约付借地权</h3>
          <div class="legal-share-concept">
            <p>借地权设定时，事先约定好自借地权设定后经过30年，借地上的建筑物由地主按照时价买取的契约。</p>
            <p>期间届满后，借地人原则上不能继续使用建筑物，但可请求转为没有规定期间的租赁借贷契约。</p>
          </div>
        </section>

        <!-- 法院介入情形 -->
        <section id="court-intervention" class="content-section">
          <h2>7. 法院介入情形总结</h2>
          
          <h3>可申请法院介入的情形</h3>
          <div class="order-flow">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>建筑物让渡</h4>
                <p>地主不承诺建筑物让渡时</p>
                <div class="step-note">借地权者申请</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>再筑许可</h4>
                <p>地主不承诺再筑时</p>
                <div class="step-note">借地权者申请</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>借地条件变更</h4>
                <p>借地条件变更协商不成时</p>
                <div class="step-note">双方申请</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>增改筑许可</h4>
                <p>增改筑禁止特约协商不成时</p>
                <div class="step-note">借地权者申请</div>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4>买取请求权</h4>
                <p>第三方取得建筑物时行使买取请求权协商不成</p>
                <div class="step-note">第三方申请</div>
              </div>
            </div>
          </div>

          <h3>申请期限限制</h3>
          <div class="time-limits">
            <div class="time-limit-item">
              <h4>⏰ 重要时间限制</h4>
              <p>在建物的竞卖、公卖中土地租赁权让渡时，地主没有承诺时，建物的第三方取得者必须在<strong>支付建物代金后的2个月之内</strong>申请法院介入。</p>
              <p class="time-note">超过期限将丧失申请权利！</p>
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
          <router-link to="/video?topic=land-lease" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic=land-lease" class="action-button">
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
  { id: 'ordinary-land-lease', title: '普通借地权', icon: '🏠' },
  { id: 'opposability', title: '对抗要件', icon: '🛡️' },
  { id: 'transfer-lease', title: '贷借与让渡', icon: '🔄' },
  { id: 'rebuilding', title: '灭失与再筑', icon: '🔥' },
  { id: 'fixed-term-lease', title: '定期借地权', icon: '⏱️' },
  { id: 'court-intervention', title: '法院介入', icon: '⚖️' },
  { id: 'quiz', title: '练习题', icon: '✍️' }
]

// 关键术语数据
const keyTerms = [
  {
    japanese: '借地権（しゃくちけん）',
    chinese: '借地权',
    explanation: '以建筑物所有为目的的地上权或土地租赁权',
    example: 'B从A处借地建造自家住宅，B拥有借地权'
  },
  {
    japanese: '普通借地権（ふつうしゃくちけん）',
    chinese: '普通借地权',
    explanation: '可以更新的借地权，受借地借家法保护',
    example: '存续期间30年，期满后可更新'
  },
  {
    japanese: '定期借地権（ていきしゃくちけん）',
    chinese: '定期借地权',
    explanation: '不可更新的借地权，期间届满即终止',
    example: '一般定期借地权存续期间50年以上'
  },
  {
    japanese: '建物買取請求権（たてものかいとりせいきゅうけん）',
    chinese: '建物买取请求权',
    explanation: '借地权消灭时，借地权人请求地主按市价购买建筑物的权利',
    example: '契约不更新时，借地人可要求地主买下建筑物'
  },
  {
    japanese: '対抗力（たいこうりょく）',
    chinese: '对抗力',
    explanation: '权利人对抗第三人的法律效力',
    example: '借地权登记后，可对抗新的土地所有权人'
  }
]

// 练习题数据
const quizzes = [
  {
    question: 'ゴルフ場経営を目的とする土地賃貸借契約については、対象となる全ての土地について地代等の増減額請求に関する借地借家法第11条の規定が適用される。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '高尔夫球场经营不属于"建筑物所有目的"，不适用借地借家法。'
  },
  {
    question: '借地権の存続期間は、契約で25年と定めようと、35年と定めようと、いずれの場合も30年となる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '约定25年时变为30年，但约定35年时按35年计算。'
  },
  {
    question: '建物の所有を目的とする土地の賃貸借契約において、建物が全焼した場合でも、借地権者は、その土地上に滅失建物を特定するために必要な事項等を掲示すれば、借地権を第三者に対抗することができる場合がある。',
    options: [
      { text: '〇 (正しい)', correct: true },
      { text: '✕ (誤り)', correct: false }
    ],
    explanation: '通过明认方法（设立标示牌），在建筑物灭失后2年内可以对抗第三人。'
  },
  {
    question: '事業の用に供する建物の所有を目的とする場合であれば、従業員の社宅として従業員の居住の用に供するときであっても、事業用定期借地権を設定することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '事业用定期借地权不能用于居住目的，即使是员工宿舍也不可以。'
  },
  {
    question: '借地権の存続期間中に建物が滅失した場合、借地権設定者の承諾がなくても、借地権者は直ちに建物を再築することができる。',
    options: [
      { text: '〇 (正しい)', correct: false },
      { text: '✕ (誤り)', correct: true }
    ],
    explanation: '再筑需要地主承诺，无承诺擅自再筑可能导致解约。'
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
  learningStore.recordTopicStudyTime('land-lease', studyTime)
}

// 标记知识点完成
const markTopicCompleted = () => {
  learningStore.completeTopic('land-lease')
}

// 初始化
onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('land-lease')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
  
  // 记录用户开始学习这个知识点
  learningStore.recordTopicStudyTime('land-lease', 0)
  
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
.land-lease-page {
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

/* ========= 普通借地权样式 ========= */
.heir-order {
  margin-bottom: 2rem;
}

.order-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.flow-step {
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
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.step-note {
  padding: 0.5rem;
  background: #e9f7f0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #2a7960;
  font-weight: bold;
}

.important-notes {
  margin: 1.5rem 0;
}

.note-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
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

/* ========= 继承承认与放弃样式 ========= */
.inheritance-choices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.choice-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.choice-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.choice-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.choice-content p {
  margin: 0.25rem 0;
}

.choice-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

.choice-note.warning {
  background: #fff9e6;
  border-left: 3px solid #ffcc00;
}

/* ========= 对抗要件样式 ========= */
.testament-forms {
  margin: 2rem 0;
}

.forms-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.forms-table th, .forms-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.forms-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.forms-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.required {
  background-color: #fff9e6 !important;
  color: #e65100;
  font-weight: bold;
}

.not-required {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

/* ========= 贷借与让渡样式 ========= */
.legal-share-rates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.rate-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
}

.rate-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.rate-item p {
  margin: 0;
  font-weight: bold;
}

.substitution-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.condition-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.condition-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.condition-content h4 {
  margin: 0 0 0.5rem 0;
  color: #1a472a;
}

.condition-content p {
  margin: 0;
  color: #6c757d;
}

.condition-status {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
}

.condition-status.can-substitute {
  background: #e7f7e7;
  color: #2e7d32;
}

.condition-status.cannot-substitute {
  background: #ffe7e7;
  color: #c62828;
}

.substitution-limits {
  margin: 2rem 0;
}

.limit-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 1rem;
}

.limit-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

/* ========= 灭失与再筑样式 ========= */
.share-table {
  margin: 1.5rem 0;
}

.table-container {
  overflow-x: auto;
}

.shares-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.shares-table th, .shares-table td {
  border: 1px solid #e9ecef;
  padding: 12px;
  text-align: center;
}

.shares-table th {
  background-color: #2a7960;
  color: white;
  font-weight: 600;
}

.shares-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.share-spouse {
  background-color: #e7f7e7 !important;
  color: #2e7d32;
  font-weight: bold;
}

.share-relative {
  background-color: #eef7ff !important;
  color: #1565c0;
  font-weight: bold;
}

.calculation-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.example-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.example-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
}

.calculation-steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step {
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.875rem;
}

/* ========= 定期借地权样式 ========= */
.legal-share-concept {
  margin-bottom: 2rem;
}

/* ========= 时间限制样式 ========= */
.time-limits {
  margin: 2rem 0;
}

.time-limit-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.time-limit-item h4 {
  margin: 0 0 1rem 0;
  color: #1a472a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-note {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
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
  
  .order-flow {
    grid-template-columns: 1fr;
  }
  
  .inheritance-choices {
    grid-template-columns: 1fr;
  }
  
  .calculation-examples {
    grid-template-columns: 1fr;
  }
  
  .substitution-conditions {
    grid-template-columns: 1fr;
  }
  
  .legal-share-rates {
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