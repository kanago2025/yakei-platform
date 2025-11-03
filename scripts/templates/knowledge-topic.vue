<!-- scripts/templates/knowledge-topic.vue -->
<template>
  <div class="knowledge-topic">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="breadcrumb">
          <router-link to="/notes">中文笔记</router-link> &gt; 
          <router-link to="/notes?domain={{DOMAIN_FOLDER}}">{{DOMAIN_NAME}}</router-link> &gt; 
          <span>{{TOPIC_TITLE}}</span>
        </div>
        <h1>{{TOPIC_TITLE}}</h1>
        <p>宅建士考试核心知识点，掌握{{TOPIC_TITLE}}的内容和要点</p>
        
        <!-- 学习统计 -->
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">15</span>
            <span class="stat-label">核心要点</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">30分钟</span>
            <span class="stat-label">建议学习时间</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">练习题</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ userProgress }}%</span>
            <span class="stat-label">掌握进度</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 主要内容区域 -->
      <main class="main-content">
        <!-- 快速导航 -->
        <div class="quick-nav">
          <h3>本页导航</h3>
          <div class="nav-links">
            <a 
              v-for="section in sections" 
              :key="section.id"
              :href="`#${section.id}`"
              class="nav-link"
              @click.prevent="scrollToSection(section.id)"
            >
              <span class="nav-icon">{{ section.icon }}</span>
              {{ section.title }}
            </a>
          </div>
        </div>

        <!-- 学习目标 -->
        <section class="learning-goals">
          <h2>📚 学习目标</h2>
          <ul>
            <li>理解{{TOPIC_TITLE}}的基本概念</li>
            <li>掌握相关法律条文和实务操作</li>
            <li>能够应对相关考试题目</li>
            <li>了解最新法律修正要点</li>
          </ul>
        </section>

        <!-- 关键术语 -->
        <section id="key-terms" class="key-terms">
          <h2>🧑‍⚖️ 关键术语</h2>
          <div class="terms-grid">
            <div class="term-card">
              <div class="term-japanese">関連用語（かんれんようご）</div>
              <div class="term-chinese">相关术语</div>
              <div class="term-explanation">与此知识点相关的专业术语解释</div>
              <div class="term-example">例子：具体应用场景示例</div>
            </div>
          </div>
        </section>

        <!-- 主要内容区域 -->
        <section id="basic-concepts" class="content-section">
          <h2>1. 基本概念</h2>
          <p>这里是关于{{TOPIC_TITLE}}的基本概念介绍。</p>
          
          <div class="highlight-box">
            <strong>核心要点：</strong>
            <ul>
              <li>要点一：重要概念说明</li>
              <li>要点二：法律依据</li>
              <li>要点三：实务应用</li>
            </ul>
          </div>
        </section>

        <!-- 法律依据 -->
        <section id="legal-basis" class="content-section">
          <h2>2. 法律依据</h2>
          <p>相关的法律条文和规定。</p>
        </section>

        <!-- 实务要点 -->
        <section id="practice-points" class="content-section">
          <h2>3. 实务要点</h2>
          <p>在实际工作中的注意事项。</p>
        </section>

        <!-- 练习题 -->
        <section id="quiz" class="quiz-section">
          <h2>❓ 判断题</h2>
          
          <div class="quiz-item">
            <div class="quiz-question">{{TOPIC_TITLE}}に関する問題文がここに入ります。</div>
            <div class="quiz-options">
              <div class="quiz-option">〇 (正しい)</div>
              <div class="quiz-option">✕ (誤り)</div>
            </div>
            <button class="answer-btn">显示答案</button>
          </div>
        </section>

        <!-- 底部行动按钮 -->
        <div class="action-buttons">
          <router-link to="/video?topic={{TOPIC_ID}}" class="action-button video">
            <span>📺</span>
            观看相关视频
          </router-link>
          <router-link to="/practice?topic={{TOPIC_ID}}" class="action-button">
            <span>📝</span>
            开始强化练习
          </router-link>
          <router-link to="/notes?domain={{DOMAIN_FOLDER}}" class="action-button">
            <span>📚</span>
            返回{{DOMAIN_NAME}}
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLearningStore } from '@/stores/learning'

const learningStore = useLearningStore()
const userProgress = ref(0)

// 页面章节导航
const sections = [
  { id: 'key-terms', title: '关键术语', icon: '🧑‍⚖️' },
  { id: 'basic-concepts', title: '基本概念', icon: '📝' },
  { id: 'legal-basis', title: '法律依据', icon: '⚖️' },
  { id: 'practice-points', title: '实务要点', icon: '💼' },
  { id: 'quiz', title: '练习题', icon: '❓' }
]

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // 从学习存储加载进度
  const progress = learningStore.getTopicProgress('{{TOPIC_ID}}')
  if (progress) {
    userProgress.value = progress.completionPercentage
  }
})
</script>

<style scoped>
/* 样式与 BusinessMeaning.vue 保持一致 */
.knowledge-topic {
  min-height: 100vh;
  background-color: var(--bg);
}

.container {
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 2rem);
}

/* 其他样式... */
</style>