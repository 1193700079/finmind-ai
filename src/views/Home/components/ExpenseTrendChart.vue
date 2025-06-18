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

    // 生成最近7天的数据
    const days = Array.from({ length: 7 }, (_, i) => {
        return dayjs().subtract(6 - i, 'day').format('MM-DD')
    })

    const data = days.map(day => {
        const fullDate = dayjs().year() + '-' + day
        return transactionStore.transactions
            .filter(t => t.date === fullDate && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
    })

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
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
            data: days
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '支出金额',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 3
                },
                areaStyle: {
                    opacity: 0.3,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(102, 126, 234, 0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(102, 126, 234, 0.1)'
                        }
                    ])
                },
                itemStyle: {
                    color: '#667eea'
                },
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
    height: 300px;
}
</style>
  
