<!-- src/views/Notes.vue -->
<template>
  <div class="notes">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>中文笔记</h1>
          <p>专为在日华人设计的宅建士考试学习资料，用中文深度解析五大分野知识点</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>VIP会员可享受无限笔记存储和高级编辑功能</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ totalDomains }}</span>
              <span class="stat-label">考试分野</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalTopics }}</span>
              <span class="stat-label">知识点</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalNotes }}</span>
              <span class="stat-label">个人笔记</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ overallProgress }}%</span>
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
              v-for="domain in visibleDomains" 
              :key="domain.id"
              class="domain-btn" 
              :class="{ active: activeDomain === domain.id }"
              @click="switchDomain(domain.id)"
            >
              <span class="domain-icon">{{ domain.icon }}</span>
              <span class="domain-name">{{ domain.name }}</span>
              <span class="domain-count">{{ getDomainNoteCount(domain.id) }} 笔记</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>学习工具</h3>
          <div class="tool-buttons">
            <div 
              class="tool-btn"
              :class="{ 'disabled': !features.practice }"
              @click="handleToolClick('practice')"
            >
              <span class="tool-icon">🎯</span>
              <span>强化练习</span>
              <span v-if="!features.practice" class="coming-soon-tag">即将开放</span>
            </div>
            <div 
              class="tool-btn"
              :class="{ 'disabled': !features.video }"
              @click="handleToolClick('video')"
            >
              <span class="tool-icon">🎥</span>
              <span>视频讲解</span>
              <span v-if="!features.video" class="coming-soon-tag">即将开放</span>
            </div>
            <div 
              class="tool-btn"
              :class="{ 'disabled': !features.exam }"
              @click="handleToolClick('exam')"
            >
              <span class="tool-icon">📝</span>
              <span>真题模拟</span>
              <span v-if="!features.exam" class="coming-soon-tag">即将开放</span>
            </div>
            <div 
              class="tool-btn"
              :class="{ 'disabled': !features.dashboard }"
              @click="handleToolClick('dashboard')"
            >
              <span class="tool-icon">📊</span>
              <span>学习进度</span>
              <span v-if="!features.dashboard" class="coming-soon-tag">即将开放</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 搜索和筛选 -->
        <div class="notes-controls" v-if="userStore.isLoggedIn">
          <div class="search-section">
            <div class="search-box">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索笔记内容..." 
                class="search-input"
              >
              <span class="search-icon">🔍</span>
            </div>
            <div class="filter-options">
              <select v-model="filterSort" class="filter-select">
                <option value="newest">最新笔记</option>
                <option value="oldest">最早笔记</option>
                <option value="updated">最近更新</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 宅建业法 -->
        <div class="domain-section" v-if="activeDomain === 'business'">
          <div class="domain-header">
            <div class="header-main">
              <h2>宅建业法</h2>
              <p>宅地建物取引业法相关规定，包括免许制度、重要事项说明、广告规制等</p>
            </div>
            <div class="header-actions">
              <button class="btn btn-primary" @click="createNewNote('business')">
                <span class="btn-icon">📝</span>
                新建笔记
              </button>
            </div>
          </div>

          <div class="notes-stats">
            <div class="stats-card">
              <div class="stat">
                <span class="stat-number">{{ getDomainNoteCount('business') }}</span>
                <span class="stat-label">笔记数量</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ getDomainProgress('business') }}%</span>
                <span class="stat-label">学习进度</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ getDomainStudyTime('business') }}h</span>
                <span class="stat-label">学习时长</span>
              </div>
            </div>
          </div>

          <div class="content-layout-full">
            <!-- 知识点列表 -->
            <div class="knowledge-section-full">
              <h3>知识点列表</h3>
              <div class="knowledge-grid">
                <div 
                  v-for="topic in visibleBusinessTopics" 
                  :key="topic.id"
                  class="knowledge-card"
                  :class="{ 
                    'active': activeTopic === topic.id,
                    'has-notes': hasUserNotes(topic.id)
                  }"
                  @click="viewTopicDetail(topic)"
                >
                  <div class="card-header">
                    <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                    <button class="bookmark-btn" @click.stop="toggleBookmark(topic.id)">
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
                    <button class="btn btn-primary" @click.stop="createNoteForTopic(topic, $event)">
                      {{ hasUserNotes(topic.id) ? '编辑笔记' : '记笔记' }}
                    </button>
                    <button 
                      class="btn btn-outline" 
                      @click.stop="handleVideoClick(topic)"
                      :disabled="!features.video"
                    >
                      观看视频
                      <span v-if="!features.video" class="disabled-text">(即将开放)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 用户笔记列表 -->
            <div class="user-notes-section-full" v-if="userStore.isLoggedIn">
              <div class="section-header">
                <h3>我的笔记</h3>
                <p>在 {{ getActiveDomainName() }} 领域创建的笔记</p>
              </div>
              
              <div class="notes-list">
                <div 
                  v-for="note in filteredDomainNotes" 
                  :key="note.id"
                  class="note-card"
                  :class="{ 'active': activeNote === note.id }"
                  @click="setActiveNote(note.id)"
                >
                  <div class="note-header">
                    <h4 class="note-title">{{ note.title || '无标题笔记' }}</h4>
                    <div class="note-actions">
                      <button class="action-btn" @click.stop="editNote(note)" title="编辑笔记">
                        ✏️
                      </button>
                      <button class="action-btn" @click.stop="deleteNote(note.id)" title="删除笔记">
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div class="note-content-preview">
                    {{ note.content.substring(0, 100) }}{{ note.content.length > 100 ? '...' : '' }}
                  </div>
                  
                  <div class="note-meta">
                    <span class="meta-item">
                      <span class="meta-icon">📚</span>
                      {{ getTopicName(note.topicId) }}
                    </span>
                    <span class="meta-item">
                      <span class="meta-icon">📅</span>
                      {{ formatDate(note.updatedAt) }}
                    </span>
                  </div>
                  
                  <div class="note-actions-full">
                    <button class="btn btn-outline" @click.stop="editNote(note)">编辑</button>
                    <button class="btn btn-outline" @click.stop="exportNote(note)">导出</button>
                  </div>
                </div>

                <div v-if="filteredDomainNotes.length === 0" class="empty-notes">
                  <div class="empty-icon">📝</div>
                  <h4>暂无笔记</h4>
                  <p>开始创建您的第一份学习笔记吧！</p>
                  <button class="btn btn-primary" @click="createNewNote('business')">
                    创建新笔记
                  </button>
                </div>
              </div>
            </div>

            <!-- 未登录提示 -->
            <div class="login-prompt" v-else>
              <div class="prompt-content">
                <h3>登录以创建和管理笔记</h3>
                <p>登录后可以保存您的学习笔记、查看历史记录，并获得个性化学习建议</p>
                <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 权利关系 -->
        <div class="domain-section" v-if="activeDomain === 'rights'">
          <div class="domain-header">
            <div class="header-main">
              <h2>权利关系</h2>
              <p>民法基础知识，包括意思表示、代理、物权变动、不动产登记等核心法律概念</p>
            </div>
            <div class="header-actions">
              <button class="btn btn-primary" @click="createNewNote('rights')">
                <span class="btn-icon">📝</span>
                新建笔记
              </button>
            </div>
          </div>

          <div class="notes-stats">
            <div class="stats-card">
              <div class="stat">
                <span class="stat-number">{{ getDomainNoteCount('rights') }}</span>
                <span class="stat-label">笔记数量</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ getDomainProgress('rights') }}%</span>
                <span class="stat-label">学习进度</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ getDomainStudyTime('rights') }}h</span>
                <span class="stat-label">学习时长</span>
              </div>
            </div>
          </div>

          <div class="content-layout-full">
            <!-- 知识点列表 -->
            <div class="knowledge-section-full">
              <h3>知识点列表</h3>
              <div class="knowledge-grid">
                <div 
                  v-for="topic in visibleRightsTopics" 
                  :key="topic.id"
                  class="knowledge-card"
                  :class="{ 
                    'active': activeTopic === topic.id,
                    'has-notes': hasUserNotes(topic.id)
                  }"
                  @click="viewTopicDetail(topic)"
                >
                  <div class="card-header">
                    <div class="card-badge" :class="topic.difficulty">{{ topic.badgeText }}</div>
                    <button class="bookmark-btn" @click.stop="toggleBookmark(topic.id)">
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
                    <button class="btn btn-primary" @click.stop="createNoteForTopic(topic, $event)">
                      {{ hasUserNotes(topic.id) ? '编辑笔记' : '记笔记' }}
                    </button>
                    <button 
                      class="btn btn-outline" 
                      @click.stop="handleVideoClick(topic)"
                      :disabled="!features.video"
                    >
                      观看视频
                      <span v-if="!features.video" class="disabled-text">(即将开放)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 用户笔记列表 -->
            <div class="user-notes-section-full" v-if="userStore.isLoggedIn">
              <div class="section-header">
                <h3>我的笔记</h3>
                <p>在 {{ getActiveDomainName() }} 领域创建的笔记</p>
              </div>
              
              <div class="notes-list">
                <div 
                  v-for="note in filteredDomainNotes" 
                  :key="note.id"
                  class="note-card"
                  :class="{ 'active': activeNote === note.id }"
                  @click="setActiveNote(note.id)"
                >
                  <div class="note-header">
                    <h4 class="note-title">{{ note.title || '无标题笔记' }}</h4>
                    <div class="note-actions">
                      <button class="action-btn" @click.stop="editNote(note)" title="编辑笔记">
                        ✏️
                      </button>
                      <button class="action-btn" @click.stop="deleteNote(note.id)" title="删除笔记">
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div class="note-content-preview">
                    {{ note.content.substring(0, 100) }}{{ note.content.length > 100 ? '...' : '' }}
                  </div>
                  
                  <div class="note-meta">
                    <span class="meta-item">
                      <span class="meta-icon">📚</span>
                      {{ getTopicName(note.topicId) }}
                    </span>
                    <span class="meta-item">
                      <span class="meta-icon">📅</span>
                      {{ formatDate(note.updatedAt) }}
                    </span>
                  </div>
                  
                  <div class="note-actions-full">
                    <button class="btn btn-outline" @click.stop="editNote(note)">编辑</button>
                    <button class="btn btn-outline" @click.stop="exportNote(note)">导出</button>
                  </div>
                </div>

                <div v-if="filteredDomainNotes.length === 0" class="empty-notes">
                  <div class="empty-icon">📝</div>
                  <h4>暂无笔记</h4>
                  <p>开始创建您的第一份学习笔记吧！</p>
                  <button class="btn btn-primary" @click="createNewNote('rights')">
                    创建新笔记
                  </button>
                </div>
              </div>
            </div>

            <!-- 未登录提示 -->
            <div class="login-prompt" v-else>
              <div class="prompt-content">
                <h3>登录以创建和管理笔记</h3>
                <p>登录后可以保存您的学习笔记、查看历史记录，并获得个性化学习建议</p>
                <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 其他领域提示 -->
        <div class="domain-section" v-if="activeDomain !== 'business' && activeDomain !== 'rights'">
          <div class="coming-soon-domain">
            <div class="coming-soon-content">
              <h2>{{ getActiveDomainName() }} 领域</h2>
              <p>该领域正在紧张开发中，即将为您呈现</p>
              <div class="progress-section">
                <div class="progress-info">
                  <span class="progress-label">开发进度</span>
                  <span class="progress-value">25%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: '25%' }"></div>
                </div>
              </div>
              <div class="expected-date">
                <i class="icon">📅</i>
                <strong>预计开放时间:</strong> 2025年12月
              </div>
              <button class="btn btn-primary" @click="switchDomain('business')">
                先学习宅建业法
              </button>
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
            <button 
              class="btn btn-primary" 
              @click="handleToolClick('practice')"
              :disabled="!features.practice"
            >
              开始强化练习
              <span v-if="!features.practice" class="disabled-text">(即将开放)</span>
            </button>
            <button 
              class="btn btn-secondary" 
              @click="handleToolClick('video')"
              :disabled="!features.video"
            >
              观看视频讲解
              <span v-if="!features.video" class="disabled-text">(即将开放)</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 调试信息 -->
      <div v-if="showDebugInfo" class="debug-info">
        <h4>笔记页面环境信息</h4>
        <p>当前环境: {{ currentPhase }}</p>
        <p>可见领域: {{ visibleDomains.length }} 个</p>
        <p>可见知识点: {{ totalVisibleTopics }} 个</p>
        <p>用户笔记: {{ totalNotes }} 条</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FeatureControl from '@/utils/featureControl.js'

const userStore = useUserStore()
const learningStore = useLearningStore()
const router = useRouter()
const route = useRoute()

// 当前环境信息
const currentPhase = FeatureControl.getCurrentPhase()
const showDebugInfo = currentPhase === 'test'
const features = {
  video: FeatureControl.isRouteVisible('video'),
  practice: FeatureControl.isRouteVisible('practice'),
  exam: FeatureControl.isRouteVisible('exam'),
  dashboard: FeatureControl.isRouteVisible('dashboard'),
  community: FeatureControl.isRouteVisible('community')
}

const mobileMenuOpen = ref(false)
const activeDomain = ref('business')
const activeTopic = ref('')
const activeNote = ref('')
const searchQuery = ref('')
const filterSort = ref('newest')
const showNoteEditor = ref(false)
const editingNote = ref({})
const bookmarks = ref(new Set())

// 五大分野数据
const domains = [
  { 
    id: 'business', 
    name: '宅建业法', 
    icon: '🏢',
    description: '宅地建物取引业法相关规定，包括免许制度、重要事项说明、广告规制等'
  },
  { 
    id: 'rights', 
    name: '权利关系', 
    icon: '⚖️',
    description: '民法基础知识，包括意思表示、代理、物权变动、不动产登记等核心法律概念'
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
    name: '5問免除', 
    icon: '✅',
    description: '住宅金融支援机构法、需给统计、土地建物特性等五问免除领域知识'
  }
]

// 知识点数据
const businessTopics = [
  {
    id: 'business-meaning',
    title: '宅建业含义',
    description: '宅建业的定义、四大判断要素、免许制度等基础概念',
    icon: '🏢',
    points: 15,
    duration: '30分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'business-meaning',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'important-matters',
    title: '重要事项说明',
    description: '宅建士的重要事项说明义务、说明内容和说明时机',
    icon: '📋',
    points: 22,
    duration: '50分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'important-matters',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'mediation',
    title: '媒介与代理',
    description: '媒介与代理的定义及类型、业务处理要求与媒介契约书面',
    icon: '🤝',
    points: 26,
    duration: '50分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'mediation-intro',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'license-requirements',
    title: '免许制度',
    description: '宅建业免许的种类、申请条件、欠格事由及2025年最新法改正内容',
    icon: '📜',
    points: 16,
    duration: '40分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'license-requirements',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'agent',
    title: '宅地建物取引士',
    description: '宅建士的资格、职责、配置要求及重要事项说明义务',
    icon: '👨‍💼',
    points: 25,
    duration: '40分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'agent-intro',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'office-requirements',
    title: '事务所规定',
    description: '事务所的定义、5点set要求、从业者名簿、账簿、专任宅建士等详细规定',
    icon: '🏛️',
    points: 18,
    duration: '45分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'office-requirements',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'deposit',
    title: '营业保证金',
    description: '营业保证金制度、供托金额、还付条件及取回流程',
    icon: '💰',
    points: 26,
    duration: '50分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'deposit-intro',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'compensationdeposit',
    title: '弁济业务保证金',
    description: '弁济业务保证金制度、供托金额、还付条件及取回流程',
    icon: '💰',
    points: 26,
    duration: '50分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'compensationdeposit-intro',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'advertising-regulation',
    title: '广告规制',
    description: '广告的明示、广告的开始时期、广告的禁止与罚则',
    icon: '📢',
    points: 8,
    duration: '30分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'advertisingregulation-intro',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: '37-document',
    title: '37条书面',
    description: '37条书面的义务与交付、记载事项、与重要事项说明的区别',
    icon: '📄',
    points: 12,
    duration: '30分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: '37document',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'Seller-Restrictions',
    title: '自己卖主的制限',
    description: '自己作为卖主的制限内容、cooling-off适用的场合、方法、效果等',
    icon: '🚫',
    points: 20,
    duration: '50分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'seller-restrictions',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'Housing-DefectWarranty',
    title: '住宅瑕疵担保履行法',
    description: '住宅瑕疵担保履行法适用的范围、资力确保措施与要求等',
    icon: '🏠',
    points: 8,
    duration: '25分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'housing-defectwarranty',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'Compensation-Limit',
    title: '报酬额的制限',
    description: '媒介与代理报酬额的制限、计算方法、报酬额的差异、空家的特例',
    icon: '💵',
    points: 10,
    duration: '30分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'compensation-limit',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'Supervision-Penalty',
    title: '监督与罚则',
    description: '宅建业者与宅建取引士的监督处分体系、监督处分的类别与要求',
    icon: '👮',
    points: 10,
    duration: '30分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'supervision-penalty',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'Other-BusinessRegulations',
    title: '其他业务上的规制',
    description: '供托所相关说明义务的内容和时机、业务上各种禁止行为的具体内容等',
    icon: '📑',
    points: 10,
    duration: '30分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'other-businessregulations',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
  {
    id: 'Outside-Office',
    title: '事务所以外场所的规制',
    description: '事务所以外场所的定义和分类、案内所与现地的标识设置要求等',
    icon: '📍',
    points: 10,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'outside-office',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  }
]

const rightsTopics = [
  {
    id: 'agency',
    title: '代理',
    description: '代理权的授予、表见代理、无权代理、复代理等成立要件和效果',
    icon: '🤝',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-agency',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'mortgage',
    title: '抵当权',
    description: '抵当权的定义、设定、登记和对抗要件，抵当权的效力范围及优先弁済规则等',
    icon: '🏦',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-mortgage',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'property-change',
    title: '物权变动',
    description: '物权变动的概念、对抗要件和效力、对抗第三人的规则',
    icon: '🔄',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-propertychange',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'succession',
    title: '相続',
    description: '继承、遗留分的概念、继承的承认、放弃和限定承认的区别、配偶者居住权等',
    icon: '👨‍👩‍👧‍👦',
    points: 15,
    duration: '60分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'rights-succession',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'declaration-of-intent',
    title: '意思表示',
    description: '法律行为的基础，包括意思与表示的一致性、意思表示的生效时间等核心概念',
    icon: '💭',
    points: 28,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-declarationofintent',
    isNew: true,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'limited-capacity-persons',
    title: '制限行为能力者',
    description: '未成年人、成年被监护人、被保佐人、被辅助人的法律行为效力及撤销权',
    icon: '👥',
    points: 15,
    duration: '60分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'rights-limitedcapacitypersons',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'prescription',
    title: '时效',
    description: '时效的概念、成立要件、时效的更新和援用',
    icon: '⏰',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-prescription',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'debt-performance',
    title: '债务不履行与弁济',
    description: '债务不履行的基本概念和三种类型、弁济（清偿）的各种方式和要求',
    icon: '💳',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-debtperformance',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'contract-inappropriateness',
    title: '契约不适合责任',
    description: '契约不适合责任的基本概念、类型、救济手段及条件',
    icon: '📝',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-contractinappropriateness',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'real-estate-registration',
    title: '不动产登记法',
    description: '不动产登记的概念、登记的目的、效力和要件，表题部和权利部的区别等',
    icon: '🏛️',
    points: 15,
    duration: '60分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'rights-realestateregistration',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'guarantee-and-joint-debt',
    title: '保证与连带债务',
    description: '保证债务的概念、成立要件与三大性质，连带债务的效力原则和例外',
    icon: '🤝',
    points: 15,
    duration: '60分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-guaranteeandjointdebt',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'co-ownership',
    title: '共有',
    description: '共有的概念，持分的定义、推定规则和处分方式，共有物的管理、变更行为分类和决策机制等',
    icon: '👥',
    points: 8,
    duration: '45分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-ownership',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'condominium-ownership',
    title: '建物区分所有法',
    description: '区分所有权的概念，管理组合、管理者和集会的运作机制，规约的设定、变更和法律效力等',
    icon: '🏢',
    points: 8,
    duration: '45分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'rights-condominiumownership',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'lease',
    title: '赁贷借',
    description: '赁贷人与赁借人的权利义务关系，赁借权的对抗要件和登记，转贷与赁借权让渡',
    icon: '🏠',
    points: 8,
    duration: '45分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'rights-lease',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'land-and-house-rental',
    title: '借地借家法（借家）',
    description: '借地借家法的适用范围，普通建物赁贷借与定期建物赁贷借的区别、契约更新、终止的法律规则等',
    icon: '🏡',
    points: 8,
    duration: '90分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'rights-landandhouserental',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'land-lease',
    title: '借地借家法（借地）',
    description: '借地权的概念，普通借地权的存续期间和更新规则，借地权的对抗要件和建物买取请求权等',
    icon: '🌳',
    points: 8,
    duration: '90分钟',
    difficulty: 'key',
    badgeText: '核心',
    videoId: 'rights-landlease',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'tort',
    title: '不法行为',
    description: '不法行为的概念，使用者责任、共同不法行为、工作物责任的具体适用等',
    icon: '⚖️',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-tort',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'contract-work',
    title: '请负',
    description: '请负的概念，请负人的担保责任、担保责任的期间限制和特约效力等',
    icon: '🔨',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-contractwork',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'assignment-of-claim',
    title: '债权让渡',
    description: '债权让渡的概念，债权让渡的对抗要件和效力、二重让渡的处理规则等',
    icon: '📜',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-assignmentofclaim',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'adjacent-relations',
    title: '相邻关系',
    description: '相邻关系的概念，邻地使用权、土地通行权的行使条件和限制等',
    icon: '🏘️',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-adjacentrelations',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'risk-burden',
    title: '危险负担',
    description: '危险负担的概念，危险负担的转移时间点，履行迟滞期间的危险负担特殊规则等',
    icon: '⚠️',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-riskburden',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'payment-and-setoff',
    title: '弁济和相杀',
    description: '弁济、相杀的概念，弁济（还债）的提供、充当和代位的法律规定，相杀（抵消）的成立条件和法律效力等',
    icon: '💸',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-paymentandsetoff',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
  {
    id: 'other-important-matters',
    title: '其他重要事项',
    description: '事务管理、赠与、委任、使用借贷、地役权的概念、成立要件和法律效果等',
    icon: '📋',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-otherimportantmatters',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  }
]

// 用户笔记数据
const userNotes = ref([])

// 计算属性
const totalDomains = computed(() => {
  return domains.length
})

const totalTopics = computed(() => {
  return businessTopics.length + rightsTopics.length
})

const totalNotes = computed(() => {
  return userNotes.value.length
})

const overallProgress = computed(() => {
  return learningStore.overallProgress
})

const allTopics = computed(() => {
  return [...businessTopics, ...rightsTopics]
})

// 可见的领域（测试阶段只显示宅建业法和权利关系）
const visibleDomains = computed(() => {
  if (currentPhase !== 'test') return domains
  
  return domains.filter(domain => 
    domain.id === 'business' || domain.id === 'rights'
  )
})

// 可见的宅建业法知识点
const visibleBusinessTopics = computed(() => {
  if (currentPhase !== 'test') return businessTopics
  
  const visibleTopics = FeatureControl.getVisibleTopics('businessLaw')
  return businessTopics.filter(topic => 
    visibleTopics.includes(topic.id)
  )
})

// 可见的权利关系知识点
const visibleRightsTopics = computed(() => {
  if (currentPhase !== 'test') return rightsTopics
  
  const visibleTopics = FeatureControl.getVisibleTopics('rightsRelations')
  return rightsTopics.filter(topic => 
    visibleTopics.includes(topic.id)
  )
})

// 总可见知识点数量
const totalVisibleTopics = computed(() => {
  return visibleBusinessTopics.value.length + visibleRightsTopics.value.length
})

const filteredDomainNotes = computed(() => {
  let notes = userNotes.value.filter(note => {
    const topic = allTopics.value.find(t => t.id === note.topicId)
    return topic && topic.domain === activeDomain.value
  })

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    notes = notes.filter(note => 
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
  }

  // 排序
  if (filterSort.value === 'newest') {
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (filterSort.value === 'oldest') {
    notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } else if (filterSort.value === 'updated') {
    notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }

  return notes
})

// 方法
const getDomainNoteCount = (domainId) => {
  return userNotes.value.filter(note => {
    const topic = allTopics.value.find(t => t.id === note.topicId)
    return topic && topic.domain === domainId
  }).length
}

const getDomainProgress = (domainId) => {
  const domainTopics = allTopics.value.filter(topic => topic.domain === domainId)
  if (domainTopics.length === 0) return 0
  
  const totalProgress = domainTopics.reduce((sum, topic) => {
    return sum + (getTopicProgress(topic.id) || 0)
  }, 0)
  
  return Math.round(totalProgress / domainTopics.length)
}

const getDomainStudyTime = (domainId) => {
  const domainTopics = allTopics.value.filter(topic => topic.domain === domainId)
  const totalTime = domainTopics.reduce((sum, topic) => {
    const progress = learningStore.progress[topic.id]
    return sum + (progress?.totalStudyTime || 0)
  }, 0)
  
  return Math.round(totalTime / 3600) // 转换为小时
}

const getTopicProgress = (topicId) => {
  const progress = learningStore.progress[topicId]
  return progress?.completionPercentage || 0
}

const getActiveDomainName = () => {
  const domain = domains.find(d => d.id === activeDomain.value)
  return domain ? domain.name : ''
}

const getTopicName = (topicId) => {
  const topic = allTopics.value.find(t => t.id === topicId)
  return topic ? topic.title : '未知知识点'
}

const hasUserNotes = (topicId) => {
  return userNotes.value.some(note => note.topicId === topicId && note.userId === userStore.user?.id)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 切换领域
const switchDomain = (domainId) => {
  activeDomain.value = domainId
  activeTopic.value = ''
  activeNote.value = ''
  // 更新URL，但不触发页面刷新
  router.replace({
    query: { ...route.query, domain: domainId }
  })
}

const setActiveTopic = (topicId) => {
  activeTopic.value = topicId
  activeNote.value = ''
}

const setActiveNote = (noteId) => {
  activeNote.value = noteId
}

// 查看知识点详情
const viewTopicDetail = (topic) => {
  router.push(topic.route)
}

// 处理工具点击
const handleToolClick = (tool) => {
  if (!features[tool]) {
    router.push('/coming-soon')
    return
  }
  
  const routeMap = {
    'practice': '/practice',
    'video': '/video',
    'exam': '/exam',
    'dashboard': '/dashboard'
  }
  
  if (routeMap[tool]) {
    router.push(routeMap[tool])
  }
}

// 处理视频点击
const handleVideoClick = (topic) => {
  if (!features.video) {
    router.push('/coming-soon')
    return
  }
  // 实际项目中这里应该跳转到视频页面
  alert(`视频功能即将开放，将为您播放: ${topic.title}`)
}

// 书签功能
const toggleBookmark = (topicId) => {
  if (!userStore.isLoggedIn) {
    openLoginDialog()
    return
  }

  if (bookmarks.value.has(topicId)) {
    bookmarks.value.delete(topicId)
  } else {
    bookmarks.value.add(topicId)
  }
  
  // 更新本地数据中的书签状态
  const topic = allTopics.value.find(t => t.id === topicId)
  if (topic) {
    topic.bookmarked = !topic.bookmarked
  }
}

// 笔记功能
const createNewNote = (domainId) => {
  if (!userStore.isLoggedIn) {
    openLoginDialog()
    return
  }

  editingNote.value = {
    id: null,
    userId: userStore.user.id,
    topicId: '',
    title: '',
    content: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  showNoteEditor.value = true
}

const createNoteForTopic = (topic, event) => {
  if (event) {
    event.stopPropagation()
  }
  
  if (!userStore.isLoggedIn) {
    openLoginDialog()
    return
  }

  // 检查是否已有该知识点的笔记
  const existingNote = userNotes.value.find(note => 
    note.topicId === topic.id && note.userId === userStore.user.id
  )

  if (existingNote) {
    editNote(existingNote)
  } else {
    editingNote.value = {
      id: null,
      userId: userStore.user.id,
      topicId: topic.id,
      title: `${topic.title} - 学习笔记`,
      content: `# ${topic.title}\n\n## 知识点总结\n\n## 重点难点\n\n## 相关案例\n\n## 复习要点`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    showNoteEditor.value = true
  }
}

const editNote = (note) => {
  editingNote.value = { ...note }
  showNoteEditor.value = true
}

const saveNote = () => {
  if (!editingNote.value.title.trim()) {
    alert('请输入笔记标题')
    return
  }

  if (!editingNote.value.topicId) {
    alert('请选择关联的知识点')
    return
  }

  // 更新更新时间
  editingNote.value.updatedAt = new Date().toISOString()

  if (editingNote.value.id) {
    // 更新现有笔记
    const index = userNotes.value.findIndex(note => note.id === editingNote.value.id)
    if (index !== -1) {
      userNotes.value[index] = { ...editingNote.value }
    }
  } else {
    // 创建新笔记
    editingNote.value.id = Date.now().toString()
    editingNote.value.createdAt = new Date().toISOString()
    userNotes.value.push({ ...editingNote.value })
  }

  // 保存到本地存储
  saveNotesToLocalStorage()
  
  showNoteEditor.value = false
  editingNote.value = {}
  
  alert('笔记保存成功！')
}

const deleteNote = (noteId) => {
  if (confirm('确定要删除这条笔记吗？此操作不可恢复。')) {
    userNotes.value = userNotes.value.filter(note => note.id !== noteId)
    saveNotesToLocalStorage()
    
    if (activeNote.value === noteId) {
      activeNote.value = ''
    }
    
    alert('笔记已删除')
  }
}

const exportNote = (note) => {
  const blob = new Blob([`# ${note.title}\n\n${note.content}`], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${note.title}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 保存笔记到本地存储
const saveNotesToLocalStorage = () => {
  localStorage.setItem('user_notes', JSON.stringify(userNotes.value))
}

// 从本地存储加载笔记
const loadNotesFromLocalStorage = () => {
  const savedNotes = localStorage.getItem('user_notes')
  if (savedNotes) {
    userNotes.value = JSON.parse(savedNotes)
  }
}

// 打开登录弹窗 - 使用全局事件
const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

// 处理路由参数变化
const handleRouteChange = () => {
  const domainFromRoute = route.query.domain
  if (domainFromRoute && domains.some(d => d.id === domainFromRoute)) {
    activeDomain.value = domainFromRoute
  } else {
    // 如果没有有效的路由参数，使用默认值
    activeDomain.value = 'business'
  }
  // 重置其他状态
  activeTopic.value = ''
  activeNote.value = ''
}

// 监听路由参数变化
watch(
  () => route.query.domain,
  (newDomain) => {
    handleRouteChange()
  }
)

// 初始化
onMounted(() => {
  // 处理初始路由参数
  handleRouteChange()
  
  // 加载学习数据
  learningStore.loadFromStorage()
  
  // 加载用户笔记
  loadNotesFromLocalStorage()
  
  // 初始化书签状态
  allTopics.value.forEach(topic => {
    if (bookmarks.value.has(topic.id)) {
      topic.bookmarked = true
    }
  })
  
  console.log('笔记页面 - 当前环境:', currentPhase)
  console.log('笔记页面 - 可见领域:', visibleDomains.value.length)
  console.log('笔记页面 - 可见知识点:', totalVisibleTopics.value)
})

onUnmounted(() => {
  // 组件卸载时记录总学习时间
  // 这里可以添加学习时间记录逻辑
})
</script>

<style scoped>
/* 样式代码与之前相同，为了简洁省略重复的CSS代码 */
/* 请使用之前提供的完整CSS样式 */

/* 新增样式 */
.tool-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.coming-soon-tag {
  background: #ff6b6b;
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7em;
  margin-left: 5px;
}

.disabled-text {
  font-size: 0.8em;
  opacity: 0.7;
}

.coming-soon-domain {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  margin: 2rem 0;
}

.coming-soon-content h2 {
  font-size: 2rem;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.coming-soon-content p {
  font-size: 1.1rem;
  color: var(--muted);
  margin-bottom: 2rem;
}

.progress-section {
  margin: 2rem 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.progress-label {
  color: var(--text);
  font-weight: 500;
}

.progress-value {
  color: var(--primary);
  font-weight: bold;
}

.progress-bar {
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  border-radius: 4px;
  transition: width 0.3s ease;
}

.expected-date {
  background: var(--primary-light);
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  color: var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.debug-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 30px;
  border-left: 4px solid #28a745;
  width: 100%;
}

.debug-info h4 {
  margin: 0 0 10px 0;
  color: #28a745;
}

.debug-info p {
  margin: 5px 0;
  font-family: monospace;
}
</style>