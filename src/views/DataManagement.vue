<!-- src/views/DataManagement.vue -->
<template>
  <div class="data-management">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-main">
            <h1>数据管理</h1>
            <p>管理您的学习数据，包括备份、恢复和数据同步设置</p>
          </div>
        </div>
      </div>

      <div class="management-grid">
        <!-- 数据同步状态 -->
        <section class="management-card">
          <h2>数据同步状态</h2>
          <div class="sync-status-details">
            <div class="status-item">
              <span class="label">同步状态:</span>
              <span class="value" :class="syncStatus">{{ syncStatusMessage }}</span>
            </div>
            <div class="status-item">
              <span class="label">最后同步:</span>
              <span class="value">{{ lastSyncTime ? formatTime(lastSyncTime) : '从未同步' }}</span>
            </div>
            <div class="status-item">
              <span class="label">待同步操作:</span>
              <span class="value">{{ pendingOperations.length }} 个</span>
            </div>
          </div>
          <div class="sync-actions">
            <button 
              class="btn btn-primary" 
              @click="manualSync"
              :disabled="isSyncing"
            >
              {{ isSyncing ? '同步中...' : '立即同步' }}
            </button>
            <button 
              class="btn btn-outline" 
              @click="retrySync"
              :disabled="syncStatus !== 'error'"
            >
              重试失败操作
            </button>
          </div>
        </section>

        <!-- 数据备份 -->
        <section class="management-card">
          <h2>数据备份</h2>
          <p class="card-description">将您的学习数据导出为JSON文件，用于备份或迁移。</p>
          
          <div class="backup-options">
            <div class="option-item">
              <h3>考试记录</h3>
              <p>包含所有考试结果和成绩分析</p>
              <button class="btn btn-outline" @click="exportExamData">
                导出考试数据
              </button>
            </div>
            
            <div class="option-item">
              <h3>错题本</h3>
              <p>包含所有错题和掌握状态</p>
              <button class="btn btn-outline" @click="exportWrongAnswers">
                导出错题数据
              </button>
            </div>
            
            <div class="option-item">
              <h3>完整备份</h3>
              <p>包含所有学习数据</p>
              <button class="btn btn-primary" @click="exportAllData">
                导出完整备份
              </button>
            </div>
          </div>
        </section>

        <!-- 数据恢复 -->
        <section class="management-card">
          <h2>数据恢复</h2>
          <p class="card-description">从备份文件恢复您的学习数据。</p>
          
          <div class="restore-section">
            <div class="file-upload">
              <input 
                type="file" 
                ref="fileInput"
                accept=".json"
                @change="handleFileUpload"
                class="file-input"
              />
              <div class="upload-area" @click="triggerFileInput">
                <div class="upload-icon">📁</div>
                <div class="upload-text">
                  <p>点击选择备份文件或拖拽到此区域</p>
                  <span class="upload-hint">支持JSON格式</span>
                </div>
              </div>
            </div>
            
            <div v-if="uploadedFile" class="upload-preview">
              <div class="file-info">
                <span class="file-name">{{ uploadedFile.name }}</span>
                <span class="file-size">{{ formatFileSize(uploadedFile.size) }}</span>
              </div>
              <button class="btn btn-primary" @click="importData">
                导入数据
              </button>
            </div>
          </div>
        </section>

        <!-- 同步设置 -->
        <section class="management-card">
          <h2>同步设置</h2>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h3>自动同步</h3>
                <p>每5分钟自动同步数据到云端</p>
              </div>
              <label class="switch">
                <input 
                  type="checkbox" 
                  v-model="autoSyncEnabled"
                  @change="updateAutoSync"
                >
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h3>仅WiFi同步</h3>
                <p>仅在WiFi网络下进行数据同步</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="wifiOnlySync">
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <h3>数据压缩</h3>
                <p>压缩同步数据以减少流量使用</p>
              </div>
              <label class="switch">
                <input type="checkbox" v-model="dataCompression">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </section>

        <!-- 数据统计 -->
        <section class="management-card">
          <h2>数据统计</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{{ examStats.total }}</div>
              <div class="stat-label">考试记录</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ wrongAnswerStats.total }}</div>
              <div class="stat-label">错题数量</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ examStats.averageScore }}分</div>
              <div class="stat-label">平均成绩</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ wrongAnswerStats.masteryRate }}%</div>
              <div class="stat-label">错题掌握率</div>
            </div>
          </div>
        </section>

        <!-- 危险操作 -->
        <section class="management-card danger-zone">
          <h2>危险操作</h2>
          <p class="warning-text">这些操作无法撤销，请谨慎操作。</p>
          
          <div class="danger-actions">
            <button class="btn btn-danger" @click="clearAllData">
              清除所有本地数据
            </button>
            <button class="btn btn-danger" @click="resetSync">
              重置同步状态
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- 导入确认对话框 -->
    <div v-if="showImportConfirm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>确认导入数据</h3>
        </div>
        <div class="modal-body">
          <p>这将覆盖当前的以下数据：</p>
          <ul class="import-list">
            <li v-if="importDataSummary.examResults">
              📊 考试记录 ({{ importDataSummary.examResults }} 条)
            </li>
            <li v-if="importDataSummary.wrongAnswers">
              📝 错题本 ({{ importDataSummary.wrongAnswers }} 条)
            </li>
            <li v-if="importDataSummary.progress">
              📈 学习进度
            </li>
          </ul>
          <p class="warning-text">此操作无法撤销，确定要继续吗？</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="cancelImport">
            取消
          </button>
          <button class="btn btn-danger" @click="confirmImport">
            确认导入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataSyncStore } from '@/stores/dataSyncStore'
import { useExamStore } from '@/stores/examStore'
import { useWrongAnswerStore } from '@/stores/wrongAnswerStore'

const dataSyncStore = useDataSyncStore()
const examStore = useExamStore()
const wrongAnswerStore = useWrongAnswerStore()

// 状态
const fileInput = ref(null)
const uploadedFile = ref(null)
const showImportConfirm = ref(false)
const importDataSummary = ref({})
const autoSyncEnabled = ref(true)
const wifiOnlySync = ref(false)
const dataCompression = ref(true)

// 计算属性
const syncStatus = computed(() => dataSyncStore.syncStatus)
const isSyncing = computed(() => dataSyncStore.isSyncing)
const syncStatusMessage = computed(() => dataSyncStore.syncStatusMessage)
const lastSyncTime = computed(() => dataSyncStore.lastSyncTime)
const pendingOperations = computed(() => dataSyncStore.pendingOperations)

const examStats = computed(() => ({
  total: examStore.examResults.length,
  averageScore: examStore.averageScore
}))

const wrongAnswerStats = computed(() => wrongAnswerStore.wrongAnswerStats)

// 方法
const manualSync = async () => {
  try {
    await dataSyncStore.syncWithServer()
  } catch (error) {
    console.error('Manual sync failed:', error)
  }
}

const retrySync = async () => {
  try {
    await dataSyncStore.retryFailedSync()
  } catch (error) {
    console.error('Retry sync failed:', error)
  }
}

const exportExamData = () => {
  const data = examStore.exportExamData()
  downloadFile(data, 'exam-data-backup.json')
}

const exportWrongAnswers = () => {
  const data = wrongAnswerStore.exportWrongAnswers()
  downloadFile(data, 'wrong-answers-backup.json')
}

const exportAllData = () => {
  const data = {
    exportTime: new Date().toISOString(),
    version: '1.0',
    examResults: examStore.examResults,
    wrongAnswers: wrongAnswerStore.wrongAnswers,
    learningProgress: {} // 可以添加学习进度数据
  }
  downloadFile(JSON.stringify(data, null, 2), 'complete-backup.json')
}

const downloadFile = (content, filename) => {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/json') {
    uploadedFile.value = file
    previewImportData(file)
  } else {
    alert('请选择JSON格式的文件')
  }
}

const previewImportData = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      importDataSummary.value = {
        examResults: data.examResults?.length || 0,
        wrongAnswers: data.wrongAnswers?.length || 0,
        progress: data.learningProgress ? 1 : 0
      }
      showImportConfirm.value = true
    } catch (error) {
      alert('文件格式错误，无法解析')
    }
  }
  reader.readAsText(file)
}

const cancelImport = () => {
  showImportConfirm.value = false
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const confirmImport = async () => {
  try {
    const file = uploadedFile.value
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.examResults) {
          await examStore.importExamData(JSON.stringify(data))
        }
        
        if (data.wrongAnswers) {
          // 需要实现错题本的导入功能
          console.log('Importing wrong answers:', data.wrongAnswers.length)
        }
        
        showImportConfirm.value = false
        uploadedFile.value = null
        if (fileInput.value) {
          fileInput.value.value = ''
        }
        
        alert('数据导入成功！')
      } catch (error) {
        alert('导入失败：' + error.message)
      }
    }
    
    reader.readAsText(file)
  } catch (error) {
    alert('导入失败：' + error.message)
  }
}

const clearAllData = () => {
  if (confirm('确定要清除所有本地数据吗？此操作无法撤销！')) {
    localStorage.clear()
    window.location.reload()
  }
}

const resetSync = () => {
  if (confirm('确定要重置同步状态吗？这可能会造成数据冲突。')) {
    dataSyncStore.clearPendingOperations()
    alert('同步状态已重置')
  }
}

const updateAutoSync = () => {
  // 实际实现中应该保存到设置
  console.log('Auto sync:', autoSyncEnabled.value ? 'enabled' : 'disabled')
}

const formatTime = (timeString) => {
  return new Date(timeString).toLocaleString()
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

onMounted(() => {
  // 加载设置
  const settings = localStorage.getItem('sync-settings')
  if (settings) {
    const parsed = JSON.parse(settings)
    autoSyncEnabled.value = parsed.autoSyncEnabled ?? true
    wifiOnlySync.value = parsed.wifiOnlySync ?? false
    dataCompression.value = parsed.dataCompression ?? true
  }
})
</script>

<style scoped>
.data-management {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 20px;
}

.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 2rem;
  margin: 2rem 0;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.header-content p {
  font-size: 1.125rem;
  color: var(--muted);
  margin: 0;
}

/* 管理网格 */
.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.management-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.management-card h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.card-description {
  color: var(--muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* 同步状态 */
.sync-status-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
}

.status-item:last-child {
  border-bottom: none;
}

.status-item .label {
  color: var(--muted);
}

.status-item .value {
  font-weight: 600;
}

.status-item .value.syncing {
  color: #f59e0b;
}

.status-item .value.error {
  color: #ef4444;
}

.status-item .value.success {
  color: #10b981;
}

.sync-actions {
  display: flex;
  gap: 0.75rem;
}

/* 备份选项 */
.backup-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item {
  padding: 1rem;
  background: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.option-item h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.option-item p {
  color: var(--muted);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

/* 文件上传 */
.file-input {
  display: none;
}

.upload-area {
  border: 2px dashed var(--border);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: var(--primary);
  background: var(--primary-light);
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.upload-text p {
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.875rem;
  color: var(--muted);
}

.upload-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg);
  border-radius: 8px;
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-weight: 600;
  color: var(--primary-dark);
}

.file-size {
  font-size: 0.875rem;
  color: var(--muted);
}

/* 设置列表 */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-light);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.setting-info p {
  color: var(--muted);
  font-size: 0.875rem;
  margin: 0;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border);
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* 数据统计 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--border);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--muted);
}

/* 危险区域 */
.danger-zone {
  border-color: #ef4444;
  background: #fef2f2;
}

.warning-text {
  color: #dc2626;
  font-weight: 600;
}

.danger-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  margin: 0;
  color: var(--primary-dark);
}

.modal-body {
  padding: 1.5rem;
}

.import-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.import-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
}

.import-list li:last-child {
  border-bottom: none;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* 按钮样式 */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover:not(:disabled) {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .management-grid {
    grid-template-columns: 1fr;
  }
  
  .sync-actions {
    flex-direction: column;
  }
  
  .danger-actions {
    flex-direction: column;
  }
  
  .upload-preview {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .container {
    padding: 0 var(--container-padding, 1rem);
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1.5rem;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .management-card {
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>