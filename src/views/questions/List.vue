<template>
  <div class="question-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>题目管理</span>
          <el-button type="primary" @click="handleImport">导入Excel</el-button>
        </div>
      </template>

      <!-- 搜索和筛选 -->
      <div class="filter-container">
        <el-input
          v-model="listQuery.keyword"
          placeholder="搜索题目内容"
          style="width: 300px"
          @keyup.enter="getList"
        />
        <el-select v-model="listQuery.category" placeholder="分类" clearable>
          <el-option label="権利関係" value="rights" />
          <el-option label="宅建業法" value="estate_business" />
          <el-option label="法令制限" value="regulations" />
          <el-option label="税務" value="tax" />
        </el-select>
        <el-select v-model="listQuery.difficulty" placeholder="难度" clearable>
          <el-option label="簡単" value="easy" />
          <el-option label="普通" value="medium" />
          <el-option label="難しい" value="hard" />
        </el-select>
        <el-button type="primary" @click="getList">搜索</el-button>
      </div>

      <!-- 题目列表 -->
      <el-table
        v-loading="listLoading"
        :data="questions"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="ID" prop="id" width="80" align="center" />
        <el-table-column label="题目内容" prop="content" min-width="300" />
        <el-table-column label="分类" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getCategoryType(row.category)" effect="plain">
              {{ getCategoryName(row.category) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="难度" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getDifficultyType(row.difficulty)" effect="light">
              {{ getDifficultyName(row.difficulty) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="正解" prop="correctAnswer" width="80" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="listQuery.page"
          v-model:page-size="listQuery.limit"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="getList"
          @current-change="getList"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const listLoading = ref(false)
const questions = ref([])
const total = ref(0)

const listQuery = reactive({
  page: 1,
  limit: 20,
  keyword: '',
  category: '',
  difficulty: ''
})

// 分类映射
const categoryMap = {
  rights: { name: '権利関係', type: 'primary' },
  estate_business: { name: '宅建業法', type: 'success' },
  regulations: { name: '法令制限', type: 'warning' },
  tax: { name: '税務', type: 'danger' }
}

// 难度映射
const difficultyMap = {
  easy: { name: '簡単', type: 'success' },
  medium: { name: '普通', type: 'warning' },
  hard: { name: '難しい', type: 'danger' }
}

const getCategoryName = (category) => {
  return categoryMap[category]?.name || category
}

const getCategoryType = (category) => {
  return categoryMap[category]?.type || 'info'
}

const getDifficultyName = (difficulty) => {
  return difficultyMap[difficulty]?.name || difficulty
}

const getDifficultyType = (difficulty) => {
  return difficultyMap[difficulty]?.type || 'info'
}

// 获取题目列表
const getList = async () => {
  listLoading.value = true
  try {
    // 临时模拟数据，等后端API完成后替换
    questions.value = [
      {
        id: 1,
        content: '宅地建物取引業の免許の有効期間は何年か？',
        category: 'estate_business',
        difficulty: 'easy',
        correctAnswer: 'A',
        options: ['5年', '3年', '10年', '1年']
      },
      {
        id: 2,
        content: '抵当権の効力は目的物の従物に及ぶか？',
        category: 'rights',
        difficulty: 'medium',
        correctAnswer: 'A',
        options: ['及ぶ', '及ばない', '場合による', '判例がない']
      }
    ]
    total.value = questions.value.length
  } catch (error) {
    ElMessage.error('获取题目列表失败')
    console.error(error)
  } finally {
    listLoading.value = false
  }
}

const handleImport = () => {
  ElMessage.info('Excel导入功能开发中...')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑题目 ${row.id}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除这道题目吗？', '警告', {
      type: 'warning'
    })
    ElMessage.success('删除成功')
    getList()
  } catch {
    // 用户取消删除
  }
}

onMounted(() => {
  getList()
})
</script>

<style scoped>
.filter-container {
  margin-bottom: 20px;
}
.filter-container .el-select {
  margin-left: 10px;
  width: 150px;
}
.pagination-container {
  margin-top: 20px;
  text-align: center;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>