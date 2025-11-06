<!-- src/views/Settings.vue -->
<template>
  <div class="settings-page">
    <div class="header">
      <h2>系统设置</h2>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="settings-menu">
          <el-menu
            :default-active="activeMenu"
            @select="handleMenuSelect"
          >
            <el-menu-item index="general">
              <el-icon><Setting /></el-icon>
              <span>通用设置</span>
            </el-menu-item>
            <el-menu-item index="study">
              <el-icon><Reading /></el-icon>
              <span>学习设置</span>
            </el-menu-item>
            <el-menu-item index="exam">
              <el-icon><Document /></el-icon>
              <span>考试设置</span>
            </el-menu-item>
            <el-menu-item index="notification">
              <el-icon><Bell /></el-icon>
              <span>通知设置</span>
            </el-menu-item>
            <el-menu-item index="privacy">
              <el-icon><Lock /></el-icon>
              <span>隐私与安全</span>
            </el-menu-item>
            <el-menu-item index="about">
              <el-icon><InfoFilled /></el-icon>
              <span>关于我们</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>

      <el-col :span="18">
        <!-- 通用设置 -->
        <el-card v-if="activeMenu === 'general'" class="settings-content">
          <template #header>
            <h3>通用设置</h3>
          </template>
          
          <el-form :model="generalSettings" label-width="120px">
            <el-form-item label="界面语言">
              <el-select v-model="generalSettings.language" placeholder="请选择语言">
                <el-option label="中文" value="zh-CN" />
                <el-option label="English" value="en" />
                <el-option label="日本語" value="ja" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="主题模式">
              <el-radio-group v-model="generalSettings.theme">
                <el-radio label="light">浅色模式</el-radio>
                <el-radio label="dark">深色模式</el-radio>
                <el-radio label="auto">跟随系统</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="字体大小">
              <el-slider
                v-model="generalSettings.fontSize"
                :min="12"
                :max="18"
                :step="1"
                show-stops
                show-input
              />
            </el-form-item>
            
            <el-form-item label="自动保存">
              <el-switch v-model="generalSettings.autoSave" />
              <span class="setting-description">启用后会自动保存学习进度和考试记录</span>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveGeneralSettings">保存设置</el-button>
              <el-button @click="resetGeneralSettings">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 学习设置 -->
        <el-card v-if="activeMenu === 'study'" class="settings-content">
          <template #header>
            <h3>学习设置</h3>
          </template>
          
          <el-form :model="studySettings" label-width="120px">
            <el-form-item label="每日目标">
              <el-input-number
                v-model="studySettings.dailyGoal"
                :min="10"
                :max="100"
                :step="5"
              />
              <span class="setting-description">每天计划学习的题目数量</span>
            </el-form-item>
            
            <el-form-item label="学习提醒">
              <el-time-picker
                v-model="studySettings.reminderTime"
                placeholder="选择提醒时间"
                format="HH:mm"
                value-format="HH:mm"
              />
              <span class="setting-description">每天的学习提醒时间</span>
            </el-form-item>
            
            <el-form-item label="自动播放">
              <el-switch v-model="studySettings.autoPlay" />
              <span class="setting-description">视频课程自动播放下一节</span>
            </el-form-item>
            
            <el-form-item label="错题重做">
              <el-select v-model="studySettings.wrongAnswerReview" placeholder="请选择频率">
                <el-option label="每天" value="daily" />
                <el-option label="每周" value="weekly" />
                <el-option label="每月" value="monthly" />
                <el-option label="不自动提醒" value="never" />
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveStudySettings">保存设置</el-button>
              <el-button @click="resetStudySettings">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 考试设置 -->
        <el-card v-if="activeMenu === 'exam'" class="settings-content">
          <template #header>
            <h3>考试设置</h3>
          </template>
          
          <el-form :model="examSettings" label-width="120px">
            <el-form-item label="默认题数">
              <el-input-number
                v-model="examSettings.defaultQuestionCount"
                :min="10"
                :max="100"
                :step="5"
              />
              <span class="setting-description">模拟考试的默认题目数量</span>
            </el-form-item>
            
            <el-form-item label="考试时间">
              <el-input-number
                v-model="examSettings.defaultTimeLimit"
                :min="30"
                :max="180"
                :step="10"
              />
              <span class="setting-description">分钟</span>
            </el-form-item>
            
            <el-form-item label="自动提交">
              <el-switch v-model="examSettings.autoSubmit" />
              <span class="setting-description">时间结束后自动提交试卷</span>
            </el-form-item>
            
            <el-form-item label="显示答案">
              <el-switch v-model="examSettings.showAnswers" />
              <span class="setting-description">考试结束后立即显示正确答案</span>
            </el-form-item>
            
            <el-form-item label="难度适应">
              <el-switch v-model="examSettings.adaptiveDifficulty" />
              <span class="setting-description">根据答题情况自动调整题目难度</span>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveExamSettings">保存设置</el-button>
              <el-button @click="resetExamSettings">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 通知设置 -->
        <el-card v-if="activeMenu === 'notification'" class="settings-content">
          <template #header>
            <h3>通知设置</h3>
          </template>
          
          <el-form :model="notificationSettings" label-width="120px">
            <el-form-item label="学习提醒">
              <el-switch v-model="notificationSettings.studyReminder" />
              <span class="setting-description">每日学习目标提醒</span>
            </el-form-item>
            
            <el-form-item label="考试提醒">
              <el-switch v-model="notificationSettings.examReminder" />
              <span class="setting-description">模拟考试和复习提醒</span>
            </el-form-item>
            
            <el-form-item label="成绩通知">
              <el-switch v-model="notificationSettings.scoreNotification" />
              <span class="setting-description">考试结果和进度通知</span>
            </el-form-item>
            
            <el-form-item label="系统公告">
              <el-switch v-model="notificationSettings.systemAnnouncement" />
              <span class="setting-description">系统更新和重要公告</span>
            </el-form-item>
            
            <el-form-item label="邮件通知">
              <el-switch v-model="notificationSettings.emailNotification" />
              <span class="setting-description">通过邮件接收重要通知</span>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="saveNotificationSettings">保存设置</el-button>
              <el-button @click="resetNotificationSettings">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 隐私与安全 -->
        <el-card v-if="activeMenu === 'privacy'" class="settings-content">
          <template #header>
            <h3>隐私与安全</h3>
          </template>
          
          <el-form :model="privacySettings" label-width="120px">
            <el-form-item label="数据同步">
              <el-switch v-model="privacySettings.dataSync" />
              <span class="setting-description">将学习数据同步到云端</span>
            </el-form-item>
            
            <el-form-item label="学习数据">
              <el-radio-group v-model="privacySettings.dataCollection">
                <el-radio label="full">完整收集（用于个性化推荐）</el-radio>
                <el-radio label="basic">基础收集（仅必要数据）</el-radio>
                <el-radio label="none">不收集</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="自动登出">
              <el-select v-model="privacySettings.autoLogout" placeholder="请选择时间">
                <el-option label="15分钟" value="15" />
                <el-option label="30分钟" value="30" />
                <el-option label="1小时" value="60" />
                <el-option label="永不" value="0" />
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button type="warning" @click="clearUserData">清除个人数据</el-button>
              <el-button type="danger" @click="deleteAccount">注销账户</el-button>
            </el-form-item>
            
            <el-divider />
            
            <el-form-item>
              <el-button type="primary" @click="savePrivacySettings">保存隐私设置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 关于我们 -->
        <el-card v-if="activeMenu === 'about'" class="settings-content">
          <template #header>
            <h3>关于我们</h3>
          </template>
          
          <div class="about-content">
            <div class="app-info">
              <h4>宅学苑</h4>
              <p>版本: {{ appInfo.version }}</p>
              <p>构建时间: {{ appInfo.buildTime }}</p>
              <p>描述: {{ appInfo.description }}</p>
            </div>
            
            <el-divider />
            
            <div class="contact-info">
              <h4>联系我们</h4>
              <p>邮箱: {{ contactInfo.email }}</p>
              <p>官网: {{ contactInfo.website }}</p>
              <p>客服电话: {{ contactInfo.phone }}</p>
            </div>
            
            <el-divider />
            
            <div class="update-check">
              <el-button type="primary" @click="checkUpdate">
                检查更新
              </el-button>
              <el-button @click="showLicense">
                用户协议
              </el-button>
              <el-button @click="showPrivacyPolicy">
                隐私政策
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Setting,
  Reading,
  Document,
  Bell,
  Lock,
  InfoFilled
} from '@element-plus/icons-vue'

const activeMenu = ref('general')

// 通用设置
const generalSettings = reactive({
  language: 'zh-CN',
  theme: 'light',
  fontSize: 14,
  autoSave: true
})

// 学习设置
const studySettings = reactive({
  dailyGoal: 30,
  reminderTime: '19:00',
  autoPlay: true,
  wrongAnswerReview: 'weekly'
})

// 考试设置
const examSettings = reactive({
  defaultQuestionCount: 50,
  defaultTimeLimit: 60,
  autoSubmit: true,
  showAnswers: true,
  adaptiveDifficulty: true
})

// 通知设置
const notificationSettings = reactive({
  studyReminder: true,
  examReminder: true,
  scoreNotification: true,
  systemAnnouncement: false,
  emailNotification: false
})

// 隐私设置
const privacySettings = reactive({
  dataSync: true,
  dataCollection: 'full',
  autoLogout: '30'
})

// 应用信息
const appInfo = reactive({
  version: '1.0.0',
  buildTime: '2024-01-15',
  description: '专业的宅建士资格考试学习平台'
})

// 联系信息
const contactInfo = reactive({
  email: 'support@zhaixueyuan.com',
  website: 'https://www.zhaixueyuan.com',
  phone: '400-123-4567'
})

// 菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index
}

// 保存设置的方法
const saveGeneralSettings = () => {
  ElMessage.success('通用设置已保存')
  // 这里可以添加实际保存到后端的逻辑
}

const saveStudySettings = () => {
  ElMessage.success('学习设置已保存')
}

const saveExamSettings = () => {
  ElMessage.success('考试设置已保存')
}

const saveNotificationSettings = () => {
  ElMessage.success('通知设置已保存')
}

const savePrivacySettings = () => {
  ElMessage.success('隐私设置已保存')
}

// 重置设置的方法
const resetGeneralSettings = () => {
  Object.assign(generalSettings, {
    language: 'zh-CN',
    theme: 'light',
    fontSize: 14,
    autoSave: true
  })
  ElMessage.info('通用设置已重置')
}

const resetStudySettings = () => {
  Object.assign(studySettings, {
    dailyGoal: 30,
    reminderTime: '19:00',
    autoPlay: true,
    wrongAnswerReview: 'weekly'
  })
  ElMessage.info('学习设置已重置')
}

const resetExamSettings = () => {
  Object.assign(examSettings, {
    defaultQuestionCount: 50,
    defaultTimeLimit: 60,
    autoSubmit: true,
    showAnswers: true,
    adaptiveDifficulty: true
  })
  ElMessage.info('考试设置已重置')
}

const resetNotificationSettings = () => {
  Object.assign(notificationSettings, {
    studyReminder: true,
    examReminder: true,
    scoreNotification: true,
    systemAnnouncement: false,
    emailNotification: false
  })
  ElMessage.info('通知设置已重置')
}

// 清除用户数据
const clearUserData = async () => {
  try {
    await ElMessageBox.confirm(
      '此操作将清除所有本地学习数据，包括学习进度、考试记录和错题本。是否继续？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    ElMessage.success('用户数据已清除')
    // 这里可以添加实际清除数据的逻辑
  } catch {
    ElMessage.info('已取消操作')
  }
}

// 注销账户
const deleteAccount = async () => {
  try {
    await ElMessageBox.confirm(
      '此操作将永久删除您的账户，所有数据将无法恢复。是否继续？',
      '危险操作',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'error',
      }
    )
    ElMessage.success('账户注销请求已提交')
    // 这里可以添加实际注销账户的逻辑
  } catch {
    ElMessage.info('已取消操作')
  }
}

// 检查更新
const checkUpdate = () => {
  ElMessage.info('已是最新版本')
}

// 显示用户协议
const showLicense = () => {
  ElMessageBox.alert('这里是用户协议内容...', '用户协议', {
    confirmButtonText: '确定',
    callback: () => {}
  })
}

// 显示隐私政策
const showPrivacyPolicy = () => {
  ElMessageBox.alert('这里是隐私政策内容...', '隐私政策', {
    confirmButtonText: '确定',
    callback: () => {}
  })
}

// 初始化时加载保存的设置
onMounted(() => {
  // 这里可以从localStorage或后端加载用户保存的设置
  console.log('设置页面已加载')
})
</script>

<style scoped>
.settings-page {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.settings-menu {
  margin-bottom: 20px;
}

.settings-content {
  min-height: 500px;
}

.setting-description {
  margin-left: 10px;
  color: #909399;
  font-size: 12px;
}

.about-content {
  padding: 10px;
}

.about-content h4 {
  margin-bottom: 10px;
  color: #303133;
}

.about-content p {
  margin: 5px 0;
  color: #606266;
}

.update-check {
  text-align: center;
  margin-top: 20px;
}
</style>