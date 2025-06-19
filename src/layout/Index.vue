<template>
    <div class="ios-layout">
      <!-- iOS 风格顶部状态栏 (移动端) -->
      <div class="ios-status-bar" v-if="isMobile">
        <div class="status-indicators">
          <span class="time">{{ currentTime }}</span>
          <div class="right-indicators">
            <i class="signal-icon">📶</i>
            <i class="wifi-icon">📶</i>
            <span class="battery">🔋</span>
          </div>
        </div>
      </div>
  
      <!-- iOS 风格导航栏 (移动端) -->
      <div class="ios-nav-bar" v-if="isMobile">
        <div class="nav-bar-content">
          <div class="nav-title">💰 MoneyMind AI</div>
          <button 
            @click="toggleMobileMenu" 
            class="menu-button"
            :class="{ active: showMobileMenu }"
          >
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
          </button>
        </div>
      </div>
  
      <!-- 毛玻璃遮罩层 -->
      <div 
        v-if="isMobile && showMobileMenu" 
        class="glass-overlay"
        @click="closeMobileMenu"
      ></div>
  
      <div class="layout-container">
        <!-- iOS 风格侧边栏 -->
        <Sidebar 
          v-if="!isMobile || showMobileMenu"
          :class="{ 
            'mobile-sidebar': isMobile,
            'mobile-sidebar-open': isMobile && showMobileMenu 
          }"
          @menu-click="closeMobileMenu"
        />
        
        <!-- 主内容区域 -->
        <div class="content-area" :class="{ 'mobile-content': isMobile }">
          <transition name="page-transition" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
  
      <!-- iOS 风格底部导航 (移动端) -->
      <MobileBottomNav v-if="isMobile" />
      
      <!-- 浮动操作按钮 (桌面端) -->
      <div v-if="!isMobile" class="floating-action">
        <button class="fab-button" @click="$router.push('/chat')">
          <i class="fab-icon">💬</i>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import Sidebar from './components/Sidebar.vue'
  import MobileBottomNav from './components/MobileBottomNav.vue'
  
  const isMobile = ref(false)
  const showMobileMenu = ref(false)
  const currentTime = ref('')
  
  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
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
    updateTime()
    window.addEventListener('resize', checkMobile)
    setInterval(updateTime, 1000)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
  </script>
  
  <style lang="scss" scoped>
  .ios-layout {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
  }
  
  .ios-status-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1002;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  
  .status-indicators {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
    font-size: 14px;
    font-weight: 600;
  }
  
  .right-indicators {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  
  .ios-nav-bar {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1001;
  }
  
  .nav-bar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
  }
  
  .nav-title {
    font-size: 18px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .menu-button {
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }
  
    &:active {
      transform: scale(0.95);
    }
  
    &.active {
      .menu-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      .menu-line:nth-child(2) {
        opacity: 0;
      }
      .menu-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  }
  
  .menu-line {
    width: 18px;
    height: 2px;
    background: white;
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .glass-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .layout-container {
    display: flex;
    height: 100vh;
    padding-top: 0;
  
    @media (max-width: 768px) {
      padding-top: 104px; // 状态栏 + 导航栏
    }
  }
  
  .content-area {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.02);
  
    &.mobile-content {
      padding: 20px 15px 90px 15px; // 为底部导航留空间
    }
  }
  
  .mobile-sidebar {
    position: fixed;
    top: 104px;
    left: -320px;
    width: 320px;
    height: calc(100vh - 104px);
    z-index: 1000;
    transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
    &.mobile-sidebar-open {
      left: 0;
    }
  }
  
  .floating-action {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
  }
  
  .fab-button {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 
      0 8px 32px rgba(31, 38, 135, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
    &:hover {
      transform: translateY(-4px) scale(1.1);
      box-shadow: 
        0 16px 40px rgba(31, 38, 135, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.25);
    }
  
    &:active {
      transform: translateY(-2px) scale(1.05);
    }
  }
  
  .fab-icon {
    font-size: 24px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  .page-transition-enter-active,
  .page-transition-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .page-transition-enter-from {
    opacity: 0;
    transform: translateX(20px) scale(0.98);
  }
  
  .page-transition-leave-to {
    opacity: 0;
    transform: translateX(-20px) scale(0.98);
  }
  </style>
  