import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLearningStore = defineStore('learning', () => {
  const progress = ref({
    rights_agency: { completionPercentage: 0 },
    contract_law: { completionPercentage: 0 },
    mortgage: { completionPercentage: 0 },
    agency_law: { completionPercentage: 0 },
    important_matters: { completionPercentage: 0 },
    land_building: { completionPercentage: 0 },
    tax_system: { completionPercentage: 0 },
    registration: { completionPercentage: 0 }
  })

  // 计算属性
  const overallProgress = computed(() => {
    const topics = Object.values(progress.value)
    if (topics.length === 0) return 0
    const total = topics.reduce((sum, topic) => sum + topic.completionPercentage, 0)
    return Math.round(total / topics.length)
  })

  const correctRate = computed(() => {
    return Math.floor(Math.random() * 30) + 70 // 70-100%
  })

  // 方法
  const updateProgress = (topicId, percentage) => {
    if (progress.value[topicId]) {
      progress.value[topicId].completionPercentage = Math.min(100, Math.max(0, percentage))
      saveToStorage()
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('zhai_xueyuan_learning_progress', JSON.stringify(progress.value))
  }

  const loadFromStorage = () => {
    const saved = localStorage.getItem('zhai_xueyuan_learning_progress')
    if (saved) {
      progress.value = JSON.parse(saved)
    }
  }

  return {
    progress,
    overallProgress,
    correctRate,
    updateProgress,
    loadFromStorage
  }
})