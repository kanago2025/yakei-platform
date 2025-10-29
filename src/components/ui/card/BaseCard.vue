<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header || title || icon" class="card-header">
      <div v-if="icon" class="card-icon">{{ icon }}</div>
      <div class="card-header-content">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
        <slot name="header"></slot>
      </div>
    </div>
    
    <div class="card-content">
      <p v-if="description" class="card-description">{{ description }}</p>
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
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
    },
    variant: {
      type: String,
      default: 'default', // 'default' | 'bordered' | 'filled'
      validator: (value) => ['default', 'bordered', 'filled'].includes(value)
    }
  },
  emits: ['click'],
  computed: {
    cardClasses() {
      return [
        'base-card',
        `card-${this.variant}`,
        {
          'hoverable': this.hoverable,
          'clickable': this.clickable
        }
      ]
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-card {
  background: $bg-primary;
  border-radius: $border-radius-lg;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

/* 卡片变体 */
.card-default {
  box-shadow: $shadow;
  border: 1px solid $border-light;
}

.card-bordered {
  border: 1px solid $border-color;
  box-shadow: $shadow-sm;
}

.card-filled {
  background: $bg-muted;
  border: 1px solid transparent;
}

/* 交互效果 */
.base-card.hoverable:hover {
  transform: translateY(-4px);
  box-shadow: $shadow-lg;
  
  &.card-default {
    border-color: rgba($primary-color, 0.2);
  }
}

.base-card.clickable {
  cursor: pointer;
}

.base-card.clickable:active {
  transform: translateY(-1px);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  padding: $spacing-lg $spacing-lg 0;
  margin-bottom: $spacing-md;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: $border-radius;
  background: $primary-light;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-color;
  font-size: 18px;
  flex-shrink: 0;
}

.card-header-content {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin: 0 0 $spacing-xs 0;
  line-height: 1.3;
}

/* 卡片内容 */
.card-content {
  padding: 0 $spacing-lg $spacing-lg;
  
  &:not(:has(.card-description)):not(:has(*)) {
    padding-bottom: 0;
  }
}

.card-description {
  color: $text-secondary;
  font-size: $font-size-sm;
  line-height: 1.5;
  margin: 0 0 $spacing-md 0;
}

/* 卡片底部 */
.card-footer {
  padding: $spacing-md $spacing-lg $spacing-lg;
  border-top: 1px solid $border-light;
  margin-top: $spacing-md;
  
  &:empty {
    display: none;
  }
}

/* 特殊状态 */
.base-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, $primary-color, $primary-dark);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.base-card.hoverable:hover::before {
  transform: scaleX(1);
}
</style>