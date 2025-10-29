<template>
  <div class="post-item" @click="$emit('click')">
    <div class="post-content">
      <h4 class="post-title">{{ post.title }}</h4>
      <div class="post-meta">
        <span class="author">{{ post.author }}</span>
        <span class="time">{{ post.time }}</span>
        <span class="category">{{ post.category }}</span>
      </div>
    </div>
    <div class="post-stats">
      <div class="stat">
        <span class="icon">💬</span>
        <span class="count">{{ post.replies }}</span>
      </div>
      <div class="stat">
        <span class="icon">👍</span>
        <span class="count">{{ post.likes }}</span>
      </div>
      <span v-if="post.isSolved" class="solved-badge">已解决</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--card-bg);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-item:hover {
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.08);
  transform: translateX(4px);
}

.post-content {
  flex: 1;
}

.post-title {
  color: var(--primary-dark);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--muted);
}

.post-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--muted);
}

.solved-badge {
  background: var(--primary-light);
  color: var(--primary-dark);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
}
</style>