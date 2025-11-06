<!-- src/views/Register.vue -->
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
            
            <div v-if="selectedSubscription === 'premium'" class="payment-notice">
              <div class="payment-icon">💳</div>
              <p>请前往支付页面完成VIP会员购买</p>
            </div>
            
            <div class="success-actions">
              <router-link v-if="selectedSubscription === 'free'" to="/dashboard" class="btn btn-primary">
                开始学习之旅
              </router-link>
              <router-link v-else to="/vip/purchase" class="btn btn-primary">
                立即支付
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
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

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
      subscription_tier: selectedSubscription.value,
      subscription_expires: selectedSubscription.value === 'premium' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30天后
        : null,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      avatar: '👤'
    }
    
    // 保存用户数据到本地存储
    saveUserToLocalStorage(userData)
    
    // 自动登录用户
    userStore.login(userData)
    
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
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})
</script>

<style scoped>
/* 保持原有的样式不变，因为原样式已经很完善 */
/* 只添加支付通知样式 */
.payment-notice {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.payment-icon {
  font-size: 1.5rem;
}

.payment-notice p {
  margin: 0;
  color: #856404;
  font-weight: 500;
}

/* 其他样式保持不变... */
</style>