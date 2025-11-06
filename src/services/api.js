// src/services/api.js
// API基础配置
const API_BASE_URL = 'https://your-cloudflare-worker.workers.dev/api'
const API_VERSION = 'v1'

class ApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`
  }

  // 通用请求方法
  async request(endpoint, options = {}) {
    // 动态导入 userStore 避免循环依赖
    const { useUserStore } = await import('@/stores/user')
    const userStore = useUserStore()
    
    const url = `${this.baseURL}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userStore.isLoggedIn ? `Bearer ${userStore.user?.token}` : '',
      },
    }

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    }

    // 处理请求体
    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // 用户相关API
  async getUserProfile() {
    return this.request('/user/profile')
  }

  async updateUserProfile(profileData) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: profileData,
    })
  }

  // 考试记录API
  async getExamHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/exams/history?${queryString}`)
  }

  async saveExamResult(examData) {
    return this.request('/exams/results', {
      method: 'POST',
      body: examData,
    })
  }

  async getExamResult(examId) {
    return this.request(`/exams/results/${examId}`)
  }

  // 错题本API
  async getWrongAnswers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/wrong-answers?${queryString}`)
  }

  async addToWrongAnswers(questionData) {
    return this.request('/wrong-answers', {
      method: 'POST',
      body: questionData,
    })
  }

  async updateWrongAnswer(questionId, updateData) {
    return this.request(`/wrong-answers/${questionId}`, {
      method: 'PUT',
      body: updateData,
    })
  }

  async removeFromWrongAnswers(questionId) {
    return this.request(`/wrong-answers/${questionId}`, {
      method: 'DELETE',
    })
  }

  // 学习进度API
  async getLearningProgress() {
    return this.request('/progress')
  }

  async updateLearningProgress(progressData) {
    return this.request('/progress', {
      method: 'PUT',
      body: progressData,
    })
  }

  // 智能组卷API
  async getSmartExamConfig() {
    return this.request('/smart-exam/config')
  }

  async saveSmartExamConfig(config) {
    return this.request('/smart-exam/config', {
      method: 'POST',
      body: config,
    })
  }

  // 文件上传API
  async uploadFile(file, type = 'avatar') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    return this.request('/upload', {
      method: 'POST',
      headers: {}, // 不设置 Content-Type，让浏览器自动设置
      body: formData,
    })
  }
}

// 创建模拟API服务用于开发环境
class MockApiService {
  constructor() {
    this.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    this.storageKey = 'mock-api-data'
    this.loadMockData()
  }

  loadMockData() {
    const saved = localStorage.getItem(this.storageKey)
    if (saved) {
      this.mockData = JSON.parse(saved)
    } else {
      this.mockData = {
        userProfile: {
          id: 'user_001',
          name: '测试用户',
          email: 'test@example.com',
          subscription: 'free'
        },
        examHistory: [
          {
            id: 'exam_1',
            title: '宅建工资格考试模拟一',
            score: 85,
            totalQuestions: 50,
            correctAnswers: 43,
            timeSpent: 3600,
            passed: true,
            submittedAt: new Date().toISOString()
          }
        ],
        wrongAnswers: [
          {
            id: 'wrong_1',
            questionId: 'q_123',
            question: '关于宅建士的职责，以下哪项是错误的？',
            field: 'laws',
            difficulty: 'medium',
            timesWrong: 2,
            lastWrongAt: new Date().toISOString(),
            isMastered: false
          }
        ],
        learningProgress: {
          totalStudied: 150,
          mastered: 120,
          weakAreas: ['laws', 'calculations']
        },
        smartExamConfig: {
          difficulty: 'adaptive',
          questionCount: 50,
          timeLimit: 3600
        }
      }
      this.saveMockData()
    }
  }

  saveMockData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.mockData))
  }

  async request(endpoint, options = {}) {
    await this.delay(200) // 模拟网络延迟

    // 动态导入 userStore
    const { useUserStore } = await import('@/stores/user')
    const userStore = useUserStore()
    
    if (!userStore.isLoggedIn && endpoint !== '/user/profile') {
      throw new Error('Authentication required')
    }

    const method = options.method || 'GET'
    let body = null
    if (options.body) {
      try {
        body = JSON.parse(options.body)
      } catch {
        body = options.body
      }
    }

    let response

    switch (endpoint) {
      case '/user/profile':
        if (method === 'GET') {
          response = this.mockData.userProfile
        } else if (method === 'PUT') {
          this.mockData.userProfile = { ...this.mockData.userProfile, ...body }
          this.saveMockData()
          response = this.mockData.userProfile
        }
        break

      case '/exams/history':
        response = this.mockData.examHistory
        break

      case '/exams/results':
        if (method === 'POST') {
          const newExam = {
            id: `exam_${Date.now()}`,
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          this.mockData.examHistory.unshift(newExam)
          this.saveMockData()
          response = newExam
        }
        break

      case '/wrong-answers':
        if (method === 'GET') {
          response = this.mockData.wrongAnswers
        } else if (method === 'POST') {
          const newQuestion = {
            id: `wrong_${Date.now()}`,
            ...body,
            createdAt: new Date().toISOString(),
            timesWrong: 1
          }
          this.mockData.wrongAnswers.push(newQuestion)
          this.saveMockData()
          response = newQuestion
        }
        break

      case '/progress':
        if (method === 'GET') {
          response = this.mockData.learningProgress
        } else if (method === 'PUT') {
          this.mockData.learningProgress = { ...this.mockData.learningProgress, ...body }
          this.saveMockData()
          response = this.mockData.learningProgress
        }
        break

      case '/smart-exam/config':
        if (method === 'GET') {
          response = this.mockData.smartExamConfig
        } else if (method === 'POST') {
          this.mockData.smartExamConfig = { ...this.mockData.smartExamConfig, ...body }
          this.saveMockData()
          response = this.mockData.smartExamConfig
        }
        break

      default:
        if (endpoint.startsWith('/exams/results/')) {
          const examId = endpoint.split('/').pop()
          response = this.mockData.examHistory.find(exam => exam.id === examId)
        } else if (endpoint.startsWith('/wrong-answers/')) {
          const questionId = endpoint.split('/').pop()
          if (method === 'PUT') {
            const index = this.mockData.wrongAnswers.findIndex(q => q.id === questionId)
            if (index !== -1) {
              this.mockData.wrongAnswers[index] = { 
                ...this.mockData.wrongAnswers[index], 
                ...body,
                updatedAt: new Date().toISOString()
              }
              this.saveMockData()
              response = this.mockData.wrongAnswers[index]
            }
          } else if (method === 'DELETE') {
            this.mockData.wrongAnswers = this.mockData.wrongAnswers.filter(q => q.id !== questionId)
            this.saveMockData()
            response = { success: true }
          }
        }
    }

    if (!response) {
      throw new Error('Not found')
    }

    return response
  }
}

// 根据环境选择API服务
const isDevelopment = import.meta.env.MODE === 'development'
const apiService = isDevelopment ? new MockApiService() : new ApiService()

export default apiService