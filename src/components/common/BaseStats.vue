<template>
  <div class="base-stats">
    <div 
      v-for="(stat, index) in stats" 
      :key="index"
      class="stat-item"
      :class="`stat-${layout}`"
    >
      <span class="stat-number">{{ stat.number }}</span>
      <span class="stat-label">{{ stat.label }}</span>
      <div v-if="stat.trend" class="stat-trend" :class="`trend-${stat.trend.type}`">
        <span class="trend-icon">{{ stat.trend.icon }}</span>
        <span class="trend-value">{{ stat.trend.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseStats',
  props: {
    stats: {
      type: Array,
      required: true,
      validator: (stats) => stats.every(stat => 
        stat && typeof stat.number !== 'undefined' && typeof stat.label !== 'undefined'
      )
    },
    layout: {
      type: String,
      default: 'horizontal', // 'horizontal' | 'vertical'
      validator: (value) => ['horizontal', 'vertical'].includes(value)
    }
  }
}
</script>

<style scoped>
.base-stats {
  display: flex;
  gap: 24px;
}

.stat-horizontal {
  flex-direction: row;
  justify-content: center;
}

.stat-vertical {
  flex-direction: column;
  align-items: center;
}

.stat-item {
  text-align: center;
  padding: 16px;
  min-width: 120px;
}

.stat-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.trend-up {
  background: #ecfdf5;
  color: #047857;
}

.trend-down {
  background: #fef2f2;
  color: #dc2626;
}

.trend-neutral {
  background: #f3f4f6;
  color: #6b7280;
}

.trend-icon {
  font-size: 10px;
}

/* 响应式 */
@media (max-width: 768px) {
  .base-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat-horizontal {
    flex-direction: column;
  }
  
  .stat-item {
    min-width: auto;
  }
}
</style>