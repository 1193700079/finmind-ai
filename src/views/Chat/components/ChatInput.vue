<template>
    <div class="chat-input">
        <div class="input-group">
            <!-- 语音录制按钮 -->
            <el-button class="voice-btn" :class="{ recording: isRecording }" circle @click="toggleRecording">
                <el-icon>
                    <Microphone v-if="!isRecording" />
                    <VideoPause v-else />
                </el-icon>
            </el-button>

            <!-- 文本输入框 -->
            <el-input v-model="inputMessage" placeholder="输入记账信息或与AI对话..." @keydown.enter="sendMessage"
                class="message-input" :disabled="isTyping">
                <template #append>
                    <el-button @click="sendMessage" type="primary" :disabled="!inputMessage.trim() || isTyping">
                        <el-icon>
                            <Promotion />
                        </el-icon>
                    </el-button>
                </template>
            </el-input>

            <!-- 图片上传 -->
            <el-upload :show-file-list="false" :before-upload="handleImageUpload" accept="image/*" class="image-upload">
                <el-button circle>
                    <el-icon>
                        <Picture />
                    </el-icon>
                </el-button>
            </el-upload>
        </div>

        <!-- 快捷输入建议 -->
        <div v-if="showSuggestions" class="suggestions">
            <el-tag v-for="suggestion in suggestions" :key="suggestion" @click="useSuggestion(suggestion)"
                class="suggestion-tag" type="info" effect="plain">
                {{ suggestion }}
            </el-tag>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useTransactionStore } from '@/stores/transaction'
import { ElMessage } from 'element-plus'
import { Microphone, VideoPause, Promotion, Picture } from '@element-plus/icons-vue'
import { aiService } from '@/services/ai'

const chatStore = useChatStore()
const transactionStore = useTransactionStore()

const inputMessage = ref('')
const isRecording = ref(false)

const { isTyping } = chatStore

const suggestions = [
    '今天午餐花了35元',
    '地铁费6元',
    '买了杯咖啡25元',
    '分析本月消费',
    '设置预算提醒'
]

const showSuggestions = computed(() => {
    return !inputMessage.value && !isTyping.value
})

const sendMessage = async () => {
    if (!inputMessage.value.trim() || isTyping.value) return

    const userMessage = inputMessage.value.trim()
    inputMessage.value = ''

    // 添加用户消息
    chatStore.addMessage({
        type: 'user',
        content: userMessage
    })

    // 处理AI回复
    await handleAiResponse(userMessage)
}

const handleAiResponse = async (userInput: string) => {
    chatStore.isTyping = true

    try {
        // 模拟AI处理延迟
        await new Promise(resolve => setTimeout(resolve, 1500))

        const response = await aiService.processMessage(userInput)

        // 如果识别出消费记录，自动添加交易
        if (response.transaction) {
            transactionStore.addTransaction(response.transaction)
        }

        chatStore.addMessage({
            type: 'ai',
            content: response.message
        })
    } catch (error) {
        chatStore.addMessage({
            type: 'ai',
            content: '抱歉，我遇到了一些问题，请稍后再试。'
        })
    } finally {
        chatStore.isTyping = false
    }
}

const useSuggestion = (suggestion: string) => {
    inputMessage.value = suggestion
    sendMessage()
}

const toggleRecording = () => {
    if (isRecording.value) {
        stopRecording()
    } else {
        startRecording()
    }
}

const startRecording = () => {
    isRecording.value = true
    ElMessage.success('开始录音...')

    // 模拟录音过程
    setTimeout(() => {
        stopRecording()
        inputMessage.value = '今天午餐花了38元'
        ElMessage.success('录音完成，已转换为文字')
    }, 3000)
}

const stopRecording = () => {
    isRecording.value = false
}

const handleImageUpload = (file: File) => {
    ElMessage.success('图片上传成功，AI正在识别账单信息...')

    // 模拟AI图片识别
    setTimeout(() => {
        chatStore.addMessage({
            type: 'ai',
            content: '我识别到这是一张餐厅小票，消费金额89元，包含：主菜58元、饮料18元、服务费13元。已为您自动记录到餐饮分类中。'
        })

        // 自动添加识别的交易
        transactionStore.addTransaction({
            date: new Date().toISOString().split('T')[0],
            description: '餐厅消费',
            category: '餐饮',
            amount: 89,
            type: 'expense'
        })
    }, 2000)

    return false // 阻止自动上传
}
</script>

<style lang="scss" scoped>
.chat-input {
    padding: 20px;
    background: white;
    border-top: 1px solid #eee;
}

.input-group {
    display: flex;
    gap: 10px;
    align-items: center;
}

.voice-btn {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    border: none;
    color: white;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    &.recording {
        animation: pulse 1s infinite;
        background: linear-gradient(135deg, #f56565, #e53e3e);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.message-input {
    flex: 1;
}

.image-upload {
    :deep(.el-upload) {
        display: block;
    }
}

.suggestions {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.suggestion-tag {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #667eea;
        color: white;
        border-color: #667eea;
    }
}

@media (max-width: 768px) {
    .input-group {
        flex-wrap: wrap;
    }

    .message-input {
        order: -1;
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>