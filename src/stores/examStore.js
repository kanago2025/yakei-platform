// src/stores/examStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/api'
import { useDataSyncStore } from './dataSyncStore'

export const useExamStore = defineStore('exam', () => {
  const exams = ref([])
  const currentExam = ref(null)
  const examResults = ref([])
  const isLoading = ref(false)

  const dataSyncStore = useDataSyncStore()

  // 计算属性
  const examHistory = computed(() => examResults.value)
  const recentExams = computed(() => examResults.value.slice(0, 5))
  const passedExams = computed(() => examResults.value.filter(exam => exam.passed))
  const averageScore = computed(() => {
    if (examResults.value.length === 0) return 0
    const total = examResults.value.reduce((sum, exam) => sum + exam.score, 0)
    return Math.round(total / examResults.value.length)
  })

  // 方法
  const loadExamHistory = async (params = {}) => {
    isLoading.value = true
    try {
      const history = await apiService.getExamHistory(params)
      examResults.value = history
      return history
    } catch (error) {
      console.error('Failed to load exam history:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const saveExamResult = async (examData) => {
    try {
      // 添加到本地状态
      const newResult = {
        id: `result_${Date.now()}`,
        ...examData,
        submittedAt: new Date().toISOString()
      }
      examResults.value.unshift(newResult)

      // 添加到同步队列
      dataSyncStore.addPendingOperation({
        type: 'saveExamResult',
        data: newResult
      })

      // 立即尝试同步
      await dataSyncStore.syncWithServer()

      return newResult
    } catch (error) {
      console.error('Failed to save exam result:', error)
      // 即使保存失败，结果仍然在本地，会在下次同步时重试
      throw error
    }
  }

  const getExamResult = async (examId) => {
    try {
      const result = await apiService.getExamResult(examId)
      return result
    } catch (error) {
      console.error('Failed to get exam result:', error)
      // 回退到本地查找
      return examResults.value.find(result => result.id === examId)
    }
  }

  const retakeExam = (examId) => {
    const exam = examResults.value.find(result => result.examId === examId)
    if (exam) {
      currentExam.value = { ...exam, isRetake: true }
    }
  }

  const deleteExamResult = async (examId) => {
    try {
      examResults.value = examResults.value.filter(result => result.id !== examId)
      // 注意：这里需要对应的API删除操作，暂时只处理本地
    } catch (error) {
      console.error('Failed to delete exam result:', error)
      throw error
    }
  }

  const exportExamData = () => {
    const data = {
      exportTime: new Date().toISOString(),
      version: '1.0',
      examResults: examResults.value
    }
    return JSON.stringify(data, null, 2)
  }

  const importExamData = async (jsonData) => {
    try {
      const data = JSON.parse(jsonData)
      if (data.examResults) {
        examResults.value = [...examResults.value, ...data.examResults]
        
        // 批量同步到服务器
        for (const result of data.examResults) {
          dataSyncStore.addPendingOperation({
            type: 'saveExamResult',
            data: result
          })
        }
        
        await dataSyncStore.syncWithServer()
      }
      return true
    } catch (error) {
      console.error('Failed to import exam data:', error)
      throw error
    }
  }

  // 初始化
  const initialize = async () => {
    try {
      await loadExamHistory()
    } catch (error) {
      console.error('Failed to initialize exam store:', error)
    }
  }

  return {
    // 状态
    exams,
    currentExam,
    examResults,
    isLoading,
    
    // 计算属性
    examHistory,
    recentExams,
    passedExams,
    averageScore,
    
    // 方法
    loadExamHistory,
    saveExamResult,
    getExamResult,
    retakeExam,
    deleteExamResult,
    exportExamData,
    importExamData,
    initialize
  }
})