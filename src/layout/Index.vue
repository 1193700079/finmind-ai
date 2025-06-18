<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:08:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:08:21
 * @FilePath: /finmind-ai/src/layout/Index.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="layout">
        <div class="layout-container">
            <!-- 侧边栏 -->
            <Sidebar />

            <!-- 主内容区 -->
            <div class="content-area">
                <transition name="fade" mode="out-in">
                    <router-view />
                </transition>
            </div>
        </div>

        <!-- 悬浮按钮 -->
        <FloatingButton />
    </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import FloatingButton from './components/FloatingButton.vue'
</script>

<style lang="scss" scoped>
.layout {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
}

.layout-container {
    display: flex;
    height: 100%;
}

.content-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.1);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
