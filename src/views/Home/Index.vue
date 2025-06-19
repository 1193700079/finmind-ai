<template>
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">今日概览</h1>
        <p class="page-subtitle">{{ currentDateString }}</p>
      </div>
      
      <div class="page-content">
        <!-- iOS 风格快速操作 -->
        <div class="quick-actions">
          <button 
            v-for="action in quickActions"
            :key="action.title"
            class="action-button"
            @click="action.handler"
          >
            <div class="action-icon">{{ action.icon }}</div>
            <span class="action-title">{{ action.title }}</span>
          </button>
        </div>
        
        <!-- 统计概览 -->
        <div class="stats-grid">
          <div 
            v-for="stat in todayStats" 
            :key="stat.label"
            class="stat-card"
            @click="stat.action && stat.action()"
          >
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
        </div>
  
        <!-- 最近交易和预算状态 -->
        <div class="info-grid">
          <!-- 最近交易 -->
          <div class="ios-card">
            <div class="card-header">
              <h3 class="card-title">最近交易</h3>
              <button class="card-action" @click="$router.push('/dashboard')">
                查看全部
              </button>
            </div>
            <div class="transaction-list">
              <div 
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="transaction-item"
              >
                <div class="transaction-icon">{{ getCategoryIcon(transaction.category) }}</div>
                <div class="transaction-info">
                  <div class="transaction-title">{{ transaction.description }}</div>
                  <div class="transaction-meta">
                    <span class="transaction-category">{{ transaction.category }}</span>
                    <span class="transaction-time">{{ formatTime(transaction.date) }}</span>
                  </div>
                </div>
                <div class="transaction-amount">
                  -¥{{ transaction.amount.toLocaleString() }}
                </div>
              </div>
            </div>
          </div>
  
          <!-- 预算状态 -->
          <div class="ios-card">
            <div class="card-header">
              <h3 class="card-title">本月预算</h3>
              <button class="card-action" @click="$router.push('/settings')">
                设置
              </button>
            </div>
            <div class="budget-status">
              <div class="budget-circle">
                <svg class="progress-ring" width="120" height="120">
                  <circle
                    class="progress-ring-circle-bg"
                    stroke="rgba(255, 255, 255, 0.1)"
                    stroke-width="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    class="progress-ring-circle"
                    stroke="url(#gradient)"
                    stroke-width="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="strokeDashoffset"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="budget-center">
                  <div class="budget-percentage">{{ budgetPercentage }}%</div>
                  <div class="budget-label">已使用</div>
                </div>
              </div>
              <div class="budget-details">
                <div class="budget-item">
                  <span class="budget-item-label">已用</span>
                  <span class="budget-item-value">¥{{ monthlyExpense.toLocaleString() }}</span>
                </div>
                <div class="budget-item">
                  <span class="budget-item-label">剩余</span>
                  <span class="budget-item-value remaining">¥{{ remainingBudget.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import dayjs from 'dayjs'
  
  const router = useRouter()
  
  // 模拟数据
  const monthlyExpense = ref(3247)
  const monthlyBudget = ref(5000)
  
  const currentDateString = computed(() => {
    return dayjs().format('YYYY年MM月DD日 dddd')
  })
  
  const budgetPercentage = computed(() => {
    return Math.round((monthlyExpense.value / monthlyBudget.value) * 100)
  })
  
  const remainingBudget = computed(() => {
    return Math.max(0, monthlyBudget.value - monthlyExpense.value)
  })
  
  const circumference = 2 * Math.PI * 52
  const strokeDashoffset = computed(() => {
    return circumference - (budgetPercentage.value / 100) * circumference
  })
  
  const quickActions = [
    {
      icon: '💬',
      title: 'AI记账',
      handler: () => router.push('/chat')
    },
    {
      icon: '📊',
      title: '数据看板',
      handler: () => router.push('/dashboard')
    },
    {
      icon: '📈',
      title: '统计分析',
      handler: () => router.push('/statistics')
    },
    {
      icon: '📥',
      title: '导入账单',
      handler: () => router.push('/import')
    }
  ]
  
  const todayStats = ref([
    {
      icon: '💸',
      label: '今日支出',
      value: '¥256',
      description: '比昨日少12%',
      action: () => router.push('/chat')
    },
    {
      icon: '🎯',
      label: '月度预算',
      value: `${budgetPercentage.value}%`,
      description: '使用情况良好'
    },
    {
      icon: '📝',
      label: '本月交易',
      value: '28笔',
      description: '平均每日1笔'
    },
    {
      icon: '💰',
      label: '余额状态',
      value: '充足',
      description: '可支配预算'
    }
  ])
  
  const recentTransactions = ref([
    { id: 1, description: '午餐', category: '餐饮', amount: 35, date: new Date() },
    { id: 2, description: '地铁', category: '交通', amount: 6, date: new Date() },
    { id: 3, description: '咖啡', category: '餐饮', amount: 25, date: new Date() },
    { id: 4, description: '超市', category: '购物', amount: 128, date: new Date() }
  ])
  
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      '餐饮': '🍽️',
      '交通': '🚗',
      '购物': '🛍️',
      '娱乐': '🎮',
      '医疗': '🏥',
      '教育': '📚',
      '其他': '📦'
    }
    return icons[category] || '📦'
  }
  
  const formatTime = (date: Date) => {
    return dayjs(date).format('HH:mm')
  }
  </script>
  
  <style lang="scss" scoped>
  .quick-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
  
  .action-button {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 16px 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  
    &:hover {
      transform: translateY(-2px) scale(1.02);
      background: rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 25px rgba(31, 38, 135, 0.2);
    }
  
    &:active {
      transform: scale(0.98);
    }
  
    .action-icon {
      font-size: 24px;
      margin-bottom: 4px;
    }
  
    .action-title {
      color: white;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }
  
    @media (max-width: 768px) {
      padding: 14px 10px;
      
      .action-icon {
        font-size: 20px;
      }
      
      .action-title {
        font-size: 11px;
      }
    }
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  
  .transaction-list {
    max-height: 300px;
    overflow-y: auto;
  }
  
  .transaction-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
  
    &:last-child {
      border-bottom: none;
    }
  
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      margin: 0 -16px;
      padding: 12px 16px;
      border-radius: 12px;
    }
  }
  
  .transaction-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  
  .transaction-info {
    flex: 1;
    min-width: 0;
  }
  
  .transaction-title {
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .transaction-meta {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .transaction-category {
    background: rgba(255, 255, 255, 0.15);
    padding: 2px 6px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .transaction-time {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .transaction-amount {
    color: #ff453a;
    font-weight: 700;
    font-size: 14px;
    font-family: 'SF Mono', Menlo, monospace;
  }
  
  .budget-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .budget-circle {
    position: relative;
    width: 120px;
    height: 120px;
  }
  
  .progress-ring {
    transform: rotate(-90deg);
  }
  
  .progress-ring-circle {
    transition: stroke-dashoffset 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    stroke-linecap: round;
  }
  
  .budget-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .budget-percentage {
    color: white;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  
  .budget-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 11px;
    font-weight: 500;
  }
  
  .budget-details {
    display: flex;
    gap: 24px;
    width: 100%;
    justify-content: center;
  }
  
  .budget-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  .budget-item-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    font-weight: 500;
  }
  
  .budget-item-value {
    color: white;
    font-size: 16px;
    font-weight: 700;
    font-family: 'SF Mono', Menlo, monospace;
  
    &.remaining {
      color: #30d158;
    }
  }
  </style>