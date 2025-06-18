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

    // 生成最近6个月的数据
    const months = Array.from({ length: 6 }, (_, i) => {
        return dayjs().subtract(5 - i, 'month').format('YYYY-MM')
    })

    const data = months.map(month => {
        // 模拟月度数据
        const monthData = [2800, 3200, 2900, 3400, 3100, 3247]
        return monthData[months.indexOf(month)] || 0
    })

    const monthLabels = months.map(month => dayjs(month).format('MM月'))

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: '支出: ¥{c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: monthLabels,
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
                name: '月度支出',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: '#667eea' },
                        { offset: 1, color: '#764ba2' }
                    ])
                },
                areaStyle: {
                    opacity: 0.3,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(102, 126, 234, 0.8)' },
                        { offset: 1, color: 'rgba(102, 126, 234, 0.1)' }
                    ])
                },
                itemStyle: {
                    color: '#667eea',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                symbol: 'circle',
                symbolSize: 8,
                data: data
            }
        ]
    }

    chart.setOption(option)
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 350px;
}
</style>
  
