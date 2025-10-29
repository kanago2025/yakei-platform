<template>
  <div class="login">
    <div class="container">
      <!-- 顶部导航栏 -->
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
          <router-link to="/register">注册</router-link>
        </nav>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      </header>

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

      <!-- 页脚 -->
      <footer class="footer">
        <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      mobileMenuOpen: false,
      showPassword: false,
      loading: false,
      form: {
        email: '',
        password: '',
        remember: false
      },
      errors: {
        email: '',
        password: ''
      }
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
        this.errors.email = ''
        return true
      }
    },
    validatePassword() {
      const password = this.form.password
      
      if (!password) {
        this.errors.password = '请输入密码'
        return false
      } else {
        this.errors.password = ''
        return true
      }
    },
    validateForm() {
      const isEmailValid = this.validateEmail()
      const isPasswordValid = this.validatePassword()
      
      return isEmailValid && isPasswordValid
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true
      
      try {
        // 模拟 API 调用 - 实际项目中替换为真实 API
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 登录成功处理
        alert('登录成功！即将跳转到学习仪表盘。')
        this.$router.push('/dashboard')
        
      } catch (error) {
        console.error('登录失败:', error)
        alert('登录失败，请检查您的邮箱和密码。')
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
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
}
</style>

<style scoped>
.login {
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

/* ========= 登录表单 ========= */
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
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>