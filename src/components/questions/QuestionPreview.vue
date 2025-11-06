<!-- src/components/questions/QuestionPreview.vue -->
<template>
  <div class="question-preview">
    <div class="question-header">
      <div class="question-meta">
        <el-tag :type="getTypeTag(question.type)" size="small">
          {{ getTypeText(question.type) }}
        </el-tag>
        <el-tag :type="getDifficultyTag(question.difficulty)" size="small">
          {{ getDifficultyText(question.difficulty) }}
        </el-tag>
        <span class="subject">{{ question.subject }}</span>
      </div>
    </div>
    
    <div class="question-content">
      <h4>{{ question.content }}</h4>
    </div>
    
    <div v-if="question.options" class="question-options">
      <div
        v-for="option in question.options"
        :key="option.id"
        class="option-item"
        :class="{ 'correct-option': isCorrectOption(option.id) }"
      >
        <span class="option-label">{{ option.id }}.</span>
        {{ option.text }}
        <el-icon v-if="isCorrectOption(option.id)" class="correct-icon">
          <Check />
        </el-icon>
      </div>
    </div>
    
    <div v-if="question.explanation" class="question-explanation">
      <h5>解析：</h5>
      <p>{{ question.explanation }}</p>
    </div>
  </div>
</template>

<script setup>
import { Check } from '@element-plus/icons-vue'

defineProps({
  question: {
    type: Object,
    required: true
  }
})

const getTypeTag = (type) => {
  const map = { single: '', multiple: 'warning', judgment: 'success' }
  return map[type] || ''
}

const getTypeText = (type) => {
  const map = { single: '单选', multiple: '多选', judgment: '判断' }
  return map[type] || type
}

const getDifficultyTag = (difficulty) => {
  const map = { easy: 'success', medium: 'warning', hard: 'danger' }
  return map[difficulty] || ''
}

const getDifficultyText = (difficulty) => {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[difficulty] || difficulty
}

const isCorrectOption = (optionId) => {
  return props.question.correctAnswer?.includes(optionId)
}
</script>

<style scoped>
.question-preview {
  padding: 10px;
}

.question-header {
  margin-bottom: 15px;
}

.question-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}

.subject {
  color: #909399;
  font-size: 14px;
}

.question-content h4 {
  margin: 0 0 15px 0;
  color: #303133;
  line-height: 1.5;
}

.question-options {
  margin-bottom: 20px;
}

.option-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
}

.option-item.correct-option {
  border-color: #67c23a;
  background-color: #f0f9eb;
}

.option-label {
  font-weight: 500;
  margin-right: 8px;
  min-width: 20px;
}

.correct-icon {
  margin-left: auto;
  color: #67c23a;
}

.question-explanation {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.question-explanation h5 {
  margin: 0 0 8px 0;
  color: #303133;
}

.question-explanation p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}
</style>