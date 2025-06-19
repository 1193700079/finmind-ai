<template>
    <div 
      :class="['animated-card', `card-${variant}`, { 'card-hover': isHovering }]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    >
      <div class="card-border"></div>
      <div class="card-inner">
        <div class="card-background">
          <div class="bg-gradient"></div>
          <div class="bg-pattern"></div>
        </div>
        
        <div class="card-content">
          <div v-if="icon" class="card-icon">
            <div class="icon-container">
              <span class="icon">{{ icon }}</span>
              <div class="icon-glow"></div>
            </div>
          </div>
          
          <div class="card-body">
            <h3 v-if="title" class="card-title">{{ title }}</h3>
            <p v-if="description" class="card-description">{{ description }}</p>
            <div v-if="value" class="card-value">{{ value }}</div>
            <slot />
          </div>
          
          <div v-if="showArrow" class="card-arrow">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
        
        <div class="card-shine"></div>
      </div>
      
      <!-- 悬浮粒子效果 -->
      <div class="card-particles">
        <div v-for="i in 8" :key="i" class="floating-particle"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface Props {
    title?: string
    description?: string
    value?: string
    icon?: string
    variant?: 'glass' | 'gradient' | 'neon' | 'minimal'
    clickable?: boolean
    showArrow?: boolean
  }
  
  interface Emits {
    (e: 'click'): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'glass',
    clickable: false,
    showArrow: false
  })
  
  const emit = defineEmits<Emits>()
  
  const isHovering = ref(false)
  
  const handleMouseEnter = () => {
    isHovering.value = true
  }
  
  const handleMouseLeave = () => {
    isHovering.value = false
  }
  
  const handleClick = () => {
    if (props.clickable) {
      emit('click')
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .animated-card {
    position: relative;
    width: 100%;
    min-height: 120px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
  
    &:hover {
      transform: translateY(-8px) rotateX(5deg);
    }
  
    &.card-glass {
      .card-inner {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
  
      &:hover .card-inner {
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 
          0 20px 40px rgba(0, 0, 0, 0.1),
          0 0 50px rgba(102, 126, 234, 0.3);
      }
    }
  
    &.card-gradient {
      .card-inner {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.2) 0%,
          rgba(118, 75, 162, 0.2) 100%
        );
        border: 1px solid rgba(102, 126, 234, 0.3);
      }
  
      &:hover .card-inner {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.4) 0%,
          rgba(118, 75, 162, 0.4) 100%
        );
        box-shadow: 
          0 20px 40px rgba(102, 126, 234, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
    }
  
    &.card-neon {
      .card-inner {
        background: rgba(0, 0, 0, 0.8);
        border: 2px solid #00ffff;
        box-shadow: 
          0 0 20px rgba(0, 255, 255, 0.3),
          inset 0 0 20px rgba(0, 255, 255, 0.1);
      }
  
      &:hover .card-inner {
        box-shadow: 
          0 0 30px rgba(0, 255, 255, 0.6),
          0 0 60px rgba(0, 255, 255, 0.3),
          inset 0 0 30px rgba(0, 255, 255, 0.2);
        border-color: #00ffff;
      }
  
      .card-title {
        color: #00ffff;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
      }
    }
  }
  
  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 70%
    );
    background-size: 200% 200%;
    background-position: -100% -100%;
    transition: all 0.6s ease;
    opacity: 0;
  
    .animated-card:hover & {
      opacity: 1;
      background-position: 100% 100%;
    }
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 18px;
    padding: 24px;
    transition: all 0.4s ease;
    overflow: hidden;
    z-index: 1;
  }
  
  .card-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
  }
  
  .bg-gradient {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
    transform: rotate(0deg);
    transition: transform 0.8s ease;
  
    .card-hover & {
      transform: rotate(180deg);
    }
  }
  
  .bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
    transition: opacity 0.3s ease;
  
    .animated-card:hover & {
      opacity: 0.6;
    }
  }
  
  .card-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    height: 100%;
    z-index: 2;
  }
  
  .card-icon {
    position: relative;
  
    .icon-container {
      position: relative;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      transition: all 0.3s ease;
  
      .animated-card:hover & {
        transform: scale(1.1) rotate(5deg);
        background: rgba(255, 255, 255, 0.2);
      }
    }
  
    .icon {
      font-size: 28px;
      transition: all 0.3s ease;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }
  
    .icon-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 80px;
      background: radial-gradient(
        circle,
        rgba(102, 126, 234, 0.4) 0%,
        transparent 70%
      );
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.4s ease;
  
      .animated-card:hover & {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
  
  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .card-title {
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    transition: all 0.3s ease;
  
    .animated-card:hover & {
      transform: translateX(4px);
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
  }
  
  .card-description {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    margin: 0;
    line-height: 1.4;
    transition: color 0.3s ease;
  
    .animated-card:hover & {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  
  .card-value {
    color: white;
    font-size: 24px;
    font-weight: 700;
    font-family: 'SF Mono', Menlo, monospace;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .card-arrow {
    width: 24px;
    height: 24px;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
  
    .animated-card:hover & {
      color: white;
      transform: translateX(4px);
    }
  
    svg {
      width: 100%;
      height: 100%;
    }
  }
  
  .card-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.6s ease;
  
    .animated-card:hover & {
      left: 100%;
    }
  }
  
  .card-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-radius: inherit;
    overflow: hidden;
  }
  
  .floating-particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    opacity: 0;
  
    .animated-card:hover & {
      animation: floatUp 2s ease-out infinite;
    }
  
    &:nth-child(1) { left: 10%; animation-delay: 0s; }
    &:nth-child(2) { left: 20%; animation-delay: 0.2s; }
    &:nth-child(3) { left: 30%; animation-delay: 0.4s; }
    &:nth-child(4) { left: 40%; animation-delay: 0.6s; }
    &:nth-child(5) { left: 60%; animation-delay: 0.8s; }
    &:nth-child(6) { left: 70%; animation-delay: 1s; }
    &:nth-child(7) { left: 80%; animation-delay: 1.2s; }
    &:nth-child(8) { left: 90%; animation-delay: 1.4s; }
  }
  
  @keyframes floatUp {
    0% {
      bottom: 0;
      opacity: 0;
      transform: translateX(0) scale(0);
    }
    10% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    90% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
    100% {
      bottom: 100%;
      opacity: 0;
      transform: translateX(10px) scale(0);
    }
  }
  
  @media (max-width: 768px) {
    .animated-card {
      &:hover {
        transform: translateY(-4px);
      }
    }
  
    .card-inner {
      padding: 20px;
    }
  
    .card-icon .icon-container {
      width: 48px;
      height: 48px;
    }
  
    .card-icon .icon {
      font-size: 24px;
    }
  
    .card-title {
      font-size: 16px;
    }
  
    .card-value {
      font-size: 20px;
    }
  }
  </style>
  