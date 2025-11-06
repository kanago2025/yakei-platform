// src/stores/vipStore.js (完整版)
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

export const useVipStore = defineStore('vip', () => {
  const userStore = useUserStore()
  
  const vipStatus = ref({
    isVip: false,
    vipType: null, // 'monthly', 'quarterly', 'yearly'
    expireAt: null,
    features: []
  })

  // 计算属性
  const isVipUser = computed(() => userStore.isPremium && userStore.isSubscriptionValid)
  
  const availableFeatures = computed(() => {
    const baseFeatures = ['exam_history', 'wrong_answers', 'basic_dashboard']
    const vipFeatures = ['smart_paper', 'advanced_analytics', 'unlimited_exams', 'detailed_reports']
    return isVipUser.value ? [...baseFeatures, ...vipFeatures] : baseFeatures
  })

  const hasFeature = (feature) => availableFeatures.value.includes(feature)

  // 方法
  function setVipStatus(status) {
    vipStatus.value = { ...vipStatus.value, ...status }
  }

  function checkVipAccess(feature) {
    if (!hasFeature(feature)) {
      throw new Error('VIP功能，请升级后使用')
    }
    return true
  }

  // 同步用户VIP状态
  function syncWithUserStore() {
    if (userStore.isPremium) {
      vipStatus.value.isVip = true
      vipStatus.value.expireAt = userStore.user?.subscription_expires || null
    }
  }

  // 初始化时同步状态
  syncWithUserStore()

  return {
    vipStatus,
    isVipUser,
    availableFeatures,
    hasFeature,
    setVipStatus,
    checkVipAccess,
    syncWithUserStore
  }
})