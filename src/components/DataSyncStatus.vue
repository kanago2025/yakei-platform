<!-- src/components/DataSyncStatus.vue -->
<template>
  <div class="data-sync-status" :class="syncStatus">
    <div class="sync-indicator" @click="handleClick">
      <div class="sync-icon">
        <span v-if="isSyncing">🔄</span>
        <span v-else-if="hasPendingChanges">⏳</span>
        <span v-else-if="syncStatus === 'error'">❌</span>
        <span v-else>✅</span>
      </div>
      <div class="sync-info">
        <div class="sync-message">{{ syncStatusMessage }}</div>
        <div v-if="lastSyncTime" class="sync-time">
          最后同步: {{ formatTime(lastSyncTime) }}
        </div>
        <div v-if="pendingOperations.length > 0" class="pending-count">
          {{ pendingOperations.length }} 个待同步操作
        </div>
      </div>
    </div>

    <!-- 错误详情弹窗 -->
    <div v-if="showErrorDetails" class="error-details">
      <div class="error-header">
        <h4>同步错误详情</h4>
        <button class="close-btn" @click="showErrorDetails = false">×</button>
      </div>
      <div class="error-content">
        <p>{{ syncError }}</p>
        <div class="error-actions">
          <button class="btn btn-primary" @click="retrySync">
            重试同步
          </button>
          <button class="btn btn-outline" @click="clearPending">
            清除待同步
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataSyncStore } from '@/stores/dataSyncStore'

const dataSyncStore = useDataSyncStore()
const showErrorDetails = ref(false)

// 计算属性
const syncStatus = computed(() => dataSyncStore.syncStatus)
const isSyncing = computed(() => dataSyncStore.isSyncing)
const hasPendingChanges = computed(() => dataSyncStore.hasPendingChanges)
const syncStatusMessage = computed(() => dataSyncStore.syncStatusMessage)
const lastSyncTime = computed(() => dataSyncStore.lastSyncTime)
const pendingOperations = computed(() => dataSyncStore.pendingOperations)
const syncError = computed(() => dataSyncStore.syncError)

// 方法
const handleClick = () => {
  if (syncStatus.value === 'error') {
    showErrorDetails.value = true
  } else if (hasPendingChanges.value && !isSyncing.value) {
    dataSyncStore.syncWithServer()
  }
}

const retrySync = async () => {
  try {
    await dataSyncStore.retryFailedSync()
    showErrorDetails.value = false
  } catch (error) {
    console.error('Retry failed:', error)
  }
}

const clearPending = () => {
  dataSyncStore.clearPendingOperations()
  showErrorDetails.value = false
}

const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString()
}
</script>

<style scoped>
.data-sync-status {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.sync-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  min-width: 200px;
}

.sync-indicator:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.data-sync-status.error .sync-indicator {
  border-color: #ef4444;
  background: #fef2f2;
}

.data-sync-status.syncing .sync-indicator {
  border-color: #f59e0b;
  background: #fffbeb;
}

.sync-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.sync-info {
  flex: 1;
  min-width: 0;
}

.sync-message {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
}

.sync-time,
.pending-count {
  font-size: 0.75rem;
  color: var(--muted);
}

.error-details {
  position: absolute;
  bottom: 100%;
  right: 0;
  background: white;
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: var(--shadow-lg);
  min-width: 300px;
}

.error-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.error-header h4 {
  margin: 0;
  color: #dc2626;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--muted);
}

.close-btn:hover {
  color: var(--text);
}

.error-content p {
  margin: 0 0 1rem 0;
  color: var(--text);
  font-size: 0.875rem;
  line-height: 1.4;
}

.error-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-outline {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: var(--bg);
  color: var(--text);
}

/* 动画 */
.sync-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.data-sync-status:not(.syncing) .sync-icon {
  animation: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .data-sync-status {
    bottom: 10px;
    right: 10px;
    left: 10px;
  }
  
  .sync-indicator {
    min-width: auto;
  }
  
  .error-details {
    left: 0;
    right: 0;
  }
}
</style>