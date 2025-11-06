<!-- src/components/UserCenter.vue -->
<template>
  <div class="user-center">
    <button v-if="!userStore.isLoggedIn" class="login-btn" @click="openLoginDialog">
      <span class="btn-icon">🔐</span>
      <span class="btn-text">登录/注册</span>
    </button>
    
    <div v-else class="user-info" @click="toggleUserMenu">
      <div class="user-avatar">{{ userStore.user?.avatar || '👤' }}</div>
      <div class="user-details">
        <span class="user-name">{{ userStore.user?.name || '用户' }}</span>
        <span class="user-type">{{ userStore.user?.subscription === 'premium' ? 'VIP会员' : '免费会员' }}</span>
      </div>
      
      <!-- 用户菜单下拉 -->
      <div v-if="userMenuVisible" class="user-menu">
        <router-link to="/dashboard" class="menu-item" @click="closeUserMenu">
          <span class="menu-icon">📊</span>
          学习数据
        </router-link>
        <router-link to="/profile" class="menu-item" @click="closeUserMenu">
          <span class="menu-icon">⚙️</span>
          个人设置
        </router-link>
        <div class="menu-divider"></div>
        <button class="menu-item logout-item" @click="handleLogout">
          <span class="menu-icon">🚪</span>
          退出登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userMenuVisible = ref(false)

const toggleUserMenu = () => {
  userMenuVisible.value = !userMenuVisible.value
}

const closeUserMenu = () => {
  userMenuVisible.value = false
}

const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？您的学习进度已自动保存。')) {
    userStore.logout()
    closeUserMenu()
  }
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  if (!event.target.closest('.user-info')) {
    closeUserMenu()
  }
}

// 添加全局点击监听
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<style scoped>
.user-center {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
  white-space: nowrap;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background: var(--primary-dark);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: var(--primary-light);
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
}

.user-info:hover {
  background: var(--primary-lighter);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-dark);
  line-height: 1;
  white-space: nowrap;
}

.user-type {
  font-size: 0.7rem;
  color: var(--muted);
  line-height: 1;
}

/* 用户菜单 */
.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 1000;
  padding: 0.5rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  text-decoration: none;
  color: var(--text);
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.menu-icon {
  font-size: 0.9rem;
  width: 16px;
  text-align: center;
}

.menu-divider {
  height: 1px;
  background: var(--border);
  margin: 0.25rem 0;
}

.logout-item {
  color: #e53e3e;
}

.logout-item:hover {
  background: #fed7d7;
  color: #c53030;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-details {
    display: none;
  }
  
  .user-info {
    padding: 0.4rem;
  }
  
  .login-btn .btn-text {
    display: none;
  }
  
  .login-btn {
    padding: 0.4rem;
  }
}

@media (max-width: 480px) {
  .user-menu {
    right: -10px;
    min-width: 140px;
  }
}
</style>