<!-- src/components/AppNavBar.vue -->
<template>
  <header class="app-navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- 品牌标识 -->
        <div class="brand">
          <router-link to="/" class="brand-link">
            <span class="brand-icon">🏠</span>
            <span class="brand-name">{{ appTitle }}</span>
          </router-link>
          <span v-if="showFreeBadge" class="free-badge">免费</span>
        </div>

        <!-- 主导航 - 桌面端 -->
        <nav class="main-nav" :class="{ 'mobile-visible': mobileMenuVisible }">
          <!-- 主要学习模块 -->
          <router-link 
            to="/"
            class="nav-link"
            :class="{ active: isActive('/') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">🏠</span>
            <span class="nav-text">首页</span>
          </router-link>

          <router-link 
            to="/notes"
            class="nav-link"
            :class="{ active: isActive('/notes') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">📚</span>
            <span class="nav-text">中文笔记</span>
          </router-link>

          <router-link 
            to="/video"
            class="nav-link"
            :class="{ active: isActive('/video') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">🎥</span>
            <span class="nav-text">视频学习</span>
          </router-link>

          <router-link 
            to="/practice"
            class="nav-link"
            :class="{ active: isActive('/practice') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">💪</span>
            <span class="nav-text">强化练习</span>
          </router-link>

          <!-- 考试练习下拉菜单 -->
          <div class="dropdown-nav" @mouseenter="showExamDropdown = true" @mouseleave="showExamDropdown = false">
            <div class="dropdown-trigger nav-link" :class="{ active: isExamActive }">
              <span class="nav-icon">📝</span>
              <span class="nav-text">真题模拟</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div class="dropdown-menu" :class="{ 'dropdown-visible': showExamDropdown }">
              <router-link 
                to="/exams/simulate" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">⏱️</span>
                <span>模拟考试</span>
              </router-link>
              <router-link 
                to="/exams/history" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">📊</span>
                <span>考试记录</span>
              </router-link>
              <router-link 
                to="/exams/smart" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">🧠</span>
                <span>智能组卷</span>
              </router-link>
            </div>
          </div>

          <!-- 学习工具 -->
          <router-link 
            to="/wrong-answers"
            class="nav-link"
            :class="{ active: isActive('/wrong-answers') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">❌</span>
            <span class="nav-text">错题本</span>
          </router-link>

          <router-link 
            to="/progress"
            class="nav-link"
            :class="{ active: isActive('/progress') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">📈</span>
            <span class="nav-text">学习进度</span>
          </router-link>

          <router-link 
            to="/dashboard"
            class="nav-link"
            :class="{ active: isActive('/dashboard') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">📊</span>
            <span class="nav-text">学习仪表盘</span>
          </router-link>

          <router-link 
            to="/community"
            class="nav-link"
            :class="{ active: isActive('/community') }"
            @click="closeMobileMenu"
          >
            <span class="nav-icon">👥</span>
            <span class="nav-text">学习社群</span>
          </router-link>

          <!-- 管理员功能 - 仅管理员可见 -->
          <div v-if="isAdmin" class="dropdown-nav" @mouseenter="showAdminDropdown = true" @mouseleave="showAdminDropdown = false">
            <div class="dropdown-trigger nav-link" :class="{ active: isAdminActive }">
              <span class="nav-icon">⚙️</span>
              <span class="nav-text">后台管理</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div class="dropdown-menu" :class="{ 'dropdown-visible': showAdminDropdown }">
              <router-link 
                to="/questions/list" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">📝</span>
                <span>题目列表</span>
              </router-link>
              <router-link 
                to="/questions/add" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">➕</span>
                <span>添加题目</span>
              </router-link>
              <router-link 
                to="/questions/categories" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">📑</span>
                <span>题目分类</span>
              </router-link>
              <router-link 
                to="/questions/import" 
                class="dropdown-item"
                @click="closeMobileMenu"
              >
                <span class="dropdown-icon">📚</span>
                <span>批量导入</span>
              </router-link>
            </div>
          </div>
        </nav>

        <!-- 用户中心 -->
        <UserCenter />

        <!-- 移动端菜单按钮 -->
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span class="toggle-icon">☰</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import UserCenter from './UserCenter.vue'

const route = useRoute()
const mobileMenuVisible = ref(false)
const showExamDropdown = ref(false)
const showAdminDropdown = ref(false)

// 环境变量
const appTitle = computed(() => import.meta.env.VITE_APP_TITLE || '宅学苑')
const showFreeBadge = computed(() => import.meta.env.VITE_APP_PHASE !== 'production')

// 管理员权限检查（临时方案，后续集成正式权限系统）
const isAdmin = computed(() => {
  // 临时：开发阶段默认显示管理员功能
  return import.meta.env.MODE === 'development'
})

// 活动路由检测
const isActive = (linkPath) => {
  return route.path === linkPath || route.path.startsWith(linkPath)
}

// 考试相关路由检测
const isExamActive = computed(() => {
  return route.path.startsWith('/exams')
})

// 管理员相关路由检测
const isAdminActive = computed(() => {
  return route.path.startsWith('/questions')
})

// 移动端菜单控制
const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
  showExamDropdown.value = false
  showAdminDropdown.value = false
}

const closeMobileMenu = () => {
  if (window.innerWidth <= 768) {
    mobileMenuVisible.value = false
    showExamDropdown.value = false
    showAdminDropdown.value = false
  }
}

// 响应式处理
const handleResize = () => {
  if (window.innerWidth > 768) {
    mobileMenuVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.app-navbar {
  background: white;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(12, 35, 50, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 1rem;
  position: relative;
}

/* 品牌标识 */
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--primary-dark);
  white-space: nowrap;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-name {
  font-size: 1.3rem;
}

.free-badge {
  background-color: #ffde59;
  color: #333;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

/* 主导航 */
.main-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
  overflow-x: auto;
  padding: 0 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  text-decoration: none;
  color: var(--muted);
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
  font-size: 0.9rem;
}

.nav-link:hover {
  color: var(--primary-dark);
  background: var(--primary-light);
}

.nav-link.active {
  color: var(--primary-dark);
  background: var(--primary-light);
  font-weight: 600;
}

.nav-icon {
  font-size: 1rem;
}

.nav-text {
  font-size: 0.85rem;
}

/* 下拉菜单样式 */
.dropdown-nav {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dropdown-arrow {
  font-size: 0.6rem;
  transition: transform 0.3s ease;
  margin-left: 0.2rem;
}

.dropdown-nav:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
  padding: 0.5rem 0;
}

.dropdown-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.dropdown-item:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.dropdown-item.router-link-active {
  background: var(--primary-light);
  color: var(--primary-dark);
  font-weight: 600;
}

.dropdown-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

/* 移动端菜单按钮 */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--muted);
  font-size: 1.2rem;
}

.mobile-menu-toggle:hover {
  background: var(--primary-light);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-text {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem;
  }
  
  .brand-name {
    font-size: 1.1rem;
  }

  .dropdown-item .nav-text {
    display: block;
  }
}

@media (max-width: 768px) {
  .navbar-content {
    height: 60px;
    gap: 0.5rem;
  }
  
  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-top: 1px solid var(--border);
    z-index: 1000;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .main-nav.mobile-visible {
    display: flex;
  }
  
  .nav-link {
    padding: 0.8rem 1rem;
    justify-content: flex-start;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 0.25rem;
  }
  
  .nav-text {
    display: block;
  }

  /* 移动端下拉菜单处理 */
  .dropdown-nav {
    width: 100%;
    flex-direction: column;
  }

  .dropdown-trigger {
    width: 100%;
    justify-content: flex-start;
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    border: none;
    background: transparent;
    padding: 0;
    margin-left: 1rem;
    min-width: auto;
  }

  .dropdown-item {
    padding: 0.6rem 1rem;
    border-radius: 6px;
    margin-bottom: 0.25rem;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .brand {
    gap: 0.5rem;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .free-badge {
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .brand-name {
    display: none;
  }
  
  .free-badge {
    display: none;
  }

  .dropdown-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}

/* 确保CSS变量存在 */
:root {
  --primary: #2a7960;
  --primary-dark: #1e5a47;
  --primary-light: rgba(42, 121, 96, 0.1);
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --border: #e2e8f0;
  --text: #334155;
  --muted: #64748b;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>