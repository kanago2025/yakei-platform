<!-- components/question/QuestionForm.vue -->
<template>
  <div class="question-form">
    <form @submit.prevent="submitQuestion">
      <div class="form-grid">
        <!-- 基础信息 -->
        <div class="form-section">
          <h3>题目基本信息</h3>
          
          <div class="form-group">
            <label>题目类型 *</label>
            <div class="radio-group">
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="formData.question_type" 
                  value="single_choice"
                >
                单选题
              </label>
              <label class="radio-option">
                <input 
                  type="radio" 
                  v-model="formData.question_type" 
                  value="multi_choice"
                >
                多选题
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>分野 *</label>
            <select v-model="formData.field" required>
              <option value="">选择分野</option>
              <option value="宅建业法">宅建业法</option>
              <option value="权利关系">权利关系</option>
              <option value="法令上的制限">法令上的制限</option>
              <option value="税・その他">税・その他</option>
              <option value="五问免除">五问免除</option>
            </select>
          </div>

          <div class="form-group">
            <label>知识点ID *</label>
            <input 
              type="text" 
              v-model="formData.topic_id" 
              placeholder="如: important_matters, mortgage_rights"
              required
            >
          </div>

          <div class="form-group">
            <label>难度等级 *</label>
            <div class="difficulty-selector">
              <button 
                v-for="level in [1,2,3,4,5]" 
                :key="level"
                type="button"
                class="difficulty-btn"
                :class="{ active: formData.difficulty === level }"
                @click="formData.difficulty = level"
              >
                {{ level }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>年份</label>
            <input 
              type="number" 
              v-model="formData.year" 
              placeholder="如: 2024"
              min="1989"
              max="2025"
            >
          </div>
        </div>

        <!-- 题目内容 -->
        <div class="form-section">
          <h3>题目内容</h3>
          
          <div class="form-group">
            <label>日文题干 *</label>
            <textarea 
              v-model="formData.question_text_ja" 
              placeholder="输入日文题目内容..."
              rows="4"
              required
            ></textarea>
          </div>

          <!-- 选项设置 -->
          <div class="form-group">
            <label>选项设置 *</label>
            <div class="options-container">
              <div 
                v-for="(option, index) in options" 
                :key="index"
                class="option-item"
              >
                <span class="option-label">{{ optionLabels[index] }}</span>
                <input 
                  type="text" 
                  v-model="options[index]"
                  :placeholder="`选项 ${optionLabels[index]} 的内容`"
                >
                <button 
                  type="button" 
                  class="remove-option"
                  @click="removeOption(index)"
                  v-if="options.length > 2"
                >
                  ×
                </button>
              </div>
              <button 
                type="button" 
                class="add-option"
                @click="addOption"
                v-if="options.length < 6"
              >
                + 添加选项
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>正确答案 *</label>
            <div class="correct-answers">
              <label 
                v-for="(option, index) in options" 
                :key="index"
                class="answer-option"
              >
                <input 
                  type="checkbox" 
                  :value="optionLabels[index]"
                  v-model="correctAnswers"
                  v-if="formData.question_type === 'multi_choice'"
                >
                <input 
                  type="radio" 
                  :value="optionLabels[index]"
                  v-model="formData.correct_answer"
                  v-else
                  name="correct_answer"
                >
                {{ optionLabels[index] }}
              </label>
            </div>
          </div>
        </div>

        <!-- 附加信息 -->
        <div class="form-section">
          <h3>附加信息</h3>
          
          <div class="form-group">
            <label>中文解析 *</label>
            <textarea 
              v-model="formData.explanation_zh" 
              placeholder="输入题目的中文解析..."
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label>标签</label>
            <input 
              type="text" 
              v-model="tagInput"
              placeholder="输入标签，用逗号分隔"
              @keydown.enter.prevent="addTag"
            >
            <div class="tags-container">
              <span 
                v-for="(tag, index) in formData.tags" 
                :key="index"
                class="tag"
              >
                {{ tag }}
                <button type="button" @click="removeTag(index)">×</button>
              </span>
            </div>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-option">
              <input type="checkbox" v-model="formData.is_from_past_exam">
              来自历年真题
            </label>
            <label class="checkbox-option">
              <input type="checkbox" v-model="formData.is_five_question_exempt">
              五问免除题目
            </label>
          </div>
        </div>
      </div>

      <!-- 预览区域 -->
      <div class="preview-section">
        <h3>题目预览</h3>
        <div class="preview-card">
          <div class="preview-header">
            <span class="field-badge">{{ formData.field || '未选择分野' }}</span>
            <span class="difficulty-badge">难度: {{ formData.difficulty || '未设置' }}</span>
          </div>
          <div class="preview-content">
            <p class="question-text">{{ formData.question_text_ja || '题目内容预览...' }}</p>
            <div class="preview-options">
              <div 
                v-for="(option, index) in options" 
                :key="index"
                class="preview-option"
                :class="{
                  correct: isOptionCorrect(optionLabels[index]),
                  selected: isOptionSelected(optionLabels[index])
                }"
              >
                <span class="option-marker">{{ optionLabels[index] }}</span>
                <span class="option-text">{{ option || `选项${optionLabels[index]}` }}</span>
              </div>
            </div>
          </div>
          <div class="preview-explanation" v-if="formData.explanation_zh">
            <strong>解析：</strong>{{ formData.explanation_zh }}
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="form-actions">
        <button 
          type="button" 
          class="btn-secondary"
          @click="resetForm"
        >
          重置表单
        </button>
        <button 
          type="submit" 
          class="btn-primary"
          :disabled="!isFormValid"
        >
          提交题目
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['question-submitted'])

// 表单数据
const formData = ref({
  question_type: 'single_choice',
  field: '',
  topic_id: '',
  difficulty: 3,
  year: new Date().getFullYear(),
  question_text_ja: '',
  explanation_zh: '',
  is_from_past_exam: true,
  is_five_question_exempt: false,
  correct_answer: '',
  tags: []
})

const options = ref(['', '', '', ''])
const correctAnswers = ref([])
const tagInput = ref('')

const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F']

// 计算属性
const isFormValid = computed(() => {
  return formData.value.field &&
         formData.value.topic_id &&
         formData.value.question_text_ja &&
         formData.value.explanation_zh &&
         (formData.value.question_type === 'multi_choice' ? 
          correctAnswers.value.length > 0 : 
          formData.value.correct_answer) &&
         options.value.some(opt => opt.trim() !== '')
})

// 方法
const addOption = () => {
  if (options.value.length < 6) {
    options.value.push('')
  }
}

const removeOption = (index) => {
  if (options.value.length > 2) {
    options.value.splice(index, 1)
    // 移除对应的正确答案
    const label = optionLabels[index]
    if (formData.value.question_type === 'multi_choice') {
      correctAnswers.value = correctAnswers.value.filter(ans => ans !== label)
    } else if (formData.value.correct_answer === label) {
      formData.value.correct_answer = ''
    }
  }
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  formData.value.tags.splice(index, 1)
}

const isOptionCorrect = (label) => {
  if (formData.value.question_type === 'multi_choice') {
    return correctAnswers.value.includes(label)
  } else {
    return formData.value.correct_answer === label
  }
}

const isOptionSelected = (label) => {
  // 用于预览时的选中状态显示
  return isOptionCorrect(label)
}

const resetForm = () => {
  formData.value = {
    question_type: 'single_choice',
    field: '',
    topic_id: '',
    difficulty: 3,
    year: new Date().getFullYear(),
    question_text_ja: '',
    explanation_zh: '',
    is_from_past_exam: true,
    is_five_question_exempt: false,
    correct_answer: '',
    tags: []
  }
  options.value = ['', '', '', '']
  correctAnswers.value = []
  tagInput.value = ''
}

const submitQuestion = () => {
  if (!isFormValid.value) return

  const questionData = {
    ...formData.value,
    options_ja: JSON.stringify(
      options.value
        .filter(opt => opt.trim() !== '')
        .map((opt, index) => ({ [optionLabels[index]]: opt }))
    ),
    correct_answer: formData.value.question_type === 'multi_choice' 
      ? correctAnswers.value.join(',') 
      : formData.value.correct_answer,
    tags: JSON.stringify(formData.value.tags)
  }

  emit('question-submitted', questionData)
  resetForm()
}

// 监听题目类型变化
watch(() => formData.value.question_type, (newType) => {
  if (newType === 'single_choice' && correctAnswers.value.length > 0) {
    formData.value.correct_answer = correctAnswers.value[0]
    correctAnswers.value = []
  }
})
</script>

<style scoped>
.question-form {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-section {
  background: var(--bg);
  border-radius: 8px;
  padding: 1.5rem;
}

.form-section h3 {
  color: var(--text);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.difficulty-selector {
  display: flex;
  gap: 0.5rem;
}

.difficulty-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.difficulty-btn:hover {
  border-color: var(--primary);
}

.difficulty-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.options-container {
  space-y: 0.5rem;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option-label {
  width: 30px;
  font-weight: 600;
  color: var(--primary);
}

.remove-option {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-option {
  background: var(--primary-light);
  color: var(--primary);
  border: 1px dashed var(--primary);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.correct-answers {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background: var(--primary-light);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tag button {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 1rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.preview-section {
  margin-bottom: 2rem;
}

.preview-card {
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
}

.preview-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.field-badge,
.difficulty-badge {
  background: var(--primary-light);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.question-text {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.preview-options {
  space-y: 0.5rem;
}

.preview-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.preview-option.correct {
  background: #d1fae5;
  border-color: #10b981;
}

.preview-option.selected {
  background: var(--primary-light);
  border-color: var(--primary);
}

.option-marker {
  font-weight: 600;
  color: var(--primary);
}

.preview-explanation {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-primary:disabled {
  background: var(--muted);
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>