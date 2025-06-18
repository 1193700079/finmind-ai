<template>
    <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }" stripe>
        <el-table-column prop="date" label="日期" width="120" sortable>
            <template #default="scope">
                {{ formatDate(scope.row.date) }}
            </template>
        </el-table-column>

        <el-table-column prop="description" label="描述" min-width="150" />

        <el-table-column prop="category" label="分类" width="100">
            <template #default="scope">
                <el-tag :type="getCategoryType(scope.row.category)" size="small">
                    {{ scope.row.category }}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="amount" label="金额" width="120" sortable align="right">
            <template #default="scope">
                <span :class="scope.row.type === 'expense' ? 'expense-amount' : 'income-amount'">
                    {{ scope.row.type === 'expense' ? '-' : '+' }}¥{{ scope.row.amount.toLocaleString() }}
                </span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="120" fixed="right">
            <template #default="scope">
                <el-button size="small" @click="editTransaction(scope.row)" type="primary" link>
                    编辑
                </el-button>
                <el-button size="small" @click="deleteTransaction(scope.row)" type="danger" link>
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
            :total="transactionStore.transactions.length" layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import type { Transaction } from '@/types'

const transactionStore = useTransactionStore()

const currentPage = ref(1)
const pageSize = ref(20)

const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return transactionStore.transactions
        .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
        .slice(start, end)
})

const formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD')
}

const getCategoryType = (category: string) => {
    const typeMap: Record<string, string> = {
        '餐饮': 'warning',
        '交通': 'success',
        '购物': 'danger',
        '娱乐': 'info',
        '日用品': '',
        '其他': 'info'
    }
    return typeMap[category] || ''
}

const editTransaction = (transaction: Transaction) => {
    ElMessage.info('编辑功能开发中...')
    // TODO: 实现编辑功能
}

const deleteTransaction = async (transaction: Transaction) => {
    try {
        await ElMessageBox.confirm(
            `确定要删除这条交易记录吗？`,
            '确认删除',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )

        transactionStore.removeTransaction(transaction.id)
        ElMessage.success('删除成功！')
    } catch {
        // 用户取消删除
    }
}

const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
}

const handleCurrentChange = (val: number) => {
    currentPage.value = val
}
</script>

<style lang="scss" scoped>
.expense-amount {
    color: #f56565;
    font-weight: 500;
}

.income-amount {
    color: #48bb78;
    font-weight: 500;
}

.pagination-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

:deep(.el-table) {
    border-radius: 8px;
    overflow: hidden;
}

:deep(.el-table__header) {
    background: #f8f9fa;
}
</style>