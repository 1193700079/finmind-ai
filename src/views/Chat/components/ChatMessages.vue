<template>
    <div class="chat-messages" ref="messagesRef">
        <div v-for="message in messages" :key="message.id" :class="['message', message.type]">
            <div class="message-bubble">
                <div class="message-content">{{ message.content }}</div>
                <div class="message-time">
                    {{ formatTime(message.timestamp) }}
                </div>
            </div>
        </div>

        <div v-if="isTyping" class="message ai">
            <div class="message-bubble">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="message-content">AI正在思考...</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import dayjs from 'dayjs'

const chatStore = useChatStore()
const { messages, isTyping } = chatStore

const messagesRef = ref<HTMLDivElement>()

const formatTime = (time: Date) => {
    return dayjs(time).format('HH:mm')
}

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesRef.value) {
            messagesRef.value.scrollTop = messagesRef.value.scrollHeight
        }
    })
}

watch(() => messages.length, scrollToBottom)
watch(isTyping, scrollToBottom)
</script>

<style lang="scss" scoped>
.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f8f9fa;
}

.message {
    margin-bottom: 15px;
    animation: messageSlide 0.3s ease-out;

    &.user {
        text-align: right;
    }
}

@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message-bubble {
    display: inline-block;
    padding: 12px 16px;
    border-radius: 18px;
    max-width: 70%;
    word-wrap: break-word;
    position: relative;

    .message.user & {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .message.ai & {
        background: #e3f2fd;
        color: #333;
    }
}

.message-content {
    margin-bottom: 4px;
}

.message-time {
    font-size: 11px;
    opacity: 0.7;
    text-align: right;

    .message.ai & {
        text-align: left;
    }
}

.typing-indicator {
    display: flex;
    gap: 4px;
    margin-bottom: 8px;

    span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #999;
        animation: typing 1.4s infinite ease-in-out;

        &:nth-child(2) {
            animation-delay: 0.2s;
        }

        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
}

@keyframes typing {

    0%,
    60%,
    100% {
        transform: translateY(0);
    }

    30% {
        transform: translateY(-10px);
    }
}
</style>
