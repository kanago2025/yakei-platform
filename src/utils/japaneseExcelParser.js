// 📁 src/utils/japaneseExcelParser.js
export class JapaneseExcelParser {
  static parseJapaneseExcelData(data) {
    const questions = []
    let currentQuestion = null
    let currentOptions = []
    let inQuestionBlock = false
    
    // 遍历每一行数据
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      const cellValue = row[0] || ''
      
      // 检测日文题目标识
      if (this.isJapaneseQuestionStart(cellValue)) {
        // 保存上一题
        if (currentQuestion) {
          currentQuestion.options_ja = this.cleanJapaneseOptions(currentOptions)
          questions.push(currentQuestion)
        }
        
        // 开始新题目
        currentQuestion = {
          id: this.extractJapaneseQuestionId(cellValue),
          question_text_ja: this.extractJapaneseQuestionText(cellValue),
          question_text_zh: '',
          options_ja: [],
          options_zh: [],
          correct_answer: 'A',
          field: this.detectJapaneseField(cellValue, data, i),
          year: this.extractYearFromData(data),
          difficulty: 3,
          language: 'ja',
          is_translated: false
        }
        currentOptions = []
        inQuestionBlock = true
      }
      // 收集日文选项
      else if (inQuestionBlock && this.isJapaneseOption(cellValue)) {
        currentOptions.push(cellValue.trim())
      }
      // 题目内容续行
      else if (inQuestionBlock && cellValue.trim() && !this.isPageMarker(cellValue)) {
        currentQuestion.question_text_ja += ' ' + cellValue.trim()
      }
      // 检测题目块结束
      else if (inQuestionBlock && this.isQuestionBlockEnd(cellValue, data, i)) {
        inQuestionBlock = false
      }
    }
    
    // 添加最后一道题
    if (currentQuestion) {
      currentQuestion.options_ja = this.cleanJapaneseOptions(currentOptions)
      questions.push(currentQuestion)
    }
    
    return questions
  }
  
  static isJapaneseQuestionStart(text) {
    const patterns = [
      /〔問\s*\d+〕/,
      /〔\s*問\s*\d+\s*〕/,
      /\[問\s*\d+\]/,
      /問\s*\d+\s*[：:]/,
      /^\d+\./
    ]
    return patterns.some(pattern => pattern.test(text))
  }
  
  static extractJapaneseQuestionId(text) {
    const match = text.match(/問\s*(\d+)/) || text.match(/^(\d+)\./)
    return match ? `q_${match[1]}` : `q_${Date.now()}`
  }
  
  static extractJapaneseQuestionText(text) {
    return text
      .replace(/[〔\[][問问]\s*\d+[〕\]]/g, '')
      .replace(/問\s*\d+\s*[：:]\s*/, '')
      .replace(/^\d+\.\s*/, '')
      .trim()
  }
  
  static isJapaneseOption(text) {
    return /^[1-4][\.．、\s]/.test(text) || /^[①②③④]/.test(text)
  }
  
  static cleanJapaneseOptions(options) {
    return options.map(option => {
      let cleaned = option
      
      // 处理数字选项：1. 内容 → A. 内容
      if (/^[1-4][\.．\s]/.test(cleaned)) {
        const optionNum = parseInt(cleaned[0])
        const optionLetter = String.fromCharCode(64 + optionNum)
        cleaned = optionLetter + '. ' + cleaned.substring(1).trim()
      }
      // 处理圆圈数字选项：① 内容 → A. 内容
      else if (/^[①②③④]/.test(cleaned)) {
        const circleToNumber = { '①': 1, '②': 2, '③': 3, '④': 4 }
        const optionNum = circleToNumber[cleaned[0]]
        const optionLetter = String.fromCharCode(64 + optionNum)
        cleaned = optionLetter + '. ' + cleaned.substring(1).trim()
      }
      
      return cleaned
    })
  }
  
  static detectJapaneseField(questionText, data, startIndex) {
    const text = questionText + ' ' + data.slice(startIndex, startIndex + 3)
                      .map(row => row[0] || '')
                      .join(' ')
    
    if (text.includes('宅地建物取引業') || text.includes('免許') || text.includes('媒介')) {
      return '宅建业法'
    } else if (text.includes('債権') || text.includes('時効') || text.includes('契約') || text.includes('抵当権')) {
      return '权利关系'
    } else if (text.includes('都市計画') || text.includes('建築基準') || text.includes('市街化')) {
      return '法令上的制限'
    } else if (text.includes('税') || text.includes('固定資産税')) {
      return '税・その他'
    } else if (text.includes('景品表示法') || text.includes('住宅金融')) {
      return '五问免除'
    } else {
      return '权利关系'
    }
  }
  
  static extractYearFromData(data) {
    // 尝试从数据中提取年份信息
    for (let i = 0; i < Math.min(data.length, 10); i++) {
      const text = data[i][0] || ''
      const yearMatch = text.match(/(\d{4})年/) || text.match(/平成(\d+)年/)
      if (yearMatch) {
        if (text.includes('平成')) {
          return parseInt(yearMatch[1]) + 1988
        }
        return parseInt(yearMatch[1])
      }
    }
    return 1989 // 默认年份
  }
  
  static isPageMarker(text) {
    return text.includes('H-1') || text.includes('※') || text.trim() === ''
  }
  
  static isQuestionBlockEnd(text, data, index) {
    return text.trim() === '' || 
           (index < data.length - 1 && this.isJapaneseQuestionStart(data[index + 1][0] || ''))
  }
}