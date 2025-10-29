<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    :to="to"
    :href="href"
    @click="$emit('click')"
  >
    <span v-if="icon" class="button-icon">{{ icon }}</span>
    <span class="button-text"><slot>{{ label }}</slot></span>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    label: String,
    icon: String,
    variant: {
      type: String,
      default: 'primary', // 'primary' | 'secondary' | 'text'
      validator: (value) => ['primary', 'secondary', 'text'].includes(value)
    },
    size: {
      type: String,
      default: 'medium', // 'small' | 'medium' | 'large'
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    to: [String, Object], // 用于 router-link
    href: String, // 用于外部链接
    disabled: Boolean,
    fullWidth: Boolean
  },
  emits: ['click'],
  computed: {
    componentType() {
      if (this.to) return 'router-link'
      if (this.href) return 'a'
      return 'button'
    },
    buttonClasses() {
      return [
        'base-button',
        `button-${this.variant}`,
        `button-${this.size}`,
        {
          'disabled': this.disabled,
          'full-width': this.fullWidth,
          'has-icon': this.icon
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  border-radius: $border-radius;
  border: none;
  cursor: pointer;
  font-weight: $font-weight-semibold;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  font-family: $font-family;
}

.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
}

/* 尺寸 */
.button-small {
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-sm;
}

.button-medium {
  padding: $spacing-md $spacing-lg;
  font-size: $font-size-base;
}

.button-large {
  padding: $spacing-lg $spacing-xl;
  font-size: $font-size-lg;
}

/* 变体 */
.button-primary {
  background: $primary-color;
  color: white;
  box-shadow: $shadow;
  
  &:hover:not(.disabled) {
    background: $primary-dark;
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }
}

.button-secondary {
  background: transparent;
  color: $primary-dark;
  border: 1px solid $primary-color;
  
  &:hover:not(.disabled) {
    background: $primary-light;
    transform: translateY(-2px);
  }
}

.button-text {
  background: transparent;
  color: $primary-color;
  padding: $spacing-sm $spacing-md;
  
  &:hover:not(.disabled) {
    background: $primary-light;
  }
}

/* 状态 */
.base-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.base-button.full-width {
  width: 100%;
}

.button-icon {
  font-size: 16px;
}
</style>