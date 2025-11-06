<!-- src/views/exam/SmartExamConfig.vue -->
<template>
  <div class="smart-exam-config">
    <div class="container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-main">
            <h1>智能组卷</h1>
            <p>基于您的学习数据，生成个性化的练习试卷</p>
          </div>
          <div class="header-actions">
            <button class="btn btn-outline" @click="goBack">
              ← 返回
            </button>
          </div>
        </div>
      </div>

      <div class="config-layout">
        <!-- 左侧配置面板 -->
        <div class="config-panel">
          <div class="panel-section">
            <h3>📊 智能推荐</h3>
            <div class="recommendation-list">
              <div 
                v-for="rec in recommendations" 
                :key="rec.type"
                class="recommendation-card"
                :class="selectedRecommendation?.type === rec.type ? 'selected' : ''"
                @click="selectRecommendation(rec)"
              >
                <div class="rec-header">
                  <span class="rec-title">{{ rec.title }}</span>
                  <span class="rec-priority" :class="rec.priority">{{ rec.priority }}</span>
                </div>
                <p class="rec-description">{{ rec.description }}</p>
                <div class="rec-config">
                  <span class="config-item">{{ rec.config.questionCount }}题</span>
                  <span class="config-item">难度: {{ formatDifficulty(rec.config.difficultyDistribution) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="panel-section">
            <h3>⚙️ 自定义配置</h3>
            <form class="config-form" @submit.prevent="generateCustomExam">
              <!-- 题目数量 -->
              <div class="form-group">
                <label class="form-label">题目数量</label>
                <select v-model="customConfig.questionCount" class="form-select">
                  <option value="20">20题 (快速练习)</option>
                  <option value="30">30题 (专项练习)</option>
                  <option value="50" selected>50题 (完整考试)</option>
                  <option value="80">80题 (强化训练)</option>
                </select>
              </div>

              <!-- 考试时长 -->
              <div class="form-group">
                <label class="form-label">考试时长</label>
                <select v-model="customConfig.examDuration" class="form-select">
                  <option value="60">60分钟</option>
                  <option value="90">90分钟</option>
                  <option value="120" selected>120分钟</option>
                  <option value="150">150分钟</option>
                </select>
              </div>

              <!-- 难度分布 -->
              <div class="form-group">
                <label class="form-label">难度分布</label>
                <div class="difficulty-distribution">
                  <div class="difficulty-item">
                    <span class="difficulty-label">简单</span>
                    <input 
                      v-model.number="customConfig.difficultyDistribution.easy" 
                      type="range" 
                      min="0" 
                      max="100" 
                      class="difficulty-slider"
                    >
                    <span class="difficulty-value">{{ customConfig.difficultyDistribution.easy * 100 }}%</span>
                  </div>
                  <div class="difficulty-item">
                    <span class="difficulty-label">中等</span>
                    <input 
                      v-model.number="customConfig.difficultyDistribution.medium" 
                      type="range" 
                      min="0" 
                      max="100" 
                      class="difficulty-slider"
                    >
                    <span class="difficulty-value">{{ customConfig.difficultyDistribution.medium * 100 }}%</span>
                  </div>
                  <div class="difficulty-item">
                    <span class="difficulty-label">困难</span>
                    <input 
                      v-model.number="customConfig.difficultyDistribution.hard" 
                      type="range" 
                      min="0" 
                      max="100" 
                      class="difficulty-slider"
                    >
                    <span class="difficulty-value">{{ customConfig.difficultyDistribution.hard * 100 }}%</span>
                  </div>
                </div>
              </div>

              <!-- 重点领域 -->
              <div class="form-group">
                <label class="form-label">重点领域</label>
                <div class="focus-areas">
                  <div 
                    v-for="area in userWeakAreas" 
                    :key="area.field"
                    class="focus-area-checkbox"
                  >
                    <label class="checkbox-label">
                      <input 
                        type="checkbox" 
                        :value="area" 
                        v-model="customConfig.focusAreas"
                        class="checkbox-input"
                      >
                      <span class="checkbox-custom"></span>
                      <span class="area-name">{{ area.field }}</span>
                      <span class="weakness-score">薄弱度: {{ Math.round(area.weaknessScore) }}%</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- 包含最近错题 -->
              <div class="form-group">
                <label class="checkbox-label large">
                  <input 
                    type="checkbox" 
                    v-model="customConfig.includeRecentWrong"
                    class="checkbox-input"
                  >
                  <span class="checkbox-custom"></span>
                  <span class="checkbox-text">包含最近错题</span>
                </label>
              </div>

              <button type="submit" class="btn btn-primary generate-btn">
                🎯 生成智能试卷
              </button>
            </form>
          </div>
        </div>

        <!-- 右侧预览面板 -->
        <div class="preview-panel">
          <div class="panel-section">
            <h3>👁️ 试卷预览</h3>
            <div class="exam-preview">
              <div class="preview-header">
                <h4>{{ previewExam.title || '智能组卷试卷' }}</h4>
                <div class="preview-meta">
                  <span class="meta-item">{{ previewExam.questions?.length || 0 }} 题</span>
                  <span class="meta-item">{{ previewExam.duration }} 分钟</span>
                  <span class="meta-item">智能组卷</span>
                </div>
              </div>

              <div class="preview-content">
                <!-- 领域分布 -->
                <div class="preview-section">
                  <h5>领域分布</h5>
                  <div class="field-distribution">
                    <div 
                      v-for="field in fieldDistribution" 
                      :key="field.name"
                      class="field-item"
                    >
                      <span class="field-name">{{ field.name }}</span>
                      <div class="field-bar">
                        <div 
                          class="field-fill" 
                          :style="{ width: field.percentage + '%' }"
                        ></div>
                      </div>
                      <span class="field-count">{{ field.count }}题</span>
                    </div>
                  </div>
                </div>

                <!-- 难度分布 -->
                <div class="preview-section">
                  <h5>难度分布</h5>
                  <div class="difficulty-preview">
                    <div class="difficulty-bar">
                      <div 
                        class="difficulty-segment easy" 
                        :style="{ width: difficultyDistribution.easy * 100 + '%' }"
                      ></div>
                      <div 
                        class="difficulty-segment medium" 
                        :style="{ width: difficultyDistribution.medium * 100 + '%' }"
                      ></div>
                      <div 
                        class="difficulty-segment hard" 
                        :style="{ width: difficultyDistribution.hard * 100 + '%' }"
                      ></div>
                    </div>
                    <div class="difficulty-labels">
                      <span>简单 {{ Math.round(difficultyDistribution.easy * 100) }}%</span>
                      <span>中等 {{ Math.round(difficultyDistribution.medium * 100) }}%</span>
                      <span>困难 {{ Math.round(difficultyDistribution.hard * 100) }}%</span>
                    </div>
                  </div>
                </div>

                <!-- 题目来源 -->
                <div class="preview-section">
                  <h5>题目来源</h5>
                  <div class="source-breakdown">
                    <div class="source-item">
                      <span class="source-label">薄弱领域题目</span>
                      <span class="source-count">{{ focusAreaCount }}题</span>
                    </div>
                    <div class="source-item">
                      <span class="source-label">最近错题</span>
                      <span class="source-count">{{ recentWrongCount }}题</span>
                    </div>
                    <div class="source-item">
                      <span class="source-label">随机题目</span>
                      <span class="source-count">{{ randomCount }}题</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="preview-actions" v-if="previewExam.questions?.length > 0">
                <button class="btn btn-primary" @click="startExam">
                  开始考试
                </button>
                <button class="btn btn-outline" @click="regenerateExam">
                  重新生成
                </button>
              </div>
            </div>
          </div>

          <!-- 学习分析 -->
          <div class="panel-section">
            <h3>📈 学习分析</h3>
            <div class="learning-analysis">
              <div class="analysis-card">
                <h4>薄弱领域分析</h4>
                <div class="weakness-list">
                  <div 
                    v-for="area in userWeakAreas.slice(0, 5)" 
                    :key="area.field"
                    class="weakness-item"
                  >
                    <div class="weakness-info">
                      <span class="area-name">{{ area.field }}</span>
                      <span class="weakness-score">{{ Math.round(area.weaknessScore) }}%</span>
                    </div>
                    <div class="weakness-bar">
                      <div 
                        class="weakness-fill" 
                        :style="{ width: area.weaknessScore + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="analysis-card">
                <h4>学习建议</h4>
                <div class="suggestions">
                  <div 
                    v-for="suggestion in learningSuggestions" 
                    :key="suggestion.type"
                    class="suggestion-item"
                  >
                    <span class="suggestion-icon">{{ suggestion.icon }}</span>
                    <span class="suggestion-text">{{ suggestion.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSmartExamStore } from '@/stores/smartExamStore'

const router = useRouter()
const smartExamStore = useSmartExamStore()

// 状态
const selectedRecommendation = ref(null)
const customConfig = ref({
  questionCount: 50,
  examDuration: 120,
  difficultyDistribution: { easy: 0.2, medium: 0.5, hard: 0.3 },
  focusAreas: [],
  includeRecentWrong: true
})
const previewExam = ref({})

// 计算属性
const recommendations = computed(() => smartExamStore.getExamRecommendations())
const userWeakAreas = computed(() => smartExamStore.userWeakAreas)

const fieldDistribution = computed(() => {
  const fields = {}
  previewExam.value.questions?.forEach(q => {
    if (!fields[q.field]) fields[q.field] = 0
    fields[q.field]++
  })
  
  return Object.entries(fields).map(([name, count]) => ({
    name,
    count,
    percentage: (count / previewExam.value.questions.length) * 100
  }))
})

const difficultyDistribution = computed(() => {
  return customConfig.value.difficultyDistribution
})

const focusAreaCount = computed(() => {
  return previewExam.value.questions?.filter(q => q.source === 'focus_area').length || 0
})

const recentWrongCount = computed(() => {
  return previewExam.value.questions?.filter(q => q.source === 'recent_wrong').length || 0
})

const randomCount = computed(() => {
  return previewExam.value.questions?.filter(q => q.source === 'random').length || 0
})

const learningSuggestions = computed(() => {
  const suggestions = []
  
  if (smartExamStore.wrongQuestions.length > 20) {
    suggestions.push({
      type: 'review_wrong',
      icon: '📚',
      text: '您有较多错题，建议先复习错题本'
    })
  }
  
  const topWeakArea = userWeakAreas.value[0]
  if (topWeakArea && topWeakArea.weaknessScore > 70) {
    suggestions.push({
      type: 'focus_weakness',
      icon: '🎯',
      text: `重点关注${topWeakArea.field}领域，薄弱度较高`
    })
  }
  
  if (smartExamStore.learningHistory.length < 3) {
    suggestions.push({
      type: 'more_practice',
      icon: '💪',
      text: '多做模拟考试，积累实战经验'
    })
  }
  
  return suggestions
})

// 方法
const initializeData = () => {
  // 模拟用户数据 - 实际应该从API获取
  const mockWrongQuestions = Array.from({ length: 15 }, (_, i) => ({
    id: `wrong_${i + 1}`,
    text: `错题 ${i + 1}`,
    field: ['宅建业法', '权利关系', '法令制限', '税・其他', '五问免除'][i % 5],
    difficultyClass: ['easy', 'medium', 'hard'][i % 3],
    lastWrongAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
  }))
  
  const mockLearningHistory = Array.from({ length: 5 }, (_, i) => ({
    id: `exam_${i + 1}`,
    weakAreas: [
      { id: '宅建业法', name: '宅建业法', accuracy: 60 + i * 5 },
      { id: '权利关系', name: '权利关系', accuracy: 70 - i * 3 }
    ]
  }))
  
  smartExamStore.updateUserData(mockWrongQuestions, mockLearningHistory)
  
  // 默认选择第一个推荐
  if (recommendations.value.length > 0) {
    selectRecommendation(recommendations.value[0])
  }
}

const selectRecommendation = (rec) => {
  selectedRecommendation.value = rec
  customConfig.value = { ...customConfig.value, ...rec.config }
  generatePreviewExam()
}

const generateCustomExam = () => {
  generatePreviewExam()
}

const generatePreviewExam = () => {
  const exam = smartExamStore.generateSmartExam(customConfig.value)
  previewExam.value = exam
}

const formatDifficulty = (distribution) => {
  const easy = Math.round(distribution.easy * 100)
  const medium = Math.round(distribution.medium * 100)
  const hard = Math.round(distribution.hard * 100)
  return `简${easy}%/中${medium}%/难${hard}%`
}

const startExam = () => {
  if (previewExam.value.questions?.length > 0) {
    // 保存考试到store，然后跳转到考试会话
    router.push({
      path: '/exam/session',
      query: { 
        examId: previewExam.value.id,
        type: 'smart'
      }
    })
  }
}

const regenerateExam = () => {
  generatePreviewExam()
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  initializeData()
})
</script>

<style scoped>
.smart-exam-config {
  min-height: 100vh;
  background-color: var(--bg);
  padding-top: 20px;
}

.container {
  max-width: var(--max-width, 1400px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* ========= 页面头部 ========= */
.page-header {
  background: linear-gradient(135deg, rgba(42, 121, 96, 0.05), rgba(42, 121, 96, 0.02));
  border-radius: var(--radius);
  padding: 2rem;
  margin: 2rem 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-main h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.header-main p {
  font-size: 1.125rem;
  color: var(--muted);
  margin: 0;
}

/* ========= 布局 ========= */
.config-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.config-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.preview-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.panel-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.panel-section h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

/* ========= 推荐列表 ========= */
.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recommendation-card {
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.recommendation-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.recommendation-card.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.rec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.rec-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.rec-priority {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.rec-priority.high {
  background: #fee2e2;
  color: #dc2626;
}

.rec-priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.rec-priority.low {
  background: var(--primary-light);
  color: var(--primary);
}

.rec-description {
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.rec-config {
  display: flex;
  gap: 1rem;
}

.config-item {
  font-size: 0.75rem;
  color: var(--primary);
  background: var(--primary-light);
  padding: 2px 6px;
  border-radius: 4px;
}

/* ========= 表单样式 ========= */
.config-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.form-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 0.875rem;
}

/* 难度分布滑块 */
.difficulty-distribution {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.difficulty-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.difficulty-label {
  font-size: 0.875rem;
  color: var(--text);
  min-width: 40px;
}

.difficulty-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: var(--border);
  outline: none;
}

.difficulty-value {
  font-size: 0.75rem;
  color: var(--muted);
  min-width: 40px;
  text-align: right;
}

/* 重点领域选择 */
.focus-areas {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.focus-area-checkbox {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.checkbox-label.large {
  font-size: 1rem;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--primary);
  border-color: var(--primary);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.area-name {
  font-weight: 500;
  color: var(--text);
}

.weakness-score {
  font-size: 0.75rem;
  color: var(--muted);
  margin-left: auto;
}

.checkbox-text {
  font-weight: 500;
  color: var(--text);
}

.generate-btn {
  margin-top: 1rem;
  padding: 12px 24px;
  font-size: 1rem;
}

/* ========= 预览面板 ========= */
.exam-preview {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border);
}

.preview-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
}

.preview-header h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.preview-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.875rem;
  color: var(--muted);
  background: var(--card-bg);
  padding: 4px 8px;
  border-radius: 4px;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.preview-section h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

/* 领域分布 */
.field-distribution {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.field-name {
  font-size: 0.875rem;
  color: var(--text);
  min-width: 80px;
}

.field-bar {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.field-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.field-count {
  font-size: 0.75rem;
  color: var(--muted);
  min-width: 40px;
  text-align: right;
}

/* 难度预览 */
.difficulty-preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.difficulty-bar {
  height: 12px;
  background: var(--border);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
}

.difficulty-segment {
  height: 100%;
  transition: width 0.5s ease;
}

.difficulty-segment.easy {
  background: var(--excellent);
}

.difficulty-segment.medium {
  background: var(--good);
}

.difficulty-segment.hard {
  background: var(--poor);
}

.difficulty-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--muted);
}

/* 题目来源 */
.source-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.source-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
}

.source-item:last-child {
  border-bottom: none;
}

.source-label {
  font-size: 0.875rem;
  color: var(--text);
}

.source-count {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
}

.preview-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* ========= 学习分析 ========= */
.learning-analysis {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.analysis-card {
  background: var(--bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border);
}

.analysis-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.weakness-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.weakness-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.weakness-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.area-name {
  font-size: 0.875rem;
  color: var(--text);
}

.weakness-score {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--poor);
}

.weakness-bar {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  overflow: hidden;
}

.weakness-fill {
  height: 100%;
  background: var(--poor);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.suggestions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--primary-light);
  border-radius: 6px;
}

.suggestion-icon {
  font-size: 1.125rem;
}

.suggestion-text {
  font-size: 0.875rem;
  color: var(--primary-dark);
}

/* ========= 按钮样式 ========= */
.btn {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

/* ========= 响应式设计 ========= */
@media (max-width: 1024px) {
  .config-layout {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--container-padding, 1.5rem);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .preview-actions {
    flex-direction: column;
  }
  
  .difficulty-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .container {
    padding: 0 var(--container-padding, 1rem);
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1.5rem;
  }
  
  .header-main h1 {
    font-size: 2rem;
  }
  
  .header-main p {
    font-size: 1rem;
  }
  
  .panel-section {
    padding: 1rem;
  }
  
  .exam-preview {
    padding: 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>