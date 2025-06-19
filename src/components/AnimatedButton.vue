<!-- <template>
    <button 
      :class="['animated-btn', `btn-${variant}`, { 'btn-loading': loading }]"
      @click="handleClick"
      :disabled="disabled || loading"
    >
      <div class="btn-inner">
        <div class="btn-content">
          <div v-if="icon" class="btn-icon">{{ icon }}</div>
          <span v-if="!loading" class="btn-text">{{ text }}</span>
          <div v-if="loading" class="btn-spinner">
            <div class="spinner"></div>
          </div>
        </div>
        <div class="btn-glow"></div>
      </div>
      <div class="btn-particles">
        <div v-for="i in 6" :key="i" class="particle"></div>
      </div>
    </button>
  </template>
  
  <script setup lang="ts">
  interface Props {
    text: string
    icon?: string
    variant?: 'primary' | 'secondary' | 'success' | 'danger'
    loading?: boolean
    disabled?: boolean
  }
  
  interface Emits {
    (e: 'click'): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    loading: false,
    disabled: false
  })
  
  const emit = defineEmits<Emits>()
  
  const handleClick = () => {
    if (!props.disabled && !props.loading) {
      emit('click')
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .animated-btn {
    position: relative;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    outline: none;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  
    // Primary variant
    &.btn-primary {
      .btn-inner {
        background: linear-gradient(
          135deg,
          #667eea 0%,
          rgba(102, 126, 234, 0) 50%
        );
        background-color: rgba(102, 126, 234, 0.2);
        border: 2px solid rgba(102, 126, 234, 0.3);
      }
  
      &:hover:not(:disabled) {
        transform: translateY(-2px) scale(1.05);
        
        .btn-inner {
          background-color: rgba(102, 126, 234, 0.8);
          box-shadow: 
            0 0 30px rgba(102, 126, 234, 0.6),
            0 0 60px rgba(102, 126, 234, 0.3);
          border-color: rgba(102, 126, 234, 0.8);
        }
  
        .btn-glow {
          opacity: 1;
          transform: scale(1.2);
        }
  
        .particle {
          animation: particleFloat 2s ease-out infinite;
        }
      }
  
      &:active:not(:disabled) {
        transform: translateY(0) scale(0.98);
      }
    }
  
    // Success variant
    &.btn-success {
      .btn-inner {
        background: linear-gradient(
          135deg,
          #10b981 0%,
          rgba(16, 185, 129, 0) 50%
        );
        background-color: rgba(16, 185, 129, 0.2);
        border: 2px solid rgba(16, 185, 129, 0.3);
      }
  
      &:hover:not(:disabled) {
        .btn-inner {
          background-color: rgba(16, 185, 129, 0.8);
          box-shadow: 
            0 0 30px rgba(16, 185, 129, 0.6),
            0 0 60px rgba(16, 185, 129, 0.3);
        }
      }
    }
  
    // Danger variant
    &.btn-danger {
      .btn-inner {
        background: linear-gradient(
          135deg,
          #ef4444 0%,
          rgba(239, 68, 68, 0) 50%
        );
        background-color: rgba(239, 68, 68, 0.2);
        border: 2px solid rgba(239, 68, 68, 0.3);
      }
  
      &:hover:not(:disabled) {
        .btn-inner {
          background-color: rgba(239, 68, 68, 0.8);
          box-shadow: 
            0 0 30px rgba(239, 68, 68, 0.6),
            0 0 60px rgba(239, 68, 68, 0.3);
        }
      }
    }
  }
  
  .btn-inner {
    position: relative;
    min-width: 120px;
    height: 48px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    overflow: hidden;
  
    &::before {
      content: '';
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
      transition: left 0.6s;
    }
  
    .animated-btn:hover &::before {
      left: 100%;
    }
  }
  
  .btn-content {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 2;
  }
  
  .btn-icon {
    font-size: 18px;
    transition: transform 0.3s ease;
  }
  
  .btn-text {
    color: white;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  .btn-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    border-radius: inherit;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  .btn-particles {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    opacity: 0;
  
    &:nth-child(1) { top: 20%; left: 20%; }
    &:nth-child(2) { top: 20%; right: 20%; }
    &:nth-child(3) { bottom: 20%; left: 20%; }
    &:nth-child(4) { bottom: 20%; right: 20%; }
    &:nth-child(5) { top: 50%; left: 10%; }
    &:nth-child(6) { top: 50%; right: 10%; }
  }
  
  .btn-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes particleFloat {
    0% {
      opacity: 0;
      transform: translateY(0) scale(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-10px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px) scale(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style> -->

  <template>
    <button
      :class="['uiverse-btn', `btn-${variant}`, { 'btn-loading': loading }]"
      :aria-label="ariaLabel"
      :disabled="disabled || loading"
      @click="handleClick"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <div class="btn-inner">
        <div v-if="icon && !loading" class="btn-icon">
          <component v-if="iconComponent" :is="iconComponent" />
          <span v-else>{{ icon }}</span>
        </div>
        
        <div v-if="loading" class="btn-spinner">
          <svg viewBox="0 0 24 24" class="spinner-icon">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416" stroke-linecap="round">
              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        
        <span v-if="text" class="btn-text">{{ text }}</span>
        
        <div v-if="badge" class="btn-badge">{{ badge }}</div>
      </div>
    </button>
  </template>
  
  <script setup lang="ts">
  interface Props {
    text?: string
    icon?: string
    iconComponent?: any
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'small' | 'medium' | 'large'
    loading?: boolean
    disabled?: boolean
    badge?: string | number
    ariaLabel?: string
  }
  
  interface Emits {
    (e: 'click'): void
    (e: 'focus'): void
    (e: 'blur'): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'medium',
    loading: false,
    disabled: false
  })
  
  const emit = defineEmits<Emits>()
  
  const handleClick = () => {
    if (!props.disabled && !props.loading) {
      emit('click')
    }
  }
  
  const handleFocus = () => {
    emit('focus')
  }
  
  const handleBlur = () => {
    emit('blur')
  }
  </script>
  
  <style scoped>
  .uiverse-btn {
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    outline: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
    /* Size variants */
    &.btn-small {
      width: 100px;
      height: 40px;
      border-radius: 12px;
      
      .btn-inner {
        width: 96px;
        height: 36px;
        border-radius: 10px;
        gap: 8px;
        font-size: 13px;
      }
      
      .btn-icon {
        width: 20px;
        height: 20px;
      }
    }
  
    &.btn-medium {
      width: 131px;
      height: 51px;
      border-radius: 15px;
      
      .btn-inner {
        width: 127px;
        height: 47px;
        border-radius: 13px;
        gap: 12px;
        font-size: 14px;
      }
      
      .btn-icon {
        width: 24px;
        height: 24px;
      }
    }
  
    &.btn-large {
      width: 160px;
      height: 60px;
      border-radius: 18px;
      
      .btn-inner {
        width: 156px;
        height: 56px;
        border-radius: 16px;
        gap: 15px;
        font-size: 16px;
      }
      
      .btn-icon {
        width: 28px;
        height: 28px;
      }
    }
  
    /* Primary variant (blue) */
    &.btn-primary {
      background: linear-gradient(
        to bottom right,
        #2e8eff 0%,
        rgba(46, 142, 255, 0) 30%
      );
      background-color: rgba(46, 142, 255, 0.2);
  
      &:hover,
      &:focus {
        background-color: rgba(46, 142, 255, 0.7);
        box-shadow: 
          0 0 15px rgba(46, 142, 255, 0.5),
          0 4px 20px rgba(46, 142, 255, 0.3);
        transform: translateY(-1px);
      }
  
      &:active {
        transform: translateY(0);
        box-shadow: 
          0 0 10px rgba(46, 142, 255, 0.4),
          0 2px 10px rgba(46, 142, 255, 0.2);
      }
    }
  
    /* Success variant (green) */
    &.btn-success {
      background: linear-gradient(
        to bottom right,
        #10b981 0%,
        rgba(16, 185, 129, 0) 30%
      );
      background-color: rgba(16, 185, 129, 0.2);
  
      &:hover,
      &:focus {
        background-color: rgba(16, 185, 129, 0.7);
        box-shadow: 
          0 0 15px rgba(16, 185, 129, 0.5),
          0 4px 20px rgba(16, 185, 129, 0.3);
        transform: translateY(-1px);
      }
    }
  
    /* Warning variant (orange) */
    &.btn-warning {
      background: linear-gradient(
        to bottom right,
        #f59e0b 0%,
        rgba(245, 158, 11, 0) 30%
      );
      background-color: rgba(245, 158, 11, 0.2);
  
      &:hover,
      &:focus {
        background-color: rgba(245, 158, 11, 0.7);
        box-shadow: 
          0 0 15px rgba(245, 158, 11, 0.5),
          0 4px 20px rgba(245, 158, 11, 0.3);
        transform: translateY(-1px);
      }
    }
  
    /* Danger variant (red) */
    &.btn-danger {
      background: linear-gradient(
        to bottom right,
        #ef4444 0%,
        rgba(239, 68, 68, 0) 30%
      );
      background-color: rgba(239, 68, 68, 0.2);
  
      &:hover,
      &:focus {
        background-color: rgba(239, 68, 68, 0.7);
        box-shadow: 
          0 0 15px rgba(239, 68, 68, 0.5),
          0 4px 20px rgba(239, 68, 68, 0.3);
        transform: translateY(-1px);
      }
    }
  
    /* Info variant (cyan) */
    &.btn-info {
      background: linear-gradient(
        to bottom right,
        #06b6d4 0%,
        rgba(6, 182, 212, 0) 30%
      );
      background-color: rgba(6, 182, 212, 0.2);
  
      &:hover,
      &:focus {
        background-color: rgba(6, 182, 212, 0.7);
        box-shadow: 
          0 0 15px rgba(6, 182, 212, 0.5),
          0 4px 20px rgba(6, 182, 212, 0.3);
        transform: translateY(-1px);
      }
    }
  
    /* Secondary variant (purple) */
    &.btn-secondary {
      background: linear-gradient(
        to bottom right,
        #8b5cf6 0%,
        rgba(139, 92, 246, 0) 30%
      );
      background-color: rgba(139, 92, 246, 0.2);
  
      &:hover,
      &:focus {
        background-color: rgba(139, 92, 246, 0.7);
        box-shadow: 
          0 0 15px rgba(139, 92, 246, 0.5),
          0 4px 20px rgba(139, 92, 246, 0.3);
        transform: translateY(-1px);
      }
    }
  
    /* Disabled state */
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
  
    /* Loading state */
    &.btn-loading {
      cursor: wait;
    }
  }
  
  .btn-inner {
    background-color: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    position: relative;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  
    /* Subtle inner glow */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%,
        rgba(255, 255, 255, 0.05) 100%
      );
      border-radius: inherit;
      pointer-events: none;
    }
  
    /* Animated shine effect */
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: left 0.6s ease;
      border-radius: inherit;
    }
  
    .uiverse-btn:hover &::after {
      left: 100%;
    }
  }
  
  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.3s ease;
  
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  
    .uiverse-btn:hover & {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    }
  }
  
  .btn-text {
    white-space: nowrap;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    
    .uiverse-btn:hover & {
      transform: translateX(2px);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
  
  .btn-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  
  .spinner-icon {
    width: 100%;
    height: 100%;
    color: #fff;
  }
  
  .btn-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #ef4444;
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    animation: badgePulse 2s ease-in-out infinite;
  }
  
  /* Animations */
  @keyframes badgePulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .uiverse-btn {
      &.btn-medium {
        width: 120px;
        height: 48px;
        
        .btn-inner {
          width: 116px;
          height: 44px;
          font-size: 13px;
          gap: 10px;
        }
      }
      
      &.btn-large {
        width: 140px;
        height: 54px;
        
        .btn-inner {
          width: 136px;
          height: 50px;
          font-size: 15px;
          gap: 12px;
        }
      }
    }
  }
  
  /* Focus outline for accessibility */
  .uiverse-btn:focus-visible {
    outline: 2px solid rgba(46, 142, 255, 0.8);
    outline-offset: 2px;
  }
  </style>