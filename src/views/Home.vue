<template>
    <div class="home">
        <div class="home-top" ref="top">
            <img class="logo" alt="logo" src="../assets/logo.png"  @click="to('/')"/>
            <span class="title">
              <span>服务管理平台</span>
              <span>{{frontVersion}}</span>
          </span>
            <loginUser />
        </div>

        <div class="home-body">
            <div class="home-body-left">
                <Navigation :minHeight="navigationMinHeight" :defaultActive="defaultMenu"/>
            </div>
            <div class="home-body-right" ref="bodyRight" :style="bodyRightStyle">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    import Component from 'vue-class-component'
    import VueBase from '@/components/VueBase'
    import Version from '@/version'
    import LoginUser from '@/components/auth/LoginUser'
    import Navigation from '@/components/menu/Navigation'

    @Component({
        components: {
            LoginUser,
            Navigation
        }
    })
    export default class Home extends VueBase {
        frontVersion = Version.version
        bodyMinHeight = 0
        navigationMinHeight = 0
        defaultMenu = "/"

        get bodyRightStyle() {
            let minHeight = this.bodyMinHeight + "px";
            return {
                'min-height': minHeight,
                'max-height': minHeight
            };
        }

        updateBodyRightHeight() {
            let bodyRight = this.$refs["bodyRight"];
            if(bodyRight) {
                this.navigationMinHeight = bodyRight.offsetHeight;
            }
        }

        onSizeChanged() {
            let top = this.$refs["top"];
            if(!top) {
                return;
            }

            let clientHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;

            let topHeight = top.offsetHeight;
            let bodyMarginHeight = 0;
            let bodyPaddingHeight = 10;

            this.bodyMinHeight = clientHeight - topHeight - bodyMarginHeight - bodyPaddingHeight;
            this.$nextTick(this.updateBodyRightHeight);
        }

        mounted() {
            window.addEventListener("resize", this.onSizeChanged);
            this.onSizeChanged();
        }
        beforeDestroy() {
            window.removeEventListener("resize", this.onSizeChanged);
        }
    }
</script>

<style scoped lang="scss">
    .home {
    }

    .home-top {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0px 18px;
        background-color: #f8f8f8;
        border-bottom: 1px solid #e6e6e6;

        .logo {
            height: 80%;
            cursor: pointer;
        }
        .logo:hover {
            color: #409eff;
        }
        .title {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 0px 5px;
            font-size: large;
            color: #3f3f3f;
        }
    }

    .home-body {
        display: flex;
        align-items: start;
    }
    .home-body-left {
    }
    .home-body-right {
        flex: 1;
        padding: 5px 10px;
        overflow: auto;
    }
</style>