<!--
 * @Author: yangruiqing “yrq991121@gmail.com”
 * @Date: 2025-06-19 01:33:04
 * @LastEditors: yangruiqing “yrq991121@gmail.com”
 * @LastEditTime: 2025-06-19 20:19:56
 * @FilePath: /finmind-ai/src/layout/components/FloatingButton.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->

<template>
    <div class="ios-bottom-nav">
      <div class="nav-background"></div>
      <div class="nav-items">
        <router-link
          v-for="route in navRoutes"
          :key="route.path"
          :to="route.path"
          class="nav-item"
          active-class="active"
        >
          <div class="nav-icon-container">
            <div class="nav-icon">{{ route.icon }}</div>
            <div class="nav-indicator"></div>
          </div>
          <span class="nav-text">{{ route.title }}</span>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const navRoutes = [
    { path: '/home', title: '首页', icon: '🏠' },
    { path: '/chat', title: 'AI助手', icon: '🤖' },
    { path: '/dashboard', title: '看板', icon: '📊' },
    { path: '/statistics', title: '统计', icon: '📈' },
    { path: '/profile', title: '我的', icon: '👤' }
  ]
  </script>
  
  <style lang="scss" scoped>
  .ios-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    z-index: 1001;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  
  .nav-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.4) 50%, 
        transparent 100%);
    }
  }
  
  .nav-items {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;
    position: relative;
    z-index: 1;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 16px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    min-width: 60px;
  
    &:hover {
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }
  
    &.active {
      color: white;
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 
        0 4px 16px rgba(31, 38, 135, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      
      .nav-icon-container {
        transform: scale(1.1);
      }
      
      .nav-indicator {
        opacity: 1;
        transform: scale(1);
      }
    }
  
    &:active {
      transform: scale(0.95);
    }
  }
  
  .nav-icon-container {
    position: relative;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .nav-icon {
    font-size: 22px;
    margin-bottom: 4px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  }
  
  .nav-indicator {
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .nav-text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }
  </style>
  
  
  