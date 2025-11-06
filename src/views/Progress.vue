<!-- src/views/Progress.vue -->
<template>
  <div class="progress-page">
    <div class="header">
      <h2>学习进度</h2>
      <el-button type="primary" @click="refreshProgress">
        <el-icon><Refresh /></el-icon>
        刷新
      </el-button>
    </div>

    <el-row :gutter="20" class="stats-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ progressStats.totalStudied }}</div>
            <div class="stat-label">已学习题目</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ progressStats.mastered }}</div>
            <div class="stat-label">已掌握题目</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ progressStats.correctRate }}%</div>
            <div class="stat-label">正确率</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-value">{{ progressStats.studyDays }}</div>
            <div class="stat-label">学习天数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="progress-content">
      <el-col :span="16">
        <el-card header="学习趋势">
          <div class="chart-container">
            <div v-if="studyData.length === 0" class="empty-chart">
              <el-empty description="暂无学习数据" />
            </div>
            <div v-else class="chart-placeholder">
              <!-- 这里可以接入图表库，如 ECharts -->
              <p>学习趋势图表区域</p>
              <p>（可显示每日学习题目数量变化）</p>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card header="知识点掌握情况">
          <div class="knowledge-stats">
            <div v-for="item in knowledgeStats" :key="item.field" class="knowledge-item">
              <div class="field-name">{{ item.field }}</div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: item.mastery + '%' }"></div>
              </div>
              <div class="mastery-rate">{{ item.mastery }}%</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="progress-content">
      <el-col :span="12">
        <el-card header="最近学习活动">
          <el-timeline>
            <el-timeline-item
              v-for="activity in recentActivities"
              :key="activity.id"
              :timestamp="activity.time"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="学习建议">
          <div class="suggestions">
            <el-alert
              v-for="suggestion in studySuggestions"
              :key="suggestion.id"
              :title="suggestion.title"
              :description="suggestion.description"
              :type="suggestion.type"
              :closable="false"
              style="margin-bottom: 15px;"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card header="详细学习记录" class="detailed-records">
      <el-table :data="studyRecords" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="subject" label="科目" width="120" />
        <el-table-column prop="topic" label="知识点" />
        <el-table-column prop="questions" label="题目数量" width="100" />
        <el-table-column prop="correct" label="正确数量" width="100" />
        <el-table-column prop="rate" label="正确率" width="100">
          <template #default="scope">
            <el-tag :type="getRateType(scope.row.rate)">
              {{ scope.row.rate }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="学习时长" width="100" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="reviewTopic(scope.row)">
              复习
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'

// 进度统计数据
const progressStats = ref({
  totalStudied: 0,
  mastered: 0,
  correctRate: 0,
  studyDays: 0
})

// 知识点统计
const knowledgeStats = ref([
  { field: '宅建业法', mastery: 75 },
  { field: '权利关系', mastery: 60 },
  { field: '法令限制', mastery: 45 },
  { field: '税及其他', mastery: 30 },
  { field: '5问免除', mastery: 20 }
])

// 学习数据（用于图表）
const studyData = ref([])

// 最近活动
const recentActivities = ref([
  {
    id: 1,
    time: '2024-01-15 14:30',
    content: '完成了宅建业法模拟考试',
    type: 'primary'
  },
  {
    id: 2,
    time: '2024-01-15 10:15',
    content: '学习了权利关系章节',
    type: 'success'
  },
  {
    id: 3,
    time: '2024-01-14 16:45',
    content: '复习了错题本中的10道题目',
    type: 'warning'
  },
  {
    id: 4,
    time: '2024-01-14 09:20',
    content: '完成了每日练习',
    type: 'info'
  }
])

// 学习建议
const studySuggestions = ref([
  {
    id: 1,
    title: '加强薄弱环节',
    description: '您在"税及其他"领域的掌握程度较低，建议优先复习这部分内容。',
    type: 'warning'
  },
  {
    id: 2,
    title: '每日坚持',
    description: '您已连续学习5天，请继续保持这个好习惯！',
    type: 'success'
  },
  {
    id: 3,
    title: '模拟考试',
    description: '建议每周至少进行一次完整的模拟考试，检验学习成果。',
    type: 'info'
  }
])

// 详细学习记录
const studyRecords = ref([
  {
    id: 1,
    date: '2024-01-15',
    subject: '宅建业法',
    topic: '重要事项说明',
    questions: 20,
    correct: 16,
    rate: 80,
    time: '45分钟'
  },
  {
    id: 2,
    date: '2024-01-15',
    subject: '权利关系',
    topic: '代理与抵当权',
    questions: 15,
    correct: 9,
    rate: 60,
    time: '30分钟'
  },
  {
    id: 3,
    date: '2024-01-14',
    subject: '法令限制',
    topic: '建筑基准法',
    questions: 25,
    correct: 15,
    rate: 60,
    time: '55分钟'
  },
  {
    id: 4,
    date: '2024-01-13',
    subject: '宅建业法',
    topic: '免许制度',
    questions: 18,
    correct: 15,
    rate: 83,
    time: '40分钟'
  }
])

// 根据正确率获取标签类型
const getRateType = (rate) => {
  if (rate >= 80) return 'success'
  if (rate >= 60) return 'warning'
  return 'danger'
}

// 复习知识点
const reviewTopic = (record) => {
  ElMessage.info(`开始复习: ${record.topic}`)
  // 这里可以跳转到对应的复习页面
}

// 刷新进度
const refreshProgress = async () => {
  ElMessage.info('刷新学习进度...')
  // 模拟加载数据
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 更新统计数据
  progressStats.value = {
    totalStudied: 158,
    mastered: 95,
    correctRate: 72,
    studyDays: 5
  }
  
  ElMessage.success('进度已更新')
}

// 初始化加载数据
onMounted(() => {
  refreshProgress()
})
</script>

<style scoped>
.progress-page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stats-cards {
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  padding: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5px;
}

.stat-label {
  color: #909399;
  font-size: 14px;
}

.progress-content {
  margin-bottom: 20px;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-chart {
  width: 100%;
}

.chart-placeholder {
  text-align: center;
  color: #909399;
  padding: 50px 0;
}

.knowledge-stats {
  padding: 10px 0;
}

.knowledge-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 5px 0;
}

.field-name {
  width: 100px;
  font-size: 14px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #ebeef5;
  border-radius: 4px;
  margin: 0 15px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #409EFF;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.mastery-rate {
  width: 50px;
  text-align: right;
  font-size: 14px;
  font-weight: bold;
}

.suggestions {
  padding: 10px 0;
}

.detailed-records {
  margin-top: 20px;
}
</style>