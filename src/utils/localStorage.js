// 📁 src/utils/localStorage.js
export const QuestionStorage = {
  saveQuestions(questions) {
    localStorage.setItem('question_bank', JSON.stringify(questions))
  },
  
  getQuestions() {
    return JSON.parse(localStorage.getItem('question_bank') || '[]')
  },
  
  addQuestion(question) {
    const questions = this.getQuestions()
    questions.push(question)
    this.saveQuestions(questions)
  }
}