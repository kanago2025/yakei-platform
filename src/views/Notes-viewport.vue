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
        <span class="current">建筑规制</span>
      </div>

      <div class="page-header">
        <h1>建筑规制</h1>
        <p>建筑法规和限制条件，容积率、建蔽率等关键概念</p>
      </div>

      <div class="content-section">
        <div class="section-card">
          <h2>📐 容积率与建蔽率</h2>
          <div class="content-item">
            <h3>容积率（容積率）</h3>
            <ul>
              <li>定义：建筑面积与用地面积的比例</li>
              <li>计算公式：容积率 = 总建筑面积 ÷ 用地面积</li>
              <li>用途：控制建筑密度和人口密度</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>建蔽率（建ぺい率）</h3>
            <ul>
              <li>定义：建筑基底面积与用地面积的比例</li>
              <li>计算公式：建蔽率 = 建筑基底面积 ÷ 用地面积</li>
              <li>用途：确保空地率和通风采光</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>🏗️ 建筑限制</h2>
          <div class="content-item">
            <h3>高度限制</h3>
            <ul>
              <li>绝对高度限制</li>
              <li>斜线限制（道路斜线、邻地斜线）</li>
              <li>日影规制</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>用途地域</h3>
            <ul>
              <li>第一种低层住居专用地域</li>
              <li>第二种中高层住居专用地域</li>
              <li>商业地域</li>
              <li>工业地域</li>
            </ul>
          </div>
        </div>

        <div class="section-card">
          <h2>📏 建筑基准法要点</h2>
          <div class="content-item">
            <h3>安全基准</h3>
            <ul>
              <li>结构安全性</li>
              <li>防火安全性</li>
              <li>避难安全性</li>
            </ul>
          </div>
          
          <div class="content-item">
            <h3>卫生基准</h3>
            <ul>
              <li>采光基准</li>
              <li>通风基准</li>
              <li>给排水设备</li>
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
  name: 'NotesViewportPage',
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
/* 复用 notes-important-matters.vue 的样式 */
</style>