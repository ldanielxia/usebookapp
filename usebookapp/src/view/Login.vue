<template>
    <div class="login-container">
     <div class="login-content">
      <!-- <img src="@/assets/img/logo.png" alt="" class="login-Logo"> -->
        <h2>UsedBooksystem</h2>
        <div class="login-Wrapper">
        <van-form class="login-form">
         
          <van-field v-model="loginForm.email" class="svg-container" name="email" label="email" maxlength="20" placeholder="enter your email" />
          <van-field v-model="loginForm.password" class="svg-container" type="password" name="pwd" label="password" maxlength="15" placeholder="enter your password" />

          <van-button :loading="loading" class="btnLogin" @click="handleLogin" >Login</van-button>
          <van-button  class="btnLogin" @click="handleRegister">Register</van-button>
        </van-form>

      </div>
    </div>
    <div class="footer"> &copy;2023</div>
  </div>
</template>
<script>
    import api from "@/api/login.js";
    import Storage from "../storage.js";
    export default {
         setup() { 
           console.log();
        },
        data () {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                loading: false,
            }
        },
        methods:{
             handleRegister(){
              this.$router.push("/register");
             },
             handleLogin() {
               this.loginForm.email = this.loginForm.email.trim()
               this.loginForm.password = this.loginForm.password.trim()
               if (this.loginForm.email === '' || this.loginForm.email === null || this.loginForm.email.length === 0) {
                    this.$toast("email is not null")
                    return
               }
               if (this.loginForm.password === '' || this.loginForm.password === null || this.loginForm.password.length === 0) {
                 this.$toast('password is not null')
                 return
               }
              //  this.loading = true
               api.login(this.loginForm,null) .then((res) => {
                 console.log(res);
               if(res.data.code==1){
                  console.log(res.data.data)
                  let json = {};
                  json.id = res.data.data.id;
                  json.email = res.data.data.email;
                  json.firstName=res.data.data.firstName;
                  json.lastName=res.data.data.lastName;
                  json.studentID = res.data.data.studentID;
                  json.gender = res.data.data.gender;
                  json.phone =  res.data.data.phone;
                  json.school =  res.data.data.school;
                  json.programe =  res.data.data.programe;
                  json.dateofbirth =  res.data.data.dateOfBirth;
                  Storage.set("key", json);
                  this.$router.push("/home");
               }else{
                 console.log('false')
              }
          })
          .catch((e) => {
            console.log("false" + e);     
          });
        },
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
  /* background-color: #48b08d; */
  /* background-image: url('~@/assets/img/fw1200.jpg'); */
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

.login-Wrapper{
  width: 95%;
  margin:0 auto;
  background-color: white;
  color: black !important;
  padding: 2rem 0;
  border: 1px solid white;
  border-radius: 8px;
}
.btnLogin{
  background-color:#0da1eb;
  color: white;
  width:100%;
  margin-top:30px;
}
.login-Logo{
  height: 100px;
  margin: 0 auto;
  display: table-cell;
  text-align: center;
}
h2{
  color: #0da1eb;
  font-size: 20px;
  text-align: center;
}
.van-field__label{
  color: black !important;
}
.login-content{
  padding-top: 9rem;
}
.footer{
  position: absolute;
  bottom: 0;

}
</style>