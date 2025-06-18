<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:09:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:10:04
 * @FilePath: /finmind-ai/src/views/Home/Index.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="page-container">
        <PageHeader title="今日概览" :subtitle="currentDateString" />

        <div class="page-content">
            <!-- 统计卡片 -->
            <div class="stats-grid">
                <StatCard :value="`¥${todayExpense.toLocaleString()}`" label="今日支出" @click="$router.push('/chat')" />
                <StatCard :value="`¥${settings.monthlyBudget.toLocaleString()}`" label="月度预算" />
                <StatCard :value="`${budgetPercentage}%`" label="预算使用率" />
                <StatCard :value="monthlyTransactionCount" label="本月交易" />
            </div>

            <!-- 图表 -->
            <ChartContainer title="支出趋势">
                <ExpenseTrendChart />
            </ChartContainer>

            <!-- 信息卡片 -->
            <div class="info-grid">
                <RecentTransactions />
                <BudgetStatus />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'

import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import ExpenseTrendChart from './components/ExpenseTrendChart.vue'
import RecentTransactions from './components/RecentTransactions.vue'
import BudgetStatus from './components/BudgetStatus.vue'

const transactionStore = useTransactionStore()
const userStore = useUserStore()

const { todayExpense, monthlyExpense, monthlyTransactionCount } = transactionStore
const { settings } = userStore

const currentDateString = computed(() => {
    return dayjs().locale('zh-cn').format('dddd, YYYY年MM月DD日')
})

const budgetPercentage = computed(() => {
    return Math.round((monthlyExpense / settings.monthlyBudget) * 100)
})
</script>

<style lang="scss" scoped>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>
