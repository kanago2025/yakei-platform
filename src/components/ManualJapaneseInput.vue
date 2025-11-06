<!-- 📁 src/components/ManualJapaneseInput.vue -->
<template>
  <div class="manual-japanese-input">
    <el-alert title="手动录入日文题目" type="info" show-icon>
      如果Excel导入有问题，可以使用此表单手动录入题目
    </el-alert>

    <el-form :model="form" label-width="100px" class="input-form">
      <el-form-item label="题目标识">
        <el-input v-model="form.questionId" placeholder="例如：問1 或 1." />
      </el-form-item>

      <el-form-item label="日文题目">
        <el-input 
          v-model="form.questionTextJa" 
          type="textarea" 
          :rows="4"
          placeholder="请输入日文题目内容"
          class="japanese-textarea"
        />
      </el-form-item>

      <el-form-item label="日文选项">
        <div v-for="(option, index) in form.optionsJa" :key="index" class="option-row">
          <span class="option-label">{{ String.fromCharCode(65 + index) }}.</span>
          <el-input 
            v-model="form.optionsJa[index]" 
            :placeholder="`选项 ${String.fromCharCode(65 + index)} 日文内容`"
            class="japanese-input"
          />
        </div>
      </el-form-item>

      <el-form-item label="正确答案">
        <el-radio-group v-model="form.correctAnswer">
          <el-radio 
            v-for="(option, index) in form.optionsJa" 
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

      <el-form-item>
        <el-button type="primary" @click="addQuestion">添加题目</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="addSampleQuestion">添加示例题目</el-button>
      </el-form-item>
    </el-form>

    <!-- 已添加的题目列表 -->
    <div v-if="addedQuestions.length > 0" class="added-questions">
      <h3>已添加的题目 ({{ addedQuestions.length }}道)</h3>
      <el-table :data="addedQuestions" stripe height="300">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column label="题目内容" min-width="300">
          <template #default="scope">
            <div class="question-preview">
              {{ scope.row.question_text_ja.substring(0, 80) }}...
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="field" label="分野" width="120" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="editAddedQuestion(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="action-buttons">
        <el-button type="success" @click="importAllAddedQuestions">
          导入所有题目 ({{ addedQuestions.length }}道)
        </el-button>
        <el-button @click="clearAddedQuestions">清空列表</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()

const form = ref({
  questionId: '',
  questionTextJa: '',
  optionsJa: ['', '', '', ''],
  correctAnswer: 'A',
  field: '宅建业法'
})

const addedQuestions = ref([])

const addQuestion = () => {
  // 验证表单
  if (!form.value.questionTextJa.trim()) {
    ElMessage.warning('请输入题目内容')
    return
  }

  const hasOptions = form.value.optionsJa.some(opt => opt.trim())
  if (!hasOptions) {
    ElMessage.warning('请至少填写一个选项')
    return
  }

  const question = {
    id: form.value.questionId || `q_manual_${Date.now()}`,
    question_text_ja: form.value.questionTextJa,
    question_text_zh: '',
    options_ja: form.value.optionsJa.filter(opt => opt.trim()),
    options_zh: [],
    correct_answer: form.value.correctAnswer,
    field: form.value.field,
    year: 1989,
    difficulty: 3,
    language: 'ja',
    is_translated: false
  }

  addedQuestions.value.push(question)
  ElMessage.success('题目已添加到列表')
  resetForm()
}

const resetForm = () => {
  form.value = {
    questionId: '',
    questionTextJa: '',
    optionsJa: ['', '', '', ''],
    correctAnswer: 'A',
    field: '宅建业法'
  }
}

const addSampleQuestion = () => {
  form.value = {
    questionId: '問1',
    questionTextJa: '宅地建物取引業者の免許を受けない者は、宅地建物取引業を営むことができるか？',
    optionsJa: [
      '常に営むことができる',
      '営むことができない', 
      '条件付きで営むことができる',
      '届出のみで営むことができる'
    ],
    correctAnswer: 'B',
    field: '宅建业法'
  }
  ElMessage.info('示例题目已加载，请检查并修改')
}

const editAddedQuestion = (question) => {
  const index = addedQuestions.value.findIndex(q => q.id === question.id)
  if (index !== -1) {
    // 加载到表单中编辑
    form.value = {
      questionId: question.id,
      questionTextJa: question.question_text_ja,
      optionsJa: [...question.options_ja, '', '', ''].slice(0, 4), // 确保有4个元素
      correctAnswer: question.correct_answer,
      field: question.field
    }
    // 从列表中移除
    addedQuestions.value.splice(index, 1)
    ElMessage.info('题目已加载到编辑表单')
  }
}

const importAllAddedQuestions = async () => {
  if (addedQuestions.value.length === 0) {
    ElMessage.warning('没有可导入的题目')
    return
  }

  try {
    const results = questionStore.addQuestions(addedQuestions.value)
    ElMessage.success(`成功导入 ${results.success} 道题目`)
    if (results.failed > 0) {
      ElMessage.warning(`${results.failed} 道题目导入失败`)
    }
    addedQuestions.value = []
  } catch (error) {
    ElMessage.error('导入失败: ' + error.message)
  }
}

const clearAddedQuestions = () => {
  addedQuestions.value = []
  ElMessage.info('已清空题目列表')
}
</script>

<style scoped>
.input-form {
  margin-top: 20px;
  max-width: 800px;
}

.japanese-textarea,
.japanese-input {
  font-family: 'MS PGothic', 'Hiragino Sans GB', sans-serif;
}

.option-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.option-label {
  font-weight: bold;
  min-width: 30px;
  color: #409eff;
}

.added-questions {
  margin-top: 30px;
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
}

.question-preview {
  line-height: 1.5;
}

.action-buttons {
  margin-top: 16px;
  text-align: center;
}
</style>