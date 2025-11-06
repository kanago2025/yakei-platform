<!-- views/PdfProcessor.vue -->
<template>
  <div class="pdf-processor">
    <AppNavBar />
    
    <main class="processor-container">
      <div class="page-header">
        <h1>PDF题目处理工具</h1>
        <p>将PDF题目转换为结构化数据</p>
      </div>

      <!-- 处理步骤导航 -->
      <div class="process-steps">
        <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-info">
            <h4>上传PDF</h4>
            <p>选择题目PDF文件</p>
          </div>
        </div>
        <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-info">
            <h4>文本提取</h4>
            <p>自动提取题目文本</p>
          </div>
        </div>
        <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-info">
            <h4>题目分割</h4>
            <p>分割为单个题目</p>
          </div>
        </div>
        <div class="step" :class="{ active: currentStep === 4, completed: currentStep > 4 }">
          <div class="step-number">4</div>
          <div class="step-info">
            <h4>数据校验</h4>
            <p>验证和修正数据</p>
          </div>
        </div>
        <div class="step" :class="{ active: currentStep === 5, completed: currentStep > 5 }">
          <div class="step-number">5</div>
          <div class="step-info">
            <h4>导入系统</h4>
            <p>导入到题目库</p>
          </div>
        </div>
      </div>

      <!-- 步骤1: PDF上传 -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="upload-section">
          <div class="upload-area" @drop="onPdfDrop" @dragover="onDragOver">
            <div class="upload-content">
              <div class="upload-icon">📄</div>
              <h3>拖放PDF文件到这里</h3>
              <p>支持宅建士考试相关的PDF题目文件</p>
              <button class="btn-primary" @click="triggerPdfInput">
                选择PDF文件
              </button>
              <input
                ref="pdfInput"
                type="file"
                accept=".pdf"
                @change="onPdfSelect"
                style="display: none"
              />
            </div>
          </div>

          <div v-if="pdfFile" class="file-info">
            <div class="file-card">
              <div class="file-icon">📄</div>
              <div class="file-details">
                <h4>{{ pdfFile.name }}</h4>
                <p>{{ (pdfFile.size / 1024 / 1024).toFixed(2) }} MB</p>
              </div>
              <button class="btn-secondary" @click="removePdf">移除</button>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-primary" @click="nextStep" :disabled="!pdfFile">
            下一步：文本提取
          </button>
        </div>
      </div>

      <!-- 步骤2: 文本提取 -->
      <div v-if="currentStep === 2" class="step-content">
        <div class="extraction-section">
          <h3>PDF文本提取</h3>
          <div class="extraction-options">
            <div class="option-group">
              <label>提取模式</label>
              <select v-model="extractionMode">
                <option value="auto">自动模式（推荐）</option>
                <option value="manual">手动模式</option>
              </select>
            </div>
            
            <div class="option-group">
              <label>语言识别</label>
              <select v-model="languageMode">
                <option value="japanese">日语题目 + 中文解析</option>
                <option value="chinese">全中文</option>
              </select>
            </div>
          </div>

          <button class="btn-primary" @click="extractText" :disabled="extracting">
            {{ extracting ? '提取中...' : '开始提取文本' }}
          </button>

          <div v-if="extractedText" class="extracted-preview">
            <h4>提取的文本预览</h4>
            <div class="text-preview">
              <pre>{{ extractedText.substring(0, 1000) }}{{ extractedText.length > 1000 ? '...' : '' }}</pre>
            </div>
            <div class="text-stats">
              <span>字符数: {{ extractedText.length }}</span>
              <span>预估题目数: {{ estimatedQuestionCount }}</span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-secondary" @click="prevStep">上一步</button>
          <button class="btn-primary" @click="nextStep" :disabled="!extractedText">
            下一步：题目分割
          </button>
        </div>
      </div>

      <!-- 步骤3: 题目分割 -->
      <div v-if="currentStep === 3" class="step-content">
        <div class="segmentation-section">
          <h3>题目分割</h3>
          <div class="segmentation-options">
            <div class="option-group">
              <label>分割规则</label>
              <select v-model="segmentationRule">
                <option value="question_number">按题号分割（1. 2. 3. ...）</option>
                <option value="new_line">按空行分割</option>
                <option value="custom">自定义分隔符</option>
              </select>
            </div>

            <div v-if="segmentationRule === 'custom'" class="option-group">
              <label>自定义分隔符</label>
              <input v-model="customSeparator" placeholder="输入分隔符，如：---" />
            </div>
          </div>

          <button class="btn-primary" @click="segmentQuestions">
            分割题目
          </button>

          <div v-if="segmentedQuestions.length > 0" class="segmentation-results">
            <h4>分割结果</h4>
            <div class="questions-list">
              <div 
                v-for="(question, index) in segmentedQuestions" 
                :key="index"
                class="question-item"
                @click="selectQuestion(index)"
                :class="{ selected: selectedQuestionIndex === index }"
              >
                <div class="question-header">
                  <span class="question-number">题目 {{ index + 1 }}</span>
                  <span class="question-length">{{ question.length }} 字符</span>
                </div>
                <div class="question-preview">
                  {{ question.substring(0, 100) }}{{ question.length > 100 ? '...' : '' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-secondary" @click="prevStep">上一步</button>
          <button class="btn-primary" @click="nextStep" :disabled="segmentedQuestions.length === 0">
            下一步：数据校验
          </button>
        </div>
      </div>

      <!-- 步骤4: 数据校验 -->
      <div v-if="currentStep === 4" class="step-content">
        <div class="validation-section">
          <h3>题目数据校验</h3>
          
          <div class="validation-controls">
            <button class="btn-secondary" @click="autoParseAll">
              自动解析全部
            </button>
            <button class="btn-secondary" @click="manualEditMode = !manualEditMode">
              {{ manualEditMode ? '关闭' : '开启' }}手动编辑
            </button>
          </div>

          <div class="question-editor">
            <div class="editor-nav">
              <button @click="prevQuestion" :disabled="currentEditIndex === 0">上一题</button>
              <span>题目 {{ currentEditIndex + 1 }} / {{ parsedQuestions.length }}</span>
              <button @click="nextQuestion" :disabled="currentEditIndex === parsedQuestions.length - 1">下一题</button>
            </div>

            <div class="editor-content">
              <!-- 原始文本 -->
              <div class="original-text">
                <h5>原始文本</h5>
                <div class="text-content">
                  {{ segmentedQuestions[currentEditIndex] }}
                </div>
              </div>

              <!-- 解析结果 -->
              <div class="parsed-result">
                <h5>解析结果</h5>
                <QuestionForm 
                  v-if="manualEditMode"
                  :initial-data="parsedQuestions[currentEditIndex]"
                  @question-submitted="updateParsedQuestion"
                />
                <div v-else class="parsed-preview">
                  <div class="preview-field">
                    <label>题目内容:</label>
                    <span>{{ parsedQuestions[currentEditIndex]?.question_text_ja || '未解析' }}</span>
                  </div>
                  <div class="preview-field">
                    <label>正确答案:</label>
                    <span>{{ parsedQuestions[currentEditIndex]?.correct_answer || '未解析' }}</span>
                  </div>
                  <div class="preview-field">
                    <label>分野:</label>
                    <span>{{ parsedQuestions[currentEditIndex]?.field || '未解析' }}</span>
                  </div>
                  <button class="btn-secondary" @click="manualEditMode = true">
                    手动编辑
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="validation-summary">
            <h4>校验摘要</h4>
            <div class="summary-stats">
              <div class="stat-item" :class="{ valid: validCount > 0 }">
                <span class="stat-number">{{ validCount }}</span>
                <span class="stat-label">有效题目</span>
              </div>
              <div class="stat-item" :class="{ warning: warningCount > 0 }">
                <span class="stat-number">{{ warningCount }}</span>
                <span class="stat-label">需要检查</span>
              </div>
              <div class="stat-item" :class="{ error: errorCount > 0 }">
                <span class="stat-number">{{ errorCount }}</span>
                <span class="stat-label">解析失败</span>
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-secondary" @click="prevStep">上一步</button>
          <button class="btn-primary" @click="nextStep" :disabled="validCount === 0">
            下一步：导入系统
          </button>
        </div>
      </div>

      <!-- 步骤5: 导入系统 -->
      <div v-if="currentStep === 5" class="step-content">
        <div class="import-section">
          <h3>导入到题目库</h3>
          
          <div class="import-summary">
            <div class="summary-card">
              <h4>导入摘要</h4>
              <div class="import-stats">
                <div class="import-stat">
                  <span class="label">总题目数:</span>
                  <span class="value">{{ parsedQuestions.length }}</span>
                </div>
                <div class="import-stat">
                  <span class="label">准备导入:</span>
                  <span class="value">{{ validCount }}</span>
                </div>
                <div class="import-stat">
                  <span class="label">预计用时:</span>
                  <span class="value">{{ estimatedTime }}秒</span>
                </div>
              </div>
            </div>
          </div>

          <div class="import-options">
            <div class="option-group">
              <label>
                <input type="checkbox" v-model="importOptions.autoCategorize" />
                自动分类题目分野
              </label>
            </div>
            <div class="option-group">
              <label>
                <input type="checkbox" v-model="importOptions.addToExamPool" />
                添加到考试题库
              </label>
            </div>
            <div class="option-group">
              <label>
                <input type="checkbox" v-model="importOptions.generateExplanations" />
                自动生成中文解析
              </label>
            </div>
          </div>

          <button 
            class="btn-primary" 
            @click="importQuestions" 
            :disabled="importing"
          >
            {{ importing ? '导入中...' : '开始导入' }}
          </button>

          <div v-if="importResult" class="import-result">
            <h4>导入结果</h4>
            <div class="result-stats" :class="importResult.status">
              <div class="result-item">
                <span class="label">成功:</span>
                <span class="value success">{{ importResult.successCount }}</span>
              </div>
              <div class="result-item">
                <span class="label">失败:</span>
                <span class="value error">{{ importResult.errorCount }}</span>
              </div>
              <div class="result-item">
                <span class="label">重复:</span>
                <span class="value warning">{{ importResult.duplicateCount }}</span>
              </div>
            </div>

            <div v-if="importResult.errors.length > 0" class="error-list">
              <h5>错误详情</h5>
              <div v-for="(error, index) in importResult.errors" :key="index" class="error-item">
                <span>题目 {{ error.index + 1 }}: {{ error.message }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-secondary" @click="prevStep">上一步</button>
          <button class="btn-primary" @click="finishProcess" :disabled="!importResult">
            完成
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppNavBar from '@/components/AppNavBar.vue'
import QuestionForm from '@/components/question/QuestionForm.vue'
import { useQuestionStore } from '@/stores/questionStore'

const router = useRouter()
const questionStore = useQuestionStore()

// 步骤状态
const currentStep = ref(1)
const pdfFile = ref(null)
const extractedText = ref('')
const extracting = ref(false)
const segmentedQuestions = ref([])
const parsedQuestions = ref([])
const selectedQuestionIndex = ref(0)
const currentEditIndex = ref(0)
const manualEditMode = ref(false)
const importing = ref(false)
const importResult = ref(null)

// 配置选项
const extractionMode = ref('auto')
const languageMode = ref('japanese')
const segmentationRule = ref('question_number')
const customSeparator = ref('')

const importOptions = ref({
  autoCategorize: true,
  addToExamPool: true,
  generateExplanations: true
})

// 计算属性
const estimatedQuestionCount = computed(() => {
  if (!extractedText.value) return 0
  return Math.ceil(extractedText.value.length / 500) // 粗略估算
})

const validCount = computed(() => {
  return parsedQuestions.value.filter(q => 
    q.question_text_ja && q.correct_answer && q.field
  ).length
})

const warningCount = computed(() => {
  return parsedQuestions.value.filter(q => 
    q.question_text_ja && !q.correct_answer
  ).length
})

const errorCount = computed(() => {
  return parsedQuestions.value.filter(q => !q.question_text_ja).length
})

const estimatedTime = computed(() => {
  return Math.ceil(validCount.value * 0.5) // 每题0.5秒估算
})

// 方法
const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const triggerPdfInput = () => {
  document.getElementById('pdfInput')?.click()
}

const onPdfSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    pdfFile.value = file
  }
}

const onPdfDrop = (event) => {
  event.preventDefault()
  const files = event.dataTransfer.files
  if (files.length > 0 && files[0].type === 'application/pdf') {
    pdfFile.value = files[0]
  }
}

const onDragOver = (event) => {
  event.preventDefault()
}

const removePdf = () => {
  pdfFile.value = null
  extractedText.value = ''
}

const extractText = async () => {
  if (!pdfFile.value) return
  
  extracting.value = true
  
  try {
    // 模拟PDF文本提取
    // 实际项目中这里应该调用后端API处理PDF
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 模拟提取的文本
    extractedText.value = `
    1. 宅地建物取引業者Aが自ら売主となる宅地建物の売買契約について、次の記述は正しいか。
    A. 37条書面の交付は契約後速やかに行えばよい
    B. 重要事項説明は買主が希望した場合のみ行う
    C. 売買契約と同時に37条書面を交付しなければならない
    D. 37条書面の交付は契約の1週間前までに行う
    正解: C
    解説: 根据宅建业法第37条，自ら売主在签订买卖合同时必须同时交付37条书面文件。

    2. 宅地建物取引業の免許に関する記述で正しいのはどれか。
    A. 免許は5年ごとに更新が必要である
    B. 免許は国土交通大臣のみが交付する
    C. 免許は都道府県知事が交付する
    D. 免許は一度取得すれば永続的に有効である
    正解: C
    解説: 宅建业许可由都道府县知事颁发，有效期为5年，需要更新。
    `
    
  } catch (error) {
    console.error('PDF文本提取失败:', error)
  } finally {
    extracting.value = false
  }
}

const segmentQuestions = () => {
  if (!extractedText.value) return
  
  // 简单的题目分割逻辑
  const questions = extractedText.value.split(/\d+\.\s/) // 按题号分割
    .filter(q => q.trim().length > 10) // 过滤掉太短的片段
  
  segmentedQuestions.value = questions
  parsedQuestions.value = questions.map(() => ({}))
}

const selectQuestion = (index) => {
  selectedQuestionIndex.value = index
  currentEditIndex.value = index
}

const prevQuestion = () => {
  if (currentEditIndex.value > 0) {
    currentEditIndex.value--
  }
}

const nextQuestion = () => {
  if (currentEditIndex.value < parsedQuestions.value.length - 1) {
    currentEditIndex.value++
  }
}

const autoParseAll = () => {
  segmentedQuestions.value.forEach((text, index) => {
    // 简单的自动解析逻辑
    const lines = text.split('\n').filter(line => line.trim())
    
    const question = {
      question_text_ja: lines[0] || '',
      options_ja: JSON.stringify([
        { "A": lines[1]?.replace('A. ', '') || '' },
        { "B": lines[2]?.replace('B. ', '') || '' },
        { "C": lines[3]?.replace('C. ', '') || '' },
        { "D": lines[4]?.replace('D. ', '') || '' }
      ]),
      correct_answer: lines.find(l => l.includes('正解'))?.split(':')[1]?.trim() || '',
      explanation_zh: lines.find(l => l.includes('解説'))?.split(':')[1]?.trim() || '',
      field: '宅建业法', // 默认值
      topic_id: 'general',
      difficulty: 3,
      question_type: 'single_choice',
      year: new Date().getFullYear(),
      is_from_past_exam: true,
      is_five_question_exempt: false,
      tags: JSON.stringify([])
    }
    
    parsedQuestions.value[index] = question
  })
}

const updateParsedQuestion = (questionData) => {
  parsedQuestions.value[currentEditIndex.value] = questionData
}

const importQuestions = async () => {
  importing.value = true
  
  try {
    const validQuestions = parsedQuestions.value.filter(q => 
      q.question_text_ja && q.correct_answer && q.field
    )
    
    let successCount = 0
    let errorCount = 0
    let duplicateCount = 0
    const errors = []
    
    for (let i = 0; i < validQuestions.length; i++) {
      try {
        const question = validQuestions[i]
        
        // 检查是否重复
        const isDuplicate = questionStore.questions.some(q => 
          q.question_text_ja === question.question_text_ja
        )
        
        if (isDuplicate) {
          duplicateCount++
          errors.push({
            index: i,
            message: '题目已存在'
          })
          continue
        }
        
        // 添加到题库
        questionStore.addQuestion(question)
        successCount++
        
        // 模拟处理时间
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        errorCount++
        errors.push({
          index: i,
          message: error.message
        })
      }
    }
    
    importResult.value = {
      status: errorCount === 0 ? 'success' : 'warning',
      successCount,
      errorCount,
      duplicateCount,
      errors
    }
    
    // 记录上传历史
    questionStore.addUploadRecord({
      type: 'pdf_batch',
      count: successCount,
      status: errorCount === 0 ? 'success' : 'partial',
      fileName: pdfFile.value?.name,
      details: {
        total: validQuestions.length,
        success: successCount,
        errors: errorCount,
        duplicates: duplicateCount
      }
    })
    
  } catch (error) {
    console.error('导入失败:', error)
    importResult.value = {
      status: 'error',
      successCount: 0,
      errorCount: parsedQuestions.value.length,
      duplicateCount: 0,
      errors: [{ index: 0, message: error.message }]
    }
  } finally {
    importing.value = false
  }
}

const finishProcess = () => {
  router.push('/question-upload')
}

onMounted(() => {
  // 初始化一些示例数据
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

.process-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;
}

.process-steps::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 50px;
  right: 50px;
  height: 2px;
  background: var(--border);
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--border);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--primary);
  color: white;
}

.step.completed .step-number {
  background: var(--primary);
  color: white;
}

.step-info {
  text-align: center;
}

.step-info h4 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.step-info p {
  font-size: 0.8rem;
  color: var(--muted);
}

.step-content {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
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

.file-info {
  margin-bottom: 2rem;
}

.file-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
}

.file-icon {
  font-size: 2rem;
}

.file-details {
  flex: 1;
}

.extraction-options,
.segmentation-options,
.import-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-group label {
  font-weight: 600;
  color: var(--text);
}

.extracted-preview,
.segmentation-results {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.text-preview {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.text-stats {
  display: flex;
  gap: 2rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.questions-list {
  max-height: 400px;
  overflow-y: auto;
}

.question-item {
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.question-item:hover {
  border-color: var(--primary);
}

.question-item.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.question-number {
  font-weight: 600;
  color: var(--text);
}

.question-length {
  color: var(--muted);
  font-size: 0.8rem;
}

.question-preview {
  color: var(--muted);
  font-size: 0.9rem;
}

.validation-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.question-editor {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.editor-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

.editor-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
}

.original-text,
.parsed-result {
  min-height: 400px;
}

.original-text h5,
.parsed-result h5 {
  margin-bottom: 1rem;
  color: var(--text);
}

.text-content {
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.parsed-preview {
  background: white;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
}

.preview-field {
  margin-bottom: 1rem;
}

.preview-field label {
  font-weight: 600;
  color: var(--text);
  display: block;
  margin-bottom: 0.25rem;
}

.validation-summary {
  margin-top: 2rem;
}

.summary-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: var(--bg);
}

.stat-item.valid {
  background: #d1fae5;
}

.stat-item.warning {
  background: #fef3c7;
}

.stat-item.error {
  background: #fee2e2;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--muted);
  font-size: 0.9rem;
}

.import-summary {
  margin-bottom: 2rem;
}

.summary-card {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
}

.import-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.import-stat {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 6px;
}

.import-result {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--bg);
}

.result-stats {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
}

.result-item {
  display: flex;
  gap: 0.5rem;
}

.result-item .label {
  color: var(--muted);
}

.result-item .value.success {
  color: #10b981;
  font-weight: 600;
}

.result-item .value.error {
  color: #ef4444;
  font-weight: 600;
}

.result-item .value.warning {
  color: #f59e0b;
  font-weight: 600;
}

.error-list {
  margin-top: 1rem;
}

.error-item {
  padding: 0.5rem;
  background: #fee2e2;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .process-steps {
    flex-direction: column;
    gap: 1rem;
  }
  
  .process-steps::before {
    display: none;
  }
  
  .editor-content {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .summary-stats,
  .result-stats {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>