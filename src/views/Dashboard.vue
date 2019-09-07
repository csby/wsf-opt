<template>
    <div class="dashboard">
        <div class="fill">
            <div style="display: flex; align-items: start;">
                <div style="width: calc(50% - 5px);">
                    <siteFix title="接口文档"
                             icon="el-icon-document"
                             :infoUri="this.$uris.siteDocInfo"
                             :uploadUri="this.$uris.siteDocUpload"
                             :uploadId="this.$evt.id.wsDocSiteUpload"/>
                </div>
                <div style="width:  calc(50% - 5px); margin-left: 10px;">
                    <siteFix title="后台服务管理"
                             icon="el-icon-s-grid"
                             :infoUri="this.$uris.siteOptInfo"
                             :uploadUri="this.$uris.siteOptUpload"
                             :uploadId="this.$evt.id.wsOptSiteUpload"/>
                </div>
            </div>
            <div class="not-first" v-if="customSiteEnable">
                <siteFix :title="customSiteName"
                         icon="el-icon-help"
                         :infoUri="this.$uris.siteCustomInfo"
                         :uploadUri="this.$uris.siteCustomUpload"
                         :uploadId="this.$evt.id.wsCustomSiteUpload"/>
            </div>
            <div class="not-first">
                <siteWebapp />
            </div>
            <div class="not-first">
                <siteRoot />
            </div>
            <div class="not-first">
                <statOptUserOnline />
            </div>
        </div>
        <div class="fix">
            <div>
                <optSvcInfo />
            </div>
            <div class="not-first">
                <updSvcInfo />
            </div>
            <div class="not-first">
                <monitorHost />
            </div>
            <div class="not-first">
                <monitorNetworkInterfaces />
            </div>
            <div class="not-first">
                <monitorNetworkListening />
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import VueBase from '@/components/VueBase'
    import OptSvcInfo from '@/components/svc/opt/Info'
    import UpdSvcInfo from '@/components/svc/upd/Info'
    import MonitorHost from '@/components/monitor/host/Host'
    import MonitorNetworkInterfaces from '@/components/monitor/network/Interface'
    import MonitorNetworkListening from '@/components/monitor/network/Listening'
    import SiteRoot from '@/components/site/root/Info'
    import SiteFix from '@/components/site/fix/Info'
    import SiteWebapp from '@/components/site/webapp/Info'
    import StatOptUserOnline from '@/components/stat/user/opt/Online'

    @Component({
        components: {
            optSvcInfo: OptSvcInfo,
            updSvcInfo: UpdSvcInfo,
            monitorHost: MonitorHost,
            monitorNetworkInterfaces: MonitorNetworkInterfaces,
            monitorNetworkListening: MonitorNetworkListening,
            siteRoot: SiteRoot,
            siteFix: SiteFix,
            siteWebapp: SiteWebapp,
            statOptUserOnline: StatOptUserOnline
        }
    })
    export default class Dashboard extends VueBase {
        customSiteName = "";
        customSiteEnable = false

        onGetInfo(code, err, data) {
            if (code === 0) {
                this.customSiteName = data;
                this.customSiteEnable = true;
            }
            else {
                this.customSiteEnable = false;
            }
        }
        getInfo() {
            this.post(this.$uris.siteCustomEnable, null, this.onGetInfo);
        }

        mounted() {
            this.getInfo();
        }
    }
</script>

<style scoped lang="scss">
    .dashboard {
        display: flex;
        align-items: flex-start;
        padding-bottom: 5px;

        .fill {
            flex: 1;
        }
        .fix {
            padding-left: 10px;
            width: 420px;
        }
        .not-first {
            margin-top: 5px;
        }
    }
</style>