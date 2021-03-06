const uris = {
    // 获取获取验证码
    getCaptcha: '/opt.api/captcha',
    // 用户登录
    login: '/opt.api/login',
    // 退出登录
    logout: '/opt.api/logout',
    // 获取登录账号
    getLoginAccount: '/opt.api/login/account',
    // 获取在线用户
    getOnlineUsers: '/opt.api/online/users',

    // 通知订阅
    websocketNotify: '/opt.api/websocket/notify',

    // 后台服务
    // 获取服务信息
    svcInfo: '/opt.api/service/info',
    // 是否可在线重启
    svcRestartEnable: '/opt.api/service/restart/enable',
    // 重启服务
    svcRestart: '/opt.api/service/restart',
    // 是否可在线更新
    svcUpdateEnable: '/opt.api/service/update/enable',
    // 更新服务
    svcUpdate: '/opt.api/service/update',

    // 更新管理
    // 是否支持
    updEnable: '/opt.api/update/enable',
    // 获取服务信息
    updInfo: '/opt.api/update/info',
    // 是否可在线重启
    updRestartEnable: '/opt.api/update/restart/enable',
    // 重启服务
    updRestart: '/opt.api/update/restart',
    // 是否可在线更新
    updUploadEnable: '/opt.api/update/upload/enable',
    // 更新服务
    updUpload: '/opt.api/update/upload',

    // 系统信息
    // 获取主机信息
    monitorHost: '/opt.api/monitor/host',
    // 获取网卡信息
    monitorNetworkInterfaces: '/opt.api/monitor/network/interfaces',
    // 获取监听端口
    monitorListenPorts: '/opt.api/monitor/network/listen/ports',

    // 网站管理
    // 根站点
    // 获取文件列表
    siteRootInfo: '/opt.api/site/root/info',
    // 上传文件
    siteRootFileUpload: '/opt.api/site/root/file/upload',
    // 删除文件
    siteRootFileDelete: '/opt.api/site/root/file/delete',
    // 后台服务
    // 获取理网站信息
    siteOptInfo: '/opt.api/site/opt/info',
    // 上传网站
    siteOptUpload: '/opt.api/site/opt/upload',
    // 接口文档
    // 获取理网站信息
    siteDocInfo: '/opt.api/site/doc/info',
    // 上传网站
    siteDocUpload: '/opt.api/site/doc/upload',
    // 网站应用
    // 获取网站应用信息
    siteWebappInfo: '/opt.api/site/webapp/info',
    // 上传网站
    siteWebappUpload: '/opt.api/site/webapp/upload',
    // 删除网站
    siteWebappDelete: '/opt.api/site/webapp/delete',
    // 自定义网站
    // 是否允许自定义网站
    siteCustomEnable: '/opt.api/site/custom/enable',
    // 获取自定义网站信息
    siteCustomInfo: '/opt.api/site/custom/info',
    // 上传自定义网站
    siteCustomUpload: '/opt.api/site/custom/upload',

}

export default {
    uris
}