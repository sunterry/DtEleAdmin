<template>
  <div class="dt-logo" @click="gotoHome">
    <slot>
      DtAdmin
    </slot>
  </div>
</template>

<script>
export default {
  name: 'dt-logo',
  methods: {
    gotoHome () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .dt-logo {
    width: 200px;
    height: 60px;
    background: rgb(81, 90, 110);
    cursor: pointer;
    text-align: center;
    color: #fff;
    font-size: 28px;
    line-height: 60px;
    text-shadow: 5px 0 3px rgba(1px, 1px, 2px, 1);
    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 8px auto;
    }
  }
</style>
