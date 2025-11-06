<!-- 📁 src/components/QuestionTranslator.vue -->
<template>
  <div class="question-translator">
    <div class="translation-layout">
      <!-- 左侧：日文原文 -->
      <div class="original-panel">
        <h3>日文原文</h3>
        <div class="original-content">
          <div class="question-section">
            <label>题目内容：</label>
            <div class="japanese-text original-text">
              {{ question.question_text_ja }}
            </div>
          </div>
          
          <div class="options-section">
            <label>选项：</label>
            <div v-for="(option, index) in question.options_ja" :key="index" class="option-item">
              <span class="option-label">{{ String.fromCharCode(65 + index) }}.</span>
              <div class="japanese-text original-text">{{ option }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：中文翻译 -->
      <div class="translation-panel">
        <h3>中文翻译</h3>
        <el-form :model="translationForm" label-width="80px">
          <el-form-item label="题目翻译">
            <el-input
              v-model="translationForm.question_text_zh"
              type="textarea"
              :rows="4"
              placeholder="请输入中文翻译"
              show-word-limit
              :maxlength="500"
            />
          </el-form-item>

          <el-form-item label="选项翻译">
            <div v-for="(option, index) in translationForm.options_zh" :key="index" class="translation-option">
              <span class="option-label">{{ String.fromCharCode(65 + index) }}.</span>
              <el-input
                v-model="translationForm.options_zh[index]"
                :placeholder="`选项${String.fromCharCode(65 + index)}中文翻译`"
                class="translation-input"
              />
            </div>
          </el-form-item>

          <el-form-item label="答案解析">
            <el-input
              v-model="translationForm.explanation_zh"
              type="textarea"
              :rows="3"
              placeholder="请输入题目解析（可选）"
            />
          </el-form-item>

          <el-form-item label="正确答案">
            <el-radio-group v-model="translationForm.correct_answer">
              <el-radio
                v-for="(option, index) in question.options_ja"
                :key="index"
                :label="String.fromCharCode(65 + index)"
              >
                {{ String.fromCharCode(65 + index) }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="translation-actions">
      <el-button type="primary" @click="saveTranslation">保存翻译</el-button>
      <el-button @click="autoTranslate" :loading="translating">
        {{ translating ? '翻译中...' : 'AI自动翻译' }}
      </el-button>
      <el-button @click="copyOriginal">复制原文</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </div>

    <!-- AI翻译进度 -->
    <el-dialog v-model="aiProgressVisible" title="AI翻译进度" width="400px" :show-close="false">
      <div class="ai-progress">
        <el-progress :percentage="aiProgress" :status="aiProgress === 100 ? 'success' : ''" />
        <p>{{ aiProgressMessage }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

const translationForm = ref({
  question_text_zh: '',
  options_zh: ['', '', '', ''],
  explanation_zh: '',
  correct_answer: 'A'
})

const translating = ref(false)
const aiProgressVisible = ref(false)
const aiProgress = ref(0)
const aiProgressMessage = ref('')

// 初始化表单
watch(() => props.question, (newQuestion) => {
  if (newQuestion) {
    translationForm.value = {
      question_text_zh: newQuestion.question_text_zh || '',
      options_zh: newQuestion.options_zh?.length ? [...newQuestion.options_zh] : ['', '', '', ''],
      explanation_zh: newQuestion.explanation_zh || '',
      correct_answer: newQuestion.correct_answer || 'A'
    }
    
    // 确保选项数组有4个元素
    while (translationForm.value.options_zh.length < 4) {
      translationForm.value.options_zh.push('')
    }
  }
}, { immediate: true })

// 自动翻译功能
const autoTranslate = async () => {
  translating.value = true
  aiProgressVisible.value = true
  aiProgress.value = 0
  aiProgressMessage.value = '开始翻译题目...'

  try {
    // 模拟AI翻译过程
    await simulateAITranslation()
    
    // 这里实际应该调用翻译API
    // const translated = await callTranslationAPI(props.question.question_text_ja)
    // translationForm.value.question_text_zh = translated
    
    // 模拟翻译结果
    translationForm.value.question_text_zh = `【自动翻译】${props.question.question_text_ja.substring(0, 50)}...`
    
    // 模拟选项翻译
    for (let i = 0; i < props.question.options_ja.length; i++) {
      aiProgress.value = Math.floor((i + 1) / (props.question.options_ja.length + 1) * 100)
      aiProgressMessage.value = `翻译选项 ${String.fromCharCode(65 + i)}...`
      await new Promise(resolve => setTimeout(resolve, 500))
      
      translationForm.value.options_zh[i] = `【自动翻译】${props.question.options_ja[i]}`
    }
    
    aiProgress.value = 100
    aiProgressMessage.value = '翻译完成！'
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    aiProgressVisible.value = false
    ElMessage.success('AI自动翻译完成，请检查并修正翻译结果')
  } catch (error) {
    ElMessage.error('翻译失败: ' + error.message)
  } finally {
    translating.value = false
  }
}

const simulateAITranslation = () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      aiProgress.value += 10
      if (aiProgress.value >= 90) {
        clearInterval(interval)
        resolve()
      }
    }, 200)
  })
}

const saveTranslation = () => {
  // 验证必填字段
  if (!translationForm.value.question_text_zh.trim()) {
    ElMessage.warning('请填写题目中文翻译')
    return
  }

  // 验证选项翻译
  const hasEmptyOptions = translationForm.value.options_zh.some((opt, index) => {
    return !opt.trim() && props.question.options_ja[index]
  })
  
  if (hasEmptyOptions) {
    ElMessage.warning('请填写所有选项的中文翻译')
    return
  }

  const translatedQuestion = {
    ...props.question,
    ...translationForm.value,
    is_translated: true,
    options_zh: translationForm.value.options_zh.filter(opt => opt.trim())
  }

  emit('save', translatedQuestion)
}

const copyOriginal = () => {
  const originalText = `题目：${props.question.question_text_ja}\n\n选项：\n${props.question.options_ja.join('\n')}`
  
  navigator.clipboard.writeText(originalText).then(() => {
    ElMessage.success('原文已复制到剪贴板')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}
</script>

<style scoped>
.translation-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.original-panel,
.translation-panel {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 16px;
  background: #fafafa;
}

.original-panel h3,
.translation-panel h3 {
  margin-top: 0;
  color: #409eff;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 8px;
}

.japanese-text {
  font-family: 'MS PGothic', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}

.original-text {
  background: white;
  padding: 8px 12px;
  border-radius: 4px;
  border-left: 3px solid #409eff;
}

.question-section,
.options-section {
  margin-bottom: 16px;
}

.question-section label,
.options-section label {
  font-weight: bold;
  color: #606266;
  display: block;
  margin-bottom: 8px;
}

.option-item,
.translation-option {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  padding: 8px;
  background: white;
  border-radius: 4px;
}

.option-label {
  font-weight: bold;
  min-width: 30px;
  color: #409eff;
}

.translation-input {
  flex: 1;
}

.translation-actions {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

.ai-progress {
  text-align: center;
}

.ai-progress p {
  margin-top: 8px;
  color: #606266;
}

:deep(.el-textarea__inner) {
  font-family: 'Microsoft YaHei', sans-serif;
}
</style>