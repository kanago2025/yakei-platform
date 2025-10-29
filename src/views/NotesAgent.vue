<template>
  <div class="container">
    <header class="top-nav">
      <router-link to="/" class="logo">
        <span class="mark">宅</span>
        <span class="name">宅学苑</span>
      </router-link>
      
      <nav class="nav-links" :style="{ display: mobileMenuVisible ? 'flex' : 'none' }">
        <router-link to="/" @click="closeMobileMenu">首页</router-link>
        <router-link to="/notes" @click="closeMobileMenu">中文笔记</router-link>
        <router-link to="/video" @click="closeMobileMenu">视频学习</router-link>
        <router-link to="/practice" @click="closeMobileMenu">强化练习</router-link>
        <router-link to="/exam" @click="closeMobileMenu">真题模拟</router-link>
        <router-link to="/community" @click="closeMobileMenu">学习社群</router-link>
        <router-link to="/dashboard" @click="closeMobileMenu">学习仪表盘</router-link> 
        <router-link to="/login" @click="closeMobileMenu">登录 / 注册</router-link>
      </nav>
      
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
    </header>

    <main class="notes-agent-content">
      <div class="page-header">
        <h1>智能笔记系统</h1>
        <p>AI驱动的个性化学习笔记，根据您的学习习惯智能生成</p>
      </div>

      <div class="ai-features">
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-icon">🤖</div>
            <h3>智能总结</h3>
            <p>自动提取重点内容，生成简洁明了的笔记</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <h3>个性化推荐</h3>
            <p>根据学习进度推荐相关知识点</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h3>进度追踪</h3>
            <p>实时跟踪学习进度和掌握程度</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔄</div>
            <h3>智能复习</h3>
            <p>基于遗忘曲线安排复习计划</p>
          </div>
        </div>
      </div>

      <div class="notes-categories">
        <h2>笔记分类</h2>
        <div class="category-grid">
          <router-link to="/notes-important-matters" class="category-card">
            <div class="category-icon">⭐</div>
            <h3>重要事项说明</h3>
            <p>考试重点和关键知识点</p>
          </router-link>
          
          <router-link to="/notes-mortgage" class="category-card">
            <div class="category-icon">🏠</div>
            <h3>抵押権相关知识</h3>
            <p>抵押权法律条文和实务</p>
          </router-link>
          
          <router-link to="/notes-viewport" class="category-card">
            <div class="category-icon">📐</div>
            <h3>建筑規制</h3>
            <p>建筑法规和限制条件</p>
          </router-link>
          
          <div class="category-card coming-soon">
            <div class="category-icon">📝</div>
            <h3>更多分类</h3>
            <p>持续更新中...</p>
          </div>
        </div>
      </div>

      <div class="recent-notes">
        <h2>最近学习</h2>
        <div class="notes-list">
          <div class="note-preview">
            <h4>宅建業法第35条</h4>
            <p>媒介契約的重要条款和注意事项...</p>
            <div class="note-meta">
              <span>📚 法律法规</span>
              <span>⏱ 2小时前</span>
            </div>
          </div>
          <div class="note-preview">
            <h4>抵当権の実行</h4>
            <p>抵押权实现的程序和条件...</p>
            <div class="note-meta">
              <span>🏠 抵押権</span>
              <span>⏱ 1天前</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NotesAgentPage',
  data() {
    return {
      mobileMenuVisible: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible
    },
    closeMobileMenu() {
      if (window.innerWidth <= 768) {
        this.mobileMenuVisible = false
      }
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.mobileMenuVisible = true
      } else {
        this.mobileMenuVisible = false
      }
    }
  }
}
</script>

<style scoped>
.notes-agent-content {
  padding: 40px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-header h1 {
  font-size: 36px;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.page-header p {
  font-size: 18px;
  color: var(--muted);
  max-width: 600px;
  margin: 0 auto;
}

.ai-features {
  margin-bottom: 60px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-item {
  text-align: center;
  padding: 30px 20px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-item h3 {
  color: var(--primary-dark);
  margin-bottom: 12px;
  font-size: 18px;
}

.feature-item p {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.notes-categories {
  margin-bottom: 60px;
}

.notes-categories h2 {
  color: var(--primary-dark);
  margin-bottom: 30px;
  font-size: 24px;
  text-align: center;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.category-card {
  background: var(--card-bg);
  padding: 30px;
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(12, 35, 50, 0.06);
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(12, 35, 50, 0.12);
  border-color: var(--primary);
}

.category-card.coming-soon {
  opacity: 0.7;
  background: var(--primary-light);
}

.category-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.category-card h3 {
  color: var(--primary-dark);
  margin-bottom: 12px;
  font-size: 20px;
}

.category-card p {
  color: var(--muted);
  font-size: 14px;
}

.recent-notes h2 {
  color: var(--primary-dark);
  margin-bottom: 20px;
  font-size: 24px;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.note-preview {
  background: var(--card-bg);
  padding: 25px;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(12, 35, 50, 0.06);
  border-left: 4px solid var(--primary);
}

.note-preview h4 {
  color: var(--primary-dark);
  margin-bottom: 10px;
  font-size: 18px;
}

.note-preview p {
  color: var(--muted);
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
}

.note-meta {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: var(--muted);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .feature-grid,
  .category-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
}

/* 复用导航栏和页脚样式 */
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

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
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

.footer {
  text-align: center;
  padding: 40px 0;
  margin-top: 60px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
</style>