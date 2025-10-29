<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    :to="to"
    @click="$emit('click')"
  >
    <span v-if="icon" class="button-icon">{{ icon }}</span>
    {{ label }}
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    icon: String,
    to: String
  },
  emits: ['click'],
  computed: {
    componentType() {
      return this.to ? 'router-link' : 'button'
    },
    buttonClasses() {
      return [
        'base-button',
        `button-${this.variant}`,
        `button-${this.size}`,
        { 'button-full-width': this.fullWidth }
      ]
    }
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
}

.button-small {
  padding: 8px 16px;
  font-size: 12px;
}

.button-medium {
  padding: 12px 24px;
  font-size: 14px;
}

.button-large {
  padding: 16px 32px;
  font-size: 16px;
}

.button-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(42, 121, 96, 0.25);
}

.button-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(42, 121, 96, 0.35);
}

.button-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.button-outline:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}

.button-full-width {
  width: 100%;
}

.button-icon {
  font-size: 16px;
}
</style>