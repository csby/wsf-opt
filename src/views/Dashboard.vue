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
        }
        .not-first {
            margin-top: 5px;
        }
    }
</style>