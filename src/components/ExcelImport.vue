<!-- 📁 src/components/ExcelImport.vue -->
<template>
  <div class="excel-import">
    <el-upload
      class="upload-demo"
      drag
      :show-file-list="false"
      :before-upload="beforeUpload"
      accept=".xlsx,.xls"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽Excel文件到此处或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          支持 xlsx、xls 格式的Excel文件
        </div>
      </template>
    </el-upload>

    <!-- 解析结果展示 -->
    <div v-if="parsedQuestions.length > 0" class="result-panel">
      <h3>解析结果预览 (共 {{ parsedQuestions.length }} 道题目)</h3>
      
      <el-table :data="parsedQuestions" stripe height="400">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="question_text" label="题目内容" min-width="300">
          <template #default="scope">
            <div class="question-preview">
              {{ scope.row.question_text.substring(0, 100) }}...
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="field" label="分野" width="120" />
        <el-table-column label="选项" width="200">
          <template #default="scope">
            <div class="options-preview">
              <div v-for="(option, idx) in scope.row.options.slice(0, 2)" :key="idx">
                {{ option }}
              </div>
              <div v-if="scope.row.options.length > 2">...</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="editQuestion(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="action-buttons">
        <el-button type="primary" @click="importQuestions">
          导入所有题目 ({{ parsedQuestions.length }}道)
        </el-button>
        <el-button @click="downloadTemplate">
          下载Excel模板
        </el-button>
      </div>
    </div>

    <!-- 题目编辑对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑题目" width="600px">
      <question-editor 
        v-if="editingQuestion"
        :question="editingQuestion"
        @save="saveQuestionEdit"
        @cancel="editDialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { ExcelQuestionParser } from '@/utils/excelParser'
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()
const parsedQuestions = ref([])
const editDialogVisible = ref(false)
const editingQuestion = ref(null)

const beforeUpload = (file) => {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 })
      
      // 解析Excel数据
      const questions = ExcelQuestionParser.parseExcelData(jsonData)
      parsedQuestions.value = questions
      
      ElMessage.success(`成功解析 ${questions.length} 道题目`)
    } catch (error) {
      ElMessage.error('文件解析失败: ' + error.message)
    }
  }
  
  reader.readAsArrayBuffer(file)
  return false // 阻止自动上传
}

const editQuestion = (question) => {
  editingQuestion.value = { ...question }
  editDialogVisible.value = true
}

const saveQuestionEdit = (updatedQuestion) => {
  const index = parsedQuestions.value.findIndex(q => q.id === updatedQuestion.id)
  if (index !== -1) {
    parsedQuestions.value[index] = updatedQuestion
  }
  editDialogVisible.value = false
  ElMessage.success('题目更新成功')
}

const importQuestions = async () => {
  try {
    for (const question of parsedQuestions.value) {
      await questionStore.addQuestion(question)
    }
    ElMessage.success(`成功导入 ${parsedQuestions.value.length} 道题目`)
    parsedQuestions.value = []
  } catch (error) {
    ElMessage.error('导入失败: ' + error.message)
  }
}

const downloadTemplate = () => {
  // 创建标准模板文件
  const templateData = [
    ['题目ID', '题目内容', '选项A', '选项B', '选项C', '选项D', '正确答案', '分野', '难度', '解析'],
    ['q_001', '题目内容示例...', '选项A内容', '选项B内容', '选项C内容', '选项D内容', 'A', '宅建业法', '3', '解析内容...']
  ]
  
  const ws = XLSX.utils.aoa_to_sheet(templateData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '题目模板')
  XLSX.writeFile(wb, '题目导入模板.xlsx')
}
</script>