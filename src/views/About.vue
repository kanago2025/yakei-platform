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
        <router-link to="/notes-agent" @click="closeMobileMenu">智能笔记</router-link>
        <router-link to="/video" @click="closeMobileMenu">视频学习</router-link>
        <router-link to="/practice" @click="closeMobileMenu">强化练习</router-link>
        <router-link to="/exam" @click="closeMobileMenu">真题模拟</router-link>
        <router-link to="/community" @click="closeMobileMenu">学习社群</router-link>
        <router-link to="/dashboard" @click="closeMobileMenu">学习仪表盘</router-link> 
        <router-link to="/login" @click="closeMobileMenu">登录 / 注册</router-link>
      </nav>
      
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
    </header>

    <main class="about-content">
      <div class="page-header">
        <h1>关于宅学苑</h1>
        <p>专注日本宅建士考试的中文学习平台</p>
      </div>

      <div class="about-sections">
        <section class="about-section">
          <div class="section-content">
            <h2>我们的使命</h2>
            <p>宅学苑致力于为中文学习者提供最专业、最系统的日本宅建士考试备考服务。我们相信语言不应成为学习专业知识的障碍，通过中文理解日本法律法规，让备考之路更加顺畅。</p>
          </div>
          <div class="section-image">
            <div class="placeholder-image">🎯</div>
          </div>
        </section>

        <section class="about-section reverse">
          <div class="section-content">
            <h2>平台特色</h2>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">📚</div>
                <h3>中文理解</h3>
                <p>基于中文的考试内容解析，消除语言障碍</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🤖</div>
                <h3>智能学习</h3>
                <p>AI驱动的个性化学习路径和复习计划</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">👥</div>
                <h3>社群支持</h3>
                <p>与数千名学习者共同进步，互相支持</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📊</div>
                <h3>数据驱动</h3>
                <p>基于学习数据的智能分析和建议</p>
              </div>
            </div>
          </div>
        </section>

        <section class="about-section">
          <div class="section-content">
            <h2>团队介绍</h2>
            <p>我们的团队由资深宅建士、法律专业人士和教育技术专家组成。团队成员均具有丰富的日本房地产行业经验和教学经验，深谙考试要点和学习难点。</p>
            <div class="team-stats">
              <div class="stat">
                <div class="stat-number">5+</div>
                <div class="stat-label">年行业经验</div>
              </div>
              <div class="stat">
                <div class="stat-number">1000+</div>
                <div class="stat-label">学员服务</div>
              </div>
              <div class="stat">
                <div class="stat-number">95%</div>
                <div class="stat-label">用户满意度</div>
              </div>
            </div>
          </div>
          <div class="section-image">
            <div class="placeholder-image">👨‍💼</div>
          </div>
        </section>

        <section class="cta-section">
          <h2>开始您的宅建士备考之旅</h2>
          <p>加入宅学苑，让专业团队为您的考试保驾护航</p>
          <div class="cta-buttons">
            <router-link to="/register" class="btn btn-primary">立即注册</router-link>
            <router-link to="/notes-agent" class="btn btn-secondary">开始学习</router-link>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer">
      <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
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
.about-content {
  padding: 40px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
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

.about-sections {
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-section.reverse {
  grid-template-columns: 1fr 1fr;
  direction: rtl;
}

.about-section.reverse .section-content {
  direction: ltr;
}

.section-content h2 {
  color: var(--primary-dark);
  margin-bottom: 20px;
  font-size: 28px;
}

.section-content p {
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 30px;
  font-size: 16px;
}

.section-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-image {
  font-size: 120px;
  opacity: 0.7;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.feature-item {
  text-align: center;
  padding: 25px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.feature-item h3 {
  color: var(--primary-dark);
  margin-bottom: 10px;
  font-size: 18px;
}

.feature-item p {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0;
}

.team-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.stat {
  text-align: center;
  padding: 25px;
  background: var(--primary-light);
  border-radius: var(--radius);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
}

.cta-section {
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: 20px;
  margin-top: 40px;
}

.cta-section h2 {
  color: var(--primary-dark);
  margin-bottom: 16px;
  font-size: 32px;
}

.cta-section p {
  color: var(--muted);
  margin-bottom: 30px;
  font-size: 18px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .about-section {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .about-section.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .team-stats {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
  
  .section-content h2 {
    font-size: 24px;
  }
  
  .cta-section h2 {
    font-size: 28px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-buttons .btn {
    width: 100%;
    max-width: 300px;
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 6px 16px rgba(42, 121, 96, 0.25);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(42, 121, 96, 0.35);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-dark);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
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