// src/views/Statistics/components/MonthlyStats.vue
<template>
    <div class="monthly-stats">
        <div class="stats-header">
            <el-date-picker v-model="selectedYear" type="year" placeholder="选择年份" format="YYYY年" value-format="YYYY"
                style="width: 150px;" />
        </div>

        <div class="chart-container">
            <div ref="chartRef" class="chart"></div>
        </div>

        <div class="stats-summary">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in summaryData" :key="item.label">
                    <div class="summary-item">
                        <div class="summary-value">{{ item.value }}</div>
                        <div class="summary-label">{{ item.label }}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const chartRef = ref<HTMLDivElement>()
const selectedYear = ref(dayjs().format('YYYY'))

let chart: echarts.ECharts | null = null

const summaryData = computed(() => [
    { label: '年度总支出', value: '¥38,467' },
    { label: '月均支出', value: '¥3,206' },
    { label: '最高月份', value: '8月' },
    { label: '支出增长', value: '+12.5%' }
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

const handleResize = () => {
    if (chart) {
        chart.resize()
    }
}

const updateChart = () => {
    if (!chart) return

    const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`)
    const data = [2800, 3200, 2900, 3400, 3100, 3247, 3580, 3920, 3456, 3234, 3567, 3890]

    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: ¥{c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
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
        series: [
            {
                type: 'line',
                data: data,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#667eea' },
                        { offset: 1, color: '#764ba2' }
                    ])
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(102, 126, 234, 0.3)' },
                        { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
                    ])
                },
                itemStyle: {
                    color: '#667eea'
                }
            }
        ]
    }

    chart.setOption(option)
}
</script>

<style lang="scss" scoped>
.monthly-stats {
    .stats-header {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-end;
    }

    .chart {
        width: 100%;
        height: 400px;
    }

    .stats-summary {
        margin-top: 30px;

        .summary-item {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;

            .summary-value {
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
                margin-bottom: 8px;
            }

            .summary-label {
                font-size: 14px;
                color: #666;
            }
        }
    }
}
</style>
