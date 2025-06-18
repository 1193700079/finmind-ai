<template>
    <div class="page-container">
        <PageHeader title="个人信息" subtitle="编辑资料和账号管理" />

        <div class="page-content">
            <!-- 基本信息 -->
            <div class="form-section">
                <h3>基本信息</h3>
                <el-form :model="profile" label-width="120px" class="profile-form">
                    <el-form-item label="头像">
                        <div class="avatar-section">
                            <el-avatar :size="80" :src="profile.avatar">
                                <el-icon>
                                    <User />
                                </el-icon>
                            </el-avatar>
                            <div class="avatar-actions">
                                <el-upload :show-file-list="false" :before-upload="handleAvatarUpload" accept="image/*">
                                    <el-button type="primary" size="small">
                                        <el-icon>
                                            <Upload />
                                        </el-icon>
                                        更换头像
                                    </el-button>
                                </el-upload>
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="昵称">
                        <el-input v-model="profile.nickname" style="width: 300px;" placeholder="请输入昵称" />
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-input v-model="profile.email" style="width: 300px;" placeholder="请输入邮箱" />
                    </el-form-item>

                    <el-form-item label="手机号">
                        <el-input v-model="profile.phone" style="width: 300px;" placeholder="请输入手机号" />
                    </el-form-item>
                </el-form>
            </div>

            <!-- 应用信息 -->
            <div class="form-section">
                <h3>应用信息</h3>
                <el-descriptions :column="2" border>
                    <el-descriptions-item label="版本号">v1.0.0</el-descriptions-item>
                    <el-descriptions-item label="更新时间">2024-06-19</el-descriptions-item>
                    <el-descriptions-item label="用户等级">
                        <el-tag type="success">高级用户</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="使用天数">365天</el-descriptions-item>
                </el-descriptions>
            </div>

            <!-- 保存按钮 -->
            <div class="form-actions">
                <el-button type="primary" size="large" @click="saveProfile">
                    <el-icon>
                        <Check />
                    </el-icon>
                    保存修改
                </el-button>
                <el-button size="large" @click="resetProfile">
                    重置
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { User, Upload, Check } from '@element-plus/icons-vue'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { profile } = userStore

const handleAvatarUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
        ElMessage.error('头像图片只能是 JPG/PNG 格式!')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('头像图片大小不能超过 2MB!')
        return false
    }

    ElMessage.success('头像上传成功!')
    return false
}

const saveProfile = () => {
    userStore.updateProfile(profile)
    ElMessage.success('个人信息保存成功！')
}

const resetProfile = () => {
    ElMessage.info('已重置到初始状态')
}
</script>

<style lang="scss" scoped>
.form-section {
    margin-bottom: 40px;
    padding: 25px;
    background: #f8f9fa;
    border-radius: 15px;

    h3 {
        margin-bottom: 25px;
        color: #333;
        font-size: 18px;
        font-weight: 600;
    }
}

.avatar-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

.form-actions {
    text-align: center;
    margin-top: 30px;

    .el-button {
        margin: 0 10px;
    }
}

@media (max-width: 768px) {
    .form-actions {
        .el-button {
            width: 100%;
            margin: 5px 0;
        }
    }
}
</style>
  
