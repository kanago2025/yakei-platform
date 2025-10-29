<template>
  <div class="qa-item" @click="$emit('click')">
    <div class="qa-status" :class="{ resolved: question.isResolved }">
      {{ question.isResolved ? '✅' : '❓' }}
    </div>
    <div class="qa-content">
      <h4 class="qa-title">{{ question.title }}</h4>
      <div class="qa-tags">
        <span 
          v-for="tag in question.tags" 
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
      <div class="qa-meta">
        <span>{{ question.answers }} 个回答</span>
        <span>{{ question.views }} 次浏览</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QaItem',
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.qa-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--card-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
}

.qa-item:hover {
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.08);
}

.qa-status {
  font-size: 20px;
  flex-shrink: 0;
}

.qa-status.resolved {
  color: var(--primary);
}

.qa-content {
  flex: 1;
}

.qa-title {
  color: var(--primary-dark);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.qa-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.tag {
  background: var(--primary-light);
  color: var(--primary-dark);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.qa-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: var(--muted);
}
</style>