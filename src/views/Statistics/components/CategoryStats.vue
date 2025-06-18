<template>
    <div class="category-stats">
        <div class="stats-controls">
            <el-date-picker v-model="dateRange" type="monthrange" range-separator="至" start-placeholder="开始月份"
                end-placeholder="结束月份" format="YYYY-MM" value-format="YYYY-MM" />
        </div>

        <div class="charts-grid">
            <!-- 分类占比饼图 -->
            <div class="chart-container">
                <h4>分类支出占比</h4>
                <div ref="pieChartRef" class="chart"></div>
            </div>

            <!-- 分类趋势图 -->
            <div class="chart-container">
                <h4>分类支出趋势</h4>
                <div ref="lineChartRef" class="chart"></div>
            </div>
        </div>

        <!-- 分类详情表格 -->
        <div class="category-details">
            <h4>分类详情</h4>
            <el-table :data="categoryDetails" style="width: 100%">
                <el-table-column prop="category" label="分类" width="100">
                    <template #default="scope">
                        <el-tag :color="getCategoryColor(scope.row.category)">
                            {{ scope.row.category }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="金额" width="120" sortable>
                    <template #default="scope">
                        ¥{{ scope.row.amount.toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="percentage" label="占比" width="100" sortable>
                    <template #default="scope">
                        {{ scope.row.percentage }}%
                    </template>
                </el-table-column>
                <el-table-column prop="count" label="笔数" width="80" sortable>
                    <template #default="scope">
                        {{ scope.row.count }}笔
                    </template>
                </el-table-column>
                <el-table-column prop="average" label="平均金额" width="120">
                    <template #default="scope">
                        ¥{{ scope.row.average.toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="trend" label="趋势" min-width="100">
                    <template #default="scope">
                        <el-progress :percentage="scope.row.trendPercentage"
                            :color="scope.row.trendPercentage > 50 ? '#f56565' : '#48bb78'" :stroke-width="8" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const pieChartRef = ref<HTMLDivElement>()
const lineChartRef = ref<HTMLDivElement>()
const dateRange = ref([
    dayjs().subtract(5, 'month').format('YYYY-MM'),
    dayjs().format('YYYY-MM')
])

let pieChart: echarts.ECharts | null = null
let lineChart: echarts.ECharts | null = null

const categoryDetails = computed(() => [
    { category: '餐饮', amount: 1200, percentage: 35.2, count: 45, average: 27, trendPercentage: 75 },
    { category: '交通', amount: 680, percentage: 20.0, count: 38, average: 18, trendPercentage: 45 },
    { category: '购物', amount: 850, percentage: 25.0, count: 12, average: 71, trendPercentage: 65 },
    { category: '娱乐', amount: 450, percentage: 13.2, count: 8, average: 56, trendPercentage: 35 },
    { category: '其他', amount: 220, percentage: 6.6, count: 15, average: 15, trendPercentage: 25 }
])

onMounted(() => {
    if (pieChartRef.value && lineChartRef.value) {
        pieChart = echarts.init(pieChartRef.value)
        lineChart = echarts.init(lineChartRef.value)
        updatePieChart()
        updateLineChart()
        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    if (pieChart) pieChart.dispose()
    if (lineChart) lineChart.dispose()
    window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
    if (pieChart) pieChart.resize()
    if (lineChart) lineChart.resize()
}

const updatePieChart = () => {
    if (!pieChart) return

    const data = categoryDetails.value.map(item => ({
        name: item.category,
        value: item.amount
    }))

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}: ¥{c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center'
        },
        series: [
            {
                name: '支出分类',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '45%'],
                data: data,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}\n{d}%'
                },
                color: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
            }
        ]
    }

    pieChart.setOption(option)
}

const updateLineChart = () => {
    if (!lineChart) return

    const months = ['1月', '2月', '3月', '4月', '5月', '6月']
    const categories = ['餐饮', '交通', '购物', '娱乐']

    const series = categories.map((category, index) => ({
        name: category,
        type: 'line',
        data: [
            Math.floor(Math.random() * 500) + 200,
            Math.floor(Math.random() * 500) + 200,
            Math.floor(Math.random() * 500) + 200,
            Math.floor(Math.random() * 500) + 200,
            Math.floor(Math.random() * 500) + 200,
            Math.floor(Math.random() * 500) + 200
        ],
        smooth: true,
        lineStyle: { width: 3 }
    }))

    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: categories,
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: months
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        series: series,
        color: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
    }

    lineChart.setOption(option)
}

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
.category-stats {
    .stats-controls {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
        margin-bottom: 30px;

        .chart-container {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

            h4 {
                margin-bottom: 15px;
                text-align: center;
                color: #333;
            }
        }
    }

    .chart {
        width: 100%;
        height: 300px;
    }

    .category-details {
        h4 {
            margin-bottom: 15px;
            color: #333;
            font-size: 16px;
        }
    }
}

@media (max-width: 768px) {
    .charts-grid {
        grid-template-columns: 1fr !important;
    }
}
</style>
  
