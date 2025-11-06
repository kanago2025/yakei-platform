<!-- src/views/Profile.vue -->
<template>
  <div class="profile-page">
    <div class="header">
      <h2>个人资料</h2>
    </div>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="profile-card">
          <div class="avatar-section">
            <el-avatar :size="100" :src="userInfo.avatar" />
            <h3>{{ userInfo.name }}</h3>
            <p>{{ userInfo.email }}</p>
            <el-tag :type="userInfo.subscription === 'premium' ? 'success' : 'info'">
              {{ userInfo.subscription === 'premium' ? 'VIP会员' : '免费用户' }}
            </el-tag>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <template #header>
            <h3>基本信息</h3>
          </template>
          
          <el-form :model="userInfo" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="userInfo.name" />
            </el-form-item>
            
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email" />
            </el-form-item>
            
            <el-form-item label="手机号">
              <el-input v-model="userInfo.phone" />
            </el-form-item>
            
            <el-form-item label="会员状态">
              <el-text :type="userInfo.subscription === 'premium' ? 'success' : 'info'">
                {{ userInfo.subscription === 'premium' ? 'VIP会员' : '免费用户' }}
              </el-text>
              <el-button v-if="userInfo.subscription !== 'premium'" type="primary" link>
                升级VIP
              </el-button>
            </el-form-item>
            
            <el-form-item label="注册时间">
              <el-text>{{ userInfo.createdAt }}</el-text>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary">保存修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-card header="学习统计" style="margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-value">{{ stats.totalStudyTime }}</div>
            <div class="stat-label">总学习时长</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-value">{{ stats.completedExams }}</div>
            <div class="stat-label">完成考试</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-value">{{ stats.correctRate }}%</div>
            <div class="stat-label">平均正确率</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-value">{{ stats.studyDays }}</div>
            <div class="stat-label">学习天数</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const userInfo = ref({
  name: '测试用户',
  email: 'test@example.com',
  phone: '13800138000',
  subscription: 'free',
  avatar: '',
  createdAt: '2024-01-01'
})

const stats = ref({
  totalStudyTime: '45小时',
  completedExams: 12,
  correctRate: 75,
  studyDays: 15
})

onMounted(() => {
  // 加载用户信息
  if (userStore.user) {
    userInfo.value = { ...userInfo.value, ...userStore.user }
  }
})
</script>

<style scoped>
.profile-page {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.profile-card {
  text-align: center;
  padding: 20px;
}

.avatar-section h3 {
  margin: 15px 0 5px 0;
}

.avatar-section p {
  color: #909399;
  margin-bottom: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
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
</style>