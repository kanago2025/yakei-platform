<!-- views/QuestionBank.vue -->
<template>
  <div class="question-bank">
    <AppNavBar />
    <main class="bank-container">
      <div class="page-header">
        <h1>题目库管理</h1>
        <p>管理和维护题目库数据</p>
      </div>
      
      <div class="coming-soon">
        <div class="coming-soon-icon">🚧</div>
        <h3>功能开发中</h3>
        <p>题目库管理功能正在开发中，敬请期待！</p>
        <router-link to="/batch-pdf-processor" class="btn-primary">
          前往批量PDF处理
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppNavBar from '@/components/AppNavBar.vue'
</script>

<style scoped>
.bank-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.coming-soon {
  text-align: center;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 4rem 2rem;
  margin: 2rem 0;
}

.coming-soon-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.coming-soon h3 {
  color: var(--text);
  margin-bottom: 1rem;
}

.coming-soon p {
  color: var(--muted);
  margin-bottom: 2rem;
}
</style>