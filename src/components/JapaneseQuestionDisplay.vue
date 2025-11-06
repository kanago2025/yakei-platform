<!-- 📁 src/components/JapaneseQuestionDisplay.vue -->
<template>
  <div class="japanese-question-display">
    <!-- 语言切换 -->
    <div class="language-switcher">
      <el-radio-group v-model="displayLanguage" size="small">
        <el-radio-button label="ja">日文</el-radio-button>
        <el-radio-button label="zh" :disabled="!question.is_translated">
          中文
        </el-radio-button>
        <el-radio-button label="both" :disabled="!question.is_translated">
          双语
        </el-radio-button>
      </el-radio-group>
      
      <el-tag v-if="!question.is_translated" type="warning" size="small">
        未翻译
      </el-tag>
    </div>

    <!-- 题目内容 -->
    <div class="question-content">
      <!-- 日文模式 -->
      <div v-if="displayLanguage === 'ja'" class="japanese-mode">
        <div class="question-text ja-text">
          {{ question.question_text_ja }}
        </div>
        <div class="options">
          <div 
            v-for="(option, index) in question.options_ja" 
            :key="index"
            class="option-item"
            :class="{ 
              'selected': selectedAnswer === String.fromCharCode(65 + index),
              'correct': showAnswer && String.fromCharCode(65 + index) === question.correct_answer
            }"
            @click="selectAnswer(String.fromCharCode(65 + index))"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}.</span>
            <span class="option-text ja-text">{{ option }}</span>
          </div>
        </div>
      </div>

      <!-- 中文模式 -->
      <div v-else-if="displayLanguage === 'zh'" class="chinese-mode">
        <div class="question-text zh-text">
          {{ question.question_text_zh }}
        </div>
        <div class="options">
          <div 
            v-for="(option, index) in question.options_zh" 
            :key="index"
            class="option-item"
            :class="{ 
              'selected': selectedAnswer === String.fromCharCode(65 + index),
              'correct': showAnswer && String.fromCharCode(65 + index) === question.correct_answer
            }"
            @click="selectAnswer(String.fromCharCode(65 + index))"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}.</span>
            <span class="option-text zh-text">{{ option }}</span>
          </div>
        </div>
      </div>

      <!-- 双语模式 -->
      <div v-else class="bilingual-mode">
        <div class="question-text">
          <div class="ja-text">{{ question.question_text_ja }}</div>
          <div class="zh-text">{{ question.question_text_zh }}</div>
        </div>
        <div class="options">
          <div 
            v-for="(option, index) in question.options_ja" 
            :key="index"
            class="option-item"
            :class="{ 
              'selected': selectedAnswer === String.fromCharCode(65 + index),
              'correct': showAnswer && String.fromCharCode(65 + index) === question.correct_answer
            }"
            @click="selectAnswer(String.fromCharCode(65 + index))"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}.</span>
            <div class="option-content">
              <div class="ja-text">{{ option }}</div>
              <div class="zh-text">{{ question.options_zh[index] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 题目信息 -->
    <div class="question-meta">
      <el-space>
        <el-tag size="small">{{ question.field }}</el-tag>
        <el-tag size="small" type="info">{{ question.year }}年</el-tag>
        <el-tag size="small" :type="getDifficultyType(question.difficulty)">
          难度: {{ question.difficulty }}/5
        </el-tag>
        <el-tag v-if="question.is_translated" size="small" type="success">
          已翻译
        </el-tag>
      </el-space>
    </div>

    <!-- 答案解析 -->
    <div v-if="showAnswer && question.explanation_zh" class="explanation">
      <h4>答案解析</h4>
      <div class="explanation-content">{{ question.explanation_zh }}</div>
    </div>

    <!-- 操作按钮 -->
    <div class="question-actions">
      <el-button 
        v-if="!showAnswer" 
        size="small" 
        @click="showAnswer = true"
      >
        显示答案
      </el-button>
      <el-button 
        v-else 
        size="small" 
        @click="showAnswer = false"
      >
        隐藏答案
      </el-button>
      
      <el-button 
        v-if="!question.is_translated" 
        size="small" 
        type="primary"
        @click="$emit('translate')"
      >
        翻译此题
      </el-button>
      
      <el-button 
        size="small" 
        @click="$emit('edit')"
      >
        编辑题目
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  initialLanguage: {
    type: String,
    default: 'ja'
  }
})

const emit = defineEmits(['answer-select', 'translate', 'edit'])

const displayLanguage = ref(props.initialLanguage)
const selectedAnswer = ref('')
const showAnswer = ref(false)

// 监听题目变化重置状态
watch(() => props.question, () => {
  selectedAnswer.value = ''
  showAnswer.value = false
})

const selectAnswer = (answer) => {
  selectedAnswer.value = answer
  emit('answer-select', answer)
}

const getDifficultyType = (difficulty) => {
  if (difficulty <= 2) return 'success'
  if (difficulty <= 3) return 'warning'
  return 'danger'
}
</script>

<style scoped>
.japanese-question-display {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  background: white;
}

.language-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.question-content {
  margin-bottom: 16px;
}

.ja-text {
  font-family: 'MS PGothic', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}

.zh-text {
  font-family: 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: #1890ff;
}

.question-text {
  margin-bottom: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.bilingual-mode .question-text .ja-text {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e4e7ed;
}

.options {
  space-y: 8px;
}

.option-item {
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 8px;
}

.option-item:hover {
  border-color: #409eff;
  background: #f0f7ff;
}

.option-item.selected {
  border-color: #409eff;
  background: #ecf5ff;
}

.option-item.correct {
  border-color: #67c23a;
  background: #f0f9e8;
}

.option-letter {
  font-weight: bold;
  min-width: 24px;
  color: #409eff;
}

.option-item.correct .option-letter {
  color: #67c23a;
}

.option-text {
  flex: 1;
}

.option-content {
  flex: 1;
}

.option-content .ja-text {
  margin-bottom: 4px;
}

.question-meta {
  margin-bottom: 16px;
}

.explanation {
  margin-top: 16px;
  padding: 12px;
  background: #f0f9ff;
  border-radius: 4px;
  border-left: 4px solid #67c23a;
}

.explanation h4 {
  margin: 0 0 8px 0;
  color: #67c23a;
}

.explanation-content {
  line-height: 1.6;
}

.question-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>