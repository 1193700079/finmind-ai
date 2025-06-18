<!--
 * @Author: yangruiqing “yrq991121@gmail.com”
 * @Date: 2025-06-19 02:01:33
 * @LastEditors: yangruiqing “yrq991121@gmail.com”
 * @LastEditTime: 2025-06-19 02:01:44
 * @FilePath: /finmind-ai/src/layout/components/MobileBottomNav.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="mobile-bottom-nav">
        <div class="nav-items">
            <router-link v-for="route in navRoutes" :key="route.path" :to="route.path" class="nav-item"
                active-class="active">
                <el-icon class="nav-icon">
                    <component :is="route.meta?.icon" />
                </el-icon>
                <span class="nav-text">{{ route.meta?.title }}</span>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navRoutes = computed(() => {
    const routes = [
        { path: '/home', meta: { title: '首页', icon: 'House' } },
        { path: '/chat', meta: { title: 'AI对话', icon: 'ChatDotRound' } },
        { path: '/dashboard', meta: { title: '看板', icon: 'PieChart' } },
        { path: '/statistics', meta: { title: '统计', icon: 'TrendCharts' } },
        { path: '/profile', meta: { title: '我的', icon: 'User' } }
    ]
    return routes
})
</script>

<style lang="scss" scoped>
.mobile-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-top: 1px solid #eee;
    z-index: 1000;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-items {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 12px;
    text-decoration: none;
    color: #999;
    transition: all 0.3s ease;
    min-width: 60px;

    &:hover {
        color: #667eea;
        background: rgba(102, 126, 234, 0.1);
    }

    &.active {
        color: #667eea;
        background: rgba(102, 126, 234, 0.15);
        font-weight: 500;
    }
}

.nav-icon {
    font-size: 20px;
    margin-bottom: 4px;
}

.nav-text {
    font-size: 11px;
    line-height: 1;
}
</style>
