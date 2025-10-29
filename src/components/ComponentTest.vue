<template>
  <div class="component-test-container">
    <header>
      <h1>组件测试区域</h1>
      <p class="subtitle">验证基础UI组件是否正常工作</p>
    </header>
    
    <div class="card">
      <h2>测试卡片组件</h2>
      <div class="card-content">
        <p>这是一个BaseCard组件的测试，显示组件是否正常工作</p>
        <div class="slot-area">
          这是插槽内容区域
        </div>
        <div class="button-container">
          <button class="primary-btn" @click="handleButtonClick">主要按钮</button>
          <button class="secondary-btn" @click="handleButtonClick">次要按钮</button>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>按钮组件测试</h2>
      <div class="card-content">
        <p>测试不同类型的按钮样式和交互</p>
        <div class="button-container">
          <button class="primary-btn" @click="handleButtonClick">主要按钮</button>
          <button class="secondary-btn" @click="handleButtonClick">次要按钮</button>
          <button class="secondary-btn" @click="handleButtonClick">次要按钮</button>
          <button class="secondary-btn" @click="handleButtonClick">次要按钮</button>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>进度条组件测试</h2>
      <div class="card-content">
        <p>测试进度条组件的显示效果</p>
        <div class="progress-container">
          <div class="progress-item">
            <div class="progress-title">学习进度</div>
            <div class="progress-value">65%</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidths.learning }"></div>
            </div>
          </div>
          <div class="progress-item">
            <div class="progress-title">掌握度</div>
            <div class="progress-value">42%</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidths.mastery }"></div>
            </div>
          </div>
          <div class="progress-item">
            <div class="progress-title">完成率</div>
            <div class="progress-value">28%</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidths.completion }"></div>
            </div>
          </div>
          <div class="progress-item">
            <div class="progress-title">正确率</div>
            <div class="progress-value">85%</div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressWidths.accuracy }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <footer>
      <p>组件测试页面 © 2023</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ComponentTest',
  data() {
    return {
      progressWidths: {
        learning: '0%',
        mastery: '0%',
        completion: '0%',
        accuracy: '0%'
      }
    }
  },
  mounted() {
    // 进度条动画效果
    setTimeout(() => {
      this.progressWidths = {
        learning: '65%',
        mastery: '42%',
        completion: '28%',
        accuracy: '85%'
      }
    }, 300);
  },
  methods: {
    handleButtonClick(event) {
      // 按钮点击动画效果
      event.target.style.transform = 'scale(0.95)';
      setTimeout(() => {
        event.target.style.transform = '';
      }, 150);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
}

.component-test-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 40px 20px;
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

h2 {
  color: #3498db;
  margin-bottom: 20px;
  font-size: 1.6rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.card-content {
  line-height: 1.6;
  color: #555;
}

.slot-area {
  background: #f8f9fa;
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  color: #6c757d;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.primary-btn {
  background: #3498db;
  color: white;
}

.primary-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.secondary-btn {
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.secondary-btn:hover {
  background: #3498db;
  color: white;
}

.progress-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.progress-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.progress-title {
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.progress-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #3498db;
  margin: 10px 0;
}

.progress-bar {
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 1.5s ease-in-out;
}

footer {
  text-align: center;
  margin-top: 40px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .progress-container {
    grid-template-columns: 1fr;
  }
  
  .button-container {
    justify-content: center;
  }
}
</style>