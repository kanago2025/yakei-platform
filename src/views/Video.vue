<!-- src/views/Video.vue -->
<template>
  <div class="video">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>视频学习</h1>
          <p>专业视频讲解，轻松掌握考点，配合图文笔记和强化练习，建立完整的知识体系</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>VIP会员可享受高清视频和无广告体验</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ totalVideos }}</span>
              <span class="stat-label">视频课程</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalDuration }}h</span>
              <span class="stat-label">总时长</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ completedVideos }}</span>
              <span class="stat-label">已完成</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ overallProgress }}%</span>
              <span class="stat-label">总进度</span>
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
              <span class="domain-count">{{ getDomainVideoCount(domain.id) }}个视频</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>学习工具</h3>
          <div class="tool-buttons">
            <router-link to="/notes" class="tool-btn">
              <span class="tool-icon">📚</span>
              <span>中文笔记</span>
            </router-link>
            <router-link to="/practice" class="tool-btn">
              <span class="tool-icon">🎯</span>
              <span>强化练习</span>
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
        <!-- 视频播放区域 -->
        <div class="video-section">
          <div class="section-header">
            <h2>{{ getActiveDomainName() }}视频课程</h2>
            <p>选择视频开始学习，系统化掌握知识点</p>
            <div class="section-progress">
              <div class="progress-info">
                <span>学习进度</span>
                <span>{{ getDomainProgress(activeDomain) }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getDomainProgress(activeDomain) + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- 视频播放器 -->
          <div class="video-player-container">
            <div class="video-player" v-if="!currentVideo.src">
              <div class="video-placeholder">
                <div class="placeholder-content">
                  <div class="placeholder-icon">📺</div>
                  <h3>选择视频开始学习</h3>
                  <p>从视频列表中选择一个视频课程开始您的学习之旅</p>
                  <div class="placeholder-features">
                    <div class="feature-item">
                      <span class="feature-icon">🎯</span>
                      <span>专业讲解</span>
                    </div>
                    <div class="feature-item">
                      <span class="feature-icon">📝</span>
                      <span>配套笔记</span>
                    </div>
                    <div class="feature-item">
                      <span class="feature-icon">⏱️</span>
                      <span>进度跟踪</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="video-player" v-else>
              <!-- 视频头部信息 -->
              <div class="video-header">
                <div class="video-title-section">
                  <h2 class="video-title">{{ currentVideo.title }}</h2>
                  <div class="video-tags">
                    <span class="video-tag" :class="currentVideo.difficultyClass">{{ currentVideo.level }}</span>
                    <span class="video-tag domain">{{ currentVideo.domain }}</span>
                    <span class="video-tag duration">⏱️ {{ currentVideo.duration }}</span>
                  </div>
                </div>
                <div class="video-actions">
                  <button 
                    class="action-btn" 
                    :class="{ active: currentVideo.bookmarked }"
                    @click="toggleBookmark(currentVideo)"
                  >
                    <span class="btn-icon">{{ currentVideo.bookmarked ? '★' : '☆' }}</span>
                    <span class="btn-text">{{ currentVideo.bookmarked ? '已收藏' : '收藏' }}</span>
                  </button>
                </div>
              </div>

              <!-- 视频播放器 -->
              <div class="video-wrapper">
                <div class="video-player-main">
                  <video 
                    :key="currentVideo.id"
                    ref="videoPlayer"
                    controls 
                    class="video-element"
                    @play="onVideoPlay"
                    @pause="onVideoPause"
                    @ended="onVideoEnded"
                    @timeupdate="onTimeUpdate"
                    @loadedmetadata="onVideoLoaded"
                    preload="metadata"
                  >
                    <source :src="getVideoUrl(currentVideo.src)" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                  <div class="video-overlay" v-if="!videoPlaying && currentVideo.lastPosition === 0">
                    <button class="play-button" @click="playVideo">
                      <span class="play-icon">▶</span>
                    </button>
                  </div>
                  <div class="resume-overlay" v-if="!videoPlaying && currentVideo.lastPosition > 0">
                    <div class="resume-content">
                      <p>上次观看到 {{ formatTime(currentVideo.lastPosition) }}</p>
                      <button class="btn btn-primary" @click="playVideo">
                        ▶ 继续观看
                      </button>
                      <button class="btn btn-outline" @click="restartVideo">
                        ↺ 重新开始
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 学习进度控制 -->
              <div class="learning-progress">
                <div class="progress-header">
                  <h4>学习进度</h4>
                  <span class="progress-percent">{{ currentVideoProgress }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: currentVideoProgress + '%' }"
                  ></div>
                </div>
                <div class="progress-stats">
                  <span class="stat">已观看: {{ formatTime(currentVideo.totalWatchDuration) }}</span>
                  <span class="stat">最后位置: {{ formatTime(currentVideo.lastPosition) }}</span>
                  <span class="stat" v-if="currentVideo.completed">✅ 已完成</span>
                </div>
              </div>

              <!-- 行动按钮 -->
              <div class="action-section">
                <div class="action-buttons">
                  <router-link 
                    :to="currentVideo.notesLink" 
                    class="btn btn-primary"
                    v-if="currentVideo.notesLink"
                  >
                    <span class="btn-icon">📚</span>
                    <span class="btn-text">查看对应笔记</span>
                  </router-link>
                  <router-link 
                    :to="`/practice?video=${currentVideo.id}`" 
                    class="btn btn-secondary"
                    :class="{ disabled: !currentVideo.completed }"
                  >
                    <span class="btn-icon">🎯</span>
                    <span class="btn-text">{{ currentVideo.completed ? '开始练习' : '先完成观看' }}</span>
                  </router-link>
                  <button class="btn btn-outline" @click="continueToNext">
                    <span class="btn-icon">⏭️</span>
                    <span class="btn-text">下一个视频</span>
                  </button>
                </div>
              </div>

              <!-- 视频内容详情 -->
              <div class="video-details">
                <div class="detail-tabs">
                  <button 
                    class="tab-btn" 
                    :class="{ active: activeTab === 'description' }"
                    @click="activeTab = 'description'"
                  >
                    视频简介
                  </button>
                  <button 
                    class="tab-btn" 
                    :class="{ active: activeTab === 'points' }"
                    @click="activeTab = 'points'"
                  >
                    知识点
                  </button>
                  <button 
                    class="tab-btn" 
                    :class="{ active: activeTab === 'resources' }"
                    @click="activeTab = 'resources'"
                  >
                    学习资源
                  </button>
                </div>

                <div class="tab-content">
                  <!-- 视频描述 -->
                  <div v-if="activeTab === 'description'" class="tab-panel">
                    <div class="description-content">
                      <h3>课程内容</h3>
                      <p>{{ currentVideo.description }}</p>
                      <div class="learning-objectives" v-if="currentVideo.objectives">
                        <h4>学习目标</h4>
                        <ul>
                          <li v-for="(objective, index) in currentVideo.objectives" :key="index">
                            {{ objective }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- 相关知识点 -->
                  <div v-if="activeTab === 'points'" class="tab-panel">
                    <div class="knowledge-points">
                      <h3>核心知识点</h3>
                      <div class="points-grid">
                        <div 
                          v-for="point in currentVideo.relatedPoints" 
                          :key="point.id"
                          class="knowledge-card"
                        >
                          <div class="card-header">
                            <span class="point-icon">{{ point.icon }}</span>
                            <h4>{{ point.name }}</h4>
                          </div>
                          <p class="point-desc" v-if="point.description">{{ point.description }}</p>
                          <router-link 
                            :to="point.link" 
                            class="point-link"
                          >
                            查看详情 →
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 学习资源 -->
                  <div v-if="activeTab === 'resources'" class="tab-panel">
                    <div class="resources-section">
                      <h3>配套学习资源</h3>
                      <div class="resources-grid">
                        <router-link :to="currentVideo.notesLink" class="resource-card">
                          <span class="resource-icon">📝</span>
                          <div class="resource-content">
                            <h4>中文笔记</h4>
                            <p>本视频对应的详细文字笔记</p>
                          </div>
                        </router-link>
                        <router-link to="/practice" class="resource-card">
                          <span class="resource-icon">🎯</span>
                          <div class="resource-content">
                            <h4>强化练习</h4>
                            <p>巩固本视频知识点的练习题</p>
                          </div>
                        </router-link>
                        <router-link to="/exam" class="resource-card">
                          <span class="resource-icon">📊</span>
                          <div class="resource-content">
                            <h4>真题模拟</h4>
                            <p>包含相关考点的历年真题</p>
                          </div>
                        </router-link>
                        <a href="#" class="resource-card" @click.prevent="downloadMaterials">
                          <span class="resource-icon">📥</span>
                          <div class="resource-content">
                            <h4>下载资料</h4>
                            <p>视频讲义和相关资料下载</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 视频列表 -->
          <div class="video-list-section">
            <div class="section-header">
              <h3>视频课程列表</h3>
              <div class="list-controls">
                <div class="search-box">
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="搜索视频课程..." 
                    class="search-input"
                  >
                  <span class="search-icon">🔍</span>
                </div>
                <div class="filter-options">
                  <select v-model="filterStatus" class="filter-select">
                    <option value="all">全部视频</option>
                    <option value="in-progress">进行中</option>
                    <option value="completed">已完成</option>
                    <option value="bookmarked">已收藏</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="video-grid">
              <div 
                v-for="video in filteredVideos" 
                :key="video.id"
                class="video-card"
                :class="{
                  'active': currentVideo.id === video.id,
                  'completed': video.completed,
                  'in-progress': video.totalWatchDuration > 0 && !video.completed,
                  'new': video.isNew
                }"
                @click="selectVideo(video)"
              >
                <div class="card-header">
                  <div class="video-badges">
                    <span v-if="video.isNew" class="badge new">新</span>
                    <span class="badge level" :class="video.difficultyClass">{{ video.level }}</span>
                    <span v-if="video.bookmarked" class="badge bookmarked">⭐</span>
                  </div>
                  <div class="video-actions">
                    <button 
                      class="bookmark-btn"
                      :class="{ bookmarked: video.bookmarked }"
                      @click.stop="toggleBookmark(video)"
                    >
                      {{ video.bookmarked ? '★' : '☆' }}
                    </button>
                  </div>
                </div>

                <div class="card-content">
                  <div class="video-icon">{{ getVideoIcon(video) }}</div>
                  <h3 class="video-title">{{ video.title }}</h3>
                  <p class="video-desc">{{ video.description }}</p>
                  
                  <div class="video-meta">
                    <span class="meta-item">
                      <span class="meta-icon">⏱️</span>
                      {{ video.duration }}
                    </span>
                    <span class="meta-item">
                      <span class="meta-icon">📅</span>
                      {{ video.updateDate }}
                    </span>
                  </div>
                  
                  <!-- 对齐项目圣经的video_watch_logs字段 -->
                  <div class="video-progress" v-if="video.totalWatchDuration > 0">
                    <div class="progress-text">
                      <span>学习进度</span>
                      <span>{{ Math.round((video.lastPosition / video.totalDuration) * 100) }}%</span>
                    </div>
                    <div class="progress-bar">
                      <div 
                        class="progress-fill" 
                        :style="{ width: Math.round((video.lastPosition / video.totalDuration) * 100) + '%' }"
                      ></div>
                    </div>
                    <div class="watch-stats">
                      <span class="watch-stat">已观看: {{ formatTime(video.totalWatchDuration) }}</span>
                      <span class="watch-stat" v-if="video.completed">✅ 已完成</span>
                    </div>
                  </div>
                </div>

                <div class="card-actions">
                  <button 
                    class="btn btn-primary"
                    @click.stop="selectVideo(video)"
                  >
                    {{ getVideoActionText(video) }}
                  </button>
                  <router-link 
                    :to="video.notesLink" 
                    class="btn btn-outline"
                    v-if="video.notesLink"
                  >
                    查看笔记
                  </router-link>
                </div>
              </div>
            </div>

            <div v-if="filteredVideos.length === 0" class="no-videos">
              <div class="no-videos-icon">🎬</div>
              <h3>暂无相关视频</h3>
              <p>请尝试调整搜索条件或选择其他领域</p>
            </div>
          </div>
        </div>

        <!-- 学习统计 -->
        <section class="stats-section" v-if="userStore.isLoggedIn">
          <div class="section-header">
            <h2>学习统计</h2>
            <p>跟踪您的学习进度和成就</p>
          </div>

          <div class="stats-grid">
            <div class="stats-card">
              <h3>总体统计</h3>
              <div class="stats-content">
                <div class="stat-item">
                  <div class="stat-value">{{ learningStats.days }}</div>
                  <div class="stat-label">学习天数</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ Math.round(totalWatchDuration / 3600) }}h</div>
                  <div class="stat-label">总学习时长</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ completedVideos }}/{{ totalVideos }}</div>
                  <div class="stat-label">完成视频</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ bookmarkedVideos }}</div>
                  <div class="stat-label">收藏视频</div>
                </div>
              </div>
            </div>

            <div class="stats-card">
              <h3>领域进度</h3>
              <div class="domain-progress">
                <div 
                  v-for="domain in domainStats" 
                  :key="domain.id"
                  class="domain-item"
                >
                  <div class="domain-info">
                    <span class="domain-name">{{ domain.name }}</span>
                    <span class="domain-score">{{ domain.score }}%</span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: domain.score + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 未登录提示 -->
        <section v-if="!userStore.isLoggedIn" class="login-prompt">
          <div class="prompt-content">
            <h3>登录以保存学习记录</h3>
            <p>登录后可以保存您的学习进度、收藏喜欢的视频，并获得个性化学习建议</p>
            <button class="btn btn-primary" @click="openLoginDialog">立即登录</button>
          </div>
        </section>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>系统化学习，高效掌握知识点</h2>
          <p>通过专业视频讲解和深度解析，配合中文笔记和强化练习，快速建立完整的知识体系</p>
          <div class="cta-buttons">
            <router-link to="/notes" class="btn btn-primary">查看中文笔记</router-link>
            <router-link to="/practice" class="btn btn-secondary">开始强化练习</router-link>
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
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const learningStore = useLearningStore()
const router = useRouter()

const mobileMenuOpen = ref(false)
const activeDomain = ref('all')
const currentVideo = ref({})
const videoPlayer = ref(null)
const videoPlaying = ref(false)
const activeTab = ref('description')
const searchQuery = ref('')
const filterStatus = ref('all')
const videoDuration = ref(0)

// 五大分野数据
const domains = [
  { 
    id: 'all', 
    name: '全部视频', 
    icon: '🎬'
  },
  { 
    id: 'rights', 
    name: '权利关系', 
    icon: '⚖️'
  },
  { 
    id: 'business', 
    name: '宅建业法', 
    icon: '🏢'
  },
  { 
    id: 'regulations', 
    name: '法令制限', 
    icon: '📏'
  },
  { 
    id: 'tax', 
    name: '税・価格', 
    icon: '💰'
  },
  { 
    id: 'exempt', 
    name: '五问免除', 
    icon: '✅'
  }
]

// 视频数据 - 对齐项目圣经的video_watch_logs表结构
const videos = ref([
  {
    id: 'rights-1',
    title: '意思表示详解',
    src: 'intent-expression.mp4',
    duration: '15:30',
    totalDuration: 930, // 秒数
    level: '基础',
    difficultyClass: 'basic',
    domain: '权利关系',
    updateDate: '2024-01-15',
    description: '深度解析意思表示的法律概念、构成要件和实际应用，帮助理解法律行为的基础',
    notesLink: '/notes/rights/intent',
    // 对齐项目圣经的video_watch_logs字段
    totalWatchDuration: 450, // 总观看秒数
    lastPosition: 420, // 最后观看位置（秒）
    completed: false,
    bookmarked: true,
    isNew: true,
    objectives: [
      '理解意思表示的基本概念',
      '掌握意思表示的构成要件',
      '熟悉意思表示的法律效果',
      '了解实务中的常见问题'
    ],
    relatedPoints: [
      { 
        id: 'p1', 
        name: '意思表示要件', 
        icon: '📝', 
        link: '/notes/rights/intent-requirements',
        description: '意思表示的有效要件和无效情形'
      },
      { 
        id: 'p2', 
        name: '法律行为', 
        icon: '⚖️', 
        link: '/notes/rights/legal-acts',
        description: '法律行为的分类和效力'
      }
    ]
  },
  {
    id: 'rights-2',
    title: '代理制度全解析',
    src: 'agency-system.mp4',
    duration: '18:45',
    totalDuration: 1125, // 秒数
    level: '中级',
    difficultyClass: 'medium',
    domain: '权利关系',
    updateDate: '2024-01-10',
    description: '全面讲解代理权的授予、表见代理、无权代理等代理相关法律制度',
    notesLink: '/notes/rights/agency',
    // 对齐项目圣经的video_watch_logs字段
    totalWatchDuration: 680, // 总观看秒数
    lastPosition: 680, // 最后观看位置（秒）
    completed: false,
    bookmarked: false,
    isNew: false,
    objectives: [
      '掌握代理权的授予方式',
      '理解表见代理的构成要件',
      '熟悉无权代理的法律后果',
      '了解代理制度的实务应用'
    ],
    relatedPoints: [
      { 
        id: 'p3', 
        name: '代理权授予', 
        icon: '📋', 
        link: '/notes/rights/agency-authorization',
        description: '代理权的授予方式和范围限制'
      },
      { 
        id: 'p4', 
        name: '表见代理', 
        icon: '👥', 
        link: '/notes/rights/apparent-agency',
        description: '表见代理的认定标准和法律效果'
      }
    ]
  },
  {
    id: 'business-1',
    title: '重要事项说明完全攻略',
    src: 'important-matters.mp4',
    duration: '22:15',
    totalDuration: 1335, // 秒数
    level: '重要',
    difficultyClass: 'important',
    domain: '宅建业法',
    updateDate: '2024-01-20',
    description: '详细讲解重要事项说明的法律要求、实务操作要点和常见问题处理',
    notesLink: '/notes/business/explanation',
    // 对齐项目圣经的video_watch_logs字段
    totalWatchDuration: 1335, // 总观看秒数
    lastPosition: 1335, // 最后观看位置（秒）
    completed: true,
    bookmarked: true,
    isNew: true,
    objectives: [
      '掌握重要事项说明的法定内容',
      '了解说明义务的履行要求',
      '熟悉书面文件的制作规范',
      '掌握实务中的注意事项'
    ],
    relatedPoints: [
      { 
        id: 'p5', 
        name: '说明义务', 
        icon: '📢', 
        link: '/notes/business/explanation-duty',
        description: '宅建士的说明义务范围和履行要求'
      },
      { 
        id: 'p6', 
        name: '书面文件', 
        icon: '📄', 
        link: '/notes/business/written-documents',
        description: '重要事项说明书的制作要求和内容规范'
      }
    ]
  },
  {
    id: 'business-2',
    title: '媒介契约实务指南',
    src: 'media-contract.mp4',
    duration: '16:20',
    totalDuration: 980, // 秒数
    level: '中级',
    difficultyClass: 'medium',
    domain: '宅建业法',
    updateDate: '2024-01-18',
    description: '解析媒介契约的种类、要件和实务操作中的注意事项',
    notesLink: '/notes/business/contract',
    // 对齐项目圣经的video_watch_logs字段
    totalWatchDuration: 0, // 总观看秒数
    lastPosition: 0, // 最后观看位置（秒）
    completed: false,
    bookmarked: false,
    isNew: false,
    objectives: [
      '了解媒介契约的种类',
      '掌握各类契约的要件',
      '熟悉报告义务的履行',
      '了解实务中的风险点'
    ],
    relatedPoints: [
      { 
        id: 'p7', 
        name: '契约类型', 
        icon: '📝', 
        link: '/notes/business/contract-types',
        description: '专属专任媒介与一般媒介的区别'
      },
      { 
        id: 'p8', 
        name: '报告义务', 
        icon: '📊', 
        link: '/notes/business/report-duty',
        description: '媒介契约中的报告义务和履行要求'
      }
    ]
  },
  {
    id: 'regulations-1',
    title: '都市计划法详解',
    src: 'urban-planning-law.mp4',
    duration: '25:10',
    totalDuration: 1510, // 秒数
    level: '重点',
    difficultyClass: 'key',
    domain: '法令制限',
    updateDate: '2024-01-22',
    description: '深入解析都市计划区域、用途地域、开发许可等都市计划相关制度',
    notesLink: '/notes/regulations/urban',
    // 对齐项目圣经的video_watch_logs字段
    totalWatchDuration: 300, // 总观看秒数
    lastPosition: 300, // 最后观看位置（秒）
    completed: false,
    bookmarked: false,
    isNew: true,
    objectives: [
      '理解都市计划的基本概念',
      '掌握用途地域的分类',
      '熟悉开发许可的要件',
      '了解实务操作流程'
    ],
    relatedPoints: [
      { 
        id: 'p9', 
        name: '用途地域', 
        icon: '🏙️', 
        link: '/notes/regulations/land-use',
        description: '各类用途地域的特点和限制'
      },
      { 
        id: 'p10', 
        name: '开发许可', 
        icon: '📋', 
        link: '/notes/regulations/development-permit',
        description: '开发许可的申请条件和流程'
      }
    ]
  }
])

const learningStats = ref({
  days: 7,
  totalHours: 12,
  completedVideos: 0,
  bookmarkedVideos: 0
})

const domainStats = ref([
  { id: 'rights', name: '权利关系', score: 54 },
  { id: 'business', name: '宅建业法', score: 58 },
  { id: 'regulations', name: '法令制限', score: 20 },
  { id: 'tax', name: '税・価格', score: 0 },
  { id: 'exempt', name: '五问免除', score: 0 }
])

// 计算属性
const totalVideos = computed(() => videos.value.length)

const completedVideos = computed(() => {
  return videos.value.filter(video => video.completed).length
})

const bookmarkedVideos = computed(() => {
  return videos.value.filter(video => video.bookmarked).length
})

const totalDuration = computed(() => {
  return Math.round(totalVideos.value * 0.4)
})

const overallProgress = computed(() => {
  const totalProgress = videos.value.reduce((sum, video) => {
    const progress = video.totalDuration > 0 ? (video.lastPosition / video.totalDuration) * 100 : 0
    return sum + Math.min(progress, 100)
  }, 0)
  return Math.round(totalProgress / videos.value.length)
})

const totalWatchDuration = computed(() => {
  return videos.value.reduce((sum, video) => sum + video.totalWatchDuration, 0)
})

const currentVideoProgress = computed(() => {
  if (!currentVideo.value.id || currentVideo.value.totalDuration === 0) return 0
  const progress = (currentVideo.value.lastPosition / currentVideo.value.totalDuration) * 100
  return Math.min(Math.round(progress), 100)
})

const filteredVideos = computed(() => {
  let filtered = videos.value

  // 按领域筛选
  if (activeDomain.value !== 'all') {
    filtered = filtered.filter(video => video.domain === getDomainName(activeDomain.value))
  }

  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(video => 
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query)
    )
  }

  // 按状态筛选
  if (filterStatus.value !== 'all') {
    if (filterStatus.value === 'completed') {
      filtered = filtered.filter(video => video.completed)
    } else if (filterStatus.value === 'in-progress') {
      filtered = filtered.filter(video => video.totalWatchDuration > 0 && !video.completed)
    } else if (filterStatus.value === 'bookmarked') {
      filtered = filtered.filter(video => video.bookmarked)
    }
  }

  return filtered
})

// 方法
const getDomainVideoCount = (domainId) => {
  if (domainId === 'all') return totalVideos.value
  const domainName = getDomainName(domainId)
  return videos.value.filter(video => video.domain === domainName).length
}

const getDomainProgress = (domainId) => {
  if (domainId === 'all') return overallProgress.value
  const domainName = getDomainName(domainId)
  const domainVideos = videos.value.filter(video => video.domain === domainName)
  if (domainVideos.length === 0) return 0
  
  const totalProgress = domainVideos.reduce((sum, video) => {
    const progress = video.totalDuration > 0 ? (video.lastPosition / video.totalDuration) * 100 : 0
    return sum + Math.min(progress, 100)
  }, 0)
  return Math.round(totalProgress / domainVideos.length)
}

const getDomainName = (domainId) => {
  const domain = domains.find(d => d.id === domainId)
  return domain ? domain.name : ''
}

const getActiveDomainName = () => {
  const domain = domains.find(d => d.id === activeDomain.value)
  return domain ? domain.name : '全部'
}

const switchDomain = (domainId) => {
  activeDomain.value = domainId
}

const selectVideo = async (video) => {
  // 保存当前视频进度
  if (currentVideo.value.id) {
    await saveVideoProgress(currentVideo.value)
  }
  
  currentVideo.value = { ...video }
  videoPlaying.value = false
  
  // 加载视频后设置播放位置
  if (videoPlayer.value && video.lastPosition > 0) {
    setTimeout(() => {
      if (videoPlayer.value) {
        videoPlayer.value.currentTime = video.lastPosition
      }
    }, 100)
  }
}

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.play()
    videoPlaying.value = true
  }
}

const restartVideo = () => {
  if (videoPlayer.value) {
    currentVideo.value.lastPosition = 0
    videoPlayer.value.currentTime = 0
    playVideo()
  }
}

const getVideoUrl = (filename) => {
  return `/videos/${filename}`
}

const getVideoIcon = (video) => {
  if (video.completed) return '✅'
  if (video.totalWatchDuration > 0) return '▶️'
  return '🎬'
}

const getVideoActionText = (video) => {
  if (video.completed) return '重新学习'
  if (video.totalWatchDuration > 0) return '继续学习'
  return '开始学习'
}

const toggleBookmark = (video) => {
  if (!userStore.isLoggedIn) {
    alert('请先登录以使用收藏功能')
    openLoginDialog()
    return
  }
  
  video.bookmarked = !video.bookmarked
  saveBookmarksToLocalStorage()
}

const onVideoPlay = () => {
  videoPlaying.value = true
  console.log('视频开始播放:', currentVideo.value.title)
}

const onVideoPause = () => {
  videoPlaying.value = false
  saveVideoProgress(currentVideo.value)
  console.log('视频暂停，进度已保存')
}

const onVideoEnded = () => {
  videoPlaying.value = false
  if (currentVideo.value.id) {
    currentVideo.value.completed = true
    currentVideo.value.lastPosition = currentVideo.value.totalDuration
    saveVideoProgress(currentVideo.value)
    console.log('视频播放完成:', currentVideo.value.title)
  }
}

const onVideoLoaded = () => {
  if (videoPlayer.value) {
    videoDuration.value = videoPlayer.value.duration
    // 如果视频总时长与记录不符，更新记录
    if (currentVideo.value.totalDuration !== videoDuration.value) {
      currentVideo.value.totalDuration = Math.floor(videoDuration.value)
    }
  }
}

const onTimeUpdate = () => {
  if (videoPlayer.value && currentVideo.value.id) {
    const currentTime = Math.floor(videoPlayer.value.currentTime)
    
    // 更新最后观看位置
    currentVideo.value.lastPosition = currentTime
    
    // 更新总观看时长（避免重复计算）
    if (currentTime > currentVideo.value.lastPosition) {
      const timeDiff = currentTime - currentVideo.value.lastPosition
      currentVideo.value.totalWatchDuration += timeDiff
    }
    
    // 检查是否完成
    if (currentTime >= currentVideo.value.totalDuration * 0.95) {
      currentVideo.value.completed = true
    }
    
    // 节流保存，每5秒保存一次
    if (Date.now() - (currentVideo.value.lastSaveTime || 0) > 5000) {
      saveVideoProgress(currentVideo.value)
      currentVideo.value.lastSaveTime = Date.now()
    }
  }
}

const formatTime = (seconds) => {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 对齐项目圣经的video_watch_logs表结构保存
const saveVideoProgress = async (video) => {
  if (!userStore.user?.id) return
  
  const watchLog = {
    userId: userStore.user.id,
    videoId: video.id,
    totalWatchDuration: video.totalWatchDuration,
    lastPosition: video.lastPosition,
    completed: video.completed,
    updatedAt: new Date().toISOString()
  }
  
  // 保存到本地存储 - 使用项目圣经的表名
  const watchLogs = JSON.parse(localStorage.getItem('video_watch_logs') || '[]')
  
  // 查找现有记录
  const existingIndex = watchLogs.findIndex(log => 
    log.userId === watchLog.userId && log.videoId === watchLog.videoId
  )
  
  if (existingIndex !== -1) {
    watchLogs[existingIndex] = watchLog
  } else {
    watchLogs.push(watchLog)
  }
  
  localStorage.setItem('video_watch_logs', JSON.stringify(watchLogs))
  console.log('视频观看记录已保存:', watchLog)
}

// 加载视频观看记录
const loadVideoWatchLogs = () => {
  if (!userStore.user?.id) return
  
  const watchLogs = JSON.parse(localStorage.getItem('video_watch_logs') || '[]')
  const userWatchLogs = watchLogs.filter(log => log.userId === userStore.user.id)
  
  userWatchLogs.forEach(log => {
    const video = videos.value.find(v => v.id === log.videoId)
    if (video) {
      video.totalWatchDuration = log.totalWatchDuration
      video.lastPosition = log.lastPosition
      video.completed = log.completed
    }
  })
}

const saveBookmarksToLocalStorage = () => {
  const bookmarks = videos.value
    .filter(video => video.bookmarked)
    .map(video => video.id)
  
  localStorage.setItem('videoBookmarks', JSON.stringify(bookmarks))
}

const loadBookmarksFromLocalStorage = () => {
  const savedBookmarks = localStorage.getItem('videoBookmarks')
  if (savedBookmarks) {
    const bookmarks = JSON.parse(savedBookmarks)
    videos.value.forEach(video => {
      video.bookmarked = bookmarks.includes(video.id)
    })
  }
}

const continueToNext = () => {
  const currentIndex = filteredVideos.value.findIndex(video => video.id === currentVideo.value.id)
  const nextVideo = filteredVideos.value[currentIndex + 1]
  
  if (nextVideo) {
    selectVideo(nextVideo)
  } else {
    // 如果没有下一个视频，选择第一个视频
    if (filteredVideos.value.length > 0) {
      selectVideo(filteredVideos.value[0])
    }
  }
}

const downloadMaterials = () => {
  alert('下载功能开发中...')
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

// 监听当前视频变化
watch(currentVideo, (newVideo) => {
  if (newVideo.id && videoPlayer.value) {
    // 视频切换时设置播放位置
    setTimeout(() => {
      if (videoPlayer.value && newVideo.lastPosition > 0) {
        videoPlayer.value.currentTime = newVideo.lastPosition
      }
    }, 500)
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  
  // 加载用户数据
  loadVideoWatchLogs()
  loadBookmarksFromLocalStorage()
  
  // 更新学习统计
  learningStats.value.completedVideos = completedVideos.value
  learningStats.value.bookmarkedVideos = bookmarkedVideos.value
  
  // 选择第一个视频
  if (videos.value.length > 0 && !currentVideo.value.id) {
    selectVideo(videos.value[0])
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  // 保存当前视频进度
  if (currentVideo.value.id) {
    saveVideoProgress(currentVideo.value)
  }
})
</script>

<style scoped>
.video {
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

/* ========= 区域头部 ========= */
.section-header {
  margin-bottom: 2rem;
  width: 100%;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.section-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--muted);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.section-progress {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1rem;
  max-width: 300px;
  box-shadow: var(--shadow-sm);
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

/* ========= 视频播放区域 ========= */
.video-section {
  margin-bottom: 3rem;
  width: 100%;
}

.video-player-container {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  margin-bottom: 2rem;
  width: 100%;
}

.video-player {
  min-height: 400px;
  width: 100%;
}

.video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: var(--muted);
  width: 100%;
}

.placeholder-content {
  max-width: 400px;
  width: 100%;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.3;
}

.video-placeholder h3 {
  font-size: 1.5rem;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

.video-placeholder p {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.placeholder-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--muted);
}

.feature-icon {
  font-size: 1.25rem;
}

/* ========= 视频播放器头部 ========= */
.video-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  gap: 1.25rem;
  width: 100%;
}

.video-title-section {
  flex: 1;
}

.video-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.video-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.video-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.video-tag.basic { background: var(--primary-light); color: var(--primary); }
.video-tag.medium { background: #fef3c7; color: #92400e; }
.video-tag.important { background: #fee2e2; color: #991b1b; }
.video-tag.key { background: #e0e7ff; color: #3730a3; }

.video-tag.domain {
  background: var(--primary-light);
  color: var(--primary-dark);
  text-transform: none;
}

.video-tag.duration {
  background: var(--primary-light);
  color: var(--primary-dark);
  text-transform: none;
}

.video-actions {
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: white;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.action-btn:hover, .action-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary-dark);
}

/* ========= 视频播放器 ========= */
.video-wrapper {
  padding: 0 1.5rem 1.5rem;
  width: 100%;
}

.video-player-main {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  width: 100%;
}

.video-element {
  width: 100%;
  height: 400px;
  display: block;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background: white;
}

.play-icon {
  font-size: 24px;
  color: var(--primary);
  margin-left: 4px;
}

.resume-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.resume-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.resume-content p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.resume-content .btn {
  margin: 0 0.5rem;
}

/* ========= 学习进度控制 ========= */
.learning-progress {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.progress-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.progress-percent {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--muted);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.progress-stats .stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* ========= 行动按钮 ========= */
.action-section {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
  width: 100%;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  text-decoration: none;
  min-height: 44px;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-secondary {
  background: var(--primary-light);
  color: var(--primary-dark);
  border: 1px solid var(--primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary-dark);
  transform: translateY(-2px);
}

.btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-icon {
  font-size: 1rem;
}

/* ========= 视频内容详情 ========= */
.video-details {
  padding: 1.5rem;
  width: 100%;
}

.detail-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}

.tab-btn {
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--primary-dark);
}

.tab-btn.active {
  color: var(--primary-dark);
  border-bottom-color: var(--primary);
  font-weight: 600;
}

.tab-content {
  min-height: 200px;
}

.tab-panel h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.tab-panel h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.75rem;
}

.description-content p {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.learning-objectives ul {
  list-style: none;
  padding: 0;
}

.learning-objectives li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--muted);
}

.learning-objectives li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 600;
}

/* ========= 知识点网格 ========= */
.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.knowledge-card {
  background: var(--bg);
  border-radius: var(--radius);
  padding: 1.25rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.knowledge-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.point-icon {
  font-size: 1.25rem;
}

.card-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.point-desc {
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.point-link {
  color: var(--primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.point-link:hover {
  color: var(--primary-dark);
}

/* ========= 学习资源 ========= */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.resource-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.resource-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.resource-content h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.resource-content p {
  font-size: 0.75rem;
  color: var(--muted);
  margin: 0;
}

/* ========= 视频列表 ========= */
.video-list-section {
  margin-top: 3rem;
  width: 100%;
}

.list-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.625rem 0.75rem 0.625rem 2.25rem;
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
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 120px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

/* ========= 视频网格 ========= */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.video-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  cursor: pointer;
  position: relative;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.video-card.active {
  border-color: var(--primary);
  background: var(--primary-light);
}

.video-card.completed {
  border-color: var(--primary);
}

.video-card.in-progress {
  background: rgba(42, 121, 96, 0.05);
}

.video-card.new::before {
  content: "新";
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  z-index: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.video-badges {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.6875rem;
  font-weight: 600;
}

.badge.new {
  background: #ff6b6b;
  color: white;
}

.badge.level.basic {
  background: var(--primary-light);
  color: var(--primary);
}

.badge.level.medium {
  background: #fef3c7;
  color: #92400e;
}

.badge.level.important {
  background: #fee2e2;
  color: #991b1b;
}

.badge.level.key {
  background: #e0e7ff;
  color: #3730a3;
}

.badge.bookmarked {
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem;
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  color: var(--muted);
  transition: color 0.3s ease;
  padding: 0.25rem;
  border-radius: 4px;
}

.bookmark-btn:hover, .bookmark-btn.bookmarked {
  color: #f59e0b;
}

/* ========= 视频卡片内容 ========= */
.card-content {
  margin-bottom: 1.25rem;
}

.video-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary);
  font-size: 1.125rem;
  font-weight: 600;
}

.video-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.video-desc {
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  color: var(--muted);
}

.meta-icon {
  font-size: 0.875rem;
}

/* ========= 视频进度 ========= */
.video-progress {
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border);
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
  color: var(--muted);
}

.watch-stats {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--muted);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.watch-stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* ========= 卡片操作 ========= */
.card-actions {
  display: flex;
  gap: 0.5rem;
}

/* ========= 无视频状态 ========= */
.no-videos {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--muted);
  grid-column: 1 / -1;
  width: 100%;
}

.no-videos-icon {
  font-size: 4rem;
  margin-bottom: 1.25rem;
  opacity: 0.5;
}

.no-videos h3 {
  font-size: 1.25rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.no-videos p {
  font-size: 1rem;
}

/* ========= 统计区域 ========= */
.stats-section {
  width: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
  width: 100%;
}

.stats-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}

.stats-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.stats-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stats-content .stat-item {
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stats-content .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stats-content .stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* ========= 领域进度 ========= */
.domain-progress {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.domain-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.domain-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.domain-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
}

.domain-score {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
}

/* ========= 登录提示 ========= */
.login-prompt {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 3rem 2rem;
  text-align: center;
  margin: 3rem 0;
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
  max-width: 500px;
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

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
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
  
  .video-grid {
    grid-template-columns: 1fr;
  }
  
  .domain-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .video-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .video-title {
    font-size: 1.25rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .stats-content {
    grid-template-columns: 1fr;
  }
  
  .list-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
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
  
  .video-element {
    height: 250px;
  }
  
  .placeholder-features {
    flex-direction: column;
    gap: 1rem;
  }
  
  .detail-tabs {
    flex-wrap: wrap;
  }
  
  .tab-btn {
    flex: 1;
    min-width: 120px;
    text-align: center;
  }
  
  .points-grid {
    grid-template-columns: 1fr;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>