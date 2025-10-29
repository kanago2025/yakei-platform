<template>
  <div class="group-item">
    <div class="group-header">
      <h4 class="group-name">{{ group.name }}</h4>
      <span class="member-count">{{ group.members }} 人</span>
    </div>
    <p class="group-description">{{ group.description }}</p>
    <div class="group-tags">
      <span 
        v-for="tag in group.tags" 
        :key="tag"
        class="tag"
      >
        {{ tag }}
      </span>
    </div>
    <div class="group-footer">
      <span class="last-active">最后活跃: {{ group.active }}</span>
      <BaseButton 
        label="加入小组" 
        size="small"
        @click="$emit('join')"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  name: 'GroupItem',
  components: {
    BaseButton
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  emits: ['join']
}
</script>

<style scoped>
.group-item {
  padding: 16px;
  background: var(--card-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.group-name {
  color: var(--primary-dark);
  font-weight: 600;
  font-size: 14px;
}

.member-count {
  font-size: 12px;
  color: var(--muted);
}

.group-description {
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.group-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
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

.group-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-active {
  font-size: 11px;
  color: var(--muted);
}
</style>