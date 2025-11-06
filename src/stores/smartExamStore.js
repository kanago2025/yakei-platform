// src/stores/smartExamStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSmartExamStore = defineStore('smartExam', () => {
  // 状态
  const userWeakAreas = ref([])
  const wrongQuestions = ref([])
  const learningHistory = ref([])
  const generatedExams = ref([])

  // 计算属性
  const knowledgeGaps = computed(() => {
    // 基于错题和考试历史计算知识薄弱点
    const gaps = {}
    
    // 分析错题领域分布
    wrongQuestions.value.forEach(question => {
      const field = question.field
      if (!gaps[field]) {
        gaps[field] = {
          field,
          wrongCount: 0,
          totalCount: 0,
          accuracy: 0,
          difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
        }
      }
      gaps[field].wrongCount++
      gaps[field].totalCount++
      gaps[field].difficultyBreakdown[question.difficultyClass]++
    })

    // 结合考试历史数据
    learningHistory.value.forEach(exam => {
      exam.weakAreas?.forEach(area => {
        if (!gaps[area.id]) {
          gaps[area.id] = {
            field: area.id,
            wrongCount: 0,
            totalCount: 0,
            accuracy: area.accuracy,
            difficultyBreakdown: { easy: 0, medium: 0, hard: 0 }
          }
        }
        gaps[area.id].accuracy = Math.min(gaps[area.id].accuracy, area.accuracy)
      })
    })

    // 计算综合薄弱度评分
    return Object.values(gaps).map(gap => ({
      ...gap,
      weaknessScore: calculateWeaknessScore(gap)
    })).sort((a, b) => b.weaknessScore - a.weaknessScore)
  })

  const recommendedFocus = computed(() => {
    return knowledgeGaps.value.slice(0, 3)
  })

  // 方法
  const calculateWeaknessScore = (gap) => {
    // 综合评分算法：错误率 + 题目数量 + 难度权重
    const errorRate = gap.wrongCount / Math.max(gap.totalCount, 1)
    const volumeWeight = Math.min(gap.totalCount / 10, 1) // 题目数量权重
    const difficultyWeight = (
      gap.difficultyBreakdown.hard * 0.5 +
      gap.difficultyBreakdown.medium * 0.3 +
      gap.difficultyBreakdown.easy * 0.2
    ) / Math.max(gap.totalCount, 1)
    
    return (errorRate * 0.6 + volumeWeight * 0.2 + difficultyWeight * 0.2) * 100
  }

  const generateSmartExam = (config = {}) => {
    const {
      questionCount = 50,
      focusAreas = [],
      difficultyDistribution = { easy: 0.2, medium: 0.5, hard: 0.3 },
      includeRecentWrong = true,
      examDuration = 120
    } = config

    // 智能组卷算法
    const examQuestions = []
    
    // 1. 优先包含最近错题
    if (includeRecentWrong && wrongQuestions.value.length > 0) {
      const recentWrong = wrongQuestions.value
        .sort((a, b) => new Date(b.lastWrongAt) - new Date(a.lastWrongAt))
        .slice(0, Math.min(10, Math.floor(questionCount * 0.3)))
      
      examQuestions.push(...recentWrong.map(q => ({
        ...q,
        source: 'recent_wrong'
      })))
    }

    // 2. 基于薄弱领域生成题目
    const focusAreaQuestions = generateFocusAreaQuestions(
      focusAreas.length > 0 ? focusAreas : recommendedFocus.value,
      questionCount - examQuestions.length,
      difficultyDistribution
    )
    examQuestions.push(...focusAreaQuestions)

    // 3. 如果题目数量不够，补充随机题目
    if (examQuestions.length < questionCount) {
      const remaining = questionCount - examQuestions.length
      const randomQuestions = generateRandomQuestions(remaining, difficultyDistribution)
      examQuestions.push(...randomQuestions)
    }

    // 打乱题目顺序
    const shuffledQuestions = shuffleArray(examQuestions).slice(0, questionCount)
    
    // 创建考试对象
    const smartExam = {
      id: `smart_${Date.now()}`,
      title: generateExamTitle(focusAreas),
      type: 'smart',
      typeText: '智能组卷',
      questions: shuffledQuestions.map((q, index) => ({
        ...q,
        number: index + 1,
        id: `smart_q_${index + 1}`
      })),
      duration: examDuration,
      passingScore: 35,
      config,
      generatedAt: new Date().toISOString(),
      focusAreas: focusAreas.length > 0 ? focusAreas : recommendedFocus.value
    }

    // 保存生成的考试
    generatedExams.value.push(smartExam)
    
    return smartExam
  }

  const generateFocusAreaQuestions = (focusAreas, count, difficultyDistribution) => {
    const questions = []
    const totalWeight = focusAreas.reduce((sum, area) => sum + area.weaknessScore, 0)
    
    focusAreas.forEach(area => {
      const areaCount = Math.round((area.weaknessScore / totalWeight) * count)
      const areaQuestions = simulateQuestionsFromArea(area.field, areaCount, difficultyDistribution)
      questions.push(...areaQuestions.map(q => ({
        ...q,
        source: 'focus_area',
        focusArea: area.field
      })))
    })
    
    return questions
  }

  const simulateQuestionsFromArea = (field, count, difficultyDistribution) => {
    // 模拟从指定领域生成题目
    const difficulties = ['easy', 'medium', 'hard']
    const questions = []
    
    for (let i = 0; i < count; i++) {
      const difficulty = getWeightedRandomDifficulty(difficultyDistribution)
      questions.push({
        id: `gen_${field}_${i}`,
        type: 'single_choice',
        text: `【${field}】智能组卷题目：关于${field}的相关知识，下列说法正确的是？`,
        options: [
          { key: 'A', text: '相关概念的正确描述' },
          { key: 'B', text: '常见错误理解' },
          { key: 'C', text: '相关法律条款应用' },
          { key: 'D', text: '实际案例分析' }
        ],
        correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        explanation: `本题考察${field}领域的核心知识点，重点检测相关概念的理解和应用能力。`,
        field: field,
        difficulty: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
        difficultyText: difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难',
        difficultyClass: difficulty
      })
    }
    
    return questions
  }

  const generateRandomQuestions = (count, difficultyDistribution) => {
    const allFields = ['宅建业法', '权利关系', '法令制限', '税・其他', '五问免除']
    const questions = []
    
    for (let i = 0; i < count; i++) {
      const field = allFields[Math.floor(Math.random() * allFields.length)]
      const difficulty = getWeightedRandomDifficulty(difficultyDistribution)
      
      questions.push({
        id: `random_${i}`,
        type: 'single_choice',
        text: `【${field}】随机题目：下列关于${field}的说法中，正确的是？`,
        options: [
          { key: 'A', text: '选项A内容' },
          { key: 'B', text: '选项B内容' },
          { key: 'C', text: '选项C内容' },
          { key: 'D', text: '选项D内容' }
        ],
        correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
        explanation: '本题考察相关知识点的综合应用能力。',
        field: field,
        difficulty: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
        difficultyText: difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : difficulty === 'hard' ? '困难' : '中等',
        difficultyClass: difficulty,
        source: 'random'
      })
    }
    
    return questions
  }

  const getWeightedRandomDifficulty = (distribution) => {
    const rand = Math.random()
    if (rand < distribution.easy) return 'easy'
    if (rand < distribution.easy + distribution.medium) return 'medium'
    return 'hard'
  }

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const generateExamTitle = (focusAreas) => {
    const date = new Date()
    const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`
    
    if (focusAreas.length > 0) {
      const areaNames = focusAreas.map(area => area.field).join('、')
      return `智能组卷 - ${areaNames}专项练习 - ${dateStr}`
    }
    
    return `个性化智能组卷 - ${dateStr}`
  }

  const updateUserData = (wrongQuestionsData, learningHistoryData) => {
    wrongQuestions.value = wrongQuestionsData || []
    learningHistory.value = learningHistoryData || []
    
    // 更新薄弱领域分析
    analyzeWeakAreas()
  }

  const analyzeWeakAreas = () => {
    // 基于用户数据更新薄弱领域分析
    const fieldStats = {}
    
    // 分析错题本
    wrongQuestions.value.forEach(question => {
      if (!fieldStats[question.field]) {
        fieldStats[question.field] = {
          field: question.field,
          wrongCount: 0,
          totalAttempts: 0,
          recentWrong: 0
        }
      }
      fieldStats[question.field].wrongCount++
      fieldStats[question.field].totalAttempts++
      
      // 检查是否为最近错题（7天内）
      if (question.lastWrongAt) {
        const daysAgo = (Date.now() - new Date(question.lastWrongAt).getTime()) / (1000 * 3600 * 24)
        if (daysAgo < 7) {
          fieldStats[question.field].recentWrong++
        }
      }
    })
    
    // 分析考试历史
    learningHistory.value.forEach(exam => {
      exam.weakAreas?.forEach(area => {
        if (!fieldStats[area.name]) {
          fieldStats[area.name] = {
            field: area.name,
            wrongCount: 0,
            totalAttempts: 0,
            recentWrong: 0,
            historicalAccuracy: area.accuracy
          }
        }
        if (fieldStats[area.name].historicalAccuracy === undefined) {
          fieldStats[area.name].historicalAccuracy = area.accuracy
        } else {
          fieldStats[area.name].historicalAccuracy = Math.min(
            fieldStats[area.name].historicalAccuracy,
            area.accuracy
          )
        }
      })
    })
    
    // 计算薄弱度评分
    userWeakAreas.value = Object.values(fieldStats).map(area => ({
      ...area,
      weaknessScore: calculateAreaWeaknessScore(area)
    })).sort((a, b) => b.weaknessScore - a.weaknessScore)
  }

  const calculateAreaWeaknessScore = (area) => {
    const errorRate = area.wrongCount / Math.max(area.totalAttempts, 1)
    const recentWeight = area.recentWrong * 0.3
    const historicalWeight = area.historicalAccuracy ? (100 - area.historicalAccuracy) * 0.01 : 0
    
    return (errorRate * 0.4 + recentWeight * 0.3 + historicalWeight * 0.3) * 100
  }

  const getExamRecommendations = () => {
    const recommendations = []
    
    // 基于薄弱领域推荐
    if (recommendedFocus.value.length > 0) {
      recommendations.push({
        type: 'weakness_focus',
        title: '薄弱领域专项练习',
        description: `针对您的薄弱领域（${recommendedFocus.value.slice(0, 2).map(a => a.field).join('、')}）生成专项试卷`,
        config: {
          focusAreas: recommendedFocus.value.slice(0, 2),
          questionCount: 30,
          difficultyDistribution: { easy: 0.1, medium: 0.6, hard: 0.3 }
        },
        priority: 'high'
      })
    }
    
    // 基于错题推荐
    if (wrongQuestions.value.length > 10) {
      recommendations.push({
        type: 'wrong_questions_review',
        title: '错题重做练习',
        description: '重点练习最近做错的题目，巩固薄弱知识点',
        config: {
          includeRecentWrong: true,
          questionCount: 40,
          difficultyDistribution: { easy: 0.2, medium: 0.5, hard: 0.3 }
        },
        priority: 'medium'
      })
    }
    
    // 综合模拟推荐
    recommendations.push({
      type: 'comprehensive_simulation',
      title: '全真模拟考试',
      description: '完整模拟真实考试，检测综合能力',
      config: {
        questionCount: 50,
        difficultyDistribution: { easy: 0.2, medium: 0.5, hard: 0.3 }
      },
      priority: 'low'
    })
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  return {
    userWeakAreas,
    wrongQuestions,
    learningHistory,
    generatedExams,
    knowledgeGaps,
    recommendedFocus,
    generateSmartExam,
    updateUserData,
    analyzeWeakAreas,
    getExamRecommendations
  }
})