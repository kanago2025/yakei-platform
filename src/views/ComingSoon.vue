<template>
  <div class="coming-soon-page">
    <div class="container">
      <div class="content">
        <h1>🎯 功能开发中</h1>
        <p class="description">该功能正在紧张开发中，即将为您呈现</p>
        
        <div class="progress-section">
          <div class="progress-info">
            <span class="progress-label">开发进度</span>
            <span class="progress-value">65%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: '65%' }"></div>
          </div>
        </div>
        
        <div class="expected-date">
          <i class="icon">📅</i>
          <strong>预计开放时间:</strong> 2025年12月15日
        </div>
        
        <div class="features-list">
          <h3>即将开放的功能：</h3>
          <ul>
            <li>🎥 视频学习系统</li>
            <li>📊 强化练习巩固</li>
            <li>👥 学习社群交流</li>
            <li>📈 高级学习分析</li>
          </ul>
        </div>
        
        <router-link to="/" class="back-home-btn">
          ← 返回首页继续学习
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面逻辑
</script>

<style scoped>
.coming-soon-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  max-width: 500px;
  width: 100%;
}

.content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5em;
}

.description {
  color: #666;
  font-size: 1.1em;
  margin-bottom: 30px;
}

.progress-section {
  margin: 30px 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.progress-label {
  color: #333;
  font-weight: 500;
}

.progress-value {
  color: #667eea;
  font-weight: bold;
}

.progress-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.expected-date {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  color: #555;
}

.features-list {
  text-align: left;
  margin: 30px 0;
}

.features-list h3 {
  color: #333;
  margin-bottom: 15px;
}

.features-list ul {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 8px 0;
  color: #555;
  font-size: 1em;
}

.back-home-btn {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-home-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}
</style>