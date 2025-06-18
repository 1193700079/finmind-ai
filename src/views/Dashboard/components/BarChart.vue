<template>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useTransactionStore } from '@/stores/transaction'
import dayjs from 'dayjs'

const chartRef = ref<HTMLDivElement>()
const transactionStore = useTransactionStore()

let chart: echarts.ECharts | null = null

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

    // 生成最近15天的数据
    const days = Array.from({ length: 15 }, (_, i) => {
        return dayjs().subtract(14 - i, 'day')
    })

    const data = days.map(day => {
        const dateStr = day.format('YYYY-MM-DD')
        return transactionStore.transactions
            .filter(t => t.date === dateStr && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
    })

    const dayLabels = days.map(day => day.format('MM-DD'))

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '日期: {b}<br/>支出: ¥{c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dayLabels,
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#ddd'
                }
            },
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        series: [
            {
                name: '每日支出',
                type: 'bar',
                data: data,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#667eea' },
                        { offset: 1, color: '#764ba2' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#5a6fd8' },
                            { offset: 1, color: '#6a4190' }
                        ])
                    }
                }
            }
        ]
    }

    chart.setOption(option)
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 400px;
}
</style>
  
