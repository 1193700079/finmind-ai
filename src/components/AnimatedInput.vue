<template>
    <div :class="['input-container', `input-${variant}`, { 'input-focused': isFocused }]">
      <div class="input-wrapper">
        <div class="input-background">
          <div class="bg-shimmer"></div>
        </div>
        
        <div v-if="icon" class="input-icon">
          <span>{{ icon }}</span>
        </div>
        
        <input
          ref="inputRef"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown.enter="handleEnter"
          class="input-field"
        />
        
        <div v-if="label" class="input-label">
          {{ label }}
        </div>
        
        <div class="input-border">
          <div class="border-line"></div>
          <div class="border-glow"></div>
        </div>
        
        <div v-if="showClear && modelValue" class="input-clear" @click="clearInput">
          <span>✕</span>
        </div>
      </div>
      
      <div v-if="error" class="input-error">
        <span class="error-icon">⚠</span>
        <span class="error-text">{{ error }}</span>
      </div>
      
      <div v-if="success" class="input-success">
        <span class="success-icon">✓</span>
        <span class="success-text">{{ success }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface Props {
    modelValue: string
    label?: string
    placeholder?: string
    type?: string
    icon?: string
    variant?: 'glass' | 'neon' | 'minimal'
    disabled?: boolean
    showClear?: boolean
    error?: string
    success?: string
  }
  
  interface Emits {
    (e: 'update:modelValue', value: string): void
    (e: 'enter'): void
    (e: 'focus'): void
    (e: 'blur'): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    variant: 'glass',
    disabled: false,
    showClear: false
  })
  
  const emit = defineEmits<Emits>()
  
  const inputRef = ref<HTMLInputElement>()
  const isFocused = ref(false)
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }
  
  const handleFocus = () => {
    isFocused.value = true
    emit('focus')
  }
  
  const handleBlur = () => {
    isFocused.value = false
    emit('blur')
  }
  
  const handleEnter = () => {
    emit('enter')
  }
  
  const clearInput = () => {
    emit('update:modelValue', '')
    inputRef.value?.focus()
  }
  </script>
  
  <style lang="scss" scoped>
  .input-container {
    position: relative;
    width: 100%;
    
    &.input-glass {
      .input-wrapper {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      &.input-focused .input-wrapper {
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 
          0 8px 32px rgba(102, 126, 234, 0.2),
          0 0 20px rgba(102, 126, 234, 0.3);
        border-color: rgba(102, 126, 234, 0.5);
      }
    }
    
    &.input-neon {
      .input-wrapper {
        background: rgba(0, 0, 0, 0.8);
        border: 2px solid #00ffff;
        box-shadow: 
          0 0 20px rgba(0, 255, 255, 0.3),
          inset 0 0 20px rgba(0, 255, 255, 0.1);
      }
      
      &.input-focused .input-wrapper {
        box-shadow: 
          0 0 30px rgba(0, 255, 255, 0.6),
          0 0 60px rgba(0, 255, 255, 0.3),
          inset 0 0 30px rgba(0, 255, 255, 0.2);
        border-color: #00ffff;
      }
      
      .input-field {
        color: #00ffff;
        
        &::placeholder {
          color: rgba(0, 255, 255, 0.5);
        }
      }
    }
  }
  
  .input-wrapper {
    position: relative;
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    overflow: hidden;
  }
  
  .input-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
  }
  
  .bg-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
    
    .input-focused & {
      left: 100%;
    }
  }
  
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    z-index: 2;
    transition: all 0.3s ease;
    
    .input-focused & {
      color: rgba(255, 255, 255, 0.9);
      transform: translateY(-50%) scale(1.1);
    }
  }
  
  .input-field {
    width: 100%;
    height: 56px;
    padding: 0 20px;
    border: none;
    background: transparent;
    color: white;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    position: relative;
    z-index: 2;
    
    &.has-icon {
      padding-left: 52px;
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      transition: color 0.3s ease;
    }
    
    &:focus::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  .input-label {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1;
    
    .input-focused &,
    .has-value & {
      top: 12px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
      transform: translateY(0);
    }
  }
  
  .input-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    overflow: hidden;
  }
  
  .border-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transform: translateX(-50%);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    .input-focused & {
      width: 100%;
    }
  }
  
  .border-glow {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    filter: blur(2px);
    transform: translateX(-50%);
    transition: width 0.4s ease;
    
    .input-focused & {
      width: 100%;
    }
  }
  
  .input-clear {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }
    
    span {
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
  }
  
  .input-error,
  .input-success {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    animation: slideInUp 0.3s ease;
  }
  
  .input-error {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
  
  .input-success {
    background: rgba(16, 185, 129, 0.15);
    color: #6ee7b7;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  
  .error-icon,
  .success-icon {
    font-size: 14px;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .input-field {
      height: 48px;
      font-size: 14px;
    }
    
    .input-label {
      font-size: 14px;
      
      .input-focused &,
      .has-value & {
        font-size: 11px;
      }
    }
  }
  </style>
  