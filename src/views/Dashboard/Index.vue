<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:15:18
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:15:27
 * @FilePath: /finmind-ai/src/views/Dashboard/Index.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="page-container">
        <PageHeader title="数据看板" subtitle="消费分析与可视化展示" />

        <div class="page-content">
            <div class="dashboard-grid">
                <!-- 支出分类占比图 -->
                <ChartContainer title="支出分类占比">
                    <PieChart />
                </ChartContainer>

                <!-- 月度支出趋势图 -->
                <ChartContainer title="月度支出趋势">
                    <LineChart />
                </ChartContainer>
            </div>

            <!-- 每日消费情况柱状图 -->
            <ChartContainer title="每日消费情况" class="full-width-chart">
                <BarChart />
            </ChartContainer>

            <!-- 数据统计表格 -->
            <div class="data-table-section">
                <h3>详细数据</h3>
                <DataTable />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import ChartContainer from '@/components/ChartContainer.vue'
import PieChart from './components/PieChart.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import DataTable from './components/DataTable.vue'
</script>

<style lang="scss" scoped>
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.full-width-chart {
    margin-bottom: 30px;
}

.data-table-section {
    h3 {
        margin-bottom: 20px;
        color: #333;
        font-size: 18px;
        font-weight: 600;
    }
}

@media (max-width: 768px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
</style>