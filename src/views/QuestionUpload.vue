<!-- views/QuestionUpload.vue -->
<template>
  <div class="question-upload">
    <AppNavBar />
    
    <main class="upload-container">
      <div class="page-header">
        <h1>题目上传系统</h1>
        <p>支持Excel模板导入和单题目录入两种方式</p>
      </div>

      <!-- 上传模式选择 -->
      <div class="upload-modes">
        <div 
          class="mode-card"
          :class="{ active: activeMode === 'excel' }"
          @click="activeMode = 'excel'"
        >
          <div class="mode-icon">📊</div>
          <h3>Excel模板导入</h3>
          <p>批量上传题目，适合大量题目导入</p>
          <ul class="feature-list">
            <li>• 支持Excel/CSV格式</li>
            <li>• 批量验证和导入</li>
            <li>• 模板下载</li>
          </ul>
        </div>

        <div 
          class="mode-card"
          :class="{ active: activeMode === 'single' }"
          @click="activeMode = 'single'"
        >
          <div class="mode-icon">📝</div>
          <h3>单题目录入</h3>
          <p>逐个添加题目，适合少量题目或修改</p>
          <ul class="feature-list">
            <li>• 实时表单验证</li>
            <li>• 即时预览效果</li>
            <li>• 快速编辑修改</li>
          </ul>
        </div>
      </div>

      <!-- Excel上传区域 -->
      <div v-if="activeMode === 'excel'" class="excel-upload-section">
        <div class="upload-area" @drop="onDrop" @dragover="onDragOver">
          <div class="upload-content">
            <div class="upload-icon">📥</div>
            <h3>拖放Excel文件到这里</h3>
            <p>或</p>
            <button class="btn-primary" @click="triggerFileInput">
              选择文件
            </button>
            <input
              ref="fileInput"
              type="file"
              accept=".xlsx,.xls,.csv"
              @change="onFileSelect"
              style="display: none"
            />
          </div>
        </div>

        <div class="template-download">
          <h4>下载模板文件</h4>
          <div class="template-options">
            <button class="btn-secondary" @click="downloadTemplate('excel')">
              📊 Excel模板下载
            </button>
            <button class="btn-secondary" @click="downloadTemplate('csv')">
              📄 CSV模板下载
            </button>
          </div>
        </div>

        <!-- 上传进度 -->
        <div v-if="questionStore.isLoading" class="upload-progress">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${questionStore.uploadProgress}%` }"
            ></div>
          </div>
          <p>解析中... {{ questionStore.uploadProgress }}%</p>
        </div>
      </div>

      <!-- 单题目录入区域 -->
      <div v-if="activeMode === 'single'" class="single-upload-section">
        <QuestionForm @question-submitted="onQuestionSubmitted" />
      </div>

      <!-- 上传历史 -->
      <div class="upload-history">
        <h3>上传历史</h3>
        <div v-if="questionStore.uploadHistory.length === 0" class="empty-history">
          <p>暂无上传记录</p>
        </div>
        <div v-else class="history-list">
          <div 
            v-for="record in questionStore.uploadHistory.slice(0, 5)" 
            :key="record.id"
            class="history-item"
          >
            <div class="history-info">
              <span class="record-type">{{ record.type === 'excel' ? 'Excel导入' : '单题目录入' }}</span>
              <span class="record-count">{{ record.count }} 道题目</span>
              <span class="record-time">{{ formatTime(record.timestamp) }}</span>
            </div>
            <div class="history-status" :class="record.status">
              {{ record.status === 'success' ? '成功' : '失败' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 题库统计 -->
      <div class="question-stats">
        <h3>题库统计</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ questionStore.totalQuestions }}</div>
            <div class="stat-label">总题目数</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ Object.keys(questionStore.questionStats.byField).length }}</div>
            <div class="stat-label">覆盖分野</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ questionStore.questionStats.byType.single_choice || 0 }}</div>
            <div class="stat-label">单选题</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ questionStore.questionStats.byType.multi_choice || 0 }}</div>
            <div class="stat-label">多选题</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppNavBar from '@/components/AppNavBar.vue'
import QuestionForm from '@/components/question/QuestionForm.vue'
import { useQuestionStore } from '@/stores/questionStore'

const questionStore = useQuestionStore()
const activeMode = ref('excel')
const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onDragOver = (e) => {
  e.preventDefault()
}

const onDrop = (e) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFileUpload(files[0])
  }
}

const onFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    handleFileUpload(file)
  }
}

const handleFileUpload = async (file) => {
  if (!file) return

  questionStore.isLoading = true
  questionStore.uploadProgress = 0

  try {
    // 模拟上传进度
    const progressInterval = setInterval(() => {
      questionStore.uploadProgress += 10
      if (questionStore.uploadProgress >= 90) {
        clearInterval(progressInterval)
      }
    }, 200)

    // 解析Excel数据
    const questions = await questionStore.parseExcelData(file)
    
    clearInterval(progressInterval)
    questionStore.uploadProgress = 100

    // 添加到题库
    const addedQuestions = questionStore.addQuestionsBatch(questions)
    
    // 记录上传历史
    questionStore.addUploadRecord({
      type: 'excel',
      count: addedQuestions.length,
      status: 'success',
      fileName: file.name
    })

    // 重置文件输入
    if (fileInput.value) {
      fileInput.value.value = ''
    }

    setTimeout(() => {
      questionStore.isLoading = false
      questionStore.uploadProgress = 0
    }, 500)

  } catch (error) {
    console.error('文件上传失败:', error)
    questionStore.addUploadRecord({
      type: 'excel',
      count: 0,
      status: 'error',
      fileName: file.name,
      error: error.message
    })
    questionStore.isLoading = false
    questionStore.uploadProgress = 0
  }
}

const downloadTemplate = (type) => {
  // 模拟模板下载
  const link = document.createElement('a')
  link.href = type === 'excel' 
    ? '/templates/question_template.xlsx'
    : '/templates/question_template.csv'
  link.download = `宅学苑题目模板.${type === 'excel' ? 'xlsx' : 'csv'}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const onQuestionSubmitted = (questionData) => {
  const newQuestion = questionStore.addQuestion(questionData)
  questionStore.addUploadRecord({
    type: 'single',
    count: 1,
    status: 'success',
    questionId: newQuestion.id
  })
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

onMounted(() => {
  // 初始化一些示例数据
  if (questionStore.questions.length === 0) {
    const sampleQuestions = [
      {
        id: 'sample_1',
        year: 2023,
        field: '宅建业法',
        topic_id: 'license',
        difficulty: 2,
        question_type: 'single_choice',
        question_text_ja: '宅地建物取引業の免許に関する記述で正しいのはどれか。',
        options_ja: JSON.stringify([
          { "A": "免許は5年ごとに更新が必要である" },
          { "B": "免許は国土交通大臣のみが交付する" },
          { "C": "免許は都道府県知事が交付する" },
          { "D": "免許は一度取得すれば永続的に有効である" }
        ]),
        correct_answer: "C",
        explanation_zh: "宅建业许可由都道府县知事颁发，有效期为5年，需要更新。",
        is_from_past_exam: true,
        is_five_question_exempt: false,
        tags: JSON.stringify(["免許", "宅建业法"]),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    questionStore.addQuestionsBatch(sampleQuestions)
  }
})
</script>

<style scoped>
.upload-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  color: var(--muted);
}

.upload-modes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.mode-card {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.mode-card.active {
  border-color: var(--primary);
  background: var(--primary-light);
}

.mode-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.mode-card h3 {
  color: var(--text);
  margin-bottom: 1rem;
}

.mode-card p {
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.feature-list {
  text-align: left;
  color: var(--muted);
  font-size: 0.9rem;
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

.template-download {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.template-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.upload-progress {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.3s ease;
}

.upload-history,
.question-stats {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.history-item {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

.history-item:last-child {
  border-bottom: none;
}

.history-info {
  flex: 1;
}

.record-type {
  font-weight: 600;
  color: var(--text);
  margin-right: 1rem;
}

.record-count {
  color: var(--muted);
  margin-right: 1rem;
}

.record-time {
  color: var(--muted);
  font-size: 0.9rem;
}

.history-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.history-status.success {
  background: #d1fae5;
  color: #065f46;
}

.history-status.error {
  background: #fee2e2;
  color: #dc2626;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--muted);
  font-size: 0.9rem;
}

.empty-history {
  text-align: center;
  padding: 2rem;
  color: var(--muted);
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--border);
}

@media (max-width: 768px) {
  .upload-modes {
    grid-template-columns: 1fr;
  }
  
  .template-options {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>