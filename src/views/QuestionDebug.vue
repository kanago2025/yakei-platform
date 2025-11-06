<!-- 📁 src/views/QuestionDebug.vue -->
<template>
  <div class="question-debug">
    <h2>题目系统调试页面</h2>
    
    <el-tabs v-model="activeTab">
      <el-tab-pane label="日文题目导入" name="import">
        <japanese-question-import />
      </el-tab-pane>
      
      <el-tab-pane label="题目库状态" name="debug">
        <debug-question-list />
      </el-tab-pane>
      
      <el-tab-pane label="手动录入" name="manual">
        <manual-japanese-input />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JapaneseQuestionImport from '@/components/JapaneseQuestionImport.vue'
import DebugQuestionList from '@/components/DebugQuestionList.vue'
import ManualJapaneseInput from '@/components/ManualJapaneseInput.vue'

const activeTab = ref('import')
</script>

<style scoped>
.question-debug {
  padding: 20px;
}
</style>