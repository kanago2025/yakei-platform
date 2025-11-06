<!-- components/VipGuard.vue -->
<template>
  <div v-if="!hasAccess" class="vip-guard">
    <div class="vip-overlay">
      <div class="vip-content">
        <div class="vip-icon">👑</div>
        <h3>VIP专属功能</h3>
        <p>{{ message }}</p>
        <div class="vip-actions">
          <button class="btn btn-primary" @click="goToPurchase">立即升级</button>
          <button class="btn btn-outline" @click="close">暂不升级</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useVipStore } from '@/stores/vipStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  feature: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: '此功能需要VIP权限才能使用'
  }
})

const emit = defineEmits(['close'])

const vipStore = useVipStore()
const router = useRouter()

const hasAccess = computed(() => vipStore.hasFeature(props.feature))

const goToPurchase = () => {
  router.push('/vip/purchase')
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.vip-guard {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.vip-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.vip-content {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  max-width: 400px;
  margin: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.vip-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.vip-content h3 {
  color: var(--primary);
  margin-bottom: 12px;
  font-size: 20px;
}

.vip-content p {
  color: var(--text-light);
  margin-bottom: 24px;
  line-height: 1.5;
}

.vip-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 480px) {
  .vip-actions {
    flex-direction: column;
  }
}
</style>