<template>
  <header class="base-nav">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="logo">
          <span class="mark">宅</span>
          <span class="name">宅学苑</span>
        </router-link>
        
        <nav class="nav-links" :class="{ 'mobile-visible': mobileMenuVisible }">
          <router-link 
            v-for="link in navLinks" 
            :key="link.to"
            :to="link.to" 
            :class="{ active: isActive(link.to) }"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </router-link>
          <router-link to="/login" @click="closeMobileMenu">登录 / 注册</router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BaseNav',
  props: {
    activeRoute: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const route = useRoute()
    const mobileMenuVisible = ref(false)
    
    const navLinks = [
      { to: '/', label: '首页' },
      { to: '/notes', label: '中文笔记' },
      { to: '/notes-agent', label: '智能笔记' },
      { to: '/video', label: '视频学习' },
      { to: '/practice', label: '强化练习' },
      { to: '/exam', label: '真题模拟' },
      { to: '/community', label: '学习社群' },
      { to: '/dashboard', label: '学习仪表盘' }
    ]

    const isActive = (linkTo) => {
      return props.activeRoute === linkTo || route.path === linkTo
    }

    const toggleMobileMenu = () => {
      mobileMenuVisible.value = !mobileMenuVisible.value
    }

    const closeMobileMenu = () => {
      if (window.innerWidth <= 768) {
        mobileMenuVisible.value = false
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        mobileMenuVisible.value = true
      } else {
        mobileMenuVisible.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
      handleResize()
    })

    return {
      navLinks,
      mobileMenuVisible,
      isActive,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
.base-nav {
  background: var(--card-bg);
  box-shadow: 0 2px 10px rgba(12, 35, 50, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-content {
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

.nav-links a:hover,
.nav-links a.active {
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
    gap: 10px;
  }
  
  .nav-links.mobile-visible {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
</style>