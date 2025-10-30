<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="page-actions">
        <slot name="actions">
          <!-- 操作按钮插槽 -->
        </slot>
      </div>
    </div>

    <div class="page-content">
      <!-- 搜索筛选区域 -->
      <div class="filter-section" v-if="$slots.filters">
        <slot name="filters"></slot>
      </div>

      <!-- 主要内容区域 -->
      <div class="content-section">
        <slot></slot>
      </div>
    </div>

    <!-- 模态框插槽 -->
    <slot name="modals"></slot>
  </div>
</template>

<script setup>
// ========== 基础页面模板 ==========
// 使用方法：
// 1. 复制此文件到目标位置
// 2. 修改组件名和页面标题
// 3. 在各插槽中填入具体内容

import { ref } from 'vue'

// 🔧 配置区域 - 按需修改
const pageTitle = ref('页面标题')

// 📊 如果需要数据相关功能，取消注释以下代码
/*
const loading = ref(false)
const items = ref([])

const loadData = async () => {
  loading.value = true
  try {
    // API调用逻辑
  } finally {
    loading.value = false
  }
}
*/

// 🎯 如果需要路由相关功能，取消注释以下代码
/*
import { useRouter } from 'vue-router'
const router = useRouter()
*/
</script>

<style scoped>
.page-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 12px;
}

.filter-section {
  margin-bottom: 20px;
}

.content-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>