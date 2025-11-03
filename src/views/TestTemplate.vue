<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="page-actions">
        <button class="btn-primary" @click="handleTest">测试按钮</button>
      </div>
    </div>

    <div class="page-content">
      <div class="content-section">
        <p>这是一个基于模板创建的测试页面</p>
        <p>搜索测试: <input v-model="searchText" placeholder="输入搜索内容" /></p>
        <p>当前搜索: {{ searchText }}</p>
        
        <div class="test-info">
          <h3>路由信息</h3>
          <p>当前路由: {{ $route.name }}</p>
          <p>路由路径: {{ $route.path }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const pageTitle = ref('模板测试页面')
const searchText = ref('')
const route = useRoute()

const handleTest = () => {
  alert('模板功能正常工作！当前路由: ' + route.name)
}
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

.content-section {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.test-info {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
}

.test-info h3 {
  margin-top: 0;
  color: #333;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #0056b3;
}

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 10px;
}
</style>