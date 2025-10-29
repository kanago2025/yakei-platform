<!-- src/components/AppHeader.vue -->
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

        <!-- 正式的用户中心组件 -->
        <UserCenter />
      </div>
    </div>
  </header>
</template>

<script setup>
import UserCenter from './UserCenter.vue'
</script>

<style scoped>
/* 保持原有的样式 */
.app-header {
  background: white;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(12, 35, 50, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 1rem;
}

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

/* 响应式设计优化 */
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
  .brand-name {
    display: none;
  }
  
  .free-badge {
    display: none;
  }
}
</style>