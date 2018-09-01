<template>
  <div class="dt-user">
    <Dropdown @command="handleDrop">
      <div class="dt-user__avator">
        <Button type="warning" icon="el-icon-star-off" circle></Button>
        <span>{{userinfo.admin_user_name}}</span>
      </div>
      <Dropdown-menu slot="dropdown">
        <Dropdown-item command="editPass">修改密码</Dropdown-item>
        <Dropdown-item command="loginOut">退出登录</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu, Button } from 'element-ui'
export default {
  name: 'dt-user',
  props: {
    userinfo: {
      type: Object,
      required: true
    }
  },
  components: {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Button
  },
  methods: {
    handleDrop (type) {
      if (type === 'editPass') {
        this.$emit('edit-pass')
      } else {
        this.$emit('login-out')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dt-user {
    margin-top: 10px;
    span {
      margin-left: 3px;
    }
  }
</style>
