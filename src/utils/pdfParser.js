// 📁 src/utils/pdfParser.js
export class PDFQuestionParser {
  static async parsePDF(file) {
    // 模拟PDF解析结果 - 实际应该调用后端API
    return {
      filename: file.name,
      total_pages: 10,
      questions: [
        {
          id: 'q_2025_001',
          year: 2025,
          field: '宅建业法',
          topic_id: 'important_matters',
          question_text: '宅地建物取引業者が媒介契約を締結する場合、どのような事項を重要事項として説明する必要がありますか？',
          options: [
            'A. 取引価格',
            'B. 契約期間',
            'C. 手数料の額',
            'D. すべての上記'
          ],
          correct_answer: 'D',
          difficulty: 3,
          explanation: '媒介契約では、取引価格、契約期間、手数料の額などすべての重要事項を説明する必要があります。',
          status: 'success'
        },
        // 更多题目...
      ],
      stats: {
        total: 15,
        success: 14,
        failed: 1,
        by_field: {
          '宅建业法': 8,
          '权利关系': 4,
          '法令上的制限': 3
        }
      }
    }
  }
}