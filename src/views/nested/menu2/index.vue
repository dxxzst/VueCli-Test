<template>
    <div style="padding:30px;">
        <el-alert :closable="true" title="加载用户列表"/>

        <el-table v-loading="listLoading" :data="userList" element-loading-text="加载中" stripe border fit highlight-current-row align="left">
            <el-table-column align="center" prop="userId" label="ID" width="95"></el-table-column>
            <el-table-column align="center" prop="accountId" label="账号"></el-table-column>
            <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
            <el-table-column align="center" prop="email" label="邮件"></el-table-column>
            <el-table-column align="center" prop="phone" label="电话"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getUserList} from '@/api/user_manage';

    export default {
        data() {
            return {
                userList: [],
                listLoading: true
            };
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getUserList().then(response => {
                    this.userList = response.data;
                    this.listLoading = false;
                }).catch(() => {
                    this.listLoading = false;
                });
            }
        }
    }
</script>