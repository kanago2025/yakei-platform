// stores/questionStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuestionStore = defineStore('question', () => {
  // 状态
  const questions = ref([])
  const uploadHistory = ref([])
  const isLoading = ref(false)
  const uploadProgress = ref(0)

  // 计算属性
  const totalQuestions = computed(() => questions.value.length)
  const questionStats = computed(() => {
    const stats = {
      total: questions.value.length,
      byField: {},
      byDifficulty: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      byType: { single_choice: 0, multi_choice: 0 }
    }
    
    questions.value.forEach(q => {
      // 按分野统计
      stats.byField[q.field] = (stats.byField[q.field] || 0) + 1
      // 按难度统计
      stats.byDifficulty[q.difficulty]++
      // 按题型统计
      stats.byType[q.question_type]++
    })
    
    return stats
  })

  // 动作
  const addQuestion = (questionData) => {
    const newQuestion = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...questionData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    questions.value.push(newQuestion)
    return newQuestion
  }

  const addQuestionsBatch = (questionsList) => {
    const newQuestions = questionsList.map((q, index) => ({
      id: `q_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 6)}`,
      ...q,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))
    questions.value.push(...newQuestions)
    return newQuestions
  }

  const updateQuestion = (questionId, updates) => {
    const index = questions.value.findIndex(q => q.id === questionId)
    if (index !== -1) {
      questions.value[index] = {
        ...questions.value[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
    }
  }

  const deleteQuestion = (questionId) => {
    const index = questions.value.findIndex(q => q.id === questionId)
    if (index !== -1) {
      questions.value.splice(index, 1)
    }
  }

  const clearQuestions = () => {
    questions.value = []
  }

  const addUploadRecord = (record) => {
    uploadHistory.value.unshift({
      id: `upload_${Date.now()}`,
      ...record,
      timestamp: new Date().toISOString()
    })
  }

  // 模拟Excel解析
  const parseExcelData = async (file) => {
    return new Promise((resolve) => {
      // 模拟解析过程
      setTimeout(() => {
        // 这里应该是实际的Excel解析逻辑
        // 暂时返回模拟数据
        const mockQuestions = [
          {
            year: 2024,
            field: '宅建业法',
            topic_id: 'important_matters',
            difficulty: 3,
            question_type: 'single_choice',
            question_text_ja: '宅地建物取引業者Aが自ら売主となる宅地建物の売買契約について、次の記述は正しいか。',
            options_ja: JSON.stringify([
              { "A": "37条書面の交付は契約後速やかに行えばよい" },
              { "B": "重要事項説明は買主が希望した場合のみ行う" },
              { "C": "売買契約と同時に37条書面を交付しなければならない" },
              { "D": "37条書面の交付は契約の1週間前までに行う" }
            ]),
            correct_answer: "C",
            explanation_zh: "根据宅建业法第37条，自ら売主在签订买卖合同时必须同时交付37条书面文件。",
            is_from_past_exam: true,
            is_five_question_exempt: false,
            tags: JSON.stringify(["重要事項説明", "37条書面", "自ら売主"])
          }
        ]
        resolve(mockQuestions)
      }, 1500)
    })
  }

  return {
    // 状态
    questions,
    uploadHistory,
    isLoading,
    uploadProgress,
    
    // 计算属性
    totalQuestions,
    questionStats,
    
    // 动作
    addQuestion,
    addQuestionsBatch,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    addUploadRecord,
    parseExcelData
  }
})