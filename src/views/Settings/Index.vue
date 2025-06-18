<template>
    <div class="page-container">
        <div class="page-header">
            <h1>应用设置</h1>
            <p>个性化配置和功能设置</p>
        </div>
        <div class="page-content">
            <el-form label-width="120px">
                <el-form-item label="主题模式">
                    <el-radio-group v-model="theme">
                        <el-radio label="light">浅色模式</el-radio>
                        <el-radio label="dark">深色模式</el-radio>
                        <el-radio label="auto">跟随系统</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="月度预算">
                    <el-input-number v-model="budget" :min="0" :step="100" />
                    <span style="margin-left: 10px;">元</span>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveSettings">保存设置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const theme = ref('light')
const budget = ref(5000)

const saveSettings = () => {
    ElMessage.success('设置保存成功！')
}
</script>

<style lang="scss" scoped>
.page-container {
    padding: 20px;
}

.page-header {
    margin-bottom: 30px;
    text-align: center;

    h1 {
        color: #333;
        font-size: 28px;
        margin-bottom: 10px;
    }

    p {
        color: #666;
        font-size: 14px;
    }
}

.page-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}
</style>