<template>
    <div class="ios-sidebar">
      <div class="sidebar-background"></div>
      
      <div class="sidebar-header">
        <div class="logo-container">
          <div class="logo-icon">💰</div>
          <div class="logo-text">
            <div class="app-name">MoneyMind AI</div>
            <div class="app-subtitle">智能理财助手</div>
          </div>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="section-title">主要功能</div>
          <router-link
            v-for="route in mainRoutes"
            :key="route.path"
            :to="route.path"
            class="menu-item"
            active-class="active"
            @click="handleMenuClick"
          >
            <div class="menu-icon">{{ route.icon }}</div>
            <span class="menu-text">{{ route.title }}</span>
            <div class="menu-indicator"></div>
          </router-link>
        </div>
        
        <div class="nav-section">
          <div class="section-title">设置</div>
          <router-link
            v-for="route in settingRoutes"
            :key="route.path"
            :to="route.path"
            class="menu-item"
            active-class="active"
            @click="handleMenuClick"
          >
            <div class="menu-icon">{{ route.icon }}</div>
            <span class="menu-text">{{ route.title }}</span>
            <div class="menu-indicator"></div>
          </router-link>
        </div>
      </nav>
  
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">👤</div>
          <div class="user-details">
            <div class="user-name">AI记账用户</div>
            <div class="user-status">高级用户</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['menu-click'])
  
  const mainRoutes = [
    { path: '/home', title: '首页', icon: '🏠' },
    { path: '/chat', title: 'AI对话', icon: '🤖' },
    { path: '/dashboard', title: '数据看板', icon: '📊' },
    { path: '/statistics', title: '统计分析', icon: '📈' },
    { path: '/import', title: '账单导入', icon: '📥' }
  ]
  
  const settingRoutes = [
    { path: '/profile', title: '个人信息', icon: '👤' },
    { path: '/settings', title: '应用设置', icon: '⚙️' }
  ]
  
  const handleMenuClick = () => {
    emit('menu-click')
  }
  </script>
  
  <style lang="scss" scoped>
  .ios-sidebar {
    width: 280px;
    height: 100%;
    position: relative;
    overflow: hidden;
  
    @media (max-width: 768px) {
      width: 320px;
    }
  }
  
  .sidebar-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.4) 50%, 
        transparent 100%);
    }
  }
  
  .sidebar-header {
    padding: 30px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 1;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .logo-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 
      0 4px 16px rgba(31, 38, 135, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  .logo-text {
    flex: 1;
  }
  
  .app-name {
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 2px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .app-subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 500;
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 20px 0;
    overflow-y: auto;
    position: relative;
    z-index: 1;
  }
  
  .nav-section {
    margin-bottom: 32px;
    padding: 0 24px;
  }
  
  .section-title {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    padding-left: 8px;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    margin-bottom: 6px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
  
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.05);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  
    &:hover {
      color: rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.08);
      transform: translateX(4px);
      
      &::before {
        opacity: 1;
      }
    }
  
    &.active {
      color: white;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 
        0 4px 16px rgba(31, 38, 135, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      
      .menu-indicator {
        opacity: 1;
        transform: scale(1);
      }
    }
  
    &:active {
      transform: scale(0.98);
    }
  }
  
  .menu-icon {
    font-size: 20px;
    margin-right: 14px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
  
  .menu-text {
    flex: 1;
    font-weight: 600;
    font-size: 15px;
  }
  
  .menu-indicator {
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .sidebar-footer {
    padding: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 1;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  
  .user-details {
    flex: 1;
  }
  
  .user-name {
    color: white;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .user-status {
    color: rgba(255, 255, 255, 0.6);
    font-size: 11px;
    font-weight: 500;
  }
  </style>