<template>
    <div class="page-container">
        <div class="page-header">
            <h1>消费统计</h1>
            <p>月度年度消费趋势分析</p>
        </div>

        <div class="page-content">
            <el-tabs v-model="activeTab" type="card" class="statistics-tabs">
                <el-tab-pane label="月度统计" name="monthly">
                    <div class="simple-stats">
                        <h3>月度统计</h3>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="stat-item">
                                    <div class="stat-number">¥3,247</div>
                                    <div class="stat-label">本月支出</div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="stat-item">
                                    <div class="stat-number">28</div>
                                    <div class="stat-label">交易笔数</div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="stat-item">
                                    <div class="stat-number">¥116</div>
                                    <div class="stat-label">日均支出</div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="stat-item">
                                    <div class="stat-number">65%</div>
                                    <div class="stat-label">预算使用率</div>
                                </div>
                            </el-col>
                        </el-row>

                        <div class="chart-placeholder">
                            <el-icon size="48" style="color: #ccc;">
                                <TrendCharts />
                            </el-icon>
                            <p style="color: #999; margin-top: 10px;">月度趋势图表</p>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="年度统计" name="yearly">
                    <div class="simple-stats">
                        <h3>年度统计</h3>
                        <el-table :data="yearlyData" style="width: 100%" stripe>
                            <el-table-column prop="year" label="年份" width="120" />
                            <el-table-column prop="total" label="总支出">
                                <template #default="scope">
                                    ¥{{ scope.row.total.toLocaleString() }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="average" label="月均支出">
                                <template #default="scope">
                                    ¥{{ scope.row.average.toLocaleString() }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="growth" label="增长率">
                                <template #default="scope">
                                    <el-tag :type="scope.row.growth > 0 ? 'danger' : 'success'">
                                        {{ scope.row.growth > 0 ? '+' : '' }}{{ scope.row.growth }}%
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="分类统计" name="category">
                    <div class="simple-stats">
                        <h3>分类统计</h3>
                        <el-table :data="categoryData" style="width: 100%" stripe>
                            <el-table-column prop="category" label="分类" width="120">
                                <template #default="scope">
                                    <el-tag>{{ scope.row.category }}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="amount" label="金额">
                                <template #default="scope">
                                    ¥{{ scope.row.amount.toLocaleString() }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="percentage" label="占比">
                                <template #default="scope">
                                    {{ scope.row.percentage }}%
                                </template>
                            </el-table-column>
                            <el-table-column prop="count" label="笔数">
                                <template #default="scope">
                                    {{ scope.row.count }}笔
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TrendCharts } from '@element-plus/icons-vue'

const activeTab = ref('monthly')

const yearlyData = ref([
    { year: '2022', total: 32000, average: 2667, growth: 0 },
    { year: '2023', total: 38000, average: 3167, growth: 18.75 },
    { year: '2024', total: 42000, average: 3500, growth: 10.53 }
])

const categoryData = ref([
    { category: '餐饮', amount: 1200, percentage: 35.2, count: 45 },
    { category: '交通', amount: 680, percentage: 20.0, count: 38 },
    { category: '购物', amount: 850, percentage: 25.0, count: 12 },
    { category: '娱乐', amount: 450, percentage: 13.2, count: 8 },
    { category: '其他', amount: 220, percentage: 6.6, count: 15 }
])
</script>

<style lang="scss" scoped>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    min-height: calc(100vh - 40px);
    overflow: hidden;
}

.page-header {
    padding: 30px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    text-align: center;

    h1 {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        opacity: 0.9;
    }
}

.page-content {
    padding: 30px;
}

.statistics-tabs {
    :deep(.el-tabs__header) {
        margin-bottom: 30px;
    }

    :deep(.el-tabs__item) {
        font-size: 16px;
        font-weight: 500;
    }
}

.simple-stats {
    h3 {
        margin-bottom: 20px;
        color: #333;
        font-size: 18px;
    }
}

.stat-item {
    text-align: center;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    color: white;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .stat-number {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .stat-label {
        font-size: 12px;
        opacity: 0.9;
    }
}

.chart-placeholder {
    text-align: center;
    padding: 60px 20px;
    background: #f8f9fa;
    border-radius: 15px;
    margin-top: 30px;
    border: 2px dashed #ddd;
}

:deep(.el-table) {
    border-radius: 10px;
    overflow: hidden;
}

:deep(.el-table__header) {
    background: #f8f9fa;
}
</style>