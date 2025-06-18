<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:13:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:14:07
 * @FilePath: /finmind-ai/src/components/ChartContainer.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="chart-container">
        <h3 v-if="title" class="chart-title">{{ title }}</h3>
        <slot />
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.chart-container {
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.chart-title {
    margin-bottom: 20px;
    color: #333;
    font-size: 18px;
    font-weight: 600;
}
</style>