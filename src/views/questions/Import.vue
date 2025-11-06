<!-- src/views/questions/Import.vue -->
<template>
  <div class="import-questions">
    <div class="header">
      <h2>批量导入题目</h2>
      <el-button type="primary" @click="$router.push('/questions/list')">
        返回题目列表
      </el-button>
    </div>
    
    <el-card>
      <el-alert
        title="批量导入说明"
        description="支持从 Excel、CSV 文件批量导入题目，或通过文本格式快速导入。"
        type="info"
        show-icon
        :closable="false"
        style="margin-bottom: 20px;"
      />
      
      <el-tabs v-model="activeTab">
        <!-- Excel/CSV 导入 -->
        <el-tab-pane label="文件导入" name="file">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :file-list="fileList"
            accept=".xlsx,.xls,.csv"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持 xlsx、xls、csv 格式文件，文件大小不超过 10MB
              </div>
            </template>
          </el-upload>
          
          <div v-if="selectedFile" class="file-preview">
            <h4>文件预览</h4>
            <p>文件名: {{ selectedFile.name }}</p>
            <p>大小: {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB</p>
            
            <el-button type="primary" @click="importFromFile" :loading="importing">
              开始导入
            </el-button>
          </div>
        </el-tab-pane>
        
        <!-- 文本导入 -->
        <el-tab-pane label="文本导入" name="text">
          <el-form :model="textForm" label-width="100px">
            <el-form-item label="题目格式">
              <el-radio-group v-model="textForm.format">
                <el-radio label="json">JSON 格式</el-radio>
                <el-radio label="markdown">Markdown 格式</el-radio>
                <el-radio label="custom">自定义格式</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="题目内容">
              <el-input
                v-model="textForm.content"
                type="textarea"
                :rows="10"
                placeholder="请输入题目内容..."
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="importFromText" :loading="importing">
                导入题目
              </el-button>
              <el-button @click="clearTextForm">清空</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      
      <!-- 导入结果 -->
      <div v-if="importResult" class="import-result">
        <el-alert
          :title="`导入完成：成功 ${importResult.success} 条，失败 ${importResult.failed} 条`"
          :type="importResult.failed === 0 ? 'success' : 'warning'"
          show-icon
        />
        
        <div v-if="importResult.errors.length > 0" class="error-list">
          <h4>错误详情：</h4>
          <ul>
            <li v-for="(error, index) in importResult.errors" :key="index">
              第 {{ error.line }} 行: {{ error.message }}
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const activeTab = ref('file')
const fileList = ref([])
const selectedFile = ref(null)
const importing = ref(false)
const importResult = ref(null)

const textForm = ref({
  format: 'json',
  content: ''
})

const handleFileChange = (file) => {
  selectedFile.value = file.raw
  fileList.value = [file]
}

const importFromFile = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请先选择文件')
    return
  }

  importing.value = true
  try {
    // 模拟导入过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    importResult.value = {
      success: 15,
      failed: 2,
      errors: [
        { line: 3, message: '题目格式不正确' },
        { line: 8, message: '缺少正确答案' }
      ]
    }
    
    ElMessage.success('文件导入完成')
  } catch (error) {
    ElMessage.error('导入失败：' + error.message)
  } finally {
    importing.value = false
  }
}

const importFromText = async () => {
  if (!textForm.value.content.trim()) {
    ElMessage.warning('请输入题目内容')
    return
  }

  importing.value = true
  try {
    // 模拟导入过程
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    importResult.value = {
      success: 8,
      failed: 1,
      errors: [
        { line: 5, message: 'JSON 格式错误' }
      ]
    }
    
    ElMessage.success('文本导入完成')
  } catch (error) {
    ElMessage.error('导入失败：' + error.message)
  } finally {
    importing.value = false
  }
}

const clearTextForm = () => {
  textForm.value = {
    format: 'json',
    content: ''
  }
  importResult.value = null
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.upload-demo {
  margin-bottom: 20px;
}

.file-preview {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fafafa;
}

.import-result {
  margin-top: 20px;
}

.error-list {
  margin-top: 15px;
  padding: 15px;
  background-color: #fef0f0;
  border: 1px solid #fbc4c4;
  border-radius: 4px;
}

.error-list h4 {
  margin: 0 0 10px 0;
  color: #f56c6c;
}

.error-list ul {
  margin: 0;
  padding-left: 20px;
}

.error-list li {
  color: #f56c6c;
  margin-bottom: 5px;
}
</style>