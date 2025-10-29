<template>
  <div class="base-progress">
    <div v-if="showLabel" class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-value">{{ displayValue }}</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="fillStyle"
        :class="`progress-${variant}`"
      ></div>
    </div>
    <div v-if="$slots.default" class="progress-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseProgress',
  props: {
    value: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0 && value <= 100
    },
    label: {
      type: String,
      default: '进度'
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'primary', // 'primary' | 'success' | 'warning' | 'error'
      validator: (value) => ['primary', 'success', 'warning', 'error'].includes(value)
    },
    size: {
      type: String,
      default: 'medium', // 'small' | 'medium' | 'large'
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  computed: {
    displayValue() {
      return `${Math.round(this.value)}%`
    },
    fillStyle() {
      return {
        width: `${this.value}%`
      }
    }
  }
}
</script>

<style scoped>
.base-progress {
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--muted);
}

.progress-bar {
  width: 100%;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* 尺寸 */
.progress-bar {
  height: 6px;
}

.progress-bar.small {
  height: 4px;
}

.progress-bar.large {
  height: 8px;
}

/* 变体 */
.progress-primary {
  background: var(--primary);
}

.progress-success {
  background: #10b981;
}

.progress-warning {
  background: #f59e0b;
}

.progress-error {
  background: #ef4444;
}

.progress-content {
  margin-top: 8px;
}
</style>