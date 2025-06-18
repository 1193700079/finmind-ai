<template>
    <div class="page-header">
        <div class="page-title">{{ title }}</div>
        <div class="page-subtitle" v-if="subtitle">{{ subtitle }}</div>
        <slot name="extra" />
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string
    subtitle?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.page-header {
    padding: 30px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    text-align: center;
    border-radius: 20px 20px 0 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
}

.page-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
    font-size: 14px;
    opacity: 0.9;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>