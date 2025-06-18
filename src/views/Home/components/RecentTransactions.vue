<template>
    <el-card shadow="hover" class="recent-transactions">
        <template #header>
            <div class="card-header">
                <span>最近交易</span>
                <el-button type="text" @click="$router.push('/dashboard')" class="view-more-btn">
                    查看更多
                </el-button>
            </div>
        </template>

        <div class="transaction-list">
            <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-title">{{ transaction.description }}</div>
                    <div class="transaction-meta">
                        <span class="category">{{ transaction.category }}</span>
                        <span class="date">{{ formatDate(transaction.date) }}</span>
                    </div>
                </div>
                <div class="transaction-amount">
                    -¥{{ transaction.amount.toLocaleString() }}
                </div>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { useTransactionStore } from '@/stores/transaction'
import dayjs from 'dayjs'

const transactionStore = useTransactionStore()
const { recentTransactions } = transactionStore

const formatDate = (date: string) => {
    return dayjs(date).format('MM-DD')
}
</script>

<style lang="scss" scoped>
.recent-transactions {
    height: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.view-more-btn {
    color: #667eea;
    padding: 0;
}

.transaction-list {
    max-height: 300px;
    overflow-y: auto;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }
}

.transaction-info {
    flex: 1;
}

.transaction-title {
    font-weight: 500;
    margin-bottom: 4px;
}

.transaction-meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #999;
}

.category {
    padding: 2px 6px;
    background: #f0f4ff;
    border-radius: 4px;
    color: #667eea;
}

.transaction-amount {
    font-weight: bold;
    color: #f56565;
}
</style>