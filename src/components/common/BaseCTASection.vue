<template>
  <section class="base-cta-section">
    <div class="cta-content">
      <h2 class="cta-title">{{ title }}</h2>
      <p class="cta-description">{{ description }}</p>
      <div class="cta-buttons">
        <BaseButton
          v-for="(button, index) in buttons"
          :key="index"
          :label="button.label"
          :variant="button.primary ? 'primary' : 'outline'"
          :icon="button.icon"
          @click="button.action ? button.action() : null"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'BaseCTASection',
  components: {
    BaseButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttons: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.base-cta-section {
  background: var(--card-bg);
  padding: 60px 40px;
  border-radius: var(--radius);
  text-align: center;
  margin: 40px 0;
  border: 1px solid var(--border);
}

.cta-title {
  font-size: 28px;
  color: var(--primary-dark);
  margin-bottom: 16px;
  font-weight: 700;
}

.cta-description {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .base-cta-section {
    padding: 40px 20px;
  }
  
  .cta-title {
    font-size: 24px;
  }
  
  .cta-description {
    font-size: 16px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>