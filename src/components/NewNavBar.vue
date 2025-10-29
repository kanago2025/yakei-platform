<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <!-- 品牌标识 -->
        <div class="brand">
          <router-link to="/" class="brand-link">
            <span class="brand-icon">🏠</span>
            <span class="brand-name">宅学苑</span>
          </router-link>
          <span class="free-badge">免费</span>
        </div>

        <!-- 主导航 -->
        <nav class="main-nav">
          <router-link to="/" class="nav-link" active-class="active">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">首页</span>
          </router-link>
          <router-link to="/notes" class="nav-link" active-class="active">
            <span class="nav-icon">📚</span>
            <span class="nav-text">中文笔记</span>
          </router-link>
          <router-link to="/video" class="nav-link" active-class="active">
            <span class="nav-icon">🎥</span>
            <span class="nav-text">视频学习</span>
          </router-link>
          <router-link to="/practice" class="nav-link" active-class="active">
            <span class="nav-icon">💪</span>
            <span class="nav-text">强化练习</span>
          </router-link>
          <router-link to="/exam" class="nav-link" active-class="active">
            <span class="nav-icon">📝</span>
            <span class="nav-text">真题模拟</span>
          </router-link>
          <router-link to="/dashboard" class="nav-link" active-class="active">
            <span class="nav-icon">📊</span>
            <span class="nav-text">学习仪表盘</span>
          </router-link>
          <router-link to="/community" class="nav-link" active-class="active">
            <span class="nav-icon">👥</span>
            <span class="nav-text">学习社群</span>
          </router-link>
        </nav>

        <!-- 用户状态区域 - 优化版本 -->
        <div class="user-status-area">
          <div class="user-status" @click="handleUserClick">
            <div class="avatar">👤</div>
            <div class="user-info">
              <span class="user-name">{{ userName }}</span>
              <span class="user-type">{{ userType === 'premium' ? 'VIP会员' : '免费会员' }}</span>
            </div>
          </div>
          <button @click="logout" class="logout-btn" title="退出登录">
            <span class="logout-icon">🚪</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const userName = computed(() => userStore.user?.name || '访客')
const userType = computed(() => userStore.user?.subscription || 'free')

const handleUserClick = () => {
  // 可以在这里添加用户菜单的展开逻辑
  console.log('用户状态区域被点击')
}

const logout = () => {
  if (confirm('确定要退出登录吗？您的学习进度已自动保存。')) {
    userStore.user = null
    window.location.reload()
  }
}
</script>

<style scoped>
.app-header {
  background: white;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(12, 35, 50, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 1rem;
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

/* 用户状态区域 */
.user-status-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.user-status {
  display: flex;
  align-items: center;
  background-color: rgba(107, 114, 128, 0.1);
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  gap: 0.5rem;
}

.user-status:hover {
  background-color: rgba(107, 114, 128, 0.2);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-dark);
  line-height: 1;
}

.user-type {
  font-size: 0.7rem;
  color: var(--muted);
  line-height: 1;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.logout-btn:hover {
  background: #fee;
  border-color: #fcc;
  color: #c33;
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
  
  .user-info {
    display: none;
  }
  
  .user-status {
    padding: 6px;
  }
}

@media (max-width: 768px) {
  .header-content {
    height: 60px;
    gap: 0.5rem;
  }
  
  .main-nav {
    gap: 0.1rem;
    padding: 0 0.25rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.6rem;
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
}
</style>