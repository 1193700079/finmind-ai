import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction } from '@/types'
import dayjs from 'dayjs'

export const useTransactionStore = defineStore('transaction', () => {
    const transactions = ref<Transaction[]>([
        {
            id: '1',
            date: dayjs().format('YYYY-MM-DD'),
            description: '午餐',
            category: '餐饮',
            amount: 35,
            type: 'expense'
        },
        {
            id: '2',
            date: dayjs().format('YYYY-MM-DD'),
            description: '地铁',
            category: '交通',
            amount: 6,
            type: 'expense'
        },
        {
            id: '3',
            date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
            description: '咖啡',
            category: '餐饮',
            amount: 25,
            type: 'expense'
        },
        {
            id: '4',
            date: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
            description: '超市购物',
            category: '日用品',
            amount: 128,
            type: 'expense'
        }
    ])

    // 今日支出
    const todayExpense = computed(() => {
        const today = dayjs().format('YYYY-MM-DD')
        return transactions.value
            .filter(t => t.date === today && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
    })

    // 本月支出
    const monthlyExpense = computed(() => {
        const currentMonth = dayjs().format('YYYY-MM')
        return transactions.value
            .filter(t => t.date.startsWith(currentMonth) && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)
    })

    // 本月交易数量
    const monthlyTransactionCount = computed(() => {
        const currentMonth = dayjs().format('YYYY-MM')
        return transactions.value.filter(t => t.date.startsWith(currentMonth)).length
    })

    // 最近交易
    const recentTransactions = computed(() => {
        return transactions.value
            .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
            .slice(0, 5)
    })

    // 分类统计
    const categoryStats = computed(() => {
        const stats: Record<string, number> = {}
        transactions.value
            .filter(t => t.type === 'expense')
            .forEach(t => {
                stats[t.category] = (stats[t.category] || 0) + t.amount
            })
        return stats
    })

    // 添加交易
    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now().toString()
        }
        transactions.value.push(newTransaction)
    }

    // 删除交易
    const removeTransaction = (id: string) => {
        const index = transactions.value.findIndex(t => t.id === id)
        if (index > -1) {
            transactions.value.splice(index, 1)
        }
    }

    // 更新交易
    const updateTransaction = (id: string, updates: Partial<Transaction>) => {
        const index = transactions.value.findIndex(t => t.id === id)
        if (index > -1) {
            transactions.value[index] = { ...transactions.value[index], ...updates }
        }
    }

    return {
        transactions,
        todayExpense,
        monthlyExpense,
        monthlyTransactionCount,
        recentTransactions,
        categoryStats,
        addTransaction,
        removeTransaction,
        updateTransaction
    }
})