<template>
    <el-card :body-style="bodyStyle">
        <div slot="header" class="header">
            <div>
                <i class="el-icon-user" ></i>
                <span>在线用户</span>
                <el-badge class="badge" type="primary" :value="itemCount" v-if="itemCount > 0"/>
            </div>
            <div >
                <el-tooltip placement="top">
                    <div slot="content">
                        <span>刷新</span>
                    </div>
                    <el-button style="padding: 3px 5px;" type="text" icon="el-icon-refresh" @click="doSearch"/>
                </el-tooltip>
            </div>
        </div>

        <tableList class="content"
                   ref="tableList"
                   :uri="this.$uris.getOnlineUsers"
                   size="small"
                   :border="false"
                   @searched="onSearched">
            <template slot="columns">
                <el-table-column
                        label="序号"
                        type="index"
                        width="55"
                        align="right">
                </el-table-column>
                <el-table-column
                        prop="userAccount"
                        label="账号"
                        width="75"
                        align="left">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名"
                        width="85px"
                        align="left">
                </el-table-column>
                <el-table-column
                        prop="loginIp"
                        label="登陆IP"
                        width="115px"
                        align="left">
                </el-table-column>
                <el-table-column
                        prop="token"
                        label="登陆凭证"
                        width="255px"
                        align="left">
                </el-table-column>
                <el-table-column
                        prop="loginTime"
                        label="登陆时间"
                        width="145px"
                        align="left">
                </el-table-column>
                <el-table-column
                        prop="loginDuration"
                        label="在线时长"
                        align="left">
                </el-table-column>
            </template>
        </tableList>
    </el-card>
</template>

<script>
    import Component from 'vue-class-component'
    import SocketBase from '@/components/SocketBase'
    import TableList from '@/components/TableList'

    @Component({
        components: {
            tableList: TableList
        }
    })
    export default class Online extends SocketBase {
        bodyStyle = {
            padding: "8px 20px"
        }
        itemCount = 0

        onSocketMessage(id, data) {
            if(id === this.$evt.id.wsOptUserLogin) {
                this.doSearch();
            }
        }

        onSearched(data) {
            if(data) {
                this.itemCount = data.length;
            }
            else {
                this.itemCount = 0;
            }
        }

        doSearch() {
            this.$refs.tableList.doSearch();
        }

        mounted() {
            this.$evt.on(this.$evt.local.login, this.doSearch);
        }
        beforeDestroy() {
            this.$evt.off(this.$evt.local.login, this.doSearch);
        }
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        align-items: center;

        div {
            display: flex;
            align-items: center;
        }

        div:first-child {
            flex: 1;

            i {
                width: 30px;
                text-align: center;
            }
        }
    }
</style>