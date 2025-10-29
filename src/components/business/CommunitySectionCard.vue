<template>
  <BaseCard 
    class="community-section-card"
    :hoverable="true"
    :clickable="true"
    @click="$emit('click')"
  >
    <template #header>
      <div class="section-icon">{{ section.icon }}</div>
    </template>
    
    <h3 class="section-title">{{ section.title }}</h3>
    <p class="section-description">{{ section.description }}</p>
    
    <div class="section-stats">
      <div 
        v-for="stat in section.stats" 
        :key="stat.label"
        class="stat"
      >
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
    
    <template #footer>
      <BaseButton 
        label="进入专区" 
        variant="primary" 
        full-width
      />
    </template>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  name: 'CommunitySectionCard',
  components: {
    BaseCard,
    BaseButton
  },
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.community-section-card {
  text-align: center;
  transition: all 0.3s ease;
}

.section-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.section-title {
  color: var(--primary-dark);
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
}

.section-description {
  color: var(--muted);
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
}

.section-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
}
</style>