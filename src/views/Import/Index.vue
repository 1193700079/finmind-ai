// src/views/Import/Index.vue
<template>
    <div class="page-container">
        <PageHeader title="账单导入" subtitle="支持多种格式账单导入与解析" />

        <div class="page-content">
            <!-- 文件上传区域 -->
            <el-upload drag multiple :before-upload="handleFileUpload" :show-file-list="false"
                accept=".csv,.xlsx,.xls,.pdf,.jpg,.png" class="upload-demo">
                <div class="upload-area">
                    <el-icon class="upload-icon">
                        <UploadFilled />
                    </el-icon>
                    <div class="upload-text">点击或拖拽文件到此区域上传</div>
                    <div class="upload-hint">
                        支持 CSV、Excel、PDF、图片格式的账单文件
                    </div>
                </div>
            </el-upload>

            <!-- 上传进度 -->
            <div v-if="uploadProgress.show" class="upload-progress">
                <el-progress :percentage="uploadProgress.percentage" :status="uploadProgress.status" />
                <div class="progress-text">{{ uploadProgress.text }}</div>
            </div>

            <!-- 导入数据预览 -->
            <div v-if="importedData.length > 0" class="imported-data">
                <div class="section-header">
                    <h3>导入的账单数据</h3>
                    <div class="header-actions">
                        <el-button @click="selectAll">全选</el-button>
                        <el-button @click="clearAll">清空</el-button>
                        <el-button type="primary" @click="confirmImport" :disabled="selectedRows.length === 0">
                            确认导入 ({{ selectedRows.length }})
                        </el-button>
                    </div>
                </div>

                <el-table :data="importedData" @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="date" label="日期" width="120" />
                    <el-table-column prop="description" label="描述" min-width="150" />
                    <el-table-column prop="category" label="分类" width="100">
                        <template #default="scope">
                            <el-select v-model="scope.row.category" size="small" style="width: 100%">
                                <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="金额" width="120" align="right">
                        <template #default="scope">
                            ¥{{ scope.row.amount.toLocaleString() }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template #default="scope">
                            <el-button size="small" @click="editRow(scope.row)" type="primary" link>
                                编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 导入模板下载 -->
            <div class="template-section">
                <h3>导入模板</h3>
                <div class="template-grid">
                    <el-card v-for="template in templates" :key="template.name" shadow="hover" class="template-card">
                        <div class="template-content">
                            <el-icon class="template-icon">
                                <component :is="template.icon" />
                            </el-icon>
                            <div class="template-info">
                                <div class="template-name">{{ template.name }}</div>
                                <div class="template-desc">{{ template.description }}</div>
                            </div>
                            <el-button type="primary" size="small" @click="downloadTemplate(template)">
                                下载
                            </el-button>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled, Document, Picture, Files } from '@element-plus/icons-vue'
import PageHeader from '@/components/PageHeader.vue'
import { useTransactionStore } from '@/stores/transaction'
import type { Transaction } from '@/types'

const transactionStore = useTransactionStore()

const importedData = ref<Array<Omit<Transaction, 'id'>>>([])
const selectedRows = ref<Array<Omit<Transaction, 'id'>>>([])

const uploadProgress = ref({
    show: false,
    percentage: 0,
    status: '',
    text: ''
})

const categories = ['餐饮', '交通', '购物', '娱乐', '日用品', '医疗', '住房', '其他']

const templates = [
    {
        name: 'CSV模板',
        description: '标准CSV格式模板',
        icon: Document,
        type: 'csv'
    },
    {
        name: 'Excel模板',
        description: 'Excel表格模板',
        icon: Files,
        type: 'xlsx'
    }
]

const handleFileUpload = (file: File) => {
    uploadProgress.value = {
        show: true,
        percentage: 0,
        status: '',
        text: '正在上传文件...'
    }

    // 模拟上传进度
    const timer = setInterval(() => {
        uploadProgress.value.percentage += 10

        if (uploadProgress.value.percentage >= 100) {
            clearInterval(timer)
            uploadProgress.value.text = '文件解析中...'

            // 模拟解析过程
            setTimeout(() => {
                parseFile(file)
                uploadProgress.value.show = false
            }, 1500)
        }
    }, 200)

    return false // 阻止自动上传
}

const parseFile = (file: File) => {
    ElMessage.success(`正在解析文件：${file.name}`)

    // 模拟解析结果
    const mockData = [
        {
            date: '2024-06-19',
            description: '超市购物',
            category: '日用品',
            amount: 128.50,
            type: 'expense' as const
        },
        {
            date: '2024-06-18',
            description: '加油站',
            category: '交通',
            amount: 300.00,
            type: 'expense' as const
        },
        {
            date: '2024-06-17',
            description: '餐厅就餐',
            category: '餐饮',
            amount: 89.00,
            type: 'expense' as const
        }
    ]

    importedData.value = mockData
    ElMessage.success('文件解析完成！')
}

const handleSelectionChange = (selection: Array<Omit<Transaction, 'id'>>) => {
    selectedRows.value = selection
}

const selectAll = () => {
    // 触发表格全选
    ElMessage.info('请点击表格左上角的复选框进行全选')
}

const clearAll = () => {
    importedData.value = []
    selectedRows.value = []
    ElMessage.success('已清空导入数据')
}

const confirmImport = () => {
    selectedRows.value.forEach(row => {
        transactionStore.addTransaction(row)
    })

    ElMessage.success(`成功导入 ${selectedRows.value.length} 条记录！`)
    importedData.value = []
    selectedRows.value = []
}

const editRow = (row: Omit<Transaction, 'id'>) => {
    ElMessage.info('编辑功能开发中...')
}

const downloadTemplate = (template: any) => {
    ElMessage.success(`正在下载 ${template.name}...`)
    // TODO: 实现模板下载
}
</script>

<style lang="scss" scoped>
.upload-demo {
    margin-bottom: 30px;
}

.upload-area {
    padding: 60px 40px;
    text-align: center;
    border: 2px dashed #dcdfe6;
    border-radius: 15px;
    background: #fafafa;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        border-color: #667eea;
        background: #f0f4ff;
    }
}

.upload-icon {
    font-size: 48px;
    color: #c0c4cc;
    margin-bottom: 15px;
}

.upload-text {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
}

.upload-hint {
    font-size: 14px;
    color: #999;
}

.upload-progress {
    margin-bottom: 30px;

    .progress-text {
        text-align: center;
        margin-top: 10px;
        color: #666;
    }
}

.imported-data {
    margin-bottom: 40px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
        color: #333;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
    }
}

.header-actions {
    display: flex;
    gap: 10px;
}

.template-section {
    h3 {
        margin-bottom: 20px;
        color: #333;
        font-size: 18px;
        font-weight: 600;
    }
}

.template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.template-card {
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    }

    .template-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .template-icon {
        font-size: 32px;
        color: #667eea;
    }

    .template-info {
        flex: 1;

        .template-name {
            font-weight: 500;
            margin-bottom: 5px;
            color: #333;
        }

        .template-desc {
            font-size: 12px;
            color: #999;
        }
    }
}

// 响应式样式
@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .header-actions {
        width: 100%;
        justify-content: space-between;
    }

    .template-grid {
        grid-template-columns: 1fr;
    }

    .upload-area {
        padding: 40px 20px;
    }
}
</style>