import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)

  // 从本地存储加载用户状态
  const loadFromStorage = () => {
    try {
      const savedUser = localStorage.getItem('zhai_xueyuan_user')
      const savedLogin = localStorage.getItem('zhai_xueyuan_logged_in')
      
      console.log('🔍 从存储加载用户状态:', { savedUser, savedLogin })
      
      if (savedUser && savedLogin === 'true') {
        user.value = JSON.parse(savedUser)
        isLoggedIn.value = true
        console.log('✅ 用户已登录:', user.value)
      } else {
        console.log('✅ 用户未登录，显示登录界面')
      }
    } catch (error) {
      console.error('❌ 加载用户数据失败:', error)
      // 确保在出错时用户是未登录状态
      user.value = null
      isLoggedIn.value = false
    }
  }

  // 计算属性
  const userName = computed(() => user.value?.name || '访客')
  const userType = computed(() => user.value?.type || 'free')

  // 登录方法
  const login = (userData) => {
    console.log('🔐 用户登录:', userData)
    user.value = userData
    isLoggedIn.value = true
    localStorage.setItem('zhai_xueyuan_user', JSON.stringify(userData))
    localStorage.setItem('zhai_xueyuan_logged_in', 'true')
  }

  // 退出方法
  const logout = () => {
    console.log('🚪 用户退出')
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('zhai_xueyuan_user')
    localStorage.removeItem('zhai_xueyuan_logged_in')
  }

  // 强制设置为未登录状态（用于测试）
  const forceLogout = () => {
    console.log('🔄 强制退出登录')
    logout()
  }

  // 初始化时加载
  loadFromStorage()

  return {
    user,
    isLoggedIn,
    userName,
    userType,
    login,
    logout,
    forceLogout,
    loadFromStorage
  }
})