<template>
    <div class="yearly-stats">
        <div class="stats-controls">
            <el-radio-group v-model="viewType">
                <el-radio-button label="bar">柱状图</el-radio-button>
                <el-radio-button label="line">折线图</el-radio-button>
            </el-radio-group>
        </div>

        <div class="chart-container">
            <div ref="chartRef" class="chart"></div>
        </div>

        <div class="yearly-comparison">
            <h4>年度对比</h4>
            <el-table :data="yearlyData" style="width: 100%">
                <el-table-column prop="year" label="年份" width="100" />
                <el-table-column prop="total" label="总支出" width="120">
                    <template #default="scope">
                        ¥{{ scope.row.total.toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="average" label="月均支出" width="120">
                    <template #default="scope">
                        ¥{{ scope.row.average.toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="growth" label="增长率" width="100">
                    <template #default="scope">
                        <span :style="{ color: scope.row.growth > 0 ? '#f56565' : '#48bb78' }">
                            {{ scope.row.growth > 0 ? '+' : '' }}{{ scope.row.growth }}%
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="trend" label="趋势" min-width="150">
                    <template #default="scope">
                        <el-tag :type="getTrendType(scope.row.growth)">
                            {{ getTrendText(scope.row.growth) }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()
const viewType = ref('bar')

let chart: echarts.ECharts | null = null

const yearlyData = ref([
    { year: '2022', total: 32000, average: 2667, growth: 0 },
    { year: '2023', total: 38000, average: 3167, growth: 18.75 },
    { year: '2024', total: 42000, average: 3500, growth: 10.53 }
])

onMounted(() => {
    if (chartRef.value) {
        chart = echarts.init(chartRef.value)
        updateChart()
        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    if (chart) {
        chart.dispose()
    }
    window.removeEventListener('resize', handleResize)
})

watch(viewType, updateChart)

const handleResize = () => {
    if (chart) {
        chart.resize()
    }
}

const updateChart = () => {
    if (!chart) return

    const years = yearlyData.value.map(item => item.year)
    const data = yearlyData.value.map(item => item.total)

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}年: ¥{c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: years
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        series: [
            {
                type: viewType.value,
                data: data,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#667eea' },
                        { offset: 1, color: '#764ba2' }
                    ])
                },
                ...(viewType.value === 'line' ? {
                    smooth: true,
                    lineStyle: { width: 3 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
                            { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
                        ])
                    }
                } : {})
            }
        ]
    }

    chart.setOption(option)
}

const getTrendType = (growth: number) => {
    if (growth > 10) return 'danger'
    if (growth > 0) return 'warning'
    return 'success'
}

const getTrendText = (growth: number) => {
    if (growth > 10) return '增长较快'
    if (growth > 0) return '稳步增长'
    return '支出减少'
}
</script>

<style lang="scss" scoped>
.yearly-stats {
    .stats-controls {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .chart {
        width: 100%;
        height: 400px;
    }

    .yearly-comparison {
        margin-top: 30px;

        h4 {
            margin-bottom: 15px;
            color: #333;
            font-size: 16px;
        }
    }
}
</style>
  
