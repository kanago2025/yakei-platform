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
        <span class="current">抵押権相关知识</span>
      </div>

      <div class="page-header">
        <h1>抵押権相关知识</h1>
        <p>抵押权的基本概念、设立、实现和相关法律规定</p>
      </div>

      <div class="content-section">
        <div class="section-card">
          <h2>🏦 抵押権的基本概念</h2>
          <div class="content-item">
            <h3>定义</h3>
            <p>抵押权是指债权人（抵押权人）对债务人或者第三人不转移占有而供担保的财产，在债务人不履行债务时，依法享有的就该财产变价并优先受偿的权利。</p>
          </div>
          
          <div class="content-item">
            <h3>特征</h3>
            <ul>
              <li>不转移占有：抵押物仍由抵押人占有使用</li>
              <li>优先受偿权：抵押权人享有优先受偿的权利</li>
              <li>从属性：抵押权从属于主债权</li>
              <li>不可分性：抵押权及于抵押物的全部</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>📄 抵押权的设立</h2>
          <div class="content-item">
            <h3>设立要件</h3>
            <ul>
              <li>书面抵押合同</li>
              <li>抵押登记（不动产）</li>
              <li>抵押物的特定性</li>
              <li>被担保债权的存在</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>抵押物范围</h3>
            <ul>
              <li>不动产（土地、建筑物）</li>
              <li>准不动产（船舶、航空器等）</li>
              <li>权利（地上权、永佃权等）</li>
              <li>特定动产</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>⚖️ 抵押权的实现</h2>
          <div class="content-item">
            <h3>实现条件</h3>
            <ul>
              <li>债务履行期限届满</li>
              <li>债务人未履行债务</li>
              <li>抵押权有效存在</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>实现方式</h3>
            <ul>
              <li>协议折价</li>
              <li>拍卖</li>
              <li>变卖</li>
              <li>诉讼实现</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>🛡️ 特殊抵押权</h2>
          <div class="content-item">
            <h3>最高额抵押权</h3>
            <ul>
              <li>为一定期间内连续发生的债权提供担保</li>
              <li>设定最高限额</li>
              <li>债权确定前可转让</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>共同抵押权</h3>
            <ul>
              <li>同一债权有多个抵押物担保</li>
              <li>各抵押物承担担保责任</li>
              <li>可实现顺序的选择</li>
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
  name: 'NotesMortgagePage',
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
/* 复用 NotesImportantMatters.vue 的样式 */
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

.content-item p {
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 15px;
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