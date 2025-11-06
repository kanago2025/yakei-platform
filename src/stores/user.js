// src/stores/user.js (完整版)
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户状态
  const user = ref(null)
  
  // 计算属性
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '访客')
  const userType = computed(() => user.value?.subscription || 'free')
  const isPremium = computed(() => user.value?.subscription === 'premium')
  const userAvatar = computed(() => user.value?.avatar || '👤')

  // 登录方法
  function login(userData) {
    user.value = {
      id: userData.id || 'user_001',
      name: userData.name || '测试用户',
      email: userData.email || 'test@example.com',
      avatar: userData.avatar || '👤',
      subscription: userData.subscription_tier || 'free',
      subscription_expires: userData.subscription_expires || null,
      created_at: userData.created_at || new Date().toISOString(),
      last_login: new Date().toISOString()
    }
    
    // 保存到本地存储
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // 退出登录
  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  // 从本地存储加载用户数据
  function loadFromStorage() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('加载用户数据失败:', error)
        user.value = null
      }
    }
  }

  // 更新用户信息
  function updateUser(updates) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  // 升级为VIP
  function upgradeToPremium(planType = 'monthly') {
    if (user.value) {
      const expireDate = new Date()
      switch (planType) {
        case 'monthly':
          expireDate.setMonth(expireDate.getMonth() + 1)
          break
        case 'quarterly':
          expireDate.setMonth(expireDate.getMonth() + 3)
          break
        case 'yearly':
          expireDate.setFullYear(expireDate.getFullYear() + 1)
          break
      }
      
      user.value.subscription = 'premium'
      user.value.subscription_expires = expireDate.toISOString()
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  // 检查订阅是否过期
  const isSubscriptionValid = computed(() => {
    if (!user.value?.subscription_expires) return false
    return new Date(user.value.subscription_expires) > new Date()
  })

  // 添加 Initialize 方法 - 这是修复的关键
  async function Initialize() {
    try {
      console.log('开始初始化用户store...')
      
      // 从本地存储加载用户数据
      loadFromStorage()
      
      // 这里可以添加其他初始化逻辑，比如：
      // - 验证用户token是否有效
      // - 获取最新的用户信息
      // - 检查权限等
      
      console.log('用户store初始化完成', user.value)
      return true
    } catch (error) {
      console.error('用户store初始化失败:', error)
      return false
    }
  }

  // 初始化时加载用户数据
  loadFromStorage()

  return {
    // 状态
    user,
    
    // 计算属性
    isLoggedIn,
    userName,
    userType,
    isPremium,
    userAvatar,
    isSubscriptionValid,
    
    // 方法
    login,
    logout,
    updateUser,
    upgradeToPremium,
    loadFromStorage,
    Initialize  // 添加这个方法
  }
})