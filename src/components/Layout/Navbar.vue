<template>
  <div class="navbar-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <!-- Logo -->
      <el-menu-item index="/" class="navbar-logo">
        <span style="font-weight: bold; color: #409EFF;">宅学苑</span>
      </el-menu-item>
      
      <div class="flex-grow" />
      
      <!-- 导航菜单 -->
      <el-menu-item index="/">
        <span>首页</span>
      </el-menu-item>
      
      <!-- 题目管理下拉菜单 -->
      <el-sub-menu index="questions">
        <template #title>
          <span>题目管理</span>
        </template>
        <el-menu-item index="/questions">题目管理</el-menu-item>
        <el-menu-item index="/questions/list">题目列表</el-menu-item>
        <el-menu-item index="/questions/add">添加题目</el-menu-item>
        <el-menu-item index="/questions/categories">题目分类</el-menu-item>
        <el-menu-item index="/questions/import">批量导入</el-menu-item>
      </el-sub-menu>
      
      <!-- 考试练习下拉菜单 -->
      <el-sub-menu index="exams">
        <template #title>
          <span>考试练习</span>
        </template>
        <el-menu-item index="/exams/simulate">模拟考试</el-menu-item>
        <el-menu-item index="/exams/history">考试记录</el-menu-item>
        <el-menu-item index="/exams/smart">智能组卷</el-menu-item>
      </el-sub-menu>
      
      <el-menu-item index="/wrong-answers">
        <span>错题本</span>
      </el-menu-item>
      
      <el-menu-item index="/progress">
        <span>学习进度</span>
      </el-menu-item>
      
      <!-- 用户菜单下拉 -->
      <el-sub-menu index="user">
        <template #title>
          <el-icon><User /></el-icon>
          <span>用户</span>
        </template>
        <el-menu-item index="/profile">个人资料</el-menu-item>
        <el-menu-item index="/settings">设置</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 基于当前路由设置激活菜单
const activeIndex = computed(() => {
  const path = route.path
  if (path === '/' || path === '/home') return '/'
  if (path.startsWith('/questions')) return 'questions'
  if (path.startsWith('/exams')) return 'exams'
  return path
})

// 处理菜单选择
const handleSelect = (key) => {
  console.log('导航到:', key)
  if (key && key !== 'user' && key !== 'questions' && key !== 'exams') {
    router.push(key)
  }
}
</script>

<style scoped>
.navbar-container {
  width: 100%;
}

.flex-grow {
  flex-grow: 1;
}

.navbar-logo {
  cursor: pointer;
}

.navbar-logo:hover {
  background-color: rgba(64, 158, 255, 0.1) !important;
}
</style>