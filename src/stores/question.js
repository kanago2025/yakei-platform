// 📁 src/stores/question.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuestionStore = defineStore('question', () => {
  const questions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 获取所有题目
  const allQuestions = computed(() => questions.value)

  // 按分野筛选
  const questionsByField = computed(() => {
    return (field) => questions.value.filter(q => q.field === field)
  })

  // 按年份筛选
  const questionsByYear = computed(() => {
    return (year) => questions.value.filter(q => q.year === year)
  })

  // 需要翻译的题目
  const untranslatedQuestions = computed(() => {
    return questions.value.filter(q => !q.is_translated)
  })

  // 添加题目
  const addQuestion = (question) => {
    // 检查是否已存在
    const exists = questions.value.find(q => q.id === question.id)
    if (exists) {
      throw new Error(`题目 ${question.id} 已存在`)
    }

    // 设置默认值
    const newQuestion = {
      id: question.id || `q_${Date.now()}`,
      question_text_ja: question.question_text_ja || '',
      question_text_zh: question.question_text_zh || '',
      options_ja: question.options_ja || [],
      options_zh: question.options_zh || [],
      correct_answer: question.correct_answer || 'A',
      explanation_zh: question.explanation_zh || '',
      field: question.field || '权利关系',
      year: question.year || new Date().getFullYear(),
      difficulty: question.difficulty || 3,
      language: question.language || 'ja',
      is_translated: question.is_translated || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    questions.value.push(newQuestion)
    saveToLocalStorage()
    return newQuestion
  }

  // 批量添加题目
  const addQuestions = (questionList) => {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    }

    questionList.forEach(question => {
      try {
        addQuestion(question)
        results.success++
      } catch (error) {
        results.failed++
        results.errors.push({
          id: question.id,
          error: error.message
        })
      }
    })

    return results
  }

  // 更新题目
  const updateQuestion = (id, updates) => {
    const index = questions.value.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error(`题目 ${id} 不存在`)
    }

    questions.value[index] = {
      ...questions.value[index],
      ...updates,
      updated_at: new Date().toISOString()
    }

    saveToLocalStorage()
    return questions.value[index]
  }

  // 删除题目
  const deleteQuestion = (id) => {
    const index = questions.value.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error(`题目 ${id} 不存在`)
    }

    questions.value.splice(index, 1)
    saveToLocalStorage()
  }

  // 获取题目
  const getQuestion = (id) => {
    return questions.value.find(q => q.id === id)
  }

  // 搜索题目
  const searchQuestions = (keyword) => {
    const lowerKeyword = keyword.toLowerCase()
    return questions.value.filter(q => 
      q.question_text_ja.toLowerCase().includes(lowerKeyword) ||
      q.question_text_zh.toLowerCase().includes(lowerKeyword) ||
      q.field.toLowerCase().includes(lowerKeyword)
    )
  }

  // 统计信息
  const statistics = computed(() => {
    const total = questions.value.length
    const translated = questions.value.filter(q => q.is_translated).length
    const byField = {}
    const byYear = {}

    questions.value.forEach(q => {
      // 按分野统计
      byField[q.field] = (byField[q.field] || 0) + 1
      
      // 按年份统计
      byYear[q.year] = (byYear[q.year] || 0) + 1
    })

    return {
      total,
      translated,
      translationProgress: total > 0 ? Math.round((translated / total) * 100) : 0,
      byField,
      byYear
    }
  })

  // 本地存储相关
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('question_bank', JSON.stringify(questions.value))
    } catch (error) {
      console.error('保存题目到本地存储失败:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('question_bank')
      if (stored) {
        questions.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('从本地存储加载题目失败:', error)
    }
  }

  // 导出题目
  const exportQuestions = (format = 'json') => {
    const data = {
      exported_at: new Date().toISOString(),
      version: '1.0',
      questions: questions.value
    }

    if (format === 'json') {
      return JSON.stringify(data, null, 2)
    } else if (format === 'csv') {
      // 简化的CSV导出
      const headers = ['ID', '日文题目', '中文题目', '分野', '年份', '难度', '是否翻译']
      const rows = questions.value.map(q => [
        q.id,
        q.question_text_ja,
        q.question_text_zh,
        q.field,
        q.year,
        q.difficulty,
        q.is_translated ? '是' : '否'
      ])
      
      return [headers, ...rows].map(row => row.join(',')).join('\n')
    }
  }

  // 初始化加载
  loadFromLocalStorage()

  return {
    questions,
    loading,
    error,
    allQuestions,
    questionsByField,
    questionsByYear,
    untranslatedQuestions,
    statistics,
    addQuestion,
    addQuestions,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    searchQuestions,
    exportQuestions,
    loadFromLocalStorage,
    saveToLocalStorage
  }
})