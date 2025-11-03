<template>
  <div class="page-container">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <div class="page-actions">
        <button class="btn-primary" @click="showAddUserModal = true">
          添加用户
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="page-content">
      <!-- 搜索/筛选区域 -->
      <div class="filter-section">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            placeholder="搜索用户名、邮箱或电话号码..." 
            class="search-input"
            @input="handleSearch"
            @keyup.enter="applySearch"
          />
          <button class="btn-search" @click="applySearch">
            <span>搜索</span>
          </button>
          <button class="btn-clear" @click="clearSearch" v-if="searchQuery">
            清空
          </button>
        </div>
        
        <div class="filter-options">
          <select v-model="filterRole" @change="applyFilters" class="filter-select">
            <option value="">所有角色</option>
            <option value="admin">管理员</option>
            <option value="user">普通用户</option>
            <option value="editor">编辑者</option>
          </select>
          
          <select v-model="filterStatus" @change="applyFilters" class="filter-select">
            <option value="">所有状态</option>
            <option value="active">活跃</option>
            <option value="inactive">未激活</option>
            <option value="banned">已禁用</option>
          </select>
        </div>
      </div>

      <!-- 数据展示区域 -->
      <div class="data-section">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          加载中...
        </div>
        
        <div v-else-if="filteredUsers.length === 0" class="empty-state">
          {{ searchQuery ? '未找到匹配的用户' : '暂无用户数据' }}
        </div>

        <div v-else class="users-table">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>状态</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="user in paginatedUsers" 
                :key="user.id"
                :class="{ 'inactive-user': user.status === 'inactive' }"
              >
                <td>{{ user.id }}</td>
                <td>
                  <div class="user-info">
                    <span class="username">{{ user.username }}</span>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge" :class="user.role">
                    {{ getRoleText(user.role) }}
                  </span>
                </td>
                <td>
                  <span class="status-badge" :class="user.status">
                    {{ getStatusText(user.status) }}
                  </span>
                </td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit" @click="editUser(user)">编辑</button>
                    <button 
                      class="btn-deactivate" 
                      @click="toggleUserStatus(user)"
                      v-if="user.status === 'active'"
                    >
                      禁用
                    </button>
                    <button 
                      class="btn-activate" 
                      @click="toggleUserStatus(user)"
                      v-else
                    >
                      启用
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 分页控件 -->
          <div class="pagination" v-if="filteredUsers.length > pageSize">
            <button 
              :disabled="currentPage === 1" 
              @click="currentPage--"
              class="pagination-btn"
            >
              上一页
            </button>
            <span class="pagination-info">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            <button 
              :disabled="currentPage === totalPages" 
              @click="currentPage++"
              class="pagination-btn"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加用户模态框 -->
    <div v-if="showAddUserModal" class="modal-overlay">
      <div class="modal-content">
        <h3>添加新用户</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label>用户名:</label>
            <input v-model="newUser.username" required class="form-input" />
          </div>
          <div class="form-group">
            <label>邮箱:</label>
            <input v-model="newUser.email" type="email" required class="form-input" />
          </div>
          <div class="form-group">
            <label>角色:</label>
            <select v-model="newUser.role" class="form-input">
              <option value="user">普通用户</option>
              <option value="editor">编辑者</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">保存</button>
            <button type="button" @click="showAddUserModal = false" class="btn-cancel">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const pageTitle = ref('用户管理')
const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const loading = ref(false)
const showAddUserModal = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

// 用户数据
const users = ref([])
const newUser = ref({
  username: '',
  email: '',
  role: 'user'
})

// 计算属性
const filteredUsers = computed(() => {
  let filtered = users.value
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.phone && user.phone.includes(query))
    )
  }
  
  // 角色过滤
  if (filterRole.value) {
    filtered = filtered.filter(user => user.role === filterRole.value)
  }
  
  // 状态过滤
  if (filterStatus.value) {
    filtered = filtered.filter(user => user.status === filterStatus.value)
  }
  
  return filtered
})

const totalPages = computed(() => 
  Math.ceil(filteredUsers.value.length / pageSize.value)
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredUsers.value.slice(start, end)
})

// 防抖函数
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 生命周期
onMounted(() => {
  loadUsers()
})

// 方法
const loadUsers = async () => {
  loading.value = true
  try {
    // 模拟API调用
    setTimeout(() => {
      users.value = [
        {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
          status: 'active',
          createdAt: new Date('2024-01-15')
        },
        {
          id: 2,
          username: 'user1',
          email: 'user1@example.com',
          role: 'user',
          status: 'active',
          createdAt: new Date('2024-02-20')
        },
        {
          id: 3,
          username: 'editor1',
          email: 'editor@example.com',
          role: 'editor',
          status: 'inactive',
          createdAt: new Date('2024-03-10')
        }
      ]
      loading.value = false
    }, 1000)
  } catch (error) {
    console.error('加载用户数据失败:', error)
    loading.value = false
  }
}

// 使用防抖搜索 
const handleSearch = debounce(() => {
  currentPage.value = 1
  applySearch()
}, 300)

const applySearch = () => {
  // 搜索逻辑已在计算属性中处理
  console.log('执行搜索:', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  filterRole.value = ''
  filterStatus.value = ''
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const editUser = (user) => {
  // 编辑用户逻辑
  console.log('编辑用户:', user)
  alert(`编辑用户: ${user.username}`)
}

const toggleUserStatus = (user) => {
  user.status = user.status === 'active' ? 'inactive' : 'active'
  console.log('更新用户状态:', user)
}

const saveUser = () => {
  // 保存新用户逻辑
  const user = {
    id: users.value.length + 1,
    ...newUser.value,
    status: 'active',
    createdAt: new Date()
  }
  users.value.push(user)
  showAddUserModal.value = false
  resetNewUser()
}

const resetNewUser = () => {
  newUser.value = {
    username: '',
    email: '',
    role: 'user'
  }
}

const getRoleText = (role) => {
  const roles = {
    admin: '管理员',
    user: '普通用户',
    editor: '编辑者'
  }
  return roles[role] || role
}

const getStatusText = (status) => {
  const statusMap = {
    active: '活跃',
    inactive: '未激活',
    banned: '已禁用'
  }
  return statusMap[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped>
/* 样式代码与之前相同，这里省略以节省空间 */
.page-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 12px;
}

.filter-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.search-box {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.btn-search, .btn-clear {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-search {
  background: #007bff;
  color: white;
}

.btn-clear {
  background: #6c757d;
  color: white;
}

.filter-options {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.data-section {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.loading-state, .empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.users-table {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.inactive-user {
  opacity: 0.6;
  background: #f8f9fa;
}

.role-badge, .status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.role-badge.admin {
  background: #e3f2fd;
  color: #1976d2;
}

.role-badge.user {
  background: #f3e5f5;
  color: #7b1fa2;
}

.role-badge.editor {
  background: #e8f5e8;
  color: #388e3c;
}

.status-badge.active {
  background: #e8f5e8;
  color: #388e3c;
}

.status-badge.inactive {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.banned {
  background: #ffebee;
  color: #d32f2f;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-activate, .btn-deactivate {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-edit {
  background: #ffc107;
  color: #000;
}

.btn-activate {
  background: #28a745;
  color: white;
}

.btn-deactivate {
  background: #dc3545;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 16px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-cancel:hover {
  background: #545b62;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .filter-options {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>