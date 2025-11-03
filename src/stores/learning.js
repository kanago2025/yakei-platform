// src/stores/learning.js
import { defineStore } from 'pinia'

export const useLearningStore = defineStore('learning', {
  state: () => ({
    progress: {
      // 预先定义所有知识点的初始状态
      'rights_agency': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'rights_capacity': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'agency_law': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'business_meaning': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'agent': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'deposit': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'compensation_deposit': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'advertising_regulation': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'important_matters': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      '37document': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'business_license': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      // 新增的知识点
      'office_requirements': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'license_requirements': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'land_building': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'regulations_building': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'tax_system': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'tax_fixed': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'registration': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      },
      'exempt_market': {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      }
    },
    overallProgress: 0
  }),
  
  getters: {
    // 计算总体进度
    calculatedOverallProgress: (state) => {
      const topics = Object.values(state.progress)
      if (topics.length === 0) return 0
      
      const totalPercentage = topics.reduce((sum, topic) => {
        return sum + (topic.completionPercentage || 0)
      }, 0)
      
      return Math.round(totalPercentage / topics.length)
    },
    
    // 获取特定领域进度
    getDomainProgress: (state) => {
      return (domainTopicIds) => {
        if (!domainTopicIds || domainTopicIds.length === 0) return 0
        
        const totalPercentage = domainTopicIds.reduce((sum, topicId) => {
          const topic = state.progress[topicId]
          return sum + (topic?.completionPercentage || 0)
        }, 0)
        
        return Math.round(totalPercentage / domainTopicIds.length)
      }
    }
  },
  
  actions: {
    // 记录知识点学习时间
    recordTopicStudyTime(topicId, studyTime) {
      if (!this.progress[topicId]) {
        // 如果遇到未知的知识点ID，动态创建
        this.progress[topicId] = {
          status: 'in_progress',
          completionPercentage: 0,
          totalStudyTime: 0,
          lastAccessed: new Date().toISOString(),
          quizScore: 0
        }
      }
      
      this.progress[topicId].totalStudyTime += studyTime
      this.progress[topicId].lastAccessed = new Date().toISOString()
      this.progress[topicId].status = 'in_progress'
      
      // 更新总体进度
      this.updateOverallProgress()
      
      // 自动保存到本地存储
      this.saveToStorage()
    },
    
    // 获取知识点进度
    getTopicProgress(topicId) {
      return this.progress[topicId] || {
        status: 'not_started',
        completionPercentage: 0,
        totalStudyTime: 0,
        lastAccessed: null,
        quizScore: 0
      }
    },
    
    // 更新知识点进度
    updateTopicProgress(topicId, percentage, quizScore = 0) {
      if (!this.progress[topicId]) {
        this.progress[topicId] = {
          status: percentage === 100 ? 'completed' : 'in_progress',
          completionPercentage: percentage,
          totalStudyTime: 0,
          lastAccessed: new Date().toISOString(),
          quizScore: quizScore
        }
      } else {
        this.progress[topicId].completionPercentage = Math.max(
          this.progress[topicId].completionPercentage, 
          percentage
        )
        this.progress[topicId].quizScore = Math.max(
          this.progress[topicId].quizScore,
          quizScore
        )
        this.progress[topicId].lastAccessed = new Date().toISOString()
        
        if (percentage === 100) {
          this.progress[topicId].status = 'completed'
        } else if (percentage > 0) {
          this.progress[topicId].status = 'in_progress'
        }
      }
      
      // 更新总体进度
      this.updateOverallProgress()
      
      this.saveToStorage()
    },
    
    // 标记知识点完成
    completeTopic(topicId) {
      this.updateTopicProgress(topicId, 100)
    },
    
    // 更新总体进度
    updateOverallProgress() {
      this.overallProgress = this.calculatedOverallProgress
    },
    
    // 重置知识点进度
    resetTopicProgress(topicId) {
      if (this.progress[topicId]) {
        this.progress[topicId] = {
          status: 'not_started',
          completionPercentage: 0,
          totalStudyTime: 0,
          lastAccessed: null,
          quizScore: 0
        }
        this.updateOverallProgress()
        this.saveToStorage()
      }
    },
    
    // 获取学习统计
    getStudyStatistics() {
      const topics = Object.values(this.progress)
      const completed = topics.filter(topic => topic.status === 'completed').length
      const inProgress = topics.filter(topic => topic.status === 'in_progress').length
      const notStarted = topics.filter(topic => topic.status === 'not_started').length
      const totalStudyTime = topics.reduce((sum, topic) => sum + topic.totalStudyTime, 0)
      
      return {
        totalTopics: topics.length,
        completed,
        inProgress,
        notStarted,
        totalStudyTime,
        overallProgress: this.overallProgress
      }
    },
    
    // 保存到本地存储
    saveToStorage() {
      try {
        localStorage.setItem('learning_progress', JSON.stringify(this.progress))
        localStorage.setItem('learning_overall_progress', this.overallProgress.toString())
      } catch (error) {
        console.error('保存学习进度失败:', error)
      }
    },
    
    // 从本地存储加载
    loadFromStorage() {
      try {
        const savedProgress = localStorage.getItem('learning_progress')
        const savedOverallProgress = localStorage.getItem('learning_overall_progress')
        
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress)
          
          // 合并保存的进度与默认进度，确保所有知识点都有定义
          this.progress = {
            ...this.progress, // 默认进度
            ...parsedProgress // 保存的进度（会覆盖默认进度）
          }
        }
        
        if (savedOverallProgress) {
          this.overallProgress = parseInt(savedOverallProgress, 10)
        } else {
          this.updateOverallProgress()
        }
      } catch (error) {
        console.error('加载学习进度失败:', error)
        // 如果加载失败，使用默认状态
        this.updateOverallProgress()
      }
    },
    
    // 导出学习数据（用于备份）
    exportLearningData() {
      return {
        progress: this.progress,
        overallProgress: this.overallProgress,
        exportDate: new Date().toISOString()
      }
    },
    
    // 导入学习数据
    importLearningData(data) {
      if (data && data.progress) {
        this.progress = {
          ...this.progress,
          ...data.progress
        }
        this.overallProgress = data.overallProgress || this.calculatedOverallProgress
        this.saveToStorage()
        return true
      }
      return false
    }
  }
})