<!-- views/BatchPdfProcessor.vue -->
<template>
  <div class="batch-pdf-processor">
    <AppNavBar />
    
    <main class="processor-container">
      <div class="page-header">
        <h1>批量PDF题目处理</h1>
        <p>自动化处理37年真题PDF，一键导入题库</p>
      </div>

      <!-- 处理配置 -->
      <div class="config-section">
        <div class="config-card">
          <h3>处理配置</h3>
          <div class="config-grid">
            <div class="config-item">
              <label>
                <input type="checkbox" v-model="processingConfig.autoDetectFields" />
                自动识别题目分野
              </label>
            </div>
            <div class="config-item">
              <label>
                <input type="checkbox" v-model="processingConfig.generateExplanations" />
                自动生成中文解析
              </label>
            </div>
            <div class="config-item">
              <label>
                <input type="checkbox" v-model="processingConfig.assignDifficulty" />
                自动分配难度等级
              </label>
            </div>
            <div class="config-item">
              <label>
                <input type="checkbox" v-model="processingConfig.importToExamPool" />
                导入到考试题库
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 文件上传区域 -->
      <div class="upload-section">
        <div class="upload-area" @drop="onFilesDrop" @dragover="onDragOver">
          <div class="upload-content">
            <div class="upload-icon">📚</div>
            <h3>拖放历年真题PDF文件到这里</h3>
            <p>支持批量上传多个PDF文件</p>
            <button class="btn-primary" @click="triggerFileInput">
              选择PDF文件
            </button>
            <input
              ref="fileInput"
              type="file"
              multiple
              accept=".pdf"
              @change="onFilesSelect"
              style="display: none"
            />
          </div>
        </div>

        <!-- 已选择文件列表 -->
        <div v-if="selectedFiles.length > 0" class="files-list">
          <h4>已选择文件 ({{ selectedFiles.length }})</h4>
          <div class="files-grid">
            <div 
              v-for="(file, index) in selectedFiles" 
              :key="index"
              class="file-item"
            >
              <div class="file-info">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
              <div class="file-actions">
                <button 
                  class="btn-secondary"
                  @click="removeFile(index)"
                >
                  移除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 答案文件上传 -->
      <div class="answer-section">
        <h3>答案文件上传（可选）</h3>
        <div class="answer-upload">
          <button class="btn-secondary" @click="triggerAnswerInput">
            上传答案PDF
          </button>
          <input
            ref="answerInput"
            type="file"
            accept=".pdf"
            @change="onAnswerSelect"
            style="display: none"
          />
          <span v-if="answerFile" class="answer-file-name">
            已选择: {{ answerFile.name }}
          </span>
        </div>
      </div>

      <!-- 处理进度 -->
      <div v-if="processingState !== 'idle'" class="progress-section">
        <h3>处理进度</h3>
        <div class="progress-overview">
          <div class="progress-stats">
            <div class="stat">
              <span class="label">总文件数:</span>
              <span class="value">{{ selectedFiles.length }}</span>
            </div>
            <div class="stat">
              <span class="label">已处理:</span>
              <span class="value">{{ processedCount }}</span>
            </div>
            <div class="stat">
              <span class="label">成功:</span>
              <span class="value success">{{ successCount }}</span>
            </div>
            <div class="stat">
              <span class="label">失败:</span>
              <span class="value error">{{ errorCount }}</span>
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${overallProgress}%` }"
              ></div>
            </div>
            <div class="progress-text">
              {{ overallProgress }}% ({{ processedCount }}/{{ selectedFiles.length }})
            </div>
          </div>
        </div>

        <!-- 详细进度 -->
        <div class="detailed-progress">
          <div 
            v-for="(file, index) in selectedFiles" 
            :key="index"
            class="file-progress"
          >
            <div class="file-name">{{ file.name }}</div>
            <div class="file-status" :class="file.status">
              {{ getStatusText(file.status) }}
            </div>
            <div v-if="file.progress > 0" class="file-progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${file.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 处理结果 -->
      <div v-if="processingState === 'complete'" class="results-section">
        <h3>处理结果</h3>
        <div class="results-summary">
          <div class="result-card success">
            <div class="result-icon">✅</div>
            <div class="result-info">
              <div class="result-count">{{ totalQuestionsExtracted }}</div>
              <div class="result-label">题目提取成功</div>
            </div>
          </div>
          <div class="result-card warning">
            <div class="result-icon">⚠️</div>
            <div class="result-info">
              <div class="result-count">{{ needsReviewCount }}</div>
              <div class="result-label">需要人工检查</div>
            </div>
          </div>
          <div class="result-card error">
            <div class="result-icon">❌</div>
            <div class="result-info">
              <div class="result-count">{{ errorCount }}</div>
              <div class="result-label">处理失败</div>
            </div>
          </div>
        </div>

        <!-- 提取的题目预览 -->
        <div class="questions-preview">
          <h4>题目预览</h4>
          <div class="preview-controls">
            <button 
              class="btn-secondary"
              @click="exportQuestions"
            >
              导出为Excel
            </button>
            <button 
              class="btn-primary"
              @click="importToDatabase"
              :disabled="importing"
            >
              {{ importing ? '导入中...' : '导入到题库' }}
            </button>
          </div>

          <div class="questions-list">
            <div 
              v-for="(question, index) in previewQuestions" 
              :key="index"
              class="question-preview-card"
            >
              <div class="question-header">
                <span class="question-field">{{ question.field }}</span>
                <span class="question-difficulty">难度: {{ question.difficulty }}</span>
                <span class="question-year">{{ question.year }}年</span>
              </div>
              <div class="question-content">
                <p class="question-text">{{ question.question_text_ja }}</p>
                <div class="question-options">
                  <div 
                    v-for="option in JSON.parse(question.options_ja)" 
                    :key="Object.keys(option)[0]"
                    class="option"
                    :class="{ correct: Object.keys(option)[0] === question.correct_answer }"
                  >
                    <span class="option-label">{{ Object.keys(option)[0] }}</span>
                    <span class="option-text">{{ Object.values(option)[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="question-explanation" v-if="question.explanation_zh">
                <strong>解析:</strong> {{ question.explanation_zh }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <button 
          class="btn-secondary"
          @click="clearAll"
          :disabled="processingState === 'processing'"
        >
          清空所有
        </button>
        <button 
          class="btn-primary"
          @click="startProcessing"
          :disabled="selectedFiles.length === 0 || processingState === 'processing'"
        >
          {{ processingState === 'processing' ? '处理中...' : '开始处理' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppNavBar from '@/components/AppNavBar.vue'
import { usePdfParserStore } from '@/stores/pdfParserStore'
import { useQuestionStore } from '@/stores/questionStore'

const router = useRouter()
const pdfParserStore = usePdfParserStore()
const questionStore = useQuestionStore()

// 引用
const fileInput = ref(null)
const answerInput = ref(null)

// 状态
const selectedFiles = ref([])
const answerFile = ref(null)
const processingState = ref('idle') // idle, processing, complete
const importing = ref(false)

// 配置
const processingConfig = ref({
  autoDetectFields: true,
  generateExplanations: true,
  assignDifficulty: true,
  importToExamPool: true
})

// 计算属性
const processedCount = computed(() => {
  return selectedFiles.value.filter(file => 
    file.status === 'success' || file.status === 'error'
  ).length
})

const successCount = computed(() => {
  return selectedFiles.value.filter(file => file.status === 'success').length
})

const errorCount = computed(() => {
  return selectedFiles.value.filter(file => file.status === 'error').length
})

const overallProgress = computed(() => {
  if (selectedFiles.value.length === 0) return 0
  return Math.round((processedCount.value / selectedFiles.value.length) * 100)
})

const totalQuestionsExtracted = computed(() => {
  return pdfParserStore.processedQuestions.length
})

const needsReviewCount = computed(() => {
  return pdfParserStore.processedQuestions.filter(q => 
    !q.correct_answer || !q.explanation_zh
  ).length
})

const previewQuestions = computed(() => {
  return pdfParserStore.processedQuestions.slice(0, 5) // 预览前5题
})

// 方法
const triggerFileInput = () => {
  fileInput.value?.click()
}

const triggerAnswerInput = () => {
  answerInput.value?.click()
}

const onDragOver = (e) => {
  e.preventDefault()
}

const onFilesDrop = (e) => {
  e.preventDefault()
  const files = Array.from(e.dataTransfer.files).filter(file => 
    file.type === 'application/pdf'
  )
  addFiles(files)
}

const onFilesSelect = (e) => {
  const files = Array.from(e.target.files).filter(file => 
    file.type === 'application/pdf'
  )
  addFiles(files)
}

const onAnswerSelect = (e) => {
  const file = e.target.files[0]
  if (file && file.type === 'application/pdf') {
    answerFile.value = file
  }
}

const addFiles = (files) => {
  files.forEach(file => {
    // 初始化文件状态
    file.status = 'pending'
    file.progress = 0
    selectedFiles.value.push(file)
  })
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': '等待处理',
    'processing': '处理中',
    'success': '成功',
    'error': '失败'
  }
  return statusMap[status] || status
}

const startProcessing = async () => {
  processingState.value = 'processing'
  
  try {
    // 处理每个PDF文件
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i]
      file.status = 'processing'
      
      try {
        // 模拟处理进度
        for (let progress = 0; progress <= 100; progress += 10) {
          file.progress = progress
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        // 调用PDF解析Store
        const questions = await pdfParserStore.parsePdfFile(file)
        file.status = 'success'
        file.progress = 100
        
      } catch (error) {
        console.error(`处理文件失败: ${file.name}`, error)
        file.status = 'error'
        file.error = error.message
      }
    }
    
    processingState.value = 'complete'
    
  } catch (error) {
    console.error('批量处理失败:', error)
    processingState.value = 'error'
  }
}

const exportQuestions = () => {
  // 导出题目为Excel
  const questions = pdfParserStore.processedQuestions
  const csvContent = convertToCSV(questions)
  downloadCSV(csvContent, '提取的题目.csv')
}

const convertToCSV = (questions) => {
  const headers = ['年份', '分野', '知识点', '难度', '题干(日文)', '选项A', '选项B', '选项C', '选项D', '正确答案', '解析(中文)']
  
  const rows = questions.map(q => {
    const options = JSON.parse(q.options_ja)
    return [
      q.year,
      q.field,
      q.topic_id,
      q.difficulty,
      q.question_text_ja,
      options.find(opt => opt.A)?.A || '',
      options.find(opt => opt.B)?.B || '',
      options.find(opt => opt.C)?.C || '',
      options.find(opt => opt.D)?.D || '',
      q.correct_answer,
      q.explanation_zh
    ]
  })
  
  return [headers, ...rows].map(row => 
    row.map(field => `"${field}"`).join(',')
  ).join('\n')
}

const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const importToDatabase = async () => {
  importing.value = true
  
  try {
    const questions = pdfParserStore.processedQuestions
    let successCount = 0
    let errorCount = 0
    
    for (const question of questions) {
      try {
        questionStore.addQuestion(question)
        successCount++
      } catch (error) {
        console.error('导入题目失败:', error)
        errorCount++
      }
      
      // 添加延迟避免过快导入
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    // 记录批量导入历史
    questionStore.addUploadRecord({
      type: 'pdf_batch',
      count: successCount,
      status: errorCount === 0 ? 'success' : 'partial',
      fileName: `批量导入_${selectedFiles.value.length}个文件`,
      details: {
        total: questions.length,
        success: successCount,
        errors: errorCount,
        source: '历年真题PDF'
      }
    })
    
    alert(`导入完成！成功: ${successCount}, 失败: ${errorCount}`)
    
    // 跳转到题目上传页面
    router.push('/question-upload')
    
  } catch (error) {
    console.error('导入到数据库失败:', error)
    alert('导入失败，请重试')
  } finally {
    importing.value = false
  }
}

const clearAll = () => {
  selectedFiles.value = []
  answerFile.value = null
  processingState.value = 'idle'
  pdfParserStore.clearProcessedData()
}

onMounted(() => {
  // 初始化
})
</script>

<style scoped>
.processor-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.config-section {
  margin-bottom: 2rem;
}

.config-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.config-item label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.upload-area {
  border: 2px dashed var(--border);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  transition: border-color 0.3s ease;
}

.upload-area:hover {
  border-color: var(--primary);
}

.upload-content .upload-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.files-list {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.files-grid {
  space-y: 1rem;
}

.file-item {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 1rem;
  background: var(--bg);
  border-radius: 8px;
}

.file-info {
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: var(--text);
}

.file-size {
  color: var(--muted);
  font-size: 0.9rem;
  margin-left: 1rem;
}

.answer-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.answer-upload {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.answer-file-name {
  color: var(--primary);
  font-weight: 600;
}

.progress-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.progress-overview {
  margin-bottom: 2rem;
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: var(--bg);
  border-radius: 6px;
}

.stat .success {
  color: #10b981;
  font-weight: 600;
}

.stat .error {
  color: #ef4444;
  font-weight: 600;
}

.progress-bar-container {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
}

.detailed-progress {
  space-y: 1rem;
}

.file-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg);
  border-radius: 6px;
}

.file-progress .file-name {
  flex: 1;
  font-size: 0.9rem;
}

.file-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
}

.file-status.pending {
  background: #f3f4f6;
  color: #6b7280;
}

.file-status.processing {
  background: #dbeafe;
  color: #1d4ed8;
}

.file-status.success {
  background: #d1fae5;
  color: #065f46;
}

.file-status.error {
  background: #fee2e2;
  color: #b91c1c;
}

.file-progress-bar {
  width: 100px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.results-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.results-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
}

.result-card.success {
  background: #d1fae5;
  border: 1px solid #10b981;
}

.result-card.warning {
  background: #fef3c7;
  border: 1px solid #f59e0b;
}

.result-card.error {
  background: #fee2e2;
  border: 1px solid #ef4444;
}

.result-icon {
  font-size: 2rem;
}

.result-count {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.result-label {
  color: var(--muted);
  font-size: 0.9rem;
}

.questions-preview {
  margin-top: 2rem;
}

.preview-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.questions-list {
  max-height: 600px;
  overflow-y: auto;
}

.question-preview-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.question-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.question-field {
  background: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
}

.question-difficulty,
.question-year {
  color: var(--muted);
}

.question-text {
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.question-options {
  space-y: 0.5rem;
  margin-bottom: 1rem;
}

.option {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.option.correct {
  background: #d1fae5;
  border: 1px solid #10b981;
}

.option-label {
  font-weight: 600;
  color: var(--primary);
  min-width: 20px;
}

.question-explanation {
  padding: 1rem;
  background: var(--bg);
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--muted);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
  
  .progress-stats {
    grid-template-columns: 1fr;
  }
  
  .results-summary {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .file-progress {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>