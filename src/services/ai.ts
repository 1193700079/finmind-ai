import type { Transaction } from '@/types'

interface AiResponse {
    message: string
    transaction?: Omit<Transaction, 'id'>
}

class AiService {
    async processMessage(input: string): Promise<AiResponse> {
        // 模拟AI处理逻辑
        const response: AiResponse = {
            message: this.generateResponse(input)
        }

        // 检测是否包含消费信息
        const transaction = this.extractTransaction(input)
        if (transaction) {
            response.transaction = transaction
        }

        return response
    }

    private generateResponse(input: string): string {
        const lowerInput = input.toLowerCase()

        if (this.isExpenseRecord(input)) {
            return '已为您记录这笔支出！我建议您可以设置分类标签，这样更容易追踪消费习惯。需要我帮您分析本月的消费情况吗？'
        }

        if (lowerInput.includes('预算') || lowerInput.includes('budget')) {
            return '根据您的消费习惯，建议将月预算设置为收入的30-50%。您当前的预算使用率较为合理，继续保持！'
        }

        if (lowerInput.includes('分析') || lowerInput.includes('统计')) {
            return '从您的消费数据来看，餐饮支出占比最大，建议适当控制外出就餐频率。交通费用较为稳定，符合日常通勤需求。'
        }

        if (lowerInput.includes('帮助') || lowerInput.includes('功能')) {
            return '我可以帮您：\n1. 记录日常消费（语音/文字/图片）\n2. 分析消费习惯和趋势\n3. 设置预算提醒\n4. 导入银行账单\n5. 生成消费报告'
        }

        return '我理解了！作为您的AI记账助手，我可以帮您记录支出、分析消费习惯、设置预算提醒。您还想了解什么功能吗？'
    }

    private isExpenseRecord(input: string): boolean {
        const patterns = [
            /花了?\s*(\d+\.?\d*)\s*元?/,
            /支出\s*(\d+\.?\d*)\s*元?/,
            /买了?.*?(\d+\.?\d*)\s*元?/,
            /消费\s*(\d+\.?\d*)\s*元?/,
            /付款\s*(\d+\.?\d*)\s*元?/
        ]

        return patterns.some(pattern => pattern.test(input))
    }

    private extractTransaction(input: string): Omit<Transaction, 'id'> | null {
        // 提取金额
        const amountMatch = input.match(/(\d+\.?\d*)\s*元?/)
        if (!amountMatch) return null

        const amount = parseFloat(amountMatch[1])

        // 提取描述和分类
        let description = '消费'
        let category = '其他'

        // 常见关键词映射
        const categoryMap: Record<string, string> = {
            '午餐|晚餐|早餐|吃饭|餐厅|外卖': '餐饮',
            '地铁|公交|打车|滴滴|出租车|交通': '交通',
            '咖啡|奶茶|饮料': '餐饮',
            '超市|购物|买': '购物',
            '电影|娱乐|游戏': '娱乐',
            '药店|医院|看病': '医疗',
            '加油|油费': '交通',
            '房租|水电|物业': '住房'
        }

        for (const [keywords, cat] of Object.entries(categoryMap)) {
            if (new RegExp(keywords).test(input)) {
                category = cat
                break
            }
        }

        // 提取具体描述
        const descriptionPatterns = [
            /(.+?)花了?\s*\d+/,
            /买了?(.+?)\s*\d+/,
            /(午餐|晚餐|早餐|咖啡|地铁|公交|超市)/
        ]

        for (const pattern of descriptionPatterns) {
            const match = input.match(pattern)
            if (match) {
                description = match[1].trim() || category
                break
            }
        }

        return {
            date: new Date().toISOString().split('T')[0],
            description,
            category,
            amount,
            type: 'expense'
        }
    }
}

export const aiService = new AiService()
