<template>
    <div :class="['progress-container', `progress-${variant}`]">
      <div v-if="label" class="progress-label">
        <span class="label-text">{{ label }}</span>
        <span class="label-value">{{ displayValue }}</span>
      </div>
      
      <div class="progress-track">
        <div class="track-background">
          <div class="track-pattern"></div>
        </div>
        
        <div 
          class="progress-fill"
          :style="{ width: animatedPercentage + '%' }"
        >
          <div class="fill-gradient"></div>
          <div class="fill-shine"></div>
          <div class="fill-particles">
            <div v-for="i in 5" :key="i" class="particle"></div>
          </div>
        </div>
        
        <div class="progress-thumb" :style="{ left: animatedPercentage + '%' }">
          <div class="thumb-inner">
            <div class="thumb-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  
  interface Props {
    value: number
    max?: number
    label?: string
    variant?: 'linear' | 'circular' | 'wave'
    showValue?: boolean
    animated?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    max: 100,
    variant: 'linear',
    showValue: true,
    animated: true
  })
  
  const animatedPercentage = ref(0)
  
  const percentage = computed(() => {
    return Math.min(Math.max((props.value / props.max) * 100, 0), 100)
  })
  
  const displayValue = computed(() => {
    if (props.showValue) {
      return `${Math.round(props.value)}/${props.max}`
    }
    return `${Math.round(percentage.value)}%`
  })
  
  watch(() => props.value, () => {
    if (props.animated) {
      animateProgress()
    } else {
      animatedPercentage.value = percentage.value
    }
  }, { immediate: true })
  
  const animateProgress = () => {
    const start = animatedPercentage.value
    const end = percentage.value
    const duration = 1000
    const startTime = Date.now()
  
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // 使用 easeOutCubic 缓动函数
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      animatedPercentage.value = start + (end - start) * easeOutCubic
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }
  
  onMounted(() => {
    if (props.animated) {
      animateProgress()
    } else {
      animatedPercentage.value = percentage.value
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .progress-container {
    width: 100%;
    
    &.progress-linear {
      .progress-track {
        height: 12px;
        border-radius: 6px;
      }
    }
  }
  
  .progress-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    .label-text {
      color: white;
      font-size: 14px;
      font-weight: 600;
    }
    
    .label-value {
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      font-weight: 500;
      font-family: 'SF Mono', Menlo, monospace;
    }
  }
  
  .progress-track {
    position: relative;
    background: rgba(255, 255, 255, 0.1);
    border-radius: inherit;
    overflow: hidden;
    box-shadow: 
      inset 0 2px 4px rgba(0, 0, 0, 0.2),
      0 1px 2px rgba(255, 255, 255, 0.1);
  }
  
  .track-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  
  .track-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(45deg, 
        rgba(255, 255, 255, 0.05) 25%, 
        transparent 25%),
      linear-gradient(-45deg, 
        rgba(255, 255, 255, 0.05) 25%, 
        transparent 25%);
    background-size: 8px 8px;
    opacity: 0.5;
  }
  
  .progress-fill {
    position: relative;
    height: 100%;
    border-radius: inherit;
    transition: width 0.1s ease;
    overflow: hidden;
  }
  
  .fill-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: inherit;
  }
  
  .fill-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    animation: shine 2s ease-in-out infinite;
  }
  
  .fill-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: particleMove 3s linear infinite;
    
    &:nth-child(1) { top: 20%; animation-delay: 0s; }
    &:nth-child(2) { top: 40%; animation-delay: 0.5s; }
    &:nth-child(3) { top: 60%; animation-delay: 1s; }
    &:nth-child(4) { top: 80%; animation-delay: 1.5s; }
    &:nth-child(5) { top: 50%; animation-delay: 2s; }
  }
  
  .progress-thumb {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    transition: left 0.1s ease;
  }
  
  .thumb-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 50%;
    box-shadow: 
      0 2px 8px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(102, 126, 234, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
    }
  }
  
  .thumb-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes shine {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
  
  @keyframes particleMove {
    0% {
      left: 0;
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      left: 100%;
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
  </style>