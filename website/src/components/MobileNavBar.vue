<template>
    <div class="menu">
        <a-trigger trigger="click" position="top" :unmount-on-close="true" class="menu-trigger"
            :popup-translate="[0, 20]">
            <icon-menu />
            <template #content>
                <a-menu mode="vertical" theme="light" :selected-keys="[currentSelectedKey]" class="menu-left">
                    <a-menu-item style="background-color: rgba(255,255,255,0);" key="/" @click="navigateTo('/')">
                        <icon-home />首頁
                    </a-menu-item>
                    <a-menu-item style="background-color: rgba(255,255,255,0);" key="/articles"
                        @click="navigateTo('/articles')">
                        <icon-book />文章
                    </a-menu-item>
                    <a-menu-item style="background-color: rgba(255,255,255,0);" key="/about"
                        @click="navigateTo('/about')">
                        <icon-info /> 關於
                    </a-menu-item>
                    <a-sub-menu style="background-color: rgba(255,255,255,0);" key="/0" title="game">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title> game</template>
                        <a-menu-item style="background-color: rgba(255,255,255,0);" key="/snake"
                            @click="navigateTo('/snake')">snake</a-menu-item>
                        <a-menu-item style="background-color: rgba(255,255,255,0);" key="/maze"
                            @click="navigateTo('/maze')">迷宮</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </template>
        </a-trigger>

        <img src="https://p2.itc.cn/images01/20220126/2a388985d1e7451eb72875b2d8c4fe15.png" alt="logo"
            style="height: 100%; width: 60px; object-fit: 'cover';" />
        <div class="menu-right" align="right"><!--
            <div :style="{ padding: '20px 10px' }">
                <a-trigger trigger="click" position="left" auto-fit-position :unmount-on-close="false">
                    <icon-search />
                    <template #content>
                        <div class="trigger-search">
                            <div align="center">
                                <a-input-search :style="{ width: '320px' }" align="right"
                                    placeholder="Please enter something" />
                            </div>
                        </div>
                    </template>
                </a-trigger>
            </div>-->
            <div class="muteButton" @click="handleMute()">
                <icon-mute v-if="!isMuted" />
                <icon-sound v-if="isMuted" />
            </div>
            <div :style="{ padding: '20px 0px' }">
                <a-trigger trigger="click" position="top" auto-fit-position :unmount-on-close="false">
                    <IconUser />
                    <template #content>
                        <div class="trigger-user">
                            <div align="center" :style="{ padding: '10px' }">
                                <a-avatar :style="{ backgroundColor: '#3370ff', marginBottom: '10px' }">
                                    <IconUser />
                                </a-avatar>
                                <br />
                                <label :style="{ marginBottom: '300px' }">{{ getUsername }}</label>
                                <br />
                                <a-button type="primary" size="small" :style="{ marginTop: '10px' }" href="/login"
                                    v-if="!isLoggedIn">登入</a-button>
                                <a-button type="primary" size="small" :style="{ marginTop: '10px' }"
                                    @click="handleLogout()" v-else-if="isLoggedIn">登出</a-button>

                            </div>
                        </div>
                    </template>
                </a-trigger>
            </div>
        </div>
    </div>
</template>
<style>
.arco-menu-vertical .arco-menu-inline-header.arco-menu-has-icon {
    background-color: rgba(255, 255, 255, 0);
}
</style>

<style scoped>
.menu {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    padding: 10px;

    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(5px);
}

.menu-trigger {
    padding: 10px;

}

.menu-left {
    width: 100vw;
    backdrop-filter: blur(5px);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 7));
}

.menu-right {
    display: flex;
    padding: 0px;
}

.muteButton {
    padding: 20px 0;
}

.trigger-search {
    padding: 10px;
    width: 350px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-user {
    padding: 10px;
    width: 250px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
<script>
import { useAuthStore } from '@/stores/auth.js';
import { computed, ref } from 'vue';

export default {
    name: 'MobileNavBar',
    setup() {
        const authStore = useAuthStore();
        const isLoggedIn = computed(() => authStore.getLoginStatus);
        const isMuted = ref(false);
        // 使用 computed 来定义 getUsername
        const getUsername = computed(() => {
            const username = authStore.currentUser;
            return username ? username : "username";
        }); const handleLogout = () => {
            authStore.logout();
        }
        return {
            isLoggedIn,
            getUsername,
            handleLogout,
            isMuted,
        }
    },
    computed: {
        currentSelectedKey() {
            return this.$route.path.startsWith('/articles') ? '/articles' : this.$route.path;
        },
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path); // 使用 Vue Router 的 push 方法实现导航
        },
        handleMute() {
            this.$emit('mute', this.isMuted);
            this.isMuted = !this.isMuted;
        }
    },
};
</script>