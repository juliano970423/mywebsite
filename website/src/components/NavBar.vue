<template>
    <div class="menu">
        <a-menu mode="horizontal" theme="light" :selected-keys="[currentSelectedKey]"
            style="background-color:rgba(255, 255, 255, 0)">
            <a-menu-item style="background-color:rgba(255, 255, 255, 0);" key="title"
                :style="{ padding: 0, marginRight: '38px', marginDown: 0 }" disabled>
                <img src="https://p2.itc.cn/images01/20220126/2a388985d1e7451eb72875b2d8c4fe15.png" alt="logo"
                    style="height: 100%; width: 60px; object-fit: 'cover';" />
            </a-menu-item>
            <a-menu-item style="background-color:rgba(255, 255, 255, 0);" key="/"
                @click="navigateTo('/')"><icon-home />首頁</a-menu-item>
            <a-menu-item style="background-color:rgba(255, 255, 255, 0);" key="/articles"
                @click="navigateTo('/articles')"><icon-book />文章</a-menu-item>
            <a-menu-item style="background-color:rgba(255, 255, 255, 0);" key="/about"
                @click="navigateTo('/about')"><icon-info />關於</a-menu-item>
            <a-sub-menu style="background-color:rgba(255, 255, 255, 0);" key="/0">
                <template #icon><icon-apps></icon-apps></template>
                <template #title>game</template>
                <a-menu-item key="/snake" @click="navigateTo('/snake')">snake</a-menu-item>
                <a-menu-item key="/maze" @click="navigateTo('/maze')">迷宮</a-menu-item>
                <a-menu-item key="/game" @click="navigateTo('/game')">2048</a-menu-item>
            </a-sub-menu>
        </a-menu>
        <div class="menu-right" align="right">
            <!--
            <div :style="{ padding: '20px' }">
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
            </div>
            -->
            <div class="muteButton" @click="handleMute()">
                <icon-mute v-if="!isMuted" />
                <icon-sound v-if="isMuted" />
            </div>

            <div :style="{ padding: '20px' }">

                <a-trigger trigger="click" position="top" auto-fit-position :unmount-on-close="false">
                    <IconUser />
                    <template #content>
                        <div class="trigger-user">
                            <div align="center" :style="{ padding: '10px' }">
                                <a-avatar :style="{ backgroundColor: '#3370ff', marginBottom: '10px' }">
                                    <IconUser />
                                </a-avatar>
                                <br />
                                <label>{{ getUsername }}</label>
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
<style scoped>
.menu {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 61px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100vw;
    padding: 0px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(5px);

}
.muteButton {
    padding: 20px;
}
.menu-right {
    display: flex;
    padding: 0px;
    background-color: rgba(255, 255, 255, 0);
    height: 60px
}

.trigger-search {
    padding: 10px;
    width: 350px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0;
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
    name: 'NavBar',
    setup() {
        const authStore = useAuthStore();// 使用 computed 来定义 isLoggedIn
        const isLoggedIn = computed(() => authStore.getLoginStatus);
        const isMuted = ref(true);
        // 使用 computed 来定义 getUsername
        const getUsername = computed(() => {
            const username = authStore.currentUser;
            return username ? username : "username";
        });
        const handleLogout = () => {
            console.log("logout");
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
        }
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