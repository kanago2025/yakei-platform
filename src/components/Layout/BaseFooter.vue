<template>
  <footer class="base-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <router-link to="/" class="logo">
            <span class="mark">宅</span>
            <span class="name">宅学苑</span>
          </router-link>
          <p class="footer-description">
            专为在日华人设计的日本宅建士考试中文学习平台
          </p>
        </div>
        
        <div class="footer-links">
          <div class="link-group">
            <h4>学习资源</h4>
            <router-link to="/notes">中文笔记</router-link>
            <router-link to="/video">视频学习</router-link>
            <router-link to="/practice">强化练习</router-link>
            <router-link to="/exam">真题模拟</router-link>
          </div>
          
          <div class="link-group">
            <h4>学习支持</h4>
            <router-link to="/community">学习社群</router-link>
            <router-link to="/dashboard">学习仪表盘</router-link>
            <router-link to="/community/qna">问答专区</router-link>
          </div>
          
          <div class="link-group">
            <h4>关于我们</h4>
            <router-link to="/about">平台介绍</router-link>
            <router-link to="/contact">联系我们</router-link>
            <router-link to="/privacy">隐私政策</router-link>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2025 宅学苑 - 日本宅建士考试中文学习平台 | 专注·专业·高效</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter'
}
</script>

<style scoped>
.base-footer {
  background: var(--card-bg);
  border-top: 1px solid var(--border);
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  padding: 40px 0;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--primary-dark);
  text-decoration: none;
  font-size: 18px;
}

.footer-brand .logo .mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 16px;
}

.footer-description {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  max-width: 300px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.link-group h4 {
  color: var(--primary-dark);
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-group a {
  color: var(--muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.link-group a:hover {
  color: var(--primary-dark);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 20px 0;
  text-align: center;
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>