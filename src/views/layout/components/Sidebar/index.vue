<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
            <div :show-timeout="2000" class="avatar-wrapper" v-if="sidebar.opened">
                <el-row>
                    <el-col :span="24">
                        <img :src="avatar ? avatar : defaultAvatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
                    </el-col>
                    <el-col :span="24" class="user-name"><span> 欢迎 {{ name }}</span></el-col>
                </el-row>
            </div>
            <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
    import {mapGetters} from 'vuex'
    import SidebarItem from './SidebarItem'
    import defaultAvatar from '@/assets/default/avatar.gif'; //默认头像

    export default {
        data() {
            return {
                defaultAvatar //配置默认头像
            }
        },
        components: {SidebarItem},
        computed: {
            ...mapGetters([
                'permission_routers',
                'sidebar',
                'avatar',
                'name'
            ]),
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .avatar-wrapper {
        padding: 25px;
        display: block;
        position: relative;
        .user-name {
            color: white;
            font-weight: 600;
            margin-top: 8px;
            font-size: 13px;
        }
        .user-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }
    }
</style>