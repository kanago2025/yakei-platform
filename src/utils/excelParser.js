// 📁 src/utils/excelParser.js
export class ExcelQuestionParser {
  static parseExcelData(data) {
    const questions = []
    
    // 分析您提供的Excel结构
    // 每道题的结构：
    // - 题目标识：〔問 1〕
    // - 题目内容：多行文本
    // - 选项：1, 2, 3, 4 开头的行
    
    let currentQuestion = null
    let currentOptions = []
    
    data.forEach((row, index) => {
      const cellValue = row[0] || '' // A列内容
      
      // 检测新题目开始
      if (cellValue.includes('〔問') || cellValue.includes('[問')) {
        // 保存上一题
        if (currentQuestion) {
          currentQuestion.options = this.cleanOptions(currentOptions)
          questions.push(currentQuestion)
        }
        
        // 开始新题目
        currentQuestion = {
          id: this.extractQuestionId(cellValue),
          question_text: this.extractQuestionText(cellValue),
          options: [],
          field: this.detectField(data, index),
          year: 1989, // 平成元年
          difficulty: 3
        }
        currentOptions = []
      }
      // 收集选项
      else if (cellValue.match(/^[1-4][\.\s]/) || cellValue.match(/^[1-4]\s/)) {
        currentOptions.push(cellValue.trim())
      }
      // 题目内容续行
      else if (currentQuestion && cellValue.trim() && !cellValue.includes('H-1')) {
        currentQuestion.question_text += ' ' + cellValue.trim()
      }
    })
    
    // 添加最后一道题
    if (currentQuestion) {
      currentQuestion.options = this.cleanOptions(currentOptions)
      questions.push(currentQuestion)
    }
    
    return questions
  }
  
  static extractQuestionId(text) {
    const match = text.match(/[問问]\s*(\d+)/)
    return match ? `q_1989_${match[1]}` : `q_${Date.now()}`
  }
  
  static extractQuestionText(text) {
    // 移除题目标识，提取纯题目内容
    return text.replace(/[〔\[][問问]\s*\d+[〕\]]/, '').trim()
  }
  
  static cleanOptions(options) {
    return options.map(option => {
      // 标准化选项格式：A. 内容
      const optionLetter = String.fromCharCode(64 + parseInt(option[0])) // 1->A, 2->B, etc
      const optionText = option.substring(1).trim()
      return `${optionLetter}. ${optionText}`
    })
  }
  
  static detectField(data, startIndex) {
    // 基于题目内容自动判断分野
    const text = data.slice(startIndex, startIndex + 5).map(row => row[0]).join(' ')
    
    if (text.includes('地形') || text.includes('地盤') || text.includes('断層')) {
      return '法令上的制限'
    } else if (text.includes('債権') || text.includes('時効') || text.includes('契約')) {
      return '权利关系'
    } else if (text.includes('宅地建物取引業') || text.includes('免許') || text.includes('媒介')) {
      return '宅建业法'
    } else if (text.includes('税') || text.includes('固定資産税')) {
      return '税・その他'
    } else {
      return '权利关系' // 默认
    }
  }
}