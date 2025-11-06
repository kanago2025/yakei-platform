<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在。</p>
      <el-button type="primary" @click="$router.push('/')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup>
// 404页面逻辑
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
}

.content h1 {
  font-size: 80px;
  color: #409EFF;
  margin: 0;
}

.content h2 {
  font-size: 24px;
  margin: 10px 0;
}

.content p {
  color: #909399;
  margin-bottom: 20px;
}
</style>