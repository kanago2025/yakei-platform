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

    <!-- 统一导航栏 -->
    <AppNavBar />

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
              <router-link v-if="userStore.isLoggedIn" to="/data-management">数据管理</router-link>
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
    
    <!-- 添加数据同步状态组件 -->
    <DataSyncStatus v-if="showSyncStatus" />

    <!-- 全局弹窗 -->
    <SimulatedLogin />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import AppNavBar from '@/components/AppNavBar.vue'
import SimulatedLogin from '@/components/SimulatedLogin.vue'
import DataSyncStatus from '@/components/DataSyncStatus.vue'

const userStore = useUserStore()

// 计算属性 - 只在用户登录时显示同步状态
const showSyncStatus = computed(() => userStore.isLoggedIn)

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
    title: import.meta.env.VITE_APP_TITLE || '宅学苑',
    phase: import.meta.env.VITE_APP_PHASE || 'test',
    mode: import.meta.env.MODE || 'development'
  }
  
  // 在控制台输出环境变量，方便调试
  console.log('=== 环境变量验证 ===')
  console.log('VITE_APP_TITLE:', import.meta.env.VITE_APP_TITLE)
  console.log('VITE_APP_PHASE:', import.meta.env.VITE_APP_PHASE)
  console.log('MODE:', import.meta.env.MODE)
  console.log('===================')
})

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
@media (max-width: 768px) {
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