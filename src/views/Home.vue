<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <div class="welcome-message">
            <h1 v-if="userStore.isLoggedIn">🎉 欢迎回来，{{ userStore.userName }}！</h1>
            <h1 v-else>🎉 欢迎来到宅学苑！</h1>
            <p class="user-status" v-if="userStore.isLoggedIn">
              <span class="status-badge" :class="userStore.userType">
                {{ userStore.userType === 'premium' ? '👑 尊贵会员' : '👤 免费用户' }}
              </span>
              <span class="login-time">登录时间：{{ currentTime }}</span>
            </p>
            <p class="welcome-text" v-else>
              专为在日华人设计的宅建士资格考试备考平台，立即开始您的学习之旅！
            </p>
          </div>
          <div class="quick-stats" v-if="userStore.isLoggedIn">
            <div class="stat-item">
              <span class="stat-number">{{ learningStore.overallProgress }}%</span>
              <span class="stat-label">总体进度</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ learnedTopicsCount }}</span>
              <span class="stat-label">已学知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ learningStore.correctRate }}%</span>
              <span class="stat-label">练习正确率</span>
            </div>
          </div>
          <div class="quick-actions" v-else>
            <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
            <button class="btn btn-secondary" @click="openRegisterDialog">免费注册</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 平台介绍 -->
        <section class="platform-intro">
          <div class="intro-content">
            <h1>日本宅建士资格考试</h1>
            <h2>中文学习助考平台</h2>
            
            <p class="intro-text">
              专为在日华人设计的宅建士资格考试备考平台，通过中文学习宅建士考试的内容，
              系统化理解并掌握五大分野知识点，助您高效通过宅建士资格考试。
            </p>

            <div class="action-buttons">
              <router-link to="/notes" class="btn btn-primary">
                <span class="btn-icon">📚</span>
                开始学习
              </router-link>
              <button @click="showPlatformIntro" class="btn btn-secondary">
                <span class="btn-icon">ℹ️</span>
                了解详情
              </button>
            </div>
          </div>
        </section>

        <!-- 五大分野 -->
        <section class="domains-section">
          <div class="section-header">
            <h2>五大学习分野</h2>
            <p class="section-desc">全面覆盖宅建士考试核心内容</p>
          </div>
          <div class="domains-grid">
            <div 
              v-for="domain in domains" 
              :key="domain.id"
              class="domain-card"
              @click="navigateToDomain(domain.id)"
            >
              <div class="domain-icon">{{ domain.icon }}</div>
              <h3>{{ domain.name }}</h3>
              <p>{{ domain.description }}</p>
              <div class="domain-progress" v-if="userStore.isLoggedIn">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: calculateDomainProgress(domain.id) + '%' }"
                  ></div>
                </div>
                <span class="progress-text">已学 {{ calculateDomainProgress(domain.id) }}%</span>
              </div>
              <div class="domain-action" v-else>
                <button class="btn btn-sm" @click.stop="openLoginDialog">开始学习</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 学习流程 -->
        <section class="learning-flow">
          <div class="section-header">
            <h2>科学学习流程</h2>
            <p class="section-desc">四步学习法，助您高效掌握知识点</p>
          </div>
          <div class="flow-steps">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>学习笔记</h3>
                <p>通过中文笔记理解核心概念</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>视频讲解</h3>
                <p>深度解析知识点</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>强化练习</h3>
                <p>刻意练习巩固理解</p>
              </div>
            </div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>真题模拟</h3>
                <p>全真环境检验学习效果</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 快速开始 -->
        <section class="quick-start">
          <div class="section-header">
            <h2>快速开始学习</h2>
            <p class="section-desc">选择您的学习方式，立即开始</p>
          </div>
          <div class="quick-actions">
            <router-link to="/notes" class="action-card">
              <div class="action-icon">📚</div>
              <h3>中文笔记</h3>
              <p>系统学习知识点</p>
              <span class="action-badge">推荐</span>
            </router-link>
            
            <router-link to="/video" class="action-card">
              <div class="action-icon">🎥</div>
              <h3>视频学习</h3>
              <p>视频讲解更直观</p>
            </router-link>
            
            <router-link to="/practice" class="action-card">
              <div class="action-icon">💪</div>
              <h3>强化练习</h3>
              <p>巩固所学知识</p>
            </router-link>
            
            <router-link to="/exam" class="action-card">
              <div class="action-icon">⏱️</div>
              <h3>真题模拟</h3>
              <p>检验学习成果</p>
            </router-link>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const learningStore = useLearningStore()
const router = useRouter()
const currentTime = ref('')

// 五大分野数据
const domains = [
  {
    id: 'rights',
    name: '权利关系',
    icon: '⚖️',
    description: '民法、物权、债权等法律基础'
  },
  {
    id: 'business',
    name: '宅建业法',
    icon: '🏢',
    description: '从业规范、合同规则、责任义务'
  },
  {
    id: 'regulations',
    name: '法令制限',
    icon: '📜',
    description: '城市规划、建筑标准法规'
  },
  {
    id: 'tax',
    name: '税・価格',
    icon: '💰',
    description: '不动产税收、价格评估'
  },
  {
    id: 'exempt',
    name: '五问免除',
    icon: '🎯',
    description: '特定事项的专业知识'
  }
]

// 计算属性
const learnedTopicsCount = computed(() => {
  return Object.values(learningStore.progress).filter(topic => 
    topic.completionPercentage > 0
  ).length
})

// 计算领域进度
const calculateDomainProgress = (domainId) => {
  const domainMapping = {
    'rights': ['rights_agency', 'contract_law', 'mortgage', 'agency_law'],
    'business': ['important_matters'],
    'regulations': ['land_building'],
    'tax': ['tax_system'],
    'exempt': ['registration']
  }
  
  const domainTopics = domainMapping[domainId] || []
  if (domainTopics.length === 0) return 0
  
  const totalProgress = domainTopics.reduce((sum, topicId) => {
    const progress = learningStore.progress[topicId]
    return sum + (progress?.completionPercentage || 0)
  }, 0)
  
  return Math.round(totalProgress / domainTopics.length)
}

// 导航到具体领域
const navigateToDomain = (domainId) => {
  if (!userStore.isLoggedIn) {
    openLoginDialog()
    return
  }
  router.push(`/notes?domain=${domainId}`)
}

// 显示平台介绍
const showPlatformIntro = () => {
  alert(`🏠 宅学苑平台介绍

🌟 核心特色：
• 中文理解日本宅建士考试内容
• 知识点视频讲解
• 个性化学习路径
• 刻意练习系统

📚 学习资源：
• 完整覆盖五大考试分野
• 系统化知识体系
• 历年真题库
• 智能错题本

🎯 学习目标：
帮助在日华人克服语言障碍
高效备考，一次通过考试！`)
}

// 打开登录弹窗 - 使用全局事件
const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

// 打开注册弹窗 - 使用全局事件
const openRegisterDialog = () => {
  window.dispatchEvent(new CustomEvent('open-register-dialog'))
}

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 60000)
  learningStore.loadFromStorage()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", "Noto Sans JP", "Noto Sans", Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--container-padding, 20px);
}

/* ========= 欢迎横幅 ========= */
.hero-banner {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 3rem 0;
  margin-top: 0;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.welcome-message h1 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-badge.free {
  background: rgba(255, 255, 255, 0.2);
}

.status-badge.premium {
  background: gold;
  color: #856404;
}

.login-time {
  font-size: 0.9rem;
  opacity: 0.9;
}

.welcome-text {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.quick-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

.quick-actions {
  display: flex;
  gap: 1rem;
}

/* ========= 主要内容 ========= */
.main-content {
  padding: 3rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.2rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-desc {
  font-size: 1.1rem;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto;
}

/* ========= 平台介绍 ========= */
.platform-intro {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.intro-content h1 {
  font-size: 2.5rem;
  color: var(--primary-dark);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.intro-content h2 {
  font-size: 1.5rem;
  color: var(--muted);
  margin: 0 0 2rem 0;
  font-weight: 500;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(42, 121, 96, 0.3);
}

.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-icon {
  font-size: 1.2rem;
}

/* ========= 五大分野 ========= */
.domains-section {
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.domains-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.domain-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(12, 35, 50, 0.08);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.domain-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(12, 35, 50, 0.12);
  border-color: var(--primary);
}

.domain-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.domain-card h3 {
  color: var(--primary-dark);
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.domain-card p {
  color: var(--muted);
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
  flex-grow: 1;
}

.domain-progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.9rem;
  color: var(--muted);
  font-weight: 600;
}

.domain-action {
  margin-top: auto;
}

/* ========= 学习流程 ========= */
.learning-flow {
  padding: 3rem 0;
  margin-bottom: 3rem;
}

.flow-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.flow-step {
  text-align: center;
  position: relative;
}

.step-number {
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.step-content h3 {
  color: var(--primary-dark);
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.step-content p {
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

/* ========= 快速开始 ========= */
.quick-start {
  padding: 3rem 0;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(12, 35, 50, 0.08);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(12, 35, 50, 0.12);
  border-color: var(--primary);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  color: var(--primary-dark);
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.action-card p {
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

.action-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .domains-grid,
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .quick-stats, .quick-actions {
    width: 100%;
    justify-content: center;
  }
  
  .platform-intro h1 {
    font-size: 2rem;
  }
  
  .platform-intro h2 {
    font-size: 1.2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .domains-grid,
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .flow-steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .intro-content h1 {
    font-size: 2rem;
  }
  
  .user-status {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .quick-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .quick-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .quick-actions .btn {
    width: 100%;
  }
}
</style>