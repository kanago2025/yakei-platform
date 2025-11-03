<template>
  <div class="login">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>登录账户</h1>
          <p>登录以继续您的学习进度</p>
        </div>
      </div>

      <!-- 登录表单 -->
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-icon">🔐</div>
            <h1 class="auth-title">登录账户</h1>
            <p class="auth-subtitle">登录以继续您的学习进度</p>
          </div>
          
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label class="form-label" for="email">电子邮箱</label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  class="form-input" 
                  :class="{ error: errors.email }"
                  placeholder="请输入您的电子邮箱" 
                  required
                  @blur="validateEmail"
                >
              </div>
              <div class="error-message" v-if="errors.email">{{ errors.email }}</div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="password">密码</label>
              <div class="input-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="form.password"
                  class="form-input" 
                  :class="{ error: errors.password }"
                  placeholder="请输入您的密码" 
                  required
                  @blur="validatePassword"
                >
                <button type="button" class="password-toggle" @click="togglePassword">
                  {{ showPassword ? '🔒' : '👁' }}
                </button>
              </div>
              <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
            </div>
            
            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember" v-model="form.remember">
                <label for="remember">记住我</label>
              </div>
              <a href="#" class="forgot-password">忘记密码？</a>
            </div>
            
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? '登录中...' : '登录账户' }}
            </button>
            
            <div class="auth-footer">
              <p>还没有账户？ <router-link to="/register" class="auth-link">立即注册</router-link></p>
            </div>
          </form>
        </div>
      </div>

      <!-- 底部行动号召 -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>立即开始您的学习之旅</h2>
          <p>加入数千名正在备考日本宅建士考试的学习者，获得个性化的学习体验</p>
          <div class="cta-buttons">
            <router-link to="/notes" class="btn btn-primary">浏览学习资料</router-link>
            <router-link to="/practice" class="btn btn-secondary">开始练习</router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPassword = ref(false)
const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false
})

const errors = ref({
  email: '',
  password: ''
})

// 方法
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateEmail = () => {
  const email = form.value.email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email) {
    errors.value.email = '请输入邮箱地址'
    return false
  } else if (!emailRegex.test(email)) {
    errors.value.email = '请输入有效的邮箱地址'
    return false
  } else {
    errors.value.email = ''
    return true
  }
}

const validatePassword = () => {
  const password = form.value.password
  
  if (!password) {
    errors.value.password = '请输入密码'
    return false
  } else {
    errors.value.password = ''
    return true
  }
}

const validateForm = () => {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  
  return isEmailValid && isPasswordValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    // 模拟 API 调用 - 实际项目中替换为真实 API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 从本地存储获取用户数据
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const user = users.find(u => u.email === form.value.email && u.password === form.value.password)
    
    if (user) {
      // 保存登录状态
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        subscriptionTier: user.subscriptionTier,
        isLoggedIn: true
      }))
      
      // 登录成功处理
      alert('登录成功！即将跳转到学习仪表盘。')
      router.push('/dashboard')
    } else {
      alert('登录失败，请检查您的邮箱和密码。')
    }
    
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请稍后重试。')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 如果用户已登录，重定向到首页
  const currentUser = localStorage.getItem('currentUser')
  if (currentUser) {
    router.push('/')
  }
})
</script>

<style scoped>
:root {
  --primary: #2a7960;
  --primary-dark: #1e5a47;
  --primary-light: rgba(42, 121, 96, 0.1);
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --border: #e2e8f0;
  --text: #334155;
  --muted: #64748b;
  --radius: 12px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --max-width: 1200px;
  --container-padding: 20px;
  --error: #ef4444;
  --success: #10b981;
  --premium: #f59e0b;
}

.login {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 20px;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 3rem 2rem;
  margin: 2rem 0;
  text-align: center;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

/* ========= 登录表单 ========= */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.auth-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 450px;
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.auth-icon {
  font-size: 48px;
  margin-bottom: 20px;
  color: var(--primary);
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 10px;
}

.auth-subtitle {
  color: var(--muted);
  font-size: 16px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(42, 121, 96, 0.1);
}

.form-input.error {
  border-color: var(--error);
}

.form-input.error:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 18px;
  padding: 4px;
}

.password-toggle:hover {
  color: var(--text);
}

.error-message {
  color: var(--error);
  font-size: 14px;
  margin-top: 6px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--muted);
}

.forgot-password {
  color: var(--primary);
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  width: 100%;
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 6px 16px rgba(42, 121, 96, 0.25);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(42, 121, 96, 0.35);
}

.btn-primary:disabled {
  background: var(--muted);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.auth-footer {
  text-align: center;
  margin-top: 30px;
  color: var(--muted);
  font-size: 14px;
}

.auth-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

/* ========= 底部行动号召 ========= */
.cta-section {
  text-align: center;
  padding: 40px 0;
  margin: 60px 0 40px;
}

.cta-section h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 16px;
}

.cta-section p {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-light);
}

/* ========= 响应式设计 ========= */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .header-content p {
    font-size: 1rem;
  }
  
  .auth-card {
    padding: 30px 20px;
  }
  
  .auth-title {
    font-size: 24px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .auth-card {
    padding: 20px 16px;
  }
  
  .auth-title {
    font-size: 22px;
  }
  
  .auth-icon {
    font-size: 40px;
  }
}
</style>