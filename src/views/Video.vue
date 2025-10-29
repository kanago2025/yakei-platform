<template>
  <div class="video">
    <div class="container">
      <!-- 顶部导航栏 -->
      <header class="top-nav">
        <router-link to="/" class="logo">
          <span class="mark">宅</span>
          <span class="name">宅学苑</span>
        </router-link>
        
        <nav class="nav-links" :class="{ 'mobile-show': mobileMenuOpen }">
          <router-link to="/">首页</router-link>
          <router-link to="/notes">中文笔记</router-link>
          <router-link to="/video" class="active">视频学习</router-link>
          <router-link to="/practice">强化练习</router-link>
          <router-link to="/exam">真题模拟</router-link>
          <router-link to="/community">学习社群</router-link>
          <router-link to="/dashboard">学习进度</router-link>
          <router-link to="/login" class="login-btn">登录 / 注册</router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span class="menu-icon">☰</span>
        </button>
      </header>

      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-badge">视频课程</div>
          <h1>专业视频讲解，轻松掌握考点</h1>
          <p>深度解析宅建士考试五大分野知识点，配合图文笔记和强化练习，建立完整的知识体系</p>
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
        <div class="header-decoration">
          <div class="decoration-item">🎬</div>
          <div class="decoration-item">📚</div>
          <div class="decoration-item">🎯</div>
        </div>
      </div>

      <!-- 学习进度概览 -->
      <div class="progress-overview">
        <div class="overview-header">
          <h2>学习进度概览</h2>
          <div class="overall-progress">
            <span class="progress-text">整体进度 {{ overallProgress }}%</span>
            <div class="progress-bar-large">
              <div 
                class="progress-fill-large" 
                :style="{ width: overallProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div class="domain-progress-grid">
          <div 
            v-for="domain in domains" 
            :key="domain.id"
            class="domain-progress-card"
            @click="switchDomain(domain.id)"
          >
            <div class="domain-info">
              <span class="domain-icon">{{ domain.icon }}</span>
              <div class="domain-details">
                <h3>{{ domain.name }}</h3>
                <span class="video-count">{{ getDomainVideoCount(domain.id) }}个视频</span>
              </div>
            </div>
            <div class="domain-progress">
              <span class="progress-percent">{{ getDomainProgress(domain.id) }}%</span>
              <div class="progress-bar-mini">
                <div 
                  class="progress-fill-mini" 
                  :style="{ width: getDomainProgress(domain.id) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 视频播放区域 -->
        <div class="video-player-section">
          <div class="video-container">
            <!-- 视频播放器 -->
            <div class="video-player" v-if="!currentVideo.src">
              <div class="video-placeholder">
                <div class="placeholder-content">
                  <div class="placeholder-icon">📺</div>
                  <h3>选择视频开始学习</h3>
                  <p>从右侧视频列表中选择一个视频课程开始您的学习之旅</p>
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
                    <span class="video-tag" :class="currentVideo.level">{{ currentVideo.level }}</span>
                    <span class="video-tag domain">{{ currentVideo.domain }}</span>
                  </div>
                </div>
                <div class="video-actions">
                  <button 
                    class="action-btn" 
                    :class="{ active: currentVideo.bookmarked }"
                    @click="toggleBookmark(currentVideo)"
                  >
                    <span class="btn-icon">{{ currentVideo.bookmarked ? '⭐' : '☆' }}</span>
                    <span class="btn-text">{{ currentVideo.bookmarked ? '已收藏' : '收藏' }}</span>
                  </button>
                </div>
              </div>
              
              <!-- 视频元信息 -->
              <div class="video-meta-info">
                <div class="meta-grid">
                  <div class="meta-item">
                    <span class="meta-icon">⏱️</span>
                    <div class="meta-content">
                      <span class="meta-label">时长</span>
                      <span class="meta-value">{{ currentVideo.duration }}</span>
                    </div>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">📅</span>
                    <div class="meta-content">
                      <span class="meta-label">更新日期</span>
                      <span class="meta-value">{{ currentVideo.updateDate }}</span>
                    </div>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">👁️</span>
                    <div class="meta-content">
                      <span class="meta-label">观看次数</span>
                      <span class="meta-value">{{ currentVideo.views || 0 }}</span>
                    </div>
                  </div>
                  <div class="meta-item">
                    <span class="meta-icon">💯</span>
                    <div class="meta-content">
                      <span class="meta-label">完成状态</span>
                      <span class="meta-value">{{ currentVideo.progress === 100 ? '已完成' : '学习中' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 视频播放器 -->
              <div class="video-wrapper">
                <div class="video-player-container">
                  <video 
                    :key="currentVideo.id"
                    ref="videoPlayer"
                    controls 
                    class="video-element"
                    @play="onVideoPlay"
                    @pause="onVideoPause"
                    @ended="onVideoEnded"
                    @timeupdate="onTimeUpdate"
                    preload="metadata"
                  >
                    <source :src="getVideoUrl(currentVideo.src)" type="video/mp4">
                    您的浏览器不支持视频播放。
                  </video>
                  <div class="video-overlay" v-if="!videoPlaying">
                    <button class="play-button" @click="playVideo">
                      <span class="play-icon">▶</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 学习进度控制 -->
              <div class="learning-progress">
                <div class="progress-header">
                  <h4>学习进度</h4>
                  <span class="progress-percent">{{ currentVideo.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: currentVideo.progress + '%' }"
                  ></div>
                </div>
                <div class="progress-actions" v-if="currentVideo.progress === 100">
                  <div class="completion-badge">
                    <span class="badge-icon">✅</span>
                    <span class="badge-text">恭喜！您已完成本视频的学习</span>
                  </div>
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
                    :class="{ disabled: currentVideo.progress < 100 }"
                  >
                    <span class="btn-icon">🎯</span>
                    <span class="btn-text">{{ currentVideo.progress === 100 ? '开始练习' : '先完成观看' }}</span>
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

          <!-- 视频列表侧边栏 -->
          <aside class="video-sidebar">
            <div class="sidebar-header">
              <h2 class="sidebar-title">
                <span class="title-icon">🎬</span>
                视频课程
              </h2>
              <div class="sidebar-controls">
                <div class="search-box">
                  <input 
                    v-model="searchQuery" 
                    type="text" 
                    placeholder="搜索视频课程..." 
                    class="search-input"
                  >
                  <span class="search-icon">🔍</span>
                </div>
                <div class="view-options">
                  <button 
                    class="view-option" 
                    :class="{ active: viewMode === 'list' }"
                    @click="viewMode = 'list'"
                  >
                    📋
                  </button>
                  <button 
                    class="view-option" 
                    :class="{ active: viewMode === 'grid' }"
                    @click="viewMode = 'grid'"
                  >
                    ◼◼
                  </button>
                </div>
              </div>
              <div class="sidebar-stats">
                <div class="stat-item">
                  <span class="stat-label">共</span>
                  <span class="stat-value">{{ filteredVideos.length }}</span>
                  <span class="stat-label">个视频</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">已学</span>
                  <span class="stat-value">{{ completedVideos }}</span>
                  <span class="stat-label">个</span>
                </div>
              </div>
            </div>
            
            <div class="video-list-container">
              <!-- 快速筛选 -->
              <div class="quick-filters">
                <button 
                  class="filter-btn" 
                  :class="{ active: filterStatus === 'all' }"
                  @click="filterStatus = 'all'"
                >
                  全部
                </button>
                <button 
                  class="filter-btn" 
                  :class="{ active: filterStatus === 'in-progress' }"
                  @click="filterStatus = 'in-progress'"
                >
                  进行中
                </button>
                <button 
                  class="filter-btn" 
                  :class="{ active: filterStatus === 'completed' }"
                  @click="filterStatus = 'completed'"
                >
                  已完成
                </button>
                <button 
                  class="filter-btn" 
                  :class="{ active: filterStatus === 'bookmarked' }"
                  @click="filterStatus = 'bookmarked'"
                >
                  已收藏
                </button>
              </div>

              <!-- 视频列表 -->
              <div class="video-list" :class="[viewMode]">
                <div 
                  v-for="category in filteredCategories" 
                  :key="category.id"
                  class="video-category"
                >
                  <div class="category-header" @click="toggleCategory(category.id)">
                    <div class="category-info">
                      <span class="category-icon">📁</span>
                      <span class="category-name">{{ category.name }}</span>
                    </div>
                    <div class="category-meta">
                      <span class="category-progress">
                        {{ getCategoryCompletedCount(category) }}/{{ category.videos.length }}
                      </span>
                      <span class="collapse-icon">
                        {{ category.expanded ? '−' : '+' }}
                      </span>
                    </div>
                  </div>
                  <div class="video-items" v-show="category.expanded">
                    <div 
                      v-for="video in category.videos" 
                      :key="video.id"
                      :class="['video-item', viewMode, { 
                        active: currentVideo.id === video.id,
                        completed: video.progress === 100,
                        bookmarked: video.bookmarked,
                        'in-progress': video.progress > 0 && video.progress < 100
                      }]"
                      @click="selectVideo(video)"
                    >
                      <div class="video-item-main">
                        <div class="video-item-icon">
                          {{ getVideoIcon(video) }}
                        </div>
                        <div class="video-item-content">
                          <div class="video-item-header">
                            <h4 class="video-item-title">
                              {{ video.title }}
                              <span v-if="video.bookmarked" class="bookmark-indicator">⭐</span>
                              <span v-if="video.progress === 100" class="completed-indicator">✅</span>
                            </h4>
                            <span class="video-duration">{{ video.duration }}</span>
                          </div>
                          <div class="video-item-meta">
                            <span class="video-level" :class="video.level">{{ video.level }}</span>
                            <span class="video-domain">{{ video.domain }}</span>
                          </div>
                          <div class="video-item-footer" v-if="video.progress > 0">
                            <div class="video-progress">
                              <div class="progress-bar-mini">
                                <div 
                                  class="progress-fill-mini" 
                                  :style="{ width: video.progress + '%' }"
                                ></div>
                              </div>
                              <span class="progress-text">{{ video.progress }}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="video-item-actions">
                        <button 
                          class="item-action-btn"
                          @click.stop="toggleBookmark(video)"
                          :title="video.bookmarked ? '取消收藏' : '收藏'"
                        >
                          {{ video.bookmarked ? '⭐' : '☆' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <!-- 推荐学习路径 -->
        <section class="learning-path" v-if="recommendedPath.length">
          <div class="section-header">
            <h2 class="section-title">推荐学习路径</h2>
            <p class="section-desc">根据您的学习进度智能推荐接下来的学习内容</p>
          </div>
          <div class="path-steps">
            <div 
              v-for="(step, index) in recommendedPath" 
              :key="step.id"
              class="path-step"
              :class="{ completed: step.completed, current: step.current }"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-desc">{{ step.description }}</p>
                <div class="step-meta">
                  <span class="step-duration">{{ step.duration }}</span>
                  <span class="step-level" :class="step.level">{{ step.level }}</span>
                </div>
              </div>
              <button 
                class="step-action"
                @click="selectVideo(step)"
                :disabled="!step.available"
              >
                {{ step.completed ? '已完成' : step.current ? '继续学习' : '开始学习' }}
              </button>
            </div>
          </div>
        </section>

        <!-- 学习统计 -->
        <section class="learning-stats">
          <div class="section-header">
            <h2 class="section-title">学习统计</h2>
            <p class="section-desc">跟踪您的学习进度和成就</p>
          </div>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <h3>学习天数</h3>
                <span class="stat-value">{{ learningStats.days }}</span>
                <span class="stat-label">连续学习</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-content">
                <h3>总学习时长</h3>
                <span class="stat-value">{{ learningStats.totalHours }}</span>
                <span class="stat-label">小时</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-content">
                <h3>完成视频</h3>
                <span class="stat-value">{{ completedVideos }}</span>
                <span class="stat-label">/ {{ totalVideos }} 个</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-content">
                <h3>收藏视频</h3>
                <span class="stat-value">{{ bookmarkedVideos }}</span>
                <span class="stat-label">个</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>准备好系统化学习了吗？</h2>
          <p>配合中文笔记和强化练习，建立完整的知识体系，快速提升考试成绩</p>
          <div class="cta-buttons">
            <router-link to="/notes" class="btn btn-primary">
              <span class="btn-icon">📚</span>
              <span class="btn-text">查看中文笔记</span>
            </router-link>
            <router-link to="/practice" class="btn btn-secondary">
              <span class="btn-icon">🎯</span>
              <span class="btn-text">开始强化练习</span>
            </router-link>
            <router-link to="/exam" class="btn btn-outline">
              <span class="btn-icon">📊</span>
              <span class="btn-text">真题模拟测试</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 页脚 -->
      <footer class="footer">
        <div class="footer-content">
          <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
          <div class="footer-links">
            <a href="#">关于我们</a>
            <a href="#">帮助中心</a>
            <a href="#">隐私政策</a>
            <a href="#">用户协议</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      mobileMenuOpen: false,
      searchQuery: '',
      activeDomain: 'all',
      currentVideo: {},
      videoPlayer: null,
      videoPlaying: false,
      activeTab: 'description',
      viewMode: 'list',
      filterStatus: 'all',
      domains: [
        { 
          id: 'all', 
          name: '全部视频', 
          icon: '🎬', 
          videoCount: 0
        },
        { 
          id: 'rights', 
          name: '权利关系', 
          icon: '⚖️', 
          videoCount: 8
        },
        { 
          id: 'business', 
          name: '宅建业法', 
          icon: '🏢', 
          videoCount: 10
        },
        { 
          id: 'regulations', 
          name: '法令制限', 
          icon: '📏', 
          videoCount: 12
        },
        { 
          id: 'tax', 
          name: '税・価格', 
          icon: '💰', 
          videoCount: 6
        },
        { 
          id: 'exempt', 
          name: '五问免除', 
          icon: '✅', 
          videoCount: 4
        }
      ],
      videoCategories: [
        {
          id: 'rights',
          name: '权利关系',
          expanded: true,
          videos: [
            {
              id: 'rights-1',
              title: '意思表示详解',
              src: 'intent-expression.mp4',
              duration: '15:30',
              level: '基础',
              domain: '权利关系',
              updateDate: '2024-01-15',
              description: '深度解析意思表示的法律概念、构成要件和实际应用，帮助理解法律行为的基础',
              notesLink: '/notes/rights/intent',
              progress: 65,
              bookmarked: true,
              views: 124,
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
              level: '中级',
              domain: '权利关系',
              updateDate: '2024-01-10',
              description: '全面讲解代理权的授予、表见代理、无权代理等代理相关法律制度',
              notesLink: '/notes/rights/agency',
              progress: 42,
              bookmarked: false,
              views: 98,
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
            }
          ]
        },
        {
          id: 'business',
          name: '宅建业法',
          expanded: true,
          videos: [
            {
              id: 'business-1',
    title: '重要事项说明完全攻略',
    src: 'important-matters.mp4',
    // 更新这一行，使用你的 Cloudflare R2 URL
    cdnUrl: 'https://pub-7216172273a24ef79956d8088c35ad35.r2.dev/important-matters.mp4',
    duration: '03:00',
    level: '重要',
    domain: '宅建业法',
    updateDate: '2024-01-20',
              description: '详细讲解重要事项说明的法律要求、实务操作要点和常见问题处理',
              notesLink: '/notes/business/explanation',
              progress: 85,
              bookmarked: true,
              views: 156,
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
              level: '中级',
              domain: '宅建业法',
              updateDate: '2024-01-18',
              description: '解析媒介契约的种类、要件和实务操作中的注意事项',
              notesLink: '/notes/business/contract',
              progress: 30,
              bookmarked: false,
              views: 87,
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
            }
          ]
        }
      ],
      learningStats: {
        days: 7,
        totalHours: 12,
        completedVideos: 0,
        bookmarkedVideos: 0
      }
    }
  },
  computed: {
    totalVideos() {
      return this.videoCategories.reduce((total, category) => total + category.videos.length, 0)
    },
    completedVideos() {
      return this.videoCategories.flatMap(category => category.videos)
        .filter(video => video.progress === 100).length
    },
    bookmarkedVideos() {
      return this.videoCategories.flatMap(category => category.videos)
        .filter(video => video.bookmarked).length
    },
    totalDuration() {
      // 简化的时长计算，实际应该从视频数据中计算
      return Math.round(this.totalVideos * 0.3)
    },
    overallProgress() {
      const totalProgress = this.videoCategories.flatMap(category => category.videos)
        .reduce((sum, video) => sum + video.progress, 0)
      return Math.round(totalProgress / this.totalVideos)
    },
    filteredVideos() {
      if (!this.searchQuery) {
        return this.videoCategories.flatMap(category => category.videos)
      }
      
      const query = this.searchQuery.toLowerCase()
      return this.videoCategories.flatMap(category => 
        category.videos.filter(video => 
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.domain.toLowerCase().includes(query)
        )
      )
    },
    filteredCategories() {
      return this.videoCategories.map(category => ({
        ...category,
        videos: category.videos.filter(video => {
          if (this.filterStatus === 'all') return true
          if (this.filterStatus === 'completed') return video.progress === 100
          if (this.filterStatus === 'in-progress') return video.progress > 0 && video.progress < 100
          if (this.filterStatus === 'bookmarked') return video.bookmarked
          return true
        })
      })).filter(category => category.videos.length > 0)
    },
    recommendedVideos() {
      // 推荐逻辑：进度中等、重要的视频
      return this.videoCategories.flatMap(category => category.videos)
        .filter(video => video.progress > 0 && video.progress < 80)
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 4)
    },
    recommendedPath() {
      // 简化的推荐路径逻辑
      const videos = this.videoCategories.flatMap(category => category.videos)
      return [
        {
          id: 'path-1',
          title: '重要事项说明完全攻略',
          description: '宅建业法的核心内容，考试重点',
          duration: '22:15',
          level: '重要',
          completed: false,
          current: true,
          available: true
        },
        {
          id: 'path-2',
          title: '意思表示详解',
          description: '权利关系的基础知识',
          duration: '15:30',
          level: '基础',
          completed: false,
          current: false,
          available: true
        },
        {
          id: 'path-3',
          title: '代理制度全解析',
          description: '深入理解代理法律关系',
          duration: '18:45',
          level: '中级',
          completed: false,
          current: false,
          available: true
        }
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
      }
    },
    switchDomain(domainId) {
      this.activeDomain = domainId
      // 这里可以添加按领域筛选视频的逻辑
    },
    getDomainVideoCount(domainId) {
      if (domainId === 'all') return this.totalVideos
      const category = this.videoCategories.find(cat => cat.id === domainId)
      return category ? category.videos.length : 0
    },
    getDomainProgress(domainId) {
      if (domainId === 'all') return this.overallProgress
      const category = this.videoCategories.find(cat => cat.id === domainId)
      if (!category) return 0
      
      const totalProgress = category.videos.reduce((sum, video) => sum + video.progress, 0)
      return Math.round(totalProgress / category.videos.length)
    },
    toggleCategory(categoryId) {
      const category = this.videoCategories.find(cat => cat.id === categoryId)
      if (category) {
        category.expanded = !category.expanded
      }
    },
    selectVideo(video) {
      this.currentVideo = { ...video }
      this.videoPlaying = false
      // 加载视频进度等信息
      this.loadVideoProgress(video)
    },
    playVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.play()
        this.videoPlaying = true
      }
    },
    getVideoUrl(filename) {
      // 实际项目中这里应该是真实的视频URL
      return `/videos/${filename}`
    },
    getVideoIcon(video) {
      if (video.progress === 100) return '✅'
      if (video.progress > 0) return '▶️'
      return '🎬'
    },
    getCategoryCompletedCount(category) {
      return category.videos.filter(video => video.progress === 100).length
    },
    loadVideoProgress(video) {
      // 从本地存储加载视频进度
      const savedProgress = localStorage.getItem(`videoProgress_${video.id}`)
      if (savedProgress) {
        video.progress = parseInt(savedProgress)
      }
    },
    saveVideoProgress(videoId, progress) {
      // 保存视频进度到本地存储
      localStorage.setItem(`videoProgress_${videoId}`, progress.toString())
    },
    toggleBookmark(video) {
      video.bookmarked = !video.bookmarked
      // 保存收藏状态到本地存储
      const bookmarks = JSON.parse(localStorage.getItem('videoBookmarks') || '[]')
      if (video.bookmarked) {
        if (!bookmarks.includes(video.id)) {
          bookmarks.push(video.id)
        }
      } else {
        const index = bookmarks.indexOf(video.id)
        if (index > -1) {
          bookmarks.splice(index, 1)
        }
      }
      localStorage.setItem('videoBookmarks', JSON.stringify(bookmarks))
    },
    onVideoPlay() {
      this.videoPlaying = true
      console.log('视频开始播放:', this.currentVideo.title)
    },
    onVideoPause() {
      this.videoPlaying = false
      console.log('视频暂停')
    },
    onVideoEnded() {
      this.videoPlaying = false
      if (this.currentVideo.id) {
        this.currentVideo.progress = 100
        this.saveVideoProgress(this.currentVideo.id, 100)
        // 更新视频列表中的进度
        this.updateVideoProgress(this.currentVideo.id, 100)
      }
    },
    onTimeUpdate() {
      if (this.$refs.videoPlayer && this.currentVideo.src) {
        const video = this.$refs.videoPlayer
        const progress = (video.currentTime / video.duration) * 100
        if (!isNaN(progress) && progress > this.currentVideo.progress) {
          this.currentVideo.progress = Math.round(progress)
          this.saveVideoProgress(this.currentVideo.id, this.currentVideo.progress)
          // 更新视频列表中的进度
          this.updateVideoProgress(this.currentVideo.id, this.currentVideo.progress)
        }
      }
    },
    updateVideoProgress(videoId, progress) {
      this.videoCategories.forEach(category => {
        category.videos.forEach(video => {
          if (video.id === videoId) {
            video.progress = Math.max(video.progress, progress)
          }
        })
      })
    },
    continueWatching() {
      // 找到进度最高的未完成视频
      const videos = this.videoCategories.flatMap(category => category.videos)
      const ongoingVideo = videos
        .filter(video => video.progress > 0 && video.progress < 100)
        .sort((a, b) => b.progress - a.progress)[0]
      
      if (ongoingVideo) {
        this.selectVideo(ongoingVideo)
      } else {
        // 如果没有进行中的视频，选择第一个未观看的视频
        const firstVideo = videos.find(video => video.progress === 0)
        if (firstVideo) {
          this.selectVideo(firstVideo)
        }
      }
    },
    showBookmarkedVideos() {
      const bookmarkedVideos = this.videoCategories.flatMap(category => 
        category.videos.filter(video => video.bookmarked)
      )
      if (bookmarkedVideos.length > 0) {
        this.selectVideo(bookmarkedVideos[0])
      }
    },
    continueToNext() {
      // 找到当前视频所在分类的下一个视频
      const currentCategory = this.videoCategories.find(category => 
        category.videos.some(video => video.id === this.currentVideo.id)
      )
      
      if (currentCategory) {
        const currentIndex = currentCategory.videos.findIndex(video => video.id === this.currentVideo.id)
        const nextVideo = currentCategory.videos[currentIndex + 1]
        
        if (nextVideo) {
          this.selectVideo(nextVideo)
        } else {
          // 如果当前是最后一个视频，选择下一个分类的第一个视频
          const currentCategoryIndex = this.videoCategories.findIndex(cat => cat.id === currentCategory.id)
          const nextCategory = this.videoCategories[currentCategoryIndex + 1]
          
          if (nextCategory && nextCategory.videos.length > 0) {
            this.selectVideo(nextCategory.videos[0])
          }
        }
      }
    },
    downloadMaterials() {
      alert('下载功能开发中...')
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    
    // 初始化：选择第一个视频或继续观看
    this.continueWatching()
    
    // 加载收藏状态
    const bookmarks = JSON.parse(localStorage.getItem('videoBookmarks') || '[]')
    this.videoCategories.forEach(category => {
      category.videos.forEach(video => {
        video.bookmarked = bookmarks.includes(video.id)
        this.loadVideoProgress(video)
      })
    })
    
    // 更新学习统计
    this.learningStats.completedVideos = this.completedVideos
    this.learningStats.bookmarkedVideos = this.bookmarkedVideos
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
/* CSS 变量定义 - 与其他模块保持一致 */
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
}

.video {
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
  border-bottom: 1px solid var(--border);
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
  gap: 16px;
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

.login-btn {
  background: var(--primary);
  color: white !important;
  padding: 8px 16px !important;
}

.login-btn:hover {
  background: var(--primary-dark) !important;
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
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.08), rgba(42, 121, 96, 0.02));
  border-radius: 20px;
  padding: 50px 40px;
  margin: 30px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  flex: 1;
  max-width: 600px;
}

.header-badge {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
}

.header-content h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 16px;
  line-height: 1.2;
}

.header-content p {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: 30px;
  line-height: 1.6;
}

.header-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
  font-weight: 500;
}

.header-decoration {
  display: flex;
  gap: 16px;
}

.decoration-item {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  animation: float 3s ease-in-out infinite;
}

.decoration-item:nth-child(2) {
  animation-delay: 1s;
}

.decoration-item:nth-child(3) {
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* ========= 学习进度概览 ========= */
.progress-overview {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 30px;
  margin: 30px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.overview-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
}

.overall-progress {
  display: flex;
  align-items: center;
  gap: 16px;
}

.progress-text {
  font-size: 14px;
  color: var(--muted);
  font-weight: 500;
}

.progress-bar-large {
  width: 200px;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill-large {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.domain-progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.domain-progress-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--bg);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.domain-progress-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.domain-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.domain-icon {
  font-size: 24px;
}

.domain-details h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.video-count {
  font-size: 12px;
  color: var(--muted);
}

.domain-progress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.progress-percent {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.progress-bar-mini {
  width: 100px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill-mini {
  height: 100%;
  background: var(--primary);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* ========= 主要内容区域 ========= */
.main-content {
  margin: 40px 0;
  flex: 1;
}

/* ========= 视频播放区域布局 ========= */
.video-player-section {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  margin-bottom: 60px;
}

/* ========= 视频容器 ========= */
.video-container {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  overflow: hidden;
}

.video-player {
  min-height: 600px;
}

.video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  text-align: center;
  color: var(--muted);
}

.placeholder-content {
  max-width: 400px;
}

.placeholder-icon {
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.3;
}

.video-placeholder h3 {
  font-size: 24px;
  color: var(--primary-dark);
  margin-bottom: 12px;
}

.video-placeholder p {
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.placeholder-features {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--muted);
}

.feature-icon {
  font-size: 20px;
}

/* ========= 视频播放器头部 ========= */
.video-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  border-bottom: 1px solid var(--border);
  gap: 20px;
}

.video-title-section {
  flex: 1;
}

.video-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
  line-height: 1.4;
}

.video-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.video-tag {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.video-tag.基础 { background: #d1fae5; color: #065f46; }
.video-tag.中级 { background: #fef3c7; color: #92400e; }
.video-tag.重要 { background: #fee2e2; color: #991b1b; }
.video-tag.高级 { background: #e0e7ff; color: #3730a3; }
.video-tag.专项 { background: #f0f9ff; color: #0c4a6e; }

.video-tag.domain {
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
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: white;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.action-btn:hover, .action-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary-dark);
}

/* ========= 视频元信息 ========= */
.video-meta-info {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.meta-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 12px;
  color: var(--muted);
}

.meta-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

/* ========= 视频播放器 ========= */
.video-wrapper {
  padding: 0 24px 24px;
}

.video-player-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
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

/* ========= 学习进度控制 ========= */
.learning-progress {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.progress-percent {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-actions {
  text-align: center;
}

.completion-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.badge-icon {
  font-size: 16px;
}

/* ========= 行动按钮 ========= */
.action-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 44px;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-secondary {
  background: var(--primary-light);
  color: var(--primary-dark);
  border: 1px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary-dark);
  transform: translateY(-1px);
}

.btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  white-space: nowrap;
}

/* ========= 视频内容详情 ========= */
.video-details {
  padding: 24px;
}

.detail-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.tab-btn {
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
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
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.tab-panel h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 12px;
}

.description-content p {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.learning-objectives ul {
  list-style: none;
  padding: 0;
}

.learning-objectives li {
  padding: 8px 0;
  padding-left: 24px;
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
  gap: 16px;
}

.knowledge-card {
  background: var(--bg);
  border-radius: var(--radius);
  padding: 20px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.knowledge-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.point-icon {
  font-size: 20px;
}

.card-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.point-desc {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
}

.point-link {
  color: var(--primary);
  text-decoration: none;
  font-size: 14px;
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
  gap: 16px;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
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
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.resource-icon {
  font-size: 24px;
  width: 40px;
  text-align: center;
}

.resource-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.resource-content p {
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}

/* ========= 视频侧边栏 ========= */
.video-sidebar {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  overflow: hidden;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
}

.sidebar-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: var(--bg);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(42, 121, 96, 0.1);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.view-options {
  display: flex;
  gap: 4px;
  background: var(--bg);
  border-radius: 8px;
  padding: 4px;
}

.view-option {
  padding: 6px 8px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.view-option.active {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-stats {
  display: flex;
  gap: 16px;
}

.sidebar-stats .stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--muted);
}

.stat-value {
  font-weight: 600;
  color: var(--primary);
}

/* ========= 视频列表容器 ========= */
.video-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.quick-filters {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary-dark);
}

.filter-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* ========= 视频列表 ========= */
.video-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.video-list.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 16px;
}

.video-category {
  border-bottom: 1px solid var(--border);
}

.video-category:last-child {
  border-bottom: none;
}

.category-header {
  padding: 16px 20px;
  background: var(--bg);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}

.category-header:hover {
  background: var(--primary-light);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-icon {
  font-size: 14px;
  color: var(--muted);
}

.category-name {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 14px;
}

.category-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-progress {
  font-size: 12px;
  color: var(--muted);
  background: var(--card-bg);
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.collapse-icon {
  color: var(--muted);
  font-weight: 600;
  font-size: 16px;
  width: 16px;
  text-align: center;
}

.video-items {
  padding: 8px 0;
}

/* ========= 视频项样式 ========= */
.video-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  gap: 12px;
  position: relative;
}

.video-item:hover {
  background: var(--bg);
}

.video-item.active {
  background: var(--primary-light);
  border-left-color: var(--primary);
}

.video-item.completed {
  background: var(--primary-light);
}

.video-item.bookmarked .video-item-title {
  color: var(--primary-dark);
  font-weight: 600;
}

.video-item.in-progress {
  background: rgba(42, 121, 96, 0.05);
}

.video-item.grid {
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin: 0 16px 16px;
  padding: 16px;
}

.video-item.grid:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.1);
}

.video-item-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.video-item.grid .video-item-main {
  flex-direction: column;
  gap: 12px;
}

.video-item-icon {
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

.video-item.grid .video-item-icon {
  font-size: 24px;
  align-self: center;
}

.video-item-content {
  flex: 1;
  min-width: 0;
}

.video-item.grid .video-item-content {
  width: 100%;
}

.video-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
}

.video-item.grid .video-item-header {
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.video-item-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
  flex: 1;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.video-item.grid .video-item-title {
  font-size: 16px;
  font-weight: 600;
}

.video-item.active .video-item-title {
  color: var(--primary-dark);
  font-weight: 600;
}

.bookmark-indicator, .completed-indicator {
  font-size: 12px;
}

.video-duration {
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
  flex-shrink: 0;
}

.video-item.grid .video-duration {
  background: var(--primary-light);
  color: var(--primary-dark);
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 11px;
}

.video-item-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.video-level {
  font-size: 11px;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.video-level.基础 { background: #10b981; }
.video-level.中级 { background: #f59e0b; }
.video-level.重要 { background: #ef4444; }
.video-level.高级 { background: #8b5cf6; }
.video-level.专项 { background: #06b6d4; }

.video-domain {
  font-size: 11px;
  color: var(--muted);
  background: var(--bg);
  padding: 2px 6px;
  border-radius: 10px;
}

.video-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.video-item.grid .video-item-footer {
  width: 100%;
}

.video-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.progress-bar-mini {
  width: 60px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}

.video-item.grid .progress-bar-mini {
  width: 100%;
  height: 6px;
}

.progress-fill-mini {
  height: 100%;
  background: var(--primary);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 11px;
  color: var(--muted);
  font-weight: 500;
  min-width: 25px;
}

.video-item-actions {
  display: flex;
  align-items: center;
}

.item-action-btn {
  padding: 6px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--muted);
  transition: all 0.2s ease;
}

.item-action-btn:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.video-item.grid .video-item-actions {
  position: absolute;
  top: 12px;
  right: 12px;
}

/* ========= 推荐学习路径 ========= */
.learning-path {
  margin-bottom: 60px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
}

.section-desc {
  font-size: 16px;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.path-step {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.path-step:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.path-step.completed {
  background: var(--primary-light);
}

.path-step.current {
  border-color: var(--primary);
  background: var(--primary-light);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.path-step.completed .step-number {
  background: #10b981;
}

.path-step.current .step-number {
  background: var(--primary-dark);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 8px;
}

.step-desc {
  color: var(--muted);
  margin-bottom: 12px;
  line-height: 1.5;
}

.step-meta {
  display: flex;
  gap: 16px;
}

.step-duration {
  font-size: 14px;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.step-level {
  font-size: 12px;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.step-level.基础 { background: #10b981; }
.step-level.中级 { background: #f59e0b; }
.step-level.重要 { background: #ef4444; }
.step-level.高级 { background: #8b5cf6; }
.step-level.专项 { background: #06b6d4; }

.step-action {
  padding: 10px 20px;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.step-action:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.step-action:disabled {
  background: var(--muted);
  border-color: var(--muted);
  cursor: not-allowed;
  opacity: 0.6;
}

/* ========= 学习统计 ========= */
.learning-stats {
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
}

/* ========= 底部行动号召 ========= */
.cta-section {
  text-align: center;
  padding: 60px 40px;
  margin: 60px 0 40px;
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 20px;
}

.cta-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.cta-section p {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: 32px;
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

.footer-content {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--primary-dark);
}

/* ========= 响应式设计 ========= */
@media (max-width: 1200px) {
  .video-player-section {
    grid-template-columns: 1fr 340px;
  }
  
  .meta-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .video-player-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .video-sidebar {
    position: static;
    max-height: none;
  }
  
  .header-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .domain-progress-grid {
    grid-template-columns: 1fr;
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
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  
  .header-content h1 {
    font-size: 28px;
  }
  
  .header-content p {
    font-size: 16px;
  }
  
  .header-decoration {
    justify-content: center;
  }
  
  .progress-overview {
    padding: 20px;
  }
  
  .overview-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .overall-progress {
    width: 100%;
  }
  
  .video-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .video-title {
    font-size: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
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
  
  .sidebar-controls {
    flex-direction: column;
  }
  
  .view-options {
    align-self: flex-start;
  }
  
  .path-step {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .step-meta {
    width: 100%;
    justify-content: space-between;
  }
  
  .step-action {
    width: 100%;
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
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
    grid-template-columns: 1fr;
  }
  
  .video-element {
    height: 250px;
  }
  
  .placeholder-features {
    flex-direction: column;
    gap: 16px;
  }
  
  .quick-filters {
    flex-wrap: wrap;
  }
  
  .video-item.grid {
    margin: 0 8px 16px;
  }
}
</style>