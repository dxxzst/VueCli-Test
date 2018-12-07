<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger :is-active="sidebar.opened" :toggle-click="toggleSideBar" class="hamburger-container"/>
        <breadcrumb/>
        <el-dropdown class="avatar-container" trigger="click">
            <el-button circle icon="el-icon-caret-bottom" type="info"></el-button>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span @click="logout">退出登陆</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Breadcrumb from '@/components/Breadcrumb';
    import Hamburger from '@/components/Hamburger';

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('FedLogOut').then(() => {
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0 !important;

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }

        .avatar-container {
            display: inline-block;
            position: absolute;
            right: 35px;
        }
    }
</style>

