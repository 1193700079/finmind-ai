<template>
    <div class="fab-container">
      <button 
        :class="['fab-main', { 'fab-open': isOpen }]"
        @click="toggleMenu"
      >
        <div class="fab-inner">
          <div class="fab-icon">
            <transition name="icon-rotate" mode="out-in">
              <span v-if="!isOpen" key="plus">➕</span>
              <span v-else key="close">✕</span>
            </transition>
          </div>
          <div class="fab-ripple"></div>
        </div>
        <div class="fab-glow"></div>
      </button>
  
      <transition-group name="fab-items" tag="div" class="fab-menu">
        <div 
          v-for="(item, index) in menuItems"
          v-show="isOpen"
          :key="item.id"
          class="fab-item"
          :style="{ '--delay': index * 0.1 + 's' }"
          @click="handleItemClick(item)"
        >
          <div class="fab-item-inner">
            <span class="fab-item-icon">{{ item.icon }}</span>
            <div class="fab-item-tooltip">{{ item.label }}</div>
          </div>
        </div>
      </transition-group>
  
      <div v-if="isOpen" class="fab-backdrop" @click="closeMenu"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface MenuItem {
    id: string
    icon: string
    label: string
    action: () => void
  }
  
  interface Props {
    items: MenuItem[]
  }
  
  const props = defineProps<Props>()
  
  const isOpen = ref(false)
  
  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }
  
  const closeMenu = () => {
    isOpen.value = false
  }
  
  const handleItemClick = (item: MenuItem) => {
    item.action()
    closeMenu()
  }
  
  const menuItems = props.items
  </script>
  
  <style lang="scss" scoped>
  .fab-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
  }
  
  .fab-main {
    position: relative;
    width: 64px;
    height: 64px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: none;
    padding: 0;
  
    &:hover {
      transform: scale(1.1);
  
      .fab-glow {
        opacity: 1;
        transform: scale(1.5);
      }
    }
  
    &:active {
      transform: scale(0.95);
    }
  
    &.fab-open {
      transform: rotate(180deg);
  
      .fab-inner {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 
          0 8px 32px rgba(239, 68, 68, 0.4),
          0 0 20px rgba(239, 68, 68, 0.6);
      }
    }
  }
  
  .fab-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 8px 32px rgba(102, 126, 234, 0.3),
      0 0 20px rgba(102, 126, 234, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
  
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 70%
      );
      transform: translateX(-100%);
      transition: transform 0.6s ease;
    }
  
    .fab-main:hover &::before {
      transform: translateX(100%);
    }
  }
  
  .fab-icon {
    position: relative;
    z-index: 2;
    font-size: 24px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .fab-ripple {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  
    .fab-main:active & {
      width: 100%;
      height: 100%;
    }
  }
  
  .fab-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(102, 126, 234, 0.4) 0%,
      transparent 70%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  .fab-menu {
    position: absolute;
    bottom: 80px;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .fab-item {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    animation-delay: var(--delay);
  
    &:hover {
      transform: translateX(-8px) scale(1.05);
  
      .fab-item-tooltip {
        opacity: 1;
        transform: translateX(-8px);
      }
    }
  }
  
  .fab-item-inner {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(102, 126, 234, 0.2);
  
    &:hover {
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.15),
        0 0 30px rgba(102, 126, 234, 0.4);
    }
  }
  
  .fab-item-icon {
    font-size: 20px;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  .fab-item-tooltip {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  
    &::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 6px solid transparent;
      border-left-color: rgba(0, 0, 0, 0.8);
    }
  }
  
  .fab-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: -1;
  }
  
  .icon-rotate-enter-active,
  .icon-rotate-leave-active {
    transition: all 0.3s ease;
  }
  
  .icon-rotate-enter-from {
    opacity: 0;
    transform: rotate(90deg) scale(0.8);
  }
  
  .icon-rotate-leave-to {
    opacity: 0;
    transform: rotate(-90deg) scale(0.8);
  }
  
  .fab-items-enter-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: var(--delay);
  }
  
  .fab-items-leave-active {
    transition: all 0.3s ease;
  }
  
  .fab-items-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  
  .fab-items-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }
  
  @media (max-width: 768px) {
    .fab-container {
      bottom: 90px; // 为移动端底部导航留空间
    }
  }
  </style>
  