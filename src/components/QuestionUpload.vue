// 📁 src/components/QuestionUpload.vue
<template>
  <div class="upload-container">
    <el-upload
      class="upload-demo"
      drag
      action="/api/questions/upload"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      accept=".pdf,.xlsx,.csv"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件到此处或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">
          支持 PDF、Excel、CSV 格式，单个文件不超过10MB
        </div>
      </template>
    </el-upload>

    <!-- 上传结果展示 -->
    <div v-if="uploadResult" class="result-panel">
      <h3>上传结果</h3>
      <el-table :data="uploadResult.questions" stripe>
        <el-table-column prop="id" label="题目ID" width="100" />
        <el-table-column prop="question_text" label="题目内容" />
        <el-table-column prop="field" label="分野" width="120" />
        <el-table-column prop="difficulty" label="难度" width="80" />
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'success' ? 'success' : 'danger'">
              {{ scope.row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const uploadResult = ref(null)

const beforeUpload = (file) => {
  const isAcceptType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(file.type)
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isAcceptType) {
    ElMessage.error('只能上传 PDF、Excel 或 CSV 文件!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB!')
    return false
  }
  return true
}

const handleSuccess = (response) => {
  uploadResult.value = response.data
  ElMessage.success(`成功导入 ${response.data.questions.length} 道题目`)
}

const handleError = () => {
  ElMessage.error('上传失败，请重试')
}
</script>