const ids = {
    // 用户登陆
    // data: {userAccount: "", userName: "", loginIp: "", loginTime: "2019-07-12 20:29:31"}
    wsOptUserLogin: 101,
    // 用户注销
    // data: null
    wsOptUserLogout: 102,
    // 上传并发布后台服务管理网站
    // data: {"url": "http://192.168.1.1:8080/opt/", "version": "1.0.1.0", "deployTime": "2019-07-12 20:29:31"}
    wsOptSiteUpload: 111,
    // 上传并发布后台接口文档网站
    // data: {"url": "http://192.168.1.1:8080/doc/", "version": "1.0.1.0", "deployTime": "2019-07-12 20:29:31"}
    wsDocSiteUpload: 112,
    // 根站点-上传文件
    // data: {"url": "http://192.168.1.1:8080/test.txt", name": "test.txt", "uploadTime": "2019-07-12 20:29:31"}
    wsRootSiteUploadFile: 113,
    // 根站点-上传文件
    // data: {name": "test.txt"}
    wsRootSiteDeleteFile: 114,
    // 上传并发布后应用网站
    // data: null
    wsWebappSiteUpload: 115,
    // 删除应用网站
    // data: null
    wsWebappSiteDelete: 116,
    // 上传并发布自定义网站
    // data: null
    wsCustomSiteUpload: 119,
}


export default {
    ids
}