<template>
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
        <div class="sidebar-header">
            <div class="logo">💰 MoneyMind AI</div>
            <div class="tagline" v-show="!isCollapsed">智能理财助手</div>
        </div>

        <nav class="sidebar-nav">
            <router-link v-for="route in menuRoutes" :key="route.path" :to="route.path" class="menu-item"
                active-class="active" @click="handleMenuClick">
                <el-icon class="menu-icon">
                    <component :is="route.meta?.icon" />
                </el-icon>
                <span class="menu-text" v-show="!isCollapsed">{{ route.meta?.title }}</span>
            </router-link>
        </nav>

        <div class="sidebar-footer" v-if="!isMobile">
            <el-button @click="toggleCollapse" circle size="small" class="collapse-btn">
                <el-icon>
                    <Fold v-if="!isCollapsed" />
                    <Expand v-else />
                </el-icon>
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'

const router = useRouter()
const isCollapsed = ref(false)
const isMobile = inject('isMobile', ref(false))

// 注入关闭移动端菜单的方法
const closeMobileMenu = inject('closeMobileMenu', () => { })

const menuRoutes = computed(() => {
    return router.getRoutes()
        .filter(route => route.meta?.title)
        .filter(route => route.path !== '/')
})

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

const handleMenuClick = () => {
    if (isMobile.value) {
        closeMobileMenu()
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: 250px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;

    &.collapsed {
        width: 70px;
    }
}

.sidebar-header {
    padding: 20px;
    text-align: center;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
}

.logo {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 18px;
    }
}

.tagline {
    font-size: 11px;
    opacity: 0.9;
    transition: opacity 0.3s ease;
}

.sidebar-nav {
    flex: 1;
    padding-top: 20px;
    overflow-y: auto;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    background: none;
    width: 100%;

    &:hover {
        background: rgba(102, 126, 234, 0.1);
        color: #667eea;
    }

    &.active {
        background: linear-gradient(90deg, #667eea, #764ba2);
        color: white;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        padding: 18px 20px;
        font-size: 16px;
    }
}

.menu-icon {
    font-size: 18px;
    margin-right: 12px;
    min-width: 18px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
}

.menu-text {
    transition: opacity 0.3s ease;
}

.sidebar-footer {
    padding: 20px;
    text-align: center;
}

.collapse-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    color: white;
}
</style>