// 📁 src/views/SimulationExam.vue
<template>
  <div class="simulation-container">
    <!-- 考试头部信息 -->
    <div class="exam-header">
      <div class="exam-info">
        <h2>{{ examTitle }}</h2>
        <p>题目数量: {{ questions.length }} | 考试时长: {{ examDuration }}</p>
      </div>
      <div class="exam-timer">
        <el-statistic title="剩余时间" :value="remainingTime" />
      </div>
    </div>

    <!-- 题目区域 -->
    <div class="question-area">
      <div v-for="(question, index) in questions" :key="question.id" class="question-item">
        <h3>第 {{ index + 1 }} 题</h3>
        <p class="question-text">{{ question.question_text }}</p>
        
        <div class="options">
          <el-radio-group v-model="userAnswers[index]">
            <el-radio 
              v-for="option in question.options" 
              :key="option" 
              :label="option"
              class="option-item"
            >
              {{ option }}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="submitExam">提交试卷</el-button>
      <el-button @click="pauseExam">暂停考试</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const questions = ref([])
const userAnswers = ref([])
const remainingTime = ref(7200) // 2小时，单位：秒
const timer = ref(null)

const examTitle = ref('')
const examDuration = ref('')

// 加载考试数据
const loadExamData = async () => {
  const examType = route.params.type
  const examId = route.params.id
  
  // 模拟考试数据
  questions.value = [
    {
      id: 'q_001',
      question_text: '宅地建物取引業者の免許を受けない者は、宅地建物取引業を営むことができるか？',
      options: [
        'A. 常に営むことができる',
        'B. 営むことができない',
        'C. 条件付きで営むことができる',
        'D. 届出のみで営むことができる'
      ],
      correct_answer: 'B'
    },
    // 更多题目...
  ]
  
  userAnswers.value = new Array(questions.value.length).fill('')
  examTitle.value = '宅建士模拟考试'
  examDuration.value = '2小时'
}

// 计时器
const startTimer = () => {
  timer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      submitExam()
    }
  }, 1000)
}

// 提交考试
const submitExam = async () => {
  clearInterval(timer.value)
  
  // 计算得分
  let score = 0
  questions.value.forEach((question, index) => {
    if (userAnswers.value[index] && userAnswers.value[index].startsWith(question.correct_answer)) {
      score++
    }
  })
  
  ElMessage.success(`考试完成！得分: ${score}/${questions.value.length}`)
  
  // 记录错题
  await recordWrongAnswers(score)
}

// 记录错题
const recordWrongAnswers = async (score) => {
  const wrongAnswers = []
  questions.value.forEach((question, index) => {
    if (userAnswers.value[index] && !userAnswers.value[index].startsWith(question.correct_answer)) {
      wrongAnswers.push({
        question_id: question.id,
        user_answer: userAnswers.value[index],
        correct_answer: question.correct_answer
      })
    }
  })
  
  // 保存到本地存储
  localStorage.setItem('wrong_answers', JSON.stringify(wrongAnswers))
  localStorage.setItem('last_exam_score', score)
}

onMounted(() => {
  loadExamData()
  startTimer()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>