<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" shadow="nerver">
        <div slot="header" class="clearfix">
          <span>欢迎登录</span>
        </div>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { Card } from 'element-ui'
import LoginForm from './components/login-form'
import { mapActions } from 'vuex'
import { timerOut } from '@/http/dt-http-code'

export default {
  name: 'login',
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit (value) {
      this.handleLogin(value).then(() => {
        this.getUserInfo().then(() => {
          this.$router.push({
            name: 'home'
          })
        }).catch(err => {
          if (err.code === timerOut) {
            this.$router.push({
              name: 'login'
            })
          }
        })
      })
    }
  },
  components: {
    LoginForm,
    Card
  }
}
</script>
<style scoped lang="scss">
  .login{
    width: 100%;
    height: calc(100vh);
    background: url('../../assets/images/login-bg.jpg') center;
    background-size: cover;
    position: relative;
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 400px;
      &-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con{
        padding: 10px 0 0;
      }
      .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>
