<!-- 📁 src/components/JapaneseQuestionEditor.vue -->
<template>
  <div class="japanese-editor">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="日文原题" name="japanese">
        <el-form :model="form" label-width="100px">
          <el-form-item label="日文题目">
            <el-input 
              v-model="form.question_text_ja" 
              type="textarea" 
              :rows="4"
              placeholder="日文题目内容"
              class="japanese-textarea"
            />
          </el-form-item>
          
          <el-form-item label="日文选项">
            <div v-for="(option, index) in form.options_ja" :key="index" class="option-row">
              <el-input 
                v-model="form.options_ja[index]" 
                :placeholder="`选项 ${String.fromCharCode(65 + index)}`"
                class="japanese-option-input"
              />
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      
      <el-tab-pane label="中文翻译" name="chinese" :disabled="!form.is_translated">
        <el-form :model="form" label-width="100px">
          <el-form-item label="中文题目">
            <el-input 
              v-model="form.question_text_zh" 
              type="textarea" 
              :rows="4"
              placeholder="中文翻译"
            />
          </el-form-item>
          
          <el-form-item label="中文选项">
            <div v-for="(option, index) in form.options_zh" :key="index" class="option-row">
              <el-input 
                v-model="form.options_zh[index]" 
                :placeholder="`选项 ${String.fromCharCode(65 + index)} 中文翻译`"
              />
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      
      <el-tab-pane label="题目信息" name="info">
        <el-form :model="form" label-width="100px">
          <el-form-item label="正确答案">
            <el-radio-group v-model="form.correct_answer">
              <el-radio 
                v-for="(option, index) in form.options_ja" 
                :key="index"
                :label="String.fromCharCode(65 + index)"
                :disabled="!option"
              >
                {{ String.fromCharCode(65 + index) }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="分野">
            <el-select v-model="form.field">
              <el-option label="宅建业法" value="宅建业法" />
              <el-option label="权利关系" value="权利关系" />
              <el-option label="法令上的制限" value="法令上的制限" />
              <el-option label="税・その他" value="税・その他" />
              <el-option label="五问免除" value="五问免除" />
            </el-select>
          </el-form-item>
          
          <el-form-item label="难度">
            <el-rate v-model="form.difficulty" :max="5" />
          </el-form-item>
          
          <el-form-item label="年份">
            <el-input-number v-model="form.year" :min="1989" :max="2025" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="editor-actions">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button 
        v-if="!form.is_translated" 
        type="success" 
        @click="$emit('translate', form)"
      >
        翻译此题
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
  }
})

const emit = defineEmits(['save', 'cancel', 'translate'])

const activeTab = ref('japanese')

const form = ref({
  id: '',
  question_text_ja: '',
  question_text_zh: '',
  options_ja: ['', '', '', ''],
  options_zh: ['', '', '', ''],
  correct_answer: 'A',
  field: '宅建业法',
  difficulty: 3,
  year: 1989,
  language: 'ja',
  is_translated: false
})

// 初始化表单数据
watch(() => props.question, (newQuestion) => {
  if (newQuestion) {
    form.value = { ...newQuestion }
    // 确保选项数组有4个元素
    while (form.value.options_ja.length < 4) {
      form.value.options_ja.push('')
    }
    while (form.value.options_zh.length < 4) {
      form.value.options_zh.push('')
    }
  }
}, { immediate: true })

const save = () => {
  // 过滤空选项
  form.value.options_ja = form.value.options_ja.filter(opt => opt.trim())
  form.value.options_zh = form.value.options_zh.filter(opt => opt.trim())
  emit('save', form.value)
}
</script>

<style scoped>
.japanese-textarea {
  font-family: 'MS PGothic', 'Hiragino Sans GB', sans-serif;
}

.japanese-option-input {
  font-family: 'MS PGothic', 'Hiragino Sans GB', sans-serif;
}

.option-row {
  margin-bottom: 8px;
}

.editor-actions {
  margin-top: 20px;
  text-align: center;
}
</style>