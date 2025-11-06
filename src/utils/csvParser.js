// 📁 src/utils/csvParser.js
export class CSVParser {
  /**
   * 从CSV文本解析题目
   */
  static parseCSVData(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim())
    const questions = []
    
    let currentQuestion = null
    let currentOptions = []
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      
      if (this.isQuestionStart(trimmedLine)) {
        // 保存上一题
        if (currentQuestion) {
          currentQuestion.options_ja = this.cleanOptions(currentOptions)
          questions.push(currentQuestion)
        }
        
        // 开始新题目
        currentQuestion = {
          id: this.extractQuestionId(trimmedLine),
          question_text_ja: this.extractQuestionText(trimmedLine),
          question_text_zh: '',
          options_ja: [],
          options_zh: [],
          correct_answer: 'A',
          field: this.detectFieldFromText(trimmedLine),
          year: 1989,
          difficulty: 3,
          language: 'ja',
          is_translated: false
        }
        currentOptions = []
      } else if (currentQuestion && this.isOption(trimmedLine)) {
        currentOptions.push(trimmedLine)
      } else if (currentQuestion && trimmedLine && !this.isPageMarker(trimmedLine)) {
        currentQuestion.question_text_ja += ' ' + trimmedLine
      }
    })
    
    // 添加最后一道题
    if (currentQuestion) {
      currentQuestion.options_ja = this.cleanOptions(currentOptions)
      questions.push(currentQuestion)
    }
    
    return questions
  }
  
  static isQuestionStart(text) {
    return /〔問\s*\d+〕|\[問\s*\d+\]|問\s*\d+\s*[：:]|\d+\./.test(text)
  }
  
  static extractQuestionId(text) {
    const match = text.match(/問\s*(\d+)/) || text.match(/(\d+)\./)
    return match ? `q_1989_${match[1]}` : `q_${Date.now()}`
  }
  
  static extractQuestionText(text) {
    return text
      .replace(/[〔\[][問问]\s*\d+[〕\]]/g, '')
      .replace(/問\s*\d+\s*[：:]\s*/, '')
      .replace(/^\d+\.\s*/, '')
      .trim()
  }
  
  static isOption(text) {
    return /^[1-4][\.．、\s]|^[①②③④]/.test(text)
  }
  
  static cleanOptions(options) {
    return options.map(option => {
      let cleaned = option
      
      if (/^[1-4][\.．\s]/.test(cleaned)) {
        const optionNum = parseInt(cleaned[0])
        const optionLetter = String.fromCharCode(64 + optionNum)
        cleaned = optionLetter + '. ' + cleaned.substring(1).trim()
      } else if (/^[①②③④]/.test(cleaned)) {
        const circleToNumber = { '①': 1, '②': 2, '③': 3, '④': 4 }
        const optionNum = circleToNumber[cleaned[0]]
        const optionLetter = String.fromCharCode(64 + optionNum)
        cleaned = optionLetter + '. ' + cleaned.substring(1).trim()
      }
      
      return cleaned
    })
  }
  
  static detectFieldFromText(text) {
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
  
  static isPageMarker(text) {
    return text.includes('H-1') || text.includes('※') || text.trim() === ''
  }
}