<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <h3 class="title">欢迎使用</h3>
            <el-form-item prop="accountId">
                <span class="svg-container"><svg-icon icon-class="user"/></span>
                <el-input v-model="loginForm.accountId" name="accountId" type="text" auto-complete="on" placeholder="accountId"/>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container"><svg-icon icon-class="password"/></span>
                <el-input :type="pwdType" v-model="loginForm.password" name="password" auto-complete="on" placeholder="password" @keyup.enter.native="handleLogin"/>
                <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="eyeType"/></span>
            </el-form-item>
            <el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登陆</el-button>
            </el-form-item>
            <!--<div class="tips">-->
            <!--<span style="margin-right:20px;">accountId: admin</span>-->
            <!--<span> password: admin</span>-->
            <!--</div>-->
        </el-form>
    </div>
</template>

<script>
    import {Message} from 'element-ui';

    export default {
        name: "Login",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value.length < 5) {
                    callback(new Error("密码不能小于5位"));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    accountId: "admin",
                    password: "admin"
                },
                loginRules: {
                    accountId: [{required: true, trigger: "blur"}],
                    password: [{required: true, trigger: "blur", validator: validatePass}]
                },
                loading: false,
                pwdType: "password",
                redirect: undefined,
                eyeType: 'eye-close',
                tCaptchaSrc: "https://ssl.captcha.qq.com/TCaptcha.js"
            };
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === "password") {
                    this.pwdType = "";
                    this.eyeType = 'eye-open';
                } else {
                    this.pwdType = "password";
                    this.eyeType = 'eye-close'
                }
            },
            loginRequest() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store
                            .dispatch("Login", this.loginForm)
                            .then(() => {
                                this.loading = false;
                                this.$router.push({path: this.redirect || "/"});
                            })
                            .catch((error) => {
                                if (error.response.status === 401) {
                                    Message.closeAll();
                                    Message({
                                        message: "用户名或密码错误，请重试",
                                        type: 'error',
                                        center: true,
                                        duration: 5 * 1000
                                    });
                                }
                                this.loading = false;
                            });
                    } else {
                        return false;
                    }
                });
            },
            handleLogin() {
                //开发环境不显示
                if (process.env.VUE_APP_ENVIRONMENT === 'development') {
                    this.loginRequest();
                    return;
                }
                var that = this;
                // eslint-disable-next-line
                var captcha1 = new TencentCaptcha('2054066368', function (res) {
                    if (res.ret === 0) {
                        that.loginRequest();
                    }
                });
                captcha1.show();
            },
            createScript(src) {
                var oScript = document.createElement('script');
                oScript.src = src;
                document.getElementsByTagName('body')[0].appendChild(oScript);
            }
        },
        created: function () {
            //开发环境不显示
            if (process.env.VUE_APP_ENVIRONMENT === 'production') {
                this.createScript(this.tCaptchaSrc);
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 520px;
            max-width: 100%;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .title {
            font-size: 26px;
            /*font-weight: 400;*/
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
