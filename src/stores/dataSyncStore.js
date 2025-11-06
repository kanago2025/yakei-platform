// src/stores/dataSyncStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/api'

export const useDataSyncStore = defineStore('dataSync', () => {
  // 状态
  const syncStatus = ref('idle') // idle, syncing, error, success
  const lastSyncTime = ref(null)
  const pendingOperations = ref([])
  const syncError = ref(null)

  // 计算属性
  const isSyncing = computed(() => syncStatus.value === 'syncing')
  const hasPendingChanges = computed(() => pendingOperations.value.length > 0)
  const syncStatusMessage = computed(() => {
    switch (syncStatus.value) {
      case 'syncing':
        return '同步中...'
      case 'error':
        return `同步失败: ${syncError.value}`
      case 'success':
        return `同步成功 ${lastSyncTime.value ? new Date(lastSyncTime.value).toLocaleTimeString() : ''}`
      default:
        return hasPendingChanges.value ? '有未同步的更改' : '已同步'
    }
  })

  // 方法
  const addPendingOperation = (operation) => {
    pendingOperations.value.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...operation
    })
  }

  const removePendingOperation = (operationId) => {
    pendingOperations.value = pendingOperations.value.filter(op => op.id !== operationId)
  }

  const syncWithServer = async () => {
    if (isSyncing.value) return
    
    syncStatus.value = 'syncing'
    syncError.value = null

    try {
      // 执行所有待处理操作
      for (const operation of [...pendingOperations.value]) {
        try {
          await executeOperation(operation)
          removePendingOperation(operation.id)
        } catch (error) {
          console.error(`Operation failed: ${operation.type}`, error)
          // 继续执行其他操作，不中断
        }
      }

      syncStatus.value = 'success'
      lastSyncTime.value = new Date().toISOString()
    } catch (error) {
      syncStatus.value = 'error'
      syncError.value = error.message
      throw error
    }
  }

  const executeOperation = async (operation) => {
    switch (operation.type) {
      case 'saveExamResult':
        await apiService.saveExamResult(operation.data)
        break
      case 'addWrongAnswer':
        await apiService.addToWrongAnswers(operation.data)
        break
      case 'updateWrongAnswer':
        await apiService.updateWrongAnswer(operation.data.id, operation.data)
        break
      case 'removeWrongAnswer':
        await apiService.removeFromWrongAnswers(operation.data.id)
        break
      case 'updateProgress':
        await apiService.updateLearningProgress(operation.data)
        break
      case 'saveSmartConfig':
        await apiService.saveSmartExamConfig(operation.data)
        break
      default:
        console.warn('Unknown operation type:', operation.type)
    }
  }

  const retryFailedSync = async () => {
    return syncWithServer()
  }

  const clearPendingOperations = () => {
    pendingOperations.value = []
  }

  const loadInitialData = async () => {
    try {
      syncStatus.value = 'syncing'
      
      // 并行加载所有初始数据
      const [examHistory, wrongAnswers, progress, smartConfig] = await Promise.all([
        apiService.getExamHistory(),
        apiService.getWrongAnswers(),
        apiService.getLearningProgress(),
        apiService.getSmartExamConfig()
      ])

      syncStatus.value = 'success'
      lastSyncTime.value = new Date().toISOString()

      return {
        examHistory,
        wrongAnswers,
        progress,
        smartConfig
      }
    } catch (error) {
      syncStatus.value = 'error'
      syncError.value = error.message
      throw error
    }
  }

  // 自动同步（每5分钟）
  const startAutoSync = () => {
    setInterval(() => {
      if (hasPendingChanges.value) {
        syncWithServer()
      }
    }, 5 * 60 * 1000) // 5分钟
  }

  return {
    // 状态
    syncStatus,
    lastSyncTime,
    pendingOperations,
    syncError,
    
    // 计算属性
    isSyncing,
    hasPendingChanges,
    syncStatusMessage,
    
    // 方法
    addPendingOperation,
    removePendingOperation,
    syncWithServer,
    retryFailedSync,
    clearPendingOperations,
    loadInitialData,
    startAutoSync
  }
})