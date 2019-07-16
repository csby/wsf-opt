<template>
    <div>
        <el-popover trigger="hover" placement="bottom-end">
            <div >
                <div class="row">
                    <span>登陆时间:&nbsp;</span>
                    <span>{{loginTime}}</span>
                </div>
                <hr>
                <div class="row">
                    <el-button type="text" icon="el-icon-log-out" @click="logout">退出登录</el-button>
                </div>
            </div>
            <el-button class="user-account" type="text" slot="reference" >{{displayName}}</el-button>
        </el-popover>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import LogoutBase from '@/components/LogoutBase'

    @Component
    export default class LoginUser extends LogoutBase {
        displayName = ""
        loginTime = ""
        notifySocket = null

        onGetLoginAccount(code, err, data) {
            if (code === 0) {
                this.displayName = data.name;
                if(this.isNullOrEmpty(this.displayName)) {
                    this.displayName = data.account;
                }
                this.loginTime = data.loginTime;
                this.openNotifySocket();
            }
        }
        getLoginAccount() {
            this.post(this.$uris.getLoginAccount, null, this.onGetLoginAccount);
        }

        onOtherUserLogin(data) {
            let msg = "<div>用户账号：" + data.userAccount  + "</div>"
                + "<div>用户姓名：" + data.userName  + "</div>"
                + "<div>登陆时间：" + data.loginTime  + "</div>"
                + "<div>IP地址：" + data.loginIp  + "</div>";

            this.$notify({
                title: '用户登陆',
                dangerouslyUseHTMLString: true,
                message: msg,
                type: "info"
            });
        }

        onNotifyOpen() {
            this.$evt.fire(this.$evt.local.login);
            //console.log("websocket notify subscribe opened");
        }
        onNotifyMessage(evt) {
            if(!evt.data) {
                return;
            }

            try {
                let msg = JSON.parse(evt.data);
                this.$evt.fire(this.$evt.websocket.notify, msg.id, msg.data);
                //console.log("onNotifyMessage(id =", msg.id, ", data =", msg.data, ")");
                if(msg.id === this.$evt.id.wsOptUserLogin) {
                    this.onOtherUserLogin(msg.data);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        onNotifyClose () {
            //console.log("websocket notify subscribe closed");
        }
        onNotifyError(evt) {
            //console.log("onNotifyError(", evt, ")");
        }

        openNotifySocket() {
            this.notifySocket = this.$net.createSocket(this.$uris.websocketNotify,
                this.onNotifyMessage,
                this.onNotifyOpen,
                this.onNotifyClose,
                this.onNotifyError);
        }
        closeNotifySocket() {
            if(this.notifySocket) {
                try{
                    this.notifySocket.close();
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

        onSendSocketNotify(id, data) {
            if(this.notifySocket) {
                try{
                    let msg = {
                        id: id,
                        data: data
                    };
                    this.notifySocket.send(JSON.stringify(msg));
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

        mounted() {
            this.getLoginAccount();
            this.$evt.on(this.$evt.local.socket, this.onSendSocketNotify);
        }

        beforeDestroy() {
            this.$evt.off(this.$evt.local.socket, this.onSendSocketNotify);
            this.closeNotifySocket();
        }
    }
</script>

<style scoped lang="scss">
    
</style>