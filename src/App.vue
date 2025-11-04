<template>
  <div id="app">
    <!-- 环境变量调试信息 - 部署后可以删除 -->
    <div v-if="showDebugInfo" class="debug-info">
      <h3>环境变量调试信息</h3>
      <p><strong>应用标题:</strong> {{ envInfo.title }}</p>
      <p><strong>当前环境:</strong> {{ envInfo.phase }}</p>
      <p><strong>构建模式:</strong> {{ envInfo.mode }}</p>
      <button @click="showDebugInfo = false" class="close-debug-btn">关闭</button>
    </div>

    <!-- 全局导航栏 -->
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <!-- 品牌标识 -->
          <div class="brand">
            <router-link to="/" class="brand-link">
              <span class="brand-icon">🏠</span>
              <span class="brand-name">{{ envInfo.title }}</span>
            </router-link>
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

          <!-- 用户中心 - 简化版本 -->
          <div class="user-center">
            <button v-if="!userStore.isLoggedIn" class="login-btn" @click="openLoginDialog">
              <span class="btn-icon">🔐</span>
              <span class="btn-text">登录/注册</span>
            </button>
            <div v-else class="user-info-simple">
              <div class="user-avatar-small">{{ userStore.user?.avatar || '👤' }}</div>
              <div class="user-name-truncated">{{ userStore.userName }}</div>
              <button class="logout-btn-small" @click="handleLogout" title="退出登录">
                <span>🚪</span>
              </button>
            </div>
          </div>
        </div> <!-- 关闭 header-content -->
      </div> <!-- 关闭 container -->
    </header> <!-- 关闭 app-header -->

    <!-- 主要内容区域 -->
    <main class="app-main">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <div class="footer-logo">
              <span class="logo-icon">🏠</span>
              <span class="logo-text">{{ envInfo.title }}</span>
            </div>
            <p class="footer-desc">
              专为在日华人设计的宅建士资格考试备考平台
            </p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>学习资源</h4>
              <router-link to="/notes">中文笔记</router-link>
              <router-link to="/video">视频学习</router-link>
              <router-link to="/practice">强化练习</router-link>
              <router-link to="/exam">真题模拟</router-link>
            </div>
            <div class="link-group">
              <h4>平台信息</h4>
              <router-link to="/about">关于我们</router-link>
              <a href="#" @click.prevent="showHelpInfo">使用帮助</a>
              <a href="#" @click.prevent="showContactInfo">联系我们</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 {{ envInfo.title }} - 日本宅建士考试中文学习平台</p>
          <p class="env-badge" v-if="envInfo.phase !== 'production'">
            [{{ envInfo.phase.toUpperCase() }} 环境]
          </p>
        </div>
      </div>
    </footer>

    <!-- 全局弹窗 -->
    <SimulatedLogin />
  </div> <!-- 关闭 app -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import SimulatedLogin from '@/components/SimulatedLogin.vue'

const userStore = useUserStore()

// 环境变量调试信息
const showDebugInfo = ref(true)
const envInfo = ref({
  title: '',
  phase: '',
  mode: ''
})

onMounted(() => {
  // 获取环境变量
  envInfo.value = {
    title: import.meta.env.VITE_APP_TITLE,
    phase: import.meta.env.VITE_APP_PHASE,
    mode: import.meta.env.MODE
  }
  
  // 在控制台输出环境变量，方便调试
  console.log('=== 环境变量验证 ===')
  console.log('VITE_APP_TITLE:', import.meta.env.VITE_APP_TITLE)
  console.log('VITE_APP_PHASE:', import.meta.env.VITE_APP_PHASE)
  console.log('MODE:', import.meta.env.MODE)
  console.log('===================')
})

const openLoginDialog = () => {
  window.dispatchEvent(new CustomEvent('open-login-dialog'))
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
  }
}

const showHelpInfo = () => {
  alert('使用帮助信息正在完善中，敬请期待！\n\n如有问题请联系客服：contact@zhaixueyuan.com')
}

const showContactInfo = () => {
  alert('联系我们：\n\n📧 邮箱：contact@zhaixueyuan.com\n💬 客服微信：zhaixueyuan_kefu\n🏢 办公时间：周一至周五 9:00-18:00')
}
</script>

<style scoped>
/* 调试信息样式 */
.debug-info {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  padding: 15px;
  z-index: 10000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  font-family: monospace;
  font-size: 12px;
}

.debug-info h3 {
  margin: 0 0 10px 0;
  color: #ff6b6b;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.debug-info p {
  margin: 5px 0;
  line-height: 1.4;
}

.debug-info strong {
  color: #333;
}

.close-debug-btn {
  margin-top: 10px;
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}

.close-debug-btn:hover {
  background: #ff5252;
}

/* 环境标识徽章 */
.env-badge {
  display: inline-block;
  margin-left: 10px;
  padding: 2px 8px;
  background: #ffd700;
  color: #333;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
}

/* 主布局 */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 */
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
}

.brand-icon {
  font-size: 1.5rem;
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

.nav-link:hover,
.nav-link.active {
  color: var(--primary-dark);
  background: var(--primary-light);
}

.nav-icon {
  font-size: 1rem;
}

/* 简化用户中心样式 */
.user-center {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  min-width: fit-content;
}

.user-info-simple {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem;
  border-radius: 6px;
  background: var(--primary-light);
}

.user-avatar-small {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.user-name-truncated {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 0.8rem;
  white-space: nowrap;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn-small {
  background: none;
  border: none;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logout-btn-small:hover {
  background: rgba(0, 0, 0, 0.1);
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
  flex-shrink: 0;
}

.login-btn:hover {
  background: var(--primary-dark);
}

/* 主要内容区域 */
.app-main {
  flex: 1;
  padding: 0;
  min-height: calc(100vh - 140px);
}

/* 页脚样式 */
.app-footer {
  background: white;
  border-top: 1px solid var(--border);
  padding: 2rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-info {
  flex: 1;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--primary-dark);
}

.footer-desc {
  color: var(--muted);
  line-height: 1.5;
}

.footer-links {
  display: flex;
  gap: 3rem;
}

.link-group h4 {
  margin-bottom: 1rem;
  color: var(--primary-dark);
  font-size: 1rem;
}

.link-group a {
  display: block;
  color: var(--muted);
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: var(--primary);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 1100px) {
  .nav-text {
    display: none;
  }
  
  .nav-link {
    padding: 0.4rem;
  }
  
  .brand-name {
    font-size: 1.1rem;
  }
}

@media (max-width: 900px) {
  .header-content {
    gap: 0.25rem;
  }
  
  .main-nav {
    gap: 0.05rem;
  }
  
  .nav-link {
    padding: 0.35rem 0.5rem;
  }
  
  .user-name-truncated {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-content {
    height: 55px;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .nav-link {
    padding: 0.3rem 0.4rem;
    font-size: 0.75rem;
  }
  
  .login-btn .btn-text {
    display: none;
  }
  
  .login-btn {
    padding: 0.4rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-links {
    gap: 2rem;
  }
  
  /* 移动端调试信息调整 */
  .debug-info {
    max-width: 250px;
    font-size: 11px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .brand-name {
    display: none;
  }
  
  .nav-icon {
    font-size: 0.9rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .debug-info {
    max-width: 200px;
    font-size: 10px;
  }
}
</style>