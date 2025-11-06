<!-- src/components/SectionHeader.vue -->
<template>
  <div class="section-header" :class="[alignment, { 'with-action': $slots.action }]">
    <div class="header-content">
      <div class="title-section">
        <!-- 图标（可选） -->
        <div v-if="icon" class="header-icon">
          {{ icon }}
        </div>
        
        <!-- 标题区域 -->
        <div class="text-content">
          <h2 class="title" :class="titleSize">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="subtitle">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <!-- 操作区域（插槽） -->
      <div v-if="$slots.action" class="action-section">
        <slot name="action"></slot>
      </div>
    </div>

    <!-- 描述信息（可选） -->
    <p v-if="description" class="description">
      {{ description }}
    </p>

    <!-- 底部装饰线（可选） -->
    <div v-if="showDivider" class="divider"></div>
  </div>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  // 主标题
  title: {
    type: String,
    required: true
  },
  // 副标题
  subtitle: {
    type: String,
    default: ''
  },
  // 详细描述
  description: {
    type: String,
    default: ''
  },
  // 图标
  icon: {
    type: String,
    default: ''
  },
  // 对齐方式
  alignment: {
    type: String,
    default: 'left', // 'left', 'center', 'right'
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  // 标题大小
  titleSize: {
    type: String,
    default: 'large', // 'small', 'medium', 'large', 'xlarge'
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  },
  // 是否显示分隔线
  showDivider: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.section-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
}

.title-section {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

/* 图标样式 */
.header-icon {
  font-size: 2rem;
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.text-content {
  flex: 1;
}

/* 标题大小变体 */
.title.small {
  font-size: 1.25rem;
  font-weight: 600;
}

.title.medium {
  font-size: 1.5rem;
  font-weight: 600;
}

.title.large {
  font-size: 1.75rem;
  font-weight: 700;
}

.title.xlarge {
  font-size: 2rem;
  font-weight: 800;
}

.title {
  color: var(--primary-dark);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.subtitle {
  color: var(--muted);
  font-size: 1.125rem;
  margin: 0;
  line-height: 1.4;
}

.description {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.5;
  margin: 1rem 0 0 0;
  max-width: 600px;
}

/* 操作区域 */
.action-section {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* 对齐方式变体 */
.section-header.center {
  text-align: center;
}

.section-header.center .header-content {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-header.center .title-section {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-header.center .action-section {
  justify-content: center;
}

.section-header.right {
  text-align: right;
}

.section-header.right .header-content {
  flex-direction: row-reverse;
}

.section-header.right .title-section {
  flex-direction: row-reverse;
  text-align: right;
}

.section-header.right .action-section {
  justify-content: flex-start;
}

/* 分隔线样式 */
.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
  margin-top: 1.5rem;
}

/* 有操作区域时的特殊样式 */
.section-header.with-action .header-content {
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .title-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }

  .action-section {
    justify-content: center;
    width: 100%;
  }

  .section-header.right .header-content,
  .section-header.right .title-section {
    flex-direction: column;
    text-align: center;
  }

  .title.large {
    font-size: 1.5rem;
  }

  .title.xlarge {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .section-header {
    margin-bottom: 1.5rem;
  }

  .title.large {
    font-size: 1.375rem;
  }

  .title.xlarge {
    font-size: 1.5rem;
  }

  .header-icon {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }
}
</style>