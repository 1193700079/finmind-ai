<template>
    <el-card shadow="hover" class="budget-status">
        <template #header>
            <div class="card-header">
                <span>预算状态</span>
                <el-button type="text" @click="$router.push('/settings')" class="settings-btn">
                    设置
                </el-button>
            </div>
        </template>

        <div class="budget-content">
            <el-progress :percentage="budgetPercentage" :color="getBudgetColor(budgetPercentage / 100)"
                :stroke-width="12" class="budget-progress" />

            <div class="budget-details">
                <div class="budget-item">
                    <span class="label">已用</span>
                    <span class="value">¥{{ monthlyExpense.toLocaleString() }}</span>
                </div>
                <div class="budget-item">
                    <span class="label">预算</span>
                    <span class="value">¥{{ settings.monthlyBudget.toLocaleString() }}</span>
                </div>
                <div class="budget-item">
                    <span class="label">剩余</span>
                    <span class="value remaining">¥{{ remainingBudget.toLocaleString() }}</span>
                </div>
            </div>

            <div class="budget-tips" v-if="budgetPercentage > 80">
                <el-alert :title="budgetTip" type="warning" :closable="false" show-icon />
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useUserStore } from '@/stores/user'

const transactionStore = useTransactionStore()
const userStore = useUserStore()

const { monthlyExpense } = transactionStore
const { settings } = userStore

const budgetPercentage = computed(() => {
    return Math.round((monthlyExpense / settings.monthlyBudget) * 100)
})

const remainingBudget = computed(() => {
    return Math.max(0, settings.monthlyBudget - monthlyExpense)
})

const budgetTip = computed(() => {
    if (budgetPercentage.value >= 100) {
        return '本月预算已超支，建议控制支出'
    } else if (budgetPercentage.value > 90) {
        return '预算即将用完，请注意控制支出'
    } else {
        return '预算使用率较高，建议合理规划支出'
    }
})

const getBudgetColor = (ratio: number) => {
    if (ratio < 0.5) return '#67c23a'
    if (ratio < 0.8) return '#e6a23c'
    return '#f56c6c'
}
</script>

<style lang="scss" scoped>
.budget-status {
    height: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.settings-btn {
    color: #667eea;
    padding: 0;
}

.budget-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.budget-progress {
    margin: 10px 0;
}

.budget-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.budget-item {
    text-align: center;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;

    .label {
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 4px;
    }

    .value {
        display: block;
        font-weight: bold;
        font-size: 16px;

        &.remaining {
            color: #67c23a;
        }
    }
}

.budget-tips {
    margin-top: 10px;
}
</style>