// src/stores/wrongAnswerStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/api'
import { useDataSyncStore } from './dataSyncStore'

export const useWrongAnswerStore = defineStore('wrongAnswer', () => {
  const wrongAnswers = ref([])
  const isLoading = ref(false)
  const filters = ref({
    field: 'all',
    difficulty: 'all',
    status: 'all'
  })

  const dataSyncStore = useDataSyncStore()

  // 计算属性
  const filteredWrongAnswers = computed(() => {
    let filtered = wrongAnswers.value

    if (filters.value.field !== 'all') {
      filtered = filtered.filter(answer => answer.field === filters.value.field)
    }

    if (filters.value.difficulty !== 'all') {
      filtered = filtered.filter(answer => answer.difficulty === filters.value.difficulty)
    }

    if (filters.value.status !== 'all') {
      if (filters.value.status === 'mastered') {
        filtered = filtered.filter(answer => answer.isMastered)
      } else if (filters.value.status === 'needs_review') {
        filtered = filtered.filter(answer => !answer.isMastered)
      }
    }

    return filtered
  })

  const wrongAnswerStats = computed(() => {
    const total = wrongAnswers.value.length
    const mastered = wrongAnswers.value.filter(answer => answer.isMastered).length
    const needsReview = total - mastered
    
    const byField = {}
    wrongAnswers.value.forEach(answer => {
      if (!byField[answer.field]) {
        byField[answer.field] = { total: 0, mastered: 0 }
      }
      byField[answer.field].total++
      if (answer.isMastered) {
        byField[answer.field].mastered++
      }
    })

    return {
      total,
      mastered,
      needsReview,
      masteryRate: total > 0 ? Math.round((mastered / total) * 100) : 0,
      byField
    }
  })

  // 方法
  const loadWrongAnswers = async (params = {}) => {
    isLoading.value = true
    try {
      const answers = await apiService.getWrongAnswers(params)
      wrongAnswers.value = answers
      return answers
    } catch (error) {
      console.error('Failed to load wrong answers:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const addWrongAnswer = async (questionData) => {
    try {
      // 检查是否已经存在
      const existingIndex = wrongAnswers.value.findIndex(
        answer => answer.questionId === questionData.questionId
      )

      if (existingIndex !== -1) {
        // 更新已有的错题
        const existing = wrongAnswers.value[existingIndex]
        const updatedAnswer = {
          ...existing,
          timesWrong: existing.timesWrong + 1,
          lastWrongAt: new Date().toISOString(),
          isMastered: false // 重新做错，重置掌握状态
        }
        
        wrongAnswers.value[existingIndex] = updatedAnswer

        dataSyncStore.addPendingOperation({
          type: 'updateWrongAnswer',
          data: updatedAnswer
        })
      } else {
        // 添加新的错题
        const newAnswer = {
          id: `wrong_${Date.now()}`,
          ...questionData,
          timesWrong: 1,
          lastWrongAt: new Date().toISOString(),
          isMastered: false,
          createdAt: new Date().toISOString()
        }
        
        wrongAnswers.value.push(newAnswer)

        dataSyncStore.addPendingOperation({
          type: 'addWrongAnswer',
          data: newAnswer
        })
      }

      await dataSyncStore.syncWithServer()
    } catch (error) {
      console.error('Failed to add wrong answer:', error)
      throw error
    }
  }

  const markAsMastered = async (questionId) => {
    try {
      const answer = wrongAnswers.value.find(a => a.id === questionId)
      if (answer) {
        answer.isMastered = true
        answer.masteredAt = new Date().toISOString()

        dataSyncStore.addPendingOperation({
          type: 'updateWrongAnswer',
          data: answer
        })

        await dataSyncStore.syncWithServer()
      }
    } catch (error) {
      console.error('Failed to mark as mastered:', error)
      throw error
    }
  }

  const removeWrongAnswer = async (questionId) => {
    try {
      wrongAnswers.value = wrongAnswers.value.filter(a => a.id !== questionId)

      dataSyncStore.addPendingOperation({
        type: 'removeWrongAnswer',
        data: { id: questionId }
      })

      await dataSyncStore.syncWithServer()
    } catch (error) {
      console.error('Failed to remove wrong answer:', error)
      throw error
    }
  }

  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      field: 'all',
      difficulty: 'all',
      status: 'all'
    }
  }

  const exportWrongAnswers = () => {
    const data = {
      exportTime: new Date().toISOString(),
      version: '1.0',
      wrongAnswers: wrongAnswers.value
    }
    return JSON.stringify(data, null, 2)
  }

  const generatePracticeTest = (config = {}) => {
    const { count = 10, focusFields = [] } = config
    
    let pool = wrongAnswers.value.filter(answer => !answer.isMastered)
    
    if (focusFields.length > 0) {
      pool = pool.filter(answer => focusFields.includes(answer.field))
    }
    
    // 按错误次数排序，错误次数多的优先
    pool.sort((a, b) => b.timesWrong - a.timesWrong)
    
    return pool.slice(0, count)
  }

  // 初始化
  const initialize = async () => {
    try {
      await loadWrongAnswers()
    } catch (error) {
      console.error('Failed to initialize wrong answer store:', error)
    }
  }

  return {
    // 状态
    wrongAnswers,
    isLoading,
    filters,
    
    // 计算属性
    filteredWrongAnswers,
    wrongAnswerStats,
    
    // 方法
    loadWrongAnswers,
    addWrongAnswer,
    markAsMastered,
    removeWrongAnswer,
    updateFilters,
    resetFilters,
    exportWrongAnswers,
    generatePracticeTest,
    initialize
  }
})