/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:07:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:08:07
 * @FilePath: /finmind-ai/src/stores/chat.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatMessage } from '@/types'

export const useChatStore = defineStore('chat', () => {
    const messages = ref<ChatMessage[]>([
        {
            id: '1',
            type: 'ai',
            content: '你好！我是你的AI记账助手，可以帮你记录消费、分析支出。试试对我说"今天午餐花了35元"',
            timestamp: new Date()
        }
    ])

    const isTyping = ref(false)

    const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        const newMessage: ChatMessage = {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date()
        }
        messages.value.push(newMessage)
    }

    const clearMessages = () => {
        messages.value = []
    }

    return {
        messages,
        isTyping,
        addMessage,
        clearMessages
    }
})