<!-- src/components/UserCenter.vue -->
<template>
  <div class="user-center">
    <!-- 未登录状态 -->
    <div v-if="!userStore.isLoggedIn" class="user-center-guest">
      <button class="login-btn" @click="openLoginDialog">
        <span class="btn-icon">🔐</span>
        <span class="btn-text">登录/注册</span>
      </button>
    </div>

    <!-- 已登录状态 -->
    <div v-else class="user-center-logged">
      <div class="user-info">
        <div class="user-avatar">{{ userStore.user?.avatar || '👤' }}</div>
        <div class="user-details">
          <div class="user-name">{{ userStore.userName }}</div>
          <div class="user-type" :class="userStore.userType">
            {{ userStore.userType === 'premium' ? '👑 尊贵会员' : '👤 免费用户' }}
          </div>
        </div>
      </div>
      <div class="user-actions">
        <button class="logout-btn" @click="handleLogout" title="退出登录">
          <span class="logout-icon">🚪</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 打开登录弹窗
const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
  console.log('🔔 触发登录弹窗事件')
}

// 处理退出登录
const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
    alert('您已成功退出登录')
  }
}
</script>

<style scoped>
.user-center {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* 未登录状态样式 */
.user-center-guest {
  display: flex;
  align-items: center;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.login-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-icon {
  font-size: 1rem;
}

.btn-text {
  font-size: 0.85rem;
}

/* 已登录状态样式 */
.user-center-logged {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.user-info:hover {
  background: var(--primary-light);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.user-name {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 0.9rem;
  white-space: nowrap;
}

.user-type {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-weight: 500;
  white-space: nowrap;
}

.user-type.free {
  background: #e3f2fd;
  color: #1976d2;
}

.user-type.premium {
  background: #fff3cd;
  color: #856404;
}

.logout-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: var(--muted);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:hover {
  background: var(--bg);
  color: var(--error-color);
}

.logout-icon {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-center {
    gap: 0.5rem;
  }
  
  .login-btn {
    padding: 0.5rem 1rem;
  }
  
  .btn-text {
    display: none;
  }
  
  .user-details {
    display: none;
  }
  
  .user-info {
    padding: 0.25rem;
  }
}

@media (max-width: 480px) {
  .user-avatar {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
}
</style>