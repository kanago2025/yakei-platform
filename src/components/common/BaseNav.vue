<template>
  <header class="base-nav">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="nav-logo">
        <span class="logo-mark">宅</span>
        <span class="logo-name">宅学苑</span>
      </router-link>
      
      <!-- 桌面导航 -->
      <nav class="nav-links" :class="{ 'mobile-show': mobileMenuOpen }">
        <router-link 
          v-for="item in navItems" 
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </router-link>
      </nav>
      
      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        ☰
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BaseNav',
  props: {
    activeRoute: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      navItems: [
        { to: '/', label: '首页' },
        { to: '/notes', label: '中文笔记' },
        { to: '/video', label: '视频学习' },
        { to: '/practice', label: '强化练习' },
        { to: '/exam', label: '真题模拟' },
        { to: '/community', label: '学习社群' },
        { to: '/dashboard', label: '学习仪表盘' },
        { to: '/login', label: '登录 / 注册' }
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    isActive(route) {
      return this.$route.path === route
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.base-nav {
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--primary-dark);
  text-decoration: none;
  font-size: 18px;
}

.logo-mark {
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
  gap: 8px;
}

.nav-link {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.nav-link.active {
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

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 12px 12px;
    margin: 0 20px;
  }
  
  .nav-links.mobile-show {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
</style>