// 1. 修复统计页面移动端适配 - src/views/Statistics/Index.vue
<template>
    <div class="page-container">
        <div class="page-header">
            <h1 class="page-title">消费统计</h1>
            <p class="page-subtitle">月度年度消费趋势分析</p>
        </div>

        <div class="page-content">
            <el-tabs v-model="activeTab" type="card" class="statistics-tabs">
                <el-tab-pane label="月度统计" name="monthly">
                    <div class="monthly-stats">
                        <!-- 移动端优化的统计卡片 -->
                        <div class="stats-grid">
                            <div class="stat-card" v-for="item in monthlyStats" :key="item.label">
                                <div class="stat-value">{{ item.value }}</div>
                                <div class="stat-label">{{ item.label }}</div>
                            </div>
                        </div>

                        <!-- 简化的月度数据表格 -->
                        <div class="data-section">
                            <h3 class="section-title">月度明细</h3>
                            <div class="table-wrapper">
                                <el-table :data="monthlyData" style="width: 100%" size="small">
                                    <el-table-column prop="month" label="月份" width="80" />
                                    <el-table-column prop="amount" label="支出" align="right">
                                        <template #default="scope">
                                            <span class="amount-text">¥{{ scope.row.amount.toLocaleString() }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="change" label="变化" width="80" align="center">
                                        <template #default="scope">
                                            <el-tag :type="scope.row.change > 0 ? 'danger' : 'success'" size="small">
                                                {{ scope.row.change > 0 ? '+' : '' }}{{ scope.row.change }}%
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="年度统计" name="yearly">
                    <div class="yearly-stats">
                        <div class="data-section">
                            <h3 class="section-title">年度对比</h3>
                            <div class="table-wrapper">
                                <el-table :data="yearlyData" style="width: 100%" size="small">
                                    <el-table-column prop="year" label="年份" width="80" />
                                    <el-table-column prop="total" label="总支出" align="right">
                                        <template #default="scope">
                                            <span class="amount-text">¥{{ scope.row.total.toLocaleString() }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="growth" label="增长率" width="90" align="center">
                                        <template #default="scope">
                                            <el-tag :type="scope.row.growth > 0 ? 'danger' : 'success'" size="small">
                                                {{ scope.row.growth > 0 ? '+' : '' }}{{ scope.row.growth }}%
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="分类统计" name="category">
                    <div class="category-stats">
                        <div class="data-section">
                            <h3 class="section-title">分类详情</h3>
                            <div class="category-grid">
                                <div class="category-card" v-for="item in categoryData" :key="item.category">
                                    <div class="category-header">
                                        <el-tag :color="getCategoryColor(item.category)" class="category-tag">
                                            {{ item.category }}
                                        </el-tag>
                                        <span class="category-percentage">{{ item.percentage }}%</span>
                                    </div>
                                    <div class="category-amount">¥{{ item.amount.toLocaleString() }}</div>
                                    <div class="category-count">{{ item.count }}笔交易</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('monthly')

const monthlyStats = ref([
    { label: '本月支出', value: '¥3,247' },
    { label: '交易笔数', value: '28' },
    { label: '日均支出', value: '¥116' },
    { label: '预算使用率', value: '65%' }
])

const monthlyData = ref([
    { month: '1月', amount: 2800, change: 0 },
    { month: '2月', amount: 3200, change: 14.3 },
    { month: '3月', amount: 2900, change: -9.4 },
    { month: '4月', amount: 3400, change: 17.2 },
    { month: '5月', amount: 3100, change: -8.8 },
    { month: '6月', amount: 3247, change: 4.7 }
])

const yearlyData = ref([
    { year: '2022', total: 32000, growth: 0 },
    { year: '2023', total: 38000, growth: 18.75 },
    { year: '2024', total: 42000, growth: 10.53 }
])

const categoryData = ref([
    { category: '餐饮', amount: 1200, percentage: 35.2, count: 45 },
    { category: '交通', amount: 680, percentage: 20.0, count: 38 },
    { category: '购物', amount: 850, percentage: 25.0, count: 12 },
    { category: '娱乐', amount: 450, percentage: 13.2, count: 8 },
    { category: '其他', amount: 220, percentage: 6.6, count: 15 }
])

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        '餐饮': '#667eea',
        '交通': '#764ba2',
        '购物': '#f093fb',
        '娱乐': '#f5576c',
        '其他': '#4facfe'
    }
    return colors[category] || '#999'
}
</script>

<style lang="scss" scoped>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    min-height: calc(100vh - 40px);

    @media (max-width: 768px) {
        margin: 0;
        min-height: 100vh;
        border-radius: 0;
        box-shadow: none;
    }
}

.page-header {
    padding: 30px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    text-align: center;
    border-radius: 20px 20px 0 0;

    @media (max-width: 768px) {
        padding: 20px 15px;
        border-radius: 0;
    }
}

.page-title {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 10px 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 20px;
        font-weight: 500;
    }
}

.page-subtitle {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 12px;
    }
}

.page-content {
    padding: 30px;

    @media (max-width: 768px) {
        padding: 15px;
    }
}

.statistics-tabs {
    :deep(.el-tabs__header) {
        margin-bottom: 20px;
    }

    :deep(.el-tabs__item) {
        font-size: 16px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

        @media (max-width: 768px) {
            font-size: 14px;
            padding: 0 15px;
        }
    }
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 15px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
}

.stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 20px;
    color: white;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        padding: 15px 10px;
        border-radius: 10px;
    }
}

.stat-value {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 6px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 4px;
    }
}

.stat-label {
    font-size: 12px;
    opacity: 0.9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 11px;
    }
}

.data-section {
    margin-top: 25px;

    @media (max-width: 768px) {
        margin-top: 20px;
    }
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
    }
}

.table-wrapper {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
        padding: 10px;
        border-radius: 8px;
    }
}

.amount-text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 500;
    color: #333;

    @media (max-width: 768px) {
        font-size: 13px;
    }
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}

.category-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 10px;
    }
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.category-tag {
    font-size: 12px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.category-percentage {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 13px;
    }
}

.category-amount {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 18px;
        font-weight: 500;
    }
}

.category-count {
    font-size: 12px;
    color: #999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 11px;
    }
}

// Element UI 组件移动端优化
:deep(.el-table) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 12px;

        .el-table__cell {
            padding: 8px 5px;
            font-size: 12px;
        }

        .el-table__header {
            font-size: 12px;
            font-weight: 500;
        }
    }
}

:deep(.el-tag) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 2px 6px;
        height: auto;
        line-height: 1.4;
    }
}
</style>
