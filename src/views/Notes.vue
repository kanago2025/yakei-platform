<template>
  <div class="notes">
    <div class="container">
      <!-- 顶部导航栏 -->
      <header class="top-nav">
        <router-link to="/" class="logo">
          <span class="mark">宅</span>
          <span class="name">宅学苑</span>
        </router-link>
        
        <nav class="nav-links" :class="{ 'mobile-show': mobileMenuOpen }">
          <router-link to="/">首页</router-link>
          <router-link to="/notes" class="active">中文笔记</router-link>
          <router-link to="/video">视频学习</router-link>
          <router-link to="/practice">强化练习</router-link>
          <router-link to="/exam">真题模拟</router-link>
          <router-link to="/dashboard">学习进度</router-link>
          <router-link to="/community">学习社群</router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </header>

      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>中文笔记</h1>
          <p>专为在日华人设计的宅建士考试学习资料，用中文深度解析五大分野知识点，对应各类日文教材，助您轻松理解复杂概念</p>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">5</span>
              <span class="stat-label">考试分野</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalTopics }}</span>
              <span class="stat-label">知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ learningStore.overallProgress }}%</span>
              <span class="stat-label">总体进度</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-section">
          <h3>按分野学习</h3>
          <div class="domain-buttons">
            <button 
              v-for="domain in domains" 
              :key="domain.id"
              class="domain-btn" 
              :class="{ active: activeDomain === domain.id }"
              @click="switchDomain(domain.id)"
            >
              <span class="domain-icon">{{ domain.icon }}</span>
              <span class="domain-name">{{ domain.name }}</span>
              <span class="domain-count">{{ getDomainProgress(domain.id) }}% 进度</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>学习工具</h3>
          <div class="tool-buttons">
            <router-link to="/practice" class="tool-btn">
              <span class="tool-icon">🎯</span>
              <span>强化练习</span>
            </router-link>
            <router-link to="/video" class="tool-btn">
              <span class="tool-icon">🎥</span>
              <span>视频讲解</span>
            </router-link>
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
        <!-- 权利关系 -->
        <div class="domain-section" v-if="activeDomain === 'rights'">
          <div class="domain-header">
            <h2>权利关系</h2>
            <p>民法基础知识，包括意思表示、代理、物权变动、不动产登记等核心法律概念</p>
            <div class="domain-progress">
              <div class="progress-info">
                <span>学习进度</span>
                <span>{{ getDomainProgress('rights') }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainProgress('rights') + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="knowledge-grid">
            <div 
              v-for="topic in rightsTopics" 
              :key="topic.id"
              class="knowledge-card"
              :class="{ 'new': topic.isNew }"
            >
              <div class="card-header">
                <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                <button class="bookmark-btn" @click="toggleBookmark(topic.id)">
                  <span>{{ topic.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>
              
              <div class="card-icon">{{ topic.icon }}</div>
              <h3 class="card-title">{{ topic.title }}</h3>
              <p class="card-desc">{{ topic.description }}</p>
              
              <div class="card-meta">
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ topic.points }}个要点
                </span>
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ topic.duration }}
                </span>
              </div>
              
              <div class="card-progress">
                <div class="progress-text">
                  <span>掌握度</span>
                  <span>{{ getTopicProgress(topic.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getTopicProgress(topic.id) + '%' }"></div>
                </div>
              </div>
              
              <div class="card-actions">
                <button class="btn btn-primary" @click="startLearning(topic)">开始学习</button>
                <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 宅建业法 -->
        <div class="domain-section" v-if="activeDomain === 'business'">
          <div class="domain-header">
            <h2>宅建业法</h2>
            <p>宅地建物取引业法相关规定，包括免许制度、重要事项说明、广告规制等</p>
            <div class="domain-progress">
              <div class="progress-info">
                <span>学习进度</span>
                <span>{{ getDomainProgress('business') }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainProgress('business') + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="knowledge-grid">
            <div 
              v-for="topic in businessTopics" 
              :key="topic.id"
              class="knowledge-card"
              :class="{ 'new': topic.isNew }"
            >
              <div class="card-header">
                <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                <button class="bookmark-btn" @click="toggleBookmark(topic.id)">
                  <span>{{ topic.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>
              
              <div class="card-icon">{{ topic.icon }}</div>
              <h3 class="card-title">{{ topic.title }}</h3>
              <p class="card-desc">{{ topic.description }}</p>
              
              <div class="card-meta">
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ topic.points }}个要点
                </span>
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ topic.duration }}
                </span>
              </div>
              
              <div class="card-progress">
                <div class="progress-text">
                  <span>掌握度</span>
                  <span>{{ getTopicProgress(topic.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getTopicProgress(topic.id) + '%' }"></div>
                </div>
              </div>
              
              <div class="card-actions">
                <button class="btn btn-primary" @click="startLearning(topic)">开始学习</button>
                <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 法令制限 -->
        <div class="domain-section" v-if="activeDomain === 'regulations'">
          <div class="domain-header">
            <h2>法令制限</h2>
            <p>都市计划法、建筑基准法、国土利用计划法等土地使用和建筑相关法规</p>
            <div class="domain-progress">
              <div class="progress-info">
                <span>学习进度</span>
                <span>{{ getDomainProgress('regulations') }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainProgress('regulations') + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="knowledge-grid">
            <div 
              v-for="topic in regulationsTopics" 
              :key="topic.id"
              class="knowledge-card"
              :class="{ 'new': topic.isNew }"
            >
              <div class="card-header">
                <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                <button class="bookmark-btn" @click="toggleBookmark(topic.id)">
                  <span>{{ topic.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>
              
              <div class="card-icon">{{ topic.icon }}</div>
              <h3 class="card-title">{{ topic.title }}</h3>
              <p class="card-desc">{{ topic.description }}</p>
              
              <div class="card-meta">
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ topic.points }}个要点
                </span>
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ topic.duration }}
                </span>
              </div>
              
              <div class="card-progress">
                <div class="progress-text">
                  <span>掌握度</span>
                  <span>{{ getTopicProgress(topic.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getTopicProgress(topic.id) + '%' }"></div>
                </div>
              </div>
              
              <div class="card-actions">
                <button class="btn btn-primary" @click="startLearning(topic)">开始学习</button>
                <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 税・価格 -->
        <div class="domain-section" v-if="activeDomain === 'tax'">
          <div class="domain-header">
            <h2>税・価格</h2>
            <p>不动产取得税、固定资产税、所得税等税务知识和价格评估基础</p>
            <div class="domain-progress">
              <div class="progress-info">
                <span>学习进度</span>
                <span>{{ getDomainProgress('tax') }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainProgress('tax') + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="knowledge-grid">
            <div 
              v-for="topic in taxTopics" 
              :key="topic.id"
              class="knowledge-card"
              :class="{ 'new': topic.isNew }"
            >
              <div class="card-header">
                <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                <button class="bookmark-btn" @click="toggleBookmark(topic.id)">
                  <span>{{ topic.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>
              
              <div class="card-icon">{{ topic.icon }}</div>
              <h3 class="card-title">{{ topic.title }}</h3>
              <p class="card-desc">{{ topic.description }}</p>
              
              <div class="card-meta">
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ topic.points }}个要点
                </span>
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ topic.duration }}
                </span>
              </div>
              
              <div class="card-progress">
                <div class="progress-text">
                  <span>掌握度</span>
                  <span>{{ getTopicProgress(topic.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getTopicProgress(topic.id) + '%' }"></div>
                </div>
              </div>
              
              <div class="card-actions">
                <button class="btn btn-primary" @click="startLearning(topic)">开始学习</button>
                <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 五问免除 -->
        <div class="domain-section" v-if="activeDomain === 'exempt'">
          <div class="domain-header">
            <h2>五问免除</h2>
            <p>住宅金融支援机构法、需给统计、土地建物特性等五问免除领域知识</p>
            <div class="domain-progress">
              <div class="progress-info">
                <span>学习进度</span>
                <span>{{ getDomainProgress('exempt') }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainProgress('exempt') + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="knowledge-grid">
            <div 
              v-for="topic in exemptTopics" 
              :key="topic.id"
              class="knowledge-card"
              :class="{ 'new': topic.isNew }"
            >
              <div class="card-header">
                <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                <button class="bookmark-btn" @click="toggleBookmark(topic.id)">
                  <span>{{ topic.bookmarked ? '★' : '☆' }}</span>
                </button>
              </div>
              
              <div class="card-icon">{{ topic.icon }}</div>
              <h3 class="card-title">{{ topic.title }}</h3>
              <p class="card-desc">{{ topic.description }}</p>
              
              <div class="card-meta">
                <span class="meta-item">
                  <span class="meta-icon">📝</span>
                  {{ topic.points }}个要点
                </span>
                <span class="meta-item">
                  <span class="meta-icon">⏱️</span>
                  {{ topic.duration }}
                </span>
              </div>
              
              <div class="card-progress">
                <div class="progress-text">
                  <span>掌握度</span>
                  <span>{{ getTopicProgress(topic.id) }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: getTopicProgress(topic.id) + '%' }"></div>
                </div>
              </div>
              
              <div class="card-actions">
                <button class="btn btn-primary" @click="startLearning(topic)">开始学习</button>
                <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>系统化学习，高效掌握知识点</h2>
          <p>通过结构化的中文笔记和深度解析，配合视频讲解和强化练习，快速建立完整的知识体系</p>
          <div class="cta-buttons">
            <router-link to="/practice" class="btn btn-primary">开始强化练习</router-link>
            <router-link to="/video" class="btn btn-secondary">观看视频讲解</router-link>
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

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLearningStore } from '@/stores/learning'
import { useRouter } from 'vue-router'

const learningStore = useLearningStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const activeDomain = ref('rights')
const bookmarks = ref(new Set())

// 五大分野数据
const domains = [
  { 
    id: 'rights', 
    name: '权利关系', 
    icon: '⚖️',
    description: '民法基础知识，包括意思表示、代理、物权变动、不动产登记等核心法律概念'
  },
  { 
    id: 'business', 
    name: '宅建业法', 
    icon: '🏢',
    description: '宅地建物取引业法相关规定，包括免许制度、重要事项说明、广告规制等'
  },
  { 
    id: 'regulations', 
    name: '法令制限', 
    icon: '📏',
    description: '都市计划法、建筑基准法、国土利用计划法等土地使用和建筑相关法规'
  },
  { 
    id: 'tax', 
    name: '税・価格', 
    icon: '💰',
    description: '不动产取得税、固定资产税、所得税等税务知识和价格评估基础'
  },
  { 
    id: 'exempt', 
    name: '五问免除', 
    icon: '✅',
    description: '住宅金融支援机构法、需给统计、土地建物特性等五问免除领域知识'
  }
]

// 知识点数据
const rightsTopics = [
  {
    id: 'rights_agency',
    title: '意思表示',
    description: '法律行为的基础，包括意思与表示的一致性、意思表示的生效时间等核心概念',
    icon: '1',
    points: 28,
    duration: '45分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'rights-intent',
    isNew: true
  },
  {
    id: 'rights_capacity',
    title: '制限行為能力者',
    description: '未成年人、成年被监护人、被保佐人、被辅助人的法律行为效力及撤销权',
    icon: '2',
    points: 15,
    duration: '30分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'rights-capacity',
    isNew: false
  },
  {
    id: 'agency_law',
    title: '代理制度',
    description: '代理权的授予、表见代理、无权代理、复代理等代理相关法律制度',
    icon: '3',
    points: 22,
    duration: '35分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-agency',
    isNew: false
  }
]

const businessTopics = [
  {
    id: 'important_matters',
    title: '重要事项说明',
    description: '宅建士的重要事项说明义务、说明内容和说明时机',
    icon: '1',
    points: 25,
    duration: '40分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'business-explanation',
    isNew: true
  },
  {
    id: 'business_license',
    title: '免许制度',
    description: '宅建业的免许要件、免许更新、免许取消等相关制度',
    icon: '2',
    points: 18,
    duration: '30分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'business-license',
    isNew: false
  }
]

const regulationsTopics = [
  {
    id: 'land_building',
    title: '都市计划法',
    description: '都市计划区域、用途地域、开发许可等都市计划相关制度',
    icon: '1',
    points: 32,
    duration: '50分钟',
    difficulty: 'key',
    badgeText: '重点',
    videoId: 'regulations-urban',
    isNew: true
  },
  {
    id: 'regulations_building',
    title: '建筑基准法',
    description: '建筑确认、建筑面积、容积率、建筑高度等建筑规制',
    icon: '2',
    points: 28,
    duration: '45分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'regulations-building',
    isNew: false
  }
]

const taxTopics = [
  {
    id: 'tax_system',
    title: '不动产取得税',
    description: '课税标准、税率、减免制度、纳税期限等不动产取得相关税务知识',
    icon: '1',
    points: 20,
    duration: '35分钟',
    difficulty: 'key',
    badgeText: '重点',
    videoId: 'tax-acquisition',
    isNew: true
  },
  {
    id: 'tax_fixed',
    title: '固定资产税',
    description: '课税对象、评估标准、税率计算、减免措施等固定资产税相关知识',
    icon: '2',
    points: 15,
    duration: '25分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'tax-fixed-asset',
    isNew: false
  }
]

const exemptTopics = [
  {
    id: 'registration',
    title: '住宅金融支援机构法',
    description: '机构业务内容、融资制度、保证业务等住宅金融支援相关法律知识',
    icon: '1',
    points: 18,
    duration: '30分钟',
    difficulty: 'exempt',
    badgeText: '免除',
    videoId: 'exempt-finance',
    isNew: true
  },
  {
    id: 'exempt_market',
    title: '需给统计与市场分析',
    description: '住宅需给统计、市场动向分析、价格变动因素等市场相关知识',
    icon: '2',
    points: 12,
    duration: '20分钟',
    difficulty: 'exempt',
    badgeText: '免除',
    videoId: 'exempt-market',
    isNew: false
  }
]

// 计算属性
const totalTopics = computed(() => {
  return rightsTopics.length + businessTopics.length + regulationsTopics.length + 
         taxTopics.length + exemptTopics.length
})

// 获取领域进度
const getDomainProgress = (domainId) => {
  const domainMapping = {
    'rights': ['rights_agency', 'rights_capacity', 'agency_law'],
    'business': ['important_matters', 'business_license'],
    'regulations': ['land_building', 'regulations_building'],
    'tax': ['tax_system', 'tax_fixed'],
    'exempt': ['registration', 'exempt_market']
  }
  
  const domainTopics = domainMapping[domainId] || []
  if (domainTopics.length === 0) return 0
  
  const totalProgress = domainTopics.reduce((sum, topicId) => {
    const progress = learningStore.progress[topicId]
    return sum + (progress?.completionPercentage || 0)
  }, 0)
  
  return Math.round(totalProgress / domainTopics.length)
}

// 获取知识点进度
const getTopicProgress = (topicId) => {
  const progress = learningStore.progress[topicId]
  return progress?.completionPercentage || 0
}

// 切换书签
const toggleBookmark = (topicId) => {
  if (bookmarks.value.has(topicId)) {
    bookmarks.value.delete(topicId)
  } else {
    bookmarks.value.add(topicId)
  }
}

// 开始学习
const startLearning = (topic) => {
  // 更新学习进度
  learningStore.updateProgress(topic.id, {
    status: 'in_progress',
    completionPercentage: Math.min(getTopicProgress(topic.id) + 10, 100),
    totalStudyTime: (learningStore.progress[topic.id]?.totalStudyTime || 0) + 600 // 增加10分钟
  })
  
  alert(`开始学习: ${topic.title}`)
}

// 切换领域
const switchDomain = (domainId) => {
  activeDomain.value = domainId
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 确保学习数据已加载
  learningStore.loadFromStorage()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.notes {
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
  padding: 0 var(--container-padding, 20px);
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ========= 顶部导航栏 ========= */
.top-nav {
  background: white;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(12, 35, 50, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 1rem;
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
}

.domain-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.domain-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
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
}

.tool-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.tool-icon {
  font-size: 20px;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 40px 0;
  flex: 1;
}

.domain-section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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

.domain-header p {
  color: var(--muted);
  margin-bottom: 20px;
  max-width: 600px;
  line-height: 1.6;
}

.domain-progress {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 2px 8px rgba(12, 35, 50, 0.06);
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

/* ========= 知识点网格 ========= */
.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.knowledge-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
}

.knowledge-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(12, 35, 50, 0.12);
  border-color: var(--primary);
}

.knowledge-card.new::before {
  content: "新";
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.card-badge.basic {
  background: var(--primary-light);
  color: var(--primary);
}

.card-badge.important {
  background: #fef3c7;
  color: #92400e;
}

.card-badge.key {
  background: #fee2e2;
  color: #991b1b;
}

.card-badge.exempt {
  background: #e0e7ff;
  color: #3730a3;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s ease;
  padding: 4px;
  border-radius: 4px;
}

.bookmark-btn:hover {
  color: var(--primary);
  background: var(--primary-light);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--primary);
  font-size: 18px;
  font-weight: 600;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
  line-height: 1.4;
}

.card-desc {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--muted);
}

.meta-icon {
  font-size: 14px;
}

.card-progress {
  margin-bottom: 20px;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--muted);
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
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

.btn-secondary {
  background: transparent;
  color: var(--primary-dark);
  border: 1px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
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
  
  .knowledge-grid {
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
  
  .knowledge-grid {
    grid-template-columns: 1fr;
  }
  
  .domain-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
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
}
</style>