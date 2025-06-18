/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-06-19 01:06:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-06-19 01:07:05
 * @FilePath: /finmind-ai/src/types/index.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
export interface Transaction {
    id: string
    date: string
    description: string
    category: string
    amount: number
    type: 'expense' | 'income'
}

export interface BudgetInfo {
    monthly: number
    used: number
    remaining: number
    percentage: number
}

export interface ChatMessage {
    id: string
    type: 'user' | 'ai'
    content: string
    timestamp: Date
}

export interface UserProfile {
    id: string
    nickname: string
    email: string
    phone: string
    avatar: string
}

export interface AppSettings {
    monthlyBudget: number
    budgetAlert: boolean
    alertThreshold: number
    dailyReminder: boolean
    reminderTime: string
    weeklyReport: boolean
    telegramBot: boolean
    botToken: string
    chatId: string
    theme: 'light' | 'dark' | 'auto'
    currency: string
    autoCategory: boolean
}