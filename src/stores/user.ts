/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:07:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:07:52
 * @FilePath: /finmind-ai/src/stores/user.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile, AppSettings } from '@/types'

export const useUserStore = defineStore('user', () => {
    const profile = ref<UserProfile>({
        id: '1',
        nickname: 'AI记账用户',
        email: 'user@example.com',
        phone: '138****8888',
        avatar: ''
    })

    const settings = ref<AppSettings>({
        monthlyBudget: 5000,
        budgetAlert: true,
        alertThreshold: 80,
        dailyReminder: true,
        reminderTime: '21:00',
        weeklyReport: true,
        telegramBot: false,
        botToken: '',
        chatId: '',
        theme: 'light',
        currency: 'CNY',
        autoCategory: true
    })

    const updateProfile = (updates: Partial<UserProfile>) => {
        profile.value = { ...profile.value, ...updates }
    }

    const updateSettings = (updates: Partial<AppSettings>) => {
        settings.value = { ...settings.value, ...updates }
    }

    return {
        profile,
        settings,
        updateProfile,
        updateSettings
    }
})
