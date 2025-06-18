<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:16:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:18:01
 * @FilePath: /finmind-ai/src/views/Statistics/Index.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="page-container">
        <PageHeader title="消费统计" subtitle="月度年度消费趋势分析" />

        <div class="page-content">
            <el-tabs v-model="activeTab" type="card" class="statistics-tabs">
                <el-tab-pane label="月度统计" name="monthly">
                    <MonthlyStats />
                </el-tab-pane>
                <el-tab-pane label="年度统计" name="yearly">
                    <YearlyStats />
                </el-tab-pane>
                <el-tab-pane label="分类统计" name="category">
                    <CategoryStats />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import MonthlyStats from './components/MonthlyStats.vue'
import YearlyStats from './components/YearlyStats.vue'
import CategoryStats from './components/CategoryStats.vue'

const activeTab = ref('monthly')
</script>

<style lang="scss" scoped>
.statistics-tabs {
    :deep(.el-tabs__header) {
        margin-bottom: 30px;
    }

    :deep(.el-tabs__item) {
        font-size: 16px;
        font-weight: 500;
    }
}
</style>
