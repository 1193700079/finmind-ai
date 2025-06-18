<template>
<div class="layout">
    <!-- 移动端顶部导航栏 -->
    <div class="mobile-header" v-if="isMobile">
      <div class="mobile-header-content">
        <div class="mobile-logo">💰 MoneyMind AI</div>
<el-button @click="toggleMobileMenu" class="menu-toggle" circle size="small">
          <el-icon>
            <Menu v-if="!showMobileMenu" />
            <Close v-else />
          </el-icon>
        </el-button>
</div>
</div>

<!-- 移动端遮罩层 -->
<div v-if="isMobile && showMobileMenu" class="mobile-overlay" @click="closeMobileMenu"></div>

<div class="layout-container">
      <!-- 侧边栏 -->
      <Sidebar 
        :class="{ 
          'mobile-sidebar': isMobile,
          'mobile-sidebar-open': isMobile && showMobileMenu 
        }"
      />
      
      <!-- 主内容区 -->
      <div class="content-area" :class="{ 'mobile-content': isMobile }">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
</div>

<!-- 悬浮按钮 -->
<FloatingButton v-if="!isMobile" />

<!-- 移动端底部导航 -->
<MobileBottomNav v-if="isMobile" />
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'
import Sidebar from './components/Sidebar.vue'
import FloatingButton from './components/FloatingButton.vue'
import MobileBottomNav from './components/MobileBottomNav.vue'

const isMobile = ref(false)
const showMobileMenu = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
    if (!isMobile.value) {
        showMobileMenu.value = false
    }
}

const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
    showMobileMenu.value = false
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})
</script>

<style lang="scss" scoped>
.layout {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
    position: relative;
}

.mobile-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #eee;
    z-index: 1000;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.mobile-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.mobile-logo {
    font-size: 18px;
    font-weight: bold;
    color: #667eea;
}

.menu-toggle {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    color: white;
}

.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
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

    &.mobile-content {
        padding: 80px 10px 80px 10px; // 为顶部和底部导航留空间
    }
}

.mobile-sidebar {
    position: fixed;
    top: 60px;
    left: -280px;
    width: 280px;
    height: calc(100vh - 60px);
    z-index: 999;
    transition: left 0.3s ease;

    &.mobile-sidebar-open {
        left: 0;
    }
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