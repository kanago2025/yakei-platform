<!-- 📁 src/components/QuestionStatistics.vue -->
<template>
  <div class="question-statistics">
    <el-row :gutter="16">
      <el-col :span="6">
        <el-statistic title="总题目数" :value="stats.total" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="已翻译" :value="stats.translated" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="翻译进度" :value="stats.translationProgress" suffix="%" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="日文题目" :value="stats.total - stats.translated" />
      </el-col>
    </el-row>

    <el-divider />

    <el-row :gutter="16">
      <el-col :span="12">
        <div class="chart-container">
          <h3>按分野分布</h3>
          <div v-if="Object.keys(stats.byField).length > 0" class="field-chart">
            <div 
              v-for="(count, field) in stats.byField" 
              :key="field"
              class="field-item"
            >
              <span class="field-name">{{ field }}</span>
              <el-progress 
                :percentage="Math.round((count / stats.total) * 100)" 
                :show-text="false"
              />
              <span class="field-count">{{ count }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无数据" />
        </div>
      </el-col>

      <el-col :span="12">
        <div class="chart-container">
          <h3>按年份分布</h3>
          <div v-if="Object.keys(stats.byYear).length > 0" class="year-chart">
            <div 
              v-for="(count, year) in stats.byYear" 
              :key="year"
              class="year-item"
            >
              <span class="year-label">{{ year }}年</span>
              <el-progress 
                :percentage="Math.round((count / stats.total) * 100)" 
                :show-text="false"
              />
              <span class="year-count">{{ count }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无数据" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuestionStore } from '@/stores/question'

const questionStore = useQuestionStore()
const stats = computed(() => questionStore.statistics)
</script>

<style scoped>
.question-statistics {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.chart-container {
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.chart-container h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #409eff;
}

.field-item,
.year-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.field-name,
.year-label {
  min-width: 100px;
  font-weight: 500;
}

.field-count,
.year-count {
  min-width: 40px;
  text-align: right;
  color: #909399;
}

:deep(.el-progress-bar) {
  flex: 1;
}
</style>