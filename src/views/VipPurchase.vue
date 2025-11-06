<!-- views/VipPurchase.vue -->
<template>
  <div class="vip-purchase container">
    <section-header title="升级VIP" subtitle="解锁更多学习功能" />
    
    <div class="vip-plans">
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        :class="['plan-card', { featured: plan.featured }]"
      >
        <div class="plan-header">
          <h3>{{ plan.name }}</h3>
          <div class="plan-price">
            <span class="amount">¥{{ plan.price }}</span>
            <span class="period">/{{ plan.period }}</span>
          </div>
        </div>
        
        <ul class="plan-features">
          <li v-for="feature in plan.features" :key="feature">
            ✓ {{ feature }}
          </li>
        </ul>
        
        <button 
          :class="['btn', 'btn-plan', plan.featured ? 'btn-primary' : 'btn-outline']"
          @click="purchase(plan)"
        >
          {{ plan.featured ? '立即升级' : '选择此方案' }}
        </button>
      </div>
    </div>
    
    <div class="vip-features">
      <h3>VIP专属功能</h3>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <h4>智能组卷</h4>
          <p>基于错题智能生成个性化试卷</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📈</div>
          <h4>高级分析</h4>
          <p>详细的学习数据分析和趋势</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h4>无限练习</h4>
          <p>无限制访问所有真题模拟</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVipStore } from '@/stores/vipStore'
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/SectionHeader.vue'

const vipStore = useVipStore()
const router = useRouter()

const plans = ref([
  {
    id: 'monthly',
    name: '月卡VIP',
    price: '29',
    period: '月',
    featured: false,
    features: [
      '智能组卷功能',
      '高级学习分析',
      '无限真题练习',
      '专属客服支持'
    ]
  },
  {
    id: 'quarterly',
    name: '季卡VIP',
    price: '79',
    period: '季',
    featured: true,
    features: [
      '所有月卡功能',
      '节省15%费用',
      '优先功能体验',
      '学习计划定制'
    ]
  },
  {
    id: 'yearly',
    name: '年卡VIP',
    price: '299',
    period: '年',
    featured: false,
    features: [
      '所有季卡功能',
      '节省30%费用',
      '专属学习报告',
      '一对一学习指导'
    ]
  }
])

const purchase = async (plan) => {
  // 模拟支付流程
  try {
    // 这里集成实际支付API
    console.log('开始支付:', plan)
    
    // 支付成功后更新VIP状态
    vipStore.setVipStatus({
      isVip: true,
      vipType: plan.id,
      expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
      features: ['smart_paper', 'advanced_analytics', 'unlimited_exams']
    })
    
    // 跳转回原页面或首页
    router.push('/')
  } catch (error) {
    console.error('支付失败:', error)
  }
}
</script>

<style scoped>
.vip-plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.plan-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.plan-card.featured {
  border-color: var(--primary);
  transform: scale(1.05);
  position: relative;
}

.plan-header {
  margin-bottom: 20px;
}

.plan-header h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.plan-price {
  color: var(--primary);
}

.amount {
  font-size: 32px;
  font-weight: bold;
}

.period {
  font-size: 14px;
  color: var(--text-light);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}

.plan-features li {
  padding: 8px 0;
  color: var(--text-light);
}

.btn-plan {
  width: 100%;
  margin-top: 16px;
}

.vip-features {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
}

.vip-features h3 {
  text-align: center;
  margin-bottom: 30px;
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.feature-item {
  text-align: center;
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.feature-item h4 {
  margin-bottom: 8px;
  color: var(--text-primary);
}

.feature-item p {
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .plan-card.featured {
    transform: none;
  }
}
</style><!-- views/VipPurchase.vue -->
<template>
  <div class="vip-purchase container">
    <section-header title="升级VIP" subtitle="解锁更多学习功能" />
    
    <!-- VIP状态提示 -->
    <div v-if="userStore.isPremium" class="current-vip-status">
      <div class="vip-status-card">
        <div class="status-icon">👑</div>
        <div class="status-info">
          <h3>您已是VIP会员</h3>
          <p>VIP有效期至：{{ formatVipExpireDate }}</p>
        </div>
        <div class="status-actions">
          <button class="btn btn-outline" @click="goToDashboard">前往学习</button>
        </div>
      </div>
    </div>

    <!-- VIP套餐选择 -->
    <div v-else class="vip-plans">
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        :class="['plan-card', { featured: plan.featured }]"
      >
        <div class="plan-header">
          <h3>{{ plan.name }}</h3>
          <div class="plan-price">
            <span class="amount">¥{{ plan.price }}</span>
            <span class="period">/{{ plan.period }}</span>
          </div>
        </div>
        
        <ul class="plan-features">
          <li v-for="feature in plan.features" :key="feature">
            ✓ {{ feature }}
          </li>
        </ul>
        
        <button 
          :class="['btn', 'btn-plan', plan.featured ? 'btn-primary' : 'btn-outline']"
          @click="purchase(plan)"
          :disabled="loading"
        >
          {{ loading ? '处理中...' : plan.featured ? '立即升级' : '选择此方案' }}
        </button>
      </div>
    </div>
    
    <!-- VIP功能展示 -->
    <div class="vip-features">
      <h3>VIP专属功能</h3>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <h4>智能组卷</h4>
          <p>基于错题智能生成个性化试卷</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📈</div>
          <h4>高级分析</h4>
          <p>详细的学习数据分析和趋势</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h4>无限练习</h4>
          <p>无限制访问所有真题模拟</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">💡</div>
          <h4>AI推荐</h4>
          <p>个性化学习路径和内容推荐</p>
        </div>
      </div>
    </div>

    <!-- 支付安全保障 -->
    <div class="security-notice">
      <div class="security-icon">🔒</div>
      <div class="security-text">
        <h4>支付安全保障</h4>
        <p>我们采用银行级加密技术保护您的支付信息，支持支付宝、微信支付等多种支付方式</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useVipStore } from '@/stores/vipStore'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import SectionHeader from '@/components/SectionHeader.vue'

const vipStore = useVipStore()
const userStore = useUserStore()
const router = useRouter()

const loading = ref(false)

const plans = ref([
  {
    id: 'monthly',
    name: '月卡VIP',
    price: '29',
    period: '月',
    featured: false,
    features: [
      '智能组卷功能',
      '高级学习分析',
      '无限真题练习',
      '专属客服支持',
      '基础学习报告'
    ]
  },
  {
    id: 'quarterly',
    name: '季卡VIP',
    price: '79',
    period: '季',
    featured: true,
    features: [
      '所有月卡功能',
      '节省15%费用',
      '优先功能体验',
      '学习计划定制',
      '详细分析报告'
    ]
  },
  {
    id: 'yearly',
    name: '年卡VIP',
    price: '299',
    period: '年',
    featured: false,
    features: [
      '所有季卡功能',
      '节省30%费用',
      '专属学习报告',
      '一对一学习指导',
      'VIP专属内容'
    ]
  }
])

const formatVipExpireDate = computed(() => {
  if (!userStore.user?.subscription_expires) return ''
  return new Date(userStore.user.subscription_expires).toLocaleDateString('zh-CN')
})

const purchase = async (plan) => {
  if (!userStore.isLoggedIn) {
    if (confirm('请先登录后再购买VIP，是否立即登录？')) {
      router.push('/login')
    }
    return
  }

  loading.value = true
  
  try {
    // 模拟支付流程
    console.log('开始支付流程:', plan)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 更新用户VIP状态
    userStore.upgradeToPremium(plan.id)
    
    // 同步VIP Store状态
    vipStore.syncWithUserStore()
    
    // 显示成功消息
    alert(`恭喜！您已成功升级为${plan.name}！`)
    
    // 跳转到仪表盘
    router.push('/dashboard')
    
  } catch (error) {
    console.error('支付失败:', error)
    alert('支付失败，请稍后重试或联系客服。')
  } finally {
    loading.value = false
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
.vip-purchase {
  padding: 2rem 0;
  min-height: 100vh;
  background: var(--bg);
}

/* VIP状态卡片 */
.current-vip-status {
  margin-bottom: 2rem;
}

.vip-status-card {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 2px solid #f59e0b;
}

.status-icon {
  font-size: 3rem;
}

.status-info h3 {
  color: #92400e;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.status-info p {
  color: #92400e;
  opacity: 0.8;
  margin: 0;
}

.status-actions {
  margin-left: auto;
}

/* VIP套餐样式 */
.vip-plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.plan-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.plan-card.featured {
  border-color: var(--primary);
  transform: scale(1.02);
  position: relative;
}

.plan-card.featured::before {
  content: '最受欢迎';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.plan-header {
  margin-bottom: 20px;
}

.plan-header h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.plan-price {
  color: var(--primary);
}

.amount {
  font-size: 32px;
  font-weight: bold;
}

.period {
  font-size: 14px;
  color: var(--text-light);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}

.plan-features li {
  padding: 8px 0;
  color: var(--text-light);
  font-size: 14px;
}

.btn-plan {
  width: 100%;
  margin-top: 16px;
}

/* VIP功能展示 */
.vip-features {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.vip-features h3 {
  text-align: center;
  margin-bottom: 30px;
  color: var(--text-primary);
  font-size: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--bg);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.feature-item h4 {
  margin-bottom: 8px;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.feature-item p {
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

/* 安全保障 */
.security-notice {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.security-icon {
  font-size: 2rem;
}

.security-text h4 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.security-text p {
  color: var(--text-light);
  margin: 0;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .plan-card.featured {
    transform: none;
  }
  
  .vip-status-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .status-actions {
    margin-left: 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .security-notice {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .vip-plans {
    grid-template-columns: 1fr;
  }
  
  .plan-card {
    padding: 1.5rem;
  }
}
</style>