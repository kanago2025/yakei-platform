<!-- 📁 src/components/JapaneseQuestionImport.vue -->
<template>
  <div class="japanese-import">
    <el-alert title="日文题目导入模式" type="info" show-icon>
      检测到日文题目内容，系统将保留原始日文文本，并支持后续添加中文翻译
    </el-alert>

    <el-upload
      class="upload-demo"
      drag
      :show-file-list="false"
      :before-upload="beforeUpload"
      accept=".xlsx,.xls,.csv"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽日文Excel文件到此处或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          支持从日文PDF转换的Excel文件，系统将自动识别日文题目结构
        </div>
      </template>
    </el-upload>

    <!-- 日文题目解析结果 -->
    <div v-if="parsedQuestions.length > 0" class="result-panel">
      <div class="import-stats">
        <el-space>
          <el-tag type="success">题目数量: {{ parsedQuestions.length }}</el-tag>
          <el-tag type="info">日文内容: {{ japaneseCount }}</el-tag>
          <el-tag type="warning">需要翻译: {{ needTranslationCount }}</el-tag>
        </el-space>
      </div>

      <el-table :data="parsedQuestions" stripe height="500" class="japanese-table">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column label="日文题目" min-width="350">
          <template #default="scope">
            <div class="japanese-text">
              {{ scope.row.question_text_ja.substring(0, 80) }}
              {{ scope.row.question_text_ja.length > 80 ? '...' : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="中文翻译" min-width="300">
          <template #default="scope">
            <div v-if="scope.row.question_text_zh" class="chinese-text">
              {{ scope.row.question_text_zh }}
            </div>
            <el-button v-else size="small" @click="translateQuestion(scope.row)">
              添加翻译
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="field" label="分野" width="120" />
        <el-table-column label="选项" width="150">
          <template #default="scope">
            <el-popover placement="right" width="300" trigger="hover">
              <template #reference>
                <el-tag size="small">查看选项</el-tag>
              </template>
              <div class="options-popover">
                <div v-for="option in scope.row.options_ja" :key="option" class="option-item">
                  {{ option }}
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" @click="editJapaneseQuestion(scope.row)">
              编辑
            </el-button>
            <el-button 
              size="small" 
              type="primary" 
              @click="translateQuestion(scope.row)"
              :disabled="scope.row.is_translated"
            >
              {{ scope.row.is_translated ? '已翻译' : '翻译' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="action-buttons">
        <el-button type="primary" @click="importAllQuestions">
          导入所有日文题目 ({{ parsedQuestions.length }}道)
        </el-button>
        <el-button @click="batchTranslate" :disabled="translatedCount === parsedQuestions.length">
          批量翻译 ({{ translatedCount }}/{{ parsedQuestions.length }})
        </el-button>
        <el-button @click="exportTranslationTemplate">
          导出翻译模板
        </el-button>
      </div>
    </div>

    <!-- 日文题目编辑对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑日文题目" width="800px">
      <japanese-question-editor 
        v-if="editingQuestion"
        :question="editingQuestion"
        @save="saveJapaneseQuestionEdit"
        @cancel="editDialogVisible = false"
        @translate="translateQuestion"
      />
    </el-dialog>

    <!-- 翻译对话框 -->
    <el-dialog v-model="translateDialogVisible" title="题目翻译" width="700px">
      <question-translator 
        v-if="translatingQuestion"
        :question="translatingQuestion"
        @save="saveTranslation"
        @cancel="translateDialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { JapaneseExcelParser } from '@/utils/japaneseExcelParser'
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()
const parsedQuestions = ref([])
const editDialogVisible = ref(false)
const translateDialogVisible = ref(false)
const editingQuestion = ref(null)
const translatingQuestion = ref(null)

const japaneseCount = computed(() => {
  return parsedQuestions.value.filter(q => q.language === 'ja').length
})

const needTranslationCount = computed(() => {
  return parsedQuestions.value.filter(q => !q.is_translated).length
})

const translatedCount = computed(() => {
  return parsedQuestions.value.filter(q => q.is_translated).length
})

const beforeUpload = (file) => {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
      
      // 使用日文解析器
      const questions = JapaneseExcelParser.parseJapaneseExcelData(jsonData)
      parsedQuestions.value = questions
      
      ElMessage.success(`成功解析 ${questions.length} 道日文题目`)
    } catch (error) {
      ElMessage.error('日文文件解析失败: ' + error.message)
      console.error('解析错误详情:', error)
    }
  }
  
  reader.readAsArrayBuffer(file)
  return false
}

const editJapaneseQuestion = (question) => {
  editingQuestion.value = { ...question }
  editDialogVisible.value = true
}

const translateQuestion = (question) => {
  translatingQuestion.value = { ...question }
  translateDialogVisible.value = true
}

const saveJapaneseQuestionEdit = (updatedQuestion) => {
  const index = parsedQuestions.value.findIndex(q => q.id === updatedQuestion.id)
  if (index !== -1) {
    parsedQuestions.value[index] = updatedQuestion
  }
  editDialogVisible.value = false
  ElMessage.success('题目更新成功')
}

const saveTranslation = (translatedQuestion) => {
  const index = parsedQuestions.value.findIndex(q => q.id === translatedQuestion.id)
  if (index !== -1) {
    parsedQuestions.value[index] = {
      ...parsedQuestions.value[index],
      ...translatedQuestion,
      is_translated: true
    }
  }
  translateDialogVisible.value = false
  ElMessage.success('翻译保存成功')
}

const importAllQuestions = async () => {
  try {
    const results = questionStore.addQuestions(parsedQuestions.value)
    
    if (results.success > 0) {
      ElMessage.success(`成功导入 ${results.success} 道日文题目`)
    }
    if (results.failed > 0) {
      ElMessage.warning(`${results.failed} 道题目导入失败`)
    }
    
    // 清空解析结果
    parsedQuestions.value = []
  } catch (error) {
    ElMessage.error('导入失败: ' + error.message)
  }
}

const batchTranslate = async () => {
  ElMessage.info('批量翻译功能开发中...')
}

const exportTranslationTemplate = () => {
  try {
    const templateData = parsedQuestions.value.map(q => ({
      id: q.id,
      question_ja: q.question_text_ja,
      question_zh: q.question_text_zh || '',
      options_ja: q.options_ja.join(' | '),
      options_zh: q.options_zh.join(' | ') || '',
      correct_answer: q.correct_answer,
      field: q.field
    }))
    
    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '翻译模板')
    XLSX.writeFile(wb, '日文题目翻译模板.xlsx')
    ElMessage.success('翻译模板导出成功')
  } catch (error) {
    ElMessage.error('导出失败: ' + error.message)
  }
}
</script>

<style scoped>
.japanese-import {
  padding: 20px;
}

.upload-demo {
  margin: 20px 0;
}

.result-panel {
  margin-top: 30px;
}

.import-stats {
  margin-bottom: 20px;
}

.japanese-text {
  font-family: 'MS PGothic', 'Hiragino Sans GB', sans-serif;
  line-height: 1.5;
}

.chinese-text {
  color: #1890ff;
  line-height: 1.5;
}

.options-popover .option-item {
  margin: 4px 0;
  padding: 4px;
  border-bottom: 1px solid #f0f0f0;
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}
</style>