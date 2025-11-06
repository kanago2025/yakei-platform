<!-- 📁 src/components/QuestionEditor.vue -->
<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="题目内容">
      <el-input 
        v-model="form.question_text" 
        type="textarea" 
        :rows="3"
        placeholder="请输入题目内容"
      />
    </el-form-item>
    
    <el-form-item label="选项">
      <div v-for="(option, index) in form.options" :key="index" class="option-item">
        <el-input 
          v-model="form.options[index]" 
          :placeholder="`选项 ${String.fromCharCode(65 + index)}`"
        />
      </div>
    </el-form-item>
    
    <el-form-item label="正确答案">
      <el-radio-group v-model="form.correct_answer">
        <el-radio 
          v-for="(option, index) in form.options" 
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
    
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  id: '',
  question_text: '',
  options: ['', '', '', ''],
  correct_answer: 'A',
  field: '宅建业法',
  difficulty: 3,
  explanation: ''
})

// 初始化表单数据
watch(() => props.question, (newQuestion) => {
  if (newQuestion) {
    form.value = { ...newQuestion }
    // 确保options有4个元素
    while (form.value.options.length < 4) {
      form.value.options.push('')
    }
  }
}, { immediate: true })

const save = () => {
  // 过滤空选项
  form.value.options = form.value.options.filter(opt => opt.trim())
  emit('save', form.value)
}
</script>