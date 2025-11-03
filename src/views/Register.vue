<template>
  <div class="register">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1>注册账户</h1>
          <p>开启您的宅建士考试学习之旅</p>
        </div>
      </div>

      <!-- 注册表单 -->
      <div class="auth-container">
        <div class="auth-card">
          <div v-if="!registered" class="auth-header">
            <div class="auth-icon">📝</div>
            <h1 class="auth-title">注册账户</h1>
            <p class="auth-subtitle">开启您的宅建士考试学习之旅</p>
            
            <!-- 会员类型选择 -->
            <div class="subscription-options">
              <div 
                class="subscription-option" 
                :class="{ active: selectedSubscription === 'free' }"
                @click="selectedSubscription = 'free'"
              >
                <div class="option-header">
                  <span class="option-icon">🎓</span>
                  <span class="option-name">免费会员</span>
                </div>
                <div class="option-features">
                  <span class="feature">✓ 基础学习功能</span>
                  <span class="feature">✓ 每日10题练习</span>
                  <span class="feature">✓ 基础视频观看</span>
                  <span class="feature">✓ 学习进度跟踪</span>
                </div>
                <div class="option-price">免费</div>
              </div>
              
              <div 
                class="subscription-option premium" 
                :class="{ active: selectedSubscription === 'premium' }"
                @click="selectedSubscription = 'premium'"
              >
                <div class="option-header">
                  <span class="option-icon">⭐</span>
                  <span class="option-name">VIP会员</span>
                  <span class="premium-badge">推荐</span>
                </div>
                <div class="option-features">
                  <span class="feature">✓ 所有免费功能</span>
                  <span class="feature">✓ 无限制练习</span>
                  <span class="feature">✓ 完整视频观看</span>
                  <span class="feature">✓ AI学习推荐</span>
                  <span class="feature">✓ VIP专属内容</span>
                </div>
                <div class="option-price">¥2,000/月</div>
              </div>
            </div>
          </div>
          
          <!-- 注册表单 -->
          <form v-if="!registered" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="name">姓名</label>
                <div class="input-wrapper">
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name"
                    class="form-input" 
                    :class="{ error: errors.name }"
                    placeholder="请输入您的姓名" 
                    required
                    @blur="validateName"
                  >
                </div>
                <div class="error-message" v-if="errors.name">{{ errors.name }}</div>
              </div>
              
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
            </div>
            
            <div class="form-group">
              <label class="form-label" for="password">设置密码</label>
              <div class="input-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="form.password"
                  class="form-input" 
                  :class="{ error: errors.password }"
                  placeholder="请设置密码（至少8位字符）" 
                  required
                  @input="handlePasswordInput"
                  @blur="validatePassword"
                >
                <button type="button" class="password-toggle" @click="togglePassword">
                  {{ showPassword ? '🔒' : '👁' }}
                </button>
              </div>
              <div 
                class="password-strength" 
                :class="passwordStrengthClass"
                v-if="form.password && !errors.password"
              >
                {{ passwordStrengthText }}
              </div>
              <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="confirmPassword">确认密码</label>
              <div class="input-wrapper">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  id="confirmPassword" 
                  v-model="form.confirmPassword"
                  class="form-input" 
                  :class="{ error: errors.confirmPassword }"
                  placeholder="请再次输入密码" 
                  required
                  @input="validateConfirmPassword"
                  @blur="validateConfirmPassword"
                >
                <button type="button" class="password-toggle" @click="toggleConfirmPassword">
                  {{ showConfirmPassword ? '🔒' : '👁' }}
                </button>
              </div>
              <div class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
            </div>
            
            <div class="agreement">
              <input type="checkbox" id="agreement" v-model="form.agreement" required>
              <label for="agreement">
                我已阅读并同意 
                <a href="/terms" target="_blank">《使用条款》</a> 
                和 
                <a href="/privacy" target="_blank">《隐私政策》</a>
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? '注册中...' : `注册${selectedSubscription === 'premium' ? 'VIP会员' : '免费会员'}` }}
            </button>
            
            <div class="auth-footer">
              <p>已有账户？ <router-link to="/login" class="auth-link">立即登录</router-link></p>
            </div>
          </form>

          <!-- 注册成功提示 -->
          <div v-else class="success-message">
            <div class="success-icon">🎉</div>
            <h3 class="success-title">注册成功！</h3>
            <p class="success-subtitle">
              欢迎加入宅学苑，<strong>{{ form.name }}</strong>！<br>
              您已成功注册为<strong>{{ selectedSubscription === 'premium' ? 'VIP会员' : '免费会员' }}</strong>
            </p>
            
            <div class="success-actions">
              <router-link to="/dashboard" class="btn btn-primary">
                开始学习之旅
              </router-link>
              <router-link to="/" class="btn btn-outline">
                返回首页
              </router-link>
            </div>
            
            <div class="demo-hint">
              💡 提示：在实际环境中，系统会向 <strong>{{ form.email }}</strong> 发送验证邮件
            </div>
          </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const registered = ref(false)
const selectedSubscription = ref('free')

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const passwordStrength = ref('')

// 计算属性
const passwordStrengthClass = computed(() => {
  return {
    'strength-weak': passwordStrength.value === 'weak',
    'strength-medium': passwordStrength.value === 'medium', 
    'strength-strong': passwordStrength.value === 'strong'
  }
})

const passwordStrengthText = computed(() => {
  const texts = {
    weak: '密码强度：弱',
    medium: '密码强度：中',
    strong: '密码强度：强'
  }
  return texts[passwordStrength.value] || ''
})

// 方法
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const validateName = () => {
  const name = form.value.name.trim()
  
  if (!name) {
    errors.value.name = '请输入您的姓名'
    return false
  } else if (name.length < 2) {
    errors.value.name = '姓名至少需要2个字符'
    return false
  } else {
    errors.value.name = ''
    return true
  }
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
    // 检查邮箱是否已被注册
    if (isEmailRegistered(email)) {
      errors.value.email = '该邮箱已被注册，请使用其他邮箱或尝试登录'
      return false
    }
    
    errors.value.email = ''
    return true
  }
}

const validatePassword = () => {
  const password = form.value.password
  
  if (!password) {
    errors.value.password = '请输入密码'
    return false
  } else if (password.length < 8) {
    errors.value.password = '密码至少需要8位字符'
    return false
  } else {
    errors.value.password = ''
    return true
  }
}

const validateConfirmPassword = () => {
  const password = form.value.password
  const confirmPassword = form.value.confirmPassword
  
  if (!confirmPassword) {
    errors.value.confirmPassword = '请确认密码'
    return false
  } else if (password !== confirmPassword) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    return false
  } else {
    errors.value.confirmPassword = ''
    return true
  }
}

const handlePasswordInput = () => {
  validatePassword()
  checkPasswordStrength(form.value.password)
}

const checkPasswordStrength = (password) => {
  if (!password) {
    passwordStrength.value = ''
    return
  }
  
  // 简单的密码强度检测
  let strength = 0
  
  // 长度检查
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  
  // 复杂度检查
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++
  
  if (strength <= 2) {
    passwordStrength.value = 'weak'
  } else if (strength <= 4) {
    passwordStrength.value = 'medium'
  } else {
    passwordStrength.value = 'strong'
  }
}

const validateForm = () => {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()
  const isAgreementChecked = form.value.agreement
  
  if (!isAgreementChecked) {
    alert('请阅读并同意《使用条款》和《隐私政策》')
    return false
  }
  
  return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreementChecked
}

const isEmailRegistered = (email) => {
  // 检查本地存储中是否已存在该邮箱
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
  return users.some(user => user.email === email)
}

const saveUserToLocalStorage = (userData) => {
  // 获取现有用户列表
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
  
  // 添加新用户
  users.push(userData)
  
  // 保存回本地存储
  localStorage.setItem('registeredUsers', JSON.stringify(users))
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    // 模拟 API 调用 - 实际项目中替换为真实 API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 创建用户数据
    const userData = {
      id: 'user_' + Date.now(),
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      password: form.value.password, // 实际项目中应该加密存储
      subscriptionTier: selectedSubscription.value,
      subscriptionExpires: selectedSubscription.value === 'premium' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30天后
        : null,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
    
    // 保存用户数据到本地存储
    saveUserToLocalStorage(userData)
    
    // 保存登录状态
    localStorage.setItem('currentUser', JSON.stringify({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      subscriptionTier: userData.subscriptionTier,
      isLoggedIn: true
    }))
    
    // 注册成功处理
    registered.value = true
    
  } catch (error) {
    console.error('注册失败:', error)
    alert('注册失败，请稍后重试。')
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

.register {
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

/* ========= 注册表单 ========= */
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
  max-width: 600px;
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
  margin-bottom: 30px;
}

/* ========= 会员类型选择 ========= */
.subscription-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 10px;
}

.subscription-option {
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.subscription-option:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.subscription-option.active {
  border-color: var(--primary);
  background: var(--primary-light);
}

.subscription-option.premium {
  border-color: var(--premium);
}

.subscription-option.premium:hover,
.subscription-option.premium.active {
  border-color: var(--premium);
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.option-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  position: relative;
}

.option-icon {
  font-size: 24px;
}

.option-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.premium-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--premium);
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.option-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  text-align: left;
}

.feature {
  font-size: 12px;
  color: var(--muted);
}

.option-price {
  font-weight: 700;
  color: var(--primary);
  font-size: 18px;
}

.subscription-option.premium .option-price {
  color: var(--premium);
}

/* ========= 表单样式 ========= */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

.password-strength {
  margin-top: 6px;
  font-size: 14px;
}

.strength-weak {
  color: var(--error);
}

.strength-medium {
  color: #d69e2e;
}

.strength-strong {
  color: var(--success);
}

.agreement {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--muted);
}

.agreement input {
  margin-right: 10px;
  margin-top: 2px;
}

.agreement a {
  color: var(--primary);
  text-decoration: none;
}

.agreement a:hover {
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
  margin-bottom: 16px;
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

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary-light);
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

/* ========= 成功消息样式 ========= */
.success-message {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.success-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
}

.success-subtitle {
  color: var(--muted);
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.success-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.success-actions .btn {
  flex: 1;
  margin-bottom: 0;
}

.demo-hint {
  color: var(--muted);
  font-size: 14px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
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
  
  .subscription-options {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .success-actions {
    flex-direction: column;
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
  
  .success-icon {
    font-size: 48px;
  }
  
  .success-title {
    font-size: 20px;
  }
}
</style>