<template>
    <div align="center">
        <icon-user style="font-size: 72;" />
        <a-form :model="form" :style="{ width: '350px' }" @submit="handleSubmit" layout="vertical">
            <a-form-item field="username" label="帳號">
                <a-input v-model="form.username" placeholder="帳號">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item field="password" label="密碼">
                <a-input v-model="form.password" placeholder="密碼">
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button long type="primary" html-type="submit">登入/註冊</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
export default {
    name: 'Login',
    setup() {
        const authStore = useAuthStore();
        const form = reactive({
            username: '',
            password: '',
        });
        return {
            form,
            authStore
        };
    }, methods: {
        handleSubmit: async function () {
            console.log(this.form.username, this.form.password);
            try {
                console.log(this.$notification);
                await this.authStore.login(this.form.username, this.form.password);
                this.$notification.success(
                    "登入成功"
                );

            } catch (err) {
                console.log("err");
                this.$notification.error(
                    "密碼錯誤"
                );
            }
        }
    }
};
</script>
<style scoped>

</style>