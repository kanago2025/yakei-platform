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

    <main class="notes-detail-content">
      <div class="breadcrumb">
        <router-link to="/notes">中文笔记</router-link>
        <span class="separator">/</span>
        <router-link to="/notes-agent">智能笔记</router-link>
        <span class="separator">/</span>
        <span class="current">重要事项说明</span>
      </div>

      <div class="page-header">
        <h1>重要事项说明</h1>
        <p>宅建考试中的关键知识点和重要注意事项</p>
      </div>

      <div class="content-section">
        <div class="section-card">
          <h2>🔍 重要事項説明の義務</h2>
          <div class="content-item">
            <h3>说明义务的范围</h3>
            <ul>
              <li>宅建業者必須对客户进行重要事项的说明</li>
              <li>说明必须在契約締結前进行</li>
              <li>必须使用书面形式进行说明</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>必须说明的事项</h3>
            <ul>
              <li>物件的基本信息（面积、构造等）</li>
              <li>权利关系（所有权、抵押权等）</li>
              <li>交易条件（价格、付款方式等）</li>
              <li>法令上的限制</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>📝 说明的时机和方法</h2>
          <div class="content-item">
            <h3>说明时机</h3>
            <ul>
              <li>必须在契約締結前进行说明</li>
              <li>给予客户充分的考虑时间</li>
              <li>说明后必须获得客户的书面确认</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>说明方法</h3>
            <ul>
              <li>使用客户能够理解的语言进行说明</li>
              <li>必须提供书面材料</li>
              <li>重要部分需要特别强调说明</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>⚖️ 违反说明义务的后果</h2>
          <div class="content-item">
            <h3>法律后果</h3>
            <ul>
              <li>可能被取消交易</li>
              <li>需要承担损害赔偿责任</li>
              <li>可能受到行政处分</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>实务注意事项</h3>
            <ul>
              <li>确保说明内容的完整性</li>
              <li>保留说明的记录和证据</li>
              <li>定期更新说明内容</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/notes-agent" class="btn btn-secondary">返回智能笔记</router-link>
        <button class="btn btn-primary" @click="markAsLearned">标记为已学习</button>
      </div>
    </main>

    <footer class="footer">
      <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NotesImportantMattersPage',
  data() {
    return {
      mobileMenuVisible: false,
      learned: false
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
    },
    markAsLearned() {
      this.learned = true
      alert('已标记为已学习！')
    }
  }
}
</script>

<style scoped>
.notes-detail-content {
  padding: 40px 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 14px;
  color: var(--muted);
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb .separator {
  color: var(--border);
}

.breadcrumb .current {
  color: var(--text);
  font-weight: 600;
}

.page-header {
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
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
}

.section-card {
  background: var(--card-bg);
  padding: 40px;
  border-radius: var(--radius);
  box-shadow: 0 6px 18px rgba(12, 35, 50, 0.06);
  border: 1px solid rgba(11, 33, 48, 0.04);
}

.section-card h2 {
  color: var(--primary-dark);
  margin-bottom: 30px;
  font-size: 24px;
  border-bottom: 2px solid var(--primary-light);
  padding-bottom: 10px;
}

.content-item {
  margin-bottom: 30px;
}

.content-item:last-child {
  margin-bottom: 0;
}

.content-item h3 {
  color: var(--primary);
  margin-bottom: 15px;
  font-size: 18px;
}

.content-item ul {
  list-style: none;
  padding-left: 0;
}

.content-item li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: var(--text);
  line-height: 1.6;
}

.content-item li:before {
  content: "•";
  color: var(--primary);
  font-weight: bold;
  position: absolute;
  left: 8px;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 40px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-card {
    padding: 25px;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-buttons .btn {
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