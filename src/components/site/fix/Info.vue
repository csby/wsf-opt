<template>
    <el-card :body-style="bodyStyle">
        <div slot="header" class="header">
            <div>
                <i :class="icon" ></i>
                <span>{{title}}网站</span>
            </div>
            <div >
                <el-tooltip placement="top">
                    <div slot="content">
                        <span>刷新</span>
                    </div>
                    <el-button style="padding: 2px 5px;" type="text" icon="el-icon-refresh" @click="getInfo"/>
                </el-tooltip>
            </div>
            <div >
                <el-tooltip placement="top">
                    <div slot="content">
                        <span>上传</span>
                    </div>
                    <el-button style="padding: 2px 5px;" type="text" icon="el-icon-upload" @click="dlgVisible = true"/>
                </el-tooltip>
            </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中...">
            <div class="item">
                <span>访问地址:</span>
                <span class="text">
                    <a :href="info.url" target="_blank">{{info.url}}</a>
                </span>
                <el-tooltip v-show="info.url !== ''" content="复制访问地址" placement="top">
                    <el-button style="padding: 0 5px; margin-left: 5px;"
                               type="text" icon="el-icon-document-copy" size="small"
                               v-clipboard:copy="info.url"/>
                </el-tooltip>
            </div>
            <div class="item">
                <span>当前版本:</span>
                <span class="text">{{info.version}}</span>
            </div>
            <div class="item">
                <span>发布时间:</span>
                <span class="text">{{info.deployTime}}</span>
            </div>
<!--            <div class="item">-->
<!--                <span>物理路径:</span>-->
<!--                <span class="text">{{info.root}}</span>-->
<!--            </div>-->
        </div>

        <fileUpload v-model="dlgVisible"
                    width="500px"
                    labelWidth="60px"
                    :title="'上传' + title + '网站'"
                    :uri="uploadUri">
        </fileUpload>
    </el-card>
</template>

<script>
    import Component from 'vue-class-component'
    import SocketBase from '@/components/SocketBase'
    import FileUpload from '@/components/dlg/FileUpload'

    @Component({
        components: {
            fileUpload: FileUpload
        },
        props: {
            icon: {
                type: String,
                default: "el-icon-folder"
            },
            title: {
                type: String,
                default: ""
            },
            infoUri: {
                type: String,
                default: ""
            },
            uploadUri: {
                type: String,
                default: ""
            },
            uploadId: {
                type: Number,
                default: 0
            }
        }
    })
    export default class Info extends SocketBase {
        bodyStyle = {
            padding: "5px 20px"
        }
        dlgVisible = false
        loading = false
        info = {
            url: "",
            root: "",
            version: "",
            deployTime: ""
        }

        onGetInfo(code, err, data) {
            this.loading = false
            if (code === 0) {
                this.info.url = data.url;
                this.info.root = data.root;
                this.info.version = data.version;
                this.info.deployTime = data.deployTime;
            }
            else {
                this.info.url = "";
                this.info.root = data.root;
                this.info.version = "";
                this.info.deployTime = "";
            }
        }
        getInfo() {
            let uri = this.infoUri;
            if(this.isNullOrEmpty(uri)) {
                return
            }

            this.loading = true
            this.post(uri, null, this.onGetInfo);
        }

        onSocketMessage(id, data) {
            if(id === this.uploadId) {
                this.info.url = data.url;
                this.info.root = data.root;
                this.info.version = data.version;
                this.info.deployTime = data.deployTime;
            }
        }

        mounted() {
            this.getInfo();
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

    .item {
        display: flex;
        align-items: center;
        font-size: 13px;
        padding-bottom: 5px;
    }

    .text {
        font-weight: bold;
        padding-left: 5px;
    }

    a:link {
        text-decoration: none;
    }
    a:visited {
        text-decoration: none;
    }
    a:hover {
        text-decoration: none;
    }
    a:active {
        text-decoration: none;
    }
</style>