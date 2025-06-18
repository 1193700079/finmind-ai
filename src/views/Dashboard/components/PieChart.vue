<template>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useTransactionStore } from '@/stores/transaction'

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

    const categoryStats = transactionStore.categoryStats
    const data = Object.entries(categoryStats).map(([name, value]) => ({
        name,
        value
    }))

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
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
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold',
                        formatter: '{b}\n¥{c}'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data,
                color: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe',
                    '#00f2fe',
                    '#43e97b',
                    '#38f9d7'
                ]
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