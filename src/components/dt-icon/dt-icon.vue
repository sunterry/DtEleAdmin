<template>
  <i :class="iconClass" :style="styles"></i>
</template>
<script>
export default {
  name: 'icons',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    iconClass () {
      return this.icon.indexOf('el-icon-') === 0 ? [this.icon, 'icon'] : [ 'iconfont', 'icon', `icon-${this.icon}` ]
    },
    styles () {
      return {
        fontSize: this.size + 'px',
        color: this.color
      }
    }
  }
}
</script>

<style scoped>
  .icon {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    vertical-align: middle;
  }
</style>
