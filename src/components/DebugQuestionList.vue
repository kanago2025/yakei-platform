<!-- 📁 src/components/DebugQuestionList.vue -->
<template>
  <div class="debug-question-list">
    <h3>题目库调试信息 (共 {{ questionStore.questions.length }} 道题目)</h3>
    
    <el-table :data="questionStore.questions" stripe height="400">
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column label="日文题目" min-width="300">
        <template #default="scope">
          <div class="question-preview">
            {{ scope.row.question_text_ja?.substring(0, 50) || '无内容' }}...
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="field" label="分野" width="120" />
      <el-table-column prop="year" label="年份" width="80" />
      <el-table-column label="选项数量" width="100">
        <template #default="scope">
          {{ scope.row.options_ja?.length || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.is_translated ? 'success' : 'warning'">
            {{ scope.row.is_translated ? '已翻译' : '未翻译' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div class="debug-actions">
      <el-button @click="clearAllQuestions">清空所有题目</el-button>
      <el-button @click="addTestQuestion">添加测试题目</el-button>
      <el-button @click="exportQuestions">导出题目数据</el-button>
    </div>
  </div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()

const clearAllQuestions = () => {
  questionStore.questions = []
  questionStore.saveToLocalStorage()
  ElMessage.success('已清空所有题目')
}

const addTestQuestion = () => {
  const testQuestion = {
    id: 'test_001',
    question_text_ja: 'テスト問題：宅地建物取引業者の免許について正しいのは？',
    question_text_zh: '测试题目：关于宅地建物交易业者许可正确的是？',
    options_ja: [
      'A. 免許は不要',
      'B. 都道府県知事の免許が必要',
      'C. 届出のみでよい',
      'D. 国土交通大臣の免許が必要'
    ],
    options_zh: [
      'A. 不需要许可',
      'B. 需要都道府县知事的许可',
      'C. 只需申报即可',
      'D. 需要国土交通大臣的许可'
    ],
    correct_answer: 'B',
    field: '宅建业法',
    year: 2024,
    difficulty: 3,
    language: 'ja',
    is_translated: true
  }

  questionStore.addQuestion(testQuestion)
  ElMessage.success('测试题目添加成功')
}

const exportQuestions = () => {
  const data = questionStore.exportQuestions('json')
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'questions_export.json'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('题目数据导出成功')
}
</script>

<style scoped>
.debug-question-list {
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin: 20px 0;
}

.debug-question-list h3 {
  margin-top: 0;
  color: #409eff;
}

.question-preview {
  line-height: 1.4;
}

.debug-actions {
  margin-top: 16px;
  text-align: center;
}
</style>