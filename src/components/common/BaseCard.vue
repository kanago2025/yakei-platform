<template>
  <article class="base-card" :class="cardClasses" @click="$emit('click')">
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>
    
    <div v-if="icon" class="card-icon">
      {{ icon }}
    </div>
    
    <div class="card-content">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="description" class="card-desc">{{ description }}</p>
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    title: String,
    description: String,
    icon: String,
    hoverable: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    cardClasses() {
      return {
        'hoverable': this.hoverable,
        'clickable': this.clickable
      }
    }
  }
}
</script>

<style scoped>
.base-card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(12, 35, 50, 0.06);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.base-card.hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(12, 35, 50, 0.12);
}

.base-card.clickable {
  cursor: pointer;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--primary);
  font-size: 18px;
  font-weight: 600;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 12px;
  line-height: 1.4;
}

.card-desc {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

.card-header {
  margin-bottom: 16px;
}

.card-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
</style>