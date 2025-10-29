<!-- src/components/AppFooter.vue -->
<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>宅学苑</h4>
          <p>日本宅建士考试中文学习平台</p>
          <p class="footer-tagline">必ず合格する、あなたの味方。</p>
        </div>
        <div class="footer-section">
          <h4>学习资源</h4>
          <div class="footer-links">
            <router-link to="/notes">中文笔记</router-link>
            <router-link to="/video">视频学习</router-link>
            <router-link to="/practice">强化练习</router-link>
            <router-link to="/exam">真题模拟</router-link>
          </div>
        </div>
        <div class="footer-section">
          <h4>用户支持</h4>
          <div class="footer-links">
            <router-link to="/dashboard">学习仪表盘</router-link>
            <a href="#" @click.prevent="showHelp">使用帮助</a>
            <a href="#" @click.prevent="showAbout">关于我们</a>
          </div>
        </div>
        <div class="footer-section">
          <h4>系统状态</h4>
          <div class="system-status">
            <div class="status-item">
              <span class="status-dot online"></span>
              <span>学习系统: 在线</span>
            </div>
            <div class="status-item">
              <span class="status-dot online"></span>
              <span>数据存储: 本地</span>
            </div>
            <div class="status-item">
              <span class="status-dot demo"></span>
              <span>当前模式: 演示版</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 宅学苑 - カナゴ. 所有权利保留。</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 显示帮助信息
const showHelp = () => {
  alert('💡 使用帮助\n\n欢迎使用宅学苑演示系统！\n• 选择不同用户身份体验功能差异\n• 所有学习数据保存在浏览器本地\n• 刷新页面不会丢失进度\n• 这是演示版本，功能会不断完善')
}

// 显示关于信息
const showAbout = () => {
  alert('🏠 关于宅学苑\n\n版本: 演示版 v1.0\n架构: Vue 3 + Cloudflare\n模式: AI辅助开发\n状态: 开发进行中\n\n专为在日华人设计的宅建士考试学习平台')
}
</script>

<style scoped>
.app-footer {
  background: white;
  border-top: 1px solid var(--border);
  padding: 2rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: var(--primary-dark);
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.footer-section p {
  color: var(--muted);
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.footer-tagline {
  font-style: italic;
  color: var(--primary) !important;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-dark);
}

.system-status {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.online {
  background: #10b981;
}

.status-dot.demo {
  background: #f59e0b;
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  color: var(--muted);
  font-size: 0.8rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>