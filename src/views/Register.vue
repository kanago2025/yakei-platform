<template>
  <div class="register">
    <div class="container">
      <!-- 顶部导航栏 - 集成用户状态 -->
      <header class="top-nav">
        <router-link to="/" class="logo">
          <span class="mark">宅</span>
          <span class="name">宅学苑</span>
        </router-link>
        
        <nav class="nav-links" :class="{ 'mobile-show': mobileMenuOpen }">
          <router-link to="/">首页</router-link>
          <router-link to="/notes">中文笔记</router-link>
          <router-link to="/video">视频学习</router-link>
          <router-link to="/practice">强化练习</router-link>
          <router-link to="/exam">真题模拟</router-link>
          <router-link to="/community">学习社群</router-link>
          <router-link to="/dashboard">学习仪表盘</router-link>
          <router-link to="/login">登录</router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </header>

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

      <!-- 页脚 -->
      <footer class="footer">
        <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'Register',
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      mobileMenuOpen: false,
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      registered: false,
      selectedSubscription: 'free',
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreement: false
      },
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      passwordStrength: ''
    }
  },
  computed: {
    passwordStrengthClass() {
      return {
        'strength-weak': this.passwordStrength === 'weak',
        'strength-medium': this.passwordStrength === 'medium', 
        'strength-strong': this.passwordStrength === 'strong'
      }
    },
    passwordStrengthText() {
      const texts = {
        weak: '密码强度：弱',
        medium: '密码强度：中',
        strong: '密码强度：强'
      }
      return texts[this.passwordStrength] || ''
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.mobileMenuOpen = false
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    validateName() {
      const name = this.form.name.trim()
      
      if (!name) {
        this.errors.name = '请输入您的姓名'
        return false
      } else if (name.length < 2) {
        this.errors.name = '姓名至少需要2个字符'
        return false
      } else {
        this.errors.name = ''
        return true
      }
    },
    validateEmail() {
      const email = this.form.email.trim()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      
      if (!email) {
        this.errors.email = '请输入邮箱地址'
        return false
      } else if (!emailRegex.test(email)) {
        this.errors.email = '请输入有效的邮箱地址'
        return false
      } else {
        // 检查邮箱是否已被注册
        if (this.isEmailRegistered(email)) {
          this.errors.email = '该邮箱已被注册，请使用其他邮箱或尝试登录'
          return false
        }
        
        this.errors.email = ''
        return true
      }
    },
    validatePassword() {
      const password = this.form.password
      
      if (!password) {
        this.errors.password = '请输入密码'
        return false
      } else if (password.length < 8) {
        this.errors.password = '密码至少需要8位字符'
        return false
      } else {
        this.errors.password = ''
        return true
      }
    },
    validateConfirmPassword() {
      const password = this.form.password
      const confirmPassword = this.form.confirmPassword
      
      if (!confirmPassword) {
        this.errors.confirmPassword = '请确认密码'
        return false
      } else if (password !== confirmPassword) {
        this.errors.confirmPassword = '两次输入的密码不一致'
        return false
      } else {
        this.errors.confirmPassword = ''
        return true
      }
    },
    handlePasswordInput() {
      this.validatePassword()
      this.checkPasswordStrength(this.form.password)
    },
    checkPasswordStrength(password) {
      if (!password) {
        this.passwordStrength = ''
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
        this.passwordStrength = 'weak'
      } else if (strength <= 4) {
        this.passwordStrength = 'medium'
      } else {
        this.passwordStrength = 'strong'
      }
    },
    validateForm() {
      const isNameValid = this.validateName()
      const isEmailValid = this.validateEmail()
      const isPasswordValid = this.validatePassword()
      const isConfirmPasswordValid = this.validateConfirmPassword()
      const isAgreementChecked = this.form.agreement
      
      if (!isAgreementChecked) {
        alert('请阅读并同意《使用条款》和《隐私政策》')
        return false
      }
      
      return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreementChecked
    },
    isEmailRegistered(email) {
      // 检查本地存储中是否已存在该邮箱
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      return users.some(user => user.email === email)
    },
    saveUserToLocalStorage(userData) {
      // 获取现有用户列表
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
      // 添加新用户
      users.push(userData)
      
      // 保存回本地存储
      localStorage.setItem('registeredUsers', JSON.stringify(users))
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true
      
      try {
        // 模拟 API 调用 - 实际项目中替换为真实 API
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 创建用户数据
        const userData = {
          id: 'user_' + Date.now(),
          name: this.form.name.trim(),
          email: this.form.email.trim(),
          subscriptionTier: this.selectedSubscription,
          subscriptionExpires: this.selectedSubscription === 'premium' 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30天后
            : null,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
        
        // 保存用户数据到本地存储
        this.saveUserToLocalStorage(userData)
        
        // 更新用户状态
        this.userStore.setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          subscriptionTier: userData.subscriptionTier,
          isLoggedIn: true
        })
        
        // 注册成功处理
        this.registered = true
        
      } catch (error) {
        console.error('注册失败:', error)
        alert('注册失败，请稍后重试。')
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    
    // 如果用户已登录，重定向到首页
    if (this.userStore.isLoggedIn) {
      this.$router.push('/')
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style>
/* CSS 变量定义 */
:root {
  --primary: #2a7960;
  --primary-dark: #205e4a;
  --primary-light: #e8f5f0;
  --bg: #f6f9fc;
  --card-bg: #ffffff;
  --text: #0b2130;
  --muted: #64748b;
  --border: #e2e8f0;
  --radius: 12px;
  --gap: 20px;
  --max-width: 1200px;
  --container-padding: 20px;
  --error: #e53e3e;
  --success: #38a169;
  --premium: #f59e0b;
}
</style>

<style scoped>
.register {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", "Noto Sans JP", "Noto Sans", Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ========= 布局容器 ========= */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* ========= 导航栏 ========= */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--primary-dark);
  text-decoration: none;
  font-size: 18px;
}

.logo .mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-links a:hover, .nav-links a.active {
  background: var(--primary-light);
  color: var(--primary-dark);
}

.nav-links a.active {
  font-weight: 700;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--muted);
  padding: 8px;
  border-radius: 8px;
}

/* ========= 注册表单 ========= */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 40px 0;
}

.auth-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
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
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
}

.subscription-option {
  flex: 1;
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
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
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

/* ========= 页脚 ========= */
.footer {
  text-align: center;
  padding: 40px 0;
  margin-top: 60px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 14px;
}

/* ========= 响应式设计 ========= */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    margin: 0 20px;
    z-index: 100;
  }
  
  .nav-links.mobile-show {
    display: flex;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .auth-card {
    padding: 30px 20px;
  }
  
  .auth-title {
    font-size: 24px;
  }
  
  .subscription-options {
    flex-direction: column;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .success-actions {
    flex-direction: column;
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