<template>
  <Form ref="loginForm" inline :model="form" label-width="80px" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username" label="用户名">
      <Input v-model="form.username" placeholder="请输入用户名"/>
    </FormItem>
    <FormItem prop="password" label="密码">
      <Input type="password" v-model="form.password" placeholder="请输入密码"/>
    </FormItem>
    <div>
      <FormItem>
        <Button type="primary" long @click="handleSubmit" style="width: 100%">登录</Button>
      </FormItem>
    </div>
  </Form>
</template>
<script>
import { Form, FormItem, Button, Input } from 'element-ui'
import DtIcon from '@components/dt-icon/dt-icon'

export default {
  name: 'login-form',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        username: 'admin',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            password: this.form.password
          })
        }
      })
    }
  },
  components: {
    DtIcon,
    Form,
    FormItem,
    Button,
    Input
  }
}
</script>
