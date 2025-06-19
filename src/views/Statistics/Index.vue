<template>
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">消费统计</h1>
        <p class="page-subtitle">数据洞察 · 智能分析</p>
      </div>
      
      <div class="page-content">
        <!-- iOS 风格标签页 -->
        <div class="ios-tabs">
          <div 
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-text">{{ tab.title }}</span>
          </div>
        </div>
  
        <!-- 月度统计 -->
        <div v-if="activeTab === 'monthly'" class="tab-content">
          <!-- 统计卡片网格 -->
          <div class="stats-grid">
            <div 
              v-for="stat in monthlyStats" 
              :key="stat.label"
              class="stat-card"
              @click="stat.action && stat.action()"
            >
              <div class="stat-icon">{{ stat.icon }}</div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-trend" v-if="stat.trend">
                <span :class="['trend-value', stat.trend > 0 ? 'increase' : 'decrease']">
                  {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                </span>
              </div>
            </div>
          </div>
          
          <!-- 月度明细 -->
          <div class="ios-card">
            <div class="card-header">
              <h3 class="card-title">月度明细</h3>
              <button class="card-action">查看全部</button>
            </div>
            <div class="ios-table">
              <div class="table-row header-row">
                <div class="table-cell">月份</div>
                <div class="table-cell">支出金额</div>
                <div class="table-cell">变化</div>
              </div>
              <div 
                v-for="item in monthlyData" 
                :key="item.month"
                class="table-row"
              >
                <div class="table-cell">
                  <span class="month-badge">{{ item.month }}</span>
                </div>
                <div class="table-cell amount">
                  ¥{{ item.amount.toLocaleString() }}
                </div>
                <div class="table-cell">
                  <span :class="['ios-badge', item.change > 0 ? 'increase' : item.change < 0 ? 'decrease' : 'neutral']">
                    {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 年度统计 -->
        <div v-if="activeTab === 'yearly'" class="tab-content">
          <div class="yearly-overview">
            <div 
              v-for="year in yearlyData" 
              :key="year.year"
              class="year-card ios-card"
            >
              <div class="year-header">
                <span class="year-title">{{ year.year }}年</span>
                <span :class="['year-growth', year.growth > 0 ? 'increase' : year.growth < 0 ? 'decrease' : 'neutral']">
                  {{ year.growth > 0 ? '+' : '' }}{{ year.growth }}%
                </span>
              </div>
              <div class="year-amount">¥{{ year.total.toLocaleString() }}</div>
              <div class="year-details">
                <div class="year-detail-item">
                  <span class="detail-label">月均</span>
                  <span class="detail-value">¥{{ year.average.toLocaleString() }}</span>
                </div>
                <div class="year-detail-item">
                  <span class="detail-label">交易</span>
                  <span class="detail-value">{{ year.transactions }}笔</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 分类统计 -->
        <div v-if="activeTab === 'category'" class="tab-content">
          <div class="category-overview">
            <div 
              v-for="category in categoryData" 
              :key="category.category"
              class="category-card ios-card"
            >
              <div class="category-header">
                <div class="category-icon">{{ category.icon }}</div>
                <div class="category-info">
                  <div class="category-name">{{ category.category }}</div>
                  <div class="category-percentage">{{ category.percentage }}%</div>
                </div>
              </div>
              <div class="category-amount">¥{{ category.amount.toLocaleString() }}</div>
              <div class="category-details">
                <div class="category-detail">
                  <span class="detail-icon">📊</span>
                  <span class="detail-text">{{ category.count }}笔交易</span>
                </div>
                <div class="category-detail">
                  <span class="detail-icon">💰</span>
                  <span class="detail-text">均¥{{ category.average.toLocaleString() }}</span>
                </div>
              </div>
              <div class="category-progress">
                <div 
                  class="progress-bar"
                  :style="{ width: category.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const activeTab = ref('monthly')
  
  const tabs = [
    { key: 'monthly', title: '月度', icon: '📅' },
    { key: 'yearly', title: '年度', icon: '📊' },
    { key: 'category', title: '分类', icon: '🏷️' }
  ]
  
  const monthlyStats = ref([
    { 
      icon: '💸', 
      label: '本月支出', 
      value: '¥3,247', 
      trend: 12.5,
      action: () => console.log('查看详情')
    },
    { 
      icon: '📝', 
      label: '交易笔数', 
      value: '28', 
      trend: -5.2 
    },
    { 
      icon: '📈', 
      label: '日均支出', 
      value: '¥116', 
      trend: 8.7 
    },
    { 
      icon: '🎯', 
      label: '预算使用', 
      value: '65%', 
      trend: 0 
    }
  ])
  
  const monthlyData = ref([
    { month: '1月', amount: 2800, change: 0 },
    { month: '2月', amount: 3200, change: 14.3 },
    { month: '3月', amount: 2900, change: -9.4 },
    { month: '4月', amount: 3400, change: 17.2 },
    { month: '5月', amount: 3100, change: -8.8 },
    { month: '6月', amount: 3247, change: 4.7 }
  ])
  
  const yearlyData = ref([
    { 
      year: '2022', 
      total: 32000, 
      average: 2667, 
      growth: 0, 
      transactions: 245 
    },
    { 
      year: '2023', 
      total: 38000, 
      average: 3167, 
      growth: 18.75, 
      transactions: 312 
    },
    { 
      year: '2024', 
      total: 42000, 
      average: 3500, 
      growth: 10.53, 
      transactions: 358 
    }
  ])
  
  const categoryData = ref([
    { 
      category: '餐饮', 
      icon: '🍽️', 
      amount: 1200, 
      percentage: 35.2, 
      count: 45, 
      average: 27 
    },
    { 
      category: '交通', 
      icon: '🚗', 
      amount: 680, 
      percentage: 20.0, 
      count: 38, 
      average: 18 
    },
    { 
      category: '购物', 
      icon: '🛍️', 
      amount: 850, 
      percentage: 25.0, 
      count: 12, 
      average: 71 
    },
    { 
      category: '娱乐', 
      icon: '🎮', 
      amount: 450, 
      percentage: 13.2, 
      count: 8, 
      average: 56 
    },
    { 
      category: '其他', 
      icon: '📦', 
      amount: 220, 
      percentage: 6.6, 
      count: 15, 
      average: 15 
    }
  ])
  </script>
  
  <style lang="scss" scoped>
  .tab-content {
    animation: slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .tab-item {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .tab-icon {
      font-size: 16px;
    }
    
    .tab-text {
      font-weight: 600;
    }
  }
  
  .stat-card {
    position: relative;
    
    .stat-icon {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 20px;
      opacity: 0.6;
    }
    
    .stat-trend {
      margin-top: 8px;
      
      .trend-value {
        font-size: 12px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 8px;
        
        &.increase {
          background: rgba(255, 69, 58, 0.15);
          color: #ff453a;
        }
        
        &.decrease {
          background: rgba(52, 199, 89, 0.15);
          color: #30d158;
        }
      }
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    .card-title {
      color: white;
      font-size: 18px;
      font-weight: 700;
      margin: 0;
    }
    
    .card-action {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 6px 12px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }
    }
  }
  
  .month-badge {
    background: rgba(255, 255, 255, 0.15);
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    color: white;
  }
  
  .yearly-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .year-card {
    .year-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      .year-title {
        font-size: 18px;
        font-weight: 700;
        color: white;
      }
      
      .year-growth {
        font-size: 14px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 8px;
        
        &.increase {
          background: rgba(255, 69, 58, 0.15);
          color: #ff453a;
        }
        
        &.decrease {
          background: rgba(52, 199, 89, 0.15);
          color: #30d158;
        }
        
        &.neutral {
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    
    .year-amount {
      font-size: 32px;
      font-weight: 700;
      color: white;
      margin-bottom: 16px;
      font-family: 'SF Mono', Menlo, monospace;
    }
    
    .year-details {
      display: flex;
      gap: 20px;
      
      .year-detail-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        
        .detail-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }
        
        .detail-value {
          font-size: 14px;
          color: white;
          font-weight: 600;
        }
      }
    }
  }
  
  .category-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }
  
  .category-card {
    .category-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      
      .category-icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      
      .category-info {
        flex: 1;
        
        .category-name {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin-bottom: 2px;
        }
        
        .category-percentage {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }
      }
    }
    
    .category-amount {
      font-size: 24px;
      font-weight: 700;
      color: white;
      margin-bottom: 12px;
      font-family: 'SF Mono', Menlo, monospace;
    }
    
    .category-details {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
      
      .category-detail {
        display: flex;
        align-items: center;
        gap: 6px;
        
        .detail-icon {
          font-size: 14px;
          opacity: 0.8;
        }
        
        .detail-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }
      }
    }
    
    .category-progress {
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      
      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 2px;
        transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .yearly-overview,
    .category-overview {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .year-card .year-amount,
    .category-card .category-amount {
      font-size: 20px;
    }
    
    .tab-item {
      .tab-icon {
        font-size: 14px;
      }
      
      .tab-text {
        font-size: 12px;
      }
    }
  }
  </style>