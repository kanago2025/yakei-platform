<template>
  <div class="practice">
    <div class="container">
      <!-- 顶部导航栏 - 集成用户状态 -->
      <header class="top-nav">
        <router-link to="/" class="logo">
          <span class="mark">宅</span>
          <span class="name">宅学苑</span>
        </router-link>
        
        <nav class="nav-links" :class="{ 'mobile-show': mobileMenuOpen }">
          <router-link to="/">首页</router-link>
          <router-link to="/notes">中文笔记</router-link>
          <router-link to="/video">视频学习</router-link>
          <router-link to="/practice" class="active">强化练习</router-link>
          <router-link to="/exam">真题模拟</router-link>
          <router-link to="/community">学习社群</router-link>
          <router-link to="/dashboard">学习进度</router-link>
          
          <!-- 用户状态显示 -->
          <div class="user-status" v-if="userStore.isLoggedIn">
            <span class="user-avatar">👤</span>
            <span class="user-info">
              <span class="user-name">{{ userStore.userName }}</span>
              <span class="user-tier">{{ userStore.subscriptionTier === 'premium' ? 'VIP会员' : '免费会员' }}</span>
            </span>
          </div>
          <router-link v-else to="/login" class="login-link">
            <span class="user-avatar">👤</span>
            <span>访客登录</span>
          </router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </header>

      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>强化练习</h1>
          <p>针对性练习系统，根据您的学习进度和薄弱环节智能推荐练习题，巩固知识点，提升应试能力</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
    <span>VIP会员可享受无限制练习和详细分析报告</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ totalPracticeQuestions }}</span>
              <span class="stat-label">练习题目</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ overallAccuracy }}%</span>
              <span class="stat-label">平均正确率</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalStudyTime }}h</span>
              <span class="stat-label">学习时长</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-section">
          <h3>按分野练习</h3>
          <div class="domain-buttons">
            <button 
              v-for="domain in domains" 
              :key="domain.id"
              class="domain-btn" 
              :class="{ 
                active: activeDomain === domain.id,
                'premium-only': domain.requiresPremium && !userStore.isPremium
              }"
              @click="switchDomain(domain.id)"
              :disabled="domain.requiresPremium && !userStore.isPremium"
            >
              <span class="domain-icon">{{ domain.icon }}</span>
              <span class="domain-name">{{ domain.name }}</span>
              <span class="domain-count">{{ domain.questionCount }}题</span>
              <span v-if="domain.requiresPremium && !userStore.isPremium" class="premium-tag">VIP</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>练习工具</h3>
          <div class="tool-buttons">
            <button class="tool-btn" @click="startRandomPractice" :disabled="!userStore.isLoggedIn">
              <span class="tool-icon">🎲</span>
              <span>随机练习</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <button class="tool-btn" @click="startWeaknessPractice" :disabled="!userStore.isLoggedIn">
              <span class="tool-icon">🎯</span>
              <span>弱点练习</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <router-link to="/exam" class="tool-btn">
              <span class="tool-icon">📝</span>
              <span>真题模拟</span>
            </router-link>
            <router-link to="/dashboard" class="tool-btn">
              <span class="tool-icon">📊</span>
              <span>学习进度</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 练习模式选择 -->
        <div class="practice-modes">
          <div class="mode-card" @click="startQuickPractice" :class="{ 'disabled': !userStore.isLoggedIn }">
            <div class="mode-icon">⚡</div>
            <h3>快速练习</h3>
            <p>10道随机题目，快速检验知识掌握情况</p>
            <div class="mode-stats">
              <span>平均用时: 15分钟</span>
              <span>正确率: 72%</span>
            </div>
            <div v-if="!userStore.isLoggedIn" class="mode-overlay">
              <span>请先登录</span>
            </div>
          </div>

          <div class="mode-card" @click="startDomainPractice" :class="{ 'disabled': !userStore.isLoggedIn }">
            <div class="mode-icon">📚</div>
            <h3>分野专项</h3>
            <p>针对特定分野进行深度练习</p>
            <div class="mode-stats">
              <span>平均用时: 30分钟</span>
              <span>正确率: 68%</span>
            </div>
            <div v-if="!userStore.isLoggedIn" class="mode-overlay">
              <span>请先登录</span>
            </div>
          </div>

          <div class="mode-card" @click="startTimedPractice" :class="{ 'disabled': !userStore.isLoggedIn }">
            <div class="mode-icon">⏱️</div>
            <h3>限时挑战</h3>
            <p>模拟真实考试时间压力</p>
            <div class="mode-stats">
              <span>平均用时: 45分钟</span>
              <span>正确率: 65%</span>
            </div>
            <div v-if="!userStore.isLoggedIn" class="mode-overlay">
              <span>请先登录</span>
            </div>
          </div>
        </div>

        <!-- VIP专属练习模式 -->
        <div v-if="userStore.isPremium" class="premium-modes">
          <h2 class="section-title">VIP专属练习</h2>
          <div class="practice-modes">
            <div class="mode-card premium" @click="startAIPractice">
              <div class="mode-icon">🤖</div>
              <h3>AI智能练习</h3>
              <p>基于AI分析的个性化练习计划</p>
              <div class="mode-stats">
                <span>自适应难度</span>
                <span>精准推荐</span>
              </div>
              <div class="premium-badge">VIP专属</div>
            </div>

            <div class="mode-card premium" @click="startExamSimulation">
              <div class="mode-icon">🎯</div>
              <h3>模拟考试</h3>
              <p>全真模拟考试环境练习</p>
              <div class="mode-stats">
                <span>真实场景</span>
                <span>详细分析</span>
              </div>
              <div class="premium-badge">VIP专属</div>
            </div>

            <div class="mode-card premium" @click="startWeaknessAnalysis">
              <div class="mode-icon">📊</div>
              <h3>弱点分析</h3>
              <p>深度分析薄弱环节并提供专项练习</p>
              <div class="mode-stats">
                <span>精准定位</span>
                <span>专项突破</span>
              </div>
              <div class="premium-badge">VIP专属</div>
            </div>
          </div>
        </div>

        <!-- 当前领域练习 -->
        <div class="domain-practice" v-if="activeDomain && userStore.isLoggedIn">
          <div class="domain-header">
            <h2>{{ getDomainName(activeDomain) }} - 练习题目</h2>
            <div class="domain-progress">
              <div class="progress-info">
                <span>掌握度</span>
                <span>{{ getDomainAccuracy(activeDomain) }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainAccuracy(activeDomain) + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="questions-grid">
            <div 
              v-for="question in getDomainQuestions(activeDomain)" 
              :key="question.id"
              class="question-card"
              :class="{ 
                'answered': question.userAnswer,
                'correct': question.userAnswer && question.userAnswer === question.correctAnswer,
                'incorrect': question.userAnswer && question.userAnswer !== question.correctAnswer,
                'premium-only': question.requiresPremium && !userStore.isPremium
              }"
            >
              <!-- VIP专属题目标识 -->
              <div v-if="question.requiresPremium && !userStore.isPremium" class="premium-overlay">
                <div class="premium-lock">
                  <span class="lock-icon">🔒</span>
                  <span>VIP专属题目</span>
                </div>
              </div>
              
              <div class="question-header">
                <span class="question-number">问题 {{ question.number }}</span>
                <span class="difficulty" :class="question.difficulty">
                  {{ getDifficultyText(question.difficulty) }}
                </span>
                <button 
                  class="bookmark-btn"
                  :class="{ bookmarked: question.bookmarked }"
                  @click="toggleBookmark(question.id)"
                >
                  <span>{{ question.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>

              <div class="question-content">
                <p class="question-text">{{ question.text }}</p>
                
                <div class="options">
                  <label 
                    v-for="option in question.options" 
                    :key="option.id"
                    class="option"
                    :class="{ 
                      'selected': question.userAnswer === option.id,
                      'correct-option': showAnswers && option.id === question.correctAnswer,
                      'incorrect-option': showAnswers && question.userAnswer === option.id && option.id !== question.correctAnswer
                    }"
                  >
                    <input
                      type="radio"
                      :name="'question-' + question.id"
                      :value="option.id"
                      v-model="question.userAnswer"
                      @change="checkAnswer(question)"
                      :disabled="showAnswers || (question.requiresPremium && !userStore.isPremium)"
                    />
                    <span class="option-text">{{ option.text }}</span>
                  </label>
                </div>

                <div v-if="showAnswers && question.userAnswer" class="answer-explanation">
                  <div class="explanation-header">
                    <span class="result" :class="question.userAnswer === question.correctAnswer ? 'correct' : 'incorrect'">
                      {{ question.userAnswer === question.correctAnswer ? '✓ 正确' : '✗ 错误' }}
                    </span>
                    <span class="correct-answer">正确答案: {{ getCorrectAnswerText(question) }}</span>
                  </div>
                  <p class="explanation-text">{{ question.explanation }}</p>
                  <div class="explanation-actions">
                    <button class="action-btn" @click="addToWrongQuestions(question)">
                      📝 加入错题本
                    </button>
                    <button class="action-btn" @click="showSimilarQuestions(question)">
                      🔍 相似题目
                    </button>
                  </div>
                </div>
              </div>

              <div class="question-footer">
                <span class="knowledge-point">{{ question.knowledgePoint }}</span>
                <span class="practice-count">练习 {{ question.practiceCount }} 次</span>
                <span v-if="question.requiresPremium" class="premium-tag">VIP</span>
              </div>
            </div>
          </div>

          <div class="practice-actions">
            <button class="btn btn-secondary" @click="resetPractice">
              🔄 重新开始
            </button>
            <button class="btn btn-primary" @click="showAnswers = !showAnswers">
              {{ showAnswers ? '👁️ 隐藏答案' : '👁️ 显示答案' }}
            </button>
            <button class="btn btn-primary" @click="submitPractice">
              📤 提交练习
            </button>
          </div>
        </div>

        <!-- 练习统计 -->
        <div class="practice-stats" v-if="userStore.isLoggedIn">
          <div class="stats-card">
            <h3>练习统计</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ completedQuestions }}/{{ totalQuestions }}</div>
                <div class="stat-label">完成题目</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ correctAnswers }}</div>
                <div class="stat-label">正确回答</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ currentAccuracy }}%</div>
                <div class="stat-label">当前正确率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ practiceTime }}分钟</div>
                <div class="stat-label">练习时间</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 未登录提示 -->
        <section v-if="!userStore.isLoggedIn" class="login-prompt">
          <div class="prompt-content">
            <h3>登录以保存练习记录</h3>
            <p>登录后可以保存您的练习进度、查看详细分析报告，并获得个性化学习建议</p>
            <router-link to="/login" class="btn btn-primary">立即登录</router-link>
          </div>
        </section>

        <!-- 免费用户升级提示 -->
        <section v-if="userStore.isLoggedIn && !userStore.isPremium" class="upgrade-prompt">
          <div class="prompt-content">
            <h3>升级VIP会员，解锁更多练习功能</h3>
            <p>VIP会员可享受无限制练习、AI智能推荐、弱点分析等高级功能</p>
            <button class="btn btn-premium" @click="upgradeToPremium">
              ⭐ 升级VIP会员
            </button>
          </div>
        </section>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>系统化练习，全面提升应试能力</h2>
          <p>通过针对性练习和即时反馈，快速发现知识盲点，强化薄弱环节，稳步提升考试成绩</p>
          <div class="cta-buttons">
            <button class="btn btn-primary" @click="startNewPractice" :disabled="!userStore.isLoggedIn">
              {{ userStore.isLoggedIn ? '开始新的练习' : '请先登录' }}
            </button>
            <router-link to="/exam" class="btn btn-secondary">尝试真题模拟</router-link>
          </div>
        </div>
      </section>

      <!-- 页脚 -->
      <footer class="footer">
        <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'Practice',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      mobileMenuOpen: false,
      activeDomain: 'rights',
      showAnswers: false,
      practiceTime: 0,
      practiceTimer: null,
      domains: [
        { 
          id: 'rights', 
          name: '权利关系', 
          icon: '⚖️', 
          questionCount: 28,
          accuracy: 78,
          requiresPremium: false
        },
        { 
          id: 'business', 
          name: '宅建业法', 
          icon: '🏢', 
          questionCount: 32,
          accuracy: 82,
          requiresPremium: false
        },
        { 
          id: 'regulations', 
          name: '法令制限', 
          icon: '📏', 
          questionCount: 35,
          accuracy: 65,
          requiresPremium: false
        },
        { 
          id: 'tax', 
          name: '税・価格', 
          icon: '💰', 
          questionCount: 18,
          accuracy: 71,
          requiresPremium: false
        },
        { 
          id: 'exempt', 
          name: '五问免除', 
          icon: '✅', 
          questionCount: 12,
          accuracy: 88,
          requiresPremium: false
        },
        { 
          id: 'advanced', 
          name: '高级专题', 
          icon: '🚀', 
          questionCount: 25,
          accuracy: 0,
          requiresPremium: true
        }
      ],
      questions: {
        rights: [
          {
            id: 1,
            number: 1,
            text: '重要事項説明書には、代表者の記名があれば宅地建物取引士の記名は必要がない。',
            options: [
              { id: 'A', text: '○ (正しい)' },
              { id: 'B', text: '× (誤り)' }
            ],
            correctAnswer: 'B',
            explanation: '重要事项说明书（35条书面文件）上必须有宅建士的签名，仅有"代表人签名"是不够的。',
            difficulty: 'medium',
            knowledgePoint: '重要事项说明',
            practiceCount: 15,
            userAnswer: null,
            bookmarked: false,
            requiresPremium: false
          },
          {
            id: 2,
            number: 2,
            text: '媒介契約において、宅地建物取引業者は、依頼者に対して取引の進捗状況を報告する義務がある。',
            options: [
              { id: 'A', text: '○ (正しい)' },
              { id: 'B', text: '× (誤り)' }
            ],
            correctAnswer: 'A',
            explanation: '根据宅建业法，宅建业者有义务向委托人报告交易进展情况。',
            difficulty: 'easy',
            knowledgePoint: '媒介契约',
            practiceCount: 12,
            userAnswer: null,
            bookmarked: true,
            requiresPremium: false
          }
        ],
        business: [
          {
            id: 3,
            number: 1,
            text: '宅地建物取引業者は、業務に関して受領した金銭を、自己の金銭と区別して保管しなければならない。',
            options: [
              { id: 'A', text: '○ (正しい)' },
              { id: 'B', text: '× (誤り)' }
            ],
            correctAnswer: 'A',
            explanation: '宅建业者必须将业务相关款项与自有资金分开保管，这是重要的资金管理义务。',
            difficulty: 'medium',
            knowledgePoint: '营业保证金',
            practiceCount: 8,
            userAnswer: null,
            bookmarked: false,
            requiresPremium: false
          }
        ],
        advanced: [
          {
            id: 4,
            number: 1,
            text: '宅地建物取引業者が自ら売主となる場合、瑕疵担保責任に関する特約を設けることができるが、その内容には一定の制限がある。',
            options: [
              { id: 'A', text: '買主に不利な特約は一切認められない' },
              { id: 'B', text: '買主に不利な特約も一定の範囲で認められる' },
              { id: 'C', text: '特約の内容に制限はない' },
              { id: 'D', text: '特約を設けることはできない' }
            ],
            correctAnswer: 'B',
            explanation: '宅建业者作为卖方时，可以设定瑕疵担保责任的特约，但内容有一定限制，不能完全免除责任。',
            difficulty: 'hard',
            knowledgePoint: '瑕疵担保责任',
            practiceCount: 5,
            userAnswer: null,
            bookmarked: false,
            requiresPremium: true
          }
        ]
      },
      practiceHistory: []
    }
  },
  computed: {
    totalPracticeQuestions() {
      return Object.values(this.questions).reduce((total, domainQuestions) => {
        return total + domainQuestions.length;
      }, 0);
    },
    overallAccuracy() {
      const totalAccuracy = this.domains.reduce((sum, domain) => sum + domain.accuracy, 0);
      return Math.round(totalAccuracy / this.domains.length);
    },
    totalStudyTime() {
      return Math.round(this.totalPracticeQuestions * 0.5);
    },
    completedQuestions() {
      return Object.values(this.questions).reduce((total, domainQuestions) => {
        return total + domainQuestions.filter(q => q.userAnswer).length;
      }, 0);
    },
    totalQuestions() {
      return Object.values(this.questions).reduce((total, domainQuestions) => {
        return total + domainQuestions.length;
      }, 0);
    },
    correctAnswers() {
      return Object.values(this.questions).reduce((total, domainQuestions) => {
        return total + domainQuestions.filter(q => q.userAnswer === q.correctAnswer).length;
      }, 0);
    },
    currentAccuracy() {
      if (this.completedQuestions === 0) return 0;
      return Math.round((this.correctAnswers / this.completedQuestions) * 100);
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false;
      }
    },
    switchDomain(domainId) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      const domain = this.domains.find(d => d.id === domainId)
      if (domain.requiresPremium && !this.userStore.isPremium) {
        alert('此分野需要VIP会员权限，请升级VIP会员')
        return
      }
      
      this.activeDomain = domainId;
      this.resetPractice();
    },
    getDomainName(domainId) {
      const domain = this.domains.find(d => d.id === domainId);
      return domain ? domain.name : '';
    },
    getDomainAccuracy(domainId) {
      const domain = this.domains.find(d => d.id === domainId);
      return domain ? domain.accuracy : 0;
    },
    getDomainQuestions(domainId) {
      return this.questions[domainId] || [];
    },
    getDifficultyText(difficulty) {
      const difficultyMap = {
        'easy': '简单',
        'medium': '中等',
        'hard': '困难'
      };
      return difficultyMap[difficulty] || difficulty;
    },
    checkAnswer(question) {
      if (!this.userStore.isLoggedIn) return
      
      // 更新练习次数
      question.practiceCount++
      
      // 保存到本地存储
      this.savePracticeProgress()
      
      console.log('检查答案:', question.userAnswer, '正确答案:', question.correctAnswer);
    },
    toggleBookmark(questionId) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以使用收藏功能')
        return
      }
      
      Object.values(this.questions).forEach(domainQuestions => {
        const question = domainQuestions.find(q => q.id === questionId);
        if (question) {
          question.bookmarked = !question.bookmarked;
        }
      });
      
      // 保存到本地存储
      this.saveBookmarksToLocalStorage()
    },
    getCorrectAnswerText(question) {
      const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
      return correctOption ? correctOption.text : '';
    },
    addToWrongQuestions(question) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以使用错题本功能')
        return
      }
      
      // 添加到错题本的逻辑
      console.log('添加到错题本:', question);
      alert(`已添加到错题本: ${question.knowledgePoint}`);
      
      // 保存到本地存储
      this.saveWrongQuestionsToLocalStorage(question)
    },
    showSimilarQuestions(question) {
      // 显示相似题目的逻辑
      console.log('显示相似题目:', question);
    },
    resetPractice() {
      Object.values(this.questions).forEach(domainQuestions => {
        domainQuestions.forEach(question => {
          question.userAnswer = null;
        });
      });
      this.showAnswers = false;
      this.practiceTime = 0;
    },
    submitPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以提交练习')
        this.$router.push('/login')
        return
      }
      
      if (this.completedQuestions === 0) {
        alert('请至少完成一道题目后再提交');
        return;
      }
      
      const score = this.currentAccuracy;
      let message = '';
      
      if (score >= 80) {
        message = `优秀！您的正确率为 ${score}%，继续保持！`;
      } else if (score >= 60) {
        message = `良好！您的正确率为 ${score}%，还有提升空间！`;
      } else {
        message = `需要加强！您的正确率为 ${score}%，建议重点复习相关知识点。`;
      }
      
      // 保存练习记录
      this.savePracticeRecord(score)
      
      alert(`练习提交成功！\n${message}`);
    },
    startQuickPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      this.resetPractice();
      alert('开始快速练习模式');
    },
    startDomainPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      this.resetPractice();
      alert('开始分野专项练习模式');
    },
    startTimedPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      this.resetPractice();
      this.startTimer();
      alert('开始限时挑战模式 - 计时开始！');
    },
    startRandomPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      this.resetPractice();
      alert('开始随机练习模式');
    },
    startWeaknessPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      this.resetPractice();
      alert('开始弱点练习模式');
    },
    startNewPractice() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以开始练习')
        this.$router.push('/login')
        return
      }
      
      this.resetPractice();
      alert('开始新的练习会话');
    },
    startAIPractice() {
      if (!this.userStore.isPremium) {
        alert('此功能需要VIP会员权限')
        return
      }
      
      this.resetPractice();
      alert('开始AI智能练习模式');
    },
    startExamSimulation() {
      if (!this.userStore.isPremium) {
        alert('此功能需要VIP会员权限')
        return
      }
      
      this.resetPractice();
      alert('开始模拟考试练习模式');
    },
    startWeaknessAnalysis() {
      if (!this.userStore.isPremium) {
        alert('此功能需要VIP会员权限')
        return
      }
      
      this.resetPractice();
      alert('开始弱点分析模式');
    },
    upgradeToPremium() {
      alert('升级VIP会员，享受更多专属功能')
      // 这里应该跳转到VIP升级页面
    },
    startTimer() {
      if (this.practiceTimer) {
        clearInterval(this.practiceTimer);
      }
      this.practiceTimer = setInterval(() => {
        this.practiceTime++;
      }, 60000); // 每分钟更新一次
    },
    savePracticeProgress() {
      const progress = {
        domains: this.domains,
        questions: this.questions,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem('practiceProgress', JSON.stringify(progress))
    },
    loadPracticeProgress() {
      const savedProgress = localStorage.getItem('practiceProgress')
      if (savedProgress) {
        const progress = JSON.parse(savedProgress)
        this.domains = progress.domains || this.domains
        this.questions = progress.questions || this.questions
      }
    },
    saveBookmarksToLocalStorage() {
      const bookmarks = []
      Object.values(this.questions).forEach(domainQuestions => {
        domainQuestions.forEach(question => {
          if (question.bookmarked) {
            bookmarks.push(question.id)
          }
        })
      })
      localStorage.setItem('practiceBookmarks', JSON.stringify(bookmarks))
    },
    loadBookmarksFromLocalStorage() {
      const savedBookmarks = localStorage.getItem('practiceBookmarks')
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks)
        Object.values(this.questions).forEach(domainQuestions => {
          domainQuestions.forEach(question => {
            question.bookmarked = bookmarks.includes(question.id)
          })
        })
      }
    },
    saveWrongQuestionsToLocalStorage(question) {
      const wrongQuestions = JSON.parse(localStorage.getItem('wrongQuestions') || '[]')
      if (!wrongQuestions.find(q => q.id === question.id)) {
        wrongQuestions.push({
          id: question.id,
          text: question.text,
          knowledgePoint: question.knowledgePoint,
          addedAt: new Date().toISOString()
        })
        localStorage.setItem('wrongQuestions', JSON.stringify(wrongQuestions))
      }
    },
    savePracticeRecord(score) {
      const records = JSON.parse(localStorage.getItem('practiceRecords') || '[]')
      records.push({
        domain: this.activeDomain,
        score: score,
        completedQuestions: this.completedQuestions,
        totalQuestions: this.getDomainQuestions(this.activeDomain).length,
        timeSpent: this.practiceTime,
        date: new Date().toISOString()
      })
      localStorage.setItem('practiceRecords', JSON.stringify(records))
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    
    // 从本地存储加载用户数据
    this.loadPracticeProgress()
    this.loadBookmarksFromLocalStorage()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.practiceTimer) {
      clearInterval(this.practiceTimer);
    }
  }
}
</script>

<style>
/* CSS 变量定义 - 与notes.vue保持一致 */
:root {
  --primary: #2a7960;
  --primary-dark: #205e4a;
  --primary-light: #e8f5f0;
  --bg: #f6f9fc;
  --card-bg: #ffffff;
  --text: #0b2130;
  --muted: #64748b;
  --border: #e2e8f0;
  --radius: 12px;
  --gap: 20px;
  --max-width: 1200px;
  --container-padding: 20px;
  
  /* 新增练习相关变量 */
  --correct: #10b981;
  --incorrect: #ef4444;
  --warning: #f59e0b;
  --easy: #10b981;
  --medium: #f59e0b;
  --hard: #ef4444;
  --premium: #f59e0b;
}
</style>

<style scoped>
.practice {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", "Noto Sans JP", "Noto Sans", Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ========= 布局容器 ========= */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ========= 顶部导航栏 ========= */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--primary-dark);
  text-decoration: none;
  font-size: 18px;
}

.logo .mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-links a:hover, .nav-links a.active {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.nav-links a.active {
  font-weight: 700;
}

/* 用户状态样式 */
.user-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--primary-light);
  color: var(--primary-dark);
}

.user-avatar {
  font-size: 18px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-tier {
  font-size: 12px;
  opacity: 0.8;
}

.login-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--muted);
  padding: 8px;
  border-radius: 8px;
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 20px;
  padding: 40px;
  margin: 30px 0;
  text-align: center;
  position: relative;
}

.header-content h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.header-content p {
  font-size: 18px;
  color: var(--muted);
  max-width: 700px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.premium-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.badge-icon {
  font-size: 16px;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
}

/* ========= 快速导航 ========= */
.quick-nav {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin: 40px 0;
}

.nav-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.domain-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.domain-btn {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.domain-btn:hover:not(:disabled) {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.domain-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
}

.domain-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.domain-btn.premium-only {
  border-style: dashed;
}

.premium-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--premium);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
}

.domain-icon {
  font-size: 24px;
}

.domain-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.domain-count {
  font-size: 12px;
  color: var(--muted);
}

.tool-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tool-btn {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  border: none;
  font-family: inherit;
  position: relative;
}

.tool-btn:hover:not(:disabled) {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.tool-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tool-hint {
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--primary);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
}

.tool-icon {
  font-size: 20px;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 40px 0;
  flex: 1;
}

/* ========= 练习模式选择 ========= */
.practice-modes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.mode-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  cursor: pointer;
  text-align: center;
  position: relative;
}

.mode-card:hover:not(.disabled) {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(12, 35, 50, 0.12);
  border-color: var(--primary);
}

.mode-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mode-card.premium {
  border: 2px solid var(--premium);
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.mode-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--muted);
}

.premium-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--premium);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.mode-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.mode-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
}

.mode-card p {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.mode-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
}

/* ========= VIP专属练习模式 ========= */
.premium-modes {
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 24px;
  text-align: center;
}

/* ========= 领域练习区域 ========= */
.domain-practice {
  margin-bottom: 40px;
}

.domain-header {
  margin-bottom: 30px;
}

.domain-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 8px;
}

.domain-progress {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 16px;
  max-width: 300px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--muted);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* ========= 问题网格 ========= */
.questions-grid {
  display: grid;
  gap: 24px;
  margin-bottom: 30px;
}

.question-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
}

.question-card:hover {
  box-shadow: 0 8px 24px rgba(12, 35, 50, 0.12);
}

.question-card.correct {
  border-left: 4px solid var(--correct);
}

.question-card.incorrect {
  border-left: 4px solid var(--incorrect);
}

.question-card.premium-only {
  opacity: 0.7;
}

.premium-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.premium-lock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--premium);
  font-weight: 600;
}

.lock-icon {
  font-size: 24px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.question-number {
  font-weight: 600;
  color: var(--primary-dark);
}

.difficulty {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.difficulty.easy {
  background: color-mix(in srgb, var(--easy) 20%, transparent);
  color: var(--easy);
}

.difficulty.medium {
  background: color-mix(in srgb, var(--medium) 20%, transparent);
  color: var(--medium);
}

.difficulty.hard {
  background: color-mix(in srgb, var(--hard) 20%, transparent);
  color: var(--hard);
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s ease;
}

.bookmark-btn:hover, .bookmark-btn.bookmarked {
  color: var(--warning);
}

.question-content {
  margin-bottom: 16px;
}

.question-text {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: var(--text);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option.correct-option {
  border-color: var(--correct);
  background: color-mix(in srgb, var(--correct) 10%, transparent);
}

.option.incorrect-option {
  border-color: var(--incorrect);
  background: color-mix(in srgb, var(--incorrect) 10%, transparent);
}

.option input[type="radio"] {
  margin-top: 2px;
}

.option-text {
  flex: 1;
  line-height: 1.4;
}

.answer-explanation {
  margin-top: 20px;
  padding: 16px;
  background: var(--primary-light);
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.explanation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.result.correct {
  color: var(--correct);
  font-weight: 600;
}

.result.incorrect {
  color: var(--incorrect);
  font-weight: 600;
}

.correct-answer {
  color: var(--muted);
  font-size: 14px;
}

.explanation-text {
  line-height: 1.6;
  margin-bottom: 16px;
}

.explanation-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card-bg);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  color: var(--muted);
  gap: 8px;
}

.knowledge-point {
  background: var(--primary-light);
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.practice-count {
  font-size: 12px;
}

/* ========= 练习操作按钮 ========= */
.practice-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.25);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(42, 121, 96, 0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-dark);
  border: 1px solid var(--primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-premium {
  background: var(--premium);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
}

.btn-premium:hover {
  background: #d97706;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.35);
}

/* ========= 练习统计 ========= */
.practice-stats {
  margin-bottom: 40px;
}

.stats-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
}

.stats-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 20px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: var(--primary-light);
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
}

/* ========= 登录提示 ========= */
.login-prompt, .upgrade-prompt {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 40px;
  text-align: center;
  margin: 40px 0;
  border: 1px solid var(--border);
}

.upgrade-prompt {
  border: 2px solid var(--premium);
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.prompt-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
}

.prompt-content p {
  color: var(--muted);
  margin-bottom: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* ========= 底部行动号召 ========= */
.cta-section {
  text-align: center;
  padding: 40px 0;
  margin: 60px 0 40px;
}

.cta-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.cta-section p {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ========= 页脚 ========= */
.footer {
  text-align: center;
  padding: 40px 0;
  margin-top: 60px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 14px;
  width: 100%;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .practice-modes {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    margin: 0 20px;
    z-index: 100;
  }
  
  .nav-links.mobile-show {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .page-header {
    padding: 30px 20px;
  }
  
  .header-content h1 {
    font-size: 28px;
  }
  
  .header-content p {
    font-size: 16px;
  }
  
  .header-stats {
    gap: 20px;
  }
  
  .practice-modes {
    grid-template-columns: 1fr;
  }
  
  .domain-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .practice-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .explanation-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .question-footer {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 20px 16px;
  }
  
  .header-content h1 {
    font-size: 24px;
  }
  
  .header-content p {
    font-size: 16px;
  }
  
  .header-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .explanation-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    text-align: center;
  }
}
</style>