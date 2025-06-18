<template>
    <div class="page-container">
      <PageHeader
        title="AI智能记账"
        subtitle="语音、图片、文字多模态交互"
      />
      
      <div class="page-content">
        <div class="chat-container">
          <ChatMessages />
          <ChatInput />
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import ChatMessages from './components/ChatMessages.vue'
import ChatInput from './components/ChatInput.vue'
</script>

<style lang="scss" scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 600px;
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>


