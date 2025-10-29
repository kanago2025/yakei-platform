<template>
  <div v-if="showDialog" class="login-overlay" @click="closeDialog">
    <div class="login-dialog" @click.stop>
      <div class="dialog-header">
        <h2>{{ isLoginMode ? '用户登录' : '用户注册' }}</h2>
        <button class="close-btn" @click="closeDialog">×</button>
      </div>
      
      <div class="dialog-content">
        <!-- 模式切换 -->
        <div class="mode-toggle">
          <button 
            :class="['toggle-btn', { active: isLoginMode }]" 
            @click="switchMode(true)"
          >
            登录
          </button>
          <button 
            :class="['toggle-btn', { active: !isLoginMode }]" 
            @click="switchMode(false)"
          >
            注册
          </button>
        </div>

        <!-- 登录表单 -->
        <div v-if="isLoginMode" class="login-form">
          <div class="user-options">
            <div 
              v-for="user in demoUsers" 
              :key="user.id"
              class="user-option"
              :class="{ selected: selectedUser?.id === user.id }"
              @click="selectUser(user)"
            >
              <div class="user-avatar">{{ user.avatar }}</div>
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-type" :class="user.type">
                  {{ user.type === 'premium' ? '尊贵会员' : '免费用户' }}
                </div>
              </div>
              <div v-if="selectedUser?.id === user.id" class="selected-indicator">✓</div>
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              class="btn btn-primary btn-full" 
              @click="handleLogin"
              :disabled="!selectedUser"
            >
              立即登录
            </button>
          </div>
        </div>

        <!-- 注册表单 -->
        <div v-else class="register-form">
          <div class="form-group">
            <label>用户名</label>
            <input 
              v-model="registerData.username" 
              type="text" 
              placeholder="请输入用户名"
              class="form-input"
            >
          </div>
          
          <div class="form-group">
            <label>会员类型</label>
            <div class="subscription-options">
              <label class="subscription-option">
                <input 
                  v-model="registerData.subscription" 
                  type="radio" 
                  value="free"
                >
                <div class="option-content">
                  <div class="option-title">免费用户</div>
                  <div class="option-desc">基础学习功能</div>
                </div>
              </label>
              <label class="subscription-option">
                <input 
                  v-model="registerData.subscription" 
                  type="radio" 
                  value="premium"
                >
                <div class="option-content">
                  <div class="option-title">尊贵会员</div>
                  <div class="option-desc">完整功能体验</div>
                </div>
              </label>
            </div>
          </div>
          
          <div class="form-actions">
            <button 
              class="btn btn-primary btn-full" 
              @click="handleRegister"
              :disabled="!registerData.username.trim()"
            >
              立即注册
            </button>
          </div>
        </div>

        <!-- 演示说明 -->
        <div class="demo-notice">
          <p>💡 <strong>演示说明</strong></p>
          <p>这是模拟登录系统，数据保存在浏览器本地</p>
          <p>刷新页面不会丢失进度，可体验不同用户身份的功能差异</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const userStore = useUserStore()
const showDialog = ref(false)
const isLoginMode = ref(true)
const selectedUser = ref(null)

// 演示用户数据
const demoUsers = [
  {
    id: 1,
    name: '免费体验用户',
    avatar: '👤',
    type: 'free',
    subscription: 'free'
  },
  {
    id: 2,
    name: '尊贵会员用户', 
    avatar: '👑',
    type: 'premium',
    subscription: 'premium'
  }
]

// 注册数据
const registerData = reactive({
  username: '',
  subscription: 'free'
})

// 选择用户
const selectUser = (user) => {
  selectedUser.value = user
}

// 切换登录/注册模式
const switchMode = (isLogin) => {
  isLoginMode.value = isLogin
  if (isLogin) {
    selectedUser.value = demoUsers[0] // 默认选择第一个用户
  } else {
    // 重置注册数据
    registerData.username = ''
    registerData.subscription = 'free'
  }
}

// 处理登录
const handleLogin = () => {
  if (!selectedUser.value) {
    alert('请选择一个用户身份')
    return
  }

  const userData = {
    id: selectedUser.value.id,
    name: selectedUser.value.name,
    subscription: selectedUser.value.subscription,
    avatar: selectedUser.value.avatar,
    type: selectedUser.value.type
  }

  userStore.login(userData)
  closeDialog()
  
  // 触发登录成功事件
  window.dispatchEvent(new CustomEvent('user-login-success', {
    detail: userData
  }))
  
  // 显示登录成功提示
  alert(`🎉 登录成功！\n\n欢迎回来，${userData.name}！\n会员状态：${userData.type === 'premium' ? '尊贵会员' : '免费用户'}`)
}

// 处理注册
const handleRegister = () => {
  if (!registerData.username.trim()) {
    alert('请输入用户名')
    return
  }

  const userData = {
    id: Date.now(), // 使用时间戳作为唯一ID
    name: registerData.username,
    subscription: registerData.subscription,
    avatar: registerData.subscription === 'premium' ? '👑' : '👤',
    type: registerData.subscription
  }

  userStore.login(userData)
  closeDialog()
  
  // 触发登录成功事件
  window.dispatchEvent(new CustomEvent('user-login-success', {
    detail: userData
  }))
  
  // 显示注册成功提示
  const memberType = registerData.subscription === 'premium' ? '尊贵会员' : '免费用户'
  alert(`🎉 注册成功！\n\n欢迎加入宅学苑，${userData.name}！\n您的会员类型：${memberType}`)
}

// 关闭弹窗
const closeDialog = () => {
  showDialog.value = false
  // 重置为登录模式
  isLoginMode.value = true
  selectedUser.value = demoUsers[0]
}

// 打开登录弹窗
const openLoginDialog = () => {
  showDialog.value = true
  isLoginMode.value = true
  selectedUser.value = demoUsers[0] // 默认选择第一个用户
}

// 打开注册弹窗  
const openRegisterDialog = () => {
  showDialog.value = true
  isLoginMode.value = false
}

// 全局事件监听
const handleGlobalLoginOpen = () => {
  openLoginDialog()
}

const handleGlobalRegisterOpen = () => {
  openRegisterDialog()
}

// 组件挂载时设置事件监听
onMounted(() => {
  window.addEventListener('open-login-dialog', handleGlobalLoginOpen)
  window.addEventListener('open-register-dialog', handleGlobalRegisterOpen)
  
  // 默认选择第一个用户
  selectedUser.value = demoUsers[0]
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('open-login-dialog', handleGlobalLoginOpen)
  window.removeEventListener('open-register-dialog', handleGlobalRegisterOpen)
})
</script>

<style scoped>
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.login-dialog {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 440px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border);
}

.dialog-header h2 {
  margin: 0;
  color: var(--primary-dark);
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--muted);
  padding: 0.25rem;
  border-radius: 4px;
}

.close-btn:hover {
  background: var(--bg);
  color: var(--text);
}

.dialog-content {
  padding: 1.5rem;
}

/* 模式切换 */
.mode-toggle {
  display: flex;
  background: var(--bg);
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 1.5rem;
}

.toggle-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--primary-dark);
}

/* 用户选项 */
.user-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.user-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.user-option:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.user-option.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: var(--primary-light);
}

.user-option.selected .user-avatar {
  background: var(--primary);
  color: white;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.user-type {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  display: inline-block;
}

.user-type.free {
  background: #e3f2fd;
  color: #1976d2;
}

.user-type.premium {
  background: #fff3cd;
  color: #856404;
  font-weight: 600;
}

.selected-indicator {
  color: var(--primary);
  font-weight: bold;
  font-size: 1.2rem;
}

/* 表单样式 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--primary-dark);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(42, 121, 96, 0.1);
}

/* 订阅选项 */
.subscription-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.subscription-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.subscription-option:hover {
  border-color: var(--primary);
}

.subscription-option input[type="radio"] {
  margin: 0;
}

.option-content {
  flex: 1;
}

.option-title {
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.option-desc {
  font-size: 0.875rem;
  color: var(--muted);
}

/* 按钮样式 */
.form-actions {
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-primary:disabled {
  background: var(--muted);
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-full {
  width: 100%;
}

/* 演示说明 */
.demo-notice {
  background: var(--primary-light);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.demo-notice p {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: var(--primary-dark);
}

.demo-notice strong {
  color: var(--primary);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-overlay {
    padding: 10px;
  }
  
  .login-dialog {
    border-radius: 12px;
  }
  
  .dialog-header,
  .dialog-content {
    padding: 1rem;
  }
  
  .user-option {
    padding: 0.75rem;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
}
</style>