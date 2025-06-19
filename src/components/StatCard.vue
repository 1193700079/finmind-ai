<!--
 * @Author: yangruiqing “yrq991121@gmail.com”
 * @Date: 2025-06-19 01:33:04
 * @LastEditors: yangruiqing “yrq991121@gmail.com”
 * @LastEditTime: 2025-06-19 20:19:06
 * @FilePath: /finmind-ai/src/components/StatCard.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->

<template>
    <div class="stat-card" @click="handleClick">
        <div class="stat-value">{{ value }}</div>
        <div class="stat-label">{{ label }}</div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    value: string | number
    label: string
}

interface Emits {
    (e: 'click'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
    emit('click')
}
</script>

<style lang="scss" scoped>
.stat-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    padding: 25px;
    color: white;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
}

.stat-value {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 14px;
    opacity: 0.9;
}
</style>