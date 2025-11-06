<!-- src/views/questions/Add.vue -->
<template>
  <div class="add-question">
    <h2>添加题目</h2>
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-form-item label="题目类型">
          <el-radio-group v-model="form.type">
            <el-radio label="single">单选题</el-radio>
            <el-radio label="multiple">多选题</el-radio>
            <el-radio label="judgment">判断题</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="题目内容">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="3"
            placeholder="请输入题目内容"
          />
        </el-form-item>
        
        <el-form-item label="选项">
          <div v-for="(option, index) in form.options" :key="index" class="option-item">
            <el-input
              v-model="option.text"
              :placeholder="`选项 ${String.fromCharCode(65 + index)}`"
              style="width: 80%"
            />
            <el-checkbox v-model="option.correct" style="margin-left: 10px">
              正确答案
            </el-checkbox>
          </div>
        </el-form-item>
        
        <el-form-item label="难度">
          <el-select v-model="form.difficulty">
            <el-option label="简单" value="easy" />
            <el-option label="中等" value="medium" />
            <el-option label="困难" value="hard" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="领域">
          <el-input v-model="form.field" placeholder="请输入所属领域" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  type: 'single',
  content: '',
  options: [
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false },
    { text: '', correct: false }
  ],
  difficulty: 'medium',
  field: ''
})

const submitForm = () => {
  console.log('提交表单:', form.value)
  // 这里调用API保存题目
}

const resetForm = () => {
  form.value = {
    type: 'single',
    content: '',
    options: [
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false },
      { text: '', correct: false }
    ],
    difficulty: 'medium',
    field: ''
  }
}
</script>

<style scoped>
.option-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>