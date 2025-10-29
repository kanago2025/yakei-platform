<template>
  <div class="community">
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
          <router-link to="/practice">强化练习</router-link>
          <router-link to="/exam">真题模拟</router-link>
          <router-link to="/community" class="active">学习社群</router-link>
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
          <h1>学习社群</h1>
          <p>与同学交流学习心得，分享备考经验，互相鼓励支持，共同进步</p>
          
          <!-- VIP用户专属提示 -->
          <div v-if="userStore.isPremium" class="premium-badge">
            <span class="badge-icon">⭐</span>
            <span>VIP会员可创建学习小组和参与专属讨论</span>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">{{ communityStats.totalMembers }}</span>
              <span class="stat-label">社群成员</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ communityStats.activeToday }}</span>
              <span class="stat-label">今日活跃</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ communityStats.discussions }}</span>
              <span class="stat-label">讨论帖子</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速导航 -->
      <div class="quick-nav">
        <div class="nav-section">
          <h3>社群功能区</h3>
          <div class="section-buttons">
            <button 
              v-for="section in communitySections" 
              :key="section.id"
              class="section-btn" 
              :class="{ active: activeSection === section.id }"
              @click="switchSection(section.id)"
            >
              <span class="section-icon">{{ section.icon }}</span>
              <span class="section-name">{{ section.name }}</span>
              <span class="section-desc">{{ section.description }}</span>
            </button>
          </div>
        </div>
        
        <div class="nav-section">
          <h3>社群工具</h3>
          <div class="tool-buttons">
            <button 
              class="tool-btn" 
              @click="startNewDiscussion"
              :disabled="!userStore.isLoggedIn"
            >
              <span class="tool-icon">📝</span>
              <span>发起讨论</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <button 
              class="tool-btn" 
              @click="askQuestion"
              :disabled="!userStore.isLoggedIn"
            >
              <span class="tool-icon">❓</span>
              <span>提问求助</span>
              <span v-if="!userStore.isLoggedIn" class="tool-hint">需登录</span>
            </button>
            <button 
              class="tool-btn" 
              @click="createStudyGroup"
              :disabled="!userStore.isPremium"
            >
              <span class="tool-icon">👥</span>
              <span>创建小组</span>
              <span v-if="!userStore.isPremium" class="tool-hint">VIP</span>
            </button>
            <router-link to="/dashboard" class="tool-btn">
              <span class="tool-icon">📊</span>
              <span>学习进度</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 讨论区内容 -->
        <div v-if="activeSection === 'discussion'" class="discussion-section">
          <div class="section-header">
            <h2>学习讨论区</h2>
            <div class="filter-options">
              <select v-model="discussionFilter" class="filter-select">
                <option value="all">全部讨论</option>
                <option value="popular">热门讨论</option>
                <option value="recent">最新发布</option>
                <option value="solved">已解决</option>
              </select>
              <select v-model="topicFilter" class="filter-select">
                <option value="all">全部分类</option>
                <option value="rights">权利关系</option>
                <option value="business">宅建业法</option>
                <option value="regulations">法令制限</option>
                <option value="tax">税・価格</option>
              </select>
            </div>
          </div>

          <div class="discussions-list">
            <div 
              v-for="discussion in filteredDiscussions" 
              :key="discussion.id"
              class="discussion-card"
              :class="{
                'solved': discussion.isSolved,
                'popular': discussion.replies > 10,
                'premium-only': discussion.requiresPremium && !userStore.isPremium
              }"
            >
              <!-- VIP专属讨论标识 -->
              <div v-if="discussion.requiresPremium && !userStore.isPremium" class="premium-overlay">
                <div class="premium-lock">
                  <span class="lock-icon">🔒</span>
                  <span>VIP专属讨论</span>
                </div>
              </div>
              
              <div class="discussion-header">
                <div class="user-info">
                  <span class="user-avatar">{{ discussion.authorAvatar }}</span>
                  <div class="user-details">
                    <span class="user-name">{{ discussion.author }}</span>
                    <span class="post-time">{{ formatTime(discussion.createdAt) }}</span>
                  </div>
                </div>
                <div class="discussion-badges">
                  <span v-if="discussion.isSolved" class="badge solved">已解决</span>
                  <span v-if="discussion.replies > 10" class="badge popular">热门</span>
                  <span class="badge topic">{{ getTopicName(discussion.topic) }}</span>
                  <span v-if="discussion.requiresPremium" class="badge premium">VIP</span>
                </div>
              </div>

              <div class="discussion-content">
                <h3 class="discussion-title">{{ discussion.title }}</h3>
                <p class="discussion-excerpt">{{ discussion.content }}</p>
                
                <div class="discussion-tags">
                  <span 
                    v-for="tag in discussion.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="discussion-footer">
                <div class="interaction-stats">
                  <button 
                    class="interaction-btn"
                    :class="{ liked: discussion.isLiked }"
                    @click="toggleLike(discussion.id)"
                    :disabled="!userStore.isLoggedIn"
                  >
                    <span class="icon">👍</span>
                    <span class="count">{{ discussion.likes }}</span>
                  </button>
                  <button class="interaction-btn">
                    <span class="icon">💬</span>
                    <span class="count">{{ discussion.replies }}</span>
                  </button>
                  <button class="interaction-btn">
                    <span class="icon">👁️</span>
                    <span class="count">{{ discussion.views }}</span>
                  </button>
                </div>
                <div class="discussion-actions">
                  <button 
                    class="btn btn-outline"
                    @click="viewDiscussion(discussion)"
                  >
                    查看详情
                  </button>
                  <button 
                    class="btn btn-outline"
                    @click="bookmarkDiscussion(discussion.id)"
                    :disabled="!userStore.isLoggedIn"
                  >
                    {{ discussion.isBookmarked ? '取消收藏' : '收藏' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredDiscussions.length === 0" class="no-discussions">
            <div class="no-discussions-icon">💬</div>
            <h3>暂无相关讨论</h3>
            <p>请尝试调整筛选条件或发起新的讨论</p>
          </div>
        </div>

        <!-- 问答区内容 -->
        <div v-if="activeSection === 'qna'" class="qna-section">
          <div class="section-header">
            <h2>问答专区</h2>
            <div class="filter-options">
              <select v-model="qnaFilter" class="filter-select">
                <option value="all">全部问题</option>
                <option value="unanswered">待回答</option>
                <option value="answered">已回答</option>
                <option value="popular">热门问题</option>
              </select>
            </div>
          </div>

          <div class="questions-list">
            <div 
              v-for="question in filteredQuestions" 
              :key="question.id"
              class="question-card"
              :class="{
                'answered': question.isAnswered,
                'popular': question.answers > 5,
                'premium-only': question.requiresPremium && !userStore.isPremium
              }"
            >
              <!-- VIP专属问答标识 -->
              <div v-if="question.requiresPremium && !userStore.isPremium" class="premium-overlay">
                <div class="premium-lock">
                  <span class="lock-icon">🔒</span>
                  <span>VIP专属问答</span>
                </div>
              </div>
              
              <div class="question-header">
                <div class="user-info">
                  <span class="user-avatar">{{ question.authorAvatar }}</span>
                  <div class="user-details">
                    <span class="user-name">{{ question.author }}</span>
                    <span class="post-time">{{ formatTime(question.createdAt) }}</span>
                  </div>
                </div>
                <div class="question-badges">
                  <span v-if="question.isAnswered" class="badge answered">已回答</span>
                  <span v-if="question.answers > 5" class="badge popular">热门</span>
                  <span class="badge topic">{{ getTopicName(question.topic) }}</span>
                  <span v-if="question.requiresPremium" class="badge premium">VIP</span>
                </div>
              </div>

              <div class="question-content">
                <h3 class="question-title">{{ question.title }}</h3>
                <p class="question-excerpt">{{ question.content }}</p>
                
                <div class="question-tags">
                  <span 
                    v-for="tag in question.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="question-footer">
                <div class="answer-info">
                  <span class="answer-count">{{ question.answers }} 个回答</span>
                  <span class="view-count">{{ question.views }} 次浏览</span>
                </div>
                <div class="question-actions">
                  <button 
                    class="btn btn-primary"
                    @click="answerQuestion(question)"
                    :disabled="!userStore.isLoggedIn"
                  >
                    回答问题
                  </button>
                  <button 
                    class="btn btn-outline"
                    @click="viewQuestion(question)"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredQuestions.length === 0" class="no-questions">
            <div class="no-questions-icon">❓</div>
            <h3>暂无相关问题</h3>
            <p>请尝试调整筛选条件或提出新的问题</p>
          </div>
        </div>

        <!-- 学习小组内容 -->
        <div v-if="activeSection === 'groups'" class="groups-section">
          <div class="section-header">
            <h2>学习小组</h2>
            <div class="filter-options">
              <select v-model="groupFilter" class="filter-select">
                <option value="all">全部小组</option>
                <option value="active">活跃小组</option>
                <option value="new">新成立</option>
                <option value="premium">VIP小组</option>
              </select>
            </div>
          </div>

          <div class="groups-list">
            <div 
              v-for="group in filteredGroups" 
              :key="group.id"
              class="group-card"
              :class="{
                'premium-only': group.requiresPremium && !userStore.isPremium
              }"
            >
              <!-- VIP专属小组标识 -->
              <div v-if="group.requiresPremium && !userStore.isPremium" class="premium-overlay">
                <div class="premium-lock">
                  <span class="lock-icon">🔒</span>
                  <span>VIP专属小组</span>
                </div>
              </div>
              
              <div class="group-header">
                <div class="group-info">
                  <h3 class="group-name">{{ group.name }}</h3>
                  <span class="group-members">{{ group.memberCount }} 名成员</span>
                </div>
                <div class="group-badges">
                  <span v-if="group.requiresPremium" class="badge premium">VIP</span>
                  <span class="badge topic">{{ group.topic }}</span>
                </div>
              </div>

              <div class="group-content">
                <p class="group-description">{{ group.description }}</p>
                
                <div class="group-stats">
                  <div class="stat">
                    <span class="stat-value">{{ group.discussionCount }}</span>
                    <span class="stat-label">讨论</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">{{ group.activeMembers }}</span>
                    <span class="stat-label">活跃成员</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">{{ group.createdDays }}天前</span>
                    <span class="stat-label">创建</span>
                  </div>
                </div>

                <div class="group-tags">
                  <span 
                    v-for="tag in group.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="group-footer">
                <div class="group-activity">
                  <span class="activity">最后活动: {{ formatTime(group.lastActivity) }}</span>
                </div>
                <div class="group-actions">
                  <button 
                    v-if="group.isMember"
                    class="btn btn-secondary"
                    @click="leaveGroup(group.id)"
                  >
                    退出小组
                  </button>
                  <button 
                    v-else
                    class="btn btn-primary"
                    @click="joinGroup(group.id)"
                    :disabled="!userStore.isLoggedIn || (group.requiresPremium && !userStore.isPremium)"
                  >
                    {{ !userStore.isLoggedIn ? '需登录' : (group.requiresPremium && !userStore.isPremium ? '需VIP' : '加入小组') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredGroups.length === 0" class="no-groups">
            <div class="no-groups-icon">👥</div>
            <h3>暂无相关小组</h3>
            <p>请尝试调整筛选条件或创建新的小组</p>
          </div>
        </div>

        <!-- 热门内容侧边栏 -->
        <aside class="sidebar">
          <!-- 热门讨论 -->
          <div class="sidebar-card">
            <h3>🔥 热门讨论</h3>
            <div class="hot-list">
              <div 
                v-for="item in hotDiscussions" 
                :key="item.id"
                class="hot-item"
                @click="viewDiscussion(item)"
              >
                <span class="hot-title">{{ item.title }}</span>
                <span class="hot-stats">{{ item.replies }}回复</span>
              </div>
            </div>
          </div>

          <!-- 活跃用户 -->
          <div class="sidebar-card">
            <h3>👑 活跃用户</h3>
            <div class="user-list">
              <div 
                v-for="user in activeUsers" 
                :key="user.id"
                class="user-item"
              >
                <span class="user-avatar">{{ user.avatar }}</span>
                <div class="user-details">
                  <span class="user-name">{{ user.name }}</span>
                  <span class="user-points">{{ user.points }} 积分</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 社群指南 -->
          <div class="sidebar-card">
            <h3>📚 社群指南</h3>
            <div class="guide-list">
              <div class="guide-item">
                <span class="guide-icon">💡</span>
                <span>提问前请先搜索类似问题</span>
              </div>
              <div class="guide-item">
                <span class="guide-icon">🙏</span>
                <span>尊重他人，友好交流</span>
              </div>
              <div class="guide-item">
                <span class="guide-icon">✅</span>
                <span>标记已解决的问题</span>
              </div>
              <div class="guide-item">
                <span class="guide-icon">⭐</span>
                <span>VIP会员享有专属特权</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- 未登录提示 -->
        <section v-if="!userStore.isLoggedIn" class="login-prompt">
          <div class="prompt-content">
            <h3>登录以参与社群讨论</h3>
            <p>登录后可以发表讨论、回答问题、加入学习小组，与同学们互动交流</p>
            <router-link to="/login" class="btn btn-primary">立即登录</router-link>
          </div>
        </section>

        <!-- 免费用户升级提示 -->
        <section v-if="userStore.isLoggedIn && !userStore.isPremium" class="upgrade-prompt">
          <div class="prompt-content">
            <h3>升级VIP会员，解锁更多社群功能</h3>
            <p>VIP会员可创建学习小组、参与VIP专属讨论、获得优先回答等特权</p>
            <button class="btn btn-premium" @click="upgradeToPremium">
              ⭐ 升级VIP会员
            </button>
          </div>
        </section>
      </main>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>加入学习社群，与志同道合的伙伴一起进步</h2>
          <p>在这里你可以提问、分享、讨论，找到学习伙伴，共同攻克备考难关</p>
          <div class="cta-buttons">
            <button 
              class="btn btn-primary" 
              @click="startNewDiscussion"
              :disabled="!userStore.isLoggedIn"
            >
              {{ userStore.isLoggedIn ? '发起讨论' : '请先登录' }}
            </button>
            <router-link to="/practice" class="btn btn-secondary">开始练习</router-link>
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
  name: 'Community',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      mobileMenuOpen: false,
      activeSection: 'discussion',
      discussionFilter: 'all',
      qnaFilter: 'all',
      groupFilter: 'all',
      topicFilter: 'all',
      communitySections: [
        { 
          id: 'discussion', 
          name: '学习讨论区', 
          icon: '💬', 
          description: '交流学习问题和方法' 
        },
        { 
          id: 'qna', 
          name: '问答专区', 
          icon: '❓', 
          description: '提问和解答疑问' 
        },
        { 
          id: 'groups', 
          name: '学习小组', 
          icon: '👥', 
          description: '小组学习和互助' 
        }
      ],
      communityStats: {
        totalMembers: 1258,
        activeToday: 342,
        discussions: 3452
      },
      discussions: [
        {
          id: 1,
          title: '宅建业法第35条的理解与应用',
          content: '关于重要事项说明书的签名要求，有几点疑问想要请教大家...',
          author: '张同学',
          authorAvatar: '👤',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
          topic: 'business',
          tags: ['宅建业法', '重要事项说明'],
          likes: 15,
          replies: 8,
          views: 125,
          isSolved: false,
          isLiked: false,
          isBookmarked: false,
          requiresPremium: false
        },
        {
          id: 2,
          title: '求推荐好的记忆方法',
          content: '法律条文太多记不住，大家有什么好的记忆方法可以分享吗？',
          author: '李同学',
          authorAvatar: '👤',
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5小时前
          topic: 'study',
          tags: ['学习方法', '记忆技巧'],
          likes: 23,
          replies: 15,
          views: 189,
          isSolved: true,
          isLiked: true,
          isBookmarked: true,
          requiresPremium: false
        },
        {
          id: 3,
          title: 'VIP专属：高级案例分析讨论',
          content: '这是一个关于复杂不动产交易案例的深度分析讨论...',
          author: '王老师',
          authorAvatar: '👨‍🏫',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前
          topic: 'advanced',
          tags: ['案例分析', '深度讨论'],
          likes: 8,
          replies: 12,
          views: 67,
          isSolved: false,
          isLiked: false,
          isBookmarked: false,
          requiresPremium: true
        }
      ],
      questions: [
        {
          id: 1,
          title: '关于不动产登记的必要条件？',
          content: '请问在进行不动产登记时，需要满足哪些必要条件？有没有什么特别需要注意的地方？',
          author: '陈同学',
          authorAvatar: '👤',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3小时前
          topic: 'rights',
          tags: ['权利关系', '登记'],
          answers: 5,
          views: 89,
          isAnswered: true,
          requiresPremium: false
        },
        {
          id: 2,
          title: '宅建士的免许更新流程？',
          content: '请问宅建士的免许更新具体流程是怎样的？需要准备哪些材料？',
          author: '赵同学',
          authorAvatar: '👤',
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8小时前
          topic: 'business',
          tags: ['宅建业法', '免许'],
          answers: 3,
          views: 56,
          isAnswered: false,
          requiresPremium: false
        },
        {
          id: 3,
          title: 'VIP专属：复杂税务问题咨询',
          content: '这是一个关于不动产交易中复杂税务处理的问题...',
          author: '税务专家',
          authorAvatar: '👨‍💼',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前
          topic: 'tax',
          tags: ['税务', '高级'],
          answers: 7,
          views: 45,
          isAnswered: true,
          requiresPremium: true
        }
      ],
      groups: [
        {
          id: 1,
          name: '东京备考小组',
          description: '东京地区考生互助学习小组，定期组织线下学习活动',
          topic: 'regional',
          tags: ['东京', '线下学习', '互助'],
          memberCount: 45,
          activeMembers: 28,
          discussionCount: 123,
          createdDays: 45,
          lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3小时前
          isMember: false,
          requiresPremium: false
        },
        {
          id: 2,
          name: '零基础冲刺班',
          description: '零基础考生互相鼓励，共同冲刺考试',
          topic: 'beginner',
          tags: ['零基础', '每日打卡', '鼓励'],
          memberCount: 28,
          activeMembers: 18,
          discussionCount: 67,
          createdDays: 23,
          lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1小时前
          isMember: true,
          requiresPremium: false
        },
        {
          id: 3,
          name: 'VIP精英学习小组',
          description: 'VIP会员专属的高阶学习小组，深度讨论和案例分析',
          topic: 'advanced',
          tags: ['VIP专属', '深度讨论', '案例分析'],
          memberCount: 15,
          activeMembers: 12,
          discussionCount: 45,
          createdDays: 30,
          lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5小时前
          isMember: false,
          requiresPremium: true
        }
      ],
      hotDiscussions: [
        {
          id: 4,
          title: '2024年考试时间预测讨论',
          replies: 42
        },
        {
          id: 5,
          title: '各分野学习方法分享',
          replies: 35
        },
        {
          id: 6,
          title: '模拟考试经验交流',
          replies: 28
        }
      ],
      activeUsers: [
        {
          id: 1,
          name: '张老师',
          avatar: '👨‍🏫',
          points: 1250
        },
        {
          id: 2,
          name: '李学长',
          avatar: '👨‍🎓',
          points: 980
        },
        {
          id: 3,
          name: '王同学',
          avatar: '👤',
          points: 760
        }
      ]
    }
  },
  computed: {
    filteredDiscussions() {
      let filtered = this.discussions

      // 按筛选条件过滤
      if (this.discussionFilter === 'popular') {
        filtered = filtered.filter(d => d.replies > 10)
      } else if (this.discussionFilter === 'recent') {
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (this.discussionFilter === 'solved') {
        filtered = filtered.filter(d => d.isSolved)
      }

      // 按话题过滤
      if (this.topicFilter !== 'all') {
        filtered = filtered.filter(d => d.topic === this.topicFilter)
      }

      // VIP权限过滤
      if (!this.userStore.isPremium) {
        filtered = filtered.filter(d => !d.requiresPremium)
      }

      return filtered
    },
    filteredQuestions() {
      let filtered = this.questions

      // 按筛选条件过滤
      if (this.qnaFilter === 'unanswered') {
        filtered = filtered.filter(q => !q.isAnswered)
      } else if (this.qnaFilter === 'answered') {
        filtered = filtered.filter(q => q.isAnswered)
      } else if (this.qnaFilter === 'popular') {
        filtered = filtered.filter(q => q.answers > 5)
      }

      // VIP权限过滤
      if (!this.userStore.isPremium) {
        filtered = filtered.filter(q => !q.requiresPremium)
      }

      return filtered
    },
    filteredGroups() {
      let filtered = this.groups

      // 按筛选条件过滤
      if (this.groupFilter === 'active') {
        filtered = filtered.filter(g => g.activeMembers > 20)
      } else if (this.groupFilter === 'new') {
        filtered = filtered.filter(g => g.createdDays < 7)
      } else if (this.groupFilter === 'premium') {
        filtered = filtered.filter(g => g.requiresPremium)
      }

      // VIP权限过滤
      if (!this.userStore.isPremium) {
        filtered = filtered.filter(g => !g.requiresPremium)
      }

      return filtered
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
    switchSection(sectionId) {
      this.activeSection = sectionId
    },
    startNewDiscussion() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以发起讨论')
        this.$router.push('/login')
        return
      }
      
      console.log('发起新讨论')
      alert('开始创建新讨论')
    },
    askQuestion() {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以提问')
        this.$router.push('/login')
        return
      }
      
      console.log('提问求助')
      alert('开始提问')
    },
    createStudyGroup() {
      if (!this.userStore.isPremium) {
        alert('此功能需要VIP会员权限')
        return
      }
      
      console.log('创建学习小组')
      alert('开始创建学习小组')
    },
    toggleLike(discussionId) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以点赞')
        return
      }
      
      const discussion = this.discussions.find(d => d.id === discussionId)
      if (discussion) {
        discussion.isLiked = !discussion.isLiked
        discussion.likes += discussion.isLiked ? 1 : -1
        
        // 保存到本地存储
        this.saveLikesToLocalStorage()
      }
    },
    bookmarkDiscussion(discussionId) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以使用收藏功能')
        return
      }
      
      const discussion = this.discussions.find(d => d.id === discussionId)
      if (discussion) {
        discussion.isBookmarked = !discussion.isBookmarked
        
        // 保存到本地存储
        this.saveBookmarksToLocalStorage()
      }
    },
    viewDiscussion(discussion) {
      console.log('查看讨论:', discussion.title)
      // 这里应该跳转到讨论详情页面
      alert(`查看讨论: ${discussion.title}`)
    },
    answerQuestion(question) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以回答问题')
        this.$router.push('/login')
        return
      }
      
      console.log('回答问题:', question.title)
      // 这里应该跳转到回答页面
      alert(`回答问题: ${question.title}`)
    },
    viewQuestion(question) {
      console.log('查看问题:', question.title)
      // 这里应该跳转到问题详情页面
      alert(`查看问题: ${question.title}`)
    },
    joinGroup(groupId) {
      if (!this.userStore.isLoggedIn) {
        alert('请先登录以加入小组')
        this.$router.push('/login')
        return
      }
      
      const group = this.groups.find(g => g.id === groupId)
      if (group && !group.isMember) {
        group.isMember = true
        group.memberCount++
        
        // 保存到本地存储
        this.saveGroupMembershipToLocalStorage()
        
        alert(`已成功加入 ${group.name}`)
      }
    },
    leaveGroup(groupId) {
      const group = this.groups.find(g => g.id === groupId)
      if (group && group.isMember) {
        group.isMember = false
        group.memberCount--
        
        // 保存到本地存储
        this.saveGroupMembershipToLocalStorage()
        
        alert(`已退出 ${group.name}`)
      }
    },
    upgradeToPremium() {
      alert('升级VIP会员，享受更多社群功能')
      // 这里应该跳转到VIP升级页面
    },
    formatTime(date) {
      const now = new Date()
      const diff = now - new Date(date)
      
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (minutes < 60) {
        return `${minutes}分钟前`
      } else if (hours < 24) {
        return `${hours}小时前`
      } else {
        return `${days}天前`
      }
    },
    getTopicName(topic) {
      const topicMap = {
        'rights': '权利关系',
        'business': '宅建业法',
        'regulations': '法令制限',
        'tax': '税・価格',
        'study': '学习方法',
        'advanced': '高级专题',
        'regional': '地区小组',
        'beginner': '新手小组'
      }
      return topicMap[topic] || topic
    },
    saveLikesToLocalStorage() {
      const likes = this.discussions
        .filter(d => d.isLiked)
        .map(d => d.id)
      
      localStorage.setItem('communityLikes', JSON.stringify(likes))
    },
    loadLikesFromLocalStorage() {
      const savedLikes = localStorage.getItem('communityLikes')
      if (savedLikes) {
        const likes = JSON.parse(savedLikes)
        this.discussions.forEach(discussion => {
          discussion.isLiked = likes.includes(discussion.id)
        })
      }
    },
    saveBookmarksToLocalStorage() {
      const bookmarks = this.discussions
        .filter(d => d.isBookmarked)
        .map(d => d.id)
      
      localStorage.setItem('communityBookmarks', JSON.stringify(bookmarks))
    },
    loadBookmarksFromLocalStorage() {
      const savedBookmarks = localStorage.getItem('communityBookmarks')
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks)
        this.discussions.forEach(discussion => {
          discussion.isBookmarked = bookmarks.includes(discussion.id)
        })
      }
    },
    saveGroupMembershipToLocalStorage() {
      const memberships = this.groups
        .filter(g => g.isMember)
        .map(g => g.id)
      
      localStorage.setItem('groupMemberships', JSON.stringify(memberships))
    },
    loadGroupMembershipsFromLocalStorage() {
      const savedMemberships = localStorage.getItem('groupMemberships')
      if (savedMemberships) {
        const memberships = JSON.parse(savedMemberships)
        this.groups.forEach(group => {
          group.isMember = memberships.includes(group.id)
        })
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    
    // 从本地存储加载用户数据
    this.loadLikesFromLocalStorage()
    this.loadBookmarksFromLocalStorage()
    this.loadGroupMembershipsFromLocalStorage()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style>
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
  
  /* 新增社群相关变量 */
  --correct: #10b981;
  --incorrect: #ef4444;
  --warning: #f59e0b;
  --premium: #f59e0b;
}
</style>

<style scoped>
.community {
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

.section-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.section-btn {
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

.section-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(42, 121, 96, 0.1);
}

.section-btn.active {
  background: var(--primary-light);
  border-color: var(--primary);
}

.section-icon {
  font-size: 24px;
}

.section-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.section-desc {
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
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  align-items: start;
}

/* ========= 讨论区内容 ========= */
.discussion-section,
.qna-section,
.groups-section {
  grid-column: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
}

.filter-options {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary);
}

/* ========= 讨论卡片 ========= */
.discussions-list,
.questions-list,
.groups-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.discussion-card,
.question-card,
.group-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  position: relative;
}

.discussion-card:hover,
.question-card:hover,
.group-card:hover {
  box-shadow: 0 8px 24px rgba(12, 35, 50, 0.12);
}

.discussion-card.solved,
.question-card.answered {
  border-left: 4px solid var(--correct);
}

.discussion-card.popular,
.question-card.popular {
  border-left: 4px solid var(--warning);
}

.discussion-card.premium-only,
.question-card.premium-only,
.group-card.premium-only {
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

/* ========= 卡片头部 ========= */
.discussion-header,
.question-header,
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  font-size: 24px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 14px;
}

.post-time {
  font-size: 12px;
  color: var(--muted);
}

.discussion-badges,
.question-badges,
.group-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.badge.solved,
.badge.answered {
  background: color-mix(in srgb, var(--correct) 20%, transparent);
  color: var(--correct);
}

.badge.popular {
  background: color-mix(in srgb, var(--warning) 20%, transparent);
  color: var(--warning);
}

.badge.topic {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.badge.premium {
  background: var(--premium);
  color: white;
}

/* ========= 卡片内容 ========= */
.discussion-content,
.question-content,
.group-content {
  margin-bottom: 20px;
}

.discussion-title,
.question-title,
.group-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
  line-height: 1.4;
}

.group-name {
  margin-bottom: 8px;
}

.discussion-excerpt,
.question-excerpt,
.group-description {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.discussion-tags,
.question-tags,
.group-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: var(--bg);
  color: var(--muted);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

/* ========= 小组统计 ========= */
.group-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2px;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
}

/* ========= 卡片底部 ========= */
.discussion-footer,
.question-footer,
.group-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  gap: 12px;
}

.interaction-stats {
  display: flex;
  gap: 16px;
}

.interaction-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 14px;
  transition: color 0.2s ease;
  padding: 4px 8px;
  border-radius: 6px;
}

.interaction-btn:hover:not(:disabled) {
  background: var(--bg);
}

.interaction-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.interaction-btn.liked {
  color: var(--primary);
}

.answer-info,
.group-activity {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--muted);
}

.discussion-actions,
.question-actions,
.group-actions {
  display: flex;
  gap: 8px;
}

/* ========= 按钮样式 ========= */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--primary-light);
}

.btn-outline {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.btn-outline:hover:not(:disabled) {
  background: var(--bg);
  border-color: var(--muted);
}

.btn-premium {
  background: var(--premium);
  color: white;
}

.btn-premium:hover {
  background: #d97706;
}

/* ========= 侧边栏 ========= */
.sidebar {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  border: 1px solid var(--border);
}

.sidebar-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hot-list,
.user-list,
.guide-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hot-item,
.user-item,
.guide-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.hot-item:hover,
.user-item:hover {
  color: var(--primary);
}

.hot-item {
  justify-content: space-between;
}

.hot-title {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

.hot-stats {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
}

.user-avatar {
  font-size: 20px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-points {
  font-size: 12px;
  color: var(--muted);
}

.guide-item {
  padding: 8px 0;
  cursor: default;
}

.guide-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

/* ========= 无内容状态 ========= */
.no-discussions,
.no-questions,
.no-groups {
  text-align: center;
  padding: 60px 40px;
  color: var(--muted);
}

.no-discussions-icon,
.no-questions-icon,
.no-groups-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.no-discussions h3,
.no-questions h3,
.no-groups h3 {
  font-size: 20px;
  color: var(--primary-dark);
  margin-bottom: 8px;
}

.no-discussions p,
.no-questions p,
.no-groups p {
  font-size: 16px;
}

/* ========= 登录提示 ========= */
.login-prompt,
.upgrade-prompt {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 40px;
  text-align: center;
  margin: 40px 0;
  border: 1px solid var(--border);
  grid-column: 1 / -1;
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
  grid-column: 1 / -1;
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
  grid-column: 1 / -1;
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .quick-nav {
    grid-template-columns: 1fr;
  }
  
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    grid-column: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
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
  
  .section-buttons {
    grid-template-columns: 1fr;
  }
  
  .tool-buttons {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-options {
    width: 100%;
    justify-content: flex-start;
  }
  
  .discussion-header,
  .question-header,
  .group-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .discussion-footer,
  .question-footer,
  .group-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .discussion-actions,
  .question-actions,
  .group-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .btn {
    flex: 1;
    text-align: center;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
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
  
  .filter-options {
    flex-direction: column;
    width: 100%;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .discussion-actions,
  .question-actions,
  .group-actions {
    flex-direction: column;
    gap: 8px;
  }
  
  .btn {
    width: 100%;
  }
  
  .sidebar {
    grid-template-columns: 1fr;
  }
}
</style>