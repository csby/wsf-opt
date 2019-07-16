<template>
    <el-card :body-style="bodyStyle">
        <div slot="header" class="header">
            <div>
                <i class="el-icon-eleme" ></i>
                <span>{{title}}网站</span>
            </div>
            <div v-if="deleteVisible">
                <el-tooltip placement="top">
                    <div slot="content">
                        <span>删除</span>
                    </div>
                    <el-button style="padding: 2px 5px; color: red;" type="text" icon="el-icon-delete" @click="deleteApp"/>
                </el-tooltip>
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
        <div class="body">
            <div v-loading="loading" element-loading-text="加载中...">
                <el-tree ref="appTree"
                         node-key="path"
                         :data="apps"
                         :props="appProps"
                         :highlight-current="true"
                         :default-expand-all="true"
                         @node-click="onNodeClick">
                        <span class="tree-node-folder" slot-scope="{ node, data }">
                          <span v-if="data.type === 0" class="tree-node">
                            <span class="tree-node-catalog">
                              <i class="el-icon-folder">&nbsp;&nbsp;</i>
                              <span>{{data.name}}</span>
                            </span>
                          </span>
                          <span v-if="data.type === 1" class="tree-node">
                            <span class="tree-node-app">
                              <i class="el-icon-s-home">&nbsp;&nbsp;</i>
                              <span>{{data.name}}</span>
                            </span>
                          </span>
                        </span>
                </el-tree>
            </div>
            <div>
                <div v-show="detailVisible">
                    <div class="item">
                        <span>访问地址:</span>
                        <span class="text">
                                <a :href="detail.url" target="_blank">
                                    {{detail.url}}
                                </a>
                            </span>
                        <el-tooltip content="复制访问地址" placement="top">
                            <el-button style="padding: 0 5px; margin-left: 5px;"
                                       type="text" icon="el-icon-document-copy" size="small"
                                       v-clipboard:copy="detail.url"/>
                        </el-tooltip>
                    </div>
                    <div class="item">
                        <span>应用路径:</span>
                        <span class="text">{{detail.path}}</span>
                    </div>
                    <div class="item">
                        <span>上传时间:</span>
                        <span class="text">{{detail.uploadTime}}</span>
                    </div>
                    <div class="item">
                        <span>上传者:</span>
                        <span class="text">{{detail.uploadUser}}</span>
                    </div>
                    <div class="item">
                        <span>版本号:</span>
                        <span class="text">{{detail.version}}</span>
                    </div>
                    <div class="item">
                        <span>说明:</span>
                        <span class="text">{{detail.remark}}</span>
                    </div>
                </div>
            </div>
        </div>
        <fileUpload v-model="dlgVisible"
                    width="500px"
                    labelWidth="60px"
                    :title="'上传' + title + '网站'"
                    :forms="forms"
                    :preUpload="checkInputs" :uri="this.$uris.siteWebappUpload">
            <template slot-scope="status">
                <el-form-item :label="inputPath.label" :required="true">
                    <el-input ref="inputPath"
                              v-model="inputPath.value"
                              :placeholder="inputPath.placeholder"
                              :disabled="status.uploading">
                    </el-input>
                </el-form-item>
                <el-form-item :label="inputVersion.label">
                    <el-input ref="inputVersion"
                              v-model="inputVersion.value"
                              :placeholder="inputVersion.placeholder"
                              :disabled="status.uploading">
                    </el-input>
                </el-form-item>
                <el-form-item :label="inputRemark.label">
                    <el-input ref="inputRemark"
                              v-model="inputRemark.value"
                              :placeholder="inputRemark.placeholder"
                              :disabled="status.uploading">
                    </el-input>
                </el-form-item>
            </template>
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
            title: {
                type: String,
                default: "应用"
            }
        }
    })
    export default class Info extends SocketBase {
        bodyStyle = {
            padding: "5px 25px"
        }
        appProps = {
            children: 'children',
            label: 'name'
        }
        apps = []
        dlgVisible = false
        detailVisible = false
        detail = {
            path: "",
            url: "",
            version: "",
            uploadTime: "",
            uploadUser: "",
            remark: ""
        }
        loading = false;
        deleteVisible = false;
        deleting = false;

        inputPath = {
            value: "",
            name: "path",
            label: "路径",
            placeholder: "如test或group/item"
        }
        inputVersion = {
            value: "",
            name: "version",
            label: "版本",
            placeholder: "如1.0.1.0"
        }
        inputRemark = {
            value: "",
            name: "remark",
            label: "说明",
            placeholder: "如XXX网站原型"
        }

        forms = [this.inputPath, this.inputVersion, this.inputRemark]

        checkInputs() {
            if(this.isNullOrEmpty(this.inputPath.value)) {
                this.$refs["inputPath"].focus();
                return this.inputPath.label + "不能为空";
            }
            return "";
        }

        onSocketMessage(id, data) {
            if(id === this.$evt.id.wsWebappSiteUpload || id === this.$evt.id.wsWebappSiteDelete) {
                this.getInfo();
            }
        }

        onNodeClick(data) {
            this.detail.path = data.path;
            if(data.type === 0) {
                this.detailVisible = false;
                this.deleteVisible = false;

                this.inputPath.value = data.path + "/";
                this.inputVersion.value = "";
                this.inputRemark.value = "";
                return;
            }

            this.detail.url = data.url;
            this.detail.version = data.version;
            this.detail.uploadTime = data.uploadTime;
            this.detail.uploadUser = data.uploadUser;
            this.detail.remark = data.remark;

            this.inputPath.value = data.path;
            this.inputVersion.value = data.version;
            this.inputRemark.value = data.remark;

            this.detailVisible = true
            this.deleteVisible = true;
        }

        onGetInfo(code, err, data) {
            this.loading = false;
            this.detail.path = "";
            this.detail.url = "";
            this.detail.version = "";
            this.detail.uploadTime = "";
            this.detail.uploadUser = "";
            this.detail.remark = "";

            if (code === 0) {
                this.apps = data;
            }
            else {
                this.apps = new Array();
            }
        }
        getInfo() {
            this.deleteVisible = false;
            this.detailVisible = false;
            this.loading = true;
            this.post(this.$uris.siteWebappInfo, null, this.onGetInfo);
        }

        onDeleteApp(code, err, data) {
            this.deleting = false;

            if (code === 0) {
            }
            else {
                this.error(err);
            }
        }
        deleteApp() {
            let argument = {
                path: this.detail.path
            };

            this.deleting = true;
            this.post(this.$uris.siteWebappDelete, argument, this.onDeleteApp);
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

    .body {
        display: flex;
        align-items: start;

        div:first-child {
            flex: 1;
            padding-right: 10px;
        }
    }

    .tree-node-folder {
        font-size: medium;
    }

    .tree-node-app {
        font-size: medium;
        font-weight: bold;
        font-style: italic;
    }

    .item {
        font-size: 13px;
        padding-bottom: 5px;
    }

    .text {
        font-weight: bold;
        padding-left: 2px;
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