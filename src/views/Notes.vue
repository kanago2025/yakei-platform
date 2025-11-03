<template>
  <div class="notes">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>中文笔记</h1>
          <p>专为在日华人设计的宅建士考试学习资料，用中文深度解析五大分野知识点，对应各类日文教材，助您轻松理解复杂概念</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>VIP会员可享受无限笔记存储和高级编辑功能</span>
          </div>
          
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
              v-for="domain in domains" 
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

        <!-- 笔记编辑器模态框 -->
        <div class="modal-overlay" v-if="showNoteEditor" @click="closeNoteEditor">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3>{{ editingNote.id ? '编辑笔记' : '新建笔记' }}</h3>
              <button class="close-btn" @click="closeNoteEditor">✕</button>
            </div>
            <div class="modal-body">
              <div class="note-editor">
                <div class="editor-header">
                  <input 
                    v-model="editingNote.title" 
                    type="text" 
                    placeholder="笔记标题..." 
                    class="note-title-input"
                  >
                  <select v-model="editingNote.topicId" class="topic-select">
                    <option value="">选择知识点...</option>
                    <option 
                      v-for="topic in allTopics" 
                      :key="topic.id" 
                      :value="topic.id"
                    >
                      {{ getDomainDisplayName(topic.domain) }} - {{ topic.title }}
                    </option>
                  </select>
                </div>
                <textarea 
                  v-model="editingNote.content" 
                  placeholder="开始记录您的学习笔记..." 
                  class="note-content-input"
                  rows="12"
                ></textarea>
                <div class="editor-actions">
                  <button class="btn btn-outline" @click="closeNoteEditor">取消</button>
                  <button class="btn btn-primary" @click="saveNote">保存笔记</button>
                </div>
              </div>
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
                  v-for="topic in businessTopics" 
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
                    <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
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
          v-for="topic in rightsTopics" 
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
            <router-link :to="`/video?topic=${topic.videoId}`" class="btn btn-outline">观看视频</router-link>
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

        <!-- 其他领域的内容结构类似，为了简洁省略重复代码 -->
        <!-- 权利关系、法令制限、税・価格、5問免除等部分的结构与宅建业法相同 -->
        
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
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useLearningStore } from '@/stores/learning'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const learningStore = useLearningStore()
const router = useRouter()
const route = useRoute()


const mobileMenuOpen = ref(false)
const activeDomain = ref('business')
const activeTopic = ref('')
const activeNote = ref('')
const searchQuery = ref('')
const filterSort = ref('newest')
const showNoteEditor = ref(false)
const editingNote = ref({})
const bookmarks = ref(new Set())

// 五大分野数据 - 使用英文标识符
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

// 知识点数据 - 使用英文标识符作为domain
const businessTopics = [
  {
    id: 'business_meaning',
    title: '宅建业的含义',
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
    id: 'office_requirements',
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
    id: 'compensation_deposit',  // 修改为唯一ID
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
    id: 'mediation',  // 修改为唯一ID
    title: '媒介与代理',
    description: '媒介与代理的定义及类型、业务处理要求与媒介契约书面',
    icon: '💰',
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
    id: 'advertising_regulation',  // 修改为唯一ID
    title: '广告规制',
    description: '广告的明示、广告的开始时期、广告的禁止与罚则',
    icon: '💰',
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
    id: 'license_requirements',
    title: '免许',
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
    id: 'important_matters',
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
    id: '37document',
    title: '37条书面',
    description: '37条书面的义务与交付、记载事项、与重要事项说明的区别',
    icon: '📋',
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
    id: 'seller_restrictions',
    title: '自己卖主的制限',
    description: '自己作为卖主的制限内容、cooling-off适用的场合、方法、效果等',
    icon: '📋',
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
    id: 'housing_defectwarranty',
    title: '住宅瑕疵担保履行法',
    description: '住宅瑕疵担保履行法适用的范围、资力确保措施与要求等',
    icon: '📋',
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
    id: 'compensation_limit',
    title: '报酬额的制限',
    description: '媒介与代理报酬额的制限、计算方法、报酬额的差异、空家的特例',
    icon: '📋',
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
    id: 'supervision_penalty',
    title: '监督与罚则',
    description: '宅建业者与宅建取引士的监督处分体系、监督处分的类别与要求',
    icon: '📋',
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
    id: 'other_businessregulations',
    title: '其他业务上的规制',
    description: '供托所相关说明义务的内容和时机、业务上各种禁止行为的具体内容等',
    icon: '📋',
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
    id: 'outside_office',
    title: '事务所以外场所的规制',
    description: '事务所以外场所的定义和分类、案内所与现地的标识设置要求等',
    icon: '📋',
    points: 10,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'outside-office',
    isNew: true,
    bookmarked: false,
    domain: 'business'
  },
]

const rightsTopics = [
  {
    id: 'declaration_ofintent',
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
    id: 'limited_capacitypersons',
    title: '制限行為能力者',
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
    icon: '👥',
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
    id: 'debt_performance',
    title: '债务不履行与弁济',
    description: '债务不履行的基本概念和三种类型、弁济（清偿）的各种方式和要求',
    icon: '🤝',
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
    id: 'contract_inappropriateness',
    title: '契约不适合责任',
    description: '契约不适合责任的基本概念、类型、救济手段及条件',
    icon: '🤝',
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
    id: 'succession',
    title: '相続',
    description: '继承、遗留分的概念、继承的承认、放弃和限定承认的区别、配偶者居住权等',
    icon: '🤝',
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
    id: 'property_change',
    title: '物权变动',
    description: '物权变动的概念、对抗要件和效力、对抗第三人的规则',
    icon: '🤝',
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
    id: 'real_estateregistration',
    title: '不动产登记法',
    description: '不动产登记的概念、登记的目的、效力和要件，表题部和权利部的区别等',
    icon: '🤝',
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
    id: 'mortgage',
    title: '抵当权',
    description: '抵当权的定义、设定、登记和对抗要件，抵当权的效力范围及优先弁済规则等',
    icon: '🤝',
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
    id: 'guarantee_andjointdebt',
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
    id: 'co_ownership',
    title: '共有',
    description: '共有的概念，持分的定义、推定规则和处分方式，共有物的管理、变更行为分类和决策机制等',
    icon: '🤝',
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
    id: 'condominium_ownership',
    title: '建物区分所有法',
    description: '区分所有权的概念，管理组合、管理者和集会的运作机制，规约的设定、变更和法律效力等',
    icon: '🤝',
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
    icon: '🤝',
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
    id: 'land_andhouserental',
    title: '借地借家法（借家）',
    description: '借地借家法的适用范围，普通建物赁贷借与定期建物赁贷借的区别、契约更新、终止的法律规则等',
    icon: '🤝',
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
    id: 'land_lease',
    title: '借地借家法（借家地）',
    description: '借地权的概念，普通借地权的存续期间和更新规则，借地权的对抗要件和建物买取请求权等',
    icon: '🤝',
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
    icon: '🤝',
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
    id: 'contract_work',
    title: '请负',
    description: '请负的概念，请负人的担保责任、担保责任的期间限制和特约效力等',
    icon: '🤝',
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
    id: 'assignment_ofclaim',
    title: '债权让渡',
    description: '债权让渡的概念，债权让渡的对抗要件和效力、二重让渡的处理规则等',
    icon: '🤝',
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
    id: 'adjacent_relations',
    title: '相邻关系',
    description: '相邻关系的概念，邻地使用权、土地通行权的行使条件和限制等',
    icon: '🤝',
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
    id: 'risk_burden',
    title: '危险负担',
    description: '危险负担的概念，危险负担的转移时间点，履行迟滞期间的危险负担特殊规则等',
    icon: '🤝',
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
    id: 'payment_andsetoff',
    title: '弁济和相杀',
    description: '弁济、相杀的概念，弁济（还债）的提供、充当和代位的法律规定，相杀（抵消）的成立条件和法律效力等',
    icon: '🤝',
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
    id: 'other_importantmatters',
    title: '其他重要事项',
    description: '事务管理、赠与、委任、使用借贷、地役权的概念、成立要件和法律效果等',
    icon: '🤝',
    points: 8,
    duration: '30分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'rights-otherimportantmatters',
    isNew: false,
    bookmarked: false,
    domain: 'rights'
  },
]

const regulationsTopics = [
  {
    id: 'land_building',
    title: '都市计划法',
    description: '都市计划区域、用途地域、开发许可等都市计划相关制度',
    icon: '🏙️',
    points: 32,
    duration: '50分钟',
    difficulty: 'key',
    badgeText: '重点',
    videoId: 'regulations-urban',
    isNew: true,
    bookmarked: false,
    domain: 'regulations'
  },
  {
    id: 'regulations_building',
    title: '建筑基准法',
    description: '建筑确认、建筑面积、容积率、建筑高度等建筑规制',
    icon: '🏗️',
    points: 28,
    duration: '45分钟',
    difficulty: 'important',
    badgeText: '重要',
    videoId: 'regulations-building',
    isNew: false,
    bookmarked: false,
    domain: 'regulations'
  }
]

const taxTopics = [
  {
    id: 'tax_system',
    title: '不动产取得税',
    description: '课税标准、税率、减免制度、纳税期限等不动产取得相关税务知识',
    icon: '💰',
    points: 20,
    duration: '35分钟',
    difficulty: 'key',
    badgeText: '重点',
    videoId: 'tax-acquisition',
    isNew: true,
    bookmarked: false,
    domain: 'tax'
  },
  {
    id: 'tax_fixed',
    title: '固定资产税',
    description: '课税对象、评估标准、税率计算、减免措施等固定资产税相关知识',
    icon: '🏠',
    points: 15,
    duration: '25分钟',
    difficulty: 'basic',
    badgeText: '基础',
    videoId: 'tax-fixed-asset',
    isNew: false,
    bookmarked: false,
    domain: 'tax'
  }
]

const exemptTopics = [
  {
    id: 'registration',
    title: '住宅金融支援机构法',
    description: '机构业务内容、融资制度、保证业务等住宅金融支援相关法律知识',
    icon: '🏦',
    points: 18,
    duration: '30分钟',
    difficulty: 'exempt',
    badgeText: '免除',
    videoId: 'exempt-finance',
    isNew: true,
    bookmarked: false,
    domain: 'exempt'
  },
  {
    id: 'exempt_market',
    title: '需给统计与市场分析',
    description: '住宅需给统计、市场动向分析、价格变动因素等市场相关知识',
    icon: '📊',
    points: 12,
    duration: '20分钟',
    difficulty: 'exempt',
    badgeText: '免除',
    videoId: 'exempt-market',
    isNew: false,
    bookmarked: false,
    domain: 'exempt'
  }
]

// 用户笔记数据 - 对齐项目圣经的user_notes表结构
const userNotes = ref([])

// 计算属性
const totalTopics = computed(() => {
  return rightsTopics.length + businessTopics.length + regulationsTopics.length + 
         taxTopics.length + exemptTopics.length
})

const totalNotes = computed(() => {
  return userNotes.value.length
})

const overallProgress = computed(() => {
  return learningStore.overallProgress
})

const allTopics = computed(() => {
  return [
    ...businessTopics,
    ...rightsTopics,
    ...regulationsTopics,
    ...taxTopics,
    ...exemptTopics
  ]
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

const getDomainDisplayName = (domainId) => {
  const domain = domains.find(d => d.id === domainId)
  return domain ? domain.name : domainId
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

// 查看知识点详情 - 更新路由映射
const viewTopicDetail = (topic) => {
  // 根据知识点ID跳转到对应的详情页面
  const routeMap = {
    // 宅建业法知识点路由映射
    'business_meaning': '/notes/business/business-meaning',
    'office_requirements': '/notes/business/office-requirements',
    'agent': '/notes/business/agent',
    'deposit': '/notes/business/deposit',
    'compensation_deposit': '/notes/business/compensationdeposit',
    'mediation': '/notes/business/mediation',
    'advertising_regulation': '/notes/business/advertising-regulation',
    'license_requirements': '/notes/business/license-requirements',
    'important_matters': '/notes/business/important-matters',
    '37document': '/notes/business/37-document',
    'seller_restrictions': '/notes/business/seller-restrictions',
    'housing_defectwarranty': '/notes/business/housing-defectwarranty',
    'compensation_limit': '/notes/business/compensation-limit',
    'supervision_penalty': '/notes/business/supervision-penalty',
    'other_businessregulations': '/notes/business/other-businessregulations',
    'outside_office': '/notes/business/outside-office',

    // 权利关系知识点路由映射
    'limited_capacitypersons': '/notes/rights/limited-capacity-persons',
    'declaration_ofintent': '/notes/rights/declaration-of-intent',
    'prescription': '/notes/rights/prescription',
    'agency': '/notes/rights/agency',
    'debt_performance': '/notes/rights/debt-performance',
    'contract_inappropriateness': '/notes/rights/contract-inappropriateness',
    'succession': '/notes/rights/succession',
    'property_change': '/notes/rights/property-change',
    'real_estateregistration': '/notes/rights/real-estate-registration',
    'mortgage': '/notes/rights/mortgage',
    'guarantee_andjointdebt': '/notes/rights/guarantee-and-joint-debt',
    'co_ownership': '/notes/rights/co-ownership',
    'condominium_ownership': '/notes/rights/condominium-ownership',
    'lease': '/notes/rights/lease',
    'land_andhouserental': '/notes/rights/land-and-house-rental',
    'land_lease': '/notes/rights/land-lease',
    'tort': '/notes/rights/tort',
    'contract_work': '/notes/rights/contract-work',
    'assignment_ofclaim': '/notes/rights/assignment-of-claim',
    'adjacent_relations': '/notes/rights/adjacent-relations',
    'risk_burden': '/notes/rights/risk-burden',
    'payment_andsetoff': '/notes/rights/payment-and-setoff',
    'other_importantmatters': '/notes/rights/other-important-matters',

    // 法令制限知识点路由映射
    'land_building': '/notes/regulations/land-building',
    'regulations_building': '/notes/regulations/building',
    
    // 税・価格知识点路由映射
    'tax_system': '/notes/tax/system',
    'tax_fixed': '/notes/tax/fixed',
    
    // 5問免除知识点路由映射
    'registration': '/notes/exempt/registration',
    'exempt_market': '/notes/exempt/market'
  }
  
  if (routeMap[topic.id]) {
    router.push(routeMap[topic.id])
  } else {
    // 如果没有专门的路由，使用通用知识点页面
    router.push(`/notes/topic/${topic.id}`)
  }
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

// 笔记功能 - 对齐项目圣经的user_notes表结构
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

const closeNoteEditor = () => {
  showNoteEditor.value = false
  editingNote.value = {}
}

// 保存笔记到本地存储 - 对齐项目圣经的表名
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

const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
  
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
.notes {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 20px;
}

/* === 修复容器居中问题 === */
.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
  width: 100%;
  box-sizing: border-box;
}

/* 确保所有主要部分都有适当的间距 */
.page-header,
.quick-nav,
.main-content,
.cta-section {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
  width: 100%;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
  max-width: 700px;
  margin: 0 auto 2rem;
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
  gap: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 快速导航 ========= */
.quick-nav {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
}

.nav-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.domain-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.domain-btn {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: none;
  font-family: inherit;
}

.domain-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
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
  gap: 0.75rem;
}

.tool-btn {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.tool-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.tool-icon {
  font-size: 20px;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 3rem 0;
  width: 100%;
}

/* ========= 笔记控制 ========= */
.notes-controls {
  margin-bottom: 2rem;
  width: 100%;
}

.search-section {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: var(--card-bg);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(42, 121, 96, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 140px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

/* ========= 模态框样式 ========= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--muted);
  padding: 0.25rem;
  border-radius: 4px;
}

.close-btn:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.modal-body {
  padding: 1.5rem;
  max-height: calc(90vh - 120px);
  overflow-y: auto;
}

.note-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.editor-header {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.note-title-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
}

.note-title-input:focus {
  outline: none;
  border-color: var(--primary);
}

.topic-select {
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 0.875rem;
}

.topic-select:focus {
  outline: none;
  border-color: var(--primary);
}

.note-content-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
}

.note-content-input:focus {
  outline: none;
  border-color: var(--primary);
}

.editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

/* ========= 领域头部 ========= */
.domain-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
  width: 100%;
}

.header-main {
  flex: 1;
}

.header-main h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.header-main p {
  color: var(--muted);
  max-width: 600px;
  line-height: 1.6;
}

.header-actions {
  flex-shrink: 0;
}

/* ========= 笔记统计 ========= */
.notes-stats {
  margin-bottom: 2rem;
  width: 100%;
}

.stats-card {
  display: flex;
  gap: 2rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  flex-wrap: wrap;
  width: 100%;
}

.stats-card .stat {
  text-align: center;
  flex: 1;
  min-width: 100px;
}

.stats-card .stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stats-card .stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 内容布局 - 全宽版本 ========= */
.content-layout-full {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

/* ========= 知识点区域 - 全宽版本 ========= */
.knowledge-section-full {
  width: 100%;
}

.knowledge-section-full h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.knowledge-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
  cursor: pointer;
}

.knowledge-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.knowledge-card.active {
  border-color: var(--primary);
  background: var(--primary-light);
}

.knowledge-card.has-notes::after {
  content: "📝";
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 14px;
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

.card-actions {
  display: flex;
  gap: 8px;
}

.btn {
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  flex: 1;
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

/* ========= 用户笔记区域 - 全宽版本 ========= */
.user-notes-section-full {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  width: 100%;
}

.user-notes-section-full .section-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.user-notes-section-full .section-header p {
  color: var(--muted);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
}

.note-card {
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
  cursor: pointer;
}

.note-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.note-card.active {
  border-color: var(--primary);
  background: var(--primary-light);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.note-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
  line-height: 1.4;
}

.note-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--primary-light);
}

.note-content-preview {
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.note-actions-full {
  display: flex;
  gap: 0.5rem;
}

.note-actions-full .btn {
  flex: 1;
  padding: 6px 12px;
  font-size: 0.75rem;
}

.empty-notes {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--muted);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-notes h4 {
  font-size: 1.125rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.empty-notes p {
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

/* ========= 登录提示 ========= */
.login-prompt {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 2rem;
  text-align: center;
  border: 1px solid var(--border);
  width: 100%;
}

.prompt-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

.prompt-content p {
  color: var(--muted);
  margin-bottom: 1.25rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* ========= 底部行动号召 ========= */
.cta-section {
  text-align: center;
  padding: 3rem 0;
  margin: 4rem 0 3rem;
  width: 100%;
}

.cta-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
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

/* ========= 响应式设计 ========= */
@media (max-width: 1200px) {
  .knowledge-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--container-padding, 1.5rem);
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .header-content p {
    font-size: 1rem;
  }
  
  .domain-header {
    flex-direction: column;
    gap: 1rem;
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
  
  .search-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .editor-header {
    flex-direction: column;
  }
  
  .note-title-input, .topic-select {
    min-width: auto;
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
  
  .stats-card {
    flex-direction: column;
    gap: 1rem;
  }
  
  .container {
    padding: 0 var(--container-padding, 1rem);
  }
}

@media (max-width: 480px) {
  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .note-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .note-actions-full {
    flex-direction: column;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>