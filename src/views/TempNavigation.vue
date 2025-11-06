<!-- views/TempNavigation.vue -->
<template>
  <div class="temp-nav">
    <AppNavBar />
    <main class="temp-container">
      <h1>临时导航页面</h1>
      <div class="nav-cards">
        <router-link to="/batch-pdf-processor" class="nav-card">
          <div class="card-icon">📚</div>
          <h3>批量PDF处理</h3>
          <p>上传和处理历年真题PDF</p>
        </router-link>
        
        <router-link to="/question-upload" class="nav-card">
          <div class="card-icon">📝</div>
          <h3>题目上传</h3>
          <p>单个题目录入和管理</p>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppNavBar from '@/components/AppNavBar.vue'
</script>

<style scoped>
.temp-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.nav-card {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
}

.nav-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.nav-card h3 {
  margin-bottom: 1rem;
  color: var(--text);
}

.nav-card p {
  color: var(--muted);
}
</style>