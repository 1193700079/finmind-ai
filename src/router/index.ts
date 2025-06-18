/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:06:36
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:06:45
 * @FilePath: /finmind-ai/src/router/index.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home/Index.vue'),
                meta: { title: '首页', icon: 'House' }
            },
            {
                path: '/chat',
                name: 'Chat',
                component: () => import('@/views/Chat/Index.vue'),
                meta: { title: 'AI对话', icon: 'ChatDotRound' }
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard/Index.vue'),
                meta: { title: '看板', icon: 'PieChart' }
            },
            {
                path: '/statistics',
                name: 'Statistics',
                component: () => import('@/views/Statistics/Index.vue'),
                meta: { title: '统计', icon: 'TrendCharts' }
            },
            {
                path: '/import',
                name: 'Import',
                component: () => import('@/views/Import/Index.vue'),
                meta: { title: '账单导入', icon: 'Upload' }
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('@/views/Profile/Index.vue'),
                meta: { title: '个人信息', icon: 'User' }
            },
            {
                path: '/settings',
                name: 'Settings',
                component: () => import('@/views/Settings/Index.vue'),
                meta: { title: '设置', icon: 'Setting' }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router