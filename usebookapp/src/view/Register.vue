<template>
    <div class="login-container">
        <div class="login-content">
            <h2>Register</h2>
            <div class="login-Wrapper">
                <van-form class="login-form">
                    <van-field
                        v-model="loginForm.email"
                        class="svg-container"
                        name="email"
                        label="email"
                        maxlength="20"
                        placeholder="enter your email"
                        @blur="handleUsersExits"
                    />
                    <van-field
                        v-model="loginForm.password"
                        class="svg-container"
                        type="password"
                        name="pwd"
                        label="password"
                        maxlength="15"
                        placeholder="enter your password"
                    />
                    <van-field
                        v-model="loginForm.passwordk"
                        class="svg-container"
                        type="password"
                        name="pwdk"
                        label="password"
                        maxlength="15"
                        placeholder="enter your password"
                    />
                    <van-button
                        :loading="loading"
                        class="btnLogin"
                        @click="handleRegister"
                        :disabled="btnRegisterDisable"
                        >Register</van-button
                    >
                    <van-button class="btnLogin" @click="clickLogin"
                        >Login</van-button
                    >
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/users/users.js'
// import Storage from '../storage.js'
export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
                passwordk: ''
            },
            loading: false,
            btnRegisterDisable: true
        }
    },
    methods: {
        clickLogin() {
            this.$router.push('/login')
        },
        handleRegister() {
            // let flag = ture
            this.loginForm.email = this.loginForm.email.trim()
            this.loginForm.password = this.loginForm.password.trim()
            if (
                this.loginForm.email === '' ||
                this.loginForm.email === null ||
                this.loginForm.email.length === 0
            ) {
                // flag = false
                this.$toast.fail('email is not null')
                return
            }

            if (
                this.loginForm.password === '' ||
                this.loginForm.password === null ||
                this.loginForm.password.length === 0
            ) {
                // flag = false
                this.$toast.fail('password is not null')
                return
            } else if (this.loginForm.password.length < 6) {
                this.$toast.fail('Password length must be greater than 6')
                return
            } else if (this.loginForm.password != this.loginForm.passwordk) {
                // flag = false
                this.$toast.fail('two password is not same')
                return
            }

            api.add(this.loginForm, null)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        // console.log(res.data.data)
                        this.resetText()
                        this.$toast.success('user register success ')
                    } else {
                        console.log('false')
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                    this.$toast.fail('register errro' + e)
                })
        },
        handleUsersExits() {
            this.loginForm.email = this.loginForm.email.trim()
            api.exits(this.loginForm, null)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        console.log(res.data.data)
                        this.$toast.fail('user is exits')
                        this.btnRegisterDisable = true
                    } else {
                        this.btnRegisterDisable = false
                    }
                })
                .catch((e) => {
                    console.log('false' + e)

                    this.btnRegisterDisable = true
                })
        },
        resetText() {
            this.loginForm.email = ''
            this.loginForm.password = ''
            this.loginForm.passwordk = ''
        }
    }
}
</script>
<style scoped>
.van-field /deep/ .van-field__control {
    color: #000;
}
.van-field /deep/ .van-field__label {
    color: #000;
}
.login-container {
    height: calc(100vh);
}
.login-form {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
}
.svg-container {
    color: #000;
}

.login-Wrapper {
    width: 95%;
    margin: 0 auto;
    background-color: white;
    color: black !important;
    padding: 2rem 0;
    border: 1px solid white;
    border-radius: 8px;
}
.btnLogin {
    background-color: #0da1eb;
    color: white;
    width: 100%;
    margin-top: 30px;
}
.login-Logo {
    height: 100px;
    margin: 0 auto;
    display: table-cell;
    text-align: center;
}
h2 {
    color: #0da1eb;
    font-size: 20px;
    text-align: center;
}
.van-field__label {
    color: black !important;
}
.login-content {
    padding-top: 9rem;
}
.footer {
    position: absolute;
    bottom: 0;
}
</style>